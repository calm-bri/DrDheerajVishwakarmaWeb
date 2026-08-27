import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useData } from "../context/DataContext";

export default function ParallaxCarousel() {
  const { showcases } = useData();

  // Backup images
  const fallbackImages = [
    {
      id: "fallback-records",
      title: "Asia & India Book of Records Certificate",
      subtitle:
        "Emergency Cauda Equina discectomy on youngest patient (11 years old).",
      description:
        "Dr. Dheeraj Vishwakarma receiving world-record certifications for executing transforaminal monoportal endoscopic discectomy under local conscious epidural anesthesia.",
      imageUrl: "/awards-records.jpg",
    },
    {
      id: "fallback-rajasthan-hands-on",
      title: "Rajasthan Spine Workshop hands-on training session",
      subtitle: "Hands-on spinal training and model calibration workshops.",
      description:
        "Demonstrating high-magnification endoscope handling, surgical drill maneuvers, and saline pump parameters to orthopaedic delegates.",
      imageUrl: "/rajasthan_workshop_hands_on.jpg",
    },
    {
      id: "fallback-rajasthan-news",
      title: "Pioneering Monoportal Endoscopic Milestones in Rajasthan",
      subtitle: "Local news publication cover feature.",
      description:
        "Hindi news clipping detailing the first successful full-endoscopic spine discectomy workshop conducted in Jaipur, Rajasthan, in 2025.",
      imageUrl: "/rajasthan_workshop_news2.jpg",
    },
    {
      id: "fallback-rajasthan-demo",
      title: "Live Monoportal Endoscopic Surgery Workshop Lecture",
      subtitle: "Invited speaker at Geetanjali Medical University, Udaipur.",
      description:
        "Dr. Vishwakarma presenting active clinical cases, anatomical landmarks, and spinal decompression techniques to national fellows.",
      imageUrl: "/rajasthan_workshop_demo.jpg",
    },
  ];

  // Filter showcases to include only image assets
  const images = showcases.filter(
    (item) => !item.videoUrl && item.imageUrl
  );

  const galleryItems = images.length > 0 ? images : fallbackImages;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const totalItems = galleryItems.length;

  useEffect(() => {
    if (currentIndex >= totalItems && totalItems > 0) {
      setCurrentIndex(0);
    }
  }, [totalItems, currentIndex]);

  if (totalItems === 0) return null;

  const handleNext = () => {
    setDragOffset(0);
    setCurrentIndex((prev) =>
      prev === totalItems - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setDragOffset(0);
    setCurrentIndex((prev) =>
      prev === 0 ? totalItems - 1 : prev - 1
    );
  };

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> |
      React.TouchEvent<HTMLDivElement>
  ) => {
    setIsDragging(true);

    const clientX =
      "touches" in e
        ? e.touches[0].clientX
        : e.clientX;

    dragStartX.current = clientX;
    dragStartOffset.current = dragOffset;
  };

  const handleDragMove = (
    e: React.MouseEvent<HTMLDivElement> |
      React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return;

    const clientX =
      "touches" in e
        ? e.touches[0].clientX
        : e.clientX;

    const difference = clientX - dragStartX.current;

    setDragOffset(dragStartOffset.current + difference);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    const threshold = 100;

    if (dragOffset > threshold) {
      handlePrev();
    } else if (dragOffset < -threshold) {
      handleNext();
    } else {
      setDragOffset(0);
    }
  };

  const getCircularDistance = (
    index: number,
    activeIndex: number
  ) => {
    let distance = index - activeIndex;

    if (distance > totalItems / 2) {
      distance -= totalItems;
    }

    if (distance < -totalItems / 2) {
      distance += totalItems;
    }

    return distance;
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 md:px-8 bg-cosmic-bg overflow-hidden border-t border-white/5">
      {/* Ambient background */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-sky-500/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-gold-400/5 blur-3xl rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8 mb-14 text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-400/20 bg-gold-400/5 text-gold-300">
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />

              <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-medium">
                Clinical Credentials Showcase
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Parallax Case Gallery
            </h2>

            <p className="text-gray-400 text-xs sm:text-sm max-w-xl font-sans leading-relaxed">
              Explore awards, medical workshops, and fellowship milestones
              through an immersive interactive gallery. Drag to navigate and
              experience smooth depth and parallax motion.
            </p>
          </div>

          <div className="flex gap-2 text-gold-300 font-mono text-[9px] uppercase tracking-wider self-start md:self-end bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            <span>
              Image {currentIndex + 1} of {totalItems}
            </span>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className={`relative w-full h-[430px] sm:h-[520px] flex items-center justify-center touch-pan-y select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {galleryItems.map((item, index) => {
            const distance = getCircularDistance(
              index,
              currentIndex
            );

            const dragInfluence = dragOffset / 450;

            const position =
              distance + dragInfluence;

            const absPosition = Math.abs(position);

            // Card positioning
            const translateX = position * 62;
            const translateZ = -absPosition * 120;

            const rotateY = position * -14;

            // Scale and opacity
            const scale = Math.max(
              0.72,
              1 - absPosition * 0.14
            );

            const opacity = Math.max(
              0,
              1 - absPosition * 0.42
            );

            const zIndex =
              100 - Math.round(absPosition * 10);

            return (
              <div
                key={item.id}
                className="absolute w-[82vw] max-w-[620px] aspect-[4/3]"
                style={{
                  zIndex,
                  opacity,
                  transform: `
                    translateX(${translateX}%)
                    translateZ(${translateZ}px)
                    rotateY(${rotateY}deg)
                    scale(${scale})
                  `,
                  transition: isDragging
                    ? "none"
                    : "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease",
                  willChange: "transform, opacity",
                }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl">

                  {/* Image */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                    style={{
                      transform: `scale(${1.08 + absPosition * 0.03})`,
                      transition: isDragging
                        ? "none"
                        : "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent pointer-events-none" />


                  {/* Active border glow */}
                  {distance === 0 && (
                    <div className="absolute inset-0 rounded-2xl border border-gold-400/20 pointer-events-none shadow-[inset_0_0_60px_rgba(193,161,113,0.08)]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-5 mt-4">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-white/10 bg-white/5 text-gold-400 hover:text-white hover:border-gold-400/40 hover:scale-105 transition-all flex items-center justify-center"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="flex items-center gap-2">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDragOffset(0);
                  setCurrentIndex(index);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                  ? "w-8 bg-gold-400"
                  : "w-1.5 bg-white/20 hover:bg-white/50"
                  }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-white/10 bg-white/5 text-gold-400 hover:text-white hover:border-gold-400/40 hover:scale-105 transition-all flex items-center justify-center"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Instruction */}
        <p className="text-center mt-6 text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500">
          Drag or swipe to explore
        </p>
      </div>
    </section>
  );
}
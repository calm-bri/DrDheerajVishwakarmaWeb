import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Play, X, Film, ChevronLeft, ChevronRight } from "lucide-react";
import { videoData } from "../data";
import { VideoItem } from "../types";

import { useData } from "../context/DataContext";

interface VideoDiscoveryProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  activeVideo: VideoItem;
  setActiveVideo: (video: VideoItem) => void;
}

export default function VideoDiscovery({
  isModalOpen,
  setIsModalOpen,
  activeVideo,
  setActiveVideo
}: VideoDiscoveryProps) {
  const { videos } = useData();
  const videoList = videos && videos.length > 0 ? videos : videoData;
  const shouldReduceMotion = useReducedMotion();
  const modalCloseRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Sync activeIndex if activeVideo is modified externally
  useEffect(() => {
    const idx = videoList.findIndex((v) => v.id === activeVideo.id);
    if (idx !== -1 && idx !== activeIndex) {
      setActiveIndex(idx);
    }
  }, [activeVideo, videoList]);

  const handleNext = () => {
    if (activeIndex < videoList.length - 1) {
      const nextIndex = activeIndex + 1;
      setActiveIndex(nextIndex);
      setActiveVideo(videoList[nextIndex]);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      const prevIndex = activeIndex - 1;
      setActiveIndex(prevIndex);
      setActiveVideo(videoList[prevIndex]);
    }
  };

  // Keyboard navigation & modal lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      } else if (e.key === "ArrowLeft") {
        if (activeIndex > 0) {
          const prevIdx = activeIndex - 1;
          setActiveIndex(prevIdx);
          setActiveVideo(videoList[prevIdx]);
        }
      } else if (e.key === "ArrowRight") {
        if (activeIndex < videoList.length - 1) {
          const nextIdx = activeIndex + 1;
          setActiveIndex(nextIdx);
          setActiveVideo(videoList[nextIdx]);
        }
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => {
        modalCloseRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, activeIndex, setActiveVideo, videoList]);

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Triplicate the video items to ensure a seamless infinite marquee wrap
  const duplicatedVideos = [...videoList, ...videoList, ...videoList];

  return (
    <section className="relative py-20 px-4 sm:px-6 md:px-8 border-t border-white/5 overflow-hidden bg-cosmic-bg">
      {/* Scope CSS animation variables block */}
      <style>{`
        .video-slider {
          width: 100%;
          height: var(--height);
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, #000 10% 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, #000 10% 90%, transparent);
          position: relative;
        }
        .video-slider .video-list {
          display: flex;
          width: 100%;
          min-width: calc(var(--width) * var(--quantity));
          position: relative;
          height: 100%;
        }
        .video-slider .video-list .video-item {
          width: var(--width);
          height: var(--height);
          position: absolute;
          left: 100%;
          animation: videoAutoRun 20s linear infinite;
          transition: filter 0.5s, transform 0.5s, border-color 0.5s;
          animation-delay: calc(
            (20s / var(--quantity)) * (var(--position) - 1) - 20s
          ) !important;
        }
        @keyframes videoAutoRun {
          from {
            left: 100%;
          }
          to {
            left: calc(var(--width) * -1);
          }
        }
        .video-slider:hover .video-item {
          animation-play-state: paused !important;
          filter: brightness(0.4) grayscale(0.3);
        }
        .video-slider .video-item:hover {
          filter: brightness(1.1) grayscale(0);
          transform: scale(1.05);
          z-index: 10;
          border-color: rgba(193, 161, 113, 0.4);
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.6);
        }
      `}</style>

      {/* Ambient background light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-radial-glow opacity-10 blur-3xl rounded-full pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-5xl mx-auto space-y-12 relative z-10"
      >
        {/* Title Tag & Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8 text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-400/20 bg-sky-400/5 text-sky-300">
              <Film className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-medium">
                Surgical Knowledge , News , Procedures
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Advanced Endoscopic Spine Surgery Precision in Motion
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm max-w-xl font-sans leading-relaxed">
              Delve into clinical operations and endoscopic spine science. Hover over cards to pause and inspect individual surgical cases.
            </p>
          </div>

          {/* Infinite Play status indicator replacing static slider controls */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-400/20 bg-gold-400/5 text-gold-300 font-mono text-[9px] uppercase tracking-wider self-start md:self-end">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
            <span>Infinite Play • Hover to Pause</span>
          </div>
        </div>

        {/* Cinematic Infinite CSS Marquee Slider */}
        <div
          className="video-slider w-full select-none"
          style={{
            "--width": "290px",
            "--height": "250px",
            "--quantity": String(duplicatedVideos.length)
          } as React.CSSProperties}
        >
          <div className="video-list">
            {duplicatedVideos.map((video, idx) => (
              <div
                key={`${video.id}-${idx}`}
                className="video-item cursor-pointer border border-white/5 bg-cosmic-card/90 rounded-2xl overflow-hidden flex flex-col justify-between group"
                style={{
                  "--position": String(idx + 1)
                } as React.CSSProperties}
                onClick={() => {
                  setActiveVideo(video);
                  // find index of original video in videoData array for lightbox navigation
                  const originIndex = videoData.findIndex((v) => v.id === video.id);
                  if (originIndex !== -1) {
                    setActiveIndex(originIndex);
                  }
                  setIsModalOpen(true);
                }}
              >
                {/* Aspect video poster with overlay play button */}
                {/* Aspect video frame thumbnail with overlay play button */}
                <div className="relative aspect-video w-full overflow-hidden border-b border-white/5 bg-zinc-950">
                  <video
                    src={`${video.videoUrl}#t=0.5`}
                    preload="metadata"
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border border-gold-400/30 bg-gold-400/5 group-hover:bg-gold-400/20 text-gold-400 group-hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg">
                      <Play className="w-3.5 h-3.5 fill-current pl-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-gold-400/10 border border-gold-400/25 backdrop-blur-md text-gold-300 font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 rounded">
                    {video.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-3.5 text-left space-y-1 flex-1 flex flex-col justify-center bg-black/10">
                  <h3 className="font-display font-bold text-xs sm:text-sm text-white line-clamp-1 group-hover:text-gold-300 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-gray-400 font-sans line-clamp-2 leading-snug">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </motion.div>

      {/* Cinematic Fullscreen Lightbox Modal Player */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-cosmic-bg/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={`Watching: ${activeVideo.title}`}
          >
            {/* Close Overlay */}
            <div
              className="absolute inset-0 cursor-default"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Desktop Left Flanking Button */}
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`hidden sm:flex w-12 h-12 rounded-full border items-center justify-center shrink-0 transition-all cursor-pointer z-20 mr-4 ${activeIndex === 0
                ? "border-white/5 text-gray-700 bg-white/[0.01] cursor-not-allowed"
                : "border-white/10 glassmorphism text-gold-400 hover:text-white hover:border-gold-400/40 hover:scale-105"
                }`}
              aria-label="Previous video case"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="relative w-full max-w-4xl glassmorphism rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-cosmic-card/90 z-10 flex flex-col"
            >

              {/* Modal Top Bar */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/5 select-none bg-black/20">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-gold-400" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                    Dr. Dheeraj Vishwakarma Spine Care
                  </span>
                </div>

                {/* Navigation and Close triggers */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 sm:hidden">
                    <button
                      onClick={handlePrev}
                      disabled={activeIndex === 0}
                      className={`p-1.5 rounded-full border transition-all ${activeIndex === 0
                        ? "border-white/5 text-gray-700 cursor-not-allowed"
                        : "border-white/10 text-gold-400 bg-white/5"
                        }`}
                      aria-label="Previous video"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={activeIndex === videoList.length - 1}
                      className={`p-1.5 rounded-full border transition-all ${activeIndex === videoList.length - 1
                        ? "border-white/5 text-gray-700 cursor-not-allowed"
                        : "border-white/10 text-gold-400 bg-white/5"
                        }`}
                      aria-label="Next video"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    ref={modalCloseRef}
                    onClick={() => setIsModalOpen(false)}
                    className="p-1.5 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close video player modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Dynamic Lazy-loaded Video Frame */}
              <div className="w-full aspect-video bg-black relative flex items-center justify-center">
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                  style={{ display: "block" }}
                />
              </div>

              {/* Modal Bottom Metadata */}
              <div className="p-5 sm:p-6 space-y-2 text-left bg-black/25 select-text">
                <div className="inline-block bg-sky-400/10 border border-sky-400/20 text-sky-300 text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded">
                  {activeVideo.category}
                </div>
                <h4 className="text-white font-display font-bold text-lg sm:text-xl">
                  {activeVideo.title}
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm font-sans leading-relaxed">
                  {activeVideo.description}
                </p>
              </div>

            </motion.div>

            {/* Desktop Right Flanking Button */}
            <button
              onClick={handleNext}
              disabled={activeIndex === videoList.length - 1}
              className={`hidden sm:flex w-12 h-12 rounded-full border items-center justify-center shrink-0 transition-all cursor-pointer z-20 ml-4 ${activeIndex === videoList.length - 1
                ? "border-white/5 text-gray-700 bg-white/[0.01] cursor-not-allowed"
                : "border-white/10 glassmorphism text-gold-400 hover:text-white hover:border-gold-400/40 hover:scale-105"
                }`}
              aria-label="Next video case"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

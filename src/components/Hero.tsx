import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Star, ShieldCheck, Play, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import BilingualText from "./BilingualText";
import { useData } from "../context/DataContext";
import { INITIAL_SHOWCASES } from "./Gallery";

interface HeroProps {
  onOpenBooking: () => void;
  onExploreScience: () => void;
  onNavigateAbout?: () => void;
  onPlayVideo?: () => void;
}

export default function Hero({ onOpenBooking, onExploreScience, onNavigateAbout, onPlayVideo }: HeroProps) {
  const [isEnglish, setIsEnglish] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const { showcases } = useData();

  useEffect(() => {
    const timer = setInterval(() => {
      setIsEnglish((prev) => !prev);
    }, 8000); // 8 seconds bilingual display time (longer)
    return () => clearInterval(timer);
  }, []);

  // Filter gallery items to only include items marked "featuredInHero" by the admin
  const featuredItems = (showcases || []).filter(item => item.featuredInHero === true);

  // Fall back to all showcases if none are explicitly selected, and then to INITIAL_SHOWCASES
  const galleryItems = featuredItems.length > 0
    ? featuredItems
    : (showcases && showcases.length > 0)
      ? showcases
      : INITIAL_SHOWCASES;
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (galleryItems.length <= 1) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % galleryItems.length);
    }, 8000); // Cycle carousel every 8 seconds
    return () => clearInterval(interval);
  }, [galleryItems.length]);

  // Touch Swipe Gesture Support for Mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Left Swipe -> Next slide
      setSlideIndex((prev) => (prev < galleryItems.length - 1 ? prev + 1 : 0));
    } else if (distance < -minSwipeDistance) {
      // Right Swipe -> Previous slide
      setSlideIndex((prev) => (prev > 0 ? prev - 1 : galleryItems.length - 1));
    }
  };

  // Stagger configurations for typography reveals
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const titleItemVariants = {
    hidden: { y: 30, opacity: 0, filter: "blur(6px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { type: "spring", damping: 25, stiffness: 180 }
    }
  };

  const textTransitionVariants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 10,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(4px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -10,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(4px)",
      transition: {
        duration: 0.6,
        ease: [0.7, 0, 0.84, 0], // easeIn
      },
    },
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      {/* Direct Supabase Cinematic Background Video */}
      {/* Direct Supabase Cinematic Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-70 filter brightness-[0.9] contrast-[1.15] saturate-[1.0]"
        >
          <source
            src="https://iplsqsfgnmomqqhnvydz.supabase.co/storage/v1/object/public/Video/Animate_image_with_motion_202605222341%20(1).mp4"
            type="video/mp4"
          />
        </video>
        {/* Cinematic radial & linear darkness gradients, softened to make the video beautifully clear while protecting text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-cosmic-bg via-transparent to-cosmic-bg/40 opacity-55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#030509_85%)] opacity-65" />
      </div>

      {/* Editorial Watermark Lines background and glowing nodes */}
      <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-gold-glow opacity-40 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] bg-radial-glow opacity-30 blur-3xl rounded-full pointer-events-none" />

      {/* Decorative vertical clinical parameters */}
      <div className="hidden xl:flex absolute left-8 top-1/3 bottom-1/3 flex-col justify-between items-center text-[9px] font-mono text-gray-600 tracking-[0.25em] h-56 select-none pointer-events-none">
        <span className="rotate-270 origin-left mb-6">ISO 9001:2026 AUDITED CLINIC</span>
        <div className="w-[1px] h-12 bg-white/10" />
        <span className="rotate-270 origin-left">MINIMALLY INVASIVE SPECIALTY</span>
      </div>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">

        {/* Left Aligned Content Frame */}
        <div className="lg:col-span-9 xl:col-span-8 flex flex-col items-start space-y-6 text-left w-full">

          {/* Scientific Medical Credential Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/20 bg-gold-400/5 text-gold-300"
          >
            <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400/20" />
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] font-medium">
              Rajasthan's Pioneers in Monoportal Endoscopic Spine Surgery
            </span>
          </motion.div>

          {/* Giant Editorial Headline */}
          <div className="grid grid-cols-1 grid-rows-1 justify-items-start items-center w-full min-h-[7.5rem] sm:min-h-[10rem] md:min-h-[12rem] lg:min-h-[14rem]">
            <AnimatePresence mode="wait">
              {isEnglish ? (
                <motion.div
                  key="en-headline"
                  variants={textTransitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="col-start-1 row-start-1 space-y-1 w-full text-left"
                >
                  <div className="relative inline-block block">
                    <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white/30 leading-[0.95] select-none text-left">
                      SPINE PAIN
                    </h1>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
                      className="absolute left-[-5%] right-[-5%] top-[55%] h-[5px] sm:h-[7px] bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 rounded-full shadow-[0_0_20px_#ef4444] rotate-[-2.5deg] origin-left pointer-events-none"
                    />
                  </div>

                  <div className="relative inline-block block">
                    <h2 className="font-display text-5xl sm:text-6xl md:text-7.5xl lg:text-8.5xl font-extrabold tracking-tight text-white leading-[0.95] text-left">
                      Ends Here<span className="text-gold-400">.</span>
                    </h2>
                    <div className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-[2px] sm:h-[3px] bg-gradient-to-r from-gold-400 to-sky-400 shadow-[0_0_15px_#c1a171] opacity-75 animate-pulse" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="hi-headline"
                  variants={textTransitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="col-start-1 row-start-1 space-y-1 w-full text-left font-sans"
                >
                  <div className="relative inline-block block">
                    <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white/30 leading-[0.95] select-none text-left">
                      रीढ़ का दर्द
                    </h1>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
                      className="absolute left-[-5%] right-[-5%] top-[55%] h-[5px] sm:h-[7px] bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 rounded-full shadow-[0_0_20px_#ef4444] rotate-[-2.5deg] origin-left pointer-events-none"
                    />
                  </div>

                  <div className="relative inline-block block">
                    <h2 className="font-display text-5xl sm:text-6xl md:text-7.5xl lg:text-8.5xl font-extrabold tracking-tight text-white leading-[0.95] text-left font-sans">
                      यहाँ समाप्त<span className="text-gold-400">।</span>
                    </h2>
                    <div className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-[2px] sm:h-[3px] bg-gradient-to-r from-gold-400 to-sky-400 shadow-[0_0_15px_#c1a171] opacity-75 animate-pulse" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Gallery Media Carousel Slider replacing subtitle & paragraph */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-full max-w-xl relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/25 aspect-video group select-none mb-2"
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={galleryItems[slideIndex]?.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                {galleryItems[slideIndex]?.videoUrl ? (
                  <video
                    key={galleryItems[slideIndex]?.id + "-vid"}
                    src={galleryItems[slideIndex]?.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                ) : (
                  <img
                    key={galleryItems[slideIndex]?.id + "-img"}
                    src={galleryItems[slideIndex]?.imageUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />

            {/* Slide Metadata text overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-left space-y-0.5 pointer-events-none z-20">
              <span className="px-1.5 py-0.5 rounded bg-gold-400/20 border border-gold-400/30 text-gold-300 font-mono text-[8px] uppercase tracking-widest font-semibold inline-block">
                {galleryItems[slideIndex]?.badge || "Surgical Record"}
              </span>
              <h4 className="text-white font-display font-bold text-sm sm:text-base truncate">
                {galleryItems[slideIndex]?.title}
              </h4>
            </div>

            {/* Left / Right Chevron Nav Controls */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => setSlideIndex((prev) => (prev > 0 ? prev - 1 : galleryItems.length - 1))}
                className="w-8 h-8 rounded-full glassmorphism border border-white/10 text-white hover:border-gold-400 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSlideIndex((prev) => (prev < galleryItems.length - 1 ? prev + 1 : 0))}
                className="w-8 h-8 rounded-full glassmorphism border border-white/10 text-white hover:border-gold-400 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Pagination dots */}
            <div className="absolute bottom-4 right-4 flex gap-1 z-20">
              {galleryItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSlideIndex(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${idx === slideIndex ? "bg-gold-400 w-3" : "bg-white/30 hover:bg-white/50"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <BilingualText
            english="Advanced Endoscopic Spine Care"
            hindi="उन्नत एंडोस्कोपिक स्पाइन केयर"
            isEnglish={isEnglish}
          />

          {/* Highly authoritative informative paragraph */}
          <div className="grid grid-cols-1 grid-rows-1 justify-items-start items-start w-full min-h-[6.5rem] sm:min-h-[5.5rem] md:min-h-[4.5rem]">
            <AnimatePresence mode="wait">
              {isEnglish ? (
                <motion.p
                  key="en-desc"
                  variants={textTransitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="col-start-1 row-start-1 text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl font-sans text-left"
                >
                  Experience a new era of monoportal endoscopic spine surgery. Utilizing state-of-the-art <strong>FESS (Full Monoportal Endoscopic Spine Surgery)</strong>, Dr. Dheeraj Vishwakarma performs advanced, single-stitch <strong>&lt;8mm keyhole procedures</strong> to relieve severe sciatica, slip discs, and stenosis—sparing muscles, minimizing blood loss, and restoring instant independent motility.
                </motion.p>
              ) : (
                <motion.p
                  key="hi-desc"
                  variants={textTransitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="col-start-1 row-start-1 text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl font-sans text-left"
                >
                  मोनोपोर्टल एंडोस्कोपिक स्पाइन सर्जरी के नए युग का अनुभव करें। अत्याधुनिक <strong>FESS (फुल मोनोपोर्टल एंडोस्कोपिक स्पाइन सर्जरी)</strong> का उपयोग करते हुए, डॉ. धीरज विश्वकर्मा गंभीर साइटिका, स्लिप डिस्क और स्टेनोसिस से राहत देने के लिए उन्नत, सिंगल-स्टिच <strong>&lt;8 मिमी कीहोल ऑपरेशन</strong> करते हैं—जिससे मांसपेशियां सुरक्षित रहती हैं, खून की कमी कम होती है और मरीज उसी दिन चलने लगता है।
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Authority Highlights & Micro Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="grid grid-cols-3 gap-6 border-t border-b border-white/5 py-4 w-full max-w-lg text-left"
          >
            {/* Stat 1: Incision Size */}
            <div className="flex flex-col text-left">
              <div className="grid grid-cols-1 grid-rows-1 items-start h-4">
                <AnimatePresence mode="wait">
                  {isEnglish ? (
                    <motion.p
                      key="inc-size-en"
                      variants={textTransitionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="col-start-1 row-start-1 font-mono text-[10px] text-gray-500 uppercase tracking-widest text-left"
                    >
                      Incision Size
                    </motion.p>
                  ) : (
                    <motion.p
                      key="inc-size-hi"
                      variants={textTransitionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="col-start-1 row-start-1 font-mono text-[10px] text-gray-500 uppercase tracking-widest text-left"
                    >
                      चीरे का आकार
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="grid grid-cols-1 grid-rows-1 items-start h-7 mt-0.5">
                <AnimatePresence mode="wait">
                  {isEnglish ? (
                    <motion.p
                      key="inc-keyhole-en"
                      variants={textTransitionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="col-start-1 row-start-1 font-display font-bold text-sm sm:text-base md:text-lg text-white text-left"
                    >
                      &lt; 8mm Keyhole
                    </motion.p>
                  ) : (
                    <motion.p
                      key="inc-keyhole-hi"
                      variants={textTransitionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="col-start-1 row-start-1 font-display font-bold text-sm sm:text-base md:text-lg text-white text-left"
                    >
                      &lt; 8 मिमी चीरा
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Stat 2: Surgical Closure */}
            <div className="flex flex-col text-left">
              <div className="grid grid-cols-1 grid-rows-1 items-start h-4">
                <AnimatePresence mode="wait">
                  {isEnglish ? (
                    <motion.p
                      key="closure-label-en"
                      variants={textTransitionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="col-start-1 row-start-1 font-mono text-[10px] text-gray-500 uppercase tracking-widest text-left"
                    >
                      Surgical Closure
                    </motion.p>
                  ) : (
                    <motion.p
                      key="closure-label-hi"
                      variants={textTransitionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="col-start-1 row-start-1 font-mono text-[10px] text-gray-500 uppercase tracking-widest text-left"
                    >
                      टांके का प्रकार
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="grid grid-cols-1 grid-rows-1 items-start h-7 mt-0.5">
                <AnimatePresence mode="wait">
                  {isEnglish ? (
                    <motion.p
                      key="closure-val-en"
                      variants={textTransitionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="col-start-1 row-start-1 font-display font-bold text-sm sm:text-base md:text-lg text-gold-300 text-left"
                    >
                      Single Stitch
                    </motion.p>
                  ) : (
                    <motion.p
                      key="closure-val-hi"
                      variants={textTransitionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="col-start-1 row-start-1 font-display font-bold text-sm sm:text-base md:text-lg text-gold-300 text-left"
                    >
                      सिर्फ एक टांका
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Stat 3: Recovery Speed */}
            <div className="flex flex-col text-left">
              <div className="grid grid-cols-1 grid-rows-1 items-start h-4">
                <AnimatePresence mode="wait">
                  {isEnglish ? (
                    <motion.p
                      key="speed-label-en"
                      variants={textTransitionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="col-start-1 row-start-1 font-mono text-[10px] text-gray-500 uppercase tracking-widest text-left"
                    >
                      RECOVERY SPEED
                    </motion.p>
                  ) : (
                    <motion.p
                      key="speed-label-hi"
                      variants={textTransitionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="col-start-1 row-start-1 font-mono text-[10px] text-gray-500 uppercase tracking-widest text-left"
                    >
                      स्वस्थ होने की गति
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="grid grid-cols-1 grid-rows-1 items-start h-7 mt-0.5">
                <AnimatePresence mode="wait">
                  {isEnglish ? (
                    <motion.p
                      key="speed-val-en"
                      variants={textTransitionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="col-start-1 row-start-1 font-display font-bold text-sm sm:text-base md:text-lg text-sky-400 text-left"
                    >
                      Same Day Discharge
                    </motion.p>
                  ) : (
                    <motion.p
                      key="speed-val-hi"
                      variants={textTransitionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="col-start-1 row-start-1 font-display font-bold text-sm sm:text-base md:text-lg text-sky-400 text-left"
                    >
                      उसी दिन छुट्टी
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Luxury CTA Interaction buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4 pt-2 w-full justify-start"
          >
            {/* Primary Booking Consult */}
            <button
              id="hero-cta-consult"
              onClick={onOpenBooking}
              className="bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-black px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(193,161,113,0.3)] hover:scale-105 cursor-pointer flex items-center justify-start gap-2"
            >
              <span>Book Appointment</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </button>

            {/* Secondary Watching Procedure anchor */}
            <button
              id="hero-cta-explore"
              onClick={onExploreScience}
              className="glassmorphism hover:bg-white/5 text-white px-7 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all hover:scale-105 cursor-pointer flex items-center justify-start gap-2"
            >
              <Play className="w-3.5 h-3.5 text-sky-400 fill-sky-400/20" />
              <span>Explore Treatments</span>
            </button>

            {/* Play Cinematic Procedure Video button */}
            <button
              onClick={onPlayVideo}
              className="border border-gold-400/30 bg-gold-400/5 hover:bg-gold-400/15 text-gold-400 hover:text-white hover:border-gold-300 px-7 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all hover:scale-105 shadow-[0_0_20px_rgba(193,161,113,0.1)] cursor-pointer flex items-center justify-start gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-gold-400/10" />
              <span>Play Cinematic Video</span>
            </button>
          </motion.div>

          {/* Trust assurances footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex items-center flex-wrap gap-2.5 text-[10px] text-gray-500 pt-1 font-mono text-left select-none"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="uppercase">BOARD-VERIFIED SPINE ENDOSCOPY SPECIALIST & M.CH NEUROSURGEON</span>
            <span className="text-gray-700">|</span>
            <button
              onClick={onNavigateAbout}
              className="text-gold-400 hover:text-gold-300 font-bold uppercase underline cursor-pointer pointer-events-auto bg-transparent border-none p-0 inline-flex"
            >
              M.Ch Academic Resume & Credentials →
            </button>
          </motion.div>

        </div>

        {/* Right column removed - layout unified */}

      </div>
    </section>
  );
}

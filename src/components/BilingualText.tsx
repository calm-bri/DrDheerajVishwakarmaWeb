import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

interface BilingualTextProps {
  english: string;
  hindi: string;
  interval?: number;
  isEnglish?: boolean;
}

export default function BilingualText({ english, hindi, interval = 4500, isEnglish: controlledIsEnglish }: BilingualTextProps) {
  const [internalIsEnglish, setInternalIsEnglish] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  const isEnglish = controlledIsEnglish !== undefined ? controlledIsEnglish : internalIsEnglish;

  useEffect(() => {
    if (controlledIsEnglish !== undefined) return;
    const timer = setInterval(() => {
      setInternalIsEnglish((prev) => !prev);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, controlledIsEnglish]);

  // Premium transition values: Fade + Subtle Blur + Small Vertical Movement
  const variants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 8,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(4px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Custom premium easeOutExpo
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -8,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(4px)",
      transition: {
        duration: 0.5,
        ease: [0.7, 0, 0.84, 0], // Custom premium easeIn
      },
    },
  };

  return (
    <div className="w-full text-left py-1 select-none">
      {/* Accessibility & SEO Frame: Hidden visually, readable by screen readers & search engines */}
      <span className="sr-only">
        {english} / {hindi}
      </span>

      {/* Interactive Cinematic Container: Hidden from assistive tech to avoid repetitive voice announcements */}
      <div 
        className="grid grid-cols-1 grid-rows-1 items-center justify-items-start"
        aria-hidden="true"
      >
        <AnimatePresence mode="wait">
          {isEnglish ? (
            <motion.span
              key="english-text"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="col-start-1 row-start-1 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-gold-300 bg-gradient-to-r from-gold-300 via-gold-400 to-sky-300 bg-clip-text text-transparent text-glow-gold"
            >
              {english}
            </motion.span>
          ) : (
            <motion.span
              key="hindi-text"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="col-start-1 row-start-1 font-sans text-xs sm:text-sm tracking-wide font-medium text-sky-300 bg-gradient-to-r from-sky-300 via-sky-400 to-gold-400 bg-clip-text text-transparent text-glow-blue"
            >
              {hindi}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

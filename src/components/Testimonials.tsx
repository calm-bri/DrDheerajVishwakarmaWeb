import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useData } from "../context/DataContext";
import { Quote, Star, ChevronLeft, ChevronRight, User } from "lucide-react";

export default function Testimonials() {
  const { testimonials } = useData();
  const [activeIdx, setActiveIdx] = useState(0);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  // Ensure activeIdx is in bounds if length changes
  const safeIdx = activeIdx >= testimonials.length ? 0 : activeIdx;
  const current = testimonials[safeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="testimonials-section"
      className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-white/5 overflow-hidden"
    >
      {/* Background Soft Gold Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gold-glow opacity-15 blur-3xl rounded-full pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-lg mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-gold-400 font-semibold">
            ESTABLISHED QUALITY REVIEWS
          </span>
          <h3 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight">
            Restored Lives, Shared Voices<span className="text-gold-400">.</span>
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm font-sans leading-relaxed">
            Read clinical critiques and recovery testimonials written directly by other healthcare professionals and international patients after our keyhole spinal releases.
          </p>
        </div>

        {/* Cinematic Slide Frame */}
        <div className="relative min-h-[320px] flex items-center justify-center p-6 sm:p-8 rounded-3xl glassmorphism border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          <div className="absolute top-6 left-6 text-white/5 pointer-events-none">
            <Quote className="w-20 h-20 fill-white/5 stroke-none" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 text-left relative z-10"
            >
              {/* Star Rating & Treatment Area */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <div className="px-3 py-1 rounded-full bg-sky-400/5 text-sky-450 border border-sky-400/10 text-[9px] font-mono uppercase font-bold tracking-wider">
                  Condition: {current.condition}
                </div>
              </div>

              {/* Giant Text Quote */}
              <p className="font-display text-base sm:text-xl md:text-2xl text-gray-100 font-medium leading-relaxed tracking-wide italic">
                "{current.quote}"
              </p>

              {/* Patient Identifier Column */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold-400 text-sm">
                    <User className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <h5 className="font-display font-semibold text-white text-sm">
                      {(() => {
                        const name = current.name;
                        if (name.includes("Colonel") || name.includes("Col.")) {
                          return "Verified Patient (Retd. Army Colonel)";
                        }
                        if (name.includes("Dr. Sunil") || name.includes("Maheshwari")) {
                          return "Verified Medical Colleague (Pediatrician)";
                        }
                        if (name.includes("Amara")) {
                          return "Verified Patient (Overseas Resident)";
                        }
                        if (name.includes("Manoj Kumar")) {
                          return "Verified Patient (M.K.S.)";
                        }
                        if (name.includes("Preeti")) {
                          return "Verified Patient (P.V.)";
                        }
                        if (name.includes("Rajesh")) {
                          return "Verified Patient (R.K.G.)";
                        }
                        return "Verified Patient";
                      })()}
                    </h5>
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{current.location}</p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">RECOVERY MILESTONE:</span>
                  <span className="font-sans font-bold text-xs text-emerald-400 block mt-0.5">{current.recoverySummary}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Absolute Navigation Nodes */}
          <div className="absolute right-6 -bottom-6 flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full bg-cosmic-card hover:bg-gold-400 hover:text-black border border-white/10 text-gold-300 flex items-center justify-center transition-all cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-cosmic-card hover:bg-gold-400 hover:text-black border border-white/10 text-gold-300 flex items-center justify-center transition-all cursor-pointer shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic page indicator dots represent precision medicine */}
        <div className="flex justify-center gap-2 pt-3">
          {testimonials.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setActiveIdx(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                safeIdx === idx ? "w-8 bg-gold-400" : "w-2 bg-white/10 hover:bg-white/20"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

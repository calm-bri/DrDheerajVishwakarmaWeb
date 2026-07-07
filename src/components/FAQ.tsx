import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useData } from "../context/DataContext";
import { HelpCircle, ChevronDown, Sparkles, PhoneCall } from "lucide-react";

export default function FAQ() {
  const { faqs } = useData();
  const [expandedFAQId, setExpandedFAQId] = useState<string | null>("faq-1");

  const toggleFAQGroup = (id: string) => {
    setExpandedFAQId(expandedFAQId === id ? null : id);
  };

  return (
    <section
      id="faq-section"
      className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-white/5"
    >
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-radial-glow opacity-15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto relative z-10 space-y-12">
        
        {/* Section Title */}
        <div className="text-center space-y-2 max-w-xl mx-auto text-left sm:text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-400/20 bg-gold-400/5 text-gold-300">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-medium">ANSWERING CLINICAL CONCERNS</span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight">
            Consultation Q&A Science<span className="text-gold-400">.</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-sans leading-relaxed">
            Unravel details on clinical recovery rates, localized anesthesia configurations, keyhole incisions sizes, and what travel protocols international patients should follow below.
          </p>
        </div>

        {/* Accordions Column */}
        <div className="space-y-3.5">
          {faqs.map((item) => {
            const isExpanded = expandedFAQId === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 text-left overflow-hidden ${
                  isExpanded
                    ? "bg-cosmic-card border-gold-400/35"
                    : "glassmorphism bg-white/2 hover:bg-white/4 hover:border-white/15"
                }`}
              >
                {/* Accordion header button click */}
                <button
                  type="button"
                  onClick={() => toggleFAQGroup(item.id)}
                  className="w-full px-5 sm:px-6 py-4.5 flex items-center justify-between gap-4 text-left outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isExpanded ? "text-gold-400" : "text-gray-500"}`} />
                    <span className="font-display font-medium text-sm sm:text-base text-gray-100 font-sans leading-snug">
                      {item.question}
                    </span>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-transform duration-300 ${
                      isExpanded ? "rotate-180 text-gold-400 border-gold-400/20 bg-gold-400/5" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Smooth expanded height reveal */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-1.5 border-t border-white/5 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans max-w-3xl pl-12 sm:pl-14">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Quick query footer card */}
        <div className="p-5 rounded-2xl glassmorphism border-sky-400/10 bg-radial-glow/5 max-w-2xl mx-auto text-center space-y-3.5">
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Don't see your specific spinal query listed? Tele-screening and scan triage channels operate 24/7. Address reports directly to our clinical assistance desk in India.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-gray-500">
              OR TALK LIVE ON CLINICAL WHATSAPP:
            </span>
            <a
              href="tel:+918999898129"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/15 text-[10px] font-mono text-emerald-400 font-bold uppercase hover:bg-emerald-500/20 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>+91 89998 98129</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

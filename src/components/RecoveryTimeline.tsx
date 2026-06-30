import { useState } from "react";
import { motion } from "motion/react";
import { recoverySteps } from "../data";
import { Clock, Footprints, Home, Laptop, Zap, CheckCircle2, Award } from "lucide-react";

export default function RecoveryTimeline() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const iconMap: Record<string, any> = {
    Activity: Clock,
    Footprints: Footprints,
    Home: Home,
    Laptop: Laptop,
    Zap: Zap
  };

  return (
    <section
      id="recovery-section"
      className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-white/5"
    >
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold-glow opacity-20 blur-3xl rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto relative z-10 space-y-16">
        
        {/* Editorial Title Block */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-sky-400/20 bg-sky-400/5 text-sky-300">
            <Award className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] font-medium">RECONSTRUCTED MOBILITY OUTLOOK</span>
          </div>
          <h3 className="font-display font-medium text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            The Keyhole Recovery Timeline<span className="text-gold-400">.</span>
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto font-sans">
            By avoiding large surgical open cuts and protecting delicate paraspinal muscle connections, our micro-portal recoveries follow a swift, highly reliable physiological path.
          </p>
        </div>

        {/* Dynamic Timeline Layout */}
        <div className="relative border-l border-white/10 md:border-l-0 md:flex md:justify-between md:items-start gap-4 pt-8 md:before:absolute md:before:top-[125px] md:before:left-4 md:before:right-4 md:before:h-[1px] md:before:bg-white/10 md:before:z-0">
          
          {recoverySteps.map((step, idx) => {
            const IconComp = iconMap[step.iconName] || Clock;
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative pl-8 md:pl-0 md:pt-16 md:flex-1 text-left md:text-center pb-12 md:pb-0 group transition-all duration-300"
              >
                {/* Timeline dot / icon bubble */}
                <div
                  className={`absolute -left-4 md:left-1/2 md:-translate-x-1/2 top-1.5 md:top-6 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
                    isHovered
                      ? "bg-gold-400 text-black scale-110 shadow-[0_0_15px_rgba(193,161,113,0.5)] border-gold-400"
                      : "bg-cosmic-card border border-white/10 text-gold-300"
                  }`}
                >
                  <IconComp className="w-4.5 h-4.5 group-hover:animate-pulse" />
                </div>

                {/* Card Container holding milestones details */}
                <div className={`transition-all duration-300 rounded-xl p-5 md:mt-2 text-left ${
                  isHovered 
                    ? "bg-white/2 border border-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.4)] translate-y-[-4px]" 
                    : "bg-transparent border border-transparent"
                }`}>
                  {/* Step Day / Hour */}
                  <span className="font-mono text-[10px] text-sky-400 font-bold tracking-widest uppercase block mb-1">
                    {step.day}
                  </span>

                  {/* Title */}
                  <h4 className="font-display font-medium text-sm text-white group-hover:text-gold-300 transition-colors mb-1.5">
                    {step.title}
                  </h4>

                  {/* Body Copy */}
                  <p className="text-gray-400 text-xs leading-relaxed font-sans mb-3 min-h-[48px]">
                    {step.description}
                  </p>

                  {/* Target Success metric bar */}
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-[9px] font-mono text-emerald-400 uppercase font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{step.milestone}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits Comparison Bento Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          {[
            {
              metric: "< 8mm",
              title: "Smaller Incisions",
              desc: "Traditional surgeries require cuts of 100mm. Our endoscopic portal fits in a mini 8mm slot, requiring no traumatic muscle tearing."
            },
            {
              metric: "0% Screws",
              title: "Motion Preservation",
              desc: "Instead of rigid metal rods that permanently lock your joints, we relieve targeted core nerve compression, leaving 95% of natural discs untouched."
            },
            {
              metric: "4-6 Hours",
              title: "Rapid Independent Walking",
              desc: "Because paraspinous structures remain fully functional, patients safely stand, walk, and use recovery rooms comfortably the same afternoon."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl glassmorphism text-left space-y-3 hover:border-gold-400/30 transition-colors">
              <span className="font-display font-bold text-3xl text-gold-400 block tracking-tight">
                {item.metric}
              </span>
              <h5 className="font-display font-medium text-sm text-white">{item.title}</h5>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

import React from "react";
import { motion } from "motion/react";
import { Clock, Footprints, Home, Laptop, Zap, ArrowRight, ArrowDown } from "lucide-react";

export default function RecoveryTimeline() {
  const steps = [
    {
      id: 1,
      time: "HOUR 0-2",
      title: "Keyhole Decompression",
      description: "Immediate pain relief",
      icon: Clock,
      color: "text-sky-400",
      borderColor: "border-sky-500/20",
      bgColor: "bg-sky-500/5",
      iconBg: "bg-sky-400/10"
    },
    {
      id: 2,
      time: "HOUR 4",
      title: "First Steps",
      description: "Walk on your own",
      icon: Footprints,
      color: "text-teal-400",
      borderColor: "border-teal-500/20",
      bgColor: "bg-teal-500/5",
      iconBg: "bg-teal-400/10"
    },
    {
      id: 3,
      time: "DAY 1",
      title: "Go Home",
      description: "Discharge & simple home care",
      icon: Home,
      color: "text-emerald-400",
      borderColor: "border-emerald-500/20",
      bgColor: "bg-emerald-500/5",
      iconBg: "bg-emerald-400/10"
    },
    {
      id: 4,
      time: "DAY 5-7",
      title: "Desk Work Resumes",
      description: "Light work & screen time",
      icon: Laptop,
      color: "text-indigo-400",
      borderColor: "border-indigo-500/20",
      bgColor: "bg-indigo-500/5",
      iconBg: "bg-indigo-400/10"
    },
    {
      id: 5,
      time: "WEEK 4",
      title: "Full Activity",
      description: "Exercise & daily freedom",
      icon: Zap,
      color: "text-lime-400",
      borderColor: "border-lime-500/20",
      bgColor: "bg-lime-500/5",
      iconBg: "bg-lime-400/10"
    }
  ];

  return (
    <section
      id="recovery-section"
      className="relative py-20 px-4 sm:px-6 md:px-8 border-t border-white/5 bg-cosmic-bg overflow-hidden"
    >
      {/* Background Video Loop */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-contain opacity-75"
        >
          <source
            src="https://iplsqsfgnmomqqhnvydz.supabase.co/storage/v1/object/public/Video/eb53d874-f09e-4297-828b-474675034725.mp4"
            type="video/mp4"
          />
        </video>
        {/* Cinematic radial & linear darkness gradients to protect text contrast and blend edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-cosmic-bg via-transparent to-cosmic-bg opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#030509_90%)] opacity-85" />
      </div>

      <div className="w-full max-w-5xl mx-auto relative z-10 space-y-12">
        
        {/* Header Title block matching the reference image */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-widest uppercase select-none">
            Recovery Flow
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-sans">
            Simple Daily Progression
          </p>
        </div>

        {/* Timeline Progression Row (Mobile: Vertical Stack, Desktop: Horizontal Row) */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-stretch gap-4 lg:gap-0 w-full">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <React.Fragment key={step.id}>
                {/* Milestone Card */}
                <div className="w-full max-w-sm lg:w-auto lg:flex-1 px-1.5 sm:px-2">
                  <div className={`glassmorphism rounded-2xl border ${step.borderColor} p-6 flex flex-col items-center text-center space-y-4 shadow-xl hover:border-white/20 transition-all duration-300 min-h-[220px] h-full`}>
                    
                    {/* Circle Icon Bubble */}
                    <div className={`w-14 h-14 rounded-full border border-white/10 flex items-center justify-center ${step.iconBg} ${step.color}`}>
                      <IconComp className="w-6 h-6" />
                    </div>

                    {/* Stage Timeline */}
                    <span className={`font-mono text-xs uppercase tracking-wider font-bold ${step.color}`}>
                      {step.time}
                    </span>

                    {/* Text Details */}
                    <div className="space-y-1 select-text">
                      <h3 className="font-display font-bold text-sm sm:text-base text-white">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 text-[11px] sm:text-xs leading-relaxed font-sans">
                        {step.description}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Arrow Connector (between cards) */}
                {idx < steps.length - 1 && (
                  <>
                    {/* Mobile Vertical Arrow */}
                    <div className="flex lg:hidden justify-center items-center text-sky-400 shrink-0 py-2 select-none animate-pulse">
                      <ArrowDown className="w-5 h-5" />
                    </div>
                    {/* Desktop Horizontal Arrow */}
                    <div className="hidden lg:flex justify-center items-center text-sky-400 shrink-0 px-0.5 select-none animate-pulse">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Visual timeline axis line under the cards (Desktop Only) */}
        <div className="hidden lg:block relative max-w-4xl mx-auto mt-8 select-none">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-white/10 -translate-y-1/2" />
          {/* Axis dots */}
          <div className="grid grid-cols-5 justify-items-center">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className="w-3.5 h-3.5 rounded-full bg-gray-600 border-[3px] border-cosmic-bg relative z-10 -translate-y-1" 
              />
            ))}
          </div>
        </div>

        {/* Centered safety badge at the bottom */}
        <div className="flex justify-center pt-4">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-500/10 bg-emerald-500/5 text-emerald-400 text-[11px] font-mono uppercase tracking-[0.2em] font-semibold select-none shadow-[0_0_15px_rgba(16,185,129,0.05)]">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Safe • Fast • Effective</span>
          </div>
        </div>

      </div>
    </section>
  );
}

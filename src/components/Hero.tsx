import { motion } from "motion/react";
import { Star, ShieldCheck, Play, ArrowUpRight } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
  onExploreScience: () => void;
  onNavigateAbout?: () => void;
}

export default function Hero({ onOpenBooking, onExploreScience, onNavigateAbout }: HeroProps) {
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

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden"
    >
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

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Aligned Content Frame */}
        <div className="lg:col-span-8 xl:col-span-7 flex flex-col items-start space-y-6 text-left w-full">
          
          {/* Scientific Medical Credential Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/20 bg-gold-400/5 text-gold-300"
          >
            <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400/20" />
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] font-medium">
              India's Pioneers in Monoportal Endoscopic Spine Surgery
            </span>
          </motion.div>

          {/* Giant Editorial Headline */}
          <motion.div
            variants={titleContainerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-1"
          >
            {/* Strike-through Translucent Row representing relief starting moment */}
            <motion.div
              variants={titleItemVariants}
              className="relative inline-block block"
            >
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white/30 leading-[0.95] select-none text-left">
                SPINE PAIN
              </h1>
              {/* Premium red-rose glowing laser strike to slash out spine pain */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
                className="absolute left-[-5%] right-[-5%] top-[55%] h-[5px] sm:h-[7px] bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 rounded-full shadow-[0_0_20px_#ef4444] rotate-[-2.5deg] origin-left pointer-events-none"
              />
            </motion.div>

            <motion.div
              variants={titleItemVariants}
              className="relative inline-block block"
            >
              <h2 className="font-display text-5xl sm:text-6xl md:text-7.5xl lg:text-8.5xl font-extrabold tracking-tight text-white leading-[0.95] text-left">
                Ends Here<span className="text-gold-400">.</span>
              </h2>
              {/* Premium horizontal glow strike underlay */}
              <div className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-[2px] sm:h-[3px] bg-gradient-to-r from-gold-400 to-sky-400 shadow-[0_0_15px_#c1a171] opacity-75 animate-pulse" />
            </motion.div>
          </motion.div>

          {/* Highly authoritative informative paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl font-sans text-left"
          >
            Experience a new era of monoportal endoscopic spine surgery. Utilizing state-of-the-art <strong>FESS (Full Monoportal Endoscopic Spine Surgery)</strong>, Dr. Dheeraj Vishwakarma performs advanced, single-stitch <strong>&lt;8mm keyhole procedures</strong> to relieve severe sciatica, slip discs, and stenosis—sparing muscles, minimizing blood loss, and restoring instant independent motility.
          </motion.p>

          {/* Authority Highlights & Micro Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="grid grid-cols-3 gap-6 border-t border-b border-white/5 py-4 w-full max-w-lg text-left"
          >
            <div>
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest text-left">Incision Size</p>
              <p className="font-display font-bold text-lg text-white mt-0.5 text-left">&lt; 8mm Keyhole</p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest text-left">Surgical Closure</p>
              <p className="font-display font-bold text-lg text-gold-300 mt-0.5 text-left">Single Stitch</p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest text-left">RECOVERY SPEED</p>
              <p className="font-display font-bold text-lg text-sky-400 mt-0.5 text-left">Same Day Discharge</p>
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
              <span>Inquire for Appointment Scheduling</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </button>

            {/* Secondary Watching Procedure anchor */}
            <button
              id="hero-cta-explore"
              onClick={onExploreScience}
              className="glassmorphism hover:bg-white/5 text-white px-7 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all hover:scale-105 cursor-pointer flex items-center justify-start gap-2"
            >
              <Play className="w-3.5 h-3.5 text-sky-400 fill-sky-400/20" />
              <span>Explore Advanced Science</span>
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

      </div>
    </section>
  );
}

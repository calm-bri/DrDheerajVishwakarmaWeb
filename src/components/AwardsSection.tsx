import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Trophy, 
  Award, 
  Medal, 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Crown, 
  Activity,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

interface SpecialAward {
  id: string;
  category: string;
  title: string;
  by: string;
  year: string;
  location: string;
  achievementLevel: string;
  summary: string;
  clinicalImpact: string;
  colorTheme: "gold" | "emerald" | "sky" | "amber" | "purple";
  metric: string;
  imageUrl?: string;
}

const PREMIUM_AWARDS: SpecialAward[] = [
  {
    id: "award-asia-records",
    category: "Continental Record",
    title: "Asia & India Book of Records Holder",
    by: "Asia Book of Records Board",
    year: "2025",
    location: "India (Global Recognition)",
    achievementLevel: "Continental Record",
    summary: "Set a record for treating the youngest patient (an 11-year-old boy) for Cauda Equina Syndrome using a single-stitch 8mm monoportal endoscopic discectomy.",
    clinicalImpact: "Pioneered pediatric monoportal endoscopic discectomy, proving the safety of under-8mm keyhole procedures on children.",
    colorTheme: "gold",
    metric: "Youngest CES Record",
    imageUrl: "/awards-records.jpg"
  },
  {
    id: "award-india-records",
    category: "National Record",
    title: "India Book of Records Holder",
    by: "India Book of Records Board",
    year: "2025",
    location: "India (Global Standard)",
    achievementLevel: "National Record",
    summary: "Pioneered complex cervical and dorsal monoportal endoscopic spine surgeries at an international standard, completing a milestone of 50+ cases.",
    clinicalImpact: "Established international safety and volume standards for complex multi-level (cervical, dorsal, lumbar) monoportal spine surgeries.",
    colorTheme: "amber",
    metric: "Global Pioneer",
    imageUrl: "/awards-records.jpg"
  },
  {
    id: "award-germany-fellowship",
    category: "International & National Fellowships",
    title: "Germany FESS Clinical Training & Asian Spine Fellowship",
    by: "St. Anna Hospital (Germany) & Asian Spine Hospital (Hyd)",
    year: "2024",
    location: "Germany & Hyderabad, India",
    achievementLevel: "Fellowship Certified",
    summary: "Advanced training at St. Anna Hospital, Germany under Prof. Dr. Sebastian Rutten & Prof. Dr. Martin Komp, followed by a MISS/FESS Fellowship under Dr. Sukumar Sura.",
    clinicalImpact: "Integrates European motion-preservation techniques and Indian clinical volume expertise to deliver gold-standard monoportal endoscopic spine surgery.",
    colorTheme: "sky",
    metric: "Global Fellowships"
  },
  {
    id: "award-tysa",
    category: "National Orator Championship",
    title: "Best Orator - Torrent Young Scholar Award (TYSA)",
    by: "National TYSA Neuro-Committee",
    year: "2023",
    location: "Ahmedabad, India",
    achievementLevel: "National Champion",
    summary: "Recognized as the premier surgical orator for exceptional logical precision, clinical case resolution speed, and pediatric/adult neurosurgical decision-making delivery.",
    clinicalImpact: "Validates top-tier diagnostic execution and evidence-based neurosurgical consultation transparency.",
    colorTheme: "emerald",
    metric: "1st Place Winner"
  },
  {
    id: "award-dnacon",
    category: "Clinical Diagnostic Excellence",
    title: "Dual 1st Position - Annual Neuro Quiz & Best Award Paper",
    by: "Delhi Neurological Association (DNACON)",
    year: "2023",
    location: "New Delhi, India",
    achievementLevel: "State Laureate",
    summary: "Conferred with twin first-place honors at DNACON-2023, demonstrating unrivaled neurological quiz accuracy and advanced experimental clinical research paper delivery.",
    clinicalImpact: "Reflects lightning-fast intraoperative pathology detection and critical-care diagnostic accuracy.",
    colorTheme: "purple",
    metric: "Twin Gold Honors"
  },
  {
    id: "award-neurovascon",
    category: "Breakthrough Research",
    title: "Best Scientific Poster Award",
    by: "NEUROVASCON National Assembly",
    year: "2023",
    location: "New Delhi, India",
    achievementLevel: "Academic Milestone",
    summary: "Honored for presenting seminal endovascular research detailing breakthrough stenting and micro-coiling patterns for vascular cerebello-spine malformations.",
    clinicalImpact: "Advances safer vascular access pathways and precision catheter guidance during microsurgery.",
    colorTheme: "sky",
    metric: "Scientific Laureate"
  },
  {
    id: "award-book",
    category: "Academic Contributions",
    title: "Key Author: 'Lumbar Canal Stenosis' Instructional Guide",
    by: "Full Monoportal Endoscopic Spine Surgery Manual",
    year: "2024",
    location: "National Publication",
    achievementLevel: "Textbook Author",
    summary: "Contributed a flagship clinical chapter to 'A Practical Manual on Full Monoportal Endoscopic Spine Surgery', outlining advanced stenosis lateral-recess decompressions.",
    clinicalImpact: "Provides pedagogical frameworks utilized by aspiring spine endoscopic fellows nationwide.",
    colorTheme: "amber",
    metric: "Published Chapter"
  },
  {
    id: "award-gipmer",
    category: "Honored Clinic Pedigree",
    title: "Elite Neurosurgical Lead Award",
    by: "GIPMER Department of Neurosurgery",
    year: "2023",
    location: "New Delhi",
    achievementLevel: "Clinical Lead",
    summary: "Earned clinical distinction for managing high-volume operations (20+ complex skull-base/spine procedures) and over 400 clinic outpatients weekly with outstanding safety records.",
    clinicalImpact: "Guarantees highly optimized patient workflows and clinical system leadership under pressure.",
    colorTheme: "purple",
    metric: "400+ Patients/Wk"
  }
];

export default function AwardsSection() {
  const [selectedAwardId, setSelectedAwardId] = useState<string>("award-asia-records");

  const currentAward = PREMIUM_AWARDS.find(a => a.id === selectedAwardId) || PREMIUM_AWARDS[0];

  const themeClasses = {
    gold: {
      border: "border-gold-400/30 hover:border-gold-400/60",
      glow: "bg-gold-400/10 text-gold-300 shadow-[0_0_20px_rgba(193,161,113,0.15)]",
      badgeText: "text-gold-300 border-gold-400/25 bg-gold-400/5",
      iconColor: "text-gold-400",
      accentBg: "from-gold-500/10 via-transparent to-transparent",
      accentGlow: "bg-gold-400/10",
      progressBg: "bg-gold-400"
    },
    emerald: {
      border: "border-emerald-400/30 hover:border-emerald-400/60",
      glow: "bg-emerald-400/10 text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.15)]",
      badgeText: "text-emerald-300 border-emerald-400/25 bg-emerald-400/5",
      iconColor: "text-emerald-400",
      accentBg: "from-emerald-500/10 via-transparent to-transparent",
      accentGlow: "bg-emerald-400/10",
      progressBg: "bg-emerald-400"
    },
    sky: {
      border: "border-sky-400/30 hover:border-sky-400/60",
      glow: "bg-sky-400/10 text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.15)]",
      badgeText: "text-sky-300 border-sky-400/25 bg-sky-400/5",
      iconColor: "text-sky-400",
      accentBg: "from-sky-500/10 via-transparent to-transparent",
      accentGlow: "bg-sky-400/10",
      progressBg: "bg-sky-400"
    },
    amber: {
      border: "border-amber-400/30 hover:border-amber-400/60",
      glow: "bg-amber-400/10 text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.15)]",
      badgeText: "text-amber-300 border-amber-400/25 bg-amber-400/5",
      iconColor: "text-amber-400",
      accentBg: "from-amber-500/10 via-transparent to-transparent",
      accentGlow: "bg-amber-400/10",
      progressBg: "bg-amber-400"
    },
    purple: {
      border: "border-purple-400/30 hover:border-purple-400/60",
      glow: "bg-purple-400/10 text-purple-300 shadow-[0_0_20px_rgba(192,132,252,0.15)]",
      badgeText: "text-purple-300 border-purple-400/25 bg-purple-400/5",
      iconColor: "text-purple-400",
      accentBg: "from-purple-500/10 via-transparent to-transparent",
      accentGlow: "bg-purple-400/10",
      progressBg: "bg-purple-400"
    }
  };

  const currentTheme = themeClasses[currentAward.colorTheme];

  const getAwardIcon = (id: string, themeClass: string) => {
    switch (id) {
      case "award-tysa":
        return <Trophy className={`w-7 h-7 ${themeClass}`} />;
      case "award-dnacon":
        return <Crown className={`w-7 h-7 ${themeClass}`} />;
      case "award-neurovascon":
        return <Award className={`w-7 h-7 ${themeClass}`} />;
      case "award-book":
        return <BookOpen className={`w-7 h-7 ${themeClass}`} />;
      case "award-gipmer":
        return <GraduationCap className={`w-7 h-7 ${themeClass}`} />;
      default:
        return <Medal className={`w-7 h-7 ${themeClass}`} />;
    }
  };

  return (
    <section
      id="credentials-section"
      className="relative py-28 px-4 sm:px-6 md:px-8 border-t border-white/5 bg-gradient-to-b from-[#050811] via-cosmic-bg to-cosmic-bg overflow-hidden"
    >
      <div className="absolute top-1/3 left-[5%] w-[400px] h-[300px] bg-sky-500/5 opacity-20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-[5%] w-[450px] h-[300px] bg-gold-glow opacity-5 blur-3xl rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto relative z-10 space-y-16">
        
        {/* Heading row */}
        <div className="max-w-xl text-left space-y-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-gold-400" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold-300 font-semibold">
              PIONEERING MONOPORTAL ENDOSCOPIC SPINE SURGERY
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-none">
            Laureate Credentials & <span className="text-gold-400">Award Milestones</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-sans leading-relaxed">
            Discover record-breaking milestones, advanced international fellowships, and textbook contributions validating Dr. Dheeraj Vishwakarma's pioneering spine endoscopy expertise and surgical leadership.
          </p>
        </div>

        {/* Dynamic Bento Box Grid with badgies and details view */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Badge grid selectors: Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest text-left pb-1 border-b border-white/5">
              Select Award Seals to inspect
            </div>
            
            <div className="space-y-3.5">
              {PREMIUM_AWARDS.map((award) => {
                const isActive = selectedAwardId === award.id;
                const activeTheme = themeClasses[award.colorTheme];

                return (
                  <button
                    key={award.id}
                    onClick={() => setSelectedAwardId(award.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group flex items-center justify-between ${
                      isActive 
                        ? `${activeTheme.border} bg-white/[0.03] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]` 
                        : "border-white/5 bg-transparent hover:bg-white/[0.01]"
                    }`}
                    id={`badge-select-${award.id}`}
                  >
                    {/* Glowing highlight line on active */}
                    {isActive && (
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${activeTheme.progressBg}`} />
                    )}

                    <div className="flex items-center gap-4">
                      {/* Graphics Ring Shield Seal */}
                      <div className={`w-12 h-12 rounded-full shrink-0 border flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? `border-gold-400/40 ${activeTheme.glow}` 
                          : "border-white/10 bg-white/5 group-hover:border-white/20 text-gray-400 group-hover:text-white"
                      }`}>
                        {/* Laurel inner wreath simulation */}
                        <div className="absolute inset-0.5 rounded-full border border-dashed border-white/5 pointer-events-none opacity-40" />
                        <div className="scale-75">
                          {getAwardIcon(award.id, isActive ? activeTheme.iconColor : "text-gray-400")}
                        </div>
                      </div>

                      {/* Brief Title */}
                      <div className="space-y-0.5 max-w-[210px] xs:max-w-[290px] md:max-w-[340px]">
                        <span className="font-mono text-[8px] uppercase tracking-widest text-gray-500 block">
                          {award.category}
                        </span>
                        <h4 className={`font-display font-bold text-xs leading-snug transition-colors ${
                          isActive ? "text-white" : "text-gray-400 group-hover:text-gray-200"
                        }`}>
                          {award.title}
                        </h4>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                      isActive ? `${activeTheme.iconColor} translate-x-1` : "text-gray-600 group-hover:text-gray-400"
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Micro clinical validation metrics row */}
            <div className="p-4 rounded-2xl bg-white/2 border border-white/5 flex items-center justify-between font-mono text-[10px] text-gray-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Credentials</span>
              </div>
              <span className="text-gold-400">Updated for 2026</span>
            </div>
          </div>

          {/* Interactive Credential Detail Board: Right Column */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedAwardId}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full rounded-3xl border border-white/5 glassmorphism flex flex-col justify-between overflow-hidden relative"
              >
                {/* Radial gold-dust top corner accent lights */}
                <div className={`absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-20 ${currentTheme.accentGlow}`} />

                {/* Top Title Bar */}
                <div className="p-6 sm:p-8 space-y-6 text-left flex-1 flex flex-col justify-between">
                  
                  <div className="space-y-6">
                    {/* Category level and year badges */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <span className="font-mono text-[9px] text-gray-400 tracking-[0.2em] uppercase">
                        {currentAward.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-sky-400 bg-sky-500/10 border border-sky-400/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                          {currentAward.year}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Big Award Title */}
                      <div className="space-y-1.5">
                        <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white leading-tight">
                          {currentAward.title}
                        </h3>
                        <p className="text-xs text-gold-300 font-mono">
                          by {currentAward.by}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className={`text-[10px] font-semibold border px-2.5 py-0.5 rounded-full ${currentTheme.badgeText}`}>
                          ★ {currentAward.achievementLevel}
                        </span>
                        <span className="text-[10px] font-semibold bg-white/5 border border-white/10 text-white px-2.5 py-0.5 rounded-full">
                          🏆 {currentAward.metric}
                        </span>
                      </div>

                      {/* Paragraph summaries */}
                      <div className="space-y-4 pt-2">
                        <div>
                          <p className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-1.5">Surgical Detail & Context</p>
                          <p className="text-gray-300 text-xs sm:text-sm font-sans leading-relaxed">
                            {currentAward.summary}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl border border-white/5 bg-gradient-to-r from-white/[0.01] to-transparent space-y-1.5">
                          <div className="flex items-center gap-2 text-gold-400">
                            <Activity className="w-3.5 h-3.5 text-gold-400" />
                            <p className="text-[10px] font-mono uppercase tracking-wider font-bold">Clinical Precision & Patient Outcomes</p>
                          </div>
                          <p className="text-[11.5px] text-gray-400 leading-relaxed font-sans">
                            {currentAward.clinicalImpact}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {currentAward.imageUrl && (
                    <div className="mt-4 flex-1 w-full min-h-[220px] max-h-[380px] relative rounded-2xl overflow-hidden border border-white/10 group shadow-lg">
                      <img
                        src={currentAward.imageUrl}
                        alt={currentAward.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                </div>

                {/* Bottom Audit Footer */}
                <div className="p-5 border-t border-white/5 bg-white/[0.015] flex flex-wrap gap-4 items-center justify-between text-left">
                  <div className="flex items-center gap-2 text-[11px] text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>Conferred at: <strong>{currentAward.location}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono uppercase tracking-wider">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Validated Clinical Milestone</span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

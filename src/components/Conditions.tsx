import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useData } from "../context/DataContext";
import { Eye, Zap, Shield, Activity, Layers, Compass, ArrowRight, Sparkles, AlertCircle, CalendarRange } from "lucide-react";

interface ConditionsProps {
  onOpenBooking: (preferredTreatmentId?: string) => void;
}

export default function Conditions({ onOpenBooking }: ConditionsProps) {
  const { conditions } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const iconMap: Record<string, any> = {
    Eye: Eye,
    Zap: Zap,
    Shield: Shield,
    Activity: Activity,
    Layers: Layers,
    Compass: Compass
  };

  const slugMap: Record<string, string> = {
    fess: "endoscopic-spine-surgery",
    monoportal: "spinal-stenosis",
    miss: "minimally-invasive-spine-surgery",
    sciatica: "sciatica-treatment",
    slipdisc: "slip-disc-treatment",
    "cervical-lumbar": "cervical-disc-treatment"
  };

  const imageMap: Record<string, string> = {
    fess: "/images/treatments/endoscopic-spine-surgery.jpg",
    monoportal: "/images/treatments/spinal-stenosis.jpg",
    miss: "/images/treatments/minimally-invasive-spine-surgery.jpg",
    sciatica: "/images/treatments/sciatica-treatment.jpg",
    slipdisc: "/images/treatments/slip-disc-treatment.jpg",
    "cervical-lumbar": "/images/treatments/cervical-disc-treatment.jpg"
  };

  return (
    <section
      id="treatments-section"
      className="relative py-20 px-4 sm:px-6 md:px-8 border-t border-white/5 bg-navy-950/40"
    >
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-radial-glow opacity-25 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Section Heading Editorial Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl text-left">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold-300 font-semibold">
                SPINAL NERVE PATHWAY DECOMPRESSION
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Advanced Clinical Specialties<span className="text-gold-400">.</span>
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans">
              Dr. Dheeraj Vishwakarma specializes in keyhole procedures that spare the paraspinous muscles, offering world-class comfort, fast-tracked mobility, and anatomical preservation.
            </p>
          </div>

          {/* Quick interactive category filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Interventions" },
              { id: "endoscopic", label: "Full Endoscopic" },
              { id: "sciatica", label: "Sciatica & Pain" },
              { id: "cervical", label: "Cervical & Lumbar" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-gold-400 text-black font-bold shadow-md"
                    : "bg-navy-900 hover:bg-navy-850 text-gray-300 border border-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid with High-Quality Medical Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conditions
            .filter((item) => {
              if (selectedCategory === "all") return true;
              if (selectedCategory === "endoscopic") return item.id === "fess" || item.id === "monoportal" || item.id === "miss";
              if (selectedCategory === "sciatica") return item.id === "sciatica" || item.id === "slipdisc";
              if (selectedCategory === "cervical") return item.id === "cervical-lumbar" || item.id === "slipdisc";
              return true;
            })
            .map((item, index) => {
              const IconComp = iconMap[item.iconName] || Zap;
              const treatmentSlug = slugMap[item.id] || "endoscopic-spine-surgery";
              const treatmentImg = imageMap[item.id] || "/images/treatments/endoscopic-spine-surgery.jpg";

              return (
                <motion.div
                  id={`treatment-card-${item.id}`}
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="group relative flex flex-col justify-between rounded-2xl bg-navy-900/70 hover:bg-navy-850 border border-white/10 hover:border-gold-400/40 hover:-translate-y-1 hover:shadow-2xl duration-300 overflow-hidden text-left"
                >
                  <div>
                    {/* Visual Anatomical Image Header */}
                    <div className="relative aspect-video w-full overflow-hidden bg-navy-950">
                      <img
                        src={treatmentImg}
                        alt={`${item.name} medical illustration`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-navy-950/85 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 font-mono text-[9px] text-gold-300 font-bold uppercase tracking-wider">
                        {item.treatmentMetric}
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 space-y-3.5">
                      {/* Pathology Header */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <IconComp className="w-4 h-4 text-gold-400" />
                          <span className="font-mono text-[9px] uppercase tracking-wider text-sky-400 font-semibold">
                            Specialized Procedure
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-lg text-white group-hover:text-gold-300 transition-colors leading-snug">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans line-clamp-3">
                          {item.shortDescription}
                        </p>
                      </div>

                      {/* Common target symptoms indicators */}
                      <div className="space-y-1.5 pt-2 border-t border-white/5">
                        <p className="text-[9px] font-mono font-medium text-gray-400 uppercase tracking-widest flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-gold-400/80" />
                          Common Indications
                        </p>
                        <ul className="grid grid-cols-1 gap-1">
                          {item.symptoms.slice(0, 3).map((s, si) => (
                            <li key={si} className="text-[11px] text-gray-300 flex items-center gap-2 font-sans truncate">
                              <span className="w-1 h-1 rounded-full bg-gold-400 shrink-0" />
                              <span className="truncate">{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Core CTAs footer row */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-white/5 flex items-center justify-between gap-3 mt-2 text-[10px] font-mono tracking-wider uppercase">
                    <Link
                      to={`/treatments/${treatmentSlug}`}
                      className="font-bold text-gold-400 hover:text-white flex items-center gap-1 group/btn transition-colors cursor-pointer"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 duration-200 text-gold-400" />
                    </Link>

                    <button
                      onClick={() => onOpenBooking(item.id)}
                      className="cursor-pointer font-bold bg-gold-400/10 hover:bg-gold-400 text-gold-300 hover:text-black border border-gold-400/30 px-3 py-1 rounded-full transition-all"
                    >
                      Book Consult
                    </button>
                  </div>
                </motion.div>
              );
            })}
        </div>
        
        {/* Urgent medical consult banner footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-white/10 relative overflow-hidden text-left">
          <div className="space-y-1.5 md:max-w-xl">
            <h4 className="font-display font-medium text-base text-white flex items-center gap-2">
              <Zap className="w-4.5 h-4.5 text-gold-400 animate-pulse" />
              Severe Nerve Pinch Invalidation?
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              If you or a loved one are experiencing acute sciatic foot drop, severe walking claudication under 100 meters, or heavy radiating shocks, schedule a priority consultation with Dr. Vishwakarma.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking("fess")}
            className="w-full md:w-auto shrink-0 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-500 text-black font-bold text-xs tracking-wider uppercase px-6 py-3.5 rounded-full transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
          >
            <CalendarRange className="w-4 h-4 text-black" />
            <span>Schedule Consultation</span>
          </button>
        </div>

      </div>
    </section>
  );
}

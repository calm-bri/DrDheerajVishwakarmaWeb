import { useState } from "react";
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

  return (
    <section
      id="treatments-section"
      className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-white/5 bg-black/20"
    >
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-radial-glow opacity-25 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto relative z-10 space-y-16">
        
        {/* Section Heading Editorial Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl text-left">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold-300 font-semibold">
                SPINAL NERVE PATHWAY DECOMPRESSION
              </span>
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Advanced Clinical Specialties<span className="text-gold-400">.</span>
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-sans">
              Dr. Dheeraj Vishwakarma specializes in keyhole procedures that spare the paraspinous muscles, offering world-class comfort, fast-tracked mobility, and anatomical preservation options.
            </p>
          </div>

          {/* Quick interactive category filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Interventions" },
              { id: "endoscopic", label: "Full Endoscopic" },
              { id: "sciatica", label: "Radiating Pain & Sciatica" },
              { id: "cervical", label: "Cervical & Lumbar Discs" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-gold-400 border border-gold-400 text-black font-semibold"
                    : "glassmorphism hover:border-white/20 hover:bg-white/5 text-gray-400"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
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

              return (
                <motion.div
                  id={`treatment-card-${item.id}`}
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="group relative flex flex-col justify-between p-6 rounded-2xl glassmorphism hover:bg-cosmic-card hover:border-gold-400/40 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)] duration-300 overflow-hidden text-left"
                >
                  {/* Internal background glow effect on-hover */}
                  <div className="absolute -right-20 -top-20 w-44 h-44 bg-gold-glow opacity-0 group-hover:opacity-100 transition-opacity rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="space-y-4">
                    {/* Top row showing surgery visual icon and clinical parameters */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-300 group-hover:scale-110 duration-300 group-hover:bg-gold-400 group-hover:text-black">
                        <IconComp className="w-5 h-5 transition-colors" />
                      </div>
                      <div className="font-mono text-[9px] tracking-widest text-sky-400 font-semibold bg-sky-400/5 px-2 py-0.5 rounded border border-sky-400/10">
                        {item.treatmentMetric}
                      </div>
                    </div>

                    {/* Pathology Header */}
                    <div className="space-y-1.5">
                      <h2 className="font-display font-medium text-lg leading-tight text-white group-hover:text-gold-200 transition-colors">
                        {item.name}
                      </h2>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans line-clamp-3">
                        {item.shortDescription}
                      </p>
                    </div>

                    {/* Common target symptoms indicators */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <p className="text-[9px] font-mono font-medium text-gray-500 uppercase tracking-widest flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-red-400/80" />
                        Common Indications
                      </p>
                      <ul className="grid grid-cols-1 gap-1">
                        {item.symptoms.map((s, si) => (
                          <li key={si} className="text-[11px] text-gray-300 flex items-center gap-2 font-sans truncate">
                            <span className="w-1 h-1 rounded-full bg-gold-400/80 shrink-0" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Core CTAs footer row */}
                  <div className="flex items-center justify-between pt-5 mt-6 border-t border-white/5 text-[10px] font-mono tracking-wider uppercase">
                    <span className="text-gray-500 bg-white/2 px-2.5 py-0.5 rounded border border-white/5">
                      {item.recoveryTime}
                    </span>
                    <button
                      onClick={() => onOpenBooking(item.id)}
                      className="cursor-pointer font-bold text-gold-300 hover:text-white flex items-center gap-1 group/btn transition-colors"
                    >
                      <span>Inquire care</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 duration-200 text-gold-400" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
        </div>
        
        {/* Urgent medical consult banner footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-stone-900 to-cosmic-card border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-glow opacity-20 pointer-events-none" />
          <div className="space-y-1.5 text-left md:max-w-xl">
            <h3 className="font-display font-medium text-base text-white flex items-center gap-2">
              <Zap className="w-4.5 h-4.5 text-gold-400 animate-pulse" />
              Severe Nerve Pinch Invalidation?
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              If you or a loved one are experiencing acute sciatic foot drop, severe walking claudication under 100 meters, or heavy radiating spine shocks, schedule an immediate priority telehealth consultation with Dr. Vishwakarma within 2 hours.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking("fess")}
            className="w-full md:w-auto shrink-0 bg-white hover:bg-gray-200 text-black font-extrabold text-xs tracking-wider uppercase px-6 py-3.5 rounded-full transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <CalendarRange className="w-4 h-4" />
            <span>Schedule a Telehealth/In-person Consultation</span>
          </button>
        </div>

      </div>
    </section>
  );
}

import React, { useState } from "react";
import { motion } from "motion/react";
import { AlertTriangle, CheckCircle2, Sparkles, AlertCircle, Eye } from "lucide-react";

export default function IncisionComparison() {
  const [revealSensitive, setRevealSensitive] = useState(false);

  return (
    <section id="comparison-section" className="relative py-20 px-4 sm:px-6 md:px-8 bg-cosmic-bg border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rose-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-400 text-[10px] font-mono uppercase tracking-widest font-semibold select-none">
            <Sparkles className="w-3 h-3" /> Technical Breakdown
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-wide uppercase select-none">
            Traditional Open <span className="text-stone-500 font-light">vs</span> Keyhole 8mm Incision
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-sans max-w-lg mx-auto">
            See the biological difference between high-trauma traditional surgery and our single-stitch, muscle-sparing technique.
          </p>
        </div>

        {/* Side-by-Side Comparison Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* LEFT: Traditional Open Surgery Card */}
          <div className="glassmorphism rounded-3xl border border-red-500/10 bg-black/30 overflow-hidden flex flex-col justify-between shadow-2xl hover:border-red-500/20 transition-all duration-300">
            {/* Header label */}
            <div className="p-5 border-b border-white/5 bg-red-500/5 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-white">Traditional Open Surgery</h3>
                <p className="text-[10px] text-red-400 font-mono uppercase tracking-wider">High Surgical Trauma</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">
                <AlertTriangle className="w-4.5 h-4.5" />
              </div>
            </div>

            {/* Graphic Image Area with Sensitive Content Filter */}
            <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden group select-none border-b border-white/5">
              <img
                src="/traditional_open_surgery.jpg"
                alt="Traditional open spine surgery showing massive retractors and muscle splitting"
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-103 ${
                  !revealSensitive ? "blur-[25px] scale-105 saturate-[0.2] brightness-[0.4]" : "blur-0"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Blur Shield Overlay */}
              {!revealSensitive ? (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center z-10">
                  <AlertCircle className="w-10 h-10 text-red-500 mb-2 animate-pulse" />
                  <h4 className="text-white text-xs font-bold font-display uppercase tracking-wider">Sensitive Content</h4>
                  <p className="text-[10px] text-stone-400 max-w-[200px] mt-1 mb-4 leading-relaxed font-sans">
                    This clinical photo contains graphic images of open spinal cavity exposure.
                  </p>
                  <button
                    type="button"
                    onClick={() => setRevealSensitive(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-650 hover:bg-red-700 text-white text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
                  >
                    <Eye className="w-3.5 h-3.5" /> Reveal Image
                  </button>
                </div>
              ) : (
                /* Small Re-hide Button */
                <button
                  type="button"
                  onClick={() => setRevealSensitive(false)}
                  className="absolute top-4 right-4 bg-black/75 hover:bg-black/90 text-white border border-white/10 px-2.5 py-1 rounded-md text-[8px] font-mono uppercase tracking-widest z-20 transition-all cursor-pointer"
                >
                  Hide Image
                </button>
              )}

              <span className="absolute bottom-4 left-4 bg-red-500/90 text-white font-mono text-[9px] px-2 py-0.5 rounded border border-red-400/20 shadow-lg pointer-events-none">
                Clinical Exposure Image
              </span>
            </div>

            {/* Explanatory Bullet Points */}
            <div className="p-6 space-y-6 flex-1 bg-black/10">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0 mt-0.5 font-bold text-[10px] select-none">✕</div>
                  <div>
                    <strong className="text-stone-200 text-xs sm:text-sm font-sans block">3" to 5" Midline Incision</strong>
                    <span className="text-stone-400 text-[11px] sm:text-xs leading-relaxed block font-sans mt-0.5">
                      Requires a long vertical cut down the center of the spine, exposing deep layers and creating thick post-op scars.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0 mt-0.5 font-bold text-[10px] select-none">✕</div>
                  <div>
                    <strong className="text-stone-200 text-xs sm:text-sm font-sans block">Traumatic Muscle Peeling</strong>
                    <span className="text-stone-400 text-[11px] sm:text-xs leading-relaxed block font-sans mt-0.5">
                      Back muscles (multifidus) are forcibly cut or stripped off the spine bones, which can cause permanent muscle weakness.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0 mt-0.5 font-bold text-[10px] select-none">✕</div>
                  <div>
                    <strong className="text-stone-200 text-xs sm:text-sm font-sans block">Bone Stripping & Implants</strong>
                    <span className="text-stone-400 text-[11px] sm:text-xs leading-relaxed block font-sans mt-0.5">
                      Involves cutting spinal bone arches (laminectomy) and inserting rigid screws, fusion cages, or implants.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0 mt-0.5 font-bold text-[10px] select-none">✕</div>
                  <div>
                    <strong className="text-stone-200 text-xs sm:text-sm font-sans block">Painful Multi-Day Recovery</strong>
                    <span className="text-stone-400 text-[11px] sm:text-xs leading-relaxed block font-sans mt-0.5">
                      Results in significant surgical blood loss, heavy reliance on opioids, and 4-7 days of bedridden hospitalization.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Monoportal Endoscopic Surgery Card */}
          <div className="glassmorphism rounded-3xl border border-emerald-500/20 bg-black/30 overflow-hidden flex flex-col justify-between shadow-2xl hover:border-emerald-500/35 transition-all duration-300 relative">
            {/* Top accent glow line */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-emerald-500 via-gold-450 to-emerald-500 opacity-80" />

            {/* Header label */}
            <div className="p-5 border-b border-white/5 bg-emerald-500/5 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-white">Monoportal Endoscopic Spine Surgery</h3>
                <p className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider">Ultra-Minimally Invasive</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-4.5 h-4.5" />
              </div>
            </div>

            {/* Graphic Image Area */}
            <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden group select-none border-b border-white/5">
              <img
                src="/keyhole_8mm_incision.jpg"
                alt="Dr Dheeraj Vishwakarma showing single stitch 8mm incision measured with clinical ruler"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Highlighted Pioneering case badge (Top Right, Larger, text-xs) */}
              <span className="absolute top-4 right-4 bg-emerald-500/95 text-white font-mono text-xs px-3.5 py-1.5 rounded-xl uppercase tracking-widest font-extrabold border border-emerald-400/30 shadow-[0_0_15px_rgba(16,185,129,0.3)] z-10 select-none">
                Pioneering Case (8mm Cut)
              </span>
            </div>

            {/* Explanatory Bullet Points */}
            <div className="p-6 space-y-6 flex-1 bg-emerald-500/[0.02]">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 font-bold text-[10px] select-none">✓</div>
                  <div>
                    <strong className="text-stone-200 text-xs sm:text-sm font-sans block">Under-8mm Single Stitch</strong>
                    <span className="text-stone-400 text-[11px] sm:text-xs leading-relaxed block font-sans mt-0.5">
                      Incisions are smaller than a finger-width, requiring only one stitch. Delivers excellent cosmetic healing with near-zero visible scars.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 font-bold text-[10px] select-none">✓</div>
                  <div>
                    <strong className="text-stone-200 text-xs sm:text-sm font-sans block">Muscle-Sparing Dilation</strong>
                    <span className="text-stone-400 text-[11px] sm:text-xs leading-relaxed block font-sans mt-0.5">
                      Spinal muscles are gently dilated and separated rather than stripped or cut, fully preserving physical range of motion.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 font-bold text-[10px] select-none">✓</div>
                  <div>
                    <strong className="text-stone-200 text-xs sm:text-sm font-sans block">No Metal Screws or Fusion</strong>
                    <span className="text-stone-400 text-[11px] sm:text-xs leading-relaxed block font-sans mt-0.5">
                      Dr. Vishwakarma targets the pathology under direct 4K endoscopic visual access, keeping the natural spinal column intact.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 font-bold text-[10px] select-none">✓</div>
                  <div>
                    <strong className="text-stone-200 text-xs sm:text-sm font-sans block">Same-Day Walk Recovery</strong>
                    <span className="text-stone-400 text-[11px] sm:text-xs leading-relaxed block font-sans mt-0.5">
                      Performed under local conscious anesthesia with near-zero blood loss. Walk in 4-6 hours and get discharged within 24 hours.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

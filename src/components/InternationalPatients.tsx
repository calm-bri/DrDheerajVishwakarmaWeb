import { motion } from "motion/react";
import { Globe, Plane, ShieldCheck, Mail, Phone, Heart, CalendarCheck2, Languages, FileSliders, Stethoscope } from "lucide-react";

interface InternationalPatientsProps {
  onOpenBooking: () => void;
}

export default function InternationalPatients({ onOpenBooking }: InternationalPatientsProps) {
  return (
    <section
      id="international-section"
      className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-white/5 bg-black/15"
    >
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-radial-glow opacity-20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto relative z-10 space-y-12">
        
        {/* Section Heading Editorial Column */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-sky-400" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-sky-300 font-semibold">
                GLOBAL PATIENT CARE & COORDINATION
              </span>
            </div>
            <h3 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              International Consultation Desk<span className="text-gold-400">.</span>
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-sans">
              India is an internationally trusted healthcare hub. Dr. Dheeraj Vishwakarma’s specialist international desk provides a seamless support path for overseas patients, offering fast-track diagnostic support, prioritized operating room slots, and robust multilingual translation services.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-mono text-gray-400">
            <div>
              <span className="text-gray-500 block font-bold">CONTACT INT'L DESK</span>
              <a href="mailto:intl@drdheerajspine.com" className="text-gold-300 hover:underline">intl@drdheerajspine.com</a>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="text-gray-500 block font-bold">TELEHEALTH WHATSAPP</span>
              <a href="tel:+919999345892" className="text-white hover:underline">+91 99993 45892</a>
            </div>
          </div>
        </div>

        {/* Generalized Support Services Info Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Key Patient Experience Pillars: Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Pillar 1: Priority Slots */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gold-400/10 flex items-center justify-center text-gold-400">
                    <CalendarCheck2 className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Priority Slots & Scheduling</h4>
                    <p className="text-xs text-gray-450 leading-relaxed font-sans mt-1">
                      Expedited, priority scheduling for specialist clinical appointments, MRI diagnostic scans, and endoscopic theater booking on arrival.
                    </p>
                  </div>
                </div>

                {/* Pillar 2: Language translation */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-400/10 flex items-center justify-center text-sky-300">
                    <Languages className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Language Desk & Host Support</h4>
                    <p className="text-xs text-gray-450 leading-relaxed font-sans mt-1">
                      Dedicated language support officers and interpreters (facilitating fluent English, Arabic, Bengali, and regional communication).
                    </p>
                  </div>
                </div>

                {/* Pillar 3: Remote Coordination */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-400/10 flex items-center justify-center text-indigo-300">
                    <Stethoscope className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Clinical Pre-Triage Support</h4>
                    <p className="text-xs text-gray-450 leading-relaxed font-sans mt-1">
                      Virtual clinical MRI review and detailed preoperative telehealth consultations with Dr. Dheeraj before travel booking.
                    </p>
                  </div>
                </div>

                {/* Pillar 4: Logistics & Documentation */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-400/10 flex items-center justify-center text-emerald-300">
                    <FileSliders className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Claims & Documentation Assist</h4>
                    <p className="text-xs text-gray-450 leading-relaxed font-sans mt-1">
                      Fast-track medical visa recommendation letters, medical reports, and comprehensive post-discharge coordination.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Direct Interaction Actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenBooking}
                className="flex-1 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 px-6 py-4 rounded-full text-black font-extrabold text-xs tracking-wider uppercase transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-1.5"
                id="intl-book-consult-btn"
              >
                <Mail className="w-4 h-4" />
                <span>Submit Clinical Inquiry</span>
              </button>

              <a
                href="https://wa.me/919999345892"
                className="flex-1 bg-white hover:bg-gray-200 px-6 py-4 rounded-full text-black text-center font-extrabold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-1.5"
                id="intl-call-desk-btn"
              >
                <Phone className="w-4 h-4 text-emerald-600 fill-emerald-600/10" />
                <span>Call Int'l desk</span>
              </a>
            </div>
          </div>

          {/* Right column: High comfort features illustration */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl glassmorphism border-white/10 relative overflow-hidden bg-radial-glow/10 text-left">
            <div className="absolute top-0 right-0 p-4">
              <Globe className="w-12 h-12 text-white/5 animate-spin-slow" />
            </div>

            <div className="space-y-6">
              <h5 className="font-display font-medium text-lg text-white">
                Clinical Care Suite & Facilities
              </h5>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Dr. Vishwakarma operates across premier quaternary care hospitals in India, equipped with state-of-the-art diagnostic instruments:
              </p>

              <div className="space-y-4 pt-4 border-t border-white/5">
                {[
                  {
                    title: "4K Endoscope Visualizer",
                    desc: "Provides ultra-precise micro-incision surgical views."
                  },
                  {
                    title: "Intraoperative Neuromonitoring",
                    desc: "Enables safe, continuous validation of clinical nerve pathways."
                  },
                  {
                    title: "Dedicated Inpatient Rooms",
                    desc: "Optimized clean environment with clinical companion setups."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-sky-400/15 flex items-center justify-center shrink-0 text-sky-300 font-mono text-[10px] font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <h6 className="text-xs font-semibold text-white">{item.title}</h6>
                      <p className="text-[11px] text-gray-455 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center gap-3 mt-6">
              <Heart className="w-8 h-8 text-gold-400 shrink-0 fill-gold-400/15" />
              <div>
                <p className="text-xs font-semibold text-white">Globally Trusted</p>
                <p className="text-[10px] text-gray-500">Over 350+ international surgeries managed with outstanding success ratings.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

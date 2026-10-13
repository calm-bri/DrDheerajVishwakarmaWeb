import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  CalendarCheck2,
  PhoneCall,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Layers,
  HelpCircle,
  Stethoscope,
  Clock,
  Compass
} from "lucide-react";
import SEOComponent from "../components/SEOComponent";
import { detailedTreatments } from "../treatmentsData";
import { socialLinks } from "../data";

interface TreatmentsPageProps {
  onOpenBooking: (preferredTreatmentId?: string) => void;
}

export default function TreatmentsPage({ onOpenBooking }: TreatmentsPageProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const pageSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": "Endoscopic Spine Treatments & Keyhole Procedures - Dr. Dheeraj Vishwakarma",
      "description": "Comprehensive guide to Full Monoportal Endoscopic Spine Surgery (FESS), discectomy, sciatica treatment, slip disc care, and spinal stenosis decompression.",
      "url": "https://www.endoscopicspinecare.com/treatments",
      "author": {
        "@type": "Physician",
        "name": "Dr. Dheeraj Vishwakarma",
        "medicalSpecialty": "Endoscopic Spine Surgery, Neurosurgery",
        "telephone": ["+91-89998-98129", "+91-96721-44129"],
        "url": "https://www.endoscopicspinecare.com"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.endoscopicspinecare.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Treatments",
          "item": "https://www.endoscopicspinecare.com/treatments"
        }
      ]
    }
  ];

  const filteredTreatments = detailedTreatments.filter((item) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "endoscopic") return item.slug.includes("endoscopic");
    if (selectedFilter === "disc") return item.slug.includes("disc") || item.slug.includes("sciatica");
    if (selectedFilter === "stenosis") return item.slug.includes("stenosis");
    if (selectedFilter === "miss") return item.slug.includes("minimally-invasive");
    return true;
  });

  return (
    <motion.div
      key="treatments-directory"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="text-white text-left max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-20 space-y-16"
    >
      <SEOComponent
        title="Spine Treatments Directory | Endoscopic Spine Surgery Jaipur"
        description="Explore advanced keyhole spine treatments under Dr. Dheeraj Vishwakarma: FESS monoportal endoscopy, discectomy, sciatica release, slip disc care, and stenosis decompression."
        path="/treatments"
        schemas={pageSchemas}
      />

      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-navy-900 via-navy-850 to-navy-950 border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-glow opacity-20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-radial-glow opacity-20 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-gold-400">
                BOARD-CERTIFIED NEUROSURGERY & FESS SPECIALTY
              </span>
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Advanced Endoscopic Spine Treatments & Keyhole Procedures<span className="text-gold-400">.</span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
              Dr. Dheeraj Vishwakarma specializes in ultra-minimally invasive spine surgery that protects back muscles, eliminates major trauma, and allows patients to walk comfortably within hours after the procedure.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenBooking("fess")}
                className="bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 text-black px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(197,164,109,0.3)] hover:scale-103 cursor-pointer flex items-center gap-2"
              >
                <CalendarCheck2 className="w-4 h-4 text-black" />
                <span>Book an Appointment</span>
              </button>

              <a
                href="tel:+918999898129"
                className="bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 px-5 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Call Hotline</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl group bg-navy-950">
              <img
                src="/images/treatments/endoscopic-spine-surgery.jpg"
                alt="Endoscopic spine surgery under 8mm keyhole approach illustration"
                className="w-full h-auto aspect-video object-cover transition-transform duration-500 group-hover:scale-103"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-gray-300 bg-navy-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Under 8mm single stitch • Spares back muscles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] text-gold-400 uppercase tracking-widest font-bold">
              CLINICAL DIRECTORY
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Specialized Treatment Directory
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Treatments" },
              { id: "endoscopic", label: "Full Endoscopic" },
              { id: "disc", label: "Slip Disc & Sciatica" },
              { id: "stenosis", label: "Canal Stenosis" },
              { id: "miss", label: "Minimally Invasive" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? "bg-gold-400 text-black font-bold shadow-md"
                    : "bg-navy-900/80 hover:bg-navy-850 text-gray-300 border border-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredTreatments.map((treatment, idx) => (
            <motion.div
              key={treatment.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className="group flex flex-col justify-between rounded-2xl bg-navy-900/70 hover:bg-navy-850 border border-white/10 hover:border-gold-400/40 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl"
            >
              <div>
                {/* Visual Medical Image Header */}
                <div className="relative aspect-video w-full overflow-hidden bg-navy-950">
                  <img
                    src={treatment.heroImage}
                    alt={treatment.heroImageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-navy-950/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 font-mono text-[10px] text-gold-300 font-bold uppercase tracking-wider">
                    {treatment.metrics.incisionSize}
                  </div>
                  <div className="absolute top-3 right-3 bg-navy-950/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 font-mono text-[10px] text-emerald-400 font-semibold tracking-wider">
                    {treatment.metrics.hospitalStay}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-3.5 text-left">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-sky-400 block font-bold">
                    {treatment.category}
                  </span>

                  <h3 className="font-display font-bold text-lg text-white group-hover:text-gold-300 transition-colors leading-snug">
                    {treatment.name}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed font-sans line-clamp-3">
                    {treatment.shortDescription}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                    <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Key Indicators:</p>
                    <ul className="space-y-1 text-xs text-gray-300">
                      {treatment.symptoms.slice(0, 2).map((s, si) => (
                        <li key={si} className="flex items-center gap-1.5 truncate">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                          <span className="truncate">{s.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card Footer CTAs */}
              <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between gap-3 mt-4">
                <Link
                  to={`/treatments/${treatment.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-400 hover:text-white uppercase tracking-wider group/link transition-colors cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>

                <button
                  onClick={() => onOpenBooking(treatment.id)}
                  className="px-3.5 py-1.5 rounded-full bg-gold-400/10 hover:bg-gold-400 text-gold-300 hover:text-black border border-gold-400/30 text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer"
                >
                  Book
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Doctor's Clinical Approach Section */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-navy-900 to-navy-950 border border-white/10 space-y-10">
        <div className="max-w-2xl space-y-2 text-left">
          <span className="font-mono text-[10px] text-gold-400 uppercase tracking-widest font-bold">
            SURGICAL PHILOSOPHY
          </span>
          <h2 className="font-display font-bold text-3xl text-white">
            Dr. Dheeraj Vishwakarma’s Clinical Approach to Patient Care
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
            Our treatment philosophy is built on precision diagnostics, conservative therapy first, and reserving keyhole surgery exclusively for patients who truly need it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Precise Neurological Mapping",
              desc: "Careful physical examination correlating motor weakness, reflex changes, and dermatomal pain pathways with MRI scans.",
              icon: Stethoscope
            },
            {
              step: "02",
              title: "Conservative First Philosophy",
              desc: "Over 80% of our disc and sciatica patients recover through targeted medication, specialized physiotherapy, and selective blocks.",
              icon: ShieldCheck
            },
            {
              step: "03",
              title: "Keyhole Single-Stitch Execution",
              desc: "When surgery is needed, procedures are performed through an under-8mm portal, preserving 100% of back musculature.",
              icon: Activity
            },
            {
              step: "04",
              title: "Same-Day Mobilization",
              desc: "Patients stand up and walk independently within 4-6 hours post-op, returning home on the same day without prolonged bed rest.",
              icon: Clock
            }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-6 rounded-2xl bg-navy-850/60 border border-white/5 space-y-3 text-left hover:border-gold-400/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/25 flex items-center justify-center text-gold-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-sm font-bold text-gray-500">{item.step}</span>
                </div>
                <h3 className="font-display font-bold text-sm text-white">{item.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Patient Frequently Asked Questions */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-gold-400" />
          <h2 className="font-display font-bold text-2xl text-white">
            Frequently Asked Questions on Spine Treatments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              q: "How do I know if I need endoscopic spine surgery?",
              a: "You may be a candidate if you have severe leg, back, or neck pain that hasn't responded to 4-6 weeks of conservative treatment, or if you have progressive muscle weakness, foot drop, or severe walking limitation. Dr. Vishwakarma reviews your MRI to verify suitability."
            },
            {
              q: "Is monoportal endoscopic spine surgery painful?",
              a: "Because the incision is under 8mm and passes between muscle fibers without cutting them, post-operative pain is minimal. Most patients require only mild oral medication for 1-2 days and walk comfortably within hours."
            },
            {
              q: "Can I walk on the same day after surgery?",
              a: "Yes! Over 95% of patients treated with Dr. Vishwakarma's monoportal endoscopic surgery are up and walking independently within 4 to 6 hours after the procedure."
            },
            {
              q: "Do you use metal screws or fusions for disc treatments?",
              a: "No. In endoscopic discectomy and decompression, no screws, rods, or fusions are needed. We preserve your spine's natural mobility and rotational cushion."
            }
          ].map((faq, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-navy-900/60 border border-white/5 space-y-2 text-left">
              <h3 className="text-sm font-bold text-white font-display flex items-start gap-2">
                <span className="text-gold-400 font-mono text-xs mt-0.5">Q.</span>
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-sans pl-4 border-l border-gold-400/20">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Appointment & Phone CTA Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-400/30 relative overflow-hidden text-center sm:text-left space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-glow opacity-25 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="font-mono text-[10px] text-gold-400 uppercase tracking-widest font-bold">
              SCHEDULE CLINICAL TRIAGE
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Consult with Dr. Dheeraj Vishwakarma
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
              Visit our Jaipur outpatient clinics at Mansarovar and Bhakrota, or schedule a priority online MRI tele-consultation from anywhere in India or internationally.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={() => onOpenBooking("fess")}
              className="w-full sm:w-auto bg-gradient-to-r from-gold-400 to-gold-500 text-black px-7 py-4 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-lg hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
            >
              <CalendarCheck2 className="w-4 h-4 text-black" />
              <span>Book Appointment</span>
            </button>
            <a
              href="tel:+918999898129"
              className="w-full sm:w-auto bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 px-6 py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

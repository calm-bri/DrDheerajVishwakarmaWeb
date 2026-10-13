import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  CalendarCheck2,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Activity,
  Layers,
  Sparkles,
  HelpCircle,
  FileText
} from "lucide-react";
import SEOComponent from "../components/SEOComponent";
import { getTreatmentBySlug, detailedTreatments } from "../treatmentsData";
import { socialLinks } from "../data";

interface TreatmentDetailPageProps {
  onOpenBooking: (preferredTreatmentId?: string) => void;
}

export default function TreatmentDetailPage({ onOpenBooking }: TreatmentDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const treatment = slug ? getTreatmentBySlug(slug) : undefined;

  if (!treatment) {
    return <Navigate to="/treatments" replace />;
  }

  const pageSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": `${treatment.name} - Endoscopic Spine Care`,
      "description": treatment.shortDescription,
      "url": `https://www.endoscopicspinecare.com/treatments/${treatment.slug}`,
      "image": `https://www.endoscopicspinecare.com${treatment.heroImage}`,
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
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": treatment.name,
          "item": `https://www.endoscopicspinecare.com/treatments/${treatment.slug}`
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": treatment.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  ];

  const relatedTreatments = detailedTreatments.filter((t) =>
    treatment.relatedSlugs.includes(t.slug)
  );

  return (
    <motion.article
      key={treatment.slug}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="text-white text-left max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-20 space-y-16"
    >
      <SEOComponent
        title={`${treatment.name} | Dr. Dheeraj Vishwakarma Jaipur`}
        description={treatment.shortDescription}
        path={`/treatments/${treatment.slug}`}
        schemas={pageSchemas}
      />

      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-navy-900 via-navy-850 to-navy-950 border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-glow opacity-20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-radial-glow opacity-20 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-gold-400 bg-gold-400/10 border border-gold-400/25 px-3 py-1 rounded-full">
                {treatment.badge}
              </span>
              <span className="font-mono text-[10px] tracking-wider uppercase text-sky-400 bg-sky-400/10 border border-sky-400/20 px-3 py-1 rounded-full">
                {treatment.category}
              </span>
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              {treatment.name}
            </h1>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
              {treatment.shortDescription}
            </p>

            {/* Micro-metrics grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 pb-2 border-y border-white/10">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Incision Size</span>
                <span className="text-xs sm:text-sm font-bold text-gold-300 font-display">{treatment.metrics.incisionSize}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Anesthesia</span>
                <span className="text-xs sm:text-sm font-bold text-white font-display">{treatment.metrics.anesthesia}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Hospital Stay</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-400 font-display">{treatment.metrics.hospitalStay}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Ambulation</span>
                <span className="text-xs sm:text-sm font-bold text-sky-400 font-display">Within Hours</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenBooking(treatment.id)}
                className="bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 text-black px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(197,164,109,0.3)] hover:scale-103 cursor-pointer flex items-center gap-2"
              >
                <CalendarCheck2 className="w-4 h-4 text-black" />
                <span>Book Consultation</span>
              </button>

              <a
                href="tel:+918999898129"
                className="bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 px-5 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Call +91 89998 98129</span>
              </a>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl group bg-navy-950">
              <img
                src={treatment.heroImage}
                alt={treatment.heroImageAlt}
                className="w-full h-auto aspect-video object-cover transition-transform duration-500 group-hover:scale-103"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-gray-300 bg-navy-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span className="truncate">Medical anatomical illustration • Keyhole corridor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sticky Quick-Jump Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Sticky Navigation Column (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-4">
          <div className="p-5 rounded-2xl bg-navy-900/70 border border-white/10 space-y-3">
            <h3 className="font-mono text-[10px] text-gold-400 uppercase tracking-widest font-bold">
              PAGE SECTIONS
            </h3>
            <nav className="space-y-1 text-xs">
              {[
                { label: "Clinical Overview", href: "#overview" },
                { label: "Symptoms & Causes", href: "#symptoms" },
                { label: "Diagnosis & Options", href: "#diagnosis" },
                { label: "The Keyhole Procedure", href: "#procedure" },
                { label: "Benefits & Recovery", href: "#recovery" },
                { label: "Patient FAQs", href: "#faqs" },
                { label: "Related Treatments", href: "#related" }
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Quick Doctor Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-navy-850 to-navy-900 border border-gold-400/20 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/doctor_white_coat.png"
                alt="Dr. Dheeraj Vishwakarma"
                className="w-12 h-12 rounded-full object-cover border border-gold-400/40"
              />
              <div>
                <p className="text-xs font-bold text-white font-display">Dr. Dheeraj Vishwakarma</p>
                <p className="text-[10px] text-gold-400 font-mono">M.Ch Neurosurgery</p>
              </div>
            </div>
            <p className="text-[11px] text-gray-300 leading-relaxed font-sans">
              Need a personalized MRI evaluation? Dr. Vishwakarma reviews radiographs within 12 hours.
            </p>
            <button
              onClick={() => onOpenBooking(treatment.id)}
              className="w-full bg-gold-400/10 hover:bg-gold-400 text-gold-300 hover:text-black border border-gold-400/30 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Upload MRI Scan
            </button>
          </div>
        </aside>

        {/* Right Main Article Content (9 Cols) */}
        <div className="lg:col-span-9 space-y-14">
          
          {/* 1. Overview */}
          <section id="overview" className="space-y-4 scroll-mt-28">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-gold-400" />
              <h2 className="font-display font-bold text-2xl text-white">
                Clinical Overview & Anatomical Approach
              </h2>
            </div>
            <div className="space-y-3.5 text-gray-300 text-sm leading-relaxed font-sans bg-navy-900/40 p-6 rounded-2xl border border-white/5">
              {treatment.overview.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* 2. Symptoms & Causes */}
          <section id="symptoms" className="space-y-6 scroll-mt-28">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-gold-400 uppercase tracking-widest font-bold">
                CLINICAL PRESENTATION
              </span>
              <h2 className="font-display font-bold text-2xl text-white">
                Common Symptoms & Underlying Causes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {treatment.symptoms.map((symptom, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-navy-900/60 border border-white/5 space-y-2 hover:border-gold-400/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold-400 shrink-0" />
                    <h3 className="text-sm font-bold text-white font-display">{symptom.title}</h3>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">{symptom.description}</p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-navy-850/50 border border-white/5 space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
                Primary Underlying Causes:
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-300">
                {treatment.causes.map((cause, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 3. Diagnosis & Treatment Options */}
          <section id="diagnosis" className="space-y-6 scroll-mt-28">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-gold-400 uppercase tracking-widest font-bold">
                DIAGNOSTIC PATHWAY
              </span>
              <h2 className="font-display font-bold text-2xl text-white">
                How We Diagnose & When Surgery is Considered
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {treatment.diagnosis.map((diag, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-navy-900/60 border border-white/5 space-y-2">
                  <span className="font-mono text-[10px] text-sky-400 font-bold uppercase">Phase 0{idx + 1}</span>
                  <h3 className="text-xs font-bold text-white font-display">{diag.title}</h3>
                  <p className="text-[11px] text-gray-300 leading-relaxed font-sans">{diag.description}</p>
                </div>
              ))}
            </div>

            {/* Conservative vs Surgical indications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-navy-900/80 border border-emerald-500/20 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-display font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Conservative First Options (80%+ of cases)</span>
                </div>
                <ul className="space-y-2 text-xs text-gray-300">
                  {treatment.treatmentOptions.conservative.map((opt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span>{opt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-navy-900/80 border border-amber-500/20 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-display font-bold text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>When Keyhole Surgery is Indicated</span>
                </div>
                <ul className="space-y-2 text-xs text-gray-300">
                  {treatment.treatmentOptions.whenSurgeryConsidered.map((ind, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Procedure Explanation */}
          <section id="procedure" className="space-y-6 scroll-mt-28">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-gold-400 uppercase tracking-widest font-bold">
                SURGICAL STEP-BY-STEP
              </span>
              <h2 className="font-display font-bold text-2xl text-white">
                How Dr. Vishwakarma Performs the Keyhole Procedure
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans bg-navy-900/40 p-4 rounded-xl border border-white/5">
              {treatment.procedureExplanation.summary}
            </p>

            <div className="space-y-4">
              {treatment.procedureExplanation.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="flex gap-4 p-5 rounded-2xl bg-navy-900/70 border border-white/5 items-start"
                >
                  <div className="w-8 h-8 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-300 font-mono text-xs font-bold shrink-0">
                    {step.stepNumber}
                  </div>
                  <div className="space-y-1 text-left">
                    <h3 className="text-xs sm:text-sm font-bold text-white font-display">{step.title}</h3>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Benefits & Recovery */}
          <section id="recovery" className="space-y-6 scroll-mt-28">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-gold-400 uppercase tracking-widest font-bold">
                ADVANTAGES & TIMELINE
              </span>
              <h2 className="font-display font-bold text-2xl text-white">
                Potential Benefits & Recovery Milestones
              </h2>
            </div>

            {/* Benefits grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {treatment.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-4 rounded-xl bg-navy-900/60 border border-white/5"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-200">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Recovery Milestones */}
            <div className="space-y-3 pt-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">
                Recovery Timeline:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {treatment.recoveryTimeline.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-navy-850/70 border border-white/5 space-y-1 text-left"
                  >
                    <span className="font-mono text-[10px] text-gold-400 font-bold block">{step.timeframe}</span>
                    <h4 className="text-xs font-bold text-white font-display">{step.title}</h4>
                    <p className="text-[11px] text-gray-400 font-sans leading-snug">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Realistic Clinical Limitations */}
            <div className="p-5 rounded-2xl bg-navy-950/80 border border-white/10 space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Clinical Considerations & Limitations:</span>
              </h3>
              <ul className="space-y-1 text-xs text-gray-400">
                {treatment.risksAndLimitations.map((lim, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-gray-600">•</span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 6. Frequently Asked Questions */}
          <section id="faqs" className="space-y-6 scroll-mt-28">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-gold-400" />
              <h2 className="font-display font-bold text-2xl text-white">
                Frequently Asked Questions about {treatment.name}
              </h2>
            </div>

            <div className="space-y-3">
              {treatment.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-navy-900/60 border border-white/5 space-y-2 text-left"
                >
                  <h3 className="text-sm font-bold text-white font-display flex items-start gap-2">
                    <span className="text-gold-400 font-mono text-xs mt-0.5">Q.</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans pl-4 border-l border-gold-400/20">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 7. Related Treatments */}
          {relatedTreatments.length > 0 && (
            <section id="related" className="space-y-6 scroll-mt-28 border-t border-white/5 pt-10">
              <h2 className="font-display font-bold text-xl text-white">
                Related Spine Decompression Procedures
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedTreatments.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/treatments/${rel.slug}`}
                    className="p-5 rounded-2xl bg-navy-900/60 hover:bg-navy-850 border border-white/5 hover:border-gold-400/40 transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-gold-400 uppercase tracking-wider block">
                        {rel.metrics.incisionSize}
                      </span>
                      <h3 className="text-sm font-bold text-white group-hover:text-gold-300 transition-colors font-display">
                        {rel.name}
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-2">{rel.shortDescription}</p>
                    </div>
                    <span className="text-[10px] font-bold text-gold-400 uppercase tracking-wider flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-transform">
                      <span>Learn More</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Strong Final Appointment CTA */}
          <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-400/30 relative overflow-hidden text-center sm:text-left space-y-6">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold-glow opacity-25 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="font-mono text-[10px] text-gold-400 uppercase tracking-widest font-bold">
                  DIRECT CLINICAL APPOINTMENTS
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Suffering from {treatment.name}?
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                  Schedule a private consultation at our Jaipur clinic or submit your latest lumbar/cervical MRI report online for direct neurosurgical review.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
                <button
                  onClick={() => onOpenBooking(treatment.id)}
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
                  <span>Call +91 89998 98129</span>
                </a>
              </div>
            </div>
          </section>

          {/* Medical Compliance Disclaimer */}
          <footer className="p-5 rounded-2xl bg-navy-950/70 border border-white/5 text-[10px] text-gray-400 space-y-2 text-left leading-relaxed">
            <p className="font-mono uppercase text-gray-500 tracking-wider">
              <strong>Medical Disclaimer:</strong> The clinical explanations and educational diagrams presented here are for patient informative reference and do not replace professional neurological examination. Treatment decisions are individually formulated following direct physical MRI review by Dr. Dheeraj Vishwakarma.
            </p>
          </footer>

        </div>
      </div>
    </motion.article>
  );
}

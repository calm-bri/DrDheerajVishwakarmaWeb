import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CalendarCheck2,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Sparkles,
  PhoneCall
} from "lucide-react";
import SEOComponent from "../components/SEOComponent";
import { useData } from "../context/DataContext";
import { socialLinks } from "../data";
import { detailedTreatments } from "../treatmentsData";

import { generateLocalBusinessSchema, generateBreadcrumbSchema } from "../utils/schemaGenerator";

interface ContactPageProps {
  onOpenBooking: () => void;
}

export default function ContactPage({ onOpenBooking }: ContactPageProps) {
  const { addAppointment } = useData();

  // Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedTreatment, setSelectedTreatment] = useState("fess");
  const [sessionType, setSessionType] = useState<"clinic" | "video">("clinic");
  const [preferredTime, setPreferredTime] = useState("Morning (10:00 AM - 1:00 PM)");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactSchemas = [
    generateLocalBusinessSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Contact & Appointments", url: "/contact" }
    ])
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }
    const cleanPhone = phone.replace(/[^0-9+]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = "Please enter a valid phone number (at least 10 digits).";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addAppointment({
        fullName,
        email: email || "patient@endoscopicspinecare.com",
        phone,
        selectedTreatment,
        symptoms: `Preferred Time: ${preferredTime}. Mode: ${sessionType}. Notes: ${message || "None provided"}`,
        sessionType,
        isInternational: false
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="text-white text-left max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-20 space-y-12"
    >
      <SEOComponent
        title="Contact Dr. Dheeraj Vishwakarma | Spine Clinic Jaipur & Appointments"
        description="Schedule a consultation with Dr. Dheeraj Vishwakarma at Mansarovar or Bhakrota clinic in Jaipur, or book an online MRI review. Call +91 89998 98129."
        keywords="Spine Clinic Jaipur, Book Spine Consultation, Dr Dheeraj Vishwakarma Contact, Mansarovar Spine Clinic, Bhakrota Spine Clinic, Second Opinion Spine MRI"
        path="/contact"
        image="/logo.png"
        schemas={contactSchemas}
      />

      {/* Header Banner */}
      <section className="relative rounded-3xl bg-gradient-to-br from-navy-900 via-navy-850 to-navy-950 border border-white/10 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-glow opacity-20 blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-gold-400">
              PRIORITY CLINICAL DESK
            </span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Contact & Clinical Appointments<span className="text-gold-400">.</span>
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans">
            Schedule an in-person clinical consultation at our Jaipur locations, speak directly with our clinical surgical desk, or submit your MRI scans for urgent neurosurgical triage.
          </p>
        </div>
      </section>

      {/* Main Grid: Direct Channels (5 cols) + Functional Appointment Form (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Contacts & Clinic Locations (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Direct Hotline Box */}
          <div className="p-6 sm:p-7 rounded-2xl bg-navy-900/80 border border-white/10 space-y-5">
            <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-emerald-400" />
              <span>Direct Phone & WhatsApp Hotline</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm font-sans">
              <div className="p-4 rounded-xl bg-navy-850/80 border border-emerald-500/25 space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold block">
                  Priority Calling Numbers
                </span>
                <div className="space-y-1.5">
                  <a
                    href="tel:+918999898129"
                    className="flex items-center gap-2 text-white hover:text-gold-300 font-bold text-sm sm:text-base transition-colors"
                  >
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>+91 89998 98129</span>
                    <span className="text-[10px] text-gray-400 font-normal font-mono">(Direct Line)</span>
                  </a>
                  <a
                    href="tel:+919672144129"
                    className="flex items-center gap-2 text-white hover:text-gold-300 font-bold text-sm sm:text-base transition-colors"
                  >
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>+91 96721 44129</span>
                    <span className="text-[10px] text-gray-400 font-normal font-mono">(Clinic Line)</span>
                  </a>
                </div>
                <p className="text-[11px] text-gray-400 pt-1">
                  Available for scheduling and urgent spine triage from 9:00 AM to 7:00 PM IST.
                </p>
              </div>

              {/* WhatsApp direct CTA */}
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600/90 hover:bg-emerald-500 text-white p-3.5 rounded-xl text-center font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </a>

              {/* Official Email */}
              <div className="p-4 rounded-xl bg-navy-850/60 border border-white/5 space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 font-bold block">
                  Official Email for MRI Scans
                </span>
                <a
                  href="mailto:drajvishu2020@gmail.com"
                  className="flex items-center gap-2 text-sky-400 hover:text-sky-300 font-mono text-xs font-semibold"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>drajvishu2020@gmail.com</span>
                </a>
                <p className="text-[10px] text-gray-400 pt-1">
                  Send high-resolution lumbar or cervical MRI scan DICOM/PDF files for review.
                </p>
              </div>
            </div>
          </div>

          {/* Clinic Addresses in Jaipur */}
          <div className="p-6 sm:p-7 rounded-2xl bg-navy-900/80 border border-white/10 space-y-4">
            <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gold-400" />
              <span>Verified Outpatient Clinics</span>
            </h2>

            <div className="space-y-4 text-xs">
              {/* Location 1 */}
              <div className="p-4 rounded-xl bg-navy-850/60 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white font-display text-sm">
                    Aarogya Multispeciality Center
                  </h3>
                  <span className="font-mono text-[9px] text-gold-400 bg-gold-400/10 px-2 py-0.5 rounded border border-gold-400/20">
                    Mansarovar
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed font-sans">
                  S-5, Bhaskar Enclave, Above YES Bank, Patrakar Colony, Mansarovar, Jaipur, Rajasthan 302020
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Aarogya+Multispeciality+Center+Patrakar+Colony+Jaipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300 font-bold text-[11px] uppercase tracking-wider pt-1 transition-colors"
                >
                  <span>Open in Google Maps →</span>
                </a>
              </div>

              {/* Location 2 */}
              <div className="p-4 rounded-xl bg-navy-850/60 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white font-display text-sm">
                    Geetanjali Hospital
                  </h3>
                  <span className="font-mono text-[9px] text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded border border-sky-400/20">
                    Bhakrota
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed font-sans">
                  Jaat Colony, Bhakrota, Ajmer Road, Jaipur, Rajasthan 302026
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Geetanjali+Hospital+Bhakrota+Jaipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300 font-bold text-[11px] uppercase tracking-wider pt-1 transition-colors"
                >
                  <span>Open in Google Maps →</span>
                </a>
              </div>

              {/* Clinic Timings */}
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-navy-950/80 border border-white/5 text-gray-300">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-bold text-white text-[11px]">Consultation Timings:</p>
                  <p className="text-[11px] text-gray-300">Monday to Saturday: 10:00 AM – 4:00 PM</p>
                  <p className="text-[10px] text-gray-400">Prior appointment booking recommended to avoid waiting.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Functional Appointment Enquiry Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-navy-900/90 border border-white/10 space-y-6 shadow-2xl relative">
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] text-gold-400 uppercase tracking-widest font-bold">
                PATIENT ENQUIRY
              </span>
              <h2 className="font-display font-bold text-2xl text-white">
                Book an Appointment or MRI Review
              </h2>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Fill in your details below. Our clinical coordinator will call back within 2-4 hours to confirm your consultation slot.
              </p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-navy-850 border border-emerald-500/40 text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">
                  Appointment Request Received!
                </h3>
                <p className="text-sm text-gray-300 max-w-md mx-auto font-sans leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Dr. Dheeraj Vishwakarma’s desk has received your request. We will contact you at <strong>{phone}</strong> shortly.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send MRI on WhatsApp Now</span>
                  </a>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFullName("");
                      setPhone("");
                      setMessage("");
                    }}
                    className="w-full sm:w-auto text-gray-400 hover:text-white px-4 py-2 text-xs font-mono uppercase"
                  >
                    Submit Another Request
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-gray-300 font-semibold block">
                    Patient Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: "" });
                    }}
                    placeholder="e.g. Ramesh Kumar"
                    className={`w-full px-4 py-3 rounded-xl bg-navy-950/80 border text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all ${
                      errors.fullName
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/10 focus:border-gold-400 focus:ring-gold-400"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-[11px] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Phone & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-gray-300 font-semibold block">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: "" });
                      }}
                      placeholder="e.g. +91 98765 43210"
                      className={`w-full px-4 py-3 rounded-xl bg-navy-950/80 border text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all ${
                        errors.phone
                          ? "border-red-500 focus:ring-red-500"
                          : "border-white/10 focus:border-gold-400 focus:ring-gold-400"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-[11px] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-gray-300 font-semibold block">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="patient@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-navy-950/80 border border-white/10 focus:border-gold-400 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-all"
                    />
                  </div>
                </div>

                {/* Consultation Mode & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-gray-300 font-semibold block">
                      Consultation Type
                    </label>
                    <select
                      value={sessionType}
                      onChange={(e) => setSessionType(e.target.value as "clinic" | "video")}
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/10 focus:border-gold-400 text-white focus:outline-none focus:ring-1 focus:ring-gold-400 cursor-pointer"
                    >
                      <option value="clinic">In-Person Clinic (Jaipur)</option>
                      <option value="video">Online Video Call / Telehealth</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-gray-300 font-semibold block">
                      Preferred Contact Time
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/10 focus:border-gold-400 text-white focus:outline-none focus:ring-1 focus:ring-gold-400 cursor-pointer"
                    >
                      <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                      <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                      <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Treatment of interest */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-gray-300 font-semibold block">
                    Treatment / Condition of Interest
                  </label>
                  <select
                    value={selectedTreatment}
                    onChange={(e) => setSelectedTreatment(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/10 focus:border-gold-400 text-white focus:outline-none focus:ring-1 focus:ring-gold-400 cursor-pointer"
                  >
                    {detailedTreatments.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                    <option value="other">General Spine & Back Pain Consultation</option>
                  </select>
                </div>

                {/* Optional Message */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-gray-300 font-semibold block">
                    Describe Symptoms / Query (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Severe sciatica pain radiating down the left leg for 2 months, recent MRI completed..."
                    className="w-full px-4 py-3 rounded-xl bg-navy-950/80 border border-white/10 focus:border-gold-400 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-all resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 hover:from-gold-300 hover:to-gold-500 text-black py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(197,164,109,0.3)] hover:scale-102 cursor-pointer flex items-center justify-center gap-2 mt-4"
                >
                  <CalendarCheck2 className="w-4 h-4 text-black" />
                  <span>{isSubmitting ? "Submitting..." : "Confirm Appointment Request"}</span>
                </button>

                <p className="text-[10px] font-mono text-gray-400 text-center pt-1">
                  Your medical information is kept strictly private & confidential under medical standards.
                </p>
              </form>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

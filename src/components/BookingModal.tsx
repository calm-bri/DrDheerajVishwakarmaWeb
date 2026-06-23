import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useData } from "../context/DataContext";
import { X, Calendar, Video, MapPin, UploadCloud, CheckCircle2, AlertCircle, PhoneCall } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferredTreatmentId?: string;
}

export default function BookingModal({ isOpen, onClose, preferredTreatmentId = "" }: BookingModalProps) {
  const { addAppointment } = useData();
  const [sessionType, setSessionType] = useState<"video" | "clinic">(preferredTreatmentId ? "video" : "video");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [selectedTreatment, setSelectedTreatment] = useState(preferredTreatmentId || "fess");
  const [isInternational, setIsInternational] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const treatments = [
    { value: "fess", label: "Full Endoscopic Spine Surgery (FESS)" },
    { value: "monoportal", label: "Endoscopic Monoportal Spine Surgery" },
    { value: "miss", label: "Minimally Invasive Spine Surgery" },
    { value: "sciatica", label: "Sciatica Decompression" },
    { value: "slipdisc", label: "Slip Disc Orthopedic Care" },
    { value: "cervical-lumbar", label: "Cervical & Lumbar Complex Care" }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsUploading(true);
      // Simulate file check and upload
      setTimeout(() => {
        setSelectedFile(file);
        setIsUploading(false);
      }, 700);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    addAppointment({
      fullName,
      email,
      phone,
      selectedTreatment,
      symptoms: symptoms || "No custom symptoms description provided.",
      sessionType,
      isInternational,
      fileName: selectedFile ? selectedFile.name : undefined
    });

    setFormSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="booking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Blur backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-cosmic-bg/80 backdrop-blur-md cursor-pointer"
          />

          {/* Premium Dialog Container */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-cosmic-card/75 glassmorphism rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden z-10 p-6 sm:p-8"
          >
            {/* Top glowing bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500 via-gold-400 to-sky-500" />
            
            <button
              id="close-booking-modal"
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <h3 className="font-display font-medium text-2xl text-white tracking-tight">
                    Secure Surgical Consultation
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Direct triaging with Dr. Dheeraj Vishwakarma’s clinical desk.
                  </p>
                </div>

                {/* Consultation Method Selectors */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSessionType("video")}
                    className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                      sessionType === "video"
                        ? "border-gold-400 bg-gold-400/5 text-gold-200 shadow-[0_0_15px_rgba(193,161,113,0.15)]"
                        : "border-white/5 bg-white/2 text-gray-400 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    <Video className="w-5 h-5 text-sky-400" />
                    <div className="text-left">
                      <p className="text-xs font-semibold uppercase tracking-wider">Video Call</p>
                      <p className="text-[10px] text-gray-400">Global Patients</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSessionType("clinic")}
                    className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                      sessionType === "clinic"
                        ? "border-sky-400 bg-sky-400/5 text-sky-200 shadow-[0_0_15px_rgba(14,165,233,0.15)]"
                        : "border-white/5 bg-white/2 text-gray-400 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    <MapPin className="w-5 h-5 text-gold-400" />
                    <div className="text-left">
                      <p className="text-xs font-semibold uppercase tracking-wider">In-Person Clinic</p>
                      <p className="text-[10px] text-gray-400">Primary Outpatient Center, India</p>
                    </div>
                  </button>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Robert Stirling"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm md:text-base text-white focus:outline-none focus:border-gold-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Contact Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +1 (415) 555-0123"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm md:text-base text-white focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. robert@stirlingcare.com"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm md:text-base text-white focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Primary Spinal Concern</label>
                    <select
                      value={selectedTreatment}
                      onChange={(e) => setSelectedTreatment(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm md:text-base text-white focus:outline-none focus:border-gold-400 transition-colors cursor-pointer"
                    >
                      {treatments.map((t) => (
                        <option className="bg-cosmic-card text-white text-sm" key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Patient Description & Diagnostics upload */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Symptoms & Clinical History (Brief)</label>
                  <textarea
                    rows={2}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Describe shooting sciatic nerve pain, muscle weakness, lumbar issues, or current duration..."
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-gold-400 transition-colors resize-none"
                  />
                </div>

                {/* Upload Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div className="border border-dashed border-white/10 hover:border-gold-400/40 rounded-lg p-4 bg-black/20 text-center relative cursor-pointer group transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="flex flex-col items-center justify-center space-y-1.5 text-gray-400 group-hover:text-gold-200">
                      <UploadCloud className="w-6 h-6 text-gold-400 group-hover:scale-110 transition-transform" />
                      <p className="text-xs font-medium">Upload Latest spine MRI / Scans</p>
                      <p className="text-[9px] text-gray-500">PDF, JPG or PNG (Max 15MB)</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* MRI Status indicator */}
                    {selectedFile ? (
                      <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs text-left">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span className="truncate font-mono text-[10px] uppercase">
                          {selectedFile.name} (Ready)
                        </span>
                      </div>
                    ) : isUploading ? (
                      <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/10 text-gold-300 text-xs text-left">
                        <div className="w-3.5 h-3.5 border-2 border-gold-400 border-t-transparent rounded-full animate-spin shrink-0" />
                        <span className="font-mono text-[10px]">VERIFYING SCAN RESOLUTION...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-xs text-left">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span className="font-mono text-[9px] uppercase tracking-wider">
                          Optional: Upload scanner data for faster screening
                        </span>
                      </div>
                    )}

                    {/* Medical Tourism Toggle */}
                    <label className="flex items-center gap-3 cursor-pointer select-none py-1">
                      <input
                        type="checkbox"
                        checked={isInternational}
                        onChange={(e) => setIsInternational(e.target.checked)}
                        className="w-4 h-4 border border-white/25 rounded bg-transparent checked:bg-gold-400 accent-gold-400"
                      />
                      <div className="text-left">
                        <p className="text-xs font-medium text-white">I am an International Patient</p>
                        <p className="text-[10px] text-gray-400">Enable passport & airport facilitation features</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  * Clinical Information security: GDPR & HIPAA compliant data handling protocols. Dr. Vishwakarma's office reviews all uploads securely. Consultation confirmation will be sent to the email/phone specified within 12 hours.
                </p>

                {/* Submission CTA */}
                <div className="flex gap-3 justify-end pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full border border-white/10 text-xs font-semibold tracking-wider text-gray-300 hover:bg-white/5 transition-colors"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="relative overflow-hidden group bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 px-7 py-2.5 rounded-full text-xs font-bold tracking-wider text-black uppercase cursor-pointer transition-all hover:scale-105 duration-200"
                  >
                    Submit Appointment Inquiry
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center mx-auto text-gold-400 shadow-[0_0_40px_rgba(193,161,113,0.3)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-semibold text-2xl text-white">
                    Consultation Request Queued
                  </h4>
                  <p className="text-sm text-gray-400 max-w-md mx-auto">
                    Excellent, <strong className="text-white">{fullName}</strong>. Your clinical request has been recorded with ticket <strong className="font-mono text-gold-300">#NDV-{Math.floor(Math.random() * 9000 + 1000)}</strong>.
                  </p>
                </div>

                <div className="p-4 bg-white/2 rounded-xl border border-white/5 text-left max-w-md mx-auto text-xs space-y-2.5 text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-sky-400" />
                    <span>Mode: <strong className="text-white uppercase">{sessionType === "video" ? "Virtual Video Call" : "In-Person Medical Clinic"}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-gold-400" />
                    <span>Clinical desk contact: <strong className="text-white">+91 99993 45892</strong></span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2 leading-relaxed border-t border-white/5 pt-2">
                    Our international concierge desk will reach out on <strong className="text-gray-300">{phone}</strong> within 2 hours to confirm your video schedule and coordinate any live MRI translations.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setFormSubmitted(false);
                    setFullName("");
                    setEmail("");
                    setPhone("");
                    setSymptoms("");
                    setSelectedFile(null);
                  }}
                  className="px-8 py-3 rounded-full bg-white text-black hover:bg-gray-200 font-bold tracking-wider text-xs uppercase cursor-pointer hover:scale-105 duration-200"
                >
                  Return to Experience
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

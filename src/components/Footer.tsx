import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Globe, Sparkles, MessageCircle, Clock } from "lucide-react";
import Logo from "./Logo";
import { socialLinks } from "../data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const portalLinks = [
    { label: "Home", to: "/" },
    { label: "About Dr. Vishwakarma", to: "/about" },
    { label: "Specialty Treatments", to: "/treatments" },
    { label: "Surgical Media Gallery", to: "/gallery" },
    { label: "Contact & Clinic Locations", to: "/contact" },
    { label: "International Patient Desk", to: "/international-patients" },
    { label: "Clinical Publications", to: "/blogs" }
  ];

  const specialtyLinks = [
    { label: "Full Monoportal Endoscopic Spine Surgery (FESS)", to: "/treatments/endoscopic-spine-surgery" },
    { label: "Endoscopic Discectomy", to: "/treatments/endoscopic-discectomy" },
    { label: "Slip Disc Treatment", to: "/treatments/slip-disc-treatment" },
    { label: "Sciatica & Nerve Decompression", to: "/treatments/sciatica-treatment" },
    { label: "Spinal Canal Stenosis Treatment", to: "/treatments/spinal-stenosis" },
    { label: "Cervical Disc Treatment", to: "/treatments/cervical-disc-treatment" },
    { label: "Minimally Invasive Spine Surgery (MISS)", to: "/treatments/minimally-invasive-spine-surgery" }
  ];

  return (
    <footer className="relative bg-navy-950 text-gray-400 pt-16 pb-16 md:pb-8 px-4 sm:px-6 md:px-8 border-t border-white/10 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[450px] h-[350px] bg-gold-glow opacity-10 blur-3xl rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto relative z-10 space-y-12">

        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* Col 1: Bio Authoritative Brand Box (4 Cols) */}
          <div className="md:col-span-4 space-y-4 text-left">
            <Link to="/" className="inline-block hover:opacity-95 transition-opacity" aria-label="Go to home page">
              <Logo mode="horizontal" className="scale-100 origin-left" />
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-sm">
              Board-certified Spinal Neurosurgeon & pioneering Endoscopic Spine Specialist specializing in under-8mm keyhole Monoportal and Full Monoportal Endoscopic Spine surgery techniques, offering rapid recoveries with same-day walking milestones.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 hover:text-white hover:bg-emerald-600 transition-colors"
                title="Chat on WhatsApp"
                aria-label="Official WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="tel:+918999898129"
                className="p-2 rounded-full bg-navy-850 border border-white/10 text-gray-300 hover:text-gold-300 hover:border-gold-400/30 transition-colors"
                title="Call Clinic Hotline"
                aria-label="Direct Hotline"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:drajvishu2020@gmail.com"
                className="p-2 rounded-full bg-navy-850 border border-white/10 text-gray-300 hover:text-sky-300 hover:border-sky-400/30 transition-colors"
                title="Official Email"
                aria-label="Email Doctor"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Surgical Specialties (3 Cols) */}
          <div className="md:col-span-3 text-left space-y-3.5">
            <span className="font-mono text-[10px] text-gold-400 uppercase tracking-[0.2em] font-bold pb-1.5 border-b border-white/10 block">
              Surgical Specialties
            </span>
            <ul className="space-y-2 text-xs">
              {specialtyLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="hover:text-gold-300 transition-colors text-left block text-gray-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Portal Help Links (2 Cols) */}
          <div className="md:col-span-2 text-left space-y-3.5">
            <span className="font-mono text-[10px] text-gold-400 uppercase tracking-[0.2em] font-bold pb-1.5 border-b border-white/10 block">
              Patient Navigation
            </span>
            <ul className="space-y-2 text-xs">
              {portalLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="hover:text-gold-300 transition-colors text-left block text-gray-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Reach Contacts Info (3 Cols) */}
          <div className="md:col-span-3 text-left space-y-3.5">
            <span className="font-mono text-[10px] text-gold-400 uppercase tracking-[0.2em] font-bold pb-1.5 border-b border-white/10 block">
              Jaipur Clinics & Contact
            </span>
            <div className="space-y-3 text-xs select-text">
              <div className="flex gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div className="leading-snug text-gray-300 space-y-1">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Aarogya+Multispeciality+Center+Patrakar+Colony+Jaipur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold-300 transition-colors block cursor-pointer"
                  >
                    • Aarogya Multispeciality Center, Mansarovar, Jaipur
                  </a>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Geetanjali+Hospital+Bhakrota+Jaipur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold-300 transition-colors block cursor-pointer"
                  >
                    • Geetanjali Hospital, Bhakrota, Jaipur
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex flex-col space-y-0.5">
                  <a href="tel:+918999898129" className="hover:text-gold-300 transition-colors font-semibold text-white">
                    +91 89998 98129 (Priority Line)
                  </a>
                  <a href="tel:+919672144129" className="hover:text-gold-300 transition-colors font-semibold text-white">
                    +91 96721 44129 (Clinic Line)
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="mailto:drajvishu2020@gmail.com" className="hover:text-gold-300 text-gray-300 font-mono text-[11px]">
                  drajvishu2020@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-[11px] text-gray-300">
                  Mon - Sat: 10:00 AM – 4:00 PM
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & Medical Compliance footnote */}
        <div className="pt-6 border-t border-white/10 text-[10px] text-gray-400 space-y-3 text-center sm:text-left leading-relaxed">
          <p className="max-w-5xl">
            <strong>Clinical Disclaimer:</strong> The information provided on this medical portal is designed for educational purposes only and should not be used as a substitute for professional diagnosis or direct consultation. Surgical decisions regarding spinal care are formulated following personal review of physical MRI radiographs by Dr. Dheeraj Vishwakarma.
          </p>

          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 text-[9px] uppercase font-mono text-gray-400 pt-2">
            <p>© {currentYear} Dr. Dheeraj Vishwakarma • EndoscopicSpineCare.com. All rights reserved.</p>
            <div className="flex gap-3">
              <Link to="/about" className="hover:text-white transition-colors">Doctor Profile</Link>
              <span>•</span>
              <Link to="/treatments" className="hover:text-white transition-colors">Treatments</Link>
              <span>•</span>
              <Link to="/contact" className="hover:text-white transition-colors">Contact Desk</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

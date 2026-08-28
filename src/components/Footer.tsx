import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Globe, Sparkles } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const portalLinks = [
    { label: "Clinical Experience", to: "/about" },
    { label: "Specialty Treatments", to: "/treatments" },
    { label: "Surgical Media Gallery", to: "/gallery" },
    { label: "Medical Publications", to: "/blogs" },
    { label: "Recovery Timeline", to: "/#recovery-section" },
    { label: "International Desk", to: "/international-patients" },
    { label: "Surgical FAQ Desk", to: "/#faq-section" },
    { label: "Contact & Bookings", to: "/contact" }
  ];

  return (
    <footer className="relative bg-cosmic-bg text-gray-400 pt-20 pb-8 px-4 sm:px-6 md:px-8 border-t border-white/5 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-radial-glow opacity-15 blur-3xl rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto relative z-10 space-y-16">

        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">

          {/* Col 1: Bio Authoritative Brand Box */}
          <div className="md:col-span-4 space-y-5 text-left">
            <Link to="/" className="flex items-center hover:opacity-90 transition-opacity w-fit block" aria-label="Go to home page">
              <Logo mode="horizontal" className="scale-100 origin-left" />
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-xs">
              Pioneering Monoportal Endoscopic Spine Surgeon & Board-certified Spinal Neurosurgeon specializing in high-definition keyhole Monoportal and Full Monoportal Endoscopic Spine surgery techniques, offering rapid recoveries with same-day walking milestones.
            </p>
          </div>

          {/* Col 2: Clinical Care Director Index */}
          <div className="md:col-span-3 text-left space-y-4">
            <span className="font-mono text-[10px] text-white uppercase tracking-[0.25em] font-extrabold pb-1.5 border-b border-white/5 block">
              Surgical Specialties
            </span>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: "Full Monoportal Endoscopic Spine Surgery (FESS)", to: "/treatments#treatment-card-fess" },
                { label: "Endoscopic Monoportal Spine Surgery", to: "/treatments#treatment-card-monoportal" },
                { label: "Minimally Invasive Spine Surgery (MISS)", to: "/treatments#treatment-card-miss" },
                { label: "Sciatica Trapped Root Release", to: "/treatments#treatment-card-sciatica" },
                { label: "Slip Disc Micro-discectomy Care", to: "/treatments#treatment-card-slipdisc" },
                { label: "Cervical & Lumbar Disclosures", to: "/treatments#treatment-card-cervical-lumbar" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="hover:text-gold-250 transition-colors pointer-events-auto text-left cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Portal Help Links */}
          <div className="md:col-span-2 text-left space-y-4">
            <span className="font-mono text-[10px] text-white uppercase tracking-[0.25em] font-extrabold pb-1.5 border-b border-white/5 block">
              Patient Portal Map
            </span>
            <ul className="space-y-2.5 text-xs">
              {portalLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="hover:text-gold-250 transition-colors pointer-events-auto text-left cursor-pointer block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Reach Contacts Info */}
          <div className="md:col-span-3 text-left space-y-4">
            <span className="font-mono text-[10px] text-white uppercase tracking-[0.25em] font-extrabold pb-1.5 border-b border-white/5 block">
              Direct Clinical Inquiries
            </span>
            <div className="space-y-3.5 text-xs select-text">
              <div className="flex gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div className="leading-snug text-gray-300 space-y-1">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Aarogya+Multispeciality+Center+Patrakar+Colony+Jaipur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold-400 transition-colors block cursor-pointer"
                  >
                    • Aarogya Multispeciality Center, Mansarovar, Jaipur
                  </a>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Geetanjali+Hospital+Bhakrota+Jaipur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold-400 transition-colors block cursor-pointer"
                  >
                    • Geetanjali Hospital, Bhakrota, Jaipur
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="mailto:drajvishu2020@gmail.com" className="hover:text-gold-400">
                  drajvishu2020@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+918999898129" className="hover:text-gold-400">
                  +91 89998 98129 (Priority desk)
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-sky-450 shrink-0" />
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-sky-400">
                  Global Patient Hub
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & Medical Compliance footnote */}
        <div className="pt-6 border-t border-white/5 text-[10px] text-gray-400 space-y-4 text-center sm:text-left leading-relaxed">
          <p className="max-w-4xl mx-auto md:mx-0">
            <strong>Clinical Disclaimer:</strong> The information provided on this premium micro-surgical repository is designed for educational purposes only and should not be used as a substitute for active personalized diagnostic consultation. Decisions regarding spinal care should be formulated in direct coordination with Dr. Dheeraj Vishwakarma’s verified clinical surgical officers on reviewing physical MRI radiographs.
          </p>

          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 text-[9px] uppercase font-mono">
            <p>© {currentYear} Dr. Dheeraj Vishwakarma. Built with futuristic clinical technology standards.</p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  const btn = document.getElementById("hero-cta-consult") || document.getElementById("intl-book-consult-btn") || document.querySelector("[id*='booking']");
                  if (btn) (btn as HTMLElement).click();
                }}
                className="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 text-[9px] uppercase font-mono text-gray-400"
              >
                HIPAA Secure
              </button>
              <span>|</span>
              <button
                onClick={() => {
                  const btn = document.getElementById("hero-cta-consult") || document.getElementById("intl-book-consult-btn") || document.querySelector("[id*='booking']");
                  if (btn) (btn as HTMLElement).click();
                }}
                className="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 text-[9px] uppercase font-mono text-gray-400"
              >
                GDPR Compliant
              </button>
              <span>|</span>
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 text-[9px] uppercase font-mono text-gray-400"
              >
                Core Web Vitals 100
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

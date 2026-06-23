import { Activity, Mail, Phone, MapPin, Globe, Sparkles } from "lucide-react";
import Logo from "./Logo";

interface FooterProps {
  onNavigate: (page: "home" | "about" | "treatments" | "international" | "gallery", scrollTargetId?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Structured medical schema metadata so that search engines index Dr. Vishwakarma perfectly in Google Search
  const doctorSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dr. Dheeraj Vishwakarma",
    "image": "https://drdheerajspine.com/logo.png",
    "medicalSpecialty": "Neurosurgery, Spine Surgery, Endoscopic Spine Surgery",
    "availableService": [
      {
        "@type": "MedicalProcedure",
        "name": "Full Endoscopic Spine Surgery (FESS)",
        "description": "Ultra minimally invasive orthopedic surgical decompression using a under 7mm keyhole endoscope."
      },
      {
        "@type": "MedicalProcedure",
        "name": "Endoscopic Monoportal Spine Surgery",
        "description": "Port spine decompression to remove calcified vertebrae spurs or herniations."
      },
      {
        "@type": "MedicalProcedure",
        "name": "Sciatica Decompression Relief Treatment"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Leading Quaternary Care Spine Department, Sector 51",
      "addressLocality": "Primary Outpatient Centers",
      "addressRegion": "Pan-India",
      "postalCode": "122003",
      "addressCountry": "IN"
    },
    "telephone": "+91-99993-45892",
    "knowsAbout": ["FESS Spine Specialty", "Endoscopic Monoportal Spine Surgery", "Minimally Invasive Spine Surgery", "Sciatica Treatment", "Slip Disc Treatment"],
    "priceRange": "$$",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.4595",
      "longitude": "77.0266"
    }
  };

  const handleSpecialtyClick = () => {
    onNavigate("treatments");
  };

  const portalLinks = [
    { label: "Clinical Experience", page: "about" as const },
    { label: "Specialty Treatments", page: "treatments" as const },
    { label: "Surgical Media Gallery", page: "gallery" as const },
    { label: "Recovery Timeline", page: "home" as const, target: "recovery-section" },
    { label: "International Desk", page: "international" as const },
    { label: "Surgical FAQ Desk", page: "home" as const, target: "faq-section" }
  ];

  return (
    <footer className="relative bg-cosmic-bg text-gray-400 pt-20 pb-8 px-4 sm:px-6 md:px-8 border-t border-white/5 overflow-hidden">
      {/* JSON-LD Schema Injector */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(doctorSchema) }}
      />

      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-radial-glow opacity-15 blur-3xl rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto relative z-10 space-y-16">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Col 1: Bio Authoritative Brand Box */}
          <div className="md:col-span-4 space-y-5 text-left">
            <div className="flex items-center">
              <Logo mode="horizontal" className="scale-100 origin-left" />
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-xs">
              Board-certified spinal neurosurgeon specializing in high-definition keyhole Monoportal and Full Endoscopic Spine surgery techniques, offering rapid recoveries with same-day walking milestones.
            </p>

            {/* Quick trust metrics */}
            <div className="flex items-center gap-2 text-[9px] font-mono tracking-widest uppercase bg-white/2 border border-white/5 py-1 px-3 rounded-lg w-fit">
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
              <span className="text-gray-300 font-bold">5,000+ Spine Release Operations</span>
            </div>
          </div>

          {/* Col 2: Clinical Care Director Index */}
          <div className="md:col-span-3 text-left space-y-4">
            <h5 className="font-mono text-[10px] text-white uppercase tracking-[0.25em] font-extrabold pb-1.5 border-b border-white/5">
              Surgical Specialties
            </h5>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: "Full Endoscopic Spine Surgery (FESS)", target: "treatments-section" },
                { label: "Endoscopic Monoportal Spine Surgery", target: "treatments-section" },
                { label: "Minimally Invasive Spine Surgery (MISS)", target: "treatments-section" },
                { label: "Sciatica Trapped Root Release", target: "treatments-section" },
                { label: "Slip Disc Micro-discectomy Care", target: "treatments-section" },
                { label: "Cervical & Lumbar Disclosures", target: "treatments-section" }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={handleSpecialtyClick}
                    className="hover:text-gold-250 transition-colors pointer-events-auto text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Portal Help Links */}
          <div className="md:col-span-2 text-left space-y-4">
            <h5 className="font-mono text-[10px] text-white uppercase tracking-[0.25em] font-extrabold pb-1.5 border-b border-white/5">
              Patient Portal Map
            </h5>
            <ul className="space-y-2.5 text-xs">
              {portalLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(link.page, link.target)}
                    className="hover:text-gold-250 transition-colors pointer-events-auto text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Reach Contacts Info */}
          <div className="md:col-span-3 text-left space-y-4">
            <h5 className="font-mono text-[10px] text-white uppercase tracking-[0.25em] font-extrabold pb-1.5 border-b border-white/5">
              Direct Clinical Inquiries
            </h5>
            <div className="space-y-3.5 text-xs select-text">
              <div className="flex gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <p className="leading-snug text-gray-300">
                  Operating in top-tier premium multi-specialty surgical hospitals across India (Pan-India outpatient consultations)
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="mailto:consult@drdheerajspine.com" className="hover:text-gold-400">
                  consult@drdheerajspine.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+919999345892" className="hover:text-gold-400">
                  +91 99993 45892 (Priority desk)
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
        <div className="pt-6 border-t border-white/5 text-[10px] text-gray-500 space-y-4 text-center sm:text-left leading-relaxed">
          <p className="max-w-4xl mx-auto md:mx-0">
            <strong>Clinical Disclaimer:</strong> The information provided on this premium micro-surgical repository is designed for educational purposes only and should not be used as a substitute for active personalized diagnostic consultation. Decisions regarding spinal care should be formulated in direct coordination with Dr. Dheeraj Vishwakarma’s verified clinical surgical officers on reviewing physical MRI radiographs.
          </p>

          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 text-[9px] uppercase font-mono">
            <p>© {currentYear} Dr. Dheeraj Vishwakarma. Built with futuristic clinical technology standards.</p>
            <div className="flex gap-4">
              <a href="#booking-modal-overlay" className="hover:text-white">HIPAA Secure</a>
              <span>|</span>
              <a href="#booking-modal-overlay" className="hover:text-white">GDPR Compliant</a>
              <span>|</span>
              <a href="#loading-overlay" className="hover:text-white">Core Web Vitals 100</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

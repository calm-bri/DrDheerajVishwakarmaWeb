import { motion } from "motion/react";
import { Mail, Phone, MapPin, Sparkles, Clock, CalendarCheck2 } from "lucide-react";
import SEOComponent from "../components/SEOComponent";

interface ContactPageProps {
  onOpenBooking: () => void;
}

export default function ContactPage({ onOpenBooking }: ContactPageProps) {
  const contactSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "name": "Dr. Dheeraj Vishwakarma Spine Consultation Desk",
      "image": "https://www.endoscopicspinecare.com/logo.png",
      "telephone": "+91-99993-45892",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sector 51",
        "addressLocality": "Jaipur",
        "addressRegion": "Rajasthan",
        "postalCode": "302015",
        "addressCountry": "IN"
      }
    }
  ];

  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="pt-6 pb-20 px-4 xs:px-6 sm:px-8 max-w-5xl mx-auto text-white text-left"
    >
      <SEOComponent
        title="Contact Dr. Dheeraj Vishwakarma | Spine Clinic Bookings"
        description="Contact our clinical consultation desk at +91 89998 98129 or submit MRI scans online to schedule keyhole endoscopic spine surgery with Dr. Vishwakarma."
        path="/contact"
        schemas={contactSchemas}
      />

      <div className="absolute top-1/4 right-[10%] w-[400px] h-[400px] bg-gold-glow opacity-10 blur-3xl rounded-full pointer-events-none" />
      
      {/* Header section */}
      <div className="pt-10 pb-8 relative border-b border-white/5 mb-12">
        <span className="font-mono text-[10px] tracking-[0.3em] text-gold-400 font-bold uppercase inline-block mb-3 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20">
          Prioritization Desk
        </span>
        <h1 className="font-display font-medium text-4xl sm:text-5xl tracking-tight text-white mb-2">
          Contact & Bookings
        </h1>
        <p className="font-sans text-xs sm:text-sm text-gray-500 max-w-xl font-medium">
          Schedule private telehealth consultations, submit MRI diagnostic logs, or coordinate in-person clinical department intakes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Inquiries (7 Cols) */}
        <div className="md:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl glassmorphism bg-cosmic-card/40 border border-white/5 space-y-6">
            <h2 className="font-display font-semibold text-lg text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              Direct Clinical Channels
            </h2>
            
            <div className="space-y-6 text-xs sm:text-sm">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-400/10 border border-emerald-400/25 flex items-center justify-center shrink-0">
                  <Phone className="w-4.5 h-4.5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-gray-500">Priority Booking Hotline</p>
                  <a href="tel:+918999898129" className="hover:text-gold-300 transition-colors text-white font-medium block mt-0.5">
                    +91 89998 98129
                  </a>
                  <p className="text-[10px] text-gray-500 mt-0.5">Available for urgent triage & scheduler questions (9 AM - 7 PM IST)</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-lg bg-sky-400/10 border border-sky-400/25 flex items-center justify-center shrink-0">
                  <Mail className="w-4.5 h-4.5 text-sky-400" />
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-gray-500">Official Clinical Email</p>
                  <a href="mailto:drajvishu2020@gmail.com" className="hover:text-gold-300 transition-colors text-white font-medium block mt-0.5">
                    drajvishu2020@gmail.com
                  </a>
                  <p className="text-[10px] text-gray-500 mt-0.5">Send high-resolution lumbar/cervical MRI radiograph files for direct surgeon reviews.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-lg bg-gold-400/10 border border-gold-400/25 flex items-center justify-center shrink-0">
                  <MapPin className="w-4.5 h-4.5 text-gold-400" />
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-gray-500">Outpatient Consultation Centers</p>
                  <div className="text-white font-medium mt-2 leading-relaxed space-y-3">
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Aarogya+Multispeciality+Center+Patrakar+Colony+Jaipur" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block group/link cursor-pointer hover:text-gold-300 transition-colors"
                    >
                      <p className="text-xs font-semibold flex items-center gap-1 group-hover/link:text-gold-300">• Aarogya Multispeciality Center <span className="opacity-0 group-hover/link:opacity-100 transition-opacity text-[10px] font-mono font-normal">(View Map)</span></p>
                      <p className="text-[10px] text-gray-400 font-normal ml-2.5">S-5, Bhaskar Enclave, Above YES Bank, Patrakar Colony, Mansarovar, Jaipur</p>
                    </a>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Geetanjali+Hospital+Bhakrota+Jaipur" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block group/link cursor-pointer hover:text-gold-300 transition-colors"
                    >
                      <p className="text-xs font-semibold flex items-center gap-1 group-hover/link:text-gold-300">• Geetanjali Hospital <span className="opacity-0 group-hover/link:opacity-100 transition-opacity text-[10px] font-mono font-normal">(View Map)</span></p>
                      <p className="text-[10px] text-gray-400 font-normal ml-2.5">Jaat Colony, Bhakrota, Ajmer Road, Jaipur</p>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-400/10 border border-indigo-400/25 flex items-center justify-center shrink-0">
                  <Clock className="w-4.5 h-4.5 text-indigo-400" />
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-gray-500">Outpatient Timings</p>
                  <p className="text-white font-medium mt-0.5">
                    Monday – Saturday: 10:00 AM – 4:00 PM
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Prior bookings mandatory for all clinical consultations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Scheduler Box (5 Cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl glassmorphism bg-gradient-to-br from-gold-400/[0.03] to-transparent border border-white/10 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold-400/5 rounded-full blur-xl" />
            
            <h2 className="font-display font-semibold text-lg text-white">
              Instant Scheduling
            </h2>
            
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Utilize our HIPAA secure portal to select your treatment, describe symptoms, and upload diagnostic files directly to our review server.
            </p>

            <div className="pt-4 border-t border-white/5 space-y-3 font-sans text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5" />
                <span>MRI review in under 12 hours.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5" />
                <span>Direct video feedback with Dr. Dheeraj.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5" />
                <span>Complete post-op travel orientation support.</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full bg-gradient-to-r from-gold-400 to-gold-500 text-black hover:from-gold-500 hover:to-gold-600 py-3.5 px-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:scale-103 cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <CalendarCheck2 className="w-4 h-4 text-black" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

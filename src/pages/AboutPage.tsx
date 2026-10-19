import { motion } from "motion/react";
import { CalendarCheck2, PhoneCall } from "lucide-react";
import AboutMe from "../components/AboutMe";
import AwardsSection from "../components/AwardsSection";
import Testimonials from "../components/Testimonials";
import SEOComponent from "../components/SEOComponent";

interface AboutPageProps {
  onOpenBooking?: () => void;
}

export default function AboutPage({ onOpenBooking }: AboutPageProps) {
  const aboutSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": "Dr. Dheeraj Vishwakarma",
      "image": "https://www.endoscopicspinecare.com/logo.png",
      "telephone": ["+91-89998-98129", "+91-96721-44129"],
      "priceRange": "$$",
      "medicalSpecialty": "Monoportal Endoscopic Spine Surgery, Spine Surgery, Neurosurgery",
      "jobTitle": "Monoportal Endoscopic Spine Surgeon & Neurosurgeon",
      "description": "Pioneering Endoscopic Spine Surgeon specializing in Monoportal & Minimally Invasive Spine Procedures. Dr. Dheeraj Vishwakarma completed the International Fellowship in Endoscopic Spine Surgery and Neurosurgery at AIN Hospital, South Korea, under the mentorship of Dr. Kang-Taek Lim, gaining valuable insights into advanced endoscopic spine surgery and minimally invasive spinal techniques. Trained under Dr. Sukumar Sura, a leading authority in endoscopic spine surgery. Performed the first Cervical Monoportal Endoscopic Discectomy in Jaipur & Rajasthan. Performed the first Dorsal Monoportal Endoscopic Discectomy in Jaipur & Rajasthan. Achieved the first Monoportal Endoscopic Spine Surgery in the State of Rajasthan. Expert in Single-Stitch Spine Surgery for faster recovery and minimal tissue trauma. Operated on the youngest Cauda Equina patient, recognized by the India Book of Records & Asia Book of Records.",
      "alumniOf": [
        {
          "@type": "EducationalOrganization",
          "name": "Govind Ballabh Pant Institute of Post Graduate Medical Education and Research (GIPMER)"
        },
        {
          "@type": "EducationalOrganization",
          "name": "AIN Hospital, South Korea"
        },
        {
          "@type": "EducationalOrganization",
          "name": "St. Anna Hospital, Germany"
        }
      ],
      "knowsAbout": [
        "International Fellowship in Endoscopic Spine Surgery – South Korea (AIN Hospital, Dr. Kang-Taek Lim)",
        "Advanced Endoscopic Spine Surgery & Minimally Invasive Spinal Techniques",
        "Pioneering Endoscopic Spine Surgeon specializing in Monoportal & Minimally Invasive Spine Procedures",
        "Trained under Dr. Sukumar Sura, a leading authority in endoscopic spine surgery",
        "Performed the first Cervical Monoportal Endoscopic Discectomy in Jaipur & Rajasthan",
        "Performed the first Dorsal Monoportal Endoscopic Discectomy in Jaipur & Rajasthan",
        "Achieved the first Monoportal Endoscopic Spine Surgery in the State of Rajasthan",
        "Expert in Single-Stitch Spine Surgery for faster recovery and minimal tissue trauma",
        "Operated on the youngest Cauda Equina patient, recognized by the India Book of Records & Asia Book of Records"
      ]
    }
  ];

  return (
    <motion.div
      key="about"
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="pt-4 space-y-12 pb-16"
    >
      <SEOComponent
        title="About Dr. Dheeraj Vishwakarma | Pioneering Endoscopic Spine Surgeon"
        description="Pioneering Endoscopic Spine Surgeon. International Fellowship in Endoscopic Spine Surgery at AIN Hospital, South Korea under Dr. Kang-Taek Lim. Performed first Cervical & Dorsal Monoportal Endoscopic Discectomy in Rajasthan."
        path="/about"
        schemas={aboutSchemas}
      />
      <AboutMe />
      <AwardsSection />
      <Testimonials />

      {/* Appointment CTA Section on About Page */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-400/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-glow opacity-25 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-2 max-w-xl text-left relative z-10">
            <span className="font-mono text-[10px] text-gold-400 uppercase tracking-widest font-bold">
              PERSONALIZE YOUR CARE
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Consult with Dr. Dheeraj Vishwakarma
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
              Have your MRI scans reviewed or schedule an in-person clinical evaluation at our Jaipur outpatient centers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0 relative z-10">
            {onOpenBooking && (
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto bg-gradient-to-r from-gold-400 to-gold-500 text-black px-7 py-4 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-lg hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
              >
                <CalendarCheck2 className="w-4 h-4 text-black" />
                <span>Book Appointment</span>
              </button>
            )}
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
    </motion.div>
  );
}

import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import QuickAdvantages from "../components/QuickAdvantages";
import IncisionComparison from "../components/IncisionComparison";
import ParallaxCarousel from "../components/ParallaxCarousel";
import VideoDiscovery from "../components/VideoDiscovery";
import RecoveryTimeline from "../components/RecoveryTimeline";
import Testimonials from "../components/Testimonials";
import AwardsSection from "../components/AwardsSection";
import FAQ from "../components/FAQ";
import SEOComponent from "../components/SEOComponent";
import { videoData } from "../data";
import { VideoItem } from "../types";

interface HomeProps {
  onOpenBooking: (preferredTreatmentId?: string) => void;
}

export default function Home({ onOpenBooking }: HomeProps) {
  const navigate = useNavigate();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<VideoItem>(videoData[0]);

  const homeSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": "Dr. Dheeraj Vishwakarma",
      "image": "https://www.endoscopicspinecare.com/logo.png",
      "telephone": "+91-99993-45892",
      "priceRange": "$$",
      "medicalSpecialty": "Monoportal Endoscopic Spine Surgery, Spine Surgery, Neurosurgery",
      "description": "Pioneering Endoscopic Spine Surgeon specializing in Monoportal & Minimally Invasive Spine Procedures. Trained under Dr. Sukumar Sura, a leading authority in endoscopic spine surgery. Performed the first Cervical Monoportal Endoscopic Discectomy in Jaipur & Rajasthan. Performed the first Dorsal Monoportal Endoscopic Discectomy in Jaipur & Rajasthan. Achieved the first Monoportal Endoscopic Spine Surgery in the State of Rajasthan. Expert in Single-Stitch Spine Surgery for faster recovery and minimal tissue trauma. Operated on the youngest Cauda Equina patient, recognized by the India Book of Records & Asia Book of Records.",
      "knowsAbout": [
        "Pioneering Endoscopic Spine Surgeon specializing in Monoportal & Minimally Invasive Spine Procedures",
        "Trained under Dr. Sukumar Sura, a leading authority in endoscopic spine surgery",
        "Performed the first Cervical Monoportal Endoscopic Discectomy in Jaipur & Rajasthan",
        "Performed the first Dorsal Monoportal Endoscopic Discectomy in Jaipur & Rajasthan",
        "Achieved the first Monoportal Endoscopic Spine Surgery in the State of Rajasthan",
        "Expert in Single-Stitch Spine Surgery for faster recovery and minimal tissue trauma",
        "Operated on the youngest Cauda Equina patient, recognized by the India Book of Records & Asia Book of Records"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Leading Quaternary Care Spine Department, Sector 51",
        "addressLocality": "Primary Outpatient Centers",
        "addressRegion": "Pan-India",
        "postalCode": "122003",
        "addressCountry": "IN"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Dr. Dheeraj Vishwakarma Spine Care",
      "image": "https://www.endoscopicspinecare.com/logo.png",
      "telephone": "+91-99993-45892",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Leading Quaternary Care Spine Department, Sector 51",
        "addressLocality": "Primary Outpatient Centers",
        "addressRegion": "Pan-India",
        "postalCode": "122003",
        "addressCountry": "IN"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the difference between Monoportal Endoscopic Spine Surgery and traditional spine surgery?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Traditional spine surgery requires a large incision of 3-5 inches, severe cutting and peeling of spine muscles, and a long hospital stay. Dr. Vishwakarma's Monoportal Endoscopic Spine Surgery uses a tiny incision (~8mm, less than a finger-width), passes between muscles without ripping them, preserves the spinal joints, and allows patients to walk comfortably within hours afterward."
          }
        },
        {
          "@type": "Question",
          "name": "Do you use metal fusion screws and implants for all slip disc surgeries?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely not. One of the main goals of Full Monoportal Endoscopic Spine Surgery (FESS) is to protect your natural spine mobility. We work with micro-instruments to selectively extract the herniated disc tissue, leaving the healthy disc intact. Screws and fusions are reserved strictly for severe spinal column instability or spondylolisthesis."
          }
        },
        {
          "@type": "Question",
          "name": "How long do I need to stay in India for surgery if I am an international patient?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most patients traveling from overseas can safely fly back within 5 to 7 days. Because the incision is microscopic with no traumatic muscle cutting, the recovery is extremely rapid. Pre-travel MRI reviews allow us to arrange the surgery slot, preoperative tests, and discharge timeline prior to your arrival."
          }
        },
        {
          "@type": "Question",
          "name": "Is monoportal endoscopic spine surgery safe under local/epidural anesthesia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, it is incredibly safe. In fact, keeping the patient conscious but comfortable during the procedure is a great safety measure. Since the patient can respond, it provides immediate real-time feedback if a nerve structure is touched, almost completely eliminating any risk of nerve injury."
          }
        },
        {
          "@type": "Question",
          "name": "How do I secure an online video consultation with Dr. Dheeraj Vishwakarma?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can click on 'Book Consultation' to upload your latest MRI scan reports. Our international desk reviews your medical history within 12 hours, and sets up a high-definition Zoom or WhatsApp video call directly with Dr. Dheeraj Vishwakarma."
          }
        }
      ]
    }
  ];

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <SEOComponent
        title="Dr. Dheeraj Vishwakarma | Best Endoscopic Spine Surgeon"
        description="Dr. Dheeraj Vishwakarma is India's leading neurosurgeon specializing in FESS monoportal endoscopic spine surgery with same-day walking recovery milestones."
        path="/"
        schemas={homeSchemas}
      />

      {/* 1. Cinematic Hero Frame */}
      <Hero
        onOpenBooking={() => onOpenBooking("fess")}
        onExploreScience={() => navigate("/treatments")}
        onNavigateAbout={() => navigate("/about")}
        onPlayVideo={() => setIsVideoModalOpen(true)}
      />

      {/* 1.1 Quick Advantages Micro-Metrics */}
      <QuickAdvantages />

      {/* 1.2 In-depth Incision and Surgical Trauma Comparison Section */}
      <IncisionComparison />

      {/* 1.3 Animated Lenticular Image Showcase Gallery */}
      <ParallaxCarousel />

      {/* 1.5 Scroll-triggered Video Discovery Section */}
      <VideoDiscovery
        isModalOpen={isVideoModalOpen}
        setIsModalOpen={setIsVideoModalOpen}
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
      />

      {/* 2. Interactive Recovery Milestones timeline */}
      <div id="recovery-section">
        <RecoveryTimeline />
      </div>

      {/* 3. Patient Testimonial slideshow review boards */}
      <div id="testimonials-section">
        <Testimonials />
      </div>

      {/* 3.5 Academic Honors & Achievements badges */}
      <div id="awards-section">
        <AwardsSection />
      </div>

      {/* 4. FAQ Accordion section */}
      <div id="faq-section">
        <FAQ />
      </div>
    </motion.div>
  );
}

import { motion } from "motion/react";
import AboutMe from "../components/AboutMe";
import AwardsSection from "../components/AwardsSection";
import Testimonials from "../components/Testimonials";
import SEOComponent from "../components/SEOComponent";

export default function AboutPage() {
  const aboutSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": "Dr. Dheeraj Vishwakarma",
      "image": "https://www.endoscopicspinecare.com/logo.png",
      "telephone": "+91-99993-45892",
      "priceRange": "$$",
      "medicalSpecialty": "Monoportal Endoscopic Spine Surgery, Spine Surgery, Neurosurgery",
      "jobTitle": "Monoportal Endoscopic Spine Surgeon & Neurosurgeon",
      "description": "Pioneering Endoscopic Spine Surgeon specializing in Monoportal & Minimally Invasive Spine Procedures. Trained under Dr. Sukumar Sura, a leading authority in endoscopic spine surgery. Performed the first Cervical Monoportal Endoscopic Discectomy in Jaipur & Rajasthan. Performed the first Dorsal Monoportal Endoscopic Discectomy in Jaipur & Rajasthan. Achieved the first Monoportal Endoscopic Spine Surgery in the State of Rajasthan. Expert in Single-Stitch Spine Surgery for faster recovery and minimal tissue trauma. Operated on the youngest Cauda Equina patient, recognized by the India Book of Records & Asia Book of Records.",
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Govind Ballabh Pant Institute of Post Graduate Medical Education and Research (GIPMER)"
      },
      "knowsAbout": [
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
      className="pt-6"
    >
      <SEOComponent
        title="About Dr. Dheeraj Vishwakarma | Pioneering Endoscopic Spine Surgeon"
        description="Pioneering Endoscopic Spine Surgeon specializing in Monoportal & Minimally Invasive Spine Procedures. Trained under Dr. Sukumar Sura. Performed the first Cervical & Dorsal Monoportal Endoscopic Discectomy in Jaipur & Rajasthan."
        path="/about"
        schemas={aboutSchemas}
      />
      <AboutMe />
      <AwardsSection />
      <Testimonials />
    </motion.div>
  );
}

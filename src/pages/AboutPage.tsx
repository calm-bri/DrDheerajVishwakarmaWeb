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
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Govind Ballabh Pant Institute of Post Graduate Medical Education and Research (GIPMER)"
      },
      "knowsAbout": ["FESS Spine Specialty", "Endoscopic Monoportal Spine Surgery", "Minimally Invasive Spine Surgery", "Sciatica Treatment", "Slip Disc Treatment"]
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
        title="About Dr. Dheeraj Vishwakarma | Endoscopic Spine Expert"
        description="Learn about Dr. Dheeraj Vishwakarma, India's pioneer in monoportal endoscopic spine surgery. Credentials, Germany training, and outpatient clinical record."
        path="/about"
        schemas={aboutSchemas}
      />
      <AboutMe />
      <AwardsSection />
      <Testimonials />
    </motion.div>
  );
}

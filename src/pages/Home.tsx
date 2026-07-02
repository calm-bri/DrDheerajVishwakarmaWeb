import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import RecoveryTimeline from "../components/RecoveryTimeline";
import Testimonials from "../components/Testimonials";
import AwardsSection from "../components/AwardsSection";
import FAQ from "../components/FAQ";
import SEOComponent from "../components/SEOComponent";

interface HomeProps {
  onOpenBooking: (preferredTreatmentId?: string) => void;
}

export default function Home({ onOpenBooking }: HomeProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <SEOComponent
        title="Dr. Dheeraj Vishwakarma - Best Monoportal Endoscopic Spine Surgeon in India"
        description="Dr. Dheeraj Vishwakarma is India's leading Monoportal Endoscopic Spine Specialist & Board-Certified Neurosurgeon specializing in FESS (Full Monoportal Endoscopic Spine Surgery) and single stitch <8mm spine care. Same-day walking recovery."
        path="/"
      />

      {/* 1. Cinematic Hero Frame */}
      <Hero
        onOpenBooking={() => onOpenBooking("fess")}
        onExploreScience={() => navigate("/treatments")}
        onNavigateAbout={() => navigate("/about")}
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

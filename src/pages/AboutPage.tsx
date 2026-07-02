import { motion } from "motion/react";
import AboutMe from "../components/AboutMe";
import AwardsSection from "../components/AwardsSection";
import Testimonials from "../components/Testimonials";
import SEOComponent from "../components/SEOComponent";

export default function AboutPage() {
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
        title="About Dr. Dheeraj Vishwakarma | Credentials & Spine Care Experience"
        description="Learn about Dr. Dheeraj Vishwakarma, India's premier Monoportal Endoscopic Spine Surgeon & Board-Certified Neurosurgeon with extensive specialized training in advanced Germany spine endoscopy."
        path="/about"
      />
      <AboutMe />
      <AwardsSection />
      <Testimonials />
    </motion.div>
  );
}

import { motion } from "motion/react";
import Gallery from "../components/Gallery";
import SEOComponent from "../components/SEOComponent";

export default function GalleryPage() {
  return (
    <motion.div
      key="gallery"
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="pt-6"
    >
      <SEOComponent
        title="Monoportal Endoscopic Spine Surgical Case Gallery | Dr. Dheeraj Vishwakarma"
        description="Browse surgical case logs, 4K endoscopy recordings, and patient mobility testimonials showing rapid recovery milestones post spine release."
        path="/gallery"
      />
      <Gallery />
    </motion.div>
  );
}

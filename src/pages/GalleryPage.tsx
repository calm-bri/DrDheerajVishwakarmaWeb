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
        title="Endoscopic Spine Surgery Case Gallery & Video Records"
        description="Browse surgical cases, 4K spine endoscopy logs, and verified recovery testimonials demonstrating direct outpatient mobility post transforaminal release."
        path="/gallery"
      />
      <Gallery />
    </motion.div>
  );
}

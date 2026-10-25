import { motion } from "motion/react";
import Gallery from "../components/Gallery";
import SEOComponent from "../components/SEOComponent";
import { generateBreadcrumbSchema } from "../utils/schemaGenerator";

export default function GalleryPage() {
  const gallerySchemas = [
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Surgical Case Gallery", url: "/gallery" }
    ])
  ];

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
        title="Endoscopic Spine Surgery Case Gallery & Surgical Videos | Dr. Dheeraj Vishwakarma"
        description="Browse high-definition endoscopic spine surgical cases, patient recovery milestones, and before-after MRI scans from Dr. Dheeraj Vishwakarma's practice."
        keywords="Spine Surgery Gallery, Endoscopic Spine Videos, Slip Disc Surgery Photos, Spine Surgery Case Studies, Monoportal Spine Videos"
        path="/gallery"
        image="/logo.png"
        schemas={gallerySchemas}
      />
      <Gallery />
    </motion.div>
  );
}

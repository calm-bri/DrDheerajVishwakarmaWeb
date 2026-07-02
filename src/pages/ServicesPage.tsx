import { motion } from "motion/react";
import Conditions from "../components/Conditions";
import SEOComponent from "../components/SEOComponent";

interface ServicesPageProps {
  onOpenBooking: (preferredTreatmentId?: string) => void;
}

export default function ServicesPage({ onOpenBooking }: ServicesPageProps) {
  return (
    <motion.div
      key="services"
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="pt-6"
    >
      <SEOComponent
        title="Spine Care Services & Minimally Invasive Decompression | Dr. Dheeraj Vishwakarma"
        description="Explore our specialized spine care services including monoportal endoscopy, discectomy, and spinal stenosis treatment under Dr. Dheeraj Vishwakarma."
        path="/services"
      />
      <Conditions onOpenBooking={onOpenBooking} />
    </motion.div>
  );
}

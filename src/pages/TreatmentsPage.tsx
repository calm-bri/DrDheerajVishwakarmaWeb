import { motion } from "motion/react";
import Conditions from "../components/Conditions";
import SEOComponent from "../components/SEOComponent";

interface TreatmentsPageProps {
  onOpenBooking: (preferredTreatmentId?: string) => void;
}

export default function TreatmentsPage({ onOpenBooking }: TreatmentsPageProps) {
  return (
    <motion.div
      key="treatments"
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="pt-6"
    >
      <SEOComponent
        title="Advanced Monoportal Endoscopic Spine Treatments & Procedures | Dr. Dheeraj Vishwakarma"
        description="Discover FESS (Full Monoportal Endoscopic Spine Surgery), minimally invasive spine procedures, and treatments for slipped disc, sciatica, and stenosis."
        path="/treatments"
      />
      <Conditions onOpenBooking={onOpenBooking} />
    </motion.div>
  );
}

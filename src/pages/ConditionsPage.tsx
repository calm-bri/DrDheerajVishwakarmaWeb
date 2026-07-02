import { motion } from "motion/react";
import Conditions from "../components/Conditions";
import SEOComponent from "../components/SEOComponent";

interface ConditionsPageProps {
  onOpenBooking: (preferredTreatmentId?: string) => void;
}

export default function ConditionsPage({ onOpenBooking }: ConditionsPageProps) {
  return (
    <motion.div
      key="conditions"
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="pt-6"
    >
      <SEOComponent
        title="Spine Conditions & Pathologies Treated | Dr. Dheeraj Vishwakarma"
        description="Find details about spine conditions treated using keyhole endoscopic procedures by Dr. Dheeraj Vishwakarma, including slip disc, stenosis, sciatica."
        path="/conditions"
      />
      <Conditions onOpenBooking={onOpenBooking} />
    </motion.div>
  );
}

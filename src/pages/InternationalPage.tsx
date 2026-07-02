import { motion } from "motion/react";
import InternationalPatients from "../components/InternationalPatients";
import SEOComponent from "../components/SEOComponent";

interface InternationalPageProps {
  onOpenBooking: () => void;
}

export default function InternationalPage({ onOpenBooking }: InternationalPageProps) {
  return (
    <motion.div
      key="international"
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="pt-6"
    >
      <SEOComponent
        title="International Patients Spine Desk | Keyhole Spine Care"
        description="Comprehensive clinical support for global spine surgery patients. Keyhole spinal surgery in India with same-day walk milestones and translation desk."
        path="/international-patients"
      />
      <InternationalPatients onOpenBooking={onOpenBooking} />
    </motion.div>
  );
}

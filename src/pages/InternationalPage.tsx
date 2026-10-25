import { motion } from "motion/react";
import InternationalPatients from "../components/InternationalPatients";
import SEOComponent from "../components/SEOComponent";
import { generateBreadcrumbSchema } from "../utils/schemaGenerator";

interface InternationalPageProps {
  onOpenBooking: () => void;
}

export default function InternationalPage({ onOpenBooking }: InternationalPageProps) {
  const internationalSchemas = [
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "International Patients", url: "/international-patients" }
    ])
  ];

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
        title="International Patients Spine Surgery Desk | Dr. Dheeraj Vishwakarma Jaipur"
        description="Global medical tourism and endoscopic spine care in India. Fast-track MRI second opinions, medical visa assistance, 5-7 day flyback timeline, and dedicated translation desk."
        keywords="Spine Surgery India Medical Tourism, International Patient Spine Care, Endoscopic Spine Surgery Abroad, Medical Visa India Spine, Dr Dheeraj Vishwakarma International"
        path="/international-patients"
        image="/logo.png"
        schemas={internationalSchemas}
      />
      <InternationalPatients onOpenBooking={onOpenBooking} />
    </motion.div>
  );
}

import { motion } from "motion/react";
import AdminPanel from "../components/AdminPanel";
import SEOComponent from "../components/SEOComponent";

export default function AdminPage() {
  return (
    <motion.div
      key="admin"
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="pt-6"
    >
      <SEOComponent
        title="Secure Admin Panel Desk | Dr. Dheeraj Vishwakarma"
        description="Administrative desk portal for managing appointments, testimonials, and cases."
        path="/admin"
      />
      <AdminPanel />
    </motion.div>
  );
}

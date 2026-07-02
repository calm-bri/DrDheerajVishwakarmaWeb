import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ShieldAlert, ChevronRight, Home, HelpCircle } from "lucide-react";
import SEOComponent from "../components/SEOComponent";

export default function NotFoundPage() {
  return (
    <motion.div
      key="404"
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="pt-20 pb-28 px-4 text-center max-w-lg mx-auto text-white flex flex-col items-center justify-center min-h-[75vh]"
    >
      <SEOComponent
        title="Page Not Found | Endoscopic Spine Care"
        description="The requested page could not be located. Access our primary index page to view treatments, certifications, and clinical appointment scheduling."
        path="/404"
      />

      {/* Decorative cosmic glow behind the 404 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold-400/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="space-y-6"
      >
        {/* Warning Icon Badge */}
        <div className="w-14 h-14 rounded-2xl bg-gold-400/10 border border-gold-400/25 flex items-center justify-center text-gold-400 mx-auto animate-pulse">
          <ShieldAlert className="w-7 h-7" />
        </div>

        {/* Large 404 Text */}
        <h1 className="font-display font-extrabold text-7xl sm:text-8xl text-white tracking-tighter leading-none">
          404<span className="text-gold-400">.</span>
        </h1>

        {/* Status Message */}
        <div className="space-y-2">
          <h2 className="font-display font-semibold text-xl text-white">
            Clinical Pathway Not Found
          </h2>
          <p className="text-xs text-gray-500 font-sans leading-relaxed max-w-sm mx-auto">
            The requested page has been relocated or is not registered in our index. Please use the options below to navigate back to active clinical guides.
          </p>
        </div>

        {/* Navigation CTAs */}
        <div className="pt-6 flex flex-col gap-3 w-full sm:w-80 mx-auto">
          <Link
            to="/"
            className="bg-gradient-to-r from-gold-400 to-gold-500 text-black py-3 px-5 rounded-full text-xs font-bold tracking-widest uppercase transition-all hover:scale-105 flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(193,161,113,0.15)]"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/treatments"
            className="glassmorphism hover:bg-white/5 text-gray-300 hover:text-white py-3 px-5 rounded-full text-xs font-bold tracking-widest uppercase transition-all hover:scale-105 flex items-center justify-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>View Specialties</span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

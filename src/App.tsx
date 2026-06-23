import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Loader from "./components/Loader";
import BioBackground from "./components/BioBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Conditions from "./components/Conditions";
import RecoveryTimeline from "./components/RecoveryTimeline";
import InternationalPatients from "./components/InternationalPatients";
import Testimonials from "./components/Testimonials";
import AboutMe from "./components/AboutMe";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import Gallery from "./components/Gallery";
import AdminPanel from "./components/AdminPanel";
import AwardsSection from "./components/AwardsSection";
import { Sparkles, Activity, ShieldCheck, HeartPulse } from "lucide-react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preferredTreatment, setPreferredTreatment] = useState("");
  const [currentPage, setCurrentPage] = useState<"home" | "about" | "treatments" | "international" | "gallery" | "admin">("home");

  const handleOpenBooking = (treatmentId = "") => {
    setPreferredTreatment(treatmentId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPreferredTreatment("");
  };

  const handleExploreScience = () => {
    navigateTo("treatments");
  };

  const navigateTo = (page: "home" | "about" | "treatments" | "international" | "gallery" | "admin", scrollTargetId?: string) => {
    setCurrentPage(page);
    window.location.hash = page === "home" ? (scrollTargetId ? scrollTargetId : "home") : page;
    
    if (scrollTargetId) {
      setTimeout(() => {
        const el = document.getElementById(scrollTargetId);
        if (el) {
          const topOffset = el.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top: topOffset, behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#about") {
        setCurrentPage("about");
        window.scrollTo(0, 0);
      } else if (hash === "#treatments") {
        setCurrentPage("treatments");
        window.scrollTo(0, 0);
      } else if (hash === "#international") {
        setCurrentPage("international");
        window.scrollTo(0, 0);
      } else if (hash === "#gallery") {
        setCurrentPage("gallery");
        window.scrollTo(0, 0);
      } else if (hash === "#home" || hash === "") {
        setCurrentPage("home");
      } else if (hash.startsWith("#")) {
        setCurrentPage("home");
        const elementId = hash.substring(1);
        setTimeout(() => {
          const el = document.getElementById(elementId);
          if (el) {
            const topOffset = el.getBoundingClientRect().top + window.scrollY - 90;
            window.scrollTo({ top: topOffset, behavior: "smooth" });
          }
        }, 150);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // SEO Page Title updates
  useEffect(() => {
    document.title = "Dr. Dheeraj Vishwakarma - Best Endoscopic Spine Surgeon India";
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-cosmic-bg text-white font-sans selection:bg-gold-400 selection:text-black">
      {/* Precision Loader overlay */}
      {isLoading ? (
        <Loader onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="flex flex-col min-h-screen relative z-10">
          
          {/* Futuristic Cinematic Backplane */}
          <BioBackground />

          {/* Floating Pill Header */}
          <Navbar 
            onOpenBooking={() => handleOpenBooking()} 
            currentPage={currentPage}
            onNavigate={navigateTo}
          />

          {/* Core Content Layers Floating above the Canvas */}
          <main className="flex-1 pb-10">
            <AnimatePresence mode="wait">
              {currentPage === "home" && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  {/* 1. Cinematic Hero Frame */}
                  <Hero
                    onOpenBooking={() => handleOpenBooking("fess")}
                    onExploreScience={handleExploreScience}
                    onNavigateAbout={() => navigateTo("about")}
                  />

                  {/* 2. Interactive Recovery Milestones timeline */}
                  <div id="recovery-section">
                    <RecoveryTimeline />
                  </div>

                  {/* 3. Patient Testimonial slideshow review boards */}
                  <div id="testimonials-section">
                    <Testimonials />
                  </div>

                  {/* 3.5 Academic Honors & Achievements badges */}
                  <div id="awards-section">
                    <AwardsSection />
                  </div>

                  {/* 4. FAQ Accordion section */}
                  <div id="faq-section">
                    <FAQ />
                  </div>
                </motion.div>
              )}

              {currentPage === "about" && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="pt-24"
                >
                  <AboutMe />
                  <AwardsSection />
                  <Testimonials />
                </motion.div>
              )}

              {currentPage === "treatments" && (
                <motion.div
                  key="treatments"
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="pt-24"
                >
                  <Conditions onOpenBooking={handleOpenBooking} />
                </motion.div>
              )}

              {currentPage === "international" && (
                <motion.div
                  key="international"
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="pt-24"
                >
                  <InternationalPatients onOpenBooking={() => handleOpenBooking("fess")} />
                </motion.div>
              )}

              {currentPage === "gallery" && (
                <motion.div
                  key="gallery"
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="pt-24"
                >
                  <Gallery />
                </motion.div>
              )}

              {currentPage === "admin" && (
                <motion.div
                  key="admin"
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="pt-24"
                >
                  <AdminPanel />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Luxury Editorial Footer with Doctor & Local Business JSON Schema */}
          <Footer onNavigate={navigateTo} />

          {/* Central booking dialogue scheduler */}
          <BookingModal
            isOpen={isBookingOpen}
            onClose={handleCloseBooking}
            preferredTreatmentId={preferredTreatment}
          />

        </div>
      )}
    </div>
  );
}

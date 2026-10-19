import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence } from "motion/react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Loader from "./components/Loader";
import BioBackground from "./components/BioBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import ImageNoticeModal from "./components/ImageNoticeModal";
import Breadcrumbs from "./components/Breadcrumbs";
import SocialActionCard from "./components/SocialActionCard";
import MobileStickyBar from "./components/MobileStickyBar";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const TreatmentsPage = lazy(() => import("./pages/TreatmentsPage"));
const TreatmentDetailPage = lazy(() => import("./pages/TreatmentDetailPage"));
const BlogsPage = lazy(() => import("./pages/BlogsPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const InternationalPage = lazy(() => import("./pages/InternationalPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preferredTreatment, setPreferredTreatment] = useState("");

  const location = useLocation();
  const { pathname, hash } = location;

  const handleOpenBooking = (treatmentId = "") => {
    setPreferredTreatment(treatmentId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPreferredTreatment("");
  };

  // Handle hash scrolling on path changes or initial page load
  useEffect(() => {
    if (hash) {
      const elementId = hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) {
          const topOffset = el.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top: topOffset, behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-cosmic-bg text-white font-sans selection:bg-gold-400 selection:text-black">
      {/* Precision Loader overlay */}
      {isLoading ? (
        <Loader onComplete={() => {
          setIsLoading(false);
          setIsNoticeOpen(true);
        }} />
      ) : (
        <div className="flex flex-col min-h-screen relative z-10">
          
          {/* Deep Navy Futuristic Backplane */}
          <BioBackground />

          {/* Sticky Precision Header */}
          <Navbar 
            onOpenBooking={() => handleOpenBooking()} 
          />

          {/* Breadcrumbs Path Indicator */}
          <Breadcrumbs />

          {/* Core Content Layers */}
          <main className="flex-1 pb-20 md:pb-10 relative z-10">
            <Suspense fallback={
              <div className="min-h-[50vh] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-gold-400 border-t-transparent animate-spin"></div>
              </div>
            }>
              <AnimatePresence mode="wait">
                {/* @ts-expect-error key is a standard React prop but not declared in RoutesProps */}
                <Routes location={location} key={pathname}>
                  <Route path="/" element={<Home onOpenBooking={handleOpenBooking} />} />
                  <Route path="/about" element={<AboutPage onOpenBooking={handleOpenBooking} />} />
                  <Route path="/treatments" element={<TreatmentsPage onOpenBooking={handleOpenBooking} />} />
                  <Route path="/treatments/:slug" element={<TreatmentDetailPage onOpenBooking={handleOpenBooking} />} />
                  
                  {/* Clean 301-style redirects for legacy/duplicate routes to avoid duplicate content penalties */}
                  <Route path="/services" element={<Navigate to="/treatments" replace />} />
                  <Route path="/conditions" element={<Navigate to="/treatments" replace />} />

                  <Route path="/blogs" element={<BlogsPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/contact" element={<ContactPage onOpenBooking={() => handleOpenBooking()} />} />
                  <Route path="/international" element={<Navigate to="/international-patients" replace />} />
                  <Route path="/international-patients" element={<InternationalPage onOpenBooking={() => handleOpenBooking("fess")} />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>

          {/* Editorial Footer */}
          <Footer />

          {/* Central booking dialogue scheduler */}
          <BookingModal
            isOpen={isBookingOpen}
            onClose={handleCloseBooking}
            preferredTreatmentId={preferredTreatment}
          />

          {/* Keyhole Spine Surgery Poster Announcement Modal */}
          <ImageNoticeModal
            isOpen={isNoticeOpen}
            onClose={() => setIsNoticeOpen(false)}
            onOpenBooking={() => handleOpenBooking("fess")}
          />

          {/* Floating Social Connections widget (Desktop) */}
          <SocialActionCard />

          {/* Mobile-Friendly Sticky Bottom Bar with Call, WhatsApp, and Booking */}
          <MobileStickyBar onOpenBooking={() => handleOpenBooking()} />

        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { Activity, Menu, X, CalendarCheck2, Globe, Lock } from "lucide-react";
import Logo from "./Logo";

interface NavbarProps {
  onOpenBooking: () => void;
  currentPage: "home" | "about" | "treatments" | "international" | "gallery" | "admin";
  onNavigate: (page: "home" | "about" | "treatments" | "international" | "gallery" | "admin", scrollTargetId?: string) => void;
}

export default function Navbar({ onOpenBooking, currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", page: "home" as const },
    { label: "About", page: "about" as const },
    { label: "Treatments", page: "treatments" as const },
    { label: "Gallery", page: "gallery" as const },
    { label: "Recovery Timeline", page: "home" as const, target: "recovery-section" },
    { label: "Int'l Patients", page: "international" as const },
    { label: "FAQ", page: "home" as const, target: "faq-section" }
  ];

  const handleItemClick = (item: typeof menuItems[0]) => {
    setMobileMenuOpen(false);
    onNavigate(item.page, item.target);
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-2 xs:px-4 sm:px-6 py-2.5 xs:py-4 md:py-6 flex justify-center`}
      >
        <div
          className={`w-full max-w-6xl flex items-center justify-between px-2.5 xs:px-4 sm:px-6 py-2 xs:py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? "glassmorphism shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-white/10 scale-[0.98] md:scale-95"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo Brand Frame */}
          <div
            onClick={() => onNavigate("home")}
            className="flex items-center cursor-pointer group shrink-0"
          >
            <Logo mode="horizontal" className="scale-90 group-hover:scale-95 transition-all duration-300" />
          </div>

          {/* Core Navigation List - Desktop editorial style */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 glassmorphism rounded-full border border-white/5">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleItemClick(item)}
                className={`text-xs px-4 py-1.5 rounded-full font-medium transition-all cursor-pointer relative ${
                  currentPage === item.page && (!item.target || window.location.hash.includes(item.target))
                    ? "text-gold-300 bg-white/10 border border-gold-400/20"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-1.5 xs:gap-2.5 shrink-0">
            {/* Secure Admin Portal Link */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate("admin");
              }}
              className={`flex items-center justify-center p-2 rounded-full border transition-all cursor-pointer ${
                currentPage === "admin"
                  ? "border-gold-400/60 bg-gold-400/10 text-gold-300 shadow-[0_0_12px_rgba(193,161,113,0.25)]"
                  : "border-white/5 bg-white/2 hover:bg-white/5 text-gray-400 hover:text-white"
              }`}
              title="Secure Admin Panel Desk"
              id="admin-nav-button"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>

            {/* International desk badge */}
            <button
              onClick={() => onNavigate("international")}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-sky-400/20 bg-sky-400/5 text-sky-300 hover:bg-sky-400/10 text-[10px] font-bold tracking-wider uppercase transition-colors pointer-events-auto"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Int'l Desk</span>
            </button>

            {/* Premium Consult CTA */}
            <button
              id="navbar-cta-consult"
              onClick={onOpenBooking}
              className="bg-gradient-to-r from-gold-400 to-gold-500 text-black hover:from-gold-500 hover:to-gold-600 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(193,161,113,0.15)] hover:scale-105 cursor-pointer flex items-center gap-1 sm:gap-1.5"
            >
              <CalendarCheck2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-black" />
              <span className="hidden md:inline">Schedule Consultation</span>
              <span className="hidden xs:inline md:hidden">Request Appointment</span>
              <span className="xs:hidden">Inquire</span>
            </button>

            {/* Mobile Drawer Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 sm:p-2 text-gray-300 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Menu className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer overlays */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-menu" className="fixed inset-0 z-50 bg-cosmic-bg/95 backdrop-blur-xl flex flex-col p-6 overflow-hidden">
          {/* Header block */}
          <div className="flex justify-between items-center pb-8 border-b border-white/5">
            <div className="flex items-center">
              <Logo mode="horizontal" className="scale-75 origin-left" />
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links list column */}
          <nav className="flex-1 flex flex-col justify-center space-y-6 px-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500">CLINICAL INDEX:</span>
            {menuItems.map((item, idx) => (
              <button
                key={item.label}
                onClick={() => handleItemClick(item)}
                className="text-left font-display font-semibold text-2xl text-gray-200 hover:text-gold-300 transition-colors cursor-pointer block"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate("admin");
              }}
              className="text-left font-display font-semibold text-xl text-gold-400 hover:text-gold-300 transition-colors cursor-pointer block pt-2 border-t border-white/5 flex items-center gap-2"
              id="mobile-admin-desk-link"
            >
              <Lock className="w-4 h-4 shrink-0 text-gold-400" />
              <span>Admin Desk</span>
            </button>
          </nav>

          {/* Quick contact / CTAs inside mobile menu drawer */}
          <div className="pt-6 border-t border-white/5 space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-gradient-to-r from-gold-400 to-gold-500 text-black py-4.5 rounded-full text-center font-bold tracking-wider text-xs uppercase shadow-md block"
            >
              Inquire for Appointment Scheduling
            </button>
            <div className="text-center font-mono text-[9px] text-gray-500 tracking-wider">
              DR. DHEERAJ VISHWAKARMA / PAN-INDIA CLINICAL CONSULTATIONS
            </div>
          </div>
        </div>
      )}
    </>
  );
}

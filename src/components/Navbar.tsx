import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, CalendarCheck2, PhoneCall, Globe, Lock, MessageCircle } from "lucide-react";
import Logo from "./Logo";
import { socialLinks } from "../data";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Recommended desktop navigation: Home | About Us | Treatments | Gallery | Contact Us
  const menuItems = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Treatments", to: "/treatments" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact Us", to: "/contact" }
  ];

  const handleItemClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Clinical Announcement / Direct Hotline Bar */}
      <div className="bg-navy-950/95 border-b border-white/5 py-1.5 px-3 sm:px-6 text-[11px] text-gray-300 relative z-50 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 min-w-0">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-mono text-gold-400 uppercase tracking-wider text-[10px] hidden sm:inline shrink-0">
              Jaipur Outpatient Clinics:
            </span>
            <span className="text-gray-300 text-[10px] sm:text-[10.5px] truncate">
              Mansarovar & Bhakrota • Mon-Sat 10 AM - 4 PM
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a
              href="tel:+918999898129"
              className="flex items-center gap-1.5 text-gray-200 hover:text-gold-300 font-medium transition-colors cursor-pointer text-[10.5px] sm:text-xs"
              title="Call clinical desk"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="font-sans font-semibold tracking-wide">+91 89998 98129</span>
            </a>

            <Link
              to="/international-patients"
              className="hidden md:flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider text-sky-400 hover:text-sky-300 transition-colors"
            >
              <Globe className="w-3 h-3" />
              <span>Int'l Desk</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        id="navbar-header"
        className={`sticky top-0 z-40 transition-all duration-300 w-full overflow-hidden ${
          scrolled
            ? "bg-navy-900/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.6)] border-b border-white/10 py-2 sm:py-2.5"
            : "bg-navy-900/80 backdrop-blur-sm border-b border-white/5 py-2.5 sm:py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 min-w-0">
          
          {/* Logo Frame - Strictly Unstretched & Proportional */}
          <Link
            to="/"
            className="flex items-center cursor-pointer group shrink min-w-0"
            aria-label="Dr. Dheeraj Vishwakarma - Endoscopic Spine Care Home"
          >
            <Logo mode="horizontal" className="transition-transform group-hover:scale-[1.02] duration-200" />
          </Link>

          {/* Desktop Navigation: Home | About Us | Treatments | Gallery | Contact Us */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-navy-850/80 border border-white/10 backdrop-blur-md shadow-inner"
          >
            {menuItems.map((item) => {
              const isActive =
                item.to === "/"
                  ? location.pathname === "/" && !location.hash
                  : location.pathname.startsWith(item.to);

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "text-black bg-gold-400 font-bold shadow-sm"
                      : "text-gray-200 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Phone Call Button (Medium+ screens) */}
            <a
              href="tel:+918999898129"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 hover:text-emerald-200 text-xs font-semibold transition-all cursor-pointer"
              title="Call Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call Now</span>
            </a>

            {/* Prominent Gold Book Appointment Button */}
            <button
              onClick={onOpenBooking}
              id="header-book-appointment-btn"
              className="bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 hover:from-gold-300 hover:to-gold-500 text-black px-2.5 xs:px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(197,164,109,0.35)] hover:scale-103 cursor-pointer flex items-center gap-1 sm:gap-1.5 shrink-0"
              aria-label="Book an appointment with Dr. Dheeraj Vishwakarma"
            >
              <CalendarCheck2 className="w-3.5 h-3.5 text-black shrink-0" />
              <span className="whitespace-nowrap">
                Book<span className="hidden sm:inline"> Appointment</span>
              </span>
            </button>

            {/* Secure Admin Desk Icon */}
            <Link
              to="/admin"
              className="hidden xl:flex items-center justify-center p-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="Doctor & Staff Portal"
              aria-label="Admin Portal"
            >
              <Lock className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Drawer Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 sm:p-2 text-gray-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Open mobile navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="fixed inset-0 z-50 bg-navy-950/98 backdrop-blur-2xl flex flex-col p-6 overflow-y-auto"
        >
          {/* Header block */}
          <div className="flex justify-between items-center pb-6 border-b border-white/10">
            <Logo mode="horizontal" className="scale-90 origin-left" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-white rounded-full bg-white/10 cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links list column */}
          <nav className="flex-1 flex flex-col justify-center space-y-4 py-8 px-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400 font-bold">
              CLINICAL NAVIGATION:
            </span>
            {menuItems.map((item, idx) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={handleItemClick}
                className="text-left font-display font-bold text-2xl text-gray-100 hover:text-gold-300 transition-colors cursor-pointer block py-1"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/international-patients"
              onClick={handleItemClick}
              className="text-left font-display text-lg text-sky-400 hover:text-sky-300 transition-colors cursor-pointer block pt-2"
            >
              International Patient Desk →
            </Link>

            <Link
              to="/admin"
              onClick={handleItemClick}
              className="text-left font-mono text-xs text-gray-400 hover:text-gold-300 transition-colors cursor-pointer block pt-2 border-t border-white/10 flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-gold-400" />
              <span>Doctor / Admin Login</span>
            </Link>
          </nav>

          {/* Quick Contact & CTAs inside mobile menu drawer */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <a
              href="tel:+918999898129"
              className="w-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 py-3 rounded-full text-center font-bold tracking-wider text-xs uppercase flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Call Hotline: +91 89998 98129</span>
            </a>

            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-full text-center font-bold tracking-wider text-xs uppercase flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-gradient-to-r from-gold-400 to-gold-500 text-black py-3.5 rounded-full text-center font-bold tracking-wider text-xs uppercase shadow-lg cursor-pointer block"
            >
              Book an Appointment
            </button>
            
            <p className="text-center font-mono text-[9px] text-gray-400 tracking-wider pt-2">
              DR. DHEERAJ VISHWAKARMA • ENDOSCOPIC SPINE CARE
            </p>
          </div>
        </div>
      )}
    </>
  );
}

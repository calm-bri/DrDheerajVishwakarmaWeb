import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Facebook, Instagram, Linkedin, Share2 } from "lucide-react";
import { socialLinks } from "../data";

export default function SocialActionCard() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside (important for mobile tap behavior)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation closure
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Check if link is configured, otherwise fallback to official email to avoid broken "#" links
  const getHref = (platform: "whatsapp" | "instagram" | "facebook" | "linkedin") => {
    const link = socialLinks[platform];
    if (link && link.trim() !== "") {
      return link;
    }
    // Fallbacks to avoid placeholder "#"
    if (platform === "whatsapp") {
      return "https://wa.me/918999898129";
    }
    return "mailto:drajvishu2020@gmail.com?subject=Clinical%20Inquiry%20-%20Dr.%20Dheeraj%2520Vishwakarma";
  };

  const getPlatformLabel = (platform: string) => {
    const link = socialLinks[platform as keyof typeof socialLinks];
    if (link && link.trim() !== "") {
      return `Visit our official ${platform} page`;
    }
    return `Inquire via email (Official ${platform} pending)`;
  };

  // Custom WhatsApp SVG path for pixel-perfect official branding
  const WhatsAppIcon = () => (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="w-4 h-4 sm:w-4.5 sm:h-4.5"
      aria-hidden="true"
    >
      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.982L2 22l5.166-1.353a9.957 9.957 0 004.836 1.258h.005c5.507 0 9.991-4.479 9.992-9.986 0-2.67-1.037-5.178-2.923-7.062A9.92 9.92 0 0012.012 2zm5.781 14.118c-.225.63-1.296 1.216-1.782 1.272-.487.056-.975.306-3.14-.543-2.8-1.096-4.607-3.924-4.747-4.11-.14-.187-1.147-1.522-1.147-2.902 0-1.38.718-2.06.974-2.337.256-.277.558-.346.743-.346.185 0 .37 0 .528.007.165.007.387-.063.608.45.225.539.773 1.879.84 2.015.067.137.113.313.022.5-.09.187-.143.3-.3.48-.157.18-.328.397-.478.541-.165.158-.337.333-.143.666.195.33.865 1.419 1.847 2.296.985.879 1.815 1.154 2.072 1.272.256.119.41.098.563-.075.158-.174.67-.775.845-1.038.174-.263.36-.219.6-.131.24.088 1.518.714 1.774.845.255.131.427.195.487.306.06.111.06.702-.165 1.332z"/>
    </svg>
  );

  return (
    <div ref={containerRef} className="select-none">
      
      {/* ==================================================
          DESKTOP LAYOUT (Floating Side Capsule)
          ================================================== */}
      <div 
        className="hidden md:block fixed right-6 top-1/2 -translate-y-1/2 z-50 font-sans"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <motion.div
          layout
          className="glassmorphism rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.6)] border border-white/10 p-2 flex items-center justify-end overflow-hidden"
          animate={{
            width: isOpen ? "265px" : "48px",
            height: "48px",
            backgroundColor: isOpen ? "rgba(9, 14, 24, 0.9)" : "rgba(9, 14, 24, 0.6)"
          }}
          transition={{ type: "spring", damping: 26, stiffness: 210 }}
        >
          {/* Social icons revealed on expand */}
          <div className="flex items-center gap-3.5 pr-2.5 pl-3.5 shrink-0">
            <AnimatePresence>
              {isOpen && (
                <>
                  {/* WhatsApp */}
                  <motion.a
                    key="wa-desk"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    href={getHref("whatsapp")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:text-white hover:bg-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-300"
                    aria-label={getPlatformLabel("whatsapp")}
                  >
                    <WhatsAppIcon />
                  </motion.a>

                  {/* Instagram */}
                  <motion.a
                    key="ig-desk"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                    href={getHref("instagram")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-violet-600 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-all duration-300"
                    aria-label={getPlatformLabel("instagram")}
                  >
                    <Instagram className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </motion.a>

                  {/* Facebook */}
                  <motion.a
                    key="fb-desk"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    href={getHref("facebook")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 hover:text-white hover:bg-blue-600 hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all duration-300"
                    aria-label={getPlatformLabel("facebook")}
                  >
                    <Facebook className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </motion.a>

                  {/* LinkedIn */}
                  <motion.a
                    key="li-desk"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, delay: 0.15 }}
                    href={getHref("linkedin")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 hover:text-white hover:bg-sky-500 hover:shadow-[0_0_15px_rgba(14,165,233,0.5)] transition-all duration-300"
                    aria-label={getPlatformLabel("linkedin")}
                  >
                    <Linkedin className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </motion.a>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Persistent Trigger Badge */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-8 h-8 rounded-full bg-gold-400/10 border border-gold-400/20 hover:border-gold-400 text-gold-300 hover:text-white hover:bg-gold-500/20 flex items-center justify-center transition-all cursor-pointer select-none"
            aria-expanded={isOpen}
            aria-label="Toggle social networks list"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X className="w-4.5 h-4.5" /> : <Share2 className="w-4.5 h-4.5" />}
            </motion.div>
          </button>
        </motion.div>
      </div>

      {/* ==================================================
          MOBILE LAYOUT (Bottom Floating Action Button)
          ================================================== */}
      <div className="block md:hidden fixed bottom-6 right-6 z-40 font-sans">
        
        {/* Animated Pop-up bubble menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              className="absolute bottom-16 right-0 flex flex-col gap-3 p-2.5 rounded-2xl glassmorphism bg-cosmic-card/95 border border-white/10 shadow-2xl items-center min-w-[48px]"
            >
              {/* WhatsApp */}
              <a
                href={getHref("whatsapp")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 active:bg-emerald-500 active:text-white transition-colors"
                aria-label={getPlatformLabel("whatsapp")}
              >
                <WhatsAppIcon />
              </a>

              {/* Instagram */}
              <a
                href={getHref("instagram")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-full bg-pink-500/15 border border-pink-500/20 text-pink-400 active:bg-pink-500 active:text-white transition-colors"
                aria-label={getPlatformLabel("instagram")}
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>

              {/* Facebook */}
              <a
                href={getHref("facebook")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-full bg-blue-600/15 border border-blue-600/20 text-blue-400 active:bg-blue-600 active:text-white transition-colors"
                aria-label={getPlatformLabel("facebook")}
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>

              {/* LinkedIn */}
              <a
                href={getHref("linkedin")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-full bg-sky-500/15 border border-sky-500/20 text-sky-400 active:bg-sky-500 active:text-white transition-colors"
                aria-label={getPlatformLabel("linkedin")}
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Primary FAB Trigger */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-black shadow-lg shadow-gold-500/20 border border-gold-400/40 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
          aria-expanded={isOpen}
          aria-label="Toggle contact & social channels menu"
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center"
          >
            {isOpen ? <X className="w-5 h-5 text-black" /> : <MessageCircle className="w-5 h-5 text-black fill-black/10" />}
          </motion.div>
        </button>
      </div>

    </div>
  );
}

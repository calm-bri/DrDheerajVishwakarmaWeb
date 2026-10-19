import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CalendarCheck2, PhoneCall } from "lucide-react";

interface ImageNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking?: () => void;
}

export default function ImageNoticeModal({
  isOpen,
  onClose,
  onOpenBooking
}: ImageNoticeModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            aria-label="Close popup backdrop"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="relative z-10 w-full max-w-[94vw] sm:max-w-sm md:max-w-md my-auto flex flex-col items-center select-none"
          >
            {/* Top Close Button (floating above card for easy tap on mobile) */}
            <button
              onClick={onClose}
              className="absolute -top-3.5 -right-2 sm:-top-4 sm:-right-4 z-30 w-10 h-10 rounded-full bg-navy-950/95 hover:bg-red-500 text-white hover:text-white border-2 border-white/20 shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer group"
              aria-label="Close popup"
              id="close-announcement-popup-btn"
            >
              <X className="w-5 h-5 text-gray-200 group-hover:text-white group-hover:rotate-90 transition-transform duration-200" />
            </button>

            {/* Poster Card */}
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-navy-950 flex flex-col">
              {/* Poster Image */}
              <div className="relative w-full overflow-hidden bg-black flex items-center justify-center">
                <img
                  src="/dr_dheeraj_keyhole_popup.jpg"
                  alt="कम चीरे में आधुनिक दूरबीन से रीढ़ की सर्जरी - डॉ. धीरज विश्वकर्मा"
                  className="w-full h-auto max-h-[72vh] sm:max-h-[75vh] object-contain block"
                  loading="eager"
                />
              </div>

              {/* Bottom Quick Action Bar */}
              <div className="p-3 sm:p-4 bg-gradient-to-r from-navy-900 via-navy-950 to-navy-900 border-t border-white/10 flex items-center gap-2.5">
                {onOpenBooking ? (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenBooking();
                    }}
                    className="flex-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-black py-2.5 sm:py-3 px-3 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-gold-500/20"
                    id="popup-book-consult-btn"
                  >
                    <CalendarCheck2 className="w-4 h-4 text-black shrink-0" />
                    <span>परामर्श बुक करें</span>
                  </button>
                ) : (
                  <a
                    href="tel:+918999898129"
                    className="flex-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-black py-2.5 sm:py-3 px-3 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-gold-500/20"
                  >
                    <PhoneCall className="w-4 h-4 text-black shrink-0" />
                    <span>कॉल करें +91 89998 98129</span>
                  </a>
                )}

                <button
                  onClick={onClose}
                  className="px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white border border-white/10 text-[11px] sm:text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                  id="popup-dismiss-btn"
                >
                  बंद करें
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

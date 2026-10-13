import React from "react";
import { PhoneCall, CalendarCheck2 } from "lucide-react";
import { socialLinks } from "../data";

interface MobileStickyBarProps {
  onOpenBooking: () => void;
}

export default function MobileStickyBar({ onOpenBooking }: MobileStickyBarProps) {
  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.982L2 22l5.166-1.353a9.957 9.957 0 004.836 1.258h.005c5.507 0 9.991-4.479 9.992-9.986 0-2.67-1.037-5.178-2.923-7.062A9.92 9.92 0 0012.012 2zm5.781 14.118c-.225.63-1.296 1.216-1.782 1.272-.487.056-.975.306-3.14-.543-2.8-1.096-4.607-3.924-4.747-4.11-.14-.187-1.147-1.522-1.147-2.902 0-1.38.718-2.06.974-2.337.256-.277.558-.346.743-.346.185 0 .37 0 .528.007.165.007.387-.063.608.45.225.539.773 1.879.84 2.015.067.137.113.313.022.5-.09.187-.143.3-.3.48-.157.18-.328.397-.478.541-.165.158-.337.333-.143.666.195.33.865 1.419 1.847 2.296.985.879 1.815 1.154 2.072 1.272.256.119.41.098.563-.075.158-.174.67-.775.845-1.038.174-.263.36-.219.6-.131.24.088 1.518.714 1.774.845.255.131.427.195.487.306.06.111.06.702-.165 1.332z"/>
    </svg>
  );

  return (
    <div
      id="mobile-sticky-cta-bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-950/95 backdrop-blur-xl border-t border-white/10 px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-[0_-8px_30px_rgba(0,0,0,0.7)]"
      role="region"
      aria-label="Quick Contact Actions"
    >
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* Call Now Button */}
        <a
          href="tel:+918999898129"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-navy-800/90 border border-emerald-500/30 text-emerald-400 active:bg-emerald-500 active:text-black font-semibold text-xs transition-colors text-center"
          aria-label="Call clinic directly at +91 89998 98129"
        >
          <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Call Now</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={socialLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 active:bg-emerald-400 text-white font-semibold text-xs transition-colors text-center shadow-sm"
          aria-label="Chat with Dr. Dheeraj Vishwakarma's desk on WhatsApp"
        >
          <WhatsAppIcon />
          <span>WhatsApp</span>
        </a>

        {/* Book Appointment Button */}
        <button
          onClick={onOpenBooking}
          className="flex-[1.2] flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer text-center"
          aria-label="Book an appointment"
        >
          <CalendarCheck2 className="w-3.5 h-3.5 text-black shrink-0" />
          <span>Book Now</span>
        </button>
      </div>
    </div>
  );
}

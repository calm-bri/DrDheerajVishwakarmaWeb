import React, { useState } from "react";

interface LogoProps {
  className?: string;
  mode?: "icon" | "full" | "horizontal";
  lightBg?: boolean;
}

export default function Logo({ className = "", mode = "full", lightBg = false }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  // Brand Colors match the uploaded logo perfectly:
  // Dark Blue/Slate: #132D3E
  // Soft Teal/Blue-Gray Circle Bg: #D5E3EA
  // Gold/Orange Accent: #DE8C44
  // Green Lobe: #5FA682
  // Light Banner Bg: #DFECF3

  const primaryStroke = lightBg ? "#132D3E" : "#EAF2F6";

  if (mode === "icon") {
    if (!imageError) {
      return (
        <div className={`relative flex items-center justify-center shrink-0 rounded-full overflow-hidden ${className}`}>
          <img
            src="/logo.png"
            alt="Dr. Dheeraj Vishwakarma - Endoscopic Spine Care Logo"
            width="176"
            height="176"
            loading="eager"
            onError={() => setImageError(true)}
            className="w-full h-full object-contain rounded-full transition-all duration-300"
            style={{ width: "auto", height: "auto", objectFit: "contain" }}
            referrerPolicy="no-referrer"
          />
        </div>
      );
    }

    return (
      <svg
        viewBox="0 0 400 400"
        className={`${className} transition-all duration-300`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "auto", height: "auto", maxHeight: "100%", maxWidth: "100%" }}
      >
        {/* Soft Background Circle */}
        <circle cx="200" cy="200" r="175" fill={lightBg ? "#D5E3EA" : "rgba(213, 227, 234, 0.13)"} />

        {/* Outer Orange/Gold Crescent Arc */}
        <path
          d="M 85,270 A 135,135 0 1,1 315,270 A 118,124 0 1,0 85,270"
          fill="#DE8C44"
        />

        {/* Skull and Head Contour */}
        <path
          d="M 178,285 C 152,260 148,165 192,125 C 215,108 245,115 252,148 C 258,175 250,215 220,240"
          fill="none"
          stroke={primaryStroke}
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Brain Leaf Lobes */}
        <g id="brain-lobes">
          <path
            d="M 200,175 C 175,170 170,140 185,125 C 192,118 200,122 200,140 Z"
            fill="#5FA682"
          />
          <path
            d="M 200,175 C 225,170 230,140 215,125 C 208,118 200,122 200,140 Z"
            fill="#DE8C44"
          />
          <line
            x1="200"
            y1="125"
            x2="200"
            y2="175"
            stroke={lightBg ? "#D5E3EA" : "#111827"}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </g>

        {/* Spinal Back Curve */}
        <path
          d="M 198,245 C 205,275 208,310 200,345"
          fill="none"
          stroke={primaryStroke}
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Back Shoulder Curve */}
        <path
          d="M 195,245 C 185,260 175,280 120,305"
          fill="none"
          stroke={primaryStroke}
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* Vertebrae Blocks */}
        <g fill="#FF9D42">
          <rect x="203" y="240" width="11" height="6" rx="1.5" transform="rotate(-15, 208, 243)" />
          <rect x="206" y="251" width="11" height="6.5" rx="1.5" transform="rotate(-10, 211, 254)" />
          <rect x="208" y="262" width="12" height="6.5" rx="1.5" transform="rotate(-5, 214, 265)" />
          <rect x="209" y="273" width="12" height="7" rx="1.5" transform="rotate(0, 215, 276)" />
          <rect x="209" y="285" width="12" height="7" rx="1.5" transform="rotate(5, 215, 288)" />
          <rect x="208" y="297" width="12" height="7" rx="1.5" transform="rotate(10, 214, 300)" />
          <rect x="206" y="309" width="11" height="7" rx="1.5" transform="rotate(15, 211, 312)" />
        </g>
      </svg>
    );
  }

  if (mode === "horizontal") {
    return (
      <div className={`flex items-center gap-2 sm:gap-3 min-w-0 ${className}`}>
        <div className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center shrink-0 rounded-full overflow-hidden">
          <Logo mode="icon" className="w-full h-full max-h-11" lightBg={lightBg} />
        </div>
        <div className="flex flex-col text-left justify-center min-w-0">
          <span className="font-display font-bold text-xs sm:text-sm tracking-wide text-white leading-tight truncate">
            Dr. Dheeraj Vishwakarma
          </span>
          <span className="font-sans text-[8.5px] sm:text-[10px] font-bold text-gold-400 tracking-[0.14em] uppercase leading-tight mt-0.5 truncate">
            Endoscopic Spine Care
          </span>
          <span className="font-mono text-[7.5px] sm:text-[8.5px] text-gray-400 tracking-wider hidden sm:block uppercase mt-0.5">
            M.Ch Neurosurgery • FESS Specialist
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto select-none flex items-center justify-center p-2">
        <Logo mode="icon" className="w-full h-full" lightBg={lightBg} />
      </div>

      <div className="mt-3 px-5 py-3.5 rounded-2xl bg-gradient-to-b from-navy-800/80 to-navy-900/90 border border-gold-400/25 shadow-xl max-w-sm sm:max-w-md">
        <h4 className="font-display font-bold text-base sm:text-xl tracking-wide text-white">
          Dr. Dheeraj Vishwakarma
        </h4>
        
        <div className="flex items-center justify-center gap-2.5 my-1.5">
          <div className="h-[1px] w-6 bg-gold-400/30" />
          <span className="font-sans text-[10px] sm:text-xs font-bold text-gold-400 tracking-[0.18em] uppercase shrink-0">
            Endoscopic Spine Surgeon
          </span>
          <div className="h-[1px] w-6 bg-gold-400/30" />
        </div>

        <p className="font-mono text-[9px] text-gray-400 tracking-wider uppercase">
          M.Ch Neurosurgery • Full Monoportal Spine Surgery
        </p>
      </div>
    </div>
  );
}

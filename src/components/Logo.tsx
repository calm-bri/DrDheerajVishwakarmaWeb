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
        <div className={`${className} overflow-hidden rounded-full aspect-square relative flex items-center justify-center bg-transparent`}>
          <img
            src="/logo.png"
            alt="Brain and Spine Endoscopic Surgeon"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover rounded-full scale-[1.15] transition-all duration-300"
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
      >
        {/* Soft Background Circle */}
        <circle cx="200" cy="200" r="175" fill={lightBg ? "#D5E3EA" : "rgba(213, 227, 234, 0.13)"} />

        {/* Outer Orange/Gold Crescent Arc - matching top semi-circle of the uploaded logo */}
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

        {/* Brain Leaf Lobes - Green and Orange */}
        <g id="brain-lobes">
          {/* Left/Green Half */}
          <path
            d="M 200,175 C 175,170 170,140 185,125 C 192,118 200,122 200,140 Z"
            fill="#5FA682"
          />
          {/* Right/Orange-Gold Half */}
          <path
            d="M 200,175 C 225,170 230,140 215,125 C 208,118 200,122 200,140 Z"
            fill="#DE8C44"
          />

          {/* Slicing vein channels to create the leaf structure */}
          <line
            x1="200"
            y1="125"
            x2="200"
            y2="175"
            stroke={lightBg ? "#D5E3EA" : "#111827"}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Left veins */}
          <path
            d="M 200,135 Q 185,130 178,134 M 200,148 Q 182,145 174,150 M 200,161 Q 185,158 179,165"
            fill="none"
            stroke={lightBg ? "#D5E3EA" : "#111827"}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Right veins */}
          <path
            d="M 200,135 Q 215,130 222,134 M 200,148 Q 218,145 226,150 M 200,161 Q 215,158 221,165"
            fill="none"
            stroke={lightBg ? "#D5E3EA" : "#111827"}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        {/* Spinal Back Curve - Dark Blue */}
        <path
          d="M 198,245 C 205,275 208,310 200,345"
          fill="none"
          stroke={primaryStroke}
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Back Shoulder Curve - Dark Blue */}
        <path
          d="M 195,245 C 185,260 175,280 120,305"
          fill="none"
          stroke={primaryStroke}
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* Front Shoulder Curve - Green */}
        <path
          d="M 225,235 C 235,248 255,260 295,265 C 310,267 322,305 322,305"
          fill="none"
          stroke="#5FA682"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Right parallel green line matching original logo */}
        <path
          d="M 220,248 C 228,278 230,312 225,350"
          fill="none"
          stroke="#5FA682"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Spine Vertebrae: vertical series of orange/gold blocks curving with the spine path */}
        <g fill="#FF9D42">
          <rect x="203" y="240" width="11" height="6" rx="1.5" transform="rotate(-15, 208, 243)" />
          <rect x="206" y="251" width="11" height="6.5" rx="1.5" transform="rotate(-10, 211, 254)" />
          <rect x="208" y="262" width="12" height="6.5" rx="1.5" transform="rotate(-5, 214, 265)" />
          <rect x="209" y="273" width="12" height="7" rx="1.5" transform="rotate(0, 215, 276)" />
          <rect x="209" y="285" width="12" height="7" rx="1.5" transform="rotate(5, 215, 288)" />
          <rect x="208" y="297" width="12" height="7" rx="1.5" transform="rotate(10, 214, 300)" />
          <rect x="206" y="309" width="11" height="7" rx="1.5" transform="rotate(15, 211, 312)" />
          <rect x="203" y="321" width="11" height="6.5" rx="1.5" transform="rotate(18, 208, 324)" />
          <rect x="199" y="332" width="10" height="6.5" rx="1.5" transform="rotate(20, 204, 335)" />
          <rect x="195" y="343" width="9" height="6" rx="1.5" transform="rotate(22, 199, 346)" />
        </g>

        {/* Endoscopic surgical instrument tool */}
        <g id="endoscopic-probe-tool">
          {/* Loop wire/cable */}
          <path
            d="M 295,278 C 325,273 330,305 310,312 C 295,317 285,302 298,290"
            fill="none"
            stroke="#7F8C8D"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {/* Shaft of the instrument */}
          <line
            x1="295"
            y1="280"
            x2="228"
            y2="295"
            stroke={lightBg ? "#132D3E" : "#BDC3C7"}
            strokeWidth="3.6"
            strokeLinecap="round"
          />
          {/* Collar of probe */}
          <line
            x1="233"
            y1="294"
            x2="228"
            y2="295"
            stroke="#DE8C44"
            strokeWidth="5"
          />
          {/* Laser targeting beam pointing directly to spinal segment */}
          <line
            x1="228"
            y1="295"
            x2="214"
            y2="298"
            stroke="#DE8C44"
            strokeWidth="2"
            strokeDasharray="2,1.5"
          />
          {/* Blue Connector */}
          <polygon
            points="289,275 299,273 302,281 292,283"
            fill="#4FA3DF"
          />
          {/* Small selector dial */}
          <circle cx="294" cy="274" r="2" fill="#DE8C44" />
        </g>
      </svg>
    );
  }

  if (mode === "horizontal") {
    return (
      <div className={`flex items-center gap-1.5 sm:gap-2.5 ${className}`}>
        <Logo mode="icon" className="w-8 h-8 sm:w-11 sm:h-11 shrink-0 animate-pulse-slow" lightBg={lightBg} />
        <div className="flex flex-col text-left">
          <span className="font-display font-black text-[9px] sm:text-[13px] tracking-[0.1em] sm:tracking-[0.14em] uppercase text-white leading-tight">
            MONOPORTAL ENDOSCOPIC
          </span>
          <span className="font-sans text-[6.5px] sm:text-[9px] font-bold text-gold-400 tracking-[0.1em] sm:tracking-[0.18em] uppercase leading-none mt-0.5 whitespace-nowrap">
            SPINE NEUROSURGEON
          </span>
          <span className="font-display text-[7.5px] sm:text-[11px] font-semibold text-gray-200 tracking-wider mt-0.5 whitespace-nowrap hidden min-[360px]:block">
            DR. DHEERAJ VISHWAKARMA
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* Full Emblem circle matching screenshot */}
      <div className="relative w-44 h-44 sm:w-56 sm:h-56 mx-auto select-none">
        <Logo mode="icon" className="w-full h-full" lightBg={lightBg} />
      </div>

      {/* Banner mimicking the exact layout of the uploaded logo */}
      <div className="mt-4 px-5 py-4 rounded-2xl bg-gradient-to-b from-sky-950/45 to-cosmic-card/90 border border-gold-400/20 shadow-[0_4px_30px_rgba(0,0,0,0.4)] max-w-sm sm:max-w-md">
        <h4 className="font-serif font-black text-lg sm:text-2xl tracking-[0.1em] text-white">
          MONOPORTAL ENDOSCOPIC
        </h4>
        
        <div className="flex items-center justify-center gap-3 my-1.5">
          <div className="h-[1px] w-8 bg-gold-400/30" />
          <span className="font-sans text-[10px] sm:text-xs font-bold text-[#DE8C44] tracking-[0.2em] uppercase shrink-0 leading-none">
            SPINE NEUROSURGEON
          </span>
          <div className="h-[1px] w-8 bg-gold-400/30" />
        </div>

        <div className="h-[1px] w-24 bg-white/10 mx-auto my-2" />

        <h3 className="font-sans font-extrabold text-sm sm:text-base tracking-wider text-white uppercase pt-0.5">
          DR. DHEERAJ VISHWAKARMA
        </h3>
      </div>
    </div>
  );
}

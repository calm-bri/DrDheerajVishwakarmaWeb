import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useData } from "../context/DataContext";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Maximize2, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Tag, 
  Camera, 
  Layers, 
  Plus, 
  Check,
  Search,
  BookOpen
} from "lucide-react";

// Robust TypeScript interfaces matching your custom gallery items
export interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "surgical" | "news" | "workshop";
  location: string;
  date: string;
  imageUrl: string;
  videoUrl?: string; // Optional surgical animation video link
  sizeClass: string; // Asymmetric grid span settings mimicking the loaded desert look!
  badge: string;
  featuredInHero?: boolean; // Show in main Hero carousel
}

export const INITIAL_SHOWCASES: ShowcaseItem[] = [
  {
    id: "sc-asia-india-records",
    title: "Asia & India Book of Records Certification",
    subtitle: "Pioneered youngest pediatric monoportal endoscopic discectomy milestone.",
    description: "Dr. Dheeraj Vishwakarma holding the record certificates for the Asia Book of Records and India Book of Records, recognizing the world-record milestone of performing a single-stitch 8mm monoportal endoscopic discectomy on the youngest patient (11 years old) for Cauda Equina Syndrome.",
    category: "news",
    location: "Jaipur, India",
    date: "July 2025",
    imageUrl: "/awards-records.jpg",
    sizeClass: "md:col-span-2 md:row-span-1 aspect-[16/10] sm:aspect-auto",
    badge: "Asia & India Record"
  },
  {
    id: "sc-db-news",
    title: "Dainik Bhaskar: Spine Endoscopy Landmark",
    subtitle: "Pioneering cervical-dorsal monoportal endoscopic spine surgery milestone.",
    description: "Front-page newspaper feature highlighting Dr. Dheeraj's landmark surgical execution, performing pioneering cervical-dorsal monoportal endoscopic decompression in Rajasthan.",
    category: "news",
    location: "Jaipur, Rajasthan",
    date: "June 2025",
    imageUrl: "/rajasthan_workshop_news1.jpg",
    sizeClass: "md:col-span-2 md:row-span-1 aspect-[16/10] sm:aspect-auto",
    badge: "Pioneering Landmark"
  },
  {
    id: "sc-rp-news",
    title: "Rajasthan Patrika: Single-Stitch Spine Care",
    subtitle: "Pioneering <8mm single-stitch ambulatory monoportal endoscopic spine surgeries.",
    description: "Special press release documenting the benefits of under-8mm single-stitch endoscopic surgery, explaining how avoiding muscle tears leads to same-day walking milestones.",
    category: "news",
    location: "Rajasthan",
    date: "August 2025",
    imageUrl: "/rajasthan_workshop_news2.jpg",
    sizeClass: "md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto",
    badge: "Single Stitch (<8mm)"
  },
  {
    id: "sc-news18-clip",
    title: "Newspaper Coverage: Pediatric Endoscopy Record",
    subtitle: "Press reporting the world-record youngest cauda equina single-stitch operation.",
    description: "State-wide press feature covering the successful single-stitch keyhole decompression performed on an 11-year-old child.",
    category: "news",
    location: "Jaipur, Rajasthan",
    date: "October 2025",
    imageUrl: "/rajasthan_workshop_news3.jpg",
    sizeClass: "md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto",
    badge: "Press Coverage"
  },
  {
    id: "sc-korea-fellowship",
    title: "International Fellowship in Endoscopic Spine Surgery – South Korea",
    subtitle: "AIN Hospital, South Korea — Mentorship under Dr. Kang-Taek Lim.",
    description: "Dr. Dheeraj Vishwakarma completed the International Fellowship in Endoscopic Spine Surgery and Neurosurgery at AIN Hospital, South Korea, under the mentorship of Dr. Kang-Taek Lim, gaining valuable insights into advanced endoscopic spine surgery and minimally invasive spinal techniques.",
    category: "surgical",
    location: "AIN Hospital, South Korea",
    date: "2024 - 2025",
    imageUrl: "/germany_fess_scrubs.jpg",
    sizeClass: "md:col-span-2 md:row-span-1 aspect-[16/10] sm:aspect-auto",
    badge: "South Korea Fellowship"
  },
  {
    id: "sc-1",
    title: "International Advanced FESS Training - Germany",
    subtitle: "Center for Spine Surgery & Pain Therapy, St. Anna Hospital Herne, Germany.",
    description: "Dr. Dheeraj Vishwakarma during his advanced international fellowship training in Full Endoscopic Spine Surgery (FESS) at the pioneering center in Germany.",
    category: "surgical",
    location: "St. Anna Hospital, Germany",
    date: "May 2025",
    imageUrl: "/germany_st_anna_hospital.jpg",
    sizeClass: "md:col-span-2 md:row-span-1 aspect-[16/10] sm:aspect-auto",
    badge: "Germany Fellowship"
  },
  {
    id: "sc-2",
    title: "Keyhole 8mm Incision Clinical Result",
    subtitle: "Real clinical post-operative incision compared against traditional surgical scale.",
    description: "Authentic clinical documentation demonstrating the under-8mm single-stitch keyhole incision compared to traditional 3 to 5 inch surgical scars.",
    category: "surgical",
    location: "Clinical Surgical Suite",
    date: "April 2026",
    imageUrl: "/keyhole_8mm_incision.jpg",
    sizeClass: "md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto",
    badge: "Authentic Clinical Result"
  },
  {
    id: "sc-3",
    title: "Full Monoportal Operating Scrubs - International Center",
    subtitle: "Operating room fellowship under international masters of spine endoscopy.",
    description: "Dr. Vishwakarma in surgical scrubs at the international training theater during live patient endoscopic decompressions.",
    category: "surgical",
    location: "International Spine Center",
    date: "March 2025",
    imageUrl: "/germany_fess_scrubs.jpg",
    sizeClass: "md:col-span-1 md:row-span-2 aspect-[3/4] sm:aspect-auto",
    badge: "Surgical Training"
  },
  {
    id: "sc-4",
    title: "Rajasthan Endoscopic Spine Hands-On Workshop",
    subtitle: "Direct surgical demonstration and mentoring for practicing spine surgeons.",
    description: "Dr. Dheeraj Vishwakarma delivering an interactive hands-on workshop demonstrating monoportal endoscopic instruments to fellow surgeons.",
    category: "workshop",
    location: "Jaipur, Rajasthan",
    date: "March 2026",
    imageUrl: "/rajasthan_workshop_demo.jpg",
    sizeClass: "md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto",
    badge: "Surgical Workshop"
  },
  {
    id: "sc-5",
    title: "Hands-On Clinical Workshop Live Session",
    subtitle: "Training neurosurgeons and orthopedic delegates on keyhole endoscopic techniques.",
    description: "Surgeons practicing endoscopic probe manipulation and canal navigation under Dr. Vishwakarma's direct clinical supervision.",
    category: "workshop",
    location: "Rajasthan Surgical Center",
    date: "January 2026",
    imageUrl: "/rajasthan_workshop_hands_on.jpg",
    sizeClass: "md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto",
    badge: "EuroSpine Award"
  },
  {
    id: "sc-6",
    title: "National Media Spotlight on Single-Stitch Interventions",
    subtitle: "Special front-page feature covering the clinical shift to outpatient spine solutions.",
    description: "An extensive interview piece detailing how endoscopic micro-discectomies drastically lower risk variables for elderly patients with cardiovascular complex histories.",
    category: "news",
    location: "Times Medical Focus Edition",
    date: "April 2026",
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
    sizeClass: "md:col-span-2 md:row-span-1 aspect-[16/10] sm:aspect-auto",
    badge: "Press Cover"
  },
  {
    id: "sc-7",
    title: "Interactive Live Cervical Decompression Broadcast",
    subtitle: "Satelitte link providing microscopic surgical feed to 300 delegates.",
    description: "Live demonstration of a posterior micro-drill widening of compressed neural clusters. Operating with high clarity under constant physiological fluid pressure.",
    category: "workshop",
    location: "National Spine Forum Broadcast Studio",
    date: "November 2025",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    sizeClass: "md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto",
    badge: "Interactive Broadcast"
  },
  {
    id: "sc-8",
    title: "Advanced Laser-Guidance Navigation Calibration",
    subtitle: "Testing real-time fusion of CT scans and low-dose dynamic micro-fluoroscopy.",
    description: "Perfecting the pin-point needle entry alignment matrix in the clinic, demonstrating precise micro-millimeter clearance from high-risk neural bundles before the patient enters recovery.",
    category: "surgical",
    location: "Spine Endoscopy Clinic",
    date: "September 2025",
    imageUrl: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=1200&q=80",
    sizeClass: "md:col-span-2 md:row-span-1 aspect-[16/10] sm:aspect-auto",
    badge: "Laser Guidance"
  }
];

export default function Gallery() {
  const { showcases, addShowcase, resetShowcases } = useData();
  const items = showcases;

  const [activeCategory, setActiveCategory] = useState<"all" | "surgical" | "news" | "workshop" | "video">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Lightbox view state
  const [activeItem, setActiveItem] = useState<ShowcaseItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Filtering showcase items
  const filteredItems = items.filter(item => {
    const isVideo = !!item.videoUrl;
    const catMatches = activeCategory === "all" || 
                       (activeCategory === "video" ? isVideo : item.category === activeCategory);
    const searchLower = searchQuery.toLowerCase();
    const queryMatches = item.title.toLowerCase().includes(searchLower) ||
                         item.subtitle.toLowerCase().includes(searchLower) ||
                         item.description.toLowerCase().includes(searchLower) ||
                         item.badge.toLowerCase().includes(searchLower) ||
                         item.location.toLowerCase().includes(searchLower);
    return catMatches && queryMatches;
  });

  // Lightbox Navigation support
  const openLightbox = (item: ShowcaseItem) => {
    const index = filteredItems.findIndex(i => i.id === item.id);
    setActiveItem(item);
    setLightboxIndex(index !== -1 ? index : 0);
  };

  const closeLightbox = () => {
    setActiveItem(null);
  };

  const handlePrev = () => {
    if (filteredItems.length <= 1) return;
    const prevIdx = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxIndex(prevIdx);
    setActiveItem(filteredItems[prevIdx]);
  };

  const handleNext = () => {
    if (filteredItems.length <= 1) return;
    const nextIdx = (lightboxIndex + 1) % filteredItems.length;
    setLightboxIndex(nextIdx);
    setActiveItem(filteredItems[nextIdx]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, lightboxIndex, filteredItems.length]);

  const handleResetCatalog = () => {
    if (confirm("Reset layout to standard clinical default showcases?")) {
      resetShowcases();
    }
  };

  return (
    <section id="custom-gallery-suite" className="relative min-h-screen py-12 px-4 xs:px-6 sm:px-8 max-w-7xl mx-auto text-white">
      {/* Absolute Ambient Background Lights resembling the premium desert photo template */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gold-400/5 rounded-full pointer-events-none blur-[140px]" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-sky-500/5 rounded-full pointer-events-none blur-[160px]" />

      {/* Top Header Section reminiscent of the stunning "Photo Gallery" user reference */}
      <div className="pt-10 pb-12 relative border-b border-white/5 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-gold-400 font-bold uppercase inline-block mb-4 text-glow-gold bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20">
              Surgical & Video Portfolio
            </span>
            <h1 className="font-display font-medium text-4xl sm:text-6xl tracking-tight leading-none text-white mb-2">
              Clinical Gallery & 4K Logs
            </h1>
            <p className="font-sans text-xs sm:text-sm text-gray-500 max-w-md font-medium tracking-wide">
              Medical breakthrough records, high-definition surgical theatres, 4K endoscopy video logs, and active workshop symposium snapshots.
            </p>
          </div>

          <div className="md:text-right max-w-xs">
            <p className="font-sans text-xs text-stone-400 leading-relaxed font-normal">
              Captured moments regarding <strong>Awake Monoportal Endoscopic Spine Surgery</strong>. Click any card to launch the video player or widescreen image presentation stage.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Command Hub */}
      <div className="mb-10 flex flex-col sm:flex-row gap-4 items-center justify-between bg-cosmic-card/50 p-4 rounded-3xl border border-white/5 backdrop-blur-md">
        
        {/* Dynamic Category Filtering */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-cosmic-bg/40 rounded-2xl border border-white/5 w-full sm:w-auto">
          {(["all", "surgical", "video", "news", "workshop"] as const).map((cat) => {
            const labelMap = {
              all: "All Gallery",
              surgical: "Surgical Action",
              video: "4K Video Logs",
              news: "News & Media",
              workshop: "Clinics & Workshops"
            };
            const isSelected = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-gold-400/15 border border-gold-400/20 text-gold-300 shadow-[0_0_15px_rgba(193,161,113,0.15)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
                id={`filter-pill-${cat}`}
              >
                {labelMap[cat]}
              </button>
            );
          })}
        </div>

        {/* Search & Actions block */}
        <div className="flex flex-col xs:flex-row items-center gap-3 w-full sm:w-auto justify-end">
          {/* Quick Search */}
          <div className="relative w-full xs:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search gallery & videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cosmic-bg/85 border border-white/10 rounded-full pl-9 pr-8 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-400/40 focus:ring-1 focus:ring-gold-400/20 transition-all font-sans"
              id="showcase-search-live"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label="Clear search query"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 bg-cosmic-card/30 border border-white/5 rounded-3xl backdrop-blur-md">
          <BookOpen className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <h3 className="font-display text-lg text-white font-medium mb-1.5">No matching cases currently curated</h3>
          <p className="text-gray-500 text-xs max-w-sm mx-auto mb-4">
            Try adjusting search keywords or changing filters.
          </p>
          <button 
            onClick={handleResetCatalog}
            className="text-xs text-gold-300 underline cursor-pointer"
          >
            Reset to default showcases
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-[250px] sm:auto-rows-[300px]">
          {filteredItems.map((item) => {
            return (
              <motion.div
                key={item.id}
                layoutId={`card-container-${item.id}`}
                onClick={() => openLightbox(item)}
                className={`group relative overflow-hidden rounded-[1.8rem] bg-cosmic-card border border-white/5 cursor-pointer flex flex-col justify-end shadow-lg hover:shadow-2xl transition-all duration-500 ${item.sizeClass}`}
                whileHover={{ y: -4 }}
              >
                {/* Media frame: HTML Video thumbnail if videoUrl exists, else Image */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-950">
                  {item.videoUrl ? (
                    <video
                      src={`${item.videoUrl}#t=0.5`}
                      preload="metadata"
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110 pointer-events-none"
                    />
                  ) : (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      width="600"
                      height="400"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {/* Subtle vignette gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 group-hover:via-black/45 transition-all duration-300" />
                </div>

                {/* Accent Top-Left Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="font-mono text-[9px] font-extrabold tracking-widest uppercase bg-black/60 backdrop-blur-md text-gold-300 px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1">
                    {item.videoUrl && <Play className="w-3 h-3 fill-gold-400 text-gold-400" />}
                    {item.badge}
                  </span>
                </div>

                {/* Top Right Play / Zoom Icon Indicator */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/90 group-hover:scale-110 transition-transform">
                    {item.videoUrl ? (
                      <Play className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    ) : (
                      <Maximize2 className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>

                {/* Bottom Body context with minimalistic captions */}
                <div className="relative z-10 p-5 sm:p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  
                  {/* Categorisation meta strip */}
                  <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400 mb-1.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gold-400/80" /> {item.location}
                    </span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>

                  {/* High display Title */}
                  <h2 className="font-display font-medium text-base sm:text-lg text-white group-hover:text-gold-300 transition-colors leading-snug tracking-tight mb-1">
                    {item.title}
                  </h2>

                  {/* Subtitle / Descriptive Label */}
                  <p className="text-xs text-stone-300/80 line-clamp-1 group-hover:text-stone-200 transition-colors font-sans">
                    {item.subtitle}
                  </p>

                  {/* Hover micro-action arrow */}
                  <div className="h-0 opacity-0 group-hover:h-5 group-hover:opacity-100 group-hover:mt-2 transition-all duration-300 flex items-center gap-1 text-[10px] font-bold text-gold-400 tracking-wider uppercase">
                    <span>Examine Picture</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Widescreen Interactive Lightbox Exhibition Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8"
          >
            {/* Carousel navigation counters */}
            <div className="absolute top-4 right-4 left-4 flex justify-between items-center z-50">
              <span className="font-mono text-[10px] text-gray-400 bg-white/5 border border-white/15 px-3.5 py-1.5 rounded-full backdrop-blur-md font-bold tracking-wider">
                GALLERY CASE {lightboxIndex + 1} OF {filteredItems.length}
              </span>
              <button
                onClick={closeLightbox}
                className="p-2.5 cursor-pointer rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 hover:scale-105 transition-all text-xs font-bold flex items-center gap-1.5"
                id="lightbox-close-btn"
                aria-label="Close gallery details"
              >
                <X className="w-4 h-4" />
                <span className="hidden xs:inline">Close</span>
              </button>
            </div>

            {/* Left Trigger Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-40 p-2 sm:p-3 cursor-pointer rounded-full bg-white/5 hover:bg-white/15 border border-white/5 hover:scale-110 text-gray-300 hover:text-white transition-all"
              aria-label="Previous gallery item"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Trigger Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-40 p-2 sm:p-3 cursor-pointer rounded-full bg-white/5 hover:bg-white/15 border border-white/5 hover:scale-110 text-gray-300 hover:text-white transition-all"
              aria-label="Next gallery item"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Exhibition Content Frame */}
            <motion.div
              layoutId={`card-container-${activeItem.id}`}
              className="w-full max-w-5xl max-h-[90vh] bg-cosmic-card border border-white/10 rounded-3xl overflow-y-auto flex flex-col md:grid md:grid-cols-5 md:overflow-hidden shadow-2xl relative"
            >
              {/* Left Screen Area - High-Resolution Image or Video Player (3 Cols) */}
              <div className="col-span-3 bg-[#070708] relative flex items-center justify-center min-h-[250px] xs:min-h-[350px] md:min-h-0 md:h-full overflow-hidden">
                {activeItem.videoUrl ? (
                  <video
                    src={activeItem.videoUrl}
                    controls
                    controlsList="noaudio"
                    autoPlay
                    muted
                    playsInline
                    onVolumeChange={(e) => {
                      e.currentTarget.muted = true;
                      e.currentTarget.volume = 0;
                    }}
                    className="w-full h-full max-h-[60vh] md:max-h-full object-contain p-2"
                  />
                ) : (
                  <img
                    src={activeItem.imageUrl}
                    alt={activeItem.title}
                    width="800"
                    height="600"
                    loading="lazy"
                    className="max-w-full max-h-[50vh] md:max-h-full object-contain p-2"
                    referrerPolicy="no-referrer"
                  />
                )}

                {/* Embedded Video Showcase Player if supplied */}
                {activeItem.videoUrl && (
                  <div className="absolute bottom-4 left-4 z-10 bg-black/80 px-2.5 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5 text-[10px] font-mono text-gold-300">
                    <Play className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    <span>Video Guidance Deck available</span>
                  </div>
                )}
              </div>

              {/* Right Sidebar Area - Editorial Context (2 Cols) */}
              <div className="col-span-2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-gradient-to-b from-cosmic-card to-zinc-950 md:h-[80vh]">
                <div className="space-y-6">
                  {/* Category marker & Close triggers */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="font-mono text-[9px] font-bold tracking-widest uppercase bg-gold-400/10 border border-gold-400/20 text-gold-300 px-3 py-1 rounded-full">
                      {activeItem.category} Case
                    </span>
                    <span className="font-mono text-[10px] text-gray-500">
                      {activeItem.date}
                    </span>
                  </div>

                  {/* Header Title */}
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-stone-400 block mb-1">
                      {activeItem.subtitle}
                    </span>
                    <h2 className="font-display font-medium text-xl md:text-2xl text-white leading-tight mb-2.5">
                      {activeItem.title}
                    </h2>

                    <div className="flex items-center gap-1.5 text-xs text-stone-400 pt-1">
                      <MapPin className="w-4 h-4 text-gold-400/90" />
                      <span>{activeItem.location}</span>
                    </div>
                  </div>

                  {/* Extensive Description */}
                  <div className="border-t border-white/5 pt-5">
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-1.5">Surgical Narrative context:</span>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                      {activeItem.description}
                    </p>
                  </div>
                </div>

                {/* Footer and Interactive details */}
                <div className="border-t border-white/5 pt-6 mt-8">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-500">
                      DR. DHEERAJ VISHWAKARMA
                    </span>
                    <span className="text-[10px] text-gold-400 font-bold bg-gold-400/10 px-2.5 py-1 rounded-md border border-gold-400/20">
                      Spinal Endoscopy
                    </span>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Layout resets in bottom layout */}
      <div className="mt-16 text-center text-[11px] text-stone-600 font-mono flex items-center justify-center gap-1.5">
        <span>© Dr. Dheeraj Vishwakarma Monoportal Endoscopic Spine Clinic Gallery.</span>
        <span>•</span>
        <button 
          onClick={handleResetCatalog}
          className="hover:text-red-400 underline cursor-pointer"
        >
          Reset Catalog to Clinical defaults
        </button>
      </div>

    </section>
  );
}

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
    description: "Front-page feature highlighting Dr. Dheeraj's landmark surgical execution, performing pioneering cervical-dorsal monoportal endoscopic decompression, allowing immediate post-op movement.",
    category: "news",
    location: "India Desk",
    date: "June 2025",
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
    sizeClass: "md:col-span-2 md:row-span-1 aspect-[16/10] sm:aspect-auto",
    badge: "Pioneering Case"
  },
  {
    id: "sc-rp-news",
    title: "Rajasthan Patrika: Single-Stitch Spine Care",
    subtitle: "Pioneering <8mm single-stitch ambulatory monoportal endoscopic spine surgeries.",
    description: "Special press release documenting the benefits of under-8mm single-stitch endoscopic surgery, explaining how avoiding muscle tears leads to same-day recovery milestones.",
    category: "news",
    location: "India Desk",
    date: "August 2025",
    imageUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80",
    sizeClass: "md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto",
    badge: "Single Stitch (<8mm)"
  },
  {
    id: "sc-news18-clip",
    title: "News 18 Studio: 50+ Monoportal Cases Milestone",
    subtitle: "Television broadcast feature covering the landmark 50+ multi-level endoscopic cases.",
    description: "Broadcast coverage detailing the clinical success rates and volume milestone of 50+ monoportal endoscopic spine procedures across cervical, dorsal, and lumbar sections.",
    category: "news",
    location: "News 18 Studio",
    date: "October 2025",
    imageUrl: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    sizeClass: "md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto",
    badge: "Television Broadcast"
  },
  {
    id: "sc-1",
    title: "Dual-Portal Endoscopic Operating Suite Setup",
    subtitle: "High-definition camera consoles & saline Continuous Pressure irrigation system.",
    description: "The main operating desk showing full-endoscopic spinal camera integration, dual continuous-flow pump nodes, and micro-manipulators. Keeping the incision under 8mm ensures absolute safety.",
    category: "surgical",
    location: "Surgical Theatre Unit A, India",
    date: "May 2026",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    sizeClass: "md:col-span-2 md:row-span-1 aspect-[16/10] sm:aspect-auto",
    badge: "Featured Room"
  },
  {
    id: "sc-2",
    title: "Post-Operative Recovery Patient Assessment",
    subtitle: "Real-time neuro-pathway validation while the patient is awake.",
    description: "Dr. Dheeraj Vishwakarma performing active motor checks immediately following a single-stitch transforaminal decompression. The patient walked independently within 3 hours.",
    category: "surgical",
    location: "Special Care Ward",
    date: "April 2026",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    sizeClass: "md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto",
    badge: "Awake Technique"
  },
  {
    id: "sc-3",
    title: "3D CT Reconstruction & Surgical Safe-Zone Trajectory",
    subtitle: "Pre-operative digital planning utilizing computerized bone densitometry.",
    description: "Advanced biomechanical mapping of the L4-L5 exit neural foramens. This mapping determines the exact needle entry trajectory, bypassing key supportive back muscle structures entirely.",
    category: "surgical",
    location: "Medical Robotics Lab",
    date: "March 2026",
    imageUrl: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=800&q=80",
    sizeClass: "md:col-span-1 md:row-span-2 aspect-[3/4] sm:aspect-auto",
    badge: "Target Mapping"
  },
  {
    id: "sc-4",
    title: "National FESS Advanced Cadaveric Summit",
    subtitle: "Hands-on instruction demonstrating drill guidance on high-fidelity models.",
    description: "Dr. Dheeraj instructing senior orthopedic and neurosurgery delegates on transforaminal camera rotation tricks at the Joint Spine Endoscopy Council session.",
    category: "workshop",
    location: "Training Headquarters, New Delhi",
    date: "March 2026",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    sizeClass: "md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto",
    badge: "Cadaveric Drill"
  },
  {
    id: "sc-5",
    title: "Healthcare Excellence Laurels at EuroSpine Meet",
    subtitle: "Honored with clinical merit award for comparative local awake reviews.",
    description: "International spine surgeons and orthopedic experts gather as Dr. Vishwakarma receives peer-reviewed recognition for achieving a 98.4% success rating with same-day outpatient cases.",
    category: "news",
    location: "Assembly Hall, Zurich",
    date: "January 2026",
    imageUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80",
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

  const [activeCategory, setActiveCategory] = useState<"all" | "surgical" | "news" | "workshop">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Lightbox view state
  const [activeItem, setActiveItem] = useState<ShowcaseItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Filtering showcase items
  const filteredItems = items.filter(item => {
    const catMatches = activeCategory === "all" || item.category === activeCategory;
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
              Surgical & Press Portfolio
            </span>
            <h1 className="font-display font-medium text-4xl sm:text-6xl tracking-tight leading-none text-white mb-2">
              Photo Gallery
            </h1>
            <p className="font-sans text-xs sm:text-sm text-gray-500 max-w-md font-medium tracking-wide">
              Medical breakthrough records, high-definition surgical theatres, award milestones, and active workshop symposium snapshots.
            </p>
          </div>

          <div className="md:text-right max-w-xs">
            <p className="font-sans text-xs text-stone-400 leading-relaxed font-normal">
              Captured moments regarding the transition of <strong>Awake Monoportal Endoscopic Spine Surgery</strong>. Click any card to launch the widescreen presentation stage.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Command Hub */}
      <div className="mb-10 flex flex-col sm:flex-row gap-4 items-center justify-between bg-cosmic-card/50 p-4 rounded-3xl border border-white/5 backdrop-blur-md">
        
        {/* Dynamic Category Filtering (Pills matching the light-desert vibe in dark modes) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-cosmic-bg/40 rounded-2xl border border-white/5 w-full sm:w-auto">
          {(["all", "surgical", "news", "workshop"] as const).map((cat) => {
            const labelMap = {
              all: "All Curates",
              surgical: "Surgical Action",
              news: "News & Media",
              workshop: "Clinics & Travel"
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
              placeholder="Search images..."
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

      {/* Main Grid: Asymmetrical Bento Layout mimicking the desert-scenics uploaded references! */}
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
                {/* Image element with elegant slow-zoom transition on hover */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-950">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    width="600"
                    height="400"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 group-hover:via-black/45 transition-all duration-300" />
                </div>

                {/* Accent Top-Left Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="font-mono text-[9px] font-extrabold tracking-widest uppercase bg-black/60 backdrop-blur-md text-gold-300 px-3 py-1.5 rounded-full border border-white/10">
                    {item.badge}
                  </span>
                </div>

                {/* Top Right Zoom Icon Indicator */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/90">
                    <Maximize2 className="w-3.5 h-3.5" />
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
              {/* Left Screen Area - High-Resolution Image (3 Cols) */}
              <div className="col-span-3 bg-[#070708] relative flex items-center justify-center min-h-[250px] xs:min-h-[350px] md:min-h-0 md:h-full overflow-hidden">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  width="800"
                  height="600"
                  loading="lazy"
                  className="max-w-full max-h-[50vh] md:max-h-full object-contain p-2"
                  referrerPolicy="no-referrer"
                />

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

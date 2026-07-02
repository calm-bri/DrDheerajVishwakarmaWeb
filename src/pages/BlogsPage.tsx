import { useState } from "react";
import { motion } from "motion/react";
import { Calendar, BookOpen, Clock, Search } from "lucide-react";
import SEOComponent from "../components/SEOComponent";
import { useData } from "../context/DataContext";

export default function BlogsPage() {
  const { blogs } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filtered = blogs.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const blogSchemas = blogs.map((art) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": art.title,
    "description": art.summary,
    "author": {
      "@type": "Person",
      "name": art.author
    },
    "publisher": {
      "@type": "Person",
      "name": "Dr. Dheeraj Vishwakarma"
    },
    "datePublished": art.id === "pediatric-cauda-equina-study" ? "2025-07-15" : "2026-03-15",
    "mainEntityOfPage": `https://www.endoscopicspinecare.com/blogs#${art.id}`
  }));

  return (
    <motion.div
      key="blogs"
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="pt-6 pb-20 px-4 xs:px-6 sm:px-8 max-w-6xl mx-auto text-white text-left"
    >
      <SEOComponent
        title="Medical Publications & Spine Surgery Research Articles"
        description="Read academic book chapters, case logs, and clinical research papers on Full Monoportal Endoscopic Spine Surgery (FESS) by Dr. Dheeraj Vishwakarma."
        path="/blogs"
        schemas={blogSchemas}
      />

      <div className="absolute top-10 left-10 w-96 h-96 bg-gold-400/5 rounded-full pointer-events-none blur-[140px]" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-sky-500/5 rounded-full pointer-events-none blur-[160px]" />

      {/* Header section */}
      <div className="pt-10 pb-8 relative border-b border-white/5 mb-10">
        <span className="font-mono text-[10px] tracking-[0.3em] text-gold-400 font-bold uppercase inline-block mb-3 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20">
          Academic Research & News
        </span>
        <h1 className="font-display font-medium text-4xl sm:text-5xl tracking-tight text-white mb-2">
          Clinical Publications
        </h1>
        <p className="font-sans text-xs sm:text-sm text-gray-500 max-w-xl font-medium">
          Authoritative articles, peer-reviewed study papers, and textbook chapters written by Dr. Dheeraj Vishwakarma covering modern spinal decompression.
        </p>
      </div>

      {/* Control bar */}
      <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between bg-cosmic-card/50 p-4 rounded-3xl border border-white/5 backdrop-blur-md">
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {["all", "Clinical Guide", "Research", "Case Study", "Book Chapter"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-mono tracking-wider transition-all cursor-pointer ${
                (selectedCategory === cat)
                  ? "bg-gold-400/15 border border-gold-400/30 text-gold-300 shadow-[0_0_15px_rgba(193,161,113,0.15)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              {cat === "all" ? "All Updates" : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-cosmic-bg/85 border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-400/40 transition-all font-sans"
          />
        </div>
      </div>

      {/* Grid of articles */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-cosmic-card/30 border border-white/5 rounded-3xl">
          <BookOpen className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 text-xs">No publications matched your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((art) => (
            <div
              key={art.id}
              className="p-6 sm:p-8 rounded-3xl glassmorphism bg-cosmic-card/40 border border-white/5 hover:border-gold-400/30 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-stone-500 uppercase">
                  <span className="bg-sky-400/10 border border-sky-400/20 text-sky-400 px-2.5 py-1 rounded-full font-bold">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{art.date}</span>
                  </div>
                </div>

                <h2 className="font-display font-medium text-lg text-white hover:text-gold-300 transition-colors leading-snug">
                  {art.title}
                </h2>

                <p className="text-xs text-gray-400 font-sans leading-relaxed line-clamp-3">
                  {art.summary}
                </p>

                <div className="text-xs text-gray-300 leading-relaxed font-sans bg-white/2 p-4 rounded-xl border border-white/5 font-light">
                  {art.content}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5 text-[9px] font-mono tracking-wider text-gray-500 uppercase">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gold-400/80" />
                  <span>{art.readTime}</span>
                </div>
                <span className="font-bold text-gray-400">By {art.author}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

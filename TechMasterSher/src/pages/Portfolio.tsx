import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";
import { mediaUrl } from "../utils/media";
import { LuxuryCard } from "../components/LuxuryCard";

export const Portfolio: React.FC = () => {
  const { dbData } = useData();
  const [activeFilter, setActiveFilter] = useState("All");

  const portfolioList = dbData?.portfolio && dbData.portfolio.length > 0 ? dbData.portfolio : [];
  const portfolioHero = dbData?.portfolioHero || {
    smallHeading: "CURATED SHOWCASES",
    mainHeadingLine1: "Product Engineering &",
    highlightText: "Student Collaborations"
  };

  const filters = dbData?.portfolioFilters && dbData.portfolioFilters.length > 0
    ? ["All", ...dbData.portfolioFilters.map((f: any) => f.name || f)]
    : [
        "All",
        "Videos",
        "Photos",
        "Projects",
        "Campaigns",
        "Reels",
        "Commercial Shoots",
        "Client Work"
      ];

  const filteredProjects = activeFilter === "All"
    ? portfolioList
    : portfolioList.filter((proj: any) => proj.category === activeFilter || (proj.categories && proj.categories.includes(activeFilter)));

  return (
    <div className="relative text-white min-h-screen pt-32 pb-8 px-6 overflow-hidden">
      {/* Background radial overlay */}
      <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="typo-badge mb-4"
        >
          {portfolioHero.smallHeading}
        </motion.div>
        
        <h1 className="typo-h1">
          {portfolioHero.mainHeadingLine1} <br />
          <span className="text-gold italic font-bold">{portfolioHero.highlightText}</span>.
        </h1>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto mb-16 flex flex-wrap gap-3 text-left relative z-10">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[1.5px] border transition-all duration-300 ${
              activeFilter === filter
                ? "bg-gold border-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                : "bg-[#0d0d0d] border-white/10 text-gray-400 hover:border-white/40 hover:text-white"
            }`}
          >
            {filter === "All" ? "All Work" : filter}
          </button>
        ))}
      </section>

      {/* Grid List */}
      <section className="max-w-7xl mx-auto text-left relative z-10">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: any, idx: number) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                key={project.id}
                className="h-full"
              >
                <LuxuryCard accentColor={project.accentColor} index={idx}>
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 mb-6 relative">
                        <img
                          src={mediaUrl(project.coverImage) || mediaUrl(project.image) || mediaUrl(project.imageUrl)}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          data-cursor="view"
                        />
                        <div className="absolute top-4 left-4 bg-black/85 border border-white/10 px-3 py-1 rounded-full text-[9px] uppercase tracking-[1px] font-mono text-gold/90">
                          {project.category}
                        </div>
                      </div>

                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] uppercase tracking-[2px] opacity-40 font-bold">{project.client}</span>
                        <span className="font-mono text-xs text-gold">{project.year}</span>
                      </div>

                      <h3 className="typo-card-title mb-3 group-hover:text-gold transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 items-center justify-between mt-auto">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag: any) => (
                          <span key={tag} className="px-2.5 py-0.5 rounded-md bg-white/5 text-[9px] font-mono text-gray-400">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button className="text-gold group-hover:text-white transition-colors duration-300 flex items-center gap-1 text-xs uppercase font-bold tracking-[1px]">
                        Review Case
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </LuxuryCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
};

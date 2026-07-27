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
    <div className="relative text-white min-h-screen pt-24 pb-8 px-6 overflow-hidden">
      {/* Background radial overlay */}
      <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="typo-badge mb-4 text-gold"
        >
          CREATIVE ECOSYSTEM
        </motion.div>
        
        <h1 className="typo-h1 mb-6">
          The <span className="text-gold italic font-bold">Multiverse</span>
        </h1>
        <p className="text-gray-300 text-base md:text-lg font-light max-w-2xl leading-relaxed">
          Masterpieces. In Motion — Our portfolio of 5 high-scale content channels spanning technology, automotive, podcasts, and viral entertainment.
        </p>
      </section>

      {/* The Multiverse Channel Grid */}
      <section className="max-w-7xl mx-auto mb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "1. Tech Master",
              desc: "High-scale technology breakdowns, hardware reviews, and cinematic teardowns.",
              stats: ["33M Subs on YT", "5.8M Followers on IG"],
              popular: "195M (Short) • 219M (Reel)",
              link: "https://www.youtube.com/@techmasterhq",
              accent: "#D4AF37"
            },
            {
              name: "2. Next Univerz",
              desc: "Engineering insights, software masterclasses, and digital transformation.",
              stats: ["5.5M Subs on YT"],
              popular: "88M (Shorts) • 4.6M (Long)",
              link: "https://www.youtube.com/@NextUniverz",
              accent: "#00E5FF"
            },
            {
              name: "3. Master Wheels",
              desc: "Supercar testing, EV innovations, and automotive engineering marvels.",
              stats: ["4.6M Subs on YT", "1.2M Followers on IG"],
              popular: "1.7M (Long) • 148M (Short) • 70M (Reel)",
              link: "https://www.youtube.com/@MasterWheelsAK",
              accent: "#FF3366"
            },
            {
              name: "4. Full Circle",
              desc: "Deep-dive conversations, creator podcasts, and behind-the-scenes stories.",
              stats: ["300K Subs on YT"],
              popular: "2M (Short)",
              link: "https://www.youtube.com/@fullcircle_in",
              accent: "#AA3BFF"
            },
            {
              name: "5. Trendz Talk",
              desc: "Viral tech trends, short-form pop tech, and culture storytelling.",
              stats: ["15K Followers on IG"],
              popular: "4.8M (Reel)",
              link: "https://www.instagram.com/techmasterco/",
              accent: "#00FF66"
            }
          ].map((channel, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-gold/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-xl font-bold text-white">{channel.name}</h3>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: channel.accent }} />
                </div>
                <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed mb-4">
                  {channel.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {channel.stats.map((st, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-semibold">
                      {st}
                    </span>
                  ))}
                </div>
                <div className="text-[11px] font-mono text-gray-400 bg-black/40 p-3 rounded-xl border border-white/5 mb-4">
                  <span className="text-gray-500 uppercase tracking-wider block text-[9px] mb-1">Most Popular:</span>
                  <span className="text-white font-medium">{channel.popular}</span>
                </div>
              </div>

              <a
                href={channel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-gold hover:text-white transition-colors text-xs font-mono uppercase tracking-wider font-bold"
              >
                Visit Channel <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}
        </div>
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

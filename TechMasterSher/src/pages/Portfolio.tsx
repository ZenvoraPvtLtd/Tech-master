import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";
import { mediaUrl } from "../utils/media";
import { LuxuryCard } from "../components/LuxuryCard";

export const Portfolio: React.FC = () => {
  const { dbData } = useData();
  const [activeFilter, setActiveFilter] = useState("All");

  let localDb: any = {};
  try {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) localDb = JSON.parse(saved);
  } catch (e) {}

  const activeDb = { ...localDb, ...dbData };

  const rawHero = activeDb?.portfolioHero || activeDb?.portfolioCMS?.hero;
  
  const heroData = {
    badge: (rawHero?.badge && !rawHero.badge.includes("MASTERPIECES")) ? rawHero.badge : "CREATIVE ECOSYSTEM",
    title: (rawHero?.title && rawHero.title !== "MASTERPIECES") ? rawHero.title : "The",
    highlightText: (rawHero?.highlightText && rawHero.highlightText !== "MASTERPIECES") ? rawHero.highlightText : "Multiverse",
    description: (rawHero?.description && !rawHero.description.includes("executive content management platform")) 
      ? rawHero.description 
      : "Masterpieces. In Motion — Our portfolio of 5 high-scale content channels spanning technology, automotive, podcasts, and viral entertainment."
  };

  const defaultChannels = [
    {
      name: "1. Tech Master",
      desc: "High-scale technology breakdowns, hardware reviews, and cinematic teardowns.",
      stats: ["33M Subs on YT", "5.8M Followers on IG"],
      ytSubs: "33M Subs on YT",
      igFollowers: "5.8M Followers on IG",
      popular: "195M (Short) • 219M (Reel)",
      link: "https://www.youtube.com/@techmasterhq",
      accent: "#D4AF37"
    },
    {
      name: "2. Next Univerz",
      desc: "Engineering insights, software masterclasses, and digital transformation.",
      stats: ["5.5M Subs on YT"],
      ytSubs: "5.5M Subs on YT",
      igFollowers: "",
      popular: "88M (Shorts) • 4.6M (Long)",
      link: "https://www.youtube.com/@NextUniverz",
      accent: "#00E5FF"
    },
    {
      name: "3. Master Wheels",
      desc: "Supercar testing, EV innovations, and automotive engineering marvels.",
      stats: ["4.6M Subs on YT", "1.2M Followers on IG"],
      ytSubs: "4.6M Subs on YT",
      igFollowers: "1.2M Followers on IG",
      popular: "1.7M (Long) • 148M (Short) • 70M (Reel)",
      link: "https://www.youtube.com/@MasterWheelsAK",
      accent: "#FF3366"
    },
    {
      name: "4. Full Circle",
      desc: "Deep-dive conversations, creator podcasts, and behind-the-scenes stories.",
      stats: ["300K Subs on YT"],
      ytSubs: "300K Subs on YT",
      igFollowers: "",
      popular: "2M (Short)",
      link: "https://www.youtube.com/@fullcircle_in",
      accent: "#AA3BFF"
    },
    {
      name: "5. Trendz Talk",
      desc: "Viral tech trends, short-form pop tech, and culture storytelling.",
      stats: ["15K Followers on IG"],
      ytSubs: "",
      igFollowers: "15K Followers on IG",
      popular: "4.8M (Reel)",
      link: "https://www.instagram.com/techmasterco/",
      accent: "#00FF66"
    }
  ];

  const defaultProjects = [
    {
      id: "proj-1",
      title: "Asus ROG Phone 8 Global Reveal",
      category: "Videos",
      client: "ASUS Gaming",
      year: "2026",
      description: "Complete commercial production, 3D gaming render animations, and multi-channel launch across Tech Master ecosystem.",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
      accentColor: "#D4AF37",
      tags: ["3D Animation", "Commercial Shoot", "Hardware Review"],
      buttonText: "Review Case",
      buttonUrl: "https://youtube.com",
      featured: true,
      visible: true
    },
    {
      id: "proj-2",
      title: "Tesla Cyberbeast Track Performance Test",
      category: "Commercial Shoots",
      client: "Master Wheels",
      year: "2026",
      description: "High-speed 4K tracking camera production at Buddh International Circuit testing top-speed telemetry.",
      imageUrl: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
      accentColor: "#FF3366",
      tags: ["Automotive", "High-Speed Cinema", "Telemetry"],
      buttonText: "Review Case",
      buttonUrl: "https://youtube.com",
      featured: true,
      visible: true
    },
    {
      id: "proj-3",
      title: "Next Univerz Full-Stack Masterclass",
      category: "Projects",
      client: "Next Univerz",
      year: "2025",
      description: "Curriculum design, interactive coding sandbox development, and 50+ video production modules.",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
      accentColor: "#00E5FF",
      tags: ["Education", "Full-Stack", "Masterclass"],
      buttonText: "Review Case",
      buttonUrl: "https://youtube.com",
      featured: true,
      visible: true
    },
    {
      id: "proj-4",
      title: "Full Circle Studio Podcast with CEO Guests",
      category: "Reels",
      client: "Full Circle",
      year: "2025",
      description: "Multi-cam 4K podcast recording suite, spatial audio mix, and viral short clips editing.",
      imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800",
      accentColor: "#AA3BFF",
      tags: ["Podcast", "Multi-Cam", "Viral Clips"],
      buttonText: "Review Case",
      buttonUrl: "https://youtube.com",
      featured: true,
      visible: true
    },
    {
      id: "proj-5",
      title: "Trendz Talk Pop Tech Short-Form Series",
      category: "Reels",
      client: "Trendz Talk",
      year: "2026",
      description: "Fast-paced vertical tech news series reaching 4.8M+ views per reel on Instagram.",
      imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800",
      accentColor: "#00FF66",
      tags: ["Short-Form", "Pop Tech", "Viral Reels"],
      buttonText: "Review Case",
      buttonUrl: "https://instagram.com",
      featured: true,
      visible: true
    },
    {
      id: "proj-6",
      title: "Apple Vision Pro Spatial Computing Showcase",
      category: "Videos",
      client: "Tech Master",
      year: "2025",
      description: "In-depth spatial audio and optical tracking teardown reaching 15M+ tech enthusiasts.",
      imageUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=800",
      accentColor: "#D4AF37",
      tags: ["Spatial Computing", "Teardown", "Apple"],
      buttonText: "Review Case",
      buttonUrl: "https://youtube.com",
      featured: true,
      visible: true
    }
  ];

  const channels = (activeDb?.multiverseChannels || activeDb?.portfolioCMS?.channels || defaultChannels).filter((c: any) => c.visible !== false && !c.deleted);

  const rawProjects = (activeDb?.portfolio && activeDb.portfolio.length > 0) 
    ? activeDb.portfolio 
    : (activeDb?.portfolioCMS?.projects && activeDb.portfolioCMS.projects.length > 0) 
      ? activeDb.portfolioCMS.projects 
      : defaultProjects;

  const portfolioList = rawProjects.filter((p: any) => p.visible !== false && !p.deleted);

  const defaultFilters = ["Videos", "Photos", "Projects", "Campaigns", "Reels", "Commercial Shoots", "Client Work"];
  const rawFilters = activeDb?.portfolioFilters || activeDb?.portfolioCMS?.categories || defaultFilters;
  
  const filters = [
    "All",
    ...rawFilters.map((f: any) => typeof f === 'string' ? f : (f.name || f)).filter(Boolean)
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
          {heroData.badge}
        </motion.div>
        
        <h1 className="typo-h1 mb-6">
          {heroData.title} <span className="text-gold italic font-bold">{heroData.highlightText}</span>
        </h1>
        <p className="text-gray-300 text-base md:text-lg font-light max-w-2xl leading-relaxed">
          {heroData.description}
        </p>
      </section>

      {/* The Multiverse Channel Grid */}
      <section className="max-w-7xl mx-auto mb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.map((channel: any, idx: number) => {
            const channelStats = Array.isArray(channel.stats) 
              ? channel.stats 
              : [channel.ytSubs, channel.igFollowers].filter(Boolean);

            return (
              <motion.div
                key={channel.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-gold/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-serif text-xl font-bold text-white">{channel.name}</h3>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: channel.accent || '#D4AF37' }} />
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed mb-4">
                    {channel.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {channelStats.map((st: string, i: number) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-semibold">
                        {st}
                      </span>
                    ))}
                  </div>
                  {channel.popular && (
                    <div className="text-[11px] font-mono text-gray-400 bg-black/40 p-3 rounded-xl border border-white/5 mb-4">
                      <span className="text-gray-500 uppercase tracking-wider block text-[9px] mb-1">Most Popular:</span>
                      <span className="text-white font-medium">{channel.popular}</span>
                    </div>
                  )}
                </div>

                {channel.link && (
                  <a
                    href={channel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-gold hover:text-white transition-colors text-xs font-mono uppercase tracking-wider font-bold"
                  >
                    Visit Channel <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto mb-16 flex flex-wrap gap-3 text-left relative z-10">
        {filters.map((filter: string) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[1.5px] border transition-all duration-300 cursor-pointer ${
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
                key={project.id || idx}
                className="h-full"
              >
                <LuxuryCard accentColor={project.accentColor || '#D4AF37'} index={idx}>
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
                        {Array.isArray(project.tags) && project.tags.map((tag: any) => (
                          <span key={tag} className="px-2.5 py-0.5 rounded-md bg-white/5 text-[9px] font-mono text-gray-400">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a 
                        href={project.buttonUrl || project.link || '#'} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-gold group-hover:text-white transition-colors duration-300 flex items-center gap-1 text-xs uppercase font-bold tracking-[1px]"
                      >
                        {project.buttonText || 'Review Case'}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
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

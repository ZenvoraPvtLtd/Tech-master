import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";
import { mediaUrl } from "../utils/media";
import { LuxuryCard } from "../components/LuxuryCard";

const YoutubeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const CHANNEL_SOCIAL_LINKS: Record<string, { youtube?: string; instagram?: string }> = {
  "Tech Master": {
    youtube: "https://www.youtube.com/@techmasterhq",
    instagram: "https://www.instagram.com/techmasterco/?hl=en"
  },
  "Next Univerz": {
    youtube: "https://www.youtube.com/@NextUniverz",
    instagram: "https://www.instagram.com/NextUniverz/"
  },
  "Master Wheels": {
    youtube: "https://www.youtube.com/@MasterWheelsAK",
    instagram: "https://www.instagram.com/masterwheel1/"
  },
  "Full Circle": {
    youtube: "https://www.youtube.com/@fullcircle_in",
    instagram: "https://www.instagram.com/fullcircle_in/"
  },
  "Trendz Talk": {
    youtube: "",
    instagram: "https://www.instagram.com/techmasterco/"
  }
};

const getSocialLinks = (ch: any) => {
  const rawName = (ch.keyName || ch.name || "").replace(/^\d+\.\s*/, "").trim();
  const known = CHANNEL_SOCIAL_LINKS[rawName] || CHANNEL_SOCIAL_LINKS[ch.name] || {};
  return {
    youtube: ch.youtubeLink || ch.ytLink || known.youtube || (ch.link?.includes("youtube") ? ch.link : ""),
    instagram: ch.instagramLink || ch.igLink || known.instagram || (ch.link?.includes("instagram") ? ch.link : "")
  };
};

export const Portfolio: React.FC = () => {
  const { dbData } = useData();
  const [selectedChannel, setSelectedChannel] = useState("All");
  const [activeFilter, setActiveFilter] = useState("All");
  const [livePortfolioData, setLivePortfolioData] = useState<any>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "https://techmasterbackend.onrender.com/api/v1";
        const res = await fetch(`${baseUrl}/portfolio`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setLivePortfolioData(json.data);
          }
        }
      } catch (e) {
        console.warn("Direct Portfolio fetch error:", e);
      }
    };
    fetchPortfolio();
  }, []);

  let localDb: any = {};
  try {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) localDb = JSON.parse(saved);
  } catch (e) {}

  const activeDb = { ...localDb, ...dbData };

  const rawHero = livePortfolioData?.hero || activeDb?.portfolioHero || activeDb?.portfolioCMS?.hero;
  
  const heroData = {
    badge: (rawHero?.badge && !rawHero.badge.includes("MASTERPIECES")) ? rawHero.badge : "CREATIVE ECOSYSTEM",
    title: (rawHero?.title && rawHero.title !== "MASTERPIECES") ? rawHero.title : "The",
    highlightText: (rawHero?.highlightText || rawHero?.highlightedTitle) ? (rawHero.highlightText || rawHero.highlightedTitle) : "Multiverse",
    description: (rawHero?.description && !rawHero.description.includes("executive content management platform")) 
      ? rawHero.description 
      : "Masterpieces. In Motion — Our portfolio of 5 high-scale content channels spanning technology, automotive, podcasts, and viral entertainment."
  };

  const defaultChannels = [
    {
      id: "ch-1",
      keyName: "Tech Master",
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
      id: "ch-2",
      keyName: "Next Univerz",
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
      id: "ch-3",
      keyName: "Master Wheels",
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
      id: "ch-4",
      keyName: "Full Circle",
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
      id: "ch-5",
      keyName: "Trendz Talk",
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
      client: "Tech Master",
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

  const rawChannels = livePortfolioData?.channels || activeDb?.multiverseChannels || activeDb?.portfolioCMS?.channels || defaultChannels;
  const channels = (Array.isArray(rawChannels) && rawChannels.length > 0 ? rawChannels : defaultChannels).filter((c: any) => c.visible !== false && !c.deleted);

  const rawProjects = (livePortfolioData?.projects && livePortfolioData.projects.length > 0)
    ? livePortfolioData.projects
    : (activeDb?.portfolio && activeDb.portfolio.length > 0) 
      ? activeDb.portfolio 
      : (activeDb?.portfolioCMS?.projects && activeDb.portfolioCMS.projects.length > 0) 
        ? activeDb.portfolioCMS.projects 
        : defaultProjects;

  const portfolioList = (Array.isArray(rawProjects) && rawProjects.length > 0 ? rawProjects : defaultProjects).filter((p: any) => p.visible !== false && !p.deleted);

  const defaultFilters = ["Videos", "Photos", "Projects", "Campaigns", "Reels", "Commercial Shoots", "Client Work"];
  const rawFilters = livePortfolioData?.categories || activeDb?.portfolioFilters || activeDb?.portfolioCMS?.categories || defaultFilters;
  
  const filters = [
    "All Work",
    ...rawFilters.map((f: any) => typeof f === 'string' ? f : (f.name || f)).filter(Boolean)
  ];

  // Combined Dual Filtering by Channel & Category
  const filteredProjects = portfolioList.filter((proj: any) => {
    // 1. Channel Filter
    const matchesChannel = selectedChannel === "All" || (
      (proj.client && proj.client.toLowerCase().includes(selectedChannel.toLowerCase())) ||
      (proj.title && proj.title.toLowerCase().includes(selectedChannel.toLowerCase())) ||
      (proj.description && proj.description.toLowerCase().includes(selectedChannel.toLowerCase()))
    );

    // 2. Category Filter
    const isAllCategory = activeFilter === "All" || activeFilter === "All Work";
    const matchesCategory = isAllCategory || (
      proj.category === activeFilter ||
      (proj.categories && proj.categories.includes(activeFilter))
    );

    return matchesChannel && matchesCategory;
  });

  return (
    <div className="relative text-white min-h-screen pt-24 pb-16 px-6 overflow-hidden bg-black">
      {/* Background radial overlay */}
      <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-10 relative z-10">
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

      {/* 1. CHANNEL FILTER BUTTONS BAR */}
      <section className="max-w-7xl mx-auto mb-8 relative z-10">
        <div className="flex flex-wrap gap-2.5 items-center">
          <button
            onClick={() => setSelectedChannel("All")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[1.5px] border transition-all duration-300 cursor-pointer ${
              selectedChannel === "All"
                ? "bg-gold border-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] font-black"
                : "bg-[#0d0d0d] border-white/10 text-gray-400 hover:border-gold/40 hover:text-white"
            }`}
          >
            ALL CHANNELS
          </button>

          {channels.map((ch: any) => {
            const rawName = (ch.keyName || ch.name || "").replace(/^\d+\.\s*/, "").trim();
            const isSelected = selectedChannel.toLowerCase() === rawName.toLowerCase();
            return (
              <button
                key={ch.id || ch.name}
                onClick={() => setSelectedChannel(rawName)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[1.5px] border transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-gold border-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] font-black"
                    : "bg-[#0d0d0d] border-white/10 text-gray-400 hover:border-gold/40 hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ch.accent || '#D4AF37' }} />
                {rawName}
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. DYNAMIC CENTERED CHANNEL CARDS DISPLAY */}
      <section className="max-w-7xl mx-auto mb-16 relative z-10">
        <AnimatePresence mode="wait">
          {selectedChannel !== "All" ? (
            // Single Centered Channel Card
            <motion.div
              key={selectedChannel}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-xl mx-auto"
            >
              {(() => {
                const ch = channels.find((c: any) => {
                  const rawName = (c.keyName || c.name || "").replace(/^\d+\.\s*/, "").trim();
                  return rawName.toLowerCase() === selectedChannel.toLowerCase();
                }) || channels[0];
                
                const channelStats = Array.isArray(ch.stats) 
                  ? ch.stats 
                  : [ch.ytSubs, ch.igFollowers].filter(Boolean);

                return (
                  <div className="glass-panel p-8 sm:p-10 rounded-3xl border-2 border-gold/50 shadow-[0_0_50px_rgba(212,175,55,0.25)] bg-black/85 backdrop-blur-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">{ch.name}</h3>
                        <span className="w-3.5 h-3.5 rounded-full shadow-[0_0_12px_rgba(212,175,55,0.8)]" style={{ backgroundColor: ch.accent || '#D4AF37' }} />
                      </div>
                      <div className="flex flex-wrap gap-2.5 mb-6">
                        {channelStats.map((st: string, i: number) => (
                          <span key={i} className="px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold">
                            {st}
                          </span>
                        ))}
                      </div>
                      {ch.popular && (
                        <div className="text-xs font-mono text-gray-300 bg-black/60 p-4 rounded-2xl border border-white/10 mb-6">
                          <span className="text-gold uppercase tracking-wider block text-[10px] mb-1 font-bold">MOST POPULAR:</span>
                          <span className="text-white font-semibold text-sm">{ch.popular}</span>
                        </div>
                      )}
                    </div>

                    {/* Circular Social Buttons (YouTube & Instagram) */}
                    {(() => {
                      const social = getSocialLinks(ch);
                      return (
                        <div className="flex items-center gap-3 pt-2">
                          {social.youtube && (
                            <a
                              href={social.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Visit YouTube Channel"
                              onClick={(e) => e.stopPropagation()}
                              className="w-11 h-11 rounded-full border border-red-500/40 bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 flex items-center justify-center shadow-lg group/btn cursor-pointer"
                            >
                              <YoutubeIcon className="w-5 h-5 transition-transform duration-300 group-hover/btn:scale-110" />
                            </a>
                          )}
                          {social.instagram && (
                            <a
                              href={social.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Visit Instagram Page"
                              onClick={(e) => e.stopPropagation()}
                              className="w-11 h-11 rounded-full border border-pink-500/40 bg-pink-500/10 text-pink-400 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300 flex items-center justify-center shadow-lg group/btn cursor-pointer"
                            >
                              <InstagramIcon className="w-5 h-5 transition-transform duration-300 group-hover/btn:scale-110" />
                            </a>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                );
              })()}
            </motion.div>
          ) : (
            // Grid of All 5 Channels
            <motion.div
              key="all-channels-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {channels.map((channel: any, idx: number) => {
                const channelStats = Array.isArray(channel.stats) 
                  ? channel.stats 
                  : [channel.ytSubs, channel.igFollowers].filter(Boolean);

                const rawName = (channel.keyName || channel.name || "").replace(/^\d+\.\s*/, "").trim();

                return (
                  <motion.div
                    key={channel.id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-gold/40 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                    onClick={() => setSelectedChannel(rawName)}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold transition-colors">{channel.name}</h3>
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: channel.accent || '#D4AF37' }} />
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {channelStats.map((st: string, i: number) => (
                          <span key={i} className="px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-semibold">
                            {st}
                          </span>
                        ))}
                      </div>
                      {channel.popular && (
                        <div className="text-[11px] font-mono text-gray-400 bg-black/40 p-3 rounded-xl border border-white/5 mb-4">
                          <span className="text-gray-500 uppercase tracking-wider block text-[9px] mb-1">MOST POPULAR:</span>
                          <span className="text-white font-medium">{channel.popular}</span>
                        </div>
                      )}
                    </div>

                    {/* Circular Social Buttons (YouTube & Instagram) */}
                    {(() => {
                      const social = getSocialLinks(channel);
                      return (
                        <div className="flex items-center gap-3 pt-2">
                          {social.youtube && (
                            <a
                              href={social.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Visit YouTube Channel"
                              onClick={(e) => e.stopPropagation()}
                              className="w-10 h-10 rounded-full border border-red-500/40 bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 flex items-center justify-center shadow-lg group/btn cursor-pointer"
                            >
                              <YoutubeIcon className="w-4.5 h-4.5 transition-transform duration-300 group-hover/btn:scale-110" />
                            </a>
                          )}
                          {social.instagram && (
                            <a
                              href={social.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Visit Instagram Page"
                              onClick={(e) => e.stopPropagation()}
                              className="w-10 h-10 rounded-full border border-pink-500/40 bg-pink-500/10 text-pink-400 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300 flex items-center justify-center shadow-lg group/btn cursor-pointer"
                            >
                              <InstagramIcon className="w-4.5 h-4.5 transition-transform duration-300 group-hover/btn:scale-110" />
                            </a>
                          )}
                        </div>
                      );
                    })()}
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 3. CATEGORY FILTERS TABS */}
      <section className="max-w-7xl mx-auto mb-10 flex flex-wrap gap-3 text-left relative z-10">
        {filters.map((filter: string) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[1.5px] border transition-all duration-300 cursor-pointer ${
              activeFilter === filter
                ? "bg-gold border-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.2)] font-bold"
                : "bg-[#0d0d0d] border-white/10 text-gray-400 hover:border-white/40 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </section>

      {/* 4. WORK ITEMS GRID LIST */}
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

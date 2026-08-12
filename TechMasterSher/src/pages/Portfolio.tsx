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

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
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

const getProjectSocialLinks = (proj: any) => {
  const url = proj.buttonUrl || proj.link || "";
  const clientName = (proj.client || proj.title || "").trim();

  let matchedChannelKey = "";
  for (const k of Object.keys(CHANNEL_SOCIAL_LINKS)) {
    if (clientName.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(clientName.toLowerCase())) {
      matchedChannelKey = k;
      break;
    }
  }
  const known = matchedChannelKey ? CHANNEL_SOCIAL_LINKS[matchedChannelKey] : {};

  const youtube = proj.youtubeUrl || (url.includes("youtube") || url.includes("youtu.be") ? url : known.youtube || "https://youtube.com");
  const instagram = proj.instagramUrl || (url.includes("instagram") ? url : known.instagram || "https://instagram.com");
  const linkedin = proj.linkedinUrl || (url.includes("linkedin") ? url : "");

  return { youtube, instagram, linkedin, directUrl: url };
};

const getChannelCircleImage = (clientOrChannelName: string, channelObj?: any, liveData?: any, activeDb?: any) => {
  const name = (clientOrChannelName || "").trim().toLowerCase();

  if (name.includes("tech master") || name.includes("techmaster")) return "/TechMaster.jpeg";
  if (name.includes("next univerz") || name.includes("nextuniverz")) return "/NextUniverz.jpeg";
  if (name.includes("master wheels") || name.includes("masterwheels") || name.includes("wheels")) return "/MasterWheels.jpeg";
  if (name.includes("full circle") || name.includes("fullcircle")) return "/First circle.jpg.jpeg";
  if (name.includes("trendz talk") || name.includes("trendztalk") || name.includes("trendz")) return "/First circle.jpg.jpeg";

  if (channelObj) {
    const directImg = channelObj.circleImage || channelObj.logoUrl || channelObj.image || channelObj.imageUrl;
    if (directImg) return mediaUrl(directImg);
  }

  const allTickerChannels = [
    ...(liveData?.channelsTicker?.channels || []),
    ...(liveData?.channels || []),
    ...(activeDb?.channelsTicker?.channels || []),
    ...(activeDb?.multiverseChannels || []),
    ...(activeDb?.channels || [])
  ];

  const found = allTickerChannels.find((c: any) => {
    const cName = (c.brandName || c.keyName || c.name || c.title || "").trim().toLowerCase();
    return cName && (name.includes(cName) || cName.includes(name));
  });

  if (found) {
    const img = found.circleImage || found.logoUrl || found.image || found.imageUrl;
    if (img) return mediaUrl(img);
  }

  return "/TechMaster.jpeg";
};

export const Portfolio: React.FC = () => {
  const { dbData } = useData();
  const [selectedChannel, setSelectedChannel] = useState("Tech Master");
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
    description: ((rawHero?.description && !rawHero.description.includes("executive content management platform")) 
      ? rawHero.description 
      : "Masterpieces In Motion — Our portfolio of 5 high-scale content channels spanning technology, automotive, podcasts, and viral entertainment.").replace(/Masterpieces\./g, "Masterpieces")
  };

  const defaultChannels = [
    {
      id: "ch-1",
      keyName: "Tech Master",
      name: "1. Tech Master",
      desc: "Making tech simple, relatable, and impossible to ignore - through humor, honesty, and real stories anyone can feel. And we're just getting started.",
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
      desc: "Where curiosity meets the unknown. Next Univerz goes beyond typical tech content - exploring cutting-edge innovation and hidden corners of the world most channels never reach.",
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
      desc: "India's auto culture, from every angle. Reviews. Road trips. Modifications. Ownership stories. The full Experience",
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
      desc: "Experiences most people only dream about. Full Circle goes further than most channels are willing to. Challenges. Experiments. No limits.",
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
      desc: "Complex ideas, made visual. TrendzTalk breaks down engineering, technology, and the facts most people never stop to think about - one animation at a time.",
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
          {/* Single Centered Channel Card */}
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
                      
                      {/* Right Side Circular Channel Image Badge with Sleek Faded Overlay */}
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.25)] bg-black/90 shrink-0 group/circle flex items-center justify-center">
                        <img
                          src={getChannelCircleImage(ch.name || ch.keyName, ch, livePortfolioData, activeDb)}
                          alt={`${ch.name} Circle`}
                          className="w-full h-full object-cover rounded-full opacity-60 brightness-90 contrast-95 group-hover/circle:opacity-100 group-hover/circle:brightness-100 group-hover/circle:scale-110 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/50 pointer-events-none" />
                        <div className="absolute inset-0 bg-black/20 pointer-events-none group-hover/circle:bg-transparent transition-colors duration-500" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2.5 mb-5">
                      {channelStats.map((st: string, i: number) => (
                        <span key={i} className="px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold">
                          {st}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-6">
                      {(() => {
                        const lowName = (ch.name || "").toLowerCase();
                        if (lowName.includes("tech master")) {
                          return "Making tech simple, relatable, and impossible to ignore - through humor, honesty, and real stories anyone can feel. And we're just getting started.";
                        }
                        if (lowName.includes("next univerz")) {
                          return "Where curiosity meets the unknown. Next Univerz goes beyond typical tech content - exploring cutting-edge innovation and hidden corners of the world most channels never reach.";
                        }
                        if (lowName.includes("master wheels") || lowName.includes("wheels")) {
                          return "India's auto culture, from every angle. Reviews. Road trips. Modifications. Ownership stories. The full Experience";
                        }
                        if (lowName.includes("full circle") || lowName.includes("fullcircle")) {
                          return "Experiences most people only dream about. Full Circle goes further than most channels are willing to. Challenges. Experiments. No limits.";
                        }
                        if (lowName.includes("trendz talk") || lowName.includes("trendztalk") || lowName.includes("trendz")) {
                          return "Complex ideas, made visual. TrendzTalk breaks down engineering, technology, and the facts most people never stop to think about - one animation at a time.";
                        }
                        return ch.desc || ch.description || "";
                      })()}
                    </p>
                    {ch.popular && (
                      <div className="text-xs font-mono text-gray-300 bg-black/60 p-4 rounded-2xl border border-white/10 mb-6">
                        <span className="text-gold uppercase tracking-wider block text-[10px] mb-1 font-bold">MOST POPULAR:</span>
                        <span className="text-white font-semibold text-sm">{ch.popular}</span>
                      </div>
                    )}
                  </div>

                  {/* Circular Social Buttons (YouTube & Instagram - Grey Theme) */}
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
                            className="w-11 h-11 rounded-full border border-white/15 bg-white/5 text-gray-300 hover:bg-white/20 hover:text-white hover:border-white/40 transition-all duration-300 flex items-center justify-center shadow-md group/btn cursor-pointer"
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
                            className="w-11 h-11 rounded-full border border-white/15 bg-white/5 text-gray-300 hover:bg-white/20 hover:text-white hover:border-white/40 transition-all duration-300 flex items-center justify-center shadow-md group/btn cursor-pointer"
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
                      {(() => {
                        const projCircleImg = getChannelCircleImage(project.client || project.title, null, livePortfolioData, activeDb);
                        return (
                          <>
                            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 mb-6 relative group/cardImg">
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

                              {/* Professional Circular Channel Image Badge Top-Right with Faded Overlay */}
                              <div className="absolute top-3.5 right-3.5 flex items-center gap-2 bg-black/85 backdrop-blur-md p-1 pr-3 rounded-full border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.6)] group/avatar z-10">
                                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gold/50 bg-black/90 shrink-0 flex items-center justify-center">
                                  <img
                                    src={projCircleImg}
                                    alt={`${project.client} Avatar`}
                                    className="w-full h-full object-cover rounded-full opacity-60 brightness-90 group-hover/avatar:opacity-100 group-hover/avatar:brightness-100 group-hover/avatar:scale-110 transition-all duration-500"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 pointer-events-none" />
                                </div>
                                <span className="text-[10px] font-mono font-bold text-gray-200 uppercase tracking-wider">
                                  {project.client || "Tech Master"}
                                </span>
                              </div>
                            </div>

                            <div className="flex justify-between items-center mb-3">
                              <span className="text-[10px] uppercase tracking-[2px] opacity-60 font-bold text-gray-300 font-mono">
                                {project.client} • {project.year}
                              </span>
                              {/* Right Side Circular Channel Avatar Badge (Faded Style) */}
                              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gold/40 bg-black/90 shrink-0 flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.2)] group/subAvatar">
                                <img
                                  src={projCircleImg}
                                  alt={project.client}
                                  className="w-full h-full object-cover rounded-full opacity-60 brightness-90 group-hover/subAvatar:opacity-100 group-hover/subAvatar:brightness-100 transition-all duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 pointer-events-none" />
                              </div>
                            </div>
                          </>
                        );
                      })()}

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

                      {/* Circular Social Icon Buttons (Grey Theme) */}
                      {(() => {
                        const projSocial = getProjectSocialLinks(project);
                        return (
                          <div className="flex items-center gap-2.5">
                            {projSocial.youtube && (
                              <a
                                href={projSocial.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Watch on YouTube"
                                onClick={(e) => e.stopPropagation()}
                                className="w-10 h-10 rounded-full border border-white/15 bg-white/5 text-gray-300 hover:bg-white/20 hover:text-white hover:border-white/40 transition-all duration-300 flex items-center justify-center shadow-md group/btn cursor-pointer"
                              >
                                <YoutubeIcon className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
                              </a>
                            )}
                            {projSocial.instagram && (
                              <a
                                href={projSocial.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View on Instagram"
                                onClick={(e) => e.stopPropagation()}
                                className="w-10 h-10 rounded-full border border-white/15 bg-white/5 text-gray-300 hover:bg-white/20 hover:text-white hover:border-white/40 transition-all duration-300 flex items-center justify-center shadow-md group/btn cursor-pointer"
                              >
                                <InstagramIcon className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
                              </a>
                            )}
                            {projSocial.linkedin && (
                              <a
                                href={projSocial.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View on LinkedIn"
                                onClick={(e) => e.stopPropagation()}
                                className="w-10 h-10 rounded-full border border-white/15 bg-white/5 text-gray-300 hover:bg-white/20 hover:text-white hover:border-white/40 transition-all duration-300 flex items-center justify-center shadow-md group/btn cursor-pointer"
                              >
                                <LinkedinIcon className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
                              </a>
                            )}
                          </div>
                        );
                      })()}
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

import React, { useEffect, useState } from "react";
import { ArrowDown, X } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useData } from "../context/DataContext";
import { StripeReelsCarousel } from "../components/StripeReelsCarousel";
import { LongVideosCarousel } from "../components/LongVideosCarousel";
import { AnimatedCounter } from "../components/AnimatedCounter";

import asusLogo from "../assets/ASUS.jpeg";
import dellLogo from "../assets/DELL.jpeg";
import flipkartLogo from "../assets/Flipkart.jpeg";
import huaweiLogo from "../assets/HUAWEI.jpeg";
import miLogo from "../assets/MI.jpeg";
import marshallLogo from "../assets/Marshall_clean.png";
import motorolaLogo from "../assets/motorola_hd.png";
import oneplusLogo from "../assets/Oneplus.jpeg";
import oppoLogo from "../assets/oppo.jpeg";
import pixelLogo from "../assets/PIXEL.jpeg";
import pocoLogo from "../assets/Poco.jpeg";
import realmeLogo from "../assets/realme_official.png";
import samsungLogo from "../assets/samsung.jpeg";
import vivoLogo from "../assets/Vivo.jpeg";
import amazonLogo from "../assets/amazon.jpeg";
import iqooLogo from "../assets/iQOO.jpeg";
import cashifyLogo from "../assets/Cashify.jpeg";
import nothingLogo from "../assets/Nothing.jpeg";
import blinkitLogo from "../assets/blinkit.jpeg";
import sleepCompanyLogo from "../assets/Thesleepcompany.jpeg";
import fireboltLogo from "../assets/firebolt.jpeg";
import ultravioletteLogo from "../assets/ultraviolette.jpeg";
import teslaLogo from "../assets/Tesla.jpeg";
import tataLogo from "../assets/TATA.jpeg";
import hyundaiLogo from "../assets/Hyundai.jpeg";
import kiaLogo from "../assets/KIA.jpeg";
import circleImg from "../assets/First circle.jpg (1).jpeg";
gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  onChangePage: (page: string) => void;
}


export const Home: React.FC<HomeProps> = ({ onChangePage }) => {
  const { homeData, dbData, isLoading } = useData();
  const [liveHomeData, setLiveHomeData] = useState<any>(null);

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "https://techmasterbackend.onrender.com/api/v1";
        const res = await fetch(`${baseUrl}/homepage`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setLiveHomeData(json.data);
          }
        }
      } catch (e) {
        console.warn("Direct Homepage fetch error:", e);
      }
    };
    fetchHomepage();
  }, []);

  if (isLoading || (!homeData && !liveHomeData)) return <div className="min-h-screen bg-black flex items-center justify-center"><span className="text-gold uppercase tracking-widest text-xs font-bold">Initializing CMS...</span></div>;

  let localDb: any = {};
  try {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) localDb = JSON.parse(saved);
  } catch (e) {}

  const activeHome = {
    ...homeData,
    ...(localDb?.homepageCMS || localDb?.homepage || {}),
    ...(dbData?.homepageCMS || dbData?.homepage || {}),
    ...(liveHomeData || {})
  };

  const heroBadge = activeHome?.hero?.badge || "TECH MASTER";
  const heroTopBadge = activeHome?.hero?.topBadgeText || "India's most-watched media production house";
  const heroMainHeading = activeHome?.hero?.mainHeading || "TECH MASTER";
  const heroTagline = activeHome?.hero?.tagline || '"Nothing We Make Is Forgettable. Unskippable. Unforgettable."';
  const heroSubTagline = activeHome?.hero?.subTagline || "Attention and Influence — At Scale";

  const introBadge = activeHome?.introVision?.introBadge || "INTRO";
  const introHeading = activeHome?.introVision?.introHeading || "Building High-Scale Media Channels";
  const introDescription = activeHome?.introVision?.introDescription || "Tech Master Digital Pvt Ltd builds and runs a portfolio of high-scale content channels across tech, automobiles, and entertainment. We take complex subjects and make them impossible to scroll past. Combining editorial rigor with production value that stands out.";

  const visionBadge = activeHome?.introVision?.visionBadge || "THE VISION";
  const visionHeading = activeHome?.introVision?.visionHeading || "Complexity Made Simple & Unforgettable";
  const visionDescription = activeHome?.introVision?.visionDescription || "Tech Master exists to make complexity feel simple, and simplicity feel unforgettable. We tell stories that inform without lecturing, entertain without diluting, and connect without pretending. The result: content built to travel across platforms, across formats, across the world.";

  const founderBadge = activeHome?.founder?.badge || "ABOUT THE CEO / FOUNDER";
  const founderName = activeHome?.founder?.name || "Arvind Kharra";
  const founderHighlighted = activeHome?.founder?.highlightedName || "aka Tech Master";
  const founderBio = activeHome?.founder?.description || "An engineering graduate from Rajasthan who turned his passion for technology into world's #1 tech YouTube channel. No corporate job, no conventional path. Just a small-town outsider who made technology feel human, fun, and relatable to millions.";

  const tickerHeading = activeHome?.channelsTicker?.heading || "Different audiences.";
  const tickerHighlight = activeHome?.channelsTicker?.highlightedHeading || "Same Obsession.";
  const tickerSubHeading = activeHome?.channelsTicker?.subHeading || "We're just getting started / Five channels today. A Media Empire in Motion.";

  const defaultCoreValues = [
    { title: "Fearless Energy", desc: "Pushing creative boundaries with unyielding momentum and passion." },
    { title: "Creative Storytelling", desc: "Crafting narratives that resonate, inform, and inspire millions." },
    { title: "Community First", desc: "Building genuine connections and putting our audience at the heart of everything we create." }
  ];
  const coreValuesList = (activeHome?.coreValues?.cards && activeHome.coreValues.cards.length > 0)
    ? activeHome.coreValues.cards.map((c: any) => ({ title: c.title, desc: c.desc || c.description }))
    : defaultCoreValues;

  const defaultStats = [
    { number: "40M+", label: "Subscribers" },
    { number: "7M+", label: "IG Followers" },
    { number: "1B+", label: "Monthly Views" },
    { number: "2500+", label: "Videos Published" },
    { number: "500K+", label: "FB Followers" },
    { number: "25B", label: "Lifetime Views on YT" },
    { number: "50+", label: "Global Brand Collaborations" }
  ];
  const statsList = (activeHome?.statistics?.counters && activeHome.statistics.counters.length > 0)
    ? activeHome.statistics.counters.map((s: any) => ({ number: s.value || s.number, label: s.label }))
    : defaultStats;

  const dummyViews = ["1.2M views", "850K views", "3.4M views", "2.1M views", "500K views", "4.8M views", "920K views", "1.5M views", "300K views", "2.9M views"];

  const reelsList = Array.isArray(activeHome?.shortsReels?.list)
    ? activeHome.shortsReels.list
    : (Array.isArray(activeHome?.reels) ? activeHome.reels : (Array.isArray(dbData?.homepage?.reels) ? dbData.homepage.reels : []));

  const shortsList = Array.isArray(activeHome?.shorts)
    ? activeHome.shorts
    : (Array.isArray(dbData?.homepage?.shorts) ? dbData.homepage.shorts : []);

  const longList = Array.isArray(activeHome?.longVideos?.list)
    ? activeHome.longVideos.list
    : (Array.isArray(activeHome?.longVideos) ? activeHome.longVideos : (Array.isArray(dbData?.homepage?.longVideos) ? dbData.homepage.longVideos : []));

  const dynamicVideos = [
    ...reelsList.map((v: any, i: number) => ({
      id: v.id,
      title: v.title,
      type: "reel",
      url: v.url || v.videoUrl,
      videoUrl: v.videoUrl || v.url,
      thumbnail: v.thumbnailUrl || v.thumbnail || v.imageUrl,
      aspectRatio: "9/16",
      category: "Reels & Shorts",
      views: v.views || dummyViews[i % dummyViews.length],
      author: v.author,
      handle: v.handle
    })),
    ...shortsList.map((v: any, i: number) => ({
      id: v.id,
      title: v.title,
      type: "short",
      url: v.url || v.videoUrl,
      videoUrl: v.videoUrl || v.url,
      thumbnail: v.thumbnailUrl || v.thumbnail || v.imageUrl,
      aspectRatio: "9/16",
      category: "Reels & Shorts",
      views: v.views || dummyViews[(i + 3) % dummyViews.length],
      author: v.author,
      handle: v.handle
    })),
    ...longList.map((v: any, i: number) => ({
      id: v.id,
      title: v.title,
      type: "long_video",
      url: v.url || v.videoUrl,
      videoUrl: v.videoUrl || v.url,
      thumbnail: v.thumbnailUrl || v.thumbnail || v.imageUrl,
      aspectRatio: "16/9",
      category: "Long Videos",
      views: v.views || dummyViews[(i + 6) % dummyViews.length],
      author: v.author,
      handle: v.handle
    }))
  ];
  const activeVideos = dynamicVideos.length > 0 ? dynamicVideos : [];

  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  useEffect(() => {
    // GSAP ScrollTrigger animations
    const sections = document.querySelectorAll(".scroll-section");
    sections.forEach((sec) => {
      gsap.fromTo(
        sec.querySelectorAll(".fade-up"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Custom timeline for Core Values Grid (Sequential Reveal & Typing Heading)
    const coreValuesGrid = document.querySelector(".core-values-grid");
    if (coreValuesGrid) {
      const cards = coreValuesGrid.querySelectorAll(".value-card");
      
      // Initialize GSAP states to prevent flash
      gsap.set(cards, { opacity: 0, y: 50 });
      cards.forEach((card) => {
        const headingChars = card.querySelectorAll(".char");
        if (headingChars.length > 0) {
          gsap.set(headingChars, { opacity: 0 });
        }
        gsap.set(card.querySelector(".value-card-content"), { opacity: 0, y: 20 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: coreValuesGrid,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      });

      cards.forEach((card, i) => {
        const headingChars = card.querySelectorAll(".char");
        const content = card.querySelector(".value-card-content");

        // Stagger cards in quickly
        tl.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, i * 0.15); // Add overlap based on index

        if (headingChars.length > 0) {
          tl.to(headingChars, {
            opacity: 1,
            duration: 0.03,
            stagger: 0.05,
            ease: "none"
          }, i * 0.15 + 0.3); // Start typing shortly after card starts appearing
        }

        tl.to(content, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out"
        }, i * 0.15 + 0.5);
      });
    }

    // Custom trigger for each Services Card (Swoops in individually on scroll)
    const servicesGrid = document.querySelector(".services-grid");
    if (servicesGrid) {
      const cards = servicesGrid.querySelectorAll(".services-card");
      
      // Initialize GSAP states to prevent flash
      gsap.set(cards, { 
        opacity: 0, 
        x: 250, 
        y: 200, 
        rotation: 15, 
        transformOrigin: "right bottom" 
      });

      cards.forEach((card, idx) => {
        gsap.fromTo(card,
          { 
            opacity: 0, 
            x: 250, 
            y: 200, 
            rotation: 15, 
            transformOrigin: "right bottom" 
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card, 
              start: idx === 0 ? "top 85%" : "top 55%", // Card 2 requires more scroll to trigger
              toggleActions: "play none none none",
            }
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = Array.from(document.querySelectorAll(".video-fade-in"));
      if (cards.length === 0) return;

      // Set premium 3D motion initial state
      gsap.killTweensOf(cards);
      gsap.set(cards, { 
        y: 100, 
        scale: 0.9, 
        opacity: 0, 
        rotationX: 15, 
        transformPerspective: 1000,
        transformOrigin: "center top"
      });

      // Animate each card individually when it enters the viewport
      cards.forEach((card) => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          opacity: 1,
          rotationX: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 92%", // Triggers when the card enters the lower viewport threshold
            toggleActions: "restart none restart none",
          },
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const handleNavClick = (pageId: string) => {
    onChangePage(pageId);
  };

  const filteredVideos = activeVideos;

  return (
    <div className="relative text-white min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="flex flex-col justify-center items-center px-6 relative overflow-hidden pt-24 md:pt-28 pb-0 text-center">
        {/* Badges directly below Navbar */}
        <div className="flex flex-col items-center gap-3 relative z-20 mb-4 sm:mb-6">
          <span className="typo-badge text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            {heroBadge}
          </span>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="typo-badge border border-gold/25 px-4 py-1.5 rounded-full bg-gold/5 backdrop-blur-md flex items-center gap-2 text-gold"
          >
            <svg className="w-3.5 h-3.5 fill-current text-gold" viewBox="0 0 24 24">
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            {heroTopBadge}
          </motion.div>
        </div>

        {/* Vertical Gap for 3D Lion / Sher Logo */}
        <div className="h-80 sm:h-96 md:h-[420px] w-full pointer-events-none" />

        <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10 mt-4 sm:mt-8">
          {/* Main Title: TECH MASTER */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4, ease: "easeOut" }}
            className="font-serif text-5xl sm:text-7xl md:text-8xl font-black mb-6 tracking-tight"
          >
            <span className="text-white">{heroMainHeading.split(" ")[0] || "TECH"} </span>
            <span className="text-gold">{heroMainHeading.split(" ").slice(1).join(" ") || "MASTER"}</span>
          </motion.h1>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            className="text-gray-300 text-base sm:text-xl md:text-2xl font-serif italic max-w-3xl leading-relaxed mb-6 md:mb-10 p-6 md:p-8 rounded-2xl border border-gold/30 bg-black/40 backdrop-blur-sm shadow-[0_0_30px_rgba(212,175,55,0.1)]"
          >
            {heroTagline}
            <span className="block text-xs font-mono font-normal text-gold/80 not-italic uppercase tracking-[2px] mt-3">
              {heroSubTagline}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center relative z-20 mb-0"
          >
            <div className="flex flex-col items-center gap-1 opacity-70 cursor-pointer hover:opacity-100 transition-opacity duration-300 mt-2 sm:mt-0">
              <span className="text-[9px] uppercase tracking-[3px] text-gold font-bold">Scroll down</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowDown className="w-4 h-4 text-gold" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro & The Vision Grid */}
      <section className="scroll-section py-16 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Intro Card */}
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-gold/30 transition-all duration-300">
            <span className="typo-badge mb-4 block text-gold">{introBadge}</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold mb-4">
              {introHeading}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
              {introDescription}
            </p>
          </div>

          {/* The Vision Card */}
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-gold/30 bg-gold/5 hover:border-gold transition-all duration-300">
            <span className="typo-badge mb-4 block text-gold">{visionBadge}</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold mb-4">
              {visionHeading}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
              {visionDescription}
            </p>
          </div>
        </div>
      </section>

      {/* About the CEO / Founder */}
      <section className="scroll-section py-12 px-6 max-w-7xl mx-auto relative z-10">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-gold/30 bg-black/60 backdrop-blur-xl relative overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.08)]">
          <span className="typo-badge text-gold/80 border border-gold/30 px-4 py-1.5 rounded-full bg-black/40 font-mono font-semibold text-xs inline-block mb-6">
            {founderBadge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-6">
            {founderName} <span className="text-gold italic">{founderHighlighted}</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed max-w-4xl">
            {founderBio}
          </p>
        </div>
      </section>

      {/* 2. Channels Ticker Section */}
      <section className="py-8 bg-black/60 border-y border-white/10 relative z-10 overflow-hidden text-center flex flex-col items-center justify-center gap-3">
        <div className="flex flex-col items-center gap-1 relative z-20 max-w-3xl px-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {tickerHeading} <span className="text-gold italic font-bold">{tickerHighlight}</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-mono tracking-wider uppercase mt-1">
            {tickerSubHeading}
          </p>
        </div>

        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          style={{ willChange: "transform" }}
          className="flex w-max items-center justify-center mt-4"
        >
          {[1, 2, 3, 4].map((groupIndex) => {
            const defaultBrandChannels = [
              { brandName: "Tech Master" },
              { brandName: "Next Univerz" },
              { brandName: "Master Wheels" },
              { brandName: "Full Circle" },
              { brandName: "Trendz Talk" }
            ];

            return (
              <div key={groupIndex} className="flex items-center">
                {defaultBrandChannels.map((brand: any, idx: number) => {
                  return (
                    <div
                      key={`${brand.brandName}-${idx}-${groupIndex}`}
                      onClick={() => handleNavClick("portfolio")}
                      data-cursor="CLICK"
                      className="group/brand relative inline-flex items-center justify-center px-10 sm:px-16 py-2 transition-all duration-300 cursor-pointer select-none"
                    >
                      <div className="flex flex-col items-center">
                        {/* Professional Channel Circle Image above the name */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-gold/40 group-hover/brand:border-gold transition-all duration-300 mb-3 shadow-[0_0_12px_rgba(212,175,55,0.15)] group-hover/brand:shadow-[0_0_20px_rgba(212,175,55,0.35)] relative bg-black/60 flex items-center justify-center">
                          <img
                            src={circleImg}
                            alt={`${brand.brandName} Circle Icon`}
                            className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover/brand:scale-110"
                          />
                        </div>
                        <span className="font-serif text-xl sm:text-2xl font-bold text-gold tracking-[3px] whitespace-nowrap group-hover/brand:text-white transition-colors duration-300">
                          {brand.brandName}
                        </span>
                      </div>
                      <span className="text-white/20 mx-8 self-center select-none">•</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* 3. Core Values Section */}
      <section className="scroll-section section-padding relative z-10 text-left">
        <div className="flex justify-center mb-12 relative z-20">
          <span className="typo-badge text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            {activeHome?.coreValues?.badge || "HOW WE MOVE"}
          </span>
        </div>
        <div className="core-values-grid grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {coreValuesList.map((val: any, idx: number) => (
            <div key={idx} className="glass-panel p-8 rounded-3xl border-l-4 border-l-gold/40 hover:border-l-gold transition-all duration-300">
              <h3 className="typo-h4 mb-3 text-white font-serif">{val.title}</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Global Reach & Statistics */}
      <section className="scroll-section py-16 bg-[#050505] border-y border-white/5 px-6 relative z-10 text-center">
        <div className="flex justify-center mb-6 relative z-20">
          <span className="typo-badge text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            {activeHome?.statistics?.badge || "GLOBAL REACH & STATISTICS"}
          </span>
        </div>
        <div className="max-w-7xl mx-auto">
          <h2 className="typo-h2 mb-12">
            {activeHome?.statistics?.heading?.split("&")[0] || "Influence &"} <span className="text-gold italic font-bold">{activeHome?.statistics?.heading?.split("&")[1] || "Impact"}</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {statsList.map((stat: any, idx: number) => (
              <div key={idx} className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-gold/30 transition-colors">
                <AnimatedCounter 
                  value={stat.number} 
                  className="font-serif text-3xl sm:text-4xl font-black text-gold block mb-2" 
                />
                <span className="text-gray-400 text-xs font-mono uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Video Showcase Section */}
      <section className="scroll-section py-16 px-6 max-w-7xl mx-auto relative z-10 text-left">
        <div className="flex justify-center mb-12 relative z-20">
          <span className="typo-badge text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            FEATURED VIDEO SHOWCASE
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-8">
          <div>
            <p className="typo-badge mb-4">OUR WORK</p>
            <h2 className="typo-h2">
              Craft <span className="text-gold italic font-bold">In Motion</span>
            </h2>
          </div>

        </div>

        {/* Video Cards Grid */}
        <div className="flex flex-col gap-16 md:gap-20 w-full max-w-7xl mx-auto video-showcase-grid-container">
            {(() => {
              let reels = filteredVideos.filter((v) => v.type === "reel" || v.type === "short");
              if (reels.length >= 3) {
                const v0 = reels[0];
                const v1 = reels[1];
                const v2 = reels[2];
                const rest = reels.slice(3);
                
                const newReels = [v1, v2];
                if (rest.length > 0) {
                  newReels.push(rest[0]); // 3rd position
                  newReels.push(v0);      // 4th position
                  if (rest.length > 1) {
                    newReels.push(...rest.slice(1));
                  }
                } else {
                  newReels.push(v0);      // Fallback if exactly 3 reels
                }
                reels = newReels;
              }

              const cmsFeaturedVideos = (homeData?.featuredVideos && homeData.featuredVideos.length > 0)
                ? homeData.featuredVideos.filter((v: any) => v.status === "Active" || v.status === true || v.status === undefined)
                : null;
              
              return (
                <>
                  {reels.length > 0 && <StripeReelsCarousel reels={reels} isHomePage={true} />}
                  
                  <div className="mt-6 md:mt-10 w-full max-w-[100vw] overflow-hidden">
                    <LongVideosCarousel videos={cmsFeaturedVideos || []} isHomePage={true} />
                  </div>
                </>
              );
            })()}
          </div>
      </section>      {/* 7. Brand Collaborations Static Grid (4 Cards Per Row) */}
      <section className="scroll-section py-16 px-6 max-w-7xl mx-auto relative z-10 text-center">
        {/* Small Badge */}
        <div className="flex justify-center mb-6 relative z-20">
          <span className="typo-badge text-gold/80 border border-gold/30 px-5 py-2 rounded-full bg-black/50 font-mono font-semibold tracking-[3px] uppercase">
            BRAND COLLABORATIONS
          </span>
        </div>

        {/* Main Heading & Subtitle */}
        <div className="max-w-3xl mx-auto mb-12 relative z-20">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4 tracking-tight">
            Trusted By <span className="text-gold italic font-bold">Leading Technology Brands</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base font-light leading-relaxed">
            Proud collaborations and partnerships with globally recognized technology brands that have helped shape our educational ecosystem.
          </p>
        </div>

        {/* Luxury Brand Wall (16 Exact Image 1 Brands - Transparent Pure White Vector Marks, Zero Background Rectangle) */}
        {(() => {
          const lenskartSvgStr = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 90" width="320" height="90"><g fill="none" stroke="white" stroke-width="7"><circle cx="35" cy="45" r="20"/><circle cx="75" cy="45" r="20"/></g><text x="110" y="56" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="42" fill="white">lenskart</text></svg>';
          const lenskartLogoB64 = `data:image/svg+xml;base64,${btoa(lenskartSvgStr)}`;

          const brandVectorMap: Record<string, { icon: string; fallback: any }> = {
            amazon: { icon: "https://cdn.simpleicons.org/amazon/white", fallback: amazonLogo },
            asus: { icon: "https://cdn.simpleicons.org/asus/white", fallback: asusLogo },
            dell: { icon: "https://cdn.simpleicons.org/dell/white", fallback: dellLogo },
            flipkart: { icon: flipkartLogo, fallback: flipkartLogo },
            huawei: { icon: "https://cdn.simpleicons.org/huawei/white", fallback: huaweiLogo },
            iqoo: { icon: "https://cdn.simpleicons.org/iqoo/white", fallback: iqooLogo },
            marshall: { icon: marshallLogo, fallback: marshallLogo },
            xiaomi: { icon: "https://cdn.simpleicons.org/xiaomi/white", fallback: miLogo },
            mi: { icon: "https://cdn.simpleicons.org/xiaomi/white", fallback: miLogo },
            motorola: { icon: "https://cdn.simpleicons.org/motorola/white", fallback: motorolaLogo },
            oneplus: { icon: "https://cdn.simpleicons.org/oneplus/white", fallback: oneplusLogo },
            oppo: { icon: "https://cdn.simpleicons.org/oppo/white", fallback: oppoLogo },
            "google pixel": { icon: "https://cdn.simpleicons.org/google/white", fallback: pixelLogo },
            google: { icon: "https://cdn.simpleicons.org/google/white", fallback: pixelLogo },
            pixel: { icon: "https://cdn.simpleicons.org/google/white", fallback: pixelLogo },
            poco: { icon: pocoLogo, fallback: pocoLogo },
            realme: { icon: realmeLogo, fallback: realmeLogo },
            samsung: { icon: "https://cdn.simpleicons.org/samsung/white", fallback: samsungLogo },
            vivo: { icon: "https://cdn.simpleicons.org/vivo/white", fallback: vivoLogo },
            cashify: { icon: cashifyLogo, fallback: cashifyLogo },
            noise: { icon: "TEXT_FALLBACK", fallback: "TEXT_FALLBACK" },
            nothing: { icon: "https://cdn.simpleicons.org/nothing/white", fallback: nothingLogo },
            blinkit: { icon: "https://cdn.simpleicons.org/blinkit/white", fallback: blinkitLogo },
            lenskart: { icon: lenskartLogoB64, fallback: lenskartLogoB64 },
            "the sleep company": { icon: "https://cdn.simpleicons.org/thesleepcompany/white", fallback: sleepCompanyLogo },
            "fire-boltt": { icon: "https://cdn.simpleicons.org/fireboltt/white", fallback: fireboltLogo },
            ultraviolette: { icon: "https://cdn.simpleicons.org/ultraviolette/white", fallback: ultravioletteLogo },
            tesla: { icon: "https://cdn.simpleicons.org/tesla/white", fallback: teslaLogo },
            tata: { icon: "https://cdn.simpleicons.org/tata/white", fallback: tataLogo },
            hyundai: { icon: "https://cdn.simpleicons.org/hyundai/white", fallback: hyundaiLogo },
            kia: { icon: "https://cdn.simpleicons.org/kia/white", fallback: kiaLogo }
          };

          const oldBrands = [
            "Amazon", "Asus", "Dell", "Flipkart", "Huawei", "IQOO", "Marshall", "Xiaomi",
            "Motorola", "OnePlus", "Oppo", "Google Pixel", "Poco", "Realme", "Samsung", "Vivo"
          ];
          const newBrands = [
            "boAt", "Cashify", "Sony", "Nothing", "Blinkit", "Lenskart", 
            "The Sleep Company", "Noise", "Fire-Boltt", "Tesla", "Tata", 
            "Hyundai", "Kia", "Ultraviolette"
          ];
          const requestedBrands = [...oldBrands, ...newBrands];

          const defaultBrandCollabs = requestedBrands.map((name) => {
            const clean = name.toLowerCase();
            const cleanAlphanumeric = name.toLowerCase().replace(/[^a-z0-9]/g, "");
            const mappedInfo = brandVectorMap[clean];
            
            const generatedFallback = 'TEXT_FALLBACK';
            
            return {
              brandName: name,
              logo: mappedInfo ? mappedInfo.icon : `https://cdn.simpleicons.org/${cleanAlphanumeric}/white`,
              fallbackLogo: mappedInfo ? mappedInfo.fallback : generatedFallback
            };
          });

          const activeCollabs = (homeData?.brandCollaborationsList && homeData.brandCollaborationsList.length > 0)
            ? homeData.brandCollaborationsList.filter((b: any) => b.status === "Active" || b.status === true || b.status === undefined)
            : defaultBrandCollabs;

          const displayCollabs = activeCollabs.length > 0
            ? [...activeCollabs].map((b: any) => {
                const bName = b.brandName || b.name || "";
                const cleanName = bName.toLowerCase().trim();
                const cleanAlphanumeric = bName.toLowerCase().replace(/[^a-z0-9]/g, "");
                
                const generatedFallback = 'TEXT_FALLBACK';
                
                const vInfo = brandVectorMap[cleanName] || { 
                  icon: `https://cdn.simpleicons.org/${cleanAlphanumeric}/white`, 
                  fallback: b.logo || b.brandLogo || generatedFallback
                };
                return {
                  brandName: bName,
                  logo: vInfo.icon,
                  fallbackLogo: vInfo.fallback || b.logo || b.brandLogo || generatedFallback,
                  order: Number(b.order) || 0

                };
              }).sort((a: any, b: any) => a.order - b.order)
            : defaultBrandCollabs;

          return (
            <div className="relative max-w-7xl mx-auto px-2 sm:px-4">
              {/* Background Ambient Aurora Glow behind Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-purple-900/10 to-transparent blur-3xl pointer-events-none" />

              {/* Luxury Apple + Linear Grid Wall Container */}
              <div className="border border-white/5 rounded-3xl overflow-hidden bg-black/30 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative z-10 p-4 sm:p-6">
                <motion.div 
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.04 }
                    }
                  }}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-full items-center justify-items-center"
                >
                  {displayCollabs.map((brand: any, idx: number) => {
                    const bName = brand.brandName;
                    const isUltra = bName.toLowerCase() === "ultraviolette";
                    const isCashify = bName.toLowerCase() === "cashify";
                    const isLenskart = bName.toLowerCase() === "lenskart";

                    const imgClasses = (isUltra || isCashify || isLenskart)
                      ? "h-7 sm:h-9 md:h-11 w-auto max-w-[120px] sm:max-w-[160px] md:max-w-[200px]"
                      : "h-12 sm:h-16 md:h-18 w-auto max-w-[180px] sm:max-w-[240px] md:max-w-[280px]";

                    const logoFilter = isUltra 
                      ? "brightness(10) contrast(50) grayscale(1)" 
                      : isCashify
                        ? "brightness(2.8) contrast(150%) grayscale(1)"
                        : "grayscale(1) brightness(1.2)";

                    return (
                      <motion.div
                        key={`${bName}-${idx}`}
                        variants={{
                          hidden: { opacity: 0, y: 15, scale: 0.96 },
                          show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        whileHover={{ y: -3, scale: 1.04 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="group relative flex items-center justify-center p-4 sm:p-6 h-28 sm:h-36 w-full rounded-2xl transition-all duration-300 hover:bg-white/[0.04] hover:shadow-[inset_0_0_35px_rgba(255,255,255,0.03)] select-none cursor-pointer overflow-hidden"
                      >
                        {/* Subtle Cell Hover Ambient Light Sweep */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <img
                          src={brand.logo}
                          alt={bName}
                          loading="eager"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (brand.fallbackLogo === 'TEXT_FALLBACK') {
                              target.style.display = 'none';
                              if (target.nextElementSibling) {
                                (target.nextElementSibling as HTMLElement).style.display = 'block';
                              }
                            } else if (brand.fallbackLogo && target.src !== brand.fallbackLogo) {
                              target.src = brand.fallbackLogo;
                            }
                          }}
                          className={`${imgClasses} object-contain transition-all duration-500 opacity-70 group-hover:opacity-100 group-hover:scale-105 group-hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.7)] relative z-10 mix-blend-screen`}
                          style={{ filter: logoFilter }}
                        />
                        <span 
                          className="text-white font-sans font-bold text-lg sm:text-2xl tracking-[4px] uppercase text-center transition-all duration-500 opacity-70 group-hover:opacity-100 group-hover:scale-105 group-hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.7)] relative z-10"
                          style={{ display: 'none' }}
                        >
                          {bName}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          );
        })()}
      </section>
      {/* Newsletter */}
      <section className="scroll-section py-12 px-6 max-w-4xl mx-auto relative z-10 text-center">
        <div className="flex justify-center mb-10 relative z-20">
          <span className="typo-badge text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">{homeData?.newsletter?.tag || "NEWSLETTER SUBSCRIPTION"}</span>
        </div>
        <div className="glass-panel p-6 sm:p-12 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.05)] fade-up">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">{homeData?.newsletter?.heading || "Stay in the Loop"}</h2>
          <p className="text-gray-400 text-sm mb-8 font-light">{homeData?.newsletter?.description || "Join my newsletter..."}</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="flex-1 bg-black/50 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors" />
            <button type="submit" className="bg-gold text-black px-8 py-3 rounded-full font-bold uppercase text-xs tracking-[1px] hover:bg-white transition-colors">{homeData?.newsletter?.buttonText || "Subscribe"}</button>
          </form>
        </div>
      </section>

      {/* Contact Preview */}
      <section className="scroll-section pb-8 px-6 max-w-7xl mx-auto relative z-10 text-center">
        <div className="flex justify-center mb-10 relative z-20">
          <span className="typo-badge text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">{homeData?.contactPreview?.tag || "COLLABORATION INQUIRY"}</span>
        </div>
        <h2 className="typo-h2 mb-8 fade-up">
          {homeData?.contactPreview?.heading || "Ready to Collaborate?"}
        </h2>
        <button
          onClick={() => handleNavClick("contact")}
          className="light-sweep px-8 py-4 bg-white text-black font-bold uppercase text-xs tracking-[2px] rounded-full hover:bg-gold hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] fade-up"
        >{homeData?.contactPreview?.primaryCta || "Get In Touch"}</button>
      </section>

      {/* Lightbox Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedVideo(null)} />
          
          <div className="relative w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] bg-[#070707] rounded-3xl border border-white/10 overflow-y-auto md:overflow-hidden shadow-2xl flex flex-col md:flex-row z-50">
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:bg-gold hover:text-black transition-colors"
              onClick={() => setSelectedVideo(null)}
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Video Player */}
            <div className={`flex-1 bg-black flex items-center justify-center ${selectedVideo.aspectRatio === "9/16" ? "md:max-w-md mx-auto" : "w-full"}`}>
              <video 
                src={selectedVideo.url} 
                controls 
                playsInline
                className="w-full h-full max-h-[70vh] object-contain"
              />
            </div>

            {/* Details Side-panel */}
            <div className="p-6 md:p-8 md:w-80 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 bg-[#090909]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[2px] text-gold block mb-2">
                  {selectedVideo.category}
                </span>
                <h3 className="font-serif text-2xl text-white font-semibold leading-tight mb-4">
                  {selectedVideo.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light mb-6">
                  This showcase demonstrates our high-production-value video assets, structured to engage audiences across modern content distributions.
                </p>
              </div>

              <div className="pt-6 border-t border-white/5">
                <span className="text-[9px] font-mono uppercase text-gray-500 block mb-1">Source Stream</span>
                <span className="text-xs text-gold font-mono tracking-wider font-semibold">SECURE CDN DIRECT LINK</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

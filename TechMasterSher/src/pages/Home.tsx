import React, { useEffect, useState, useRef } from "react";
import { ArrowDown, ArrowUpRight, Terminal, Play, X } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useData } from "../context/DataContext";
import { StripeReelsCarousel } from "../components/StripeReelsCarousel";
import { LongVideosCarousel } from "../components/LongVideosCarousel";
import { AnimatedCounter } from "../components/AnimatedCounter";

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  onChangePage: (page: string) => void;
}

const splitText = (text: string) => {
  return text.split("").map((char, idx) => (
    <span key={idx} className="char inline-block opacity-0">
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const VideoCard = ({ video, onClick }: { video: any; onClick: () => void }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [video.url]);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
    if (containerRef.current) {
      containerRef.current.style.transition = "none";
    }
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.transition = "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), shadow 0.5s ease, border-color 0.5s ease";
      containerRef.current.style.setProperty("--rx", "0deg");
      containerRef.current.style.setProperty("--ry", "0deg");
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set spotlight coordinates
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);

    // 3D Tilt calculation
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 10; // rotate X based on vertical distance
    const angleY = (x - xc) / 10; // rotate Y based on horizontal distance
    el.style.setProperty("--rx", `${angleX}deg`);
    el.style.setProperty("--ry", `${angleY}deg`);
  };

  const handlePlaying = () => {
    setIsPlaying(true);
  };

  return (
    <div
      ref={containerRef}
      className="group relative w-full h-full overflow-hidden rounded-3xl border-2 border-gold/80 bg-[#070707] transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_50px_rgba(212,175,55,0.25)] cursor-pointer select-none"
      style={{
        transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale3d(1.01, 1.01, 1.01)",
        transformStyle: "preserve-3d"
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      data-cursor="play"
    >
      {/* Premium Shimmer Light Beam Sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-10" />

      {/* Dynamic Cursor Spotlight Background Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle 220px at var(--mx, 0px) var(--my, 0px), rgba(212,175,55,0.06), transparent 80%)"
        }}
      />

      {/* Dynamic Spotlight Border Mask */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl z-10 border-2 border-transparent"
        style={{
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          background: "radial-gradient(circle 120px at var(--mx, 0px) var(--my, 0px), rgba(212,175,55,0.4), transparent 80%)"
        }}
      />

      {/* Video Poster Image (Fades out when playing) */}
      <img
        src={video.thumbnail}
        alt={video.title}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-0 ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Video Element */}
      <video
        ref={videoRef}
        src={video.url}
        autoPlay
        loop
        muted
        playsInline
        onPlaying={handlePlaying}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03] z-0 ${
          isPlaying ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      />

      {/* Glassmorphic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent opacity-85 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none z-10" />

      {/* Content Container (using transform-style to give depth) */}
      <div 
        className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 pointer-events-none z-20"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="flex justify-between items-start">
          <span className="px-3.5 py-1 rounded-full border border-gold/30 bg-black/75 text-[9px] uppercase tracking-[2px] font-mono text-gold backdrop-blur-md group-hover:border-gold group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-300">
            {video.type === "reel" || video.type === "short" ? "Reels & Shorts" : "Long Videos"}
          </span>
          <span className="relative w-8 h-8 rounded-full border border-white/20 bg-black/60 flex items-center justify-center backdrop-blur-md group-hover:bg-gold group-hover:border-gold group-hover:scale-110 transition-all duration-300">
            <span className="absolute inset-0 rounded-full bg-gold/30 scale-100 group-hover:scale-[1.6] opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out animate-ping" />
            <Play className="w-3.5 h-3.5 text-white group-hover:text-black fill-current translate-x-[1px] transition-colors relative z-10" />
          </span>
        </div>

        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-1.5 mb-1 text-[10px] font-sans tracking-wide text-gold">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            {video.views || "1.2M views"}
          </div>
          <h3 className="font-serif text-xl md:text-2xl text-white font-medium mb-2 group-hover:text-gold transition-colors duration-300">
            {video.title}
          </h3>
          <p className="text-xs text-gray-400 font-mono tracking-[1px] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            Playing • Tap to Watch Fullscreen
          </p>
        </div>
      </div>
    </div>
  );
};

export const Home: React.FC<HomeProps> = ({ onChangePage }) => {
  const { homeData, dbData, isLoading } = useData();
  if (isLoading || !homeData) return <div className="min-h-screen bg-black flex items-center justify-center"><span className="text-gold uppercase tracking-widest text-xs font-bold">Initializing CMS...</span></div>;

  const dummyViews = ["1.2M views", "850K views", "3.4M views", "2.1M views", "500K views", "4.8M views", "920K views", "1.5M views", "300K views", "2.9M views"];

  const dynamicVideos = [
    ...(dbData?.homepage?.reels || []).map((v: any, i: number) => ({
      id: v.id,
      title: v.title,
      type: "reel",
      url: v.videoUrl || v.url,
      thumbnail: v.thumbnailUrl || v.thumbnail || v.imageUrl,
      aspectRatio: "9/16",
      category: "Reels & Shorts",
      views: dummyViews[i % dummyViews.length]
    })),
    ...(dbData?.homepage?.shorts || []).map((v: any, i: number) => ({
      id: v.id,
      title: v.title,
      type: "short",
      url: v.videoUrl || v.url,
      thumbnail: v.thumbnailUrl || v.thumbnail || v.imageUrl,
      aspectRatio: "9/16",
      category: "Reels & Shorts",
      views: dummyViews[(i + 3) % dummyViews.length]
    })),
    ...(dbData?.homepage?.longVideos || []).map((v: any, i: number) => ({
      id: v.id,
      title: v.title,
      type: "long_video",
      url: v.videoUrl || v.url,
      thumbnail: v.thumbnailUrl || v.thumbnail || v.imageUrl,
      aspectRatio: "16/9",
      category: "Long Videos",
      views: dummyViews[(i + 6) % dummyViews.length]
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
      <section className="flex flex-col justify-center items-center px-6 relative overflow-hidden pt-24 md:pt-32 pb-0 text-center">
        <div className="flex justify-center mb-6 relative z-20">
          <span className="typo-badge text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            HERO LANDING
          </span>
        </div>



        <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
          {/* Animated luxury tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="typo-badge mb-6 border border-gold/25 px-4 py-1.5 rounded-full bg-gold/5 backdrop-blur-md flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            {homeData?.heroMainHeading?.smallBadge || "HERO LANDING"}
          </motion.div>

          {/* Headline with split reveal effect */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4, ease: "easeOut" }}
            className="typo-h1 mb-8 text-reveal"
          >
            {homeData?.heroMainHeading?.headingLine1 || "Orchestrating"} <br />
            <span className="text-gold">{homeData?.heroMainHeading?.highlightedHeading || "Immersive Tech"}</span> {homeData?.heroMainHeading?.headingLine3 || "Education."}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            className="text-gray-400 text-sm md:text-lg font-light max-w-2xl leading-relaxed mb-6 md:mb-12 p-4 md:p-8 rounded-2xl border border-gold bg-black/40 backdrop-blur-sm shadow-[0_0_30px_rgba(212,175,55,0.1)]"
          >
            {homeData?.heroMainHeading?.description || "We design structured curricula, virtual sandbox playgrounds, and live cohort workshops, transforming traditional programming paths into cinematic student success pipelines."}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center relative z-20 mb-0"
          >
            {/* Scroll Indicator */}
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

      {/* Personal Introduction */}
      <section className="scroll-section pt-0 pb-16 relative z-10 text-center mt-4 md:mt-6">
        <div className="flex justify-center mb-6 relative z-20">
          <span className="typo-badge text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">{homeData?.founderBio?.tag || "FOUNDER BIOGRAPHY"}</span>
        </div>
        <h2 className="typo-h2 mb-6 fade-up">
          {homeData?.founderBio?.title || "Hello, I'm Aman."}
        </h2>
        <p className="typo-body max-w-3xl mx-auto fade-up">
          {homeData?.founderBio?.paragraph || "I am a software engineer..."}
        </p>
      </section>

      {/* 2. Brand Partner Logos Ticker */}
      <section className="py-12 bg-black/40 border-y border-white/5 relative z-10 overflow-hidden text-center">
        <div className="flex justify-center mb-6 relative z-20">
          <span className="typo-badge text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            TRUSTED PARTNERS TICKER
          </span>
        </div>
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ ease: "linear", duration: Math.max(15, (homeData?.brandPartners?.length || 6) * 2.2), repeat: Infinity }}
          style={{ willChange: "transform" }}
          className="flex gap-12 md:gap-24 w-max"
        >
          {[1, 2].map((groupIndex) => {
            const basePartners = homeData?.brandPartners?.length > 0 ? homeData.brandPartners : [{ brandName: "NVIDIA" }, { brandName: "GITHUB" }, { brandName: "GOOGLE CLOUD" }, { brandName: "APPLE DEVELOPER" }, { brandName: "VERCEL" }, { brandName: "MICROSOFT" }];
            const displayPartners = [...basePartners, { brandName: "TechMaster Technologies" }, { brandName: "TechMaster Technologies" }];
            return (
              <div key={groupIndex} className="flex items-center gap-12 md:gap-24">
                {displayPartners.map((brand: any, idx: number) => (
                  <span
                    key={`${brand.brandName}-${idx}-${groupIndex}`}
                    className="font-serif text-xl sm:text-2xl font-black text-gold tracking-[6px] transition-colors duration-300 select-none cursor-default whitespace-nowrap"
                  >{brand.brandName}</span>
                ))}
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* 3. Core Values Grid Section */}
      <section className="scroll-section section-padding relative z-10 text-left">
        <div className="flex justify-center mb-12 relative z-20">
          <span className="typo-badge text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            CORE VALUES
          </span>
        </div>
        <div className="core-values-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
          {homeData?.coreValues?.filter((val: any) => 
            val.valueName !== "DIGITAL LUXURY & BRAND INNOVATION" && val.title !== "Luxury Standard"
          ).map((val: any, idx: number) => (
            <div key={idx} className="value-card glass-panel p-8 rounded-3xl border-l-4 border-l-gold/40 hover:border-l-gold transition-all duration-300 opacity-0">
              <h3 className="value-card-heading typo-h4 mb-2">{splitText(val.title)}</h3>
              <p className="value-card-content text-gray-400 text-xs sm:text-sm font-light leading-relaxed opacity-0">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Statistics Callout */}
      <section className="scroll-section py-12 bg-[#050505] border-y border-white/5 px-6 relative z-10 text-center">
        <div className="flex justify-center mb-10 relative z-20">
          <span className="typo-badge text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            GLOBAL REACH & STATISTICS
          </span>
        </div>
        <div className="max-w-7xl mx-auto">
          <p className="typo-badge mb-12">INFLUENCE & REACH</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {(homeData?.statistics || homeData?.statisticsCounters)?.map((stat: any, idx: number) => (
              <div key={idx} className="fade-up">
                <AnimatedCounter 
                  value={`${stat.prefix || ""}${stat.counterNumber ?? stat.number}${stat.suffix || ""}`} 
                  className="typo-stat block mb-2" 
                />
                <span className="typo-stat-desc">{stat.counterLabel ?? stat.label}</span>
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
            <p className="typo-badge mb-4">VIDEO PORTFOLIO</p>
            <h2 className="typo-h2">
              Cinematic <span className="text-gold italic font-bold">Video Streams</span>
            </h2>
          </div>

        </div>

        {/* Video Cards Grid */}
        <div className="flex flex-col gap-8 md:gap-16 w-full max-w-7xl mx-auto video-showcase-grid-container">
            {(() => {
              const reels = filteredVideos.filter((v) => v.type === "reel" || v.type === "short");
              const longs = filteredVideos.filter((v) => v.type === "long_video");
              
              return (
                <>
                  {reels.length > 0 && <StripeReelsCarousel reels={reels} />}
                  
                  {longs.length > 0 && (
                    <div className="mt-8 w-full max-w-[100vw] overflow-hidden">
                      <LongVideosCarousel videos={longs} />
                    </div>
                  )}
                </>
              );
            })()}
          </div>
      </section>      {/* 7. Brand Collaborations Teaser */}
      <section className="scroll-section py-16 px-6 max-w-7xl mx-auto relative z-10 text-center">
        <div className="flex justify-center mb-8 relative z-20">
          <span className="typo-badge text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            {homeData?.brandCollaborations?.tag || "BRAND COLLABORATIONS"}
          </span>
        </div>
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 bg-gradient-to-br from-black via-[#070707] to-black/90 relative overflow-hidden fade-up">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] rounded-full pointer-events-none" />
          
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            {homeData?.brandCollaborations?.heading || "Partnering with Industry Leaders"}
          </h2>
          
          <p className="text-gray-400 text-sm md:text-base font-light max-w-2xl mx-auto mb-12 relative z-10">
            {homeData?.brandCollaborations?.description || "We join forces with leading technology companies and cloud giants to build open-source tools, launch hackathons, and deliver industry-relevant education."}
          </p>
          
          {/* Brand Collaboration Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
            {/* Card 1 */}
            <div className="group rounded-2xl overflow-hidden border border-white/10 bg-black/50 relative cursor-pointer aspect-square md:aspect-[4/3] flex flex-col">
              <img src="https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=600&q=80" alt="Notion Workspace" className="w-full h-1/2 object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              <div className="flex-1 bg-gradient-to-b from-[#111] to-black p-6 flex flex-col justify-start border-t border-white/5">
                <span className="text-gray-300 text-[10px] uppercase tracking-widest font-bold mb-2">NOTION</span>
                <h4 className="text-white font-serif text-xl mb-3">Ultimate Dev Workspace</h4>
                <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
                  A comprehensive YouTube series on building scalable engineering workflows and personal knowledge bases.
                </p>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="group rounded-2xl overflow-hidden border border-white/10 bg-black/50 relative cursor-pointer aspect-square md:aspect-[4/3] flex flex-col">
              <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80" alt="Hostinger Deployment" className="w-full h-1/2 object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              <div className="flex-1 bg-gradient-to-b from-[#111] to-black p-6 flex flex-col justify-start border-t border-white/5">
                <span className="text-[#673AB7] text-[10px] uppercase tracking-widest font-bold mb-2">HOSTINGER</span>
                <h4 className="text-white font-serif text-xl mb-3">Scaling Full-Stack Apps</h4>
                <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
                  Live demonstration of deploying enterprise-grade Next.js applications to handle high user traffic.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group rounded-2xl overflow-hidden border border-white/10 bg-black/50 relative cursor-pointer aspect-square md:aspect-[4/3] flex flex-col">
              <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80" alt="Logitech Studio" className="w-full h-1/2 object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              <div className="flex-1 bg-gradient-to-b from-[#111] to-black p-6 flex flex-col justify-start border-t border-white/5">
                <span className="text-[#00B8D4] text-[10px] uppercase tracking-widest font-bold mb-2">LOGITECH</span>
                <h4 className="text-white font-serif text-xl mb-3">Professional Studio Setup</h4>
                <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
                  Behind the scenes look at the hardware powering high-fidelity coding livestreams and tutorials.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center relative z-10">
            <button 
              onClick={() => onChangePage("collaborations")} 
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-gold hover:text-white transition-all duration-300"
            >
              Explore Collaborations <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
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

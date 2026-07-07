import React, { useEffect, useState, useRef } from "react";
import { ArrowDown, ArrowUpRight, CheckCircle, Terminal, Play, X } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Magnetic } from "../components/Magnetic";
import { LuxuryCard } from "../components/LuxuryCard";
import homeData from "../data/home.json";
import servicesData from "../data/services.json";
import portfolioData from "../data/portfolio.json";
import campaignsData from "../data/campaigns.json";
import eventsData from "../data/events.json";
import testimonialsData from "../data/testimonials.json";
import videosData from "../data/videos.json";

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  onChangePage: (page: string) => void;
}

const VideoCard = ({ video, onClick }: { video: any; onClick: () => void }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    if (containerRef.current) {
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
    const angleX = (yc - y) / 15; // rotate X based on vertical distance
    const angleY = (x - xc) / 15; // rotate Y based on horizontal distance
    el.style.setProperty("--rx", `${angleX}deg`);
    el.style.setProperty("--ry", `${angleY}deg`);
  };

  const handlePlaying = () => {
    setIsPlaying(true);
  };

  const isVertical = video.aspectRatio === "9/16";

  return (
    <div
      ref={containerRef}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#070707] transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_50px_rgba(212,175,55,0.15)] cursor-pointer select-none ${
        isVertical ? "col-span-1 aspect-[9/16]" : "col-span-1 md:col-span-2 aspect-[16/9]"
      }`}
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
          <span className="px-3.5 py-1 rounded-full border border-gold/30 bg-black/75 text-[9px] uppercase tracking-[2px] font-mono text-gold backdrop-blur-md">
            {video.type === "reel" || video.type === "short" ? "Reels & Shorts" : "Long Videos"}
          </span>
          <span className="w-8 h-8 rounded-full border border-white/20 bg-black/60 flex items-center justify-center backdrop-blur-md group-hover:bg-gold group-hover:border-gold group-hover:scale-110 transition-all duration-300">
            <Play className="w-3.5 h-3.5 text-white group-hover:text-black fill-current translate-x-[1px] transition-colors" />
          </span>
        </div>

        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-serif text-xl md:text-2xl text-white font-medium mb-2 group-hover:text-gold transition-colors duration-300">
            {video.title}
          </h3>
          <p className="text-xs text-gray-400 font-mono tracking-[1px] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            Hover to Play • Tap to Watch Fullscreen
          </p>
        </div>
      </div>
    </div>
  );
};

export const Home: React.FC<HomeProps> = ({ onChangePage }) => {
  const [activeFilter, setActiveFilter] = useState("all");
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



    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleNavClick = (pageId: string) => {
    onChangePage(pageId);
  };

  const filteredVideos = videosData.filter((v) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "reels_shorts") return v.type === "reel" || v.type === "short";
    if (activeFilter === "long") return v.type === "long_video";
    return true;
  });

  return (
    <div className="relative text-white min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden pt-40 text-center">
        <div className="flex justify-center mb-6 relative z-20">
          <span className="text-[12px] md:text-[14px] uppercase tracking-[4px] text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            HERO LANDING
          </span>
        </div>



        <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
          {/* Animated luxury tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-6 border border-gold/25 px-4 py-1.5 rounded-full bg-gold/5 backdrop-blur-md flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            {homeData.hero.tag}
          </motion.div>

          {/* Headline with split reveal effect */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4, ease: "easeOut" }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.1] tracking-tight mb-8 text-reveal"
          >
            Orchestrating <br />
            <span className="font-bold italic text-gold font-serif">Immersive Tech</span> Education.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            className="text-gray-400 text-sm md:text-lg font-light max-w-2xl leading-relaxed mb-12 p-6 md:p-8 rounded-2xl border border-gold bg-black/40 backdrop-blur-sm shadow-[0_0_30px_rgba(212,175,55,0.1)]"
          >
            {homeData.hero.paragraph}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center relative z-20"
          >
            <Magnetic strength={0.3}>
              <button
                onClick={() => handleNavClick("services")}
                className="light-sweep px-8 py-4 bg-white text-black font-bold uppercase text-xs tracking-[2px] rounded-full hover:bg-gold hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                {homeData.hero.ctaPrimary}
              </button>
            </Magnetic>

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

            <Magnetic strength={0.25}>
              <button
                onClick={() => handleNavClick("contact")}
                className="px-8 py-4 border border-white/20 text-white font-bold uppercase text-xs tracking-[2px] rounded-full hover:border-gold hover:text-gold bg-transparent transition-all duration-500 flex items-center gap-2"
              >
                {homeData.hero.ctaSecondary}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </section>

      {/* Personal Introduction */}
      <section className="scroll-section py-24 px-6 max-w-7xl mx-auto relative z-10 text-center">
        <div className="flex justify-center mb-8 relative z-20">
          <span className="text-[12px] md:text-[14px] uppercase tracking-[4px] text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            FOUNDER BIOGRAPHY
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mb-6 fade-up">
          Hello, I'm <span className="font-bold italic text-gold">Kanha</span>.
        </h2>
        <p className="text-gray-400 text-sm md:text-lg font-light leading-relaxed max-w-3xl mx-auto fade-up">
          I am a software engineer, educator, and content creator dedicated to democratizing tech education. My mission is to bridge the gap between academic theory and industry expectations, helping aspiring developers master modern web architectures.
        </p>
      </section>

      {/* 2. Brand Partner Logos Ticker */}
      <section className="py-12 bg-black/40 border-y border-white/5 relative z-10 overflow-hidden text-center">
        <div className="flex justify-center mb-6 relative z-20">
          <span className="text-[12px] md:text-[14px] uppercase tracking-[4px] text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            TRUSTED PARTNERS TICKER
          </span>
        </div>
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
          className="flex gap-24 w-max"
        >
          {[1, 2].map((groupIndex) => (
            <div key={groupIndex} className="flex items-center gap-24">
              {["NVIDIA", "GITHUB", "GOOGLE CLOUD", "APPLE DEVELOPER", "VERCEL", "MICROSOFT"].map((brand) => (
                <span
                  key={brand}
                  className="font-serif text-xl sm:text-2xl font-black text-gold tracking-[6px] transition-colors duration-300 select-none cursor-default"
                >
                  {brand}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* 3. Core Values Grid Section */}
      <section className="scroll-section py-24 px-6 max-w-7xl mx-auto relative z-10 text-left">
        <div className="flex justify-center mb-12 relative z-20">
          <span className="text-[12px] md:text-[14px] uppercase tracking-[4px] text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            CORE VALUES
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {homeData.values.map((val, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-3xl border-l-4 border-l-gold/40 hover:border-l-gold transition-all duration-300 fade-up">
              <span className="text-gold font-mono text-xs block mb-4">Value 0{idx + 1}</span>
              <h3 className="font-serif text-xl font-medium text-white mb-2">{val.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Core Services Section */}
      <section className="scroll-section py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex justify-center mb-12 relative z-20">
          <span className="text-[12px] md:text-[14px] uppercase tracking-[4px] text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            CORE SERVICES & TRAINING
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20 items-end">
          <div className="lg:col-span-2 text-left">
            <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">EDUCATIONAL PILLARS</p>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight fade-up">
              Bridging the gap between <br />
              <span className="text-gold italic font-bold">Code & Placement</span>.
            </h2>
          </div>
          <div className="text-left">
            <p className="text-gray-400 font-light leading-relaxed mb-6 fade-up">
              We design structured curricula, virtual sandbox playgrounds, and live cohort workshops, transforming traditional programming paths into cinematic student success pipelines.
            </p>
            <button
              onClick={() => handleNavClick("services")}
              className="text-xs uppercase tracking-[2px] text-gold hover:text-white transition-colors duration-300 font-bold flex items-center gap-1.5 fade-up"
            >
              View Service Portals <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Services Grid using LuxuryCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((srv, idx) => (
            <LuxuryCard
              key={srv.id}
              accentColor={srv.accentColor}
              className="fade-up"
              index={idx}
            >
              <div className="flex justify-between items-start mb-8">
                <span className="font-mono text-xs opacity-30">0{idx + 1}</span>
                <span 
                  className="px-3 py-1 rounded-full border text-[9px] uppercase tracking-[1px] font-mono"
                  style={{ color: srv.accentColor, borderColor: srv.accentColor + "40" }}
                >
                  {srv.tagline}
                </span>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl text-white font-medium mb-4 group-hover:text-gold transition-colors duration-300">
                {srv.title}
              </h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">
                {srv.description}
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-white/5">
                {srv.features.map((feat, fidx) => (
                  <li key={fidx} className="flex items-center gap-2 text-xs text-gray-400">
                    <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </LuxuryCard>
          ))}
        </div>
      </section>

      {/* 5. Statistics Callout */}
      <section className="scroll-section py-24 bg-[#050505] border-y border-white/5 px-6 relative z-10 text-center">
        <div className="flex justify-center mb-10 relative z-20">
          <span className="text-[12px] md:text-[14px] uppercase tracking-[4px] text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            GLOBAL REACH & STATISTICS
          </span>
        </div>
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-12">INFLUENCE & REACH</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {homeData.stats.map((stat, idx) => (
              <div key={idx} className="fade-up">
                <span className="font-serif text-4xl sm:text-6xl font-black text-gold block mb-2">{stat.value}</span>
                <span className="text-gray-400 text-xs tracking-[1px] uppercase font-mono">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Video Showcase Section */}
      <section className="scroll-section py-32 px-6 max-w-7xl mx-auto relative z-10 text-left">
        <div className="flex justify-center mb-12 relative z-20">
          <span className="text-[12px] md:text-[14px] uppercase tracking-[4px] text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            FEATURED VIDEO SHOWCASE
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">VIDEO PORTFOLIO</p>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight">
              Cinematic <span className="text-gold italic font-bold">Video Streams</span>
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-4 border-b border-white/10 pb-2 relative">
            {[
              { id: "all", label: "All Clips" },
              { id: "reels_shorts", label: "Reels & Shorts" },
              { id: "long", label: "Long Videos" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`relative text-xs uppercase tracking-[2px] pb-2 px-3 transition-all duration-300 font-bold z-10 ${
                  activeFilter === tab.id
                    ? "text-gold font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
                {activeFilter === tab.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onClick={() => setSelectedVideo(video)}
            />
          ))}
        </div>
      </section>


      {/* 8. Quick YouTube Promo Callout */}
      <section className="scroll-section py-24 px-6 max-w-7xl mx-auto relative z-10 text-left">
        <div className="flex justify-center mb-10 relative z-20">
          <span className="text-[12px] md:text-[14px] uppercase tracking-[4px] text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            YOUTUBE INITIATIVE
          </span>
        </div>
        <div className="glass-panel p-8 md:p-12 rounded-3xl flex flex-col md:flex-row gap-8 items-center border border-white/5">
          <div className="md:w-2/3">
            <span className="text-[10px] uppercase font-bold tracking-[3px] text-gold block mb-2">YOUTUBE INITIATIVE</span>
            <h3 className="font-serif text-3xl font-light text-white mb-4">
              Building Web Apps Live for 2.5 Million Learners
            </h3>
            <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed mb-6">
              Join Kanha as he takes raw coding problems and transforms them into interactive systems. Subscribing gains you access to Github action alerts, workspace repositories, and community-guided streams.
            </p>
            <a href="https://youtube.com/c/techmasterf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs uppercase tracking-[2px] text-gold hover:text-white transition-colors duration-300 font-bold">
              Explore YouTube Channel <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          <div className="md:w-1/3 w-full aspect-video rounded-2xl overflow-hidden relative border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
            <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80" alt="YouTube recording" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Terminal className="w-10 h-10 text-gold animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="scroll-section py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex justify-center mb-12 relative z-20">
          <span className="text-[12px] md:text-[14px] uppercase tracking-[4px] text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            FEATURED EDUCATION CAMPAIGNS
          </span>
        </div>
        <div className="mb-16 text-center">
          <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">OUR IMPACT</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-white fade-up">
            Featured <span className="text-gold italic font-bold">Campaigns</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {campaignsData.slice(0, 3).map((camp: any) => (
            <div key={camp.id} className="glass-panel p-6 rounded-2xl border border-white/5 fade-up flex flex-col">
              <img src={camp.coverImage} alt={camp.title} className="w-full h-40 object-cover rounded-xl mb-4" />
              <h3 className="font-serif text-xl text-white mb-2">{camp.title}</h3>
              <p className="text-gray-400 text-xs font-light flex-grow">{camp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Event Highlights */}
      <section className="scroll-section py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex justify-center mb-12 relative z-20">
          <span className="text-[12px] md:text-[14px] uppercase tracking-[4px] text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            EVENT HIGHLIGHTS
          </span>
        </div>
        <div className="mb-16 text-center">
          <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">COMMUNITY</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-white fade-up">
            Event <span className="text-gold italic font-bold">Highlights</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {eventsData.slice(0, 2).map((evt: any) => (
            <div key={evt.id} className="glass-panel p-8 rounded-2xl border-l-2 hover:border-l-gold transition-all duration-300 fade-up">
              <span className="text-gold text-xs font-mono mb-3 block">{evt.date}</span>
              <h3 className="font-serif text-2xl text-white mb-3">{evt.title}</h3>
              <p className="text-gray-400 text-sm font-light">{evt.description}</p>
            </div>
          ))}
        </div>
      </section>



      {/* Newsletter */}
      <section className="scroll-section py-24 px-6 max-w-4xl mx-auto relative z-10 text-center">
        <div className="flex justify-center mb-10 relative z-20">
          <span className="text-[12px] md:text-[14px] uppercase tracking-[4px] text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            NEWSLETTER SUBSCRIPTION
          </span>
        </div>
        <div className="glass-panel p-12 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.05)] fade-up">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Stay in the Loop</h2>
          <p className="text-gray-400 text-sm mb-8 font-light">Join my newsletter to get the latest tech insights, coding tips, and event updates delivered directly to your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="flex-1 bg-black/50 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors" />
            <button type="submit" className="bg-gold text-black px-8 py-3 rounded-full font-bold uppercase text-xs tracking-[1px] hover:bg-white transition-colors">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Contact Preview */}
      <section className="scroll-section pb-24 px-6 max-w-7xl mx-auto relative z-10 text-center">
        <div className="flex justify-center mb-10 relative z-20">
          <span className="text-[12px] md:text-[14px] uppercase tracking-[4px] text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            COLLABORATION INQUIRY
          </span>
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight mb-8 fade-up">
          Ready to <span className="text-gold italic font-bold">Collaborate?</span>
        </h2>
        <button
          onClick={() => handleNavClick("contact")}
          className="light-sweep px-8 py-4 bg-white text-black font-bold uppercase text-xs tracking-[2px] rounded-full hover:bg-gold hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] fade-up"
        >
          Get In Touch
        </button>
      </section>

      {/* Lightbox Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedVideo(null)} />
          
          <div className="relative w-full max-w-4xl max-h-[85vh] bg-[#070707] rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row z-50">
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
                autoPlay 
                playsInline
                className="w-full h-full max-h-[70vh] object-contain"
              />
            </div>

            {/* Details Side-panel */}
            <div className="p-8 md:w-80 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 bg-[#090909]">
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

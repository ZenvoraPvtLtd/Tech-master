import React, { useEffect, useState, useRef } from "react";
import { ArrowDown, ArrowUpRight, Terminal, Play, X } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Magnetic } from "../components/Magnetic";
import { useData } from "../context/DataContext";
import { LuxuryCard } from "../components/LuxuryCard";

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
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
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
  const { homeData, servicesData, campaignsData, eventsData, dbData, coreServicesConfig, isLoading } = useData();
  if (isLoading || !homeData) return <div className="min-h-screen bg-black flex items-center justify-center"><span className="text-gold uppercase tracking-widest text-xs font-bold">Initializing CMS...</span></div>;
  const servicesList = (servicesData || []).filter((s: any) => s.status === 'Active').sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
  const campaignsList = campaignsData || [];
  const eventsList = eventsData || [];

  const dynamicVideos = [
    ...(dbData?.homepage?.reels || []).map((v: any) => ({
      id: v.id,
      title: v.title,
      type: "reel",
      url: v.videoUrl || v.url,
      thumbnail: v.thumbnailUrl || v.thumbnail || v.imageUrl,
      aspectRatio: "9/16",
      category: "Reels & Shorts"
    })),
    ...(dbData?.homepage?.shorts || []).map((v: any) => ({
      id: v.id,
      title: v.title,
      type: "short",
      url: v.videoUrl || v.url,
      thumbnail: v.thumbnailUrl || v.thumbnail || v.imageUrl,
      aspectRatio: "9/16",
      category: "Reels & Shorts"
    })),
    ...(dbData?.homepage?.longVideos || []).map((v: any) => ({
      id: v.id,
      title: v.title,
      type: "long_video",
      url: v.videoUrl || v.url,
      thumbnail: v.thumbnailUrl || v.thumbnail || v.imageUrl,
      aspectRatio: "16/9",
      category: "Long Videos"
    }))
  ];
  const activeVideos = dynamicVideos.length > 0 ? dynamicVideos : [];

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

      cards.forEach((card) => {
        const headingChars = card.querySelectorAll(".char");
        const content = card.querySelector(".value-card-content");

        tl.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        });

        if (headingChars.length > 0) {
          tl.to(headingChars, {
            opacity: 1,
            duration: 0.03,
            stagger: 0.05,
            ease: "none"
          }, "-=0.35");
        }

        tl.to(content, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out"
        }, "-=0.15");
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
  }, [activeFilter]);

  const handleNavClick = (pageId: string) => {
    onChangePage(pageId);
  };

  const filteredVideos = activeVideos.filter((v: any) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "reels_shorts") return v.type === "reel" || v.type === "short";
    if (activeFilter === "long") return v.type === "long_video";
    return true;
  });

  return (
    <div className="relative text-white min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden pt-24 md:pt-32 lg:pt-40 text-center">
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
            {homeData?.heroMainHeading?.smallBadge || "HERO LANDING"}
          </motion.div>

          {/* Headline with split reveal effect */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4, ease: "easeOut" }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.1] tracking-tight mb-8 text-reveal"
          >
            {homeData?.heroMainHeading?.headingLine1 || "Orchestrating"} <br />
            <span className="font-bold italic text-gold font-serif">{homeData?.heroMainHeading?.highlightedHeading || "Immersive Tech"}</span> {homeData?.heroMainHeading?.headingLine3 || "Education."}
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
            className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center relative z-20"
          >
            <Magnetic strength={0.3}>
              <button
                onClick={() => handleNavClick("services")}
                className="light-sweep px-8 py-4 bg-white text-black font-bold uppercase text-xs tracking-[2px] rounded-full hover:bg-gold hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                {homeData?.heroMainHeading?.primaryButton || "Discover Services"}
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
                {homeData?.heroMainHeading?.secondaryButton || "Contact Us"}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </section>

      {/* Personal Introduction */}
      <section className="scroll-section py-24 px-6 max-w-7xl mx-auto relative z-10 text-center">
        <div className="flex justify-center mb-8 relative z-20">
          <span className="text-[12px] md:text-[14px] uppercase tracking-[4px] text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">{homeData?.founderBio?.tag || "FOUNDER BIOGRAPHY"}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mb-6 fade-up">
          {homeData?.founderBio?.title || "Hello, I'm Aman."}
        </h2>
        <p className="text-gray-400 text-sm md:text-lg font-light leading-relaxed max-w-3xl mx-auto fade-up">
          {homeData?.founderBio?.paragraph || "I am a software engineer..."}
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
          transition={{ ease: "linear", duration: Math.max(20, (homeData?.brandPartners?.length || 6) * 3.33), repeat: Infinity }}
          className="flex gap-12 md:gap-24 w-max"
        >
          {[1, 2].map((groupIndex) => (
            <div key={groupIndex} className="flex items-center gap-12 md:gap-24">
              {(homeData?.brandPartners?.length > 0 ? homeData.brandPartners : [{ brandName: "NVIDIA" }, { brandName: "GITHUB" }, { brandName: "GOOGLE CLOUD" }, { brandName: "APPLE DEVELOPER" }, { brandName: "VERCEL" }, { brandName: "MICROSOFT" }]).map((brand: any, idx: number) => (
                <span
                  key={`${brand.brandName}-${idx}`}
                  className="font-serif text-xl sm:text-2xl font-black text-gold tracking-[6px] transition-colors duration-300 select-none cursor-default"
                >{brand.brandName}</span>
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
        <div className="core-values-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
          {homeData?.coreValues?.map((val: any, idx: number) => (
            <div key={idx} className="value-card glass-panel p-8 rounded-3xl border-l-4 border-l-gold/40 hover:border-l-gold transition-all duration-300 opacity-0">
              <h3 className="value-card-heading font-serif text-xl font-medium text-white mb-2">{splitText(val.title)}</h3>
              <p className="value-card-content text-gray-400 text-xs sm:text-sm font-light leading-relaxed opacity-0">{val.description}</p>
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

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList?.map((srv, idx) => (
            <LuxuryCard
              key={srv.id}
              accentColor={srv.accentColor}
              className="services-card opacity-0"
              index={idx}
            >
              <div className="flex justify-center items-start mb-8">
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
                {srv?.features?.map((feat: any, fidx: number) => (
                  <li key={fidx} className="flex items-center gap-2 text-xs text-gray-400">
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
            {(homeData?.statistics || homeData?.statisticsCounters)?.map((stat: any, idx: number) => (
              <div key={idx} className="fade-up">
                <span className="font-serif text-4xl sm:text-6xl font-black text-gold block mb-2">{`${stat.prefix || ""}${stat.number}${stat.suffix || ""}`}</span>
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
        {activeFilter === "all" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 video-showcase-grid-container">
            {/* Left Column for Reels & Shorts (Vertical) */}
            <div className="flex flex-col gap-8 col-span-1">
              {filteredVideos
                .filter((v) => v.type === "reel" || v.type === "short")
                .map((video) => (
                  <div key={video.id} className="video-fade-in w-full aspect-[9/16]">
                    <VideoCard
                      video={video}
                      onClick={() => setSelectedVideo(video)}
                    />
                  </div>
                ))}
            </div>
            {/* Right Column for Long Videos (Horizontal) */}
            <div className="flex flex-col gap-8 col-span-1 md:col-span-2">
              {filteredVideos
                .filter((v) => v.type === "long_video")
                .map((video) => (
                  <div key={video.id} className="video-fade-in w-full aspect-[16/9]">
                    <VideoCard
                      video={video}
                      onClick={() => setSelectedVideo(video)}
                    />
                  </div>
                ))}
            </div>
          </div>
        ) : activeFilter === "long" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 video-showcase-grid-container">
            {filteredVideos?.map((video, idx) => {
              const isLastAndOdd = idx === filteredVideos.length - 1 && filteredVideos.length % 2 !== 0;
              return (
                <div
                  key={video.id}
                  className={`video-fade-in aspect-[16/9] ${
                    isLastAndOdd ? "col-span-1 md:col-span-2 max-w-3xl mx-auto w-full" : "col-span-1"
                  }`}
                >
                  <VideoCard
                    video={video}
                    onClick={() => setSelectedVideo(video)}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto video-showcase-grid-container">
            {filteredVideos?.map((video) => (
              <div key={video.id} className="video-fade-in w-full aspect-[9/16]">
                <VideoCard
                  video={video}
                  onClick={() => setSelectedVideo(video)}
                />
              </div>
            ))}
          </div>
        )}
      </section>


      {/* 8. Quick YouTube Promo Callout */}
      <section className="scroll-section py-24 px-6 max-w-7xl mx-auto relative z-10 text-left">
        <div className="flex justify-center mb-10 relative z-20">
          <span className="text-[12px] md:text-[14px] uppercase tracking-[4px] text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">{homeData?.youtubePromo?.tag || "YOUTUBE INITIATIVE"}</span>
        </div>
        <div className="glass-panel p-8 md:p-12 rounded-3xl flex flex-col md:flex-row gap-8 items-center border border-white/5">
          <div className="md:w-2/3">
            <span className="text-[10px] uppercase font-bold tracking-[3px] text-gold block mb-2">{homeData?.youtubePromo?.tag || "YOUTUBE INITIATIVE"}</span>
            <h3 className="font-serif text-3xl font-light text-white mb-4">
              {homeData?.youtubePromo?.heading || "Building Web Apps Live for 2.5 Million Learners"}
            </h3>
            <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed mb-6">
              {homeData?.youtubePromo?.description || "Join Aman as he takes raw coding problems..."}
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
          {campaignsList?.slice(0, 3)?.map((camp: any) => (
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
          {eventsList?.slice(0, 2)?.map((evt: any) => (
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
          <span className="text-[12px] md:text-[14px] uppercase tracking-[4px] text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">{homeData?.newsletter?.tag || "NEWSLETTER SUBSCRIPTION"}</span>
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
      <section className="scroll-section pb-24 px-6 max-w-7xl mx-auto relative z-10 text-center">
        <div className="flex justify-center mb-10 relative z-20">
          <span className="text-[12px] md:text-[14px] uppercase tracking-[4px] text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">{homeData?.contactPreview?.tag || "COLLABORATION INQUIRY"}</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight mb-8 fade-up">
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
                autoPlay 
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

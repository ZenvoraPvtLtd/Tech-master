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
      <section className="flex flex-col justify-center items-center px-6 relative overflow-hidden pt-24 md:pt-28 pb-0 text-center">
        {/* The 2 Badges directly below Navbar */}
        <div className="flex flex-col items-center gap-3 relative z-20 mb-4 sm:mb-6">
          <span className="typo-badge text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            TECH MASTER
          </span>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="typo-badge border border-gold/25 px-4 py-1.5 rounded-full bg-gold/5 backdrop-blur-md flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5 fill-current text-gold" viewBox="0 0 24 24">
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            {homeData?.heroMainHeading?.smallBadge || "INDIA'S LEADING DIGITAL & TECHNICAL SOLUTION"}
          </motion.div>
        </div>

        {/* Vertical Gap for 3D Lion / Sher Logo */}
        <div className="h-80 sm:h-96 md:h-[420px] w-full pointer-events-none" />

        <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10 mt-4 sm:mt-8">
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
      <section className="py-2 md:py-2.5 bg-black/40 border-y border-white/5 relative z-10 overflow-hidden text-center flex flex-col items-center justify-center gap-1.5">
        <div className="flex justify-center relative z-20">
          <span className="typo-badge text-gold/70 border border-gold/25 px-3 py-0.5 rounded-full bg-black/40 font-mono font-semibold text-[9px]">
            OFFICIAL CHANNELS & PARTNERS
          </span>
        </div>
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
          style={{ willChange: "transform" }}
          className="flex w-max items-center justify-center"
        >
          {[1, 2, 3, 4].map((groupIndex) => {
            const defaultBrandChannels = [
              {
                brandName: "Tech Master",
                youtubeUrl: "https://www.youtube.com/@techmasterhq",
                instagramUrl: "https://www.instagram.com/techmasterco/?hl=en",
                showYouTube: true,
                showInstagram: true
              },
              {
                brandName: "Next Univerz",
                youtubeUrl: "https://www.youtube.com/@NextUniverz",
                instagramUrl: "https://www.instagram.com/NextUniverz/",
                showYouTube: true,
                showInstagram: true
              },
              {
                brandName: "Master Wheels",
                youtubeUrl: "https://www.youtube.com/@MasterWheelsAK",
                instagramUrl: "https://www.instagram.com/masterwheel1/",
                showYouTube: true,
                showInstagram: true
              },
              {
                brandName: "Full Circle",
                youtubeUrl: "https://www.youtube.com/@fullcircle_in",
                instagramUrl: "https://www.instagram.com/fullcircle_in/",
                showYouTube: true,
                showInstagram: true
              }
            ];

            const activePartners = (homeData?.brandPartners && homeData.brandPartners.length > 0)
              ? homeData.brandPartners.filter((b: any) => b.status === "Active" || b.status === true || b.status === undefined)
              : defaultBrandChannels;

            const displayPartners = activePartners.length > 0
              ? [...activePartners].sort((a: any, b: any) => (Number(a.order) || 0) - (Number(b.order) || 0))
              : defaultBrandChannels;

            return (
              <div key={groupIndex} className="flex items-center">
                {displayPartners.map((brand: any, idx: number) => {
                  return (
                    <div
                      key={`${brand.brandName}-${idx}-${groupIndex}`}
                      onClick={() => handleNavClick("portfolio")}
                      data-cursor="CLICK"
                      className="group/brand relative inline-flex flex-col items-center justify-center px-8 sm:px-14 py-0.5 transition-all duration-300 cursor-pointer select-none"
                    >
                      {/* Clean Brand Title */}
                      <span className="font-serif text-base sm:text-lg font-bold text-gold tracking-[2.5px] whitespace-nowrap group-hover/brand:text-white transition-colors duration-300 relative z-10">
                        {brand.brandName}
                      </span>

                      {/* Yellow Click Here Quick Link with Angled Arrow */}
                      <span className="text-yellow-400 group-hover/brand:text-yellow-300 text-[11px] font-mono font-semibold tracking-wider flex items-center gap-1 transition-colors duration-300 relative z-10">
                        <span className="underline underline-offset-2">Click Here</span> ↗
                      </span>
                    </div>
                  );
                })}
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
            <p className="typo-badge mb-4">OUR WORK</p>
            <h2 className="typo-h2">
              Cinematic <span className="text-gold italic font-bold">Video Streams</span>
            </h2>
          </div>

        </div>

        {/* Video Cards Grid */}
        <div className="flex flex-col gap-16 md:gap-20 w-full max-w-7xl mx-auto video-showcase-grid-container">
            {(() => {
              const reels = filteredVideos.filter((v) => v.type === "reel" || v.type === "short");
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
            vivo: { icon: "https://cdn.simpleicons.org/vivo/white", fallback: vivoLogo }
          };

          const defaultBrandCollabs = [
            "Amazon", "Asus", "Dell", "Flipkart", "Huawei", "IQOO", "Marshall", "Xiaomi",
            "Motorola", "OnePlus", "Oppo", "Google Pixel", "Poco", "Realme", "Samsung", "Vivo"
          ].map((name) => {
            const clean = name.toLowerCase();
            return {
              brandName: name,
              logo: brandVectorMap[clean]?.icon,
              fallbackLogo: brandVectorMap[clean]?.fallback
            };
          });

          const activeCollabs = (homeData?.brandCollaborationsList && homeData.brandCollaborationsList.length > 0)
            ? homeData.brandCollaborationsList.filter((b: any) => b.status === "Active" || b.status === true || b.status === undefined)
            : defaultBrandCollabs;

          const displayCollabs = activeCollabs.length > 0
            ? [...activeCollabs].map((b: any) => {
                const bName = b.brandName || b.name || "";
                const cleanName = bName.toLowerCase().trim();
                const vInfo = brandVectorMap[cleanName] || { 
                  icon: `https://cdn.simpleicons.org/${cleanName.replace(/[^a-z0-9]/g, "")}/white`, 
                  fallback: b.logo || b.brandLogo
                };
                return {
                  brandName: bName,
                  logo: vInfo.icon,
                  fallbackLogo: vInfo.fallback || b.logo || b.brandLogo,
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
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full items-center justify-items-center"
                >
                  {displayCollabs.map((brand: any, idx: number) => {
                    const bName = brand.brandName;

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
                            if (brand.fallbackLogo && target.src !== brand.fallbackLogo) {
                              target.src = brand.fallbackLogo;
                            }
                          }}
                          className="h-12 sm:h-16 md:h-18 w-auto max-w-[180px] sm:max-w-[240px] md:max-w-[280px] object-contain transition-all duration-500 opacity-70 group-hover:opacity-100 group-hover:scale-105 group-hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.7)] relative z-10"
                        />
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

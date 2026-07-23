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
      <section className="flex flex-col justify-center items-center px-6 relative overflow-hidden pt-32 sm:pt-40 md:pt-48 pb-0 text-center">
        <div className="flex justify-center mb-6 mt-48 sm:mt-64 md:mt-80 relative z-20">
          <span className="typo-badge text-gold/70 border border-gold/25 px-5 py-2 rounded-full bg-black/40 font-mono font-semibold">
            TECH MASTER
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
            OFFICIAL CHANNELS & PARTNERS
          </span>
        </div>
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          style={{ willChange: "transform" }}
          className="flex gap-12 md:gap-24 w-max"
        >
          {[1, 2].map((groupIndex) => {
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
              <div key={groupIndex} className="flex items-center gap-12 md:gap-20">
                {displayPartners.map((brand: any, idx: number) => {
                  const ytUrl = brand.youtubeUrl || brand.url || "https://www.youtube.com/@techmasterhq";
                  const instaUrl = brand.instagramUrl || brand.website;
                  const showYt = brand.showYouTube !== false && !!ytUrl;
                  const showInsta = brand.showInstagram !== false && !!instaUrl;

                  return (
                    <div
                      key={`${brand.brandName}-${idx}-${groupIndex}`}
                      className="inline-flex items-center gap-3 bg-black/80 border border-gold/30 hover:border-gold px-4 py-2 rounded-xl backdrop-blur-md transition-all duration-300 shadow-md group/brand"
                    >
                      {/* Brand Title */}
                      <span className="font-serif text-base sm:text-lg font-bold text-gold tracking-[3px] whitespace-nowrap">
                        {brand.brandName}
                      </span>

                      {/* YouTube Direct Icon */}
                      {showYt && (
                        <a
                          href={ytUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Open ${brand.brandName} YouTube Channel`}
                          className="p-1.5 rounded-full bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white transition-all duration-300 border border-red-500/40 hover:scale-110 flex items-center justify-center"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </a>
                      )}

                      {/* Instagram Direct Icon */}
                      {showInsta && (
                        <a
                          href={instaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Open ${brand.brandName} Instagram Profile`}
                          className="p-1.5 rounded-full bg-pink-600/20 hover:bg-pink-600 text-pink-400 hover:text-white transition-all duration-300 border border-pink-500/40 hover:scale-110 flex items-center justify-center"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </a>
                      )}
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
            <p className="typo-badge mb-4">VIDEO PORTFOLIO</p>
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

        {/* 4 Cards Per Line Grid */}
        {(() => {
          const defaultBrandCollabs = [
            { brandName: "Samsung", logo: samsungLogo },
            { brandName: "Xiaomi", logo: miLogo },
            { brandName: "OnePlus", logo: oneplusLogo },
            { brandName: "Oppo", logo: oppoLogo },
            { brandName: "Vivo", logo: vivoLogo },
            { brandName: "Motorola", logo: motorolaLogo },
            { brandName: "IQOO", logo: iqooLogo },
            { brandName: "Realme", logo: realmeLogo },
            { brandName: "Poco", logo: pocoLogo },
            { brandName: "Huawei", logo: huaweiLogo },
            { brandName: "Asus", logo: asusLogo },
            { brandName: "Google Pixel", logo: pixelLogo },
            { brandName: "Dell", logo: dellLogo },
            { brandName: "Amazon", logo: amazonLogo },
            { brandName: "Flipkart", logo: flipkartLogo },
            { brandName: "Marshall", logo: marshallLogo }
          ];

          const activeCollabs = (homeData?.brandCollaborationsList && homeData.brandCollaborationsList.length > 0)
            ? homeData.brandCollaborationsList.filter((b: any) => b.status === "Active" || b.status === true || b.status === undefined)
            : defaultBrandCollabs;

          const displayCollabs = activeCollabs.length > 0
            ? [...activeCollabs].sort((a: any, b: any) => (Number(a.order) || 0) - (Number(b.order) || 0))
            : defaultBrandCollabs;

          return (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5 w-full">
              {displayCollabs.map((brand: any, idx: number) => {
                const logoUrl = brand.logo || brand.brandLogo;

                return (
                  <div
                    key={`${brand.brandName}-${idx}`}
                    className="group relative flex items-center justify-center gap-3 bg-black/60 border border-white/10 hover:border-gold/60 px-5 py-4 rounded-2xl backdrop-blur-xl transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:scale-105 select-none h-20"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={brand.brandName}
                        loading="eager"
                        className="h-8 max-h-9 w-auto max-w-[80px] object-contain rounded transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-bold text-xs uppercase">
                        {brand.brandName.substring(0, 2)}
                      </div>
                    )}

                    <span className="font-serif text-sm sm:text-base font-semibold text-gray-300 group-hover:text-gold tracking-wider transition-colors duration-300 whitespace-nowrap">
                      {brand.brandName}
                    </span>
                  </div>
                );
              })}
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

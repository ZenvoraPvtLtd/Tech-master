import React, { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { mediaUrl } from "../utils/media";
import { useData } from "../context/DataContext";

const YoutubeIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

interface StripeReelsCarouselProps {
  reels?: any[];
  isHomePage?: boolean;
}

const stripeEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];
const transitionSettings = {
  duration: 0.75,
  ease: stripeEasing,
};

const DEFAULT_REELS = [
  {
    id: "reel-1",
    platform: "youtube",
    title: "Tech Master Viral Short",
    views: "5.4M views",
    channelName: "@techmasterhq",
    author: "@techmasterhq",
    url: "https://youtube.com/shorts/YP4CdON5rrQ?si=DOx4bPZIJPpc2LSa",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-vertical-animation-of-a-futuristic-robot-41527-large.mp4"
  },
  {
    id: "reel-2",
    platform: "youtube",
    title: "Tech Master Official Video",
    views: "3.8M views",
    channelName: "@techmasterhq",
    author: "@techmasterhq",
    url: "https://www.youtube.com/watch?v=3VuyriEkDwg",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-41529-large.mp4"
  },
  {
    id: "reel-3",
    platform: "youtube",
    title: "Tech Master Exclusive Showcase",
    views: "4.2M views",
    channelName: "@techmasterhq",
    author: "@techmasterhq",
    url: "https://youtu.be/vW2K0L-vUgw?si=4KrnU7BeuuZIlO97",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-holding-a-smartphone-with-a-green-screen-41530-large.mp4"
  },
  {
    id: "reel-4",
    platform: "instagram",
    title: "Tech Master Instagram Reel #1",
    views: "",
    channelName: "@techmasterco",
    author: "@techmasterco",
    url: "https://www.instagram.com/reel/DAs7dOoyU9d/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-holding-a-smartphone-with-a-green-screen-41528-large.mp4"
  },
  {
    id: "reel-5",
    platform: "instagram",
    title: "Trendz Talk Viral Reel",
    views: "",
    channelName: "@trendztalk",
    author: "@trendztalk",
    url: "https://www.instagram.com/reel/DGdKcjNymR4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-vertical-animation-of-a-futuristic-robot-41527-large.mp4"
  }
];

export const StripeReelsCarousel: React.FC<StripeReelsCarouselProps> = ({ reels, isHomePage = false }) => {
  const { dbData } = useData() || {};
  const [activeIndex, setActiveIndex] = useState(0);

  const dynamicFeatured = dbData?.featuredVideos || dbData?.reels || [];
  const activeReelsList = (reels && reels.length > 0) 
    ? reels 
    : (dynamicFeatured.length > 0 ? dynamicFeatured : DEFAULT_REELS);

  const changeActiveIndex = (newIndex: number) => {
    if (newIndex === activeIndex) return;
    setActiveIndex(newIndex);
  };

  const handleNext = useCallback(() => {
    changeActiveIndex((activeIndex + 1) % activeReelsList.length);
  }, [activeIndex, activeReelsList.length]);

  const handlePrev = useCallback(() => {
    changeActiveIndex((activeIndex - 1 + activeReelsList.length) % activeReelsList.length);
  }, [activeIndex, activeReelsList.length]);

  const handleDragEnd = (_e: any, { offset }: PanInfo) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) {
      handleNext();
    } else if (offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const N = activeReelsList.length;

  const getVisibleOffsets = () => {
    return [-2, -1, 0, 1, 2];
  };

  const offsets = getVisibleOffsets();

  const get3DProps = (offset: number) => {
    const abs = Math.abs(offset);

    if (offset === 0) {
      return { rotateY: 0, scale: 1, opacity: 1, zIndex: 50 };
    }
    const sc = abs === 1 ? 0.82 : 0.68;
    const op = abs === 1 ? 0.85 : 0.55;
    return { rotateY: 0, scale: sc, opacity: op, zIndex: 40 - abs };
  };

  return (
    <div className="relative flex flex-col w-full px-4 md:px-8 pt-2 pb-0 md:pt-4 md:pb-0 max-w-[1600px] mx-auto overflow-hidden items-center justify-center select-none">
      
      {/* Chevron Navigation Controls */}
      {N > 1 && (
        <>
          <button
            onClick={handlePrev}
            className={`absolute left-2 md:left-6 z-50 p-2.5 ${isHomePage ? "rounded-none border-black hover:border-black" : "rounded-full border-gold/40 hover:border-gold"} bg-black/60 hover:bg-black/90 text-gold border backdrop-blur-md transition-all shadow-lg text-white cursor-pointer`}
            aria-label="Previous reel"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className={`absolute right-2 md:right-6 z-50 p-2.5 ${isHomePage ? "rounded-none border-black hover:border-black" : "rounded-full border-gold/40 hover:border-gold"} bg-black/60 hover:bg-black/90 text-gold border backdrop-blur-md transition-all shadow-lg text-white cursor-pointer`}
            aria-label="Next reel"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Edge Fade Gradients for ultra-smooth blending of outermost cards */}
      <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 md:w-28 bg-gradient-to-r from-black via-black/60 to-transparent z-40 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 md:w-28 bg-gradient-to-l from-black via-black/60 to-transparent z-40 pointer-events-none" />

      {/* 3D Coverflow Carousel Track */}
      <motion.div 
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ perspective: "1200px" }}
        className="flex flex-row items-center justify-center gap-2 sm:gap-2.5 md:gap-3 h-[360px] sm:h-[440px] md:h-[500px] w-full py-2 cursor-grab active:cursor-grabbing relative overflow-hidden"
      >
        {offsets.map((offset) => {
          const originalIndex = (activeIndex + offset + N * 1000) % N;
          const reel = activeReelsList[originalIndex];
          const isActive = offset === 0;
          const absOffset = Math.abs(offset);
          const { rotateY, scale, opacity, zIndex } = get3DProps(offset);

          const getXShift = (off: number) => {
            if (off === 0) return 0;
            const abs = Math.abs(off);
            const dir = off < 0 ? 1 : -1;
            if (abs === 1) return dir * 14;
            return dir * 52;
          };
          const xShift = getXShift(offset);

          const rawHandle = reel.channelName || reel.author || reel.handle || reel.channel || "@techmasterhq";
          const formattedHandle = rawHandle.startsWith("@") ? rawHandle : `@${rawHandle.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
          
          const isInstagram = reel.platform === "instagram" || (reel.url && reel.url.includes("instagram.com"));
          const viewText = reel.viewCount || reel.views || "";

          const overlayGlassClass = absOffset === 0
            ? "pointer-events-none"
            : absOffset === 1
              ? "bg-black/20 pointer-events-none transition-all duration-300"
              : "bg-black/35 pointer-events-none transition-all duration-300";

          return (
            <motion.div
              key={reel._id || reel.id || reel.title || originalIndex}
              onClick={() => {
                if (!isActive) {
                  changeActiveIndex(originalIndex);
                } else {
                  const targetUrl = reel.url || reel.videoUrl;
                  if (targetUrl) {
                    window.open(targetUrl, "_blank", "noopener,noreferrer");
                  }
                }
              }}
              initial={false}
              animate={{
                rotateY,
                scale,
                opacity,
                zIndex,
                x: xShift,
              }}
              transition={transitionSettings}
              style={{ transformStyle: "preserve-3d", willChange: "transform" }}
              className={`relative h-[360px] sm:h-[440px] md:h-[490px] w-[200px] sm:w-[240px] md:w-[265px] overflow-hidden cursor-pointer shrink-0 bg-zinc-950 group border transition-all duration-300 ${
                isHomePage ? "rounded-none" : "rounded-[24px]"
              } ${
                isHomePage
                  ? isActive 
                    ? "border-2 border-black shadow-[0_25px_60px_rgba(0,0,0,0.9)]" 
                    : "border border-black/80 hover:border-black opacity-80 hover:opacity-100"
                  : isActive 
                    ? "border-gold shadow-[0_25px_60px_rgba(255,215,0,0.25)]" 
                    : "border-blue-500/30 hover:border-blue-400/50"
              }`}
            >
              {/* Pointer events overlay to capture drag/click and block iframe interception */}
              <div className="absolute inset-0 z-35 bg-transparent cursor-pointer" />

              {/* Pure Video Element - GPU Accelerated for 60fps Smooth Playback */}
              <div 
                className="w-full h-full absolute inset-0 z-20 overflow-hidden bg-black"
                style={{ 
                  filter: "none",
                  transform: "translateZ(0)"
                }}
              >
                <video
                  ref={(el) => {
                    if (el) {
                      el.muted = true;
                      el.playsInline = true;
                      const p = el.play();
                      if (p !== undefined) {
                        p.catch(() => {});
                      }
                    }
                  }}
                  src={mediaUrl(reel.videoUrl || "https://assets.mixkit.co/videos/preview/mixkit-vertical-animation-of-a-futuristic-robot-41527-large.mp4")}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover scale-105 relative z-20"
                />
              </div>
              
              {/* GPU Glass Blur & Blue Effect Overlay for Side Cards */}
              {absOffset > 0 && (
                <div className={`absolute inset-0 z-30 ${overlayGlassClass}`} />
              )}

              {/* Overlay Gradient at Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-700 pointer-events-none z-30" />

              {/* Bottom Left Handle Overlay (Shown only on Center and Immediate Side Cards) */}
              {absOffset <= 1 && (
                <div className="absolute bottom-5 left-5 z-40 flex flex-col text-left pointer-events-none transition-opacity duration-300">
                  <span className="text-white font-bold text-sm sm:text-base tracking-wide font-sans drop-shadow-md">
                    {formattedHandle}
                  </span>
                  <span className="text-gray-300 text-xs font-light tracking-wide line-clamp-1 drop-shadow-sm">
                    {reel.title || "Featured Content"}
                  </span>
                </div>
              )}

              {/* Platform Brand Badge & Views Counter */}
              <AnimatePresence>
                {isActive && (
                  <>
                    {/* Top Badge (YouTube / Instagram Platform Branding) */}
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: 0.2 }}
                      className="absolute top-4 left-4 z-40 pointer-events-none"
                    >
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${isHomePage ? "rounded-none" : "rounded-full"} bg-black/70 backdrop-blur-md border text-[10px] uppercase font-mono tracking-[1.5px] font-bold shadow-lg ${
                        isInstagram ? "text-pink-400 border-pink-500/40" : "text-red-400 border-red-500/40"
                      }`}>
                        {isInstagram ? <InstagramIcon /> : <YoutubeIcon />}
                        {isInstagram ? "Reels" : "Shorts"}
                      </span>
                    </motion.div>

                    {/* Views Counter (Shown only if view text available and NOT Instagram) */}
                    {viewText && !isInstagram && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ delay: 0.2 }}
                        className="absolute bottom-5 right-5 z-40 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-gold/40 rounded-full px-3 py-1 shadow-lg"
                      >
                        <span className="text-gray-400 text-[9px] uppercase font-mono tracking-[1.5px] font-semibold">VIEWS</span>
                        <span className="text-gold text-xs font-semibold font-mono">{viewText}</span>
                      </motion.div>
                    )}
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};


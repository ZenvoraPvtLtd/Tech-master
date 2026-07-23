import React, { useState, useCallback, useEffect } from "react";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { PanInfo } from "framer-motion";
import {
  extractYouTubeId,
  parseTimeToSeconds,
  getYouTubeThumbnail,
  fetchYouTubeMetadata,
} from "../utils/youtube";

interface LongVideosCarouselProps {
  videos?: any[];
  isHomePage?: boolean;
}

const stripeEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];
const transitionSettings = {
  duration: 0.75,
  ease: stripeEasing,
};

const DEFAULT_YOUTUBE_VIDEOS = [
  { youtubeUrl: "https://www.youtube.com/watch?v=8H272rF60dc", videoId: "8H272rF60dc", startTime: "0:20", views: "1.4M", fallbackTitle: "Building Enterprise Infrastructure" },
  { youtubeUrl: "https://www.youtube.com/watch?v=onV7l4H5EyM", videoId: "onV7l4H5EyM", startTime: "5:41", endTime: "6:33", views: "890K", fallbackTitle: "Advanced Next.js Architecture" },
  { youtubeUrl: "https://www.youtube.com/watch?v=jbEzCIqhTV8", videoId: "jbEzCIqhTV8", startTime: "0:19", endTime: "0:39", views: "1.1M", fallbackTitle: "Full-Stack System Design" },
  { youtubeUrl: "https://www.youtube.com/watch?v=4_n-ZnjIBVc", videoId: "4_n-ZnjIBVc", startTime: "0:00", views: "2.3M", fallbackTitle: "Mastering Cloud Native Systems" },
  { youtubeUrl: "https://www.youtube.com/watch?v=CvqxRkjvsxY", videoId: "CvqxRkjvsxY", startTime: "0:20", views: "950K", fallbackTitle: "Scalable Microservices Tutorial" },
  { youtubeUrl: "https://www.youtube.com/watch?v=udwDWFERyRw", videoId: "udwDWFERyRw", startTime: "0:20", views: "1.7M", fallbackTitle: "High-Performance Web Applications" },
  { youtubeUrl: "https://www.youtube.com/watch?v=_Db6aKavN1U", videoId: "_Db6aKavN1U", startTime: "0:04", views: "3.1M", fallbackTitle: "Master Wheels Technology Showcase" },
  { youtubeUrl: "https://www.youtube.com/watch?v=FSzP30YegeM", videoId: "FSzP30YegeM", startTime: "0:00", views: "2.8M", fallbackTitle: "Automotive Engineering & Tech" },
  { youtubeUrl: "https://www.youtube.com/watch?v=q-l_F3yQK88", videoId: "q-l_F3yQK88", startTime: "0:10", views: "1.9M", fallbackTitle: "EV Hardware & Control Systems" }
];

export const LongVideosCarousel: React.FC<LongVideosCarouselProps> = ({ videos, isHomePage = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoMetaMap, setVideoMetaMap] = useState<Record<string, { title: string; authorName: string }>>({});

  // Check if passed videos have valid YouTube ID/URL
  const hasYouTubeVideos = videos && videos.some((v: any) => v.youtubeUrl || v.videoId || extractYouTubeId(v.url || v.videoUrl || ""));
  const listToRender = hasYouTubeVideos ? videos : DEFAULT_YOUTUBE_VIDEOS;

  // Fetch dynamic YouTube oEmbed metadata for video titles and channel names
  useEffect(() => {
    listToRender.forEach((v: any) => {
      const vId = v.videoId || extractYouTubeId(v.youtubeUrl || v.url || v.videoUrl || "");
      if (vId && !videoMetaMap[vId]) {
        fetchYouTubeMetadata(vId).then((meta) => {
          setVideoMetaMap((prev) => ({ ...prev, [vId]: meta }));
        });
      }
    });
  }, [listToRender]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % listToRender.length);
  }, [listToRender.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + listToRender.length) % listToRender.length);
  }, [listToRender.length]);

  const handleDragEnd = (_e: any, { offset }: PanInfo) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) {
      handleNext();
    } else if (offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  // Sort and order items symmetrically around activeIndex (showing 1.5 cards on left & right)
  const displayVideos = listToRender
    .map((video: any, originalIndex: number) => {
      let diff = originalIndex - activeIndex;
      if (diff > listToRender.length / 2) diff -= listToRender.length;
      if (diff < -listToRender.length / 2) diff += listToRender.length;
      return { video, originalIndex, diff };
    })
    .filter(({ diff }) => Math.abs(diff) <= 2)
    .sort((a, b) => a.diff - b.diff);

  return (
    <div className="relative flex flex-col w-full px-4 md:px-8 pt-0 pb-1 md:pt-0 md:pb-2 max-w-[1600px] mx-auto overflow-hidden items-center justify-center">

      {/* Chevron Navigation Controls */}
      {listToRender.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className={`absolute left-2 md:left-6 z-50 p-2.5 ${isHomePage ? "rounded-none border-black hover:border-black" : "rounded-full border-gold/40 hover:border-gold"} bg-black/60 hover:bg-black/90 text-white border backdrop-blur-md transition-all shadow-lg cursor-pointer`}
            aria-label="Previous video"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className={`absolute right-2 md:right-6 z-50 p-2.5 ${isHomePage ? "rounded-none border-black hover:border-black" : "rounded-full border-gold/40 hover:border-gold"} bg-black/60 hover:bg-black/90 text-white border backdrop-blur-md transition-all shadow-lg cursor-pointer`}
            aria-label="Next video"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Edge Fade Gradients for smooth blending of outermost peeking cards */}
      <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 md:w-28 bg-gradient-to-r from-black via-black/60 to-transparent z-40 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 md:w-28 bg-gradient-to-l from-black via-black/60 to-transparent z-40 pointer-events-none" />

      {/* Symmetrical Carousel Track */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        className="flex flex-row justify-center items-center gap-[12px] md:gap-[16px] h-[360px] md:h-[500px] w-full py-2 cursor-grab active:cursor-grabbing relative overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <AnimatePresence initial={false}>
          {displayVideos.map(({ video, originalIndex, diff }) => {
            const isActive = diff === 0;
            const absDiff = Math.abs(diff);
            const zIndex = isActive ? 50 : 40 - absDiff;

            const videoId = video.videoId || extractYouTubeId(video.youtubeUrl || video.url || video.videoUrl || "");
            const startSec = parseTimeToSeconds(video.startTime || 0);
            const endSec = parseTimeToSeconds(video.endTime);
            const thumbnailUrl = (videoId ? getYouTubeThumbnail(videoId) : "") || video.thumbnail || video.url;
            const meta = videoMetaMap[videoId] || { title: "", authorName: "" };
            const displayTitle = video.title && !video.title.toLowerCase().includes("subscribe") ? video.title : (meta.title || video.fallbackTitle || "Featured Tech Mastery");
            const channelName = meta.authorName || video.channelName || "TechMaster";

            // Width calculation: Center video wider (680px), Side 1 = 1 full card (170px), Side 2 = 0.5 peek card (70px)
            const getWidth = () => {
              const isMobile = window.innerWidth < 768;
              if (isActive) return isMobile ? "310px" : "680px";

              const desktopWidths = [170, 70];
              const mobileWidths = [100, 45];
              const arr = isMobile ? mobileWidths : desktopWidths;
              const idx = absDiff - 1;
              const w = idx < arr.length ? arr[idx] : arr[arr.length - 1];
              return `${w}px`;
            };

            return (
              <motion.div
                key={video.id || videoId || originalIndex}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(originalIndex);
                  } else if (videoId) {
                    const ytDirectUrl = video.youtubeUrl || `https://www.youtube.com/watch?v=${videoId}&t=${startSec}s`;
                    window.open(ytDirectUrl, "_blank", "noopener,noreferrer");
                  }
                }}
                initial={false}
                animate={{
                  flex: "0 0 auto",
                  width: getWidth(),
                  scale: 1,
                  opacity: 1,
                  zIndex: zIndex,
                }}
                transition={transitionSettings}
                className={`relative h-full ${isHomePage ? "rounded-none" : "rounded-2xl"} overflow-hidden cursor-pointer shrink-0 bg-zinc-950 group border-2 transition-all duration-500 ${isActive
                    ? "border-gold/50 shadow-[0_25px_60px_rgba(212,175,55,0.25),0_0_40px_rgba(0,0,0,0.9)] scale-[1.01]"
                    : absDiff === 1
                      ? "border-black/80 hover:border-black opacity-85 hover:opacity-100"
                      : "border-black/50 hover:border-black opacity-50 hover:opacity-100"
                  }`}
              >
                {/* Pure Clean Video Stream (Zero YouTube Controls/Settings/Branding Clutter) */}
                {isActive && videoId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&start=${startSec}${endSec ? `&end=${endSec}` : ""}`}
                    title={displayTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="w-full h-full object-cover relative z-30 border-0 pointer-events-none scale-105"
                  />
                ) : (
                  /* YouTube Dynamic High-Res Thumbnail Image for side cards */
                  <img
                    src={thumbnailUrl}
                    alt={displayTitle}
                    loading="eager"
                    className="w-full h-full object-cover relative z-20 opacity-85 group-hover:opacity-100 transition-all duration-500"
                  />
                )}

                {/* Multi-Layer Ultra-Premium Luxury Gradient Overlays for Center Active Card */}
                {isActive ? (
                  <>
                    {/* Bottom-to-Top Dark Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none z-35 transition-opacity duration-500" />
                    {/* Top-to-Bottom Ambient Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none z-35" />
                    {/* Ultra-Luxury Gold/Amber Radial Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-500/20 via-gold/10 to-transparent pointer-events-none z-35 mix-blend-screen" />
                  </>
                ) : (
                  <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none z-35 ${absDiff === 1 ? "bg-black/40 group-hover:bg-black/20" : "bg-black/60 group-hover:bg-black/30"}`} />
                )}

                {/* Overlay Details (Active Video) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ delay: 0.2 }}
                      className="absolute inset-0 z-40 p-6 md:p-8 flex flex-col justify-between pointer-events-none"
                    >
                      {/* Top Badge & Live Indicator */}
                      <div className="flex justify-between items-start">
                        <span className={`px-4 py-1.5 ${isHomePage ? "rounded-none" : "rounded-full"} bg-black/70 backdrop-blur-xl border border-gold/40 text-[10px] uppercase font-mono tracking-[3px] text-gold shadow-lg flex items-center gap-1.5`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                          {channelName}
                        </span>
                      </div>

                      {/* Bottom Title & Dynamic Views */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-gold text-xs font-mono tracking-widest uppercase font-semibold">
                          <Eye className="w-4 h-4 text-gold" />
                          <span>{video.views || "1.2M"} views</span>
                        </div>
                        <h3 className="font-serif text-2xl md:text-4xl font-bold text-white shadow-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] leading-tight tracking-tight line-clamp-2">
                          {displayTitle}
                        </h3>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};


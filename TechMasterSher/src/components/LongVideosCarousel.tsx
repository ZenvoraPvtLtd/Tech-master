import React, { useState, useCallback } from "react";
import { Play, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { mediaUrl } from "../utils/media";

interface LongVideosCarouselProps {
  videos: any[];
  isHomePage?: boolean;
}

const stripeEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];
const transitionSettings = {
  duration: 0.75,
  ease: stripeEasing,
};

export const LongVideosCarousel: React.FC<LongVideosCarouselProps> = ({ videos, isHomePage = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!videos || videos.length === 0) return null;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
  }, [videos.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, [videos.length]);

  const handleDragEnd = (_e: any, { offset }: PanInfo) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) {
      handleNext();
    } else if (offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  // Sort and order items symmetrically around activeIndex
  const displayVideos = videos
    .map((video, originalIndex) => {
      let diff = originalIndex - activeIndex;
      if (diff > videos.length / 2) diff -= videos.length;
      if (diff < -videos.length / 2) diff += videos.length;
      return { video, originalIndex, diff };
    })
    .sort((a, b) => a.diff - b.diff);

  return (
    <div className="relative flex flex-col w-full px-4 md:px-8 pt-0 pb-1 md:pt-0 md:pb-2 max-w-[1600px] mx-auto overflow-hidden items-center justify-center">

      {/* Chevron Navigation Controls */}
      {videos.length > 1 && (
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

            // Width calculation: Matches Screenshot 1 exact proportions
            const getWidth = () => {
              const isMobile = window.innerWidth < 768;
              if (isActive) return isMobile ? "300px" : "560px";

              const desktopWidths = [150, 90, 55, 30];
              const mobileWidths = [100, 60, 35, 20];
              const arr = isMobile ? mobileWidths : desktopWidths;
              const idx = absDiff - 1;
              const w = idx < arr.length ? arr[idx] : arr[arr.length - 1];
              return `${w}px`;
            };

            return (
              <motion.div
                key={video.id || video.title || originalIndex}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(originalIndex);
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
                className={`relative h-full ${isHomePage ? "rounded-none border-black" : "rounded-2xl border-black/80"} overflow-hidden cursor-pointer shrink-0 bg-zinc-950 group border-2 transition-all duration-300 ${isActive
                    ? "border-black shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                    : "border-black/80 hover:border-black opacity-80 hover:opacity-100"
                  }`}
              >
                {/* Pure Video Element (No Thumbnails) */}
                {(video.url || video.videoUrl) && (
                  <video
                    src={mediaUrl(video.url || video.videoUrl)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={`w-full h-full object-cover relative z-20 group-hover:scale-105 transition-all duration-700 ${
                      isActive ? "opacity-100" : "opacity-85 group-hover:opacity-100"
                    }`}
                  />
                )}

                {/* Overlay Gradients */}
                <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none z-30 ${isActive ? "bg-gradient-to-t from-[#050505] via-black/30 to-transparent" : "bg-black/40 group-hover:bg-black/20"}`} />

                {/* Overlay Details (Active Video) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ delay: 0.3 }}
                      className="absolute inset-0 z-40 p-6 md:p-8 flex flex-col justify-between pointer-events-none"
                    >
                      {/* Top Badge */}
                      <div className="flex justify-between items-start">
                        <span className="px-3.5 py-1 rounded-none bg-black/60 backdrop-blur-md border border-black text-[10px] uppercase font-mono tracking-[2px] text-white shadow-lg">
                          Long Videos
                        </span>
                        <div className="w-10 h-10 rounded-none bg-white/10 backdrop-blur-md border border-black flex items-center justify-center pointer-events-auto hover:scale-110 transition-transform">
                          <Play className="w-4 h-4 text-white ml-0.5 fill-white" />
                        </div>
                      </div>

                      {/* Bottom Title & Views */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-gold text-xs font-mono tracking-wide">
                          <Eye className="w-4 h-4" />
                          <span>{video.views || "1.2M"}</span>
                        </div>
                        <h3 className="font-serif text-xl md:text-3xl font-bold text-white shadow-black drop-shadow-lg leading-tight">
                          {video.title}
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

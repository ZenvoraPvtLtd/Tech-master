import React, { useState, useCallback } from "react";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { mediaUrl } from "../utils/media";

interface StripeReelsCarouselProps {
  reels: any[];
}

const stripeEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];
const transitionSettings = {
  duration: 0.85,
  ease: stripeEasing,
};

export const StripeReelsCarousel: React.FC<StripeReelsCarouselProps> = ({ reels }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!reels || reels.length === 0) return null;

  const changeActiveIndex = (newIndex: number) => {
    if (newIndex === activeIndex) return;
    setActiveIndex(newIndex);
  };

  const handleNext = useCallback(() => {
    changeActiveIndex((activeIndex + 1) % reels.length);
  }, [activeIndex, reels.length]);

  const handlePrev = useCallback(() => {
    changeActiveIndex((activeIndex - 1 + reels.length) % reels.length);
  }, [activeIndex, reels.length]);

  const handleDragEnd = (_e: any, { offset }: PanInfo) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) {
      handleNext();
    } else if (offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const N = reels.length;
  const maxSide = 5;
  const numLeft = N <= 1 ? 0 : Math.min(maxSide, Math.floor((N - 1) / 2));
  const numRight = N <= 1 ? 0 : Math.min(maxSide, Math.ceil((N - 1) / 2));

  const offsets: number[] = [];
  for (let i = -numLeft; i <= numRight; i++) {
    offsets.push(i);
  }

  return (
    <div className="relative flex flex-col w-full px-4 md:px-8 pt-2 pb-0 md:pt-4 md:pb-0 max-w-[1600px] mx-auto overflow-hidden items-center justify-center">
      
      {/* Chevron Navigation Controls */}
      {N > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-6 z-50 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-gold border border-gold/40 hover:border-gold backdrop-blur-md transition-all shadow-lg text-white cursor-pointer"
            aria-label="Previous reel"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-6 z-50 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-gold border border-gold/40 hover:border-gold backdrop-blur-md transition-all shadow-lg text-white cursor-pointer"
            aria-label="Next reel"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Carousel Track */}
      <motion.div 
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        className="flex flex-row items-center justify-center gap-[10px] md:gap-[16px] h-[400px] md:h-[550px] w-full py-1 cursor-grab active:cursor-grabbing relative overflow-hidden"
      >
        {offsets.map((offset) => {
          const originalIndex = (activeIndex + offset + N * 1000) % N;
          const reel = reels[originalIndex];
          const isActive = offset === 0;
          const absOffset = Math.abs(offset);
          const zIndex = isActive ? 40 : 30 - absOffset;

          const getWidth = () => {
            const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
            const desktopWidths = [320, 160, 95, 52, 28, 16];
            const mobileWidths = [280, 130, 75, 42, 22, 14];
            const arr = isMobile ? mobileWidths : desktopWidths;
            const w = absOffset < arr.length ? arr[absOffset] : arr[arr.length - 1];
            return `${w}px`;
          };

          return (
            <motion.div
              key={reel._id || reel.id || reel.title || originalIndex}
              onClick={() => {
                if (!isActive) {
                  changeActiveIndex(originalIndex);
                }
              }}
              initial={false}
              animate={{
                width: getWidth(),
                opacity: 1,
                zIndex: zIndex,
              }}
              transition={transitionSettings}
              className={`relative h-full rounded-[20px] overflow-hidden cursor-pointer shrink-0 bg-zinc-950 group border transition-colors duration-300 ${
                isActive ? "border-gold shadow-[0_20px_50px_rgba(255,215,0,0.15)]" : "border-gold/40 hover:border-gold hover:opacity-100"
              }`}
            >
              {/* Image Background for Inactive Stripes */}
              {!isActive && (
                <img
                  src={mediaUrl(reel.thumbnail || reel.thumbnailUrl || reel.imageUrl)}
                  alt={reel.title || "Reel"}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out opacity-70 group-hover:opacity-100 grayscale-[20%] group-hover:grayscale-0"
                />
              )}
              
              {/* Active State (Full Video) */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.75, ease: stripeEasing }}
                  className="w-full h-full relative"
                >
                  <div
                    className="absolute inset-0 z-10 blur-2xl opacity-40 pointer-events-none scale-110"
                    style={{
                      backgroundImage: `url(${mediaUrl(reel.thumbnail || reel.thumbnailUrl || reel.imageUrl)})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <video
                    src={mediaUrl(reel.url || reel.videoUrl)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover relative z-20 group-hover:scale-105 transition-transform duration-[2s] ease-out"
                  />
                </motion.div>
              )}
              
              {/* Overlay Gradients */}
              <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none z-30 ${isActive ? "bg-gradient-to-t from-[#050505] via-black/40 to-transparent" : "bg-black/40 group-hover:bg-black/20"}`} />

              {/* Views Counter & Top Badge (Active Card Only) */}
              <AnimatePresence>
                {isActive && (
                  <>
                    {/* Top Badge */}
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: 0.2 }}
                      className="absolute top-4 left-4 z-40 pointer-events-none"
                    >
                      <span className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-gold/40 text-[10px] uppercase font-mono tracking-[2px] text-gold shadow-lg">
                        Reels & Shorts
                      </span>
                    </motion.div>

                    {/* Views Counter */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.2 }}
                      className="absolute bottom-4 left-4 z-40 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-gold/40 rounded-full px-3 py-1.5 text-gold shadow-lg"
                    >
                      <Eye className="w-4 h-4 text-gold" />
                      <span className="text-gold text-xs font-semibold font-mono">{reel.views || "1.2M"}</span>
                    </motion.div>
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


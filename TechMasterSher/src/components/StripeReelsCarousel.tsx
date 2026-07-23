import React, { useState, useCallback } from "react";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { mediaUrl } from "../utils/media";

interface StripeReelsCarouselProps {
  reels: any[];
  isHomePage?: boolean;
}

const stripeEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];
const transitionSettings = {
  duration: 0.75,
  ease: stripeEasing,
};

export const StripeReelsCarousel: React.FC<StripeReelsCarouselProps> = ({ reels, isHomePage = false }) => {
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
  const maxSide = 2; // Show 2 cards on left, 1 active in middle, 2 cards on right
  const numLeft = N <= 1 ? 0 : Math.min(maxSide, Math.floor((N - 1) / 2));
  const numRight = N <= 1 ? 0 : Math.min(maxSide, Math.ceil((N - 1) / 2));

  const offsets: number[] = [];
  for (let i = -numLeft; i <= numRight; i++) {
    offsets.push(i);
  }

  const get3DProps = (offset: number) => {
    const abs = Math.abs(offset);
    if (offset === 0) {
      return { rotateY: 0, scale: 1.0, opacity: 1, zIndex: 40 };
    }
    const sc = abs === 1 ? 0.96 : 0.92;
    const op = abs === 1 ? 0.95 : 0.85;
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
        className="flex flex-row items-center justify-center gap-2 sm:gap-3 md:gap-3 h-[360px] sm:h-[440px] md:h-[500px] w-full py-2 cursor-grab active:cursor-grabbing relative overflow-hidden"
      >
        {offsets.map((offset) => {
          const originalIndex = (activeIndex + offset + N * 1000) % N;
          const reel = reels[originalIndex];
          const isActive = offset === 0;
          const absOffset = Math.abs(offset);
          const { rotateY, scale, opacity, zIndex } = get3DProps(offset);

          const rawHandle = reel.handle || reel.author || reel.category || "techmaster";
          const formattedHandle = rawHandle.startsWith("@") ? rawHandle : `@${rawHandle.toLowerCase().replace(/[^a-z0-9]/g, "")}`;

          // Smooth GPU Overlay level: center = crisp, immediate sides = light glass blur, outer sides = deeper glass blur
          const overlayGlassClass = absOffset === 0
            ? "pointer-events-none"
            : absOffset === 1
              ? "backdrop-blur-[2px] bg-blue-950/30 border border-blue-500/20 pointer-events-none transition-all duration-300"
              : "backdrop-blur-[6px] bg-black/70 border border-blue-600/20 pointer-events-none transition-all duration-300";

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
                rotateY,
                scale,
                opacity,
                zIndex,
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
              {/* Pure Video Element - GPU Accelerated for 60fps Smooth Playback */}
              {(reel.url || reel.videoUrl) && (
                <video
                  src={mediaUrl(reel.url || reel.videoUrl)}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  style={{ transform: "translateZ(0)", willChange: "transform" }}
                  className="w-full h-full object-cover relative z-20 group-hover:scale-105 transition-all duration-500 opacity-100"
                />
              )}
              
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

              {/* Views Counter & Top Badge */}
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
                      <span className={`px-3 py-1 ${isHomePage ? "rounded-none border-black" : "rounded-full border-white/20"} bg-black/60 backdrop-blur-md border text-[9px] uppercase font-mono tracking-[2px] text-gold shadow-lg`}>
                        Reels & Shorts
                      </span>
                    </motion.div>

                    {/* Views Counter (Bottom Right of Card) */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.2 }}
                      className={`absolute bottom-5 right-5 z-40 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border ${isHomePage ? "rounded-none border-black" : "rounded-full border-white/20"} px-2.5 py-1 text-gold shadow-lg`}
                    >
                      <Eye className="w-3.5 h-3.5 text-gold" />
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


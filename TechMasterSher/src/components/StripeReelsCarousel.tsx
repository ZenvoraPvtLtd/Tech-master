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
    const sc = abs === 1 ? 0.88 : 0.75;
    const op = abs === 1 ? 0.88 : 0.65;
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

      {/* 3D Coverflow Carousel Track */}
      <motion.div 
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ perspective: "1200px" }}
        className="flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-8 h-[440px] sm:h-[500px] md:h-[540px] w-full py-4 cursor-grab active:cursor-grabbing relative overflow-hidden"
      >
        {offsets.map((offset) => {
          const originalIndex = (activeIndex + offset + N * 1000) % N;
          const reel = reels[originalIndex];
          const isActive = offset === 0;
          const absOffset = Math.abs(offset);
          const { rotateY, scale, opacity, zIndex } = get3DProps(offset);

          const rawHandle = reel.handle || reel.author || reel.category || "techmaster";
          const formattedHandle = rawHandle.startsWith("@") ? rawHandle : `@${rawHandle.toLowerCase().replace(/[^a-z0-9]/g, "")}`;

          // Blur level: center = 0px (crisp), immediate sides = 3px (light blur), outer sides = 8px (heavy blur)
          const videoBlurClass = absOffset === 0
            ? "blur-none opacity-100"
            : absOffset === 1
              ? "blur-[3px] opacity-90 group-hover:blur-[1px] group-hover:opacity-100"
              : "blur-[8px] opacity-75 group-hover:blur-[4px] group-hover:opacity-90";

          // Blue tint overlay: center = none, immediate sides = light blue, outer sides = deep blue
          const blueOverlayClass = absOffset === 0
            ? ""
            : absOffset === 1
              ? "bg-gradient-to-t from-blue-950/50 via-blue-600/30 to-blue-500/15 border border-blue-500/20"
              : "bg-gradient-to-t from-blue-950/70 via-blue-700/50 to-blue-600/35 border border-blue-600/30";

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
              style={{ transformStyle: "preserve-3d" }}
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
              {/* Pure Video Element (No Thumbnails) */}
              {(reel.url || reel.videoUrl) && (
                <video
                  src={mediaUrl(reel.url || reel.videoUrl)}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={`w-full h-full object-cover relative z-20 group-hover:scale-105 transition-all duration-700 ${videoBlurClass}`}
                />
              )}
              
              {/* Blue Effect Overlay for Side Cards */}
              {absOffset > 0 && (
                <div className={`absolute inset-0 pointer-events-none z-30 transition-all duration-500 ${blueOverlayClass}`} />
              )}

              {/* Overlay Gradient at Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-700 pointer-events-none z-30" />

              {/* Bottom Left Handle Overlay (Matches Reference Image @fashion Modern Style) */}
              <div className="absolute bottom-5 left-5 z-40 flex flex-col text-left pointer-events-none">
                <span className="text-white font-bold text-sm sm:text-base tracking-wide font-sans drop-shadow-md">
                  {formattedHandle}
                </span>
                <span className="text-gray-300 text-xs font-light tracking-wide line-clamp-1 drop-shadow-sm">
                  {reel.title || "Featured Content"}
                </span>
              </div>

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


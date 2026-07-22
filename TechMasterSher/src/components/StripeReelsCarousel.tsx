import React, { useState, useCallback } from "react";
import { Eye } from "lucide-react";
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
  const [exitingReel, setExitingReel] = useState<any>(null);

  if (!reels || reels.length === 0) return null;

  const changeActiveIndex = (newIndex: number) => {
    if (newIndex === activeIndex) return;
    setExitingReel(reels[activeIndex]);
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

  // Reorder array visually so active is always at position 0
  const displayReels = [
    ...reels.slice(activeIndex),
    ...reels.slice(0, activeIndex)
  ];

  return (
    <div className="flex flex-col w-full px-4 md:px-8 pt-2 pb-0 md:pt-4 md:pb-0 max-w-[1600px] mx-auto overflow-hidden">
      
      {/* Carousel Track */}
      <motion.div 
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        className="flex flex-row gap-[16px] h-[400px] md:h-[550px] w-full py-1 cursor-grab active:cursor-grabbing relative overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ paddingLeft: "calc(50% - max(140px, min(160px, 15vw)))" }}
      >
        {/* Exiting Active Reel (Slides Out to Left) */}
        <AnimatePresence onExitComplete={() => setExitingReel(null)}>
          {exitingReel && (
            <motion.div
              key={`exiting-${exitingReel.id || exitingReel.title}`}
              initial={{ x: 0, opacity: 1, scale: 1 }}
              animate={{ x: "-140%", opacity: 0, scale: 0.92 }}
              exit={{ opacity: 0 }}
              transition={transitionSettings}
              className="absolute left-0 top-1 h-[400px] md:h-[550px] w-[280px] md:w-[320px] rounded-[20px] overflow-hidden bg-zinc-950 border border-gold/40 z-50 pointer-events-none"
              style={{ marginLeft: "calc(50% - max(140px, min(160px, 15vw)))" }}
            >
              <img
                src={mediaUrl(exitingReel.thumbnail || exitingReel.thumbnailUrl || exitingReel.imageUrl)}
                alt={exitingReel.title}
                className="w-full h-full object-cover opacity-80"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {displayReels.map((reel, index) => {
          const isActive = index === 0;
          const originalIndex = reels.findIndex(r => r.id === reel.id || r.title === reel.title);
          const zIndex = isActive ? 40 : 30 - index;
          
          const getWidth = () => {
            const isMobile = window.innerWidth < 768;
            const desktopWidths = [320, 160, 95, 52, 28, 16];
            const mobileWidths = [280, 130, 75, 42, 22, 14];
            const arr = isMobile ? mobileWidths : desktopWidths;
            const w = index < arr.length ? arr[index] : arr[arr.length - 1];
            return `${w}px`;
          };

          return (
            <motion.div
              key={reel.id || reel.title || originalIndex}
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
              {/* Image Background for Inactive */}
              {!isActive && (
                <img
                  src={mediaUrl(reel.thumbnail || reel.thumbnailUrl || reel.imageUrl)}
                  alt={reel.title}
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

              {/* Views Counter (Active Card Only) */}
              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.2 }}
                    className="absolute bottom-4 left-4 z-40 flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5"
                  >
                    <Eye className="w-4 h-4 text-white/80" />
                    <span className="text-white/90 text-xs font-semibold">{reel.views || "1.2M"}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

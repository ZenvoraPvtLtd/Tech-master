import React, { useState, useCallback } from "react";
import { Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { mediaUrl } from "../utils/media";

interface StripeReelsCarouselProps {
  reels: any[];
}

// Exactly match Stripe's premium easing
const stripeEasing: [number, number, number, number] = [0.22, 1, 0.36, 1];
const transitionSettings = {
  duration: 0.6,
  ease: stripeEasing,
};

export const StripeReelsCarousel: React.FC<StripeReelsCarouselProps> = ({ reels }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!reels || reels.length === 0) return null;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % reels.length);
  }, [reels.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + reels.length) % reels.length);
  }, [reels.length]);

  const handleDragEnd = (_e: any, { offset }: PanInfo) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) {
      handleNext();
    } else if (offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  // Reorder array visually so active is always on the left
  const displayReels = [
    ...reels.slice(activeIndex),
    ...reels.slice(0, activeIndex)
  ];

  return (
    <div className="flex flex-col w-full px-4 md:px-8 py-12 md:py-24 max-w-[1600px] mx-auto overflow-hidden">
      
      {/* Carousel Track */}
      <motion.div 
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        className="flex flex-row gap-[16px] h-[400px] md:h-[550px] w-full py-1 cursor-grab active:cursor-grabbing relative overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ paddingLeft: "calc(50% - max(140px, min(160px, 15vw)))" }}
      >
        <AnimatePresence initial={false}>
          {displayReels.map((reel, index) => {
            const isActive = index === 0;
            const originalIndex = reels.findIndex(r => r.id === reel.id || r.title === reel.title);
            
            // The active item sits above the others so when wrapping, inactive items slide behind.
            const zIndex = isActive ? 40 : 30 - index;
            
            return (
              <motion.div
                key={reel.id || reel.title || originalIndex}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(originalIndex);
                  }
                }}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  flex: isActive ? "1 0 auto" : "0 0 auto",
                  width: isActive 
                    ? (window.innerWidth < 768 ? "280px" : "320px") 
                    : (window.innerWidth < 768 ? "60px" : "90px"),
                  scale: 1,
                  opacity: 1,
                  zIndex: zIndex,
                  filter: "blur(0px)"
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  layout: transitionSettings,
                  default: transitionSettings
                }}
                className={`relative h-full rounded-[20px] overflow-hidden cursor-pointer shrink-0 bg-zinc-950 group transition-all duration-500 border ${
                  isActive ? "border-gold shadow-[0_20px_50px_rgba(255,215,0,0.15)]" : "border-gold/50 hover:border-gold hover:opacity-100"
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
                    transition={{ delay: 0.1, duration: 0.4 }}
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
                      transition={{ delay: 0.3 }}
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
        </AnimatePresence>
      </motion.div>


    </div>
  );
};

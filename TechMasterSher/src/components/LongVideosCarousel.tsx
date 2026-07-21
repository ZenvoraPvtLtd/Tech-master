import React, { useState, useEffect, useCallback } from "react";
import { Play, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { mediaUrl } from "../utils/media";

interface LongVideosCarouselProps {
  videos: any[];
}

export const LongVideosCarousel: React.FC<LongVideosCarouselProps> = ({ videos }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!videos || videos.length === 0) return null;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
  }, [videos.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, [videos.length]);

  const handleDragEnd = (_e: any, { offset }: PanInfo) => {
    const swipe = offset.x;
    if (swipe < -50) {
      handleNext();
    } else if (swipe > 50) {
      handlePrev();
    }
  };

  const calculateTransform = (index: number) => {
    let distance = index - activeIndex;
    
    // Wrap around logic for infinite loop illusion
    if (distance > videos.length / 2) {
      distance -= videos.length;
    } else if (distance < -videos.length / 2) {
      distance += videos.length;
    }

    if (distance === 0) {
      // Active item in center
      return {
        x: 0,
        z: 0,
        rotateY: 0,
        scale: 1,
        opacity: 1,
        zIndex: 50,
      };
    } else {
      // Side items
      const direction = distance > 0 ? 1 : -1;
      const absDistance = Math.abs(distance);
      const isMobileOffset = isMobile ? 80 : 250;
      
      return {
        x: direction * (isMobileOffset + (absDistance * (isMobile ? 30 : 100))),
        z: -150 * absDistance,
        rotateY: direction * -50, // Tilted towards center
        scale: Math.max(0.6, 1 - absDistance * 0.15),
        opacity: Math.max(0, 1 - absDistance * 0.2),
        zIndex: 40 - absDistance,
      };
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto py-12 px-4 h-[500px] md:h-[650px] flex items-center justify-center overflow-hidden">
      
      {/* 3D Perspective Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
      >
        <AnimatePresence initial={false}>
          {videos.map((video, index) => {
            const transform = calculateTransform(index);
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={video.id || index}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (!isActive) setActiveIndex(index);
                }}
                initial={false}
                animate={{
                  x: transform.x,
                  z: transform.z,
                  rotateY: transform.rotateY,
                  scale: transform.scale,
                  opacity: transform.opacity,
                  zIndex: transform.zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 30,
                  mass: 1,
                }}
                className={`absolute w-full max-w-sm md:max-w-4xl aspect-video rounded-[24px] overflow-hidden cursor-pointer bg-zinc-950 border transition-colors duration-300 ${
                  isActive ? "border-gold shadow-[0_20px_50px_rgba(255,215,0,0.15)]" : "border-gold/30 hover:border-gold/70 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Image Background */}
                <img
                  src={mediaUrl(video.thumbnail || video.thumbnailUrl || video.imageUrl)}
                  alt={video.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    isActive ? "" : "grayscale-[40%] opacity-60 hover:grayscale-0 hover:opacity-100"
                  }`}
                />

                {/* Active Video Player */}
                {isActive && (
                  <video
                    src={mediaUrl(video.url || video.videoUrl)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-10"
                  />
                )}

                {/* Content Overlay - Matches Screenshot exactly */}
                <div className={`absolute inset-0 z-20 p-6 md:p-10 flex flex-col justify-between transition-opacity duration-300 pointer-events-none`}>
                  {/* Top Header */}
                  <div className="flex justify-between items-start">
                    <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-gold/40 text-[10px] md:text-xs uppercase font-mono tracking-[2px] text-gold shadow-lg">
                      Long Videos
                    </span>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center pointer-events-auto hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 md:w-5 md:h-5 text-white ml-1 fill-white" />
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="flex flex-col gap-2 relative z-20" style={{ transform: "translateZ(30px)" }}>
                    <div className="flex items-center gap-2 text-gold text-xs md:text-sm font-mono tracking-wide">
                      <Eye className="w-4 h-4 md:w-5 md:h-5" />
                      <span>{video.views || "1.2M views"}</span>
                    </div>
                    <h3 className="font-serif text-3xl md:text-5xl font-bold text-white shadow-black drop-shadow-lg">
                      {video.title}
                    </h3>
                  </div>
                  
                  {/* Gradient to make text readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent -z-10" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      {/* Hidden Navigation so it matches original requirement */}
      <button onClick={handlePrev} className="hidden" aria-label="Previous" />
      <button onClick={handleNext} className="hidden" aria-label="Next" />
    </div>
  );
};

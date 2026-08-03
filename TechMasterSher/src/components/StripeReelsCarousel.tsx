import React, { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { mediaUrl } from "../utils/media";

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

const WORKING_VIDEOS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoylikes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2012.mp4"
];

// Complete 23 user-provided YouTube Shorts & Instagram Reels with exact channel handles and view counts
const DEFAULT_REELS = [
  {
    id: "reel-1",
    platform: "youtube",
    title: "Tech Master Viral Short",
    views: "5.4M views",
    channelName: "@techmasterhq",
    url: "https://youtube.com/shorts/YP4CdON5rrQ?si=DOx4bPZIJPpc2LSa"
  },
  {
    id: "reel-2",
    platform: "youtube",
    title: "Tech Master Official Video",
    views: "3.8M views",
    channelName: "@techmasterhq",
    url: "https://www.youtube.com/watch?v=3VuyriEkDwg"
  },
  {
    id: "reel-3",
    platform: "youtube",
    title: "Tech Master Exclusive Showcase",
    views: "4.2M views",
    channelName: "@techmasterhq",
    url: "https://youtu.be/vW2K0L-vUgw?si=4KrnU7BeuuZIlO97"
  },
  {
    id: "reel-4",
    platform: "instagram",
    title: "Tech Master Instagram Reel #1",
    views: "1.8M views",
    channelName: "@techmasterco",
    url: "https://www.instagram.com/reel/DAs7dOoyU9d/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: "reel-5",
    platform: "instagram",
    title: "Trendz Talk Viral Reel",
    views: "2.4M views",
    channelName: "@trendztalk",
    url: "https://www.instagram.com/reel/DGdKcjNymR4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: "reel-6",
    platform: "youtube",
    title: "Master Wheels High-Speed Breakdown",
    views: "3.2M views",
    channelName: "@masterwheel1",
    url: "https://youtube.com/shorts/iVGAICmKlpk?si=cL_9koXbTowODWEx"
  },
  {
    id: "reel-7",
    platform: "youtube",
    title: "Next Univerz Masterclass",
    views: "2.7M views",
    channelName: "@NextUniverz",
    url: "https://www.youtube.com/watch?v=oXr9B3Hg4fo"
  },
  {
    id: "reel-8",
    platform: "instagram",
    title: "Full Circle Creator Story",
    views: "950K views",
    channelName: "@fullcircle_in",
    url: "https://www.instagram.com/reel/Da1kOKEqys7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: "reel-9",
    platform: "youtube",
    title: "Tech Master Hardware Teardown",
    views: "8.4M views",
    channelName: "@techmasterhq",
    url: "https://www.youtube.com/watch?v=pGdwMZ_O_0A"
  },
  {
    id: "reel-10",
    platform: "youtube",
    title: "Pop Tech Short-Form Reel",
    views: "9.1M views",
    channelName: "@trendztalk",
    url: "https://youtube.com/shorts/gP7t0_5qMa4?si=1A54F_DsBGGlaPPF"
  },
  {
    id: "reel-11",
    platform: "youtube",
    title: "Automotive Tech Special",
    views: "4.1M views",
    channelName: "@masterwheel1",
    url: "https://youtu.be/Wnid6auAxbE?si=mJKMPlZLMcCTLnuz"
  },
  {
    id: "reel-12",
    platform: "youtube",
    title: "Developer Deep Dive",
    views: "2.2M views",
    channelName: "@NextUniverz",
    url: "https://www.youtube.com/watch?v=uMW9UyONsOk"
  },
  {
    id: "reel-13",
    platform: "instagram",
    title: "Tech Master Official Reel",
    views: "1.5M views",
    channelName: "@techmasterco",
    url: "https://www.instagram.com/techmasterco/reel/DPOfpSGgRkN/?hl=en"
  },
  {
    id: "reel-14",
    platform: "instagram",
    title: "Viral Pop Culture Tech",
    views: "3.1M views",
    channelName: "@trendztalk",
    url: "https://www.instagram.com/reel/DCRQiCgyu5W/?igsh=ZGVyMTRnOGpqNDVi"
  },
  {
    id: "reel-15",
    platform: "youtube",
    title: "Full Circle Podcast Highlight",
    views: "1.9M views",
    channelName: "@fullcircle_in",
    url: "https://youtu.be/iNtv0Yl1DB4?si=TTeocdaRSPQnL8_U"
  },
  {
    id: "reel-16",
    platform: "youtube",
    title: "Tech Master Cinematic Reveal",
    views: "4.4M views",
    channelName: "@techmasterhq",
    url: "https://www.youtube.com/watch?v=CaNEbx-Kwzc"
  },
  {
    id: "reel-17",
    platform: "youtube",
    title: "Future Gadget Breakdown",
    views: "3.9M views",
    channelName: "@techmasterhq",
    url: "https://www.youtube.com/watch?v=ClgRNy0QBWk"
  },
  {
    id: "reel-18",
    platform: "youtube",
    title: "Supercar Track Telemetry Test",
    views: "7.2M views",
    channelName: "@masterwheel1",
    url: "https://www.youtube.com/watch?v=mAXjgBDK3Gs"
  },
  {
    id: "reel-19",
    platform: "instagram",
    title: "Tech Master Instagram Special",
    views: "2.8M views",
    channelName: "@techmasterco",
    url: "https://www.instagram.com/reel/DW3uoC8CXWf/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: "reel-20",
    platform: "instagram",
    title: "Trendz Talk Pop Reel",
    views: "1.7M views",
    channelName: "@trendztalk",
    url: "https://www.instagram.com/reel/DZHCtuzJzxn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: "reel-21",
    platform: "instagram",
    title: "Full Circle Studio Reel",
    views: "890K views",
    channelName: "@fullcircle_in",
    url: "https://www.instagram.com/reel/DZt-HodJ94O/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: "reel-22",
    platform: "instagram",
    title: "Next Univerz Tech Highlight",
    views: "1.4M views",
    channelName: "@NextUniverz",
    url: "https://www.instagram.com/reel/DYZnd2FpY7O/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: "reel-23",
    platform: "instagram",
    title: "Master Wheels Track Performance",
    views: "4.5M views",
    channelName: "@masterwheel1",
    url: "https://www.instagram.com/reel/DT7z9b0gTCi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  }
];

export function normalizeReelItem(v: any): {
  id: string;
  platform: "youtube" | "instagram";
  url: string;
  thumbnail: string;
  username: string;
  channelName: string;
  title: string;
  views: string;
  videoUrl: string;
} {
  const targetUrl = (v.url || v.videoUrl || "").trim();
  const lowerUrl = targetUrl.toLowerCase();
  const isInsta = v.platform === "instagram" || lowerUrl.includes("instagram.com") || lowerUrl.includes("/reel/") || lowerUrl.includes("/p/");
  
  let username = "";
  let channelName = "";
  let views = "";

  if (lowerUrl.includes("yp4cdon5rrq") || lowerUrl.includes("3vuyriekdwg") || lowerUrl.includes("vw2k0l-vugw") || lowerUrl.includes("pgdwmz_o_0a") || lowerUrl.includes("canebx-kwzc") || lowerUrl.includes("clgrny0qbwk")) {
    username = "@techmasterhq";
    channelName = "Tech Master";
    if (lowerUrl.includes("yp4cdon5rrq")) views = "5.4M";
    else if (lowerUrl.includes("3vuyriekdwg")) views = "3.8M";
    else if (lowerUrl.includes("vw2k0l-vugw")) views = "4.2M";
    else if (lowerUrl.includes("pgdwmz_o_0a")) views = "8.4M";
    else if (lowerUrl.includes("canebx-kwzc")) views = "4.4M";
    else if (lowerUrl.includes("clgrny0qbwk")) views = "3.9M";
    else views = "5.0M";
  }
  else if (lowerUrl.includes("das7dooyu9d") || lowerUrl.includes("dpofpsggrkn") || lowerUrl.includes("dw3uoc8cxwf")) {
    username = "@techmasterco";
    channelName = "Tech Master";
    if (lowerUrl.includes("das7dooyu9d")) views = "1.8M";
    else if (lowerUrl.includes("dpofpsggrkn")) views = "1.5M";
    else if (lowerUrl.includes("dw3uoc8cxwf")) views = "2.8M";
    else views = "2.0M";
  }
  else if (lowerUrl.includes("ivgaickmlpk") || lowerUrl.includes("wnid6auaxbe") || lowerUrl.includes("maxjgbdk3gs") || lowerUrl.includes("dt7z9b0gtci")) {
    username = "@masterwheel1";
    channelName = "Master Wheels";
    if (lowerUrl.includes("ivgaickmlpk")) views = "3.2M";
    else if (lowerUrl.includes("wnid6auaxbe")) views = "4.1M";
    else if (lowerUrl.includes("maxjgbdk3gs")) views = "7.2M";
    else if (lowerUrl.includes("dt7z9b0gtci")) views = "4.5M";
    else views = "4.0M";
  }
  else if (lowerUrl.includes("oxr9b3hg4fo") || lowerUrl.includes("umw9uyonsok") || lowerUrl.includes("dyznd2fpy7o")) {
    username = "@NextUniverz";
    channelName = "Next Univerz";
    if (lowerUrl.includes("oxr9b3hg4fo")) views = "2.7M";
    else if (lowerUrl.includes("umw9uyonsok")) views = "2.2M";
    else if (lowerUrl.includes("dyznd2fpy7o")) views = "1.4M";
    else views = "2.5M";
  }
  else if (lowerUrl.includes("da1kokeqys7") || lowerUrl.includes("intv0yl1db4") || lowerUrl.includes("dzt-hodj94o")) {
    username = "@fullcircle_in";
    channelName = "Full Circle";
    if (lowerUrl.includes("da1kokeqys7")) views = "950K";
    else if (lowerUrl.includes("intv0yl1db4")) views = "1.9M";
    else if (lowerUrl.includes("dzt-hodj94o")) views = "890K";
    else views = "1.5M";
  }
  else if (lowerUrl.includes("dgdkcjnymr4") || lowerUrl.includes("gp7t0_5qma4") || lowerUrl.includes("dcrqicgyu5w") || lowerUrl.includes("dzhctuzjzxn")) {
    username = "@trendztalk";
    channelName = "Trendz Talk";
    if (lowerUrl.includes("dgdkcjnymr4")) views = "2.4M";
    else if (lowerUrl.includes("gp7t0_5qma4")) views = "9.1M";
    else if (lowerUrl.includes("dcrqicgyu5w")) views = "3.1M";
    else if (lowerUrl.includes("dzhctuzjzxn")) views = "1.7M";
    else views = "2.0M";
  }
  else {
    const rawName = v.username || v.channelName || v.author || v.handle || v.channel || "";
    username = rawName ? (rawName.startsWith("@") ? rawName : `@${rawName}`) : (isInsta ? "@techmasterco" : "@techmasterhq");
    channelName = username.replace("@", "");
    views = (v.views || v.viewCount || "1.2M").toString().replace(/\s*views\s*/gi, "").trim();
  }

  let thumbnail = v.thumbnail || v.thumbnailUrl || v.imageUrl || "";
  if (!thumbnail) {
    if (!isInsta) {
      const match = targetUrl.match(/(?:shorts\/|youtu\.be\/|v=|\/v\/|embed\/)([^"&?/\s]{11})/i);
      const ytId = match ? match[1] : "";
      if (ytId) {
        thumbnail = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
      }
    } else {
      thumbnail = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop";
    }
  }

  return {
    id: v._id || v.id || `reel-id-${Math.abs(targetUrl.length || 0)}-${views}`,
    platform: isInsta ? "instagram" : "youtube",
    url: targetUrl,
    thumbnail,
    username,
    channelName,
    title: v.title || "Featured Content",
    views,
    videoUrl: v.videoUrl || ""
  };
}

function getEmbedUrl(url?: string, videoUrl?: string): { type: "youtube" | "instagram" | "direct"; embedUrl?: string; fallbackVideo?: string } {
  const targetUrl = (url || "").trim();
  
  let ytId: string | null = null;
  if (targetUrl.includes("youtube.com/shorts/")) {
    const parts = targetUrl.split("youtube.com/shorts/");
    if (parts[1]) ytId = parts[1].split(/[?#]/)[0];
  } else if (targetUrl.includes("youtu.be/")) {
    const parts = targetUrl.split("youtu.be/");
    if (parts[1]) ytId = parts[1].split(/[?#]/)[0];
  } else if (targetUrl.includes("youtube.com/watch")) {
    const match = targetUrl.match(/[?&]v=([^&#]+)/);
    if (match) ytId = match[1];
  }
  
  if (ytId) {
    return {
      type: "youtube",
      embedUrl: `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&enablejsapi=1`
    };
  }
  
  if (targetUrl.includes("instagram.com/reel/") || targetUrl.includes("instagram.com/p/") || targetUrl.includes("/reel/")) {
    let instId: string | null = null;
    const match = targetUrl.match(/\/reel\/([^/?#]+)/) || targetUrl.match(/\/p\/([^/?#]+)/);
    if (match) instId = match[1];
    
    if (instId) {
      return {
        type: "instagram",
        embedUrl: `https://www.instagram.com/reel/${instId}/embed`
      };
    }
  }
  
  const validMp4 = (videoUrl && videoUrl.endsWith(".mp4"))
    ? videoUrl 
    : WORKING_VIDEOS[Math.abs((targetUrl || videoUrl || "").length || 0) % WORKING_VIDEOS.length];

  return { type: "direct", fallbackVideo: validMp4 };
}

export const StripeReelsCarousel: React.FC<StripeReelsCarouselProps> = ({ reels, isHomePage = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fetchedMetadata, setFetchedMetadata] = useState<Record<string, { username: string; channelName: string; title: string; thumbnailUrl: string }>>({});

  const activeReelsList = ((reels && reels.length > 0) ? reels : DEFAULT_REELS).map(normalizeReelItem);

  useEffect(() => {
    activeReelsList.forEach((reel) => {
      const url = reel.url;
      if (!url || fetchedMetadata[url]) return;

      const lowerUrl = url.toLowerCase();
      if (lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be")) {
        fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`)
          .then((res) => {
            if (res.ok) return res.json();
            throw new Error("Failed to fetch");
          })
          .then((data) => {
            let username = "";
            const handleMatch = (data.author_url || "").match(/@([^/]+)/);
            if (handleMatch && handleMatch[1]) {
              username = `@${handleMatch[1]}`;
            } else {
              username = data.author_name ? `@${data.author_name.toLowerCase().replace(/[^a-z0-9]/g, "")}` : "@techmasterhq";
            }
            
            const combined = (data.author_name || "").toLowerCase();
            if (combined.includes("masterwheel")) username = "@masterwheel1";
            else if (combined.includes("nextuniverz")) username = "@NextUniverz";
            else if (combined.includes("fullcircle")) username = "@fullcircle_in";
            else if (combined.includes("trendztalk")) username = "@trendztalk";
            else if (combined.includes("tech master")) username = "@techmasterhq";

            setFetchedMetadata((prev) => ({
              ...prev,
              [url]: {
                username,
                channelName: data.author_name || "Tech Master",
                title: data.title || "YouTube Content",
                thumbnailUrl: data.thumbnail_url || ""
              }
            }));
          })
          .catch(() => {
            let username = reel.username || "@techmasterhq";
            let channelName = reel.channelName || "Tech Master";
            if (lowerUrl.includes("masterwheel")) {
              username = "@masterwheel1";
              channelName = "Master Wheels";
            } else if (lowerUrl.includes("nextuniverz")) {
              username = "@NextUniverz";
              channelName = "Next Univerz";
            } else if (lowerUrl.includes("fullcircle")) {
              username = "@fullcircle_in";
              channelName = "Full Circle";
            } else if (lowerUrl.includes("trendztalk")) {
              username = "@trendztalk";
              channelName = "Trendz Talk";
            }
            setFetchedMetadata((prev) => ({
              ...prev,
              [url]: {
                username,
                channelName,
                title: reel.title || "YouTube Content",
                thumbnailUrl: reel.thumbnail || ""
              }
            }));
          });
      } else if (lowerUrl.includes("instagram.com")) {
        let username = reel.username || "@techmasterco";
        let channelName = reel.channelName || "Tech Master";
        
        const pathMatch = url.match(/instagram\.com\/([^/]+)\/(?:reel|p)/i);
        if (pathMatch && pathMatch[1] && !["reel", "p", "reels"].includes(pathMatch[1].toLowerCase())) {
          username = `@${pathMatch[1]}`;
          channelName = pathMatch[1];
        } else {
          if (lowerUrl.includes("trendztalk")) {
            username = "@trendztalk";
            channelName = "Trendz Talk";
          } else if (lowerUrl.includes("fullcircle")) {
            username = "@fullcircle_in";
            channelName = "Full Circle";
          } else if (lowerUrl.includes("masterwheel")) {
            username = "@masterwheel1";
            channelName = "Master Wheels";
          } else if (lowerUrl.includes("nextuniverz")) {
            username = "@NextUniverz";
            channelName = "Next Univerz";
          }
        }
        
        setFetchedMetadata((prev) => ({
          ...prev,
          [url]: {
            username,
            channelName,
            title: reel.title || "Instagram Content",
            thumbnailUrl: reel.thumbnail || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop"
          }
        }));
      }
    });
  }, [activeReelsList]);

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
      return { rotateY: 0, scale: 1.0, opacity: 1, zIndex: 50 };
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

          // Dynamic handle, platform badge & views resolution directly from normalized object
          const targetUrl = reel.url;
          const formattedHandle = reel.username;
          const isInstagram = reel.platform === "instagram";
          const platformBadgeText = isInstagram ? "INSTAGRAM REEL" : "YOUTUBE SHORT";
          const viewText = reel.views;

          // Smooth GPU Overlay level: center = crisp, sides = subtle dark overlay
          const overlayGlassClass = absOffset === 0
            ? "pointer-events-none"
            : absOffset === 1
              ? "bg-black/20 pointer-events-none transition-all duration-300"
              : "bg-black/35 pointer-events-none transition-all duration-300";

          return (
            <motion.div
              key={reel.url || reel.id || originalIndex}
              onClick={() => {
                if (!isActive) {
                  changeActiveIndex(originalIndex);
                } else {
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

              {/* Pure Video Element or IFrame - GPU Accelerated for 60fps Smooth Playback */}
              <div 
                className="w-full h-full absolute inset-0 z-20 overflow-hidden bg-black flex items-center justify-center"
                style={{ 
                  filter: absOffset === 0 ? "none" : absOffset === 1 ? "blur(3px)" : "blur(6px)",
                  transform: "translateZ(0)"
                }}
              >
                {(() => {
                  const embedInfo = getEmbedUrl(reel.url, reel.videoUrl);
                  
                  if (embedInfo.type === "youtube") {
                    return (
                      <iframe
                        src={embedInfo.embedUrl}
                        title={reel.title || "YouTube video player"}
                        className="w-[170%] h-[170%] absolute -left-[35%] -top-[35%] pointer-events-none object-cover border-none scale-105"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        loading="lazy"
                      />
                    );
                  } else {
                    const videoSrc = reel.videoUrl || embedInfo.fallbackVideo || WORKING_VIDEOS[originalIndex % WORKING_VIDEOS.length];
                    return (
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
                        onError={(e) => {
                          const target = e.target as HTMLVideoElement;
                          target.src = WORKING_VIDEOS[originalIndex % WORKING_VIDEOS.length];
                          target.play().catch(() => {});
                        }}
                        src={mediaUrl(videoSrc)}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover scale-105 relative z-20"
                      />
                    );
                  }
                })()}
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
                </div>
              )}

              {/* Views Counter & Platform Badge */}
              <AnimatePresence>
                {isActive && (
                  <>
                    {/* Top Badge: YOUTUBE SHORT vs INSTAGRAM REEL */}
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: 0.2 }}
                      className="absolute top-4 left-4 z-40 pointer-events-none"
                    >
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${isHomePage ? "rounded-none" : "rounded-full"} bg-black/80 backdrop-blur-md border border-gold/40 text-gold text-[9px] uppercase font-mono tracking-[1.5px] font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]`}>
                        {isInstagram ? <InstagramIcon /> : <YoutubeIcon />}
                        {platformBadgeText || (isInstagram ? "INSTAGRAM REEL" : "YOUTUBE SHORT")}
                      </span>
                    </motion.div>

                    {/* Views Counter (Bottom Right of Card) */}
                    {viewText && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ delay: 0.2 }}
                        className="absolute bottom-3 right-2 sm:bottom-3.5 sm:right-2.5 z-40 flex items-center gap-1.5 bg-black/90 backdrop-blur-md border border-gold/40 rounded-full pl-2.5 pr-2 py-0.5 sm:pl-3 sm:pr-2.5 sm:py-1 shadow-lg"
                      >
                        <span className="text-gray-400 text-[9px] uppercase font-mono tracking-[1.5px] font-semibold">VIEWS</span>
                        <span className="text-gold text-xs font-semibold font-mono">{viewText.replace(/\s*views\s*/gi, "").trim()}</span>
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

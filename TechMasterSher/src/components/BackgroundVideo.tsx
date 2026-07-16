import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VideoTrio {
  hero: string;
  mid: string;
  feature: string;
}

// Cinematic background video loops for all 18 pages.
// Each page maps 3 distinct loops that smoothly cross-fade as the user scrolls.
const pageVideos: Record<string, VideoTrio> = {
  home: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-fluid-flow-43224-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-abstract-dark-waves-fluid-loop-43093-large.mp4",
    feature: "https://assets.mixkit.co/videos/preview/mixkit-liquid-smoke-swirling-background-43031-large.mp4",
  },
  about: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-abstract-dark-waves-fluid-loop-43093-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-liquid-smoke-swirling-background-43031-large.mp4",
    feature: "https://assets.mixkit.co/videos/preview/mixkit-glowing-neon-connections-loop-42861-large.mp4",
  },
  journey: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-fluid-flow-43224-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-abstract-dark-waves-fluid-loop-43093-large.mp4",
    feature: "https://assets.mixkit.co/videos/preview/mixkit-glowing-bokeh-particles-floating-slowly-43048-large.mp4",
  },
  mission: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-glowing-neon-connections-loop-42861-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-abstract-lines-glowing-neon-lights-42880-large.mp4",
    feature: "https://assets.mixkit.co/videos/preview/mixkit-liquid-fluid-shifting-refractions-43242-large.mp4",
  },
  "what-we-do": {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-digital-connection-lines-glowing-in-dark-42898-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-liquid-fluid-shifting-refractions-43242-large.mp4",
    feature: "https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-fluid-flow-43224-large.mp4",
  },
  services: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-glowing-neon-connections-loop-42861-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-abstract-lines-glowing-neon-lights-42880-large.mp4",
    feature: "https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-technology-particles-background-42998-large.mp4",
  },
  collaborations: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-digital-connection-lines-glowing-in-dark-42898-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-fluid-flow-43224-large.mp4",
    feature: "https://assets.mixkit.co/videos/preview/mixkit-liquid-smoke-swirling-background-43031-large.mp4",
  },
  campaigns: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-aurora-borealis-lights-glowing-in-dark-sky-43187-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-glowing-bokeh-particles-floating-slowly-43048-large.mp4",
    feature: "https://assets.mixkit.co/videos/preview/mixkit-abstract-ink-smoke-spreading-in-water-43075-large.mp4",
  },
  "product-launches": {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-aurora-borealis-lights-glowing-in-dark-sky-43187-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-fluid-flow-43224-large.mp4",
    feature: "https://assets.mixkit.co/videos/preview/mixkit-digital-connection-lines-glowing-in-dark-42898-large.mp4",
  },
  events: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-beams-in-dark-background-42940-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-glowing-neon-connections-loop-42861-large.mp4",
    feature: "https://assets.mixkit.co/videos/preview/mixkit-abstract-lines-glowing-neon-lights-42880-large.mp4",
  },
  portfolio: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-technology-particles-background-42998-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-digital-connection-lines-glowing-in-dark-42898-large.mp4",
    feature: "https://assets.mixkit.co/videos/preview/mixkit-liquid-fluid-shifting-refractions-43242-large.mp4",
  },
  gallery: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-liquid-smoke-swirling-background-43031-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-liquid-fluid-shifting-refractions-43242-large.mp4",
    feature: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-beams-in-dark-background-42940-large.mp4",
  },
  media: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-beams-in-dark-background-42940-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-glowing-neon-connections-loop-42861-large.mp4",
    feature: "https://assets.mixkit.co/videos/preview/mixkit-abstract-lines-glowing-neon-lights-42880-large.mp4",
  },
  testimonials: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-glowing-bokeh-particles-floating-slowly-43048-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-abstract-ink-smoke-spreading-in-water-43075-large.mp4",
    feature: "https://assets.mixkit.co/videos/preview/mixkit-liquid-fluid-shifting-refractions-43242-large.mp4",
  },
  career: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-abstract-lines-glowing-neon-lights-42880-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-technology-particles-background-42998-large.mp4",
    feature: "https://assets.mixkit.co/videos/preview/mixkit-digital-connection-lines-glowing-in-dark-42898-large.mp4",
  },
  blog: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-abstract-ink-smoke-spreading-in-water-43075-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-liquid-fluid-shifting-refractions-43242-large.mp4",
    feature: "https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-fluid-flow-43224-large.mp4",
  },
  faq: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-liquid-fluid-shifting-refractions-43242-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-abstract-ink-smoke-spreading-in-water-43075-large.mp4",
    feature: "https://assets.mixkit.co/videos/preview/mixkit-glowing-neon-connections-loop-42861-large.mp4",
  },
  contact: {
    hero: "https://assets.mixkit.co/videos/preview/mixkit-glowing-bokeh-particles-floating-slowly-43048-large.mp4",
    mid: "https://assets.mixkit.co/videos/preview/mixkit-aurora-borealis-lights-glowing-in-dark-sky-43187-large.mp4",
    feature: "https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-fluid-flow-43224-large.mp4",
  },
};

interface BackgroundVideoProps {
  activePage: string;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ activePage }) => {
  const activePair = pageVideos[activePage] || pageVideos.home;
  
  const [videoSrcHero, setVideoSrcHero] = useState(activePair.hero);
  const [videoSrcMid, setVideoSrcMid] = useState(activePair.mid);
  const [videoSrcFeature, setVideoSrcFeature] = useState(activePair.feature);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [transitionOpacity, setTransitionOpacity] = useState(1);
  const heroRef = useRef<HTMLVideoElement>(null);
  const midRef = useRef<HTMLVideoElement>(null);
  const featureRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleGlobalMouseEnter = () => {
      heroRef.current?.play().catch(() => {});
      midRef.current?.play().catch(() => {});
      featureRef.current?.play().catch(() => {});
    };
    const handleGlobalMouseLeave = () => {
      if (heroRef.current) {
        heroRef.current.pause();
        heroRef.current.currentTime = 0;
      }
      if (midRef.current) {
        midRef.current.pause();
        midRef.current.currentTime = 0;
      }
      if (featureRef.current) {
        featureRef.current.pause();
        featureRef.current.currentTime = 0;
      }
    };

    document.addEventListener("mouseenter", handleGlobalMouseEnter);
    document.addEventListener("mouseleave", handleGlobalMouseLeave);

    return () => {
      document.removeEventListener("mouseenter", handleGlobalMouseEnter);
      document.removeEventListener("mouseleave", handleGlobalMouseLeave);
    };
  }, []);

  useEffect(() => {
    // Cross-fade the page video sources change smoothly on route transitions
    setTransitionOpacity(0);
    const timeout = setTimeout(() => {
      const currentPair = pageVideos[activePage] || pageVideos.home;
      setVideoSrcHero(currentPair.hero);
      setVideoSrcMid(currentPair.mid);
      setVideoSrcFeature(currentPair.feature);
      setTransitionOpacity(1);
    }, 400);

    return () => clearTimeout(timeout);
  }, [activePage]);

  useEffect(() => {
    // Dynamic scroll tracking percentage
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      } else {
        setScrollProgress(0);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const videoHero = document.querySelector(".bg-video-hero");
    const videoMid = document.querySelector(".bg-video-mid");
    const videoFeature = document.querySelector(".bg-video-feature");
    if (!videoHero || !videoMid || !videoFeature) return;

    // Scroll-controlled parallax displacements
    const animHero = gsap.fromTo(
      videoHero,
      { y: 0, scale: 1.0 },
      {
        y: -100,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      }
    );

    const animMid = gsap.fromTo(
      videoMid,
      { y: 50, scale: 1.05 },
      {
        y: -50,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      }
    );

    const animFeature = gsap.fromTo(
      videoFeature,
      { y: 100, scale: 1.15 },
      {
        y: 0,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      }
    );

    return () => {
      animHero.scrollTrigger?.kill();
      animHero.kill();
      animMid.scrollTrigger?.kill();
      animMid.kill();
      animFeature.scrollTrigger?.kill();
      animFeature.kill();
    };
  }, [videoSrcHero, videoSrcMid, videoSrcFeature]);

  // Three-stage opacity math:
  // p < 0.2: Video 1 is 100% visible, others are 0%.
  // 0.2 <= p <= 0.4: Cross-fade from Video 1 to Video 2.
  // 0.4 < p < 0.6: Video 2 is 100% visible, others are 0%.
  // 0.6 <= p <= 0.8: Cross-fade from Video 2 to Video 3.
  // p > 0.8: Video 3 is 100% visible, others are 0%.
  let opacityHero = 0;
  let opacityMid = 0;
  let opacityFeature = 0;

  if (scrollProgress < 0.2) {
    opacityHero = 1;
  } else if (scrollProgress >= 0.2 && scrollProgress <= 0.4) {
    const factor = (scrollProgress - 0.2) / 0.2; // 0 to 1
    opacityHero = 1 - factor;
    opacityMid = factor;
  } else if (scrollProgress > 0.4 && scrollProgress < 0.6) {
    opacityMid = 1;
  } else if (scrollProgress >= 0.6 && scrollProgress <= 0.8) {
    const factor = (scrollProgress - 0.6) / 0.2; // 0 to 1
    opacityMid = 1 - factor;
    opacityFeature = factor;
  } else {
    opacityFeature = 1;
  }

  // Factor in maximum opacity layer bounds
  const maxOpacity = 0.25;
  const opacityHeroAdjusted = opacityHero * maxOpacity * transitionOpacity;
  const opacityMidAdjusted = opacityMid * maxOpacity * transitionOpacity;
  const opacityFeatureAdjusted = opacityFeature * maxOpacity * transitionOpacity;

  return (
    <div 
      className="fixed inset-0 w-full h-screen pointer-events-none bg-[#030303] overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* 1. Hero Video: Visible at top screen, fades as we scroll down */}
      <video
        ref={heroRef}
        key={videoSrcHero}
        src={videoSrcHero}
        loop
        muted
        playsInline
        className="bg-video-hero w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ease-out"
        style={{ opacity: opacityHeroAdjusted }}
      />

      {/* 2. Mid Video: Cross-fades in mid scroll */}
      <video
        ref={midRef}
        key={videoSrcMid}
        src={videoSrcMid}
        loop
        muted
        playsInline
        className="bg-video-mid w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ease-out"
        style={{ opacity: opacityMidAdjusted }}
      />

      {/* 3. Feature Video: Fades in bottom scroll */}
      <video
        ref={featureRef}
        key={videoSrcFeature}
        src={videoSrcFeature}
        loop
        muted
        playsInline
        className="bg-video-feature w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ease-out"
        style={{ opacity: opacityFeatureAdjusted }}
      />

      {/* Ambient gradient layer to blur/darken edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/20 via-transparent to-[#030303]/20 pointer-events-none" />
    </div>
  );
};

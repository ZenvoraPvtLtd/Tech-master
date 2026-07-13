import React, { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useData } from "../context/DataContext";
import { LuxuryCard } from "../components/LuxuryCard";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Journey: React.FC = () => {
  const { journeyData, journeyHero } = useData();
  useEffect(() => {
    // 1. Line drawing animation
    gsap.fromTo(
      ".timeline-line-active",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );

    // 2. Reveal and highlight animation for timeline nodes
    const items = document.querySelectorAll(".timeline-item");
    items.forEach((item) => {
      // Reveal
      gsap.fromTo(
        item.querySelectorAll(".timeline-reveal"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Highlight Year text
      gsap.to(item.querySelectorAll(".timeline-year-text"), {
        color: "#D4AF37",
        scale: 1.1,
        opacity: 1,
        textShadow: "0 0 20px rgba(212,175,55,0.5)",
        duration: 0.3,
        scrollTrigger: {
          trigger: item,
          start: "top 60%",
          end: "bottom 40%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Highlight Node dot
      gsap.to(item.querySelectorAll(".timeline-node-outer"), {
        borderColor: "#D4AF37",
        duration: 0.3,
        scrollTrigger: {
          trigger: item,
          start: "top 60%",
          end: "bottom 40%",
          toggleActions: "play reverse play reverse",
        },
      });
      gsap.to(item.querySelectorAll(".timeline-node-inner"), {
        backgroundColor: "#D4AF37",
        boxShadow: "0 0 10px rgba(212,175,55,0.8)",
        duration: 0.3,
        scrollTrigger: {
          trigger: item,
          start: "top 60%",
          end: "bottom 40%",
          toggleActions: "play reverse play reverse",
        },
      });
    });

    // 3. Roadmap container fade-in on scroll
    const roadmapContainer = document.querySelector(".roadmap-container");
    if (roadmapContainer) {
      gsap.fromTo(
        roadmapContainer,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: roadmapContainer,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 w-[60vw] h-[60vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] aurora-glow-gold opacity-10 pointer-events-none translate-x-1/2 translate-y-1/2" />

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          {journeyHero.badgeText}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl font-light leading-tight mb-6"
        >
          {journeyHero.heading} <br />
          <span className="text-gold italic font-bold">{journeyHero.highlightWord}</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-300 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed p-6 rounded-2xl border border-gold bg-black/40 backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.15)] mt-4"
        >
          {journeyHero.description}
        </motion.div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 mt-12 opacity-55">
          <span className="text-[9px] uppercase tracking-[3px]">{journeyHero.scrollIndicatorText}</span>
          <ArrowDown className="w-4 h-4 text-gold animate-bounce" />
        </div>
      </div>

      {/* Timeline Section */}
      <div className="timeline-container max-w-4xl mx-auto relative z-10 pb-20">
        {/* Central connecting line */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
        <div 
          className="timeline-line-active absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-gold -translate-x-1/2 origin-top" 
          style={{ transform: "scaleY(0)" }} 
        />

        <div className="flex flex-col gap-16 relative">
          {journeyData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className="timeline-item flex flex-col sm:flex-row relative w-full items-start sm:justify-between"
              >
                {/* Timeline connector circle node */}
                <div className="timeline-node-outer absolute left-4 sm:left-1/2 w-4 h-4 rounded-full border border-white/20 bg-black -translate-x-1/2 top-1.5 z-20 flex items-center justify-center transition-colors duration-300">
                  <div className="timeline-node-inner w-1.5 h-1.5 rounded-full bg-white/20 transition-colors duration-300" />
                </div>

                {/* Left space (empty on small, used on larger displays) */}
                <div className={`hidden sm:block w-[45%] ${isEven ? "order-1 text-right" : "order-2"}`}>
                  {isEven && (
                    <div className="timeline-reveal pr-8 pt-1">
                      <span className="timeline-year-text font-serif text-5xl font-black text-white/20 block mb-1 origin-right inline-block transition-transform">
                        {item.year}
                      </span>
                      <span className="text-gray-400 text-xs uppercase tracking-[2px] font-mono block">
                        {item.subtitle}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right space or content card */}
                <div className={`w-[90%] sm:w-[45%] pl-10 sm:pl-0 ${isEven ? "order-2 sm:order-2" : "order-2 sm:order-1 text-left sm:text-right"}`}>
                  {!isEven && (
                    <div className="timeline-reveal hidden sm:block pl-8 pb-4 pt-1">
                      <span className="timeline-year-text font-serif text-5xl font-black text-white/20 block mb-1 origin-left inline-block transition-transform">
                        {item.year}
                      </span>
                      <span className="text-gray-400 text-xs uppercase tracking-[2px] font-mono block">
                        {item.subtitle}
                      </span>
                    </div>
                  )}

                  {/* Timeline mobile-specific header display */}
                  <div className="sm:hidden timeline-reveal mb-2">
                    <span className="timeline-year-text font-serif text-3xl font-black text-white/20 block origin-left inline-block transition-transform">
                      {item.year}
                    </span>
                    <span className="text-gray-400 text-xs uppercase tracking-[1px] font-mono">
                      {item.subtitle}
                    </span>
                  </div>

                  <LuxuryCard
                    accentColor="#D4AF37"
                    className="timeline-reveal"
                    index={index}
                  >
                    <div className="flex items-center gap-2 mb-4 text-gold">
                      <span className="font-mono text-xs uppercase tracking-[2px]">
                        Epoch {item.year}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl text-white font-medium mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
                      {item.description}
                    </p>
                  </LuxuryCard>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Thematic Growth Roadmap */}
      <div className="roadmap-container max-w-7xl mx-auto px-6 relative z-10 pb-32">
        <style>{`
          @keyframes roadmapScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-roadmap {
            display: flex;
            width: max-content;
            animation: roadmapScroll 45s linear infinite;
          }
          .animate-roadmap:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="mb-16 text-center">
          <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">ROADMAP</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
            Founder's <span className="text-gold italic font-bold">Growth Roadmap</span>
          </h2>
          <p className="text-xs text-gray-500 font-mono tracking-[1px] uppercase mt-2">Hover to Pause Timeline</p>
        </div>

        <div className="relative overflow-hidden pb-12 pt-6">
          <div className="animate-roadmap flex gap-8 relative z-10 h-[440px]">
            
            {/* Connection line inside the scrolling container */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/40 via-royal-purple/40 to-gold/40 -translate-y-1/2 z-0 pointer-events-none" />

            {/* Loop 1 and Loop 2 for infinite ticker */}
            {[1, 2].map((loopGroup) => (
              <div key={loopGroup} className="flex gap-8">
                {[
                  { title: "Childhood", desc: "Early fascination with computers, dismantling old radios and writing basic HTML on a Windows 95 machine." },
                  { title: "Career Beginning", desc: "Started as a junior developer in a local agency, learning the ropes of production-level code and client management." },
                  { title: "First Brand Collab", desc: "Partnering with a major tech hardware brand to produce a series of educational videos, marking the first sponsorship." },
                  { title: "Social Media Journey", desc: "From 0 to 2.5 Million subscribers, navigating algorithm changes, burnout, and discovering a unique educational voice." },
                  { title: "Major Milestones", desc: "Reaching 100K subscribers, speaking at TEDx, and launching the first independent tech bootcamp." },
                  { title: "Biggest Challenges", desc: "Balancing a demanding senior architect role while growing a YouTube channel, and overcoming imposter syndrome." },
                  { title: "Success Stories", desc: "Helping thousands of students land roles at Fortune 500 companies through free content and accessible courses." },
                  { title: "Future Vision", desc: "Building a decentralized, globally accessible university-grade tech education platform for the next generation." }
                ].map((item, idx) => {
                  const isCardOnTop = idx % 2 === 0;
                  return (
                    <div key={idx} className="flex flex-col items-center justify-center w-[300px] h-[440px] relative select-none">
                      
                      {/* Central Node Dot */}
                      <div className="w-10 h-10 rounded-full bg-black border-2 border-gold flex items-center justify-center font-mono text-xs text-gold font-bold z-20 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                        0{idx + 1}
                      </div>

                      {isCardOnTop ? (
                        <>
                          {/* Card on Top */}
                          <div className="absolute top-0 left-0 right-0 glass-panel p-6 rounded-2xl border border-white/5 hover:border-gold/30 transition-all duration-300">
                            <h3 className="font-serif text-lg font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-xs font-light leading-relaxed">{item.desc}</p>
                          </div>
                          
                          {/* Connector line */}
                          <div className="absolute top-[150px] bottom-[240px] w-[1px] bg-gradient-to-b from-white/10 to-gold/50" />
                        </>
                      ) : (
                        <>
                          {/* Card on Bottom */}
                          <div className="absolute bottom-0 left-0 right-0 glass-panel p-6 rounded-2xl border border-white/5 hover:border-gold/30 transition-all duration-300">
                            <h3 className="font-serif text-lg font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-xs font-light leading-relaxed">{item.desc}</p>
                          </div>

                          {/* Connector line */}
                          <div className="absolute top-[240px] bottom-[150px] w-[1px] bg-gradient-to-b from-gold/50 to-white/10" />
                        </>
                      )}

                    </div>
                  );
                })}
              </div>
            ))}

          </div>
        </div>
      </div>

    </div>
  );
};

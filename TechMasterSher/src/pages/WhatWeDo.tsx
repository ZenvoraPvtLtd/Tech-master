import React from "react";
import { motion } from "framer-motion";
import { Video, Award, Code, Presentation, MessageSquareCode, Sparkles, ShieldCheck } from "lucide-react";
import { LuxuryCard } from "../components/LuxuryCard";
import { useData } from "../context/DataContext";

const iconMap: Record<string, React.ReactNode> = {
  Video: <Video className="w-6 h-6 text-gold" />,
  Award: <Award className="w-6 h-6 text-gold" />,
  Code: <Code className="w-6 h-6 text-electric-blue" />,
  Presentation: <Presentation className="w-6 h-6 text-royal-purple" />,
  MessageSquareCode: <MessageSquareCode className="w-6 h-6 text-pink-500" />,
  Sparkles: <Sparkles className="w-6 h-6 text-gold" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-green-500" />,
};

export const WhatWeDo: React.FC = () => {
  const { whatWeDoData } = useData();

  if (!whatWeDoData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060606]">
        <p className="text-gold font-mono uppercase tracking-[3px] text-xs">Loading Content...</p>
      </div>
    );
  }


  const hero = whatWeDoData?.hero || {
    smallBadge: "CORE ACTIVITIES",
    headline: "What We Do to",
    highlightWord: "Reshape Learning",
    description: "We build content, platforms, keynotes, and campaigns to bridge the gap between classroom syntax and global engineering workspaces."
  };

  const operations = whatWeDoData?.operations && whatWeDoData.operations.length > 0
    ? whatWeDoData.operations.map((op: any) => ({
        icon: iconMap[op.icon] || <Video className="w-6 h-6 text-gold" />,
        title: op.title,
        subtitle: op.subtitle,
        description: op.description,
        accent: op.accent || op.accentColor || "#D4AF37"
      }))
    : [
        {
          icon: <Video className="w-6 h-6 text-gold" />,
          title: "YouTube Production",
          subtitle: "Cinematic Coding Breakdowns",
          description: "We scripting, record, and edit deep-dive developer tutorials that run like cinematic stories. Reaching over 2.5 million subscribers with weekly guides.",
          accent: "#D4AF37",
        },
        {
          icon: <Code className="w-6 h-6 text-electric-blue" />,
          title: "Interactive Syllabus Design",
          subtitle: "Online MasterClasses",
          description: "Drafting production-level courses that focus on Docker pipelines, testing arrays, and backend scale, complete with live browser containers.",
          accent: "#00E5FF",
        },
        {
          icon: <Presentation className="w-6 h-6 text-royal-purple" />,
          title: "Motivational Keynotes",
          subtitle: "TEDx & Global Tech Talks",
          description: "Aman travels worldwide delivering opening remarks on 'Democratizing Code' and soft skill strategies to help students bypass generic hiring cycles.",
          accent: "#aa3bff",
        },
        {
          icon: <MessageSquareCode className="w-6 h-6 text-pink-500" />,
          title: "Community Hackathons",
          subtitle: "Empowerment Cohorts",
          description: "Hosting virtual/physical coding tournaments sponsored by Vercel and Google Cloud to give students direct placement links.",
          accent: "#FF007F",
        },
      ];

  const servicesList = whatWeDoData?.servicesList && whatWeDoData.servicesList.length > 0
    ? whatWeDoData.servicesList.map((s: any) => s.tag)
    : [
        "Content Creation", "Influencer Marketing", "Brand Promotions", "Brand Campaigns", 
        "Product Launches", "Event Hosting", "Event Management", "Corporate Collaborations", 
        "Digital Marketing", "Personal Branding", "Creative Consulting", "Social Media Strategy", 
        "Creative Direction", "Public Speaking", "Workshop Sessions"
      ];

  const quoteBanner = whatWeDoData?.quoteBanner || {
    quoteText: "Education is not the learning of facts, but the training of the mind to think.",
    authorName: "Aman (Tech Master)"
  };

  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background glow layers */}
      <div className="absolute top-1/4 left-1/3 w-[55vw] h-[55vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] aurora-glow-gold opacity-10 pointer-events-none translate-x-1/2" />

      {/* Hero Header */}
      <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          {hero.smallBadge || "CORE ACTIVITIES"}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl font-light leading-tight mb-6"
        >
          {hero.headline || "What We Do to"} <br />
          <span className="text-gold italic font-bold">{hero.highlightWord || "Reshape Learning"}</span> {hero.titleLine2 || ""}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed"
        >
          {hero.description}
        </motion.p>
      </div>

      {/* Grid of operations */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {operations.map((op: any, idx: number) => (
            <LuxuryCard key={idx} accentColor={op.accent} index={idx}>
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-center group-hover:border-gold/30 transition-colors duration-300">
                  {op.icon}
                </div>
                <span className="text-[10px] uppercase font-mono tracking-[1.5px] text-gray-400 group-hover:text-gold transition-colors duration-300">
                  Operation 0{idx + 1}
                </span>
              </div>
              <div className="mb-4">
                <h3 className="font-serif text-2xl text-white font-medium mb-1 group-hover:text-gold transition-colors duration-300">
                  {op.title}
                </h3>
                <span className="text-gray-400 text-[10px] uppercase tracking-[2px] font-mono block">
                  {op.subtitle}
                </span>
              </div>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light mt-4 pt-4 border-t border-white/5">
                {op.description}
              </p>
            </LuxuryCard>
          ))}
        </div>

        {/* Comprehensive Services List */}
        <div className="mt-24 mb-12">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">OUR EXPERTISE</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-light">
              Comprehensive <span className="text-gold italic font-bold">Services</span>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {servicesList.map((service: string, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm hover:border-gold hover:text-gold transition-colors duration-300 cursor-default"
              >
                {service}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dynamic quote banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="glass-panel p-8 md:p-16 rounded-3xl mt-20 text-center max-w-4xl mx-auto border border-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.05)]"
        >
          <Award className="w-10 h-10 text-gold mx-auto mb-6" />
          <h2 className="font-serif text-2xl md:text-3xl font-light italic text-white leading-relaxed mb-6">
            "{quoteBanner.quoteText || quoteBanner.quote}"
          </h2>
          <span className="text-gold uppercase tracking-[3px] text-xs font-bold font-mono">
            &mdash; {quoteBanner.authorName || quoteBanner.author}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

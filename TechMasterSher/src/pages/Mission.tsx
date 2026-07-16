import React from "react";
import { motion } from "framer-motion";
import { LuxuryCard } from "../components/LuxuryCard";
import { useData } from "../context/DataContext";

const defaultValues = [
  {
    title: "Vision 2030: Democratizing Code",
    description: "Our core goal is to reach 10 million students globally, offering verified technical education pathways at zero subscription costs.",
    accent: "#D4AF37",
  },
  {
    title: "Proof of Work Focus",
    description: "Moving tech candidates away from standard multiple-choice resumes and towards visible, deployed open-source contributions.",
    accent: "#00E5FF",
  },
  {
    title: "Academic Collaboration",
    description: "Bridging the gap between theory and industry needs by integrating real-world project curricula inside university syllabus tracks.",
    accent: "#aa3bff",
  },
  {
    title: "Inclusive Coding Spaces",
    description: "Supporting underrepresented groups in software engineering through free hardware grants, cloud sponsorship, and active mentorship panels.",
    accent: "#FF007F",
  },
];

const accentColors = ["#D4AF37", "#00E5FF", "#aa3bff", "#FF007F"];

export const Mission: React.FC = () => {
  const { missionVisionData } = useData();

  if (!missionVisionData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060606]">
        <p className="text-gold font-mono uppercase tracking-[3px] text-xs">Loading Content...</p>
      </div>
    );
  }

  const mv = missionVisionData || {};

  const heroData = mv.hero || {};
  const missionData = mv.mission || {};
  const visionData = mv.vision || {};

  const coreValues = Array.isArray(mv.coreValues) && mv.coreValues.length > 0
    ? mv.coreValues
        .filter((v: any) => v.status === "Active" || v.status === true || v.status === undefined)
        .map((v: any, idx: number) => ({
          title: v.title || v.valueName,
          description: v.description,
          accent: v.accentColor || accentColors[idx % accentColors.length],
        }))
    : defaultValues;

  return (
    <div className="relative text-white min-h-screen pt-32 pb-8 px-6 overflow-hidden">
      {/* Glow overlays */}
      <div className="absolute top-1/3 left-1/4 w-[45vw] h-[45vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] aurora-glow-blue opacity-15 pointer-events-none translate-x-1/2" />

      {/* Hero Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="typo-badge mb-4"
        >
          {heroData.badge || "OUR NORTH STAR"}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="typo-h2 mb-6"
        >
          {heroData.headingLine1 || "Democratizing"} <br />
          <span className="text-gold italic font-bold">{heroData.highlightText || "Tech Literacy"}</span> {heroData.headingLine2 || "Globally"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed"
        >
          {heroData.description || "We believe high-quality engineering curricula shouldn't be locked behind expensive student debts. Aman is building the tools to make code accessible to every curious mind on earth."}
        </motion.p>
      </div>

      {/* Core Mission grids */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 md:p-12 rounded-3xl text-left flex flex-col justify-center border-l-4 border-l-gold"
          >
            <span className="text-xs uppercase font-bold tracking-[3px] text-gold mb-4">{missionData.label || "THE MISSION STATEMENT"}</span>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-white mb-6 leading-snug">
              {missionData.title || "To inspire, educate, and place the next million full-stack developers."}
            </h2>
            <p className="typo-card-desc">
              {missionData.description || "Our target is to break down complex system design systems, database architectures, and compiler dynamics into engaging, cinematic formats. We enable students to transition seamlessly from beginners to self-sufficient contributors."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 md:p-12 rounded-3xl text-left flex flex-col justify-center border-l-4 border-l-electric-blue"
          >
            <span className="text-xs uppercase font-bold tracking-[3px] text-electric-blue mb-4">{visionData.label || "THE FUTURE VISION"}</span>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-white mb-6 leading-snug">
              {visionData.title || "Vision 2030: Bridging the global developer deficit."}
            </h2>
            <p className="typo-card-desc">
              {visionData.description || "Technology evolves at a rapid pace, yet university syllabi remain outdated. We are constructing an open, adaptive, cloud-native learning playground that responds directly to modern tech requirements."}
            </p>
          </motion.div>
        </div>

        {/* Core Values grid using LuxuryCard */}
        <div className="mb-12 text-center">
          <p className="typo-badge mb-4">OUR FUNDAMENTAL PRINCIPLES</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-light mb-16">
            The Values that <span className="text-gold italic font-bold">Drive Us</span> Forward
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {coreValues.map((val: any, idx: number) => (
              <LuxuryCard key={idx} accentColor={val.accent} index={idx}>
                <h3 className="font-serif text-lg text-white font-medium mb-3 group-hover:text-gold transition-colors duration-300">
                  {val.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed font-light">
                  {val.description}
                </p>
              </LuxuryCard>
            ))}
          </div>
        </div>

        {/* Core Pillars */}
        <div className="mb-12">
          <div className="mb-12 text-center">
            <p className="typo-badge mb-4">OUR PILLARS</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-light mb-8">
              The <span className="text-gold italic font-bold">Foundation</span> of Our Work
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-panel p-8 rounded-2xl border-l-2 hover:border-l-gold transition-all duration-300"
            >
              <h3 className="font-serif text-xl font-bold text-white mb-3">Brand Philosophy</h3>
              <p className="typo-card-desc">
                We believe that education is not just about transferring information, but about creating an engaging, premium experience. Our philosophy is rooted in cinematic storytelling, making complex engineering concepts feel accessible, beautiful, and deeply impactful.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="glass-panel p-8 rounded-2xl border-l-2 border-white/5 hover:border-l-[#00E5FF] transition-all duration-300"
            >
              <h3 className="font-serif text-xl font-bold text-white mb-3">Community Vision</h3>
              <p className="typo-card-desc">
                A thriving ecosystem where learners support each other. We envision a global network of open-source contributors, mentors, and innovators collaborating in real-time to solve the industry's most pressing challenges.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-panel p-8 rounded-2xl border-l-2 border-white/5 hover:border-l-[#aa3bff] transition-all duration-300"
            >
              <h3 className="font-serif text-xl font-bold text-white mb-3">Creator Mission</h3>
              <p className="typo-card-desc">
                To empower the next generation of technical creators. By providing the tools, templates, and guidance needed, we are helping developers build their own personal brands and share their knowledge with the world.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass-panel p-8 rounded-2xl border-l-2 border-white/5 hover:border-l-[#FF007F] transition-all duration-300"
            >
              <h3 className="font-serif text-xl font-bold text-white mb-3">Future Roadmap</h3>
              <p className="typo-card-desc">
                Looking ahead to 2030, our roadmap includes launching a decentralized tech academy, expanding our interactive coding environments to mobile platforms, and partnering with fortune 500 companies to guarantee placement for our top-tier graduates.
              </p>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};

import React from "react";
import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import { mediaUrl } from "../utils/media";

export const About: React.FC = () => {
  const { aboutData } = useData();
  const aboutDataAny = (aboutData as any) || {};

  const founderQuote = aboutDataAny?.philosophy?.description || "Information is Wealth.";

  return (
    <div className="relative text-white min-h-screen pt-28 pb-16 px-6 overflow-hidden bg-black">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 w-[60vw] h-[60vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] aurora-glow-gold opacity-15 pointer-events-none translate-x-1/2 translate-y-1/2" />

      <div className="max-w-6xl mx-auto space-y-24 relative z-10">

        {/* 1. Header & Company Story */}
        <section className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="typo-badge mb-4"
          >
            ABOUT TECH MASTER
          </motion.div>
          
          {/* Section Heading Removed as requested */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-panel p-8 sm:p-12 rounded-3xl border border-gold/30 bg-black/50 backdrop-blur-xl text-left shadow-[0_0_40px_rgba(212,175,55,0.1)]"
          >
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold mb-6">
              What <span className="text-gold">Tech Master</span> Is
            </h2>
            <p className="text-gray-300 font-light text-base sm:text-lg leading-relaxed">
              It started in 2019 one person, one channel, and a belief that tech content in India could be smarter than it was. That belief became Tech Master, and by 2023, it had become a company. Today, Tech Master Digital Pvt Ltd is a 50+ person team running four established channels across tech, automobiles, and entertainment with a fifth already taking shape in 3D animation out of a full production studio in Jaipur, complete with an in-house editing suite, animation team, and gaming studio. Today our content generates <strong className="text-gold font-bold">1B+ views every month</strong>.
            </p>
          </motion.div>
        </section>

        {/* 2. Team Culture & Photo Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-gold/30 transition-all duration-300"
          >
            <span className="typo-badge mb-4 block">OUR CULTURE</span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white font-bold mb-6">
              Good People. <br />
              <span className="text-gold italic font-bold">Good Work. Good Vibes</span>
            </h2>
            <p className="text-gray-300 font-light text-base leading-relaxed">
              Ideas get clashed over here, not because we're trying to prove a point, but because everyone actually cares. We push each other, we push ourselves but nobody's burning out to do it. Somewhere between the deadlines and the chai breaks, this team just falls into a rhythm. Good People. Good Work. Good Vibes
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden border border-gold/20 shadow-2xl h-[380px]"
          >
            <img
              src={mediaUrl(aboutDataAny?.story?.imageUrl) || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"}
              alt="Tech Master Team"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-gold font-mono text-xs uppercase tracking-widest font-bold block mb-1">Jaipur Studio</span>
              <p className="text-white font-serif text-lg font-bold">50+ Person Production & Gaming Suite</p>
            </div>
          </motion.div>
        </section>

        {/* 3. Founder Quote (Blended Background Photo) */}
        <section className="relative rounded-3xl overflow-hidden border border-gold/40 p-12 sm:p-20 text-center shadow-[0_0_50px_rgba(212,175,55,0.15)]">
          {/* Background Blended Founder Photo */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105 transition-all duration-700 hover:scale-100" 
            style={{ 
              backgroundImage: `url(${mediaUrl(aboutDataAny?.introduction?.profileImageUrl) || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80'})` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-gold font-mono text-xs uppercase tracking-[4px] font-bold block mb-6">
              FOUNDER PHILOSOPHY
            </span>
            
            <blockquote className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-black italic leading-tight tracking-tight mb-6">
              "{founderQuote}"
            </blockquote>
            
            <div className="w-16 h-1 bg-gold mx-auto rounded-full mb-4" />
            <p className="text-gold font-mono text-sm tracking-widest uppercase font-semibold">
              — Tech Master Founder
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

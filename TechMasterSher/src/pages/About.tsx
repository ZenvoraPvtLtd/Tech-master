import React from "react";
import { motion } from "framer-motion";
import aboutData from "../data/about.json";
import teamData from "../data/team.json";
import { LuxuryCard } from "../components/LuxuryCard";

export const About: React.FC = () => {
  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/3 w-[30vw] h-[30vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] aurora-glow-gold opacity-10 pointer-events-none translate-x-1/2" />

      {/* Unique Page Hero */}
      <section className="max-w-7xl mx-auto text-left mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          FOUNDER IDENTITY
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight mb-8"
        >
          {aboutData.name} <br />
          <span className="text-gold italic font-bold">{aboutData.title}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 pt-12 border-t border-white/5"
        >
          <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed">
            {aboutData.bio}
          </p>
          <div className="glass-panel p-8 rounded-3xl relative hover:border-gold/30 transition-all duration-300 flex flex-col justify-center">
            <h3 className="font-serif text-xl font-bold text-white mb-3">
              {aboutData.philosophy.title}
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed font-light font-sans">
              {aboutData.philosophy.paragraph}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Dynamic statistics section */}
      <section className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32 text-left relative z-10">
        {aboutData.credentials.map((cred, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl border-t border-white/5">
            <span className="font-serif text-3xl font-black text-gold block mb-1">{cred.count}</span>
            <span className="text-gray-400 text-[10px] uppercase tracking-[1px] font-mono">{cred.metric}</span>
          </div>
        ))}
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 text-left relative z-10">
        {[
          {
            title: "Democratizing Tech",
            desc: "Aman started with coding guidelines in 2015, seeking to make raw systems design and deployment concepts accessible to everyone."
          },
          {
            title: "Cinematic Syllabus",
            desc: "Pioneering the border of virtual reality and education. Aman believes engineering courses should feel visual, beautiful, and interactive."
          },
          {
            title: "Quality Benchmarks",
            desc: "We commit to strict developer standards, real-world sandboxed container instances, and active recruiter links."
          }
        ].map((item, idx) => (
          <div key={idx} className="glass-panel p-8 rounded-3xl relative hover:border-gold/30 transition-all duration-300">
            <h3 className="font-serif text-xl font-bold text-white mb-3">{item.title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed font-light">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Story & Passion */}
      <section className="max-w-7xl mx-auto mb-32 text-left relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">THE JOURNEY</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mb-6">
              Our <span className="text-gold italic font-bold">Story & Passion</span>
            </h2>
            <p className="text-gray-400 font-light text-base leading-relaxed mb-6">
              It all started with a simple belief: education should not be confined to boring lectures. We set out to create an ecosystem where code meets creativity. 
              Our passion is fueled by the desire to ignite the same spark in others, turning complex algorithms into compelling visual narratives.
            </p>
            <p className="text-gray-400 font-light text-base leading-relaxed">
              We live and breathe technology. Every late-night coding session, every bug fixed, and every project shipped is a testament to our unwavering dedication to the craft. 
              Our story is just beginning, and our passion is what keeps us moving forward.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-3xl relative">
             <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80" alt="Passion for coding" className="w-full h-auto rounded-xl object-cover" />
          </div>
        </div>
      </section>

      {/* Professional Background & Experience */}
      <section className="max-w-7xl mx-auto mb-32 text-left relative z-10">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">EXPERTISE</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
            Professional <span className="text-gold italic font-bold">Background & Experience</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 rounded-3xl border-l-4 border-gold/50">
            <h3 className="font-serif text-2xl text-white mb-2">Senior Architect at TechGiants</h3>
            <span className="text-gold text-xs font-mono mb-4 block">2018 - 2022</span>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Spearheaded the development of scalable microservices architectures. Led a team of 20+ engineers to deliver robust enterprise solutions, reducing server response times by 40%.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-3xl border-l-4 border-gold/50">
            <h3 className="font-serif text-2xl text-white mb-2">Lead Developer at StartupX</h3>
            <span className="text-gold text-xs font-mono mb-4 block">2015 - 2018</span>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Architected the core product from the ground up, implementing cutting-edge frontend frameworks and real-time backend systems. Instrumental in securing Series A funding.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements & Awards */}
      <section className="max-w-7xl mx-auto mb-32 text-left relative z-10">
        <div className="glass-panel p-12 rounded-3xl border border-white/5">
          <div className="mb-12 text-center md:text-left">
             <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">RECOGNITION</p>
             <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
               Achievements <span className="text-gold italic font-bold">& Awards</span>
             </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="text-white font-bold mb-2">Developer of the Year</h4>
              <p className="text-gray-400 text-xs font-light">Global Tech Summit 2021</p>
            </div>
            <div className="text-center">
              <h4 className="text-white font-bold mb-2">Best Educational Platform</h4>
              <p className="text-gray-400 text-xs font-light">EdTech Innovation Awards 2023</p>
            </div>
            <div className="text-center">
              <h4 className="text-white font-bold mb-2">Top 100 Tech Influencers</h4>
              <p className="text-gray-400 text-xs font-light">TechMedia Global 2022</p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Goals */}
      <section className="max-w-7xl mx-auto mb-32 text-center relative z-10">
        <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">LOOKING AHEAD</p>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mb-8">
          Future <span className="text-gold italic font-bold">Goals</span>
        </h2>
        <div className="glass-panel p-10 rounded-3xl max-w-4xl mx-auto border-t-2 border-gold/50">
          <p className="text-gray-300 font-light text-lg leading-relaxed mb-6">
            Our vision extends beyond today's boundaries. We aim to establish a decentralized global tech academy, where every aspiring developer has free access to enterprise-grade education.
          </p>
          <p className="text-gray-400 font-light text-sm leading-relaxed">
            By 2030, we plan to partner with over 500 universities worldwide, integrating our cinematic syllabus into traditional computer science degrees and launching the careers of a million new developers.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto text-left relative z-10">
        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">PRODUCTION TEAM</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
            Core <span className="text-gold italic font-bold">Collaborators</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamData.map((member, idx) => (
            <LuxuryCard key={member.id} accentColor="#D4AF37" index={idx}>
              <div className="aspect-square w-full overflow-hidden relative border-b border-white/5 mb-6 rounded-2xl">
                <img
                  src={member.avatar}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-[2px] text-gold font-mono block mb-1">{member.role}</span>
                <h4 className="font-serif text-lg font-bold text-white mb-3">{member.name}</h4>
                <p className="text-gray-400 text-xs leading-relaxed font-light">{member.bio}</p>
              </div>
            </LuxuryCard>
          ))}
        </div>
      </section>
    </div>
  );
};

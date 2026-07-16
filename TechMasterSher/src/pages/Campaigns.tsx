import React from "react";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import { LuxuryCard } from "../components/LuxuryCard";
import { mediaUrl } from "../utils/media";

export const Campaigns: React.FC = () => {
  const { campaignsData } = useData();
  return (
    <div className="relative text-white min-h-screen pt-24 pb-8 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-1/4 w-[35vw] h-[35vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="typo-badge mb-4"
        >
          INITIATIVE CAMPAIGNS
        </motion.div>
        
        <h1 className="typo-h1 mb-8">
          Empowerment Drives & <br />
          <span className="text-gold italic font-bold">Coding Challenges</span>.
        </h1>

        <p className="text-gray-400 font-light text-base md:text-lg max-w-2xl leading-relaxed mt-6">
          Review our campaigns designed to bring cloud services, laptops, coding bootcamps, and career mentoring to students globally.
        </p>
      </section>

      {/* Campaigns Grid */}
      <section className="max-w-7xl mx-auto text-left grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {campaignsData.map((item, idx) => (
          <LuxuryCard key={item.id} accentColor={item.accentColor} index={idx}>
            <div className="flex flex-col h-full justify-between">
              
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 mb-6 relative">
                <img
                  src={mediaUrl(item.coverImage) || mediaUrl(item.image) || mediaUrl(item.imageUrl)}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-black/80 border border-white/10 px-3 py-1 rounded-full text-[9px] uppercase tracking-[1px] font-mono text-gold">
                  Reach: {item.reach}
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] font-mono text-gold flex items-center gap-1.5 font-bold uppercase">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  Sponsor: {item.sponsor}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-mono text-gray-400 uppercase">
                  {item.status}
                </span>
              </div>

              <h3 className="font-serif text-2xl text-white font-medium mb-4 group-hover:text-gold transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed mb-6">
                {item.description}
              </p>

              <ul className="flex flex-col gap-2 pt-4 border-t border-white/5 mt-auto">
                {item.highlights.map((high: any, hidx: number) => (
                  <li key={hidx} className="flex items-start gap-2 text-[10px] text-gray-400">
                    <span>{high}</span>
                  </li>
                ))}
              </ul>
            </div>
          </LuxuryCard>
        ))}
      </section>

      {/* Campaign Lifecycle & Success */}
      <section className="max-w-7xl mx-auto mt-16 text-left relative z-10">
        <div className="text-center mb-16">
          <p className="typo-badge mb-4">OUR PROCESS</p>
          <h2 className="typo-h2 mb-6">
            End-to-End <span className="text-gold italic font-bold">Campaign Lifecycle</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="glass-panel p-8 rounded-2xl border-t border-white/5 hover:border-gold/30 transition-all duration-300">
            <h3 className="font-serif text-xl font-bold text-white mb-3">1. Campaign Planning</h3>
            <p className="typo-card-desc">
              We meticulously outline timelines, allocate resources, and define key performance indicators to ensure every initiative starts with a rock-solid foundation.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-2xl border-t border-white/5 hover:border-gold/30 transition-all duration-300">
            <h3 className="font-serif text-xl font-bold text-white mb-3">2. Campaign Strategy</h3>
            <p className="typo-card-desc">
              Crafting narrative arcs and selecting the right digital channels to guarantee maximum reach and resonance with the targeted developer demographic.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-2xl border-t border-white/5 hover:border-gold/30 transition-all duration-300">
            <h3 className="font-serif text-xl font-bold text-white mb-3">3. Campaign Execution</h3>
            <p className="typo-card-desc">
              From high-end video production to live hackathon moderation, our team handles the ground-level execution to bring the strategic vision to life flawlessly.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-2xl border-t border-white/5 hover:border-gold/30 transition-all duration-300">
            <h3 className="font-serif text-xl font-bold text-white mb-3">4. Analytics</h3>
            <p className="typo-card-desc">
              Real-time monitoring of engagement metrics, audience retention, and click-through rates allows us to pivot and optimize the campaign mid-flight.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-2xl border-t border-white/5 hover:border-gold/30 transition-all duration-300 lg:col-span-2">
            <h3 className="font-serif text-xl font-bold text-white mb-3">5. Results</h3>
            <p className="typo-card-desc">
              Delivering comprehensive post-campaign reports detailing ROI, brand lift, and total community impact against our initial benchmarks. We believe in absolute transparency and quantifiable outcomes.
            </p>
          </div>
        </div>

        {/* Client Success Stories */}
        <div className="text-center mb-12">
          <p className="typo-badge mb-4">PROVEN RESULTS</p>
          <h2 className="typo-h2 mb-6">
            Client <span className="text-gold italic font-bold">Success Stories</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full pointer-events-none group-hover:bg-gold/20 transition-colors duration-500" />
            <h3 className="font-serif text-2xl font-bold text-white mb-4">AWS Educate Drive</h3>
            <p className="typo-card-desc mb-6">
              By gamifying the learning process, we helped AWS register over 25,000 new student accounts in a single month. The campaign significantly lowered their standard customer acquisition cost while providing immense value to learners.
            </p>
            <span className="text-gold text-xs font-bold uppercase tracking-[2px] cursor-pointer hover:text-white transition-colors">Read Full Story &rarr;</span>
          </div>
          <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/10 rounded-bl-full pointer-events-none group-hover:bg-[#00E5FF]/20 transition-colors duration-500" />
            <h3 className="font-serif text-2xl font-bold text-white mb-4">MongoDB Hackathon</h3>
            <p className="typo-card-desc mb-6">
              A weekend-long virtual event that produced 500+ open-source database implementations. The campaign established MongoDB as the default backend choice for a new generation of full-stack bootcamps.
            </p>
            <span className="text-[#00E5FF] text-xs font-bold uppercase tracking-[2px] cursor-pointer hover:text-white transition-colors">Read Full Story &rarr;</span>
          </div>
        </div>
      </section>

    </div>
  );
};

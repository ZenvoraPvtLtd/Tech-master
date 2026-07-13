import React, { useState } from "react";
import { ArrowUpRight, BarChart3, TrendingUp, Users, ChevronRight, Target, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";
import blogsFallback from "../data/blogs.json";
import { LuxuryCard } from "../components/LuxuryCard";

interface StrategyPreset {
  impressions: string;
  channel: string;
  focus: string;
  roi: string;
  badge: string;
}

const strategyPresets: Record<string, StrategyPreset> = {
  solopreneur: {
    impressions: "50K - 100K+",
    channel: "Twitter/X, Dev.to & LinkedIn",
    focus: "Build in public, share raw learnings, create highly readable dev cheatsheets.",
    roi: "High authority, premium lead acquisition, and freelance/consulting pipelines.",
    badge: "Solo Creator"
  },
  startup: {
    impressions: "250K - 500K+",
    channel: "GitHub, Medium, Tech Newsletters",
    focus: "Detailed technical case studies, comparisons, integration guides, and live streams.",
    roi: "Product signups, community growth, and developer-led feedback loops.",
    badge: "Growth Startup"
  },
  enterprise: {
    impressions: "1M - 5M+",
    channel: "YouTube Documentaries, Dedicated Hubs, Tech Pods",
    focus: "High-production whitepapers, engineering-led media channels, developer advocacy.",
    roi: "Market standard positioning, enterprise adoption, and elite talent hiring.",
    badge: "Enterprise Brand"
  }
};

const categories = [
  "All",
  "Lifestyle",
  "Marketing",
  "Branding",
  "Creator Journey",
  "Tips",
  "Latest News"
];

export const Blog: React.FC = () => {
  const { blogsData } = useData();
  const blogsList = blogsData && blogsData.length > 0 ? blogsData : blogsFallback;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeStrategy, setActiveStrategy] = useState("solopreneur");

  const filteredBlogs = selectedCategory === "All"
    ? blogsList
    : blogsList.filter(post => post.category === selectedCategory);

  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-1/4 w-[35vw] h-[35vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          CREATOR JOURNAL
        </motion.div>
        
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight mb-8">
          Thoughts on Tech <br />
          <span className="text-gold italic font-bold">education & scalability</span>.
        </h1>
      </section>

      {/* Content Marketing Section */}
      <section className="max-w-7xl mx-auto mb-24 relative z-10 text-left">
        <div className="border border-white/5 bg-black/40 backdrop-blur-md rounded-3xl p-8 md:p-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-3 flex items-center gap-2">
                <Target className="w-3.5 h-3.5" />
                Featured Strategy
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-white leading-snug">
                Engineering <span className="text-gold font-bold italic">Content Marketing</span> Excellence
              </h2>
              <p className="text-gray-400 text-sm max-w-2xl mt-4 font-light leading-relaxed">
                Traditional advertising has diminishing returns. We help engineering brands build market authority through high-utility technical content, storytelling, and high-impact distribution loops.
              </p>
            </div>
            
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-10">
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-serif text-gold font-bold">10M+</div>
                <div className="text-[9px] text-gray-500 uppercase tracking-widest font-mono mt-1">Impressions</div>
              </div>
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-serif text-gold font-bold">+150%</div>
                <div className="text-[9px] text-gray-500 uppercase tracking-widest font-mono mt-1">Engagement</div>
              </div>
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-serif text-gold font-bold">4.8x</div>
                <div className="text-[9px] text-gray-500 uppercase tracking-widest font-mono mt-1">Content ROI</div>
              </div>
            </div>
          </div>

          {/* Pillars and Strategy Planner Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Core Pillars */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: <Users className="w-5 h-5 text-gold" />,
                    title: "Audience Retention",
                    desc: "Translate complex system architecture into clean narratives."
                  },
                  {
                    icon: <BarChart3 className="w-5 h-5 text-gold" />,
                    title: "Search Dominance",
                    desc: "Rank first for high-intent queries that developers actually search."
                  },
                  {
                    icon: <TrendingUp className="w-5 h-5 text-gold" />,
                    title: "Distribution Loops",
                    desc: "Syndicate deep-dives into social threads, shorts, and digests."
                  }
                ].map((pillar, index) => (
                  <div key={index} className="border border-white/5 bg-white/[0.02] p-6 rounded-2xl flex flex-col justify-between hover:border-white/10 transition-colors">
                    <div>
                      <div className="mb-4 bg-gold/10 w-9 h-9 rounded-xl flex items-center justify-center">
                        {pillar.icon}
                      </div>
                      <h4 className="font-sans text-sm font-semibold text-white mb-2">{pillar.title}</h4>
                    </div>
                    <p className="text-gray-400 text-xs font-light leading-relaxed mt-2">{pillar.desc}</p>
                  </div>
                ))}
              </div>

              {/* Quick Strategy Blueprint */}
              <div className="border border-white/5 bg-white/[0.01] p-6 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex gap-4 items-center">
                  <div className="bg-gold/10 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-gold" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-sans text-xs font-semibold text-white uppercase tracking-wider">Need a custom playbook?</h4>
                    <p className="text-gray-400 text-xs font-light mt-0.5">Learn how we craft tailored content programs for developer-first companies.</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-gold uppercase tracking-[1.5px] whitespace-nowrap flex items-center gap-1 hover:text-white transition-colors duration-300">
                  Read Guide <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Strategy Planner */}
            <div className="lg:col-span-5 border border-white/5 bg-white/[0.02] rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  <span className="text-[10px] text-gray-400 font-mono uppercase tracking-[2px]">Reach & ROI Estimator</span>
                </div>
                
                {/* Toggles */}
                <div className="flex bg-black/40 p-1 rounded-xl gap-1 mb-6 border border-white/5">
                  {Object.keys(strategyPresets).map((presetKey) => (
                    <button
                      key={presetKey}
                      onClick={() => setActiveStrategy(presetKey)}
                      className={`flex-1 text-[10px] sm:text-xs font-semibold py-2 rounded-lg transition-all duration-300 ${
                        activeStrategy === presetKey
                          ? "bg-gold text-black shadow-lg shadow-gold/10"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {strategyPresets[presetKey].badge}
                    </button>
                  ))}
                </div>

                {/* Estimate details */}
                <div className="space-y-4 text-left">
                  <div>
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono block">Estimated Monthly Reach</span>
                    <div className="text-2xl sm:text-3xl font-serif text-white font-bold mt-1">
                      {strategyPresets[activeStrategy].impressions}
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono block">Primary Channels</span>
                    <span className="text-xs text-gold font-mono block mt-1">
                      {strategyPresets[activeStrategy].channel}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono block">Content Focus</span>
                    <p className="text-xs text-gray-300 leading-relaxed font-light mt-1">
                      {strategyPresets[activeStrategy].focus}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer row inside planner */}
              <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center">
                <span className="text-[9px] text-gray-500 uppercase font-mono">ROI: {strategyPresets[activeStrategy].roi.split(",")[0]}</span>
                <span className="text-[10px] text-gold uppercase tracking-[1px] font-bold">Strategy Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Blog Hub */}
      <section className="max-w-7xl mx-auto text-left relative z-10 mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-6 mb-10 gap-6">
          <div>
            <h2 className="font-serif text-3xl font-light">Latest Insights</h2>
            <p className="text-gray-400 text-xs mt-1 font-light">Browse thoughts, guides, and updates from the team</p>
          </div>
          
          {/* Category Filter Bar */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gold text-black font-semibold border border-gold"
                    : "bg-white/[0.03] border border-white/5 hover:border-white/20 text-gray-300 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog List Grid */}
      <section className="max-w-7xl mx-auto text-left relative z-10">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
            <p className="text-gray-400 text-sm">No articles found in this category.</p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="text-gold text-xs uppercase tracking-[1.5px] font-bold mt-4 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredBlogs.map((post, idx) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="h-full"
                >
                  <LuxuryCard accentColor="#D4AF37" index={idx}>
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="aspect-video w-full overflow-hidden border-b border-white/5 relative rounded-2xl mb-6">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                            data-cursor="read"
                          />
                        </div>

                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[9px] font-mono text-gold font-bold uppercase tracking-[1px]">{post.category || post.tags[0]}</span>
                          <span className="text-[9px] text-gray-400 font-mono uppercase">{post.date}</span>
                        </div>

                        <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold transition-colors duration-300 mb-3 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 flex justify-between items-center border-t border-white/5 mt-auto">
                        <span className="text-[10px] text-gray-400 uppercase tracking-[1px]">{post.readTime}</span>
                        <button className="text-gold group-hover:text-white transition-colors duration-300 flex items-center gap-1 text-xs font-bold uppercase tracking-[1.5px]">
                          Read Article
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </LuxuryCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </div>
  );
};

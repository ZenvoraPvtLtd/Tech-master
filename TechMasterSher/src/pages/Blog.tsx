import React, { useState, useEffect } from "react";
import { ArrowUpRight, Users, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";
import { LuxuryCard } from "../components/LuxuryCard";
import { mediaUrl } from "../utils/media";

interface BlogProps {
  onChangePage?: (pageId: string) => void;
}

export const Blog: React.FC<BlogProps> = ({ onChangePage }) => {
  const { 
    blogsData, 
    blogHeroData, 
    featuredStrategyData, 
    strategyStatsData, 
    strategyPillarsData, 
    strategyPresetsData, 
    blogCategoriesData, 
    latestInsightsData, 
    blogPageSettingsData, 
  } = useData();

  const blogsList = blogsData || [];
  
  // Settings with defaults
  const showHero = blogPageSettingsData?.showHero !== false;
  const showStrategy = blogPageSettingsData?.showStrategy !== false;
  const showLatest = blogPageSettingsData?.showLatest !== false;
  const showFilters = blogPageSettingsData?.showFilters !== false;

  const categories = (blogCategoriesData && blogCategoriesData.length > 0)
    ? [{ name: "All" }, ...blogCategoriesData.filter((c:any) => c.active !== false)]
    : [{ name: "All" }, { name: "Lifestyle" }, { name: "Marketing" }];

  const presets = (strategyPresetsData && strategyPresetsData.length > 0) 
    ? strategyPresetsData.filter((p:any) => p.active !== false)
    : [];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeStrategy, setActiveStrategy] = useState<string>("");

  useEffect(() => {
    if (presets.length > 0 && !activeStrategy) {
      setActiveStrategy(presets[0].presetName || presets[0].id);
    }
  }, [presets, activeStrategy]);

  const activePresetItem = presets.find((p:any) => p.presetName === activeStrategy || p.id === activeStrategy) || presets[0] || {};

  const filteredBlogs = selectedCategory === "All"
    ? blogsList.filter(post => post.active !== false && post.status !== "draft")
    : blogsList.filter(post => post.active !== false && post.status !== "draft" && post.category === selectedCategory);

  return (
    <div className="relative text-white min-h-screen pt-24 pb-8 px-6 overflow-hidden">
      {/* Background Glow */}
      {blogHeroData?.glowEnabled !== false && (
        <>
          <div className="absolute top-1/4 right-1/4 w-[35vw] h-[35vw] aurora-glow-purple opacity-20 pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />
        </>
      )}

      {/* Hero Header */}
      {showHero && blogHeroData?.active !== false && (
        <section className="max-w-7xl mx-auto text-left mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="typo-badge mb-4"
          >
            {blogHeroData?.badge || "CREATOR JOURNAL"}
          </motion.div>
          
          <h1 className="typo-h1 mb-8" dangerouslySetInnerHTML={{ __html: blogHeroData?.titleLine1 + '<br/>' + (blogHeroData?.titleLine2 ? `<span class="text-gold italic font-bold">${blogHeroData.titleLine2}</span>` : '') }}>
          </h1>
        </section>
      )}

      {/* Content Marketing Section / Strategy Builder */}
      {showStrategy && featuredStrategyData?.active !== false && (
        <section className="max-w-7xl mx-auto mb-12 relative z-10 text-left">
          <div className="border border-white/5 bg-black/40 backdrop-blur-md rounded-3xl p-8 md:p-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="typo-badge mb-3 flex items-center gap-2">
                  <Target className="w-3.5 h-3.5" />
                  {featuredStrategyData?.badge || "Featured Strategy"}
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl font-light text-white leading-snug">
                  {featuredStrategyData?.titleLine1} <span className="text-gold font-bold italic">{featuredStrategyData?.titleLine2}</span> {featuredStrategyData?.titleLine3}
                </h2>
                <p className="text-gray-400 text-sm max-w-2xl mt-4 font-light leading-relaxed">
                  {featuredStrategyData?.description}
                </p>
              </div>
              
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-6 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-10">
                {(strategyStatsData || []).filter((s:any) => s.active !== false).map((stat:any, idx:number) => (
                  <div key={idx} className="text-left">
                    <div className="text-xl sm:text-2xl font-serif text-gold font-bold">{stat.number}</div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-widest font-mono mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pillars and Strategy Planner Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Core Pillars */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(strategyPillarsData || []).filter((p:any) => p.active !== false).map((pillar:any, index:number) => (
                    <div key={index} className="border border-white/5 bg-white/[0.02] p-6 rounded-2xl flex flex-col justify-between hover:border-white/10 transition-colors">
                      <div>
                        <div className="mb-4 bg-gold/10 w-9 h-9 rounded-xl flex items-center justify-center">
                          <Users className="w-5 h-5 text-gold" />
                        </div>
                        <h4 className="font-sans text-sm font-semibold text-white mb-2">{pillar.title}</h4>
                      </div>
                      <p className="text-gray-400 text-xs font-light leading-relaxed mt-2">{pillar.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Strategy Planner */}
              {presets.length > 0 && (
                <div className="lg:col-span-5 border border-white/5 bg-white/[0.02] rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                      <span className="text-[10px] text-gray-400 font-mono uppercase tracking-[2px]">Reach & ROI Estimator</span>
                    </div>
                    
                    {/* Toggles */}
                    <div className="flex bg-black/40 p-1 rounded-xl gap-1 mb-6 border border-white/5">
                      {presets.map((preset:any) => (
                        <button
                          key={preset.presetName || preset.id}
                          onClick={() => setActiveStrategy(preset.presetName || preset.id)}
                          className={`flex-1 text-[10px] sm:text-xs font-semibold py-2 rounded-lg transition-all duration-300 ${
                            activeStrategy === (preset.presetName || preset.id)
                              ? "bg-gold text-black shadow-lg shadow-gold/10"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          {preset.badge}
                        </button>
                      ))}
                    </div>

                    {/* Estimate details */}
                    <div className="space-y-4 text-left">
                      <div>
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono block">Estimated Monthly Reach</span>
                        <div className="text-2xl sm:text-3xl font-serif text-white font-bold mt-1">
                          {activePresetItem.impressions}
                        </div>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono block">Primary Channels</span>
                        <span className="text-xs text-gold font-mono block mt-1">
                          {activePresetItem.channel}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono block">Content Focus</span>
                        <p className="text-xs text-gray-300 leading-relaxed font-light mt-1">
                          {activePresetItem.focus}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer row inside planner */}
                  <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center">
                    <span className="text-[9px] text-gray-500 uppercase font-mono">ROI: {activePresetItem.roi}</span>
                    <span className="text-[10px] text-gold uppercase tracking-[1px] font-bold">Strategy Verified</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Blog Hub */}
      {showLatest && (
        <section className="max-w-7xl mx-auto text-left relative z-10 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-6 mb-10 gap-6">
            <div>
              <h2 className="font-serif text-3xl font-light">{latestInsightsData?.title || "Latest Insights"}</h2>
              <p className="text-gray-400 text-xs mt-1 font-light">{latestInsightsData?.subtitle || "Browse thoughts, guides, and updates from the team"}</p>
            </div>
            
            {/* Category Filter Bar */}
            {showFilters && (
              <div className="flex flex-wrap gap-2">
                {categories.map((category:any) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-4 py-2 rounded-full text-xs transition-all duration-300 ${
                      selectedCategory === category.name
                        ? "bg-gold text-black font-semibold border border-gold"
                        : "bg-white/[0.03] border border-white/5 hover:border-white/20 text-gray-300 hover:text-white"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

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
                  key={post.id || post.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="h-full"
                >
                  <LuxuryCard accentColor="#D4AF37" index={idx}>
                    <div onClick={() => onChangePage && onChangePage(`blog-details/${post.slug || post.id}`)} className="flex flex-col h-full justify-between block w-full h-full cursor-pointer relative z-20">
                      <div>
                        <div className="aspect-video w-full overflow-hidden border-b border-white/5 relative rounded-2xl mb-6">
                          <img
                            src={mediaUrl(post.coverImage) || mediaUrl(post.image) || mediaUrl(post.imageUrl) || ""}
                            alt={post.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                            data-cursor="read"
                          />
                        </div>

                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[9px] font-mono text-gold font-bold uppercase tracking-[1px]">{post.category || (post.tags && post.tags[0])}</span>
                          <span className="text-[9px] text-gray-400 font-mono uppercase">{post.publishDate || post.date}</span>
                        </div>

                        <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold transition-colors duration-300 mb-3 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 flex justify-between items-center border-t border-white/5 mt-auto pointer-events-none">
                        <span className="text-[10px] text-gray-400 uppercase tracking-[1px]">{post.readTime}</span>
                        <div className="text-gold group-hover:text-white transition-colors duration-300 flex items-center gap-1 text-xs font-bold uppercase tracking-[1.5px]">
                          Read Article
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
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

import React, { useState, useEffect } from 'react';
import { 
  Home, Video, Film, Sparkles, Award, Users, Share2, Mail, Save, Plus, 
  Trash2, Eye, EyeOff, Edit2, Check, AlertCircle, RefreshCw, Upload, Image, Navigation, Star
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

export const Homepage = () => {
  const { db, updateSection } = useDatabase();
  const [activeTab, setActiveTab] = useState('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const defaultHomepage = {
    hero: {
      title: "TECH MASTER",
      subtitle: "WHERE INFLUENCE MEETS INDUSTRY",
      tagline: "India's Premier Tech & Media Powerhouse",
      videoUrl: "",
      primaryCtaText: "Explore Work",
      primaryCtaUrl: "portfolio",
      secondaryCtaText: "Let's Collaborate",
      secondaryCtaUrl: "contact",
      heroImage: ""
    },
    channelTicker: {
      subtitle: "We're just getting started / Five channels today. A Media Empire in Motion.",
      channels: [
        { id: "ch-1", brandName: "Tech Master", stats: "33M Subs on YT | 5.8M Followers on IG", popular: "195M (Short), 219M (Reel)", logo: "" },
        { id: "ch-2", brandName: "Next Univerz", stats: "5.5M Subs on YT", popular: "88M (Shorts), 4.6M (Long)", logo: "" },
        { id: "ch-3", brandName: "Master Wheels", stats: "4.6M Subs on YT | 1.2M Followers on IG", popular: "1.7M (Long), 148M (Short)", logo: "" },
        { id: "ch-4", brandName: "Full Circle", stats: "300K Subs", popular: "2M (Short)", logo: "" },
        { id: "ch-5", brandName: "Trendz Talk", stats: "15K Followers", popular: "4.8M (Reel)", logo: "" }
      ]
    },
    coreValues: [
      { id: "cv-1", title: "Fearless Energy", description: "Pushing creative boundaries with unyielding momentum and passion.", icon: "Zap" },
      { id: "cv-2", title: "Obsessive Craft", description: "Meticulous attention to storytelling, visual fidelity, and audio precision.", icon: "Sparkles" },
      { id: "cv-3", title: "Cultural Shift", description: "Defining consumer trends and shaping the future of digital tech media.", icon: "Globe" }
    ],
    founder: {
      tag: "FOUNDER & CREATIVE DIRECTOR",
      name: "Abhishek Sher",
      title: "Tech Master",
      quote: "Creating digital media empires that inspire millions across the globe.",
      bio: "Pioneering high-impact technology storytelling, automotive reviews, and luxury lifestyle content.",
      image: ""
    },
    statistics: [
      { id: "st-1", number: 45, suffix: "M+", label: "SUBSCRIBERS & FOLLOWERS", prefix: "" },
      { id: "st-2", number: 12, suffix: "B+", label: "TOTAL ORGANIC VIEWS", prefix: "" },
      { id: "st-3", number: 50, suffix: "+", label: "GLOBAL BRAND PARTNERS", prefix: "" },
      { id: "st-4", number: 5, suffix: "", label: "PROPRIETARY CHANNELS", prefix: "" }
    ],
    reelsCarousel: [
      { id: "reel-1", title: "ASUS ROG Beast Unboxing", views: "195M Views", videoUrl: "", thumbnail: "", category: "Unboxing" },
      { id: "reel-2", title: "Tesla Supercharging Reality", views: "219M Views", videoUrl: "", thumbnail: "", category: "Automotive" },
      { id: "reel-3", title: "iPhone Ultra Secret Prototype", views: "88M Views", videoUrl: "", thumbnail: "", category: "Tech" }
    ],
    longVideosCarousel: [
      { id: "vid-1", title: "Building an Empire from Scratch", channel: "Tech Master", views: "4.6M Views", duration: "18:42", videoUrl: "", thumbnail: "" },
      { id: "vid-2", title: "Master Wheels Bugatti Supercar Drive", channel: "Master Wheels", views: "1.7M Views", duration: "24:15", videoUrl: "", thumbnail: "" }
    ],
    brandCollaborations: [
      { id: "brand-1", name: "ASUS", logo: "" },
      { id: "brand-2", name: "DELL", logo: "" },
      { id: "brand-3", name: "Flipkart", logo: "" },
      { id: "brand-4", name: "OnePlus", logo: "" },
      { id: "brand-5", name: "Samsung", logo: "" }
    ],
    newsletter: {
      badge: "STAY IN THE LOOP",
      title: "Join the Media Revolution",
      description: "Receive exclusive insights, brand collaboration opportunities, and tech updates straight to your inbox.",
      buttonText: "Subscribe Now"
    }
  };

  const [homepageState, setHomepageState] = useState(() => {
    return db?.homepage ? { ...defaultHomepage, ...db.homepage } : defaultHomepage;
  });

  useEffect(() => {
    if (db?.homepage) {
      setHomepageState((prev) => ({ ...defaultHomepage, ...db.homepage }));
    }
  }, [db?.homepage]);

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMsg('');
    try {
      await updateSection('homepage', homepageState);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save homepage');
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (path, value) => {
    setHomepageState((prev) => {
      const keys = path.split('.');
      const updated = { ...prev };
      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const tabs = [
    { id: 'hero', label: '1. Hero Section', icon: Home },
    { id: 'ticker', label: '2. Channel Ticker', icon: Share2 },
    { id: 'values', label: '3. Core Values', icon: Sparkles },
    { id: 'founder', label: '4. Founder Section', icon: Award },
    { id: 'stats', label: '5. Statistics', icon: Users },
    { id: 'reels', label: '6. Short Videos (Reels)', icon: Film },
    { id: 'longVids', label: '7. Long Videos', icon: Video },
    { id: 'brands', label: '8. Brand Collaborations', icon: Star },
    { id: 'newsletter', label: '9. Newsletter', icon: Mail }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-white font-sans">
      {/* Top Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl backdrop-blur-xl shadow-2xl">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
              <Home className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold font-serif text-amber-400">Homepage CMS Control Center</h1>
          </div>
          <p className="text-zinc-400 text-xs font-mono">
            Direct 1:1 Editor for every section visible on the TechMaster Homepage
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-semibold">
              <Check className="w-4 h-4" /> Published to Website
            </div>
          )}
          {errorMsg && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-xs">
              <AlertCircle className="w-4 h-4" /> {errorMsg}
            </div>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Publishing..." : "Save Homepage Changes"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 border ${
                isActive
                  ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-md shadow-amber-500/10'
                  : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl space-y-6">

        {/* TAB 1: HERO */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-amber-400 font-serif flex items-center gap-2">
              <Home className="w-5 h-5" /> HERO SECTION CMS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase text-zinc-400 block">Main Hero Title</label>
                <input
                  type="text"
                  value={homepageState.hero?.title || ""}
                  onChange={(e) => updateField('hero.title', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-serif text-lg"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-mono uppercase text-zinc-400 block">Subtitle / Highlight Tagline</label>
                <input
                  type="text"
                  value={homepageState.hero?.subtitle || ""}
                  onChange={(e) => updateField('hero.subtitle', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-amber-400 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="space-y-3 md:col-span-2">
                <label className="text-xs font-mono uppercase text-zinc-400 block">Hero Tagline Description</label>
                <textarea
                  rows={3}
                  value={homepageState.hero?.tagline || homepageState.hero?.description || ""}
                  onChange={(e) => updateField('hero.tagline', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-mono uppercase text-zinc-400 block">Background Video URL (MP4)</label>
                <input
                  type="text"
                  value={homepageState.hero?.videoUrl || ""}
                  onChange={(e) => updateField('hero.videoUrl', e.target.value)}
                  placeholder="https://res.cloudinary.com/... or gradient.mp4"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-amber-300 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Primary CTA Text</label>
                  <input
                    type="text"
                    value={homepageState.hero?.primaryCtaText || "Explore Work"}
                    onChange={(e) => updateField('hero.primaryCtaText', e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Primary CTA Link</label>
                  <input
                    type="text"
                    value={homepageState.hero?.primaryCtaUrl || "portfolio"}
                    onChange={(e) => updateField('hero.primaryCtaUrl', e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-amber-400 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CHANNEL TICKER */}
        {activeTab === 'ticker' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-amber-400 font-serif flex items-center gap-2">
              <Share2 className="w-5 h-5" /> MOVING CHANNEL TICKER CMS (5 CHANNELS)
            </h2>

            <div className="space-y-3">
              <label className="text-xs font-mono uppercase text-zinc-400 block">Ticker Subtitle Tagline</label>
              <input
                type="text"
                value={homepageState.channelTicker?.subtitle || ""}
                onChange={(e) => updateField('channelTicker.subtitle', e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-amber-400 font-mono"
              />
            </div>

            <div className="space-y-4 pt-3">
              {homepageState.channelTicker?.channels?.map((ch, idx) => (
                <div key={ch.id || idx} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Channel Name</label>
                    <input
                      type="text"
                      value={ch.brandName}
                      onChange={(e) => {
                        const updated = [...homepageState.channelTicker.channels];
                        updated[idx].brandName = e.target.value;
                        updateField('channelTicker.channels', updated);
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-amber-400 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Subscriber / Follower Stats</label>
                    <input
                      type="text"
                      value={ch.stats}
                      onChange={(e) => {
                        const updated = [...homepageState.channelTicker.channels];
                        updated[idx].stats = e.target.value;
                        updateField('channelTicker.channels', updated);
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Most Popular Record</label>
                    <input
                      type="text"
                      value={ch.popular}
                      onChange={(e) => {
                        const updated = [...homepageState.channelTicker.channels];
                        updated[idx].popular = e.target.value;
                        updateField('channelTicker.channels', updated);
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CORE VALUES */}
        {activeTab === 'values' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-amber-400 font-serif flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> CORE VALUES ("HOW WE MOVE") CMS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {homepageState.coreValues?.map((val, idx) => (
                <div key={val.id || idx} className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Value Title</label>
                    <input
                      type="text"
                      value={val.title}
                      onChange={(e) => {
                        const updated = [...homepageState.coreValues];
                        updated[idx].title = e.target.value;
                        updateField('coreValues', updated);
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-amber-400 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={val.description}
                      onChange={(e) => {
                        const updated = [...homepageState.coreValues];
                        updated[idx].description = e.target.value;
                        updateField('coreValues', updated);
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: FOUNDER SECTION */}
        {activeTab === 'founder' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-amber-400 font-serif flex items-center gap-2">
              <Award className="w-5 h-5" /> FOUNDER SPOTLIGHT CMS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase text-zinc-400 block">Founder Name</label>
                <input
                  type="text"
                  value={homepageState.founder?.name || "Abhishek Sher"}
                  onChange={(e) => updateField('founder.name', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-white font-serif text-lg"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-mono uppercase text-zinc-400 block">Tag / Title</label>
                <input
                  type="text"
                  value={homepageState.founder?.tag || "FOUNDER & CREATIVE DIRECTOR"}
                  onChange={(e) => updateField('founder.tag', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-amber-400 font-mono"
                />
              </div>

              <div className="space-y-3 md:col-span-2">
                <label className="text-xs font-mono uppercase text-zinc-400 block">Featured Quote</label>
                <textarea
                  rows={2}
                  value={homepageState.founder?.quote || ""}
                  onChange={(e) => updateField('founder.quote', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs text-amber-300 font-serif"
                />
              </div>

              <div className="space-y-3 md:col-span-2">
                <label className="text-xs font-mono uppercase text-zinc-400 block">Founder Biography</label>
                <textarea
                  rows={3}
                  value={homepageState.founder?.bio || ""}
                  onChange={(e) => updateField('founder.bio', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-300"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: STATISTICS COUNTER */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-amber-400 font-serif flex items-center gap-2">
              <Users className="w-5 h-5" /> STATISTICS COUNTER CMS
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {homepageState.statistics?.map((st, idx) => (
                <div key={st.id || idx} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Label</label>
                    <input
                      type="text"
                      value={st.label}
                      onChange={(e) => {
                        const updated = [...homepageState.statistics];
                        updated[idx].label = e.target.value;
                        updateField('statistics', updated);
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white uppercase font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Number</label>
                      <input
                        type="number"
                        value={st.number}
                        onChange={(e) => {
                          const updated = [...homepageState.statistics];
                          updated[idx].number = Number(e.target.value);
                          updateField('statistics', updated);
                        }}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-amber-400 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Suffix</label>
                      <input
                        type="text"
                        value={st.suffix}
                        onChange={(e) => {
                          const updated = [...homepageState.statistics];
                          updated[idx].suffix = e.target.value;
                          updateField('statistics', updated);
                        }}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

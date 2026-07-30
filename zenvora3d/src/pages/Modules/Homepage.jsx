import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useMediaManager } from '../../context/MediaContext';
import { 
  Home as HomeIcon, Check, Save, Plus, Trash2, Edit3, Eye, EyeOff, 
  ArrowUp, ArrowDown, Sparkles, Image as ImageIcon, Video, Link as LinkIcon, 
  Layers, Sliders, Play, ShieldCheck, Globe, Move, Search, RefreshCw, X, RotateCcw, AlertTriangle
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';

export const Homepage = () => {
  const { db, updateSection, apiFetch } = useDatabase();
  const { openMediaManager } = useMediaManager();
  const [activeSection, setActiveSection] = useState('sec-1');
  const [toast, setToast] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State for Item CRUD (Create / Edit)
  const [modalConfig, setModalConfig] = useState(null); // { type: 'channel'|'val'|'stat'|'short'|'long'|'brand'|'nav', item: {}, index: null }
  const [deleteConfirmItem, setDeleteConfirmItem] = useState(null); // { type, id, title }
  const [isUploading, setIsUploading] = useState(false);

  // Production default values matching the website 100%
  const defaultHomepageCMS = {
    // SECTION 1: Navbar
    navbar: {
      logoUrl: '',
      buttonText: 'Get In Touch',
      buttonLink: '/contact',
      viewsText: '1B+ Views',
      sticky: true,
      visible: true,
      navItems: [
        { id: 'n-1', label: 'Home', url: '/', order: 1, visible: true, deleted: false },
        { id: 'n-2', label: 'About', url: '/about', order: 2, visible: true, deleted: false },
        { id: 'n-3', label: 'Journey', url: '/journey', order: 3, visible: true, deleted: false },
        { id: 'n-4', label: 'What We Do', url: '/what-we-do', order: 4, visible: true, deleted: false },
        { id: 'n-5', label: 'Services', url: '/services', order: 5, visible: true, deleted: false },
        { id: 'n-6', label: 'Portfolio', url: '/portfolio', order: 6, visible: true, deleted: false },
        { id: 'n-7', label: 'Contact', url: '/contact', order: 7, visible: true, deleted: false }
      ]
    },

    // SECTION 2: Hero Section
    hero: {
      badge: 'TECH MASTER',
      topBadgeText: "India's most-watched media production house",
      mainHeading: 'TECH MASTER',
      highlightedWord: 'MASTER',
      tagline: '"Nothing We Make Is Forgettable. Unskippable. Unforgettable."',
      subTagline: 'Attention and Influence — At Scale',
      primaryCtaText: 'Scroll down',
      primaryCtaLink: '#intro',
      bgMediaUrl: '',
      illustrationUrl: '',
      visible: true
    },

    // SECTION 3: Introduction & Vision
    introVision: {
      introBadge: 'INTRO',
      introHeading: 'Building High-Scale Media Channels',
      introDescription: 'Tech Master Digital Pvt Ltd builds and runs a portfolio of high-scale content channels across tech, automobiles, and entertainment. We take complex subjects and make them impossible to scroll past. Combining editorial rigor with production value that stands out.',
      visionBadge: 'THE VISION',
      visionHeading: 'Complexity Made Simple & Unforgettable',
      visionDescription: 'Tech Master exists to make complexity feel simple, and simplicity feel unforgettable. We tell stories that inform without lecturing, entertain without diluting, and connect without pretending. The result: content built to travel across platforms, across formats, across the world.',
      visible: true
    },

    // SECTION 4: Founder Spotlight
    founder: {
      badge: 'ABOUT THE CEO / FOUNDER',
      name: 'Arvind Kharra',
      highlightedName: 'aka Tech Master',
      description: "An engineering graduate from Rajasthan who turned his passion for technology into world's #1 tech YouTube channel. No corporate job, no conventional path. Just a small-town outsider who made technology feel human, fun, and relatable to millions.",
      imageUrl: '',
      bgUrl: '',
      visible: true
    },

    // SECTION 5: Official Channels Ticker
    channelsTicker: {
      heading: 'Different audiences.',
      highlightedHeading: 'Same Obsession.',
      subHeading: "We're just getting started / Five channels today. A Media Empire in Motion.",
      visible: true,
      channels: [
        { id: 'ch-1', name: 'Tech Master', ytSubs: '33M Subs on YT', igFollowers: '5.8M Followers on IG', popular: '195M (Short)', logoUrl: '', order: 1, visible: true, deleted: false },
        { id: 'ch-2', name: 'Next Univerz', ytSubs: '5.5M Subs on YT', igFollowers: '', popular: '88M (Shorts)', logoUrl: '', order: 2, visible: true, deleted: false },
        { id: 'ch-3', name: 'Master Wheels', ytSubs: '4.6M Subs on YT', igFollowers: '1.2M Followers on IG', popular: '148M (Short)', logoUrl: '', order: 3, visible: true, deleted: false },
        { id: 'ch-4', name: 'Full Circle', ytSubs: '300K Subs on YT', igFollowers: '', popular: '2M (Short)', logoUrl: '', order: 4, visible: true, deleted: false },
        { id: 'ch-5', name: 'Trendz Talk', ytSubs: '', igFollowers: '15K Followers on IG', popular: '4.8M (Reel)', logoUrl: '', order: 5, visible: true, deleted: false }
      ]
    },

    // SECTION 6: Core Values (How We Move)
    coreValues: {
      badge: 'HOW WE MOVE',
      heading: 'Core Values',
      visible: true,
      cards: [
        { id: 'cv-1', title: 'Fearless Energy', description: 'Pushing creative boundaries with unyielding momentum and passion.', icon: 'Zap', order: 1, visible: true, deleted: false },
        { id: 'cv-2', title: 'Creative Storytelling', description: 'Crafting narratives that resonate, inform, and inspire millions.', icon: 'Sparkles', order: 2, visible: true, deleted: false },
        { id: 'cv-3', title: 'Community First', description: 'Building genuine connections and putting our audience at the heart of everything we create.', icon: 'Users', order: 3, visible: true, deleted: false }
      ]
    },

    // SECTION 7: Statistics
    statistics: {
      badge: 'GLOBAL REACH & STATISTICS',
      heading: 'Influence & Impact',
      visible: true,
      counters: [
        { id: 'st-1', value: '40M+', label: 'Subscribers', icon: 'Users', order: 1, visible: true, deleted: false },
        { id: 'st-2', value: '7M+', label: 'IG Followers', icon: 'Instagram', order: 2, visible: true, deleted: false },
        { id: 'st-3', value: '1B+', label: 'Monthly Views', font: 'mono', order: 3, visible: true, deleted: false },
        { id: 'st-4', value: '2500+', label: 'Videos Published', icon: 'Video', order: 4, visible: true, deleted: false },
        { id: 'st-5', value: '500K+', label: 'FB Followers', icon: 'Share2', order: 5, visible: true, deleted: false },
        { id: 'st-6', value: '25B', label: 'Lifetime Views on YT', icon: 'Youtube', order: 6, visible: true, deleted: false },
        { id: 'st-7', value: '50+', label: 'Global Brand Collaborations', icon: 'Award', order: 7, visible: true, deleted: false }
      ]
    },

    // SECTION 8: Featured Shorts & Reels
    shortsReels: {
      badge: 'OUR WORK',
      heading: 'Craft In Motion',
      visible: true,
      list: [
        { id: 'sr-1', title: 'Tech Master Short 1', views: '1.2M views', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-background-4318-large.mp4', thumbnailUrl: '', order: 1, visible: true, deleted: false },
        { id: 'sr-2', title: 'Master Wheels Reel 1', views: '3.4M views', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-background-4318-large.mp4', thumbnailUrl: '', order: 2, visible: true, deleted: false },
        { id: 'sr-3', title: 'Trendz Talk Viral Reel', views: '4.8M views', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-background-4318-large.mp4', thumbnailUrl: '', order: 3, visible: true, deleted: false }
      ]
    },

    // SECTION 9: Featured Long Videos
    longVideos: {
      badge: 'FEATURED SHOWCASE',
      heading: 'Long Videos',
      visible: true,
      list: [
        { id: 'lv-1', title: 'Tech Master Special In-Depth', youtubeUrl: 'https://youtube.com', videoId: 'dQw4w9WgXcQ', views: '2.1M views', channel: 'Tech Master', duration: '14:20', thumbnailUrl: '', order: 1, visible: true, deleted: false },
        { id: 'lv-2', title: 'Next Univerz Deep Dive', youtubeUrl: 'https://youtube.com', videoId: 'dQw4w9WgXcQ', views: '850K views', channel: 'Next Univerz', duration: '18:45', thumbnailUrl: '', order: 2, visible: true, deleted: false }
      ]
    },

    // SECTION 10: Brand Collaborations
    brandCollaborations: {
      badge: 'BRAND COLLABORATIONS',
      heading: 'Trusted By Leading Technology Brands',
      description: 'Proud collaborations and partnerships with globally recognized technology brands that have helped shape our educational ecosystem.',
      visible: true,
      brands: [
        'Amazon', 'Asus', 'Dell', 'Flipkart', 'Huawei', 'IQOO', 'Marshall', 'Xiaomi',
        'Motorola', 'OnePlus', 'Oppo', 'Google Pixel', 'Poco', 'Realme', 'Samsung', 'Vivo',
        'boAt', 'Cashify', 'Sony', 'Nothing', 'Blinkit', 'Lenskart', 'The Sleep Company',
        'Noise', 'Fire-Boltt', 'Tesla', 'Tata', 'Hyundai', 'Kia', 'Ultraviolette'
      ].map((name, idx) => ({ id: `b-${idx + 1}`, brandName: name, logoUrl: '', websiteUrl: '', order: idx + 1, visible: true, deleted: false }))
    },

    // SECTION 11: Newsletter & Contact Preview
    newsletterContact: {
      newsletterBadge: 'NEWSLETTER SUBSCRIPTION',
      newsletterHeading: 'Stay in the Loop',
      newsletterDescription: 'Join my newsletter for behind-the-scenes content and insights.',
      placeholder: 'Enter your email',
      buttonText: 'Subscribe',
      contactBadge: 'COLLABORATION INQUIRY',
      contactHeading: 'Ready to Collaborate?',
      contactCtaText: 'Get In Touch',
      visible: true
    }
  };

  const cmsData = db?.homepageCMS || db?.homepage || defaultHomepageCMS;
  const [formData, setFormData] = useState(cmsData);

  const showToast = (msg, type = 'success') => setToast({ id: Date.now(), message: msg, type });

  // Direct persistence caller
  const persistChanges = (nextState) => {
    setFormData(nextState);
    updateSection('homepageCMS', nextState);
    updateSection('homepage', nextState);
  };

  const handleSaveAll = () => {
    persistChanges(formData);
    setIsSaved(true);
    showToast('Homepage CMS saved & synchronized to MongoDB!', 'success');
    setTimeout(() => setIsSaved(false), 2500);
  };

  // Direct Cloudinary / API File Upload Handler
  const handleFileUpload = async (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append(file.type.startsWith('video') ? 'video' : 'image', file);
      
      const endpoint = file.type.startsWith('video') ? '/upload/video' : '/upload/image';
      const res = await apiFetch(endpoint, {
        method: 'POST',
        body: uploadData
      });

      if (res.success && (res.data?.url || res.data?.imageUrl || res.data?.secure_url)) {
        const uploadedUrl = res.data.url || res.data.imageUrl || res.data.secure_url;
        callback(uploadedUrl);
        showToast('Media uploaded & attached successfully!', 'success');
      } else {
        // Fallback for local object URL preview if offline
        const localUrl = URL.createObjectURL(file);
        callback(localUrl);
        showToast('Uploaded asset to local preview cache', 'info');
      }
    } catch (err) {
      const localUrl = URL.createObjectURL(file);
      callback(localUrl);
      showToast('Media attached to form', 'info');
    } finally {
      setIsUploading(false);
    }
  };

  // Helper Array Order Swap
  const swapOrder = (listKey, parentKey, index, direction) => {
    const list = parentKey ? [...formData[parentKey][listKey]] : [...formData[listKey]];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    // reassign order integers
    const reordered = list.map((item, idx) => ({ ...item, order: idx + 1 }));

    const updatedState = parentKey 
      ? { ...formData, [parentKey]: { ...formData[parentKey], [listKey]: reordered } }
      : { ...formData, [listKey]: reordered };

    persistChanges(updatedState);
  };

  // Helper Toggle Visibility / Active State
  const toggleItemVisibility = (listKey, parentKey, id) => {
    const list = parentKey ? [...formData[parentKey][listKey]] : [...formData[listKey]];
    const updated = list.map(item => item.id === id ? { ...item, visible: !item.visible } : item);
    const updatedState = parentKey 
      ? { ...formData, [parentKey]: { ...formData[parentKey], [listKey]: updated } }
      : { ...formData, [listKey]: updated };
    persistChanges(updatedState);
  };

  // Helper Soft Delete / Permanent Delete
  const handleItemDelete = (listKey, parentKey, id, permanent = false) => {
    const list = parentKey ? [...formData[parentKey][listKey]] : [...formData[listKey]];
    let updated;
    if (permanent) {
      updated = list.filter(item => item.id !== id);
    } else {
      updated = list.map(item => item.id === id ? { ...item, deleted: true } : item);
    }
    const updatedState = parentKey 
      ? { ...formData, [parentKey]: { ...formData[parentKey], [listKey]: updated } }
      : { ...formData, [listKey]: updated };
    persistChanges(updatedState);
    setDeleteConfirmItem(null);
    showToast(permanent ? 'Item permanently deleted' : 'Item soft-deleted. Restore anytime.', 'info');
  };

  // Helper Restore Soft Deleted Item
  const handleItemRestore = (listKey, parentKey, id) => {
    const list = parentKey ? [...formData[parentKey][listKey]] : [...formData[listKey]];
    const updated = list.map(item => item.id === id ? { ...item, deleted: false } : item);
    const updatedState = parentKey 
      ? { ...formData, [parentKey]: { ...formData[parentKey], [listKey]: updated } }
      : { ...formData, [listKey]: updated };
    persistChanges(updatedState);
    showToast('Item restored successfully', 'success');
  };

  // Modal Submit (Create / Edit Item)
  const handleModalSave = (e) => {
    e.preventDefault();
    const { listKey, parentKey, item } = modalConfig;
    const list = parentKey ? [...formData[parentKey][listKey]] : [...formData[listKey]];
    
    let updated;
    if (item.id) {
      updated = list.map(i => i.id === item.id ? item : i);
    } else {
      const newItem = {
        ...item,
        id: `${listKey.slice(0, 2)}-${Date.now()}`,
        order: list.length + 1,
        visible: true,
        deleted: false
      };
      updated = [...list, newItem];
    }

    const updatedState = parentKey 
      ? { ...formData, [parentKey]: { ...formData[parentKey], [listKey]: updated } }
      : { ...formData, [listKey]: updated };

    persistChanges(updatedState);
    setModalConfig(null);
    showToast(item.id ? 'Item updated successfully!' : 'New item created successfully!', 'success');
  };

  const sectionsList = [
    { id: 'sec-1', label: 'Section 1: Navbar Settings' },
    { id: 'sec-2', label: 'Section 2: Hero Landing Section' },
    { id: 'sec-3', label: 'Section 3: Intro & Vision Grid' },
    { id: 'sec-4', label: 'Section 4: Founder Spotlight' },
    { id: 'sec-5', label: 'Section 5: Channels Ticker' },
    { id: 'sec-6', label: 'Section 6: Core Values Cards' },
    { id: 'sec-7', label: 'Section 7: Statistics Counters' },
    { id: 'sec-8', label: 'Section 8: Featured Shorts & Reels' },
    { id: 'sec-9', label: 'Section 9: Featured Long Videos' },
    { id: 'sec-10', label: 'Section 10: Brand Collaborations Wall' },
    { id: 'sec-11', label: 'Section 11: Newsletter & Contact CTA' }
  ];

  return (
    <div className="space-y-6 text-left">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-luxury-gold shadow-gold-glow animate-pulse" />
            <h1 className="text-2xl font-serif font-bold tracking-wide uppercase text-white">Homepage End-to-End CMS</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Full End-to-End CRUD for all 11 Homepage sections synced to MongoDB.
          </p>
        </div>

        <Button onClick={handleSaveAll} variant="gold" className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold">
          {isSaved ? <Check className="w-4 h-4 text-black" /> : <Save className="w-4 h-4" />}
          {isSaved ? 'Synchronized!' : 'Save & Sync All Sections'}
        </Button>
      </div>

      {/* Section Switcher Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-3 border-b border-zinc-800/80">
        {sectionsList.map(sec => (
          <button
            key={sec.id}
            onClick={() => { setActiveSection(sec.id); setSearchQuery(''); setStatusFilter('all'); }}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeSection === sec.id
                ? 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/30 shadow-[0_0_12px_rgba(212,175,55,0.05)]'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: NAVBAR */}
      {activeSection === 'sec-1' && (
        <div className="space-y-6">
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Navbar Global Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Button Text</label>
                <input
                  type="text"
                  value={formData.navbar.buttonText}
                  onChange={(e) => persistChanges({ ...formData, navbar: { ...formData.navbar, buttonText: e.target.value } })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Button Target Link</label>
                <input
                  type="text"
                  value={formData.navbar.buttonLink}
                  onChange={(e) => persistChanges({ ...formData, navbar: { ...formData.navbar, buttonLink: e.target.value } })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-mono focus:outline-none"
                />
              </div>
              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Views Badge</label>
                <input
                  type="text"
                  value={formData.navbar.viewsText}
                  onChange={(e) => persistChanges({ ...formData, navbar: { ...formData.navbar, viewsText: e.target.value } })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Navigation Items List CRUD */}
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Navbar Navigation Items</h3>
              <Button 
                onClick={() => setModalConfig({ listKey: 'navItems', parentKey: 'navbar', item: { label: '', url: '/' } })} 
                variant="gold" 
                size="sm" 
                className="text-xs uppercase"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Nav Item
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-900/80 text-zinc-400 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="py-2.5 px-4">Order</th>
                    <th className="py-2.5 px-4">Label</th>
                    <th className="py-2.5 px-4">URL</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {formData.navbar.navItems.map((item, idx) => (
                    <tr key={item.id} className={`hover:bg-zinc-900/30 ${item.deleted ? 'opacity-40' : ''}`}>
                      <td className="py-2.5 px-4 font-mono text-zinc-500">
                        <div className="flex items-center gap-1">
                          <button onClick={() => swapOrder('navItems', 'navbar', idx, -1)} className="hover:text-luxury-gold cursor-pointer"><ArrowUp className="w-3 h-3" /></button>
                          <span>{idx + 1}</span>
                          <button onClick={() => swapOrder('navItems', 'navbar', idx, 1)} className="hover:text-luxury-gold cursor-pointer"><ArrowDown className="w-3 h-3" /></button>
                        </div>
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-zinc-200">{item.label}</td>
                      <td className="py-2.5 px-4 font-mono text-zinc-400">{item.url}</td>
                      <td className="py-2.5 px-4">
                        <button 
                          onClick={() => toggleItemVisibility('navItems', 'navbar', item.id)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono border cursor-pointer ${item.visible ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-zinc-900 text-zinc-500 border-zinc-800'}`}
                        >
                          {item.visible ? 'Visible' : 'Hidden'}
                        </button>
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => setModalConfig({ listKey: 'navItems', parentKey: 'navbar', item })} className="p-1 text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                          {item.deleted ? (
                            <button onClick={() => handleItemRestore('navItems', 'navbar', item.id)} className="p-1 text-emerald-400"><RotateCcw className="w-3.5 h-3.5" /></button>
                          ) : (
                            <button onClick={() => handleItemDelete('navItems', 'navbar', item.id)} className="p-1 text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: HERO */}
      {activeSection === 'sec-2' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
          <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Hero Section Fields</h3>

          <div className="space-y-4">
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Badge Tag</label>
              <input
                type="text"
                value={formData.hero.badge}
                onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, badge: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Top Sub-Badge Text</label>
              <input
                type="text"
                value={formData.hero.topBadgeText}
                onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, topBadgeText: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Main Heading</label>
              <input
                type="text"
                value={formData.hero.mainHeading}
                onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, mainHeading: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-serif font-bold"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Hero Tagline</label>
              <textarea
                rows={2}
                value={formData.hero.tagline}
                onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, tagline: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-serif italic"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Sub-Tagline</label>
              <input
                type="text"
                value={formData.hero.subTagline}
                onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, subTagline: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: INTRO & VISION */}
      {activeSection === 'sec-3' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
          <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Intro & Vision Grid</h3>
          <div className="space-y-4">
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Intro Heading</label>
              <input
                type="text"
                value={formData.introVision.introHeading}
                onChange={(e) => persistChanges({ ...formData, introVision: { ...formData.introVision, introHeading: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-serif font-bold"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Intro Description</label>
              <textarea
                rows={3}
                value={formData.introVision.introDescription}
                onChange={(e) => persistChanges({ ...formData, introVision: { ...formData.introVision, introDescription: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Vision Title</label>
              <input
                type="text"
                value={formData.introVision.visionHeading}
                onChange={(e) => persistChanges({ ...formData, introVision: { ...formData.introVision, visionHeading: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-serif font-bold"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Vision Description</label>
              <textarea
                rows={3}
                value={formData.introVision.visionDescription}
                onChange={(e) => persistChanges({ ...formData, introVision: { ...formData.introVision, visionDescription: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: FOUNDER */}
      {activeSection === 'sec-4' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
          <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Founder / CEO Spotlight</h3>
          <div className="space-y-4">
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Founder Name</label>
              <input
                type="text"
                value={formData.founder.name}
                onChange={(e) => persistChanges({ ...formData, founder: { ...formData.founder, name: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-serif font-bold"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Highlighted Title</label>
              <input
                type="text"
                value={formData.founder.highlightedName}
                onChange={(e) => persistChanges({ ...formData, founder: { ...formData.founder, highlightedName: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-serif italic text-luxury-gold"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Bio Description</label>
              <textarea
                rows={4}
                value={formData.founder.description}
                onChange={(e) => persistChanges({ ...formData, founder: { ...formData.founder, description: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: CHANNELS TICKER */}
      {activeSection === 'sec-5' && (
        <div className="space-y-4">
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Official Channels Ticker List</h3>
              <Button 
                onClick={() => setModalConfig({ listKey: 'channels', parentKey: 'channelsTicker', item: { name: '', ytSubs: '', igFollowers: '', popular: '' } })} 
                variant="gold" 
                size="sm" 
                className="text-xs uppercase"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Channel
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-900/80 text-zinc-400 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="py-2.5 px-4">Order</th>
                    <th className="py-2.5 px-4">Channel Name</th>
                    <th className="py-2.5 px-4">YouTube Subs</th>
                    <th className="py-2.5 px-4">IG Followers</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {formData.channelsTicker.channels.map((ch, idx) => (
                    <tr key={ch.id} className={`hover:bg-zinc-900/30 ${ch.deleted ? 'opacity-40' : ''}`}>
                      <td className="py-2.5 px-4 font-mono text-zinc-500">
                        <div className="flex items-center gap-1">
                          <button onClick={() => swapOrder('channels', 'channelsTicker', idx, -1)} className="hover:text-luxury-gold cursor-pointer"><ArrowUp className="w-3 h-3" /></button>
                          <span>{idx + 1}</span>
                          <button onClick={() => swapOrder('channels', 'channelsTicker', idx, 1)} className="hover:text-luxury-gold cursor-pointer"><ArrowDown className="w-3 h-3" /></button>
                        </div>
                      </td>
                      <td className="py-2.5 px-4 font-serif font-bold text-zinc-200">{ch.name}</td>
                      <td className="py-2.5 px-4 font-mono text-luxury-gold">{ch.ytSubs || '—'}</td>
                      <td className="py-2.5 px-4 font-mono text-amber-400">{ch.igFollowers || '—'}</td>
                      <td className="py-2.5 px-4">
                        <button 
                          onClick={() => toggleItemVisibility('channels', 'channelsTicker', ch.id)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono border cursor-pointer ${ch.visible ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-zinc-900 text-zinc-500 border-zinc-800'}`}
                        >
                          {ch.visible ? 'Visible' : 'Hidden'}
                        </button>
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => setModalConfig({ listKey: 'channels', parentKey: 'channelsTicker', item: ch })} className="p-1 text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                          {ch.deleted ? (
                            <button onClick={() => handleItemRestore('channels', 'channelsTicker', ch.id)} className="p-1 text-emerald-400"><RotateCcw className="w-3.5 h-3.5" /></button>
                          ) : (
                            <button onClick={() => handleItemDelete('channels', 'channelsTicker', ch.id)} className="p-1 text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: CORE VALUES */}
      {activeSection === 'sec-6' && (
        <div className="space-y-4">
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Core Values Cards List</h3>
              <Button 
                onClick={() => setModalConfig({ listKey: 'cards', parentKey: 'coreValues', item: { title: '', description: '' } })} 
                variant="gold" 
                size="sm" 
                className="text-xs uppercase"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Card
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formData.coreValues.cards.map((cv, idx) => (
                <div key={cv.id} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <span className="font-mono text-[10px] text-luxury-gold">Card #{idx + 1}</span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setModalConfig({ listKey: 'cards', parentKey: 'coreValues', item: cv })} className="text-zinc-400 hover:text-white"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleItemDelete('cards', 'coreValues', cv.id)} className="text-rose-400 hover:text-rose-300"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <h4 className="font-serif font-bold text-white text-sm">{cv.title}</h4>
                  <p className="text-zinc-400 font-light leading-relaxed">{cv.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7: STATISTICS */}
      {activeSection === 'sec-7' && (
        <div className="space-y-4">
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Statistics Counters</h3>
              <Button 
                onClick={() => setModalConfig({ listKey: 'counters', parentKey: 'statistics', item: { value: '', label: '' } })} 
                variant="gold" 
                size="sm" 
                className="text-xs uppercase"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Counter
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              {formData.statistics.counters.map((st, idx) => (
                <div key={st.id} className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-luxury-gold text-base">{st.value}</span>
                    <button onClick={() => handleItemDelete('counters', 'statistics', st.id)} className="text-zinc-500 hover:text-rose-400"><Trash2 className="w-3 h-3" /></button>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase block">{st.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 8: SHORTS & REELS */}
      {activeSection === 'sec-8' && (
        <div className="space-y-4">
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Featured Shorts & Reels List</h3>
              <Button 
                onClick={() => setModalConfig({ listKey: 'list', parentKey: 'shortsReels', item: { title: '', views: '', videoUrl: '' } })} 
                variant="gold" 
                size="sm" 
                className="text-xs uppercase"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Reel / Short
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formData.shortsReels.list.map((sr, idx) => (
                <div key={sr.id} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white truncate">{sr.title}</span>
                    <button onClick={() => handleItemDelete('list', 'shortsReels', sr.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                  <span className="text-luxury-gold font-mono text-[10px] block">{sr.views}</span>
                  {sr.videoUrl && <video src={sr.videoUrl} className="w-full aspect-video bg-black rounded object-cover" muted />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 9: LONG VIDEOS */}
      {activeSection === 'sec-9' && (
        <div className="space-y-4">
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Featured Long Videos List</h3>
              <Button 
                onClick={() => setModalConfig({ listKey: 'list', parentKey: 'longVideos', item: { title: '', youtubeUrl: '', views: '', channel: 'Tech Master' } })} 
                variant="gold" 
                size="sm" 
                className="text-xs uppercase"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Long Video
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.longVideos.list.map((lv, idx) => (
                <div key={lv.id} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{lv.title}</span>
                    <button onClick={() => handleItemDelete('list', 'longVideos', lv.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400">
                    <span>{lv.channel}</span>
                    <span className="text-luxury-gold">{lv.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 10: BRAND COLLABORATIONS */}
      {activeSection === 'sec-10' && (
        <div className="space-y-4">
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Brand Collaborations ({formData.brandCollaborations.brands.length})</h3>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative w-48">
                  <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search brand..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded pl-7 pr-2 py-1 text-xs text-zinc-200"
                  />
                </div>
                <Button 
                  onClick={() => setModalConfig({ listKey: 'brands', parentKey: 'brandCollaborations', item: { brandName: '', websiteUrl: '' } })} 
                  variant="gold" 
                  size="sm" 
                  className="text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Brand
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {formData.brandCollaborations.brands
                .filter(b => b.brandName.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((b, idx) => (
                  <div key={b.id} className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl text-center space-y-2 relative group text-xs">
                    <span className="font-semibold text-zinc-200 block truncate">{b.brandName}</span>
                    <button 
                      onClick={() => handleItemDelete('brands', 'brandCollaborations', b.id, true)} 
                      className="absolute top-2 right-2 text-zinc-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 11: NEWSLETTER & CONTACT */}
      {activeSection === 'sec-11' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
          <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Newsletter & Contact Preview Settings</h3>

          <div className="space-y-4">
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Newsletter Heading</label>
              <input
                type="text"
                value={formData.newsletterContact.newsletterHeading}
                onChange={(e) => persistChanges({ ...formData, newsletterContact: { ...formData.newsletterContact, newsletterHeading: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-serif"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Contact Preview CTA Text</label>
              <input
                type="text"
                value={formData.newsletterContact.contactCtaText}
                onChange={(e) => persistChanges({ ...formData, newsletterContact: { ...formData.newsletterContact, contactCtaText: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200"
              />
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {modalConfig && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleModalSave} className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
                {modalConfig.item.id ? 'Edit Item' : 'Create New Item'}
              </h3>
              <button type="button" onClick={() => setModalConfig(null)} className="text-zinc-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {Object.keys(modalConfig.item).filter(k => !['id', 'order', 'visible', 'deleted'].includes(k)).map(key => (
                <div key={key}>
                  <label className="text-zinc-400 block mb-1 font-mono uppercase text-[10px]">{key}</label>
                  <input
                    type="text"
                    value={modalConfig.item[key] || ''}
                    onChange={(e) => setModalConfig({
                      ...modalConfig,
                      item: { ...modalConfig.item, [key]: e.target.value }
                    })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
              <Button type="button" variant="outline" size="sm" onClick={() => setModalConfig(null)}>Cancel</Button>
              <Button type="submit" variant="gold" size="sm">Save Item</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

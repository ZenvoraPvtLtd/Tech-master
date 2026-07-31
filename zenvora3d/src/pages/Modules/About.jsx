import React, { useState, useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useMediaManager } from '../../context/MediaContext';
import { 
  Building2, Users, Quote, Save, Check, Upload, Trash2, 
  RefreshCw, Image as ImageIcon, Eye, Sparkles, Layers, ShieldCheck 
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';

export const About = () => {
  const { db, updateSection, apiFetch } = useDatabase();
  const { openMediaManager } = useMediaManager();
  
  const [activeSection, setActiveSection] = useState('sec-1'); // sec-1, sec-2, sec-3
  const [toast, setToast] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Exact default values matching the live website content 100%
  const defaultAboutData = {
    // SECTION 1 — ABOUT TECH MASTER
    aboutTechMaster: {
      smallBadge: "ABOUT TECH MASTER",
      mainHeading: "What Tech Master Is",
      highlightedHeading: "Tech Master",
      description: "It started in 2019 one person, one channel, and a belief that tech content in India could be smarter than it was. That belief became Tech Master, and by 2023, it had become a company. Today, Tech Master Digital Pvt Ltd is a 50+ person team running four established channels across tech, automobiles, and entertainment with a fifth already taking shape in 3D animation out of a full production studio in Jaipur, complete with an in-house editing suite, animation team, and gaming studio. Today our content generates 1B+ views every month.",
      backgroundMedia: "",
      order: 1,
      visibility: true,
      status: "Published"
    },

    // SECTION 2 — COMPANY CULTURE
    culture: {
      smallBadge: "OUR CULTURE",
      mainHeading: "Good People.",
      highlightedText: "Good Work. Good Vibes",
      description: "Ideas get clashed over here, not because we're trying to prove a point, but because everyone actually cares. We push each other, we push ourselves but nobody's burning out to do it. Somewhere between the deadlines and the chai breaks, this team just falls into a rhythm. Good People. Good Work. Good Vibes",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Tech Master Team",
      imageSubtitle: "Jaipur Studio",
      imageDescription: "50+ Person Production & Gaming Suite",
      overlayCaption: "",
      bgStyle: "glass",
      borderStyle: "gold-subtle",
      order: 2,
      visibility: true,
      status: "Published"
    },

    // SECTION 3 — STUDIO / IMAGE CARD
    studioCard: {
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Tech Master Team",
      imageSubtitle: "Jaipur Studio",
      imageDescription: "50+ Person Production & Gaming Suite",
      overlayCaption: "",
      visibility: true,
      order: 3
    },

    // SECTION 4 — FOUNDER PHILOSOPHY
    philosophy: {
      smallBadge: "FOUNDER PHILOSOPHY",
      quote: "Information is Wealth.",
      description: "Information is Wealth.",
      founderName: "Tech Master Founder",
      founderDesignation: "Founder & CEO",
      profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
      showDivider: true,
      order: 4,
      visibility: true,
      status: "Published"
    },

    story: {
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
    },
    introduction: {
      profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80"
    }
  };

  const storedAbout = db?.about || defaultAboutData;

  const [formData, setFormData] = useState(() => ({
    aboutTechMaster: { ...defaultAboutData.aboutTechMaster, ...(storedAbout.aboutTechMaster || {}) },
    culture: { 
      ...defaultAboutData.culture, 
      ...(storedAbout.culture || {}),
      highlightedText: (storedAbout.culture?.highlightedText && storedAbout.culture.highlightedText.trim()) 
        ? storedAbout.culture.highlightedText 
        : defaultAboutData.culture.highlightedText 
    },
    studioCard: { ...defaultAboutData.studioCard, ...(storedAbout.studioCard || {}) },
    philosophy: { ...defaultAboutData.philosophy, ...(storedAbout.philosophy || {}) }
  }));

  useEffect(() => {
    const fetchLatestAbout = async () => {
      try {
        if (apiFetch) {
          const res = await apiFetch('/about');
          if (res.success && res.data) {
            const data = res.data;
            setFormData({
              aboutTechMaster: { ...defaultAboutData.aboutTechMaster, ...(data.aboutTechMaster || {}) },
              culture: { 
                ...defaultAboutData.culture, 
                ...(data.culture || {}),
                highlightedText: data.culture?.highlightedText || defaultAboutData.culture.highlightedText
              },
              studioCard: { ...defaultAboutData.studioCard, ...(data.studioCard || {}) },
              philosophy: { ...defaultAboutData.philosophy, ...(data.philosophy || {}) }
            });
          }
        }
      } catch (err) {
        console.warn("Could not fetch latest about from backend:", err);
      }
    };
    fetchLatestAbout();
  }, []);

  const showToast = (msg, type = 'success') => setToast({ id: Date.now(), message: msg, type });

  // Sync to database and frontend state
  const syncToDatabase = async (nextData, isPublished = false) => {
    setFormData(nextData);

    const payload = {
      ...nextData,
      studioCard: {
        imageUrl: nextData.culture.imageUrl || nextData.studioCard?.imageUrl,
        imageAlt: nextData.culture.imageAlt || nextData.studioCard?.imageAlt,
        imageSubtitle: nextData.culture.imageSubtitle || nextData.studioCard?.imageSubtitle,
        imageDescription: nextData.culture.imageDescription || nextData.studioCard?.imageDescription,
        overlayCaption: nextData.culture.overlayCaption || nextData.studioCard?.overlayCaption || "",
        visibility: nextData.culture.visibility !== false,
        order: 3
      },
      story: {
        imageUrl: nextData.culture.imageUrl
      },
      introduction: {
        profileImageUrl: nextData.philosophy.profileImageUrl
      }
    };

    updateSection('about', payload);

    try {
      if (apiFetch) {
        await apiFetch('/about', {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
      }
    } catch (err) {
      console.warn("Backend API sync warning:", err);
    }

    setIsSaved(true);
    showToast(isPublished ? 'About Page Published Live!' : 'Draft Saved Successfully!', 'success');
    setTimeout(() => setIsSaved(false), 2500);
  };

  // Direct File Upload (Cloudinary / Local URL)
  const handleImageUpload = async (e, targetKey) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('image', file);

      const res = await apiFetch('/upload/image', {
        method: 'POST',
        body: uploadData
      });

      if (res.success && (res.data?.url || res.data?.imageUrl || res.data?.secure_url)) {
        const uploadedUrl = res.data.url || res.data.imageUrl || res.data.secure_url;
        if (targetKey === 'culture') {
          setFormData(prev => ({ ...prev, culture: { ...prev.culture, imageUrl: uploadedUrl } }));
        } else if (targetKey === 'philosophy') {
          setFormData(prev => ({ ...prev, philosophy: { ...prev.philosophy, profileImageUrl: uploadedUrl } }));
        }
        showToast('Image uploaded successfully!', 'success');
      } else {
        const localUrl = URL.createObjectURL(file);
        if (targetKey === 'culture') {
          setFormData(prev => ({ ...prev, culture: { ...prev.culture, imageUrl: localUrl } }));
        } else if (targetKey === 'philosophy') {
          setFormData(prev => ({ ...prev, philosophy: { ...prev.philosophy, profileImageUrl: localUrl } }));
        }
        showToast('Image preview attached!', 'info');
      }
    } catch (err) {
      const localUrl = URL.createObjectURL(file);
      if (targetKey === 'culture') {
        setFormData(prev => ({ ...prev, culture: { ...prev.culture, imageUrl: localUrl } }));
      } else if (targetKey === 'philosophy') {
        setFormData(prev => ({ ...prev, philosophy: { ...prev.philosophy, profileImageUrl: localUrl } }));
      }
      showToast('Image attached to form', 'info');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-luxury-gold shadow-gold-glow animate-pulse" />
            <h1 className="text-2xl font-serif font-bold tracking-wide uppercase text-white">About Page CMS</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Section-Based CMS for managing the live About Page content.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => syncToDatabase(formData, false)} variant="outline" size="sm" className="text-xs uppercase tracking-wider">
            Save Draft
          </Button>
          <Button onClick={() => syncToDatabase(formData, true)} variant="gold" size="sm" className="text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5">
            {isSaved ? <Check className="w-3.5 h-3.5 text-black" /> : <Save className="w-3.5 h-3.5" />}
            {isSaved ? 'Published Live!' : 'Publish Live'}
          </Button>
        </div>
      </div>

      {/* Section Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'sec-1', label: 'Section 1 — About Tech Master', icon: Building2 },
          { id: 'sec-2', label: 'Section 2 — Company Culture', icon: Users },
          { id: 'sec-3', label: 'Section 3 — Founder Philosophy', icon: Quote }
        ].map(tab => {
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeSection === tab.id
                  ? 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/30 shadow-[0_0_12px_rgba(212,175,55,0.05)]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1 — ABOUT TECH MASTER */}
      {activeSection === 'sec-1' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-luxury-gold" />
              Section 1 — About Tech Master
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Small Badge</label>
              <input
                type="text"
                value={formData.aboutTechMaster.smallBadge}
                onChange={(e) => setFormData({
                  ...formData,
                  aboutTechMaster: { ...formData.aboutTechMaster, smallBadge: e.target.value }
                })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-luxury-gold/40 font-mono"
              />
            </div>

            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Main Heading</label>
              <input
                type="text"
                value={formData.aboutTechMaster.mainHeading}
                onChange={(e) => setFormData({
                  ...formData,
                  aboutTechMaster: { ...formData.aboutTechMaster, mainHeading: e.target.value }
                })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-serif font-bold text-base focus:outline-none focus:border-luxury-gold/40"
              />
            </div>

            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Highlighted Heading Text</label>
              <input
                type="text"
                value={formData.aboutTechMaster.highlightedHeading}
                onChange={(e) => setFormData({
                  ...formData,
                  aboutTechMaster: { ...formData.aboutTechMaster, highlightedHeading: e.target.value }
                })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-serif font-bold text-base focus:outline-none focus:border-luxury-gold/40"
              />
            </div>

            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Description Content</label>
              <textarea
                rows={5}
                value={formData.aboutTechMaster.description}
                onChange={(e) => setFormData({
                  ...formData,
                  aboutTechMaster: { ...formData.aboutTechMaster, description: e.target.value }
                })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-zinc-300 font-light leading-relaxed focus:outline-none focus:border-luxury-gold/40"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
            <Button onClick={() => syncToDatabase(formData, false)} variant="outline" size="sm" className="text-xs uppercase">
              Save Draft
            </Button>
            <Button onClick={() => syncToDatabase(formData, true)} variant="gold" size="sm" className="text-xs uppercase font-semibold">
              Publish Live
            </Button>
          </div>
        </div>
      )}

      {/* SECTION 2 — COMPANY CULTURE */}
      {activeSection === 'sec-2' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-luxury-gold" />
              Section 2 — Company Culture
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Small Badge</label>
                <input
                  type="text"
                  value={formData.culture.smallBadge}
                  onChange={(e) => setFormData({
                    ...formData,
                    culture: { ...formData.culture, smallBadge: e.target.value }
                  })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-luxury-gold/40 font-mono"
                />
              </div>

              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Main Heading</label>
                <input
                  type="text"
                  value={formData.culture.mainHeading}
                  onChange={(e) => setFormData({
                    ...formData,
                    culture: { ...formData.culture, mainHeading: e.target.value }
                  })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-serif font-bold text-base focus:outline-none focus:border-luxury-gold/40"
                />
              </div>

              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Highlighted Text</label>
                <input
                  type="text"
                  value={formData.culture.highlightedText}
                  onChange={(e) => setFormData({
                    ...formData,
                    culture: { ...formData.culture, highlightedText: e.target.value }
                  })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-serif font-bold text-base focus:outline-none focus:border-luxury-gold/40"
                />
              </div>

              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Description Content</label>
                <textarea
                  rows={4}
                  value={formData.culture.description}
                  onChange={(e) => setFormData({
                    ...formData,
                    culture: { ...formData.culture, description: e.target.value }
                  })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-zinc-300 font-light leading-relaxed focus:outline-none focus:border-luxury-gold/40"
                />
              </div>
            </div>

            {/* Right Side Image Upload & Preview */}
            <div className="space-y-4 bg-zinc-900/40 p-5 rounded-xl border border-zinc-800/80">
              <label className="text-zinc-400 font-mono uppercase text-[10px] block">Right Side Team Image</label>

              {/* Image Preview Box */}
              <div className="aspect-video w-full bg-black rounded-lg overflow-hidden border border-zinc-800 relative group flex items-center justify-center">
                {formData.culture.imageUrl ? (
                  <img src={formData.culture.imageUrl} alt={formData.culture.imageAlt} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-6 text-zinc-500">
                    <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <span>No image uploaded</span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Image Alt Text</label>
                <input
                  type="text"
                  value={formData.culture.imageAlt}
                  onChange={(e) => setFormData({
                    ...formData,
                    culture: { ...formData.culture, imageAlt: e.target.value }
                  })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-zinc-300"
                />
              </div>

              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Image Subtitle Badge (e.g. Jaipur Studio)</label>
                <input
                  type="text"
                  value={formData.culture.imageSubtitle || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    culture: { ...formData.culture, imageSubtitle: e.target.value }
                  })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-luxury-gold font-mono uppercase font-semibold"
                  placeholder="Jaipur Studio"
                />
              </div>

              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Image Overlay Caption</label>
                <input
                  type="text"
                  value={formData.culture.imageDescription || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    culture: { ...formData.culture, imageDescription: e.target.value }
                  })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-zinc-200 font-serif font-bold"
                  placeholder="50+ Person Production & Gaming Suite"
                />
              </div>

              {/* Upload Controls */}
              <div className="flex items-center gap-2 pt-2">
                <label className="cursor-pointer">
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'culture')} className="hidden" />
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-luxury-gold text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer">
                    {isUploading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                    Upload Image
                  </span>
                </label>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => openMediaManager({ onSelect: (url) => setFormData({ ...formData, culture: { ...formData.culture, imageUrl: url } }) })}
                  className="text-xs uppercase"
                >
                  Media Picker
                </Button>

                {formData.culture.imageUrl && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, culture: { ...formData.culture, imageUrl: '' } })}
                    className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded transition-colors cursor-pointer"
                    title="Remove Image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
            <Button onClick={() => syncToDatabase(formData, false)} variant="outline" size="sm" className="text-xs uppercase">
              Save Draft
            </Button>
            <Button onClick={() => syncToDatabase(formData, true)} variant="gold" size="sm" className="text-xs uppercase font-semibold">
              Publish Live
            </Button>
          </div>
        </div>
      )}

      {/* SECTION 3 — FOUNDER PHILOSOPHY */}
      {activeSection === 'sec-3' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Quote className="w-4 h-4 text-luxury-gold" />
              Section 3 — Founder Philosophy
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Small Badge</label>
                <input
                  type="text"
                  value={formData.philosophy.smallBadge}
                  onChange={(e) => setFormData({
                    ...formData,
                    philosophy: { ...formData.philosophy, smallBadge: e.target.value }
                  })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-luxury-gold/40 font-mono"
                />
              </div>

              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Founder Quote</label>
                <textarea
                  rows={3}
                  value={formData.philosophy.quote}
                  onChange={(e) => setFormData({
                    ...formData,
                    philosophy: { ...formData.philosophy, quote: e.target.value, description: e.target.value }
                  })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-zinc-200 font-serif italic text-lg focus:outline-none focus:border-luxury-gold/40"
                />
              </div>

              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Founder Name / Signature</label>
                <input
                  type="text"
                  value={formData.philosophy.founderName}
                  onChange={(e) => setFormData({
                    ...formData,
                    philosophy: { ...formData.philosophy, founderName: e.target.value }
                  })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono uppercase font-semibold focus:outline-none focus:border-luxury-gold/40"
                />
              </div>
            </div>

            {/* Background Image Upload & Preview */}
            <div className="space-y-4 bg-zinc-900/40 p-5 rounded-xl border border-zinc-800/80">
              <label className="text-zinc-400 font-mono uppercase text-[10px] block">Background Founder Photo</label>

              <div className="aspect-video w-full bg-black rounded-lg overflow-hidden border border-zinc-800 relative group flex items-center justify-center">
                {formData.philosophy.profileImageUrl ? (
                  <img src={formData.philosophy.profileImageUrl} alt="Founder Photo" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-6 text-zinc-500">
                    <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <span>No background photo uploaded</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <label className="cursor-pointer">
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'philosophy')} className="hidden" />
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-luxury-gold text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer">
                    {isUploading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                    Upload Photo
                  </span>
                </label>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => openMediaManager({ onSelect: (url) => setFormData({ ...formData, philosophy: { ...formData.philosophy, profileImageUrl: url } }) })}
                  className="text-xs uppercase"
                >
                  Media Picker
                </Button>

                {formData.philosophy.profileImageUrl && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, philosophy: { ...formData.philosophy, profileImageUrl: '' } })}
                    className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded transition-colors cursor-pointer"
                    title="Remove Photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
            <Button onClick={() => syncToDatabase(formData, false)} variant="outline" size="sm" className="text-xs uppercase">
              Save Draft
            </Button>
            <Button onClick={() => syncToDatabase(formData, true)} variant="gold" size="sm" className="text-xs uppercase font-semibold">
              Publish Live
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

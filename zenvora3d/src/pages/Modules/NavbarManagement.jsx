import React, { useState, useEffect } from 'react';
import { 
  Navigation, Image, Menu, MousePointer, Sliders, Palette, Scroll, 
  Smartphone, Share2, Globe, Save, RefreshCw, Plus, Trash2, Edit2, 
  Eye, EyeOff, ArrowUp, ArrowDown, Check, Upload, ExternalLink, ShieldCheck, AlertCircle
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

export const NavbarManagement = () => {
  const { db, updateSection } = useDatabase();
  const [activeTab, setActiveTab] = useState('logo');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const defaultNavbarState = {
    logo: {
      primaryLogo: db?.websiteSettings?.companyLogo || null,
      mobileLogo: null,
      stickyLogo: null,
      transparentLogo: null,
      retinaLogo: null,
      altText: "Tech Master Logo"
    },
    menus: {
      desktopLinks: [
        { id: "menu-1", name: "Home", slug: "home", pageUrl: "home", target: "_self", visibility: true, displayOrder: 1, status: "Published" },
        { id: "menu-2", name: "About", slug: "about", pageUrl: "about", target: "_self", visibility: true, displayOrder: 2, status: "Published" },
        { id: "menu-3", name: "Journey", slug: "journey", pageUrl: "journey", target: "_self", visibility: true, displayOrder: 3, status: "Published" },
        { id: "menu-4", name: "Our Work", slug: "portfolio", pageUrl: "portfolio", target: "_self", visibility: true, displayOrder: 4, status: "Published" },
        { id: "menu-5", name: "Careers", slug: "career", pageUrl: "career", target: "_self", visibility: true, displayOrder: 5, status: "Published" }
      ],
      identityItems: [
        { id: "id-1", name: "Home", pageUrl: "home", visibility: true, displayOrder: 1 },
        { id: "id-2", name: "About Founder", pageUrl: "about", visibility: true, displayOrder: 2 },
        { id: "id-3", name: "Founder's Journey", pageUrl: "journey", visibility: true, displayOrder: 3 },
        { id: "id-4", name: "Mission & Vision", pageUrl: "mission", visibility: true, displayOrder: 4 },
        { id: "id-5", name: "What We Do", pageUrl: "what-we-do", visibility: true, displayOrder: 5 }
      ],
      engagementItems: [
        { id: "eng-1", name: "Brand Collabs", pageUrl: "collaborations", visibility: true, displayOrder: 1 },
        { id: "eng-2", name: "Campaigns", pageUrl: "campaigns", visibility: true, displayOrder: 2 },
        { id: "eng-3", name: "Product Launches", pageUrl: "product-launches", visibility: true, displayOrder: 3 },
        { id: "eng-4", name: "Events & Talks", pageUrl: "events", visibility: true, displayOrder: 4 },
        { id: "eng-5", name: "Our Work", pageUrl: "portfolio", visibility: true, displayOrder: 5 },
        { id: "eng-6", name: "Careers", pageUrl: "career", visibility: true, displayOrder: 6 }
      ],
      quickLinksItems: [
        { id: "ql-1", name: "Core Services", pageUrl: "services", visibility: true, displayOrder: 1 },
        { id: "ql-2", name: "Testimonials", pageUrl: "testimonials", visibility: true, displayOrder: 2 },
        { id: "ql-3", name: "FAQ Portal", pageUrl: "faq", visibility: true, displayOrder: 3 },
        { id: "ql-4", name: "Contact Page", pageUrl: "contact", visibility: true, displayOrder: 4 },
        { id: "ql-5", name: "Privacy Policy", pageUrl: "privacy", visibility: true, displayOrder: 5 },
        { id: "ql-6", name: "Terms of Service", pageUrl: "terms", visibility: true, displayOrder: 6 }
      ]
    },
    viewsCounter: {
      enabled: true,
      label: "VIEWS",
      counterValue: 25000000000,
      prefix: "",
      suffix: "+",
      formatting: "comma",
      animation: true,
      visibility: true,
      displayPosition: "right"
    },
    letsTalkButton: {
      enabled: true,
      buttonText: "Let's Talk",
      buttonUrl: "contact",
      buttonIcon: "ArrowUpRight",
      target: "_self",
      visibility: true,
      styleVariant: "gold-sweep"
    },
    headerSettings: {
      stickyHeader: true,
      transparentHeader: true,
      blurEffect: true,
      glassEffect: true,
      shadow: true,
      desktopHeight: 80,
      tabletHeight: 70,
      mobileHeight: 60
    },
    colors: {
      textColor: "#9CA3AF",
      hoverColor: "#D4AF37",
      activeColor: "#D4AF37",
      borderColor: "rgba(212, 175, 55, 0.3)",
      glowColor: "rgba(212, 175, 55, 0.6)",
      buttonColor: "#D4AF37"
    },
    scrollSettings: {
      stickyOnScroll: true,
      hideOnScroll: false,
      showOnScrollUp: true,
      scrollThreshold: 50
    },
    responsiveSettings: {
      desktopVisibility: true,
      tabletVisibility: true,
      mobileVisibility: true,
      menuBreakpoint: "lg",
      mobileDrawerWidth: "100%"
    },
    mobileMenu: {
      showLogo: true,
      showSocials: true,
      showContactBtn: true,
      overlayBlur: true
    },
    socialLinks: [
      { id: "soc-1", platform: "YouTube", url: "https://youtube.com/@techmasterhq", visibility: true, order: 1 },
      { id: "soc-2", platform: "Instagram", url: "https://instagram.com/techmasterco", visibility: true, order: 2 },
      { id: "soc-3", platform: "Facebook", url: "https://facebook.com/techmaster", visibility: true, order: 3 },
      { id: "soc-4", platform: "LinkedIn", url: "https://linkedin.com/company/techmaster", visibility: true, order: 4 },
      { id: "soc-5", platform: "Twitter X", url: "https://x.com/techmaster", visibility: true, order: 5 }
    ],
    seo: {
      structuredData: '{\n  "@context": "https://schema.org",\n  "@type": "SiteNavigationElement",\n  "name": "TechMaster Navigation"\n}',
      logoSchema: '{\n  "@context": "https://schema.org",\n  "@type": "Organization",\n  "name": "TechMaster Digital Pvt Ltd"\n}',
      navigationSchema: ""
    }
  };

  const [navbarData, setNavbarData] = useState(() => {
    return db?.navbar ? { ...defaultNavbarState, ...db.navbar } : defaultNavbarState;
  });

  useEffect(() => {
    if (db?.navbar) {
      setNavbarData((prev) => ({ ...defaultNavbarState, ...db.navbar }));
    }
  }, [db?.navbar]);

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMsg('');
    try {
      await updateSection('navbar', navbarData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save navbar settings');
    } finally {
      setIsSaving(false);
    }
  };

  // Helper for nested field updates
  const updateField = (path, value) => {
    setNavbarData((prev) => {
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

  // Desktop links handlers
  const handleAddDesktopLink = () => {
    const newId = `menu-${Date.now()}`;
    const newItem = {
      id: newId,
      name: "New Page",
      slug: "new-page",
      pageUrl: "home",
      target: "_self",
      visibility: true,
      displayOrder: navbarData.menus.desktopLinks.length + 1,
      status: "Published"
    };
    updateField('menus.desktopLinks', [...navbarData.menus.desktopLinks, newItem]);
  };

  const handleUpdateDesktopLink = (index, key, val) => {
    const updated = [...navbarData.menus.desktopLinks];
    updated[index] = { ...updated[index], [key]: val };
    updateField('menus.desktopLinks', updated);
  };

  const handleDeleteDesktopLink = (index) => {
    const updated = navbarData.menus.desktopLinks.filter((_, i) => i !== index);
    updateField('menus.desktopLinks', updated);
  };

  // Social link handlers
  const handleAddSocial = () => {
    const newId = `soc-${Date.now()}`;
    const newSoc = {
      id: newId,
      platform: "YouTube",
      url: "https://youtube.com",
      visibility: true,
      order: navbarData.socialLinks.length + 1
    };
    updateField('socialLinks', [...navbarData.socialLinks, newSoc]);
  };

  const handleUpdateSocial = (index, key, val) => {
    const updated = [...navbarData.socialLinks];
    updated[index] = { ...updated[index], [key]: val };
    updateField('socialLinks', updated);
  };

  const handleDeleteSocial = (index) => {
    const updated = navbarData.socialLinks.filter((_, i) => i !== index);
    updateField('socialLinks', updated);
  };

  const tabs = [
    { id: 'logo', label: '1. Website Logo', icon: Image },
    { id: 'menu', label: '2. Navigation Menu', icon: Menu },
    { id: 'buttons', label: '3. Buttons & Counter', icon: MousePointer },
    { id: 'header', label: '4. Header Settings', icon: Sliders },
    { id: 'colors', label: '5. Colors & Styling', icon: Palette },
    { id: 'scroll', label: '6. Scroll Settings', icon: Scroll },
    { id: 'responsive', label: '7. Responsive & Mobile', icon: Smartphone },
    { id: 'socials', label: '8. Social Links', icon: Share2 },
    { id: 'seo', label: '9. SEO & Schema', icon: Globe },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-white font-sans">
      {/* Top Action Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl backdrop-blur-xl shadow-2xl">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
              <Navigation className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold font-serif text-amber-400">Navbar CMS Control Center</h1>
          </div>
          <p className="text-zinc-400 text-xs font-mono">
            Manage Website Logo, Navigation Menus, Views Counter, Let's Talk Button, Styling & Header Behavior
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-semibold">
              <Check className="w-4 h-4" /> Saved & Published
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
            {isSaving ? "Publishing..." : "Save & Publish Navbar"}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
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

      {/* Main Tab Content */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl space-y-6">

        {/* TAB 1: WEBSITE LOGO */}
        {activeTab === 'logo' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-amber-400 font-serif flex items-center gap-2">
              <Image className="w-5 h-5" /> SECTION 1: WEBSITE LOGO MANAGEMENT
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-3">
                <label className="text-xs font-mono uppercase text-amber-400 font-bold block">Primary Header Logo URL</label>
                <input
                  type="text"
                  value={navbarData.logo.primaryLogo?.url || ""}
                  onChange={(e) => updateField('logo.primaryLogo', { ...navbarData.logo.primaryLogo, url: e.target.value })}
                  placeholder="https://res.cloudinary.com/... or assets/logo.png"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 font-mono"
                />
                <div className="p-3 bg-zinc-900/50 rounded-xl border border-zinc-800 flex items-center justify-center h-24">
                  {navbarData.logo.primaryLogo?.url ? (
                    <img src={navbarData.logo.primaryLogo.url} alt="Primary Logo" className="max-h-16 object-contain" />
                  ) : (
                    <span className="text-zinc-600 text-xs font-mono">No logo configured (Default fallback active)</span>
                  )}
                </div>
              </div>

              <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-3">
                <label className="text-xs font-mono uppercase text-amber-400 font-bold block">Logo Alt Text</label>
                <input
                  type="text"
                  value={navbarData.logo.altText || ""}
                  onChange={(e) => updateField('logo.altText', e.target.value)}
                  placeholder="Tech Master Logo"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 font-mono"
                />
                <p className="text-zinc-500 text-xs">Used for screen readers, accessibility, and SEO validation schemas.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: NAVIGATION MENU */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-amber-400 font-serif flex items-center gap-2">
                  <Menu className="w-5 h-5" /> SECTION 2: NAVIGATION MENU (DESKTOP)
                </h2>
                <p className="text-zinc-400 text-xs">Manage menu labels, target links, display order, and publishing status.</p>
              </div>
              <button
                onClick={handleAddDesktopLink}
                className="flex items-center gap-1.5 px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 rounded-xl text-xs font-mono uppercase tracking-wider"
              >
                <Plus className="w-4 h-4" /> Add Menu Item
              </button>
            </div>

            <div className="space-y-3">
              {navbarData.menus.desktopLinks.map((item, idx) => (
                <div key={item.id || idx} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Menu Name</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleUpdateDesktopLink(idx, 'name', e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Page ID / URL</label>
                    <input
                      type="text"
                      value={item.pageUrl}
                      onChange={(e) => handleUpdateDesktopLink(idx, 'pageUrl', e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-amber-400 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Target Window</label>
                    <select
                      value={item.target || "_self"}
                      onChange={(e) => handleUpdateDesktopLink(idx, 'target', e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-amber-500"
                    >
                      <option value="_self">Current Tab (_self)</option>
                      <option value="_blank">New Tab (_blank)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Status</label>
                    <select
                      value={item.status || "Published"}
                      onChange={(e) => handleUpdateDesktopLink(idx, 'status', e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-emerald-400 focus:outline-none focus:border-amber-500 font-semibold"
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-4 sm:pt-0">
                    <button
                      onClick={() => handleUpdateDesktopLink(idx, 'visibility', !item.visibility)}
                      className={`p-2 rounded-lg border text-xs ${item.visibility ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}
                      title="Toggle Visibility"
                    >
                      {item.visibility ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDeleteDesktopLink(idx)}
                      className="p-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 rounded-lg text-xs"
                      title="Delete Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BUTTONS & COUNTER */}
        {activeTab === 'buttons' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-amber-400 font-serif flex items-center gap-2">
              <MousePointer className="w-5 h-5" /> SECTION 3: VIEWS COUNTER & LET'S TALK BUTTON
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Views Counter Card */}
              <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                  <h3 className="text-sm font-bold text-amber-400 uppercase font-mono">Views Counter Settings</h3>
                  <button
                    onClick={() => updateField('viewsCounter.enabled', !navbarData.viewsCounter.enabled)}
                    className={`px-3 py-1 rounded-full text-xs font-mono ${navbarData.viewsCounter.enabled ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-zinc-800 text-zinc-500'}`}
                  >
                    {navbarData.viewsCounter.enabled ? "ENABLED" : "DISABLED"}
                  </button>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Counter Label</label>
                  <input
                    type="text"
                    value={navbarData.viewsCounter.label}
                    onChange={(e) => updateField('viewsCounter.label', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Max Counter Value (Cap)</label>
                  <input
                    type="number"
                    value={navbarData.viewsCounter.counterValue}
                    onChange={(e) => updateField('viewsCounter.counterValue', Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-amber-400 font-mono focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1">Default 25,000,000,000 (25 Billion). Dynamic scroll counter counts up to this value on page scroll.</p>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Suffix</label>
                  <input
                    type="text"
                    value={navbarData.viewsCounter.suffix}
                    onChange={(e) => updateField('viewsCounter.suffix', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              {/* Let's Talk Button Card */}
              <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                  <h3 className="text-sm font-bold text-amber-400 uppercase font-mono">Let's Talk Button Settings</h3>
                  <button
                    onClick={() => updateField('letsTalkButton.enabled', !navbarData.letsTalkButton.enabled)}
                    className={`px-3 py-1 rounded-full text-xs font-mono ${navbarData.letsTalkButton.enabled ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-zinc-800 text-zinc-500'}`}
                  >
                    {navbarData.letsTalkButton.enabled ? "ENABLED" : "DISABLED"}
                  </button>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Button Text</label>
                  <input
                    type="text"
                    value={navbarData.letsTalkButton.buttonText}
                    onChange={(e) => updateField('letsTalkButton.buttonText', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Button Target URL / Page ID</label>
                  <input
                    type="text"
                    value={navbarData.letsTalkButton.buttonUrl}
                    onChange={(e) => updateField('letsTalkButton.buttonUrl', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-amber-400 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Style Variant</label>
                  <select
                    value={navbarData.letsTalkButton.styleVariant || "gold-sweep"}
                    onChange={(e) => updateField('letsTalkButton.styleVariant', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-300 focus:outline-none focus:border-amber-500 font-mono"
                  >
                    <option value="gold-sweep">Gold Light-Sweep Magnetic (Default)</option>
                    <option value="solid-gold">Solid Gold Button</option>
                    <option value="glass">Glassmorphism Border</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HEADER SETTINGS */}
        {activeTab === 'header' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-amber-400 font-serif flex items-center gap-2">
              <Sliders className="w-5 h-5" /> SECTION 4: HEADER SETTINGS & HEIGHTS
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { key: 'headerSettings.stickyHeader', label: 'Sticky Header' },
                { key: 'headerSettings.transparentHeader', label: 'Transparent Header' },
                { key: 'headerSettings.blurEffect', label: 'Backdrop Blur' },
                { key: 'headerSettings.glassEffect', label: 'Glassmorphism' },
              ].map((item) => {
                const isChecked = item.key.split('.').reduce((acc, curr) => acc[curr], navbarData);
                return (
                  <div key={item.key} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-300">{item.label}</span>
                    <button
                      onClick={() => updateField(item.key, !isChecked)}
                      className={`px-3 py-1 rounded-full text-xs font-mono ${isChecked ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-zinc-800 text-zinc-500'}`}
                    >
                      {isChecked ? "ON" : "OFF"}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div>
                <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Desktop Navbar Height (px)</label>
                <input
                  type="number"
                  value={navbarData.headerSettings.desktopHeight}
                  onChange={(e) => updateField('headerSettings.desktopHeight', Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-amber-400 font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Tablet Navbar Height (px)</label>
                <input
                  type="number"
                  value={navbarData.headerSettings.tabletHeight}
                  onChange={(e) => updateField('headerSettings.tabletHeight', Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-amber-400 font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Mobile Navbar Height (px)</label>
                <input
                  type="number"
                  value={navbarData.headerSettings.mobileHeight}
                  onChange={(e) => updateField('headerSettings.mobileHeight', Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-amber-400 font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: COLORS & STYLING */}
        {activeTab === 'colors' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-amber-400 font-serif flex items-center gap-2">
              <Palette className="w-5 h-5" /> SECTION 5: NAVBAR COLORS & BRAND THEMING
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { key: 'colors.textColor', label: 'Default Text Color', defaultVal: '#9CA3AF' },
                { key: 'colors.hoverColor', label: 'Hover Text Color', defaultVal: '#D4AF37' },
                { key: 'colors.activeColor', label: 'Active Link Gold', defaultVal: '#D4AF37' },
                { key: 'colors.borderColor', label: 'Border Color', defaultVal: 'rgba(212, 175, 55, 0.3)' },
                { key: 'colors.glowColor', label: 'Glow Drop-Shadow', defaultVal: 'rgba(212, 175, 55, 0.6)' },
                { key: 'colors.buttonColor', label: 'Button Color', defaultVal: '#D4AF37' },
              ].map((colorItem) => {
                const val = colorItem.key.split('.').reduce((acc, curr) => acc[curr], navbarData);
                return (
                  <div key={colorItem.key} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                    <label className="text-xs font-mono text-zinc-300 block">{colorItem.label}</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={val?.startsWith('#') ? val : '#D4AF37'}
                        onChange={(e) => updateField(colorItem.key, e.target.value)}
                        className="w-8 h-8 bg-transparent rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={val || colorItem.defaultVal}
                        onChange={(e) => updateField(colorItem.key, e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-amber-400 font-mono"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 6: SCROLL SETTINGS */}
        {activeTab === 'scroll' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-amber-400 font-serif flex items-center gap-2">
              <Scroll className="w-5 h-5" /> SECTION 6: SCROLL BEHAVIOR & THRESHOLDS
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-zinc-300">Sticky On Scroll</span>
                  <button
                    onClick={() => updateField('scrollSettings.stickyOnScroll', !navbarData.scrollSettings.stickyOnScroll)}
                    className={`px-3 py-1 rounded-full text-xs font-mono ${navbarData.scrollSettings.stickyOnScroll ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-zinc-800 text-zinc-500'}`}
                  >
                    {navbarData.scrollSettings.stickyOnScroll ? "ON" : "OFF"}
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-zinc-300">Hide On Scroll Down</span>
                  <button
                    onClick={() => updateField('scrollSettings.hideOnScroll', !navbarData.scrollSettings.hideOnScroll)}
                    className={`px-3 py-1 rounded-full text-xs font-mono ${navbarData.scrollSettings.hideOnScroll ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-zinc-800 text-zinc-500'}`}
                  >
                    {navbarData.scrollSettings.hideOnScroll ? "ON" : "OFF"}
                  </button>
                </div>
              </div>

              <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-4">
                <div>
                  <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Scroll Threshold (px)</label>
                  <input
                    type="number"
                    value={navbarData.scrollSettings.scrollThreshold}
                    onChange={(e) => updateField('scrollSettings.scrollThreshold', Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-amber-400 font-mono"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1">Scroll distance in pixels before glassmorphism background transitions.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: RESPONSIVE & MOBILE */}
        {activeTab === 'responsive' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-amber-400 font-serif flex items-center gap-2">
              <Smartphone className="w-5 h-5" /> SECTION 7: RESPONSIVE BREAKPOINTS & MOBILE DRAWER
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                <label className="text-xs font-mono text-zinc-300 block">Menu Breakpoint</label>
                <select
                  value={navbarData.responsiveSettings.menuBreakpoint || "lg"}
                  onChange={(e) => updateField('responsiveSettings.menuBreakpoint', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-amber-400 font-mono"
                >
                  <option value="lg">Desktop (lg: 1024px)</option>
                  <option value="md">Tablet (md: 768px)</option>
                </select>
              </div>

              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                <label className="text-xs font-mono text-zinc-300 block">Mobile Drawer Width</label>
                <input
                  type="text"
                  value={navbarData.responsiveSettings.mobileDrawerWidth || "100%"}
                  onChange={(e) => updateField('responsiveSettings.mobileDrawerWidth', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: SOCIAL LINKS */}
        {activeTab === 'socials' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-amber-400 font-serif flex items-center gap-2">
                  <Share2 className="w-5 h-5" /> SECTION 8: NAVBAR & OVERLAY SOCIAL LINKS
                </h2>
                <p className="text-zinc-400 text-xs">Manage social media handles displayed in the mobile drawer and footer overlay.</p>
              </div>
              <button
                onClick={handleAddSocial}
                className="flex items-center gap-1.5 px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 rounded-xl text-xs font-mono uppercase tracking-wider"
              >
                <Plus className="w-4 h-4" /> Add Social Link
              </button>
            </div>

            <div className="space-y-3">
              {navbarData.socialLinks.map((soc, idx) => (
                <div key={soc.id || idx} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Platform</label>
                    <input
                      type="text"
                      value={soc.platform}
                      onChange={(e) => handleUpdateSocial(idx, 'platform', e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Social URL</label>
                    <input
                      type="text"
                      value={soc.url}
                      onChange={(e) => handleUpdateSocial(idx, 'url', e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-amber-400 font-mono"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-4 sm:pt-0">
                    <button
                      onClick={() => handleUpdateSocial(idx, 'visibility', !soc.visibility)}
                      className={`p-2 rounded-lg border text-xs ${soc.visibility ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}
                    >
                      {soc.visibility ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDeleteSocial(idx)}
                      className="p-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 rounded-lg text-xs"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: SEO & SCHEMA */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-amber-400 font-serif flex items-center gap-2">
              <Globe className="w-5 h-5" /> SECTION 9: STRUCTURED DATA & NAVIGATION SCHEMA
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">SiteNavigationElement JSON-LD Schema</label>
                <textarea
                  rows={4}
                  value={navbarData.seo.structuredData || ""}
                  onChange={(e) => updateField('seo.structuredData', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Organization Logo JSON-LD Schema</label>
                <textarea
                  rows={4}
                  value={navbarData.seo.logoSchema || ""}
                  onChange={(e) => updateField('seo.logoSchema', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

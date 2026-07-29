import React, { useState, useEffect } from 'react';
import { Layout, Mail, Phone, MapPin, Save, Plus, Trash2, Check, AlertCircle, Share2, Globe, FileText, Scale } from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

export const FooterCMS = () => {
  const { db, updateSection } = useDatabase();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const defaultFooter = {
    tagline: "WE CRAFT DIGITAL EMPIRES THAT SHAPE CULTURE AND DRIVE INFLUENCE.",
    copyrightText: "© 2026 Tech Master. All Rights Reserved.",
    contactInfo: {
      email: "collaborations@techmaster.com",
      phone: "+91 98765 43210",
      address: "Tech Master Studios, Empire Tower, New Delhi, India"
    },
    quickLinks: [
      { id: "fl-1", label: "Home", pageUrl: "home" },
      { id: "fl-2", label: "About Founder", pageUrl: "about" },
      { id: "fl-3", label: "Founder's Journey", pageUrl: "journey" },
      { id: "fl-4", label: "Our Work", pageUrl: "portfolio" },
      { id: "fl-5", label: "Careers", pageUrl: "career" },
      { id: "fl-6", label: "Contact Us", pageUrl: "contact" }
    ],
    socialLinks: [
      { id: "soc-1", platform: "YouTube", url: "https://youtube.com/@techmasterhq" },
      { id: "soc-2", platform: "Instagram", url: "https://instagram.com/techmasterco" },
      { id: "soc-3", platform: "LinkedIn", url: "https://linkedin.com/company/techmaster" }
    ]
  };

  const [footerState, setFooterState] = useState(() => {
    return db?.footer ? { ...defaultFooter, ...db.footer } : defaultFooter;
  });

  useEffect(() => {
    if (db?.footer) {
      setFooterState((prev) => ({ ...defaultFooter, ...db.footer }));
    }
  }, [db?.footer]);

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMsg('');
    try {
      await updateSection('footer', footerState);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save footer');
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (path, value) => {
    setFooterState((prev) => {
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

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-white font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl backdrop-blur-xl shadow-2xl">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
              <Layout className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold font-serif text-amber-400">Footer CMS Control Center</h1>
          </div>
          <p className="text-zinc-400 text-xs font-mono">
            Manage Website Footer Tagline, Address, Phone, Social Media & Copyright Notice
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-semibold">
              <Check className="w-4 h-4" /> Published Footer
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
            {isSaving ? "Saving..." : "Save Footer"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase text-amber-400 block">Footer Tagline</label>
            <textarea
              rows={3}
              value={footerState.tagline || ""}
              onChange={(e) => updateField('tagline', e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs text-white font-serif"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-mono uppercase text-amber-400 block">Copyright Notice</label>
            <input
              type="text"
              value={footerState.copyrightText || ""}
              onChange={(e) => updateField('copyrightText', e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-300 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
            <label className="text-xs font-mono uppercase text-zinc-400 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-400" /> Contact Email
            </label>
            <input
              type="text"
              value={footerState.contactInfo?.email || ""}
              onChange={(e) => updateField('contactInfo.email', e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-amber-400 font-mono"
            />
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
            <label className="text-xs font-mono uppercase text-zinc-400 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-400" /> Phone Number
            </label>
            <input
              type="text"
              value={footerState.contactInfo?.phone || ""}
              onChange={(e) => updateField('contactInfo.phone', e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-amber-400 font-mono"
            />
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
            <label className="text-xs font-mono uppercase text-zinc-400 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> Studio Address
            </label>
            <input
              type="text"
              value={footerState.contactInfo?.address || ""}
              onChange={(e) => updateField('contactInfo.address', e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

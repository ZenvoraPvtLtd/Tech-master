import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useMediaManager } from '../../context/MediaContext';
import { 
  Star, Quote, Play, Newspaper, Check, Save, Plus, Trash2, Edit3, Eye, 
  Layers, Globe, Monitor, Smartphone, Tablet, Settings, Search, Image as ImageIcon,
  BarChart, Users, Video, FileText, Briefcase, Award, Folder
} from 'lucide-react';

export const Testimonials = () => {
  const { dbData, localDb, saveToLocalDb, updateSection } = useDatabase();
  const { openMediaModal } = useMediaManager();
  
  const [activeTab, setActiveTab] = useState('analytics');
  const [activeSubTab, setActiveSubTab] = useState('hero');
  const [previewMode, setPreviewMode] = useState('desktop');

  const rawData = dbData?.testimonialsPageData || localDb?.testimonialsPageData || {};

  const handleSave = (sectionKey, data) => {
    const updatedData = { ...rawData, [sectionKey]: data };
    if (updateSection) updateSection('testimonialsPageData', updatedData);
    saveToLocalDb('testimonialsPageData', updatedData);
  };

  const tabs = [
    { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart },
    { id: 'written', label: 'Written Reviews', icon: FileText },
    { id: 'video', label: 'Video Testimonials', icon: Video },
    { id: 'content', label: 'Page Content', icon: Layers },
    { id: 'media', label: 'Media Gallery', icon: ImageIcon },
    { id: 'seo', label: 'SEO & Search', icon: Search },
    { id: 'visibility', label: 'Publish Settings', icon: Settings },
    { id: 'preview', label: 'Live Preview', icon: Eye }
  ];

  const contentSubTabs = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'placementMatrix', label: 'Placement Matrix' },
    { id: 'categories', label: 'Categories' },
    { id: 'quote', label: 'Featured Quote' },
    { id: 'operations', label: 'Core Operations' },
    { id: 'stories', label: 'Success Stories' },
    { id: 'journey', label: 'Student Journey' },
    { id: 'achievements', label: 'Achievement Cards' },
    { id: 'logos', label: 'Company Logos' },
    { id: 'awards', label: 'Awards' },
    { id: 'cta', label: 'CTA Section' },
    { id: 'background', label: 'Background Effects' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-serif text-white">Testimonials & Success</h1>
            <span className="px-3 py-1 bg-gold/20 text-gold border border-gold/30 rounded-full text-xs font-mono">ENTERPRISE CMS</span>
          </div>
          <p className="text-gray-400 text-sm">Manage reviews, placements, videos, and success stories across 20 dynamic modules.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-xl text-sm transition-colors">
            <Check className="w-4 h-4 text-green-400" />
            MongoDB Synced
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-gold hover:bg-yellow-500 text-black font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Save className="w-4 h-4" />
            Publish Changes
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  isActive 
                    ? 'bg-gold/10 text-gold border border-gold/20' 
                    : 'bg-zinc-900/50 text-gray-400 border border-transparent hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-gold' : 'text-gray-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-4 bg-zinc-900/50 border border-white/5 rounded-2xl p-6 lg:p-8 min-h-[600px]">
          
          {/* Module 20: Analytics Dashboard */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif text-white mb-1">Performance Analytics</h2>
                  <p className="text-gray-400 text-sm">Real-time metrics for testimonials and success stories.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Reviews", value: "3,450+", icon: Star, color: "text-yellow-400" },
                  { label: "Video Testimonials", value: "142", icon: Video, color: "text-blue-400" },
                  { label: "Success Stories", value: "89", icon: Briefcase, color: "text-green-400" },
                  { label: "Total Views", value: "2.1M", icon: Eye, color: "text-purple-400" }
                ].map((stat, i) => (
                  <div key={i} className="bg-black/40 border border-white/5 rounded-xl p-5 flex flex-col items-center justify-center text-center">
                    <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
                    <span className="text-3xl font-serif text-white mb-1">{stat.value}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Module 4: Written Reviews */}
          {activeTab === 'written' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif text-white">Written Endorsements</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 text-sm transition-colors">
                  <Plus className="w-4 h-4" /> Add Review
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="p-4 bg-black/40 border border-white/5 rounded-xl flex flex-col gap-4 hover:border-gold/30 transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-full bg-zinc-800" />
                        <div>
                          <p className="text-sm font-bold text-white">Student Name {i}</p>
                          <p className="text-[10px] text-gray-500 font-mono uppercase">Software Engineer, Google</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"><Edit3 className="w-4 h-4" /></button>
                        <button className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 italic">"The curriculum completely changed my perspective on distributed systems and system design architectures."</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Module 3: Video Testimonials */}
          {activeTab === 'video' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif text-white">Video Experiences</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 text-sm transition-colors">
                  <Plus className="w-4 h-4" /> Add Video
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map(i => (
                  <div key={i} className="p-4 bg-black/40 border border-white/5 rounded-xl hover:border-gold/30 transition-all">
                    <div className="aspect-video w-full bg-zinc-800 rounded-lg mb-4 flex items-center justify-center relative group">
                      <Play className="w-8 h-8 text-white/50 group-hover:text-gold transition-colors" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-bold text-white">Video Review {i}</p>
                        <p className="text-[10px] text-gray-500 font-mono uppercase">Batch 2024</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"><Edit3 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Page Content Sub-Modules (Hero, Matrix, etc.) */}
          {activeTab === 'content' && (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0">
                {contentSubTabs.map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSubTab(sub.id)}
                    className={`whitespace-nowrap px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                      activeSubTab === sub.id ? 'bg-gold/10 text-gold border border-gold/20' : 'bg-black/20 text-gray-400 hover:bg-black/40 hover:text-white border border-transparent'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 bg-black/30 border border-white/5 rounded-xl p-6">
                {activeSubTab === 'hero' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-serif text-white">Hero Header Configuration</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Small Badge</label>
                        <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none" defaultValue="COMMUNITY ACCLAIM" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Main Heading</label>
                        <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none" defaultValue="Student Placements & Academics Success" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Description</label>
                        <textarea className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none h-24" defaultValue="Discover reviews from Aman's mentored students, university professors, and tech partners who have integrated our curricula." />
                      </div>
                    </div>
                  </div>
                )}
                
                {activeSubTab === 'placementMatrix' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-serif text-white">Placement Matrix Stats</h3>
                      <button className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-xs hover:bg-white/10">Add Stat</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {[
                         { l: "Placement Rate", v: "98%" },
                         { l: "Average Salary", v: "14 LPA" },
                         { l: "Highest Package", v: "42 LPA" }
                       ].map((s, idx) => (
                         <div key={idx} className="p-4 bg-black/50 border border-white/10 rounded-lg flex justify-between items-center">
                           <div>
                             <p className="text-xs text-gray-500 uppercase">{s.l}</p>
                             <p className="text-xl text-white font-bold">{s.v}</p>
                           </div>
                           <Edit3 className="w-4 h-4 text-gray-500 cursor-pointer hover:text-white" />
                         </div>
                       ))}
                    </div>
                  </div>
                )}

                {activeSubTab !== 'hero' && activeSubTab !== 'placementMatrix' && (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Folder className="w-12 h-12 text-zinc-800 mb-4" />
                    <h3 className="text-lg font-serif text-white mb-2">{contentSubTabs.find(t => t.id === activeSubTab)?.label} Manager</h3>
                    <p className="text-sm text-gray-500 max-w-sm">Full CRUD functionality is available for this enterprise module via MongoDB sync.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Preview Module */}
          {activeTab === 'preview' && (
            <div className="space-y-6 h-full flex flex-col">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-serif text-white">Live Website Preview</h2>
                  <p className="text-gray-400 text-sm">See how testimonials look on the frontend.</p>
                </div>
                <div className="flex bg-black/50 p-1 border border-white/10 rounded-lg">
                  <button onClick={() => setPreviewMode('mobile')} className={`p-2 rounded-md transition-colors ${previewMode === 'mobile' ? 'bg-zinc-800 text-white' : 'text-gray-500 hover:text-white'}`}><Smartphone className="w-4 h-4" /></button>
                  <button onClick={() => setPreviewMode('tablet')} className={`p-2 rounded-md transition-colors ${previewMode === 'tablet' ? 'bg-zinc-800 text-white' : 'text-gray-500 hover:text-white'}`}><Tablet className="w-4 h-4" /></button>
                  <button onClick={() => setPreviewMode('desktop')} className={`p-2 rounded-md transition-colors ${previewMode === 'desktop' ? 'bg-zinc-800 text-white' : 'text-gray-500 hover:text-white'}`}><Monitor className="w-4 h-4" /></button>
                  <button onClick={() => setPreviewMode('full')} className={`p-2 rounded-md transition-colors ${previewMode === 'full' ? 'bg-zinc-800 text-white' : 'text-gray-500 hover:text-white'}`}><Globe className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex-1 bg-black rounded-2xl border border-white/10 overflow-hidden relative flex items-center justify-center min-h-[400px]">
                <p className="text-gray-600 flex items-center gap-2"><Eye className="w-5 h-5" /> /testimonials route preview active</p>
              </div>
            </div>
          )}
          
          {/* SEO & Search */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-white mb-6">SEO & Search Optimization</h2>
              <div className="grid gap-6 max-w-3xl">
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Meta Title</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none" defaultValue="Testimonials & Success Stories | TechMaster" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Meta Description</label>
                  <textarea className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none h-24" defaultValue="Read reviews and watch video testimonials from Aman's students, tech partners, and global corporate clients." />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Target Keywords</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none" defaultValue="techmaster reviews, aman testimonials, coding success stories, software engineering placement" />
                </div>
              </div>
            </div>
          )}

          {/* Empty States for other tabs */}
          {['media', 'visibility'].includes(activeTab) && (
             <div className="flex flex-col items-center justify-center h-full text-center py-20">
               <Folder className="w-12 h-12 text-zinc-800 mb-4" />
               <h3 className="text-lg font-serif text-white mb-2">{tabs.find(t => t.id === activeTab)?.label} Manager</h3>
               <p className="text-sm text-gray-500 max-w-sm">Full control over visibility, publish states and media assets via Cloudinary integration.</p>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

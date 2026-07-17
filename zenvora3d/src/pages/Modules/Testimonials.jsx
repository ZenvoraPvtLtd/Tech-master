import React, { useState } from 'react';
import { useMediaManager } from "../../context/MediaContext";
import { useDatabase } from '../../context/DatabaseContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Switch } from '../../components/ui/Switch';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { 
  Award, Eye, Save, RefreshCw, ChevronDown, ChevronRight, 
  Edit3, Trash2, ArrowUp, ArrowDown, X, UploadCloud, 
  Link as LinkIcon, AlertCircle, Settings, Plus, Milestone, 
  Compass, Lightbulb, Globe, ShieldCheck, Film, MessageSquare,
  ListCollapse, Quote, Video, Target
} from 'lucide-react';

export const Testimonials = () => {
  const { db, updateSection } = useDatabase();
  const testPageData = db?.testimonialsPage || {};

  // Collapsible cards state
  const [expandedCards, setExpandedCards] = useState({
    hero: true,
    successStats: false,
    videoTestimonials: false,
    writtenTestimonials: false,
    categories: false,
    featuredQuote: false,
    whatWeDo: false,
    seo: false
  });

  const toggleCard = (cardId) => {
    setExpandedCards(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  // Toast state
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Single Forms State
  const [heroForm, setHeroForm] = useState(testPageData?.hero || {});
  const [quoteForm, setQuoteForm] = useState(testPageData?.featuredQuote || {});
  const [seoForm, setSeoForm] = useState(testPageData?.seo || {});

  React.useEffect(() => {
    if (testPageData?.hero) setHeroForm(testPageData.hero);
    if (testPageData?.featuredQuote) setQuoteForm(testPageData.featuredQuote);
    if (testPageData?.seo) setSeoForm(testPageData.seo);
  }, [db?.testimonialsPage]);

  // List editor states
  const [activeEditorSection, setActiveEditorSection] = useState(null); 
  const [editingItemId, setEditingItemId] = useState(null);
  const [draftItem, setDraftItem] = useState({});

  const { openMediaManager } = useMediaManager();
  const simulateMediaUpload = (targetKey, isObjectForm = false) => {
    openMediaManager({
      onSelect: (url) => {
        if (activeEditorSection) {
          setDraftItem(prev => ({ ...prev, [targetKey]: url }));
        } else {
          if (isObjectForm) {
            if (targetKey in heroForm || ['bgImage'].includes(targetKey)) {
              setHeroForm(prev => ({ ...prev, [targetKey]: url }));
            } else if (targetKey in seoForm || ['ogImageUrl'].includes(targetKey)) {
              setSeoForm(prev => ({ ...prev, [targetKey]: url }));
            }
          }
        }
      }
    });
  };

  const handleSingleSave = (sectionKey, data) => {
    updateSection('testimonialsPage', { [sectionKey]: data });
    showToast(`${sectionKey.toUpperCase()} section parameters updated successfully.`);
  };

  const updateSectionMeta = (secId, key, val) => {
    const currentSettings = testPageData.sectionSettings || {};
    const updatedSettings = {
      ...currentSettings,
      [secId]: {
        ...(currentSettings[secId] || { order: 1, status: "Active" }),
        [key]: val
      }
    };
    updateSection('testimonialsPage', { sectionSettings: updatedSettings });
  };

  // Reusable Media Upload Component
  const renderMediaUpload = (label, value, fieldKey, isOptional = false, isObjectForm = false) => {
    return (
      <div className="border border-zinc-900 p-4 rounded bg-zinc-900/10 flex flex-col gap-2 text-left">
        <span className="text-[9px] font-mono text-zinc-500 block uppercase">{label} {isOptional && <span className="text-zinc-650">(Optional)</span>}</span>
        
        {value ? (
          <div className="relative w-full h-24 bg-zinc-950 border border-zinc-800 rounded overflow-hidden flex items-center justify-center">
            {value.match(/\.(mp4|webm)$/i) ? (
              <video src={value} className="w-full h-full object-cover" controls />
            ) : (
              <img src={value} className="w-full h-full object-cover" />
            )}
            <div className="absolute bottom-1 right-1 flex items-center gap-1">
              <button 
                type="button"
                onClick={() => simulateMediaUpload(fieldKey, isObjectForm)} 
                className="p-1 bg-black/60 rounded text-luxury-gold hover:text-white"
                title="Replace File"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button 
                type="button"
                onClick={() => {
                  if (activeEditorSection) {
                    setDraftItem(prev => ({ ...prev, [fieldKey]: "" }));
                  } else {
                    if (isObjectForm) {
                      setHeroForm(prev => ({ ...prev, [fieldKey]: "" }));
                      setSeoForm(prev => ({ ...prev, [fieldKey]: "" }));
                    }
                  }
                  showToast("File removed.");
                }} 
                className="p-1 bg-black/60 rounded text-rose-400 hover:text-white"
                title="Remove File"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => simulateMediaUpload(fieldKey, isObjectForm)} 
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); simulateMediaUpload(fieldKey, isObjectForm); }}
            className="h-24 border border-dashed border-zinc-850 hover:border-luxury-gold/30 rounded flex flex-col items-center justify-center gap-1 text-zinc-600 cursor-pointer transition-all"
          >
            <UploadCloud className="w-4 h-4" />
            <span className="text-[8px] uppercase font-mono tracking-wider">Drag & Drop or Click to Browse (Cloudinary)</span>
          </div>
        )}
      </div>
    );
  };

  // --- REUSABLE LIST MANAGER ---
  const renderListManager = ({
    sectionKey,
    fields = [],
    displayColumns = [],
    maxItems = 99
  }) => {
    const listData = testPageData[sectionKey] || [];
    const isEditing = activeEditorSection === sectionKey;

    const handleSaveItem = () => {
      let nextList = [];
      if (editingItemId) {
        nextList = listData.map(item => item.id === editingItemId ? { ...item, ...draftItem } : item);
        showToast("Item updated successfully.");
      } else {
        if (listData.length >= maxItems) {
          showToast(`Maximum limit of ${maxItems} items reached.`, 'error');
          return;
        }
        const newItem = { ...draftItem, id: `item-${Date.now()}`, status: draftItem.status || 'Active', order: listData.length + 1 };
        nextList = [...listData, newItem];
        showToast("New item created.");
      }
      updateSection('testimonialsPage', { [sectionKey]: nextList });
      setActiveEditorSection(null);
      setEditingItemId(null);
      setDraftItem({});
    };

    const handleDeleteItem = (id) => {
      if (window.confirm("Are you sure you want to delete this item?")) {
        const nextList = listData.filter(item => item.id !== id);
        updateSection('testimonialsPage', { [sectionKey]: nextList });
        showToast("Item deleted.");
      }
    };

    const handleToggleStatus = (id, currentStatus) => {
      const nextList = listData.map(item => item.id === id ? { ...item, status: currentStatus === 'Active' ? 'Inactive' : 'Active' } : item);
      updateSection('testimonialsPage', { [sectionKey]: nextList });
    };

    const handleMoveItem = (index, direction) => {
      const nextList = [...listData];
      const target = index + direction;
      if (target >= 0 && target < nextList.length) {
        const temp = nextList[index];
        nextList[index] = nextList[target];
        nextList[target] = temp;
        updateSection('testimonialsPage', { [sectionKey]: nextList });
      }
    };

    const handleStartAdd = () => {
      setActiveEditorSection(sectionKey);
      setEditingItemId(null);
      const defaultObj = {};
      fields.forEach(f => {
        defaultObj[f.key] = f.type === 'number' ? 0 : f.type === 'switch' ? false : '';
      });
      setDraftItem(defaultObj);
    };

    const handleStartEdit = (item) => {
      setActiveEditorSection(sectionKey);
      setEditingItemId(item.id);
      setDraftItem({ ...item });
    };

    return (
      <div className="flex flex-col gap-4 text-left">
        {!isEditing && (
          <div className="flex flex-col gap-3">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-900 text-zinc-500 font-mono uppercase text-[9px] tracking-wider">
                    <th className="py-2 px-3">Order</th>
                    {displayColumns.map(col => (
                      <th key={col.key} className="py-2 px-3">{col.label}</th>
                    ))}
                    <th className="py-2 px-3 text-center">Status</th>
                    <th className="py-2 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listData.map((item, idx) => (
                    <tr key={item.id || idx} className="border-b border-zinc-900/60 hover:bg-zinc-900/10 text-zinc-300">
                      <td className="py-2.5 px-3 font-mono">{idx + 1}</td>
                      {displayColumns.map(col => (
                        <td key={col.key} className="py-2.5 px-3 max-w-[180px] truncate">
                          {col.type === 'image' ? (
                            item[col.key] ? (
                              <div className="w-8 h-8 rounded border border-zinc-800 bg-zinc-950 flex items-center justify-center overflow-hidden">
                                <img src={item[col.key]} className="w-full h-full object-cover" />
                              </div>
                            ) : '-'
                          ) : item[col.key] || '-'}
                        </td>
                      ))}
                      <td className="py-2.5 px-3 text-center">
                        <Switch 
                          checked={item.status === 'Active'} 
                          onChange={() => handleToggleStatus(item.id, item.status)}
                        />
                      </td>
                      <td className="py-2.5 px-3 text-right flex items-center justify-end gap-1.5 mt-0.5">
                        <button type="button" onClick={() => handleMoveItem(idx, -1)} disabled={idx === 0} className="p-1 hover:bg-zinc-900 rounded disabled:opacity-30"><ArrowUp className="w-3.5 h-3.5" /></button>
                        <button type="button" onClick={() => handleMoveItem(idx, 1)} disabled={idx === listData.length - 1} className="p-1 hover:bg-zinc-900 rounded disabled:opacity-30"><ArrowDown className="w-3.5 h-3.5" /></button>
                        <button type="button" onClick={() => handleStartEdit(item)} className="p-1 hover:bg-zinc-900 rounded text-amber-500"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button type="button" onClick={() => handleDeleteItem(item.id)} className="p-1 hover:bg-zinc-900 rounded text-rose-500"><Trash2 className="w-3.5 h-3.5" /></button>
                      </td>
                    </tr>
                  ))}
                  {listData.length === 0 && (
                    <tr>
                      <td colSpan={displayColumns.length + 3} className="text-center py-6 text-zinc-500 font-mono italic">No records stored inside database.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {listData.length < maxItems && (
              <div>
                <Button type="button" onClick={handleStartAdd} variant="secondary" size="sm" className="gap-1 text-xs border border-zinc-805 text-luxury-gold">
                  <Plus className="w-3.5 h-3.5" /> <span>Add Row Item</span>
                </Button>
              </div>
            )}
          </div>
        )}

        {isEditing && (
          <div className="border border-zinc-900 p-4 rounded bg-zinc-900/10 flex flex-col gap-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-luxury-gold block border-b border-zinc-900 pb-1.5">
              {editingItemId ? "Edit Record Item" : "Create New Record"}
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map(field => {
                if (field.type === 'textarea') {
                  return (
                    <div key={field.key} className="md:col-span-2">
                      <Input 
                        label={field.label} 
                        textarea 
                        rows={3} 
                        value={draftItem[field.key] || ''} 
                        onChange={e => setDraftItem({ ...draftItem, [field.key]: e.target.value })} 
                      />
                    </div>
                  );
                }
                if (field.type === 'upload') {
                  return (
                    <div key={field.key}>
                      {renderMediaUpload(field.label, draftItem[field.key], field.key, field.optional)}
                    </div>
                  );
                }
                if (field.type === 'switch') {
                  return (
                    <div key={field.key} className="p-3 bg-zinc-900/30 border border-zinc-900 rounded flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-400">{field.label}</span>
                      <Switch checked={draftItem[field.key] || false} onChange={val => setDraftItem({ ...draftItem, [field.key]: val })} />
                    </div>
                  );
                }
                if (field.type === 'select') {
                  return (
                    <div key={field.key} className="flex flex-col gap-1.5 text-left">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{field.label}</label>
                      <select 
                        className="bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-zinc-200 outline-none focus:border-luxury-gold/30" 
                        value={draftItem[field.key] || field.options[0]} 
                        onChange={e => setDraftItem({ ...draftItem, [field.key]: e.target.value })}
                      >
                        {field.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  );
                }
                return (
                  <Input 
                    key={field.key}
                    label={field.label} 
                    type={field.type || 'text'} 
                    value={draftItem[field.key] || ''} 
                    onChange={e => setDraftItem({ ...draftItem, [field.key]: e.target.value })} 
                  />
                );
              })}
            </div>

            <div className="flex justify-end gap-2 border-t border-zinc-900/60 pt-2.5">
              <button type="button" onClick={() => { setActiveEditorSection(null); setEditingItemId(null); setDraftItem({}); }} className="px-3 py-1.5 text-xs text-zinc-550 hover:text-white">Cancel</button>
              <button type="button" onClick={handleSaveItem} className="px-4 py-1.5 bg-luxury-gold text-black font-bold text-xs rounded">Save Record</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 8 Segments
  const sectionsList = [
    { id: "hero", label: "Hero Settings", icon: Target },
    { id: "successStats", label: "Success Stats", icon: Milestone },
    { id: "videoTestimonials", label: "Video Testimonials", icon: Video },
    { id: "writtenTestimonials", label: "Written Testimonials", icon: MessageSquare },
    { id: "categories", label: "Category Sections", icon: ListCollapse },
    { id: "featuredQuote", label: "Featured Quote", icon: Quote },
    { id: "whatWeDo", label: "What We Do Operations", icon: Compass },
    { id: "seo", label: "SEO Parameters", icon: Globe }
  ];

  // Dynamic sorting at section level
  const sectionSettings = testPageData.sectionSettings || {};
  const sortedSections = [...sectionsList].sort((a, b) => {
    const orderA = sectionSettings[a.id]?.order ?? 99;
    const orderB = sectionSettings[b.id]?.order ?? 99;
    return orderA - orderB;
  });

  return (
    <div className="flex flex-col gap-6 text-left relative">
      
      {/* TOAST SYSTEM */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[100] px-4 py-3 rounded-md shadow-lg border flex items-center gap-2.5 bg-zinc-950 border-luxury-gold/30 text-white font-sans`}>
          <AlertCircle className="w-4 h-4 text-luxury-gold" />
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      )}

      {/* HEADER ACTION CONTROLS */}
      <div className="border-b border-zinc-800/80 pb-5 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-medium tracking-wide text-zinc-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-luxury-gold" />
            Testimonials CMS Core
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Build placements records, client reviews, category modules, video testimonies, quote widgets, and custom controls.
          </p>
        </div>
      </div>

      {/* SEGMENTS ACCORDION */}
      <div className="flex flex-col gap-4 max-w-5xl">
        {sortedSections.map((sec) => {
          const sectionMeta = sectionSettings[sec.id] || { order: sortedSections.findIndex(s => s.id === sec.id) + 1, status: "Active" };
          const isActive = sectionMeta.status === "Active";
          const Icon = sec.icon;

          return (
            <Card key={sec.id} className="border border-zinc-800/80 overflow-hidden bg-zinc-950/20">
              <div 
                onClick={() => toggleCard(sec.id)}
                className="p-4 bg-zinc-900/30 flex items-center justify-between cursor-pointer hover:bg-zinc-900/50 transition-all select-none"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-luxury-gold' : 'text-zinc-500'}`} />
                  <span className="font-serif text-sm font-semibold tracking-wider uppercase text-zinc-200">{sec.label}</span>
                  {!isActive && <Badge variant="secondary" className="bg-zinc-805 text-zinc-400">Hidden</Badge>}
                </div>
                {expandedCards[sec.id] ? <ChevronDown className="w-4 h-4 text-zinc-550" /> : <ChevronRight className="w-4 h-4 text-zinc-550" />}
              </div>

              {expandedCards[sec.id] && (
                <div className="p-5 border-t border-zinc-900/50 flex flex-col gap-5 bg-black/10">
                  
                  {/* INLINE SECTION LEVEL META CONFIG (SILENT CHANGES) */}
                  <div className="p-3 mb-2 rounded border border-zinc-900 bg-zinc-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-zinc-400">Section Status:</span>
                      <Switch 
                        checked={isActive} 
                        onChange={(checked) => updateSectionMeta(sec.id, 'status', checked ? 'Active' : 'Inactive')}
                      />
                      <span className="text-[10px] font-mono text-zinc-500">({isActive ? 'Visible on Website' : 'Hidden from Website'})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-zinc-400">Display Order:</span>
                      <input 
                        type="number" 
                        value={sectionMeta.order}
                        onChange={e => updateSectionMeta(sec.id, 'order', parseInt(e.target.value) || 1)}
                        className="w-12 bg-zinc-900 border border-zinc-850 rounded px-2 py-1 text-center text-xs font-semibold text-zinc-200 focus:border-luxury-gold/40 outline-none" 
                      />
                    </div>
                  </div>

                  {/* SECTION FIELDS */}
                  {sec.id === 'hero' && (
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Page Title Headline" value={heroForm.title || ''} onChange={e => setHeroForm({ ...heroForm, title: e.target.value })} />
                        <Input label="Small Badge Tagline" value={heroForm.smallBadge || ''} onChange={e => setHeroForm({ ...heroForm, smallBadge: e.target.value })} />
                        <Input label="Highlighted Text" value={heroForm.highlightText || ''} onChange={e => setHeroForm({ ...heroForm, highlightText: e.target.value })} />
                        <Input label="Background Overlay Value" value={heroForm.bgOverlay || ''} onChange={e => setHeroForm({ ...heroForm, bgOverlay: e.target.value })} placeholder="rgba(0,0,0,0.7)" />
                        <Input label="Background Opacity %" type="number" value={heroForm.bgOpacity || 70} onChange={e => setHeroForm({ ...heroForm, bgOpacity: parseInt(e.target.value) || 70 })} />
                        <Input label="Background Gradient Style" value={heroForm.bgGradient || ''} onChange={e => setHeroForm({ ...heroForm, bgGradient: e.target.value })} placeholder="linear-gradient(to bottom, transparent, #060606)" />
                        
                        <div className="md:col-span-2">
                          <Input label="Detailed Hero Sub-Description Text" textarea rows={3} value={heroForm.description || ''} onChange={e => setHeroForm({ ...heroForm, description: e.target.value })} />
                        </div>
                        <div className="md:col-span-2">
                          {renderMediaUpload("Custom Hero Background Image", heroForm.bgImage, "bgImage", true, true)}
                        </div>
                      </div>
                      <div className="flex justify-end border-t border-zinc-900 pt-3">
                        <Button type="button" onClick={() => handleSingleSave('hero', heroForm)} variant="primary" size="sm" className="bg-luxury-gold text-black font-bold">Save Page Settings</Button>
                      </div>
                    </div>
                  )}

                  {sec.id === 'successStats' && (
                    <div>
                      {renderListManager({
                        sectionKey: 'successStats',
                        maxItems: 8,
                        displayColumns: [
                          { key: 'label', label: 'Stat Label' },
                          { key: 'value', label: 'Number Value' },
                          { key: 'suffix', label: 'Suffix' }
                        ],
                        fields: [
                          { key: 'label', label: 'Stat Label (e.g. Placement Rate)', type: 'text' },
                          { key: 'value', label: 'Stat Value Number (e.g. 94.2)', type: 'text' },
                          { key: 'suffix', label: 'Suffix (e.g. %, +)', type: 'text' },
                          { key: 'icon', label: 'Icon Symbol Tag (e.g. Award, Users)', type: 'text' },
                          { key: 'color', label: 'Custom Accent color hex', type: 'text' }
                        ]
                      })}
                    </div>
                  )}

                  {sec.id === 'videoTestimonials' && (
                    <div>
                      {renderListManager({
                        sectionKey: 'videoTestimonials',
                        displayColumns: [
                          { key: 'name', label: 'Student Name' },
                          { key: 'company', label: 'Company' },
                          { key: 'thumbnail', label: 'Thumbnail', type: 'image' }
                        ],
                        fields: [
                          { key: 'name', label: 'Student Partner Name', type: 'text' },
                          { key: 'role', label: 'Designation Role', type: 'text' },
                          { key: 'company', label: 'Brand Company Name', type: 'text' },
                          { key: 'duration', label: 'Video Duration (e.g. 2:45)', type: 'text' },
                          { key: 'rating', label: 'Star Rating', type: 'select', options: ['5', '4', '3'] },
                          { key: 'featured', label: 'Highlight/Featured Card', type: 'switch' },
                          { key: 'description', label: 'Narrative review text snippet', type: 'textarea' },
                          { key: 'thumbnail', label: 'Video Cover Image Thumbnail', type: 'upload' },
                          { key: 'video', label: 'Testimonial Video File (.mp4)', type: 'upload' }
                        ]
                      })}
                    </div>
                  )}

                  {sec.id === 'writtenTestimonials' && (
                    <div>
                      {renderListManager({
                        sectionKey: 'writtenTestimonials',
                        displayColumns: [
                          { key: 'name', label: 'Student Name' },
                          { key: 'company', label: 'Company' },
                          { key: 'photo', label: 'Profile Picture', type: 'image' }
                        ],
                        fields: [
                          { key: 'name', label: 'Student Client Name', type: 'text' },
                          { key: 'designation', label: 'Current Role Designation', type: 'text' },
                          { key: 'company', label: 'Associated Company', type: 'text' },
                          { key: 'rating', label: 'Rating Score (Stars)', type: 'select', options: ['5', '4', '3'] },
                          { key: 'featured', label: 'Featured Review Card', type: 'switch' },
                          { key: 'review', label: 'Detailed Quote Review Copywriting Text', type: 'textarea' },
                          { key: 'photo', label: 'Client Partner Portrait Photo', type: 'upload' },
                          { key: 'logo', label: 'Company Logo Graphic', type: 'upload' }
                        ]
                      })}
                    </div>
                  )}

                  {sec.id === 'categories' && (
                    <div>
                      {renderListManager({
                        sectionKey: 'categories',
                        displayColumns: [
                          { key: 'title', label: 'Category Title' },
                          { key: 'icon', label: 'Icon Tag' }
                        ],
                        fields: [
                          { key: 'title', label: 'Category Segment Title', type: 'text' },
                          { key: 'icon', label: 'Lucide Icon Symbol Tag (e.g. Film, Share2)', type: 'text' },
                          { key: 'description', label: 'Short description highlighting workflows', type: 'textarea' }
                        ]
                      })}
                    </div>
                  )}

                  {sec.id === 'featuredQuote' && (
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Featured Quote Copy" value={quoteForm.quote || ''} onChange={e => setQuoteForm({ ...quoteForm, quote: e.target.value })} />
                        <Input label="Quote Author" value={quoteForm.author || ''} onChange={e => setQuoteForm({ ...quoteForm, author: e.target.value })} />
                        <Input label="Author Subtitle" value={quoteForm.subtitle || ''} onChange={e => setQuoteForm({ ...quoteForm, subtitle: e.target.value })} />
                        <Input label="Background CSS Tone" value={quoteForm.background || ''} onChange={e => setQuoteForm({ ...quoteForm, background: e.target.value })} placeholder="e.g. linear-gradient(to right, #111, #000)" />
                        <Input label="Quote Accent color" value={quoteForm.accentColor || ''} onChange={e => setQuoteForm({ ...quoteForm, accentColor: e.target.value })} placeholder="#D4AF37" />
                        <div className="p-3 bg-zinc-900/30 border border-zinc-900 rounded flex items-center justify-between">
                          <span className="text-xs font-semibold text-zinc-400">Show Quote section on site</span>
                          <Switch checked={quoteForm.showSection !== false} onChange={val => setQuoteForm({ ...quoteForm, showSection: val })} />
                        </div>
                      </div>
                      <div className="flex justify-end border-t border-zinc-900 pt-3">
                        <Button type="button" onClick={() => handleSingleSave('featuredQuote', quoteForm)} variant="primary" size="sm" className="bg-luxury-gold text-black font-bold">Save Quote Details</Button>
                      </div>
                    </div>
                  )}

                  {sec.id === 'whatWeDo' && (
                    <div>
                      {renderListManager({
                        sectionKey: 'whatWeDo',
                        displayColumns: [
                          { key: 'title', label: 'Operation Title' },
                          { key: 'subtitle', label: 'Subtitle Tag' }
                        ],
                        fields: [
                          { key: 'title', label: 'Operation/Core Title', type: 'text' },
                          { key: 'subtitle', label: 'Tagline Subtitle', type: 'text' },
                          { key: 'icon', label: 'Icon Lucide tag', type: 'text' },
                          { key: 'buttonText', label: 'Button Caption Link Text', type: 'text' },
                          { key: 'buttonLink', label: 'Button Destination URL', type: 'text' },
                          { key: 'description', label: 'Overview narration', type: 'textarea' },
                          { key: 'image', label: 'Cloudinary Image Backdrop', type: 'upload' }
                        ]
                      })}
                    </div>
                  )}

                  {sec.id === 'seo' && (
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="SEO Meta Title" value={seoForm.metaTitle || ''} onChange={e => setSeoForm({ ...seoForm, metaTitle: e.target.value })} />
                        <Input label="SEO Meta Keywords" value={seoForm.metaKeywords || ''} onChange={e => setSeoForm({ ...seoForm, metaKeywords: e.target.value })} />
                        <Input label="Canonical URL Path" value={seoForm.canonicalUrl || ''} onChange={e => setSeoForm({ ...seoForm, canonicalUrl: e.target.value })} />
                        <div className="p-3 bg-zinc-900/30 border border-zinc-900 rounded flex items-center justify-between">
                          <span className="text-xs font-semibold text-zinc-400">Search Engine Index</span>
                          <Switch checked={seoForm.index !== false} onChange={val => setSeoForm({ ...seoForm, index: val })} />
                        </div>
                        <div className="p-3 bg-zinc-900/30 border border-zinc-900 rounded flex items-center justify-between">
                          <span className="text-xs font-semibold text-zinc-400">Search Engine Follow Links</span>
                          <Switch checked={seoForm.follow !== false} onChange={val => setSeoForm({ ...seoForm, follow: val })} />
                        </div>
                        <div className="md:col-span-2">
                          <Input label="SEO Meta Description Content" textarea rows={2} value={seoForm.metaDescription || ''} onChange={e => setSeoForm({ ...seoForm, metaDescription: e.target.value })} />
                        </div>
                        <div className="md:col-span-2">
                          {renderMediaUpload("OG Social Share Graphics Card", seoForm.ogImageUrl, "ogImageUrl", true, true)}
                        </div>
                      </div>
                      <div className="flex justify-end border-t border-zinc-900 pt-3">
                        <Button type="button" onClick={() => handleSingleSave('seo', seoForm)} variant="primary" size="sm" className="bg-luxury-gold text-black font-bold">Save SEO Parameters</Button>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </Card>
          );
        })}
      </div>

      <div className="flex items-center justify-end p-4 border border-zinc-900 bg-zinc-955/20 rounded-lg max-w-5xl">
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Testimonials CMS framework fully loaded and operating securely.</span>
        </div>
      </div>

    </div>
  );
};

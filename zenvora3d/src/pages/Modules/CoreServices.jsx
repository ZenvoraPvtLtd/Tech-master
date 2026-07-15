import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Switch } from '../../components/ui/Switch';
import { Input } from '../../components/ui/Input';
import { 
  Layers, ChevronDown, ChevronRight, Edit3, Trash2, 
  ArrowUp, ArrowDown, Plus, Save, Eye, RefreshCw, X
} from 'lucide-react';

const ListInputManager = ({ label, items = [], onChange }) => {
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (!newItem.trim()) return;
    onChange([...items, newItem.trim()]);
    setNewItem('');
  };

  const handleDelete = (idxToDelete) => {
    onChange(items.filter((_, idx) => idx !== idxToDelete));
  };

  const handleMove = (index, direction) => {
    const nextItems = [...items];
    const target = index + direction;
    if (target >= 0 && target < nextItems.length) {
      const temp = nextItems[index];
      nextItems[index] = nextItems[target];
      nextItems[target] = temp;
      onChange(nextItems);
    }
  };

  return (
    <div className="border border-zinc-900 p-4 rounded bg-zinc-900/10 flex flex-col gap-2 text-left">
      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{label}</span>
      <div className="flex gap-2">
        <input 
          type="text" 
          value={newItem} 
          onChange={e => setNewItem(e.target.value)} 
          placeholder={`Add new ${label.toLowerCase()} item...`}
          className="flex-1 bg-zinc-950 border border-zinc-850 rounded px-2.5 py-1.5 text-xs text-zinc-200 focus:border-luxury-gold/40 outline-none"
        />
        <button 
          type="button" 
          onClick={handleAdd}
          className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-luxury-gold/30 text-luxury-gold text-xs rounded font-bold"
        >
          Add
        </button>
      </div>

      <div className="flex flex-col gap-1.5 mt-2 max-h-32 overflow-y-auto pr-1">
        {items.map((item, idx) => (
          <div key={idx} className="p-2 bg-zinc-950 border border-zinc-900 rounded flex items-center justify-between gap-3">
            <span className="text-xs text-zinc-300 font-sans truncate">{idx + 1}. {item}</span>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => handleMove(idx, -1)} disabled={idx === 0} className="p-1 text-zinc-500 hover:text-white disabled:opacity-20"><ArrowUp className="w-3 h-3" /></button>
              <button type="button" onClick={() => handleMove(idx, 1)} disabled={idx === items.length - 1} className="p-1 text-zinc-500 hover:text-white disabled:opacity-20"><ArrowDown className="w-3 h-3" /></button>
              <button type="button" onClick={() => handleDelete(idx)} className="p-1 text-zinc-550 hover:text-rose-400"><X className="w-3 h-3" /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <span className="text-[10px] text-zinc-650 italic">No list items added yet.</span>
        )}
      </div>
    </div>
  );
};

export const CoreServices = () => {
  const { db, updateSection } = useDatabase();
  
  // Header Config from DB
  const headerConfig = db?.coreServicesConfig || {};
  // Services from DB
  const servicesList = db?.services || [];

  const [expandedCards, setExpandedCards] = useState({
    header: true,
    services: false
  });

  const toggleCard = (cardId) => {
    setExpandedCards(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const [headerForm, setHeaderForm] = useState(headerConfig);

  const [isEditingService, setIsEditingService] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [draftService, setDraftService] = useState({});

  const handleSaveHeader = () => {
    updateSection('coreServicesConfig', headerForm);
    showToast("Header configuration saved successfully.");
  };

  const handleStartAddService = () => {
    setIsEditingService(true);
    setEditingServiceId(null);
    setDraftService({ status: 'Active', order: servicesList.length + 1, features: [] });
  };

  const handleStartEditService = (service) => {
    setIsEditingService(true);
    setEditingServiceId(service.id || service._id);
    setDraftService({ ...service });
  };

  const handleSaveService = () => {
    let nextList = [];
    if (editingServiceId) {
      nextList = servicesList.map(item => (item.id === editingServiceId || item._id === editingServiceId) ? { ...item, ...draftService } : item);
      showToast("Service updated successfully.");
    } else {
      const newId = `service-${Date.now()}`;
      nextList = [...servicesList, { ...draftService, id: newId }];
      showToast("Service created successfully.");
    }
    updateSection('services', nextList);
    setIsEditingService(false);
    setEditingServiceId(null);
    setDraftService({});
  };

  const handleDeleteService = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      const nextList = servicesList.filter(item => item.id !== id && item._id !== id);
      updateSection('services', nextList);
      showToast("Service deleted.");
    }
  };

  const handleToggleServiceStatus = (id, currentStatus) => {
    const nextList = servicesList.map(item => (item.id === id || item._id === id) ? { ...item, status: currentStatus === 'Active' ? 'Inactive' : 'Active' } : item);
    updateSection('services', nextList);
  };

  const handleMoveService = (index, direction) => {
    const nextList = [...servicesList];
    const target = index + direction;
    if (target >= 0 && target < nextList.length) {
      const temp = nextList[index];
      nextList[index] = nextList[target];
      nextList[target] = temp;
      updateSection('services', nextList);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left relative pb-20">
      
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 rounded-full shadow-gold-glow border flex items-center gap-2.5 bg-zinc-950 border-luxury-gold/50 text-luxury-gold font-sans">
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      )}

      <div className="border-b border-zinc-800/80 pb-5 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-medium tracking-wide text-zinc-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-luxury-gold" />
            Core Services Module
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Manage the Homepage Core Services header and dynamic service cards.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button onClick={() => showToast("Publishing to live server is simulated in admin.")} variant="primary" size="sm" className="bg-gradient-to-r from-luxury-gold to-luxury-darkgold text-black font-bold shadow-gold-glow">
             Publish Live
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-5xl">
        
        {/* HEADER CONFIGURATION */}
        <Card title={<div onClick={() => toggleCard('header')} className="flex items-center justify-between w-full py-4 px-5 cursor-pointer bg-zinc-950/20"><div className="flex items-center gap-3"><Layers className="w-4 h-4 text-luxury-gold" /><span className="font-serif text-xs font-bold uppercase tracking-wider text-zinc-200">Header Setup</span></div><ChevronDown className="w-4 h-4 text-zinc-500" /></div>} className="p-0 border-zinc-800/80 bg-zinc-950/20">
          {expandedCards.header && (
            <div className="p-5 border-t border-zinc-800/80 bg-zinc-950/40 flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Section Tag (e.g. CORE SERVICES & TRAINING)" value={headerForm.tag || ''} onChange={e => setHeaderForm({ ...headerForm, tag: e.target.value })} />
                <Input label="Pillars Text (e.g. EDUCATIONAL PILLARS)" value={headerForm.pillarsText || ''} onChange={e => setHeaderForm({ ...headerForm, pillarsText: e.target.value })} />
                <Input label="Main Heading (e.g. Bridging the gap between)" value={headerForm.headingLine1 || ''} onChange={e => setHeaderForm({ ...headerForm, headingLine1: e.target.value })} />
                <Input label="Highlighted Heading (e.g. Code & Placement)" value={headerForm.highlightedHeading || ''} onChange={e => setHeaderForm({ ...headerForm, highlightedHeading: e.target.value })} />
                <Input label="CTA Button Text" value={headerForm.ctaButtonText || ''} onChange={e => setHeaderForm({ ...headerForm, ctaButtonText: e.target.value })} />
                <Input label="CTA Button URL" value={headerForm.ctaButtonUrl || ''} onChange={e => setHeaderForm({ ...headerForm, ctaButtonUrl: e.target.value })} />
                <div className="md:col-span-2">
                  <Input label="Description Paragraph" textarea rows={3} value={headerForm.description || ''} onChange={e => setHeaderForm({ ...headerForm, description: e.target.value })} />
                </div>
              </div>
              <div className="flex justify-end border-t border-zinc-900 pt-3"><Button onClick={handleSaveHeader}>Save Header</Button></div>
            </div>
          )}
        </Card>

        {/* SERVICE CARDS CRUD */}
        <Card title={<div onClick={() => toggleCard('services')} className="flex items-center justify-between w-full py-4 px-5 cursor-pointer bg-zinc-950/20"><div className="flex items-center gap-3"><Layers className="w-4 h-4 text-luxury-gold" /><span className="font-serif text-xs font-bold uppercase tracking-wider text-zinc-200">Service Cards</span></div><ChevronDown className="w-4 h-4 text-zinc-500" /></div>} className="p-0 border-zinc-800/80 bg-zinc-950/20">
          {expandedCards.services && (
            <div className="p-5 border-t border-zinc-800/80 bg-zinc-950/40">
              
              {!isEditingService && (
                <div className="flex flex-col gap-3">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-900 text-zinc-500 font-mono uppercase text-[9px] tracking-wider">
                          <th className="py-2 px-3 w-10">Order</th>
                          <th className="py-2 px-3">Title</th>
                          <th className="py-2 px-3">Tagline</th>
                          <th className="py-2 px-3 text-center">Status</th>
                          <th className="py-2 px-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {servicesList.map((item, idx) => {
                           const itemId = item.id || item._id;
                           return (
                          <tr key={itemId || idx} className="border-b border-zinc-900/60 hover:bg-zinc-900/10 text-zinc-300">
                            <td className="py-2.5 px-3 font-mono">{idx + 1}</td>
                            <td className="py-2.5 px-3 truncate">{item.title || '-'}</td>
                            <td className="py-2.5 px-3 truncate text-zinc-500">{item.tagline || '-'}</td>
                            <td className="py-2.5 px-3 text-center">
                              <Switch 
                                checked={item.status === 'Active'} 
                                onChange={() => handleToggleServiceStatus(itemId, item.status)}
                              />
                            </td>
                            <td className="py-2.5 px-3 text-right flex items-center justify-end gap-1.5">
                              <button type="button" onClick={() => handleMoveService(idx, -1)} disabled={idx === 0} className="p-1 text-zinc-500 hover:text-white disabled:opacity-20"><ArrowUp className="w-3.5 h-3.5" /></button>
                              <button type="button" onClick={() => handleMoveService(idx, 1)} disabled={idx === servicesList.length - 1} className="p-1 text-zinc-500 hover:text-white disabled:opacity-20"><ArrowDown className="w-3.5 h-3.5" /></button>
                              <button onClick={() => handleStartEditService(item)} className="p-1 hover:bg-zinc-900 rounded text-amber-500"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeleteService(itemId)} className="p-1 hover:bg-zinc-900 rounded text-rose-500"><Trash2 className="w-3 h-3" /></button>
                            </td>
                          </tr>
                        )})}
                        {servicesList.length === 0 && (
                          <tr><td colSpan={5} className="text-center py-6 text-zinc-600 font-mono italic">No service cards added yet.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <Button onClick={handleStartAddService} variant="secondary" size="sm" className="gap-1 text-xs border border-zinc-800 text-luxury-gold"><Plus className="w-3.5 h-3.5" /> <span>Add Service Card</span></Button>
                  </div>
                </div>
              )}

              {isEditingService && (
                <div className="border border-zinc-900 p-4 rounded bg-zinc-900/10 flex flex-col gap-3 mt-2">
                  <span className="text-[10px] font-mono uppercase text-luxury-gold border-b border-zinc-900 pb-1.5">Service Card Editor</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Title" value={draftService.title || ''} onChange={e => setDraftService({ ...draftService, title: e.target.value })} />
                    <Input label="Tagline" value={draftService.tagline || ''} onChange={e => setDraftService({ ...draftService, tagline: e.target.value })} />
                    <div className="md:col-span-2">
                       <Input label="Description" textarea rows={2} value={draftService.description || ''} onChange={e => setDraftService({ ...draftService, description: e.target.value })} />
                    </div>
                    <Input label="Accent Color (Hex e.g. #D4AF37)" value={draftService.accentColor || ''} onChange={e => setDraftService({ ...draftService, accentColor: e.target.value })} />
                    <div className="flex items-center justify-between border border-zinc-900 p-3 rounded bg-zinc-950/40">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase">Active Status</span>
                      <Switch checked={draftService.status === 'Active'} onChange={v => setDraftService({ ...draftService, status: v ? 'Active' : 'Inactive' })} />
                    </div>
                    
                    <div className="md:col-span-2 mt-2">
                      <ListInputManager 
                        label="Service Features"
                        items={draftService.features || []}
                        onChange={newVal => setDraftService({ ...draftService, features: newVal })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2.5 mt-2">
                    <button onClick={() => setIsEditingService(false)} className="px-3 py-1 text-xs text-zinc-555 hover:text-white">Cancel</button>
                    <button onClick={handleSaveService} className="px-4 py-1.5 bg-luxury-gold text-black font-bold text-xs rounded">Save Service</button>
                  </div>
                </div>
              )}

            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, Star, 
  ExternalLink, Sparkles, RefreshCw, Check, Film 
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

const YoutubeIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

export default function FeaturedVideoManager() {
  const { dbData } = useDatabase();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [extracting, setExtracting] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const baseUrl = (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"))
    ? "http://localhost:5000/api/v1"
    : (import.meta.env.VITE_API_URL || 'https://techmasterbackend.onrender.com/api/v1');

  const emptyForm = {
    platform: 'youtube',
    title: '',
    url: '',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-vertical-animation-of-a-futuristic-robot-41527-large.mp4',
    thumbnail: '',
    channelName: '@techmasterhq',
    viewCount: '1.2M views',
    displayOrder: 1,
    isFeatured: true,
    isActive: true
  };

  const [formData, setFormData] = useState(emptyForm);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/featured-videos/admin/all`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setItems(json.data);
        }
      }
    } catch (e) {
      console.warn("Failed to fetch featured videos from API, fallback to dbData:", e);
      if (dbData?.featuredVideos) {
        setItems(dbData.featuredVideos);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAutoExtract = async () => {
    if (!formData.url) return;
    setExtracting(true);
    try {
      const res = await fetch(`${baseUrl}/featured-videos/extract-metadata`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: formData.url })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setFormData(prev => ({
            ...prev,
            platform: json.data.platform || prev.platform,
            title: json.data.title || prev.title,
            thumbnail: json.data.thumbnail || prev.thumbnail,
            channelName: json.data.channelName || prev.channelName,
            viewCount: json.data.platform === 'instagram' ? '' : (json.data.viewCount || prev.viewCount)
          }));
        }
      }
    } catch (e) {
      console.error("Metadata extraction error:", e);
    } finally {
      setExtracting(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      ...emptyForm,
      displayOrder: items.length + 1
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item._id || item.id);
    setFormData({
      platform: item.platform || 'youtube',
      title: item.title || '',
      url: item.url || '',
      videoUrl: item.videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-vertical-animation-of-a-futuristic-robot-41527-large.mp4',
      thumbnail: item.thumbnail || '',
      channelName: item.channelName || '@techmasterhq',
      viewCount: item.platform === 'instagram' ? '' : (item.viewCount || ''),
      displayOrder: item.displayOrder || 1,
      isFeatured: item.isFeatured !== undefined ? item.isFeatured : true,
      isActive: item.isActive !== undefined ? item.isActive : true
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      const endpoint = editingId 
        ? `${baseUrl}/featured-videos/${editingId}`
        : `${baseUrl}/featured-videos`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchItems();
      }
    } catch (e) {
      console.error("Save error:", e);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this reel/short?")) return;
    try {
      const res = await fetch(`${baseUrl}/featured-videos/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchItems();
      }
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  const handleToggleActive = async (item) => {
    try {
      const id = item._id || item.id;
      const res = await fetch(`${baseUrl}/featured-videos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !item.isActive })
      });
      if (res.ok) {
        setItems(prev => prev.map(it => (it._id || it.id) === id ? { ...it, isActive: !it.isActive } : it));
      }
    } catch (e) {
      console.error("Toggle active error:", e);
    }
  };

  const handleMoveOrder = async (index, direction) => {
    const newItems = [...items];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const updatedOrders = newItems.map((item, idx) => ({
      id: item._id || item.id,
      displayOrder: idx + 1
    }));

    setItems(newItems);

    try {
      await fetch(`${baseUrl}/featured-videos/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orders: updatedOrders })
      });
    } catch (e) {
      console.error("Reorder error:", e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl backdrop-blur-md shadow-xl">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Film className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Featured Video Showcase</h1>
          </div>
          <p className="text-zinc-400 text-sm">
            Manage dynamic Instagram Reels & YouTube Shorts shown in the homepage 3D coverflow carousel.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-all duration-200 shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Add Reel / Short
        </button>
      </div>

      {/* Main Items Table / Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20 bg-zinc-900/40 rounded-2xl border border-zinc-800">
          <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900/40 rounded-2xl border border-zinc-800 text-zinc-400">
          <Film className="w-12 h-12 mx-auto mb-3 text-zinc-600" />
          <p className="text-lg font-medium text-white">No featured videos found</p>
          <p className="text-sm mt-1">Click "Add Reel / Short" to add your first video URL.</p>
        </div>
      ) : (
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-zinc-950/80 text-zinc-400 uppercase text-[11px] tracking-wider font-mono border-b border-zinc-800">
                <tr>
                  <th className="py-4 px-4 w-12 text-center">Order</th>
                  <th className="py-4 px-4">Platform</th>
                  <th className="py-4 px-4">Title & Channel</th>
                  <th className="py-4 px-4">Views</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {items.map((item, idx) => {
                  const isInsta = item.platform === 'instagram';
                  return (
                    <tr key={item._id || item.id || idx} className="hover:bg-zinc-800/40 transition-colors">
                      {/* Order Controls */}
                      <td className="py-3 px-4 text-center font-mono">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleMoveOrder(idx, -1)}
                            disabled={idx === 0}
                            className="p-1 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs text-amber-400 font-bold px-1">{idx + 1}</span>
                          <button
                            onClick={() => handleMoveOrder(idx, 1)}
                            disabled={idx === items.length - 1}
                            className="p-1 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Platform Badge */}
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                          isInsta 
                            ? 'bg-pink-500/10 border border-pink-500/30 text-pink-400' 
                            : 'bg-red-500/10 border border-red-500/30 text-red-400'
                        }`}>
                          {isInsta ? <InstagramIcon className="w-3.5 h-3.5" /> : <YoutubeIcon className="w-3.5 h-3.5" />}
                          {isInsta ? 'Instagram' : 'YouTube'}
                        </span>
                      </td>

                      {/* Title & Channel */}
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="text-white font-medium line-clamp-1">{item.title}</span>
                          <span className="text-zinc-400 text-xs font-mono">{item.channelName || '@techmasterhq'}</span>
                        </div>
                      </td>

                      {/* Views */}
                      <td className="py-3 px-4 font-mono text-xs">
                        {isInsta ? (
                          <span className="text-zinc-500 italic">No Views (IG Policy)</span>
                        ) : (
                          <span className="text-amber-400 font-semibold">{item.viewCount || '1.2M views'}</span>
                        )}
                      </td>

                      {/* Status Active Toggle */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleActive(item)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
                            item.isActive 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                              : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                          }`}
                        >
                          {item.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          {item.isActive ? 'Active' : 'Disabled'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                            title="Open Original URL"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-black transition-colors cursor-pointer"
                            title="Edit Item"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id || item.id)}
                            className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                            title="Delete Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Film className="w-5 h-5 text-amber-400" />
                {editingId ? 'Edit Featured Video' : 'Add New Featured Video'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5">
              {/* URL Input with Auto Extract Button */}
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Video / Reel URL *</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    placeholder="https://youtube.com/shorts/... or https://instagram.com/reel/..."
                    value={formData.url}
                    onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAutoExtract}
                    disabled={extracting || !formData.url}
                    className="px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-black font-semibold text-xs transition-all flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
                  >
                    {extracting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    Auto Fetch
                  </button>
                </div>
              </div>

              {/* Platform Selector */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Platform</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none"
                  >
                    <option value="youtube">YouTube (Short / Video)</option>
                    <option value="instagram">Instagram Reel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Channel / Username</label>
                  <input
                    type="text"
                    required
                    placeholder="@techmasterhq"
                    value={formData.channelName}
                    onChange={(e) => setFormData(prev => ({ ...prev, channelName: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Title & View Count */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="Tech Master Viral Short"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    View Count {formData.platform === 'instagram' ? '(Hidden for Instagram)' : ''}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5.4M views"
                    disabled={formData.platform === 'instagram'}
                    value={formData.platform === 'instagram' ? '' : formData.viewCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, viewCount: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none disabled:opacity-40"
                  />
                </div>
              </div>

              {/* Video URL Fallback */}
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Background MP4 Video URL (Autoplay Stream)</label>
                <input
                  type="text"
                  placeholder="https://assets.mixkit.co/videos/preview/..."
                  value={formData.videoUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none font-mono text-xs"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <span className="text-sm text-zinc-300">Active (Visible on Website)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <span className="text-sm text-zinc-300">Featured Highlight</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-all shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-2"
                >
                  {saveLoading && <RefreshCw className="w-4 h-4 animate-spin" />}
                  {editingId ? 'Save Changes' : 'Create Video Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

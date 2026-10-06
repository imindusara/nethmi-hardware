import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Plus, Trash2, X } from 'lucide-react';
import { api } from '../../services/api';
import SEOHead from '../../components/SEOHead';

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ caption: '', category: 'Store', image: null, imageUrl: '' });

  const loadGallery = async () => {
    setLoading(true);
    try {
      const res = await api.getGallery();
      if (res.success) setItems(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = new FormData();
      data.append('caption', formData.caption);
      data.append('category', formData.category);
      if (formData.image) {
        data.append('image', formData.image);
      } else if (formData.imageUrl) {
        data.append('image', formData.imageUrl);
      }

      const res = await api.adminAddGallery(data);
      if (res.success) {
        setModalOpen(false);
        setFormData({ caption: '', category: 'Store', image: null, imageUrl: '' });
        loadGallery();
      } else {
        alert(res.message || 'Error saving');
      }
    } catch (e) {
      alert('Error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this photo?')) {
      try {
        const res = await api.adminDeleteGallery(id);
        if (res.success) setItems(prev => prev.filter(i => i.id !== id));
      } catch (e) {
        alert('Error');
      }
    }
  };

  return (
    <>
      <SEOHead title="Manage Gallery - Admin" />

      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading text-gray-900 dark:text-white">
              Photo Gallery Manager
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Upload photos of showroom aisles, products in stock, and warehouse logistics
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((i) => (
            <div key={i.id} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 shadow-soft group">
              <img src={i.image} alt={i.caption} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-transparent to-transparent flex flex-col justify-between p-3 text-white">
                <div className="flex justify-end">
                  <button
                    onClick={() => handleDelete(i.id)}
                    className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors shadow-md"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-primary-400 uppercase tracking-wider block">
                    {i.category}
                  </span>
                  <p className="text-xs font-semibold line-clamp-1">{i.caption || 'Hardware Item'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-charcoal-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800 mb-4">
                <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white">
                  Add Photo to Gallery
                </h3>
                <button onClick={() => setModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">
                    Caption / Description
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.caption}
                    onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                    placeholder="e.g. Paint Tinting Machine & Station"
                    className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">
                    Department Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Store">Store Showroom</option>
                    <option value="Power Tools">Power Tools</option>
                    <option value="Materials">Building Materials</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Paint">Paint</option>
                    <option value="Safety">Safety Gear</option>
                    <option value="Hardware">Hardware & Fasteners</option>
                    <option value="Delivery">Transport & Delivery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">
                    Upload Image File (Max 3MB)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                    className="block w-full text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-primary-50 file:text-primary-700"
                  />
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-2">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="px-5 py-2 rounded-xl text-xs font-bold bg-primary-500 text-white">
                    {saving ? 'Uploading...' : 'Add Photo'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

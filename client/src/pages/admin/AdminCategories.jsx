import React, { useState, useEffect } from 'react';
import { Layers, Plus, Edit, Trash2, X } from 'lucide-react';
import { api } from '../../services/api';
import SEOHead from '../../components/SEOHead';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', icon: 'Wrench', image: null });

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await api.getCategories();
      if (res.success) setCategories(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '', icon: 'Wrench', image: null });
    setModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({ name: cat.name, description: cat.description || '', icon: cat.icon || 'Wrench', image: null });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setSaving(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('icon', formData.icon);
      if (formData.image) {
        data.append('image', formData.image);
      }

      let res;
      if (editingCategory) {
        res = await api.adminUpdateCategory(editingCategory.id, data);
      } else {
        res = await api.adminCreateCategory(data);
      }

      if (res.success) {
        setModalOpen(false);
        loadCategories();
      } else {
        alert(res.message || 'Error saving category');
      }
    } catch (err) {
      alert('Server error saving category');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete category "${name}"? Products under this category will become uncategorized.`)) {
      try {
        const res = await api.adminDeleteCategory(id);
        if (res.success) loadCategories();
      } catch (e) {
        alert('Server error');
      }
    }
  };

  return (
    <>
      <SEOHead title="Manage Categories - Admin" />

      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading text-gray-900 dark:text-white">
              Category Management
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Add and edit store departments and banner graphics
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white dark:bg-charcoal-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-soft flex flex-col justify-between">
              <div>
                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
                  <img src={cat.image || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                  {cat.description || 'No description provided.'}
                </p>
                <span className="text-[11px] font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950 px-2 py-0.5 rounded">
                  {cat.product_count || 0} Products Attached
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-500 hover:text-white transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="p-1.5 rounded-lg bg-red-100 dark:bg-red-950 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-charcoal-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800 mb-4">
                <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white">
                  {editingCategory ? 'Edit Category' : 'Create Category'}
                </h3>
                <button onClick={() => setModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">
                    Department Icon
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Wrench">Power Tools (Wrench)</option>
                    <option value="Building">Building Materials (Building)</option>
                    <option value="Hammer">Hand Tools (Hammer)</option>
                    <option value="Droplets">Plumbing (Droplets)</option>
                    <option value="Zap">Electrical (Zap)</option>
                    <option value="Paintbrush">Paint & Accessories (Paintbrush)</option>
                    <option value="Nut">Fasteners (Nut)</option>
                    <option value="ShieldCheck">Safety Gear (Shield)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">
                    Banner Photo (Optional)
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
                    {saving ? 'Saving...' : 'Save'}
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

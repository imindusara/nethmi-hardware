import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  X, 
  Upload, 
  Check, 
  AlertCircle, 
  Tag, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';
import { api } from '../../services/api';
import SEOHead from '../../components/SEOHead';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    brand: '',
    sku: '',
    price: '',
    offer_price: '',
    stock_status: 'In Stock',
    short_description: '',
    description: '',
    is_featured: false,
    is_on_offer: false,
    specifications: [{ key: '', value: '' }],
    existingImages: [],
    newImages: []
  });

  const loadAll = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        api.adminGetProducts(),
        api.getCategories()
      ]);
      if (prodRes.success) setProducts(prodRes.data);
      if (catRes.success) setCategories(catRes.data);
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category_id: categories.length > 0 ? categories[0].id : '',
      brand: '',
      sku: '',
      price: '',
      offer_price: '',
      stock_status: 'In Stock',
      short_description: '',
      description: '',
      is_featured: false,
      is_on_offer: false,
      specifications: [{ key: '', value: '' }],
      existingImages: [],
      newImages: []
    });
    setErrorMsg('');
    setModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    const specsArray = prod.specifications && typeof prod.specifications === 'object'
      ? Object.entries(prod.specifications).map(([key, value]) => ({ key, value }))
      : [{ key: '', value: '' }];

    setFormData({
      name: prod.name || '',
      category_id: prod.category_id || '',
      brand: prod.brand || '',
      sku: prod.sku || '',
      price: prod.price || '',
      offer_price: prod.offer_price || '',
      stock_status: prod.stock_status || 'In Stock',
      short_description: prod.short_description || '',
      description: prod.description || '',
      is_featured: Boolean(prod.is_featured),
      is_on_offer: Boolean(prod.is_on_offer),
      specifications: specsArray.length > 0 ? specsArray : [{ key: '', value: '' }],
      existingImages: Array.isArray(prod.images) ? prod.images : [],
      newImages: []
    });
    setErrorMsg('');
    setModalOpen(true);
  };

  const handleSpecChange = (idx, field, val) => {
    setFormData(prev => {
      const updated = [...prev.specifications];
      updated[idx][field] = val;
      return { ...prev, specifications: updated };
    });
  };

  const handleAddSpecRow = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { key: '', value: '' }]
    }));
  };

  const handleRemoveSpecRow = (idx) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== idx)
    }));
  };

  const handleRemoveExistingImage = (idx) => {
    setFormData(prev => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, i) => i !== idx)
    }));
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.price) {
      setErrorMsg('Product name and price are required.');
      return;
    }

    setSaving(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('category_id', formData.category_id);
      data.append('brand', formData.brand);
      data.append('sku', formData.sku);
      data.append('price', formData.price);
      data.append('offer_price', formData.offer_price || '');
      data.append('stock_status', formData.stock_status);
      data.append('short_description', formData.short_description);
      data.append('description', formData.description);
      data.append('is_featured', formData.is_featured ? 1 : 0);
      data.append('is_on_offer', formData.is_on_offer ? 1 : 0);

      // Convert specs array back to object
      const specsObj = {};
      formData.specifications.forEach(s => {
        if (s.key && s.key.trim() && s.value && s.value.trim()) {
          specsObj[s.key.trim()] = s.value.trim();
        }
      });
      data.append('specifications', JSON.stringify(specsObj));

      // Append existing images JSON
      data.append('existingImages', JSON.stringify(formData.existingImages));

      // Append new image files
      if (formData.newImages && formData.newImages.length > 0) {
        for (let i = 0; i < formData.newImages.length; i++) {
          data.append('images', formData.newImages[i]);
        }
      }

      let res;
      if (editingProduct) {
        res = await api.adminUpdateProduct(editingProduct.id, data);
      } else {
        res = await api.adminCreateProduct(data);
      }

      if (res.success) {
        setModalOpen(false);
        loadAll();
      } else {
        setErrorMsg(res.message || 'Failed to save product');
      }
    } catch (err) {
      console.error('Save product error:', err);
      setErrorMsg('Server error while saving product');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Are you sure you want to permanently delete "${name}"?`)) {
      try {
        const res = await api.adminDeleteProduct(id);
        if (res.success) {
          loadAll();
        } else {
          alert(res.message || 'Failed to delete product');
        }
      } catch (err) {
        alert('Server error deleting product');
      }
    }
  };

  // Filtered list
  const filteredProducts = products.filter(p => {
    const matchesSearch = !search || 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(search.toLowerCase())) ||
      (p.sku && p.sku.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = !selectedCat || String(p.category_id) === String(selectedCat);
    return matchesSearch && matchesCat;
  });

  return (
    <>
      <SEOHead title="Manage Products - Admin" />

      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading text-gray-900 dark:text-white">
              Product Catalog Manager
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Add, edit, upload photos, and control stock status across all departments
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white dark:bg-charcoal-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-soft flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by product name, brand, or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>

          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 dark:bg-charcoal-950 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-200 dark:border-gray-800">
                <tr>
                  <th className="py-3.5 px-4">Item</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price (Rs.)</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4">Badges</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredProducts.map((p) => {
                  const images = Array.isArray(p.images) ? p.images : [];
                  const img = images[0] || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80';

                  return (
                    <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <img src={img} alt={p.name} className="w-12 h-12 rounded-xl object-cover bg-gray-100 dark:bg-gray-800 shrink-0" />
                        <div>
                          <span className="font-heading font-bold text-sm text-gray-900 dark:text-white block line-clamp-1">
                            {p.name}
                          </span>
                          <span className="text-[11px] text-gray-400">
                            {p.brand ? `${p.brand} • ` : ''}SKU: {p.sku || 'N/A'}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-gray-700 dark:text-gray-300 font-medium">
                        {p.category_name || 'Unassigned'}
                      </td>

                      <td className="py-3.5 px-4">
                        {p.is_on_offer && p.offer_price ? (
                          <div>
                            <span className="font-bold text-gray-900 dark:text-white block">
                              Rs. {Number(p.offer_price).toLocaleString()}
                            </span>
                            <span className="text-[10px] text-gray-400 line-through">
                              Rs. {Number(p.price).toLocaleString()}
                            </span>
                          </div>
                        ) : (
                          <span className="font-bold text-gray-900 dark:text-white">
                            Rs. {Number(p.price).toLocaleString()}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.stock_status === 'In Stock'
                            ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                            : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                        }`}>
                          {p.stock_status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 space-x-1">
                        {p.is_featured === 1 && (
                          <span className="bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400 px-2 py-0.5 rounded text-[10px] font-bold">
                            Featured
                          </span>
                        )}
                        {p.is_on_offer === 1 && (
                          <span className="bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 px-2 py-0.5 rounded text-[10px] font-bold">
                            Offer
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-500 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          className="p-1.5 rounded-lg bg-red-100 dark:bg-red-950/50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add / Edit Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
            <div className="bg-white dark:bg-charcoal-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 mb-6">
                <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white">
                  {editingProduct ? 'Edit Product' : 'Add New Hardware Product'}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 text-xs">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSaveProduct} className="space-y-4">
                
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ingco 20V Cordless Brushless Impact Drill"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category_id}
                      onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">
                      Brand
                    </label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="e.g. Bosch, S-Lon"
                      className="w-full px-3 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">
                      SKU / Code
                    </label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      placeholder="e.g. PT-ING-01"
                      className="w-full px-3 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">
                      Price (Rs.) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="25000"
                      className="w-full px-3 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">
                      Offer Price (Optional)
                    </label>
                    <input
                      type="number"
                      value={formData.offer_price}
                      onChange={(e) => setFormData({ ...formData, offer_price: e.target.value })}
                      placeholder="22500"
                      className="w-full px-3 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">
                      Stock Status
                    </label>
                    <select
                      value={formData.stock_status}
                      onChange={(e) => setFormData({ ...formData, stock_status: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>
                </div>

                {/* Short & Full Description */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">
                    Short Description (Brief summary for cards)
                  </label>
                  <input
                    type="text"
                    value={formData.short_description}
                    onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                    placeholder="e.g. Heavy duty brushless motor with 2x 20V lithium batteries..."
                    className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">
                    Full Description
                  </label>
                  <textarea
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Detailed overview and capabilities..."
                    className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                  ></textarea>
                </div>

                {/* Badges Toggles */}
                <div className="flex items-center gap-6 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-gray-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="text-primary-500 rounded"
                    />
                    <span>Featured on Home Page</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-gray-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_on_offer}
                      onChange={(e) => setFormData({ ...formData, is_on_offer: e.target.checked })}
                      className="text-primary-500 rounded"
                    />
                    <span>On Special Offer</span>
                  </label>
                </div>

                {/* Technical Specifications Key-Value Builder */}
                <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                    Specifications (Key-Value)
                  </label>
                  {formData.specifications.map((spec, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Voltage"
                        value={spec.key}
                        onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                        className="w-1/3 px-3 py-1.5 rounded-lg text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder="e.g. 20V Max"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSpecRow(idx)}
                        className="text-gray-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddSpecRow}
                    className="text-xs text-primary-600 dark:text-primary-400 font-bold hover:underline"
                  >
                    + Add Spec Row
                  </button>
                </div>

                {/* Image Upload */}
                <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                    Product Images (Max 3MB per file)
                  </label>
                  
                  {formData.existingImages.length > 0 && (
                    <div className="flex gap-2 mb-2">
                      {formData.existingImages.map((img, idx) => (
                        <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                          <img src={img} alt="Product" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(idx)}
                            className="absolute top-0.5 right-0.5 bg-red-600 text-white p-0.5 rounded-full"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, newImages: e.target.files })}
                    className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  />
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-primary-500 hover:bg-primary-600 text-white shadow-md"
                  >
                    {saving ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
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

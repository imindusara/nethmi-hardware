import { 
  fallbackSettings, 
  fallbackCategories, 
  fallbackProducts, 
  fallbackTestimonials 
} from '../data/fallbackData';

const API_BASE = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('nethmi_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  // Public
  async getSettings() {
    try {
      const res = await fetch(`${API_BASE}/settings`);
      if (!res.ok) throw new Error('Network response not ok');
      return await res.json();
    } catch (e) {
      return { success: true, data: fallbackSettings };
    }
  },

  async getCategories() {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (!res.ok) throw new Error('Network response not ok');
      return await res.json();
    } catch (e) {
      return { success: true, data: fallbackCategories };
    }
  },

  async getProducts(params = {}) {
    try {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') {
          query.append(k, v);
        }
      });
      const res = await fetch(`${API_BASE}/products?${query.toString()}`);
      if (!res.ok) throw new Error('Network response not ok');
      return await res.json();
    } catch (e) {
      let filtered = [...fallbackProducts];
      if (params.category) {
        filtered = filtered.filter(p => p.category_slug === params.category);
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || (p.brand && p.brand.toLowerCase().includes(q)));
      }
      if (params.onOffer === 'true') {
        filtered = filtered.filter(p => p.is_on_offer === 1);
      }
      return {
        success: true,
        data: filtered,
        pagination: { page: 1, limit: 20, total: filtered.length, totalPages: 1 }
      };
    }
  },

  async getProductBySlug(slug) {
    try {
      const res = await fetch(`${API_BASE}/products/${slug}`);
      if (!res.ok) throw new Error('Network response not ok');
      return await res.json();
    } catch (e) {
      const found = fallbackProducts.find(p => p.slug === slug) || fallbackProducts[0];
      const related = fallbackProducts.filter(p => p.id !== found.id && p.category_id === found.category_id).slice(0, 4);
      return { success: true, data: found, related };
    }
  },

  async getGallery(category = '') {
    try {
      const url = category && category !== 'All' ? `${API_BASE}/gallery?category=${encodeURIComponent(category)}` : `${API_BASE}/gallery`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Network response not ok');
      return await res.json();
    } catch (e) {
      return {
        success: true,
        data: [
          { id: 1, image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80', caption: 'Nethmi Hardware Kiribathgoda Storefront', category: 'Store' },
          { id: 2, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80', caption: 'Power Tools Showroom & Display', category: 'Power Tools' },
          { id: 3, image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80', caption: 'Tokyo Cement & Sand Depot', category: 'Materials' },
          { id: 4, image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80', caption: 'S-Lon Plumbing & Pipe Fittings Section', category: 'Plumbing' }
        ]
      };
    }
  },

  async getTestimonials() {
    try {
      const res = await fetch(`${API_BASE}/testimonials`);
      if (!res.ok) throw new Error('Network response not ok');
      return await res.json();
    } catch (e) {
      return { success: true, data: fallbackTestimonials };
    }
  },

  async submitMessage(data) {
    try {
      const res = await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (e) {
      return { success: true, message: 'Message sent successfully! Our counter staff will contact you.' };
    }
  },

  async submitQuote(data) {
    try {
      const res = await fetch(`${API_BASE}/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (e) {
      return { success: true, quoteId: Date.now(), message: 'Quote request received! We will send the estimate via WhatsApp/Email.' };
    }
  },

  // Admin Auth
  async adminLogin(username, password) {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return res.json();
  },

  async adminGetMe() {
    const res = await fetch(`${API_BASE}/admin/me`, {
      headers: { ...getAuthHeader() }
    });
    return res.json();
  },

  async adminChangePassword(currentPassword, newPassword) {
    const res = await fetch(`${API_BASE}/admin/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ currentPassword, newPassword })
    });
    return res.json();
  },

  // Admin Stats
  async adminGetStats() {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: { ...getAuthHeader() }
    });
    return res.json();
  },

  // Admin Products
  async adminGetProducts() {
    const res = await fetch(`${API_BASE}/admin/products`, {
      headers: { ...getAuthHeader() }
    });
    return res.json();
  },

  async adminCreateProduct(formData) {
    const res = await fetch(`${API_BASE}/admin/products`, {
      method: 'POST',
      headers: { ...getAuthHeader() },
      body: formData
    });
    return res.json();
  },

  async adminUpdateProduct(id, formData) {
    const res = await fetch(`${API_BASE}/admin/products/${id}`, {
      method: 'PUT',
      headers: { ...getAuthHeader() },
      body: formData
    });
    return res.json();
  },

  async adminDeleteProduct(id) {
    const res = await fetch(`${API_BASE}/admin/products/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return res.json();
  },

  // Admin Categories
  async adminCreateCategory(formData) {
    const res = await fetch(`${API_BASE}/admin/categories`, {
      method: 'POST',
      headers: { ...getAuthHeader() },
      body: formData
    });
    return res.json();
  },

  async adminUpdateCategory(id, formData) {
    const res = await fetch(`${API_BASE}/admin/categories/${id}`, {
      method: 'PUT',
      headers: { ...getAuthHeader() },
      body: formData
    });
    return res.json();
  },

  async adminDeleteCategory(id) {
    const res = await fetch(`${API_BASE}/admin/categories/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return res.json();
  },

  // Admin Messages
  async adminGetMessages() {
    const res = await fetch(`${API_BASE}/admin/messages`, {
      headers: { ...getAuthHeader() }
    });
    return res.json();
  },

  async adminToggleMessageRead(id, is_read) {
    const res = await fetch(`${API_BASE}/admin/messages/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ is_read })
    });
    return res.json();
  },

  async adminDeleteMessage(id) {
    const res = await fetch(`${API_BASE}/admin/messages/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return res.json();
  },

  // Admin Quotes
  async adminGetQuotes() {
    const res = await fetch(`${API_BASE}/admin/quotes`, {
      headers: { ...getAuthHeader() }
    });
    return res.json();
  },

  async adminUpdateQuoteStatus(id, status) {
    const res = await fetch(`${API_BASE}/admin/quotes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  async adminDeleteQuote(id) {
    const res = await fetch(`${API_BASE}/admin/quotes/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return res.json();
  },

  // Admin Gallery
  async adminAddGallery(formData) {
    const res = await fetch(`${API_BASE}/admin/gallery`, {
      method: 'POST',
      headers: { ...getAuthHeader() },
      body: formData
    });
    return res.json();
  },

  async adminDeleteGallery(id) {
    const res = await fetch(`${API_BASE}/admin/gallery/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return res.json();
  },

  // Admin Testimonials
  async adminCreateTestimonial(data) {
    const res = await fetch(`${API_BASE}/admin/testimonials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async adminDeleteTestimonial(id) {
    const res = await fetch(`${API_BASE}/admin/testimonials/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return res.json();
  },

  // Admin Settings
  async adminUpdateSettings(settingsObj) {
    const res = await fetch(`${API_BASE}/admin/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(settingsObj)
    });
    return res.json();
  }
};

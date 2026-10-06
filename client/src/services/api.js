const API_BASE = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('nethmi_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  // Public
  async getSettings() {
    const res = await fetch(`${API_BASE}/settings`);
    return res.json();
  },

  async getCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    return res.json();
  },

  async getProducts(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, v);
      }
    });
    const res = await fetch(`${API_BASE}/products?${query.toString()}`);
    return res.json();
  },

  async getProductBySlug(slug) {
    const res = await fetch(`${API_BASE}/products/${slug}`);
    return res.json();
  },

  async getGallery(category = '') {
    const url = category && category !== 'All' ? `${API_BASE}/gallery?category=${encodeURIComponent(category)}` : `${API_BASE}/gallery`;
    const res = await fetch(url);
    return res.json();
  },

  async getTestimonials() {
    const res = await fetch(`${API_BASE}/testimonials`);
    return res.json();
  },

  async submitMessage(data) {
    const res = await fetch(`${API_BASE}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async submitQuote(data) {
    const res = await fetch(`${API_BASE}/quotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
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

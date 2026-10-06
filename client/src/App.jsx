import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { api } from './services/api';
import { useAuth } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import EnquiryDrawer from './components/EnquiryDrawer';
import AdminSidebar from './components/AdminSidebar';

// Public Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import GetQuote from './pages/GetQuote';
import EnquiryList from './pages/EnquiryList';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminQuotes from './pages/admin/AdminQuotes';
import AdminMessages from './pages/admin/AdminMessages';
import AdminGallery from './pages/admin/AdminGallery';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminSettings from './pages/admin/AdminSettings';
import AdminPassword from './pages/admin/AdminPassword';

function ProtectedAdminRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex items-center justify-center text-white text-xs">
        <span className="animate-pulse">Loading Admin Portal...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default function App() {
  const [settings, setSettings] = useState(null);
  const [adminStats, setAdminStats] = useState(null);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/admin/login';

  const loadSettings = async () => {
    try {
      const res = await api.getSettings();
      if (res.success && res.data) {
        setSettings(res.data);
      }
    } catch (e) {
      console.error('Failed to load settings:', e);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      
      {/* Public Layout */}
      {!isAdminRoute ? (
        <>
          <Navbar settings={settings} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home settings={settings} />} />
              <Route path="/products" element={<Products settings={settings} />} />
              <Route path="/products/:slug" element={<ProductDetail settings={settings} />} />
              <Route path="/categories" element={<Categories settings={settings} />} />
              <Route path="/about" element={<About settings={settings} />} />
              <Route path="/gallery" element={<Gallery settings={settings} />} />
              <Route path="/contact" element={<Contact settings={settings} />} />
              <Route path="/quote" element={<GetQuote settings={settings} />} />
              <Route path="/enquiry-list" element={<EnquiryList settings={settings} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer settings={settings} />
          <FloatingWhatsApp whatsappNumber={settings?.whatsapp || '94771234567'} />
          <EnquiryDrawer whatsappNumber={settings?.whatsapp || '94771234567'} />
        </>
      ) : isLoginPage ? (
        /* Admin Login */
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="*" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      ) : (
        /* Protected Admin Portal */
        <ProtectedAdminRoute>
          <div className="min-h-screen flex bg-gray-100 dark:bg-charcoal-950 text-gray-900 dark:text-gray-100">
            <AdminSidebar stats={adminStats} />
            <main className="flex-1 overflow-y-auto max-h-screen">
              <Routes>
                <Route path="/admin" element={<AdminDashboard onStatsUpdate={setAdminStats} />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/categories" element={<AdminCategories />} />
                <Route path="/admin/quotes" element={<AdminQuotes />} />
                <Route path="/admin/messages" element={<AdminMessages />} />
                <Route path="/admin/gallery" element={<AdminGallery />} />
                <Route path="/admin/testimonials" element={<AdminTestimonials />} />
                <Route path="/admin/settings" element={<AdminSettings onSettingsUpdated={setSettings} />} />
                <Route path="/admin/password" element={<AdminPassword />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Routes>
            </main>
          </div>
        </ProtectedAdminRoute>
      )}

    </div>
  );
}

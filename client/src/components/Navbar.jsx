import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Wrench, 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Sun, 
  Moon, 
  Flame, 
  Truck, 
  Phone,
  Building,
  Hammer,
  Droplets,
  Zap,
  Paintbrush,
  Nut,
  ShieldCheck
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useEnquiry } from '../context/EnquiryContext';
import { api } from '../services/api';
import { siteConfig } from '../config/siteConfig';

const categoryIcons = {
  'power-tools': Wrench,
  'building-materials': Building,
  'hand-tools': Hammer,
  'plumbing': Droplets,
  'electrical': Zap,
  'paint-accessories': Paintbrush,
  'paint-sealant-adhesives': Paintbrush,
  'fasteners': Nut,
  'safety-gear': ShieldCheck
};

export default function Navbar({ settings }) {
  const { theme, toggleTheme } = useTheme();
  const { totalItemsCount, estimatedTotal, openDrawer } = useEnquiry();
  const navigate = useNavigate();
  const location = useLocation();

  const [categories, setCategories] = useState([]);
  const [browseDropdownOpen, setBrowseDropdownOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  
  const dropdownRef = useRef(null);

  const brandName = siteConfig.brandName;
  const phone = settings?.phone || siteConfig.phone;
  const deliveryPromise = siteConfig.deliveryPromise;
  const facebookUrl = settings?.facebook_url || siteConfig.socials.facebook;
  const instagramUrl = settings?.instagram_url || siteConfig.socials.instagram;
  const whatsappNum = (settings?.whatsapp || siteConfig.whatsapp).replace(/[^0-9]/g, '');

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await api.getCategories();
        if (res.success && res.data) setCategories(res.data);
      } catch (e) {
        console.error('Failed to load categories in navbar:', e);
      }
    }
    fetchCategories();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setBrowseDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setBrowseDropdownOpen(false);
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    if (searchCategory) params.set('category', searchCategory);
    navigate(`/products?${params.toString()}`);
    setMobileSearchOpen(false);
  };

  return (
    <header className="w-full z-40 relative shadow-sm">
      
      {/* 1. TOP MICRO BAR (Dark Navy / Slate - Row 1) */}
      <div className="bg-[#0f172a] text-gray-200 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center gap-4">
          
          {/* Top Left: Single Delivery Promise Line */}
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-medium text-gray-300 truncate">
            <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{deliveryPromise}</span>
          </div>

          {/* Top Right: Socials, Hotline & Dark Mode Toggle */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0 text-xs">
            
            {/* Social Icons with Accessible aria-labels */}
            <div className="hidden sm:flex items-center gap-2 text-gray-400">
              <a 
                href={facebookUrl} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Nethmi Hardware on Facebook"
                className="hover:text-amber-300 p-1 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a 
                href={instagramUrl} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Nethmi Hardware on Instagram"
                className="hover:text-amber-300 p-1 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>

            <span className="hidden sm:inline-block text-slate-700">|</span>

            {/* Direct Phone Link */}
            <a 
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`} 
              aria-label={`Call hotline ${phone}`}
              className="flex items-center gap-1.5 font-bold text-gray-200 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{phone}</span>
            </a>

            <span className="text-slate-700">|</span>

            {/* Accessible Dark Mode Toggle (≥44px touch area) */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
              className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-gray-300" />
              )}
            </button>

          </div>

        </div>
      </div>


      {/* 2. MAIN NAVIGATION & BRAND HEADER (Row 2 - Unified) */}
      <div className="bg-white dark:bg-charcoal-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Logo & Consistent Brand Name */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
            <img
              src="/logo.png"
              alt={`${brandName} Official 3D Emblem Logo`}
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow group-hover:scale-105 transition-transform duration-200"
            />
            <div>
              <span className="font-heading font-black text-lg sm:text-2xl tracking-tight text-gray-900 dark:text-white block leading-tight">
                {brandName}
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-gray-500 dark:text-gray-400 block tracking-wide">
                Hardware & Construction Supplies
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-xl mx-2">
            <div className="w-full flex items-center rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 hover:border-[#dc2626] focus-within:border-[#dc2626] focus-within:bg-white dark:focus-within:bg-gray-800 transition-all overflow-hidden shadow-inner">
              
              {/* Category Dropdown */}
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                aria-label="Filter products by department"
                className="px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-transparent border-r border-gray-200 dark:border-gray-700 focus:outline-none cursor-pointer max-w-[150px]"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>

              {/* Text Input with Shortened Placeholder */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools, cement, pipes..."
                aria-label="Search hardware products"
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-transparent text-gray-900 dark:text-white focus:outline-none placeholder-gray-400 min-w-0"
              />

              {/* Search Submit Button (≥44px tap target) */}
              <button
                type="submit"
                aria-label="Submit search"
                className="min-w-[44px] min-h-[40px] flex items-center justify-center text-gray-500 hover:text-[#dc2626] dark:hover:text-amber-400 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Desktop Navigation Links (Title Case, No Duplicates) */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            
            {/* Single "Browse Categories" Entry Point */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setBrowseDropdownOpen(!browseDropdownOpen)}
                aria-expanded={browseDropdownOpen}
                aria-haspopup="true"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-100 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-[#dc2626] transition-colors"
              >
                <Menu className="w-4 h-4 text-[#dc2626]" />
                <span>Browse Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${browseDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Dropdown */}
              {browseDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-charcoal-900 text-gray-800 dark:text-gray-100 shadow-2xl border border-gray-200 dark:border-gray-800 rounded-2xl py-2 z-50 animate-fade-in divide-y divide-gray-100 dark:divide-gray-800">
                  {categories.map((cat) => {
                    const IconComponent = categoryIcons[cat.slug] || Wrench;
                    return (
                      <Link
                        key={cat.id}
                        to={`/products?category=${cat.slug}`}
                        onClick={() => setBrowseDropdownOpen(false)}
                        className="flex items-center justify-between px-4 py-2.5 text-xs font-semibold hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-[#dc2626] dark:hover:text-amber-400 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-4 h-4 text-[#dc2626] dark:text-red-400 group-hover:scale-110 transition-transform" />
                          <span>{cat.name}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    );
                  })}
                  <div className="p-3 bg-gray-50 dark:bg-charcoal-950 rounded-b-2xl">
                    <Link
                      to="/categories"
                      onClick={() => setBrowseDropdownOpen(false)}
                      className="block text-center py-2 rounded-xl bg-[#dc2626] text-white text-xs font-bold hover:bg-[#b91c1c] transition-colors"
                    >
                      View All 8 Departments
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <NavLink
              to="/products?onOffer=true"
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors ${
                  isActive ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/30' : 'text-gray-700 dark:text-gray-200 hover:text-amber-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
              <span>Hot Deals</span>
            </NavLink>

            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                  isActive ? 'text-[#dc2626] bg-red-50 dark:bg-red-950/30 font-bold' : 'text-gray-700 dark:text-gray-200 hover:text-[#dc2626] hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              Store Gallery
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                  isActive ? 'text-[#dc2626] bg-red-50 dark:bg-red-950/30 font-bold' : 'text-gray-700 dark:text-gray-200 hover:text-[#dc2626] hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                  isActive ? 'text-[#dc2626] bg-red-50 dark:bg-red-950/30 font-bold' : 'text-gray-700 dark:text-gray-200 hover:text-[#dc2626] hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Right Header Actions: Single Yellow "Get Quote" Button + Shopping Cart */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Mobile Search Toggle Button */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              aria-label="Toggle search bar"
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Single Yellow Get Quote Button (High WCAG AA Contrast with dark text) */}
            <Link
              to="/quote"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-gray-950 font-heading font-black text-xs sm:text-sm shadow-sm transition-all active:scale-95"
            >
              Get Quote
            </Link>

            {/* Shopping Cart Button (With non-clipped text width & padding) */}
            <button
              onClick={openDrawer}
              aria-label={`View Shopping Cart with ${totalItemsCount} items. Total: RS. ${estimatedTotal.toLocaleString()}`}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#dc2626] dark:hover:border-red-500 transition-colors group min-h-[44px]"
            >
              <div className="relative shrink-0">
                <ShoppingCart className="w-5 h-5 sm:w-5 sm:h-5 text-[#dc2626] dark:text-red-400 group-hover:scale-105 transition-transform" />
                <span className="absolute -top-2 -right-2 bg-[#dc2626] text-white text-[10px] font-black rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center border-2 border-white dark:border-gray-900 shadow-sm">
                  {totalItemsCount}
                </span>
              </div>
              <div className="text-left hidden xs:block sm:block pr-1">
                <span className="text-[9px] uppercase tracking-wider text-gray-500 dark:text-gray-400 block leading-none font-semibold">
                  Cart
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white font-heading whitespace-nowrap">
                  RS. {estimatedTotal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
            </button>

            {/* Mobile Hamburger Toggle (≥44x44px tap target) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-800 dark:text-gray-100 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Mobile Expanding Search Bar */}
        {mobileSearchOpen && (
          <div className="lg:hidden px-4 pb-3 pt-1 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-charcoal-900 animate-fade-in">
            <form onSubmit={handleSearch} className="flex items-center rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools, cement, pipes..."
                autoFocus
                className="flex-1 px-4 py-2.5 text-sm bg-transparent text-gray-900 dark:text-white focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white bg-[#dc2626]"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Drawer Menu (Title Case & Accessible) */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-charcoal-900 border-t border-gray-200 dark:border-gray-800 px-4 py-4 space-y-2 shadow-2xl animate-fade-in">
            <NavLink 
              to="/" 
              className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-gray-800 dark:text-gray-100 hover:bg-red-50 dark:hover:bg-red-950/40"
            >
              Home
            </NavLink>
            <NavLink 
              to="/products" 
              className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-gray-800 dark:text-gray-100 hover:bg-red-50 dark:hover:bg-red-950/40"
            >
              Browse Products
            </NavLink>
            <NavLink 
              to="/products?onOffer=true" 
              className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 flex items-center gap-2"
            >
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>Hot Deals</span>
            </NavLink>
            <NavLink 
              to="/categories" 
              className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-gray-800 dark:text-gray-100 hover:bg-red-50 dark:hover:bg-red-950/40"
            >
              All Hardware Departments
            </NavLink>
            <NavLink 
              to="/quote" 
              className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-gray-950 bg-amber-400 hover:bg-amber-300"
            >
              Request Project Quote (BOQ)
            </NavLink>
            <NavLink 
              to="/gallery" 
              className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-gray-800 dark:text-gray-100 hover:bg-red-50 dark:hover:bg-red-950/40"
            >
              Store Gallery
            </NavLink>
            <NavLink 
              to="/about" 
              className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-gray-800 dark:text-gray-100 hover:bg-red-50 dark:hover:bg-red-950/40"
            >
              About {brandName}
            </NavLink>
            <NavLink 
              to="/contact" 
              className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-gray-800 dark:text-gray-100 hover:bg-red-50 dark:hover:bg-red-950/40"
            >
              Contact & Directions
            </NavLink>
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
              <a
                href={`https://wa.me/${whatsappNum}?text=Hello%20${encodeURIComponent(brandName)}!`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
              >
                <span>Chat on WhatsApp ({phone})</span>
              </a>
            </div>
          </div>
        )}
      </div>

    </header>
  );
}

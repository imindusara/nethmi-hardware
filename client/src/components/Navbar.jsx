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
  User, 
  Sun, 
  Moon, 
  Flame, 
  Percent, 
  FileText, 
  Truck, 
  Layers, 
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

const categoryIcons = {
  'power-tools': Wrench,
  'building-materials': Building,
  'hand-tools': Hammer,
  'plumbing': Droplets,
  'electrical': Zap,
  'paint-accessories': Paintbrush,
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
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await api.getCategories();
        if (res.success) setCategories(res.data);
      } catch (e) {
        console.error(e);
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
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    if (searchCategory) params.set('category', searchCategory);
    navigate(`/products?${params.toString()}`);
  };

  const phone = settings?.phone || '+94 77 123 4567';

  return (
    <header className="w-full z-40 relative shadow-sm">
      
      {/* 1. TOP MICRO BAR (Deep Royal Purple) */}
      <div className="bg-[#4a154b] text-white text-xs py-2 px-4 border-b border-purple-900/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          
          {/* Top Left Links */}
          <div className="flex items-center gap-4 sm:gap-6 text-[11px] font-semibold tracking-wider uppercase">
            <Link to="/" className="hover:text-amber-300 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-amber-300 transition-colors">About Us</Link>
            <Link to="/gallery" className="hover:text-amber-300 transition-colors">Store Gallery</Link>
            <Link to="/contact" className="hover:text-amber-300 transition-colors">Contact Us</Link>
          </div>

          {/* Top Right: Socials & Islandwide Delivery Tag */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2 text-gray-200">
              <a href={settings?.facebook_url || "#"} target="_blank" rel="noreferrer" className="hover:text-amber-300 p-0.5">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={settings?.instagram_url || "#"} target="_blank" rel="noreferrer" className="hover:text-amber-300 p-0.5">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>

            <span className="text-gray-500">|</span>

            {/* Gold Highlight Tag */}
            <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs tracking-wide">
              <Truck className="w-3.5 h-3.5" />
              <span>Islandwide Delivery</span>
            </div>
          </div>

        </div>
      </div>


      {/* 2. MAIN HEADER (White Background) */}
      <div className="bg-white dark:bg-charcoal-900 py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#4a154b] to-[#7e22ce] flex items-center justify-center text-amber-400 shadow-md group-hover:scale-105 transition-transform">
              <Wrench className="w-6 h-6 -rotate-45" />
            </div>
            <div>
              <div className="flex items-center text-2xl sm:text-3xl font-black tracking-tight font-heading leading-none">
                <span className="text-[#4a154b] dark:text-white">Hardware</span>
                <span className="text-amber-500 font-black ml-1">Mart</span>
              </div>
              <span className="block text-[10px] tracking-wider uppercase text-gray-500 dark:text-gray-400 font-semibold mt-0.5">
                Nethmi Hardware • Building Sri Lanka
              </span>
            </div>
          </Link>

          {/* Central Search Bar with Category Dropdown */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl w-full mx-auto md:mx-6">
            <div className="flex items-center rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:border-[#4a154b] focus-within:border-[#4a154b] transition-all overflow-hidden">
              
              {/* Text Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products (e.g. Drill, Cement, S-Lon, Bolts)..."
                className="flex-1 px-5 py-2.5 text-xs sm:text-sm bg-transparent text-gray-900 dark:text-white focus:outline-none placeholder-gray-400"
              />

              {/* Category Dropdown */}
              <div className="hidden sm:block border-l border-gray-200 dark:border-gray-700">
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="">SELECT CATEGORY</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Search Icon Button */}
              <button
                type="submit"
                aria-label="Search"
                className="p-3 text-gray-500 dark:text-gray-400 hover:text-[#4a154b] dark:hover:text-amber-400 transition-colors pr-4"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Right Header Actions: Hotline / Quote & Cart */}
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            
            {/* Quick Hotline & Quote CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${phone}`}
                className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4a154b] dark:text-purple-300 hover:text-amber-500 transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>{phone}</span>
              </a>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <Link
                to="/quote"
                className="text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-purple-950 transition-colors"
              >
                Get Quote
              </Link>
            </div>

            <span className="hidden sm:block text-gray-300 dark:text-gray-700">|</span>

            {/* Cart Widget (🛒 0  RS. 0.00) */}
            <button
              onClick={openDrawer}
              aria-label="View Shopping Cart"
              className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-[#4a154b] dark:text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-2 -right-2 bg-[#4a154b] text-white text-[10px] font-black rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center border-2 border-white dark:border-gray-900 shadow-sm">
                  {totalItemsCount}
                </span>
              </div>
              <div className="text-left">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 block leading-none">
                  Cart Total
                </span>
                <span className="text-xs sm:text-sm font-black text-gray-900 dark:text-white font-heading">
                  RS. {estimatedTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>


      {/* 3. NAVIGATION BAR (Deep Royal Purple) */}
      <nav className="bg-[#4a154b] text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          <div className="flex items-center gap-1">
            
            {/* Mega Menu Trigger: ☰ BROWSE CATEGORIES ▾ */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setBrowseDropdownOpen(!browseDropdownOpen)}
                className="flex items-center gap-2.5 bg-[#340b38] hover:bg-[#27062b] text-white px-5 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider transition-colors"
              >
                <Menu className="w-4 h-4 text-amber-400" />
                <span>BROWSE CATEGORIES</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${browseDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              {browseDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-white dark:bg-charcoal-900 text-gray-800 dark:text-gray-100 shadow-2xl border border-gray-200 dark:border-gray-800 rounded-b-2xl py-2 z-50 animate-fade-in divide-y divide-gray-100 dark:divide-gray-800">
                  {categories.map((cat) => {
                    const IconComponent = categoryIcons[cat.slug] || Wrench;
                    return (
                      <Link
                        key={cat.id}
                        to={`/products?category=${cat.slug}`}
                        onClick={() => setBrowseDropdownOpen(false)}
                        className="flex items-center justify-between px-4 py-2.5 text-xs font-semibold hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-[#4a154b] dark:hover:text-amber-400 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-4 h-4 text-[#4a154b] dark:text-purple-400 group-hover:scale-110 transition-transform" />
                          <span>{cat.name}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    );
                  })}
                  <div className="p-3 bg-gray-50 dark:bg-charcoal-950">
                    <Link
                      to="/categories"
                      onClick={() => setBrowseDropdownOpen(false)}
                      className="block text-center py-2 rounded-xl bg-[#4a154b] text-white text-xs font-bold hover:bg-[#5b176b] transition-colors"
                    >
                      View All Departments
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-0.5 text-xs sm:text-xs font-bold tracking-wider uppercase">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `px-3.5 py-3.5 hover:bg-white/10 transition-colors ${isActive ? 'text-amber-300 font-extrabold bg-white/5' : 'text-gray-100'}`
                }
              >
                Shop
              </NavLink>

              <NavLink
                to="/products?onOffer=true"
                className="px-3.5 py-3.5 hover:bg-white/10 text-amber-300 flex items-center gap-1 transition-colors font-extrabold"
              >
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
                <span>Hot Deals</span>
              </NavLink>

              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  `px-3.5 py-3.5 hover:bg-white/10 transition-colors ${isActive ? 'text-amber-300 bg-white/5' : 'text-gray-100'}`
                }
              >
                Find by Category
              </NavLink>

              <NavLink
                to="/quote"
                className={({ isActive }) =>
                  `px-3.5 py-3.5 hover:bg-white/10 transition-colors ${isActive ? 'text-amber-300 bg-white/5' : 'text-gray-100'}`
                }
              >
                Get Quote (BOQ)
              </NavLink>

              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                  `px-3.5 py-3.5 hover:bg-white/10 transition-colors ${isActive ? 'text-amber-300 bg-white/5' : 'text-gray-100'}`
                }
              >
                Store Gallery
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-3.5 py-3.5 hover:bg-white/10 transition-colors ${isActive ? 'text-amber-300 bg-white/5' : 'text-gray-100'}`
                }
              >
                About
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-3.5 py-3.5 hover:bg-white/10 transition-colors ${isActive ? 'text-amber-300 bg-white/5' : 'text-gray-100'}`
                }
              >
                Contact
              </NavLink>
            </div>

          </div>

          {/* Right Utilities: Theme Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#340b38] px-4 py-4 border-t border-purple-900/50 space-y-2">
            <NavLink to="/" className="block px-3 py-2 rounded text-xs font-bold uppercase text-white hover:bg-white/10">
              Home
            </NavLink>
            <NavLink to="/products" className="block px-3 py-2 rounded text-xs font-bold uppercase text-white hover:bg-white/10">
              Shop All Products
            </NavLink>
            <NavLink to="/products?onOffer=true" className="block px-3 py-2 rounded text-xs font-bold uppercase text-amber-300 hover:bg-white/10">
              🔥 Hot Deals
            </NavLink>
            <NavLink to="/categories" className="block px-3 py-2 rounded text-xs font-bold uppercase text-white hover:bg-white/10">
              Browse Categories
            </NavLink>
            <NavLink to="/quote" className="block px-3 py-2 rounded text-xs font-bold uppercase text-white hover:bg-white/10">
              Request Project Quote
            </NavLink>
            <NavLink to="/gallery" className="block px-3 py-2 rounded text-xs font-bold uppercase text-white hover:bg-white/10">
              Store Gallery
            </NavLink>
            <NavLink to="/contact" className="block px-3 py-2 rounded text-xs font-bold uppercase text-white hover:bg-white/10">
              Contact & Directions
            </NavLink>
            <a
              href={`https://wa.me/${(settings?.whatsapp || '94771234567').replace(/[^0-9]/g, '')}?text=Hello%20Nethmi%20Hardware!`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded text-xs font-bold uppercase text-green-400 hover:bg-white/10 pt-2 border-t border-purple-900 flex items-center gap-2"
            >
              <span>💬 WhatsApp Hotline ({phone})</span>
            </a>
          </div>
        )}
      </nav>

    </header>
  );
}

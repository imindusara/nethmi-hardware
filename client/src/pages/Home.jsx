import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench, 
  Building, 
  Hammer, 
  Droplets, 
  Zap, 
  Paintbrush, 
  Nut, 
  ShieldCheck, 
  ArrowRight, 
  Truck, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  Star, 
  Flame, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  MapPin,
  Clock,
  FileDown,
  Layers,
  Users
} from 'lucide-react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import SEOHead from '../components/SEOHead';
import { siteConfig } from '../config/siteConfig';
import { fallbackCategories, fallbackProducts } from '../data/fallbackData';

const iconMap = {
  Wrench: Wrench,
  Building: Building,
  Hammer: Hammer,
  Droplets: Droplets,
  Zap: Zap,
  Paintbrush: Paintbrush,
  Nut: Nut,
  ShieldCheck: ShieldCheck
};

export default function Home({ settings }) {
  const [categories, setCategories] = useState(fallbackCategories);
  const [featuredProducts, setFeaturedProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(false);

  const brandName = siteConfig.brandName;
  const phone = settings?.phone || siteConfig.phone;
  const whatsapp = settings?.whatsapp || siteConfig.whatsapp;
  const monsoonPromo = siteConfig.promotions.monsoon;
  const socialProof = siteConfig.socialProof;

  useEffect(() => {
    async function loadData() {
      try {
        const [catsRes, featRes] = await Promise.all([
          api.getCategories(),
          api.getFeaturedProducts()
        ]);

        if (catsRes.success && Array.isArray(catsRes.data) && catsRes.data.length > 0) {
          setCategories(catsRes.data);
        }
        if (featRes.success && Array.isArray(featRes.data) && featRes.data.length > 0) {
          setFeaturedProducts(featRes.data);
        }
      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const getCategoryItems = (slugs, categoryIds = []) => {
    const slugList = Array.isArray(slugs) ? slugs : [slugs];
    const idList = Array.isArray(categoryIds) ? categoryIds : [categoryIds];

    let matches = featuredProducts.filter(p => 
      slugList.includes(p.category_slug) || 
      idList.includes(p.category_id) ||
      slugList.some(s => p.category_slug?.includes(s) || p.slug?.includes(s))
    );

    if (matches.length >= 4) {
      return matches.slice(0, 5);
    }

    const fbMatches = fallbackProducts.filter(p => 
      slugList.includes(p.category_slug) || 
      idList.includes(p.category_id) ||
      slugList.some(s => p.category_slug?.includes(s) || p.slug?.includes(s))
    );

    if (fbMatches.length > 0) {
      const combined = [...matches, ...fbMatches.filter(fb => !matches.some(m => m.id === fb.id))];
      return combined.slice(0, 5);
    }

    return fallbackProducts.slice(0, 5);
  };

  return (
    <>
      <SEOHead 
        title="Home" 
        description={`${brandName} - Sri Lanka's leading supplier of contractor-grade power tools, cement, steel, plumbing, electrical, and fasteners.`}
        settings={settings}
      />

      <div className="space-y-10 sm:space-y-14 pb-20 md:pb-16">
        
        {/* 1. HERO BANNER - High Contrast with Focused Hierarchy */}
        <section className="relative overflow-hidden border-b border-gray-100 dark:border-gray-800 shadow-md">
          
          {/* Background Showcase Image */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="/Sunlit%20Construction%20Supply%20Showcase.png" 
              alt="Sunlit Construction Supply Showcase - Nethmi Hardware Store" 
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            {/* Multi-layered gradient for optimal WCAG text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-900/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          </div>

          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* Left Content (Dominant Headline & CTAs) */}
            <div className="max-w-2xl text-center lg:text-left">
              
              {/* Delivery Tagline Badge (High contrast dark text on yellow) */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-gray-950 text-xs font-black uppercase tracking-wider mb-5 shadow">
                <Truck className="w-3.5 h-3.5" />
                <span>{siteConfig.deliveryPromise}</span>
              </div>

              {/* Headline with Increased Letter Spacing */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-[0.02em] leading-tight text-white mb-5 drop-shadow-md">
                Everything You Need to <span className="text-[#ef4444]">Build &</span> <span className="text-amber-400">Create</span>
              </h1>
              
              <p className="text-sm sm:text-base text-gray-200 mb-7 max-w-xl leading-relaxed drop-shadow-sm font-medium">
                Contractor-grade power tools, SLS-certified cement, steel rebars, S-Lon plumbing, and Kelani cables with unbeatable wholesale rates across Sri Lanka.
              </p>
              
              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                <Link
                  to="/products"
                  className="px-6 py-3.5 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-transform active:scale-95 flex items-center gap-2 min-h-[44px]"
                >
                  <span>Shop Hardware Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/quote"
                  className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow transition-transform active:scale-95 flex items-center gap-2 min-h-[44px]"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Request Project Quote (BOQ)</span>
                </Link>
              </div>

              {/* Trust Badges - Positioned directly below CTAs with High Contrast */}
              <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <div className="bg-slate-900/90 border border-slate-700/80 px-4 py-2 rounded-xl flex items-center gap-2.5 text-xs font-bold text-white shadow-md">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>10,000+ Genuine Products</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-700/80 px-4 py-2 rounded-xl flex items-center gap-2.5 text-xs font-bold text-white shadow-md">
                  <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" />
                  <span>SLS & ISO Certified</span>
                </div>
              </div>
            </div>

            {/* Right: Refined Promotional Card (Balanced Visual Weight) */}
            <div className="bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-amber-400/60 dark:border-amber-500/30 text-gray-900 dark:text-white max-w-md w-full shadow-2xl">
              <div className="flex items-center justify-between gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase mb-2">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{monsoonPromo.tag}</span>
                </div>
                <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">Ends {monsoonPromo.endDate}</span>
              </div>
              
              <h2 className="font-heading font-black text-lg sm:text-xl text-[#dc2626] dark:text-red-400 mb-2">
                {monsoonPromo.title}
              </h2>
              
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {monsoonPromo.description}
              </p>

              {/* Urgency Callout */}
              <div className="mb-5 px-3 py-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                {monsoonPromo.urgencyLine}
              </div>

              {/* Direct WhatsApp Claim Button */}
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(monsoonPromo.whatsappPrefill)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Claim contractor promotion via WhatsApp"
                className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95 min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Claim Offer on WhatsApp</span>
              </a>
            </div>

          </div>
        </section>

        {/* 2. SOCIAL PROOF STRIP (Under Hero) */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-6 relative z-20">
          <div className="bg-slate-900 text-white rounded-2xl p-3.5 sm:p-4 shadow-lg border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading font-bold text-xs sm:text-sm text-white block">
                  {socialProof.label}
                </span>
                <span className="text-[11px] text-gray-400 block">
                  Quality construction equipment delivered daily across Western, Central & Southern provinces.
                </span>
              </div>
            </div>
            <Link 
              to="/quote" 
              className="text-xs font-bold text-amber-400 hover:text-amber-300 underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              Join Contractor Network →
            </Link>
          </div>
        </section>

        {/* 3. STORE QUICK INFO STRIP (Address, Hours, Hotline, WhatsApp) */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-charcoal-900 rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-200 dark:border-gray-800 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/60 text-[#dc2626] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] uppercase font-bold text-gray-400">Store Location</span>
                <span className="block text-xs sm:text-sm font-bold text-gray-900 dark:text-white truncate">{siteConfig.city}, Sri Lanka</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] uppercase font-bold text-gray-400">Opening Hours</span>
                <span className="block text-xs sm:text-sm font-bold text-gray-900 dark:text-white truncate">Mon-Sat: 7:30 AM - 6:30 PM</span>
              </div>
            </div>

            <a 
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              aria-label={`Call Hotline ${phone}`}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity min-h-[44px]"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] uppercase font-bold text-gray-400">Call Hotline</span>
                <span className="block text-xs sm:text-sm font-bold text-gray-900 dark:text-white truncate">{phone}</span>
              </div>
            </a>

            <a 
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(brandName)}!%20I%20have%20an%20inquiry.`}
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Chat directly on WhatsApp"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity min-h-[44px]"
            >
              <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950/60 text-[#25D366] flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] uppercase font-bold text-gray-400">WhatsApp Fast Quote</span>
                <span className="block text-xs sm:text-sm font-bold text-[#25D366] truncate">Chat Live with Us</span>
              </div>
            </a>

          </div>
        </section>

        {/* 4. QUICK HARDWARE DEPARTMENT TILES (Sentence / Title Case) */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#dc2626] mb-1">
                <Layers className="w-4 h-4" />
                <span>Browse Departments</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black font-heading text-gray-900 dark:text-white">
                Shop by Hardware Category
              </h2>
            </div>
            <Link 
              to="/categories" 
              className="text-xs sm:text-sm font-bold text-[#dc2626] hover:underline flex items-center gap-1 group shrink-0 min-h-[44px] flex items-center"
            >
              <span>All 8 Departments</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {(categories && categories.length > 0 ? categories : fallbackCategories).map((cat) => {
              const IconComp = iconMap[cat.icon] || Wrench;
              return (
                <Link
                  key={cat.id || cat.slug}
                  to={`/products?category=${cat.slug}`}
                  className="group relative rounded-2xl p-4 bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-gray-800 hover:border-[#dc2626] dark:hover:border-[#dc2626] hover:shadow-lg transition-all text-center flex flex-col items-center justify-between min-h-[120px]"
                >
                  <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/50 text-[#dc2626] group-hover:bg-[#dc2626] group-hover:text-white flex items-center justify-center transition-colors mb-3 shadow-sm">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-xs text-gray-800 dark:text-gray-200 group-hover:text-[#dc2626] dark:group-hover:text-red-400 line-clamp-2">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-gray-400 font-medium mt-1">
                    {cat.product_count ? `${cat.product_count} products` : 'Explore'}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 5. CATEGORY SHOWCASE ROWS */}
        
        {/* Section 1: Paint, Sealant & Adhesives */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-gray-900 dark:text-white flex items-center gap-2">
              <Paintbrush className="w-5 h-5 text-[#dc2626]" />
              <span>Paint, Sealant & Adhesives</span>
            </h2>
            <Link to="/products?category=paint-sealant-adhesives" className="text-xs font-bold text-[#dc2626] hover:underline flex items-center gap-1 min-h-[44px]">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {getCategoryItems(['paint-sealant-adhesives', 'paint-accessories', 'paint'], [1, 6]).map((p) => (
              <ProductCard key={p.id} product={p} whatsappNumber={whatsapp} />
            ))}
          </div>
        </section>

        {/* Section 2: Bathroom & Plumbing */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-gray-900 dark:text-white flex items-center gap-2">
              <Droplets className="w-5 h-5 text-[#dc2626]" />
              <span>Bathroom & Plumbing Supplies</span>
            </h2>
            <Link to="/products?category=bathroom-plumbing" className="text-xs font-bold text-[#dc2626] hover:underline flex items-center gap-1 min-h-[44px]">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {getCategoryItems(['bathroom-plumbing', 'plumbing'], [2, 4]).map((p) => (
              <ProductCard key={p.id} product={p} whatsappNumber={whatsapp} />
            ))}
          </div>
        </section>

        {/* Section 3: Power Tools & Machinery */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-gray-900 dark:text-white flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#dc2626]" />
              <span>Power Tools & Machinery</span>
            </h2>
            <Link to="/products?category=power-tools" className="text-xs font-bold text-[#dc2626] hover:underline flex items-center gap-1 min-h-[44px]">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {getCategoryItems(['power-tools', 'tools'], [3, 1]).map((p) => (
              <ProductCard key={p.id} product={p} whatsappNumber={whatsapp} />
            ))}
          </div>
        </section>

        {/* Section 4: Building Materials & Cement */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-gray-900 dark:text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-[#dc2626]" />
              <span>Building Materials & Cement</span>
            </h2>
            <Link to="/products?category=building-materials" className="text-xs font-bold text-[#dc2626] hover:underline flex items-center gap-1 min-h-[44px]">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {getCategoryItems(['building-materials', 'cement'], [4, 2]).map((p) => (
              <ProductCard key={p.id} product={p} whatsappNumber={whatsapp} />
            ))}
          </div>
        </section>

        {/* 6. VALUE PROPOSITION BAR */}
        <section className="bg-white dark:bg-charcoal-900 py-10 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="flex items-center gap-3 bg-red-50/50 dark:bg-gray-800 p-4 rounded-2xl border border-red-100 dark:border-gray-700">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-[#dc2626] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xs uppercase text-gray-900 dark:text-white">Islandwide Delivery</h3>
                <p className="text-[11px] text-gray-500">Direct site transport for heavy cement, sand & steel</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-red-50/50 dark:bg-gray-800 p-4 rounded-2xl border border-red-100 dark:border-gray-700">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-[#dc2626] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xs uppercase text-gray-900 dark:text-white">100% Genuine Brands</h3>
                <p className="text-[11px] text-gray-500">Bosch, Makita, Ingco, S-Lon, Tokyo Super & Kelani</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-red-50/50 dark:bg-gray-800 p-4 rounded-2xl border border-red-100 dark:border-gray-700">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-[#dc2626] flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xs uppercase text-gray-900 dark:text-white">Contractor Wholesale Rates</h3>
                <p className="text-[11px] text-gray-500">Tiered bulk pricing for builders, masons & civil projects</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-red-50/50 dark:bg-gray-800 p-4 rounded-2xl border border-red-100 dark:border-gray-700">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-[#dc2626] flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xs uppercase text-gray-900 dark:text-white">Instant WhatsApp Quotes</h3>
                <p className="text-[11px] text-gray-500">Get instant estimates on {phone}</p>
              </div>
            </div>

          </div>
        </section>

        {/* 7. CONTRACTOR BOQ & PRICE LIST CTA BANNER */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-black text-white p-8 sm:p-12 border border-slate-800 shadow-2xl">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-gray-950 text-xs font-black uppercase tracking-wider mb-4">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>Engineers, Masons & Building Contractors</span>
              </div>
              
              <h2 className="text-2xl sm:text-4xl font-black font-heading tracking-tight mb-4">
                Planning a Large Construction or Renovation Project?
              </h2>
              
              <p className="text-sm sm:text-base text-gray-300 mb-8 leading-relaxed">
                Upload your Bill of Quantities (BOQ) or hardware materials list to receive guaranteed contractor wholesale rates, direct site transport, and dedicated support from {brandName}.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/quote"
                  className="px-6 py-3.5 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-transform active:scale-95 flex items-center gap-2 min-h-[44px]"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Submit BOQ for Instant Quote</span>
                </Link>
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${brandName}! Please send me your latest wholesale price guide and product brochure.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/20 backdrop-blur-sm transition-colors flex items-center gap-2 min-h-[44px]"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>Request Price List on WhatsApp</span>
                </a>
              </div>
            </div>
            
            {/* Background Accent Graphics */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-red-600/20 to-transparent pointer-events-none hidden lg:block" />
          </div>
        </section>

      </div>
    </>
  );
}

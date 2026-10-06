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
  Award,
  ShieldAlert
} from 'lucide-react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import SEOHead from '../components/SEOHead';

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
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [offerProducts, setOfferProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const phone = settings?.phone || '+94 77 123 4567';
  const whatsapp = settings?.whatsapp || '94771234567';

  useEffect(() => {
    async function loadData() {
      try {
        const [catsRes, featRes, offerRes, testRes] = await Promise.all([
          api.getCategories(),
          api.getProducts({ limit: 50 }),
          api.getProducts({ onOffer: 'true', limit: 10 }),
          api.getTestimonials()
        ]);

        if (catsRes.success) setCategories(catsRes.data);
        if (featRes.success) setFeaturedProducts(featRes.data);
        if (offerRes.success) setOfferProducts(offerRes.data);
        if (testRes.success) setTestimonials(testRes.data);
      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <>
      <SEOHead 
        title="Home" 
        description="Nethmi Hardware Mart - Sri Lanka's leading online hardware store with islandwide delivery on power tools, building materials, plumbing, electrical, and fasteners."
        settings={settings}
      />

      <div className="space-y-12 sm:space-y-16 pb-16">
        
        {/* 1. HERO BANNER - With Showcase Background */}
        <section className="relative overflow-hidden border-b border-gray-100 shadow-md">
          {/* Background Showcase Image */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="/Sunlit%20Construction%20Supply%20Showcase.png" 
              alt="Sunlit Construction Supply Showcase - Nethmi Hardware Mart" 
              className="w-full h-full object-cover object-center scale-100"
              loading="eager"
            />
            {/* Elegant Gradient Overlay for high text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-900/80 to-zinc-900/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          </div>

          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Content (Text on top of Image) */}
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-red-950 text-xs font-black uppercase tracking-wider mb-5 shadow-md">
                <Truck className="w-3.5 h-3.5" />
                <span>Islandwide Delivery Available Direct to Your Site</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-tight text-white mb-5 drop-shadow-md">
                Everything You Need to <span className="text-[#ef4444]">Build &</span> <span className="text-amber-400">Create</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-200 mb-8 max-w-xl leading-relaxed drop-shadow-sm font-medium">
                Contractor-grade power tools, SLS-certified cement, steel rebars, S-Lon plumbing, and Kelani cables with unbeatable wholesale rates.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                <Link
                  to="/products"
                  className="px-6 py-3.5 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-red-600/30 transition-all active:scale-95 flex items-center gap-2"
                >
                  <span>Shop Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/quote"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border-2 border-white/80 backdrop-blur-sm transition-all active:scale-95"
                >
                  Request Project Quote
                </Link>
              </div>

              {/* Trust Badge Chips */}
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <div className="bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/15 flex items-center gap-2 text-xs text-gray-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>10,000+ Genuine Products</span>
                </div>
                <div className="bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/15 flex items-center gap-2 text-xs text-gray-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                  <span>SLS & ISO Certified</span>
                </div>
              </div>
            </div>

            {/* Quick Promo Callout Box */}
            <div className="bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl border-2 border-amber-400 text-gray-900 max-w-md w-full shadow-2xl">
              <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase mb-2">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>Special Contractor Pricing</span>
              </div>
              <h3 className="font-heading font-black text-xl text-[#dc2626] mb-2">
                Monsoon Building Materials Promotion
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-5">
                Get up to 20% discount on volume cement orders, steel bundles, and exterior waterproofing coats.
              </p>
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Nethmi%20Hardware!%20I%20want%20to%20claim%20the%20Contractor%20Promotion.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Claim via WhatsApp</span>
              </a>
            </div>
          </div>
        </section>


        {/* 2. CATEGORY SHOWCASE ROWS (Matching Screenshot Exactly) */}
        
        {/* Section 1: Paint, Sealant & Adhesives */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#dc2626]">
              Paint, Sealant & Adhesives
            </h2>
            <Link to="/products?category=paint-sealant-adhesives" className="text-xs font-bold text-[#dc2626] hover:underline flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {featuredProducts.filter(p => p.category_slug === 'paint-sealant-adhesives' || p.category_id === 1).slice(0, 5).map((p) => (
              <ProductCard key={p.id} product={p} whatsappNumber={whatsapp} />
            ))}
          </div>
        </section>

        {/* Section 2: Bathroom & Plumbing */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#dc2626]">
              Bathroom & Plumbing
            </h2>
            <Link to="/products?category=bathroom-plumbing" className="text-xs font-bold text-[#dc2626] hover:underline flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {featuredProducts.filter(p => p.category_slug === 'bathroom-plumbing' || p.category_id === 2).slice(0, 5).map((p) => (
              <ProductCard key={p.id} product={p} whatsappNumber={whatsapp} />
            ))}
          </div>
        </section>

        {/* Section 3: Power Tools & Machinery */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#dc2626]">
              Power Tools & Machinery
            </h2>
            <Link to="/products?category=power-tools" className="text-xs font-bold text-[#dc2626] hover:underline flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {featuredProducts.filter(p => p.category_slug === 'power-tools' || p.category_id === 3).slice(0, 5).map((p) => (
              <ProductCard key={p.id} product={p} whatsappNumber={whatsapp} />
            ))}
          </div>
        </section>

        {/* Section 4: Building Materials & Cement */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#dc2626]">
              Building Materials & Cement
            </h2>
            <Link to="/products?category=building-materials" className="text-xs font-bold text-[#dc2626] hover:underline flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {featuredProducts.filter(p => p.category_slug === 'building-materials' || p.category_id === 4).slice(0, 5).map((p) => (
              <ProductCard key={p.id} product={p} whatsappNumber={whatsapp} />
            ))}
          </div>
        </section>


        {/* 5. VALUE PROPOSITION BAR */}
        <section className="bg-white dark:bg-charcoal-900 py-10 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 bg-red-50/50 dark:bg-gray-800 p-4 rounded-2xl border border-red-100 dark:border-gray-700">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-[#dc2626] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs uppercase text-gray-900 dark:text-white">Islandwide Delivery</h4>
                <p className="text-[11px] text-gray-500">Job-site delivery for heavy cement & steel</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-red-50/50 dark:bg-gray-800 p-4 rounded-2xl border border-red-100 dark:border-gray-700">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-[#dc2626] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs uppercase text-gray-900 dark:text-white">100% Genuine Brands</h4>
                <p className="text-[11px] text-gray-500">Bosch, Makita, Ingco, S-Lon & Tokyo Cement</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-red-50/50 dark:bg-gray-800 p-4 rounded-2xl border border-red-100 dark:border-gray-700">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-[#dc2626] flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs uppercase text-gray-900 dark:text-white">Contractor Bulk Rates</h4>
                <p className="text-[11px] text-gray-500">Special discounts for builders & masons</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-red-50/50 dark:bg-gray-800 p-4 rounded-2xl border border-red-100 dark:border-gray-700">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-[#dc2626] flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs uppercase text-gray-900 dark:text-white">Instant WhatsApp Quotes</h4>
                <p className="text-[11px] text-gray-500">Get fast BOQ estimates on +94 77 123 4567</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

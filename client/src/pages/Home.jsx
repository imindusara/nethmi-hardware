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
        
        {/* 1. HERO BANNER */}
        <section className="relative bg-gradient-to-r from-purple-50/80 via-white to-amber-50/50 text-gray-900 py-12 lg:py-20 overflow-hidden border-b border-gray-100 shadow-xs">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-purple-950 text-xs font-black uppercase tracking-wider mb-4 shadow-sm">
                <Truck className="w-3.5 h-3.5" />
                <span>Islandwide Delivery Available Direct to Your Site</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-tight text-gray-900 mb-4">
                Everything You Need to <span className="text-[#4a154b]">Build &</span> <span className="text-amber-500">Create</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-xl leading-relaxed">
                Contractor-grade power tools, SLS-certified cement, steel rebars, S-Lon plumbing, and Kelani cables with unbeatable wholesale rates.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link
                  to="/products"
                  className="px-6 py-3 rounded-xl bg-[#4a154b] hover:bg-[#5b176b] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition-transform active:scale-95"
                >
                  Shop Catalog
                </Link>
                <Link
                  to="/quote"
                  className="px-6 py-3 rounded-xl bg-white hover:bg-purple-50 text-[#4a154b] font-bold text-xs sm:text-sm uppercase tracking-wider border-2 border-[#4a154b] transition-all active:scale-95"
                >
                  Request Project Quote
                </Link>
              </div>
            </div>

            {/* Quick Promo Callout Box */}
            <div className="bg-white p-6 rounded-3xl border-2 border-amber-400 text-gray-900 max-w-md w-full shadow-card">
              <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase mb-2">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>Special Contractor Pricing</span>
              </div>
              <h3 className="font-heading font-black text-xl text-[#4a154b] mb-2">
                Monsoon Building Materials Promotion
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Get up to 20% discount on volume cement orders, steel bundles, and exterior waterproofing coats.
              </p>
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Nethmi%20Hardware!%20I%20want%20to%20claim%20the%20Contractor%20Promotion.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
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
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#4a154b]">
              Paint, Sealant & Adhesives
            </h2>
            <Link to="/products?category=paint-sealant-adhesives" className="text-xs font-bold text-[#4a154b] hover:underline flex items-center gap-1">
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
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#4a154b]">
              Bathroom & Plumbing
            </h2>
            <Link to="/products?category=bathroom-plumbing" className="text-xs font-bold text-[#4a154b] hover:underline flex items-center gap-1">
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
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#4a154b]">
              Power Tools & Machinery
            </h2>
            <Link to="/products?category=power-tools" className="text-xs font-bold text-[#4a154b] hover:underline flex items-center gap-1">
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
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#4a154b]">
              Building Materials & Cement
            </h2>
            <Link to="/products?category=building-materials" className="text-xs font-bold text-[#4a154b] hover:underline flex items-center gap-1">
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
            <div className="flex items-center gap-3 bg-purple-50/50 dark:bg-gray-800 p-4 rounded-2xl border border-purple-100 dark:border-gray-700">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#4a154b] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs uppercase text-gray-900 dark:text-white">Islandwide Delivery</h4>
                <p className="text-[11px] text-gray-500">Job-site delivery for heavy cement & steel</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-purple-50/50 dark:bg-gray-800 p-4 rounded-2xl border border-purple-100 dark:border-gray-700">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#4a154b] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs uppercase text-gray-900 dark:text-white">100% Genuine Brands</h4>
                <p className="text-[11px] text-gray-500">Bosch, Makita, Ingco, S-Lon & Tokyo Cement</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-purple-50/50 dark:bg-gray-800 p-4 rounded-2xl border border-purple-100 dark:border-gray-700">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#4a154b] flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs uppercase text-gray-900 dark:text-white">Contractor Bulk Rates</h4>
                <p className="text-[11px] text-gray-500">Special discounts for builders & masons</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-purple-50/50 dark:bg-gray-800 p-4 rounded-2xl border border-purple-100 dark:border-gray-700">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#4a154b] flex items-center justify-center shrink-0">
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

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
          api.getProducts({ limit: 10 }),
          api.getProducts({ onOffer: 'true', limit: 5 }),
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
        <section className="relative bg-gradient-to-r from-[#340b38] via-[#4a154b] to-[#6b21a8] text-white py-12 lg:py-20 overflow-hidden shadow-inner">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-purple-950 text-xs font-black uppercase tracking-wider mb-4 shadow-sm">
                <Truck className="w-3.5 h-3.5" />
                <span>Islandwide Delivery Available Direct to Your Site</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-tight text-white mb-4">
                Everything You Need to <span className="text-amber-400">Build & Create</span>
              </h1>
              <p className="text-sm sm:text-base text-purple-100 mb-8 max-w-xl leading-relaxed">
                Contractor-grade power tools, SLS-certified cement, steel rebars, S-Lon plumbing, and Kelani cables with unbeatable wholesale rates.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link
                  to="/products"
                  className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-purple-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition-transform active:scale-95"
                >
                  Shop Catalog
                </Link>
                <Link
                  to="/quote"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/20 transition-all active:scale-95"
                >
                  Request Project Quote
                </Link>
              </div>
            </div>

            {/* Quick Promo Callout Box */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-white max-w-md w-full shadow-2xl">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase mb-2">
                <Flame className="w-4 h-4 fill-amber-300" />
                <span>Special Contractor Pricing</span>
              </div>
              <h3 className="font-heading font-black text-xl mb-2">
                Monsoon Building Materials Promotion
              </h3>
              <p className="text-xs text-purple-100 leading-relaxed mb-4">
                Get up to 20% discount on volume cement orders, steel bundles, and exterior waterproofing coats.
              </p>
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Nethmi%20Hardware!%20I%20want%20to%20claim%20the%20Contractor%20Promotion.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Claim via WhatsApp</span>
              </a>
            </div>
          </div>
        </section>


        {/* 2. CATEGORY ICON BROWSER */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-[#4a154b]">
            <h2 className="text-lg sm:text-xl font-black font-heading uppercase text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-5 bg-[#4a154b] rounded-xs"></span>
              <span>Shop by Department</span>
            </h2>
            <Link to="/categories" className="text-xs font-bold text-[#4a154b] dark:text-amber-400 hover:underline flex items-center gap-1">
              <span>View All 8 Categories</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon] || Wrench;
              return (
                <Link
                  key={cat.id}
                  to={`/products?category=${cat.slug}`}
                  className="group bg-white dark:bg-charcoal-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-3 sm:p-4 text-center hover:border-amber-400 dark:hover:border-amber-400 transition-all hover:shadow-card flex flex-col items-center justify-between"
                >
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-[#4a154b] dark:text-purple-300 flex items-center justify-center mb-2 group-hover:bg-[#4a154b] group-hover:text-amber-400 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-xs text-gray-800 dark:text-gray-200 group-hover:text-[#4a154b] dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-gray-400 mt-0.5">
                    {cat.product_count || 0} items
                  </span>
                </Link>
              );
            })}
          </div>
        </section>


        {/* 3. HOT DEALS & SPECIAL OFFERS (5 Columns Product Grid) */}
        {offerProducts.length > 0 && (
          <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-amber-500">
              <h2 className="text-lg sm:text-xl font-black font-heading uppercase text-gray-900 dark:text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
                <span>Hot Deals & Clearance Items</span>
              </h2>
              <Link to="/products?onOffer=true" className="text-xs font-bold text-[#4a154b] dark:text-amber-400 hover:underline">
                View All Deals →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
              {offerProducts.map((p) => (
                <ProductCard key={p.id} product={p} whatsappNumber={whatsapp} />
              ))}
            </div>
          </section>
        )}


        {/* 4. FEATURED HARDWARE CATALOG (5 Columns Product Grid matching screenshot) */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-[#4a154b]">
            <h2 className="text-lg sm:text-xl font-black font-heading uppercase text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-5 bg-[#4a154b] rounded-xs"></span>
              <span>Featured Hardware Products</span>
            </h2>
            <Link to="/products" className="text-xs font-bold text-[#4a154b] dark:text-amber-400 hover:underline">
              View All Products →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
            {featuredProducts.map((p) => (
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

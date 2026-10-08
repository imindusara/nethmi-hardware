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
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import SEOHead from '../components/SEOHead';
import { siteConfig } from '../config/siteConfig';
import { fallbackCategories } from '../data/fallbackData';

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

export default function Categories({ settings }) {
  const [categories, setCategories] = useState(fallbackCategories);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await api.getCategories();
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  return (
    <>
      <SEOHead 
        title="Hardware Product Categories"
        description={`Explore 8 major departments of ${siteConfig.brandName}: Power Tools, Cement & Steel, Hand Tools, Plumbing, Electrical, Paints, Fasteners and Safety Gear.`}
        settings={settings}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wide mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Departments & Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-gray-900 dark:text-white mb-4">
            Explore All Hardware Categories
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            From heavy structural construction supplies to precision finishing equipment, select a department to view available brands and products.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Wrench;
            return (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="group flex flex-col bg-white dark:bg-charcoal-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-soft hover:shadow-card hover:border-primary-500/40 transition-all duration-300 overflow-hidden hover:-translate-y-1.5"
              >
                {/* Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={cat.image || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent"></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-primary-500 text-white flex items-center justify-center shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>

                  {cat.product_count !== undefined && (
                    <span className="absolute bottom-3 right-3 bg-charcoal-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md">
                      {cat.product_count} Products
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-bold text-primary-600 dark:text-primary-400">
                    <span>Browse Department</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </>
  );
}

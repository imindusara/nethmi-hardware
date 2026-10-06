import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Maximize2 
} from 'lucide-react';
import { api } from '../services/api';
import SEOHead from '../components/SEOHead';

export default function Gallery({ settings }) {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Store', 'Power Tools', 'Materials', 'Plumbing', 'Paint', 'Safety', 'Hardware', 'Delivery'];

  useEffect(() => {
    async function loadGallery() {
      setLoading(true);
      try {
        const res = await api.getGallery(selectedCategory);
        if (res.success) setItems(res.data);
      } catch (err) {
        console.error('Error loading gallery:', err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, [selectedCategory]);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <SEOHead 
        title="Store & Products Photo Gallery"
        description="Take a visual tour of Nethmi Hardware store, power tool showroom, construction materials warehouse, and delivery fleet."
        settings={settings}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wide mb-4">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Storefront & Warehousing</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-gray-900 dark:text-white mb-4">
            Our Photo Gallery
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            A glimpse into our well-stocked aisles, professional tools showroom, bulk materials yard, and delivery transport network.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25 scale-105'
                  : 'bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-charcoal-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8">
            <p className="text-gray-500 text-sm">No photos found in this department.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={item.image}
                  alt={item.caption || 'Hardware Store Photo'}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                  <div className="flex justify-end">
                    <span className="p-2 rounded-lg bg-black/40 backdrop-blur-md">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                  <div>
                    {item.category && (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-primary-400 block mb-1">
                        {item.category}
                      </span>
                    )}
                    <p className="text-xs font-semibold text-white line-clamp-2">
                      {item.caption || 'Nethmi Hardware Store'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {lightboxIndex !== null && items[lightboxIndex] && (
          <div 
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Content */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center relative"
            >
              <img
                src={items[lightboxIndex].image}
                alt={items[lightboxIndex].caption}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
              />
              {items[lightboxIndex].caption && (
                <div className="mt-4 text-center px-4">
                  <p className="text-sm font-semibold text-white">
                    {items[lightboxIndex].caption}
                  </p>
                  <span className="text-xs text-primary-400 mt-0.5 inline-block">
                    {items[lightboxIndex].category} • Photo {lightboxIndex + 1} of {items.length}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Check, 
  MessageSquare, 
  Tag, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

export default function ProductCard({ product, whatsappNumber = '94771234567' }) {
  const { addItem, items } = useEnquiry();
  const [added, setAdded] = useState(false);

  const isInEnquiry = items.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const images = Array.isArray(product.images) 
    ? product.images 
    : (typeof product.images === 'string' ? JSON.parse(product.images || '[]') : []);

  const displayImage = images.length > 0 
    ? images[0] 
    : 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80';

  const isOut = product.stock_status === 'Out of Stock';
  const hasOffer = product.is_on_offer && product.offer_price && product.offer_price < product.price;
  const unitPrice = hasOffer ? product.offer_price : product.price;

  // Formatted Item Reference Number (e.g., 1304, 1305 from SKU or ID)
  const refCode = product.sku ? product.sku.replace(/[^0-9]/g, '') || `13${(product.id % 90 + 10)}` : `130${product.id}`;

  // WhatsApp link for this product
  const productUrl = `${window.location.origin}/products/${product.slug}`;
  const waMsg = encodeURIComponent(
    `Hello Nethmi Hardware! I am interested in ordering *${product.name}* (Ref: #${refCode}, Price: Rs. ${Number(unitPrice).toLocaleString()}, SKU: ${product.sku || 'N/A'}). Is this available in stock? Link: ${productUrl}`
  );
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const directWhatsAppUrl = `https://wa.me/${cleanNumber}?text=${waMsg}`;

  return (
    <div className="group flex flex-col bg-white dark:bg-charcoal-900 rounded-2xl transition-all duration-300 hover:shadow-card-hover overflow-hidden">
      
      {/* 1. Yellow/Gold Framed Image Container (Exact Screenshot Style) */}
      <div className="p-2 sm:p-2.5">
        <Link 
          to={`/products/${product.slug}`} 
          className="relative block rounded-xl border-2 border-amber-400 dark:border-amber-500/80 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 overflow-hidden aspect-square group-hover:border-[#4a154b] dark:group-hover:border-amber-400 transition-colors"
        >
          {/* Top Right Mini Brand Watermark */}
          <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-white/90 dark:bg-charcoal-900/90 px-1.5 py-0.5 rounded shadow-xs border border-amber-200 dark:border-gray-700">
            <span className="text-[9px] font-black text-[#4a154b] dark:text-amber-400 leading-none">Hardware</span>
            <span className="text-[9px] font-black text-amber-500 leading-none">Mart</span>
          </div>

          {/* Large Red SKU Reference Number (Screenshot aesthetic) */}
          <div className="absolute top-2 right-12 z-10">
            <span className="text-base sm:text-lg font-black font-heading text-red-600 tracking-tight drop-shadow-xs">
              {refCode}
            </span>
          </div>

          {/* Offer / Featured Tag in Top Left */}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
            {hasOffer && (
              <span className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm uppercase tracking-wider">
                Sale
              </span>
            )}
            {product.is_featured === 1 && (
              <span className="bg-[#4a154b] text-amber-300 text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm uppercase tracking-wider">
                Top
              </span>
            )}
          </div>

          {/* Main Product Image */}
          <div className="w-full h-full p-4 flex items-center justify-center">
            <img
              src={displayImage}
              alt={product.name}
              loading="lazy"
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>

          {/* Bottom Specification Banner on image */}
          <div className="absolute bottom-2 inset-x-2 bg-white/90 dark:bg-charcoal-900/90 backdrop-blur-xs py-1 px-2 rounded border border-gray-200/80 dark:border-gray-700 text-center">
            <span className="text-[11px] font-black uppercase text-gray-800 dark:text-gray-200 truncate block">
              {product.brand ? `${product.brand} • ` : ''}{product.sku || 'Standard Fitting'}
            </span>
          </div>
        </Link>
      </div>

      {/* 2. Product Information Area */}
      <div className="px-3 sm:px-4 pb-4 pt-1 flex-1 flex flex-col justify-between">
        <div>
          {/* Title (e.g. Wood Working: Bolt M10x30 - DBL) */}
          <Link to={`/products/${product.slug}`} className="block group-hover:text-[#4a154b] dark:group-hover:text-amber-400 transition-colors mb-1.5">
            <h3 className="font-heading font-bold text-gray-900 dark:text-white text-xs sm:text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Price (Deep Purple from screenshot) */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-sm sm:text-base font-black text-[#4a154b] dark:text-purple-400 font-heading">
              Rs. {Number(unitPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            {hasOffer && (
              <span className="text-xs text-gray-400 line-through">
                Rs. {Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            )}
          </div>
        </div>

        {/* 3. Full-width Purple ADD TO CART Button (Screenshot style) + WhatsApp Quick Action */}
        <div className="space-y-1.5">
          <button
            onClick={handleAddToCart}
            disabled={isOut}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm ${
              added || isInEnquiry
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-[#4a154b] hover:bg-[#5b176b] text-white'
            } ${isOut ? 'opacity-50 cursor-not-allowed' : 'active:scale-98'}`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>ADDED TO CART</span>
              </>
            ) : isInEnquiry ? (
              <>
                <Check className="w-4 h-4" />
                <span>IN CART ({items.find(i => i.id === product.id)?.quantity})</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>ADD TO CART</span>
              </>
            )}
          </button>

          {/* Secondary WhatsApp Enquiry Button */}
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
            className="w-full py-1 text-center block text-[11px] font-bold text-green-600 dark:text-green-400 hover:underline"
          >
            💬 Enquire on WhatsApp
          </a>
        </div>

      </div>

    </div>
  );
}

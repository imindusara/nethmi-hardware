import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  MessageSquare,
  ShoppingCart
} from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { siteConfig } from '../config/siteConfig';

export default function ProductCard({ product, whatsappNumber }) {
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
  const hasOffer = product.is_on_offer && product.offer_price && Number(product.offer_price) < Number(product.price);
  const unitPrice = hasOffer ? product.offer_price : product.price;

  // Calculate discount percentage e.g. -40%, -15%
  const discountPercent = hasOffer 
    ? Math.round(((Number(product.price) - Number(product.offer_price)) / Number(product.price)) * 100)
    : null;

  // WhatsApp link for this product
  const productUrl = `${window.location.origin}/products/${product.slug}`;
  const brandName = siteConfig.brandName;
  const waMsg = encodeURIComponent(
    `Hello ${brandName}! I am interested in purchasing *${product.name}* (Price: Rs. ${Number(unitPrice).toLocaleString()}, SKU: ${product.sku || 'N/A'}). Is it available in stock? Link: ${productUrl}`
  );
  const cleanNumber = (whatsappNumber || siteConfig.whatsapp).replace(/[^0-9]/g, '');
  const directWhatsAppUrl = `https://wa.me/${cleanNumber}?text=${waMsg}`;

  return (
    <div className="group flex flex-col bg-white dark:bg-charcoal-900 rounded-2xl border border-gray-200 dark:border-gray-800 transition-all duration-200 hover:shadow-xl p-2.5">
      
      {/* 1. Yellow/Gold Framed Image Container */}
      <Link 
        to={`/products/${product.slug}`} 
        className="relative block rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-charcoal-950 overflow-hidden aspect-square hover:border-[#dc2626] transition-colors"
      >
        {/* Discount Percentage Badge in Top Left */}
        {discountPercent ? (
          <div className="absolute top-2 left-2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#dc2626] text-white text-[11px] sm:text-xs font-black flex items-center justify-center shadow-md">
            -{discountPercent}%
          </div>
        ) : product.is_featured === 1 ? (
          <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-amber-400 text-gray-950 text-[10px] font-black shadow-md uppercase">
            Popular
          </div>
        ) : null}

        {/* Top Right Mini Brand Watermark Badge */}
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-white/95 dark:bg-charcoal-900/95 px-2 py-0.5 rounded-md shadow-xs border border-gray-200 dark:border-gray-700">
          <span className="text-[9px] font-black text-[#dc2626] leading-none">Nethmi</span>
          <span className="text-[9px] font-bold text-gray-700 dark:text-gray-300 leading-none">Tools</span>
        </div>

        {/* Product Image with lazy loading and meaningful alt */}
        <div className="w-full h-full p-4 flex items-center justify-center">
          <img
            src={displayImage}
            alt={`${product.name} - Genuine Hardware Product`}
            loading="lazy"
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80';
            }}
          />
        </div>
      </Link>

      {/* 2. Product Information Area */}
      <div className="pt-3 pb-1 px-1 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <Link to={`/products/${product.slug}`} className="block group-hover:text-[#dc2626] transition-colors mb-1.5">
            <h3 className="font-bold text-gray-900 dark:text-white text-xs sm:text-[13px] leading-snug line-clamp-2 min-h-[34px]">
              {product.name}
            </h3>
          </Link>

          {/* Pricing */}
          <div className="flex items-baseline flex-wrap gap-1.5 mb-3">
            {hasOffer && (
              <span className="text-xs text-gray-400 line-through">
                Rs. {Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
            )}
            <span className="text-xs sm:text-sm font-black text-[#dc2626] font-heading">
              Rs. {Number(unitPrice).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>

        {/* 3. Action Buttons with 44px Minimum Touch Target */}
        <div className="space-y-1.5">
          <button
            onClick={handleAddToCart}
            disabled={isOut}
            aria-label={`Add ${product.name} to cart`}
            className={`w-full min-h-[44px] py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm ${
              added || isInEnquiry
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-[#dc2626] hover:bg-[#b91c1c] text-white'
            } ${isOut ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Cart</span>
              </>
            ) : isInEnquiry ? (
              <>
                <Check className="w-4 h-4" />
                <span>In Cart ({items.find(i => i.id === product.id)?.quantity})</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          {/* Direct WhatsApp Instant Quote Button */}
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Order or inquire about ${product.name} on WhatsApp`}
            className="w-full min-h-[36px] py-1.5 text-center flex items-center justify-center gap-1.5 rounded-lg text-[11px] font-bold text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/40 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Ask Price on WhatsApp</span>
          </a>
        </div>

      </div>

    </div>
  );
}

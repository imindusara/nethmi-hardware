import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Check, 
  MessageSquare
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
  const hasOffer = product.is_on_offer && product.offer_price && Number(product.offer_price) < Number(product.price);
  const unitPrice = hasOffer ? product.offer_price : product.price;

  // Calculate discount percentage e.g. -40%, -15%
  const discountPercent = hasOffer 
    ? Math.round(((Number(product.price) - Number(product.offer_price)) / Number(product.price)) * 100)
    : null;

  // WhatsApp link for this product
  const productUrl = `${window.location.origin}/products/${product.slug}`;
  const waMsg = encodeURIComponent(
    `Hello Nethmi Hardware! I am interested in purchasing *${product.name}* (Price: Rs. ${Number(unitPrice).toLocaleString()}, SKU: ${product.sku || 'N/A'}). Is it available in stock? Link: ${productUrl}`
  );
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const directWhatsAppUrl = `https://wa.me/${cleanNumber}?text=${waMsg}`;

  return (
    <div className="group flex flex-col bg-white rounded-lg transition-all duration-200 hover:shadow-lg p-1.5">
      
      {/* 1. Yellow/Gold Framed Image Container (Exact Screenshot Style) */}
      <Link 
        to={`/products/${product.slug}`} 
        className="relative block rounded-md border-2 border-amber-500 bg-white overflow-hidden aspect-square hover:border-[#dc2626] transition-colors"
      >
        {/* Circular Discount Percentage Badge in Top Left (e.g. -40%, -15%) */}
        {discountPercent ? (
          <div className="absolute top-2 left-2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#dc2626] text-white text-[11px] sm:text-xs font-black flex items-center justify-center shadow-md">
            -{discountPercent}%
          </div>
        ) : product.is_featured === 1 ? (
          <div className="absolute top-2 left-2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 text-red-950 text-[10px] font-black flex items-center justify-center shadow-md uppercase">
            HOT
          </div>
        ) : null}

        {/* Top Right Mini HardwareMart Watermark Logo */}
        <div className="absolute top-2 right-2 z-10 flex items-center gap-0.5 bg-white/95 px-1.5 py-0.5 rounded shadow-xs border border-amber-200">
          <span className="text-[9px] font-black text-[#dc2626] leading-none">Hardware</span>
          <span className="text-[9px] font-black text-amber-500 leading-none">Mart</span>
        </div>

        {/* Product Image */}
        <div className="w-full h-full p-4 flex items-center justify-center">
          <img
            src={displayImage}
            alt={product.name}
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
      <div className="pt-2.5 pb-2 px-1 flex-1 flex flex-col justify-between">
        <div>
          {/* Title: Category: Product Name - Brand */}
          <Link to={`/products/${product.slug}`} className="block group-hover:text-[#dc2626] transition-colors mb-1.5">
            <h3 className="font-bold text-gray-900 text-xs sm:text-[13px] leading-tight line-clamp-2 min-h-[34px]">
              {product.name}
            </h3>
          </Link>

          {/* Pricing: Struck-through Old Price + Red Sale Price */}
          <div className="flex items-baseline flex-wrap gap-1.5 mb-3">
            {hasOffer && (
              <span className="text-xs text-gray-400 line-through">
                Rs. {Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            )}
            <span className="text-xs sm:text-sm font-bold text-[#dc2626]">
              Rs. {Number(unitPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* 3. Red Pill Button: ADD TO CART */}
        <div className="space-y-1">
          <button
            onClick={handleAddToCart}
            disabled={isOut}
            className={`w-full py-2 px-3 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm ${
              added || isInEnquiry
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-[#dc2626] hover:bg-[#b91c1c] text-white'
            } ${isOut ? 'opacity-50 cursor-not-allowed' : 'active:scale-98'}`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>ADDED</span>
              </>
            ) : isInEnquiry ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>IN CART ({items.find(i => i.id === product.id)?.quantity})</span>
              </>
            ) : (
              <span>ADD TO CART</span>
            )}
          </button>

          {/* Quick WhatsApp Inquiry */}
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Inquire about ${product.name} on WhatsApp`}
            className="w-full py-0.5 text-center block text-[10px] font-semibold text-green-600 hover:underline"
          >
            💬 Enquire on WhatsApp
          </a>
        </div>

      </div>

    </div>
  );
}


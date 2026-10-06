import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Check, 
  MessageSquare, 
  Phone, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  Tag, 
  Sparkles,
  Plus,
  Minus,
  ArrowLeft
} from 'lucide-react';
import { api } from '../services/api';
import { useEnquiry } from '../context/EnquiryContext';
import ProductCard from '../components/ProductCard';
import SEOHead from '../components/SEOHead';

export default function ProductDetail({ settings }) {
  const { slug } = useParams();
  const { addItem, items } = useEnquiry();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const phone = settings?.phone || '+94 77 123 4567';
  const whatsapp = settings?.whatsapp || '94771234567';

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.getProductBySlug(slug);
        if (res.success && res.data) {
          setProduct(res.data);
          setRelated(res.related || []);
          setActiveImageIndex(0);
          setQuantity(1);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product detail:', err);
        setError('Failed to load product information');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-3xl"></div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
            <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold font-heading text-gray-900 dark:text-white mb-4">
          Product Not Found
        </h2>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4a154b] text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>
    );
  }

  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'];

  const isOut = product.stock_status === 'Out of Stock';
  const hasOffer = product.is_on_offer && product.offer_price && product.offer_price < product.price;
  const unitPrice = hasOffer ? product.offer_price : product.price;
  const isInEnquiry = items.some(item => item.id === product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const currentUrl = window.location.href;
  const waMsg = encodeURIComponent(
    `Hello Nethmi Hardware! I am inquiring about *${product.name}* (Price: Rs. ${Number(unitPrice).toLocaleString()}, SKU: ${product.sku || 'N/A'}, Qty: ${quantity}). Please let me know stock availability. Link: ${currentUrl}`
  );
  const cleanNumber = whatsapp.replace(/[^0-9]/g, '');
  const directWhatsAppUrl = `https://wa.me/${cleanNumber}?text=${waMsg}`;

  const specs = typeof product.specifications === 'object' && product.specifications !== null 
    ? product.specifications 
    : {};

  return (
    <>
      <SEOHead 
        title={product.name}
        description={product.short_description || product.description}
        schemaType="Product"
        productData={product}
        settings={settings}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#4a154b]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/products" className="hover:text-[#4a154b]">Shop</Link>
          {product.category_slug && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to={`/products?category=${product.category_slug}`} className="hover:text-[#4a154b]">
                {product.category_name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-bold truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Product Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-16">
          
          {/* Framed Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white dark:bg-charcoal-900 border-2 border-amber-400 dark:border-amber-500/80 p-8 shadow-sm flex items-center justify-center">
              <img
                src={images[activeImageIndex]}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {hasOffer && (
                  <span className="inline-flex items-center gap-1 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-lg shadow-md uppercase">
                    Special Offer
                  </span>
                )}
                {product.is_featured === 1 && (
                  <span className="inline-flex items-center gap-1 bg-[#4a154b] text-amber-300 text-xs font-black px-3 py-1 rounded-lg shadow-md uppercase">
                    Featured Item
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 p-2 bg-white ${
                      activeImageIndex === idx
                        ? 'border-amber-500 shadow-md ring-2 ring-amber-400/30'
                        : 'border-gray-200 dark:border-gray-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} preview`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Actions Section */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4a154b] dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-1 rounded-md">
                  {product.category_name || 'Hardware'}
                </span>
                {product.brand && (
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-md">
                    Brand: {product.brand}
                  </span>
                )}
                <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-md ml-auto">
                  {product.stock_status || 'In Stock'}
                </span>
              </div>

              {/* Title & SKU */}
              <h1 className="text-2xl sm:text-4xl font-black font-heading text-gray-900 dark:text-white leading-tight mb-2">
                {product.name}
              </h1>
              {product.sku && (
                <p className="text-xs text-gray-400 font-mono mb-4">
                  Item Code: {product.sku}
                </p>
              )}

              {/* Price (Deep Purple from screenshot) */}
              <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-charcoal-900 border border-purple-100 dark:border-gray-800 mb-6 flex items-baseline gap-3">
                <span className="text-3xl font-black font-heading text-[#4a154b] dark:text-purple-400">
                  Rs. {Number(unitPrice).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                {hasOffer && (
                  <span className="text-base text-gray-400 line-through">
                    Rs. {Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                )}
              </div>

              {/* Short Description */}
              {product.short_description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {product.short_description}
                </p>
              )}

              {/* Quantity Stepper & Add to Cart */}
              <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2.5 hover:bg-gray-100 text-gray-600 dark:text-gray-300"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-sm font-bold text-gray-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2.5 hover:bg-gray-100 text-gray-600 dark:text-gray-300"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={isOut}
                    className={`py-3.5 px-5 rounded-xl font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all ${
                      added
                        ? 'bg-green-600 text-white'
                        : isInEnquiry
                        ? 'bg-green-600 text-white'
                        : 'bg-[#4a154b] hover:bg-[#5b176b] text-white'
                    } ${isOut ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>WhatsApp Order</span>
                  </a>
                </div>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-charcoal-900 border border-gray-200 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Original Manufacturer Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Islandwide Site Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        {Object.keys(specs).length > 0 && (
          <div className="bg-white dark:bg-charcoal-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs mb-16">
            <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
              Technical Specifications & Dimensions
            </h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {Object.entries(specs).map(([key, val]) => (
                <div key={key} className="flex justify-between p-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <dt className="font-semibold text-gray-500">{key}:</dt>
                  <dd className="font-bold text-gray-900 dark:text-white">{val}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h3 className="text-xl font-black font-heading uppercase text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-[#4a154b]">
              Related Products in {product.category_name}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {related.map((rel) => (
                <ProductCard key={rel.id} product={rel} whatsappNumber={whatsapp} />
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  );
}

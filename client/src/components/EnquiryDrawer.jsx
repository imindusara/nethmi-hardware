import React from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  MessageSquare, 
  FileText, 
  ArrowRight 
} from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

export default function EnquiryDrawer({ whatsappNumber = '94771234567' }) {
  const { 
    items, 
    isDrawerOpen, 
    closeDrawer, 
    removeItem, 
    updateQuantity, 
    clearEnquiry, 
    estimatedTotal,
    totalItemsCount,
    generateWhatsAppUrl
  } = useEnquiry();

  if (!isDrawerOpen) return null;

  const whatsappUrl = generateWhatsAppUrl(whatsappNumber);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={closeDrawer}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-charcoal-900 shadow-2xl flex flex-col border-l border-gray-200 dark:border-gray-800">
          
          {/* Drawer Header (Deep Purple) */}
          <div className="p-4 sm:p-5 border-b border-purple-900 bg-[#4a154b] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-purple-950 flex items-center justify-center font-bold">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-base">
                  My Shopping Cart
                </h3>
                <p className="text-xs text-purple-200">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={closeDrawer}
              aria-label="Close cart"
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-purple-50 dark:bg-gray-800 flex items-center justify-center text-purple-400 mb-4">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h4 className="font-heading font-bold text-gray-900 dark:text-white text-lg mb-1">
                  Your cart is empty
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mb-6">
                  Browse our catalog and click "Add to Cart" on the hardware items you need.
                </p>
                <Link
                  to="/products"
                  onClick={closeDrawer}
                  className="px-5 py-2.5 rounded-xl bg-[#4a154b] hover:bg-[#5b176b] text-white font-bold text-xs shadow-md"
                >
                  Shop Hardware Catalog
                </Link>
              </div>
            ) : (
              items.map(item => {
                const unitPrice = item.offer_price ? Number(item.offer_price) : Number(item.price);
                const subtotal = unitPrice * item.quantity;

                return (
                  <div 
                    key={item.id}
                    className="flex gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-contain bg-white dark:bg-gray-900 border border-amber-300 shrink-0 p-1"
                    />
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <Link 
                          to={`/products/${item.slug}`} 
                          onClick={closeDrawer}
                          className="font-bold text-xs text-gray-900 dark:text-white line-clamp-2 hover:text-[#4a154b]"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600 dark:text-gray-300"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-gray-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600 dark:text-gray-300"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-xs font-black text-[#4a154b] dark:text-purple-400 block font-heading">
                            Rs. {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-charcoal-950 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-gray-500 uppercase">Cart Subtotal:</span>
                <span className="text-xl font-black text-[#4a154b] dark:text-purple-400 font-heading">
                  Rs. {estimatedTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs shadow-md transition-all active:scale-98"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Send Order on WhatsApp</span>
                </a>

                <Link
                  to="/quote"
                  onClick={closeDrawer}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#4a154b] hover:bg-[#5b176b] text-white font-bold text-xs shadow-md transition-all active:scale-98"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request Official Project Quote (BOQ)</span>
                </Link>

                <div className="flex justify-between items-center pt-2 text-xs">
                  <button
                    onClick={clearEnquiry}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                  >
                    Clear Cart
                  </button>
                  <Link
                    to="/enquiry-list"
                    onClick={closeDrawer}
                    className="font-bold text-[#4a154b] dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>Full Cart Page →</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

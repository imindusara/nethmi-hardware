import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  MessageSquare, 
  FileText, 
  ArrowLeft, 
  Truck, 
  CheckCircle2 
} from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import SEOHead from '../components/SEOHead';

export default function EnquiryList({ settings }) {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearEnquiry, 
    estimatedTotal, 
    totalItemsCount,
    generateWhatsAppUrl 
  } = useEnquiry();

  const [customerName, setCustomerName] = useState('');
  const [deliveryNeeded, setDeliveryNeeded] = useState(false);

  const whatsapp = settings?.whatsapp || '94771234567';
  const whatsappUrl = generateWhatsAppUrl(whatsapp, customerName, deliveryNeeded);

  return (
    <>
      <SEOHead 
        title="My Enquiry List"
        description="Review your selected hardware materials, calculate estimated costs, and generate an instant WhatsApp enquiry for Nethmi Hardware."
        settings={settings}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black font-heading text-gray-900 dark:text-white">
              My Hardware Enquiry List
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} saved in your current session
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="bg-white dark:bg-charcoal-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-12 text-center shadow-soft">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 mx-auto mb-4">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-2">
              Your enquiry list is currently empty
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
              Browse our catalog of power tools, building materials, plumbing, and electrical supplies to add items for quick WhatsApp pricing.
            </p>
            <Link
              to="/products"
              className="px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm shadow-md shadow-primary-500/25 transition-all"
            >
              Browse Hardware Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Items Table (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white dark:bg-charcoal-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 shadow-soft">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800 mb-4">
                  <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white">
                    Selected Items ({items.length})
                  </h3>
                  <button
                    onClick={clearEnquiry}
                    className="text-xs text-red-500 hover:underline font-semibold"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-800 space-y-4">
                  {items.map((item) => {
                    const unitPrice = item.offer_price ? Number(item.offer_price) : Number(item.price);
                    const subtotal = unitPrice * item.quantity;

                    return (
                      <div key={item.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover bg-gray-100 dark:bg-gray-800 shrink-0"
                          />
                          <div>
                            <Link
                              to={`/products/${item.slug}`}
                              className="font-heading font-bold text-sm text-gray-900 dark:text-white hover:text-primary-500 line-clamp-1"
                            >
                              {item.name}
                            </Link>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Unit: Rs. {unitPrice.toLocaleString()} {item.sku && `• SKU: ${item.sku}`}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6">
                          {/* Stepper */}
                          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold text-gray-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Subtotal */}
                          <div className="text-right min-w-[90px]">
                            <span className="text-sm font-black font-heading text-gray-900 dark:text-white block">
                              Rs. {subtotal.toLocaleString()}
                            </span>
                          </div>

                          {/* Delete */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Checkout / Summary Box (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-charcoal-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 shadow-soft space-y-5">
                <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
                  Enquiry Summary
                </h3>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ruwan Silva"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deliveryNeeded}
                    onChange={(e) => setDeliveryNeeded(e.target.checked)}
                    className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                  />
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-800 dark:text-gray-200">
                    <Truck className="w-4 h-4 text-primary-500" />
                    <span>Request Job-Site Delivery</span>
                  </div>
                </label>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-gray-500">Estimated Total:</span>
                    <span className="text-2xl font-black font-heading text-gray-900 dark:text-white">
                      Rs. {estimatedTotal.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    *Final price may include quantity discounts and delivery fees.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-98"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Send on WhatsApp</span>
                  </a>

                  <Link
                    to="/quote"
                    className="w-full py-3 px-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-98"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Convert to Project Quote</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </>
  );
}

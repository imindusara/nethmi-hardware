import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, FileText, ShoppingCart } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { siteConfig } from '../config/siteConfig';

export default function MobileBottomNav({ phone, whatsappNumber }) {
  const { totalItemsCount, openDrawer } = useEnquiry();
  const rawPhone = (phone || siteConfig.phone).replace(/[^0-9+]/g, '');
  const cleanWhatsapp = (whatsappNumber || siteConfig.whatsapp).replace(/[^0-9]/g, '');
  const whatsappMsg = encodeURIComponent("Hello Nethmi Hardware! I would like to inquire about building materials and prices.");

  return (
    <nav 
      aria-label="Mobile Bottom Actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-2 py-1.5"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
        
        {/* 1. Direct Call Action */}
        <a
          href={`tel:${rawPhone}`}
          aria-label={`Call hotline ${rawPhone}`}
          className="min-h-[44px] flex flex-col items-center justify-center rounded-xl text-gray-700 dark:text-gray-200 hover:text-[#dc2626] active:scale-95 transition-all text-center p-1"
        >
          <Phone className="w-4 h-4 text-[#dc2626] mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">Call</span>
        </a>

        {/* 2. WhatsApp Live Chat Action */}
        <a
          href={`https://wa.me/${cleanWhatsapp}?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="min-h-[44px] flex flex-col items-center justify-center rounded-xl text-gray-700 dark:text-gray-200 hover:text-[#25D366] active:scale-95 transition-all text-center p-1"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366] mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* 3. Project BOQ / Quote Request */}
        <Link
          to="/quote"
          aria-label="Request Project Quote BOQ"
          className="min-h-[44px] flex flex-col items-center justify-center rounded-xl text-gray-900 dark:text-white bg-amber-400/20 hover:bg-amber-400/30 active:scale-95 transition-all text-center p-1 font-bold"
        >
          <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight text-amber-700 dark:text-amber-300">Quote</span>
        </Link>

        {/* 4. Cart / Enquiry List Drawer */}
        <button
          onClick={openDrawer}
          aria-label={`Open shopping cart with ${totalItemsCount} items`}
          className="min-h-[44px] flex flex-col items-center justify-center rounded-xl text-gray-700 dark:text-gray-200 hover:text-[#dc2626] active:scale-95 transition-all text-center p-1 relative"
        >
          <div className="relative">
            <ShoppingCart className="w-4 h-4 text-gray-700 dark:text-gray-200 mb-0.5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#dc2626] text-white text-[9px] font-black rounded-full h-3.5 min-w-[14px] px-1 flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight">Cart</span>
        </button>

      </div>
    </nav>
  );
}

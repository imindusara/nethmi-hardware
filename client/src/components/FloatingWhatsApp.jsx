import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';

export default function FloatingWhatsApp({ whatsappNumber = '94771234567', phone = '+94771234567' }) {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const defaultMsg = encodeURIComponent("Hello Nethmi Hardware! I would like to check prices and stock availability.");

  return (
    <div className="fixed right-4 bottom-8 z-50 flex flex-col gap-3 items-center">
      
      {/* 1. WhatsApp Button (Green Circle) */}
      <a
        href={`https://wa.me/${cleanNumber}?text=${defaultMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all group"
      >
        <MessageSquare className="w-6 h-6 fill-white" />
      </a>

      {/* 2. Direct Call Button (Purple Circle from screenshot) */}
      <a
        href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
        aria-label="Call Store Directly"
        title="Call Store Directly"
        className="w-12 h-12 rounded-full bg-[#4a154b] hover:bg-[#5b176b] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all group"
      >
        <Phone className="w-5 h-5 fill-white" />
      </a>

    </div>
  );
}

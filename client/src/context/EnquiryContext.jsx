import React, { createContext, useContext, useState, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';

const EnquiryContext = createContext();

export function EnquiryProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('nethmi_enquiry_list');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('nethmi_enquiry_list', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save enquiry list to localStorage:', e);
    }
  }, [items]);

  const addItem = (product, quantity = 1) => {
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const image = Array.isArray(product.images) && product.images.length > 0
          ? product.images[0]
          : (typeof product.images === 'string' ? JSON.parse(product.images || '[]')[0] : null);

        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            offer_price: product.offer_price,
            sku: product.sku,
            brand: product.brand,
            image: image || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
            quantity: Math.max(1, quantity)
          }
        ];
      }
    });
    setIsDrawerOpen(true);
  };

  const removeItem = (productId) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearEnquiry = () => {
    setItems([]);
  };

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const estimatedTotal = items.reduce((sum, item) => {
    const unitPrice = item.offer_price ? Number(item.offer_price) : Number(item.price);
    return sum + unitPrice * item.quantity;
  }, 0);

  const generateWhatsAppUrl = (whatsappNumber = siteConfig.whatsapp, customerName = '', deliveryNeeded = false) => {
    if (items.length === 0) return `https://wa.me/${whatsappNumber}`;

    let msg = `*Hello ${siteConfig.brandName}!* 🔨\n`;
    if (customerName) {
      msg += `My Name: *${customerName}*\n`;
    }
    msg += `I would like to enquire about availability and a final quote for the following items:\n\n`;

    items.forEach((item, idx) => {
      const unitPrice = item.offer_price ? Number(item.offer_price) : Number(item.price);
      msg += `*${idx + 1}. ${item.name}*\n`;
      msg += `   • Qty: *${item.quantity}* | Unit: Rs. ${unitPrice.toLocaleString()} (SKU: ${item.sku || 'N/A'})\n`;
      msg += `   • Subtotal: Rs. ${(unitPrice * item.quantity).toLocaleString()}\n`;
    });

    msg += `\n📊 *Estimated Total: Rs. ${estimatedTotal.toLocaleString()}*`;
    if (deliveryNeeded) {
      msg += `\n🚚 *Job-site delivery required.*`;
    }
    msg += `\n\nPlease let me know stock availability and the best discounted price. Thank you!`;

    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <EnquiryContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearEnquiry,
        totalItemsCount,
        estimatedTotal,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        toggleDrawer: () => setIsDrawerOpen(prev => !prev),
        generateWhatsAppUrl
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error('useEnquiry must be used within an EnquiryProvider');
  }
  return context;
}

import React, { useEffect } from 'react';

export default function SEOHead({ 
  title, 
  description, 
  schemaType = 'LocalBusiness', 
  productData = null, 
  settings = null 
}) {
  const siteName = 'Nethmi Hardware';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Everything You Need to Build, Fix and Create`;
  const defaultDesc = settings?.hero_subtitle || 'Sri Lanka’s trusted hardware store supplying contractor-grade power tools, genuine building materials, electricals, plumbing, and safety equipment.';
  const finalDesc = description || defaultDesc;

  useEffect(() => {
    // Update Title
    document.title = fullTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = finalDesc;

    // Structured Data JSON-LD
    let scriptTag = document.getElementById('json-ld-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    let schemaObj = {};
    if (schemaType === 'Product' && productData) {
      schemaObj = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: productData.name,
        image: Array.isArray(productData.images) && productData.images.length > 0 ? productData.images[0] : '',
        description: productData.description || productData.short_description,
        sku: productData.sku,
        brand: {
          '@type': 'Brand',
          name: productData.brand || 'Nethmi Hardware'
        },
        offers: {
          '@type': 'Offer',
          url: window.location.href,
          priceCurrency: 'LKR',
          price: productData.offer_price || productData.price,
          availability: productData.stock_status === 'In Stock' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          seller: {
            '@type': 'Organization',
            name: siteName
          }
        }
      };
    } else {
      schemaObj = {
        '@context': 'https://schema.org',
        '@type': 'HardwareStore',
        name: siteName,
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
        telephone: settings?.phone || '+94771234567',
        address: {
          '@type': 'PostalAddress',
          streetAddress: settings?.address || 'No. 142, Kandy Road',
          addressLocality: 'Kiribathgoda',
          addressCountry: 'LK'
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '07:30',
            closes: '18:30'
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Sunday'],
            opens: '08:00',
            closes: '13:00'
          }
        ],
        url: window.location.origin
      };
    }

    scriptTag.text = JSON.stringify(schemaObj);
  }, [fullTitle, finalDesc, schemaType, productData, settings]);

  return null;
}

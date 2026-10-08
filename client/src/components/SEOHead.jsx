import React, { useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';

export default function SEOHead({ 
  title, 
  description, 
  schemaType = 'LocalBusiness', 
  productData = null, 
  settings = null 
}) {
  const siteName = siteConfig.brandName;
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | ${siteConfig.tagline}`;
  const defaultDesc = settings?.hero_subtitle || `${siteName} supplies contractor-grade power tools, genuine cement, steel, plumbing, and electrical materials with islandwide delivery in Sri Lanka.`;
  const finalDesc = description || defaultDesc;
  const siteUrl = window.location.href;
  const logoUrl = `${window.location.origin}/logo.png`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // 2. Helper to set or create meta tags
    const setMetaTag = (attr, val, content) => {
      let meta = document.querySelector(`meta[${attr}="${val}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, val);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    setMetaTag('name', 'description', finalDesc);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', finalDesc);
    setMetaTag('property', 'og:url', siteUrl);
    setMetaTag('property', 'og:site_name', siteName);
    setMetaTag('property', 'og:type', schemaType === 'Product' ? 'product' : 'website');
    setMetaTag('property', 'og:image', productData?.images?.[0] || logoUrl);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', finalDesc);
    setMetaTag('name', 'twitter:image', productData?.images?.[0] || logoUrl);

    // 3. Structured Data JSON-LD
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
        image: Array.isArray(productData.images) && productData.images.length > 0 ? productData.images[0] : logoUrl,
        description: productData.description || productData.short_description || finalDesc,
        sku: productData.sku,
        brand: {
          '@type': 'Brand',
          name: productData.brand || siteName
        },
        offers: {
          '@type': 'Offer',
          url: siteUrl,
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
        url: window.location.origin,
        logo: logoUrl,
        image: `${window.location.origin}/Sunlit%20Construction%20Supply%20Showcase.png`,
        description: finalDesc,
        telephone: settings?.phone || siteConfig.phone,
        email: settings?.email || siteConfig.email,
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: settings?.address || siteConfig.address,
          addressLocality: siteConfig.city,
          addressRegion: siteConfig.province,
          addressCountry: siteConfig.country
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
        ]
      };
    }

    scriptTag.text = JSON.stringify(schemaObj);
  }, [fullTitle, finalDesc, schemaType, productData, settings, siteUrl, logoUrl]);

  return null;
}

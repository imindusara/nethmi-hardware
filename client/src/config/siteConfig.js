/**
 * Nethmi Online Tool Shop - Central Site Configuration
 * Single source of truth for brand name, contact details, policies, and promotional campaigns.
 */

export const siteConfig = {
  // Brand Identity (Used across Header, Logo, Title, Meta, Footer)
  brandName: 'Nethmi Online Tool Shop',
  tagline: 'Everything You Need to Build, Fix and Create',
  legalName: 'Nethmi Online Tool Shop (Pvt) Ltd',
  
  // Contact Details
  phone: '+94 78 999 1624',
  phoneSecondary: '+94 11 234 5678',
  
  // Official WhatsApp business number
  whatsapp: '94789991624',
  
  // TODO: Replace placeholder email with the official business email
  email: 'info@nethmihardware.com',
  
  // TODO: Replace placeholder address with the exact storefront / warehouse address
  address: 'No. 142, Kandy Road, Kiribathgoda, Sri Lanka',
  city: 'Kiribathgoda',
  province: 'Western Province',
  country: 'LK',
  
  // Store Opening Hours
  // TODO: Update opening hours if your operational schedule changes
  openingHours: 'Mon - Sat: 7:30 AM - 6:30 PM | Sun: 8:00 AM - 1:00 PM',
  
  // Delivery & Value Promises
  // Specific promise line for local audience in Sri Lanka
  deliveryPromise: 'Same-day delivery in Colombo & Gampaha | Islandwide within 48h',
  
  // Social Proof Stats
  // TODO: Update with your real contractor & builder community numbers
  socialProof: {
    contractorCount: '500+',
    label: 'Trusted by 500+ Contractors, Masons & Builders in Sri Lanka',
    rating: '4.9/5 (180+ verified reviews)'
  },
  
  // Monsoon Promotional Campaign
  // Configurable campaign data so dates and discounts can be updated easily
  promotions: {
    monsoon: {
      tag: 'Special Contractor Pricing',
      title: 'Monsoon Building Materials Promotion',
      description: 'Get up to 20% discount on volume cement orders, steel bundles, and exterior waterproofing coats.',
      // TODO: Update promotional campaign end date as needed
      endDate: 'November 30, 2026',
      urgencyLine: '⚡ Limited warehouse stock remaining for the monsoon season',
      whatsappPrefill: "Hi Nethmi Online Tool Shop, I'd like to claim the Monsoon building materials offer and get a discount quote."
    }
  },

  // Social Links
  socials: {
    facebook: 'https://facebook.com/nethmihardware',
    instagram: 'https://instagram.com/nethmihardware',
    tiktok: 'https://tiktok.com/@nethmihardware'
  },
  
  // Google Maps Location Embed
  googleMapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63364.305943485015!2d79.8893632!3d6.9748682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae257f864f7a77d%3A0x6b7a59960ff14ab2!2sKiribathgoda!5e0!3m2!1sen!2slk!4v1710000000000!5m2!1sen!2slk'
};

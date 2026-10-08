import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageSquare, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  Award
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function Footer({ settings }) {
  const brandName = siteConfig.brandName;
  const phone = settings?.phone || siteConfig.phone;
  const secondaryPhone = settings?.phone_secondary || siteConfig.phoneSecondary;
  const whatsapp = settings?.whatsapp || siteConfig.whatsapp;
  const address = settings?.address || siteConfig.address;
  const hours = settings?.opening_hours || siteConfig.openingHours;
  const mapEmbed = settings?.google_map_embed || siteConfig.googleMapEmbed;
  const facebookUrl = settings?.facebook_url || siteConfig.socials.facebook;
  const instagramUrl = settings?.instagram_url || siteConfig.socials.instagram;

  const quickLinks = [
    { name: 'Browse All Products', path: '/products' },
    { name: 'Hot Deals & Promotions', path: '/products?onOffer=true' },
    { name: 'Hardware Departments', path: '/categories' },
    { name: 'Request a Quote (BOQ)', path: '/quote' },
    { name: 'Store Photo Gallery', path: '/gallery' },
    { name: 'About Nethmi Hardware', path: '/about' },
    { name: 'Contact & Directions', path: '/contact' },
    { name: 'View My Cart / Enquiry', path: '/enquiry-list' },
  ];

  const categoryLinks = [
    { name: 'Power Tools & Machinery', slug: 'power-tools' },
    { name: 'Building Materials & Cement', slug: 'building-materials' },
    { name: 'Hand Tools & Hardware', slug: 'hand-tools' },
    { name: 'Bathroom & Plumbing Supplies', slug: 'bathroom-plumbing' },
    { name: 'Electrical & Lighting', slug: 'electrical' },
    { name: 'Paint, Sealant & Adhesives', slug: 'paint-sealant-adhesives' },
    { name: 'Fasteners, Screws & Nails', slug: 'fasteners' },
    { name: 'Safety Equipment & Gear', slug: 'safety-gear' },
  ];

  return (
    <footer className="bg-[#1f0404] text-gray-300 pt-14 pb-12 border-t-4 border-[#dc2626]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Prop Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-red-900/60">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-red-950/60 border border-red-900/60">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-gray-950 flex items-center justify-center shrink-0 font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-white text-base">100% Genuine Brands</h4>
              <p className="text-xs text-red-200">SLS-certified building materials & authentic power tools.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-red-950/60 border border-red-900/60">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-gray-950 flex items-center justify-center shrink-0 font-bold">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-white text-base">Islandwide Site Delivery</h4>
              <p className="text-xs text-red-200">Dedicated lorry transport for heavy building supplies.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-red-950/60 border border-red-900/60">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-gray-950 flex items-center justify-center shrink-0 font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-white text-base">Contractor Wholesale Rates</h4>
              <p className="text-xs text-red-200">Tiered bulk pricing for builders, masons & civil contractors.</p>
            </div>
          </div>
        </div>

        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand Info */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <img
                src="/logo.png"
                alt={`${brandName} 3D Tool Emblem Logo`}
                className="w-11 h-11 object-contain drop-shadow group-hover:scale-105 transition-transform duration-200"
              />
              <div>
                <span className="text-xl font-black tracking-tight text-white font-heading">
                  {brandName}
                </span>
                <span className="block text-[10px] tracking-wider text-red-300 font-medium">
                  {siteConfig.tagline}
                </span>
              </div>
            </Link>
            <p className="text-xs text-red-200 mb-6 leading-relaxed">
              Sri Lanka's trusted hardware destination supplying contractor-grade power tools, genuine cement, steel rebar, electricals, and plumbing with direct job-site delivery.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${brandName} on Facebook`}
                className="w-9 h-9 rounded-lg bg-red-900/80 hover:bg-amber-400 hover:text-gray-950 flex items-center justify-center text-red-200 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${brandName} on Instagram`}
                className="w-9 h-9 rounded-lg bg-red-900/80 hover:bg-amber-400 hover:text-gray-950 flex items-center justify-center text-red-200 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(brandName)}!`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${brandName} on WhatsApp`}
                className="w-9 h-9 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold font-heading text-white uppercase tracking-wider mb-4 border-l-2 border-[#dc2626] pl-3">
              Store Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-red-200 hover:text-white flex items-center gap-1.5 transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-red-400 group-hover:text-amber-400 transition-colors" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h3 className="text-sm font-bold font-heading text-white uppercase tracking-wider mb-4 border-l-2 border-[#dc2626] pl-3">
              Key Departments
            </h3>
            <ul className="space-y-2 text-xs">
              {categoryLinks.map(cat => (
                <li key={cat.slug}>
                  <Link
                    to={`/products?category=${cat.slug}`}
                    className="text-red-200 hover:text-white flex items-center gap-1.5 transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-red-400 group-hover:text-amber-400 transition-colors" />
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div>
            <h3 className="text-sm font-bold font-heading text-white uppercase tracking-wider mb-4 border-l-2 border-[#dc2626] pl-3">
              Store Location
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-red-200">{address}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="text-red-200 hover:text-white block">{phone}</a>
                  {secondaryPhone && (
                    <a href={`tel:${secondaryPhone.replace(/[^0-9+]/g, '')}`} className="text-red-400 hover:text-white block text-[10px]">{secondaryPhone}</a>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-red-200">{hours}</span>
              </div>
            </div>

            {mapEmbed && (
              <div className="mt-4 rounded-xl overflow-hidden border border-red-900 h-24 w-full shadow-inner">
                <iframe
                  title="Store Location Map"
                  src={mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-red-900/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-red-300">
          <p>© {new Date().getFullYear()} {brandName}. All Rights Reserved. Sri Lanka.</p>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-amber-400">Directions & Map</Link>
            <span>•</span>
            <Link to="/quote" className="hover:text-amber-400">Request Quote</Link>
            <span>•</span>
            <Link to="/gallery" className="hover:text-amber-400">Store Showroom</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

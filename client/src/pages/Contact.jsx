import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink 
} from 'lucide-react';
import { api } from '../services/api';
import SEOHead from '../components/SEOHead';
import { siteConfig } from '../config/siteConfig';

export default function Contact({ settings }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    _honeypot: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const brandName = siteConfig.brandName;
  const phone = settings?.phone || siteConfig.phone;
  const secondaryPhone = settings?.phone_secondary || siteConfig.phoneSecondary;
  const whatsapp = settings?.whatsapp || siteConfig.whatsapp;
  const email = settings?.email || siteConfig.email;
  const address = settings?.address || siteConfig.address;
  const hours = settings?.opening_hours || siteConfig.openingHours;
  const mapEmbed = settings?.google_map_embed || siteConfig.googleMapEmbed;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!formData.name.trim() || !formData.message.trim()) {
      setErrorMsg('Please provide your name and message.');
      return;
    }

    if (!formData.phone.trim() && !formData.email.trim()) {
      setErrorMsg('Please enter either a phone number or email so we can reach you.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.submitMessage(formData);
      if (res.success) {
        setSuccessMsg(res.message || 'Thank you for reaching out! We have received your message.');
        setFormData({ name: '', phone: '', email: '', message: '', _honeypot: '' });
      } else {
        setErrorMsg(res.message || 'Failed to send message. Please try WhatsApp for immediate assistance.');
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setErrorMsg('An unexpected error occurred. Please contact us via phone or WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead 
        title="Contact & Store Location"
        description={`Visit ${brandName} store in Kiribathgoda, Sri Lanka or send an inquiry. Direct phone, WhatsApp quote support, and store opening hours.`}
        settings={settings}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wide mb-4">
            <Phone className="w-3.5 h-3.5" />
            <span>Get in Touch With Our Counter Staff</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-gray-900 dark:text-white mb-4">
            Contact {brandName}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Have a question about material availability, bulk delivery schedules, or pricing? Call us, chat on WhatsApp, or send a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: Contact Info & Quick Actions (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Action Cards */}
            <div className="bg-white dark:bg-charcoal-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-soft space-y-6">
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
                Direct Store Contact
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 text-primary-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Store Address</h4>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 text-primary-500 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Call Direct</h4>
                    <a href={`tel:${phone}`} className="text-sm font-semibold text-gray-900 dark:text-white hover:text-primary-500 block mt-0.5">{phone}</a>
                    {secondaryPhone && (
                      <a href={`tel:${secondaryPhone}`} className="text-xs text-gray-500 hover:text-primary-500 block">{secondaryPhone}</a>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">WhatsApp Instant</h4>
                    <a
                      href={`https://wa.me/${whatsapp}?text=Hello%20Nethmi%20Hardware!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-green-600 dark:text-green-400 hover:underline block mt-0.5"
                    >
                      +94 77 123 4567 (Chat Now)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 text-primary-500 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Email Inquiries</h4>
                    <a href={`mailto:${email}`} className="text-sm font-semibold text-gray-900 dark:text-white hover:text-primary-500 block mt-0.5">{email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 text-primary-500 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Opening Hours</h4>
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-0.5">{hours}</p>
                  </div>
                </div>
              </div>

              {/* Fast Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${phone}`}
                  className="py-2.5 px-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-primary-500 hover:text-white text-xs font-bold text-center text-gray-800 dark:text-gray-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Store</span>
                </a>
                <a
                  href={`https://wa.me/${whatsapp}?text=Hello%20Nethmi%20Hardware!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-green-600 hover:bg-green-700 text-xs font-bold text-center text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT: Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-charcoal-900 p-8 sm:p-10 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-soft">
              <h3 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-2">
                Send Us an Online Message
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6">
                Fill out the form below and our counter representative will respond via email or phone promptly.
              </p>

              {successMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-green-900 dark:text-green-200">Message Received</h4>
                    <p className="text-xs text-green-700 dark:text-green-300 mt-0.5">{successMsg}</p>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <p className="text-xs font-medium text-red-700 dark:text-red-300">{errorMsg}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Honeypot field (hidden from genuine users) */}
                <input
                  type="text"
                  name="_honeypot"
                  value={formData._honeypot}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex="-1"
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Ruwan Silva"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. 077 123 4567"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. ruwan@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                    Your Message / Inquiry *
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    required
                    placeholder="Please specify materials, required quantities, or tool questions..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm shadow-md shadow-primary-500/25 transition-all active:scale-98 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="animate-pulse">Sending Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry to {brandName}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* FULL EMBEDDED GOOGLE MAP */}
        <div className="mt-14 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-soft">
          <div className="bg-charcoal-900 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary-500" />
              <span className="text-xs font-bold uppercase tracking-wider">Store Location Map</span>
            </div>
            <a 
              href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-primary-400 hover:underline flex items-center gap-1"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="h-96 w-full">
            <iframe
              title="Nethmi Hardware Store Map Location"
              src={mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>
    </>
  );
}

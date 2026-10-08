import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Download, 
  Send, 
  Truck, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare,
  Sparkles 
} from 'lucide-react';
import { api } from '../services/api';
import { useEnquiry } from '../context/EnquiryContext';
import SEOHead from '../components/SEOHead';
import { siteConfig } from '../config/siteConfig';

const UNIT_OPTIONS = ['Pieces', 'Bags (50kg)', 'Meters', 'Feet', 'Liters', 'Kilograms (kg)', 'Boxes', 'Bundles', 'Rolls'];

export default function GetQuote({ settings }) {
  const brandName = siteConfig.brandName;
  const { items: enquiryItems, generateWhatsAppUrl } = useEnquiry();

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    delivery_needed: false,
    notes: '',
    _honeypot: ''
  });

  const [quoteRows, setQuoteRows] = useState([
    { item_name: '', quantity: 1, unit: 'Pieces' }
  ]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedQuoteId, setSubmittedQuoteId] = useState(null);

  const whatsapp = settings?.whatsapp || siteConfig.whatsapp;

  // Import items from Enquiry List
  const handleImportEnquiry = () => {
    if (enquiryItems.length === 0) return;
    const imported = enquiryItems.map(item => ({
      item_name: `${item.name} (${item.sku || 'SKU N/A'})`,
      quantity: item.quantity,
      unit: 'Pieces'
    }));
    setQuoteRows(imported);
  };

  const handleAddRow = () => {
    setQuoteRows(prev => [...prev, { item_name: '', quantity: 1, unit: 'Pieces' }]);
  };

  const handleRemoveRow = (index) => {
    if (quoteRows.length === 1) {
      setQuoteRows([{ item_name: '', quantity: 1, unit: 'Pieces' }]);
      return;
    }
    setQuoteRows(prev => prev.filter((_, i) => i !== index));
  };

  const handleRowChange = (index, field, value) => {
    setQuoteRows(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleCustomerChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomer(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccess(false);

    if (!customer.name.trim() || !customer.phone.trim()) {
      setErrorMsg('Please enter your Name and Contact Phone number.');
      return;
    }

    const validRows = quoteRows.filter(r => r.item_name && r.item_name.trim());
    if (validRows.length === 0) {
      setErrorMsg('Please list at least one hardware item or material in the table.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        delivery_needed: customer.delivery_needed ? 1 : 0,
        notes: customer.notes,
        items: validRows,
        _honeypot: customer._honeypot
      };

      const res = await api.submitQuote(payload);
      if (res.success) {
        setSuccess(true);
        setSubmittedQuoteId(res.quoteId);
      } else {
        setErrorMsg(res.message || 'Failed to submit quote request. Please try again.');
      }
    } catch (err) {
      console.error('Quote submit error:', err);
      setErrorMsg('An unexpected error occurred. Please try contacting us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  // WhatsApp formatted quote message
  const generateDirectQuoteWhatsAppUrl = () => {
    const validRows = quoteRows.filter(r => r.item_name && r.item_name.trim());
    let msg = `*Hello ${brandName} — Project Quote Request* 📋\n`;
    msg += `Name: *${customer.name || 'Customer'}*\n`;
    msg += `Phone: *${customer.phone || 'N/A'}*\n`;
    if (customer.delivery_needed) msg += `🚚 *Job-site Delivery Needed*\n`;
    if (customer.notes) msg += `Notes: ${customer.notes}\n`;
    msg += `\n*Requested Materials List:*\n`;

    validRows.forEach((r, idx) => {
      msg += `${idx + 1}. *${r.item_name}* — ${r.quantity} ${r.unit}\n`;
    });

    msg += `\nPlease prepare your best wholesale pricing and estimated delivery timeframe. Thank you!`;
    const cleanNumber = whatsapp.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      <SEOHead 
        title="Request a Project Quote (BOQ)"
        description="Submit your list of building materials and hardware items for a comprehensive project price quotation and contractor volume discounts."
        settings={settings}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wide mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>Bill of Quantities (BOQ) Estimator</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-gray-900 dark:text-white mb-4">
            Request a Free Project Quote
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Provide your required materials, quantities, and site delivery preferences to receive our best competitive contractor pricing.
          </p>
        </div>

        {/* Success Confirmation Card */}
        {success ? (
          <div className="bg-white dark:bg-charcoal-900 rounded-3xl border border-green-200 dark:border-green-800/80 p-8 sm:p-12 text-center shadow-xl space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/60 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-gray-900 dark:text-white mb-2">
                Quote Request Submitted Successfully!
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
                Thank you, <strong>{customer.name}</strong>. Our estimating team is calculating your wholesale pricing (Ref #{submittedQuoteId || 'NH-Q'}) and will contact you via <strong>{customer.phone}</strong>.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href={generateDirectQuoteWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm shadow-md flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Send Copy to WhatsApp for Faster Response</span>
              </a>

              <button
                onClick={() => {
                  setSuccess(false);
                  setQuoteRows([{ item_name: '', quantity: 1, unit: 'Pieces' }]);
                }}
                className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-800 dark:text-gray-200 font-bold text-sm"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Honeypot */}
            <input
              type="text"
              name="_honeypot"
              value={customer._honeypot}
              onChange={handleCustomerChange}
              className="hidden"
              tabIndex="-1"
              autoComplete="off"
            />

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <p className="text-xs font-medium text-red-700 dark:text-red-300">{errorMsg}</p>
              </div>
            )}

            {/* 1. Contact Information Card */}
            <div className="bg-white dark:bg-charcoal-900 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-soft space-y-4">
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
                1. Your Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Ruwan Silva"
                    value={customer.name}
                    onChange={handleCustomerChange}
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. 077 123 4567"
                    value={customer.phone}
                    onChange={handleCustomerChange}
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. ruwan@example.com"
                    value={customer.email}
                    onChange={handleCustomerChange}
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* 2. Materials Table Card */}
            <div className="bg-white dark:bg-charcoal-900 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-soft space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-3">
                <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white">
                  2. Required Materials & Hardware Items
                </h3>

                {enquiryItems.length > 0 && (
                  <button
                    type="button"
                    onClick={handleImportEnquiry}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-primary-600 dark:text-primary-400 hover:bg-red-500/20 text-xs font-bold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Import {enquiryItems.length} items from Enquiry List</span>
                  </button>
                )}
              </div>

              {/* Dynamic Rows */}
              <div className="space-y-3">
                {quoteRows.map((row, idx) => (
                  <div key={idx} className="flex items-center gap-2 sm:gap-3 bg-gray-50 dark:bg-gray-800/40 p-2.5 rounded-2xl border border-gray-200 dark:border-gray-700">
                    <span className="w-6 text-center text-xs font-bold text-gray-400">
                      {idx + 1}.
                    </span>

                    {/* Item Description */}
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tokyo Super Cement 50kg, S-Lon 1-inch pipe..."
                      value={row.item_name}
                      onChange={(e) => handleRowChange(idx, 'item_name', e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl text-xs bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />

                    {/* Quantity */}
                    <input
                      type="number"
                      min="1"
                      required
                      value={row.quantity}
                      onChange={(e) => handleRowChange(idx, 'quantity', Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 px-2 py-2 text-center rounded-xl text-xs bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                    />

                    {/* Unit Dropdown */}
                    <select
                      value={row.unit}
                      onChange={(e) => handleRowChange(idx, 'unit', e.target.value)}
                      className="w-32 px-2 py-2 rounded-xl text-xs bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium"
                    >
                      {UNIT_OPTIONS.map((u) => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>

                    {/* Delete Row */}
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(idx)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove Row"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddRow}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs font-bold text-gray-800 dark:text-gray-200 transition-colors mt-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Another Material / Item</span>
              </button>
            </div>

            {/* 3. Delivery & Notes Card */}
            <div className="bg-white dark:bg-charcoal-900 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-soft space-y-4">
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
                3. Logistics & Special Notes
              </h3>

              {/* Delivery Toggle */}
              <label className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="delivery_needed"
                  checked={customer.delivery_needed}
                  onChange={handleCustomerChange}
                  className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
                />
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary-500" />
                  <div>
                    <span className="text-xs font-bold text-gray-900 dark:text-white block">
                      Job-Site Delivery Required
                    </span>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400">
                      Check if you need lorry transport for heavy cement, sand, or steel to your site location.
                    </span>
                  </div>
                </div>
              </label>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                  Job Site Location / Special Instructions
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  placeholder="e.g. Delivery address in Kiribathgoda, unloading site accessibility, needed by Friday..."
                  value={customer.notes}
                  onChange={handleCustomerChange}
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <p className="text-xs text-gray-500 text-center sm:text-left">
                ⚡ We review and send formal written quotations within 1–2 working hours.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold text-sm shadow-xl shadow-primary-500/25 transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="animate-pulse">Processing Quote...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Quote Request</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </>
  );
}

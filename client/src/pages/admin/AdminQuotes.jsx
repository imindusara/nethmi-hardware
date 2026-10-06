import React, { useState, useEffect } from 'react';
import { FileText, Eye, Trash2, X, Phone, MessageSquare, Truck, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import SEOHead from '../../components/SEOHead';

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState(null);

  const loadQuotes = async () => {
    setLoading(true);
    try {
      const res = await api.adminGetQuotes();
      if (res.success) setQuotes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.adminUpdateQuoteStatus(id, newStatus);
      if (res.success) {
        setQuotes(prev => prev.map(q => q.id === id ? { ...q, status: newStatus } : q));
        if (selectedQuote && selectedQuote.id === id) {
          setSelectedQuote({ ...selectedQuote, status: newStatus });
        }
      }
    } catch (e) {
      alert('Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this quote record?')) {
      try {
        const res = await api.adminDeleteQuote(id);
        if (res.success) {
          setQuotes(prev => prev.filter(q => q.id !== id));
          if (selectedQuote && selectedQuote.id === id) setSelectedQuote(null);
        }
      } catch (e) {
        alert('Error deleting');
      }
    }
  };

  return (
    <>
      <SEOHead title="Project Quotes - Admin" />

      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-gray-900 dark:text-white">
            Contractor & Customer Quote Requests
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Review incoming bill of quantities, follow up on WhatsApp, and update job status
          </p>
        </div>

        {/* Quotes Table */}
        <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 dark:bg-charcoal-950 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-200 dark:border-gray-800">
                <tr>
                  <th className="py-3.5 px-4">Ref & Date</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Items Count</th>
                  <th className="py-3.5 px-4">Delivery</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {quotes.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-400">
                      No project quotes submitted yet.
                    </td>
                  </tr>
                ) : (
                  quotes.map((q) => (
                    <tr key={q.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                      <td className="py-3.5 px-4 font-mono font-bold text-gray-900 dark:text-white">
                        #Q-{q.id}
                        <span className="block font-normal text-[10px] text-gray-400">
                          {new Date(q.created_at).toLocaleDateString()}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-heading font-bold text-gray-900 dark:text-white block">
                          {q.name}
                        </span>
                        <span className="text-[11px] text-gray-500 block">{q.phone}</span>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        {Array.isArray(q.items) ? q.items.length : 0} items
                      </td>

                      <td className="py-3.5 px-4">
                        {q.delivery_needed ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950 px-2 py-0.5 rounded">
                            <Truck className="w-3 h-3" /> Yes
                          </span>
                        ) : (
                          <span className="text-[11px] text-gray-400">No (Pickup)</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={q.status}
                          onChange={(e) => handleStatusChange(q.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border-0 cursor-pointer ${
                            q.status === 'New' ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300' :
                            q.status === 'Contacted' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                            q.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300' :
                            'bg-gray-100 text-gray-700'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => setSelectedQuote(q)}
                          className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-500 hover:text-white transition-colors"
                          title="View Materials"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={`https://wa.me/${q.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(q.name)},%20this%20is%20Nethmi%20Hardware%20following%20up%20on%20your%20Quote%20Request%20#Q-${q.id}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 inline-block transition-colors"
                          title="WhatsApp Followup"
                        >
                          <MessageSquare className="w-3.5 h-3.5 fill-white" />
                        </a>
                        <button
                          onClick={() => handleDelete(q.id)}
                          className="p-1.5 rounded-lg bg-red-100 dark:bg-red-950 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Quote Detail Modal */}
        {selectedQuote && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-charcoal-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[90vh] overflow-y-auto space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white">
                    Quote Request #{selectedQuote.id}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Received on {new Date(selectedQuote.created_at).toLocaleString()}
                  </p>
                </div>
                <button onClick={() => setSelectedQuote(null)}><X className="w-5 h-5 text-gray-400" /></button>
              </div>

              {/* Customer Info */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-charcoal-950 border border-gray-100 dark:border-gray-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Customer Name:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{selectedQuote.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <a href={`tel:${selectedQuote.phone}`} className="font-bold text-primary-600">{selectedQuote.phone}</a>
                </div>
                {selectedQuote.email && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span className="text-gray-900 dark:text-white">{selectedQuote.email}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Needed:</span>
                  <span className="font-bold">{selectedQuote.delivery_needed ? '🚚 Yes (Site Delivery)' : 'No (Store Pickup)'}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Requested Materials List
                </h4>
                <div className="space-y-2">
                  {Array.isArray(selectedQuote.items) && selectedQuote.items.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-900 dark:text-white">
                        {idx + 1}. {item.item_name}
                      </span>
                      <span className="font-mono font-bold text-primary-600 dark:text-primary-400">
                        {item.quantity} {item.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedQuote.notes && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs">
                  <span className="font-bold text-amber-900 dark:text-amber-200 block mb-1">Customer Notes:</span>
                  <p className="text-amber-800 dark:text-amber-300 whitespace-pre-line">{selectedQuote.notes}</p>
                </div>
              )}

              {/* Footer */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <a
                  href={`https://wa.me/${selectedQuote.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedQuote.name)},%20we%20have%20reviewed%20your%20quote%20request%20#Q-${selectedQuote.id}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-green-600 text-white font-bold text-xs flex items-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp Customer</span>
                </a>

                <button
                  onClick={() => setSelectedQuote(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { MessageSquare, CheckCircle, Mail, Phone, Trash2, Check } from 'lucide-react';
import { api } from '../../services/api';
import SEOHead from '../../components/SEOHead';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const res = await api.adminGetMessages();
      if (res.success) setMessages(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleToggleRead = async (id, currentRead) => {
    try {
      const res = await api.adminToggleMessageRead(id, !currentRead);
      if (res.success) {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: currentRead ? 0 : 1 } : m));
      }
    } catch (e) {
      alert('Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        const res = await api.adminDeleteMessage(id);
        if (res.success) setMessages(prev => prev.filter(m => m.id !== id));
      } catch (e) {
        alert('Error deleting');
      }
    }
  };

  return (
    <>
      <SEOHead title="Customer Inquiries - Admin" />

      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-gray-900 dark:text-white">
            Customer Inquiries & Messages
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Incoming website contact inquiries with one-click WhatsApp/email reply
          </p>
        </div>

        <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-soft overflow-hidden">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {messages.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-xs">
                No customer inquiries received yet.
              </div>
            ) : (
              messages.map((m) => (
                <div key={m.id} className={`p-5 transition-colors ${!m.is_read ? 'bg-orange-50/40 dark:bg-orange-950/10' : ''}`}>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-sm text-gray-900 dark:text-white">
                          {m.name}
                        </span>
                        {!m.is_read ? (
                          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            New
                          </span>
                        ) : (
                          <span className="text-[10px] text-gray-400">Read</span>
                        )}
                        <span className="text-[11px] text-gray-400">• {new Date(m.created_at).toLocaleString()}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        {m.phone && <span>Phone: <strong className="text-gray-800 dark:text-gray-200">{m.phone}</strong></span>}
                        {m.email && <span>Email: <strong className="text-gray-800 dark:text-gray-200">{m.email}</strong></span>}
                      </div>

                      <p className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-line pt-2 leading-relaxed">
                        {m.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {m.phone && (
                        <a
                          href={`https://wa.me/${m.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(m.name)},%20thank%20you%20for%20contacting%20Nethmi%20Hardware.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-green-600 text-white text-xs font-bold flex items-center gap-1.5"
                        >
                          <Phone className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      )}

                      {m.email && (
                        <a
                          href={`mailto:${m.email}?subject=Nethmi%20Hardware%20Inquiry%20Response`}
                          className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-bold flex items-center gap-1.5"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Email</span>
                        </a>
                      )}

                      <button
                        onClick={() => handleToggleRead(m.id, Boolean(m.is_read))}
                        className="p-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200"
                        title={m.is_read ? 'Mark as Unread' : 'Mark as Read'}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(m.id)}
                        className="p-1.5 rounded-xl bg-red-100 dark:bg-red-950 text-red-600 hover:bg-red-600 hover:text-white"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </>
  );
}

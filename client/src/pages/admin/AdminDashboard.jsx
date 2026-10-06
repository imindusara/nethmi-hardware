import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Layers, 
  FileText, 
  MessageSquare, 
  AlertTriangle, 
  Sparkles, 
  Plus, 
  ArrowRight,
  Clock,
  Phone,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { api } from '../../services/api';
import SEOHead from '../../components/SEOHead';

export default function AdminDashboard({ onStatsUpdate }) {
  const [stats, setStats] = useState(null);
  const [recentQuotes, setRecentQuotes] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await api.adminGetStats();
        if (res.success) {
          setStats(res.stats);
          setRecentQuotes(res.recentQuotes || []);
          setRecentMessages(res.recentMessages || []);
          if (onStatsUpdate) onStatsUpdate(res.stats);
        }
      } catch (err) {
        console.error('Error loading admin stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="p-8 space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead title="Admin Dashboard" />

      <div className="p-6 sm:p-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading text-gray-900 dark:text-white">
              Store Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Overview of products, customer quote requests, and enquiries
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/products"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-white dark:bg-charcoal-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Total Products</span>
              <div className="w-9 h-9 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black font-heading text-gray-900 dark:text-white">
                {stats?.totalProducts || 0}
              </span>
              <Link to="/admin/products" className="text-xs text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                Manage
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-charcoal-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">New Quotes</span>
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black font-heading text-orange-600 dark:text-orange-400">
                {stats?.newQuotes || 0}
              </span>
              <Link to="/admin/quotes" className="text-xs text-orange-600 dark:text-orange-400 font-semibold hover:underline">
                Review Quotes
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-charcoal-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Unread Messages</span>
              <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black font-heading text-red-600 dark:text-red-400">
                {stats?.unreadMessages || 0}
              </span>
              <Link to="/admin/messages" className="text-xs text-red-600 dark:text-red-400 font-semibold hover:underline">
                Inbox
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-charcoal-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Out of Stock</span>
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black font-heading text-amber-600 dark:text-amber-400">
                {stats?.outOfStockCount || 0}
              </span>
              <Link to="/admin/products" className="text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline">
                View Alerts
              </Link>
            </div>
          </div>

        </div>

        {/* Two Col Split: Recent Quotes & Recent Messages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recent Quotes */}
          <div className="bg-white dark:bg-charcoal-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-soft">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary-500" />
                <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white">
                  Recent Quote Requests
                </h3>
              </div>
              <Link to="/admin/quotes" className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline">
                View All
              </Link>
            </div>

            {recentQuotes.length === 0 ? (
              <p className="text-xs text-gray-500 py-6 text-center">No quote requests submitted yet.</p>
            ) : (
              <div className="space-y-3">
                {recentQuotes.map((q) => (
                  <div key={q.id} className="p-3.5 rounded-2xl bg-gray-50 dark:bg-charcoal-950 border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-xs text-gray-900 dark:text-white">
                          {q.name}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          q.status === 'New' ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300' :
                          q.status === 'Contacted' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' :
                          'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                        }`}>
                          {q.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                        Phone: {q.phone} • {q.items?.length || 0} materials requested
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/${q.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(q.name)},%20regarding%20your%20quote%20request%20with%20Nethmi%20Hardware.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 rounded-lg bg-green-600 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm shrink-0"
                    >
                      <Phone className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Messages */}
          <div className="bg-white dark:bg-charcoal-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-soft">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary-500" />
                <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white">
                  Recent Messages
                </h3>
              </div>
              <Link to="/admin/messages" className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline">
                View All
              </Link>
            </div>

            {recentMessages.length === 0 ? (
              <p className="text-xs text-gray-500 py-6 text-center">No contact inquiries received yet.</p>
            ) : (
              <div className="space-y-3">
                {recentMessages.map((m) => (
                  <div key={m.id} className="p-3.5 rounded-2xl bg-gray-50 dark:bg-charcoal-950 border border-gray-100 dark:border-gray-800 flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-xs text-gray-900 dark:text-white">
                          {m.name}
                        </span>
                        {!m.is_read && (
                          <span className="w-2 h-2 rounded-full bg-red-500" title="Unread"></span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                        "{m.message}"
                      </p>
                      <span className="text-[10px] text-gray-400 mt-1 block">
                        {m.phone ? `Phone: ${m.phone}` : m.email}
                      </span>
                    </div>

                    {m.phone && (
                      <a
                        href={`https://wa.me/${m.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(m.name)},%20thank%20you%20for%20contacting%20Nethmi%20Hardware.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-lg bg-green-600 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm shrink-0"
                      >
                        <span>Reply</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </>
  );
}

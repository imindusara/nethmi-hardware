import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  FileText, 
  MessageSquare, 
  Image as ImageIcon, 
  Star, 
  Settings, 
  KeyRound, 
  LogOut, 
  Wrench, 
  ExternalLink 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminSidebar({ stats }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Products', path: '/admin/products', icon: Package, badge: stats?.totalProducts },
    { name: 'Categories', path: '/admin/categories', icon: Layers, badge: stats?.totalCategories },
    { name: 'Quotes', path: '/admin/quotes', icon: FileText, badge: stats?.newQuotes, badgeColor: 'bg-orange-500' },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare, badge: stats?.unreadMessages, badgeColor: 'bg-red-500' },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Testimonials', path: '/admin/testimonials', icon: Star },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings },
    { name: 'Change Password', path: '/admin/password', icon: KeyRound },
  ];

  return (
    <aside className="w-64 bg-charcoal-900 text-gray-300 flex flex-col shrink-0 min-h-screen border-r border-gray-800">
      
      {/* Brand Header */}
      <div className="p-5 border-b border-gray-800 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Nethmi Hardware"
            className="w-9 h-9 object-contain drop-shadow"
          />
          <div>
            <span className="font-heading font-black text-sm text-white tracking-wider block">
              NETHMI ADMIN
            </span>
            <span className="text-[10px] text-gray-400 block">Store Control Panel</span>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="px-5 py-3.5 bg-charcoal-950/60 border-b border-gray-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary-600/20 text-primary-400 flex items-center justify-center font-bold text-xs">
            {admin?.username ? admin.username[0].toUpperCase() : 'A'}
          </div>
          <span className="text-xs font-semibold text-white truncate max-w-[120px]">
            {admin?.username || 'Administrator'}
          </span>
        </div>
        <Link 
          to="/" 
          target="_blank" 
          title="View Live Storefront"
          className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-800"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-charcoal-800'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${
                  item.badgeColor || 'bg-gray-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout Footer */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

    </aside>
  );
}

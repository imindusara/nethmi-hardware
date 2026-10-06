import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { Wrench, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SEOHead from '../../components/SEOHead';

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(username, password);
    setLoading(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.message || 'Invalid username or password');
    }
  };

  return (
    <>
      <SEOHead title="Admin Login" description="Administrative management portal for Nethmi Hardware." />

      <div className="min-h-screen bg-charcoal-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-500 text-white flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-105 transition-transform">
              <Wrench className="w-6 h-6 -rotate-45" />
            </div>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
            Nethmi Hardware
          </h2>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">
            Store Management Portal
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10">
          <div className="bg-charcoal-900 py-8 px-6 sm:px-10 rounded-3xl border border-gray-800 shadow-2xl">
            
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-950/50 border border-red-800/80 text-red-300 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Admin Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-charcoal-950 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Username"
                  />
                  <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-charcoal-950 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter password (default: admin123)"
                  />
                  <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-charcoal-950/60 border border-gray-800 text-[11px] text-gray-400">
                <span className="font-semibold text-gray-300">Default Credentials:</span> <br/>
                Username: <code className="text-primary-400">admin</code> | Password: <code className="text-primary-400">admin123</code>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold text-sm shadow-lg shadow-primary-500/25 transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="animate-pulse">Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-800 text-center">
              <Link to="/" className="text-xs text-gray-400 hover:text-white transition-colors">
                ← Return to Public Storefront
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

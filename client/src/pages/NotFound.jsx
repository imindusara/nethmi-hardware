import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Home, Search } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { siteConfig } from '../config/siteConfig';

export default function NotFound() {
  return (
    <>
      <SEOHead title="404 - Page Not Found" description={`The page you are looking for does not exist on ${siteConfig.brandName}.`} />
      <div className="max-w-7xl mx-auto px-4 py-24 sm:py-32 flex flex-col items-center justify-center text-center">
        <img
          src="/logo.png"
          alt={`${siteConfig.brandName} Emblem`}
          className="w-24 h-24 object-contain mb-6 drop-shadow-xl animate-bounce"
        />
        <h1 className="text-6xl sm:text-8xl font-black font-heading text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-800 dark:text-gray-100 mb-3">
          Page Under Construction or Not Found
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mb-8">
          The requested hardware product or page might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-800 dark:text-gray-200 font-bold text-sm"
          >
            <Search className="w-4 h-4" />
            <span>Search Products</span>
          </Link>
        </div>
      </div>
    </>
  );
}

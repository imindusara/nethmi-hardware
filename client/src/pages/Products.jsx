import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  X, 
  SlidersHorizontal, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Percent,
  Grid2X2,
  Grid3X3,
  LayoutGrid,
  ChevronDown
} from 'lucide-react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import SEOHead from '../components/SEOHead';
import { siteConfig } from '../config/siteConfig';
import { fallbackCategories, fallbackProducts } from '../data/fallbackData';

export default function Products({ settings }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(fallbackProducts);
  const [categories, setCategories] = useState(fallbackCategories);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: fallbackProducts.length });
  const [loading, setLoading] = useState(false);
  
  // Grid Columns View (3, 4, 5 columns)
  const [gridCols, setGridCols] = useState(5);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filter states initialized from URL params
  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort') || 'newest';
  const stockParam = searchParams.get('stock') || '';
  const featuredParam = searchParams.get('featured') || '';
  const onOfferParam = searchParams.get('onOffer') || '';
  const pageParam = parseInt(searchParams.get('page')) || 1;

  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedSort, setSelectedSort] = useState(sortParam);
  const [selectedStock, setSelectedStock] = useState(stockParam);
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  useEffect(() => {
    async function fetchCategories() {
      const res = await api.getCategories();
      if (res.success) setCategories(res.data);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || '');
    setSelectedSort(searchParams.get('sort') || 'newest');
    setSelectedStock(searchParams.get('stock') || '');
  }, [searchParams]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const params = {
          page: pageParam,
          limit: 20, // 20 items per page for clean 5-column or 4-column rows
          category: selectedCategory,
          search: searchTerm,
          sort: selectedSort,
          stock: selectedStock,
          minPrice,
          maxPrice,
          featured: featuredParam,
          onOffer: onOfferParam
        };
        const res = await api.getProducts(params);
        if (res.success) {
          setProducts(res.data);
          setPagination(res.pagination);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedCategory, searchTerm, selectedSort, selectedStock, minPrice, maxPrice, pageParam, featuredParam, onOfferParam]);

  const updateFilters = (newParams) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        next.set(k, v);
      } else {
        next.delete(k);
      }
    });
    if (!newParams.page) {
      next.set('page', '1');
    }
    setSearchParams(next);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedSort('newest');
    setSelectedStock('');
    setMinPrice('');
    setMaxPrice('');
    setSearchParams({});
  };

  const currentCategoryName = categories.find(c => c.slug === selectedCategory)?.name || 'All Categories';
  const hasActiveFilters = Boolean(searchTerm || selectedCategory || selectedStock || minPrice || maxPrice || featuredParam || onOfferParam);

  const getGridClass = () => {
    if (gridCols === 5) return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5';
    if (gridCols === 4) return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4';
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
  };

  return (
    <>
      <SEOHead 
        title="Hardware Store Catalog" 
        description="Shop contractor-grade power tools, building materials, plumbing, electrical, and hardware accessories with Islandwide delivery."
        settings={settings}
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* 1. TOP BREADCRUMB & TOOLBAR (Matching Screenshot) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800 mb-6">
          
          {/* Breadcrumb (Home / Shop / Page X) */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-[#dc2626] dark:hover:text-amber-400">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-[#dc2626] dark:hover:text-amber-400 font-medium">Shop</Link>
            {selectedCategory && (
              <>
                <span>/</span>
                <span className="text-[#dc2626] dark:text-red-300 font-semibold">{currentCategoryName}</span>
              </>
            )}
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-bold">Page {pagination.page}</span>
          </nav>

          {/* Right Toolbar: View Density Switchers & Filters Button */}
          <div className="flex items-center gap-4">
            
            {/* Grid Density Switchers (3, 4, 5 columns) */}
            <div className="hidden md:flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
              <button
                onClick={() => setGridCols(3)}
                title="3 Columns View"
                className={`p-1.5 rounded-lg transition-colors ${gridCols === 3 ? 'bg-white dark:bg-charcoal-900 text-[#dc2626] dark:text-amber-400 shadow-xs' : 'text-gray-400 hover:text-gray-700'}`}
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                title="4 Columns View"
                className={`p-1.5 rounded-lg transition-colors ${gridCols === 4 ? 'bg-white dark:bg-charcoal-900 text-[#dc2626] dark:text-amber-400 shadow-xs' : 'text-gray-400 hover:text-gray-700'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(5)}
                title="5 Columns View (Default)"
                className={`p-1.5 rounded-lg transition-colors ${gridCols === 5 ? 'bg-white dark:bg-charcoal-900 text-[#dc2626] dark:text-amber-400 shadow-xs' : 'text-gray-400 hover:text-gray-700'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Filters Toggle Button */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                filtersOpen || hasActiveFilters
                  ? 'bg-[#dc2626] text-white border-[#dc2626]'
                  : 'bg-white dark:bg-charcoal-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 text-xs">
              <select
                value={selectedSort}
                onChange={(e) => {
                  setSelectedSort(e.target.value);
                  updateFilters({ sort: e.target.value });
                }}
                className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-charcoal-900 text-gray-800 dark:text-gray-200 text-xs font-semibold focus:outline-none"
              >
                <option value="newest">Sort by: Newest</option>
                <option value="price-low">Sort by: Price (Low to High)</option>
                <option value="price-high">Sort by: Price (High to Low)</option>
                <option value="name-asc">Sort by: Name (A-Z)</option>
              </select>
            </div>

          </div>

        </div>

        {/* 2. EXPANDABLE FILTER BAR */}
        {filtersOpen && (
          <div className="mb-8 p-5 bg-white dark:bg-charcoal-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm animate-fade-in space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Filter Products
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-red-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              {/* Category */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-gray-500 mb-1.5">Department</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    updateFilters({ category: e.target.value });
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-medium"
                >
                  <option value="">All Departments</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Availability */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-gray-500 mb-1.5">Stock Status</label>
                <select
                  value={selectedStock}
                  onChange={(e) => {
                    setSelectedStock(e.target.value);
                    updateFilters({ stock: e.target.value });
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-medium"
                >
                  <option value="">All Stock</option>
                  <option value="in_stock">In Stock Only</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>

              {/* Price Min / Max */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-gray-500 mb-1.5">Price Range (Rs.)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center"
                  />
                </div>
              </div>

              {/* Apply Button */}
              <div className="flex items-end">
                <button
                  onClick={() => updateFilters({ minPrice, maxPrice })}
                  className="w-full py-2 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold transition-colors"
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. PRODUCT CATALOG GRID */}
        {loading ? (
          <div className={`grid ${getGridClass()} gap-4 sm:gap-5`}>
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-charcoal-900 rounded-2xl border-2 border-gray-100 dark:border-gray-800 p-3 animate-pulse space-y-3">
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl"></div>
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/2"></div>
                <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white dark:bg-charcoal-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center shadow-xs">
            <Search className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-1">
              No products found
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Try adjusting your search keywords or resetting active filters.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-5 py-2 rounded-xl bg-[#dc2626] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className={`grid ${getGridClass()} gap-4 sm:gap-5`}>
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                whatsappNumber={settings?.whatsapp || siteConfig.whatsapp}
              />
            ))}
          </div>
        )}

        {/* 4. PAGINATION */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-10 pb-6">
            <button
              disabled={pagination.page <= 1}
              onClick={() => updateFilters({ page: pagination.page - 1 })}
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-charcoal-900 text-gray-700 dark:text-gray-300 disabled:opacity-30 hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {[...Array(pagination.totalPages)].map((_, i) => {
              const pNum = i + 1;
              return (
                <button
                  key={pNum}
                  onClick={() => updateFilters({ page: pNum })}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                    pagination.page === pNum
                      ? 'bg-[#dc2626] text-white shadow-sm'
                      : 'bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pNum}
                </button>
              );
            })}

            <button
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => updateFilters({ page: pagination.page + 1 })}
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-charcoal-900 text-gray-700 dark:text-gray-300 disabled:opacity-30 hover:bg-gray-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </>
  );
}

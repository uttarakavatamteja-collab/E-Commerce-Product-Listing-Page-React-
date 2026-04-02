import React, { useState, useMemo } from 'react';
import useProducts from './hooks/useProducts';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Requirement: Buttons for categories
  const categories = useMemo(() => [
    'All',
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing"
  ], []);

  // Requirement 3: Use the custom hook
  const { filteredProducts, loading, error, refetch } = useProducts(selectedCategory, searchQuery);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="min-h-screen w-full py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-16 text-center animate-in fade-in slide-in-from-top-10 duration-1000">
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-indigo-500 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
            KALKI LUXE
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium tracking-wide max-w-2xl mx-auto">
            Experience premium curated collections with modern e-commerce excellence.
          </p>
        </header>

        {/* Controls Section (Category Filters + Search) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 glass p-8 rounded-[40px] shadow-2xl border border-white/5 animate-in fade-in slide-in-from-left-10 duration-1000 delay-200">
          
          {/* Category Filter Group */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-2xl text-sm font-bold capitalize transition-all duration-300 border ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30'
                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Real-time Search Bar */}
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by product title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all focus:bg-white/10"
            />
          </div>
        </div>

        {/* Products Responsive Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetails={setSelectedProduct} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 glass rounded-[40px] animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No items found</h3>
            <p className="text-slate-500 text-lg">Try a different search term or category.</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-white/5 text-center text-slate-600 text-sm">
          <p>© 2026 KALKI LUXE. A Performance Assessment for Uttarakavatam Teja.</p>
        </footer>

        {/* Product Modal (Requirements: Large img, Details, Description, ESC, Click outside) */}
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default App;

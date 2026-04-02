import React, { useState, useMemo } from 'react';
import useProducts from './hooks/useProducts';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import Hero from './components/Hero';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = useMemo(() => [
    'All',
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing"
  ], []);

  const { filteredProducts, loading, error, refetch, isDemoMode } = useProducts(selectedCategory, searchQuery);

  if (loading) return <LoadingSpinner />;
  
  // Only show error screen if we have no fallback products
  if (error && filteredProducts.length === 0) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="min-h-screen w-full py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-x-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Fallback Banner for API Outage Awareness */}
        {isDemoMode && (
          <div className="mb-12 flex items-center justify-between gap-4 p-5 bg-amber-500/10 border border-amber-500/20 rounded-[32px] animate-in slide-in-from-top-4 duration-500 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-amber-500 font-black text-sm uppercase tracking-wider">Demo Mode Active</h4>
                <p className="text-amber-500/70 text-xs font-bold leading-tight">External API (fakestoreapi.com) is currently unreachable. Using premium local samples.</p>
              </div>
            </div>
            <button 
              onClick={refetch}
              className="px-6 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 rounded-2xl text-xs font-black transition-all active:scale-95 border border-amber-500/20 whitespace-nowrap"
            >
              RETRY LIVE API
            </button>
          </div>
        )}

        {/* Hero Section */}
        <Hero />

        {/* Header Section (Minimalist) */}
        <header className="mb-16 flex flex-col items-center text-center">
            <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-[0.2em]">Curated Collection</h2>
            <div className="w-24 h-1 bg-indigo-500 rounded-full mb-8"></div>
        </header>

        {/* Controls Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 glass p-8 rounded-[40px] shadow-2xl border border-white/5 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
          
          <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-4 rounded-2xl text-sm font-black capitalize transition-all duration-300 border ${
                  selectedCategory.toLowerCase() === category.toLowerCase()
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-xl shadow-indigo-600/40 scale-105'
                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white hover:border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full max-w-md group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500 group-focus-within:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-8 py-5 bg-white/5 border border-white/5 rounded-3xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 transition-all font-medium text-lg"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetails={setSelectedProduct} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 glass rounded-[50px] border border-white/5 animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-black text-white mb-3">Product Not Found</h3>
            <p className="text-slate-500 text-xl font-medium">Try refining your search or changing categories.</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-40 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 py-12 border-t border-white/5 px-12 glass rounded-[40px]">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black text-white mb-2 tracking-tighter">KALKI LUXE</h3>
            <p className="text-slate-500 font-medium">Elevating the digital shopping experience.</p>
          </div>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Support'].map(link => (
              <a key={link} href="#" className="text-slate-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">{link}</a>
            ))}
          </div>
          <p className="text-slate-600 font-bold text-sm">© 2026 THE ANTIGRAVITY STUDIO</p>
        </footer>

        {/* Modal */}
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

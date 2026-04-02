import React, { useEffect, useRef } from 'react';

const ProductModal = ({ product, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    // Focus trap and ESC key closure
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!product) return null;

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const { title, price, description, category, image, rating } = product;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="glass relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-white/10 flex flex-col md:flex-row animate-in slide-in-from-bottom-10 duration-500"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-slate-900/50 hover:bg-red-500/80 text-white transition-all active:scale-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Product Image Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex items-center justify-center bg-white/5 min-h-[300px]">
          <img 
            src={image} 
            alt={title} 
            className="max-h-[300px] md:max-h-[450px] w-auto object-contain drop-shadow-2xl" 
          />
        </div>

        {/* Product Info Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest border border-indigo-500/30">
              {category}
            </span>
            <div className="flex items-center text-yellow-500 text-sm font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {rating?.rate} ({rating?.count} reviews)
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
            {title}
          </h2>

          <div className="flex items-center mb-8">
            <span className="text-4xl font-black text-indigo-400">
              ${price.toFixed(2)}
            </span>
          </div>

          <div className="space-y-4 mb-10 overflow-y-auto pr-2 custom-scrollbar">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Description</h4>
            <p className="text-lg text-slate-300 leading-relaxed">
              {description}
            </p>
          </div>

          <button className="mt-auto w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-3 group">
            Add To Cart
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

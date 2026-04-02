import React from 'react';

const ProductCard = ({ product, onViewDetails }) => {
  const { title, price, image, category } = product;
  
  // Truncate title for grid consistency
  const truncatedTitle = title.length > 50 ? title.substring(0, 47) + "..." : title;

  return (
    <div className="glass-card flex flex-col p-5 rounded-3xl h-full shadow-lg group">
      <div className="relative aspect-square mb-6 overflow-hidden bg-white/10 rounded-2xl flex items-center justify-center p-4">
        <img 
          src={image} 
          alt={title} 
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute top-4 right-4 bg-indigo-500/90 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full backdrop-blur-md">
          {category}
        </div>
      </div>
      
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-100 mb-2 leading-tight min-h-[56px]">
          {truncatedTitle}
        </h3>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <span className="text-2xl font-black text-white glow-text">
            ${price.toFixed(2)}
          </span>
          <button 
            onClick={() => onViewDetails(product)}
            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 hover:bg-indigo-600 transition-all active:scale-90 border border-white/10 group-hover:border-indigo-500/50"
            title="View Details"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-slate-800 rounded-full opacity-30"></div>
        <div className="absolute inset-2 border-4 border-b-blue-400 border-t-transparent border-l-transparent border-r-transparent rounded-full animate-spin-slow"></div>
      </div>
      <p className="mt-6 text-slate-400 font-medium tracking-widest animate-pulse">
        LOADING PRODUCTS...
      </p>
    </div>
  );
};

export default LoadingSpinner;

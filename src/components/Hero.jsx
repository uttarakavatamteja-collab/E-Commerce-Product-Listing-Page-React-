import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full h-[600px] mb-20 rounded-[50px] overflow-hidden group shadow-2xl">
      {/* Background Image with Parallax-like effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80')` 
        }}
      />
      
      {/* Overlay - Gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-12 md:px-24 max-w-4xl animate-in fade-in slide-in-from-left-10 duration-1000">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 backdrop-blur-md rounded-full border border-indigo-500/30 mb-8 w-fit">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="text-indigo-400 text-xs font-black tracking-widest uppercase">New Spring Collection 2026</span>
        </div>

        <h2 className="text-6xl md:text-8xl font-black text-white leading-[1.1] mb-6 tracking-tight">
          REDEFINE <br />
          <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent italic">YOUR STYLE</span>
        </h2>
        
        <p className="text-slate-300 text-lg md:text-xl font-medium max-w-xl mb-10 leading-relaxed opacity-90">
          Discover a curated world of high-end fashion and cutting-edge technology. Hand-picked for the modern individual who demands excellence.
        </p>

        <div className="flex flex-wrap gap-5">
          <button className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-600/30 active:scale-95 group">
            Explore Now
            <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
          </button>
          <button className="px-10 py-5 glass hover:bg-white/10 text-white font-black rounded-2xl transition-all border border-white/10 active:scale-95">
            View Lookbook
          </button>
        </div>
      </div>

      {/* Stats/Floating elements for Premium feel */}
      <div className="absolute bottom-12 right-12 hidden lg:flex flex-col gap-4">
        {[
          { label: 'Curated Items', value: '1.2k+' },
          { label: 'Happy Clients', value: '15k' }
        ].map((stat, i) => (
          <div key={i} className="glass border border-white/10 p-6 rounded-3xl backdrop-blur-xl animate-in slide-in-from-right-10 duration-700" style={{ transitionDelay: `${i * 200}ms` }}>
            <div className="text-3xl font-black text-white">{stat.value}</div>
            <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;

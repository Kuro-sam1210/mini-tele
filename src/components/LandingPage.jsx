import React from 'react';

const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-yellow-500/30 overflow-x-hidden">
      {/* Cinematic Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-amber-500/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Luxury Header */}
      <nav className="relative z-10 px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-amber-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <span className="text-xl">🎰</span>
          </div>
          <span className="text-2xl font-black italic tracking-tighter uppercase">Royale</span>
        </div>
        <button 
          onClick={() => onNavigate('login')}
          className="text-xs font-black uppercase tracking-widest px-5 py-2 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all"
        >
          Login
        </button>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 px-6 pt-12 pb-24 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-md">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">
            ✨ Next Generation Gaming
          </span>
        </div>
        
        <h1 className="text-5xl font-black tracking-tighter leading-[0.9] mb-6 uppercase">
          Elevate Your <br />
          <span className="bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            Fortune
          </span>
        </h1>
        
        <p className="max-w-xs mx-auto text-gray-400 text-sm font-medium leading-relaxed mb-10">
          The world's most immersive PG Soft experience, integrated directly into your Telegram.
        </p>

        {/* Primary CTA Area */}
        <div className="flex flex-col gap-4 max-w-sm mx-auto mb-20">
          <button 
            onClick={() => onNavigate('login')}
            className="group relative bg-white text-black font-black uppercase tracking-widest py-5 rounded-2xl overflow-hidden transition-transform active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10">🚀 Enter the Arena</span>
          </button>
          
          <button 
            onClick={() => onNavigate('games')}
            className="bg-[#1a1a24]/50 backdrop-blur-md border border-white/5 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:border-white/20 transition-all"
          >
            Explore Catalog
          </button>
        </div>

        {/* Features: The "Royale" Standards */}
        <div className="grid grid-cols-1 gap-4 mb-20">
          {[
            { icon: '⚡', title: 'Instant Play', desc: 'No downloads, no lag' },
            { icon: '💎', title: 'VIP Rewards', desc: 'Tier-based commission system' },
            { icon: '🛡️', title: 'Secure', desc: 'End-to-end encryption' }
          ].map((feat, i) => (
            <div key={i} className="flex items-center gap-4 bg-gradient-to-r from-[#12121a] to-transparent p-4 rounded-2xl border-l-2 border-amber-500/50">
              <div className="text-2xl">{feat.icon}</div>
              <div className="text-left">
                <h4 className="font-bold text-sm uppercase tracking-tight">{feat.title}</h4>
                <p className="text-xs text-gray-500">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Infinite Game Slider Preview */}
        <div className="relative">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8">
            Featured Titles
          </h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x">
            {['Fortune Tiger', 'Sweet Bonanza', 'Mahjong Ways', 'Wild Bounty'].map((game, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-40 aspect-[3/4] bg-[#1a1a24] rounded-3xl p-6 border border-white/5 flex flex-col justify-end items-start group hover:border-amber-500/50 transition-all snap-center"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎰</div>
                <p className="text-xs font-black uppercase tracking-tighter leading-tight text-left">
                  {game}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-12 text-center bg-black/40 border-t border-white/5">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-600 mb-4">
          Royale • Official Partner
        </p>
        <div className="flex justify-center gap-6 opacity-40">
          <span className="text-xs font-black italic">PG SOFT</span>
          <span className="text-xs font-black italic">EGT</span>
          <span className="text-xs font-black italic">PRAGMATIC</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const GameWebView = ({ user, onNavigate, gameData }) => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [showWinAnimation, setShowWinAnimation] = useState(false);
  const [winAmount, setWinAmount] = useState(0);

  const gameName = gameData?.game || 'Fortune Tiger';

  // Simulate game loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Simulate random wins
  useEffect(() => {
    if (!isLoading) {
      const winTimer = setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance of win
          const amount = Math.floor(Math.random() * 5000) + 100;
          setWinAmount(amount);
          setShowWinAnimation(true);
          
          setTimeout(() => {
            setShowWinAnimation(false);
          }, 3000);
        }
      }, 8000);

      return () => clearInterval(winTimer);
    }
  }, [isLoading]);

  const gameSlots = [
    { name: 'Fortune Tiger', image: '🐅' },
    { name: 'Lucky Neko', image: '🐱' },
    { name: 'Shining Crown', image: '👑' },
    { name: '40 Super Hot', image: '🔥' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 selection:bg-amber-500/30">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('games')}
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 active:scale-90 transition-transform"
            >
              ←
            </button>
            <h1 className="text-xl font-black uppercase tracking-tighter italic">{gameName}</h1>
          </div>
          
          <div className="bg-[#1a1a24] rounded-2xl px-4 py-2 border border-white/10 flex items-center gap-2">
            <span className="text-amber-500 text-xs font-black tracking-widest">$</span>
            <span className="text-sm font-black tabular-nums">{user?.balance?.toLocaleString() || '2,368.50'}</span>
          </div>
        </div>
      </header>

      {/* Game Area */}
      <main className="relative flex-1 p-4">
        {isLoading ? (
          // Premium Loading Screen
          <div className="h-96 bg-gradient-to-br from-[#12121a] to-[#1a1a24] rounded-3xl border border-white/5 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-white text-lg font-bold">Loading {gameName}...</p>
              <p className="text-gray-400 text-sm mt-2">Preparing your gaming experience</p>
            </div>
          </div>
        ) : (
          // Premium Game Interface
          <div className="h-96 bg-gradient-to-br from-orange-600 via-red-600 to-rose-700 rounded-3xl relative overflow-hidden shadow-2xl">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            
            {/* Game Content */}
            <div className="relative z-10 p-6 h-full flex flex-col justify-between">
              <div className="text-center">
                <h2 className="text-3xl font-black text-white mb-6 tracking-tight">{gameName}</h2>
                
                {/* Modern Slot Reels */}
                <div className="grid grid-cols-5 gap-2 mb-8">
                  {[...Array(15)].map((_, index) => (
                    <div 
                      key={index}
                      className="aspect-square bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-2xl shadow-inner"
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                        animation: 'pulse 2s infinite'
                      }}
                    >
                      🍒
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Game Controls */}
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <p className="text-xs text-white/60 font-bold uppercase tracking-widest">Bet</p>
                    <p className="text-white font-black text-lg">$1.00</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-white/60 font-bold uppercase tracking-widest">Win</p>
                    <p className="text-amber-400 font-black text-lg">$0.00</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-white/60 font-bold uppercase tracking-widest">Balance</p>
                    <p className="text-white font-black text-lg">${user?.balance?.toLocaleString() || '2,368.50'}</p>
                  </div>
                </div>
                
                <button className="w-full bg-white hover:bg-amber-400 text-black font-black py-4 rounded-2xl text-lg uppercase tracking-widest transition-all active:scale-95 shadow-lg">
                  SPIN
                </button>
              </div>
            </div>

            {/* Win Animation */}
            {showWinAnimation && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-3xl">
                <div className="text-center animate-bounce">
                  <h1 className="text-6xl font-black text-amber-400 mb-4 tracking-tight">{t('megaWin')}</h1>
                  <p className="text-4xl font-black text-white">${winAmount.toLocaleString()}</p>
                  <div className="text-6xl mt-4">🎉💰🎉</div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Game Selection */}
      <section className="px-4 pb-6">
        <h3 className="text-center text-sm font-black uppercase tracking-[0.3em] text-white/40 mb-6 flex items-center justify-center gap-3">
          <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/20"></span>
          Other Games
          <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/20"></span>
        </h3>
        
        <div className="grid grid-cols-4 gap-3">
          {gameSlots.map((game, index) => (
            <button
              key={index}
              onClick={() => onNavigate('gameView', { game: game.name })}
              className={`bg-[#1a1a24] border rounded-2xl p-3 text-center hover:border-amber-500/50 transition-all active:scale-95 ${
                game.name === gameName ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'border-white/5'
              }`}
            >
              <div className="text-2xl mb-2">{game.image}</div>
              <p className="text-white text-xs font-bold">{game.name}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 z-50">
        <div className="bg-[#12121a]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-2 flex justify-around items-center shadow-2xl">
          {[
            { id: 'home', icon: '🏠', label: t('home') },
            { id: 'games', icon: '🎮', label: t('games'), active: true },
            { id: 'wallet', icon: '💰', label: t('wallet') },
            { id: 'profile', icon: '👤', label: t('profile') }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                item.active ? 'bg-amber-500 text-black' : 'text-gray-500 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default GameWebView;
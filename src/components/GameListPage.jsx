import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const GameListPage = ({ user, onNavigate }) => {
  const { t } = useLanguage();
  const [activeProvider, setActiveProvider] = useState('PG');
  const [activeFilter, setActiveFilter] = useState('highWins');

  const games = {
    PG: [
      { name: t('fortuneTiger'), image: '🐅', category: 'highWins', players: '2.1k', hot: true, new: false, buyFree: true },
      { name: t('wildBountyShowdown'), image: '🤠', category: 'highWins', players: '1.8k', hot: false, new: true, buyFree: false },
      { name: t('mahjongWays'), image: '🀄', category: 'newGames', players: '1.5k', hot: true, new: false, buyFree: true },
      { name: 'Sweet Bonanza', image: '🍭', category: 'buyFree', players: '980', hot: true, new: false, buyFree: true },
    ],
    EGT: [
      { name: 'Burning Hot', image: '🔥', category: 'highWins', players: '750', hot: true, new: false, buyFree: false },
      { name: 'Shining Crown', image: '👑', category: 'favorites', players: '650', hot: false, new: false, buyFree: false },
    ]
  };

  const filters = [
    { id: 'highWins', name: t('highWins'), icon: '🔥' },
    { id: 'newGames', name: t('newGames'), icon: '✨' },
    { id: 'buyFree', name: t('buyFree'), icon: '💰' },
    { id: 'favorites', name: t('favorites'), icon: '⭐' }
  ];

  const getFilteredGames = () => {
    const providerGames = games[activeProvider] || [];
    return providerGames.filter(game => {
      if (activeFilter === 'highWins') return game.hot;
      if (activeFilter === 'newGames') return game.new;
      if (activeFilter === 'buyFree') return game.buyFree;
      if (activeFilter === 'favorites') return game.category === 'favorites';
      return true;
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white pb-32 selection:bg-amber-500/30">
      {/* Cinematic Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('home')}
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 active:scale-90 transition-transform"
            >
              ←
            </button>
            <h1 className="text-xl font-black uppercase tracking-tighter italic">{t('gameList')}</h1>
          </div>
          
          <div className="bg-[#1a1a24] rounded-2xl px-4 py-2 border border-white/10 flex items-center gap-2">
            <span className="text-amber-500 text-xs font-black tracking-widest">$</span>
            <span className="text-sm font-black tabular-nums">{user?.balance?.toLocaleString() || '2,368.50'}</span>
          </div>
        </div>
      </header>

      {/* Provider Switcher - Premium Toggle Style */}
      <section className="px-4 py-6">
        <div className="bg-[#12121a] p-1.5 rounded-2xl flex border border-white/5">
          {['PG', 'EGT'].map((provider) => (
            <button
              key={provider}
              onClick={() => setActiveProvider(provider)}
              className={`flex-1 py-3 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 ${
                activeProvider === provider 
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {provider} Slots
            </button>
          ))}
        </div>
      </section>

      {/* Modern Filter Pill Slider */}
      <section className="px-4 pb-6 overflow-x-auto no-scrollbar">
        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center px-5 py-2.5 rounded-full whitespace-nowrap transition-all border ${
                activeFilter === filter.id
                  ? 'bg-amber-500/10 border-amber-500 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                  : 'bg-[#12121a] border-white/5 text-gray-500'
              }`}
            >
              <span className="mr-2 text-sm">{filter.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-widest">{filter.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Game Grid - List with Depth */}
      <main className="px-4 space-y-4">
        {getFilteredGames().map((game, index) => (
          <div
            key={index}
            onClick={() => onNavigate('gameView', { game: game.name })}
            className="group relative bg-[#12121a] border border-white/5 rounded-[2rem] p-4 flex items-center justify-between hover:border-amber-500/30 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              {/* Game Avatar with Inner Glow */}
              <div className="relative w-16 h-16 bg-gradient-to-br from-[#1a1a24] to-black rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                {game.image}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-black uppercase tracking-tighter text-sm">{game.name}</h3>
                  {game.hot && <span className="text-[8px] font-black bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full border border-red-500/20">HOT</span>}
                  {game.new && <span className="text-[8px] font-black bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full border border-blue-500/20">NEW</span>}
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                  <span>👥 {game.players}</span>
                  {game.buyFree && <span className="text-amber-500/80">⚡ Buy Free</span>}
                </div>
              </div>
            </div>

            <button className="bg-white/5 hover:bg-white text-white hover:text-black w-12 h-12 rounded-2xl flex items-center justify-center transition-all border border-white/10 group-hover:border-white/40">
              ▶
            </button>
          </div>
        ))}
      </main>

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

export default GameListPage;
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage = ({ user, onNavigate }) => {
  const { t } = useLanguage();

  const gameCategories = [
    {
      id: 'pg-high-wins',
      title: t('highWins'),
      subtitle: 'PG SOFT',
      bgColor: 'from-orange-500 via-red-500 to-rose-600',
      icon: '🎰',
      accent: 'text-orange-200'
    },
    {
      id: 'egt-steady-wins', 
      title: t('steadyWins'),
      subtitle: 'EGT INTERACTIVE',
      bgColor: 'from-emerald-500 via-green-600 to-teal-700',
      icon: '💎',
      accent: 'text-green-200'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 font-sans selection:bg-blue-500">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-[#12121a]/80 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center">
            <span className="text-xl">💎</span>
          </div>
          <div>
            <h1 className="text-xs uppercase tracking-widest text-gray-400 font-bold leading-none">Club</h1>
            <p className="text-lg font-black italic tracking-tighter leading-none text-white">ROYALE</p>
          </div>
        </div>

        <div className="flex items-center bg-black/40 border border-white/10 rounded-2xl pl-2 pr-1 py-1 shadow-inner">
          <span className="text-yellow-400 text-xs mr-2 font-bold">LIVE</span>
          <span className="bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent font-black tracking-tight mr-2">
            ${user?.balance?.toLocaleString() || '2,368.50'}
          </span>
          <button className="bg-blue-600 hover:bg-blue-500 p-1.5 rounded-xl transition-all active:scale-95">
            <span className="text-xs">➕</span>
          </button>
        </div>
      </header>

      <main className="p-4 pb-24 space-y-8">
        
        {/* Featured Banner/Categories */}
        <section className="grid grid-cols-1 gap-4">
          {gameCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => onNavigate('games')}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-r ${category.bgColor} p-6 shadow-2xl transition-all hover:-translate-y-1 active:scale-95`}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 opacity-20 text-9xl">
                {category.icon}
              </div>
              
              <div className="relative z-10">
                <span className={`text-xs font-black tracking-widest uppercase ${category.accent} opacity-80`}>
                  {category.subtitle}
                </span>
                <h3 className="text-3xl font-black text-white mt-1 mb-4 leading-tight">
                  {category.title}
                </h3>
                <button className="bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-sm font-bold hover:bg-white/30 transition-colors">
                  Play Now →
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Provider Shortcuts */}
        <section>
          <div className="flex justify-between items-end mb-4 px-1">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">{t('providers')}</h2>
            <span className="text-xs text-blue-400 font-bold">View All</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {['PG SOFT', 'EGT'].map((provider) => (
              <button key={provider} className="flex items-center gap-3 bg-[#1a1a24] border border-white/5 p-3 rounded-2xl hover:bg-[#232330] transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${provider === 'PG SOFT' ? 'bg-orange-500' : 'bg-red-600'}`}>
                  {provider[0]}
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-400 font-medium">Provider</p>
                  <p className="text-sm font-bold">{provider}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Today's Picks - Modern Grid */}
        <section>
          <h2 className="text-center text-sm font-black uppercase tracking-[0.3em] text-white/40 mb-6 flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/20"></span>
            {t('todaysPicks')}
            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/20"></span>
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Fortune Tiger', img: '🐅', color: 'bg-orange-500/10' },
              { name: 'Lucky Neko', img: '🐱', color: 'bg-pink-500/10' },
              { name: 'Shining Crown', img: '👑', color: 'bg-yellow-500/10' },
              { name: '40 Super Hot', img: '🔥', color: 'bg-red-500/10' }
            ].map((game, i) => (
              <div 
                key={i}
                className="group relative bg-[#1a1a24] border border-white/5 rounded-3xl p-4 flex flex-col items-center justify-center transition-all hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
              >
                <div className={`w-20 h-20 ${game.color} rounded-2xl flex items-center justify-center text-4xl mb-3 shadow-inner`}>
                  {game.img}
                </div>
                <p className="text-sm font-bold text-gray-200">{game.name}</p>
                <div className="mt-2 flex gap-1">
                  <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse"></span>
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-tighter">Live Play</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modern Floating Bottom Nav */}
      <nav className="fixed bottom-4 left-4 right-4 bg-[#1a1a24]/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl z-50 overflow-hidden">
        <div className="flex justify-around items-center h-16">
          <NavItem active icon="🏠" label={t('home')} />
          <NavItem icon="🎮" label={t('games')} />
          <NavItem icon="👛" label={t('wallet')} />
          <NavItem icon="👤" label={t('profile')} />
        </div>
      </nav>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }) => (
  <button className={`flex flex-col items-center justify-center w-full h-full transition-all ${active ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}>
    <span className={`text-xl mb-0.5 ${active ? 'scale-110' : ''}`}>{icon}</span>
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    {active && <span className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]"></span>}
  </button>
);

export default HomePage;
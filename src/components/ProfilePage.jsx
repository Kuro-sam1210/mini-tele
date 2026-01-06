import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ProfilePage = ({ user, onNavigate, onLogout }) => {
  const { t, changeLanguage, currentLanguage, languages } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const profileStats = [
    { label: 'Total Bets', value: '1,247', icon: '🎰' },
    { label: 'Total Wins', value: '892', icon: '🏆' },
    { label: 'Win Rate', value: '71.5%', icon: '📊' },
    { label: 'Biggest Win', value: '$4,800', icon: '💰' }
  ];

  const menuItems = [
    { 
      id: 'language', 
      label: t('language'), 
      icon: '🌐', 
      action: () => setShowLanguageModal(true),
      value: languages.find(lang => lang.code === currentLanguage)?.name
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: '🔔', 
      action: () => {},
      value: 'Enabled'
    },
    { 
      id: 'security', 
      label: 'Security', 
      icon: '🔒', 
      action: () => {},
      value: '2FA Enabled'
    },
    { 
      id: 'support', 
      label: 'Customer Support', 
      icon: '💬', 
      action: () => {},
      value: '24/7 Available'
    },
    { 
      id: 'terms', 
      label: 'Terms & Conditions', 
      icon: '📋', 
      action: () => {},
      value: null
    },
    { 
      id: 'privacy', 
      label: 'Privacy Policy', 
      icon: '🛡️', 
      action: () => {},
      value: null
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 pb-32 selection:bg-amber-500/30">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-400 rounded-xl shadow-lg shadow-purple-500/20 flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <h1 className="text-xl font-black uppercase tracking-tighter italic">{t('myProfile')}</h1>
          </div>
          
          <div className="bg-[#1a1a24] rounded-2xl px-4 py-2 border border-white/10 flex items-center gap-2">
            <span className="text-amber-500 text-xs font-black tracking-widest">$</span>
            <span className="text-sm font-black tabular-nums">{user?.balance?.toLocaleString() || '2,368.50'}</span>
          </div>
        </div>
      </header>

      {/* Premium Profile Header */}
      <section className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 p-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <img 
              src={user?.avatar || 'https://via.placeholder.com/80'} 
              alt="Profile"
              className="w-20 h-20 rounded-2xl border-4 border-white/30 mr-4 shadow-lg"
            />
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">{user?.name || 'John Doe'}</h2>
              <p className="text-purple-200 font-medium">@{user?.username || 'johndoe'}</p>
              <p className="text-purple-200 text-sm font-mono">ID: {user?.id || '123456789'}</p>
            </div>
          </div>

          {/* VIP Status */}
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-black uppercase tracking-widest text-sm">VIP Level 3</span>
              <span className="text-amber-400 text-2xl">👑</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2 mb-2">
              <div className="bg-amber-400 h-2 rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
            </div>
            <p className="text-purple-200 text-sm font-medium">$1,200 more to VIP Level 4</p>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <main className="p-4 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {profileStats.map((stat, index) => (
            <div key={index} className="bg-[#1a1a24] border border-white/5 rounded-3xl p-4 text-center hover:border-amber-500/30 transition-all">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-3xl mb-3 mx-auto">
                {stat.icon}
              </div>
              <h3 className="text-white font-black text-xl tracking-tight">{stat.value}</h3>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Menu Items */}
        <div className="bg-[#12121a] border border-white/5 rounded-3xl overflow-hidden">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-all border-b border-white/5 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-xl">
                  {item.icon}
                </div>
                <span className="text-white font-bold">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.value && (
                  <span className="text-gray-400 text-sm font-medium">{item.value}</span>
                )}
                <span className="text-gray-400">→</span>
              </div>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center active:scale-95 shadow-lg"
        >
          <span className="mr-3 text-xl">🚪</span>
          <span className="uppercase tracking-widest">{t('logout')}</span>
        </button>
      </main>

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#12121a] border border-white/10 rounded-3xl w-full max-w-md max-h-96 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-white font-black text-lg uppercase tracking-tight">{t('language')}</h3>
              <button 
                onClick={() => setShowLanguageModal(false)}
                className="text-gray-400 hover:text-white w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center transition-all"
              >
                ✕
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => {
                    changeLanguage(language.code);
                    setShowLanguageModal(false);
                  }}
                  className={`w-full flex items-center justify-between p-4 hover:bg-white/5 transition-all border-b border-white/5 last:border-b-0 ${
                    currentLanguage === language.code ? 'bg-white/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{language.flag}</span>
                    <span className="text-white font-medium">{language.name}</span>
                  </div>
                  {currentLanguage === language.code && (
                    <span className="text-amber-400 font-black">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 z-50">
        <div className="bg-[#12121a]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-2 flex justify-around items-center shadow-2xl">
          {[
            { id: 'home', icon: '🏠', label: t('home') },
            { id: 'games', icon: '🎮', label: t('games') },
            { id: 'wallet', icon: '💰', label: t('wallet') },
            { id: 'profile', icon: '👤', label: t('profile'), active: true }
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

export default ProfilePage;
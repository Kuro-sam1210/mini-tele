import { useState } from 'react';
import { Globe, Bell, Shield, MessageCircle, ChevronRight, Crown, Trophy, Target, X, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Profile = ({ user, navigate }) => {
  const tg = window.Telegram?.WebApp;
  const { t, changeLanguage, currentLanguage, languages } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const stats = [
    { icon: Target, label: 'Bets', value: '1,247' },
    { icon: Trophy, label: 'Wins', value: '892' },
    { icon: Crown, label: 'Best', value: '$4,800' },
  ];

  const menuItems = [
    { 
      icon: Globe, 
      label: t('language'), 
      value: languages.find(l => l.code === currentLanguage)?.name,
      action: () => setShowLanguageModal(true)
    },
    { icon: Bell, label: 'Notifications', value: 'On' },
    { icon: Shield, label: 'Security', value: '2FA' },
    { icon: MessageCircle, label: 'Support', value: '24/7' },
  ];

  return (
    <div className="page">
      {/* Profile Header */}
      <div className="px-4 pt-4 pb-6">
        <div className="card p-6 bg-gradient-to-br from-purple-500/20 to-transparent">
          <div className="flex items-center gap-4 mb-4">
            <img 
              src={user?.avatar} 
              alt="Profile"
              className="w-16 h-16 rounded-2xl bg-[var(--tg-theme-secondary-bg-color)]"
            />
            <div>
              <h2 className="text-xl font-bold">{user?.name || 'Player'}</h2>
              <p className="text-sm text-[var(--tg-theme-hint-color)]">@{user?.username}</p>
            </div>
          </div>

          {/* VIP Progress */}
          <div className="bg-[var(--tg-theme-secondary-bg-color)] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-500" />
                <span className="font-semibold">VIP Level 3</span>
              </div>
              <span className="text-xs text-[var(--tg-theme-hint-color)]">65%</span>
            </div>
            <div className="h-2 bg-black/20 rounded-full overflow-hidden">
              <div className="h-full w-[65%] bg-amber-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <div key={i} className="card p-4 text-center">
              <stat.icon className="w-6 h-6 text-amber-500 mx-auto mb-2" />
              <p className="font-bold">{stat.value}</p>
              <p className="text-xs text-[var(--tg-theme-hint-color)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 pb-8">
        <div className="card divide-y divide-white/5">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                tg?.HapticFeedback?.selectionChanged();
                item.action?.();
              }}
              className="w-full p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--tg-theme-secondary-bg-color)] flex items-center justify-center">
                <item.icon className="w-5 h-5 text-[var(--tg-theme-hint-color)]" />
              </div>
              <span className="flex-1 text-left font-medium">{item.label}</span>
              {item.value && (
                <span className="text-sm text-[var(--tg-theme-hint-color)]">{item.value}</span>
              )}
              <ChevronRight className="w-5 h-5 text-[var(--tg-theme-hint-color)]" />
            </button>
          ))}
        </div>
      </div>

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="modal-overlay" onClick={() => setShowLanguageModal(false)}>
          <div className="modal max-h-[70vh]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{t('language')}</h3>
              <button 
                onClick={() => setShowLanguageModal(false)}
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1 overflow-y-auto">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    tg?.HapticFeedback?.selectionChanged();
                    changeLanguage(lang.code);
                    setShowLanguageModal(false);
                  }}
                  className={`w-full p-3 flex items-center gap-3 rounded-xl transition-colors ${
                    currentLanguage === lang.code 
                      ? 'bg-amber-500/10' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="flex-1 text-left">{lang.name}</span>
                  {currentLanguage === lang.code && (
                    <Check className="w-5 h-5 text-amber-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

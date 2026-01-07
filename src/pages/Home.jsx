import { useState, useEffect } from 'react';
import { ChevronRight, Flame, Star, Sparkles, Gift, X, Zap } from 'lucide-react';
import SpinWheel from '../components/SpinWheel';
import ScratchCard from '../components/ScratchCard';
import Confetti from '../components/Confetti';

const Home = ({ user, navigate }) => {
  const tg = window.Telegram?.WebApp;
  const [showWheel, setShowWheel] = useState(false);
  const [showScratch, setShowScratch] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTab, setActiveTab] = useState('pg');

  useEffect(() => {
    if (tg) {
      tg.setHeaderColor('#000000');
      tg.setBackgroundColor('#000000');
    }
  }, [tg]);

  const featuredGames = [
    { 
      id: 'premium-slots', 
      name: 'Premium Collection', 
      subtitle: 'Elite Gaming Experience', 
      gradient: 'from-black via-emerald-900 to-emerald-800',
      icon: '💎'
    },
    { 
      id: 'vip-games', 
      name: 'VIP Exclusives', 
      subtitle: 'Members Only Access', 
      gradient: 'from-emerald-900 via-emerald-800 to-emerald-700',
      icon: '👑'
    },
  ];

  const providers = [
    { id: 'premium', name: 'Premium Games', icon: '💎', desc: 'Elite Selection' },
    { id: 'classic', name: 'Classic Games', icon: '🎰', desc: 'Timeless Favorites' },
  ];

  const todaysPicks = [
    { id: 1, gradient: 'from-emerald-800 to-emerald-700' },
    { id: 2, gradient: 'from-emerald-700 to-emerald-600' },
    { id: 3, gradient: 'from-emerald-600 to-emerald-500' },
    { id: 4, gradient: 'from-emerald-500 to-emerald-400' },
    { id: 5, gradient: 'from-emerald-400 to-emerald-300' },
  ];

  const games = [
    { id: 'golden-fortune', name: 'Golden Fortune', provider: 'Premium', hot: true, thumb: 'from-yellow-600 to-yellow-700' },
    { id: 'emerald-riches', name: 'Emerald Riches', provider: 'Premium', hot: true, thumb: 'from-emerald-600 to-emerald-700' },
    { id: 'diamond-dynasty', name: 'Diamond Dynasty', provider: 'Elite', hot: false, thumb: 'from-blue-600 to-blue-700' },
    { id: 'royal-treasures', name: 'Royal Treasures', provider: 'VIP', hot: false, thumb: 'from-purple-600 to-purple-700' },
  ];

  const handleWheelComplete = () => {
    setShowConfetti(true);
    tg?.HapticFeedback?.notificationOccurred('success');
    setTimeout(() => setShowWheel(false), 2500);
  };

  const handleScratchComplete = () => {
    setShowConfetti(true);
    tg?.HapticFeedback?.notificationOccurred('success');
    setTimeout(() => setShowScratch(false), 2500);
  };

  return (
    <div className="page">
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Header */}
      <div className="header-bar">
        <div className="app-title">
          <div className="telegram-icon">
            <span className="text-white text-sm font-bold">✈</span>
          </div>
          <span className="font-semibold text-white">Golden Age Cash</span>
        </div>
        <div className="balance-chip">
          <div className="coin-icon">$</div>
          <span className="text-[var(--gold)]">{user?.balance?.toLocaleString() || '2,368.5'}</span>
          <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
        </div>
      </div>

      {/* Featured Games */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-4">
          {featuredGames.map((game) => (
            <button
              key={game.id}
              onClick={() => {
                tg?.HapticFeedback?.impactOccurred('medium');
                navigate('game', { game: game.name });
              }}
              className={`featured-card bg-gradient-to-br ${game.gradient}`}
            >
              <div className="featured-card-icon animate-float">
                {game.icon}
              </div>
              <div className="featured-card-content">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[var(--gold)] rounded-full animate-pulse"></span>
                </div>
                <div>
                  <div className="featured-card-title">{game.name}</div>
                  <div className="featured-card-subtitle">{game.subtitle}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Provider Tabs */}
      <div className="px-5 pb-5">
        <div className="grid grid-cols-2 gap-4">
          {providers.map((provider) => (
            <button
              key={provider.id}
              onClick={() => setActiveTab(provider.id)}
              className={`provider-card ${activeTab === provider.id ? 'active' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="provider-icon">
                  <span>{provider.icon}</span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-white text-sm">{provider.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{provider.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Section Divider */}
      <div className="px-5 pb-3">
        <div className="flex items-center gap-3">
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--border-light)] to-transparent flex-1"></div>
          <span className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">Today's Picks</span>
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--border-light)] to-transparent flex-1"></div>
        </div>
      </div>

      {/* Today's Picks */}
      <div className="picks-container">
        {todaysPicks.map((pick) => (
          <button
            key={pick.id}
            onClick={() => {
              tg?.HapticFeedback?.impactOccurred('light');
              navigate('game');
            }}
            className={`pick-item bg-gradient-to-br ${pick.gradient}`}
          >
            <span>🎰</span>
          </button>
        ))}
      </div>

      {/* Daily Bonus */}
      <div className="px-5 pb-4">
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setShowWheel(true)}
            className="bonus-card"
          >
            <div className="bonus-icon bg-gradient-to-br from-emerald-600 to-emerald-700">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div className="bonus-content">
              <h3>Daily Bonus</h3>
              <p>Premium rewards</p>
            </div>
          </button>
          <button 
            onClick={() => setShowScratch(true)}
            className="bonus-card"
          >
            <div className="bonus-icon bg-gradient-to-br from-yellow-600 to-yellow-700">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="bonus-content">
              <h3>VIP Scratch</h3>
              <p>Exclusive prizes</p>
            </div>
          </button>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="filter-container">
        <span className="filter-pill hot active">
          <span className="w-2 h-2 bg-[var(--gold)] rounded-full"></span> Premium
        </span>
        <span className="filter-pill new">
          <span className="w-2 h-2 bg-emerald-400 rounded-full"></span> New Arrivals
        </span>
        <span className="filter-pill free">
          <span className="text-[var(--gold)] font-bold">💎</span> VIP Only
        </span>
        <span className="filter-pill favorites">
          <Star className="w-3 h-3" /> Favorites
        </span>
      </div>

      {/* Game List */}
      <div className="game-list">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => {
              tg?.HapticFeedback?.impactOccurred('medium');
              navigate('game', { game: game.name });
            }}
            className="game-list-item w-full"
          >
            <div className={`game-thumb bg-gradient-to-br ${game.thumb}`}>
              <span>🎰</span>
            </div>
            <div className="game-info">
              <div className="game-title">
                <h3>{game.name}</h3>
                {game.hot && (
                  <span className="hot-badge">
                    <Flame className="w-3 h-3" />
                    HOT
                  </span>
                )}
              </div>
              <p className="game-provider">{game.provider}</p>
            </div>
            <button className="btn-play">Play Now</button>
          </button>
        ))}
      </div>

      {/* Spin Wheel Modal */}
      {showWheel && (
        <div className="modal-overlay" onClick={() => setShowWheel(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setShowWheel(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <h2 className="text-xl font-bold text-center mb-2 text-white">🎡 Lucky Spin</h2>
            <p className="text-sm text-[var(--text-muted)] text-center mb-4">Spin to win prizes!</p>
            <SpinWheel onComplete={handleWheelComplete} />
          </div>
        </div>
      )}

      {/* Scratch Card Modal */}
      {showScratch && (
        <div className="modal-overlay" onClick={() => setShowScratch(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setShowScratch(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <h2 className="text-xl font-bold text-center mb-2 text-white">🎫 Scratch & Win</h2>
            <p className="text-sm text-[var(--text-muted)] text-center mb-4">Reveal your prize!</p>
            <ScratchCard onComplete={handleScratchComplete} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

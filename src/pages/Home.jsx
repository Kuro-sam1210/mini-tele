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
      tg.setHeaderColor('#0a0e1a');
      tg.setBackgroundColor('#0a0e1a');
    }
  }, [tg]);

  const featuredGames = [
    { 
      id: 'high-wins', 
      name: '裸公车区', 
      subtitle: 'High Wins (PG)', 
      gradient: 'from-orange-500 via-red-500 to-red-600',
      icon: '💰'
    },
    { 
      id: 'steady-wins', 
      name: '规定车区', 
      subtitle: 'Steady Wins (EGT)', 
      gradient: 'from-teal-500 via-green-500 to-emerald-600',
      icon: '🎰'
    },
  ];

  const providers = [
    { id: 'pg', name: 'PG Slots', icon: '🎰', desc: 'PG Slots' },
    { id: 'egt', name: 'EGT Slots', icon: '🎲', desc: 'EGT Slots' },
  ];

  const todaysPicks = [
    { id: 1, gradient: 'from-red-500 to-red-600' },
    { id: 2, gradient: 'from-amber-500 to-orange-500' },
    { id: 3, gradient: 'from-purple-500 to-pink-500' },
    { id: 4, gradient: 'from-blue-500 to-cyan-500' },
    { id: 5, gradient: 'from-green-500 to-emerald-500' },
  ];

  const games = [
    { id: 'fortune-tiger', name: 'Fortune Tiger', provider: 'PG Soft', hot: true, thumb: 'from-orange-500 to-red-600' },
    { id: 'wild-bounty', name: 'Wild Bounty Showdown', provider: 'PG Soft', hot: true, thumb: 'from-red-500 to-pink-600' },
    { id: 'mahjong-ways', name: 'Mahjong Ways', provider: 'PG Soft', hot: false, thumb: 'from-green-500 to-teal-600' },
    { id: 'lucky-neko', name: 'Lucky Neko', provider: 'PG Soft', hot: false, thumb: 'from-purple-500 to-indigo-600' },
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
          <span className="font-semibold text-white">Telegram Mini App</span>
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
                  <Flame className="w-4 h-4 text-orange-300" />
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
            <div className="bonus-icon bg-gradient-to-br from-purple-500 to-pink-600">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div className="bonus-content">
              <h3>Spin Wheel</h3>
              <p>Win up to $1,000</p>
            </div>
          </button>
          <button 
            onClick={() => setShowScratch(true)}
            className="bonus-card"
          >
            <div className="bonus-icon bg-gradient-to-br from-amber-500 to-orange-600">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="bonus-content">
              <h3>Scratch Card</h3>
              <p>Instant prizes</p>
            </div>
          </button>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="filter-container">
        <span className="filter-pill hot active">
          <Flame className="w-3 h-3" /> High Wins
        </span>
        <span className="filter-pill new">
          <span className="w-2 h-2 bg-blue-400 rounded-full"></span> New Games
        </span>
        <span className="filter-pill free">
          <span className="text-green-400 font-bold">$</span> Buy Free
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

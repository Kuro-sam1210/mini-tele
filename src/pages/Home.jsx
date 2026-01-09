import { useState } from 'react';
import { ChevronRight, Search, Filter, X } from 'lucide-react';
import Layout from '../components/Layout';
import { GameGrid } from '../components/GameCard';
import SpinWheel from '../components/SpinWheel';
import ScratchCard from '../components/ScratchCard';
import Confetti from '../components/Confetti';

const Home = ({ user, navigate }) => {
  const [showWheel, setShowWheel] = useState(false);
  const [showScratch, setShowScratch] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeCategory, setActiveCategory] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredGames = [
    { 
      id: 'golden-slots', 
      name: 'Golden Age Slots', 
      subtitle: 'Premium Vegas Experience', 
      icon: '🎰',
      isHot: true,
      stats: { players: '1.2k', lastWin: '15,000' }
    },
    { 
      id: 'emerald-roulette', 
      name: 'Emerald Roulette', 
      subtitle: 'European Casino Style', 
      icon: '🎯',
      isLive: true,
      stats: { players: '856', avgTime: '3m' }
    },
    { 
      id: 'royal-blackjack', 
      name: 'Royal Blackjack', 
      subtitle: 'Classic Card Game', 
      icon: '🃏',
      isNew: true,
      stats: { players: '432', lastWin: '8,500' }
    },
    { 
      id: 'diamond-poker', 
      name: 'Diamond Poker', 
      subtitle: 'High Stakes Poker', 
      icon: '💎',
      stats: { players: '234', lastWin: '25,000' }
    }
  ];

  const gameCategories = [
    { id: 'featured', name: 'Featured', icon: '⭐', count: featuredGames.length },
    { id: 'slots', name: 'Slots', icon: '🎰', count: 12 },
    { id: 'table', name: 'Table Games', icon: '🎯', count: 8 },
    { id: 'live', name: 'Live Casino', icon: '📹', count: 6 },
    { id: 'new', name: 'New Games', icon: '✨', count: 4 }
  ];

  const quickActions = [
    { 
      id: 'daily-bonus', 
      title: 'Daily Bonus', 
      subtitle: 'Spin the wheel', 
      icon: '🎁',
      action: () => setShowWheel(true),
      gradient: 'from-emerald-600 to-emerald-500'
    },
    { 
      id: 'scratch-card', 
      title: 'Scratch Card', 
      subtitle: 'Win instantly', 
      icon: '🎫',
      action: () => setShowScratch(true),
      gradient: 'from-purple-600 to-purple-500'
    },
    { 
      id: 'tournaments', 
      title: 'Tournaments', 
      subtitle: 'Compete now', 
      icon: '🏆',
      action: () => navigate('tournaments'),
      gradient: 'from-amber-600 to-amber-500'
    }
  ];

  const handleGameClick = (game) => {
    navigate('game', { selectedGame: game.id });
  };

  const handleWheelWin = (prize) => {
    setShowWheel(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const filteredGames = featuredGames.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout title="Casino" user={user} navigate={navigate} currentScreen="home">
      <div className="page p-4 space-y-6">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gradient-gold tracking-tight">
                Welcome to Golden Age Cash
              </h1>
              <p className="text-gray-400 mt-2 text-sm">
                Premium casino experience awaits
              </p>
            </div>
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gold/30 glow-gold">
              <img 
                src="/casinologo.jpg" 
                alt="Golden Age Cash"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="casino-divider"></div>
          
          {user?.balance !== undefined && (
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-900/20 via-emerald-800/20 to-emerald-900/20 rounded-xl border-2 border-emerald-500/20 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent opacity-50"></div>
              <div className="relative z-10 flex-1">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Your Balance</div>
                <div className="text-3xl font-bold text-gradient-emerald">
                  ${user.balance.toLocaleString()}
                </div>
              </div>
              <button 
                className="btn btn-success btn-sm relative z-10"
                onClick={() => navigate('wallet')}
              >
                <span>💰</span>
                Deposit
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white tracking-tight">Quick Actions</h2>
          <div className="grid-3">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={action.action}
                className={`card hover:scale-105 transition-all duration-300 bg-gradient-to-br ${action.gradient} border-2 border-white/20 relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/10 group-hover:from-white/5 group-hover:via-white/5 transition-all duration-300"></div>
                <div className="text-center relative z-10">
                  <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">{action.icon}</div>
                  <div className="font-bold text-white text-sm mb-1">{action.title}</div>
                  <div className="text-xs text-white/90 font-medium">{action.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input pl-10"
              />
            </div>
            <button className="btn btn-secondary">
              <Filter size={18} />
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {gameCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`casino-tab flex items-center gap-2 whitespace-nowrap ${
                  activeCategory === category.id ? 'active' : ''
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-semibold">{category.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  activeCategory === category.id 
                    ? 'bg-white/30 text-white' 
                    : 'bg-white/10 text-gray-400'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Featured Games</h2>
            <button className="text-amber-400 text-sm hover:text-amber-300 transition-colors">
              View All <ChevronRight size={16} className="inline" />
            </button>
          </div>
          
          <GameGrid
            games={filteredGames}
            onGameClick={handleGameClick}
            variant="default"
          />
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-5 tracking-tight flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            Recent Big Wins
          </h3>
          <div className="casino-divider mb-4"></div>
          <div className="space-y-3">
            {[
              { player: 'Player***123', game: 'Golden Age Slots', amount: 15000 },
              { player: 'Lucky***789', game: 'Emerald Roulette', amount: 8500 },
              { player: 'Winner***456', game: 'Diamond Poker', amount: 25000 }
            ].map((win, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-white/5 via-white/3 to-white/5 rounded-xl border border-white/10 hover:border-gold/30 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-black font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{win.player}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{win.game}</div>
                  </div>
                </div>
                <div className="text-emerald-400 font-bold text-lg tracking-tight">
                  +${win.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showWheel && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Daily Bonus Wheel</h3>
              <button onClick={() => setShowWheel(false)} className="modal-close">
                <X size={20} />
              </button>
            </div>
            <SpinWheel onWin={handleWheelWin} />
          </div>
        </div>
      )}

      {showScratch && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Scratch Card</h3>
              <button onClick={() => setShowScratch(false)} className="modal-close">
                <X size={20} />
              </button>
            </div>
            <ScratchCard onWin={(prize) => {
              setShowScratch(false);
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 3000);
            }} />
          </div>
        </div>
      )}

      {showConfetti && <Confetti />}
    </Layout>
  );
};

export default Home;
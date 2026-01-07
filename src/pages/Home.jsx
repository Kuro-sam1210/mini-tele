import { useState, useEffect } from 'react';
import { Wallet, Gamepad2, User, Gift, ChevronRight, Flame, X } from 'lucide-react';
import SpinWheel from '../components/SpinWheel';
import ScratchCard from '../components/ScratchCard';
import Confetti from '../components/Confetti';

const Home = ({ user, navigate }) => {
  const tg = window.Telegram?.WebApp;
  const [showWheel, setShowWheel] = useState(false);
  const [showScratch, setShowScratch] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const games = [
    { id: 'fortune-tiger', name: 'Fortune Tiger', provider: 'PG Soft', hot: true },
    { id: 'sweet-bonanza', name: 'Sweet Bonanza', provider: 'Pragmatic', hot: true },
    { id: 'mahjong-ways', name: 'Mahjong Ways', provider: 'PG Soft', hot: false },
    { id: 'gates-olympus', name: 'Gates of Olympus', provider: 'Pragmatic', hot: false },
  ];

  const handleWheelComplete = (result) => {
    setShowConfetti(true);
    setTimeout(() => setShowWheel(false), 2000);
  };

  const handleScratchComplete = (prize) => {
    setShowConfetti(true);
    setTimeout(() => setShowScratch(false), 2000);
  };

  return (
    <div className="page">
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Balance Card */}
      <div className="px-4 pt-4 pb-6">
        <div className="card p-5 bg-gradient-to-br from-amber-500/20 to-transparent">
          <p className="text-sm text-[var(--tg-theme-hint-color)] mb-1">Your Balance</p>
          <p className="text-3xl font-bold mb-4">${user?.balance?.toLocaleString() || '0.00'}</p>
          
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('wallet')}
              className="btn-primary flex-1 py-3"
            >
              Deposit
            </button>
            <button 
              onClick={() => navigate('wallet')}
              className="btn-secondary flex-1 py-3"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => navigate('wallet')}
            className="card p-4 flex flex-col items-center gap-2"
          >
            <Wallet className="w-6 h-6 text-amber-500" />
            <span className="text-xs">Wallet</span>
          </button>
          <button 
            onClick={() => setShowWheel(true)}
            className="card p-4 flex flex-col items-center gap-2"
          >
            <Gift className="w-6 h-6 text-amber-500" />
            <span className="text-xs">Spin</span>
          </button>
          <button 
            onClick={() => navigate('profile')}
            className="card p-4 flex flex-col items-center gap-2"
          >
            <User className="w-6 h-6 text-amber-500" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>

      {/* Daily Bonus */}
      <div className="px-4 pb-6">
        <h2 className="text-sm font-semibold text-[var(--tg-theme-hint-color)] mb-3 uppercase tracking-wider">
          Daily Bonus
        </h2>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowWheel(true)}
            className="card flex-1 p-4"
          >
            <span className="text-2xl mb-2 block">🎡</span>
            <p className="font-semibold text-sm">Spin Wheel</p>
            <p className="text-xs text-[var(--tg-theme-hint-color)]">Win up to $1000</p>
          </button>
          <button 
            onClick={() => setShowScratch(true)}
            className="card flex-1 p-4"
          >
            <span className="text-2xl mb-2 block">🎫</span>
            <p className="font-semibold text-sm">Scratch Card</p>
            <p className="text-xs text-[var(--tg-theme-hint-color)]">Instant prizes</p>
          </button>
        </div>
      </div>

      {/* Games List */}
      <div className="px-4 pb-8">
        <h2 className="text-sm font-semibold text-[var(--tg-theme-hint-color)] mb-3 uppercase tracking-wider">
          Popular Games
        </h2>
        <div className="space-y-3">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => {
                tg?.HapticFeedback?.impactOccurred('light');
                navigate('game', { game: game.name });
              }}
              className="card w-full p-4 flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Gamepad2 className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{game.name}</h3>
                  {game.hot && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full">
                      <Flame className="w-3 h-3" />
                      HOT
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--tg-theme-hint-color)]">{game.provider}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[var(--tg-theme-hint-color)]" />
            </button>
          ))}
        </div>
      </div>

      {/* Spin Wheel Modal */}
      {showWheel && (
        <div className="modal-overlay" onClick={() => setShowWheel(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setShowWheel(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            <h2 className="text-xl font-bold text-center mb-6">🎡 Daily Spin</h2>
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
              <X className="w-4 h-4" />
            </button>
            <h2 className="text-xl font-bold text-center mb-6">🎫 Scratch & Win</h2>
            <ScratchCard onComplete={handleScratchComplete} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

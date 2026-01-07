import { useState, useEffect } from 'react';
import { Minus, Plus, Trophy } from 'lucide-react';
import SlotMachine from '../components/SlotMachine';
import CardFlip from '../components/CardFlip';
import Confetti from '../components/Confetti';

const Game = ({ user, gameData, updateBalance, navigate }) => {
  const tg = window.Telegram?.WebApp;
  const [gameType, setGameType] = useState('slots');
  const [bet, setBet] = useState(1.00);
  const [lastWin, setLastWin] = useState(0);
  const [showWin, setShowWin] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const gameName = gameData?.game || 'Fortune Tiger';

  const handleSpin = () => {
    if (user?.balance >= bet) {
      updateBalance(-bet);
      setLastWin(0);
    }
  };

  const handleWin = (amount, type) => {
    setWinAmount(amount);
    setLastWin(amount);
    updateBalance(amount);
    setShowWin(true);
    setShowConfetti(true);
    tg?.HapticFeedback?.notificationOccurred('success');
    
    setTimeout(() => setShowWin(false), type === 'jackpot' ? 4000 : 2500);
  };

  const handleCardGameComplete = (amount, result) => {
    if (amount > 0) {
      updateBalance(amount);
      setLastWin(amount);
      if (result === 'won') {
        setShowConfetti(true);
        tg?.HapticFeedback?.notificationOccurred('success');
      }
    }
  };

  const adjustBet = (delta) => {
    tg?.HapticFeedback?.selectionChanged();
    setBet(prev => {
      const newBet = prev + delta;
      if (newBet < 0.10) return 0.10;
      if (newBet > 100) return 100;
      return Math.round(newBet * 100) / 100;
    });
  };

  return (
    <div className="page">
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Game Header */}
      <div className="px-4 pt-4 pb-4">
        <h1 className="text-xl font-bold">{gameName}</h1>
        <p className="text-sm text-[var(--tg-theme-hint-color)]">PG Soft</p>
      </div>

      {/* Game Type Switcher */}
      <div className="px-4 pb-4">
        <div className="flex gap-2 p-1 bg-[var(--tg-theme-secondary-bg-color)] rounded-xl">
          <button
            onClick={() => setGameType('slots')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              gameType === 'slots' 
                ? 'bg-amber-500 text-black' 
                : 'text-[var(--tg-theme-hint-color)]'
            }`}
          >
            🎰 Slots
          </button>
          <button
            onClick={() => setGameType('cards')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              gameType === 'cards' 
                ? 'bg-amber-500 text-black' 
                : 'text-[var(--tg-theme-hint-color)]'
            }`}
          >
            🃏 Cards
          </button>
        </div>
      </div>

      {/* Game Area */}
      <div className="px-4 pb-4">
        <div className="card p-4 relative overflow-hidden">
          {gameType === 'slots' ? (
            <SlotMachine 
              bet={bet}
              disabled={user?.balance < bet}
              onSpin={handleSpin}
              onWin={handleWin}
            />
          ) : (
            <CardFlip onComplete={handleCardGameComplete} cardCount={6} />
          )}

          {/* Win Overlay */}
          {showWin && (
            <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-10 rounded-2xl">
              <div className="text-center">
                <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-amber-500 mb-2">YOU WIN!</h2>
                <p className="text-4xl font-bold">${winAmount.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Game Stats */}
      {gameType === 'slots' && (
        <div className="px-4 pb-4">
          <div className="card p-4">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center mb-4">
              <div>
                <p className="text-xs text-[var(--tg-theme-hint-color)]">Bet</p>
                <p className="font-bold">${bet.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--tg-theme-hint-color)]">Win</p>
                <p className={`font-bold ${lastWin > 0 ? 'text-amber-500' : ''}`}>
                  ${lastWin.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-[var(--tg-theme-hint-color)]">Balance</p>
                <p className="font-bold">${user?.balance?.toFixed(2) || '0.00'}</p>
              </div>
            </div>

            {/* Bet Adjustment */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => adjustBet(-0.50)}
                className="w-12 h-12 rounded-xl bg-[var(--tg-theme-secondary-bg-color)] flex items-center justify-center"
              >
                <Minus className="w-5 h-5" />
              </button>
              <div className="flex-1 text-center">
                <p className="text-xs text-[var(--tg-theme-hint-color)]">Bet Amount</p>
                <p className="text-xl font-bold">${bet.toFixed(2)}</p>
              </div>
              <button 
                onClick={() => adjustBet(0.50)}
                className="w-12 h-12 rounded-xl bg-[var(--tg-theme-secondary-bg-color)] flex items-center justify-center"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Bets */}
            <div className="flex gap-2 mt-3">
              {[1, 5, 10, 25].map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    tg?.HapticFeedback?.selectionChanged();
                    setBet(amount);
                  }}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    bet === amount 
                      ? 'bg-amber-500 text-black' 
                      : 'bg-[var(--tg-theme-secondary-bg-color)]'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Paytable */}
      {gameType === 'slots' && (
        <div className="px-4 pb-8">
          <div className="card p-4">
            <h3 className="font-semibold mb-3">Paytable</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-[var(--tg-theme-secondary-bg-color)] rounded-lg">
                <span>7️⃣ 7️⃣ 7️⃣</span>
                <span className="text-amber-500 font-bold">100x</span>
              </div>
              <div className="flex justify-between p-2 bg-[var(--tg-theme-secondary-bg-color)] rounded-lg">
                <span>💎 💎 💎</span>
                <span className="text-amber-500 font-bold">50x</span>
              </div>
              <div className="flex justify-between p-2 bg-[var(--tg-theme-secondary-bg-color)] rounded-lg">
                <span>Any 3 Match</span>
                <span className="text-amber-500 font-bold">20x</span>
              </div>
              <div className="flex justify-between p-2 bg-[var(--tg-theme-secondary-bg-color)] rounded-lg">
                <span>Any 2 Match</span>
                <span className="text-amber-500 font-bold">3x</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;

import { useState, useEffect } from 'react';
import { ArrowDownLeft, ArrowUpRight, CreditCard, Bitcoin, Building2, ChevronRight } from 'lucide-react';

const Wallet = ({ user, updateBalance, navigate }) => {
  const tg = window.Telegram?.WebApp;
  const [view, setView] = useState('main');
  const [selectedAmount, setSelectedAmount] = useState(null);

  const quickAmounts = [100, 500, 1000, 2000, 5000];

  // Set dark header in Telegram
  useEffect(() => {
    if (tg) {
      tg.setHeaderColor('#09090b');
      tg.setBackgroundColor('#09090b');
    }
  }, [tg]);

  const transactions = [
    { type: 'deposit', amount: 500, date: 'Today, 2:30 PM' },
    { type: 'win', amount: 150, date: 'Today, 11:45 AM' },
    { type: 'withdraw', amount: -200, date: 'Yesterday' },
    { type: 'deposit', amount: 1000, date: 'Jan 5' },
  ];

  // Use MainButton for deposit/withdraw confirmation
  useEffect(() => {
    if (!tg?.MainButton) return;

    if (view === 'deposit' && selectedAmount) {
      tg.MainButton.setText(`Deposit $${selectedAmount}`);
      tg.MainButton.color = '#f59e0b';
      tg.MainButton.textColor = '#000000';
      tg.MainButton.show();
      tg.MainButton.onClick(() => {
        tg.HapticFeedback?.notificationOccurred('success');
        updateBalance(selectedAmount);
        setView('main');
        setSelectedAmount(null);
      });
    } else if (view === 'withdraw' && selectedAmount) {
      tg.MainButton.setText(`Withdraw $${selectedAmount}`);
      tg.MainButton.color = '#ef4444';
      tg.MainButton.textColor = '#ffffff';
      tg.MainButton.show();
      tg.MainButton.onClick(() => {
        tg.HapticFeedback?.notificationOccurred('success');
        updateBalance(-selectedAmount);
        setView('main');
        setSelectedAmount(null);
      });
    } else {
      tg.MainButton.hide();
    }

    return () => {
      tg.MainButton.offClick();
    };
  }, [view, selectedAmount, tg, updateBalance]);

  if (view === 'deposit') {
    return (
      <div className="page">
        <div className="px-4 pt-4 pb-6">
          <h1 className="text-xl font-bold mb-1 text-white">Deposit</h1>
          <p className="text-sm text-[var(--text-muted)]">Add funds to your account</p>
        </div>

        <div className="px-4 pb-6">
          <div className="card p-4">
            <h3 className="font-semibold mb-4 text-white">Select Amount</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    tg?.HapticFeedback?.selectionChanged();
                    setSelectedAmount(amount);
                  }}
                  className={`py-4 rounded-xl font-semibold transition-all ${
                    selectedAmount === amount
                      ? 'bg-amber-500 text-black'
                      : 'bg-[var(--bg-elevated)] text-white'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>

            <input
              type="number"
              placeholder="Custom amount"
              className="input w-full"
              onChange={(e) => setSelectedAmount(Number(e.target.value) || null)}
            />
          </div>
        </div>

        <div className="px-4 pb-6">
          <h3 className="font-semibold mb-3 text-white">Payment Method</h3>
          <div className="space-y-3">
            {[
              { icon: CreditCard, name: 'Card', color: 'text-blue-500' },
              { icon: Bitcoin, name: 'Crypto', color: 'text-amber-500' },
              { icon: Building2, name: 'Bank', color: 'text-emerald-500' },
            ].map((method, i) => (
              <button key={i} className="card w-full p-4 flex items-center gap-4">
                <method.icon className={`w-6 h-6 ${method.color}`} />
                <span className="font-medium text-white">{method.name}</span>
                <ChevronRight className="w-5 h-5 text-[var(--text-muted)] ml-auto" />
              </button>
            ))}
          </div>
        </div>

        {/* Fallback button for non-Telegram */}
        {!tg?.MainButton && selectedAmount && (
          <div className="px-4 pb-8">
            <button 
              onClick={() => {
                updateBalance(selectedAmount);
                setView('main');
                setSelectedAmount(null);
              }}
              className="btn-primary w-full py-4"
            >
              Deposit ${selectedAmount}
            </button>
          </div>
        )}
      </div>
    );
  }

  if (view === 'withdraw') {
    return (
      <div className="page">
        <div className="px-4 pt-4 pb-6">
          <h1 className="text-xl font-bold mb-1 text-white">Withdraw</h1>
          <p className="text-sm text-[var(--text-muted)]">
            Available: ${user?.balance?.toFixed(2) || '0.00'}
          </p>
        </div>

        <div className="px-4 pb-6">
          <div className="card p-4">
            <h3 className="font-semibold mb-4 text-white">Select Amount</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[50, 100, 250, 500, 1000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    tg?.HapticFeedback?.selectionChanged();
                    setSelectedAmount(amount);
                  }}
                  disabled={amount > (user?.balance || 0)}
                  className={`py-4 rounded-xl font-semibold transition-all ${
                    selectedAmount === amount
                      ? 'bg-amber-500 text-black'
                      : amount > (user?.balance || 0)
                      ? 'bg-[var(--bg-elevated)] opacity-50 text-white'
                      : 'bg-[var(--bg-elevated)] text-white'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>

            <input
              type="number"
              placeholder="Custom amount"
              className="input w-full"
              max={user?.balance || 0}
              onChange={(e) => setSelectedAmount(Math.min(Number(e.target.value) || 0, user?.balance || 0))}
            />
            <p className="text-xs text-[var(--text-muted)] mt-2">
              Min: $50 • Max: $10,000/day
            </p>
          </div>
        </div>

        {/* Fallback button for non-Telegram */}
        {!tg?.MainButton && selectedAmount && (
          <div className="px-4 pb-8">
            <button 
              onClick={() => {
                updateBalance(-selectedAmount);
                setView('main');
                setSelectedAmount(null);
              }}
              className="btn-primary w-full py-4"
              style={{ background: '#ef4444' }}
            >
              Withdraw ${selectedAmount}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="page">
      {/* Balance */}
      <div className="px-4 pt-4 pb-6">
        <div className="card p-6 text-center bg-gradient-to-br from-emerald-500/20 to-transparent">
          <p className="text-sm text-[var(--text-muted)] mb-1">Total Balance</p>
          <p className="text-4xl font-bold mb-6 text-white">${user?.balance?.toFixed(2) || '0.00'}</p>
          
          <div className="flex gap-3">
            <button 
              onClick={() => {
                tg?.HapticFeedback?.impactOccurred('light');
                setView('deposit');
              }}
              className="btn-primary flex-1 py-3 flex items-center justify-center gap-2"
            >
              <ArrowDownLeft className="w-5 h-5" />
              Deposit
            </button>
            <button 
              onClick={() => {
                tg?.HapticFeedback?.impactOccurred('light');
                setView('withdraw');
              }}
              className="btn-secondary flex-1 py-3 flex items-center justify-center gap-2"
            >
              <ArrowUpRight className="w-5 h-5" />
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="px-4 pb-8">
        <h2 className="text-sm font-semibold text-[var(--text-muted)] mb-3 uppercase tracking-wider">
          Recent Transactions
        </h2>
        <div className="card divide-y divide-white/5">
          {transactions.map((tx, i) => (
            <div key={i} className="p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                tx.type === 'deposit' ? 'bg-emerald-500/10' :
                tx.type === 'win' ? 'bg-amber-500/10' : 'bg-red-500/10'
              }`}>
                {tx.type === 'deposit' ? <ArrowDownLeft className="w-5 h-5 text-emerald-500" /> :
                 tx.type === 'win' ? '🎉' : <ArrowUpRight className="w-5 h-5 text-red-500" />}
              </div>
              <div className="flex-1">
                <p className="font-medium capitalize text-white">{tx.type}</p>
                <p className="text-xs text-[var(--text-muted)]">{tx.date}</p>
              </div>
              <p className={`font-semibold ${tx.amount > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;

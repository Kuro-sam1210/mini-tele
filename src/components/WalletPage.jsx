import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const WalletPage = ({ user, onNavigate }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('main');

  const transactions = [
    { id: 1, type: 'deposit', amount: 500.00, date: '2024-01-06 14:30', status: 'completed' },
    { id: 2, type: 'withdraw', amount: -200.00, date: '2024-01-06 12:15', status: 'completed' },
    { id: 3, type: 'win', amount: 150.75, date: '2024-01-06 11:45', status: 'completed' },
    { id: 4, type: 'bet', amount: -25.00, date: '2024-01-06 11:30', status: 'completed' },
    { id: 5, type: 'deposit', amount: 1000.00, date: '2024-01-05 20:22', status: 'completed' }
  ];

  const bonuses = [
    { 
      id: 1, 
      name: 'Welcome Bonus', 
      amount: 100.00, 
      type: 'deposit_match', 
      status: 'active',
      expiry: '2024-01-13',
      progress: 65
    },
    { 
      id: 2, 
      name: 'Daily Cashback', 
      amount: 25.50, 
      type: 'cashback', 
      status: 'pending',
      expiry: '2024-01-07',
      progress: 100
    },
    { 
      id: 3, 
      name: 'Free Spins', 
      amount: 0, 
      spins: 50, 
      type: 'free_spins', 
      status: 'active',
      expiry: '2024-01-08',
      progress: 20
    }
  ];

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit': return '💰';
      case 'withdraw': return '💸';
      case 'win': return '🎉';
      case 'bet': return '🎰';
      default: return '💳';
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'deposit': return 'text-green-400';
      case 'withdraw': return 'text-red-400';
      case 'win': return 'text-yellow-400';
      case 'bet': return 'text-gray-400';
      default: return 'text-white';
    }
  };

  if (activeTab === 'deposit') {
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-slate-100 pb-32 selection:bg-amber-500/30">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5 px-4 py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('main')}
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 active:scale-90 transition-transform"
            >
              ←
            </button>
            <h1 className="text-xl font-black uppercase tracking-tighter italic">{t('deposit')}</h1>
          </div>
        </header>

        {/* Deposit Form */}
        <main className="p-4 space-y-6">
          <div className="bg-[#12121a] border border-white/5 rounded-3xl p-6">
            <h3 className="text-white font-black text-lg mb-6 uppercase tracking-tight">Select Amount</h3>
            
            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[100, 500, 1000, 2000, 5000, 10000].map((amount) => (
                <button
                  key={amount}
                  className="bg-[#1a1a24] hover:bg-amber-500 hover:text-black text-white py-4 rounded-2xl font-black transition-all active:scale-95 border border-white/5 hover:border-amber-500"
                >
                  ${amount.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-bold mb-3 uppercase tracking-widest">Custom Amount</label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full bg-[#1a1a24] text-white px-6 py-4 rounded-2xl border border-white/10 focus:border-amber-400 focus:outline-none font-bold"
              />
            </div>

            {/* Payment Methods */}
            <div className="mb-8">
              <h4 className="text-white font-black mb-4 uppercase tracking-tight">Payment Method</h4>
              <div className="space-y-3">
                <button className="w-full bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-white py-4 rounded-2xl font-black flex items-center justify-center transition-all">
                  <span className="mr-3 text-xl">💳</span>
                  Credit/Debit Card
                </button>
                <button className="w-full bg-amber-600/10 hover:bg-amber-600/20 border border-amber-500/30 text-white py-4 rounded-2xl font-black flex items-center justify-center transition-all">
                  <span className="mr-3 text-xl">₿</span>
                  Cryptocurrency
                </button>
                <button className="w-full bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 text-white py-4 rounded-2xl font-black flex items-center justify-center transition-all">
                  <span className="mr-3 text-xl">🏦</span>
                  Bank Transfer
                </button>
              </div>
            </div>

            <button className="w-full bg-white hover:bg-amber-400 text-black font-black py-5 rounded-2xl text-lg uppercase tracking-widest transition-all active:scale-95 shadow-lg">
              Confirm Deposit
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (activeTab === 'withdraw') {
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-slate-100 pb-32 selection:bg-amber-500/30">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5 px-4 py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('main')}
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 active:scale-90 transition-transform"
            >
              ←
            </button>
            <h1 className="text-xl font-black uppercase tracking-tighter italic">{t('withdraw')}</h1>
          </div>
        </header>

        {/* Withdraw Form */}
        <main className="p-4 space-y-6">
          <div className="bg-[#12121a] border border-white/5 rounded-3xl p-6">
            <div className="text-center mb-8">
              <p className="text-gray-300 text-sm font-bold uppercase tracking-widest mb-2">Available Balance</p>
              <p className="text-4xl font-black text-white">${user?.balance?.toLocaleString() || '2,368.50'}</p>
            </div>

            {/* Withdraw Amount */}
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-bold mb-3 uppercase tracking-widest">Withdraw Amount</label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full bg-[#1a1a24] text-white px-6 py-4 rounded-2xl border border-white/10 focus:border-amber-400 focus:outline-none font-bold"
              />
              <p className="text-gray-400 text-xs mt-3 font-medium">Min: $50 | Max: $10,000 per day</p>
            </div>

            {/* Withdrawal Method */}
            <div className="mb-8">
              <h4 className="text-white font-black mb-4 uppercase tracking-tight">Withdrawal Method</h4>
              <div className="space-y-3">
                <button className="w-full bg-[#1a1a24] hover:bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-black flex items-center justify-between transition-all">
                  <div className="flex items-center">
                    <span className="mr-3 text-xl">🏦</span>
                    Bank Account
                  </div>
                  <span className="text-gray-400 font-mono">**** 1234</span>
                </button>
                <button className="w-full bg-[#1a1a24] hover:bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-black flex items-center justify-between transition-all">
                  <div className="flex items-center">
                    <span className="mr-3 text-xl">₿</span>
                    Bitcoin Wallet
                  </div>
                  <span className="text-gray-400 font-mono">bc1q...xyz</span>
                </button>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-black py-5 rounded-2xl text-lg uppercase tracking-widest transition-all active:scale-95 shadow-lg">
              Request Withdrawal
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 pb-32 selection:bg-amber-500/30">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center">
              <span className="text-xl">💎</span>
            </div>
            <h1 className="text-xl font-black uppercase tracking-tighter italic">{t('myWallet')}</h1>
          </div>
          
          <div className="bg-[#1a1a24] rounded-2xl px-4 py-2 border border-white/10 flex items-center gap-2">
            <span className="text-amber-500 text-xs font-black tracking-widest">$</span>
            <span className="text-sm font-black tabular-nums">{user?.balance?.toLocaleString() || '2,368.50'}</span>
          </div>
        </div>
      </header>

      {/* Premium Balance Card */}
      <main className="p-4 space-y-6">
        <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10 text-center">
            <span className="text-xs font-black tracking-widest uppercase text-emerald-200 opacity-80">
              {t('usdtBalance')}
            </span>
            <h2 className="text-5xl font-black text-white mt-2 mb-8 tracking-tight">
              ${user?.balance?.toLocaleString() || '2,368.50'}
            </h2>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setActiveTab('deposit')}
                className="bg-white/20 backdrop-blur-md border border-white/30 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/30 transition-all active:scale-95"
              >
                <span className="block text-2xl mb-2">💰</span>
                {t('deposit')}
              </button>
              <button 
                onClick={() => setActiveTab('withdraw')}
                className="bg-white/20 backdrop-blur-md border border-white/30 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/30 transition-all active:scale-95"
              >
                <span className="block text-2xl mb-2">💸</span>
                {t('withdraw')}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setActiveTab('transactions')}
            className="bg-[#1a1a24] border border-white/5 rounded-3xl p-4 flex items-center justify-between hover:border-amber-500/30 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-2xl">
                📊
              </div>
              <div className="text-left">
                <h4 className="text-white font-black text-sm uppercase tracking-tight">{t('transactionHistory')}</h4>
                <p className="text-gray-400 text-xs">View all transactions</p>
              </div>
            </div>
            <span className="text-gray-400">→</span>
          </button>

          <button 
            onClick={() => setActiveTab('bonuses')}
            className="bg-[#1a1a24] border border-white/5 rounded-3xl p-4 flex items-center justify-between hover:border-amber-500/30 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-2xl">
                🎁
              </div>
              <div className="text-left">
                <h4 className="text-white font-black text-sm uppercase tracking-tight">{t('myBonuses')}</h4>
                <p className="text-gray-400 text-xs">Active bonuses</p>
              </div>
            </div>
            <span className="text-gray-400">→</span>
          </button>
        </div>

        {/* Content Sections */}
        {activeTab === 'transactions' ? (
          <div className="bg-[#12121a] border border-white/5 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-black text-lg uppercase tracking-tight">{t('transactionHistory')}</h3>
              <button 
                onClick={() => setActiveTab('main')}
                className="text-gray-400 hover:text-white w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-4 border-b border-white/5 last:border-b-0">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-xl">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <h4 className="text-white font-bold capitalize">{transaction.type}</h4>
                      <p className="text-gray-400 text-sm">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-black text-lg ${getTransactionColor(transaction.type)}`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-xs capitalize">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'bonuses' ? (
          <div className="bg-[#12121a] border border-white/5 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-black text-lg uppercase tracking-tight">{t('myBonuses')}</h3>
              <button 
                onClick={() => setActiveTab('main')}
                className="text-gray-400 hover:text-white w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {bonuses.map((bonus) => (
                <div key={bonus.id} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-black">{bonus.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                      bonus.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {bonus.status}
                    </span>
                  </div>
                  
                  {bonus.type === 'free_spins' ? (
                    <p className="text-amber-400 font-black text-xl">{bonus.spins} Free Spins</p>
                  ) : (
                    <p className="text-amber-400 font-black text-xl">${bonus.amount.toLocaleString()}</p>
                  )}
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                      <span className="font-bold">Progress</span>
                      <span className="font-black">{bonus.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${bonus.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mt-3">Expires: {bonus.expiry}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-[#12121a] border border-white/5 rounded-3xl p-6">
            <h3 className="text-white font-black text-lg mb-6 uppercase tracking-tight">Recent Transactions</h3>
            <div className="space-y-4">
              {transactions.slice(0, 3).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-lg">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <h4 className="text-white font-bold capitalize">{transaction.type}</h4>
                      <p className="text-gray-400 text-sm">{transaction.date}</p>
                    </div>
                  </div>
                  <p className={`font-black ${getTransactionColor(transaction.type)}`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setActiveTab('transactions')}
              className="w-full mt-6 text-amber-400 hover:text-amber-300 font-black uppercase tracking-widest text-sm"
            >
              View All Transactions →
            </button>
          </div>
        )}
      </main>

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 z-50">
        <div className="bg-[#12121a]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-2 flex justify-around items-center shadow-2xl">
          {[
            { id: 'home', icon: '🏠', label: t('home') },
            { id: 'games', icon: '🎮', label: t('games') },
            { id: 'wallet', icon: '💰', label: t('wallet'), active: true },
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

export default WalletPage;
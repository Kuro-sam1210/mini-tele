import { useState, useEffect } from 'react';
import { ChevronLeft, History, Bitcoin, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../contexts/ApiContext';

const Wallet = ({ navigate }) => {
  const tg = window.Telegram?.WebApp;
  const [view, setView] = useState('main');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isInTelegram, setIsInTelegram] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  // Contexts
  const { user, isAuthenticated } = useAuth();
  const { getBalance, getTransactions, createDeposit, createWithdrawal } = useApi();

  const quickAmounts = [10, 25, 50, 100, 250, 500];
  const depositLimits = { min: 10, max: 100000 };
  const withdrawalLimits = { min: 10, max: 50000 };

  // Initialize Telegram WebApp
  useEffect(() => {
    // Check if we're in Telegram environment
    const inTelegram = tg && tg.initData && tg.initData.length > 0;
    setIsInTelegram(inTelegram);
    
    if (inTelegram) {
      tg.setHeaderColor('#000000');
      tg.setBackgroundColor('#000000');
    }
  }, [tg]);

  // Load wallet data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadWalletData();
    }
  }, [isAuthenticated]);

  const loadWalletData = async () => {
    try {
      setLoading(true);
      
      // Load balance
      const balanceResult = await getBalance();
      if (balanceResult.success) {
        setBalance(balanceResult.data.balance || 0);
      }
      
      // Load transactions
      const transactionsResult = await getTransactions(10);
      if (transactionsResult.success) {
        setTransactions(transactionsResult.data.transactions || []);
      }
      
    } catch (err) {
      setError('Failed to load wallet data');
      console.error('Wallet data loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = async () => {
    if (!selectedAmount || selectedAmount < depositLimits.min) {
      setError(`Minimum deposit amount is ${depositLimits.min} USDT`);
      return;
    }

    if (selectedAmount > depositLimits.max) {
      setError(`Maximum deposit amount is ${depositLimits.max.toLocaleString()} USDT`);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await createDeposit(selectedAmount);
      
      if (result.success) {
        setSuccess(`Deposit order created for ${selectedAmount} USDT`);
        
        // If payment URL is provided, open it
        if (result.data.payment_url) {
          if (tg?.openLink) {
            tg.openLink(result.data.payment_url);
          } else {
            window.open(result.data.payment_url, '_blank');
          }
        }
        
        // Refresh wallet data
        await loadWalletData();
        setView('main');
        setSelectedAmount(null);
      } else {
        setError(result.error || 'Deposit failed');
      }
    } catch (err) {
      setError('Deposit failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawal = async () => {
    if (!selectedAmount || selectedAmount < withdrawalLimits.min) {
      setError(`Minimum withdrawal amount is ${withdrawalLimits.min} USDT`);
      return;
    }

    if (selectedAmount > withdrawalLimits.max) {
      setError(`Maximum withdrawal amount is ${withdrawalLimits.max.toLocaleString()} USDT`);
      return;
    }

    if (selectedAmount > balance) {
      setError('Insufficient balance');
      return;
    }

    if (!walletAddress.trim()) {
      setError('Please enter a valid USDT wallet address');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await createWithdrawal(selectedAmount, walletAddress);
      
      if (result.success) {
        setSuccess(`Withdrawal request created for ${selectedAmount} USDT`);
        
        // Refresh wallet data
        await loadWalletData();
        setView('main');
        setSelectedAmount(null);
        setWalletAddress('');
      } else {
        setError(result.error || 'Withdrawal failed');
      }
    } catch (err) {
      setError('Withdrawal failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Telegram Main Button integration
  useEffect(() => {
    if (!isInTelegram) return;

    if (view === 'deposit' && selectedAmount && selectedAmount >= depositLimits.min) {
      tg.MainButton.setText(`Deposit ${selectedAmount} USDT`);
      tg.MainButton.color = '#10b981';
      tg.MainButton.textColor = '#ffffff';
      tg.MainButton.show();
      tg.MainButton.onClick(handleDeposit);
    } else if (view === 'withdraw' && selectedAmount && selectedAmount >= withdrawalLimits.min && walletAddress.trim()) {
      tg.MainButton.setText(`Withdraw ${selectedAmount} USDT`);
      tg.MainButton.color = '#f59e0b';
      tg.MainButton.textColor = '#ffffff';
      tg.MainButton.show();
      tg.MainButton.onClick(handleWithdrawal);
    } else {
      tg.MainButton.hide();
    }

    return () => {
      tg.MainButton.offClick();
    };
  }, [view, selectedAmount, walletAddress, tg, isInTelegram]);

  const formatTransactionType = (type) => {
    switch (type) {
      case 'deposit': return { text: 'Deposit', icon: '+', color: 'text-green-400' };
      case 'withdrawal': return { text: 'Withdrawal', icon: '-', color: 'text-orange-400' };
      default: return { text: type, icon: '•', color: 'text-gray-400' };
    }
  };

  const formatTransactionStatus = (status) => {
    switch (status) {
      case 'completed': return { icon: CheckCircle, color: 'text-green-400' };
      case 'pending': return { icon: Clock, color: 'text-yellow-400' };
      case 'failed': return { icon: AlertCircle, color: 'text-red-400' };
      default: return { icon: Clock, color: 'text-gray-400' };
    }
  };

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <Layout title="Wallet" navigate={navigate} currentScreen="wallet">
        <div className="page p-4 flex items-center justify-center min-h-[60vh]">
          <div className="card p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-gold flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Login Required</h3>
            <p className="text-gray-400 mb-4">Please login to access your wallet</p>
            <button 
              onClick={() => navigate('home')}
              className="btn btn-primary"
            >
              Go to Login
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (view === 'deposit' || view === 'withdraw') {
    const isDeposit = view === 'deposit';
    const limits = isDeposit ? depositLimits : withdrawalLimits;
    const maxAmount = isDeposit ? limits.max : Math.min(limits.max, balance);
    
    return (
      <div className="page">
        {/* Header */}
        <div className="header-bar">
          <button 
            onClick={() => {
              setView('main');
              setError(null);
              setSuccess(null);
              setSelectedAmount(null);
              setCustomAmount('');
              setWalletAddress('');
            }}
            className="btn-icon"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="header-title">
            {isDeposit ? 'Deposit' : 'Withdraw'}
          </span>
          <div className="w-5" />
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mx-4 mt-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="mx-4 mt-4 p-3 bg-green-900/30 border border-green-500/30 rounded-lg">
            <p className="text-green-400 text-sm">{success}</p>
          </div>
        )}

        {/* Amount Selection */}
        <div className="p-4">
          <div className="card p-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-400">Select Amount (USDT)</p>
              {!isDeposit && (
                <p className="text-xs text-gray-500">Balance: {balance.toLocaleString()}</p>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              {quickAmounts.map((amount) => {
                const disabled = loading || amount > maxAmount;
                const selected = selectedAmount === amount;
                
                return (
                  <button
                    key={amount}
                    disabled={disabled}
                    className={`py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                      selected
                        ? isDeposit 
                          ? 'bg-green-600 text-white'
                          : 'bg-orange-600 text-white'
                        : disabled
                        ? 'bg-gray-800 opacity-30 text-gray-500'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                  >
                    ${amount}
                  </button>
                );
              })}
            </div>

            {/* Custom Amount Input */}
            <div className="space-y-2">
              <p className="text-xs text-gray-400">
                Min: ${limits.min} • Max: ${maxAmount.toLocaleString()} USDT
              </p>
              <input
                type="number"
                placeholder={`Enter amount (${limits.min}-${maxAmount.toLocaleString()})`}
                value={customAmount}
                min="10"
                max={maxAmount}
                onChange={(e) => {
                  const val = Number(e.target.value) || 0;
                  setCustomAmount(e.target.value);
                  setSelectedAmount(Math.min(val, maxAmount));
                }}
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Wallet Address (Withdrawal only) */}
        {!isDeposit && (
          <div className="px-4 pb-4">
            <div className="card p-4">
              <p className="text-sm text-gray-400 mb-3">USDT Wallet Address (TRC20)</p>
              <input
                type="text"
                placeholder="Enter your USDT wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="input"
              />
              <p className="text-xs text-gray-500 mt-2">
                Make sure this is a valid USDT (TRC20) Address
              </p>
            </div>
          </div>
        )}

        {/* Payment Method (Deposit only) */}
        {isDeposit && (
          <div className="px-4">
            <div className="card p-3 border border-green-500/30 bg-green-500/10">
              <div className="flex items-center gap-3">
                <Bitcoin className="w-5 h-5 text-green-400" />
                <div className="flex-1">
                  <p className="font-semibold text-white">USDT (TRC20)</p>
                  <p className="text-xs text-gray-400">Payment Method</p>
                </div>
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              <div className="space-y-2 mt-2">
                <p className="text-xs text-gray-400">Instant • Low fees</p>
              </div>
            </div>
          </div>
        )}

        {/* Fallback button for non-Telegram */}
        {!isInTelegram && selectedAmount >= limits.min && (isDeposit || walletAddress.trim()) && (
          <div className="p-4">
            <button
              disabled={loading}
              onClick={isDeposit ? handleDeposit : handleWithdrawal}
              className={`w-full py-4 rounded-xl font-bold transition-all ${
                loading 
                  ? 'bg-gray-600 text-gray-300' 
                  : isDeposit
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-orange-600 hover:bg-orange-700 text-white'
              }`}
            >
              {loading 
                ? 'Processing...' 
                : `${isDeposit ? 'Deposit' : 'Withdraw'} ${selectedAmount} USDT`
              }
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <Layout title="Wallet" navigate={navigate} currentScreen="wallet">
      <div className="page">
        {/* Loading State */}
        {loading && (
          <div className="card p-4 text-center">
            <div className="loading-dots mb-2">
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
            </div>
            <p className="text-sm text-gray-400">Loading wallet data...</p>
          </div>
        )}

        {/* Balance Card */}
        <div className="wallet-card">
          <div className="casino-ornament mb-6"></div>
          <div className="space-y-4 p-4">
            <div className="balance-chip flex items-center">
              <div className="coin-icon w-8 h-8 rounded-full bg-[#0088cc] flex items-center justify-center">
                <span className="text-white text-sm">₮</span>
              </div>
              <span className="font-bold text-white text-lg min-w-0 flex-1 truncate">
                USDT Wallet
              </span>
              <button 
                onClick={() => navigate('home')}
                className="w-8 h-8 rounded-full bg-[#0088cc] flex items-center justify-center flex-shrink-0"
              >
                <span className="text-white text-sm">✈</span>
              </button>
            </div>

            <div className="wallet-balance">
              <p className="wallet-balance-label">Balance</p>
              <p className="wallet-balance-amount truncate">{balance.toLocaleString()} USDT</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-6 p-4">
          <div className="flex gap-4 sm:gap-2">
            <button 
              onClick={() => {
                tg?.HapticFeedback?.impactOccurred?.('light');
                setView('deposit');
                setError(null);
                setSuccess(null);
              }}
              className="btn btn-success flex-1 btn-lg font-bold relative overflow-hidden group min-w-0"
              disabled={loading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="flex items-center justify-center gap-1 sm:gap-2 p-1 truncate">
                <span className="flex-shrink-0">💰</span>
                <span className="truncate">Deposit</span>
              </span>
            </button>
            
            <button 
              onClick={() => {
                tg?.HapticFeedback?.impactOccurred?.('light');
                setView('withdraw');
                setError(null);
                setSuccess(null);
              }}
              className="btn btn-secondary flex-1 btn-lg font-bold relative overflow-hidden group min-w-0"
              disabled={loading || balance <= 0}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="flex items-center justify-center gap-1 sm:gap-2 p-1 truncate">
                <span className="flex-shrink-0">💸</span>
                <span className="truncate">Withdraw</span>
              </span>
            </button>
          </div>

          {/* Recent Transactions */}
          <div className="card">
            <div className="p-4 flex items-center justify-between border-b border-gray-800">
              <p className="text-sm font-semibold text-[var(--text-gold)] uppercase tracking-wide">Recent Transactions</p>
              <button 
                onClick={() => loadWalletData()}
                className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors duration-300 flex items-center gap-1"
              >
                <History className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
            
            {transactions.length === 0 ? (
              <div className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-800 flex items-center justify-center">
                  <History className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-400 text-sm">No transactions yet</p>
                <p className="text-gray-500 text-xs mt-1">Your transaction history will appear here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.slice(0, 5).map((tx, i) => {
                  const txType = formatTransactionType(tx.type);
                  const txStatus = formatTransactionStatus(tx.status);
                  const StatusIcon = txStatus.icon;
                  
                  return (
                    <div key={i} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-all duration-300 group">
                      <div className={`w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center border border-gray-700 group-hover:border-gray-600 transition-all duration-300 ${
                        tx.type === 'deposit' 
                          ? 'bg-green-500/20 border-green-500/30 group-hover:border-green-500/60' 
                          : 'bg-red-500/20 border-red-500/30 group-hover:border-red-500/60'
                      }`}>
                        <span className={`text-xl group-hover:scale-110 transition-transform duration-300 ${txType.color}`}>
                          {txType.icon}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-white text-sm capitalize tracking-tight">{txType.text}</p>
                          <StatusIcon className={`w-3 h-3 ${txStatus.color}`} />
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{new Date(tx.created_at).toLocaleDateString()} • {tx.status}</p>
                      </div>
                      
                      <p className={`font-bold text-lg tracking-tight ${tx.type === 'deposit' ? '+' : '-'}${tx.amount.toLocaleString()}`}>
                        {tx.type === 'deposit' ? '+' : '-'}${tx.amount.toLocaleString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Wallet;
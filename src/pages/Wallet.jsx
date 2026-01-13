import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, History, Gift, CreditCard, Bitcoin, Building2, Copy, ExternalLink } from 'lucide-react';
import Layout from '../components/Layout';

const Wallet = ({ user, updateBalance, navigate, walletApi }) => {
  const tg = window.Telegram?.WebApp;
  const [view, setView] = useState('main');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('USDT.TRC20');
  const [walletAddress, setWalletAddress] = useState('');
  const [isInTelegram, setIsInTelegram] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [depositOrder, setDepositOrder] = useState(null);

  const quickAmounts = [100, 500, 1000, 2000, 5000];
  
  const currencies = [
    { code: 'USDT.TRC20', name: 'USDT (TRC20)', network: 'TRON', fee: 0 },
    { code: 'USDT.ERC20', name: 'USDT (ERC20)', network: 'Ethereum', fee: 5 },
    { code: 'USDT.BEP20', name: 'USDT (BEP20)', network: 'BSC', fee: 1 }
  ];

  useEffect(() => {
    // Check if we're in Telegram environment
    const inTelegram = tg && tg.initData && tg.initData.length > 0;
    setIsInTelegram(inTelegram);
    
    if (inTelegram) {
      tg.setHeaderColor('#000000');
      tg.setBackgroundColor('#000000');
    }
    
    // Load transactions on mount
    loadTransactions();
  }, [tg]);

  const loadTransactions = async () => {
    try {
      if (walletApi?.fetchTransactions) {
        const response = await walletApi.fetchTransactions(1, 10);
        setTransactions(response.transactions || []);
      }
    } catch (error) {
      console.error('Failed to load transactions:', error);
    }
  };

  const handleDeposit = async () => {
    if (!selectedAmount || !walletApi?.createDeposit) return;
    
    try {
      setIsLoading(true);
      const response = await walletApi.createDeposit(selectedAmount, selectedCurrency);
      
      setDepositOrder(response);
      setView('deposit-success');
      
      // Refresh transactions
      loadTransactions();
    } catch (error) {
      console.error('Deposit failed:', error);
      tg?.showAlert?.(`Deposit failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdrawal = async () => {
    if (!selectedAmount || !walletAddress || !walletApi?.createWithdrawal) return;
    
    try {
      setIsLoading(true);
      const response = await walletApi.createWithdrawal(selectedAmount, walletAddress, selectedCurrency);
      
      setView('main');
      setSelectedAmount(null);
      setWalletAddress('');
      
      tg?.showAlert?.('Withdrawal request submitted successfully!');
      
      // Refresh transactions and balance
      loadTransactions();
      if (walletApi.refreshWallet) {
        walletApi.refreshWallet();
      }
    } catch (error) {
      console.error('Withdrawal failed:', error);
      tg?.showAlert?.(`Withdrawal failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    tg?.showAlert?.('Copied to clipboard!');
  };

  useEffect(() => {
    if (!isInTelegram || !tg?.MainButton) return;

    if (view === 'deposit' && selectedAmount) {
      tg.MainButton.setText(`Deposit ${selectedAmount} USDT`);
      tg.MainButton.color = '#4caf50';
      tg.MainButton.textColor = '#ffffff';
      tg.MainButton.show();
      tg.MainButton.onClick(handleDeposit);
    } else if (view === 'withdraw' && selectedAmount && walletAddress) {
      tg.MainButton.setText(`Withdraw ${selectedAmount} USDT`);
      tg.MainButton.color = '#ff6b35';
      tg.MainButton.textColor = '#ffffff';
      tg.MainButton.show();
      tg.MainButton.onClick(handleWithdrawal);
    } else {
      tg.MainButton.hide();
    }

    return () => {
      tg.MainButton.offClick(handleDeposit);
      tg.MainButton.offClick(handleWithdrawal);
    };
  }, [view, selectedAmount, walletAddress, selectedCurrency, tg, isInTelegram]);

  // Deposit Success View
  if (view === 'deposit-success' && depositOrder) {
    return (
      <Layout 
        title="Deposit" 
        user={user} 
        showBack={true} 
        onBack={() => setView('main')}
        navigate={navigate}
        currentScreen="wallet"
      >
        <div className="page space-y-6">
          <div className="p-4">
            <div className="card p-6 text-center">
              <div className="text-6xl mb-4">💰</div>
              <h2 className="text-xl font-bold text-white mb-2">Deposit Order Created</h2>
              <p className="text-gray-400 mb-6">
                Send exactly {selectedAmount} USDT to the address below
              </p>
              
              <div className="bg-white/5 rounded-lg p-4 mb-4">
                <div className="text-sm text-gray-400 mb-2">Payment Address</div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-sm bg-black/30 p-2 rounded text-white break-all">
                    {depositOrder.payment_address}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(depositOrder.payment_address)}
                    className="p-2 bg-amber-600 rounded hover:bg-amber-700"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 mb-4">
                <div className="text-sm text-gray-400 mb-2">Amount</div>
                <div className="text-2xl font-bold text-gradient-emerald">
                  {selectedAmount} USDT
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <div className="text-sm text-gray-400 mb-2">Network</div>
                <div className="text-white font-medium">
                  {currencies.find(c => c.code === selectedCurrency)?.network}
                </div>
              </div>

              {depositOrder.payment_url && (
                <button 
                  onClick={() => window.open(depositOrder.payment_url, '_blank')}
                  className="btn btn-primary w-full mb-4"
                >
                  <ExternalLink size={16} />
                  Open Payment Page
                </button>
              )}

              <button 
                onClick={() => setView('main')}
                className="btn btn-secondary w-full"
              >
                Back to Wallet
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Deposit/Withdraw Form Views
  if (view === 'deposit' || view === 'withdraw') {
    const isDeposit = view === 'deposit';
    const selectedCurrencyData = currencies.find(c => c.code === selectedCurrency);
    
    return (
      <Layout 
        title={isDeposit ? 'Deposit' : 'Withdraw'} 
        user={user} 
        showBack={true} 
        onBack={() => setView('main')}
        navigate={navigate}
        currentScreen="wallet"
      >
        <div className="page space-y-6">
          {/* Currency Selection */}
          <div className="p-4">
            <div className="card p-4">
              <p className="text-sm text-gray-400 mb-3">Select Currency</p>
              <div className="space-y-2">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => setSelectedCurrency(currency.code)}
                    className={`w-full p-3 rounded-lg flex items-center justify-between transition-all ${
                      selectedCurrency === currency.code
                        ? 'bg-amber-600 text-white'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Bitcoin size={20} />
                      <div className="text-left">
                        <div className="font-medium">{currency.name}</div>
                        <div className="text-xs opacity-80">{currency.network}</div>
                      </div>
                    </div>
                    <div className="text-xs">
                      Fee: {currency.fee} USDT
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Amount Selection */}
          <div className="p-4">
            <div className="card p-4">
              <p className="text-sm text-gray-400 mb-3">Select Amount</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    disabled={!isDeposit && amount > (user?.balance || 0)}
                    className={`py-3 rounded-xl font-bold text-sm transition-all ${
                      selectedAmount === amount
                        ? isDeposit 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-red-600 text-white'
                        : !isDeposit && amount > (user?.balance || 0)
                        ? 'bg-white/5 opacity-30 text-gray-500'
                        : 'bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    {amount} USDT
                  </button>
                ))}
              </div>

              <input
                type="number"
                placeholder="Enter custom amount"
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400"
                onChange={(e) => {
                  const val = Number(e.target.value) || 0;
                  setSelectedAmount(isDeposit ? val : Math.min(val, user?.balance || 0));
                }}
              />
            </div>
          </div>

          {/* Withdrawal Address */}
          {!isDeposit && (
            <div className="p-4">
              <div className="card p-4">
                <p className="text-sm text-gray-400 mb-3">Withdrawal Address</p>
                <input
                  type="text"
                  placeholder={`Enter ${selectedCurrencyData?.network} address`}
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400"
                />
              </div>
            </div>
          )}

          {/* Fallback button for non-Telegram */}
          {!isInTelegram && selectedAmount && (isDeposit || walletAddress) && (
            <div className="p-4">
              <button 
                onClick={isDeposit ? handleDeposit : handleWithdrawal}
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-bold ${
                  isDeposit 
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                    : 'bg-red-600 text-white hover:bg-red-700'
                } disabled:opacity-50`}
              >
                {isLoading ? 'Processing...' : `${isDeposit ? 'Create Deposit' : 'Submit Withdrawal'}`}
              </button>
            </div>
          )}
        </div>
      </Layout>
    );
  }

  // Main Wallet View
  return (
    <Layout 
      title="My Wallet" 
      user={user} 
      showBack={true} 
      onBack={() => navigate('home')}
      navigate={navigate}
      currentScreen="wallet"
    >
      <div className="page space-y-6">
        {/* Balance Card */}
        <div className="p-4">
          <div className="wallet-card">
            <p className="wallet-balance-label">USDT Balance:</p>
            <p className="wallet-balance">{user?.balance?.toLocaleString() || '0.00'}</p>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => {
                  tg?.HapticFeedback?.impactOccurred('light');
                  setView('deposit');
                }}
                className="btn-primary flex-1"
              >
                Deposit
              </button>
              <button 
                onClick={() => {
                  tg?.HapticFeedback?.impactOccurred('light');
                  setView('withdraw');
                }}
                className="btn-secondary flex-1"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-4">
          <button 
            onClick={() => navigate('transactions')}
            className="menu-item w-full rounded-t-2xl"
          >
            <div className="menu-icon">
              <History className="w-5 h-5 text-gray-400" />
            </div>
            <span className="flex-1 text-left font-semibold text-white">Transaction History</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="menu-item w-full rounded-b-2xl">
            <div className="menu-icon">
              <Gift className="w-5 h-5 text-amber-400" />
            </div>
            <span className="flex-1 text-left font-semibold text-white">My Bonuses</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Recent Transactions */}
        <div className="p-4">
          <p className="text-sm text-gray-400 mb-3">Recent Activity</p>
          <div className="card">
            {transactions.length > 0 ? (
              transactions.slice(0, 5).map((tx, i) => (
                <div key={i} className="game-list-item">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    tx.type === 'deposit' ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    <span className="text-lg">
                      {tx.type === 'deposit' ? '💵' : '💸'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white text-sm capitalize">{tx.type}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(tx.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${tx.type === 'deposit' ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.type === 'deposit' ? '+' : '-'}{tx.amount} USDT
                    </p>
                    <p className="text-xs text-gray-400 capitalize">{tx.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <History size={48} className="mx-auto mb-4 opacity-50" />
                <p>No transactions yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Wallet;
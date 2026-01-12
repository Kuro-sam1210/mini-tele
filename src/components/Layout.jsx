import { useState, useEffect } from 'react';
import { ChevronLeft, X, Home, Gift, Headphones, Download, User, Globe, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const Layout = ({ children, title, showBack = false, onBack, user, navigate, currentScreen = 'home' }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { currentLanguage, languages, changeLanguage } = useLanguage();
  const { fetchBalance, balanceLoading } = useAuth();
  const tg = window.Telegram?.WebApp;

  useEffect(() => {
    if (tg) {
      // Only set colors if supported
      if (tg.setHeaderColor) {
        tg.setHeaderColor('#0a0a15');
      }
      if (tg.setBackgroundColor) {
        tg.setBackgroundColor('#0a0a15');
      }
    }
  }, [tg]);

  const navigation = [
    { id: 'home', label: 'Home', icon: Home, screen: 'home' },
    { id: 'promotion', label: 'Promotion', icon: Gift, screen: 'promotion' },
    { id: 'customer', label: 'Customer', icon: Headphones, screen: 'customer' },
    { id: 'download', label: 'Download', icon: Download, screen: 'download' },
    { id: 'account', label: 'Account', icon: User, screen: 'profile' },
  ];

  const handleNavigation = (screen) => {
    setShowMobileMenu(false);
    if (navigate) {
      navigate(screen);
    }
  };

  const handleDeposit = () => {
    if (navigate) {
      navigate('wallet');
    }
  };

  const handleRefreshBalance = async () => {
    if (fetchBalance) {
      await fetchBalance();
    }
  };

  return (
    <div className="app">
      {/* Top Header */}
      <header className="top-header">
        <div className="top-header-content">
          {/* Logo */}
          <div className="header-logo">
            <span className="logo-text-gold">Golden Age Casino</span>
          </div>

          {/* Balance & Actions */}
          <div className="header-actions">
            {/* Balance Display */}
            {user && (
              <div className="balance-display">
                <div className="balance-icon">₮</div>
                <span className="balance-amount">
                  {balanceLoading ? '...' : (user.balance !== undefined ? user.balance.toFixed(2) : '0.00')}
                </span>
                <button 
                  className="balance-refresh-btn"
                  onClick={handleRefreshBalance}
                  disabled={balanceLoading}
                  title="Refresh balance"
                >
                  <RefreshCw size={12} className={balanceLoading ? 'animate-spin' : ''} />
                </button>
              </div>
            )}
            
            {/* Refresh Icon */}
            <button className="icon-button" onClick={() => window.location.reload()}>
              <RefreshCw size={18} />
            </button>

            {/* Deposit Button */}
            <button className="deposit-button" onClick={handleDeposit}>
              Deposit
            </button>

            {/* Language Selector */}
            <button 
              className="icon-button" 
              onClick={() => {
                const currentIndex = languages.findIndex(l => l.code === currentLanguage);
                const nextIndex = (currentIndex + 1) % languages.length;
                changeLanguage(languages[nextIndex].code);
              }}
            >
              <Globe size={18} />
            </button>
          </div>
        </div>

        {/* Back Button (if needed) */}
        {showBack && (
          <button
            onClick={onBack}
            className="back-button"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
        )}
      </header>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="bottom-nav-container">
          {navigation.map((item) => {
            const isActive = currentScreen === item.screen || 
              (item.screen === 'profile' && currentScreen === 'profile');
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.screen)}
                className={`bottom-nav-item ${isActive ? 'active' : ''}`}
              >
                <item.icon 
                  size={22} 
                  className={isActive ? 'active-icon' : 'inactive-icon'} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className={`nav-label ${isActive ? 'active-label' : 'inactive-label'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;

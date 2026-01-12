import { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { ApiProvider, useApi } from './contexts/ApiContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastContainer, useToast } from './components/Toast';
import LandingPage from './pages/Landing';
import Home from './pages/Home';
import Game from './pages/Game';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Promotion from './pages/Promotion';
import Customer from './pages/Customer';
import Download from './pages/Download';
import './App.css';

function AppContent() {
  const [screen, setScreen] = useState('landing');
  const [screenData, setScreenData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const tg = window.Telegram?.WebApp;
  
  // Use API and Auth contexts
  const { 
    isConnected, 
    createDeposit,
    createWithdrawal
  } = useApi();
  
  const {
    user,
    isAuthenticated,
    loginWithTelegram,
    loginWithDemo
  } = useAuth();

  // Initialize Telegram WebApp
  useEffect(() => {
    let initializationDone = false;
    
    const initializeApp = async () => {
      if (initializationDone) return;
      initializationDone = true;
      
      // Clear any existing toasts first
      toast.clearAll();
      
      if (tg) {
        tg.ready();
        tg.expand();
        
        // Debug Telegram WebApp data
        console.log('🔍 Telegram WebApp Debug Info:');
        console.log('- WebApp object:', tg);
        console.log('- initData:', tg.initData);
        console.log('- initDataUnsafe:', tg.initDataUnsafe);
        console.log('- user:', tg.initDataUnsafe?.user);
        console.log('- platform:', tg.platform);
        console.log('- version:', tg.version);
        
        // Set Golden Age Casino theme colors (only if supported)
        if (tg.setHeaderColor) {
          tg.setHeaderColor('#000000');
        }
        if (tg.setBackgroundColor) {
          tg.setBackgroundColor('#000000');
        }
        
        // Get user from Telegram or use API user
        if (tg.initDataUnsafe?.user && !user) {
          const tgUser = tg.initDataUnsafe.user;
          console.log('🔍 Telegram user detected:', tgUser);
          console.log('🔍 Telegram initData:', tg.initData);
          
          // Try to login with Telegram credentials first
          let loginResult = await loginWithTelegram();
          
          // If Telegram login fails, fallback to demo
          if (!loginResult.success) {
            console.warn('Telegram login failed, trying demo login:', loginResult.error);
            loginResult = await loginWithDemo();
          }
          
          if (loginResult.success) {
            toast.success(`Welcome to Golden Age Casino, ${tgUser.first_name}!`);
            // Auto-navigate to home if user is logged in via Telegram
            setScreen('home');
          } else {
            toast.error('Login failed. Please try again.');
            // Stay on landing page if login fails
          }
        } else if (tg.initDataUnsafe?.user && user) {
          // User already logged in, just navigate to home
          console.log('🔍 User already authenticated, navigating to home');
          setScreen('home');
        } else {
          // No Telegram user detected, try demo login for testing
          console.log('🔍 No Telegram user detected, trying demo login');
          const loginResult = await loginWithDemo();
          if (loginResult.success) {
            toast.success('Welcome to Golden Age Casino!');
            setScreen('home');
          }
        }
        }
      }
      
      setIsLoading(false);
    };

    // Only initialize when contexts are ready
    if (isLoading) {
      initializeApp();
    }
  }, [isLoading, isConnected, user, loginWithTelegram, loginWithDemo, toast, tg]);

  // Handle Telegram back button
  useEffect(() => {
    if (!tg?.BackButton) return;

    const handleBack = () => {
      // Only use haptic feedback if supported
      if (tg?.HapticFeedback?.impactOccurred) {
        tg.HapticFeedback.impactOccurred('light');
      }
      if (screen === 'game' || screen === 'wallet' || screen === 'profile' || 
          screen === 'promotion' || screen === 'customer' || screen === 'download') {
        navigate('home');
      } else if (screen === 'home') {
        navigate('landing');
      }
      setScreenData(null);
    };

    if (screen !== 'landing' && tg.BackButton.show) {
      tg.BackButton.show();
      tg.BackButton.onClick(handleBack);
    } else if (tg.BackButton.hide) {
      tg.BackButton.hide();
    }

    return () => {
      if (tg.BackButton.offClick) {
        tg.BackButton.offClick(handleBack);
      }
    };
  }, [screen, tg]);

  const navigate = (newScreen, data = null) => {
    // Only use haptic feedback if supported
    if (tg?.HapticFeedback?.impactOccurred) {
      tg.HapticFeedback.impactOccurred('light');
    }
    setScreen(newScreen);
    setScreenData(data);
  };

  const updateBalance = async (amount) => {
    if (user && isConnected) {
      // Try to update balance via API
      try {
        if (amount > 0) {
          await createDeposit(amount);
        } else if (amount < 0) {
          await createWithdrawal(Math.abs(amount), 'dummy-address');
        }
      } catch (error) {
        console.warn('Balance update via API failed, using local update');
      }
    }
    
    // Show toast notifications for balance changes
    if (amount > 0) {
      toast.success(`+${amount.toLocaleString()} USDT added to your balance!`);
    } else if (amount < 0) {
      toast.warning(`-${Math.abs(amount).toLocaleString()} USDT deducted from balance`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-gold flex items-center justify-center glow-gold overflow-hidden">
            <img 
              src="/casinologo.jpg" 
              alt="Golden Age Casino"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="loading-dots mb-4">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
          <p className="text-gray-400">Initializing Golden Age Casino...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {screen === 'landing' && (
        <LandingPage navigate={navigate} />
      )}
      {screen === 'home' && (
        <Home user={user} navigate={navigate} />
      )}
      {screen === 'game' && (
        <Game 
          user={user} 
          gameData={screenData}
          updateBalance={updateBalance}
          navigate={navigate}
        />
      )}
      {screen === 'wallet' && (
        <Wallet 
          navigate={navigate}
        />
      )}
      {screen === 'profile' && (
        <Profile user={user} navigate={navigate} />
      )}
      {screen === 'promotion' && (
        <Promotion navigate={navigate} />
      )}
      {screen === 'customer' && (
        <Customer navigate={navigate} />
      )}
      {screen === 'download' && (
        <Download navigate={navigate} />
      )}
      
      {/* Toast Notifications */}
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
    </div>
  );
}

function App() {
  return (
    <ApiProvider>
      <AuthProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </AuthProvider>
    </ApiProvider>
  );
}

export default App;
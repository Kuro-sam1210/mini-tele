import { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import LandingPage from './pages/Landing';
import Home from './pages/Home';
import Game from './pages/Game';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import './App.css';

function App() {
  const [screen, setScreen] = useState('landing');
  const [screenData, setScreenData] = useState(null);
  const [user, setUser] = useState(null);
  const tg = window.Telegram?.WebApp;

  // Initialize Telegram WebApp
  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
      
      // Force dark theme
      tg.setHeaderColor('#09090b');
      tg.setBackgroundColor('#09090b');
      
      // Get user from Telegram
      if (tg.initDataUnsafe?.user) {
        const tgUser = tg.initDataUnsafe.user;
        setUser({
          id: tgUser.id,
          name: `${tgUser.first_name} ${tgUser.last_name || ''}`.trim(),
          username: tgUser.username || `user${tgUser.id}`,
          avatar: tgUser.photo_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${tgUser.id}`,
          balance: 2368.50,
        });
        // Auto-navigate to home if user is logged in via Telegram
        setScreen('home');
      }
    }
    
    // Mock user for development outside Telegram
    if (!tg?.initDataUnsafe?.user) {
      setUser({
        id: 123456789,
        name: 'Player',
        username: 'player',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=player',
        balance: 2368.50,
      });
    }
  }, []);

  // Handle Telegram back button
  useEffect(() => {
    if (!tg) return;

    const handleBack = () => {
      tg.HapticFeedback?.impactOccurred('light');
      if (screen === 'game' || screen === 'wallet' || screen === 'profile') {
        setScreen('home');
      } else if (screen === 'home') {
        setScreen('landing');
      }
      setScreenData(null);
    };

    if (screen !== 'landing') {
      tg.BackButton.show();
      tg.BackButton.onClick(handleBack);
    } else {
      tg.BackButton.hide();
    }

    return () => {
      tg.BackButton.offClick(handleBack);
    };
  }, [screen, tg]);

  const navigate = (newScreen, data = null) => {
    tg?.HapticFeedback?.impactOccurred('light');
    setScreen(newScreen);
    setScreenData(data);
  };

  const updateBalance = (amount) => {
    setUser(prev => prev ? { ...prev, balance: prev.balance + amount } : prev);
  };

  return (
    <LanguageProvider>
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
            user={user} 
            updateBalance={updateBalance}
            navigate={navigate}
          />
        )}
        {screen === 'profile' && (
          <Profile user={user} navigate={navigate} />
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;

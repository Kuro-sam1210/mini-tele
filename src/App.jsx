import { useState, useEffect, useRef } from 'react';
import { RouterProvider } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ApiProvider } from './contexts/ApiContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { WalletProvider } from './contexts/WalletContext';
import { LayoutProvider } from './contexts/LayoutContext';
import { ToastProvider, useToast } from './contexts/ToastContext';
import router from './router';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const initializedRef = useRef(false);

  const toast = useToast();
  const { user, loginWithDemo } = useAuth();

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const tg = window.Telegram?.WebApp;
    const isInTelegram = !!tg?.initData;

    if (isInTelegram) {
      tg.openLink(window.location.href);
      return;
    }

    const init = async () => {
      toast.clearAll();

      if (tg) {
        tg.ready();
        tg.expand();

        tg.setHeaderColor?.('#000000');
        tg.setBackgroundColor?.('#000000');

        if (tg.initDataUnsafe?.user && !user) {
          const result = await loginWithDemo();
          if (result?.success) {
            toast.success(
              `Welcome to Golden Age Club, ${tg.initDataUnsafe.user.first_name}!`
            );
          }
        }
      }

      setIsLoading(false);
    };

    init();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-gold flex items-center justify-center glow-gold overflow-hidden">
            <img
              src="/casinologo.jpg"
              alt="Golden Age Cash"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="loading-dots mb-4">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
          <p className="text-gray-400">Initializing Golden Age Club...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app min-h-screen bg-gradient-primary">
      <LayoutProvider>
        <RouterProvider router={router} />
      </LayoutProvider>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ApiProvider>
        <LanguageProvider>
          <ToastProvider>
            <WalletProvider>
              <AppContent />
            </WalletProvider>
          </ToastProvider>
        </LanguageProvider>
      </ApiProvider>
    </AuthProvider>
  );
}

export default App;


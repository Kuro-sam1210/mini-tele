import React, { useState, useEffect } from 'react';

const LoginPage = ({ onNavigate, onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [telegramUser, setTelegramUser] = useState(null);

  // Simulate Telegram WebApp initialization
  useEffect(() => {
    // In a real app, this would be: window.Telegram.WebApp.initDataUnsafe
    const mockTelegramData = {
      user: {
        id: 123456789,
        first_name: "John",
        last_name: "Doe",
        username: "johndoe",
        photo_url: "https://via.placeholder.com/100"
      }
    };
    
    // Simulate loading delay
    setTimeout(() => {
      setTelegramUser(mockTelegramData.user);
    }, 1000);
  }, []);

  const handleTelegramLogin = async () => {
    setIsLoading(true);
    
    // Simulate API call to authenticate with backend
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful login
      const userData = {
        id: telegramUser.id,
        name: `${telegramUser.first_name} ${telegramUser.last_name}`,
        username: telegramUser.username,
        avatar: telegramUser.photo_url,
        balance: 1000.00,
        isAgent: false
      };
      
      onLogin(userData);
      onNavigate('home');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <button 
            onClick={() => onNavigate('landing')}
            className="absolute top-6 left-6 text-white hover:text-yellow-400 transition-colors"
          >
            ← Back
          </button>
          
          <h1 className="text-3xl font-bold mb-2">🎰 Welcome Back</h1>
          <p className="text-lg opacity-80">Sign in to continue playing</p>
        </div>

        {/* Login Card */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          {!telegramUser ? (
            // Loading Telegram Data
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
              <p className="text-lg mb-2">Connecting to Telegram...</p>
              <p className="text-sm opacity-60">Please wait while we verify your identity</p>
            </div>
          ) : (
            // Telegram User Loaded
            <div className="text-center">
              {/* User Avatar */}
              <div className="mb-6">
                <img 
                  src={telegramUser.photo_url} 
                  alt="Profile"
                  className="w-20 h-20 rounded-full mx-auto border-4 border-yellow-400 shadow-lg"
                />
              </div>

              {/* User Info */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-1">
                  {telegramUser.first_name} {telegramUser.last_name}
                </h2>
                <p className="text-sm opacity-70">@{telegramUser.username}</p>
                <p className="text-xs opacity-50 mt-2">ID: {telegramUser.id}</p>
              </div>

              {/* Login Button */}
              <button
                onClick={handleTelegramLogin}
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 ${
                  isLoading 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-xl transform hover:scale-105'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  '🚀 Continue with Telegram'
                )}
              </button>

              {/* Security Note */}
              <div className="mt-6 p-4 bg-green-500 bg-opacity-20 rounded-lg border border-green-400 border-opacity-30">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-green-400 mr-2">🔒</span>
                  <span className="text-sm font-medium">Secure Login</span>
                </div>
                <p className="text-xs opacity-70">
                  Your Telegram account is automatically verified. No passwords needed.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white bg-opacity-5 rounded-lg p-3">
            <div className="text-lg mb-1">⚡</div>
            <p className="text-xs opacity-70">Instant</p>
          </div>
          <div className="bg-white bg-opacity-5 rounded-lg p-3">
            <div className="text-lg mb-1">🔐</div>
            <p className="text-xs opacity-70">Secure</p>
          </div>
          <div className="bg-white bg-opacity-5 rounded-lg p-3">
            <div className="text-lg mb-1">🎮</div>
            <p className="text-xs opacity-70">Ready</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
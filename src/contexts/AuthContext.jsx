/**
 * Authentication Context for Golden Age USDT Wallet
 * Manages Telegram-based authentication and JWT tokens
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import authApi from '../api/auth';
import walletApi from '../api/wallet';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [balanceLoading, setBalanceLoading] = useState(false);

  // Check for existing authentication on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Fetch real-time balance from API
  const fetchBalance = async () => {
    // Check if we have a token instead of relying on isAuthenticated state
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.warn('⚠️ Cannot fetch balance: no access token');
      return;
    }
    
    setBalanceLoading(true);
    try {
      const balanceData = await walletApi.getBalance();
      console.log('📡 Balance API response:', balanceData);
      
      // Handle different response structures
      const balance = balanceData?.balance ?? balanceData?.data?.balance ?? balanceData;
      
      if (balance !== undefined && balance !== null) {
        const balanceValue = typeof balance === 'number' ? balance : parseFloat(balance);
        if (!isNaN(balanceValue)) {
          setUser(prev => ({ ...prev, balance: balanceValue }));
          console.log('✅ Balance updated from API:', balanceValue);
        } else {
          console.warn('⚠️ Invalid balance value:', balance);
        }
      } else {
        console.warn('⚠️ Balance not found in API response');
      }
    } catch (err) {
      console.warn('⚠️ Failed to fetch balance from API:', err.message);
      // Set balance to 0 if fetch fails
      setUser(prev => ({ ...prev, balance: 0 }));
    } finally {
      setBalanceLoading(false);
    }
  };

  // Auto-refresh balance when user becomes authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchBalance();
    }
  }, [isAuthenticated]);

  const checkAuthStatus = async () => {
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('access_token');
      
      if (token) {
        // Try to get current user with existing token
        const currentUser = await authApi.getCurrentUser();
        
        if (currentUser) {
          // Remove balance from user object - we'll fetch it from wallet API
          const { balance, ...userWithoutBalance } = currentUser;
          setUser(userWithoutBalance);
          setIsAuthenticated(true);
          console.log('✅ User authenticated from existing token');
          
          // Fetch real-time balance from wallet API
          await fetchBalance();
        } else {
          // Token is invalid, remove it
          localStorage.removeItem('access_token');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.warn('⚠️ Auth check failed:', err.message);
      // Remove invalid token
      localStorage.removeItem('access_token');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithTelegram = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get Telegram WebApp initData
      const tg = window.Telegram?.WebApp;
      if (!tg || !tg.initData) {
        throw new Error('Telegram WebApp not available or no initData');
      }

      const result = await authApi.login(tg.initData);
      
      if (result && result.user && result.access_token) {
        // Remove balance from user object - we'll fetch it from wallet API
        const { balance, ...userWithoutBalance } = result.user;
        setUser(userWithoutBalance);
        setIsAuthenticated(true);
        
        // Store JWT token in localStorage
        localStorage.setItem('access_token', result.access_token);
        
        console.log('✅ User logged in with Telegram successfully');
        
        // Fetch real-time balance from wallet API
        await fetchBalance();
        
        return { success: true, user: userWithoutBalance };
      } else {
        const errorMsg = result?.message || 'Telegram login failed';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (err) {
      const errorMsg = err?.message || 'Telegram login failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithTestData = async (telegramId = 123456789) => {
    setIsLoading(true);
    setError(null);

    try {
      // For testing mode, send telegram_id as init_data
      const result = await authApi.login(telegramId.toString());
      
      if (result && result.user && result.access_token) {
        // Remove balance from user object - we'll fetch it from wallet API
        const { balance, ...userWithoutBalance } = result.user;
        setUser(userWithoutBalance);
        setIsAuthenticated(true);
        
        // Store JWT token in localStorage
        localStorage.setItem('access_token', result.access_token);
        
        console.log('✅ User logged in with test data successfully');
        
        // Fetch real-time balance from wallet API
        await fetchBalance();
        
        return { success: true, user: userWithoutBalance };
      } else {
        const errorMsg = result?.message || 'Test login failed';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (err) {
      const errorMsg = err?.message || 'Test login failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const result = await authApi.refreshToken();
      
      if (result && result.access_token) {
        localStorage.setItem('access_token', result.access_token);
        if (result.user) {
          setUser(result.user);
        }
        console.log('✅ Token refreshed successfully');
        return { success: true };
      }
      
      return { success: false, error: 'Token refresh failed' };
    } catch (err) {
      console.error('❌ Token refresh failed:', err);
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    
    try {
      // No logout endpoint in the API, just clear local state
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('access_token');
      console.log('✅ User logged out successfully');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  // Legacy method for backward compatibility
  const loginWithDemo = async () => {
    // Use test data login for demo purposes
    return await loginWithTestData();
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    balanceLoading,
    
    // Methods
    loginWithTelegram,
    loginWithTestData,
    loginWithDemo, // Legacy method
    refreshToken,
    logout,
    updateUser,
    clearError,
    checkAuthStatus,
    fetchBalance
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
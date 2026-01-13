import { useState, useCallback } from 'react';
import walletApi from '../api/wallet';

/**
 * Custom hook for wallet operations
 * Handles balance, deposits, withdrawals, and transactions
 */
export const useWallet = (onBalanceUpdate) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch current balance
   */
  const fetchBalance = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await walletApi.getBalance();
      const newBalance = response.balance || 0;
      
      setBalance(newBalance);
      
      // Notify parent component of balance update
      if (onBalanceUpdate) {
        onBalanceUpdate(newBalance);
      }
      
      return newBalance;
    } catch (error) {
      console.error('❌ Fetch balance error:', error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [onBalanceUpdate]);

  /**
   * Create deposit order
   */
  const createDeposit = useCallback(async (amount, currency = 'USDT.TRC20') => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await walletApi.createDeposit(amount, currency);
      
      console.log('✅ Deposit order created:', response);
      
      // Refresh transactions after creating deposit
      fetchTransactions();
      
      return response;
    } catch (error) {
      console.error('❌ Create deposit error:', error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Create withdrawal request
   */
  const createWithdrawal = useCallback(async (amount, walletAddress, currency = 'USDT.TRC20') => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await walletApi.createWithdrawal(amount, walletAddress, currency);
      
      console.log('✅ Withdrawal request created:', response);
      
      // Optimistically update balance (subtract amount)
      const newBalance = balance - amount;
      setBalance(newBalance);
      
      if (onBalanceUpdate) {
        onBalanceUpdate(newBalance);
      }
      
      // Refresh transactions after creating withdrawal
      fetchTransactions();
      
      return response;
    } catch (error) {
      console.error('❌ Create withdrawal error:', error);
      setError(error.message);
      
      // Revert optimistic balance update on error
      fetchBalance();
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [balance, onBalanceUpdate, fetchBalance]);

  /**
   * Fetch transaction history
   */
  const fetchTransactions = useCallback(async (page = 1, limit = 20, type = null) => {
    try {
      setError(null);
      
      const response = await walletApi.getTransactions(page, limit, type);
      
      if (page === 1) {
        setTransactions(response.transactions || []);
      } else {
        // Append to existing transactions for pagination
        setTransactions(prev => [...prev, ...(response.transactions || [])]);
      }
      
      return response;
    } catch (error) {
      console.error('❌ Fetch transactions error:', error);
      setError(error.message);
      throw error;
    }
  }, []);

  /**
   * Get specific transaction details
   */
  const fetchTransaction = useCallback(async (transactionId) => {
    try {
      setError(null);
      
      const response = await walletApi.getTransaction(transactionId);
      
      // Update transaction in local state if it exists
      setTransactions(prev => 
        prev.map(tx => 
          tx.merchant_order_id === transactionId ? { ...tx, ...response } : tx
        )
      );
      
      return response;
    } catch (error) {
      console.error('❌ Fetch transaction error:', error);
      setError(error.message);
      throw error;
    }
  }, []);

  /**
   * Get available deposit currencies
   */
  const getDepositCurrenciesData = useCallback(() => {
    return walletApi.getDepositCurrencies();
  }, []);

  /**
   * Get available withdrawal currencies
   */
  const getWithdrawalCurrenciesData = useCallback(() => {
    return walletApi.getWithdrawalCurrencies();
  }, []);

  /**
   * Refresh all wallet data
   */
  const refreshWallet = useCallback(async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        fetchBalance(),
        fetchTransactions()
      ]);
    } catch (error) {
      console.error('❌ Refresh wallet error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchBalance, fetchTransactions]);

  return {
    // State
    balance,
    transactions,
    isLoading,
    error,
    
    // Actions
    fetchBalance,
    createDeposit,
    createWithdrawal,
    fetchTransactions,
    fetchTransaction,
    refreshWallet,
    
    // Utilities
    getDepositCurrencies: getDepositCurrenciesData,
    getWithdrawalCurrencies: getWithdrawalCurrenciesData
  };
};
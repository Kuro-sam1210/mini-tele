# API Integration Guide

This document explains how the Telegram Mini App frontend integrates with the FastAPI backend server.

## 🔧 Setup Instructions

### 1. Environment Configuration

Copy the environment file and configure your API URL:

```bash
cp .env.example .env
```

Edit `.env` and set your server URL:
```env
VITE_API_BASE_URL=http://localhost:8000
```

### 2. Server Requirements

Make sure your FastAPI server is running with the following configuration:

**Required Environment Variables in Server:**
```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
MONGODB_URL=mongodb://localhost:27017/casino_db
JWT_SECRET_KEY=your_jwt_secret_key
CCPAYMENT_APP_ID=your_ccpayment_app_id
CCPAYMENT_APP_SECRET=your_ccpayment_secret
TESTING_MODE=true  # Set to false in production
ALLOWED_ORIGINS=http://localhost:5173,https://your-telegram-app-domain.com
```

### 3. CORS Configuration

Ensure your server allows requests from your frontend domain. Update `ALLOWED_ORIGINS` in your server's `.env` file.

## 🔐 Authentication Flow

### 1. Telegram WebApp Authentication

The app automatically authenticates users using Telegram WebApp `initData`:

```javascript
// In App.jsx
if (tg.initData && tg.initData.length > 0) {
  const response = await login(tg.initData);
  // User is now authenticated
}
```

### 2. JWT Token Management

- Access tokens are stored in `localStorage`
- Automatic token refresh on 401 errors
- Logout on refresh failure

### 3. Development Mode

For testing outside Telegram:
- Set `TESTING_MODE=true` in server
- App will use mock authentication with telegram_id `123456789`

## 💰 Wallet Integration

### Available Operations

1. **Get Balance**
   ```javascript
   const balance = await walletApi.getBalance();
   ```

2. **Create Deposit**
   ```javascript
   const deposit = await walletApi.createDeposit(amount, 'USDT.TRC20');
   // Returns: { transaction_id, payment_url, payment_address }
   ```

3. **Create Withdrawal**
   ```javascript
   const withdrawal = await walletApi.createWithdrawal(amount, walletAddress, 'USDT.TRC20');
   // Returns: { transaction_id, status }
   ```

4. **Get Transactions**
   ```javascript
   const transactions = await walletApi.getTransactions(page, limit, type);
   ```

### Supported Currencies

- `USDT.TRC20` (TRON network)
- `USDT.ERC20` (Ethereum network)  
- `USDT.BEP20` (BSC network)

### Deposit Limits
- Minimum: 10 USDT
- Maximum: 100,000 USDT

### Withdrawal Limits
- Minimum: 10 USDT
- Maximum: 50,000 USDT

## 🎮 Game Integration

Currently, games update balance locally. To integrate with real game APIs:

1. Create game API endpoints in your server
2. Update `updateBalance` function in `App.jsx`
3. Call server APIs for game results

Example implementation:
```javascript
const updateBalance = async (amount) => {
  try {
    // Call your game API
    await gameApi.updateBalance(amount);
    
    // Update local state
    updateUserBalance(newBalance);
    
    // Show notification
    toast.success(`Balance updated: ${amount} USDT`);
  } catch (error) {
    toast.error('Failed to update balance');
  }
};
```

## 🔄 State Management

### Authentication State
- Managed by `useAuth` hook
- Automatic initialization on app load
- Persistent login state

### Wallet State  
- Managed by `useWallet` hook
- Real-time balance updates
- Transaction history caching

## 🚨 Error Handling

### API Errors
- Network errors show user-friendly messages
- 401 errors trigger automatic token refresh
- Server errors display detailed messages

### Telegram Integration
- Graceful fallback for non-Telegram environments
- Mock data for development
- Proper error messages for missing initData

## 📱 Telegram Features

### WebApp Integration
- Automatic theme colors
- Back button handling
- Haptic feedback
- Main button for actions

### Payment Flow
1. User selects deposit amount
2. App creates deposit order via API
3. User is shown payment address/URL
4. Payment processed by CCPayment
5. Webhook updates balance automatically

## 🔧 Development Tips

### Testing Deposits
1. Set `TESTING_MODE=true` in server
2. Use mock payment provider
3. Deposits will be automatically "completed"

### Testing Withdrawals
1. Ensure sufficient balance
2. Use valid wallet addresses for testing
3. Check transaction status via API

### Debugging
- Check browser console for API logs
- Monitor server logs for backend issues
- Use Telegram Web Developer Tools

## 🚀 Production Deployment

### Frontend
1. Update `VITE_API_BASE_URL` to production server
2. Build the app: `npm run build`
3. Deploy to your hosting service
4. Configure Telegram Bot with your domain

### Backend
1. Set `TESTING_MODE=false`
2. Configure real CCPayment credentials
3. Update `ALLOWED_ORIGINS` with your domain
4. Deploy to production server

### Security Checklist
- [ ] HTTPS enabled for both frontend and backend
- [ ] CORS properly configured
- [ ] JWT secret key is secure
- [ ] Database is secured
- [ ] CCPayment webhooks are validated
- [ ] Rate limiting is enabled

## 📞 Support

If you encounter issues:

1. Check server logs for backend errors
2. Verify environment variables are set correctly
3. Ensure CORS is configured properly
4. Test API endpoints directly using tools like Postman
5. Check Telegram WebApp documentation for integration issues
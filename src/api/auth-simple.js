// Simple auth functions without complex dependencies
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data'
};

export function isAuthenticated() {
  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  return !!token;
}

export function getStoredUser() {
  try {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing stored user data:', error);
    return null;
  }
}

export function logout() {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);
}

export async function login(initData) {
  console.log('🔐 Login attempt with:', initData);
  
  let mockUser;
  
  if (initData === 'web_mode_user') {
    // Web mode user
    mockUser = {
      id: 'web_' + Date.now(),
      first_name: 'Web',
      last_name: 'Player',
      username: 'webplayer',
      balance: 1000,
      isWebUser: true
    };
  } else if (typeof initData === 'string' && initData.length > 10) {
    // Telegram initData (real or mock)
    mockUser = {
      id: 123456789,
      first_name: 'Telegram',
      last_name: 'User',
      username: 'telegramuser',
      balance: 2500,
      isTelegramUser: true
    };
  } else {
    // Fallback user
    mockUser = {
      id: 'guest_' + Date.now(),
      first_name: 'Guest',
      last_name: 'Player',
      username: 'guest',
      balance: 500,
      isGuest: true
    };
  }
  
  const mockToken = 'token_' + Date.now();
  
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, mockToken);
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser));
  
  console.log('✅ Login successful:', mockUser);
  
  return {
    access_token: mockToken,
    user: mockUser
  };
}

export async function getCurrentUser() {
  return getStoredUser();
}

export async function refreshToken() {
  // Mock refresh
  return { access_token: 'refreshed_token_' + Date.now() };
}
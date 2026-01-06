import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation
    home: 'Home',
    games: 'Games',
    wallet: 'Wallet',
    profile: 'Profile',
    
    // Home Page
    telegramMiniApp: 'Telegram Mini App',
    highWins: 'High Wins (PG)',
    steadyWins: 'Steady Wins (EGT)',
    pgSlots: 'PG Slots',
    egtSlots: 'EGT Slots',
    todaysPicks: "Today's Picks",
    providers: 'Providers',
    
    // Game List
    gameList: 'Game List',
    newGames: 'New Games',
    buyFree: 'Buy Free',
    favorites: 'Favorites',
    playNow: 'Play Now',
    
    // Wallet
    myWallet: 'My Wallet',
    usdtBalance: 'USDT Balance',
    deposit: 'Deposit',
    withdraw: 'Withdraw',
    transactionHistory: 'Transaction History',
    myBonuses: 'My Bonuses',
    
    // Profile
    myProfile: 'My Profile',
    language: 'Language',
    settings: 'Settings',
    logout: 'Logout',
    
    // Games
    fortuneTiger: 'Fortune Tiger',
    wildBountyShowdown: 'Wild Bounty Showdown',
    mahjongWays: 'Mahjong Ways',
    luckyNeko: 'Lucky Neko',
    megaWin: 'MEGA WIN!'
  },
  
  zh: {
    // Navigation
    home: '首页',
    games: '游戏',
    wallet: '钱包',
    profile: '个人资料',
    
    // Home Page
    telegramMiniApp: 'Telegram 小程序',
    highWins: '辉煌全区 (PG)',
    steadyWins: '温存全区 (EGT)',
    pgSlots: 'PG老虎机',
    egtSlots: 'EGT老虎机',
    todaysPicks: '今日精选',
    providers: '供应商',
    
    // Game List
    gameList: '游戏列表',
    newGames: '新游戏',
    buyFree: '购买免费',
    favorites: '收藏',
    playNow: '立即游戏',
    
    // Wallet
    myWallet: '我的钱包',
    usdtBalance: 'USDT余额',
    deposit: '存款',
    withdraw: '提款',
    transactionHistory: '交易记录',
    myBonuses: '我的奖金',
    
    // Profile
    myProfile: '我的资料',
    language: '语言',
    settings: '设置',
    logout: '登出',
    
    // Games
    fortuneTiger: '财富老虎',
    wildBountyShowdown: '狂野赏金对决',
    mahjongWays: '麻将胡了',
    luckyNeko: '幸运招财猫',
    megaWin: '超级大奖!'
  },
  
  vi: {
    // Navigation
    home: 'Trang chủ',
    games: 'Trò chơi',
    wallet: 'Ví',
    profile: 'Hồ sơ',
    
    // Home Page
    telegramMiniApp: 'Ứng dụng Telegram Mini',
    highWins: 'Thắng lớn (PG)',
    steadyWins: 'Thắng ổn định (EGT)',
    pgSlots: 'PG Slots',
    egtSlots: 'EGT Slots',
    todaysPicks: 'Lựa chọn hôm nay',
    providers: 'Nhà cung cấp',
    
    // Game List
    gameList: 'Danh sách trò chơi',
    newGames: 'Trò chơi mới',
    buyFree: 'Mua miễn phí',
    favorites: 'Yêu thích',
    playNow: 'Chơi ngay',
    
    // Wallet
    myWallet: 'Ví của tôi',
    usdtBalance: 'Số dư USDT',
    deposit: 'Nạp tiền',
    withdraw: 'Rút tiền',
    transactionHistory: 'Lịch sử giao dịch',
    myBonuses: 'Tiền thưởng của tôi',
    
    // Profile
    myProfile: 'Hồ sơ của tôi',
    language: 'Ngôn ngữ',
    settings: 'Cài đặt',
    logout: 'Đăng xuất',
    
    // Games
    fortuneTiger: 'Fortune Tiger',
    wildBountyShowdown: 'Wild Bounty Showdown',
    mahjongWays: 'Mahjong Ways',
    luckyNeko: 'Lucky Neko',
    megaWin: 'THẮNG LỚN!'
  },
  
  th: {
    // Navigation
    home: 'หน้าแรก',
    games: 'เกม',
    wallet: 'กระเป๋าเงิน',
    profile: 'โปรไฟล์',
    
    // Home Page
    telegramMiniApp: 'แอป Telegram Mini',
    highWins: 'ชนะใหญ่ (PG)',
    steadyWins: 'ชนะมั่นคง (EGT)',
    pgSlots: 'PG สล็อต',
    egtSlots: 'EGT สล็อต',
    todaysPicks: 'แนะนำวันนี้',
    providers: 'ผู้ให้บริการ',
    
    // Game List
    gameList: 'รายการเกม',
    newGames: 'เกมใหม่',
    buyFree: 'ซื้อฟรี',
    favorites: 'รายการโปรด',
    playNow: 'เล่นเลย',
    
    // Wallet
    myWallet: 'กระเป๋าเงินของฉัน',
    usdtBalance: 'ยอดเงิน USDT',
    deposit: 'ฝากเงิน',
    withdraw: 'ถอนเงิน',
    transactionHistory: 'ประวัติการทำรายการ',
    myBonuses: 'โบนัสของฉัน',
    
    // Profile
    myProfile: 'โปรไฟล์ของฉัน',
    language: 'ภาษา',
    settings: 'การตั้งค่า',
    logout: 'ออกจากระบบ',
    
    // Games
    fortuneTiger: 'Fortune Tiger',
    wildBountyShowdown: 'Wild Bounty Showdown',
    mahjongWays: 'Mahjong Ways',
    luckyNeko: 'Lucky Neko',
    megaWin: 'ชนะใหญ่!'
  },

  id: {
    // Navigation
    home: 'Beranda',
    games: 'Permainan',
    wallet: 'Dompet',
    profile: 'Profil',
    
    // Home Page
    telegramMiniApp: 'Aplikasi Mini Telegram',
    highWins: 'Kemenangan Tinggi (PG)',
    steadyWins: 'Kemenangan Stabil (EGT)',
    pgSlots: 'PG Slots',
    egtSlots: 'EGT Slots',
    todaysPicks: 'Pilihan Hari Ini',
    providers: 'Penyedia',
    
    // Game List
    gameList: 'Daftar Permainan',
    newGames: 'Permainan Baru',
    buyFree: 'Beli Gratis',
    favorites: 'Favorit',
    playNow: 'Main Sekarang',
    
    // Wallet
    myWallet: 'Dompet Saya',
    usdtBalance: 'Saldo USDT',
    deposit: 'Deposit',
    withdraw: 'Tarik',
    transactionHistory: 'Riwayat Transaksi',
    myBonuses: 'Bonus Saya',
    
    // Profile
    myProfile: 'Profil Saya',
    language: 'Bahasa',
    settings: 'Pengaturan',
    logout: 'Keluar',
    
    // Games
    fortuneTiger: 'Fortune Tiger',
    wildBountyShowdown: 'Wild Bounty Showdown',
    mahjongWays: 'Mahjong Ways',
    luckyNeko: 'Lucky Neko',
    megaWin: 'MENANG BESAR!'
  },

  ar: {
    // Navigation
    home: 'الرئيسية',
    games: 'الألعاب',
    wallet: 'المحفظة',
    profile: 'الملف الشخصي',
    
    // Home Page
    telegramMiniApp: 'تطبيق تيليجرام المصغر',
    highWins: 'انتصارات عالية (PG)',
    steadyWins: 'انتصارات ثابتة (EGT)',
    pgSlots: 'فتحات PG',
    egtSlots: 'فتحات EGT',
    todaysPicks: 'اختيارات اليوم',
    providers: 'مقدمو الخدمة',
    
    // Game List
    gameList: 'قائمة الألعاب',
    newGames: 'ألعاب جديدة',
    buyFree: 'شراء مجاني',
    favorites: 'المفضلة',
    playNow: 'العب الآن',
    
    // Wallet
    myWallet: 'محفظتي',
    usdtBalance: 'رصيد USDT',
    deposit: 'إيداع',
    withdraw: 'سحب',
    transactionHistory: 'تاريخ المعاملات',
    myBonuses: 'مكافآتي',
    
    // Profile
    myProfile: 'ملفي الشخصي',
    language: 'اللغة',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    
    // Games
    fortuneTiger: 'نمر الحظ',
    wildBountyShowdown: 'مواجهة المكافآت البرية',
    mahjongWays: 'طرق ماهجونغ',
    luckyNeko: 'نيكو المحظوظ',
    megaWin: 'فوز ضخم!'
  },

  ja: {
    // Navigation
    home: 'ホーム',
    games: 'ゲーム',
    wallet: 'ウォレット',
    profile: 'プロフィール',
    
    // Home Page
    telegramMiniApp: 'Telegramミニアプリ',
    highWins: '高勝利 (PG)',
    steadyWins: '安定勝利 (EGT)',
    pgSlots: 'PGスロット',
    egtSlots: 'EGTスロット',
    todaysPicks: '本日のおすすめ',
    providers: 'プロバイダー',
    
    // Game List
    gameList: 'ゲームリスト',
    newGames: '新しいゲーム',
    buyFree: 'フリー購入',
    favorites: 'お気に入り',
    playNow: '今すぐプレイ',
    
    // Wallet
    myWallet: 'マイウォレット',
    usdtBalance: 'USDT残高',
    deposit: '入金',
    withdraw: '出金',
    transactionHistory: '取引履歴',
    myBonuses: 'マイボーナス',
    
    // Profile
    myProfile: 'マイプロフィール',
    language: '言語',
    settings: '設定',
    logout: 'ログアウト',
    
    // Games
    fortuneTiger: 'フォーチュンタイガー',
    wildBountyShowdown: 'ワイルドバウンティショーダウン',
    mahjongWays: '麻雀ウェイズ',
    luckyNeko: 'ラッキーネコ',
    megaWin: 'メガウィン!'
  },

  ko: {
    // Navigation
    home: '홈',
    games: '게임',
    wallet: '지갑',
    profile: '프로필',
    
    // Home Page
    telegramMiniApp: '텔레그램 미니 앱',
    highWins: '높은 승리 (PG)',
    steadyWins: '안정적 승리 (EGT)',
    pgSlots: 'PG 슬롯',
    egtSlots: 'EGT 슬롯',
    todaysPicks: '오늘의 추천',
    providers: '제공업체',
    
    // Game List
    gameList: '게임 목록',
    newGames: '새로운 게임',
    buyFree: '무료 구매',
    favorites: '즐겨찾기',
    playNow: '지금 플레이',
    
    // Wallet
    myWallet: '내 지갑',
    usdtBalance: 'USDT 잔액',
    deposit: '입금',
    withdraw: '출금',
    transactionHistory: '거래 내역',
    myBonuses: '내 보너스',
    
    // Profile
    myProfile: '내 프로필',
    language: '언어',
    settings: '설정',
    logout: '로그아웃',
    
    // Games
    fortuneTiger: '포춘 타이거',
    wildBountyShowdown: '와일드 바운티 쇼다운',
    mahjongWays: '마작 웨이즈',
    luckyNeko: '럭키 네코',
    megaWin: '메가 윈!'
  },

  fil: {
    // Navigation
    home: 'Home',
    games: 'Mga Laro',
    wallet: 'Wallet',
    profile: 'Profile',
    
    // Home Page
    telegramMiniApp: 'Telegram Mini App',
    highWins: 'Mataas na Panalo (PG)',
    steadyWins: 'Matatag na Panalo (EGT)',
    pgSlots: 'PG Slots',
    egtSlots: 'EGT Slots',
    todaysPicks: 'Mga Pili Ngayon',
    providers: 'Mga Provider',
    
    // Game List
    gameList: 'Listahan ng Laro',
    newGames: 'Bagong Laro',
    buyFree: 'Bumili ng Libre',
    favorites: 'Mga Paborito',
    playNow: 'Maglaro Ngayon',
    
    // Wallet
    myWallet: 'Aking Wallet',
    usdtBalance: 'USDT Balance',
    deposit: 'Deposito',
    withdraw: 'Withdraw',
    transactionHistory: 'Kasaysayan ng Transaksyon',
    myBonuses: 'Aking mga Bonus',
    
    // Profile
    myProfile: 'Aking Profile',
    language: 'Wika',
    settings: 'Mga Setting',
    logout: 'Logout',
    
    // Games
    fortuneTiger: 'Fortune Tiger',
    wildBountyShowdown: 'Wild Bounty Showdown',
    mahjongWays: 'Mahjong Ways',
    luckyNeko: 'Lucky Neko',
    megaWin: 'MALAKING PANALO!'
  },

  ms: {
    // Navigation
    home: 'Laman Utama',
    games: 'Permainan',
    wallet: 'Dompet',
    profile: 'Profil',
    
    // Home Page
    telegramMiniApp: 'Aplikasi Mini Telegram',
    highWins: 'Kemenangan Tinggi (PG)',
    steadyWins: 'Kemenangan Stabil (EGT)',
    pgSlots: 'PG Slots',
    egtSlots: 'EGT Slots',
    todaysPicks: 'Pilihan Hari Ini',
    providers: 'Pembekal',
    
    // Game List
    gameList: 'Senarai Permainan',
    newGames: 'Permainan Baharu',
    buyFree: 'Beli Percuma',
    favorites: 'Kegemaran',
    playNow: 'Main Sekarang',
    
    // Wallet
    myWallet: 'Dompet Saya',
    usdtBalance: 'Baki USDT',
    deposit: 'Deposit',
    withdraw: 'Keluarkan',
    transactionHistory: 'Sejarah Transaksi',
    myBonuses: 'Bonus Saya',
    
    // Profile
    myProfile: 'Profil Saya',
    language: 'Bahasa',
    settings: 'Tetapan',
    logout: 'Log Keluar',
    
    // Games
    fortuneTiger: 'Fortune Tiger',
    wildBountyShowdown: 'Wild Bounty Showdown',
    mahjongWays: 'Mahjong Ways',
    luckyNeko: 'Lucky Neko',
    megaWin: 'MENANG BESAR!'
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'fil', name: 'Filipino', flag: '🇵🇭' },
    { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' }
  ];

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      changeLanguage,
      t,
      languages
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
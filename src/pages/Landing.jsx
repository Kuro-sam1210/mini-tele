import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

const Landing = ({ navigate }) => {
  const tg = window.Telegram?.WebApp;
  const [showFallbackButton, setShowFallbackButton] = useState(false);

  useEffect(() => {
    // Check if we're in Telegram environment
    const isInTelegram = tg && tg.initData && tg.initData.length > 0;
    
    if (isInTelegram) {
      tg.setHeaderColor('#000000');
      tg.setBackgroundColor('#000000');
      tg.expand?.();
      tg.ready?.();

      tg.MainButton?.setText('Enter Golden Age Cash');
      tg.MainButton?.show();
      tg.MainButton?.onClick(() => navigate('home'));
      setShowFallbackButton(false);
    } else {
      // Not in Telegram, show fallback button
      setShowFallbackButton(true);
    }

    return () => {
      if (isInTelegram) {
        tg?.MainButton?.hide();
        tg?.MainButton?.offClick();
      }
    };
  }, [tg, navigate]);

  return (
    <div className="landing-container">
      {/* Logo Area */}
      <div className="text-center">
        <div className="landing-logo">
          <img 
            src="/casinologo.jpg" 
            alt="Golden Age Cash Logo"
            className="w-full h-full object-cover"
          />
        </div>
        
        <h1 className="landing-title">
          Golden Age Cash
        </h1>
        <p className="landing-subtitle">
          Premium Gaming Experience
        </p>
      </div>

      {/* Features */}
      <div className="w-full max-w-sm space-y-4 mb-12">
        {[
          { icon: '💎', title: 'Premium Games', desc: 'Curated selection of elite games' },
          { icon: '🏆', title: 'VIP Rewards', desc: 'Exclusive bonuses and privileges' },
          { icon: '⚡', title: 'Instant Payouts', desc: 'Swift and secure transactions' },
        ].map((feature, i) => (
          <div key={i} className="feature-card">
            <div className="feature-icon">
              <span>{feature.icon}</span>
            </div>
            <div className="feature-content">
              <h4>{feature.title}</h4>
              <p>{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button (fallback for non-Telegram) */}
      {showFallbackButton && (
        <button 
          onClick={() => navigate('home')}
          className="btn-primary w-full max-w-sm py-4"
        >
          <Zap className="w-5 h-5" />
          Enter Golden Age Cash
        </button>
      )}

      {/* Footer */}
      <p className="text-xs text-[var(--text-muted)] mt-8 text-center">
        18+ | Play Responsibly | Premium Gaming
      </p>
    </div>
  );
};

export default Landing;

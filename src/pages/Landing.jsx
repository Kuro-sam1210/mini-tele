import { useEffect } from 'react';
import { Sparkles, Play, Shield, Zap, Star } from 'lucide-react';

const Landing = ({ navigate }) => {
  const tg = window.Telegram?.WebApp;

  // Use Telegram MainButton
  useEffect(() => {
    if (tg?.MainButton) {
      tg.MainButton.setText('🎮 Start Playing');
      tg.MainButton.show();
      tg.MainButton.onClick(() => {
        tg.HapticFeedback?.impactOccurred('medium');
        navigate('home');
      });
    }

    return () => {
      tg?.MainButton?.hide();
      tg?.MainButton?.offClick();
    };
  }, [tg, navigate]);

  const features = [
    { icon: Zap, title: 'Instant Play', desc: 'No downloads' },
    { icon: Star, title: 'VIP Rewards', desc: 'Exclusive bonuses' },
    { icon: Shield, title: 'Secure', desc: 'Bank-level security' },
  ];

  return (
    <div className="page">
      {/* Hero */}
      <div className="flex flex-col items-center pt-12 pb-8 px-4">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30">
          <Sparkles className="w-10 h-10 text-black" />
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-2">
          Royale Gaming
        </h1>
        
        <p className="text-[var(--tg-theme-hint-color)] text-center max-w-xs">
          Premium slots and casino games. Play, win, and withdraw instantly.
        </p>
      </div>

      {/* Features */}
      <div className="px-4 space-y-3 mb-8">
        {features.map((feat, i) => (
          <div 
            key={i}
            className="card flex items-center gap-4 p-4"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <feat.icon className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h3 className="font-semibold">{feat.title}</h3>
              <p className="text-sm text-[var(--tg-theme-hint-color)]">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA for non-Telegram browsers */}
      {!tg?.MainButton && (
        <div className="px-4 pb-8">
          <button 
            onClick={() => navigate('home')}
            className="btn-primary w-full py-4"
          >
            <Play className="w-5 h-5" />
            Start Playing
          </button>
        </div>
      )}
    </div>
  );
};

export default Landing;

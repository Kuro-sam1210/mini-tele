import { useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Home as HomeIcon, Flame, Clock, Gamepad2, Radio } from 'lucide-react';
import Layout from '../components/Layout';
import SpinWheel from '../components/SpinWheel';
import ScratchCard from '../components/ScratchCard';
import Confetti from '../components/Confetti';
import PromoCarousel from '../components/PromoCarousel';
import { useApi } from '../contexts/ApiContext';

const Home = ({ user, navigate }) => {
  const [showWheel, setShowWheel] = useState(false);
  const [showScratch, setShowScratch] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const hotCarouselRef = useRef(null);
  const slotCarouselRef = useRef(null);
  const liveCarouselRef = useRef(null);
  
  const { config } = useApi();

  // Secondary Navigation Tabs
  const secondaryTabs = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'hot', label: 'Hot', icon: Flame },
    { id: 'recentviews', label: 'Recentviews', icon: Clock },
    { id: 'slot', label: 'Slot game', icon: Gamepad2 },
    { id: 'live', label: 'Live', icon: Radio },
  ];

  // Action Buttons
  const actionButtons = [
    { id: 'deposit', label: 'Deposit', icon: '💰', action: () => navigate('wallet') },
    { id: 'withdraw', label: 'Withdraw', icon: '💸', action: () => navigate('wallet') },
    { id: 'task', label: 'Task', icon: '⭐', action: () => setShowWheel(true) },
    { id: 'income', label: 'Income', icon: '💵', action: () => navigate('profile') },
    { id: 'invite', label: 'Invite', icon: '🎁', action: () => navigate('promotion') },
  ];

  // Game Data
  const hotGames = [
    { id: 'sugar-rush', name: 'SUGAR RUSH 1000', provider: 'PRAGMATIC PLAY', icon: '🍬', gradient: 'from-pink-500 to-rose-600' },
    { id: 'mahjong-2', name: 'MAHJONG WAYS 2', provider: 'PGSOFT', icon: '🀄', gradient: 'from-green-500 to-emerald-600' },
    { id: 'mahjong', name: 'MAHJONG WAYS', provider: 'PGSOFT', icon: '🀄', gradient: 'from-orange-500 to-amber-600' },
    { id: 'olympus', name: 'GATES OF OLYMPUS', provider: 'PRAGMATIC PLAY', icon: '⚡', gradient: 'from-purple-500 to-indigo-600' },
  ];

  const slotGames = [
    { id: 'pg-slot', name: 'PG SLOT', provider: 'PG POCKET GAMES SOFT', icon: '🐅', gradient: 'from-red-500 to-rose-600' },
    { id: 'pp-slot', name: 'PP SLOT', provider: 'PP PRAGMATIC PLAY', icon: '🎰', gradient: 'from-purple-500 to-pink-600' },
    { id: 'cq9-slot', name: 'CQ9 SLO', provider: 'CQ9', icon: '🎲', gradient: 'from-orange-500 to-red-600' },
  ];

  const liveGames = [
    { id: 'pp-live', name: 'PP LIVE', provider: 'PP PRAGMATIC PLAY', icon: '📺', gradient: 'from-blue-500 to-cyan-600' },
    { id: 'db', name: 'DB', provider: 'DB', icon: '🎯', gradient: 'from-green-500 to-teal-600' },
    { id: 'coming-soon', name: 'COMING SOON', provider: '', icon: '⏳', gradient: 'from-gray-500 to-gray-600' },
  ];

  const scrollCarousel = (ref, direction) => {
    if (!ref.current) return;
    const scrollAmount = 160; // card width + gap
    ref.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  };

  const handleGameClick = (game) => {
    navigate('game', { selectedGame: game.id });
  };

  const handleWheelWin = () => {
    setShowWheel(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <Layout user={user} navigate={navigate} currentScreen="home">
      <div className="page">
        {/* Secondary Navigation */}
        <div className="secondary-nav">
          <div className="secondary-nav-container">
            {secondaryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`secondary-nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Promotional Carousel */}
        <div className="px-4">
          <PromoCarousel />
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          {actionButtons.map((button) => (
            <button
              key={button.id}
              onClick={button.action}
              className="action-button"
            >
              <div className="action-button-icon">{button.icon}</div>
              <span className="action-button-label">{button.label}</span>
            </button>
          ))}
        </div>

        {/* Hot Games Section */}
        <div className="game-section">
          <div className="game-section-header">
            <h3 className="game-section-title">
              <Flame size={18} />
              Hot &gt;
            </h3>
            <div className="game-section-nav">
              <button
                className="carousel-nav-button"
                onClick={() => scrollCarousel(hotCarouselRef, -1)}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                className="carousel-nav-button"
                onClick={() => scrollCarousel(hotCarouselRef, 1)}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="game-carousel" ref={hotCarouselRef}>
            {hotGames.map((game) => (
              <div
                key={game.id}
                className="game-carousel-card"
                onClick={() => handleGameClick(game)}
              >
                <div className={`game-carousel-thumb bg-gradient-to-br ${game.gradient}`}>
                  <span>{game.icon}</span>
                </div>
                <div className="game-carousel-title">{game.name}</div>
                <div className="game-carousel-provider">{game.provider}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Slot Games Section */}
        <div className="game-section">
          <div className="game-section-header">
            <h3 className="game-section-title">
              <Gamepad2 size={18} />
              Slot game &gt;
            </h3>
            <div className="game-section-nav">
              <button
                className="carousel-nav-button"
                onClick={() => scrollCarousel(slotCarouselRef, -1)}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                className="carousel-nav-button"
                onClick={() => scrollCarousel(slotCarouselRef, 1)}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="game-carousel" ref={slotCarouselRef}>
            {slotGames.map((game) => (
              <div
                key={game.id}
                className="game-carousel-card"
                onClick={() => handleGameClick(game)}
              >
                <div className={`game-carousel-thumb bg-gradient-to-br ${game.gradient}`}>
                  <span>{game.icon}</span>
                </div>
                <div className="game-carousel-title">{game.name}</div>
                <div className="game-carousel-provider">{game.provider}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Games Section */}
        <div className="game-section">
          <div className="game-section-header">
            <h3 className="game-section-title">
              <Radio size={18} />
              Live &gt;
            </h3>
            <div className="game-section-nav">
              <button
                className="carousel-nav-button"
                onClick={() => scrollCarousel(liveCarouselRef, -1)}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                className="carousel-nav-button"
                onClick={() => scrollCarousel(liveCarouselRef, 1)}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="game-carousel" ref={liveCarouselRef}>
            {liveGames.map((game) => (
              <div
                key={game.id}
                className="game-carousel-card"
                onClick={() => handleGameClick(game)}
              >
                <div className={`game-carousel-thumb bg-gradient-to-br ${game.gradient}`}>
                  <span>{game.icon}</span>
                </div>
                <div className="game-carousel-title">{game.name}</div>
                <div className="game-carousel-provider">{game.provider}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Modals */}
        {showWheel && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Daily Bonus Wheel</h3>
                <button onClick={() => setShowWheel(false)} className="modal-close">
                  <X size={20} />
                </button>
              </div>
              <SpinWheel onWin={handleWheelWin} />
            </div>
          </div>
        )}

        {showScratch && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Scratch Card</h3>
                <button onClick={() => setShowScratch(false)} className="modal-close">
                  <X size={20} />
                </button>
              </div>
              <ScratchCard onWin={() => {
                setShowScratch(false);
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 3000);
              }} />
            </div>
          </div>
        )}

        {showConfetti && <Confetti />}
      </div>
    </Layout>
  );
};

export default Home;
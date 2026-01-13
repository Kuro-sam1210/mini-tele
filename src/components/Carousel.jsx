import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const sliderData = [
  { 
    src: '/slider/VIP.png', 
    text: 'VIP Program',
    subtitle: 'Exclusive rewards for our premium players',
    cta: 'Join VIP',
    gradient: 'from-purple-600 to-pink-600'
  },
  { 
    src: '/slider/daily bet.png', 
    text: 'Daily Bet',
    subtitle: 'Place your daily bet and win big',
    cta: 'Bet Now',
    gradient: 'from-blue-600 to-cyan-600'
  },
  { 
    src: '/slider/daily cashback.png', 
    text: 'Daily Cashback',
    subtitle: 'Get cashback on every bet you place',
    cta: 'Learn More',
    gradient: 'from-green-600 to-emerald-600'
  },
  { 
    src: '/slider/first deposit bonus.png', 
    text: 'First Deposit Bonus',
    subtitle: '100% bonus on your first deposit',
    cta: 'Claim Bonus',
    gradient: 'from-orange-600 to-red-600'
  },
  { 
    src: '/slider/weekend special.png', 
    text: 'Weekend Special',
    subtitle: 'Special weekend promotions await',
    cta: 'View Offers',
    gradient: 'from-indigo-600 to-purple-600'
  }
];

const Carousel = ({ onSlideClick }) => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const intervalRef = useRef(null);
  const carouselRef = useRef(null);

  // Auto-play functionality
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderData.length);
    }, 4000);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isPlaying, startAutoPlay, stopAutoPlay]);

  // Smooth transition handling
  const changeSlide = useCallback((newIndex) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(newIndex);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    const newIndex = (current + 1) % sliderData.length;
    changeSlide(newIndex);
  }, [current, changeSlide]);

  const prevSlide = useCallback(() => {
    const newIndex = (current - 1 + sliderData.length) % sliderData.length;
    changeSlide(newIndex);
  }, [current, changeSlide]);

  // Touch/swipe support
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide, isPlaying]);

  const currentSlide = sliderData[current];

  return (
    <div 
      ref={carouselRef}
      className="carousel relative w-full mx-auto overflow-hidden rounded-2xl shadow-2xl"
      style={{ height: '280px' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={stopAutoPlay}
      onMouseLeave={() => isPlaying && startAutoPlay()}
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 bg-gradient-to-r ${currentSlide.gradient} opacity-20`} />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Main slide container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Slide images with smooth transition */}
        <div className="absolute inset-0 flex transition-transform duration-500 ease-in-out">
          {sliderData.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                index === current 
                  ? 'opacity-100 transform translate-x-0 scale-100' 
                  : index < current 
                    ? 'opacity-0 transform -translate-x-full scale-95'
                    : 'opacity-0 transform translate-x-full scale-95'
              }`}
            >
              <img
                src={slide.src}
                alt={slide.text}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/800x280/1a1a1a/ffffff?text=${encodeURIComponent(slide.text)}`;
                }}
              />
            </div>
          ))}
        </div>

        {/* Content overlay */}
        <div className="relative z-10 text-center px-6 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg animate-fade-in">
            {currentSlide.text}
          </h2>
          <p className="text-lg text-white/90 mb-4 drop-shadow-md animate-fade-in-delay">
            {currentSlide.subtitle}
          </p>
          <button
            onClick={() => onSlideClick?.(current)}
            className="bg-gradient-to-r from-[var(--gold)] to-[var(--orange)] text-black font-semibold px-6 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in-delay-2"
          >
            {currentSlide.cta}
          </button>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 z-20 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        onClick={prevSlide}
        disabled={isTransitioning}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 z-20 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        onClick={nextSlide}
        disabled={isTransitioning}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Play/Pause button */}
      <button
        className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-20 transition-all duration-300 backdrop-blur-sm"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {sliderData.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === current 
                ? 'bg-[var(--gold)] scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => changeSlide(idx)}
            disabled={isTransitioning}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30 z-20">
        <div 
          className="h-full bg-gradient-to-r from-[var(--gold)] to-[var(--orange)] transition-all duration-100 ease-linear"
          style={{ 
            width: isPlaying ? `${((current + 1) / sliderData.length) * 100}%` : '0%',
            animation: isPlaying ? 'progress 4s linear infinite' : 'none'
          }}
        />
      </div>
    </div>
  );
};

export default Carousel;
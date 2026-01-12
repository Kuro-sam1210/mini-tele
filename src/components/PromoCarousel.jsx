import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PromoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Promotional offers data
  const promos = [
    {
      id: 1,
      title: "First Deposit Bonus",
      subtitle: "Get 100% bonus up to $500",
      description: "Double your first deposit and start winning big!",
      image: "/casinologo.jpg",
      buttonText: "Claim Now"
    },
    {
      id: 2,
      title: "Daily Cashback",
      subtitle: "Up to 10% cashback daily",
      description: "Get cashback on all your losses, every single day",
      image: "/carosel/daily%20cashback.png",
      buttonText: "Learn More"
    },
    {
      id: 3,
      title: "Daily Bet Rewards",
      subtitle: "Earn points with every bet",
      description: "Turn your bets into rewards and unlock exclusive bonuses",
      image: "/carosel/Daily%20bet%20rewards.png",
      buttonText: "Start Betting"
    },
    {
      id: 4,
      title: "VIP Program",
      subtitle: "Exclusive benefits await",
      description: "Join our VIP program for premium rewards and treatment",
      image: "/carosel/VIP%20program.png",
      buttonText: "Join VIP"
    },
    {
      id: 5,
      title: "Weekend Special",
      subtitle: "50% reload bonus",
      description: "Boost your weekend gaming with our special reload offer",
      image: "/carosel/weekend%20special.png",
      buttonText: "Reload Now"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % promos.length);
      }, 4000); // Change slide every 4 seconds
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [promos.length]);

  // Handle manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
    // Reset auto-play timer
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % promos.length);
      }, 4000);
    }
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % promos.length);
  };

  const prevSlide = () => {
    goToSlide(currentSlide === 0 ? promos.length - 1 : currentSlide - 1);
  };

  return (
    <div className="promo-carousel">
      <div className="promo-carousel-container" ref={carouselRef}>
        <div 
          className="promo-carousel-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {promos.map((promo) => (
            <div key={promo.id} className="promo-slide">
              <div className="promo-slide-content">
                <img 
                  src={promo.image} 
                  alt={promo.title}
                  className="promo-slide-image"
                  onError={(e) => {
                    console.log(`Failed to load image: ${promo.image}`);
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log(`Successfully loaded image: ${promo.image}`);
                  }}
                />
                <div className="promo-slide-overlay">
                  <div className="promo-slide-text">
                    <h3 className="promo-slide-title">{promo.title}</h3>
                    <p className="promo-slide-subtitle">{promo.subtitle}</p>
                    <p className="promo-slide-description">{promo.description}</p>
                  </div>
                  <button className="promo-slide-button">
                    {promo.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          className="promo-carousel-nav promo-carousel-nav-prev"
          onClick={prevSlide}
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          className="promo-carousel-nav promo-carousel-nav-next"
          onClick={nextSlide}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="promo-carousel-dots">
        {promos.map((_, index) => (
          <button
            key={index}
            className={`promo-carousel-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoCarousel;
import React, { useState } from 'react';
import { Clock, Wine, Users, Utensils, Star, Plus, Minus, Leaf, ChefHat, ArrowRight } from 'lucide-react';
import { TapasNightMenu } from './TapasNightMenu';
import { CartItem } from '../types';

interface DailyPromotionsProps {
  onAddToCart?: (cartItem: Omit<CartItem, 'id'>) => void;
}

const promotions = [
  {
    day: 'Monday',
    title: 'Unlimited Tapas Night',
    price: 39,
    originalPrice: null,
    description: 'All-you-can-eat tapas for 2 hours. Choose from our full tapas menu.',
    time: '6PM-10PM',
    available: true,
    hasSpecialMenu: true,
    requiresPax: true
  },
  {
    day: 'Tuesday', 
    title: 'Fresh Atlantic Salmon',
    price: 18,
    originalPrice: 38,
    description: 'Perfectly roasted with seasonal vegetables and lemon butter sauce.',
    time: 'All Day',
    available: true,
  },
  {
    day: 'Wednesday',
    title: 'Ladies Night - Free Flow',
    price: null,
    originalPrice: null,
    description: 'Unlimited wine and cocktails for the ladies. Bring your girlfriends!',
    time: '6PM-10PM',
    available: true,
  },
  {
    day: 'Thursday',
    title: '1.2kg Tomahawk Steak',
    price: 98,
    originalPrice: 168,
    description: 'Massive Australian beef tomahawk, perfect for sharing between 2-3 people.',
    time: '7PM-10PM',
    available: true,
  },
  {
    day: 'Friday',
    title: 'Jumbo Tiger Prawns',
    price: 18,
    originalPrice: 28,
    description: 'Extra large tiger prawns grilled with garlic and herbs.',
    time: 'All Day',
    available: true,
  },
  {
    day: 'Weekend',
    title: 'Traditional Sunday Roast',
    price: 56,
    originalPrice: null,
    description: 'Classic roast beef with Yorkshire pudding, vegetables and gravy for two.',
    time: '12PM-4PM',
    available: true,
  },
];

const getTodayPromotion = () => {
  const today = new Date().getDay();
  const dayMap = ['Weekend', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Weekend'];
  return dayMap[today];
};

export const DailyPromotions: React.FC<DailyPromotionsProps> = ({ onAddToCart }) => {
  const [isTapasNightOpen, setIsTapasNightOpen] = useState(false);
  const [tapasNightPax, setTapasNightPax] = useState(2);
  const todayPromotion = getTodayPromotion();

  const handlePromotionClick = (promo: typeof promotions[0]) => {
    if (promo.hasSpecialMenu && promo.title === 'Tapas Night') {
      setIsTapasNightOpen(true);
    }
  };

  const handleTapasNightAddToCart = (cartItem: Omit<CartItem, 'id'>) => {
    if (onAddToCart) {
      const updatedCartItem = {
        ...cartItem,
        quantity: tapasNightPax,
        totalPrice: cartItem.totalPrice * tapasNightPax,
        menuItem: {
          ...cartItem.menuItem,
          description: `${cartItem.menuItem.description} • ${tapasNightPax} ${tapasNightPax === 1 ? 'person' : 'people'}`
        }
      };
      onAddToCart(updatedCartItem);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Simple Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Daily Specials</h1>
        <p className="text-lg text-gray-600">Today is {todayPromotion}</p>
      </div>

      {/* Today's Special - Hero */}
      {promotions.filter(p => p.day === todayPromotion).map((todaySpecial) => {
        const hasDiscount = todaySpecial.originalPrice && todaySpecial.price;
        
        return (
          <div key={todaySpecial.day} className="bg-black text-white rounded-3xl p-12 mb-12 text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto">
              <div className="inline-block bg-white/20 rounded-full px-6 py-2 mb-6">
                <span className="text-sm font-bold tracking-wide">TODAY'S SPECIAL</span>
              </div>
              
              <h2 className="text-5xl font-bold mb-4 leading-tight">{todaySpecial.title}</h2>
              <p className="text-white/90 mb-8 text-xl leading-relaxed">{todaySpecial.description}</p>
              
              <div className="text-white/80 mb-8 text-lg">
                <span>Available {todaySpecial.time}</span>
              </div>
              
              <div className="flex items-center justify-center space-x-4 mb-8">
                {hasDiscount && (
                  <span className="text-3xl text-white/50 line-through">${todaySpecial.originalPrice}</span>
                )}
                {todaySpecial.price ? (
                  <span className="text-6xl font-bold">${todaySpecial.price}</span>
                ) : (
                  <span className="text-6xl font-bold text-green-400">FREE</span>
                )}
                <span className="text-2xl text-white/60">per person</span>
              </div>
              
              {todaySpecial.requiresPax ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => setTapasNightPax(Math.max(1, tapasNightPax - 1))}
                      className="w-14 h-14 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center transition-colors text-2xl font-bold"
                    >
                      −
                    </button>
                    <div className="text-center">
                      <div className="text-4xl font-bold">{tapasNightPax}</div>
                      <div className="text-white/70">{tapasNightPax === 1 ? 'person' : 'people'}</div>
                    </div>
                    <button
                      onClick={() => setTapasNightPax(Math.min(12, tapasNightPax + 1))}
                      className="w-14 h-14 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center transition-colors text-2xl font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handlePromotionClick(todaySpecial)}
                    className="bg-white text-black px-10 py-4 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    Choose Your Dishes • ${(todaySpecial.price || 0) * tapasNightPax}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handlePromotionClick(todaySpecial)}
                  className="bg-white text-black px-10 py-4 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Order This Special
                </button>
              )}
            </div>
          </div>
        );
      })}

      {/* Other Days - Simple Grid */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">This Week's Specials</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.filter(p => p.day !== todayPromotion).map((promo) => {
          const hasDiscount = promo.originalPrice && promo.price;
          
          return (
            <div
              key={promo.day}
              className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer group"
              onClick={() => handlePromotionClick(promo)}
            >
              {/* Day Badge */}
              <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                {promo.day}
              </div>
              
              {/* Image placeholder */}
              <div className="w-full aspect-video bg-gray-100 rounded-2xl mb-6 group-hover:bg-gray-200 transition-colors">
                {/* Image will go here */}
              </div>
              
              {/* Title */}
              <h4 className="font-bold text-gray-900 mb-3 text-xl leading-tight">{promo.title}</h4>
              
              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">{promo.description}</p>
              
              {/* Price */}
              <div className="flex items-baseline space-x-3 mb-4">
                {hasDiscount && (
                  <span className="text-lg text-gray-400 line-through">${promo.originalPrice}</span>
                )}
                {promo.price ? (
                  <span className="text-3xl font-bold text-gray-900">${promo.price}</span>
                ) : (
                  <span className="text-3xl font-bold text-green-600">FREE</span>
                )}
              </div>
              
              {/* Time */}
              <div className="text-gray-500 mb-6 font-medium">{promo.time}</div>
              
              {/* CTA */}
              <div className="w-full bg-gray-100 group-hover:bg-gray-900 group-hover:text-white text-gray-700 py-3 rounded-xl text-center font-semibold transition-all duration-200">
                Order for {promo.day}
              </div>
            </div>
          );
        })}
      </div>

      {/* Wine Buffet - Bottom Banner */}
      <div className="mt-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-3xl p-10 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold mb-3">Daily Wine Buffet</h3>
          <p className="text-purple-100 mb-6 text-lg">Unlimited wine selection from our curated collection</p>
          <div className="text-4xl font-bold mb-2">$38</div>
          <div className="text-purple-200">per person • Daily 4:30-7:00 PM</div>
        </div>
      </div>

      {/* Tapas Night Menu Modal */}
      <TapasNightMenu
        isOpen={isTapasNightOpen}
        onClose={() => setIsTapasNightOpen(false)}
        onAddToCart={handleTapasNightAddToCart}
        paxCount={tapasNightPax}
      />
    </div>
  );
};
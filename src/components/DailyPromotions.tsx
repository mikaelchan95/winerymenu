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
    title: 'Tapas Night',
    price: 39,
    originalPrice: null,
    description: 'Unlimited tapas • 2hrs',
    icon: Utensils,
    time: '6PM-10PM',
    available: true,
    hasSpecialMenu: true,
    requiresPax: true
  },
  {
    day: 'Tuesday', 
    title: 'Roasted Salmon',
    price: 18,
    originalPrice: 38,
    description: 'Fresh Atlantic salmon',
    icon: ChefHat,
    time: 'All Day',
    available: true,
  },
  {
    day: 'Wednesday',
    title: 'Ladies Night',
    price: null,
    originalPrice: null,
    description: 'Free flow drinks',
    icon: Users,
    time: '6PM-10PM',
    available: true,
  },
  {
    day: 'Thursday',
    title: 'Tomahawk Night',
    price: 98,
    originalPrice: 168,
    description: '1.2kg Australian Tomahawk',
    icon: ChefHat,
    time: '7PM-10PM',
    available: true,
  },
  {
    day: 'Friday',
    title: 'XXL Tiger Prawn',
    price: 18,
    originalPrice: 28,
    description: 'Jumbo prawns',
    icon: ChefHat,
    time: 'All Day',
    available: true,
  },
  {
    day: 'Weekend',
    title: 'Weekend Roast',
    price: 56,
    originalPrice: null,
    description: 'Roast platter for 2',
    icon: ChefHat,
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
    <div className="max-w-4xl mx-auto">
      {/* Simple Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Specials</h1>
        <p className="text-gray-500">Today is {todayPromotion}</p>
      </div>

      {/* Today's Special - Hero */}
      {promotions.filter(p => p.day === todayPromotion).map((todaySpecial) => {
        const IconComponent = todaySpecial.icon;
        const hasDiscount = todaySpecial.originalPrice && todaySpecial.price;
        
        return (
          <div key={todaySpecial.day} className="bg-black text-white rounded-3xl p-8 mb-8 text-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-4">
                <Star size={16} className="mr-2" />
                <span className="text-sm font-semibold">TODAY'S SPECIAL</span>
              </div>
              
              <h2 className="text-4xl font-bold mb-2">{todaySpecial.title}</h2>
              <p className="text-white/80 mb-6 text-lg">{todaySpecial.description}</p>
              
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Clock size={20} className="text-white/60" />
                <span className="text-white/80">{todaySpecial.time}</span>
              </div>
              
              <div className="flex items-center justify-center space-x-3 mb-6">
                {hasDiscount && (
                  <span className="text-2xl text-white/60 line-through">${todaySpecial.originalPrice}</span>
                )}
                {todaySpecial.price ? (
                  <span className="text-5xl font-bold">${todaySpecial.price}</span>
                ) : (
                  <span className="text-5xl font-bold text-green-400">FREE</span>
                )}
              </div>
              
              {todaySpecial.requiresPax ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => setTapasNightPax(Math.max(1, tapasNightPax - 1))}
                      className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Minus size={20} />
                    </button>
                    <div className="text-center">
                      <div className="text-3xl font-bold">{tapasNightPax}</div>
                      <div className="text-sm text-white/60">people</div>
                    </div>
                    <button
                      onClick={() => setTapasNightPax(Math.min(12, tapasNightPax + 1))}
                      className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <button
                    onClick={() => handlePromotionClick(todaySpecial)}
                    className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors"
                  >
                    Select Dishes • ${(todaySpecial.price || 0) * tapasNightPax}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handlePromotionClick(todaySpecial)}
                  className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors"
                >
                  Order Now
                </button>
              )}
            </div>
            
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <IconComponent size={200} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        );
      })}

      {/* Other Days - Simple Grid */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Other Days</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {promotions.filter(p => p.day !== todayPromotion).map((promo) => {
          const IconComponent = promo.icon;
          const hasDiscount = promo.originalPrice && promo.price;
          
          return (
            <div
              key={promo.day}
              className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-gray-200 transition-all duration-200 cursor-pointer group"
              onClick={() => handlePromotionClick(promo)}
            >
              {/* Day Badge */}
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {promo.day}
              </div>
              
              {/* Icon */}
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
                <IconComponent size={24} className="text-gray-600" />
              </div>
              
              {/* Title */}
              <h4 className="font-bold text-gray-900 mb-2 text-lg">{promo.title}</h4>
              
              {/* Price */}
              <div className="flex items-center space-x-2 mb-3">
                {hasDiscount && (
                  <span className="text-sm text-gray-400 line-through">${promo.originalPrice}</span>
                )}
                {promo.price ? (
                  <span className="text-2xl font-bold text-gray-900">${promo.price}</span>
                ) : (
                  <span className="text-2xl font-bold text-green-600">FREE</span>
                )}
              </div>
              
              {/* Time */}
              <div className="text-sm text-gray-500 mb-4">{promo.time}</div>
              
              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{promo.description}</p>
              
              {/* Simple CTA */}
              <div className="text-sm font-medium text-gray-400 group-hover:text-gray-600 transition-colors">
                Tap to order →
              </div>
            </div>
          );
        })}
      </div>

      {/* Wine Buffet - Bottom Banner */}
      <div className="mt-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white text-center">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <Wine size={24} />
          <h3 className="text-xl font-bold">Wine Buffet</h3>
        </div>
        <p className="text-purple-100 mb-4">Free-flow wine selection • Daily 4:30-7:00 PM</p>
        <div className="text-2xl font-bold">$38 per person</div>
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
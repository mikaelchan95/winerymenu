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
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
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

  const adjustPax = (increment: boolean) => {
    setTapasNightPax(prev => {
      const newPax = increment ? prev + 1 : prev - 1;
      return Math.max(1, Math.min(newPax, 12));
    });
  };

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
            <Star size={20} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Daily Specials</h1>
        </div>
      </div>

      {/* Wine Buffet - Compact Hero */}
      <div className="bg-black rounded-2xl p-6 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Wine size={24} />
            <div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <p className="text-sm text-gray-300">Free-flow • 4:30-7PM</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">$38</div>
            <div className="text-xs text-gray-400">per person</div>
          </div>
        </div>
      </div>

      {/* Compact Specials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promotions.map((promo) => {
          const IconComponent = promo.icon;
          const isToday = promo.day === todayPromotion;
          const isExpanded = expandedCard === promo.day;
          const hasDiscount = promo.originalPrice && promo.price;
          
          return (
            <div key={promo.day} className="space-y-4">
              {/* Main Promo Box */}
              <div
                className={`relative rounded-2xl border-2 transition-all duration-200 cursor-pointer group aspect-video bg-gradient-to-br ${
                  isToday 
                    ? 'from-black to-gray-800 text-white border-black' 
                    : 'from-gray-100 to-gray-200 border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => {
                  if (promo.requiresPax) {
                    setExpandedCard(isExpanded ? null : promo.day);
                  } else {
                    handlePromotionClick(promo);
                  }
                }}
              >
                {/* Clean Image Placeholder */}
                <div className="absolute inset-0 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <IconComponent size={32} className="text-gray-400" />
                </div>
              </div>

              {/* Details Below Box */}
              <div className="space-y-3">
                {/* Day and Title */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {promo.day}
                    </span>
                    {isToday && (
                      <span className="bg-black text-white px-2 py-1 rounded text-xs font-bold">
                        TODAY
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">{promo.title}</h3>
                </div>

                {/* Price and Discount */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{promo.time}</span>
                  <div className="flex items-center space-x-2">
                    {hasDiscount && (
                      <span className="text-sm text-red-600 line-through">${promo.originalPrice}</span>
                    )}
                    {promo.price ? (
                      <span className="text-lg font-bold text-gray-900">${promo.price}</span>
                    ) : (
                      <span className="text-lg font-bold text-green-600">FREE</span>
                    )}
                  </div>
                </div>
                
                {/* Simple Description */}
                <p className="text-sm text-gray-600">
                  {promo.description}
                </p>

                {/* Action Button */}
                {promo.requiresPax ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedCard(isExpanded ? null : promo.day);
                    }}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    {isExpanded ? 'Close' : 'Select People'}
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePromotionClick(promo);
                    }}
                    className="w-full bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Order Now
                  </button>
                )}
              </div>

              {/* Expanded Pax Selector */}
              {isExpanded && promo.requiresPax && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-900">
                      People:
                    </span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          adjustPax(false);
                        }}
                        disabled={tapasNightPax <= 1}
                        className="w-8 h-8 bg-white hover:bg-gray-100 text-gray-600 disabled:opacity-50 rounded-lg flex items-center justify-center border border-gray-200"
                      >
                        <Minus size={14} />
                      </button>
                      
                      <span className="font-bold min-w-[2rem] text-center text-gray-900">
                        {tapasNightPax}
                      </span>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          adjustPax(true);
                        }}
                        disabled={tapasNightPax >= 12}
                        className="w-8 h-8 bg-white hover:bg-gray-100 text-gray-600 disabled:opacity-50 rounded-lg flex items-center justify-center border border-gray-200"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePromotionClick(promo);
                    }}
                    className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg text-sm font-medium"
                  >
                    ${(promo.price || 0) * tapasNightPax}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-500">All specials available now</p>
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
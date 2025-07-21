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
            <div
              key={promo.day}
              className={`relative rounded-2xl border-2 transition-all duration-200 cursor-pointer group ${
                isToday 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => {
                if (promo.requiresPax) {
                  setExpandedCard(isExpanded ? null : promo.day);
                } else {
                  handlePromotionClick(promo);
                }
              }}
            >
              {/* Badge */}
              {isToday && (
                <div className="absolute -top-2 -right-2 bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
                  TODAY
                </div>
              )}

              {/* Compact Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isToday ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      <IconComponent size={16} className={isToday ? 'text-white' : 'text-gray-700'} />
                    </div>
                    <div>
                      <div className={`text-xs font-medium uppercase tracking-wide mb-1 ${
                        isToday ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {promo.day}
                      </div>
                      <h3 className={`font-bold text-sm ${isToday ? 'text-white' : 'text-gray-900'}`}>
                        {promo.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="text-right">
                    {promo.price ? (
                      <div className={`font-bold ${isToday ? 'text-white' : 'text-gray-900'}`}>
                        ${promo.price}
                      </div>
                    ) : (
                      <div className={`font-bold text-sm ${isToday ? 'text-white' : 'text-gray-900'}`}>
                        FREE
                      </div>
                    )}
                    {hasDiscount && (
                      <div className="text-xs text-red-600 line-through">
                        ${promo.originalPrice}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Description */}
                <p className={`text-xs mb-3 ${isToday ? 'text-gray-300' : 'text-gray-600'}`}>
                  {promo.description}
                </p>
                
                {/* Time + Action */}
                <div className="flex items-center justify-between">
                  <div className={`flex items-center space-x-1 text-xs ${
                    isToday ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    <Clock size={12} />
                    <span>{promo.time}</span>
                  </div>
                  
                  {promo.requiresPax ? (
                    <div className={`text-xs font-medium px-2 py-1 rounded-lg ${
                      isToday 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {isExpanded ? 'Select' : 'Expand'}
                    </div>
                  ) : (
                    <ArrowRight size={12} className={`${
                      isToday ? 'text-white' : 'text-gray-500'
                    } group-hover:translate-x-1 transition-transform`} />
                  )}
                </div>
              </div>

              {/* Expanded Pax Selector */}
              {isExpanded && promo.requiresPax && (
                <div className={`border-t p-4 ${
                  isToday ? 'border-white/20 bg-white/10' : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-sm font-medium ${
                      isToday ? 'text-white' : 'text-gray-900'
                    }`}>
                      People:
                    </span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          adjustPax(false);
                        }}
                        disabled={tapasNightPax <= 1}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all touch-target ${
                          isToday 
                            ? 'bg-white/20 hover:bg-white/30 text-white disabled:opacity-50' 
                            : 'bg-white hover:bg-gray-100 text-gray-600 disabled:opacity-50'
                        }`}
                      >
                        <Minus size={14} />
                      </button>
                      
                      <span className={`font-bold min-w-[2.5rem] text-center text-base ${
                        isToday ? 'text-white' : 'text-gray-900'
                      }`}>
                        {tapasNightPax}
                      </span>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          adjustPax(true);
                        }}
                        disabled={tapasNightPax >= 12}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all touch-target ${
                          isToday 
                            ? 'bg-white/20 hover:bg-white/30 text-white disabled:opacity-50' 
                            : 'bg-white hover:bg-gray-100 text-gray-600 disabled:opacity-50'
                        }`}
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
                    className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-all touch-target min-h-[44px] ${
                      isToday 
                        ? 'bg-white text-black hover:bg-gray-100' 
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    View Menu • ${(promo.price || 0) * tapasNightPax}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to Order?</h3>
            <p className="text-gray-600 text-sm mb-4">All specials are available now • Order directly from your table</p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Available Now</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <Clock size={14} />
                <span className="font-medium">Fast Service</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <Star size={14} />
                <span className="font-medium">Chef's Special</span>
              </div>
            </div>
          </div>
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
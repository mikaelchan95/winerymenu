import React, { useState } from 'react';
import { X, Clock, Users, Utensils, Check, Flame, Leaf, Star } from 'lucide-react';
import { tapasNightPackage, tapasNightItems } from '../data/tapasNight';
import { MenuItem as MenuItemType, CartItem } from '../types';

interface TapasNightMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (cartItem: Omit<CartItem, 'id'>) => void;
  paxCount: number;
}

export const TapasNightMenu: React.FC<TapasNightMenuProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  paxCount
}) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [vegetarianOnly, setVegetarianOnly] = useState(false);

  if (!isOpen) return null;

  const filteredItems = tapasNightItems.filter(item => 
    !vegetarianOnly || item.tags?.includes('vegetarian')
  );

  const handleItemToggle = (itemId: string) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(itemId)) {
      newSelection.delete(itemId);
    } else {
      newSelection.add(itemId);
    }
    setSelectedItems(newSelection);
  };

  const handleAddToCart = () => {
    if (selectedItems.size === 0) return;
    
    const cartItem: Omit<CartItem, 'id'> = {
      menuItem: {
        id: tapasNightPackage.id,
        name: tapasNightPackage.name,
        description: `${selectedItems.size} dishes selected • Unlimited 2-hour experience`,
        price: tapasNightPackage.price,
        category: 'tapas-night',
        image: 'https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      quantity: 1, // This will be updated by the parent component based on pax
      customizations: {
        'selected-dishes': Array.from(selectedItems)
      },
      totalPrice: tapasNightPackage.price
    };
    
    onAddToCart(cartItem);
    onClose();
    setSelectedItems(new Set());
  };

  const selectedCount = selectedItems.size;
  const totalPrice = tapasNightPackage.price * paxCount;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-[60] safe-area-all">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl mt-safe-area mb-safe-area">
        
        {/* Header - Enhanced with pax info */}
        <div className="relative px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <button
            onClick={onClose}
            aria-label="Close Tapas Night menu"
            className="absolute top-6 right-6 w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-150 flex items-center justify-center"
          >
            <X size={18} />
          </button>
          
          <div className="pr-12">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <Utensils size={20} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Monday Tapas Night</h1>
            </div>
            
            <p className="text-gray-600 mb-4">Unlimited tapas experience • 2 hours of sharing and discovery</p>
            
            <div className="flex items-center space-x-8 text-sm">
              <div className="flex items-center space-x-2 text-gray-500">
                <Clock size={16} />
                <span>6:00 PM - 10:00 PM</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <Users size={16} />
                <span>{paxCount} {paxCount === 1 ? 'person' : 'people'}</span>
              </div>
              <div className="font-bold text-gray-900">
                ${totalPrice} total ({paxCount} × $39)
              </div>
            </div>
          </div>
        </div>

        {/* Controls - Enhanced */}
        <div className="px-8 py-5 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-xl font-medium shadow-sm">
                <Check size={16} />
                <span>{selectedCount} selected</span>
              </div>
              
              <button
                onClick={() => setVegetarianOnly(!vegetarianOnly)}
                aria-label={`${vegetarianOnly ? 'Show all dishes' : 'Show only vegetarian dishes'}`}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-150 ${
                  vegetarianOnly 
                    ? 'bg-green-600 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Leaf size={16} />
                <span>Vegetarian Only</span>
              </button>
            </div>
            
            <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-xl border border-gray-200">
              Choose any dishes • Order more throughout the evening
            </div>
          </div>
        </div>

        {/* Items Grid - Improved layout */}
        <div className="flex-1 overflow-auto p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredItems.map((item) => {
              const isSelected = selectedItems.has(item.id);
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemToggle(item.id)}
                  aria-label={`${isSelected ? 'Deselect' : 'Select'} ${item.name} for Tapas Night`}
                  className={`
                    relative p-5 rounded-2xl border-2 transition-all duration-200 text-left group will-change-transform h-full
                  \  ${isSelected ? 'border-black bg-black text-white scale-105 shadow-xl' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md hover:scale-102 active:scale-98'}
                  `}
                >
                  {/* Selection Indicator - Enhanced */}
                  <div className={`
                    absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                    ${isSelected 
                      ? 'border-white bg-white scale-110' 
                      : 'border-gray-300 bg-transparent group-hover:border-gray-400 group-hover:scale-110'
                    }
                  `}>
                    {isSelected && <Check size={14} className="text-black font-bold" />}
                  </div>
                  
                  {/* Item Content */}
                  <div className="pr-8">
                    <h3 className={`font-bold mb-3 text-sm leading-snug ${
                      isSelected ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.name}
                    </h3>
                    
                    <p className={`text-xs leading-relaxed mb-4 line-clamp-3 ${
                      isSelected ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Tags - Bottom */}
                  <div className="flex items-center space-x-1 mt-auto">
                    {item.tags?.includes('vegetarian') && (
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-white/20' : 'bg-green-100'
                      }`} aria-label="Vegetarian">
                        <Leaf size={10} className={isSelected ? 'text-green-300' : 'text-green-600'} />
                      </div>
                    )}
                    
                    {item.spiceLevel && item.spiceLevel >= 2 && (
                      <div className={`flex items-center space-x-0.5 px-2 py-1 rounded-lg text-xs font-medium ${
                        isSelected ? 'bg-red-500/20 text-red-200' : 'bg-red-100 text-red-700'
                      }`} aria-label={`Spice level ${item.spiceLevel}`}>
                        {Array.from({ length: Math.min(item.spiceLevel, 3) }, (_, i) => (
                          <Flame key={i} size={8} />
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Leaf size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm mb-3">No vegetarian items available</p>
              <button
                onClick={() => setVegetarianOnly(false)}
                className="text-black text-sm font-medium hover:underline bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors duration-150"
              >
                Show all dishes
              </button>
            </div>
          )}
        </div>

        {/* Footer - Enhanced with better pricing display */}
        <div className="px-8 py-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <h3 className="text-lg font-bold text-gray-900">Unlimited Experience</h3>
                <div className="bg-black text-white px-3 py-1 rounded-lg text-sm font-medium">
                  {paxCount} {paxCount === 1 ? 'person' : 'people'}
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Select dishes to start • Order more anytime during your 2-hour session
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Total for {paxCount}</div>
              <button
                onClick={handleAddToCart}
                disabled={selectedCount === 0}
                aria-label={`Add Tapas Night package for ${paxCount} people to cart for $${totalPrice}`}
                className={`
                  px-8 py-3 rounded-2xl font-bold transition-all duration-200 transform will-change-transform text-lg
                  ${selectedCount > 0
                    ? 'bg-black text-white hover:bg-gray-800 active:scale-95 shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                Add to Order • ${totalPrice}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
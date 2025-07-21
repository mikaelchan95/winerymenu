import React, { useState } from 'react';
import { MenuItem as MenuItemType } from '../types';
import { Plus, Minus, AlertCircle, Flame, Check, ShoppingCart, Leaf } from 'lucide-react';

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType, quantity: number) => void;
  compact?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, onAddToCart, compact = false }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Simulate loading state
    await new Promise(resolve => setTimeout(resolve, 300));
    
    onAddToCart(item, quantity);
    setIsAdding(false);
    setShowSuccess(true);
    
    // Reset success state and quantity
    setTimeout(() => {
      setShowSuccess(false);
      setQuantity(1);
    }, 1500);
  };

  if (compact) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-150 p-4 hover:shadow-md active:scale-[0.98] will-change-transform h-full flex flex-col">
        {/* Title + Price Row */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-base leading-tight flex-1 pr-3 line-clamp-2">
            {item.name}
          </h3>
          <span className="text-lg font-bold text-gray-900 flex-shrink-0">
            ${item.price}
          </span>
        </div>
        
        {/* Compact Badges Row */}

        {/* Description for larger compact cards */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1 leading-relaxed">
          {item.description}
        </p>

        {/* Actions Row */}
        <div className="flex items-center space-x-3 mt-auto">
          {/* Compact Quantity Controls */}
          <div className="flex items-center bg-gray-100 rounded-xl p-1.5" role="group" aria-label="Quantity controls">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="w-8 h-8 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 text-gray-600 rounded-lg transition-all duration-150 flex items-center justify-center active:scale-95 touch-target"
            >
              <Minus size={14} />
            </button>
            <span className="font-bold text-gray-900 text-base px-3 min-w-[2rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              aria-label="Increase quantity"
              className="w-8 h-8 bg-white hover:bg-gray-50 text-gray-600 rounded-lg transition-all duration-150 flex items-center justify-center active:scale-95 touch-target"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Compact Add Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding || showSuccess}
            aria-label={`Add ${item.name} to cart for $${(item.price * quantity).toFixed(2)}`}
            className={`
              flex-1 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-150 flex items-center justify-center space-x-2 active:scale-95 min-h-[44px] touch-target shadow-sm
              ${showSuccess 
                ? 'bg-green-600 text-white scale-105' 
                : isAdding 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-black hover:bg-gray-800 text-white hover:scale-[1.02] hover:shadow-md'
              }
            `}
          >
            {showSuccess ? (
              <>
                <Check size={16} />
                <span>Added!</span>
              </>
            ) : isAdding ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                <span>Adding</span>
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                <span>${(item.price * quantity).toFixed(2)}</span>
                {quantity > 1 && (
                  <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded">
                    ×{quantity}
                  </span>
                )}
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Full card view
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full will-change-transform">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1 leading-tight">
            {item.name}
          </h3>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1 leading-relaxed">{item.description}</p>
        
        {/* Quantity & Add Section */}
        <div className="mt-auto">
          {/* Quantity Controls */}
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-3 bg-gray-50 rounded-2xl p-2" role="group" aria-label="Quantity controls">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="w-10 h-10 bg-white hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 text-gray-600 rounded-xl transition-all duration-150 flex items-center justify-center active:scale-95 shadow-sm"
              >
                <Minus size={16} />
              </button>
              <span className="font-bold text-gray-900 min-w-[3ch] text-center text-lg">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                aria-label="Increase quantity"
                className="w-10 h-10 bg-white hover:bg-gray-100 text-gray-600 rounded-xl transition-all duration-150 flex items-center justify-center active:scale-95 shadow-sm"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding || showSuccess}
            aria-label={`Add ${quantity} ${item.name} to cart for $${(item.price * quantity).toFixed(2)}`}
            className={`
              w-full font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 transform active:scale-95 min-h-[56px] shadow-lg hover:shadow-xl
              ${showSuccess 
                ? 'bg-green-600 text-white scale-105' 
                : isAdding 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-black hover:bg-gray-800 text-white hover:scale-[1.02]'
              }
            `}
          >
            {showSuccess ? (
              <>
                <Check size={20} className="animate-in zoom-in duration-300" />
                <span>Added to Cart!</span>
              </>
            ) : isAdding ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <ShoppingCart size={20} />
                <span>Add ${(item.price * quantity).toFixed(2)}</span>
                {quantity > 1 && (
                  <span className="bg-white/20 text-white text-sm px-2 py-1 rounded-lg">
                    ×{quantity}
                  </span>
                )}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
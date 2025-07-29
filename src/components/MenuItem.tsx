import React, { useState } from 'react';
import { MenuItem as MenuItemType } from '../types';
import { Plus, Minus, AlertCircle, Flame, Check, ShoppingCart, Leaf, Eye, Info } from 'lucide-react';

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType, quantity: number) => void;
  onViewDetails: (item: MenuItemType) => void;
  compact?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, onAddToCart, onViewDetails, compact = false }) => {
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
    
    // If item has customizations, open modal instead
    if (item.customizations && item.customizations.length > 0) {
      onViewDetails(item);
      setIsAdding(false);
      return;
    }
    
    onAddToCart(item, quantity);
    setIsAdding(false);
    setShowSuccess(true);
    
    // Reset success state and quantity
    setTimeout(() => {
      setShowSuccess(false);
      setQuantity(1);
    }, 1500);
  };

  const handleCardClick = () => {
    onViewDetails(item);
  };

  if (compact) {
    return (
      <div 
        className="bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-150 p-4 hover:shadow-md will-change-transform h-full flex flex-col cursor-pointer group"
        onClick={handleCardClick}
      >
        {/* Title + Price Row */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-gray-900 text-base leading-tight flex-1 pr-3 line-clamp-2">
            {item.name}
          </h3>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-lg font-bold text-gray-900">
              ${item.price}
            </span>
            <Info size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </div>
        
        {/* Dietary Badges */}
        {(item.tags || item.allergens) && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags?.includes('vegetarian') && (
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium flex items-center space-x-1">
                <Leaf size={10} />
                <span>Vegetarian</span>
              </span>
            )}
            {item.tags?.includes('spicy') && (
              <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium flex items-center space-x-1">
                <Flame size={10} />
                <span>Spicy</span>
              </span>
            )}
            {item.allergens && item.allergens.length > 0 && (
              <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full font-medium">
                Contains allergens
              </span>
            )}
          </div>
        )}

        {/* Description for larger compact cards */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1 leading-relaxed">
          {item.description}
        </p>

        {/* Actions Row */}
        <div className="flex items-center space-x-2 mt-auto" onClick={(e) => e.stopPropagation()}>
          {/* View Details Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(item);
            }}
            aria-label={`View details for ${item.name}`}
            className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-all duration-150 active:scale-95 touch-target"
          >
            <Eye size={16} />
          </button>

          {/* Compact Quantity Controls */}
          <div className="flex items-center bg-gray-100 rounded-xl p-1" role="group" aria-label="Quantity controls">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="w-7 h-7 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 text-gray-600 rounded-lg transition-all duration-150 flex items-center justify-center active:scale-95 touch-target"
            >
              <Minus size={12} />
            </button>
            <span className="font-bold text-gray-900 text-sm px-2 min-w-[1.5rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              aria-label="Increase quantity"
              className="w-7 h-7 bg-white hover:bg-gray-50 text-gray-600 rounded-lg transition-all duration-150 flex items-center justify-center active:scale-95 touch-target"
            >
              <Plus size={12} />
            </button>
          </div>

          {/* Compact Add Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding || showSuccess}
            aria-label={`Add ${item.name} to cart for $${(item.price * quantity).toFixed(2)}`}
            className={`
              flex-1 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 flex items-center justify-center space-x-1 active:scale-95 min-h-[40px] touch-target shadow-sm
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
                <Check size={14} />
                <span>Added!</span>
              </>
            ) : isAdding ? (
              <>
                <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                <span>Adding</span>
              </>
            ) : (
              <>
                <ShoppingCart size={14} />
                <span className="truncate">
                  {item.customizations && item.customizations.length > 0 ? 'Customize' : `$${(item.price * quantity).toFixed(2)}`}
                </span>
                {quantity > 1 && (
                  <span className="bg-white/20 text-white text-xs px-1 py-0.5 rounded">
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
    <div 
      className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full will-change-transform cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = '/assets/images/veganpopcornchickentofurecipe-h1.jpg';
          }}
          onLoad={() => {
            console.log('Image loaded successfully:', item.image);
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Dietary Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {item.tags?.includes('vegetarian') && (
            <span className="bg-green-600/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium flex items-center space-x-1">
              <Leaf size={10} />
              <span>Vegetarian</span>
            </span>
          )}
          {item.tags?.includes('spicy') && (
            <span className="bg-red-600/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium flex items-center space-x-1">
              <Flame size={10} />
              <span>Spicy</span>
            </span>
          )}
        </div>

        {/* View Details Icon */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-black/70 backdrop-blur-sm text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Eye size={16} />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-1" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1 leading-tight">
            {item.name}
          </h3>
        </div>
        
        {/* Allergen Warning */}
        {item.allergens && item.allergens.length > 0 && (
          <div className="flex items-center space-x-2 p-2 bg-amber-50 rounded-lg border border-amber-200 mb-3">
            <AlertCircle size={14} className="text-amber-600 flex-shrink-0" />
            <span className="text-xs text-amber-700 font-medium">Contains allergens</span>
          </div>
        )}
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1 leading-relaxed">{item.description}</p>
        
        {/* Quantity & Add Section */}
        <div className="mt-auto">
          {/* View Details Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(item);
            }}
            aria-label={`View details for ${item.name}`}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all duration-150 flex items-center justify-center space-x-2 mb-3 active:scale-95"
          >
            <Eye size={18} />
            <span>View Details</span>
          </button>

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
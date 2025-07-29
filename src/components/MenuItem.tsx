import React, { useState } from 'react';
import { MenuItem as MenuItemType } from '../types';
import { Plus, Minus, AlertCircle, Flame, Check, ShoppingCart, Leaf, Clock } from 'lucide-react';

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType, quantity: number) => void;
  onItemClick?: (item: MenuItemType) => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, onAddToCart, onItemClick }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

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

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent card click when interacting with quantity controls or add button
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.card-content')) {
      onItemClick?.(item);
    }
  };

  return (
    <div 
      className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full will-change-transform cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          </div>
        )}
        
        <img 
          src={item.image} 
          alt={item.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading="lazy"
        />
        
        {/* Fallback when image fails to load */}
        {imageError && imageLoaded && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="text-2xl mb-2">🍽️</div>
              <div className="text-sm">Image unavailable</div>
            </div>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-1 card-content">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1 leading-tight">
            {item.name}
          </h3>
          <div className="text-xl font-bold text-gray-900 ml-3">
            ${item.price.toFixed(2)}
          </div>
        </div>

        {/* Dietary Labels & Quick Info */}
        <div className="flex flex-wrap gap-1 mb-3">
          {item.dietaryLabels?.slice(0, 2).map(label => (
            <span 
              key={label} 
              className={`
                text-xs px-2 py-1 rounded-full font-medium
                ${label === 'vegan' ? 'bg-green-100 text-green-700' :
                  label === 'vegetarian' ? 'bg-green-100 text-green-600' :
                  label === 'halal available' ? 'bg-blue-100 text-blue-700' :
                  label === 'gluten-free' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-600'
                }
              `}
            >
              {label}
            </span>
          ))}
          {item.preparationTime && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 flex items-center">
              <Clock size={10} className="mr-1" />
              {item.preparationTime}min
            </span>
          )}
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1 leading-relaxed">{item.description}</p>
        
        {/* Allergen Warning */}
        {item.allergens && item.allergens.length > 0 && (
          <div className="flex items-center space-x-1 mb-4 p-2 bg-yellow-50 rounded-lg">
            <AlertCircle size={14} className="text-yellow-600 flex-shrink-0" />
            <span className="text-xs text-yellow-700">
              Contains: {item.allergens.slice(0, 2).join(', ')}
              {item.allergens.length > 2 && ` +${item.allergens.length - 2} more`}
            </span>
          </div>
        )}

        {/* Click hint */}
        <div className="text-xs text-gray-400 mb-4 flex items-center">
          <span>Tap for ingredients & options</span>
        </div>

        {/* Quantity & Add Section */}
        <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
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
                <span>${(item.price * quantity).toFixed(2)}</span>
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
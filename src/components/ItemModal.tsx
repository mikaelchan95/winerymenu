import React, { useState } from 'react';
import { MenuItem, Customization, CartItem } from '../types';
import { X, Plus, Minus, Check, AlertCircle, Clock, Users, Leaf, Shield, ChefHat, Flame } from 'lucide-react';

interface ItemModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (cartItem: Omit<CartItem, 'id'>) => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomizations] = useState<{ [key: string]: string[] }>({});
  const [isAdding, setIsAdding] = useState(false);

  if (!isOpen) return null;

  const handleCustomizationChange = (customizationId: string, optionId: string, maxSelections?: number) => {
    setCustomizations(prev => {
      const current = prev[customizationId] || [];
      const isSelected = current.includes(optionId);
      
      if (isSelected) {
        return {
          ...prev,
          [customizationId]: current.filter(id => id !== optionId)
        };
      } else {
        if (maxSelections === 1) {
          return {
            ...prev,
            [customizationId]: [optionId]
          };
        } else if (maxSelections && current.length >= maxSelections) {
          return prev;
        } else {
          return {
            ...prev,
            [customizationId]: [...current, optionId]
          };
        }
      }
    });
  };

  const calculateTotalPrice = () => {
    let total = item.price * quantity;
    
    if (item.customizations) {
      item.customizations.forEach(customization => {
        const selectedOptions = customizations[customization.id] || [];
        selectedOptions.forEach(optionId => {
          const option = customization.options.find(opt => opt.id === optionId);
          if (option) {
            total += option.price * quantity;
          }
        });
      });
    }
    
    return total;
  };

  const canAddToCart = () => {
    if (!item.customizations) return true;
    
    return item.customizations
      .filter(c => c.required)
      .every(c => customizations[c.id] && customizations[c.id].length > 0);
  };

  const handleAddToCart = async () => {
    if (!canAddToCart()) return;
    
    setIsAdding(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 400));
    
    onAddToCart({
      menuItem: item,
      quantity,
      customizations,
      totalPrice: calculateTotalPrice()
    });
    
    setIsAdding(false);
    onClose();
    setQuantity(1);
    setCustomizations({});
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="min-h-screen bg-gray-50 safe-area-all">
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 safe-area-top">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-150"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Menu</span>
          </button>
          <h1 className="text-xl font-bold text-gray-900 truncate ml-4">{item.name}</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image - Full Size */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 shadow-2xl">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating badges on image */}
            <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
              {item.preparationTime && (
                <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center space-x-2">
                  <Clock size={14} />
                  <span>{item.preparationTime} min</span>
                </div>
              )}
              {item.spiceLevel && (
                <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center space-x-1">
                  <span>Spice Level:</span>
                  <div className="flex items-center space-x-0.5">
                    {Array.from({ length: item.spiceLevel }, (_, i) => (
                      <Flame key={i} size={12} className="text-orange-400" />
                    ))}
                  </div>
                </div>
              )}
              {item.dietaryLabels?.includes('vegetarian') && (
                <div className="bg-green-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  Vegetarian
                </div>
              )}
              {item.dietaryLabels?.includes('vegan') && (
                <div className="bg-green-700/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  Vegan
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{item.name}</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">{item.description}</p>
              <div className="text-3xl font-bold text-gray-900">${item.price}</div>
            </div>

            {/* Serving Size & Prep Time */}
            {(item.servingSize || item.preparationTime) && (
              <div className="flex items-center space-x-8 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                {item.servingSize && (
                  <div className="flex items-center space-x-3">
                    <Users size={20} className="text-gray-500" />
                    <span className="text-gray-700 font-medium">{item.servingSize}</span>
                  </div>
                )}
                {item.preparationTime && (
                  <div className="flex items-center space-x-3">
                    <Clock size={20} className="text-gray-500" />
                    <span className="text-gray-700 font-medium">{item.preparationTime} minutes</span>
                  </div>
                )}
              </div>
            )}

            {/* Ingredients Section */}
            {item.ingredients && item.ingredients.length > 0 && (
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <ChefHat size={24} className="text-gray-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Ingredients</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex flex-wrap gap-3">
                    {item.ingredients.map((ingredient, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium border border-gray-200"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Dietary Information */}
            {item.dietaryLabels && item.dietaryLabels.length > 0 && (
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Leaf size={24} className="text-green-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Dietary Information</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {item.dietaryLabels.map((label, index) => (
                    <span 
                      key={index}
                      className={`
                        px-4 py-3 rounded-xl text-sm font-medium border-2
                        ${label === 'vegan' ? 'bg-green-100 text-green-800 border-green-200' :
                          label === 'vegetarian' ? 'bg-green-100 text-green-700 border-green-200' :
                          label === 'gluten-free' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          'bg-gray-100 text-gray-700 border-gray-200'
                        }
                      `}
                    >
                      {label.charAt(0).toUpperCase() + label.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Allergens Warning */}
            {item.allergens && item.allergens.length > 0 && (
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Shield size={24} className="text-amber-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Allergen Information</h3>
                </div>
                <div className="flex items-start space-x-4 p-6 bg-amber-50 rounded-2xl border-2 border-amber-200 shadow-sm">
                  <AlertCircle size={24} className="text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-amber-800 font-semibold mb-2">Contains or may contain:</p>
                    <div className="flex flex-wrap gap-2">
                      {item.allergens.map((allergen, index) => (
                        <span 
                          key={index}
                          className="bg-amber-200 text-amber-800 px-3 py-1 rounded-lg text-sm font-medium"
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Customizations */}
            {item.customizations && item.customizations.map(customization => (
              <div key={customization.id}>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  {customization.name}
                  {customization.required && (
                    <span className="text-red-500 ml-2 text-lg">*</span>
                  )}
                  {customization.maxSelections && customization.maxSelections > 1 && (
                    <span className="text-gray-500 ml-3 text-base font-normal">
                      (Max {customization.maxSelections})
                    </span>
                  )}
                </h3>
                
                <div className="grid gap-4">
                  {customization.options.map(option => {
                    const isSelected = (customizations[customization.id] || []).includes(option.id);
                    const canSelect = !customization.maxSelections || 
                      (customizations[customization.id] || []).length < customization.maxSelections || 
                      isSelected;
                    
                    return (
                      <label
                        key={option.id}
                        className={`
                          flex items-center justify-between p-6 border-2 rounded-2xl cursor-pointer transition-all duration-150 will-change-transform
                          ${isSelected 
                            ? 'border-black bg-black text-white shadow-xl scale-[1.02]' 
                            : canSelect 
                              ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] bg-white' 
                              : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
                          }
                        `}
                      >
                        <div className="flex items-center space-x-4">
                          <input
                            type={customization.maxSelections === 1 ? "radio" : "checkbox"}
                            name={customization.maxSelections === 1 ? customization.id : undefined}
                            checked={isSelected}
                            onChange={() => handleCustomizationChange(customization.id, option.id, customization.maxSelections)}
                            disabled={!canSelect}
                            className="sr-only"
                          />
                          <div className={`
                            w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-150
                            ${isSelected 
                              ? 'border-white bg-white shadow-sm' 
                              : 'border-gray-300'
                            }
                          `}>
                            {isSelected && (
                              <Check size={14} className="text-black" />
                            )}
                          </div>
                          <span className={`font-semibold text-lg ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                            {option.name}
                          </span>
                        </div>
                        {option.price > 0 && (
                          <span className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-gray-600'}`}>
                            +${option.price}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
            
            {/* Quantity & Add to Cart - Sticky Bottom */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-t-3xl shadow-2xl mt-12">
              <div className="flex items-center justify-between mb-6">
                {/* Quantity Controls */}
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold text-gray-700">Quantity</span>
                  <div className="flex items-center space-x-4 bg-gray-50 rounded-2xl p-3 shadow-sm" role="group" aria-label="Quantity controls">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                      className="w-12 h-12 bg-white hover:bg-gray-100 text-gray-600 rounded-xl transition-all duration-150 flex items-center justify-center active:scale-95 shadow-sm hover:shadow-md"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="text-xl font-bold text-gray-900 min-w-[3ch] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                      className="w-12 h-12 bg-white hover:bg-gray-100 text-gray-600 rounded-xl transition-all duration-150 flex items-center justify-center active:scale-95 shadow-sm hover:shadow-md"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!canAddToCart() || isAdding}
                  aria-label={`Add ${quantity} ${item.name} to cart for $${totalPrice.toFixed(2)}`}
                  className={`
                    px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-150 transform active:scale-95 min-w-[200px] flex items-center justify-center space-x-3 shadow-xl
                    ${canAddToCart() && !isAdding
                      ? 'bg-black hover:bg-gray-800 text-white hover:scale-105 hover:shadow-2xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  {isAdding ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Cart</span>
                      <span>•</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover rounded-t-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-t-3xl" />
          <button
            onClick={onClose}
            aria-label="Close item details"
            className="absolute top-4 right-4 w-10 h-10 bg-white/95 hover:bg-white text-gray-600 rounded-full transition-all duration-150 flex items-center justify-center shadow-lg active:scale-95 hover:shadow-xl"
          >
            <X size={20} />
          </button>
          
          {/* Floating badges */}
          <div className="absolute bottom-4 left-4 flex space-x-2">
            {item.preparationTime && (
              <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg flex items-center space-x-1">
                <Clock size={12} />
                <span>{item.preparationTime} min</span>
              </div>
            )}
            {item.spiceLevel && (
              <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg flex items-center space-x-1">
                <span>Spice Level:</span>
                <div className="flex items-center space-x-0.5">
                  {Array.from({ length: item.spiceLevel }, (_, i) => (
                    <Flame key={i} size={12} className="text-orange-400" />
                  ))}
                </div>
              </div>
            )}
            {item.dietaryLabels?.includes('vegetarian') && (
              <div className="bg-green-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                Vegetarian
              </div>
            )}
            {item.dietaryLabels?.includes('vegan') && (
              <div className="bg-green-700/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                Vegan
              </div>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900 flex-1">{item.name}</h2>
            <span className="text-2xl font-bold text-gray-900 ml-4">${item.price}</span>
          </div>
          
          <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
          
          {/* Serving Size & Prep Time */}
          {(item.servingSize || item.preparationTime) && (
            <div className="flex items-center space-x-6 mb-6 p-4 bg-gray-50 rounded-xl">
              {item.servingSize && (
                <div className="flex items-center space-x-2">
                  <Users size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-700">{item.servingSize}</span>
                </div>
              )}
              {item.preparationTime && (
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-700">{item.preparationTime} minutes</span>
                </div>
              )}
            </div>
          )}

          {/* Ingredients Section */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <ChefHat size={18} className="text-gray-600" />
                <h3 className="text-lg font-bold text-gray-900">Ingredients</h3>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.map((ingredient, index) => (
                    <span 
                      key={index}
                      className="bg-white text-gray-700 px-3 py-1 rounded-lg text-sm border border-gray-200"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Dietary Information */}
          {item.dietaryLabels && item.dietaryLabels.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <Leaf size={18} className="text-green-600" />
                <h3 className="text-lg font-bold text-gray-900">Dietary Information</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.dietaryLabels.map((label, index) => (
                  <span 
                    key={index}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-medium
                      ${label === 'vegan' ? 'bg-green-100 text-green-800 border border-green-200' :
                        label === 'vegetarian' ? 'bg-green-100 text-green-700 border border-green-200' :
                        label === 'gluten-free' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                        'bg-gray-100 text-gray-700 border border-gray-200'
                      }
                    `}
                  >
                    {label.charAt(0).toUpperCase() + label.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Allergens Warning */}
          {item.allergens && item.allergens.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <Shield size={18} className="text-amber-600" />
                <h3 className="text-lg font-bold text-gray-900">Allergen Information</h3>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-xl border border-amber-200 shadow-sm">
              <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-800 font-medium mb-1">Contains or may contain:</p>
                <div className="flex flex-wrap gap-1">
                  {item.allergens.map((allergen, index) => (
                    <span 
                      key={index}
                      className="bg-amber-200 text-amber-800 px-2 py-1 rounded text-xs font-medium"
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            </div>
          )}
          
          {/* Customizations */}
          {item.customizations && item.customizations.map(customization => (
            <div key={customization.id} className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                {customization.name}
                {customization.required && (
                  <span className="text-red-500 ml-2 text-sm">*</span>
                )}
                {customization.maxSelections && customization.maxSelections > 1 && (
                  <span className="text-gray-500 ml-2 text-sm font-normal">
                    (Max {customization.maxSelections})
                  </span>
                )}
              </h3>
              
              <div className="grid gap-3">
                {customization.options.map(option => {
                  const isSelected = (customizations[customization.id] || []).includes(option.id);
                  const canSelect = !customization.maxSelections || 
                    (customizations[customization.id] || []).length < customization.maxSelections || 
                    isSelected;
                  
                  return (
                    <label
                      key={option.id}
                      className={`
                        flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all duration-150 will-change-transform
                        ${isSelected 
                          ? 'border-black bg-black text-white shadow-lg scale-[1.02]' 
                          : canSelect 
                            ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm hover:scale-[1.01] active:scale-[0.99]' 
                            : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type={customization.maxSelections === 1 ? "radio" : "checkbox"}
                          name={customization.maxSelections === 1 ? customization.id : undefined}
                          checked={isSelected}
                          onChange={() => handleCustomizationChange(customization.id, option.id, customization.maxSelections)}
                          disabled={!canSelect}
                          className="sr-only"
                        />
                        <div className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150
                          ${isSelected 
                            ? 'border-white bg-white shadow-sm' 
                            : 'border-gray-300'
                          }
                        `}>
                          {isSelected && (
                            <Check size={12} className="text-black" />
                          )}
                        </div>
                        <span className={`font-medium ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                          {option.name}
                        </span>
                      </div>
                      {option.price > 0 && (
                        <span className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-600'}`}>
                          +${option.price}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200">
            {/* Quantity Controls */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Quantity</span>
              <div className="flex items-center space-x-3 bg-gray-50 rounded-2xl p-2 shadow-sm" role="group" aria-label="Quantity controls">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-10 bg-white hover:bg-gray-100 text-gray-600 rounded-xl transition-all duration-150 flex items-center justify-center active:scale-95 shadow-sm hover:shadow-md"
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-bold text-gray-900 min-w-[3ch] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="w-10 h-10 bg-white hover:bg-gray-100 text-gray-600 rounded-xl transition-all duration-150 flex items-center justify-center active:scale-95 shadow-sm hover:shadow-md"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!canAddToCart() || isAdding}
              aria-label={`Add ${quantity} ${item.name} to cart for $${totalPrice.toFixed(2)}`}
              className={`
                px-8 py-4 rounded-xl font-bold transition-all duration-150 transform active:scale-95 min-w-[160px] flex items-center justify-center space-x-2 will-change-transform
                ${canAddToCart() && !isAdding
                  ? 'bg-black hover:bg-gray-800 text-white hover:scale-105 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              {isAdding ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <span>Add ${totalPrice.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
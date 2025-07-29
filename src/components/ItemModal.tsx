import React, { useState } from 'react';
import { MenuItem, Customization, CartItem } from '../types';
import { X, Plus, Minus, Check, AlertCircle, Clock, Users, Leaf, Shield, ChefHat, Flame, ArrowLeft } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="flex items-center px-6 py-4 pt-safe-area">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-150 mr-4"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-lg font-bold text-gray-900 truncate">{item.name}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="lg:sticky lg:top-32">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 shadow-xl">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Info Badges */}
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {item.preparationTime && (
                  <div className="bg-black/80 backdrop-blur text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center space-x-1.5">
                    <Clock size={12} />
                    <span>{item.preparationTime} min</span>
                  </div>
                )}
                {item.spiceLevel && item.spiceLevel > 0 && (
                  <div className="bg-red-600/90 backdrop-blur text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center space-x-1">
                    {Array.from({ length: Math.min(item.spiceLevel, 3) }, (_, i) => (
                      <Flame key={i} size={10} />
                    ))}
                  </div>
                )}
                {item.dietaryLabels?.includes('vegetarian') && (
                  <div className="bg-green-600/90 backdrop-blur text-white px-3 py-1.5 rounded-full text-sm font-medium">
                    Vegetarian
                  </div>
                )}
                {item.dietaryLabels?.includes('vegan') && (
                  <div className="bg-green-700/90 backdrop-blur text-white px-3 py-1.5 rounded-full text-sm font-medium">
                    Vegan
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Header Info */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">{item.name}</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">{item.description}</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-900">${item.price}</span>
                {item.servingSize && (
                  <span className="text-gray-500">• {item.servingSize}</span>
                )}
              </div>
            </div>

            {/* Quick Info */}
            {(item.servingSize || item.preparationTime) && (
              <div className="flex items-center space-x-6 p-4 bg-white rounded-xl border border-gray-200">
                {item.servingSize && (
                  <div className="flex items-center space-x-2">
                    <Users size={18} className="text-gray-500" />
                    <span className="text-gray-700 font-medium">{item.servingSize}</span>
                  </div>
                )}
                {item.preparationTime && (
                  <div className="flex items-center space-x-2">
                    <Clock size={18} className="text-gray-500" />
                    <span className="text-gray-700 font-medium">{item.preparationTime} min</span>
                  </div>
                )}
              </div>
            )}

            {/* Ingredients */}
            {item.ingredients && item.ingredients.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center space-x-2 mb-4">
                  <ChefHat size={20} className="text-gray-600" />
                  <h3 className="text-xl font-bold text-gray-900">Ingredients</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.map((ingredient, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Dietary Info */}
            {item.dietaryLabels && item.dietaryLabels.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Leaf size={20} className="text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">Dietary Information</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.dietaryLabels.map((label, index) => (
                    <span 
                      key={index}
                      className={`
                        px-3 py-1.5 rounded-lg text-sm font-medium
                        ${label === 'vegan' ? 'bg-green-100 text-green-800' :
                          label === 'vegetarian' ? 'bg-green-100 text-green-700' :
                          label === 'gluten-free' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-700'
                        }
                      `}
                    >
                      {label.charAt(0).toUpperCase() + label.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Allergens */}
            {item.allergens && item.allergens.length > 0 && (
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <div className="flex items-start space-x-3">
                  <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-bold text-amber-900 mb-2">Allergen Information</h3>
                    <p className="text-amber-800 text-sm mb-3">Contains or may contain:</p>
                    <div className="flex flex-wrap gap-2">
                      {item.allergens.map((allergen, index) => (
                        <span 
                          key={index}
                          className="bg-amber-200 text-amber-800 px-2 py-1 rounded text-sm font-medium"
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
              <div key={customization.id} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-bold text-gray-900">{customization.name}</h3>
                    {customization.required && (
                      <span className="text-red-500 text-sm font-medium">Required</span>
                    )}
                    {customization.maxSelections && customization.maxSelections > 1 && (
                      <span className="text-gray-500 text-sm">
                        (Max {customization.maxSelections})
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {customization.options.map(option => {
                    const isSelected = (customizations[customization.id] || []).includes(option.id);
                    const canSelect = !customization.maxSelections || 
                      (customizations[customization.id] || []).length < customization.maxSelections || 
                      isSelected;
                    
                    return (
                      <label
                        key={option.id}
                        className={`
                          flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all duration-150
                          ${isSelected 
                            ? 'border-black bg-black text-white' 
                            : canSelect 
                              ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white' 
                              : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
                          }
                        `}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`
                            w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150
                            ${isSelected 
                              ? 'border-white bg-white' 
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
                          <span className={`font-bold ${isSelected ? 'text-white' : 'text-gray-600'}`}>
                            +${option.price}
                          </span>
                        )}
                        <input
                          type={customization.maxSelections === 1 ? "radio" : "checkbox"}
                          name={customization.maxSelections === 1 ? customization.id : undefined}
                          checked={isSelected}
                          onChange={() => handleCustomizationChange(customization.id, option.id, customization.maxSelections)}
                          disabled={!canSelect}
                          className="sr-only"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>

      {/* Sticky Add to Cart */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="p-6 pb-safe-area">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 font-medium">Qty</span>
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 bg-white text-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-bold text-gray-900 min-w-[2ch] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 bg-white text-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${totalPrice.toFixed(2)}
            </div>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!canAddToCart() || isAdding}
            className={`
              px-8 py-3 rounded-xl font-bold text-lg transition-all duration-150 flex items-center space-x-2
              ${canAddToCart() && !isAdding
                ? 'bg-black hover:bg-gray-800 text-white'
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
              <span>Add to Cart</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
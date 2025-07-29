import React, { useState } from 'react';
import { MenuItem, Customization, CartItem } from '../types';
import { X, Plus, Minus, Check, AlertCircle, Leaf, Flame, Clock, Award, Info } from 'lucide-react';

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

  // Mock ingredient data - in production this would come from the database
  const getIngredients = (item: MenuItem): string[] => {
    const ingredientMap: { [key: string]: string[] } = {
      'starters-2': ['Jamón ibérico shoulder', 'Sea salt', 'Black pepper'],
      'mains-3': ['Australian lamb rack', 'Baby potatoes', 'Spinach', 'Guinness', 'Piquillo peppers'],
      'mains-6': ['Galician grass-fed beef', 'Sea salt', 'Black pepper', 'Garlic', 'Rosemary'],
      'paellas-1': ['Bomba rice', 'Tiger prawns', 'Mussels', 'Squid', 'Saffron', 'Soffritto', 'Sambuca Vaccari'],
      'tapas-1': ['Padrón peppers', 'Sea salt', 'Togarashi'],
      'tapas-5': ['Agria potatoes', 'Tomato sauce', 'Mayonnaise', 'Togarashi', 'Paprika'],
    };
    return ingredientMap[item.id] || ['Premium ingredients', 'Chef\'s selection'];
  };

  // Get dietary information
  const getDietaryInfo = (item: MenuItem) => {
    const info = [];
    
    if (item.tags?.includes('vegetarian')) info.push({ label: 'Vegetarian', icon: Leaf, color: 'text-green-600', bg: 'bg-green-100' });
    if (item.tags?.includes('vegan')) info.push({ label: 'Vegan', icon: Leaf, color: 'text-green-600', bg: 'bg-green-100' });
    if (item.tags?.includes('premium')) info.push({ label: 'Premium', icon: Award, color: 'text-purple-600', bg: 'bg-purple-100' });
    if (item.spiceLevel && item.spiceLevel > 0) info.push({ label: `Spicy Level ${item.spiceLevel}`, icon: Flame, color: 'text-red-600', bg: 'bg-red-100' });
    
    return info;
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200 safe-area-all">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto animate-in zoom-in duration-300 shadow-2xl mt-safe-area mb-safe-area">
        {/* Header Image */}
        <div className="relative h-64">
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
          
          {/* Dietary badges */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {getDietaryInfo(item).map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg flex items-center space-x-1">
                  <IconComponent size={12} />
                  <span>{info.label}</span>
                </div>
              );
            })}
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
          
          {/* Ingredients Section */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center space-x-2 mb-3">
              <Info size={18} className="text-gray-600" />
              <h4 className="font-semibold text-gray-900">Key Ingredients</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {getIngredients(item).map((ingredient, index) => (
                <span 
                  key={index}
                  className="bg-white text-gray-700 text-sm px-3 py-1 rounded-full border border-gray-200 font-medium"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          {/* Dietary Information */}
          {getDietaryInfo(item).length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <h4 className="font-semibold text-blue-900 mb-3">Dietary Information</h4>
              <div className="flex flex-wrap gap-2">
                {getDietaryInfo(item).map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <span 
                      key={index}
                      className={`${info.bg} ${info.color} text-sm px-3 py-1 rounded-full font-medium flex items-center space-x-1`}
                    >
                      <IconComponent size={12} />
                      <span>{info.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Allergens Warning */}
          {item.allergens && item.allergens.length > 0 && (
            <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-xl border border-amber-200 mb-6 shadow-sm">
              <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">⚠️ Allergen Warning</h4>
                <p className="text-amber-700 text-sm mb-2">This dish contains:</p>
                <div className="flex flex-wrap gap-1">
                  {item.allergens.map((allergen, index) => (
                    <span 
                      key={index}
                      className="bg-amber-200 text-amber-800 text-xs px-2 py-1 rounded-full font-medium uppercase"
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
                <p className="text-amber-600 text-xs mt-2 font-medium">
                  Please inform our staff if you have any allergies or dietary requirements.
                </p>
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
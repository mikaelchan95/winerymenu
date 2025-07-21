import React from 'react';
import { CartItem } from '../types';
import { ShoppingCart, Plus, Minus, Trash2, X, Receipt, AlertCircle } from 'lucide-react';
import { tapasNightItems } from '../data/tapasNight';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  isOpen,
  onClose 
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const serviceCharge = subtotal * 0.10; // 10% service charge
  const gst = (subtotal + serviceCharge) * 0.09; // 9% GST on subtotal + service charge
  const totalAmount = subtotal + serviceCharge + gst;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Helper function to render customizations
  const renderCustomizations = (item: CartItem) => {
    if (Object.keys(item.customizations).length === 0) return null;

    // Special handling for Tapas Night
    if (item.menuItem.id === 'tapas-night-package' && item.customizations['selected-dishes']) {
      const selectedDishIds = item.customizations['selected-dishes'];
      const selectedDishes = selectedDishIds
        .map(id => tapasNightItems.find(dish => dish.id === id))
        .filter(Boolean);

      return (
        <div className="mb-2 p-2 bg-white rounded-lg border border-gray-100">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Selected Dishes ({selectedDishes.length}/8)
          </div>
          <div className="space-y-0.5 max-h-24 overflow-y-auto">
            {selectedDishes.map((dish, index) => (
              <div key={dish?.id || index} className="text-xs text-gray-700">
                • {dish?.name}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Standard customizations
    return (
      <div className="mb-2 p-2 bg-white rounded-lg border border-gray-100">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Add-ons</div>
        <div className="space-y-0.5">
          {Object.entries(item.customizations).map(([customizationId, optionIds]) => (
            <div key={customizationId}>
              {optionIds.map(optionId => {
                const customization = item.menuItem.customizations?.find(c => c.id === customizationId);
                const option = customization?.options.find(o => o.id === optionId);
                return option ? (
                  <div key={optionId} className="flex justify-between items-center text-xs">
                    <span className="text-gray-700">• {option.name}</span>
                    {option.price > 0 && (
                      <span className="text-gray-600 font-medium">+${option.price}</span>
                    )}
                  </div>
                ) : null;
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-end z-50 animate-in fade-in duration-150 safe-area-all">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in zoom-in duration-200 safe-area-right">
        {/* Header */}
        <div className="p-4 pt-safe-area-top border-b border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <ShoppingCart size={16} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
                {itemCount > 0 && (
                  <span className="text-xs text-gray-500">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-150 flex items-center justify-center active:scale-95"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-auto momentum-scroll">
          {items.length === 0 ? (
            <div className="text-center py-20 px-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cart is empty</h3>
              <p className="text-gray-500 text-sm">Add some delicious items to get started</p>
            </div>
          ) : (
            <div className="p-3 space-y-2">
              {items.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-xl p-3 border border-gray-100 transition-all duration-150 hover:shadow-sm">
                  {/* Header Row */}
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 flex-1 pr-3 leading-tight text-sm">
                      {item.menuItem.name}
                    </h3>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <span className="font-bold text-gray-900 text-sm">${item.totalPrice.toFixed(2)}</span>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.menuItem.name} from cart`}
                        className="w-6 h-6 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all duration-150 flex items-center justify-center active:scale-95"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Customizations */}
                  {renderCustomizations(item)}
                  
                  {/* Quantity Controls */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2" role="group" aria-label="Quantity controls">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        aria-label="Decrease quantity"
                        className="w-6 h-6 bg-white hover:bg-gray-100 text-gray-600 rounded-full transition-all duration-150 border border-gray-200 flex items-center justify-center active:scale-95"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-semibold text-gray-900 min-w-[1.5ch] text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="w-6 h-6 bg-white hover:bg-gray-100 text-gray-600 rounded-full transition-all duration-150 border border-gray-200 flex items-center justify-center active:scale-95"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    
                    {/* Unit Price */}
                    <span className="text-xs text-gray-500">
                      ${(item.totalPrice / item.quantity).toFixed(2)} each
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Section */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50 pb-safe-area-bottom">
            {/* Price Breakdown - Compact */}
            <div className="p-4 space-y-2">
              <div className="flex items-center space-x-2 mb-3">
                <Receipt size={14} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Bill Breakdown</span>
              </div>
              
              <div className="space-y-1 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Service (10%)</span>
                  <span className="font-medium text-gray-900">${serviceCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">GST (9%)</span>
                  <span className="font-medium text-gray-900">${gst.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Tax Notice - Compact */}
              <div className="flex items-start space-x-2 p-2 bg-blue-50 rounded-lg border border-blue-100 mt-3">
                <AlertCircle size={12} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 leading-relaxed">
                  All taxes and charges included
                </p>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="p-4 pt-0">
              <button
                onClick={onCheckout}
                aria-label={`Confirm order for $${totalAmount.toFixed(2)}`}
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-150 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Confirm Order</span>
                <span className="text-sm">•</span>
                <span className="text-lg">${totalAmount.toFixed(2)}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
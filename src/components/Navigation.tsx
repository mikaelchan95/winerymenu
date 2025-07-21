import React from 'react';
import { Store, ShoppingCart } from 'lucide-react';

interface NavigationProps {
  cartItemCount: number;
  cartTotal: number;
  onCartClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  cartItemCount, 
  cartTotal, 
  onCartClick 
}) => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
            <Store size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">The Winery Tapas Bar</h1>
            <p className="text-sm text-gray-500">Fine Wine & Spanish Tapas</p>
          </div>
        </div>

        {/* Cart Button */}
        <button
          onClick={onCartClick}
          className="relative bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center space-x-3"
        >
          <ShoppingCart size={20} />
          <span>Cart</span>
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
          {cartTotal > 0 && (
            <span className="ml-2 font-semibold">${cartTotal.toFixed(2)}</span>
          )}
        </button>
      </div>
    </nav>
  );
};
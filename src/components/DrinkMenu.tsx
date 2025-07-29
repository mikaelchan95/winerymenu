import React, { useState } from 'react';
import { MenuItem as MenuItemType } from '../types';
import { 
  happyHourItems, 
  beerItems, 
  cocktailItems, 
  ginInfusions, 
  shotItems, 
  spiritItems,
  nonAlcoholicItems 
} from '../data/drinks';
import { Clock, Filter, Star, Plus, Minus, ShoppingCart, Check, Wine } from 'lucide-react';

interface DrinkMenuProps {
  onAddToCart: (item: MenuItemType, quantity: number) => void;
  activeCategory: string;
}

const drinkSubcategories = {
  'happy-hour': ['Bubbles', 'White Wine', 'Rosé', 'Red Wine', 'Spirits', 'Beer', 'Cocktails'],
  'beer': ['Draft', 'Bottled'],
  'cocktails': ['Signature', 'Classic', 'Mocktails', 'Gin Infusions'],
  'spirits': ['Whisky', 'Gin', 'Vodka', 'Bourbon', 'Rum', 'Tequila', 'Brandy'],
  'shots': ['Premium Shots', 'Classic Shots', 'Signature Shots', 'Energy Shots'],
  'non-alcoholic': ['Water', 'Soft Drinks', 'Coffee', 'Tea']
};

export const DrinkMenu: React.FC<DrinkMenuProps> = ({ onAddToCart, activeCategory }) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<string>('all');

  const getDrinkItems = () => {
    switch (activeCategory) {
      case 'happy-hour': return happyHourItems;
      case 'beer': return beerItems;
      case 'cocktails': return [...cocktailItems, ...ginInfusions];
      case 'spirits': return spiritItems;
      case 'shots': return shotItems;
      case 'non-alcoholic': return nonAlcoholicItems;
      default: return [];
    }
  };

  const items = getDrinkItems();
  const subcategories = drinkSubcategories[activeCategory as keyof typeof drinkSubcategories] || [];

  const filteredItems = items.filter(item => {
    const subcategoryMatch = !selectedSubcategory || item.subcategory === selectedSubcategory;
    const priceMatch = priceFilter === 'all' || 
      (priceFilter === 'under-15' && item.price < 15) ||
      (priceFilter === '15-25' && item.price >= 15 && item.price <= 25) ||
      (priceFilter === 'over-25' && item.price > 25);
    
    return subcategoryMatch && priceMatch;
  });

  const getHappyHourNotice = () => {
    if (activeCategory === 'happy-hour') {
      return (
        <div className="mb-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <Clock size={24} className="text-white flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-1">Happy Hour Special</h3>
              <p className="text-orange-100 text-sm">Available from opening until 7:00 PM daily</p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const getSpecialBanner = () => {
    if (activeCategory === 'cocktails' && selectedSubcategory === 'Gin Infusions') {
      return (
        <div className="mb-6 bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-4 mb-3">
            <Star size={24} className="text-white" />
            <h3 className="font-bold text-lg">Artisan Gin Infusions</h3>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Our homemade infusions are crafted with a blend of enchanting flavors. 
            Every gin begins with a meticulously selected base, infused with organic ingredients 
            handpicked by our passionate bar team.
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {getHappyHourNotice()}
      
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        {/* Subcategory Filter */}
        {subcategories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSubcategory(null)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                !selectedSubcategory 
                  ? 'bg-black text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {subcategories.map(subcategory => (
              <button
                key={subcategory}
                onClick={() => setSelectedSubcategory(subcategory)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                  selectedSubcategory === subcategory 
                    ? 'bg-black text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {subcategory}
              </button>
            ))}
          </div>
        )}

        {/* Price Filter */}
        <div className="flex items-center space-x-2">
          <Filter size={16} className="text-gray-400" />
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm font-medium border-none focus:ring-2 focus:ring-black transition-all duration-150"
          >
            <option value="all">All Prices</option>
            <option value="under-15">Under $15</option>
            <option value="15-25">$15 - $25</option>
            <option value="over-25">Over $25</option>
          </select>
        </div>
      </div>

      {getSpecialBanner()}

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map(item => (
          <DrinkCard key={item.id} item={item} onAddToCart={onAddToCart} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Wine size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-500">No items found matching your filters</p>
        </div>
      )}
    </div>
  );
};

interface DrinkCardProps {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType, quantity: number) => void;
}

const DrinkCard: React.FC<DrinkCardProps> = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isHappyHour = item.category === 'happy-hour';
  const isFeatured = item.featured;

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

  return (
    <div className={`
      bg-white rounded-2xl p-5 border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full will-change-transform
      ${isHappyHour ? 'border-orange-200 bg-gradient-to-br from-orange-50 to-white' : 'border-gray-100 hover:border-gray-200'}
      ${isFeatured ? 'ring-1 ring-black ring-opacity-10' : ''}
    `}>
      {/* Badges */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex space-x-1">
          {isHappyHour && (
            <div className="bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
              HH
            </div>
          )}
          {isFeatured && (
            <div className="bg-black text-white px-2 py-1 rounded-lg text-xs font-bold">
              SIG
            </div>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-gray-900 text-base leading-tight flex-1 pr-3">
          {item.name}
        </h3>
        <span className="font-bold text-gray-900 whitespace-nowrap text-xl">
          ${item.price}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1 leading-relaxed">
        {item.description}
      </p>

      {/* Tags */}
      {item.tags && (
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.slice(0, 2).map(tag => (
            <span 
              key={tag} 
              className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Quantity & Add Section */}
      <div className="mt-auto space-y-3">
        {/* Quantity Controls */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-2" role="group" aria-label="Quantity controls">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="w-8 h-8 bg-white hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 text-gray-600 rounded-lg transition-all duration-150 flex items-center justify-center active:scale-95 shadow-sm touch-target"
            >
              <Minus size={14} />
            </button>
            <span className="font-bold text-gray-900 min-w-[2.5rem] text-center text-base">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              aria-label="Increase quantity"
              className="w-8 h-8 bg-white hover:bg-gray-100 text-gray-600 rounded-lg transition-all duration-150 flex items-center justify-center active:scale-95 shadow-sm touch-target"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Add Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || showSuccess}
          aria-label={`Add ${quantity} ${item.name} to cart for $${(item.price * quantity).toFixed(2)}`}
          className={`
            w-full font-bold py-3 px-4 rounded-xl transition-all duration-200 text-base flex items-center justify-center space-x-2 active:scale-95 shadow-lg hover:shadow-xl min-h-[48px] touch-target
            ${showSuccess 
              ? 'bg-green-600 text-white scale-105' 
              : isAdding 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : isHappyHour 
                  ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                  : 'bg-black hover:bg-gray-800 text-white'
            }
          `}
        >
          {showSuccess ? (
            <>
              <Check size={18} className="animate-in zoom-in duration-300" />
              <span>Added!</span>
            </>
          ) : isAdding ? (
            <>
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              <span>${(item.price * quantity).toFixed(2)}</span>
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
};
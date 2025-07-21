import React from 'react';
import { Category } from '../types';
import { UtensilsCrossed, Sparkles, ChefHat, Cake, Wine, Clock, Beer, Martini, Bot as Bottle, Zap, Coffee } from 'lucide-react';

const iconMap = {
  UtensilsCrossed,
  Sparkles,
  ChefHat,
  Cake,
  Wine,
  Clock,
  Beer,
  Martini,
  Bottle,
  Zap,
  Coffee
};

interface MenuCategoryProps {
  category: Category;
  isActive: boolean;
  onClick: () => void;
}

export const MenuCategory: React.FC<MenuCategoryProps> = ({ 
  category, 
  isActive, 
  onClick 
}) => {
  const IconComponent = iconMap[category.icon as keyof typeof iconMap];

  return (
    <button
      onClick={onClick}
      aria-label={`Select ${category.name} category`}
      className={`
        w-full flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-150 text-left text-sm relative will-change-transform
        ${isActive 
          ? 'bg-gray-100 text-gray-900 font-semibold shadow-sm ring-1 ring-gray-200 scale-[1.02]' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1 hover:shadow-sm active:scale-95'
        }
      `}
    >
      <IconComponent size={16} />
      <span className="truncate">{category.name}</span>
      {category.special && (
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 animate-pulse-glow shadow-sm"></div>
      )}
    </button>
  );
};
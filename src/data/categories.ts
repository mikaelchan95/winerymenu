import { Category } from '../types';

export const categories: Category[] = [
  { id: 'tapas', name: 'Tapas', icon: 'UtensilsCrossed' },
  { id: 'starters', name: 'Starters', icon: 'Sparkles' },
  { id: 'mains', name: 'Mains', icon: 'UtensilsCrossed' },
  { id: 'paellas', name: 'Paellas', icon: 'ChefHat' },
  { id: 'desserts', name: 'Desserts', icon: 'Cake' },
  { id: 'drinks', name: 'Drinks', icon: 'Wine' },
];

export const drinkCategories = [
  { id: 'happy-hour', name: 'Happy Hour', icon: 'Clock', special: true },
  { id: 'wine-champagne', name: 'Wine & Champagne', icon: 'Wine' },
  { id: 'beer', name: 'Beer', icon: 'Beer' },
  { id: 'cocktails', name: 'Cocktails', icon: 'Martini' },
  { id: 'spirits', name: 'Premium Spirits', icon: 'Bottle' },
  { id: 'shots', name: 'Shots & Specials', icon: 'Zap' },
  { id: 'non-alcoholic', name: 'Non-Alcoholic', icon: 'Coffee' },
];
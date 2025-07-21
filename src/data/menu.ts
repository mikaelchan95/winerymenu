import { MenuItem, Category } from '../types';
import { categories } from './categories';
import { allDrinkItems } from './drinks';

export { categories };

// Menu items are now loaded from Supabase
// This file exports categories and drink items only
export const drinkItems = allDrinkItems;
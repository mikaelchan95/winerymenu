import { MenuItem, Category } from '../types';
import { categories } from './categories';
import { foodItems } from './food';
import { allDrinkItems } from './drinks';

export { categories };

// Only include food items in main menu, drinks are handled separately
export const menuItems: MenuItem[] = [...foodItems];
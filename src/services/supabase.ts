import { createClient } from '@supabase/supabase-js';
import { MenuItem } from '../types';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Database interface for menu items
 */
interface DatabaseMenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  category: string;
  subcategory: string | null;
  allergens: string[] | null;
  tags: string[] | null;
  spice_level: number | null;
  featured: boolean | null;
  available: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

/**
 * Transform database menu item to application menu item
 */
const transformMenuItem = (dbItem: DatabaseMenuItem): MenuItem => ({
  id: dbItem.id,
  name: dbItem.name,
  description: dbItem.description || '',
  price: dbItem.price,
  image: dbItem.image || '/assets/images/veganpopcornchickentofurecipe-h1.jpg',
  category: dbItem.category,
  subcategory: dbItem.subcategory || undefined,
  allergens: dbItem.allergens || undefined,
  tags: dbItem.tags || undefined,
  spiceLevel: dbItem.spice_level || undefined,
  featured: dbItem.featured || false,
});

/**
 * Fetch all available menu items from Supabase
 */
export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('available', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching menu items:', error);
      throw new Error(`Failed to fetch menu items: ${error.message}`);
    }

    if (!data) {
      return [];
    }

    return data.map(transformMenuItem);
  } catch (error) {
    console.error('Error in fetchMenuItems:', error);
    // Return empty array on error to prevent app crash
    return [];
  }
};

/**
 * Fetch menu items by category
 */
export const fetchMenuItemsByCategory = async (category: string): Promise<MenuItem[]> => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('category', category)
      .eq('available', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching menu items by category:', error);
      throw new Error(`Failed to fetch menu items: ${error.message}`);
    }

    if (!data) {
      return [];
    }

    return data.map(transformMenuItem);
  } catch (error) {
    console.error('Error in fetchMenuItemsByCategory:', error);
    return [];
  }
};

/**
 * Fetch featured menu items
 */
export const fetchFeaturedMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('featured', true)
      .eq('available', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching featured menu items:', error);
      throw new Error(`Failed to fetch featured menu items: ${error.message}`);
    }

    if (!data) {
      return [];
    }

    return data.map(transformMenuItem);
  } catch (error) {
    console.error('Error in fetchFeaturedMenuItems:', error);
    return [];
  }
export const MENU_IMAGES_BUCKET = 'food-images';

/**
 * Get public URL for a menu image
 */
export const getMenuImageUrl = (imagePath: string): string => {
  if (!imagePath) {
    return '/assets/images/veganpopcornchickentofurecipe-h1.jpg'; // Fallback image
  }

  // If it's already a full URL, return as is
  if (imagePath.startsWith('http') || imagePath.startsWith('/assets')) {
    return imagePath;
  }

  // Handle different path formats from manual uploads
  let cleanPath = imagePath;
  
  // Remove bucket name if it's included in the path
  if (cleanPath.startsWith('menu-images/')) {
    cleanPath = cleanPath.substring('menu-images/'.length);
  }
  
  // Remove leading slash if present
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1);
  }

  // Get public URL from Supabase Storage
  const { data } = supabase.storage
    .from(MENU_IMAGES_BUCKET)
    .getPublicUrl(cleanPath);

  return data?.publicUrl || '/assets/images/veganpopcornchickentofurecipe-h1.jpg';
};

/**
 * Real-time subscription to menu items changes
 */
export const subscribeToMenuItems = (callback: (items: MenuItem[]) => void) => {
  const subscription = supabase
    .channel('menu_items_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'menu_items',
      },
      async () => {
        // Refetch all menu items when any change occurs
        const items = await fetchMenuItems();
        callback(items);
      }
    )
    .subscribe();

  return subscription;
};
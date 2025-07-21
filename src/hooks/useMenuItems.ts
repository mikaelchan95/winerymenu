import { useState, useEffect } from 'react';
import { MenuItem } from '../types';
import { fetchMenuItems, subscribeToMenuItems } from '../services/supabase';

interface UseMenuItemsResult {
  menuItems: MenuItem[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch and manage menu items from Supabase
 * Provides real-time updates and loading states
 */
export const useMenuItems = (): UseMenuItemsResult => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const items = await fetchMenuItems();
      setMenuItems(items);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch menu items';
      setError(errorMessage);
      console.error('Error fetching menu items:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = async () => {
    await fetchItems();
  };

  useEffect(() => {
    // Initial fetch
    fetchItems();

    // Set up real-time subscription
    const subscription = subscribeToMenuItems((updatedItems) => {
      setMenuItems(updatedItems);
      setError(null);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    menuItems,
    isLoading,
    error,
    refetch
  };
};
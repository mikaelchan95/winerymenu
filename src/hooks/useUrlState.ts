import { useState, useEffect, useCallback } from 'react';
import { categories, drinkCategories } from '../data/categories';

type TabType = 'menu' | 'promotions' | 'orders' | 'profile';

interface UrlState {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activeDrinkCategory: string;
  setActiveDrinkCategory: (category: string) => void;
}

/**
 * Custom hook to manage URL state for the restaurant ordering app
 * Handles browser navigation and bookmark support by syncing state with URL parameters
 */
export const useUrlState = (): UrlState => {
  // Initialize state from URL or defaults
  const getInitialState = () => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab') as TabType || 'menu';
    const category = params.get('category') || categories[0].id;
    const drinkCategory = params.get('drinkCategory') || drinkCategories[0].id;

    // Validate tab exists
    const validTabs: TabType[] = ['menu', 'promotions', 'orders', 'profile'];
    const validTab = validTabs.includes(tab) ? tab : 'menu';

    // Validate category exists
    const allCategories = [...categories, ...drinkCategories];
    const validCategory = allCategories.find(c => c.id === category) ? category : categories[0].id;
    const validDrinkCategory = drinkCategories.find(c => c.id === drinkCategory) ? drinkCategory : drinkCategories[0].id;

    return {
      activeTab: validTab,
      activeCategory: validCategory,
      activeDrinkCategory: validDrinkCategory
    };
  };

  const initialState = getInitialState();
  const [activeTab, setActiveTabState] = useState<TabType>(initialState.activeTab);
  const [activeCategory, setActiveCategoryState] = useState<string>(initialState.activeCategory);
  const [activeDrinkCategory, setActiveDrinkCategoryState] = useState<string>(initialState.activeDrinkCategory);

  // Update URL when state changes
  const updateUrl = useCallback((tab: TabType, category: string, drinkCategory: string) => {
    const params = new URLSearchParams();
    
    // Only add non-default parameters to keep URLs clean
    if (tab !== 'menu') {
      params.set('tab', tab);
    }
    
    if (category !== categories[0].id) {
      params.set('category', category);
    }
    
    if (drinkCategory !== drinkCategories[0].id && category === 'drinks') {
      params.set('drinkCategory', drinkCategory);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
    
    // Use replaceState to avoid creating back button entries for every click
    window.history.replaceState(null, '', newUrl);
  }, []);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const newState = getInitialState();
      setActiveTabState(newState.activeTab);
      setActiveCategoryState(newState.activeCategory);
      setActiveDrinkCategoryState(newState.activeDrinkCategory);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // State setters that also update URL
  const setActiveTab = useCallback((tab: TabType) => {
    setActiveTabState(tab);
    
    // Reset to default category when changing tabs
    let newCategory = activeCategory;
    if (tab === 'menu' && (activeCategory === 'drinks' || !categories.find(c => c.id === activeCategory))) {
      newCategory = categories[0].id;
    }
    
    updateUrl(tab, newCategory, activeDrinkCategory);
  }, [activeCategory, activeDrinkCategory, updateUrl]);

  const setActiveCategory = useCallback((category: string) => {
    setActiveCategoryState(category);
    updateUrl(activeTab, category, activeDrinkCategory);
  }, [activeTab, activeDrinkCategory, updateUrl]);

  const setActiveDrinkCategory = useCallback((drinkCategory: string) => {
    setActiveDrinkCategoryState(drinkCategory);
    updateUrl(activeTab, activeCategory, drinkCategory);
  }, [activeTab, activeCategory, updateUrl]);

  return {
    activeTab,
    setActiveTab,
    activeCategory,
    setActiveCategory,
    activeDrinkCategory,
    setActiveDrinkCategory
  };
};
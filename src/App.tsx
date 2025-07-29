import React, { useState, useCallback, useEffect } from 'react';
import { ShoppingCart, Store, Home, Clock, Star, User, Leaf, LayoutGrid, List, Menu, X } from 'lucide-react';
import { UtensilsCrossed, Sparkles, ChefHat, Cake, Wine, Beer, Martini, Bot as Bottle, Zap, Coffee } from 'lucide-react';
import { MenuCategory } from './components/MenuCategory';
import { MenuItem } from './components/MenuItem';
import { DrinkMenu } from './components/DrinkMenu';
import { ItemModal } from './components/ItemModal';
import { Cart } from './components/Cart';
import { OrderConfirmation } from './components/OrderConfirmation';
import { WaiterCodeInputModal } from './components/WaiterCodeInputModal';
import { DailyPromotions } from './components/DailyPromotions';
import { OrderHistory } from './components/OrderHistory';
import { TapasNightTimer } from './components/TapasNightTimer';
import { categories, drinkCategories } from './data/categories';
import { tapasNightItems } from './data/tapasNight';
import { useMenuItems } from './hooks/useMenuItems';
import { LoadingSpinner } from './components/LoadingSpinner';
import { MenuItem as MenuItemType, CartItem, Order, TapasNightSession } from './types';
import { 
  loadOrdersFromStorage, 
  addOrderToStorage, 
  removeOrderFromStorage, 
  loadTapasSessionFromStorage, 
  saveTapasSessionToStorage,
  loadCartFromStorage,
  saveCartToStorage,
  clearCartFromStorage
} from './utils/localStorage';
import { useUrlState } from './hooks/useUrlState';

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

type TabType = 'menu' | 'promotions' | 'orders';

function App() {
  // Initialize state from URL parameters or defaults
  const { 
    activeTab, 
    setActiveTab, 
    activeCategory, 
    setActiveCategory, 
    activeDrinkCategory, 
    setActiveDrinkCategory 
  } = useUrlState();
  
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [isWaiterCodeModalOpen, setIsWaiterCodeModalOpen] = useState(false);
  const [isCompactView, setIsCompactView] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<{
    orderNumber: string;
    totalAmount: number;
  } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tapasSession, setTapasSession] = useState<TapasNightSession | null>(null);
  const [isTimerMinimized, setIsTimerMinimized] = useState(false);

  // Load menu items from Supabase
  const { menuItems, isLoading: isLoadingMenu, error: menuError, refetch: refetchMenu } = useMenuItems();

  // Load orders and tapas session from localStorage on mount
  useEffect(() => {
    const storedOrders = loadOrdersFromStorage();
    setOrders(storedOrders);
    
    const storedSession = loadTapasSessionFromStorage();
    setTapasSession(storedSession);
    
    // Load cart from storage if available
    const storedCart = loadCartFromStorage();
    if (storedCart.length > 0) {
      setCartItems(storedCart);
    }
    
    // Set document title based on current state
    updateDocumentTitle(activeTab, activeCategory);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      saveCartToStorage(cartItems);
    } else {
      clearCartFromStorage();
    }
  }, [cartItems]);
  // Update document title when state changes
  useEffect(() => {
    updateDocumentTitle(activeTab, activeCategory);
  }, [activeTab, activeCategory]);

  const updateDocumentTitle = (tab: TabType, category: string) => {
    const baseTitle = 'The Winery Tapas Bar';
    
    if (tab === 'menu') {
      const categoryName = categories.find(c => c.id === category)?.name || 
                          drinkCategories.find(c => c.id === category)?.name ||
                          'Menu';
      document.title = `${categoryName} - ${baseTitle}`;
    } else {
      const tabNames: Record<TabType, string> = {
        menu: 'Menu',
        promotions: 'Daily Specials',
        orders: 'Order History',
        profile: 'Profile'
      };
      document.title = `${tabNames[tab]} - ${baseTitle}`;
    }
  };
  const filteredItems = menuItems.filter(item => {
    const categoryMatch = item.category === activeCategory;
    const vegetarianMatch = !vegetarianOnly || (item.tags && item.tags.includes('vegetarian'));
    return categoryMatch && vegetarianMatch;
  });

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const cartServiceCharge = cartSubtotal * 0.10;
  const cartGST = (cartSubtotal + cartServiceCharge) * 0.09;
  const cartTotal = cartSubtotal + cartServiceCharge + cartGST;

  const handleAddToCart = useCallback((item: MenuItemType, quantity: number = 1) => {
    // Check if this is a tapas item and we have an active session
    if (tapasSession && tapasSession.isActive && item.category === 'tapas') {
      // Add tapas item for free during active session
      const cartItem: CartItem = {
        id: Date.now().toString(),
        menuItem: {
          ...item,
          price: 0, // Free during tapas session
          name: `${item.name} (Tapas Night)`
        },
        quantity: quantity,
        customizations: {},
        totalPrice: 0
      };
      setCartItems(prev => [...prev, cartItem]);
      return;
    }

    if (item.customizations && item.customizations.length > 0) {
      setSelectedItem(item);
    } else {
      const cartItem: CartItem = {
        id: Date.now().toString(),
        menuItem: item,
        quantity: quantity,
        customizations: {},
        totalPrice: item.price * quantity
      };
      setCartItems(prev => [...prev, cartItem]);
    }
  }, [tapasSession]);

  const handleAddCustomizedToCart = useCallback((cartItem: Omit<CartItem, 'id'>) => {
    const newCartItem: CartItem = {
      ...cartItem,
      id: Date.now().toString()
    };

    // Check if this is Tapas Night and start the session
    if (cartItem.menuItem.id === 'tapas-night-package') {
      const session: TapasNightSession = {
        id: Date.now().toString(),
        startTime: new Date(),
        duration: 120, // 2 hours
        paxCount: cartItem.quantity,
        isActive: true
      };
      setTapasSession(session);
      saveTapasSessionToStorage(session);
    }

    setCartItems(prev => [...prev, newCartItem]);
  }, []);

  const handleUpdateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => prev.map(item => 
        item.id === id 
          ? { 
              ...item, 
              quantity, 
              totalPrice: (item.totalPrice / item.quantity) * quantity 
            }
          : item
      ));
    }
  }, []);

  const handleRemoveItem = useCallback((id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleCheckout = useCallback(() => {
    // Open waiter code modal instead of directly confirming
    setIsWaiterCodeModalOpen(true);
    setIsCartOpen(false);
  }, []);

  const handleWaiterCodeConfirmed = useCallback(() => {
    // Create order record
    const orderNumber = Math.random().toString(36).substr(2, 8).toUpperCase();
    const newOrder: Order = {
      id: Date.now().toString(),
      orderNumber,
      items: [...cartItems],
      subtotal: cartSubtotal,
      serviceCharge: cartServiceCharge,
      gst: cartGST,
      totalAmount: cartTotal,
      timestamp: new Date(),
      status: 'confirmed',
      estimatedTime: 20 // 20 minutes estimated
    };

    // Add to local storage and state
    addOrderToStorage(newOrder);
    setOrders(prev => [newOrder, ...prev]);

    // Show confirmation
    setOrderConfirmation({
      orderNumber,
      totalAmount: cartTotal
    });

    // Clear cart
    setCartItems([]);
    clearCartFromStorage();
    setIsWaiterCodeModalOpen(false);
  }, [cartItems, cartSubtotal, cartServiceCharge, cartGST, cartTotal]);

  const handleCloseWaiterCodeModal = useCallback(() => {
    setIsWaiterCodeModalOpen(false);
  }, []);

  const handleCloseOrderConfirmation = useCallback(() => {
    setOrderConfirmation(null);
  }, []);

  const handleReorder = useCallback((order: Order) => {
    // Add all items from the order back to cart
    const reorderedItems = order.items.map(item => ({
      ...item,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5) // New unique ID
    }));
    
    setCartItems(prev => [...prev, ...reorderedItems]);
    setActiveTab('menu'); // Switch back to menu tab
    setIsCartOpen(true); // Open cart to show reordered items
  }, []);

  const handleDeleteOrder = useCallback((orderId: string) => {
    removeOrderFromStorage(orderId);
    setOrders(prev => prev.filter(order => order.id !== orderId));
  }, []);

  const handleSessionEnd = useCallback(() => {
    setTapasSession(null);
    saveTapasSessionToStorage(null);
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setVegetarianOnly(false);
    if (categoryId === 'drinks') {
      setActiveDrinkCategory(drinkCategories[0].id);
    }
  };

  const tabs = [
    { id: 'menu' as TabType, label: 'Menu', icon: Home },
    { id: 'promotions' as TabType, label: 'Specials', icon: Star },
    { id: 'orders' as TabType, label: 'Orders', icon: Clock },
  ];

  const isDrinkCategory = activeCategory === 'drinks';
  const isFoodCategory = !isDrinkCategory;

  const renderMainContent = () => {
    switch (activeTab) {
      case 'promotions':
        return <DailyPromotions onAddToCart={handleAddCustomizedToCart} />;
      
      case 'orders':
        return (
          <OrderHistory 
            orders={orders} 
            onReorder={handleReorder}
            onDeleteOrder={handleDeleteOrder}
          />
        );
      
      default:
        if (isDrinkCategory) {
          return (
            <DrinkMenu 
              onAddToCart={handleAddToCart}
              activeCategory={activeDrinkCategory}
            />
          );
        }
        
        return (
          <div>
            {/* Loading State */}
            {isLoadingMenu && (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" text="Loading menu..." />
              </div>
            )}

            {/* Error State */}
            {menuError && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
                <div className="flex items-center space-x-3">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-900">Unable to Load Menu</h3>
                    <p className="text-red-700 text-sm mt-1">{menuError}</p>
                    <button
                      onClick={refetchMenu}
                      className="mt-2 text-red-600 hover:text-red-700 text-sm font-medium underline"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tapas Session Alert */}
            {tapasSession && tapasSession.isActive && activeCategory === 'tapas' && (
              <div className="mb-6 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                    <ChefHat size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-green-900 text-lg">Tapas Night Active!</h3>
                    <p className="text-green-700 text-sm">All tapas items are free for your group. Keep ordering!</p>
                  </div>
                </div>
              </div>
            )}

            {/* Filters and View Toggle */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Vegetarian Filter - Only show for food categories */}
                {isFoodCategory && (
                  <button
                    onClick={() => setVegetarianOnly(!vegetarianOnly)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-150 text-sm active:scale-95
                      ${vegetarianOnly 
                        ? 'bg-green-600 text-white shadow-lg hover:bg-green-700' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }
                    `}
                  >
                    <Leaf size={16} />
                    <span>Vegetarian Only</span>
                    {vegetarianOnly && (
                      <span className="bg-white text-green-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        ✓
                      </span>
                    )}
                  </button>
                )}
                
                {vegetarianOnly && (
                  <span className="text-sm text-gray-500">
                    Showing {filteredItems.length} vegetarian {filteredItems.length === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>

              {/* View Toggle */}
              {isFoodCategory && (
                <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setIsCompactView(false)}
                    className={`
                      flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-150 text-sm
                      ${!isCompactView 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                      }
                    `}
                  >
                    <LayoutGrid size={16} />
                    <span>Cards</span>
                  </button>
                  <button
                    onClick={() => setIsCompactView(true)}
                    className={`
                      flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-150 text-sm
                      ${isCompactView 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                      }
                    `}
                  >
                    <List size={16} />
                    <span>Compact</span>
                  </button>
                </div>
              )}
            </div>

            {/* Show tapas items for free ordering during active session */}
            {tapasSession && tapasSession.isActive && activeCategory !== 'tapas' && (
              <div className="mb-8">
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                  <h3 className="font-bold text-green-900 mb-4">Free Tapas Available</h3>
                  <div className={`grid gap-3 ${
                    isCompactView 
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  }`}>
                    {tapasNightItems.slice(0, 6).map((item) => (
                      <MenuItem
                        key={item.id}
                        item={item}
                        onAddToCart={handleAddToCart}
                        compact={true}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveCategory('tapas')}
                    className="mt-4 text-green-700 hover:text-green-800 text-sm font-medium underline"
                  >
                    View all tapas items →
                  </button>
                </div>
              </div>
            )}

            {!isLoadingMenu && !menuError && (
              <div className={`
              grid gap-4
              ${isCompactView 
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }
              `}>
                {filteredItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onAddToCart={handleAddToCart}
                    compact={isCompactView}
                  />
                ))}
              </div>
            )}

            {!isLoadingMenu && !menuError && filteredItems.length === 0 && vegetarianOnly && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Leaf size={24} className="text-gray-300" />
                </div>
                <p className="text-gray-500">No vegetarian items found in this category</p>
                <button
                  onClick={() => setVegetarianOnly(false)}
                  className="mt-2 text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  Show all items
                </button>
              </div>
            )}
          </div>
        );
    }
  };

  // Calculate sidebar width and main content margin
  const sidebarWidth = isSidebarCollapsed ? 'w-16' : 'w-80';
  const mainContentMargin = isSidebarCollapsed ? 'ml-16' : 'ml-80';

  return (
    <div className="h-screen bg-gray-50 flex touch-manipulation">
      {/* Mobile Sidebar Overlay */}
      {!isSidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsSidebarCollapsed(true)}
        />
      )}

      {/* Fixed Sidebar */}
      <div className={`
        ${sidebarWidth} bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 z-30 momentum-scroll transition-all duration-300 ease-in-out safe-area-left
        ${isSidebarCollapsed ? 'lg:w-16' : 'lg:w-80'}
      `}>
        {/* Logo & Toggle */}
        <div className="p-4 pt-safe-area-top border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            {!isSidebarCollapsed && (
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img 
                    src="/assets/logos/Winery Logo.png" 
                    alt="The Winery Tapas Bar" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h1 className="text-base font-semibold text-gray-900 truncate">The Winery Tapas Bar</h1>
                  <p className="text-xs text-gray-500 truncate">Fine Wine & Spanish Tapas</p>
                </div>
              </div>
            )}
            
            {/* Toggle Button */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="w-8 h-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-150 flex items-center justify-center active:scale-95 touch-target"
            >
              {isSidebarCollapsed ? <Menu size={18} /> : <X size={18} />}
            </button>
            
            {/* Collapsed Logo */}
            {isSidebarCollapsed && (
              <div className="w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden mx-auto">
                <img 
                  src="/assets/logos/Winery Logo.png" 
                  alt="The Winery Tapas Bar" 
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="p-3 border-b border-gray-200 flex-shrink-0">
          {isSidebarCollapsed ? (
            // Collapsed: Vertical icon stack
            <div className="space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    aria-label={`Go to ${tab.label}`}
                    className={`
                      w-10 h-10 rounded-lg font-medium transition-all duration-150 flex items-center justify-center active:scale-95 touch-target relative group
                      ${isActive 
                        ? 'bg-black text-white' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                    title={tab.label}
                  >
                    <IconComponent size={18} />
                    {/* Tooltip */}
                    <div className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-50">
                      {tab.label}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            // Expanded: Original layout
            <div className="grid grid-cols-4 gap-1">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    aria-label={`Go to ${tab.label}`}
                    className={`
                      flex flex-col items-center p-2 rounded-lg font-medium transition-all duration-150 text-xs active:scale-95 touch-target
                      ${isActive 
                        ? 'bg-black text-white' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <IconComponent size={16} />
                    <span className="mt-1">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Categories - Only show when expanded and on menu tab */}
        {!isSidebarCollapsed && activeTab === 'menu' && (
          <div className="flex-1 overflow-y-auto p-3 momentum-scroll">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Categories</h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <MenuCategory
                  key={category.id}
                  category={category}
                  isActive={activeCategory === category.id}
                  onClick={() => handleCategoryClick(category.id)}
                />
              ))}
            </div>

            {/* Drink Subcategories */}
            {activeCategory === 'drinks' && (
              <div className="mt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Drink Types</h3>
                <div className="space-y-1 ml-3">
                  {drinkCategories.map((category) => (
                    <MenuCategory
                      key={category.id}
                      category={category}
                      isActive={activeDrinkCategory === category.id}
                      onClick={() => setActiveDrinkCategory(category.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Collapsed Categories - Show as icon tooltips */}
        {isSidebarCollapsed && activeTab === 'menu' && (
          <div className="flex-1 overflow-y-auto p-2 momentum-scroll">
            <div className="space-y-1">
              {categories.map((category) => {
                const IconComponent = iconMap[category.icon as keyof typeof iconMap];
                const isActive = activeCategory === category.id;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    aria-label={`Select ${category.name} category`}
                    className={`
                      w-12 h-10 rounded-lg transition-all duration-150 flex items-center justify-center relative group
                      ${isActive 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                    title={category.name}
                  >
                    <IconComponent size={16} />
                    {/* Tooltip */}
                    <div className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-50">
                      {category.name}
                    </div>
                    {category.special && (
                      <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-orange-500 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Cart Button */}
        <div className="p-3 pb-safe-area-bottom border-t border-gray-200 flex-shrink-0">
          {isSidebarCollapsed ? (
            // Collapsed cart button
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open cart with ${cartItemCount} items, total $${cartTotal.toFixed(2)}`}
              className="w-full h-12 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-150 flex items-center justify-center active:scale-95 touch-target relative group"
            >
              <ShoppingCart size={18} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-50">
                Cart • ${cartTotal.toFixed(2)}
              </div>
            </button>
          ) : (
            // Expanded cart button
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open cart with ${cartItemCount} items, total $${cartTotal.toFixed(2)}`}
              className="w-full bg-black text-white px-4 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-150 flex items-center justify-between active:scale-95 touch-target shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <ShoppingCart size={18} />
                <span>Cart</span>
              </div>
              <div className="flex items-center space-x-2">
                {cartItemCount > 0 && (
                  <span className="bg-white text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
                {cartTotal > 0 && (
                  <span className="font-semibold text-sm">${cartTotal.toFixed(2)}</span>
                )}
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${mainContentMargin} overflow-auto momentum-scroll transition-all duration-300 ease-in-out safe-area-right`}>
        <div className="p-6 pt-safe-area-top pb-safe-area-bottom">
          {renderMainContent()}
        </div>
      </div>

      {/* Tapas Night Timer */}
      {tapasSession && tapasSession.isActive && (
        <TapasNightTimer
          session={tapasSession}
          onSessionEnd={handleSessionEnd}
          isMinimized={isTimerMinimized}
          onToggleMinimize={() => setIsTimerMinimized(!isTimerMinimized)}
        />
      )}

      {/* Modals */}
      {selectedItem && (
        <ItemModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={handleAddCustomizedToCart}
        />
      )}

      <Cart
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      <WaiterCodeInputModal
        isOpen={isWaiterCodeModalOpen}
        onClose={handleCloseWaiterCodeModal}
        onConfirm={handleWaiterCodeConfirmed}
        totalAmount={cartTotal}
        itemCount={cartItemCount}
      />

      {orderConfirmation && (
        <OrderConfirmation
          orderNumber={orderConfirmation.orderNumber}
          totalAmount={orderConfirmation.totalAmount}
          onClose={handleCloseOrderConfirmation}
        />
      )}
    </div>
  );
}

export default App;
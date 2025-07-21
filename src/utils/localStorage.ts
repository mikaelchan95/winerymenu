import { Order, TapasNightSession } from '../types';

const ORDERS_KEY = 'winery-orders';
const TAPAS_SESSION_KEY = 'winery-tapas-session';
const CART_KEY = 'winery-cart';

export const saveOrdersToStorage = (orders: Order[]): void => {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error('Failed to save orders to localStorage:', error);
  }
};

export const loadOrdersFromStorage = (): Order[] => {
  try {
    const stored = localStorage.getItem(ORDERS_KEY);
    if (!stored) return [];
    
    const orders = JSON.parse(stored);
    // Convert timestamp strings back to Date objects
    return orders.map((order: any) => ({
      ...order,
      timestamp: new Date(order.timestamp)
    }));
  } catch (error) {
    console.error('Failed to load orders from localStorage:', error);
    return [];
  }
};

export const addOrderToStorage = (order: Order): void => {
  const orders = loadOrdersFromStorage();
  orders.unshift(order); // Add to beginning (most recent first)
  saveOrdersToStorage(orders);
};

export const removeOrderFromStorage = (orderId: string): void => {
  const orders = loadOrdersFromStorage();
  const filteredOrders = orders.filter(order => order.id !== orderId);
  saveOrdersToStorage(filteredOrders);
};

// Tapas Night Session functions
export const saveTapasSessionToStorage = (session: TapasNightSession | null): void => {
  try {
    if (session) {
      localStorage.setItem(TAPAS_SESSION_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(TAPAS_SESSION_KEY);
    }
  } catch (error) {
    console.error('Failed to save tapas session to localStorage:', error);
  }
};

export const loadTapasSessionFromStorage = (): TapasNightSession | null => {
  try {
    const stored = localStorage.getItem(TAPAS_SESSION_KEY);
    if (!stored) return null;
    
    const session = JSON.parse(stored);
    // Convert timestamp strings back to Date objects
    const sessionWithDate = {
      ...session,
      startTime: new Date(session.startTime)
    };
    
    // Check if session is still valid (not expired)
    const now = new Date();
    const sessionEnd = new Date(sessionWithDate.startTime.getTime() + sessionWithDate.duration * 60 * 1000);
    
    if (now > sessionEnd) {
      // Session expired, remove it
      localStorage.removeItem(TAPAS_SESSION_KEY);
      return null;
    }
    
    return sessionWithDate;
  } catch (error) {
    console.error('Failed to load tapas session from localStorage:', error);
    return null;
  }
};

// Cart persistence functions
export const saveCartToStorage = (cartItems: any[]): void => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

export const loadCartFromStorage = (): any[] => {
  try {
    const stored = localStorage.getItem(CART_KEY);
    if (!stored) return [];
    
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return [];
  }
};

export const clearCartFromStorage = (): void => {
  try {
    localStorage.removeItem(CART_KEY);
  } catch (error) {
    console.error('Failed to clear cart from localStorage:', error);
  }
};
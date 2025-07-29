export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  subcategory?: string;
  allergens?: string[];
  spiceLevel?: number;
  tags?: string[];
  featured?: boolean;
  ingredients?: string[];
  dietaryLabels?: string[];
  customizations?: Customization[];
  preparationTime?: number;
  servingSize?: string;
}

export interface Customization {
  id: string;
  name: string;
  options: CustomizationOption[];
  required: boolean;
  maxSelections?: number;
}

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customizations: { [key: string]: string[] };
  totalPrice: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  special?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  serviceCharge: number;
  gst: number;
  totalAmount: number;
  timestamp: Date;
  status: 'confirmed' | 'preparing' | 'ready' | 'completed';
  estimatedTime?: number; // minutes
}

export interface TapasNightSession {
  id: string;
  startTime: Date;
  duration: number; // minutes (120 for 2 hours)
  paxCount: number;
  isActive: boolean;
}
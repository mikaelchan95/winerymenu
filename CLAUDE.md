# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm install          # Install dependencies
npm run dev         # Start development server (http://localhost:5173)
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint checks
```

## Tech Stack & Architecture

This is a **React 18 + TypeScript + Vite** single-page application for a winery tapas bar menu system with **Supabase** backend.

### Core Architecture
- **Frontend**: React with TypeScript, styled with Tailwind CSS
- **Database**: Supabase (PostgreSQL) with real-time subscriptions
- **State Management**: React hooks + localStorage persistence
- **Build Tool**: Vite with React plugin
- **Styling**: Tailwind CSS with CSS custom properties

### Key Application Patterns

**Central State in App.tsx**: The main App component (787 lines) manages:
- Cart state with localStorage persistence
- Tab navigation (menu/promotions/orders)
- Category filtering and view modes
- Tapas Night special promotion sessions
- Modal orchestration

**Data Flow Architecture**:
1. **Static Data**: `/src/data/` files define categories, drinks, and tapas night items
2. **Dynamic Data**: Supabase `menu_items` table with real-time updates via `useMenuItems` hook
3. **Persistent State**: Cart and order history stored in localStorage
4. **URL State**: Navigation state synchronized with browser URL

### Database Schema (Supabase)

**Primary Table: `menu_items`**
```sql
- id: uuid (primary key)
- name, description: text
- price: decimal(10,2) 
- image: text (Supabase Storage path)
- category: text (tapas, starters, mains, paellas, desserts)
- subcategory: text (optional)
- allergens: text[] (array)
- tags: text[] (vegetarian, spicy, premium, etc.)
- spice_level: integer (0-3)
- featured, available: boolean
- sort_order: integer
```

**Images**: Stored in Supabase Storage `food-images` bucket with public URL generation.

### Special Features

**Tapas Night System**: Time-limited 2-hour promotion sessions where customers get free tapas items. Session state persists across page reloads and automatically expires.

**Pricing Logic**:
```typescript
subtotal = sum(item.price * quantity)
serviceCharge = subtotal * 0.10 (10%)
gst = (subtotal + serviceCharge) * 0.09 (9%)
total = subtotal + serviceCharge + gst
```

**Order Flow**: Cart → WaiterCodeInputModal (staff verification) → OrderConfirmation → OrderHistory

## File Structure Patterns

### Component Organization
- **MenuItem.tsx**: Handles both compact/full view modes with quantity selection
- **Cart.tsx**: Complete shopping cart with price calculations and checkout
- **TapasNightTimer.tsx**: Countdown timer for special promotions
- **MenuCategory.tsx**: Category navigation with filtering

### Custom Hooks
- **useMenuItems**: Supabase integration with real-time subscriptions and error handling
- **useUrlState**: Bidirectional URL state synchronization for navigation

### Utilities
- **localStorage.ts**: Type-safe localStorage operations for cart/order persistence
- **urlHelpers.ts**: URL state management functions

## Environment Setup

Required environment variables:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Development Notes

### State Management Strategy
The app uses lifted state pattern with the main App component managing shared state. Cart items and orders persist via localStorage with automatic serialization/deserialization.

### Real-time Updates
Menu items automatically update via Supabase real-time subscriptions. The `useMenuItems` hook handles connection management and error recovery.

### Mobile-First Design
Built with responsive design using Tailwind's mobile-first breakpoints. Components adapt between compact mobile and full desktop layouts.

### Image Handling
Images are managed through Supabase Storage with fallback handling for missing images. The system expects images in the `food-images` bucket.
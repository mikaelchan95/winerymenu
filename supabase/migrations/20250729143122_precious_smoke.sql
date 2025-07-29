/*
  # Add Customizations to Existing Beef/Steak Items
  
  1. Updates
    - Find existing beef/steak items in menu_items table
    - Add doneness, sauce, and extra portion customizations
    - Add side options and premium add-ons
  
  2. Customizations Added
    - Steak doneness options (Rare to Well Done)
    - Premium sauce selections with pricing
    - Extra portion options
    - Side dishes and add-ons
*/

-- Update existing beef/steak items with comprehensive customizations
UPDATE menu_items 
SET customizations = '[
  {
    "id": "doneness",
    "name": "How would you like your steak cooked?",
    "required": true,
    "maxSelections": 1,
    "options": [
      {"id": "rare", "name": "Rare (Cool red center)", "price": 0},
      {"id": "medium-rare", "name": "Medium Rare (Warm red center)", "price": 0},
      {"id": "medium", "name": "Medium (Warm pink center)", "price": 0},
      {"id": "medium-well", "name": "Medium Well (Slightly pink center)", "price": 0},
      {"id": "well-done", "name": "Well Done (No pink)", "price": 0}
    ]
  },
  {
    "id": "sauce",
    "name": "Choose your sauce",
    "required": false,
    "maxSelections": 2,
    "options": [
      {"id": "peppercorn", "name": "Peppercorn Sauce", "price": 4},
      {"id": "mushroom", "name": "Mushroom Sauce", "price": 4},
      {"id": "garlic-butter", "name": "Garlic Butter", "price": 3},
      {"id": "chimichurri", "name": "Chimichurri", "price": 3},
      {"id": "red-wine-jus", "name": "Red Wine Jus", "price": 5},
      {"id": "hollandaise", "name": "Hollandaise", "price": 4}
    ]
  },
  {
    "id": "sides",
    "name": "Add sides",
    "required": false,
    "maxSelections": 3,
    "options": [
      {"id": "grilled-vegetables", "name": "Grilled Seasonal Vegetables", "price": 6},
      {"id": "mashed-potatoes", "name": "Truffle Mashed Potatoes", "price": 7},
      {"id": "roasted-potatoes", "name": "Roasted Baby Potatoes", "price": 5},
      {"id": "garlic-bread", "name": "Garlic Bread", "price": 4},
      {"id": "side-salad", "name": "Mixed Green Salad", "price": 5},
      {"id": "onion-rings", "name": "Beer Battered Onion Rings", "price": 6}
    ]
  },
  {
    "id": "portion", 
    "name": "Portion size",
    "required": false,
    "maxSelections": 1,
    "options": [
      {"id": "regular", "name": "Regular Portion", "price": 0},
      {"id": "extra", "name": "Extra Large Portion (+50%)", "price": 15}
    ]
  }
]'::jsonb
WHERE LOWER(name) LIKE '%steak%' 
   OR LOWER(name) LIKE '%beef%' 
   OR LOWER(name) LIKE '%ribeye%'
   OR LOWER(name) LIKE '%sirloin%'
   OR LOWER(name) LIKE '%filet%'
   OR LOWER(name) LIKE '%t-bone%'
   OR LOWER(name) LIKE '%tomahawk%'
   OR LOWER(description) LIKE '%beef%'
   OR LOWER(description) LIKE '%steak%';

-- Update chicken/poultry items with appropriate customizations
UPDATE menu_items 
SET customizations = '[
  {
    "id": "preparation",
    "name": "Cooking style",
    "required": true,
    "maxSelections": 1,
    "options": [
      {"id": "grilled", "name": "Grilled", "price": 0},
      {"id": "roasted", "name": "Oven Roasted", "price": 0},
      {"id": "pan-seared", "name": "Pan Seared", "price": 0}
    ]
  },
  {
    "id": "sauce",
    "name": "Sauce selection",
    "required": false,
    "maxSelections": 2,
    "options": [
      {"id": "lemon-herb", "name": "Lemon Herb Butter", "price": 3},
      {"id": "teriyaki", "name": "Teriyaki Glaze", "price": 3},
      {"id": "bbq", "name": "BBQ Sauce", "price": 2},
      {"id": "garlic-aioli", "name": "Garlic Aioli", "price": 3},
      {"id": "mushroom", "name": "Mushroom Sauce", "price": 4}
    ]
  },
  {
    "id": "sides",
    "name": "Add sides",
    "required": false,
    "maxSelections": 3,
    "options": [
      {"id": "roasted-vegetables", "name": "Roasted Vegetables", "price": 6},
      {"id": "rice-pilaf", "name": "Herbed Rice Pilaf", "price": 5},
      {"id": "side-salad", "name": "Garden Salad", "price": 5},
      {"id": "garlic-bread", "name": "Garlic Bread", "price": 4}
    ]
  },
  {
    "id": "portion", 
    "name": "Portion size",
    "required": false,
    "maxSelections": 1,
    "options": [
      {"id": "regular", "name": "Regular Portion", "price": 0},
      {"id": "extra", "name": "Extra Large Portion (+50%)", "price": 12}
    ]
  }
]'::jsonb
WHERE LOWER(name) LIKE '%chicken%' 
   OR LOWER(name) LIKE '%duck%'
   OR LOWER(name) LIKE '%turkey%'
   OR LOWER(description) LIKE '%chicken%'
   OR LOWER(description) LIKE '%poultry%';

-- Update seafood items with appropriate customizations  
UPDATE menu_items 
SET customizations = '[
  {
    "id": "cooking-method",
    "name": "How would you like it cooked?",
    "required": true,
    "maxSelections": 1,
    "options": [
      {"id": "grilled", "name": "Grilled", "price": 0},
      {"id": "pan-seared", "name": "Pan Seared", "price": 0},
      {"id": "oven-baked", "name": "Oven Baked", "price": 0},
      {"id": "blackened", "name": "Blackened Cajun Style", "price": 2}
    ]
  },
  {
    "id": "sauce",
    "name": "Sauce selection",
    "required": false,
    "maxSelections": 2,
    "options": [
      {"id": "lemon-butter", "name": "Lemon Butter Sauce", "price": 4},
      {"id": "hollandaise", "name": "Hollandaise", "price": 4},
      {"id": "dill-cream", "name": "Dill Cream Sauce", "price": 4},
      {"id": "caper-butter", "name": "Caper Butter", "price": 5},
      {"id": "garlic-herb", "name": "Garlic Herb Oil", "price": 3}
    ]
  },
  {
    "id": "sides",
    "name": "Accompaniments",
    "required": false,
    "maxSelections": 3,
    "options": [
      {"id": "steamed-vegetables", "name": "Steamed Seasonal Vegetables", "price": 6},
      {"id": "wild-rice", "name": "Wild Rice Blend", "price": 5},
      {"id": "extra-lemon", "name": "Extra Lemon Wedges", "price": 1},
      {"id": "side-salad", "name": "Mixed Greens", "price": 5}
    ]
  },
  {
    "id": "portion", 
    "name": "Portion size",
    "required": false,
    "maxSelections": 1,
    "options": [
      {"id": "regular", "name": "Regular Portion", "price": 0},
      {"id": "extra", "name": "Extra Large Portion (+50%)", "price": 18}
    ]
  }
]'::jsonb
WHERE LOWER(name) LIKE '%salmon%' 
   OR LOWER(name) LIKE '%fish%'
   OR LOWER(name) LIKE '%prawns%'
   OR LOWER(name) LIKE '%shrimp%'
   OR LOWER(name) LIKE '%seafood%'
   OR LOWER(name) LIKE '%tuna%'
   OR LOWER(name) LIKE '%cod%'
   OR LOWER(name) LIKE '%barramundi%'
   OR LOWER(description) LIKE '%fish%'
   OR LOWER(description) LIKE '%seafood%';

-- Update paella items with spice customizations
UPDATE menu_items 
SET customizations = '[
  {
    "id": "spice-level",
    "name": "Spice level",
    "required": true,
    "maxSelections": 1,
    "options": [
      {"id": "mild", "name": "Mild", "price": 0},
      {"id": "medium", "name": "Medium", "price": 0},
      {"id": "spicy", "name": "Spicy", "price": 0},
      {"id": "extra-spicy", "name": "Extra Spicy", "price": 0}
    ]
  },
  {
    "id": "protein-extras",
    "name": "Add extra protein",
    "required": false,
    "maxSelections": 3,
    "options": [
      {"id": "extra-seafood", "name": "Extra Seafood Mix", "price": 12},
      {"id": "extra-chicken", "name": "Extra Chicken", "price": 8},
      {"id": "extra-chorizo", "name": "Extra Chorizo", "price": 6},
      {"id": "prawns", "name": "King Prawns", "price": 15}
    ]
  },
  {
    "id": "sides",
    "name": "Traditional sides",
    "required": false,
    "maxSelections": 2,
    "options": [
      {"id": "garlic-aioli", "name": "Garlic Aioli", "price": 3},
      {"id": "lemon-wedges", "name": "Fresh Lemon Wedges", "price": 2},
      {"id": "crusty-bread", "name": "Crusty Bread", "price": 4}
    ]
  },
  {
    "id": "portion", 
    "name": "Portion size",
    "required": false,
    "maxSelections": 1,
    "options": [
      {"id": "regular", "name": "Regular Portion", "price": 0},
      {"id": "extra", "name": "Extra Large Portion (+50%)", "price": 20}
    ]
  }
]'::jsonb
WHERE LOWER(name) LIKE '%paella%' 
   OR category = 'paellas';

-- Add basic portion customization to all other items that don't have customizations yet
UPDATE menu_items 
SET customizations = '[
  {
    "id": "portion", 
    "name": "Portion size",
    "required": false,
    "maxSelections": 1,
    "options": [
      {"id": "regular", "name": "Regular Portion", "price": 0},
      {"id": "extra", "name": "Extra Large Portion (+50%)", "price": ' || ROUND(price * 0.5) || '}
    ]
  }
]'::jsonb
WHERE customizations IS NULL 
   OR customizations = '[]'::jsonb 
   OR customizations = 'null'::jsonb;
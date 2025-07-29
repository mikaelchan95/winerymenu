/*
  # Add customizations to Galician Ribeye

  1. Updates
    - Add doneness levels to "Grilled Galician Grass-Fed MB4 Ribeye (200g)"
    - Add premium sauce options
    - Add side dish options
    - Add extra portion option
*/

UPDATE menu_items 
SET customizations = '[
  {
    "id": "doneness",
    "name": "How would you like your steak cooked?",
    "required": true,
    "maxSelections": 1,
    "options": [
      {"id": "rare", "name": "Rare (cool red center)", "price": 0},
      {"id": "medium-rare", "name": "Medium Rare (warm red center)", "price": 0},
      {"id": "medium", "name": "Medium (warm pink center)", "price": 0},
      {"id": "medium-well", "name": "Medium Well (slightly pink center)", "price": 0},
      {"id": "well-done", "name": "Well Done (no pink)", "price": 0}
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
      {"id": "grilled-vegetables", "name": "Grilled Seasonal Vegetables", "price": 8},
      {"id": "truffle-mash", "name": "Truffle Mashed Potatoes", "price": 12},
      {"id": "onion-rings", "name": "Beer Battered Onion Rings", "price": 9},
      {"id": "garlic-bread", "name": "Garlic Bread", "price": 6},
      {"id": "house-salad", "name": "House Salad", "price": 7},
      {"id": "roasted-potatoes", "name": "Roasted Baby Potatoes", "price": 8}
    ]
  },
  {
    "id": "extras",
    "name": "Make it extra special",
    "required": false,
    "maxSelections": 2,
    "options": [
      {"id": "extra-portion", "name": "Extra Portion (+50% size)", "price": 25},
      {"id": "bone-marrow", "name": "Add Roasted Bone Marrow", "price": 15},
      {"id": "lobster-tail", "name": "Add Grilled Lobster Tail", "price": 28}
    ]
  }
]'
WHERE name ILIKE '%Grilled Galician%Ribeye%' 
   OR name ILIKE '%Galician%Grass-Fed%Ribeye%';
@@ .. @@
         'customizations', CASE
           WHEN category = 'mains' AND name ILIKE '%steak%' THEN
             '[
               {
                 "id": "doneness",
                 "name": "Steak Doneness",
                 "options": [
                   {"id": "rare", "name": "Rare", "price": 0},
                   {"id": "medium-rare", "name": "Medium Rare", "price": 0},
                   {"id": "medium", "name": "Medium", "price": 0},
                   {"id": "medium-well", "name": "Medium Well", "price": 0},
                   {"id": "well-done", "name": "Well Done", "price": 0}
                 ],
                 "required": true,
                 "maxSelections": 1
               },
               {
                 "id": "sauce",
                 "name": "Sauce Selection",
                 "options": [
                   {"id": "none", "name": "No Sauce", "price": 0},
                   {"id": "peppercorn", "name": "Peppercorn Sauce", "price": 3},
                   {"id": "mushroom", "name": "Mushroom Sauce", "price": 3},
                   {"id": "garlic-butter", "name": "Garlic Butter", "price": 2},
                   {"id": "chimichurri", "name": "Chimichurri", "price": 4}
                 ],
                 "required": false,
                 "maxSelections": 2
               },
               {
                 "id": "extras",
                 "name": "Add-ons",
                 "options": [
                   {"id": "extra-portion", "name": "Extra Portion (+50%)", "price": ' || (price * 0.5)::text || '},
                   {"id": "grilled-vegetables", "name": "Grilled Vegetables", "price": 8},
                   {"id": "mashed-potato", "name": "Creamy Mashed Potatoes", "price": 6},
                   {"id": "garlic-bread", "name": "Garlic Bread", "price": 5}
                 ],
                 "required": false,
                 "maxSelections": 4
               }
             ]'::jsonb
           WHEN category = 'mains' AND name ILIKE '%chicken%' THEN
             '[
               {
                 "id": "preparation",
                 "name": "Preparation Style",
                 "options": [
                   {"id": "grilled", "name": "Grilled", "price": 0},
                   {"id": "roasted", "name": "Roasted", "price": 0},
                   {"id": "pan-seared", "name": "Pan Seared", "price": 2}
                 ],
                 "required": true,
                 "maxSelections": 1
               },
               {
                 "id": "sauce",
                 "name": "Sauce Selection",
                 "options": [
                   {"id": "none", "name": "No Sauce", "price": 0},
                   {"id": "lemon-herb", "name": "Lemon Herb Sauce", "price": 2},
                   {"id": "teriyaki", "name": "Teriyaki Glaze", "price": 3},
                   {"id": "bbq", "name": "BBQ Sauce", "price": 2}
                 ],
                 "required": false,
                 "maxSelections": 1
               },
               {
                 "id": "extras",
                 "name": "Add-ons",
                 "options": [
                   {"id": "extra-portion", "name": "Extra Portion (+50%)", "price": ' || (price * 0.5)::text || '},
                   {"id": "side-salad", "name": "Side Salad", "price": 7},
                   {"id": "roasted-vegetables", "name": "Roasted Vegetables", "price": 8},
                   {"id": "rice-pilaf", "name": "Rice Pilaf", "price": 5}
                 ],
                 "required": false,
                 "maxSelections": 4
               }
             ]'::jsonb
           WHEN category = 'mains' AND (name ILIKE '%fish%' OR name ILIKE '%salmon%' OR name ILIKE '%sea%') THEN
             '[
               {
                 "id": "preparation",
                 "name": "Preparation Style",
                 "options": [
                   {"id": "grilled", "name": "Grilled", "price": 0},
                   {"id": "pan-seared", "name": "Pan Seared", "price": 0},
                   {"id": "baked", "name": "Oven Baked", "price": 0},
                   {"id": "blackened", "name": "Blackened", "price": 3}
                 ],
                 "required": true,
                 "maxSelections": 1
               },
               {
                 "id": "sauce",
                 "name": "Sauce Selection",
                 "options": [
                   {"id": "none", "name": "No Sauce", "price": 0},
                   {"id": "lemon-butter", "name": "Lemon Butter Sauce", "price": 3},
                   {"id": "hollandaise", "name": "Hollandaise", "price": 4},
                   {"id": "dill-cream", "name": "Dill Cream Sauce", "price": 3},
                   {"id": "caper-butter", "name": "Caper Butter", "price": 3}
                 ],
                 "required": false,
                 "maxSelections": 1
               },
               {
                 "id": "extras",
                 "name": "Add-ons",
                 "options": [
                   {"id": "extra-portion", "name": "Extra Portion (+50%)", "price": ' || (price * 0.5)::text || '},
                   {"id": "lemon-wedges", "name": "Extra Lemon Wedges", "price": 1},
                   {"id": "steamed-vegetables", "name": "Steamed Vegetables", "price": 7},
                   {"id": "wild-rice", "name": "Wild Rice", "price": 6}
                 ],
                 "required": false,
                 "maxSelections": 4
               }
             ]'::jsonb
           WHEN category = 'paellas' THEN
             '[
               {
                 "id": "spice-level",
                 "name": "Spice Level",
                 "options": [
                   {"id": "mild", "name": "Mild", "price": 0},
                   {"id": "medium", "name": "Medium", "price": 0},
                   {"id": "spicy", "name": "Spicy", "price": 0},
                   {"id": "extra-spicy", "name": "Extra Spicy", "price": 0}
                 ],
                 "required": true,
                 "maxSelections": 1
               },
               {
                 "id": "extras",
                 "name": "Add-ons",
                 "options": [
                   {"id": "extra-portion", "name": "Extra Portion (+50%)", "price": ' || (price * 0.5)::text || '},
                   {"id": "extra-seafood", "name": "Extra Seafood Mix", "price": 12},
                   {"id": "extra-chicken", "name": "Extra Chicken", "price": 8},
                   {"id": "aioli", "name": "Garlic Aioli", "price": 3},
                   {"id": "lemon-wedges", "name": "Lemon Wedges", "price": 1}
                 ],
                 "required": false,
                 "maxSelections": 5
               }
             ]'::jsonb
           WHEN category = 'tapas' THEN
             '[
               {
                 "id": "spice-level",
                 "name": "Spice Level",
                 "options": [
                   {"id": "mild", "name": "Mild", "price": 0},
                   {"id": "medium", "name": "Medium", "price": 0},
                   {"id": "spicy", "name": "Spicy", "price": 0}
                 ],
                 "required": false,
                 "maxSelections": 1
               },
               {
                 "id": "extras",
                 "name": "Add-ons",
                 "options": [
                   {"id": "extra-portion", "name": "Extra Portion (+50%)", "price": ' || (price * 0.5)::text || '},
                   {"id": "extra-bread", "name": "Extra Bread", "price": 3},
                   {"id": "olive-oil", "name": "Premium Olive Oil Drizzle", "price": 2},
                   {"id": "cheese", "name": "Extra Cheese", "price": 4}
                 ],
                 "required": false,
                 "maxSelections": 4
               }
             ]'::jsonb
           WHEN category = 'starters' THEN
             '[
               {
                 "id": "size",
                 "name": "Portion Size",
                 "options": [
                   {"id": "regular", "name": "Regular", "price": 0},
                   {"id": "large", "name": "Large (+30%)", "price": ' || (price * 0.3)::text || '}
                 ],
                 "required": true,
                 "maxSelections": 1
               },
               {
                 "id": "extras",
                 "name": "Add-ons",
                 "options": [
                   {"id": "extra-portion", "name": "Extra Portion (+50%)", "price": ' || (price * 0.5)::text || '},
                   {"id": "extra-dip", "name": "Extra Dipping Sauce", "price": 2},
                   {"id": "side-salad", "name": "Side Salad", "price": 6}
                 ],
                 "required": false,
                 "maxSelections": 3
               }
             ]'::jsonb
           WHEN category = 'desserts' THEN
             '[
               {
                 "id": "temperature",
                 "name": "Serving Temperature",
                 "options": [
                   {"id": "room-temp", "name": "Room Temperature", "price": 0},
                   {"id": "chilled", "name": "Chilled", "price": 0},
                   {"id": "warm", "name": "Warm", "price": 1}
                 ],
                 "required": false,
                 "maxSelections": 1
               },
               {
                 "id": "extras",
                 "name": "Add-ons",
                 "options": [
                   {"id": "extra-portion", "name": "Extra Portion (+50%)", "price": ' || (price * 0.5)::text || '},
                   {"id": "ice-cream", "name": "Vanilla Ice Cream", "price": 4},
                   {"id": "whipped-cream", "name": "Whipped Cream", "price": 2},
                   {"id": "berries", "name": "Fresh Berries", "price": 5},
                   {"id": "chocolate-sauce", "name": "Chocolate Sauce", "price": 2}
                 ],
                 "required": false,
                 "maxSelections": 4
               }
             ]'::jsonb
           WHEN category = 'drinks' AND subcategory IN ('Coffee', 'Tea') THEN
             '[
               {
                 "id": "size",
                 "name": "Size",
                 "options": [
                   {"id": "regular", "name": "Regular", "price": 0},
                   {"id": "large", "name": "Large", "price": 2}
                 ],
                 "required": true,
                 "maxSelections": 1
               },
               {
                 "id": "milk",
                 "name": "Milk Options",
                 "options": [
                   {"id": "none", "name": "Black", "price": 0},
                   {"id": "regular", "name": "Regular Milk", "price": 0},
                   {"id": "oat", "name": "Oat Milk", "price": 1},
                   {"id": "almond", "name": "Almond Milk", "price": 1},
                   {"id": "soy", "name": "Soy Milk", "price": 1}
                 ],
                 "required": false,
                 "maxSelections": 1
               },
               {
                 "id": "extras",
                 "name": "Add-ons",
                 "options": [
                   {"id": "extra-shot", "name": "Extra Shot", "price": 2},
                   {"id": "decaf", "name": "Make it Decaf", "price": 0},
                   {"id": "sugar", "name": "Sugar", "price": 0},
                   {"id": "honey", "name": "Honey", "price": 1}
                 ],
                 "required": false,
                 "maxSelections": 4
               }
             ]'::jsonb
           ELSE
             '[
               {
                 "id": "extras",
                 "name": "Add-ons",
                 "options": [
                   {"id": "extra-portion", "name": "Extra Portion (+50%)", "price": ' || (price * 0.5)::text || '}
                 ],
                 "required": false,
                 "maxSelections": 1
               }
             ]'::jsonb
         END
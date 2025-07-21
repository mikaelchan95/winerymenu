/*
  # Update menu items with correct image filenames from Supabase storage

  Updates all menu items to use the exact filenames that exist in the food-images bucket.
  Maps menu item names to their corresponding image files.
*/

-- Update TAPAS items
UPDATE menu_items SET image = 'Forever Crispy Fries.jpg' WHERE name = 'Forever Crispy Fries';
UPDATE menu_items SET image = 'Squid Ink Croquettes.jpg' WHERE name = 'Squid Ink Croquettes';
UPDATE menu_items SET image = 'Porcini Mushroom Croquettes.jpg' WHERE name = 'Porcini Mushroom Croquettes';
UPDATE menu_items SET image = 'Wagyu Beef Brioche Sliders (2 Pcs).jpg' WHERE name = 'Wagyu Beef Brioche Sliders (2 pcs)';
UPDATE menu_items SET image = 'Crispy Baby Cuttlefish.jpg' WHERE name = 'Crispy Baby Cuttlefish';
UPDATE menu_items SET image = 'Crispy Baby Cuttlefish.jpg' WHERE name = 'Mala Crispy Baby Cuttlefish';
UPDATE menu_items SET image = 'Roasted Cauliflower.jpg' WHERE name = 'Roasted Cauliflower';
UPDATE menu_items SET image = 'Tortilla Chips.jpg' WHERE name = 'Tortilla Chips';
UPDATE menu_items SET image = 'Free-Range Chicken Wings (6 Pcs).jpg' WHERE name = 'Free-Range Chicken Wings (6 pcs)';
UPDATE menu_items SET image = 'Fried Artichoke.jpg' WHERE name = 'Fried Artichoke';
UPDATE menu_items SET image = 'Huevos Estrellados.jpg' WHERE name = 'Huevos Estrellados';

-- Update STARTERS items
UPDATE menu_items SET image = 'Gambas al Ajillo.jpg' WHERE name = 'Gambas al Ajillo';
UPDATE menu_items SET image = 'Marinated Italian Olives.jpg' WHERE name = 'Marinated Italian Olives';
UPDATE menu_items SET image = 'Premium Nuts Medley.jpg' WHERE name = 'Premium Nuts Medley';
UPDATE menu_items SET image = 'Artisan Cheese Platter.jpg' WHERE name = 'Artisan Cheese Platter';
UPDATE menu_items SET image = 'Trio of Cured Meats.jpg' WHERE name = 'Trio of Cured Meats';
UPDATE menu_items SET image = 'Baked Camembert Cheese.jpg' WHERE name = 'Baked Camembert Cheese';
UPDATE menu_items SET image = 'Winery Platter.jpg' WHERE name = 'Winery Platter';
UPDATE menu_items SET image = 'Sweet Potato Taco (3 pcs).jpg' WHERE name = 'Sweet Potato Taco (3 pcs)';
UPDATE menu_items SET image = 'Duck Confit Taco (3 pcs).jpg' WHERE name = 'Duck Confit Taco (3 pcs)';
UPDATE menu_items SET image = 'Suckling Pig Taco (3 pcs).jpg' WHERE name = 'Suckling Pig Taco (3 pcs)';
UPDATE menu_items SET image = 'Grilled Galician Octopus.jpg' WHERE name = 'Grilled Galician Octopus';
UPDATE menu_items SET image = 'Cold Capellini.jpg' WHERE name = 'Cold Capellini';

-- Update MAINS items
UPDATE menu_items SET image = 'Miso Baked Wild Black Cod.jpg' WHERE name = 'Miso Baked Wild Black Cod';
UPDATE menu_items SET image = 'Australian Lamb Rack (3 Pcs).jpg' WHERE name = 'Australian Lamb Rack (3 pcs)';
UPDATE menu_items SET image = 'Slow-Cooked Australian Short Rib.jpg' WHERE name = 'Slow-Cooked Australian Short Rib';
UPDATE menu_items SET image = 'Roasted Spanish Suckling Pig Leg.jpg' WHERE name = 'Roasted Spanish Suckling Pig Leg';
UPDATE menu_items SET image = 'Grilled Galician Grass-Fed MB4 Ribeye (200 g).jpg' WHERE name = 'Grilled Galician Grass-Fed MB4 Ribeye (200 g)';

-- Update PAELLAS items
UPDATE menu_items SET image = 'Senyoret Paella.jpg' WHERE name = 'Senyoret Paella';
UPDATE menu_items SET image = 'Paella Valenciana (Vegetarian).jpg' WHERE name = 'Paella Valenciana (Vegetarian)';
UPDATE menu_items SET image = 'Paella de Marisco (Seafood).jpg' WHERE name = 'Paella de Marisco (Seafood)';

-- Update DESSERTS items
UPDATE menu_items SET image = 'Truffle Mille-Feuille.jpg' WHERE name = 'Truffle Mille-Feuille';
UPDATE menu_items SET image = 'Espresso Martini Tiramisu.jpg' WHERE name = 'Espresso Martini Tiramisu';
UPDATE menu_items SET image = 'Burnt Basque Cheesecake.jpg' WHERE name = 'Burnt Basque Cheesecake';
UPDATE menu_items SET image = 'Valrhona Dark Chocolate Heaven.jpg' WHERE name = 'Valrhona Dark Chocolate Heaven';

-- Set NULL for items without matching images
UPDATE menu_items SET image = NULL WHERE name IN (
  'Padrón Peppers',
  'Patatas Bravas', 
  '5J Jamón Bikini',
  '5J Jamón de Bellota Ibérico (50 g)',
  'Ibérico Pork Ribs (4 pcs)',
  'Ibérico Pork Rib Paella'
);
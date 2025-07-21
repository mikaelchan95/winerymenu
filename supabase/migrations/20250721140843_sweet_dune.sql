/*
  # Update Menu Items with Actual Image Names

  This migration updates the menu items to use the actual uploaded image filenames
  which follow the pattern: "[Menu Item Name].jpg"
  
  Based on the example: "Gambas al Ajillo.jpg"
*/

-- Update all menu items to use their actual names as image filenames
UPDATE menu_items SET image = name || '.jpg' WHERE image IS NULL OR image = '';

-- For items that might have different image names, set them explicitly
-- (You can update these based on your actual uploaded filenames)

-- Tapas items
UPDATE menu_items SET image = 'Padron Peppers.jpg' WHERE name = 'Padrón Peppers';
UPDATE menu_items SET image = 'Forever Crispy Fries.jpg' WHERE name = 'Forever Crispy Fries';
UPDATE menu_items SET image = 'Squid Ink Croquettes.jpg' WHERE name = 'Squid Ink Croquettes';
UPDATE menu_items SET image = 'Porcini Mushroom Croquettes.jpg' WHERE name = 'Porcini Mushroom Croquettes';
UPDATE menu_items SET image = 'Patatas Bravas.jpg' WHERE name = 'Patatas Bravas';
UPDATE menu_items SET image = 'Wagyu Beef Brioche Sliders.jpg' WHERE name = 'Wagyu Beef Brioche Sliders (2 pcs)';
UPDATE menu_items SET image = '5J Jamon Bikini.jpg' WHERE name = '5J Jamón Bikini';
UPDATE menu_items SET image = 'Crispy Baby Cuttlefish.jpg' WHERE name = 'Crispy Baby Cuttlefish';
UPDATE menu_items SET image = 'Mala Crispy Baby Cuttlefish.jpg' WHERE name = 'Mala Crispy Baby Cuttlefish';
UPDATE menu_items SET image = 'Roasted Cauliflower.jpg' WHERE name = 'Roasted Cauliflower';
UPDATE menu_items SET image = 'Tortilla Chips.jpg' WHERE name = 'Tortilla Chips';
UPDATE menu_items SET image = 'Free-Range Chicken Wings.jpg' WHERE name = 'Free-Range Chicken Wings (6 pcs)';
UPDATE menu_items SET image = 'Fried Artichoke.jpg' WHERE name = 'Fried Artichoke';
UPDATE menu_items SET image = 'Huevos Estrellados.jpg' WHERE name = 'Huevos Estrellados';

-- Starters
UPDATE menu_items SET image = 'Gambas al Ajillo.jpg' WHERE name = 'Gambas al Ajillo';
UPDATE menu_items SET image = '5J Jamon de Bellota Iberico.jpg' WHERE name = '5J Jamón de Bellota Ibérico (50 g)';
UPDATE menu_items SET image = 'Marinated Italian Olives.jpg' WHERE name = 'Marinated Italian Olives';
UPDATE menu_items SET image = 'Premium Nuts Medley.jpg' WHERE name = 'Premium Nuts Medley';
UPDATE menu_items SET image = 'Artisan Cheese Platter.jpg' WHERE name = 'Artisan Cheese Platter';
UPDATE menu_items SET image = 'Trio of Cured Meats.jpg' WHERE name = 'Trio of Cured Meats';
UPDATE menu_items SET image = 'Baked Camembert Cheese.jpg' WHERE name = 'Baked Camembert Cheese';
UPDATE menu_items SET image = 'Winery Platter.jpg' WHERE name = 'Winery Platter';
UPDATE menu_items SET image = 'Sweet Potato Taco.jpg' WHERE name = 'Sweet Potato Taco (3 pcs)';
UPDATE menu_items SET image = 'Duck Confit Taco.jpg' WHERE name = 'Duck Confit Taco (3 pcs)';
UPDATE menu_items SET image = 'Suckling Pig Taco.jpg' WHERE name = 'Suckling Pig Taco (3 pcs)';
UPDATE menu_items SET image = 'Grilled Galician Octopus.jpg' WHERE name = 'Grilled Galician Octopus';
UPDATE menu_items SET image = 'Cold Capellini.jpg' WHERE name = 'Cold Capellini';

-- Mains
UPDATE menu_items SET image = 'Miso Baked Wild Black Cod.jpg' WHERE name = 'Miso Baked Wild Black Cod';
UPDATE menu_items SET image = 'Iberico Pork Ribs.jpg' WHERE name = 'Ibérico Pork Ribs (4 pcs)';
UPDATE menu_items SET image = 'Australian Lamb Rack.jpg' WHERE name = 'Australian Lamb Rack (3 pcs)';
UPDATE menu_items SET image = 'Slow-Cooked Australian Short Rib.jpg' WHERE name = 'Slow-Cooked Australian Short Rib';
UPDATE menu_items SET image = 'Roasted Spanish Suckling Pig Leg.jpg' WHERE name = 'Roasted Spanish Suckling Pig Leg';
UPDATE menu_items SET image = 'Grilled Galician Ribeye.jpg' WHERE name = 'Grilled Galician Grass-Fed MB4 Ribeye (200 g)';

-- Paellas
UPDATE menu_items SET image = 'Senyoret Paella.jpg' WHERE name = 'Senyoret Paella';
UPDATE menu_items SET image = 'Iberico Pork Rib Paella.jpg' WHERE name = 'Ibérico Pork Rib Paella';
UPDATE menu_items SET image = 'Paella Valenciana.jpg' WHERE name = 'Paella Valenciana (Vegetarian)';
UPDATE menu_items SET image = 'Paella de Marisco.jpg' WHERE name = 'Paella de Marisco (Seafood)';

-- Desserts
UPDATE menu_items SET image = 'Truffle Mille-Feuille.jpg' WHERE name = 'Truffle Mille-Feuille';
UPDATE menu_items SET image = 'Espresso Martini Tiramisu.jpg' WHERE name = 'Espresso Martini Tiramisu';
UPDATE menu_items SET image = 'Burnt Basque Cheesecake.jpg' WHERE name = 'Burnt Basque Cheesecake';
UPDATE menu_items SET image = 'Valrhona Dark Chocolate Heaven.jpg' WHERE name = 'Valrhona Dark Chocolate Heaven';
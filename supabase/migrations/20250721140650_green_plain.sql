/*
  # Match Food Images to Menu Items

  This migration updates menu items to use the uploaded images from the food-images bucket.
  Images are matched based on common naming patterns.
*/

-- Update tapas items
UPDATE menu_items SET image = 'padron-peppers.jpg' WHERE name = 'Padrón Peppers';
UPDATE menu_items SET image = 'crispy-fries.jpg' WHERE name = 'Forever Crispy Fries';
UPDATE menu_items SET image = 'squid-ink-croquettes.jpg' WHERE name = 'Squid Ink Croquettes';
UPDATE menu_items SET image = 'mushroom-croquettes.jpg' WHERE name = 'Porcini Mushroom Croquettes';
UPDATE menu_items SET image = 'patatas-bravas.jpg' WHERE name = 'Patatas Bravas';
UPDATE menu_items SET image = 'wagyu-sliders.jpg' WHERE name = 'Wagyu Beef Brioche Sliders (2 pcs)';
UPDATE menu_items SET image = 'jamon-bikini.jpg' WHERE name = '5J Jamón Bikini';
UPDATE menu_items SET image = 'crispy-cuttlefish.jpg' WHERE name = 'Crispy Baby Cuttlefish';
UPDATE menu_items SET image = 'mala-cuttlefish.jpg' WHERE name = 'Mala Crispy Baby Cuttlefish';
UPDATE menu_items SET image = 'roasted-cauliflower.jpg' WHERE name = 'Roasted Cauliflower';
UPDATE menu_items SET image = 'tortilla-chips.jpg' WHERE name = 'Tortilla Chips';
UPDATE menu_items SET image = 'chicken-wings.jpg' WHERE name = 'Free-Range Chicken Wings (6 pcs)';
UPDATE menu_items SET image = 'fried-artichoke.jpg' WHERE name = 'Fried Artichoke';
UPDATE menu_items SET image = 'huevos-estrellados.jpg' WHERE name = 'Huevos Estrellados';

-- Update starters
UPDATE menu_items SET image = 'gambas-al-ajillo.jpg' WHERE name = 'Gambas al Ajillo';
UPDATE menu_items SET image = 'jamon-iberico.jpg' WHERE name = '5J Jamón de Bellota Ibérico (50 g)';
UPDATE menu_items SET image = 'marinated-olives.jpg' WHERE name = 'Marinated Italian Olives';
UPDATE menu_items SET image = 'premium-nuts.jpg' WHERE name = 'Premium Nuts Medley';
UPDATE menu_items SET image = 'cheese-platter.jpg' WHERE name = 'Artisan Cheese Platter';
UPDATE menu_items SET image = 'cured-meats.jpg' WHERE name = 'Trio of Cured Meats';
UPDATE menu_items SET image = 'baked-camembert.jpg' WHERE name = 'Baked Camembert Cheese';
UPDATE menu_items SET image = 'winery-platter.jpg' WHERE name = 'Winery Platter';
UPDATE menu_items SET image = 'sweet-potato-taco.jpg' WHERE name = 'Sweet Potato Taco (3 pcs)';
UPDATE menu_items SET image = 'duck-taco.jpg' WHERE name = 'Duck Confit Taco (3 pcs)';
UPDATE menu_items SET image = 'suckling-pig-taco.jpg' WHERE name = 'Suckling Pig Taco (3 pcs)';
UPDATE menu_items SET image = 'grilled-octopus.jpg' WHERE name = 'Grilled Galician Octopus';
UPDATE menu_items SET image = 'cold-capellini.jpg' WHERE name = 'Cold Capellini';

-- Update mains
UPDATE menu_items SET image = 'miso-black-cod.jpg' WHERE name = 'Miso Baked Wild Black Cod';
UPDATE menu_items SET image = 'iberico-ribs.jpg' WHERE name = 'Ibérico Pork Ribs (4 pcs)';
UPDATE menu_items SET image = 'lamb-rack.jpg' WHERE name = 'Australian Lamb Rack (3 pcs)';
UPDATE menu_items SET image = 'short-rib.jpg' WHERE name = 'Slow-Cooked Australian Short Rib';
UPDATE menu_items SET image = 'suckling-pig-leg.jpg' WHERE name = 'Roasted Spanish Suckling Pig Leg';
UPDATE menu_items SET image = 'ribeye-steak.jpg' WHERE name = 'Grilled Galician Grass-Fed MB4 Ribeye (200 g)';

-- Update paellas
UPDATE menu_items SET image = 'senyoret-paella.jpg' WHERE name = 'Senyoret Paella';
UPDATE menu_items SET image = 'iberico-paella.jpg' WHERE name = 'Ibérico Pork Rib Paella';
UPDATE menu_items SET image = 'paella-valenciana.jpg' WHERE name = 'Paella Valenciana (Vegetarian)';
UPDATE menu_items SET image = 'paella-marisco.jpg' WHERE name = 'Paella de Marisco (Seafood)';

-- Update desserts
UPDATE menu_items SET image = 'truffle-mille-feuille.jpg' WHERE name = 'Truffle Mille-Feuille';
UPDATE menu_items SET image = 'espresso-tiramisu.jpg' WHERE name = 'Espresso Martini Tiramisu';
UPDATE menu_items SET image = 'basque-cheesecake.jpg' WHERE name = 'Burnt Basque Cheesecake';
UPDATE menu_items SET image = 'chocolate-heaven.jpg' WHERE name = 'Valrhona Dark Chocolate Heaven';

-- Update any remaining items to use a default pattern
UPDATE menu_items 
SET image = LOWER(REPLACE(REPLACE(name, ' ', '-'), '(', '')) || '.jpg'
WHERE image IS NULL OR image = '/assets/images/veganpopcornchickentofurecipe-h1.jpg';

-- Clean up image paths (remove any unwanted characters)
UPDATE menu_items 
SET image = LOWER(REPLACE(REPLACE(REPLACE(REPLACE(image, ')', ''), '(', ''), ' ', '-'), '--', '-'));
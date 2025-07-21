/*
  # Fix Image Loading Issues with Space-Separated Filenames
  
  1. Problem
    - Images with spaces in filenames (e.g., "Padron Peppers.jpg") are failing to load
    - Browser/CDN compatibility issues with space-encoded URLs
    
  2. Solution
    - Update database to use kebab-case filenames (e.g., "padron-peppers.jpg")
    - These filenames should match renamed files in Supabase storage
    
  3. Changes
    - Convert all menu item names to kebab-case .jpg filenames
    - Remove special characters, spaces, parentheses, numbers
    - Use lowercase with hyphens
*/

-- Update all menu items with kebab-case image filenames
UPDATE menu_items SET image = 'padron-peppers.jpg' WHERE name = 'Padrón Peppers';
UPDATE menu_items SET image = 'forever-crispy-fries.jpg' WHERE name = 'Forever Crispy Fries';
UPDATE menu_items SET image = 'squid-ink-croquettes.jpg' WHERE name = 'Squid Ink Croquettes';
UPDATE menu_items SET image = 'porcini-mushroom-croquettes.jpg' WHERE name = 'Porcini Mushroom Croquettes';
UPDATE menu_items SET image = 'patatas-bravas.jpg' WHERE name = 'Patatas Bravas';
UPDATE menu_items SET image = 'wagyu-beef-brioche-sliders.jpg' WHERE name = 'Wagyu Beef Brioche Sliders';
UPDATE menu_items SET image = 'jamon-bikini.jpg' WHERE name = '5J Jamón Bikini';
UPDATE menu_items SET image = 'mala-crispy-baby-cuttlefish.jpg' WHERE name = 'Mala Crispy Baby Cuttlefish';
UPDATE menu_items SET image = 'roasted-cauliflower.jpg' WHERE name = 'Roasted Cauliflower';
UPDATE menu_items SET image = 'gambas-al-ajillo.jpg' WHERE name = 'Gambas al Ajillo';
UPDATE menu_items SET image = 'jamon-de-bellota-iberico.jpg' WHERE name = '5J Jamón de Bellota Ibérico (50 g)';
UPDATE menu_items SET image = 'beef-tendon.jpg' WHERE name = 'Beef Tendon';

-- Mains
UPDATE menu_items SET image = 'australian-lamb-rack.jpg' WHERE name = 'Australian Lamb Rack (3 pcs)';
UPDATE menu_items SET image = 'grilled-galician-ribeye.jpg' WHERE name = 'Grilled Galician Ribeye';
UPDATE menu_items SET image = 'miso-baked-wild-black-cod.jpg' WHERE name = 'Miso Baked Wild Black Cod';
UPDATE menu_items SET image = 'duck-breast.jpg' WHERE name = 'Duck Breast';
UPDATE menu_items SET image = 'pork-secreto-iberico.jpg' WHERE name = 'Pork Secreto Ibérico';

-- Paellas
UPDATE menu_items SET image = 'senyoret-paella.jpg' WHERE name = 'Senyoret Paella';
UPDATE menu_items SET image = 'paella-de-marisco.jpg' WHERE name = 'Paella de Marisco (Seafood)';
UPDATE menu_items SET image = 'paella-valenciana.jpg' WHERE name = 'Paella Valenciana (Vegetarian)';
UPDATE menu_items SET image = 'paella-negra.jpg' WHERE name = 'Paella Negra (Squid Ink)';

-- Desserts
UPDATE menu_items SET image = 'espresso-martini-tiramisu.jpg' WHERE name = 'Espresso Martini Tiramisu';
UPDATE menu_items SET image = 'burnt-basque-cheesecake.jpg' WHERE name = 'Burnt Basque Cheesecake';
UPDATE menu_items SET image = 'valrhona-dark-chocolate-heaven.jpg' WHERE name = 'Valrhona Dark Chocolate Heaven';
UPDATE menu_items SET image = 'seasonal-fruit-tart.jpg' WHERE name = 'Seasonal Fruit Tart';
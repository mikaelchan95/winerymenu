/*
  # Migrate All Food Items to Supabase

  1. Insert all food items from static data files into menu_items table
  2. This includes tapas, starters, mains, paellas, and desserts
  3. Each item has proper categorization, pricing, and metadata
*/

-- Clear existing food items to avoid duplicates
DELETE FROM menu_items WHERE category IN ('tapas', 'starters', 'mains', 'paellas', 'desserts');

-- Insert TAPAS items
INSERT INTO menu_items (id, name, description, price, image, category, allergens, tags, spice_level, featured, available, sort_order) VALUES
('tapas-1', 'Padrón Peppers', 'Sea salt, togarashi', 15, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', NULL, ARRAY['vegetarian', 'spicy'], 1, false, true, 1),
('tapas-2', 'Forever Crispy Fries', 'Served with truffle mayo', 16, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', NULL, ARRAY['vegetarian', 'truffle'], NULL, false, true, 2),
('tapas-3', 'Squid Ink Croquettes', 'Served with smoked chipotle mayo', 16, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['dairy', 'gluten', 'seafood'], ARRAY['seafood', 'spanish'], NULL, false, true, 3),
('tapas-4', 'Porcini Mushroom Croquettes', 'Served with truffle mayo', 16, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['dairy', 'gluten'], ARRAY['vegetarian', 'mushroom', 'truffle'], NULL, false, true, 4),
('tapas-5', 'Patatas Bravas', 'Crispy layered Agria potatoes, spicy bravas sauce, handmade mayo, togarashi', 16, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['dairy'], ARRAY['vegetarian', 'spicy', 'spanish'], 2, false, true, 5),
('tapas-6', 'Wagyu Beef Brioche Sliders (2 pcs)', 'Caramelized onion, Dijon mustard, cheddar', 22, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['dairy', 'gluten'], ARRAY['wagyu', 'beef', 'premium'], NULL, false, true, 6),
('tapas-7', '5J Jamón Bikini', 'Ibérico jamón, dashi béchamel, toasted sandwich', 16, '5J Jamon de Bellota Iberico (50 g).jpg', 'tapas', ARRAY['dairy', 'gluten'], ARRAY['jamon', 'spanish', 'premium'], NULL, false, true, 7),
('tapas-8', 'Crispy Baby Cuttlefish', 'Served with mayo, lemon wedge', 16, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['seafood'], ARRAY['seafood', 'crispy'], NULL, false, true, 8),
('tapas-9', 'Mala Crispy Baby Cuttlefish', 'Served with smoked chipotle mayo', 16, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['seafood'], ARRAY['seafood', 'spicy', 'mala'], 3, false, true, 9),
('tapas-10', 'Roasted Cauliflower', 'Romesco sauce, basil pesto, pine nuts, piparras, Parmesan', 20, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['dairy', 'nuts'], ARRAY['vegetarian', 'romesco', 'pesto'], NULL, false, true, 10),
('tapas-11', 'Tortilla Chips', 'Served with tomato salsa', 12, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', NULL, ARRAY['vegetarian', 'mexican'], NULL, false, true, 11),
('tapas-12', 'Free-Range Chicken Wings (6 pcs)', 'Smoked chipotle mayo, lemon wedge', 18, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', NULL, ARRAY['chicken', 'wings', 'spicy'], 2, false, true, 12),
('tapas-13', 'Fried Artichoke', 'Served with smoked chipotle mayo', 18, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', NULL, ARRAY['vegetarian', 'fried'], NULL, false, true, 13),
('tapas-14', 'Huevos Estrellados', 'Free-range eggs, 5J Ibérico jamón, crispy potatoes, caramelized onion', 20, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['eggs'], ARRAY['eggs', 'jamon', 'spanish'], NULL, false, true, 14);

-- Insert STARTERS items
INSERT INTO menu_items (id, name, description, price, image, category, allergens, tags, spice_level, featured, available, sort_order) VALUES
('starters-1', 'Gambas al Ajillo', 'Wild-caught tiger prawns, extra virgin olive oil, dry chili, crispy garlic, sourdough bread, white wine', 25, 'veganpopcornchickentofurecipe-h1.jpg', 'starters', ARRAY['seafood', 'gluten'], ARRAY['prawns', 'garlic', 'spanish'], 1, false, true, 1),
('starters-2', '5J Jamón de Bellota Ibérico (50 g)', 'Jamón ibérico shoulder bellota, 60-month-aged gran reserva', 39, '5J Jamon de Bellota Iberico (50 g).jpg', 'starters', NULL, ARRAY['jamon', 'premium', 'spanish', 'aged'], NULL, false, true, 2),
('starters-3', 'Marinated Italian Olives', 'Chef''s selection of olives', 8, 'veganpopcornchickentofurecipe-h1.jpg', 'starters', NULL, ARRAY['olives', 'italian', 'vegetarian'], NULL, false, true, 3),
('starters-4', 'Premium Nuts Medley', 'Roasted cashews, hazelnuts, macadamias, cumin & paprika', 9, 'veganpopcornchickentofurecipe-h1.jpg', 'starters', ARRAY['nuts'], ARRAY['nuts', 'vegetarian', 'spiced'], NULL, false, true, 4),
('starters-5', 'Artisan Cheese Platter', 'Chef''s selection of artisan cheeses', 24, 'veganpopcornchickentofurecipe-h1.jpg', 'starters', ARRAY['dairy'], ARRAY['cheese', 'vegetarian', 'artisan'], NULL, false, true, 5),
('starters-6', 'Trio of Cured Meats', 'Chef''s selection of cold cuts', 18, 'veganpopcornchickentofurecipe-h1.jpg', 'starters', NULL, ARRAY['charcuterie', 'cured meats'], NULL, false, true, 6),
('starters-7', 'Baked Camembert Cheese', 'White wine, onion jam, green leafy salad, honey, sourdough bread', 22, 'veganpopcornchickentofurecipe-h1.jpg', 'starters', ARRAY['dairy', 'gluten'], ARRAY['cheese', 'vegetarian', 'baked'], NULL, false, true, 7),
('starters-8', 'Winery Platter', '3 types of cheese, 3 types of cold cuts', 38, 'veganpopcornchickentofurecipe-h1.jpg', 'starters', ARRAY['dairy'], ARRAY['cheese', 'charcuterie', 'sharing'], NULL, false, true, 8),
('starters-9', 'Sweet Potato Taco (3 pcs)', 'Soft taco shells filled with sweet potato and sesame dressing', 15, 'veganpopcornchickentofurecipe-h1.jpg', 'starters', ARRAY['gluten'], ARRAY['vegetarian', 'taco', 'sweet potato'], NULL, false, true, 9),
('starters-10', 'Duck Confit Taco (3 pcs)', 'Lafitte duck confit, handmade sweet sauce, pickled onion', 18, 'veganpopcornchickentofurecipe-h1.jpg', 'starters', ARRAY['gluten'], ARRAY['duck', 'taco', 'confit'], NULL, false, true, 10),
('starters-11', 'Suckling Pig Taco (3 pcs)', 'Spanish suckling pig, handmade sweet sauce, pickled onion', 18, 'veganpopcornchickentofurecipe-h1.jpg', 'starters', ARRAY['gluten'], ARRAY['pork', 'taco', 'spanish'], NULL, false, true, 11),
('starters-12', 'Grilled Galician Octopus', 'Tender octopus with mojo verde sauce, aioli, cherry tomatoes, piquillo peppers, basil oil', 28, 'veganpopcornchickentofurecipe-h1.jpg', 'starters', ARRAY['seafood'], ARRAY['octopus', 'seafood', 'galician'], NULL, false, true, 12),
('starters-13', 'Cold Capellini', 'Capellini pasta tossed in white truffle oil and kombu sauce, topped with Hokkaido scallop and uni', 30, 'veganpopcornchickentofurecipe-h1.jpg', 'starters', ARRAY['gluten', 'seafood'], ARRAY['pasta', 'truffle', 'scallop', 'uni', 'premium'], NULL, false, true, 13);

-- Insert MAINS items
INSERT INTO menu_items (id, name, description, price, image, category, allergens, tags, spice_level, featured, available, sort_order) VALUES
('mains-1', 'Miso Baked Wild Black Cod', 'Miso and mirin-marinated black cod, white wine sauce, ikura, avruga caviar, basil oil', 32, 'veganpopcornchickentofurecipe-h1.jpg', 'mains', ARRAY['seafood', 'soy'], ARRAY['cod', 'miso', 'japanese', 'premium'], NULL, false, true, 1),
('mains-2', 'Ibérico Pork Ribs (4 pcs)', 'Guinness glaze, romesco sauce, almond flakes, red wine mustard sauce', 30, 'veganpopcornchickentofurecipe-h1.jpg', 'mains', ARRAY['nuts'], ARRAY['pork', 'ribs', 'iberico', 'guinness'], NULL, false, true, 2),
('mains-3', 'Australian Lamb Rack (3 pcs)', 'Grilled lamb rack with baby potatoes, sautéed spinach, Guinness sauce, piquillo pepper', 48, 'veganpopcornchickentofurecipe-h1.jpg', 'mains', NULL, ARRAY['lamb', 'australian', 'premium'], NULL, false, true, 3),
('mains-4', 'Slow-Cooked Australian Short Rib', 'Braised short rib served with mashed potatoes, caramelized onions, chives, red wine mustard sauce', 32, 'veganpopcornchickentofurecipe-h1.jpg', 'mains', ARRAY['dairy'], ARRAY['beef', 'short rib', 'braised'], NULL, false, true, 4),
('mains-5', 'Roasted Spanish Suckling Pig Leg', 'Crispy suckling pig leg served with blistered Padrón peppers', 98, 'veganpopcornchickentofurecipe-h1.jpg', 'mains', NULL, ARRAY['pork', 'suckling pig', 'spanish', 'premium'], NULL, false, true, 5),
('mains-6', 'Grilled Galician Grass-Fed MB4 Ribeye (200 g)', 'Seared ribeye on a sizzling hot plate with red wine mustard sauce and garlic chips', 46, 'veganpopcornchickentofurecipe-h1.jpg', 'mains', NULL, ARRAY['beef', 'ribeye', 'galician', 'premium'], NULL, false, true, 6);

-- Insert PAELLAS items
INSERT INTO menu_items (id, name, description, price, image, category, allergens, tags, spice_level, featured, available, sort_order) VALUES
('paellas-1', 'Senyoret Paella', 'Seafood paella without shell served with truffle mayo, soffritto, and a hint of Sambuca Vaccari', 58, 'veganpopcornchickentofurecipe-h1.jpg', 'paellas', ARRAY['seafood'], ARRAY['paella', 'seafood', 'spanish', 'truffle'], NULL, false, true, 1),
('paellas-2', 'Ibérico Pork Rib Paella', 'Brandy-infused rice with onion jam, crispy Ibérico pork ribs, and truffle mayo', 52, 'veganpopcornchickentofurecipe-h1.jpg', 'paellas', NULL, ARRAY['paella', 'pork', 'iberico', 'truffle'], NULL, false, true, 2),
('paellas-3', 'Paella Valenciana (Vegetarian)', 'Vegetarian paella with cauliflower, carrots, shimeji mushrooms, Padrón peppers, and truffle mayo', 32, 'veganpopcornchickentofurecipe-h1.jpg', 'paellas', NULL, ARRAY['paella', 'vegetarian', 'valenciana', 'truffle'], NULL, false, true, 3),
('paellas-4', 'Paella de Marisco (Seafood)', 'Seafood paella with Hokkaido scallops, mussels, tiger prawns, sea urchin, ikura, and truffle mayo', 68, 'veganpopcornchickentofurecipe-h1.jpg', 'paellas', ARRAY['seafood'], ARRAY['paella', 'seafood', 'premium', 'scallops', 'uni'], NULL, false, true, 4);

-- Insert DESSERTS items
INSERT INTO menu_items (id, name, description, price, image, category, allergens, tags, spice_level, featured, available, sort_order) VALUES
('desserts-1', 'Truffle Mille-Feuille', 'Layers of puff pastry with truffle cream, white chocolate, almond crumble, and stracciatella ice cream', 16, 'veganpopcornchickentofurecipe-h1.jpg', 'desserts', ARRAY['dairy', 'gluten', 'nuts'], ARRAY['truffle', 'pastry', 'ice cream'], NULL, false, true, 1),
('desserts-2', 'Espresso Martini Tiramisu', 'Baileys and Kahlua-infused tiramisu with Vietnamese coffee', 15, 'veganpopcornchickentofurecipe-h1.jpg', 'desserts', ARRAY['dairy', 'eggs'], ARRAY['tiramisu', 'coffee', 'alcohol'], NULL, false, true, 2),
('desserts-3', 'Burnt Basque Cheesecake', 'Creamy cheesecake with almond crumble and stracciatella ice cream', 15, 'veganpopcornchickentofurecipe-h1.jpg', 'desserts', ARRAY['dairy', 'eggs', 'nuts'], ARRAY['cheesecake', 'basque', 'ice cream'], NULL, false, true, 3),
('desserts-4', 'Valrhona Dark Chocolate Heaven', 'Dark chocolate brownie with chocolate crumble, bread tuile, and chocolate ice cream', 15, 'veganpopcornchickentofurecipe-h1.jpg', 'desserts', ARRAY['dairy', 'gluten'], ARRAY['chocolate', 'brownie', 'valrhona', 'ice cream'], NULL, false, true, 4);
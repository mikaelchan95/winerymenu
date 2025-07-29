/*
  # Migrate Tapas Night Items to Supabase

  1. Insert all tapas night items into menu_items table
  2. These are special items available during Monday Tapas Night promotion
  3. Price is set to 0 as they're included in the prix fixe package
*/

-- Insert TAPAS NIGHT items (special category for Monday promotion)
INSERT INTO menu_items (id, name, description, price, image, category, allergens, tags, spice_level, featured, available, sort_order) VALUES
('tapas-night-1', 'Mixed Olives', 'Chef''s selection olives', 0, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', NULL, ARRAY['vegetarian', 'spanish'], NULL, false, true, 101),
('tapas-night-2', 'Sweet Potato Taco', 'Sweet potato, handmade sesame dressing', 0, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', NULL, ARRAY['vegetarian', 'taco'], NULL, false, true, 102),
('tapas-night-3', 'Padrón Peppers', 'Sea salt, togarashi', 0, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', NULL, ARRAY['vegetarian', 'spicy', 'spanish'], 1, false, true, 103),
('tapas-night-4', 'Porcini Mushroom Croquettes', 'Truffle mayo', 0, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['dairy', 'gluten'], ARRAY['vegetarian', 'mushroom', 'truffle'], NULL, false, true, 104),
('tapas-night-5', 'Crispy Fries', 'Truffle mayo', 0, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', NULL, ARRAY['vegetarian', 'truffle'], NULL, false, true, 105),
('tapas-night-6', 'Roasted Cauliflower', 'Romesco sauce, basil pesto, pine nuts, piparras, Parmigiano Reggiano', 0, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['dairy', 'nuts'], ARRAY['vegetarian', 'romesco', 'pesto'], NULL, false, true, 106),
('tapas-night-7', 'Patatas Bravas', 'Crispy layered Agria potatoes, spicy bravas sauce, mayo, togarashi', 0, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['dairy'], ARRAY['vegetarian', 'spicy', 'spanish'], 2, false, true, 107),
('tapas-night-8', 'Spanish Tortilla', 'Confit Agria potato, mayo', 0, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['eggs', 'dairy'], ARRAY['vegetarian', 'spanish'], NULL, false, true, 108),
('tapas-night-9', 'Baked Agria Potato with Cheese', 'Béchamel sauce, mozzarella, Parmigiano Reggiano', 0, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['dairy', 'gluten'], ARRAY['vegetarian', 'cheese'], NULL, false, true, 109),
('tapas-night-10', 'Pan con Tomate', 'Hand-ground Roma tomatoes, baguette, chives', 0, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['gluten'], ARRAY['vegetarian', 'spanish'], NULL, false, true, 110),
('tapas-night-11', 'Suckling Pig Taco', 'Spanish suckling pig, handmade sweet sauce, pickled onions', 0, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['gluten'], ARRAY['pork', 'taco', 'spanish'], NULL, false, true, 111),
('tapas-night-12', 'Wagyu Beef Brioche Slider with Fries', 'Caramelized onions, Dijon mustard, cheddar, mayo', 0, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['dairy', 'gluten'], ARRAY['wagyu', 'beef', 'premium'], NULL, false, true, 112),
('tapas-night-13', 'Crispy Baby Cuttlefish', 'Mayo, lemon wedge', 0, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['seafood'], ARRAY['seafood', 'crispy'], NULL, false, true, 113),
('tapas-night-14', 'Popcorn Chicken', 'Chipotle mayo, lemon wedge', 0, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', NULL, ARRAY['chicken', 'spicy'], 2, false, true, 114),
('tapas-night-15', 'Crispy Bacon with Cherry Tomato', 'Crispy bacon, cherry tomatoes, chipotle mayo', 0, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', NULL, ARRAY['bacon', 'pork'], NULL, false, true, 115),
('tapas-night-16', 'Trio of Cured Meats', 'Chef''s selection of cold cuts', 0, 'veganpopcornchickentofurecipe-h1.jpg', 'tapas', NULL, ARRAY['charcuterie', 'cured meats'], NULL, false, true, 116);
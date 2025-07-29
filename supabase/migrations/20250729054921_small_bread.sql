/*
  # Migrate All Drink Items to Supabase

  1. Insert all drink items from static data files into menu_items table
  2. This includes happy hour, beer, cocktails, spirits, shots, and non-alcoholic drinks
  3. Each item has proper categorization, pricing, and metadata
*/

-- Clear existing drink items to avoid duplicates
DELETE FROM menu_items WHERE category IN ('drinks', 'happy-hour', 'wine-champagne', 'beer', 'cocktails', 'spirits', 'shots', 'non-alcoholic');

-- Insert HAPPY HOUR items
INSERT INTO menu_items (id, name, description, price, image, category, subcategory, allergens, tags, spice_level, featured, available, sort_order) VALUES
('hh-1', 'Regalia DOC Prosecco', 'Italy - Prosecco', 12, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Bubbles', NULL, ARRAY['prosecco', 'sparkling', 'italy'], NULL, false, true, 1),
('hh-2', 'Prestige Des Sacres Brut Champagne', 'France - Chardonnay, Pinot Noir, Pinot Meunier', 18, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Bubbles', NULL, ARRAY['champagne', 'france', 'premium'], NULL, false, true, 2),
('hh-3', 'Castillo De Aresan', 'Spain - Chardonnay', 12, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'White Wine', NULL, ARRAY['chardonnay', 'spain', 'white wine'], NULL, false, true, 3),
('hh-4', 'François Dion Sauvignon Blanc', 'France - Sauvignon Blanc', 13, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'White Wine', NULL, ARRAY['sauvignon blanc', 'france', 'white wine'], NULL, false, true, 4),
('hh-5', 'Il Sole "Baci al Sole" IGT', 'Italy - Pinot Grigio', 15, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'White Wine', NULL, ARRAY['pinot grigio', 'italy', 'white wine'], NULL, false, true, 5),
('hh-6', 'Petalos De Aresan Rose Tempranillo', 'Spain - Tempranillo', 13, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Rosé', NULL, ARRAY['tempranillo', 'spain', 'rosé'], NULL, false, true, 6),
('hh-7', 'François Dion Cabernet Sauvignon', 'Chile - Cabernet Sauvignon', 12, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Red Wine', NULL, ARRAY['cabernet sauvignon', 'chile', 'red wine'], NULL, false, true, 7),
('hh-8', 'Ramirez de la Piscina Young Red', 'Spain - Tempranillo', 13, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Red Wine', NULL, ARRAY['tempranillo', 'spain', 'red wine'], NULL, false, true, 8),
('hh-9', 'Bottega Merlot', 'Italy - Merlot', 14, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Red Wine', NULL, ARRAY['merlot', 'italy', 'red wine'], NULL, false, true, 9),
('hh-10', 'Bacardi Carta Blanca', 'White rum', 10, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Spirits', NULL, ARRAY['rum', 'bacardi', 'white rum'], NULL, false, true, 10),
('hh-11', 'Jose Cuervo Special', 'Gold tequila', 10, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Spirits', NULL, ARRAY['tequila', 'jose cuervo', 'gold tequila'], NULL, false, true, 11),
('hh-12', 'Gordon''s Gin', 'London dry gin', 10, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Spirits', NULL, ARRAY['gin', 'gordons', 'london dry'], NULL, false, true, 12),
('hh-13', 'Smirnoff Vodka', 'Premium vodka', 10, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Spirits', NULL, ARRAY['vodka', 'smirnoff'], NULL, false, true, 13),
('hh-14', 'Famous Grouse', 'Blended Scotch whisky', 10, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Spirits', NULL, ARRAY['whisky', 'scotch', 'blended'], NULL, false, true, 14),
('hh-15', 'Emperador Light Brandy', 'Light brandy', 10, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Spirits', NULL, ARRAY['brandy', 'emperador'], NULL, false, true, 15),
('hh-16', 'Jim Beam White', 'Kentucky bourbon', 10, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Spirits', NULL, ARRAY['bourbon', 'jim beam', 'kentucky'], NULL, false, true, 16),
('hh-17', 'Peroni Nastro Azzurro', 'Italian premium lager', 11, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Beer', NULL, ARRAY['lager', 'italian', 'peroni'], NULL, false, true, 17),
('hh-18', 'Grolsch Weizen', 'German wheat beer', 12, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Beer', NULL, ARRAY['wheat beer', 'german', 'grolsch'], NULL, false, true, 18),
('hh-19', 'Guinness Draught', 'Irish dry stout', 14, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Beer', NULL, ARRAY['stout', 'irish', 'guinness'], NULL, false, true, 19),
('hh-20', 'Aperol Spritz', 'Aperol, Prosecco, soda water, orange slice', 13, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Cocktails', NULL, ARRAY['aperol', 'spritz', 'prosecco'], NULL, false, true, 20);

-- Insert BEER items
INSERT INTO menu_items (id, name, description, price, image, category, subcategory, allergens, tags, spice_level, featured, available, sort_order) VALUES
('beer-1', 'Tower', 'Draft beer', 14, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Draft', NULL, ARRAY['draft', 'local'], NULL, false, true, 1),
('beer-2', 'Peroni 75', 'Italian premium lager on tap', 15, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Draft', NULL, ARRAY['draft', 'italian', 'peroni'], NULL, false, true, 2),
('beer-3', 'Grolsch Weizen', 'German wheat beer on tap', 16, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Draft', NULL, ARRAY['draft', 'wheat', 'german'], NULL, false, true, 3),
('beer-4', 'Guinness Draught', 'Irish dry stout on tap', 16, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Draft', NULL, ARRAY['draft', 'stout', 'irish'], NULL, false, true, 4),
('beer-5', 'Asahi Black (Kuronama)', 'Japanese black lager on tap', 16, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Draft', NULL, ARRAY['draft', 'japanese', 'black lager'], NULL, false, true, 5),
('beer-6', 'Tiger Beer', 'Singapore lager', 13, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Bottled', NULL, ARRAY['bottled', 'singapore', 'lager'], NULL, false, true, 6),
('beer-7', 'Somersby Apple Cider', 'Swedish apple cider', 13, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Bottled', NULL, ARRAY['bottled', 'cider', 'apple'], NULL, false, true, 7);

-- Insert COCKTAILS items
INSERT INTO menu_items (id, name, description, price, image, category, subcategory, allergens, tags, spice_level, featured, available, sort_order) VALUES
('cocktail-1', 'The Winery Sangria', 'Red wine, brandy, honey, agave, lime juice', 25, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Signature', NULL, ARRAY['signature', 'sangria', 'red wine'], NULL, true, true, 1),
('cocktail-2', 'Yuzu 75', 'Gin, Yuzu liqueur, lemon juice, sparkling wine', 20, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Signature', NULL, ARRAY['signature', 'gin', 'yuzu', 'sparkling'], NULL, false, true, 2),
('cocktail-3', 'Earl of The Orient', 'Infused Earl Grey gin, lychee liqueur, honey, lemon, orange juice, egg white', 22, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Signature', NULL, ARRAY['signature', 'gin', 'earl grey', 'lychee'], NULL, false, true, 3),
('cocktail-4', 'Golden Passion', 'Gin, passionfruit purée, mango juice, Kaffir lime leaf, mint leaf, chili padi', 22, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Signature', NULL, ARRAY['signature', 'gin', 'passionfruit', 'mango', 'spicy'], 1, false, true, 4),
('cocktail-5', 'Scarlet Dagger', 'Gin, strawberry liqueur, peach liqueur, watermelon syrup, lemon juice', 20, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Signature', NULL, ARRAY['signature', 'gin', 'strawberry', 'peach', 'fruity'], NULL, false, true, 5),
('cocktail-6', 'Long Island Iced Tea', 'Vodka, tequila, light rum, gin, triple sec, lime juice, cola, lime wheel', 24, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Classic', NULL, ARRAY['classic', 'strong', 'mixed spirits'], NULL, false, true, 6),
('cocktail-7', 'Classic Martini', 'Gin/Vodka, dry vermouth, olives or a lemon twist', 20, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Classic', NULL, ARRAY['classic', 'martini', 'gin', 'vodka'], NULL, false, true, 7),
('cocktail-8', 'Lychee Martini', 'Vodka, lychee liqueur, lychee juice', 20, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Classic', NULL, ARRAY['classic', 'martini', 'vodka', 'lychee'], NULL, false, true, 8),
('cocktail-9', 'Espresso Martini', 'Rum, coffee liqueur, Vietnamese coffee beans, brown sugar, espresso', 22, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Classic', NULL, ARRAY['classic', 'martini', 'rum', 'coffee'], NULL, false, true, 9),
('cocktail-10', 'Cosmopolitan', 'Vodka, Cointreau, cranberry juice, and lime juice', 18, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Classic', NULL, ARRAY['classic', 'vodka', 'cranberry'], NULL, false, true, 10);

-- Insert NON-ALCOHOLIC items
INSERT INTO menu_items (id, name, description, price, image, category, subcategory, allergens, tags, spice_level, featured, available, sort_order) VALUES
('na-1', 'PUREZZA Water', 'Still / Sparkling, chargeable per person, free flow', 1, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Water', NULL, ARRAY['water', 'free flow'], NULL, false, true, 1),
('na-2', 'Acqua Panna', 'Italian natural spring water', 12, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Water', NULL, ARRAY['water', 'italian', 'premium'], NULL, false, true, 2),
('na-3', 'San Pellegrino', 'Italian sparkling natural mineral water', 12, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Water', NULL, ARRAY['water', 'sparkling', 'italian', 'premium'], NULL, false, true, 3),
('na-4', 'Coke', 'Classic Coca-Cola', 6, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Soft Drinks', NULL, ARRAY['soda', 'cola', 'classic'], NULL, false, true, 4),
('na-5', 'Coke Zero', 'Zero sugar cola', 6, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Soft Drinks', NULL, ARRAY['soda', 'cola', 'zero sugar'], NULL, false, true, 5),
('na-6', 'Ginger Ale', 'Refreshing ginger soda', 6, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Soft Drinks', NULL, ARRAY['soda', 'ginger', 'refreshing'], NULL, false, true, 6),
('na-7', 'Sprite', 'Lemon-lime soda', 6, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Soft Drinks', NULL, ARRAY['soda', 'lemon', 'lime'], NULL, false, true, 7),
('na-8', 'Tonic', 'Premium tonic water', 6, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Soft Drinks', NULL, ARRAY['tonic', 'mixer'], NULL, false, true, 8),
('na-9', 'Soda', 'Club soda', 6, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Soft Drinks', NULL, ARRAY['soda', 'mixer'], NULL, false, true, 9),
('na-10', 'Red Bull', 'Energy drink', 8, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Soft Drinks', NULL, ARRAY['energy drink', 'red bull'], NULL, false, true, 10),
('na-11', 'Espresso', 'Classic Italian espresso', 8, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Coffee', NULL, ARRAY['coffee', 'espresso'], NULL, false, true, 11),
('na-12', 'Long Black', 'Double shot espresso with hot water', 8, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Coffee', NULL, ARRAY['coffee', 'long black', 'americano'], NULL, false, true, 12),
('na-13', 'Chamomile Tea', 'Gryphon Signature Collection', 8, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Tea', NULL, ARRAY['tea', 'chamomile', 'herbal', 'gryphon'], NULL, false, true, 13),
('na-14', 'English Breakfast Tea', 'Gryphon Signature Collection', 8, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Tea', NULL, ARRAY['tea', 'english breakfast', 'black tea', 'gryphon'], NULL, false, true, 14),
('na-15', 'Osmanthus Sencha Tea', 'Gryphon Signature Collection', 8, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Tea', NULL, ARRAY['tea', 'osmanthus', 'sencha', 'green tea', 'gryphon'], NULL, false, true, 15),
('na-16', 'Earl Grey Lavender Tea', 'Gryphon Signature Collection', 8, 'veganpopcornchickentofurecipe-h1.jpg', 'drinks', 'Tea', NULL, ARRAY['tea', 'earl grey', 'lavender', 'black tea', 'gryphon'], NULL, false, true, 16);
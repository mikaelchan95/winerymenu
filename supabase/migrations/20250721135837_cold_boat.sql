/*
  # Create Menu Items Table

  1. New Tables
    - `menu_items`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `description` (text)
      - `price` (decimal, not null)
      - `image` (text)
      - `category` (text, not null)
      - `subcategory` (text)
      - `allergens` (text array)
      - `tags` (text array)
      - `spice_level` (integer)
      - `featured` (boolean)
      - `available` (boolean)
      - `sort_order` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `menu_items` table
    - Add policy for public read access (restaurant menu should be publicly viewable)
    - Add policy for authenticated staff to manage menu items

  3. Sample Data
    - Insert sample menu items for each category
*/

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  image text,
  category text NOT NULL,
  subcategory text,
  allergens text[],
  tags text[],
  spice_level integer DEFAULT 0,
  featured boolean DEFAULT false,
  available boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Policy for public read access (anyone can view the menu)
CREATE POLICY "Public can read menu items"
  ON menu_items
  FOR SELECT
  TO anon, authenticated
  USING (available = true);

-- Policy for authenticated staff to manage menu items
CREATE POLICY "Staff can manage menu items"
  ON menu_items
  FOR ALL
  TO authenticated
  USING (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON menu_items(available);
CREATE INDEX IF NOT EXISTS idx_menu_items_sort_order ON menu_items(sort_order);

-- Insert sample TAPAS items
INSERT INTO menu_items (name, description, price, image, category, tags, spice_level, allergens, sort_order) VALUES
('Padrón Peppers', 'Sea salt, togarashi', 15.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['vegetarian', 'spicy'], 1, NULL, 1),
('Forever Crispy Fries', 'Served with truffle mayo', 16.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['vegetarian', 'truffle'], 0, NULL, 2),
('Squid Ink Croquettes', 'Served with smoked chipotle mayo', 16.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['seafood', 'spanish'], 0, ARRAY['dairy', 'gluten', 'seafood'], 3),
('Porcini Mushroom Croquettes', 'Served with truffle mayo', 16.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['vegetarian', 'mushroom', 'truffle'], 0, ARRAY['dairy', 'gluten'], 4),
('Patatas Bravas', 'Crispy layered Agria potatoes, spicy bravas sauce, handmade mayo, togarashi', 16.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['vegetarian', 'spicy', 'spanish'], 2, ARRAY['dairy'], 5),
('Wagyu Beef Brioche Sliders (2 pcs)', 'Caramelized onion, Dijon mustard, cheddar', 22.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['wagyu', 'beef', 'premium'], 0, ARRAY['dairy', 'gluten'], 6),
('5J Jamón Bikini', 'Ibérico jamón, dashi béchamel, toasted sandwich', 16.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['jamon', 'spanish', 'premium'], 0, ARRAY['dairy', 'gluten'], 7),
('Crispy Baby Cuttlefish', 'Served with mayo, lemon wedge', 16.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['seafood', 'crispy'], 0, ARRAY['seafood'], 8),
('Mala Crispy Baby Cuttlefish', 'Served with smoked chipotle mayo', 16.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['seafood', 'spicy', 'mala'], 3, ARRAY['seafood'], 9),
('Roasted Cauliflower', 'Romesco sauce, basil pesto, pine nuts, piparras, Parmesan', 20.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'tapas', ARRAY['vegetarian', 'romesco', 'pesto'], 0, ARRAY['dairy', 'nuts'], 10);

-- Insert sample STARTERS items
INSERT INTO menu_items (name, description, price, image, category, tags, spice_level, allergens, sort_order) VALUES
('Gambas al Ajillo', 'Wild-caught tiger prawns, extra virgin olive oil, dry chili, crispy garlic, sourdough bread, white wine', 25.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'starters', ARRAY['prawns', 'garlic', 'spanish'], 1, ARRAY['seafood', 'gluten'], 1),
('5J Jamón de Bellota Ibérico (50g)', 'Jamón ibérico shoulder bellota, 60-month-aged gran reserva', 39.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'starters', ARRAY['jamon', 'premium', 'spanish', 'aged'], 0, NULL, 2),
('Marinated Italian Olives', 'Chef''s selection of olives', 8.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'starters', ARRAY['olives', 'italian', 'vegetarian'], 0, NULL, 3),
('Premium Nuts Medley', 'Roasted cashews, hazelnuts, macadamias, cumin & paprika', 9.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'starters', ARRAY['nuts', 'vegetarian', 'spiced'], 0, ARRAY['nuts'], 4),
('Artisan Cheese Platter', 'Chef''s selection of artisan cheeses', 24.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'starters', ARRAY['cheese', 'vegetarian', 'artisan'], 0, ARRAY['dairy'], 5),
('Baked Camembert Cheese', 'White wine, onion jam, green leafy salad, honey, sourdough bread', 22.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'starters', ARRAY['cheese', 'vegetarian', 'baked'], 0, ARRAY['dairy', 'gluten'], 6),
('Grilled Galician Octopus', 'Tender octopus with mojo verde sauce, aioli, cherry tomatoes, piquillo peppers, basil oil', 28.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'starters', ARRAY['octopus', 'seafood', 'galician'], 0, ARRAY['seafood'], 7);

-- Insert sample MAINS items
INSERT INTO menu_items (name, description, price, image, category, tags, spice_level, allergens, sort_order) VALUES
('Miso Baked Wild Black Cod', 'Miso and mirin-marinated black cod, white wine sauce, ikura, avruga caviar, basil oil', 32.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'mains', ARRAY['cod', 'miso', 'japanese', 'premium'], 0, ARRAY['seafood', 'soy'], 1),
('Ibérico Pork Ribs (4 pcs)', 'Guinness glaze, romesco sauce, almond flakes, red wine mustard sauce', 30.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'mains', ARRAY['pork', 'ribs', 'iberico', 'guinness'], 0, ARRAY['nuts'], 2),
('Australian Lamb Rack (3 pcs)', 'Grilled lamb rack with baby potatoes, sautéed spinach, Guinness sauce, piquillo pepper', 48.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'mains', ARRAY['lamb', 'australian', 'premium'], 0, NULL, 3),
('Slow-Cooked Australian Short Rib', 'Braised short rib served with mashed potatoes, caramelized onions, chives, red wine mustard sauce', 32.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'mains', ARRAY['beef', 'short rib', 'braised'], 0, ARRAY['dairy'], 4),
('Roasted Spanish Suckling Pig Leg', 'Crispy suckling pig leg served with blistered Padrón peppers', 98.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'mains', ARRAY['pork', 'suckling pig', 'spanish', 'premium'], 0, NULL, 5),
('Grilled Galician Grass-Fed MB4 Ribeye (200g)', 'Seared ribeye on a sizzling hot plate with red wine mustard sauce and garlic chips', 46.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'mains', ARRAY['beef', 'ribeye', 'galician', 'premium'], 0, NULL, 6);

-- Insert sample PAELLAS items
INSERT INTO menu_items (name, description, price, image, category, tags, spice_level, allergens, sort_order) VALUES
('Senyoret Paella', 'Seafood paella without shell served with truffle mayo, soffritto, and a hint of Sambuca Vaccari', 58.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'paellas', ARRAY['paella', 'seafood', 'spanish', 'truffle'], 0, ARRAY['seafood'], 1),
('Ibérico Pork Rib Paella', 'Brandy-infused rice with onion jam, crispy Ibérico pork ribs, and truffle mayo', 52.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'paellas', ARRAY['paella', 'pork', 'iberico', 'truffle'], 0, NULL, 2),
('Paella Valenciana (Vegetarian)', 'Vegetarian paella with cauliflower, carrots, shimeji mushrooms, Padrón peppers, and truffle mayo', 32.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'paellas', ARRAY['paella', 'vegetarian', 'valenciana', 'truffle'], 0, NULL, 3),
('Paella de Marisco (Seafood)', 'Seafood paella with Hokkaido scallops, mussels, tiger prawns, sea urchin, ikura, and truffle mayo', 68.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'paellas', ARRAY['paella', 'seafood', 'premium', 'scallops', 'uni'], 0, ARRAY['seafood'], 4);

-- Insert sample DESSERTS items
INSERT INTO menu_items (name, description, price, image, category, tags, spice_level, allergens, sort_order) VALUES
('Truffle Mille-Feuille', 'Layers of puff pastry with truffle cream, white chocolate, almond crumble, and stracciatella ice cream', 16.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'desserts', ARRAY['truffle', 'pastry', 'ice cream'], 0, ARRAY['dairy', 'gluten', 'nuts'], 1),
('Espresso Martini Tiramisu', 'Baileys and Kahlua-infused tiramisu with Vietnamese coffee', 15.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'desserts', ARRAY['tiramisu', 'coffee', 'alcohol'], 0, ARRAY['dairy', 'eggs'], 2),
('Burnt Basque Cheesecake', 'Creamy cheesecake with almond crumble and stracciatella ice cream', 15.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'desserts', ARRAY['cheesecake', 'basque', 'ice cream'], 0, ARRAY['dairy', 'eggs', 'nuts'], 3),
('Valrhona Dark Chocolate Heaven', 'Dark chocolate brownie with chocolate crumble, bread tuile, and chocolate ice cream', 15.00, '/assets/images/veganpopcornchickentofurecipe-h1.jpg', 'desserts', ARRAY['chocolate', 'brownie', 'valrhona', 'ice cream'], 0, ARRAY['dairy', 'gluten'], 4);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_menu_items_updated_at
    BEFORE UPDATE ON menu_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
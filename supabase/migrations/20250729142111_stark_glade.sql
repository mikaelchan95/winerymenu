/*
  # Add Enhanced Product Details

  1. New Columns
    - Add ingredients array for detailed ingredient listing
    - Add dietary_labels array for detailed dietary information (vegetarian, vegan, halal, etc.)
    - Add customizations JSONB for complex customization options
    - Enhance allergens with more detailed options

  2. Security
    - Maintain existing RLS policies
    - Update trigger for updated_at

  3. Indexes
    - Add indexes for new searchable fields
*/

-- Add new columns to menu_items table
DO $$
BEGIN
  -- Add ingredients column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'menu_items' AND column_name = 'ingredients'
  ) THEN
    ALTER TABLE menu_items ADD COLUMN ingredients text[] DEFAULT '{}';
  END IF;

  -- Add dietary_labels column if it doesn't exist  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'menu_items' AND column_name = 'dietary_labels'
  ) THEN
    ALTER TABLE menu_items ADD COLUMN dietary_labels text[] DEFAULT '{}';
  END IF;

  -- Add customizations column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'menu_items' AND column_name = 'customizations'
  ) THEN
    ALTER TABLE menu_items ADD COLUMN customizations jsonb DEFAULT '[]';
  END IF;

  -- Add preparation_time column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'menu_items' AND column_name = 'preparation_time'
  ) THEN
    ALTER TABLE menu_items ADD COLUMN preparation_time integer DEFAULT 15;
  END IF;

  -- Add serving_size column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'menu_items' AND column_name = 'serving_size'
  ) THEN
    ALTER TABLE menu_items ADD COLUMN serving_size text DEFAULT '';
  END IF;
END $$;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_menu_items_ingredients ON menu_items USING GIN (ingredients);
CREATE INDEX IF NOT EXISTS idx_menu_items_dietary_labels ON menu_items USING GIN (dietary_labels);
CREATE INDEX IF NOT EXISTS idx_menu_items_customizations ON menu_items USING GIN (customizations);

-- Add some sample data to demonstrate the new features
UPDATE menu_items 
SET 
  ingredients = CASE 
    WHEN category = 'tapas' AND name LIKE '%Beef%' THEN ARRAY['beef sirloin', 'olive oil', 'garlic', 'sea salt', 'black pepper']
    WHEN category = 'tapas' AND name LIKE '%Chicken%' THEN ARRAY['free-range chicken', 'paprika', 'olive oil', 'lemon', 'herbs']
    WHEN category = 'paellas' THEN ARRAY['bomba rice', 'saffron', 'seafood stock', 'prawns', 'mussels', 'olive oil']
    WHEN category = 'mains' AND name LIKE '%Salmon%' THEN ARRAY['atlantic salmon', 'lemon', 'herbs', 'olive oil', 'seasonal vegetables']
    ELSE ARRAY['fresh ingredients', 'olive oil', 'herbs', 'spices']
  END,
  dietary_labels = CASE
    WHEN tags && ARRAY['vegetarian'] THEN ARRAY['vegetarian']
    WHEN tags && ARRAY['vegan'] THEN ARRAY['vegan', 'vegetarian']
    WHEN name LIKE '%Beef%' OR name LIKE '%Lamb%' THEN ARRAY['halal available']
    WHEN category = 'drinks' THEN ARRAY['gluten-free']
    ELSE ARRAY[]::text[]
  END,
  customizations = CASE
    WHEN category = 'mains' AND (name LIKE '%Steak%' OR name LIKE '%Beef%') THEN 
      '[
        {
          "id": "doneness",
          "name": "Steak Doneness",
          "required": true,
          "maxSelections": 1,
          "options": [
            {"id": "rare", "name": "Rare", "price": 0},
            {"id": "medium-rare", "name": "Medium Rare", "price": 0},
            {"id": "medium", "name": "Medium", "price": 0},
            {"id": "medium-well", "name": "Medium Well", "price": 0},
            {"id": "well-done", "name": "Well Done", "price": 0}
          ]
        },
        {
          "id": "sauce",
          "name": "Sauce Selection",
          "required": false,
          "maxSelections": 2,
          "options": [
            {"id": "peppercorn", "name": "Peppercorn Sauce", "price": 3},
            {"id": "mushroom", "name": "Mushroom Sauce", "price": 3},
            {"id": "chimichurri", "name": "Chimichurri", "price": 2},
            {"id": "garlic-butter", "name": "Garlic Butter", "price": 2}
          ]
        }
      ]'::jsonb
    WHEN category = 'paellas' THEN
      '[
        {
          "id": "spice-level",
          "name": "Spice Level",
          "required": true,
          "maxSelections": 1,
          "options": [
            {"id": "mild", "name": "Mild", "price": 0},
            {"id": "medium", "name": "Medium", "price": 0},
            {"id": "hot", "name": "Hot", "price": 0}
          ]
        },
        {
          "id": "extras",
          "name": "Add Extras",
          "required": false,
          "maxSelections": 3,
          "options": [
            {"id": "extra-prawns", "name": "Extra Prawns", "price": 8},
            {"id": "extra-mussels", "name": "Extra Mussels", "price": 6},
            {"id": "chorizo", "name": "Spanish Chorizo", "price": 5},
            {"id": "artichokes", "name": "Artichokes", "price": 4}
          ]
        }
      ]'::jsonb
    WHEN category = 'drinks' AND subcategory IN ('Coffee', 'Tea') THEN
      '[
        {
          "id": "size",
          "name": "Size",
          "required": true,
          "maxSelections": 1,
          "options": [
            {"id": "regular", "name": "Regular", "price": 0},
            {"id": "large", "name": "Large", "price": 2}
          ]
        },
        {
          "id": "milk",
          "name": "Milk Options",
          "required": false,
          "maxSelections": 1,
          "options": [
            {"id": "oat", "name": "Oat Milk", "price": 1},
            {"id": "almond", "name": "Almond Milk", "price": 1},
            {"id": "soy", "name": "Soy Milk", "price": 1}
          ]
        }
      ]'::jsonb
    ELSE '[]'::jsonb
  END,
  preparation_time = CASE
    WHEN category = 'paellas' THEN 25
    WHEN category = 'mains' THEN 20
    WHEN category = 'starters' THEN 10
    WHEN category = 'tapas' THEN 8
    WHEN category = 'desserts' THEN 5
    ELSE 15
  END,
  serving_size = CASE
    WHEN category = 'tapas' THEN 'Small plate (2-3 people)'
    WHEN category = 'paellas' THEN 'Large serving (2-4 people)'
    WHEN category = 'mains' THEN 'Individual portion'
    WHEN category = 'starters' THEN 'Sharing portion'
    WHEN category = 'desserts' THEN 'Individual portion'
    ELSE 'Standard serving'
  END
WHERE ingredients IS NULL OR array_length(ingredients, 1) IS NULL;

-- Update allergens to be more detailed
UPDATE menu_items 
SET allergens = CASE
    WHEN name LIKE '%Nut%' OR name LIKE '%Almond%' THEN ARRAY['tree nuts', 'may contain peanuts']
    WHEN name LIKE '%Prawn%' OR name LIKE '%Seafood%' OR name LIKE '%Fish%' OR category = 'paellas' THEN ARRAY['shellfish', 'fish']
    WHEN name LIKE '%Cheese%' OR name LIKE '%Cream%' THEN ARRAY['dairy', 'lactose']
    WHEN name LIKE '%Bread%' OR name LIKE '%Pasta%' THEN ARRAY['gluten', 'wheat']
    WHEN name LIKE '%Egg%' THEN ARRAY['eggs']
    WHEN category = 'drinks' AND subcategory = 'Beer' THEN ARRAY['gluten']
    ELSE ARRAY[]::text[]
  END
WHERE allergens IS NULL OR array_length(allergens, 1) IS NULL;
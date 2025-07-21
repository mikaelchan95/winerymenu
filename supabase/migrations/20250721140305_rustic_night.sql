/*
  # Update Menu Image Paths for Manual Upload

  This migration prepares the database for manually uploaded images
  and provides examples of proper path formats.
*/

-- Update existing menu items to have proper image path format
-- You can update these paths after uploading images to Supabase Storage

-- Example path formats for your reference:
-- For a file uploaded as "paella-valenciana.jpg" in the menu-images bucket:
-- The image path should be: "paella-valenciana.jpg"

-- Update some example items (you can modify these after uploading real images)
UPDATE menu_items 
SET image = CASE
  WHEN name LIKE '%Paella%' THEN 'paella-' || LOWER(REPLACE(REPLACE(name, 'Paella ', ''), ' ', '-')) || '.jpg'
  WHEN category = 'tapas' THEN 'tapas-' || LOWER(REPLACE(name, ' ', '-')) || '.jpg'
  WHEN category = 'starters' THEN 'starter-' || LOWER(REPLACE(name, ' ', '-')) || '.jpg'
  WHEN category = 'mains' THEN 'main-' || LOWER(REPLACE(name, ' ', '-')) || '.jpg'
  WHEN category = 'desserts' THEN 'dessert-' || LOWER(REPLACE(name, ' ', '-')) || '.jpg'
  ELSE LOWER(REPLACE(name, ' ', '-')) || '.jpg'
END
WHERE image IS NOT NULL OR image != '';

-- Add a comment to help with manual image management
COMMENT ON COLUMN menu_items.image IS 'Store just the filename (e.g., "paella-seafood.jpg") - the bucket path will be handled automatically';
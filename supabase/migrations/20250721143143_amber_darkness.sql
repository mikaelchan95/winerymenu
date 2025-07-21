/*
# Debug and Fix 5J Jamón Image Issue

This migration will:
1. Check the current image value for the 5J Jamón item
2. Ensure it's set to the correct filename
3. Verify the image field is properly updated

The correct filename should be: 5J Jamon de Bellota Iberico (50 g).jpg
*/

-- First, let's see what's currently stored
DO $$
BEGIN
  RAISE NOTICE 'Current image value for 5J Jamon: %', 
    (SELECT image FROM menu_items WHERE name LIKE '5J Jam%n de Bellota%');
END $$;

-- Update with the exact filename that exists in storage
UPDATE menu_items 
SET 
  image = '5J Jamon de Bellota Iberico (50 g).jpg',
  updated_at = now()
WHERE name = '5J Jamón de Bellota Ibérico (50 g)';

-- Verify the update
DO $$
BEGIN
  RAISE NOTICE 'Updated image value for 5J Jamon: %', 
    (SELECT image FROM menu_items WHERE name LIKE '5J Jam%n de Bellota%');
END $$;

-- Also let's make sure we're targeting the right item name
SELECT id, name, image, updated_at 
FROM menu_items 
WHERE name LIKE '%5J%' OR name LIKE '%Jam%n%';
/*
  # Fix 5J Jamón de Bellota Image with Exact Filename
  
  1. Updates
    - Set the exact image filename for 5J Jamón de Bellota Ibérico
  
  2. Notes
    - Using the exact filename from the Supabase storage URL
    - This should resolve the fallback image issue
*/

UPDATE menu_items 
SET image = '5J Jamon de Bellota Iberico (50 g).jpg'
WHERE name = '5J Jamón de Bellota Ibérico (50 g)';

-- Verify the update
SELECT id, name, image 
FROM menu_items 
WHERE name = '5J Jamón de Bellota Ibérico (50 g)';
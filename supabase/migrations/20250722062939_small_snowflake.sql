/*
  # Update 5J Jamón Image Filename

  Updates the image filename for the 5J Jamón de Bellota Ibérico item to match the actual file in Supabase storage.
  
  1. Changes
     - Sets image field to correct filename without accents: "5J Jamon de Bellota Iberico (50 g).jpg"
     - Matches the actual file stored in Supabase storage
     
  2. Notes
     - The getMenuImageUrl function will construct the full URL from this filename
     - This fixes the accent mismatch between menu name and image filename
*/

-- Update the 5J Jamón image filename to match the actual file in storage
UPDATE menu_items 
SET image = '5J Jamon de Bellota Iberico (50 g).jpg'
WHERE name = '5J Jamón de Bellota Ibérico (50 g)';

-- Verify the update
SELECT id, name, image 
FROM menu_items 
WHERE name = '5J Jamón de Bellota Ibérico (50 g)';
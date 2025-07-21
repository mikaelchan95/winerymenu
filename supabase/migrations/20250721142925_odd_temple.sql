/*
  # Fix 5J Jamón de Bellota Ibérico Image Mapping

  1. Updates
    - Update `5J Jamón de Bellota Ibérico (50 g)` to use correct image filename
    
  2. Security
    - No security changes needed
*/

-- Update the 5J Jamón de Bellota Ibérico item with correct image
UPDATE menu_items 
SET image = '5J Jamon de Bellota Iberico (50 g).jpg'
WHERE name = '5J Jamón de Bellota Ibérico (50 g)';
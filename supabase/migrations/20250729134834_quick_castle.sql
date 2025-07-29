/*
  # Fix 5J Jamón Image URL

  Update the 5J Jamón de Bellota Ibérico item to use the correct image filename.
  This searches for any variation of the item name and updates the image field.
*/

-- Update 5J Jamón item with correct image filename
UPDATE menu_items 
SET image = '5J Jamon de Bellota Iberico (50 g).jpg'
WHERE name ILIKE '%5J%' 
   OR name ILIKE '%jamon%bellota%' 
   OR name ILIKE '%jamón%bellota%';

-- Also check for variations in naming
UPDATE menu_items 
SET image = '5J Jamon de Bellota Iberico (50 g).jpg'
WHERE name ILIKE '%bellota%iberico%' 
   OR name ILIKE '%bellota%ibérico%';
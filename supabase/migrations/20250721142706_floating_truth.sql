/*
  # Add Missing Image Mappings
  
  Updates menu items that have accented characters in their names to map to
  the corresponding non-accented image filenames that actually exist in storage.
  
  1. Maps accented menu item names to actual image filenames
  2. Handles case differences (pcs vs Pcs)
  3. Updates items that were previously set to NULL
*/

-- Update items with accented characters to match actual image filenames
UPDATE menu_items SET image = 'Padron Peppers.jpg' 
WHERE name = 'Padrón Peppers';

UPDATE menu_items SET image = '5J Jamon Bikini.jpg' 
WHERE name = '5J Jamón Bikini';

UPDATE menu_items SET image = 'Iberico Pork Ribs (4 Pcs).jpg' 
WHERE name = 'Ibérico Pork Ribs (4 pcs)';

UPDATE menu_items SET image = 'Iberico Pork Rib Paella.jpg' 
WHERE name = 'Ibérico Pork Rib Paella';

UPDATE menu_items SET image = '5J Jamon de Bellota Iberico (50 g).jpg' 
WHERE name = '5J Jamón de Bellota Ibérico (50 g)';
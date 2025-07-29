/*
  # Fix Grilled Galician Ribeye Image Filename

  Updates the Grilled Galician Grass-Fed MB4 Ribeye item to use the correct image filename.
*/

UPDATE menu_items 
SET image = 'Grilled Galician Grass-Fed MB4 Ribeye (200 g).jpg'
WHERE name ILIKE '%ribeye%' 
   OR name ILIKE '%galician%' 
   OR name ILIKE '%grass-fed%'
   OR name ILIKE '%mb4%';
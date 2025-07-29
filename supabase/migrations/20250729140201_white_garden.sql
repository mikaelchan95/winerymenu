/*
  # Update Patatas Bravas Image

  1. Changes
    - Update the image for Patatas Bravas item to use "Patatas Bravas.jpg"
    - Only updates the specific menu item with the correct image filename
*/

UPDATE menu_items 
SET image = 'Patatas Bravas.jpg'
WHERE name = 'Patatas Bravas';
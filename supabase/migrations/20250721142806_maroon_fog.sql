/*
  # Fix Mala Crispy Baby Cuttlefish Image Mapping

  1. Changes
    - Update "Mala Crispy Baby Cuttlefish" to use its specific image file
    - Map to actual filename "Mala Crispy Baby Cuttlefish.jpg"
*/

UPDATE menu_items 
SET image = 'Mala Crispy Baby Cuttlefish.jpg'
WHERE name = 'Mala Crispy Baby Cuttlefish';
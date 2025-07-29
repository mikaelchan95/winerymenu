/*
  # Fix Gambas al Ajillo Image URL

  Updates the Gambas al Ajillo menu item to use the correct Supabase Storage image URL.
*/

UPDATE menu_items 
SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/Gambas%20al%20Ajillo.jpg'
WHERE name = 'Gambas al Ajillo';
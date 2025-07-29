/*
  # Fix 5J Jamón de Bellota Ibérico Image URL

  Updates the 5J Jamón de Bellota Ibérico item with the correct Supabase storage image URL.
*/

UPDATE menu_items 
SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/5J%20Jamon%20de%20Bellota%20Iberico%20(50%20g).jpg'
WHERE name = '5J Jamón de Bellota Ibérico' 
AND category = 'tapas';
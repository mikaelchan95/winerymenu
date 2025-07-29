/*
  # Fix 5J Jamón de Bellota Ibérico Image Reference

  Updates the 5J Jamón de Bellota Ibérico item to use the correct image filename
  that exists in the Supabase storage bucket.
*/

UPDATE menu_items 
SET image = '5J Jamon de Bellota Iberico (50 g).jpg'
WHERE name = '5J Jamón de Bellota Ibérico';
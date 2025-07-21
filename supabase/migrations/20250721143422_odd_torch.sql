/*
  # Fix 5J Jamón Image Filename - Accent Character Issue

  The menu item name has accented characters (ó) but the image filename uses regular characters (o).
  This migration fixes the image field to match the actual filename in storage.

  1. Changes
     - Update image field from automatic name matching to exact filename
     - Filename: `5J Jamon de Bellota Iberico (50 g).jpg` (no accents)
     - Menu name: `5J Jamón de Bellota Ibérico (50 g)` (with accents) - stays same
*/

UPDATE menu_items 
SET image = '5J Jamon de Bellota Iberico (50 g).jpg'
WHERE name = '5J Jamón de Bellota Ibérico (50 g)';

-- Verify the update
SELECT name, image FROM menu_items WHERE name LIKE '%5J Jam%';
/*
  # Update Menu Items with Full Image URLs
  
  This migration updates all menu items to store complete image URLs instead of just filenames.
  This provides better control and consistency for image management.
  
  1. Updates all existing items with full Supabase Storage URLs
  2. Sets proper image URLs for items that were using filenames
  3. Ensures consistency across all menu items
*/

-- Update food items with full image URLs
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/paella-seafood.jpg' WHERE name = 'Paella de Mariscos';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/paella-mixta.jpg' WHERE name = 'Paella Mixta';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/paella-vegetariana.jpg' WHERE name = 'Paella Vegetariana';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/paella-negra.jpg' WHERE name = 'Paella Negra';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/chorizo-al-vino.jpg' WHERE name = 'Chorizo al Vino';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/gambas-al-ajillo.jpg' WHERE name = 'Gambas al Ajillo';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/patatas-bravas.jpg' WHERE name = 'Patatas Bravas';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/tortilla-espanola.jpg' WHERE name = 'Tortilla Española';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/croquetas-jamon.jpg' WHERE name = 'Croquetas de Jamón';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/pulpo-gallega.jpg' WHERE name = 'Pulpo a la Gallega';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/5J%20Jamon%20de%20Bellota%20Iberico%20(50%20g).jpg' WHERE name = '5J Jamón de Bellota Ibérico';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/manchego-cheese.jpg' WHERE name = 'Manchego Cheese Selection';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/pan-tomato.jpg' WHERE name = 'Pan con Tomate';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/aceitunas-marinadas.jpg' WHERE name = 'Aceitunas Marinadas';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/ensalada-mixta.jpg' WHERE name = 'Ensalada Mixta';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/gazpacho.jpg' WHERE name = 'Gazpacho Andaluz';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/salmon-plancha.jpg' WHERE name = 'Salmón a la Plancha';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/dorada-sal.jpg' WHERE name = 'Dorada a la Sal';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/cordero-asado.jpg' WHERE name = 'Cordero Asado';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/pollo-al-ajillo.jpg' WHERE name = 'Pollo al Ajillo';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/crema-catalana.jpg' WHERE name = 'Crema Catalana';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/flan-casero.jpg' WHERE name = 'Flan Casero';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/churros-chocolate.jpg' WHERE name = 'Churros con Chocolate';
UPDATE menu_items SET image = 'https://kmvcqtuwyfxoayvzcunt.supabase.co/storage/v1/object/public/food-images/tarta-santiago.jpg' WHERE name = 'Tarta de Santiago';

-- Update drink items with placeholder images (you can replace these with actual drink images)
UPDATE menu_items SET image = 'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=800' WHERE category = 'drinks' AND subcategory = 'Beer';
UPDATE menu_items SET image = 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=800' WHERE category = 'drinks' AND subcategory = 'Cocktails';
UPDATE menu_items SET image = 'https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=800' WHERE category = 'drinks' AND subcategory = 'Wine';
UPDATE menu_items SET image = 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800' WHERE category = 'drinks' AND subcategory = 'Spirits';
UPDATE menu_items SET image = 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=800' WHERE category = 'drinks' AND subcategory = 'Non-Alcoholic';

-- Set default image for any items without images
UPDATE menu_items 
SET image = '/assets/images/veganpopcornchickentofurecipe-h1.jpg' 
WHERE image IS NULL OR image = '';
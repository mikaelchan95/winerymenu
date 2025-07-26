/*
  # Create Storage Bucket for Menu Items

  1. New Storage Bucket
    - `menu-images` bucket for storing food photos
    - Public access for reading images
    - Authenticated access for uploading/managing

  2. Storage Policies
    - Public read access for all menu images
    - Authenticated users can upload images
    - RLS policies for secure access

  3. Helper Functions
    - Utility functions for image management
*/

-- Create the storage bucket for menu images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('menu-images', 'menu-images', true);

-- Allow public access to view images
CREATE POLICY "Public can view menu images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'menu-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated can upload menu images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'menu-images');

-- Allow authenticated users to update images
CREATE POLICY "Authenticated can update menu images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'menu-images');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated can delete menu images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'menu-images');

-- Update menu_items table to use storage paths instead of URLs
UPDATE menu_items 
SET image = 'menu-images/' || LOWER(REPLACE(name, ' ', '-')) || '.jpg'
WHERE image IS NOT NULL;</parameter>
</invoke>
<invoke name="str_replace_editor">
<parameter name="command">str_replace</parameter>
<parameter name="path">src/services/supabase.ts</parameter>
<parameter name="old_str">import { createClient } from '@supabase/supabase-js';
import { MenuItem } from '../types';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);</parameter>
<parameter name="new_str">import { createClient } from '@supabase/supabase-js';
import { MenuItem } from '../types';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Storage helper functions for menu images
 */
export const MENU_IMAGES_BUCKET = 'menu-images';

/**
 * Get public URL for a menu image
 */
export const getMenuImageUrl = (imagePath: string): string => {
  if (!imagePath) {
    return '/assets/images/veganpopcornchickentofurecipe-h1.jpg'; // Fallback image
  }

  // If it's already a full URL, return as is
  if (imagePath.startsWith('http') || imagePath.startsWith('/assets')) {
    return imagePath;
  }

  // Get public URL from Supabase Storage
  const { data } = supabase.storage
    .from(MENU_IMAGES_BUCKET)
    .getPublicUrl(imagePath);

  return data?.publicUrl || '/assets/images/veganpopcornchickentofurecipe-h1.jpg';
};

/**
 * Upload a menu image to storage
 */
export const uploadMenuImage = async (
  file: File, 
  fileName: string
): Promise<{ path: string; url: string } | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const filePath = `${fileName}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(MENU_IMAGES_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true // Allow overwriting existing files
      });

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    return {
      path: data.path,
      url: getMenuImageUrl(data.path)
    };
  } catch (error) {
    console.error('Error in uploadMenuImage:', error);
    return null;
  }
};

/**
 * Delete a menu image from storage
 */
export const deleteMenuImage = async (imagePath: string): Promise<boolean> => {
  try {
    const { error } = await supabase.storage
      .from(MENU_IMAGES_BUCKET)
      .remove([imagePath]);

    if (error) {
      console.error('Error deleting image:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteMenuImage:', error);
    return false;
  }
};</parameter>
<parameter name="path">src/services/supabase.ts</parameter>
<parameter name="command">str_replace</parameter>
</invoke>
<invoke name="str_replace_editor">
<parameter name="command">str_replace</parameter>
<parameter name="path">src/services/supabase.ts</parameter>
<parameter name="old_str">/**
 * Transform database menu item to application menu item
 */
const transformMenuItem = (dbItem: DatabaseMenuItem): MenuItem => ({
  id: dbItem.id,
  name: dbItem.name,
  description: dbItem.description || '',
  price: dbItem.price,
  image: dbItem.image || '/assets/images/veganpopcornchickentofurecipe-h1.jpg',
  category: dbItem.category,
  subcategory: dbItem.subcategory || undefined,
  allergens: dbItem.allergens || undefined,
  tags: dbItem.tags || undefined,
  spiceLevel: dbItem.spice_level || undefined,
  featured: dbItem.featured || false,
});</parameter>
<parameter name="new_str">/**
 * Transform database menu item to application menu item
 */
const transformMenuItem = (dbItem: DatabaseMenuItem): MenuItem => ({
  id: dbItem.id,
  name: dbItem.name,
  description: dbItem.description || '',
  price: dbItem.price,
  image: getMenuImageUrl(dbItem.image || ''),
  category: dbItem.category,
  subcategory: dbItem.subcategory || undefined,
  allergens: dbItem.allergens || undefined,
  tags: dbItem.tags || undefined,
  spiceLevel: dbItem.spice_level || undefined,
  featured: dbItem.featured || false,
});</parameter>
<parameter name="path">src/services/supabase.ts</parameter>
<parameter name="command">str_replace</parameter>
</invoke>
<invoke name="str_replace_editor">
<parameter name="command">create</parameter>
<parameter name="path">src/components/ImageUpload.tsx</parameter>
<parameter name="file_text">import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Check, AlertCircle } from 'lucide-react';
import { uploadMenuImage } from '../services/supabase';

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string, imagePath: string) => void;
  currentImage?: string;
  itemName: string;
}

/**
 * Image upload component for menu items
 * Allows staff to upload food photos directly to Supabase Storage
 */
export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUploaded,
  currentImage,
  itemName
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setUploadError('File size must be less than 5MB');
      return;
    }

    uploadImage(file);
  };

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    setUploadError(null);

    try {
      const fileName = itemName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const result = await uploadMenuImage(file, fileName);

      if (result) {
        onImageUploaded(result.url, result.path);
      } else {
        setUploadError('Failed to upload image. Please try again.');
      }
    } catch (error) {
      setUploadError('An error occurred while uploading. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Current Image Preview */}
      {currentImage && (
        <div className="relative">
          <img
            src={currentImage}
            alt="Current menu item"
            className="w-full h-48 object-cover rounded-xl border border-gray-200"
          />
          <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1">
            <Check size={12} />
            <span>Current Image</span>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-150 cursor-pointer
          ${dragActive 
            ? 'border-black bg-gray-50' 
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
          ${isUploading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onClick={triggerFileInput}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isUploading}
        />

        <div className="space-y-4">
          {isUploading ? (
            <>
              <div className="w-12 h-12 border-2 border-gray-400 border-t-black rounded-full animate-spin mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Uploading Image...</h3>
                <p className="text-gray-500 text-sm">Please wait while we upload your photo</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto">
                {dragActive ? (
                  <Upload size={24} className="text-black" />
                ) : (
                  <ImageIcon size={24} className="text-gray-400" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {dragActive ? 'Drop image here' : 'Upload Food Photo'}
                </h3>
                <p className="text-gray-500 text-sm">
                  Drag & drop an image or click to select • Max 5MB • JPG, PNG supported
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 rounded-xl border border-red-200">
          <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
          <span className="text-sm text-red-700">{uploadError}</span>
          <button
            onClick={() => setUploadError(null)}
            className="ml-auto text-red-400 hover:text-red-600"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Upload Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-medium text-blue-900 mb-2">Photo Guidelines</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Use high-quality, well-lit photos</li>
          <li>• Focus on the food item clearly</li>
          <li>• Avoid cluttered backgrounds</li>
          <li>• Square or landscape orientation works best</li>
        </ul>
      </div>
    </div>
  );
};
</parameter>
</invoke>
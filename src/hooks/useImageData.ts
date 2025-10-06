import { useState, useEffect } from 'react';
import { ImageData, PageImages } from '../types/imageData';
import { storageManager } from '../utils/storageManager';

// Custom hook for dynamic image loading
export const useImageData = () => {
  const [images, setImages] = useState<PageImages>({} as PageImages);
  const [loading, setLoading] = useState(true);

  const loadImages = () => {
    setLoading(true);
    storageManager.initializeStorage();
    const allImages = storageManager.getAllImages();
    setImages(allImages);
    setLoading(false);
  };

  useEffect(() => {
    loadImages();
    
    // Listen for storage changes (when admin updates images)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'portfolio_images_data') {
        loadImages();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event listener for same-tab updates
    const handleImageUpdate = () => {
      loadImages();
    };
    
    window.addEventListener('imageDataUpdated', handleImageUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('imageDataUpdated', handleImageUpdate);
    };
  }, []);

  // Function to trigger image reload
  const refreshImages = () => {
    loadImages();
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('imageDataUpdated'));
  };

  return {
    images,
    loading,
    refreshImages
  };
};

// Hook for getting images by page section
export const usePageImages = (page: keyof PageImages, category?: string): ImageData[] => {
  const { images } = useImageData();
  
  if (page === 'portfolio' && category) {
    return images.portfolio?.[category as keyof typeof images.portfolio] || [];
  }
  
  return (images[page] as ImageData[])?.filter(img => img.isActive) || [];
};

// Hook for getting hero images specifically
export const useHeroImages = () => {
  return usePageImages('hero');
};

// Hook for getting portfolio images by category
export const usePortfolioImages = (category: 'fashion' | 'beauty' | 'commercial') => {
  return usePageImages('portfolio', category);
};

// Hook for getting UGC images
export const useUGCImages = () => {
  return usePageImages('ugc');
};

// Hook for getting About images
export const useAboutImages = () => {
  return usePageImages('about');
};

// Hook for getting Contact images
export const useContactImages = () => {
  return usePageImages('contact');
};
import { PageImages, ImageData, defaultImageData } from '../types/imageData';

// Utility function to detect media type from file extension or MIME type
export const detectMediaType = (file: File): 'image' | 'video' | 'audio' | 'document' | 'other' => {
  const mimeType = file.type;
  const fileName = file.name.toLowerCase();
  
  if (mimeType.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|svg|ico|bmp)$/.test(fileName)) {
    return 'image';
  }
  if (mimeType.startsWith('video/') || /\.(mp4|avi|mov|wmv|flv|webm|mkv)$/.test(fileName)) {
    return 'video';
  }
  if (mimeType.startsWith('audio/') || /\.(mp3|wav|ogg|aac|flac)$/.test(fileName)) {
    return 'audio';
  }
  if (mimeType.includes('pdf') || mimeType.includes('document') || mimeType.includes('text') || 
      /\.(pdf|doc|docx|txt|rtf|odt)$/.test(fileName)) {
    return 'document';
  }
  return 'other';
};

// File-based storage utility for image management
class FileStorageManager {
  private storageKey = 'portfolio_images_data';
  
  // Initialize with default data if no data exists
  initializeStorage(): void {
    const existingData = this.getAllImages();
    if (!existingData || Object.keys(existingData).length === 0) {
      this.saveAllImages(defaultImageData);
    }
  }

  // Get all images from localStorage (simulating file storage)
  getAllImages(): PageImages {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : defaultImageData;
    } catch (error) {
      console.error('Error reading image data:', error);
      return defaultImageData;
    }
  }

  // Save all images to localStorage (simulating file storage)
  saveAllImages(data: PageImages): boolean {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving image data:', error);
      return false;
    }
  }

  // Get images for a specific page section
  getImagesByPage(page: keyof PageImages): ImageData[] | { fashion: ImageData[], beauty: ImageData[], commercial: ImageData[] } {
    const allData = this.getAllImages();
    return allData[page] || [];
  }

  // Add new image to a page section
  addImage(page: keyof PageImages, imageData: Omit<ImageData, 'id' | 'uploadedAt'>): boolean {
    try {
      const allData = this.getAllImages();
      const newImage: ImageData = {
        ...imageData,
        id: `${page}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        uploadedAt: new Date().toISOString()
      };

      if (page === 'portfolio') {
        // Handle portfolio subcategories
        const category = imageData.category?.toLowerCase() as 'fashion' | 'beauty' | 'commercial';
        if (category && allData.portfolio[category]) {
          allData.portfolio[category].push(newImage);
        }
      } else {
        // Handle other pages
        (allData[page] as ImageData[]).push(newImage);
      }

      return this.saveAllImages(allData);
    } catch (error) {
      console.error('Error adding image:', error);
      return false;
    }
  }

  // Update existing image
  updateImage(page: keyof PageImages, imageId: string, updates: Partial<ImageData>): boolean {
    try {
      const allData = this.getAllImages();
      
      if (page === 'portfolio') {
        // Handle portfolio subcategories
        for (const category of ['fashion', 'beauty', 'commercial'] as const) {
          const images = allData.portfolio[category];
          const imageIndex = images.findIndex(img => img.id === imageId);
          if (imageIndex !== -1) {
            allData.portfolio[category][imageIndex] = {
              ...images[imageIndex],
              ...updates
            };
            return this.saveAllImages(allData);
          }
        }
      } else {
        // Handle other pages
        const images = allData[page] as ImageData[];
        const imageIndex = images.findIndex(img => img.id === imageId);
        if (imageIndex !== -1) {
          images[imageIndex] = {
            ...images[imageIndex],
            ...updates
          };
          return this.saveAllImages(allData);
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error updating image:', error);
      return false;
    }
  }

  // Delete image
  deleteImage(page: keyof PageImages, imageId: string): boolean {
    try {
      const allData = this.getAllImages();
      
      if (page === 'portfolio') {
        // Handle portfolio subcategories
        for (const category of ['fashion', 'beauty', 'commercial'] as const) {
          const images = allData.portfolio[category];
          const imageIndex = images.findIndex(img => img.id === imageId);
          if (imageIndex !== -1) {
            allData.portfolio[category].splice(imageIndex, 1);
            return this.saveAllImages(allData);
          }
        }
      } else {
        // Handle other pages
        const images = allData[page] as ImageData[];
        const imageIndex = images.findIndex(img => img.id === imageId);
        if (imageIndex !== -1) {
          images.splice(imageIndex, 1);
          return this.saveAllImages(allData);
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  }

  // Reorder images
  reorderImages(page: keyof PageImages, category: string | null, imageIds: string[]): boolean {
    try {
      const allData = this.getAllImages();
      
      if (page === 'portfolio' && category) {
        const portfolioCategory = category as 'fashion' | 'beauty' | 'commercial';
        const images = allData.portfolio[portfolioCategory];
        const reorderedImages = imageIds.map((id, index) => {
          const image = images.find(img => img.id === id);
          return image ? { ...image, order: index + 1 } : null;
        }).filter(Boolean) as ImageData[];
        
        allData.portfolio[portfolioCategory] = reorderedImages;
      } else {
        const images = allData[page] as ImageData[];
        const reorderedImages = imageIds.map((id, index) => {
          const image = images.find(img => img.id === id);
          return image ? { ...image, order: index + 1 } : null;
        }).filter(Boolean) as ImageData[];
        
        (allData[page] as ImageData[]) = reorderedImages;
      }
      
      return this.saveAllImages(allData);
    } catch (error) {
      console.error('Error reordering images:', error);
      return false;
    }
  }

  // Export data for backup
  exportData(): string {
    return JSON.stringify(this.getAllImages(), null, 2);
  }

  // Import data from backup
  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      return this.saveAllImages(data);
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
}

// Create singleton instance
export const storageManager = new FileStorageManager();
// File upload utility for handling file uploads and path generation
export class FileUploadManager {
  private baseUploadPath = '/web1/public/images/';
  private publicPath = '/web1/images/';

  // Generate unique filename with timestamp and random string
  generateFileName(originalFile: File): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = originalFile.name.split('.').pop() || 'jpg';
    const baseName = originalFile.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, '_');
    
    return `${baseName}_${timestamp}_${randomString}.${extension}`;
  }

  // Convert file to base64 for storage (alternative approach)
  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Generate proper public path for the uploaded file
  generatePublicPath(fileName: string): string {
    return `${this.publicPath}${fileName}`;
  }

  // Save file to localStorage with base64 encoding (for demo without backend)
  async saveFileToStorage(file: File): Promise<string> {
    try {
      const fileName = this.generateFileName(file);
      const base64Data = await this.fileToBase64(file);
      
      // Store the file data in localStorage with a unique key
      const fileKey = `uploaded_file_${fileName}`;
      localStorage.setItem(fileKey, base64Data);
      
      // Store metadata
      const metadata = {
        fileName: fileName,
        originalName: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString()
      };
      localStorage.setItem(`${fileKey}_meta`, JSON.stringify(metadata));
      
      // Return the path that can be used in img src
      return base64Data; // Return base64 data URL directly
    } catch (error) {
      console.error('Error saving file:', error);
      throw new Error('Failed to save file');
    }
  }

  // Alternative: Create blob URL with proper cleanup
  createManagedBlobUrl(file: File): string {
    const blobUrl = URL.createObjectURL(file);
    
    // Store blob URL mapping for cleanup
    const fileName = this.generateFileName(file);
    const urlKey = `blob_url_${fileName}`;
    localStorage.setItem(urlKey, blobUrl);
    
    return blobUrl;
  }

  // Get file from storage
  getFileFromStorage(fileName: string): string | null {
    const fileKey = `uploaded_file_${fileName}`;
    return localStorage.getItem(fileKey);
  }

  // Clean up old blob URLs
  cleanupBlobUrls(): void {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('blob_url_')) {
        const blobUrl = localStorage.getItem(key);
        if (blobUrl) {
          URL.revokeObjectURL(blobUrl);
          localStorage.removeItem(key);
        }
      }
    }
  }

  // Copy file to public directory (for real file system - would need backend)
  async copyToPublicDirectory(file: File): Promise<string> {
    // This would need a backend endpoint to handle file uploads
    // For now, we'll use base64 storage as fallback
    console.warn('Real file copy requires backend. Using base64 storage instead.');
    return this.saveFileToStorage(file);
  }

  // Validate file type and size
  validateFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'image/', 'video/', 'audio/', 'application/pdf', 
      'application/msword', 'text/', 'application/vnd.openxmlformats'
    ];

    if (file.size > maxSize) {
      return { valid: false, error: 'File size exceeds 10MB limit' };
    }

    const isAllowedType = allowedTypes.some(type => file.type.startsWith(type));
    if (!isAllowedType) {
      return { valid: false, error: 'File type not supported' };
    }

    return { valid: true };
  }
}

// Create singleton instance
export const fileUploadManager = new FileUploadManager();
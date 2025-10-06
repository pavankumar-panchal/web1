import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Upload, 
  Edit3, 
  Trash2, 
  X, 
  Eye, 
  EyeOff, 
  Download, 
  Home,
  User,
  Briefcase,
  Heart,
  Phone
} from 'lucide-react';
import { ImageData, PageImages } from '../types/imageData';
import { storageManager, detectMediaType } from '../utils/storageManager';
import { fileUploadManager } from '../utils/fileUploadManager';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('fashion');
  const [images, setImages] = useState<PageImages>({} as PageImages);
  const [editingImage, setEditingImage] = useState<ImageData | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('file');
  const [newImage, setNewImage] = useState<Partial<ImageData>>({
    src: '',
    alt: '',
    title: '',
    description: '',
    category: '',
    order: 1,
    isActive: true
  });

  const sections = [
    { id: 'introduction', label: 'Introduction Section', icon: <User size={20} />, color: 'from-indigo-500 to-purple-600' },
    { id: 'hero', label: 'Hero Section', icon: <Home size={20} />, color: 'from-pink-500 to-purple-600' },
    { id: 'about', label: 'About Riina', icon: <User size={20} />, color: 'from-purple-400 to-pink-400' },
    { id: 'portfolio', label: 'Portfolio', icon: <Briefcase size={20} />, color: 'from-purple-500 to-pink-500' },
    { id: 'ugc', label: 'UGC Content', icon: <Heart size={20} />, color: 'from-pink-400 to-purple-400' },
    { id: 'contact', label: 'Contact Page', icon: <Phone size={20} />, color: 'from-pink-300 to-purple-300' }
  ];

  const portfolioCategories = [
    { id: 'fashion', label: 'Fashion Editorial' },
    { id: 'beauty', label: 'Beauty & Portrait' },
    { id: 'commercial', label: 'Commercial & Lifestyle' }
  ];

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = () => {
    storageManager.initializeStorage();
    const allImages = storageManager.getAllImages();
    setImages(allImages);
  };

  const getCurrentImages = (): ImageData[] => {
    if (activeSection === 'portfolio') {
      return images.portfolio?.[activeSubCategory as keyof typeof images.portfolio] || [];
    }
    return (images[activeSection as keyof PageImages] as ImageData[]) || [];
  };

    const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setSelectedFiles(files);
    
    try {
      const file = files[0];
      
      // Validate file
      const validation = fileUploadManager.validateFile(file);
      if (!validation.valid) {
        alert(validation.error);
        return;
      }
      
      // Save file and get proper path
      const filePath = await fileUploadManager.saveFileToStorage(file);
      const mediaType = detectMediaType(file);
      
      setNewImage(prev => ({
        ...prev,
        src: filePath, // Use the proper file path instead of blob URL
        title: prev.title || file.name.replace(/\.[^/.]+$/, ""), // Remove extension
        alt: prev.alt || file.name,
        mediaType: mediaType,
        fileSize: file.size
      }));
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    }
  };

  const handleAddImage = async () => {
    if (uploadMethod === 'file' && selectedFiles) {
      // File upload is already handled in handleFileUpload
      // The src should already contain the proper path
      if (!newImage.src || !newImage.title) {
        alert('Please provide a title and select a file');
        return;
      }

      const imageToAdd: ImageData = {
        ...newImage,
        category: activeSection === 'portfolio' ? activeSubCategory : newImage.category
      } as ImageData;

      try {
        await storageManager.addImage(activeSection as keyof PageImages, imageToAdd);
        setShowAddForm(false);
        resetForm();
        loadImages();
      } catch (error) {
        console.error('Error adding image:', error);
        alert('Error adding image');
      }
    } else {
      // Handle URL input
      if (!newImage.src || !newImage.title) {
        alert('Please fill in required fields');
        return;
      }

      const imageToAdd: ImageData = {
        ...newImage,
        category: activeSection === 'portfolio' ? activeSubCategory : newImage.category
      } as ImageData;

      try {
        await storageManager.addImage(activeSection as keyof PageImages, imageToAdd);
        setShowAddForm(false);
        resetForm();
        loadImages();
      } catch (error) {
        console.error('Error adding image:', error);
        alert('Error adding image');
      }
    }
  };

  const resetForm = () => {
    setNewImage({
      src: '',
      title: '',
      alt: '',
      description: '',
      order: 1
    });
    setSelectedFiles(null);
    setUploadMethod('file');
  };

  // Render media preview based on type
  const renderMediaPreview = (image: ImageData) => {
    const mediaType = image.mediaType || 'image';
    
    // Handle error loading for base64 images
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      console.warn('Failed to load image:', image.src);
      e.currentTarget.style.display = 'none';
      e.currentTarget.parentElement?.classList.add('bg-red-100');
    };
    
    switch (mediaType) {
      case 'video':
        return (
          <video
            src={image.src}
            className="w-full h-full object-cover"
            controls={false}
            muted
            onError={() => console.warn('Failed to load video:', image.src)}
          />
        );
      case 'audio':
        return (
          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🎵</span>
              </div>
              <p className="text-sm font-medium text-gray-700">{image.title}</p>
            </div>
          </div>
        );
      case 'document':
        return (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">📄</span>
              </div>
              <p className="text-sm font-medium text-gray-700">{image.title}</p>
            </div>
          </div>
        );
      case 'other':
        return (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">📁</span>
              </div>
              <p className="text-sm font-medium text-gray-700">{image.title}</p>
            </div>
          </div>
        );
      default: // image
        return (
          <div className="w-full h-full relative">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-red-100 items-center justify-center hidden error-placeholder">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">⚠️</span>
                </div>
                <p className="text-sm font-medium text-red-700">Image failed to load</p>
              </div>
            </div>
          </div>
        );
    }
  };

  const handleUpdateImage = () => {
    if (!editingImage) return;

    const success = storageManager.updateImage(
      activeSection as keyof PageImages,
      editingImage.id,
      editingImage
    );

    if (success) {
      loadImages();
      setEditingImage(null);
      alert('Image updated successfully!');
    } else {
      alert('Failed to update image');
    }
  };

  const handleDeleteImage = (imageId: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      const success = storageManager.deleteImage(activeSection as keyof PageImages, imageId);
      
      if (success) {
        loadImages();
        alert('Image deleted successfully!');
      } else {
        alert('Failed to delete image');
      }
    }
  };

  const handleToggleActive = (image: ImageData) => {
    const success = storageManager.updateImage(
      activeSection as keyof PageImages,
      image.id,
      { ...image, isActive: !image.isActive }
    );

    if (success) {
      loadImages();
    }
  };

  const exportData = () => {
    const data = storageManager.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-images-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-white shadow-2xl border-b lg:border-b-0 lg:border-r border-purple-100 flex flex-col h-full lg:h-screen">
          {/* Header - Fixed */}
          <div className="p-4 lg:p-6 border-b border-purple-100 bg-gradient-to-r from-pink-500 to-purple-600 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                <h2 className="text-lg lg:text-xl font-bold text-white">Admin Panel</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                title="Close Admin Panel"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Scrollable Navigation Area */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100">
            <div className="p-3 lg:p-4 pb-2">
              <h3 className="text-xs lg:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Page Sections</h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl transition-all duration-200 text-sm lg:text-base ${
                      activeSection === section.id
                        ? `bg-gradient-to-r ${section.color} text-white shadow-lg`
                        : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                    }`}
                  >
                    {section.icon}
                    <span className="font-medium truncate">{section.label}</span>
                  </button>
                ))}
              </div>

              {/* Portfolio Subcategories */}
              {activeSection === 'portfolio' && (
                <div className="mt-4 lg:mt-6">
                  <h3 className="text-xs lg:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Portfolio Categories</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {portfolioCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveSubCategory(category.id)}
                        className={`w-full text-left px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 text-sm lg:text-base ${
                          activeSubCategory === category.id
                            ? 'bg-purple-100 text-purple-600 font-medium'
                            : 'text-gray-500 hover:bg-purple-50 hover:text-purple-500'
                        }`}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions - Always Fixed at Bottom */}
          <div className="flex-shrink-0 p-3 lg:p-4 border-t border-purple-100 bg-white shadow-lg">
            <h3 className="text-xs lg:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full flex items-center justify-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 text-sm lg:text-base font-medium"
              >
                <Upload className="w-4 h-4" />
                <span>Add Media</span>
              </button>
              <button
                onClick={exportData}
                className="w-full flex items-center justify-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 text-sm lg:text-base font-medium"
              >
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto min-h-0">
          <div className="p-4 lg:p-8">
            {/* Header */}
            <div className="mb-6 lg:mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {sections.find(s => s.id === activeSection)?.label} Management
              </h1>
              {activeSection === 'portfolio' && (
                <p className="text-gray-600 text-sm lg:text-base">
                  Managing {portfolioCategories.find(c => c.id === activeSubCategory)?.label} images
                </p>
              )}
              <p className="text-gray-600 text-sm lg:text-base">
                Total images: {getCurrentImages().length} | 
                Active: {getCurrentImages().filter(img => img.isActive).length}
              </p>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6">
              {getCurrentImages().map((image) => (
                <div
                  key={image.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl ${
                    !image.isActive ? 'opacity-60' : ''
                  }`}
                >
                  {/* Media Preview */}
                  <div className="relative aspect-square">
                    {renderMediaPreview(image)}
                    <div className="absolute top-2 lg:top-3 right-2 lg:right-3 flex gap-1 lg:gap-2">
                      <button
                        onClick={() => handleToggleActive(image)}
                        className={`p-1.5 lg:p-2 rounded-full transition-colors ${
                          image.isActive 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-500 text-white'
                        }`}
                        title={image.isActive ? 'Hide Image' : 'Show Image'}
                      >
                        {image.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 lg:p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 truncate text-sm lg:text-base">{image.title}</h3>
                    <p className="text-xs lg:text-sm text-gray-600 mb-3 line-clamp-2">{image.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1 lg:gap-2">
                        <button
                          onClick={() => setEditingImage(image)}
                          className="p-1.5 lg:p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          title="Edit Image"
                        >
                          <Edit3 size={12} className="lg:hidden" />
                          <Edit3 size={14} className="hidden lg:block" />
                        </button>
                        <button
                          onClick={() => handleDeleteImage(image.id)}
                          className="p-1.5 lg:p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          title="Delete Image"
                        >
                          <Trash2 size={12} className="lg:hidden" />
                          <Trash2 size={14} className="hidden lg:block" />
                        </button>
                      </div>
                      <span className="text-xs text-gray-500">#{image.order}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Image Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto">
            <div className="p-4 lg:p-6 border-b border-gray-200 bg-gradient-to-r from-pink-500 to-purple-600">
              <div className="flex items-center justify-between">
                <h3 className="text-lg lg:text-xl font-bold text-white">Add New Media</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Upload Method Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Upload Method</label>
                <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setUploadMethod('file')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                      uploadMethod === 'file'
                        ? 'bg-white text-purple-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    📁 Upload Files
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMethod('url')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                      uploadMethod === 'url'
                        ? 'bg-white text-purple-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    🔗 Use URL
                  </button>
                </div>
              </div>

              {/* File Upload */}
              {uploadMethod === 'file' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose Files *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.gif,.webp,.svg"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="w-full flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all duration-200"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 text-center">
                        <span className="font-medium text-purple-600">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Images, Videos, Audio, PDFs, Documents (Max 10MB each)
                      </p>
                    </label>
                  </div>
                  
                  {/* File Preview */}
                  {selectedFiles && selectedFiles.length > 0 && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm font-medium text-green-800">Selected Files:</p>
                      <div className="mt-1 space-y-1">
                        {Array.from(selectedFiles).map((file, index) => {
                          const mediaType = detectMediaType(file);
                          const getFileIcon = (type: string) => {
                            switch (type) {
                              case 'image': return '🖼️';
                              case 'video': return '🎬';
                              case 'audio': return '🎵';
                              case 'document': return '📄';
                              default: return '📁';
                            }
                          };
                          
                          return (
                            <div key={index} className="flex items-center gap-2 text-sm text-green-700">
                              <span>{getFileIcon(mediaType)}</span>
                              <span>{file.name}</span>
                              <span className="text-green-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                              <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs capitalize">
                                {mediaType}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* Upload Preview */}
                  {newImage.src && uploadMethod === 'file' && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-medium text-blue-800 mb-2">Preview:</p>
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                          {newImage.mediaType === 'image' ? (
                            <img 
                              src={newImage.src} 
                              alt="Preview" 
                              className="w-full h-full object-cover"
                              onError={() => console.warn('Preview failed to load')}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">
                              {newImage.mediaType === 'video' ? '🎬' : 
                               newImage.mediaType === 'audio' ? '🎵' : 
                               newImage.mediaType === 'document' ? '📄' : '📁'}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-blue-900">{newImage.title}</p>
                          <p className="text-xs text-blue-600">Ready to upload</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* URL Input */}
              {uploadMethod === 'url' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Media URL *</label>
                  <input
                    type="text"
                    value={newImage.src || ''}
                    onChange={(e) => setNewImage({ ...newImage, src: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg or /web1/images/your-file.jpg"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={newImage.title || ''}
                  onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Image title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
                <input
                  type="text"
                  value={newImage.alt || ''}
                  onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Alternative text for accessibility"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newImage.description || ''}
                  onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24 resize-none"
                  placeholder="Image description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <input
                  type="number"
                  value={newImage.order || 1}
                  onChange={(e) => setNewImage({ ...newImage, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min="1"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddImage}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
                >
                  Add Media
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Image Modal */}
      {editingImage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-pink-500 to-purple-600">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Edit Image</h3>
                <button
                  onClick={() => setEditingImage(null)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL *</label>
                <input
                  type="text"
                  value={editingImage.src}
                  onChange={(e) => setEditingImage({ ...editingImage, src: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={editingImage.title}
                  onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
                <input
                  type="text"
                  value={editingImage.alt}
                  onChange={(e) => setEditingImage({ ...editingImage, alt: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={editingImage.description}
                  onChange={(e) => setEditingImage({ ...editingImage, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24 resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <input
                  type="number"
                  value={editingImage.order}
                  onChange={(e) => setEditingImage({ ...editingImage, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min="1"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleUpdateImage}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
                >
                  Update Image
                </button>
                <button
                  onClick={() => setEditingImage(null)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
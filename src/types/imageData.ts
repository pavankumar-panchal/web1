// Media data structure for file-based storage (supports images, videos, and other files)
export interface ImageData {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  category?: string;
  order: number;
  isActive: boolean;
  uploadedAt: string;
  mediaType?: 'image' | 'video' | 'audio' | 'document' | 'other';
  fileSize?: number;
  duration?: number; // For videos and audio
}

export interface PageImages {
  introduction: ImageData[];
  hero: ImageData[];
  portfolio: {
    fashion: ImageData[];
    beauty: ImageData[];
    commercial: ImageData[];
  };
  ugc: ImageData[];
  about: ImageData[];
  contact: ImageData[];
}

// Default image data structure
export const defaultImageData: PageImages = {
  introduction: [
    {
      id: "intro-1",
      src: "/web1/images/cropped-img-59.jpg",
      alt: "Riina Seise Professional Portrait",
      title: "Professional Portrait",
      description: "Riina Seise - Professional Model & Content Creator",
      category: "Portrait",
      order: 1,
      isActive: true,
      uploadedAt: new Date().toISOString()
    },
    {
      id: "intro-2", 
      src: "/web1/images/img-60.jpg",
      alt: "Fashion Editorial Shot",
      title: "Fashion Editorial", 
      description: "High-end fashion photography showcase",
      category: "Fashion",
      order: 2,
      isActive: true,
      uploadedAt: new Date().toISOString()
    },
    {
      id: "intro-3",
      src: "/web1/images/img-62.jpg",
      alt: "Beauty Campaign",
      title: "Beauty Portfolio",
      description: "Professional beauty and lifestyle photography",
      category: "Beauty",
      order: 3,
      isActive: true,
      uploadedAt: new Date().toISOString()
    }
  ],
  hero: [
    {
      id: "hero-1",
      src: "/web1/images/cropped-img-59.jpg",
      alt: "Fashion Editorial Portrait",
      title: "Fashion Editorial",
      description: "Haute couture & runway excellence",
      category: "Fashion",
      order: 1,
      isActive: true,
      uploadedAt: new Date().toISOString()
    },
    {
      id: "hero-2", 
      src: "/web1/images/img-60.jpg",
      alt: "Professional Beauty Shot",
      title: "Beauty Portfolio", 
      description: "Timeless beauty & elegance",
      category: "Beauty",
      order: 2,
      isActive: true,
      uploadedAt: new Date().toISOString()
    },
    {
      id: "hero-3",
      src: "/web1/images/img-62.jpg", 
      alt: "Commercial Photography",
      title: "Commercial Work",
      description: "Brand storytelling & lifestyle",
      category: "Commercial",
      order: 3,
      isActive: true,
      uploadedAt: new Date().toISOString()
    }
  ],
  portfolio: {
    fashion: [
      {
        id: "fashion-1",
        src: "/web1/images/WhatsApp Image 2025-10-01 at 1.18.04 PM.jpeg",
        alt: "Fashion Editorial 1",
        title: "High Fashion Editorial",
        description: "Elegant runway photography",
        order: 1,
        isActive: true,
        uploadedAt: new Date().toISOString()
      }
    ],
    beauty: [
      {
        id: "beauty-1", 
        src: "/web1/images/WhatsApp Image 2025-10-01 at 1.18.10 PM.jpeg",
        alt: "Beauty Portrait 1",
        title: "Beauty Campaign",
        description: "Professional beauty photography",
        order: 1,
        isActive: true,
        uploadedAt: new Date().toISOString()
      }
    ],
    commercial: [
      {
        id: "commercial-1",
        src: "/web1/images/WhatsApp Image 2025-10-01 at 1.18.14 PM.jpeg", 
        alt: "Commercial Shoot 1",
        title: "Brand Campaign",
        description: "Commercial lifestyle photography",
        order: 1,
        isActive: true,
        uploadedAt: new Date().toISOString()
      }
    ]
  },
  ugc: [
    {
      id: "ugc-1",
      src: "/web1/images/WhatsApp Image 2025-10-01 at 1.17.56 PM.jpeg",
      alt: "UGC Content 1", 
      title: "Social Media Content",
      description: "Authentic user-generated content",
      order: 1,
      isActive: true,
      uploadedAt: new Date().toISOString()
    }
  ],
  about: [
    {
      id: "about-1",
      src: "/web1/images/WhatsApp Image 2025-10-01 at 1.17.57 PM.jpeg",
      alt: "About Me Photo",
      title: "Personal Portrait", 
      description: "Behind the scenes moment",
      order: 1,
      isActive: true,
      uploadedAt: new Date().toISOString()
    }
  ],
  contact: [
    {
      id: "contact-1",
      src: "/web1/images/WhatsApp Image 2025-10-01 at 1.17.58 PM.jpeg",
      alt: "Contact Photo",
      title: "Get In Touch",
      description: "Ready for collaboration",
      order: 1,
      isActive: true,
      uploadedAt: new Date().toISOString()
    }
  ]
};
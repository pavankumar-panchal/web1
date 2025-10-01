import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Mail, Camera, Award, Heart, Phone, ArrowUp, Play } from 'lucide-react';

interface NavigationProps {
  currentSection: string;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentSection, 
  isMenuOpen, 
  onMenuToggle 
}) => {
  const sections = [
    { id: 'home', label: 'Home', icon: <Camera size={20} /> },
    { id: 'modeling', label: 'Modeling Portfolio', icon: <Award size={20} /> },
    { id: 'ugc', label: 'UGC & Content Creation', icon: <Heart size={20} /> },
    { id: 'about', label: 'About Me', icon: <Instagram size={20} /> },
    { id: 'contact', label: 'Contact', icon: <Phone size={20} /> }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300"
          style={{ 
            width: `${((window.scrollY || 0) / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%` 
          }}
        />
      </div>

      {/* Fixed Menu Button */}
      <button
        onClick={onMenuToggle}
        aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
        className="fixed top-6 right-6 z-50 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-2xl backdrop-blur-sm border border-white/20 transition-all duration-300 hover:shadow-pink-500/25 hover:shadow-xl hover:scale-110"
      >
        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Floating Navigation Sidebar */}
      <nav
        className={`fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl z-40 transform transition-all duration-500 ease-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } border-l border-gray-200/50`}
      >
        <div className="p-8 h-full flex flex-col">
          <div className="mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Portfolio
            </h2>
            <p className="text-gray-500 text-sm mt-2">Smooth scroll navigation</p>
          </div>
          
          <ul className="space-y-3 flex-1">
            {sections.map((section, index) => (
              <li key={section.id} style={{ animationDelay: `${index * 0.1}s` }}
                  className={`transform transition-all duration-300 ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                <button
                  onClick={() => {
                    scrollToSection(section.id);
                    onMenuToggle();
                  }}
                  className={`group w-full text-left py-4 px-5 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                    currentSection === section.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'hover:bg-gray-50 text-gray-700 hover:shadow-md hover:transform hover:scale-102'
                  }`}
                >
                  <span className={`transition-all duration-300 ${
                    currentSection === section.id ? 'text-white' : 'text-gray-400 group-hover:text-pink-500'
                  }`}>
                    {section.icon}
                  </span>
                  <span className="font-medium">{section.label}</span>
                </button>
              </li>
            ))}
          </ul>
          
          {/* Social Links in Sidebar */}
          <div className="mt-auto pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm mb-4">Connect with me</p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/riinaseise?igsh=MWEwZjJ0cGgwd216cg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-110">
                <Instagram size={18} />
              </a>
              <a href="mailto:riina.seise@gmail.com" className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-110">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 transition-all duration-300" 
          onClick={onMenuToggle} 
        />
      )}
    </>
  );
};

const MainShowcase: React.FC = () => {
  const images = [
    '/web1/images/cropped-img-59.jpg',
    '/web1/images/img-60.jpg',
    '/web1/images/img-62.jpg',
    '/web1/images/img-66.jpg',
    '/web1/images/WhatsApp Image 2025-10-01 at 1.17.56 PM.jpeg',
    '/web1/images/WhatsApp Image 2025-10-01 at 1.17.57 PM.jpeg',
    '/web1/images/WhatsApp Image 2025-10-01 at 1.17.58 PM.jpeg',
    '/web1/images/WhatsApp Image 2025-10-01 at 1.17.59 PM.jpeg',
    '/web1/images/WhatsApp Image 2025-10-01 at 1.18.00 PM.jpeg',
    '/web1/images/WhatsApp Image 2025-10-01 at 1.18.01 PM.jpeg',
    '/web1/images/WhatsApp Image 2025-10-01 at 1.18.02 PM.jpeg',
    '/web1/images/WhatsApp Image 2025-10-01 at 1.18.03 PM.jpeg'
  ];

  const [selected, setSelected] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const stats = [
    { number: '50+', label: 'Fashion Shows' },
    { number: '2000+', label: 'Photo Shoots' },
    { number: '30K+', label: 'Social Followers' },
    { number: '8+', label: 'Years Experience' }
  ];

  const scrollToNext = () => {
    const modelingSection = document.getElementById('modeling');
    if (modelingSection) {
      modelingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full opacity-15 animate-float"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left: Enhanced intro */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 bg-gradient-to-r from-gray-900 via-pink-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Riina
                <br />
                <span className="text-5xl md:text-7xl">Seise</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mb-6"></div>
              <div className="max-w-3xl">
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium mb-4">
                  I'm an <span className="text-gray-800 font-semibold">entrepreneur</span> and <span className="text-gray-800 font-semibold">fashion professional</span> who combines an international modeling background with over <span className="text-gray-800 font-semibold">eight years in the agency business</span> to create captivating brand content.
                </p>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                  I specialize in high-quality visuals with a refined aesthetic, focusing on fashion, beauty, and lifestyle on Instagram. Beyond digital collaborations, I work with select projects in modeling, fashion and TV - and as a true animal lover and proud cat mama, I enjoy life's simple moments as much as its big adventures.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4"> 
              <button 
                onClick={scrollToNext}
                className="group bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <span className="font-semibold">View Portfolio</span>
                <ArrowUp className="w-4 h-4 rotate-45 group-hover:rotate-90 transition-transform duration-300" />
              </button>
              
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300 font-semibold"
              >
                Get In Touch
              </button>
            </div>

            {/* Enhanced feature list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              {[
                { icon: <Award className="w-6 h-6" />, text: "Fashion Editorials" },
                { icon: <Camera className="w-6 h-6" />, text: "Brand Collaborations" },
                { icon: <Heart className="w-6 h-6" />, text: "UGC & Social Campaigns" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl">
                    {item.icon}
                  </div>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-gray-200">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Enhanced image gallery */}
          <div className="relative">
            {/* Main image display with rotation */}
            <div className="relative mb-8 group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl blur-xl opacity-30 scale-105 group-hover:opacity-50 transition-all duration-500"></div>
              <div className="relative bg-white p-2 rounded-3xl shadow-2xl">
                <img 
                  src={images[currentImageIndex]} 
                  alt={`Riina ${currentImageIndex + 1}`} 
                  className="w-full h-[500px] object-cover rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105"
                  onClick={() => setSelected(images[currentImageIndex])}
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-gray-900 font-semibold">Professional Portfolio</p>
                  <p className="text-gray-600 text-sm">Click to view full size</p>
                </div>
              </div>
            </div>

            {/* Thumbnail strip with enhanced styling */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentImageIndex(i);
                    setSelected(src);
                  }}
                  className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                    currentImageIndex === i ? 'ring-4 ring-pink-500 ring-offset-2' : ''
                  }`}
                >
                  <img 
                    src={src} 
                    alt={`Thumbnail ${i + 1}`} 
                    className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>

            {/* Floating action button */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
              <Play className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button 
            onClick={scrollToNext}
            className="flex flex-col items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors duration-300 animate-bounce"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </button>
        </div>

        {/* Enhanced Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="relative max-w-5xl w-full">
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 bg-white text-gray-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <div className="bg-white p-4 rounded-2xl shadow-2xl">
                <img 
                  src={selected} 
                  alt="Large view" 
                  className="w-full h-auto max-h-[80vh] object-contain rounded-xl" 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const ModelingPortfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const portfolioSections = [
    {
      title: 'Fashion Editorial',
      category: 'fashion',
      description: 'High-fashion editorials and runway looks',
      images: [
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.04 PM.jpeg',
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.05 PM.jpeg',
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.06 PM.jpeg',
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.07 PM.jpeg',
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.08 PM.jpeg',
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.09 PM.jpeg',
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.42 PM.jpeg',
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.43 PM.jpeg'
      ]
    },
    {
      title: 'Beauty & Portrait',
      category: 'beauty',
      description: 'Beauty campaigns and portrait photography',
      images: [
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.10 PM.jpeg',
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.11 PM.jpeg',
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.12 PM.jpeg',
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.13 PM.jpeg',
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.44 PM.jpeg',
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.45 PM.jpeg',
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.46 PM.jpeg',
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.47 PM.jpeg'
      ]
    },
    {
      title: 'Commercial & Lifestyle',
      category: 'commercial',
      description: 'Brand campaigns and lifestyle photography',
      images: [
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.14 PM.jpeg',
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.15 PM.jpeg',
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.16 PM.jpeg',
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.48 PM.jpeg',
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.49 PM.jpeg',
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.50 PM.jpeg',
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.51 PM.jpeg',
        '/web1/images/WhatsApp Image 2025-10-01 at 1.18.52 PM.jpeg'
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Work', icon: <Camera className="w-5 h-5" /> },
    { id: 'fashion', label: 'Fashion', icon: <Award className="w-5 h-5" /> },
    { id: 'beauty', label: 'Beauty', icon: <Heart className="w-5 h-5" /> },
    { id: 'commercial', label: 'Commercial', icon: <Instagram className="w-5 h-5" /> }
  ];

  const filteredSections = selectedCategory === 'all' 
    ? portfolioSections 
    : portfolioSections.filter(section => section.category === selectedCategory);

  return (
    <div id="modeling" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-gray-900 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            Modeling Portfolio
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A curated collection of my professional work spanning fashion editorials, 
            beauty campaigns, and commercial photography.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`group flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:shadow-md hover:scale-105'
              }`}
            >
              <span className={`transition-all duration-300 ${
                selectedCategory === category.id ? 'text-white' : 'text-gray-500 group-hover:text-pink-500'
              }`}>
                {category.icon}
              </span>
              <span className="font-semibold">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="space-y-20">
          {filteredSections.map((section, sectionIndex) => (
            <div key={section.title} className="animate-fade-in" style={{ animationDelay: `${sectionIndex * 0.2}s` }}>
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{section.title}</h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">{section.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {section.images.map((image, imageIndex) => (
                  <div
                    key={`${section.title}-${imageIndex}`}
                    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    {/* Image container with aspect ratio */}
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={image}
                        alt={`${section.title} ${imageIndex + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white font-bold text-lg">{section.title}</p>
                        <p className="text-white/80 text-sm">Click to view full size</p>
                      </div>
                    </div>

                    {/* Hover icon */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                      <Camera className="w-4 h-4 text-gray-700" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="relative max-w-5xl w-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 bg-white text-gray-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <div className="bg-white p-4 rounded-2xl shadow-2xl">
                <img 
                  src={selectedImage} 
                  alt="Portfolio item" 
                  className="w-full h-auto max-h-[80vh] object-contain rounded-xl" 
                />
              </div>
            </div>
          </div>
        )}

        {/* Call to action */}
        <div className="text-center mt-20 p-12 bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Collaborate?</h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's create something amazing together. Get in touch to discuss your next project.
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
          >
            Start a Conversation
          </button>
        </div>
      </div>
    </div>
  );
};

const UGCSection: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  const ugcContent = [
    {
      type: 'image',
      url: '/web1/images/WhatsApp Image 2025-10-01 at 1.18.53 PM.jpeg',
      brand: 'Beauty Brand Collaboration',
      category: 'Beauty',
      description: 'Authentic beauty content showcasing natural glow and skincare routine'
    },
    {
      type: 'image',
      url: '/web1/images/WhatsApp Image 2025-10-01 at 1.18.54 PM.jpeg',
      brand: 'Fashion Campaign',
      category: 'Fashion',
      description: 'Dynamic fashion content featuring latest seasonal trends'
    },
    {
      type: 'image',
      url: '/web1/images/WhatsApp Image 2025-10-01 at 1.19.07 PM.jpeg',
      brand: 'Lifestyle Content',
      category: 'Lifestyle',
      description: 'Relatable lifestyle moments that connect with audiences'
    },
    {
      type: 'image',
      url: '/web1/images/WhatsApp Image 2025-10-01 at 1.19.08 PM.jpeg',
      brand: 'Product Showcase',
      category: 'Product',
      description: 'Creative product photography with authentic styling'
    },
    {
      type: 'image',
      url: '/web1/images/WhatsApp Image 2025-10-01 at 1.19.09 PM.jpeg',
      brand: 'Brand Partnership',
      category: 'Brand',
      description: 'Long-term brand partnerships creating consistent content'
    },
    {
      type: 'image',
      url: '/web1/images/WhatsApp Image 2025-10-01 at 1.19.10 PM.jpeg',
      brand: 'Social Media Content',
      category: 'Social',
      description: 'Engaging social media content that drives interaction'
    },
    {
      type: 'image',
      url: '/web1/images/WhatsApp Image 2025-10-01 at 1.19.11 PM.jpeg',
      brand: 'Editorial Collaboration',
      category: 'Editorial',
      description: 'Professional editorial content for fashion magazines'
    },
    {
      type: 'image',
      url: '/web1/images/WhatsApp Image 2025-10-01 at 1.19.12 PM.jpeg',
      brand: 'Casual Lifestyle',
      category: 'Casual',
      description: 'Relaxed lifestyle content showcasing everyday moments'
    },
    {
      type: 'image',
      url: '/web1/images/WhatsApp Image 2025-10-01 at 1.19.13 PM.jpeg',
      brand: 'Professional Portraits',
      category: 'Portrait',
      description: 'Professional portrait sessions for personal branding'
    }
  ];

  const services = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: 'Content Creation',
      description: 'High-quality photos and videos tailored to your brand aesthetic'
    },
    {
      icon: <Instagram className="w-8 h-8" />,
      title: 'Social Media Strategy',
      description: 'Authentic content that resonates with your target audience'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Brand Partnerships',
      description: 'Long-term collaborations that build genuine brand loyalty'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Product Reviews',
      description: 'Honest, detailed reviews that influence purchasing decisions'
    }
  ];

  return (
    <div id="ugc" className="py-20 px-6 bg-gradient-to-br from-purple-50 via-pink-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            UGC & Content Creation
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Authentic user-generated content that builds trust, drives engagement, and converts audiences into customers. 
            I create content that feels genuine and speaks directly to your target demographic.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Content Gallery */}
        <div className="mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Recent Collaborations
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ugcContent.map((content, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer bg-white"
                onClick={() => setSelectedContent(content.url)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={content.url}
                    alt={content.brand}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Video play button */}
                  {content.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Play className="w-8 h-8 text-purple-600 ml-1" />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Content Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {content.category}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {content.type === 'video' ? 'Video' : 'Photo'}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                    {content.brand}
                  </h4>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {content.description}
                  </p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                  <div className="p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-bold">View Full Content</p>
                    <p className="text-white/80 text-sm">Click to expand</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '150+', label: 'UGC Campaigns' },
              { number: '2M+', label: 'Content Views' },
              { number: '85%', label: 'Engagement Rate' },
              { number: '50+', label: 'Brand Partners' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-black mb-2">{stat.number}</div>
                <div className="text-white/90 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white p-12 rounded-3xl shadow-lg">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Create Together?</h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how authentic content can elevate your brand and connect with your audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
            >
              Start Collaboration
            </button>
            <a 
              href="mailto:riina@example.com" 
              className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 font-semibold"
            >
              Request Media Kit
            </a>
          </div>
        </div>

        {/* Modal */}
        {selectedContent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="relative max-w-5xl w-full">
              <button
                onClick={() => setSelectedContent(null)}
                className="absolute -top-12 right-0 bg-white text-gray-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <div className="bg-white p-4 rounded-2xl shadow-2xl">
                <img 
                  src={selectedContent} 
                  alt="UGC Content" 
                  className="w-full h-auto max-h-[80vh] object-contain rounded-xl" 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AboutSection: React.FC = () => {
  return (
    <div id="about" className="py-20 px-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entrepreneur, fashion professional, and content creator with over eight years of industry experience
          </p>
        </div>
        
        <div className="space-y-20">
          {/* Main bio section with enhanced professional styling */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              {/* Enhanced professional bio with premium styling */}
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute -top-6 -left-6 w-72 h-72 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-6 -right-6 w-96 h-96 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full opacity-20 blur-3xl"></div>
                
                <div className="relative bg-white/95 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500">
                  {/* Premium quote styling */}
                  <div className="absolute -top-4 -left-4 text-6xl text-indigo-200/50 font-serif leading-none">"</div>
                  
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <p className="text-2xl leading-relaxed text-gray-800 font-light tracking-wide">
                        I'm an <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">entrepreneur</span> and <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">fashion professional</span> who combines an international modeling background with over <span className="font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">eight years in the agency business</span> to create captivating brand content.
                      </p>
                      
                      <p className="text-xl leading-relaxed text-gray-700 font-light">
                        I specialize in <span className="font-semibold text-indigo-600">high-quality visuals with a refined aesthetic</span>, focusing on <span className="font-semibold text-purple-600">fashion, beauty, and lifestyle</span> on Instagram.
                      </p>
                    </div>
                    
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                    
                    <div className="space-y-6">
                      <p className="text-xl leading-relaxed text-gray-700 font-light">
                        Beyond digital collaborations, I work with select projects in <span className="font-semibold text-pink-600">modeling, fashion and TV</span> - and as a true <span className="font-semibold text-rose-600">animal lover</span> and proud <span className="font-semibold text-purple-600">cat mama</span>, I enjoy life's simple moments as much as its big adventures.
                      </p>
                    </div>
                  </div>
                  
                  {/* Premium signature line */}
                  <div className="mt-10 pt-8 border-t border-gray-100">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-12 h-px bg-gradient-to-r from-transparent to-indigo-300"></div>
                      <div className="flex items-center space-x-2">
                        <Heart className="w-5 h-5 text-pink-400" />
                        <span className="text-sm font-medium text-gray-500 tracking-wider">RIINA SEISE</span>
                        <Heart className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="w-12 h-px bg-gradient-to-l from-transparent to-purple-300"></div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 text-6xl text-purple-200/50 font-serif leading-none rotate-180">"</div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative group">
                {/* Enhanced image container with premium effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-700 scale-105"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 via-violet-500 to-rose-500 rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-all duration-500 scale-110"></div>
                
                <div className="relative bg-white p-3 rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-700">
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src="/web1/images/WhatsApp Image 2025-10-01 at 1.19.15 PM.jpeg"
                      alt="Riina Seise - Professional Portrait"
                      className="w-full h-[650px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Premium image caption */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/50">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Professional Portrait</h4>
                    <p className="text-gray-600 text-sm font-medium">Entrepreneur & Fashion Professional</p>
                    <div className="mt-3 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium What Drives Me section */}
          <div className="relative">
            {/* Section background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-3xl opacity-50"></div>
            
            <div className="relative py-16 px-8">
              <div className="text-center mb-16">
                <h3 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    What Drives Me
                  </span>
                </h3>
                <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto mb-6"></div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                  The passion and expertise that fuel my creative journey
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { 
                    icon: <Award className="w-8 h-8" />, 
                    title: "Agency Business", 
                    subtitle: "8+ Years Experience",
                    color: "from-indigo-500 to-indigo-600",
                    bgColor: "from-indigo-50 to-indigo-100"
                  },
                  { 
                    icon: <Camera className="w-8 h-8" />, 
                    title: "International Modeling", 
                    subtitle: "Global Experience",
                    color: "from-purple-500 to-purple-600",
                    bgColor: "from-purple-50 to-purple-100"
                  },
                  { 
                    icon: <Heart className="w-8 h-8" />, 
                    title: "Animal Lover", 
                    subtitle: "Proud Cat Mama",
                    color: "from-pink-500 to-pink-600",
                    bgColor: "from-pink-50 to-pink-100"
                  },
                  { 
                    icon: <Instagram className="w-8 h-8" />, 
                    title: "Content Creation", 
                    subtitle: "Fashion & Lifestyle",
                    color: "from-rose-500 to-rose-600",
                    bgColor: "from-rose-50 to-rose-100"
                  }
                ].map((item, index) => (
                  <div key={index} className="group relative">
                    {/* Card hover glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500 scale-110`}></div>
                    
                    <div className={`relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50 group-hover:shadow-2xl group-hover:scale-105 transition-all duration-500 text-center h-full`}>
                      {/* Icon container */}
                      <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                        <div className="text-white">
                          {item.icon}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 font-medium text-sm tracking-wide">
                        {item.subtitle}
                      </p>
                      
                      {/* Bottom accent */}
                      <div className={`mt-6 h-1 bg-gradient-to-r ${item.color} rounded-full mx-auto w-12 group-hover:w-16 transition-all duration-300`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div id="contact" className="py-20 px-6 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 min-h-screen flex items-center text-white">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to create something amazing together? Get in touch to discuss your next project.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-white">Get In Touch</h3>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Whether you're looking for a model for your next campaign, content creator for your brand, 
                or have a creative project in mind, I'd love to hear from you.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <p className="text-gray-300">riina.seise@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Instagram</p>
                  <p className="text-gray-300">@riinaseise</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">TikTok</p>
                  <p className="text-gray-300">@riinaseise</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Available for</p>
                  <p className="text-gray-300">Fashion shoots, Brand collaborations, UGC campaigns</p>
                </div>
              </div>
            </div>
            
            <div className="pt-8">
              <h4 className="text-xl font-bold mb-4 text-white">Follow My Work</h4>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:riina.seise@gmail.com"
                  className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
                >
                  Send Email
                </a>
                <a
                  href="https://www.instagram.com/riinaseise?igsh=MWEwZjJ0cGgwd216cg%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-pink-400 text-pink-400 px-6 py-3 rounded-full hover:bg-pink-400 hover:text-white transition-all duration-300 font-semibold"
                >
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@riinaseise?_t=ZN-8zytZXE6Gvu&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-purple-400 text-purple-400 px-6 py-3 rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300 font-semibold"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>
          
          {/* Right side - Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
            <h4 className="text-2xl font-bold mb-6 text-white">Send a Message</h4>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200 text-white placeholder-gray-300"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200 text-white placeholder-gray-300"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200 resize-none text-white placeholder-gray-300"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '500+', label: 'Projects Completed' },
            { number: '50+', label: 'Happy Clients' },
            { number: '8', label: 'Years Experience' },
            { number: '24/7', label: 'Available' }
          ].map((stat, index) => (
            <div key={index} className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.number}</div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Riina Seise
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Professional model, content creator and visual storyteller. 
              Creating authentic moments that captivate and inspire audiences worldwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:riina.seise@gmail.com"
                className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-110"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://www.instagram.com/riinaseise?igsh=MWEwZjJ0cGgwd216cg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-110"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@riinaseise?_t=ZN-8zytZXE6Gvu&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-110"
              >
                <Play size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => scrollToSection('home')} className="hover:text-pink-400 transition-colors">Home</button></li>
              <li><button onClick={() => scrollToSection('modeling')} className="hover:text-pink-400 transition-colors">Portfolio</button></li>
              <li><button onClick={() => scrollToSection('ugc')} className="hover:text-pink-400 transition-colors">UGC Content</button></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-pink-400 transition-colors">About</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-pink-400 transition-colors">Contact</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><span className="hover:text-pink-400 transition-colors">Fashion Modeling</span></li>
              <li><span className="hover:text-pink-400 transition-colors">Beauty Campaigns</span></li>
              <li><span className="hover:text-pink-400 transition-colors">Content Creation</span></li>
              <li><span className="hover:text-pink-400 transition-colors">Brand Partnerships</span></li>
              <li><span className="hover:text-pink-400 transition-colors">Social Media</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">&copy; 2025 Riina Seise. All rights reserved.</p>
          <div className="text-gray-500 text-sm">
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'modeling', 'ugc', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setCurrentSection(sections[i]);
          break;
        }
      }

      // Update progress bar
      const progressBar = document.querySelector('.progress-bar') as HTMLElement;
      if (progressBar) {
        const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add scroll-to-top functionality
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-gray-200">
        <div className="progress-bar h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300 w-0" />
      </div>

      {/* Navigation */}
      <Navigation
        currentSection={currentSection}
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
      />
      
      {/* Scrollable Content - All sections visible */}
      <main className="relative">
        <MainShowcase />
        <ModelingPortfolio />
        <UGCSection />
        <AboutSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}

export default App;
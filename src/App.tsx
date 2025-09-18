import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Mail, ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentSection, 
  onSectionChange, 
  isMenuOpen, 
  onMenuToggle 
}) => {
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'modeling', label: 'Modeling Portfolio' },
    { id: 'ugc', label: 'UGC & Content Creation' },
    { id: 'about', label: 'About Me' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuToggle}
        className="fixed top-6 right-6 z-50 md:hidden bg-black text-white p-3 rounded-full shadow-lg"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-40 transform transition-transform duration-300 ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } md:translate-x-0 md:w-64`}>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-8">Portfolio</h2>
          <ul className="space-y-4">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => {
                    onSectionChange(section.id);
                    onMenuToggle();
                  }}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-200 ${
                    currentSection === section.id
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onMenuToggle}
        />
      )}
    </>
  );
};

const ImageCarousel: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1759622/pexels-photo-1759622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Portfolio ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <button
        onClick={prevImage}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
      >
        <ChevronRight size={24} />
      </button>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="text-center text-white px-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">ELENA</h1>
          <p className="text-xl md:text-2xl font-light tracking-wide">
            Model • Content Creator • Artist
          </p>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentImage ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ModelingPortfolio: React.FC = () => {
  const portfolioSections = [
    {
      title: 'Fashion',
      images: [
        'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1759622/pexels-photo-1759622.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600'
      ]
    },
    {
      title: 'Beauty',
      images: [
        'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=600'
      ]
    },
    {
      title: 'Bridal',
      images: [
        'https://images.pexels.com/photos/1405819/pexels-photo-1405819.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1697912/pexels-photo-1697912.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1488414/pexels-photo-1488414.jpeg?auto=compress&cs=tinysrgb&w=600'
      ]
    },
    {
      title: 'Fashion Weeks',
      images: [
        'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1759622/pexels-photo-1759622.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600'
      ]
    },
    {
      title: 'Film Festivals',
      images: [
        'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=600'
      ]
    }
  ];

  return (
    <div className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16">Modeling Portfolio</h2>
        
        {portfolioSections.map((section, sectionIndex) => (
          <div key={section.title} className="mb-20">
            <h3 className="text-3xl font-semibold mb-8 text-center">{section.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {section.images.map((image, imageIndex) => (
                <div
                  key={imageIndex}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <img
                    src={image}
                    alt={`${section.title} ${imageIndex + 1}`}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-lg font-semibold">{section.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UGCSection: React.FC = () => {
  const ugcContent = [
    {
      type: 'image',
      url: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600',
      brand: 'Beauty Brand Collaboration'
    },
    {
      type: 'video',
      url: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=600',
      brand: 'Fashion Video Campaign'
    },
    {
      type: 'image',
      url: 'https://images.pexels.com/photos/1759622/pexels-photo-1759622.jpeg?auto=compress&cs=tinysrgb&w=600',
      brand: 'Lifestyle Content'
    },
    {
      type: 'image',
      url: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600',
      brand: 'Product Showcase'
    },
    {
      type: 'video',
      url: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600',
      brand: 'Brand Partnership'
    },
    {
      type: 'image',
      url: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600',
      brand: 'Social Media Content'
    }
  ];

  return (
    <div className="py-20 px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-8">UGC & Content Creation</h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          Collaborating with brands to create authentic, engaging content that resonates with audiences. 
          From product showcases to lifestyle content, I bring creativity and professionalism to every project.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ugcContent.map((content, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={content.url}
                  alt={content.brand}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {content.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-80 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-black" />
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold">{content.brand}</p>
                  <p className="text-white text-sm opacity-80">{content.type === 'video' ? 'Video Content' : 'Photo Content'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutSection: React.FC = () => {
  return (
    <div className="py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16">About Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-gray-700">
              With over 5 years of experience in the modeling and content creation industry, I've had the privilege 
              of working with renowned fashion brands, beauty companies, and creative agencies across Europe and beyond.
            </p>
            
            <p className="text-lg leading-relaxed text-gray-700">
              My journey began in Helsinki, where I discovered my passion for fashion and visual storytelling. 
              Since then, I've graced runways at major fashion weeks, collaborated with emerging designers, 
              and created authentic content that bridges the gap between brands and their audiences.
            </p>
            
            <p className="text-lg leading-relaxed text-gray-700">
              What sets me apart is my ability to bring genuine emotion and authenticity to every shoot. 
              Whether it's a high-fashion editorial, a beauty campaign, or user-generated content for social media, 
              I approach each project with professionalism, creativity, and attention to detail.
            </p>
            
            <p className="text-lg leading-relaxed text-gray-700">
              When I'm not in front of the camera, I'm passionate about sustainable fashion, yoga, and exploring 
              new cultures through travel. I believe in using my platform to promote positive messages about 
              self-acceptance, diversity, and environmental consciousness.
            </p>
            
            <div className="pt-6">
              <h3 className="text-2xl font-semibold mb-4">Experience Highlights</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Featured in Vogue, Elle, and Harper's Bazaar
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Walked for major fashion weeks in Paris, Milan, and London
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Brand ambassador for sustainable fashion brands
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Over 100K engaged followers across social platforms
                </li>
              </ul>
            </div>
          </div>
          
          <div className="lg:pl-8">
            <img
              src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Elena Portrait"
              className="w-full rounded-lg shadow-xl"
            />
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
    <div className="py-20 px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16">Contact</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Let's Work Together</h3>
            <p className="text-lg text-gray-700 mb-8">
              I'm always excited to collaborate on new projects. Whether you're looking for 
              a model for your next campaign, content creator for your brand, or have a creative 
              project in mind, I'd love to hear from you.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-gray-600" />
                <span className="text-lg">elena@example.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <Instagram className="w-6 h-6 text-gray-600" />
                <span className="text-lg">@elena_model</span>
              </div>
            </div>
            
            <div className="mt-8 flex space-x-4">
              <a
                href="mailto:elena@example.com"
                className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                Send Email
              </a>
              <a
                href="https://instagram.com/elena_model"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-black text-black px-8 py-3 rounded-lg hover:bg-black hover:text-white transition-all duration-200"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 resize-none"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">ELENA</h3>
            <p className="text-gray-300">
              Model • Content Creator • Artist
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Portfolio</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Fashion</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Beauty</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bridal</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Experience</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Fashion Weeks</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Film Festivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">UGC Content</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/elena_model"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:elena@example.com"
                className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Elena. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <ImageCarousel />;
      case 'modeling':
        return <ModelingPortfolio />;
      case 'ugc':
        return <UGCSection />;
      case 'about':
        return <AboutSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <ImageCarousel />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
      />
      
      <main className={`transition-all duration-300 ${isMenuOpen ? 'md:mr-64' : 'md:mr-64'}`}>
        {renderSection()}
        {currentSection === 'home' && (
          <div className="bg-white">
            <AboutSection />
            <UGCSection />
            <ContactSection />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
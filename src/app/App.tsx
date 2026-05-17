import { useState, useEffect } from 'react';
import { Menu, X, Facebook, Instagram, Mail, Phone, MapPin, Play } from 'lucide-react';
import { motion } from 'motion/react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './components/ui/dialog';
import TeamPage from './components/TeamPage';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'team'>('home');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [errors, setErrors] = useState({ name: '', email: '', phone: '', eventType: '' });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: ''
  });

  const bannerImages = [
    '/banner/corporate.jpg',
    '/banner/garba.jpg',
    '/banner/Garba.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const validateForm = () => {
    const newErrors = { name: '', email: '', phone: '', eventType: '' };
    let isValid = true;

    // Name validation: letters, spaces, hyphens, apostrophes, min 2 chars
    const nameRegex = /^[a-zA-Z\s\-']{2,}$/;
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (!nameRegex.test(formData.name.trim())) {
      newErrors.name = 'Name must contain only letters, spaces, hyphens, or apostrophes';
      isValid = false;
    }

    // Phone validation: Indian phone number
    const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid Indian phone number (10 digits starting with 6-9, or +91 followed by 10 digits)';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Event type validation
    if (!formData.eventType) {
      newErrors.eventType = 'Please select a service';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const emailForm = new FormData();
    emailForm.append('_subject', 'Taal House Inquiry');
    emailForm.append('_template', 'table');
    emailForm.append('_captcha', 'false');
    emailForm.append('Name', formData.name);
    emailForm.append('Email', formData.email);
    emailForm.append('Phone', formData.phone);
    emailForm.append('Service or Event Type', formData.eventType);
    emailForm.append('Message', formData.message);

    try {
      const response = await fetch('https://formsubmit.co/ajax/neelam@taalhouse.com', {
        method: 'POST',
        body: emailForm,
      });

      if (!response.ok) {
        throw new Error('Unable to send message.');
      }

      setSubmitStatus({ type: 'success', message: 'Your message was sent. Please check your Gmail shortly.' });
      setFormData({ name: '', email: '', phone: '', eventType: '', message: '' });
      setErrors({ name: '', email: '', phone: '', eventType: '' });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'There was an error sending your message. Please try again later.' });
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const teamMembers = [
    {
      name: 'Shivam',
      role: 'Founder',
      image: '/shivam.jpeg',
      profile: 'https://www.instagram.com/shivam_a.k.a_buckzombie/'
    },
    {
      name: 'Sachin',
      role: 'Co-founder and Lead Choreographer',
      image: '/sachin.jpeg',
      profile: 'https://www.instagram.com/sachin_r_ya/'
    },
    {
      name: 'Neelam',
      role: 'Co-founder',
      image: '/neelam.jpeg',
      profile: 'https://www.instagram.com/iridium.here/'
    }
  ];

  const videos = [
    {
      id: 1,
      title: 'Wedding Sangeet Performance',
      thumbnail: 'https://vumbnail.com/1180156908.jpg',
      url: 'https://player.vimeo.com/video/1180156908'
    },
    {
      id: 2,
      title: 'Corporate Flash Mob',
      thumbnail: 'https://vumbnail.com/1180157367.jpg',
      url: 'https://player.vimeo.com/video/1180157367'
    },
    {
      id: 3,
      title: 'Sangeet Performance',
      thumbnail: 'https://vumbnail.com/1180157713.jpg',
      url: 'https://player.vimeo.com/video/1180157713'
    },
    {
      id: 4,
      title: 'Group / Individual Dance Classes',
      thumbnail: 'https://i.pinimg.com/736x/6b/52/6a/6b526abd77989e56df3623c01c6ada09.jpg',
      url: 'https://player.vimeo.com/video/1180158382'
    }
  ];

  const testimonials = [
    {
      name: 'Sneha & Rohan',
      event: 'Wedding',
      text: 'The choreography team made our wedding sangeet unforgettable! Their creativity and professionalism exceeded our expectations. Every guest was talking about the performances!'
    },
    {
      name: 'Amit Patel',
      event: 'Corporate Event',
      text: 'We hired them for our annual corporate gala, and they delivered an outstanding performance. The team was punctual, professional, and the energy they brought was incredible.'
    },
    {
      name: 'Kavita Reddy',
      event: 'Garba Night',
      text: 'Their garba night performance created such an amazing vibe! The dancers were energetic and engaging. Our guests couldn\'t stop dancing. Highly recommended!'
    },
    {
      name: 'Rajesh Kumar',
      event: 'Airport Cultural Event',
      text: 'Professional, talented, and reliable. They performed at our airport\'s cultural event for VIP guests, and the feedback was overwhelmingly positive. Will definitely hire again!'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white backdrop-blur-sm border-b border-blue-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
              <img src="/logo.jpg" alt="Taal House Logo" className="h-16 p-2" />

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('work')} className="text-gray-900 hover:text-[#7a4e36] transition">Our Work</button>
              <button onClick={() => scrollToSection('services')} className="text-gray-900 hover:text-[#7a4e36] transition">Services</button>
              <button onClick={() => setCurrentPage('team')} className="text-gray-900 hover:text-[#7a4e36] transition">Team</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-900 hover:text-[#7a4e36] transition">Testimonials</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-900 hover:text-[#7a4e36] transition">Contact</button>
              <button
                onClick={() => scrollToSection('quote')}
                className="bg-gradient-to-r from-[#88583e] to-[#a08a7a] text-white px-6 py-2 rounded-full hover:from-[#7a4e36] hover:to-[#8f7b6c] transition shadow-lg shadow-[#88583e]/30"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <a
                href="https://wa.me/918920792553"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366]"
                aria-label="Chat on WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <button
                className="text-[#88583e]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 px-4 pt-6">
          <button onClick={() => scrollToSection('work')} className="block w-full text-left py-3 text-gray-800 hover:text-blue-600 text-lg">Our Work</button>
          <button onClick={() => scrollToSection('services')} className="block w-full text-left py-3 text-gray-800 hover:text-blue-600 text-lg">Services</button>
          <button onClick={() => { setCurrentPage('team'); setIsMenuOpen(false); }} className="block w-full text-left py-3 text-gray-800 hover:text-blue-600 text-lg">Team</button>
          <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left py-3 text-gray-800 hover:text-blue-600 text-lg">Testimonials</button>
          <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-3 text-gray-800 hover:text-blue-600 text-lg">Contact</button>
          <button
            onClick={() => scrollToSection('quote')}
            className="w-full mt-4 bg-gradient-to-r from-[#88583e] to-[#a08a7a] text-white py-3 rounded-full font-semibold text-lg shadow-lg shadow-[#88583e]/20"
          >
            Book Now
          </button>
        </div>
      )}

      {/* Team Page */}
      {currentPage === 'team' && (
        <TeamPage
          teamMembers={teamMembers}
          onBack={() => setCurrentPage('home')}
        />
      )}

      {currentPage === 'home' && <>
      {/* Banner Carousel */}
      <section className="relative h-[520px] md:h-[500px] overflow-hidden">
        <div className="relative w-full h-full">
          {bannerImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            >
              <img
                src={image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30"></div>
            </motion.div>
          ))}
        </div>

        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-center z-10 px-4 sm:px-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left text-white w-[80%] sm:w-[60%]"
          >
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-white drop-shadow-lg" style={{ fontSize: '24px' }}>
                Learn, Perform &amp; Celebrate with Taal House
              </h1>
              <p className="text-gray-100 drop-shadow-lg" style={{ fontSize: '16px' }}>
                In-person choreography classes across India, online training worldwide, and professional performance teams for weddings, corporate events &amp; cultural celebrations.
              </p>
              <div>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-white text-black font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition shadow-lg"
                  style={{ fontSize: '16px' }}
                >
                  Contact Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-blue-500' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + bannerImages.length) % bannerImages.length)}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1.5 sm:p-2 rounded-full hover:bg-black/70 transition z-20"
        >
          ‹
        </button>
        <button
          onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length)}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1.5 sm:p-2 rounded-full hover:bg-black/70 transition z-20"
        >
          ›
        </button>
      </section>

      {/* Video Gallery - MOVED TO TOP */}
      <section id="work" className="py-12 md:py-20 bg-gradient-to-b from-[#88583e] to-[#a08a7a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl mb-4 text-white">
              Watch Our Performances
            </h2>
            <p className="hidden md:block text-white text-lg">See the energy and passion we bring to every event</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                className="relative group cursor-pointer rounded-xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-slate-900/50 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <div className="bg-blue-600 rounded-full p-4">
                    <Play size={48} className="text-white" fill="white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4">
                  <p className="text-white font-semibold">{video.title}</p>
                </div>
                <button
                  onClick={() => setSelectedVideo(video)}
                  className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-700 transition"
                >
                  Watch Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote" className="py-20 bg-gradient-to-b from-[#88583e] to-[#a08a7a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl mb-4 text-white">
              Get a Quote
            </h2>
            <p className="text-gray-300 text-lg">Tell us about your event or learning goals, and we'll get back to you with a personalized quote</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/95 p-8 md:p-12 rounded-2xl border border-[#88583e]/30 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-900 mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#88583e] text-black placeholder-gray-500"
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-gray-900 mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^+\d\s\-]/g, ''); // Allow only digits, +, space, hyphen
                      setFormData({ ...formData, phone: value });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#88583e] text-black placeholder-gray-500"
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
              <div>
                <label className="block text-gray-900 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#88583e] text-black placeholder-gray-500"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-gray-900 mb-2">What are you looking for? *</label>
                <select
                  required
                  value={formData.eventType}
                  onChange={(e) => {
                    setFormData({ ...formData, eventType: e.target.value });
                    if (errors.eventType) setErrors({ ...errors, eventType: '' });
                  }}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#88583e] text-black"
                >
                  <option value="">Select service</option>
                  <option value="choreography-wedding">Choreography for Wedding</option>
                  <option value="choreography-personal">Personal Dance Classes</option>
                  <option value="choreography-group">Group Choreography Classes</option>
                  <option value="performance-wedding">Wedding Performance Team</option>
                  <option value="performance-corporate">Corporate Event Performance</option>
                  <option value="performance-garba">Garba Night Performers</option>
                  <option value="performance-cultural">Cultural Event Performance</option>
                  <option value="other">Other</option>
                </select>
                {errors.eventType && <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>}
              </div>
              <div>
                <label className="block text-gray-900 mb-2">Tell us more about your requirements</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#88583e] text-black placeholder-gray-500"
                  placeholder="Event date, location, number of people, or any specific requirements..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#88583e] to-[#a08a7a] text-white py-4 rounded-lg hover:from-[#7a4e36] hover:to-[#8f7b6c] transition shadow-lg shadow-[#88583e]/30 text-lg font-semibold disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Get Your Free Quote'}
              </button>
              {submitStatus && (
                <p className={`mt-4 text-sm ${submitStatus.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {submitStatus.message}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-[#88583e] to-[#a08a7a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl text-center mb-6 text-white">
            Our Services
          </h2>
          <p className="text-center text-white text-lg mb-16 max-w-3xl mx-auto">
            From teaching you to dance for your special moments to providing professional performance teams for your events
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 p-8 rounded-xl shadow-lg border border-blue-500/30 backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: 'rgb(217 70 239 / 0.6)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-5xl mb-4">💃</div>
              <h3 className="text-2xl mb-4 text-white">Choreography Classes</h3>
              <p className="text-gray-700">
                Personal choreography training for individuals, couples, and groups. Perfect for wedding sangeet, special performances, or just learning to dance. Available in-person across India and online worldwide.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-purple-900/40 to-orange-900/40 p-8 rounded-xl shadow-lg border border-purple-500/30 backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: 'rgb(168 85 247 / 0.6)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-5xl mb-4">🎭</div>
              <h3 className="text-2xl mb-4 text-white">Event Performances</h3>
              <p className="text-gray-700">
                Professional dance teams for weddings, corporate events, and cultural celebrations. From sangeet performances to corporate galas, we bring energy and entertainment to your event.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-orange-900/40 to-fuchsia-900/40 p-8 rounded-xl shadow-lg border border-orange-500/30 backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: 'rgb(249 115 22 / 0.6)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl mb-4 text-white">Special Performances</h3>
              <p className="text-gray-700">
                Specialized performance teams for garba nights, cultural festivals, VIP entries, airport events, and more. Our dancers create the perfect atmosphere and vibe for any occasion.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-[#88583e] to-[#a08a7a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl text-center mb-16 text-white">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-blue-900/20 to-slate-900/20 p-8 rounded-xl shadow-lg border border-blue-500/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ borderColor: 'rgb(217 70 239 / 0.4)' }}
              >
                <div className="text-4xl text-fuchsia-400 mb-4">"</div>
                <p className="text-white mb-6">{testimonial.text}</p>
                <div className="border-t border-gray-300 pt-4">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-gray-300 text-sm">{testimonial.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-[#88583e] to-[#a08a7a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl text-center mb-16 text-white">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-900 mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#88583e] text-black placeholder-gray-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#88583e] text-black placeholder-gray-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#88583e] text-black placeholder-gray-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 mb-2">Event Type *</label>
                  <select
                    required
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#88583e] text-black"
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="garba">Garba Night</option>
                    <option value="cultural">Cultural Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-900 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#88583e] text-black placeholder-gray-500"
                    placeholder="Tell us about your event..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#88583e] to-[#a08a7a] text-white py-3 rounded-lg hover:from-[#7a4e36] hover:to-[#8f7b6c] transition shadow-lg shadow-[#88583e]/30 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {submitStatus && (
                  <p className={`mt-4 text-sm ${submitStatus.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {submitStatus.message}
                  </p>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl mb-6 text-white">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-[#88583e] mt-1" size={24} />
                    <div>
                      <p className="font-semibold text-white">Address</p>
                      <p className="text-gray-300">The House of JD Zez Academy, Trilok Puri, New Delhi 110091</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="text-[#88583e] mt-1" size={24} />
                    <div>
                      <p className="font-semibold text-white">Phone</p>
                      <p className="text-gray-300">+91 93183 44951</p>
                      <p className="text-gray-300">+91 89207 92553</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="text-[#88583e] mt-1" size={24} />
                    <div>
                      <p className="font-semibold text-white">Email</p>
                      <p className="text-gray-300">team@taalhouse.com</p>
                      <p className="text-gray-300">neelam@taalhouse.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/95 p-6 rounded-xl border border-[#88583e]/30">
                <h4 className="text-xl mb-3 text-gray-900">Business Hours</h4>
                <p className="text-gray-700">Monday - Saturday: 10:00 AM - 8:00 PM</p>
                <p className="text-gray-700">Sunday: 11:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold text-gray-900 mb-4">
                <img src="/logo.jpg" alt="Taal House Logo" className="h-16 p-2 m-auto" />
              </div>
              <p className="text-gray-700">Making every event memorable through the art of dance</p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('work')} className="block w-full text-gray-700 hover:text-[#88583e] transition">Our Work</button>
                <button onClick={() => scrollToSection('services')} className="block w-full text-gray-700 hover:text-[#88583e] transition">Services</button>
                <button onClick={() => setCurrentPage('team')} className="block w-full text-gray-700 hover:text-[#88583e] transition">Team</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-gray-700 hover:text-[#88583e] transition">Contact</button>
              </div>
            </div>

            {/* Social Media */}
            <div className="text-center md:text-right">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Connect With Us</h4>
              <div className="flex justify-center md:justify-end gap-4 mb-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61567542682776"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 text-white p-4 rounded-full hover:bg-gray-800 transition shadow-lg transform hover:scale-110"
                >
                  <Facebook size={28} />
                </a>
                <a
                  href="https://www.instagram.com/thetaalhouse/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 text-white p-4 rounded-full hover:bg-gray-800 transition shadow-lg transform hover:scale-110"
                >
                  <Instagram size={28} />
                </a>
              </div>
              <p className="text-gray-700 text-sm">Follow us for updates & videos!</p>
            </div>
          </div>

          <div className="border-t border-blue-500/20 pt-8 text-center">
            <p className="text-gray-700">© 2026 Taal House. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </>}

      {/* Video Player Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl w-full bg-black border-blue-500/30">
          <DialogHeader>
            <DialogTitle className="text-white text-center">
              {selectedVideo?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            {selectedVideo && (
              <iframe
                src={selectedVideo.url}
                title={selectedVideo.title}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

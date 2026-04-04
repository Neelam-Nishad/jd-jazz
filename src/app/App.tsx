import { useState } from 'react';
import { Menu, X, Facebook, Instagram, Mail, Phone, MapPin, Play } from 'lucide-react';
import { motion } from 'motion/react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './components/ui/dialog';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: ''
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const emailForm = new FormData();
    emailForm.append('_subject', 'DanceVibes Inquiry');
    emailForm.append('_template', 'table');
    emailForm.append('_captcha', 'false');
    emailForm.append('Name', formData.name);
    emailForm.append('Email', formData.email);
    emailForm.append('Phone', formData.phone);
    emailForm.append('Service or Event Type', formData.eventType);
    emailForm.append('Message', formData.message);

    try {
      const response = await fetch('https://formsubmit.co/ajax/kashyapneelam997@gmail.com', {
        method: 'POST',
        body: emailForm,
      });

      if (!response.ok) {
        throw new Error('Unable to send message.');
      }

      setSubmitStatus({ type: 'success', message: 'Your message was sent. Please check your Gmail shortly.' });
      setFormData({ name: '', email: '', phone: '', eventType: '', message: '' });
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
      thumbnail: 'https://vumbnail.com/1180158382.jpg',
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
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-fuchsia-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-fuchsia-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              DanceVibes
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('work')} className="text-gray-300 hover:text-fuchsia-400 transition">Our Work</button>
              <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-fuchsia-400 transition">Services</button>
              <button onClick={() => scrollToSection('team')} className="text-gray-300 hover:text-fuchsia-400 transition">Team</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-300 hover:text-fuchsia-400 transition">Testimonials</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-fuchsia-400 transition">Contact</button>
              <button
                onClick={() => scrollToSection('quote')}
                className="bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-fuchsia-600 hover:to-purple-700 transition shadow-lg shadow-fuchsia-500/30"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-fuchsia-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 bg-black/95">
              <button onClick={() => scrollToSection('work')} className="block w-full text-left py-2 text-gray-300 hover:text-fuchsia-400">Our Work</button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left py-2 text-gray-300 hover:text-fuchsia-400">Services</button>
              <button onClick={() => scrollToSection('team')} className="block w-full text-left py-2 text-gray-300 hover:text-fuchsia-400">Team</button>
              <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left py-2 text-gray-300 hover:text-fuchsia-400">Testimonials</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-gray-300 hover:text-fuchsia-400">Contact</button>
              <button onClick={() => scrollToSection('quote')} className="block w-full text-left py-2 text-fuchsia-400 hover:text-fuchsia-300 font-semibold">Book Now</button>
            </div>
          )}
        </div>
      </nav>

      {/* Availability Banner */}
      <section className="pt-16 bg-gradient-to-r from-fuchsia-900/80 via-purple-900/80 to-orange-900/80 border-b border-fuchsia-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left md:text-center"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-6 text-white">
              <div className="flex items-center gap-3">
                <div className="bg-fuchsia-500 p-3 rounded-full">
                  <MapPin size={24} />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-300">In-Person Classes</p>
                  <p className="text-lg font-semibold">Available Across India</p>
                </div>
              </div>
              <div className="hidden md:block h-12 w-px bg-fuchsia-500/30"></div>
              <div className="flex items-center gap-3">
                <div className="bg-purple-500 p-3 rounded-full">
                  <Play size={24} />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-300">Online Choreography</p>
                  <p className="text-lg font-semibold">Teach Worldwide</p>
                </div>
              </div>
              <div className="hidden md:block h-12 w-px bg-fuchsia-500/30"></div>
              <div className="flex items-center gap-3">
                <div className="bg-orange-500 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-300">Event Performances</p>
                  <p className="text-lg font-semibold">Professional Dancers</p>
                </div>
              </div>
            </div>
            <p className="mt-6 text-gray-300 text-lg max-w-3xl mx-auto">
              We teach choreography to individuals and groups, and provide professional performance teams for weddings, corporate events, and cultural celebrations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Gallery - MOVED TO TOP */}
      <section id="work" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl mb-4 bg-gradient-to-r from-fuchsia-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
              Watch Our Performances
            </h2>
            <p className="text-gray-400 text-lg">See the energy and passion we bring to every event</p>
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
                <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-900/90 via-purple-900/50 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <div className="bg-fuchsia-500 rounded-full p-4">
                    <Play size={48} className="text-white" fill="white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4">
                  <p className="text-white font-semibold">{video.title}</p>
                </div>
                <button
                  onClick={() => setSelectedVideo(video)}
                  className="absolute top-2 right-2 bg-fuchsia-500 text-white text-xs px-3 py-1 rounded-full hover:bg-fuchsia-600 transition"
                >
                  Watch Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote" className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl mb-4 bg-gradient-to-r from-fuchsia-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
              Get a Quote
            </h2>
            <p className="text-gray-400 text-lg">Tell us about your event or learning goals, and we'll get back to you with a personalized quote</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-fuchsia-900/20 to-purple-900/20 p-8 md:p-12 rounded-2xl border border-fuchsia-500/30 backdrop-blur-sm shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-fuchsia-500/30 rounded-lg focus:outline-none focus:border-fuchsia-500 text-white placeholder-gray-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-fuchsia-500/30 rounded-lg focus:outline-none focus:border-fuchsia-500 text-white placeholder-gray-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900 border border-fuchsia-500/30 rounded-lg focus:outline-none focus:border-fuchsia-500 text-white placeholder-gray-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">What are you looking for? *</label>
                <select
                  required
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900 border border-fuchsia-500/30 rounded-lg focus:outline-none focus:border-fuchsia-500 text-white"
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
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Tell us more about your requirements</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-900 border border-fuchsia-500/30 rounded-lg focus:outline-none focus:border-fuchsia-500 text-white placeholder-gray-500"
                  placeholder="Event date, location, number of people, or any specific requirements..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white py-4 rounded-lg hover:from-fuchsia-600 hover:to-purple-700 transition shadow-lg shadow-fuchsia-500/30 text-lg font-semibold disabled:cursor-not-allowed disabled:opacity-70"
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
      <section id="services" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl text-center mb-6 bg-gradient-to-r from-fuchsia-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-center text-gray-400 text-lg mb-16 max-w-3xl mx-auto">
            From teaching you to dance for your special moments to providing professional performance teams for your events
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gradient-to-br from-fuchsia-900/40 to-purple-900/40 p-8 rounded-xl shadow-lg border border-fuchsia-500/30 backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: 'rgb(217 70 239 / 0.6)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-5xl mb-4">💃</div>
              <h3 className="text-2xl mb-4 text-fuchsia-300">Choreography Classes</h3>
              <p className="text-gray-300">
                Personal choreography training for individuals, couples, and groups. Perfect for wedding sangeet, special performances, or just learning to dance. Available in-person across India and online worldwide.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-purple-900/40 to-orange-900/40 p-8 rounded-xl shadow-lg border border-purple-500/30 backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: 'rgb(168 85 247 / 0.6)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-5xl mb-4">🎭</div>
              <h3 className="text-2xl mb-4 text-purple-300">Event Performances</h3>
              <p className="text-gray-300">
                Professional dance teams for weddings, corporate events, and cultural celebrations. From sangeet performances to corporate galas, we bring energy and entertainment to your event.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-orange-900/40 to-fuchsia-900/40 p-8 rounded-xl shadow-lg border border-orange-500/30 backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: 'rgb(249 115 22 / 0.6)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl mb-4 text-orange-300">Special Performances</h3>
              <p className="text-gray-300">
                Specialized performance teams for garba nights, cultural festivals, VIP entries, airport events, and more. Our dancers create the perfect atmosphere and vibe for any occasion.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl text-center mb-16 bg-gradient-to-r from-fuchsia-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <a href={member.profile} target="_blank" rel="noopener noreferrer" className="block group">
                  <div className="relative mb-4 overflow-hidden rounded-full w-48 h-48 mx-auto border-4 border-fuchsia-500/30 group-hover:border-fuchsia-500 transition-all duration-300 shadow-lg shadow-fuchsia-500/20">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>
                  <h3 className="text-xl mb-2 text-white">{member.name}</h3>
                  <p className="text-fuchsia-400">{member.role}</p>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl text-center mb-16 bg-gradient-to-r from-fuchsia-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-fuchsia-900/20 to-purple-900/20 p-8 rounded-xl shadow-lg border border-fuchsia-500/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ borderColor: 'rgb(217 70 239 / 0.4)' }}
              >
                <div className="text-4xl text-fuchsia-400 mb-4">"</div>
                <p className="text-gray-300 mb-6">{testimonial.text}</p>
                <div className="border-t border-fuchsia-500/30 pt-4">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-fuchsia-400 text-sm">{testimonial.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl text-center mb-16 bg-gradient-to-r from-fuchsia-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-fuchsia-500/30 rounded-lg focus:outline-none focus:border-fuchsia-500 text-white placeholder-gray-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-fuchsia-500/30 rounded-lg focus:outline-none focus:border-fuchsia-500 text-white placeholder-gray-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-fuchsia-500/30 rounded-lg focus:outline-none focus:border-fuchsia-500 text-white placeholder-gray-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Event Type *</label>
                  <select
                    required
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-fuchsia-500/30 rounded-lg focus:outline-none focus:border-fuchsia-500 text-white"
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
                  <label className="block text-gray-300 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-900 border border-fuchsia-500/30 rounded-lg focus:outline-none focus:border-fuchsia-500 text-white placeholder-gray-500"
                    placeholder="Tell us about your event..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white py-3 rounded-lg hover:from-fuchsia-600 hover:to-purple-700 transition shadow-lg shadow-fuchsia-500/30 disabled:cursor-not-allowed disabled:opacity-70"
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
                    <MapPin className="text-fuchsia-400 mt-1" size={24} />
                    <div>
                      <p className="font-semibold text-white">Address</p>
                      <p className="text-gray-400">The House of JD Zez Academy, Trilok Puri, New Delhi 110091</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="text-fuchsia-400 mt-1" size={24} />
                    <div>
                      <p className="font-semibold text-white">Phone</p>
                      <p className="text-gray-400">+91 87004 31822</p>
                      <p className="text-gray-400">+91 86840 21907</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="text-fuchsia-400 mt-1" size={24} />
                    <div>
                      <p className="font-semibold text-white">Email</p>
                      <p className="text-gray-400">info@dancevibes.com</p>
                      <p className="text-gray-400">bookings@dancevibes.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-fuchsia-900/20 to-purple-900/20 p-6 rounded-xl border border-fuchsia-500/30">
                <h4 className="text-xl mb-3 text-white">Business Hours</h4>
                <p className="text-gray-300">Monday - Saturday: 10:00 AM - 8:00 PM</p>
                <p className="text-gray-300">Sunday: 11:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-fuchsia-500/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold bg-gradient-to-r from-fuchsia-500 via-purple-500 to-orange-500 bg-clip-text text-transparent mb-4">
                DanceVibes
              </div>
              <p className="text-gray-400">Making every event memorable through the art of dance</p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('work')} className="block w-full text-gray-400 hover:text-fuchsia-400 transition">Our Work</button>
                <button onClick={() => scrollToSection('services')} className="block w-full text-gray-400 hover:text-fuchsia-400 transition">Services</button>
                <button onClick={() => scrollToSection('team')} className="block w-full text-gray-400 hover:text-fuchsia-400 transition">Team</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-gray-400 hover:text-fuchsia-400 transition">Contact</button>
              </div>
            </div>

            {/* Social Media */}
            <div className="text-center md:text-right">
              <h4 className="text-xl font-semibold text-white mb-4">Connect With Us</h4>
              <div className="flex justify-center md:justify-end gap-4 mb-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white p-4 rounded-full hover:from-fuchsia-600 hover:to-purple-700 transition shadow-lg shadow-fuchsia-500/30 transform hover:scale-110"
                >
                  <Facebook size={28} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-purple-500 to-orange-600 text-white p-4 rounded-full hover:from-purple-600 hover:to-orange-700 transition shadow-lg shadow-purple-500/30 transform hover:scale-110"
                >
                  <Instagram size={28} />
                </a>
              </div>
              <p className="text-gray-400 text-sm">Follow us for updates & videos!</p>
            </div>
          </div>

          <div className="border-t border-fuchsia-500/20 pt-8 text-center">
            <p className="text-gray-500">© 2026 DanceVibes. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Video Player Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl w-full bg-black border-fuchsia-500/30">
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
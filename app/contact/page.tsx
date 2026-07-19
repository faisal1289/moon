'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Menu, X } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Apps', href: '/apps' },
    { name: 'Requests', href: '/request' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! ✉️', {
      description: 'We\'ll get back to you within 24 hours.',
      duration: 4000,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-12 relative overflow-x-hidden">
      
      {/* Background Fade */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* ===== NAVBAR WITH MOBILE SUPPORT ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 border-b border-[#1A1A1A] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-xl">App<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Clone</span></span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-all duration-300 font-medium text-sm lg:text-base ${
                    isActive
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'
                      : 'text-gray-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full px-4 lg:px-6 text-sm shadow-lg shadow-blue-500/20 hover:shadow-purple-500/40 transition-all duration-300">
              Sign In
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-b border-[#1A1A1A] px-4 py-4"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`transition-all duration-300 font-medium text-sm ${
                      isActive
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'
                        : 'text-gray-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full px-6 text-sm shadow-lg shadow-blue-500/20 hover:shadow-purple-500/40 transition-all duration-300 w-full">
                Sign In
              </Button>
            </div>
          </motion.div>
        )}
      </nav>

      <div className="max-w-4xl mx-auto px-4">
        <Link href="/">
          <Button variant="ghost" className="text-gray-400 hover:text-white mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-gray-400 mb-8">Have questions? We'd love to hear from you.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card rounded-xl p-6 text-center border border-[#1A1A1A] card-hover">
              <Mail className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white">Email</h3>
              <p className="text-sm text-gray-400">info@appclone.com</p>
            </div>
            <div className="glass-card rounded-xl p-6 text-center border border-[#1A1A1A] card-hover">
              <Phone className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white">Phone</h3>
              <p className="text-sm text-gray-400">+1 234 567 890</p>
            </div>
            <div className="glass-card rounded-xl p-6 text-center border border-[#1A1A1A] card-hover">
              <MapPin className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white">Address</h3>
              <p className="text-sm text-gray-400">123 Tech Park, Silicon Valley</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass-card rounded-xl p-4 sm:p-6 border border-[#1A1A1A]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <Input 
                  placeholder="Your name" 
                  required
                  className="border-[#2D2D2D] bg-[#1A1A1A] text-white focus:border-purple-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <Input 
                  placeholder="your@email.com" 
                  type="email"
                  required
                  className="border-[#2D2D2D] bg-[#1A1A1A] text-white focus:border-purple-500/50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <Textarea 
                placeholder="Your message..."
                required
                rows={5}
                className="border-[#2D2D2D] bg-[#1A1A1A] text-white focus:border-purple-500/50 resize-none"
              />
            </div>
            <Button 
              type="submit" 
              className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-500/20 hover:shadow-purple-500/40 transition-all duration-300 w-full sm:w-auto"
            >
              Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
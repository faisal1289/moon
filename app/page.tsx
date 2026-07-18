'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Star, 
  ShoppingCart, 
  ArrowRight, 
  Users, 
  Shield,
  Sparkles,
  Zap,
  Code,
  Award
} from 'lucide-react';

const apps = [
  { id: 1, name: 'Uber Clone', category: 'Transport', price: '₹299', rating: 4.8, desc: 'Complete ride-hailing platform with real-time tracking' },
  { id: 2, name: 'Zomato Clone', category: 'Food', price: '₹349', rating: 4.7, desc: 'Food delivery app with restaurant discovery' },
  { id: 3, name: 'Amazon Clone', category: 'Shopping', price: '₹399', rating: 4.9, desc: 'E-commerce platform with cart and payments' },
  { id: 4, name: 'Netflix Clone', category: 'Entertainment', price: '₹279', rating: 4.5, desc: 'Streaming platform with subscriptions' },
  { id: 5, name: 'WhatsApp Clone', category: 'Communication', price: '₹259', rating: 4.8, desc: 'Real-time messaging with voice/video calls' },
  { id: 6, name: 'Swiggy Clone', category: 'Food', price: '₹329', rating: 4.6, desc: 'On-demand food delivery with live tracking' },
];

export default function Home() {
  const pathname = usePathname();
  
  // Request Form State
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestForm, setRequestForm] = useState({
    userName: '',
    appName: '',
    description: '',
  });
  
  const handleBuy = (name: string) => {
    toast.success(`${name} added to cart! 🎉`, {
      description: 'Your app has been added successfully.',
      duration: 3000,
    });
  };

  // Request Form Submit Handler
  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestForm.userName || !requestForm.appName || !requestForm.description) {
      toast.error('Please fill all fields', {
        description: 'All fields are required.',
        duration: 3000,
      });
      return;
    }

    toast.success('Request submitted! 🎉', {
      description: `${requestForm.appName} has been added to our list.`,
      duration: 4000,
    });

    setRequestForm({ userName: '', appName: '', description: '' });
    setShowRequestForm(false);
  };

  // Navbar Links Data
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Apps', href: '/apps' },
    { name: 'Requests', href: '/request' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative">
      
      {/* Background Fade Effect - Blue + Purple */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-blue-500/3 to-purple-500/3 blur-3xl"></div>
      </div>
      
      {/* ===== NAVBAR WITH ACTIVE LINK ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 border-b border-[#1A1A1A] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-xl">App<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Clone</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-all duration-300 font-medium ${
                    isActive
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'
                      : 'text-gray-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full px-6 shadow-lg shadow-blue-500/20 hover:shadow-purple-500/40 transition-all duration-300">
              Sign In
            </Button>
          </div>
        </div>
      </nav>


      {/* ===== HERO SECTION - Full Screen Video Background ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        
        {/* 🎬 FULL SCREEN VIDEO BACKGROUND */}
        <div className="absolute inset-0">
          <video
            src="/videos/Hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Glow Effects - Blue + Purple */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* ===== LEFT SIDE - Text with Typing Animation ===== */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 px-4 py-2 rounded-full text-sm border border-blue-500/30 mb-6"
              >
                <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></span>
                Premium Software. Honest Pricing.
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              >
                Powerful Software
                <br />
                <span className="gradient-text">Honest Pricing</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="space-y-4 text-gray-200 text-base md:text-lg leading-relaxed mb-8"
              >
                <p>
                  Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold">AppClone</span>
                </p>
                <p>
                  Your one-stop destination for premium, feature-rich applications designed to 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 font-medium"> elevate your business</span> without burning a hole in your pocket.
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="text-gray-200 text-base md:text-lg leading-relaxed mb-6"
              >
                Our platform is built with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 font-medium">high-level security</span> to ensure 
                your data and your users' data stay protected at all times. We take user feedback seriously – 
                we actively listen and build new features based on what our community wants.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
                className="flex items-center justify-start gap-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20 mb-8"
              >
                <p className="text-green-300 font-medium text-sm md:text-base">
                  <span className="font-bold">100% Ad-Free Experience</span> – No interruptions, just seamless performance.
                </p>
              </motion.div>

              {/* ===== HERO BUTTONS WITH NAVIGATION ===== */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.0 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                <Link href="/apps">
                  <Button className="btn-primary px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-500/30 hover:shadow-purple-500/50 transition-all duration-300">
                    Explore Our Apps
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full hover:border-purple-500/30 transition-all duration-300">
                    Request a Custom App
                  </Button>
                </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.3 }}
                className="flex flex-wrap gap-8 pt-8 border-t border-white/10"
              >
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">4.8/5</span>
                  <span className="text-gray-400">User Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" />
                  <span className="font-semibold">50+</span>
                  <span className="text-gray-400">Ready Apps</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="font-semibold">100%</span>
                  <span className="text-gray-400">Ad-Free</span>
                </div>
              </motion.div>
            </motion.div>

            {/* ===== RIGHT SIDE - Full Image (No Card) ===== */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-2xl">
                <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl"></div>
                <img
                  src="/images/Right.png"
                  alt="App Clone Preview"
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ===== APP CARDS ===== */}
      <section className="max-w-7xl mx-auto px-4 py-12 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Popular App Solutions</h2>
            <p className="text-gray-400 text-sm mt-1">Top-rated premium apps at unbeatable prices</p>
          </div>
          <Link href="/apps">
            <Button variant="outline" className="border-[#2D2D2D] text-gray-400 hover:text-white hover:bg-white/5 rounded-full">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Card className="glass-card card-hover border-[#1A1A1A] hover:border-purple-500/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-blue-500/20">
                        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{app.name[0]}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{app.name}</h3>
                        <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-gray-300 border-0 text-xs">
                          {app.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-2 py-1 rounded">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-white">{app.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{app.desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#1A1A1A]">
                    <Button 
                      variant="link" 
                      className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300 transition-all duration-300 p-0 h-auto text-sm font-medium"
                      onClick={() => {
                        toast.info(`Loading reviews for ${app.name}...`, {
                          description: 'Opening reviews page.',
                          duration: 2000,
                        });
                      }}
                    >
                      See All Reviews
                    </Button>
                    <Button 
                      onClick={() => {
                        toast.success(`${app.name} download started! 📥`, {
                          description: 'Your download will begin shortly.',
                          duration: 3000,
                        });
                      }} 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white h-10 px-6 rounded-full text-sm font-medium shadow-lg shadow-blue-500/20 hover:shadow-purple-500/40 transition-all duration-300"
                    >
                      Download Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== REQUEST SECTION ===== */}
      <section className="max-w-7xl mx-auto px-4 py-16 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border border-blue-500/20 p-8 lg:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            
            {/* ===== LEFT SIDE - Request Button ===== */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 px-4 py-2 rounded-full text-sm border border-blue-500/30 mb-4">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></span>
                Community Requests
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Didn't Find Your App?
              </h2>
              <p className="text-gray-400 text-lg max-w-md mb-6">
                Request a custom app and our team will build it for you. 
                The app with the most requests gets built first!
              </p>
              
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 text-lg mt-0.5">📌</span>
                  <div>
                    <p className="text-yellow-300 text-sm font-medium">Important Note:</p>
                    <p className="text-yellow-200/80 text-sm">
                      Please do not create new requests for apps that already exist in the list. 
                      Instead, <span className="text-yellow-300 font-semibold">Vote</span> on existing 
                      requests to help us prioritize development. 
                      We'll build the app with <span className="text-yellow-300 font-semibold">1000+</span> requests first!
                    </p>
                  </div>
                </div>
              </div>

              {/* Request Button - Opens Form */}
              <Button 
                onClick={() => setShowRequestForm(!showRequestForm)}
                className="btn-primary px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-500/30 hover:shadow-purple-500/50 transition-all duration-300"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                {showRequestForm ? 'Close Form' : 'Request New App'}
              </Button>

              <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" />
                  1,247 Total Requests
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                  45+ Apps Ready
                </span>
              </div>
            </div>

            {/* ===== RIGHT SIDE - 3 Vertical Requests ===== */}
            <div className="space-y-4">
              
              {/* Request 1 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="glass-card rounded-xl p-4 border border-[#1A1A1A] hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white">Instagram Clone</h3>
                      <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 border-0 text-xs">Trending</Badge>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2">Full-featured social media app with reels, stories, and live streaming</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        234 Requests
                      </span>
                      <span className="flex items-center gap-1 text-green-400">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                        Building Soon
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-[#2D2D2D] text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 hover:border-purple-500/50 transition-all whitespace-nowrap"
                    onClick={() => toast.success('Vote added! 🙌', { description: 'Request count increased by 1' })}
                  >
                    Vote
                  </Button>
                </div>
              </motion.div>

              {/* Request 2 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="glass-card rounded-xl p-4 border border-[#1A1A1A] hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white">Uber Eats Clone</h3>
                      <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-0 text-xs">In Progress</Badge>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2">Food delivery platform with real-time tracking and restaurant management</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        189 Requests
                      </span>
                      <span className="flex items-center gap-1 text-yellow-400">
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
                        Under Development
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-[#2D2D2D] text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 hover:border-purple-500/50 transition-all whitespace-nowrap"
                    onClick={() => toast.success('Vote added! 🙌', { description: 'Request count increased by 1' })}
                  >
                    Vote
                  </Button>
                </div>
              </motion.div>

              {/* Request 3 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="glass-card rounded-xl p-4 border border-[#1A1A1A] hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white">Spotify Clone</h3>
                      <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border-0 text-xs">Popular</Badge>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2">Music streaming app with playlists, offline mode, and social sharing</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        156 Requests
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        Needs 1000+ Requests
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-[#2D2D2D] text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 hover:border-purple-500/50 transition-all whitespace-nowrap"
                    onClick={() => toast.success('Vote added! 🙌', { description: 'Request count increased by 1' })}
                  >
                    Vote
                  </Button>
                </div>
              </motion.div>

              {/* View All Requests - Navigate to /request */}
              <div className="text-center pt-2">
                <Link href="/requests">
                  <Button variant="link" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300 transition-colors">
                    View All Requests
                  </Button>
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* ===== REQUEST FORM (Hidden by default) ===== */}
        {showRequestForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 overflow-hidden"
          >
            <div className="glass-card rounded-xl p-6 border border-[#1A1A1A] max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-4">Submit a Request</h3>
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                  <Input
                    placeholder="Enter your name"
                    value={requestForm.userName}
                    onChange={(e) => setRequestForm({...requestForm, userName: e.target.value})}
                    className="border-[#2D2D2D] bg-[#1A1A1A] text-white focus:border-purple-500/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">App Name</label>
                  <Input
                    placeholder="What app do you want?"
                    value={requestForm.appName}
                    onChange={(e) => setRequestForm({...requestForm, appName: e.target.value})}
                    className="border-[#2D2D2D] bg-[#1A1A1A] text-white focus:border-purple-500/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <Textarea
                    placeholder="Describe the app features you need..."
                    value={requestForm.description}
                    onChange={(e) => setRequestForm({...requestForm, description: e.target.value})}
                    rows={4}
                    className="border-[#2D2D2D] bg-[#1A1A1A] text-white focus:border-purple-500/50 resize-none"
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white w-full rounded-full py-6 text-lg shadow-lg shadow-blue-500/20 hover:shadow-purple-500/40 transition-all duration-300"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Submit Request
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[#1A1A1A] py-8 mt-8 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2026 AppClone. All rights reserved. Built with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">❤️</span></p>
        </div>
      </footer>
    </div>
  );
}
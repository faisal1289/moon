'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  ArrowLeft, 
  Shield, 
  Zap, 
  Users, 
  Award, 
  Code, 
  Rocket, 
  Star,
  CheckCircle,
  TrendingUp,
  Sparkles,
  ShoppingBag,
  Building2,
  Crown,
  Menu,
  X
} from 'lucide-react';

export default function AboutPage() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Apps', href: '/apps' },
    { name: 'Requests', href: '/request' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-12 relative overflow-x-hidden">
      
      {/* Background Fade */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-blue-500/3 to-purple-500/3 blur-3xl"></div>
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

      <div className="max-w-6xl mx-auto px-4">
        
        {/* ===== BACK BUTTON ===== */}
        <Link href="/">
          <Button variant="ghost" className="text-gray-400 hover:text-white mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* ===== HERO SECTION ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 px-4 py-2 rounded-full text-sm border border-blue-500/30 mb-6">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></span>
            About Us
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Premium Apps
            <br />
            <span className="gradient-text">At Pocket-Friendly Prices</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We make premium apps accessible to everyone — whether you want to use a ready app 
            or build your own custom app business.
          </p>
        </motion.div>

        {/* ===== MISSION SECTION ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="glass-card rounded-2xl p-6 border border-[#1A1A1A] text-center card-hover">
            <Rocket className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
            <p className="text-gray-400 text-sm">
              To make premium apps affordable for everyone — no middlemen, 
              no markup, just quality at fair prices.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-[#1A1A1A] text-center card-hover">
            <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Our Promise</h3>
            <p className="text-gray-400 text-sm">
              Transparent pricing, no hidden fees, high-level security, and 
              apps that actually work — built for you.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-[#1A1A1A] text-center card-hover">
            <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Our Community</h3>
            <p className="text-gray-400 text-sm">
              Over 500+ users trust us. We listen to feedback and build 
              what the community actually needs.
            </p>
          </div>
        </motion.div>

        {/* ===== WHAT WE OFFER ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            What <span className="gradient-text">We Offer</span>
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10">
            Two ways to get your dream app — ready-to-use or custom-built.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Ready Apps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="glass-card rounded-xl p-6 border border-[#1A1A1A] card-hover flex gap-4"
            >
              <div className="flex-shrink-0 mt-1">
                <ShoppingBag className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Ready-to-Use Apps</h4>
                <p className="text-sm text-gray-400">
                  Choose from 50+ premium apps — Uber, Zomato, Netflix, WhatsApp, and more. 
                  You get full access to use these apps at a fraction of the original cost. 
                  No developers, no hassle. Just subscribe and start using.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Custom Apps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="glass-card rounded-xl p-6 border border-[#1A1A1A] card-hover flex gap-4"
            >
              <div className="flex-shrink-0 mt-1">
                <Building2 className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Build Your Own App</h4>
                <p className="text-sm text-gray-400">
                  Have a unique idea? Contact us and we'll build your custom app from scratch. 
                  Launch your own app business and earn revenue. We build apps at prices 
                  that traditional developers charge 10x more for.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Extra Description */}
          <div className="mt-6 glass-card rounded-xl p-6 border border-[#1A1A1A]">
            <div className="flex items-start gap-4">
              <Crown className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Why Choose Us?</h4>
                <p className="text-sm text-gray-400">
                  Whether you want to use a ready app or build your own, we make it affordable. 
                  Our subscription model is designed to be pocket-friendly, and our custom 
                  development costs a fraction of what agencies charge. You get the same 
                  premium quality — without the premium price tag.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== HOW IT WORKS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How <span className="gradient-text">It Works</span>
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10">
            Two simple paths to get your app — use or build.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Path 1: Use Ready Apps */}
            <div className="glass-card rounded-2xl p-6 border border-[#1A1A1A]">
              <h4 className="text-xl font-bold text-blue-400 mb-4 text-center">Use Ready Apps</h4>
              <div className="space-y-4">
                {[
                  'Browse our collection of 50+ premium apps',
                  'Choose the app you want to use',
                  'Subscribe at a pocket-friendly price',
                  'Start using the app immediately'
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-blue-400 font-bold text-sm min-w-[24px]">{i + 1}</span>
                    <span className="text-gray-300 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Path 2: Build Custom App */}
            <div className="glass-card rounded-2xl p-6 border border-[#1A1A1A]">
              <h4 className="text-xl font-bold text-purple-400 mb-4 text-center">Build Your Own App</h4>
              <div className="space-y-4">
                {[
                  'Contact us with your app idea',
                  'We discuss features and pricing',
                  'Our team builds your custom app',
                  'Launch your own app business'
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold text-sm min-w-[24px]">{i + 1}</span>
                    <span className="text-gray-300 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== WHY CHOOSE US ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <div className="relative rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border border-blue-500/20 p-8 lg:p-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 relative z-10">
              Why <span className="gradient-text">Choose Us</span>
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8 relative z-10">
              Because everyone deserves a premium app without breaking the bank.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              {[
                '50+ premium apps ready to use at low subscription prices',
                'Custom app development at 90% less than agencies',
                'No hidden fees — transparent pricing always',
                'High-level security for your data and users',
                'Build your own app and earn passive income',
                'Community-driven — we build what you want',
                'No developers needed — we handle everything',
                '24/7 support for all your app needs'
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-3 glass-card rounded-xl p-4 border border-[#1A1A1A]"
                >
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ===== STATS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { number: '50+', label: 'Premium Apps' },
            { number: '500+', label: 'Happy Users' },
            { number: '4.8★', label: 'Average Rating' },
            { number: '100%', label: 'Ad-Free' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
              className="glass-card rounded-xl p-6 text-center border border-[#1A1A1A] card-hover"
            >
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {stat.number}
              </div>
              <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ===== CTA ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border border-blue-500/20 p-12 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
          <Sparkles className="h-12 w-12 text-blue-400 mx-auto mb-4 relative z-10" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">
            Ready to Get Your App?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8 relative z-10">
            Whether you want to use a ready app or build your own — we're here to help. 
            Start today with our pocket-friendly plans.
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <Link href="/apps">
              <Button className="btn-primary px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-500/30 hover:shadow-purple-500/50 transition-all duration-300">
                Explore Apps
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full hover:border-purple-500/30 transition-all duration-300">
                Build Your Own App
              </Button>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
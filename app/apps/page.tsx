'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Star, 
  Download, 
  Users, 
  Shield,
  Search,
  Filter,
  Grid3x3,
  LayoutList,
  ArrowLeft,
  TrendingUp,
  Clock,
  Sparkles
} from 'lucide-react';

// All Apps Data
const allApps = [
  { 
    id: 1, 
    name: 'Uber Clone', 
    category: 'Transport', 
    rating: 4.8, 
    downloads: '2.3M',
    desc: 'Complete ride-hailing platform with real-time tracking, GPS navigation, and seamless payment integration.',
    features: ['Real-time Tracking', 'GPS Navigation', 'Payment Gateway', 'Ride History'],
    status: 'Popular'
  },
  { 
    id: 2, 
    name: 'Zomato Clone', 
    category: 'Food', 
    rating: 4.7, 
    downloads: '1.8M',
    desc: 'Food delivery app with restaurant discovery, online ordering, and live order tracking.',
    features: ['Restaurant Discovery', 'Online Ordering', 'Live Tracking', 'Reviews'],
    status: 'Trending'
  },
  { 
    id: 3, 
    name: 'Amazon Clone', 
    category: 'Shopping', 
    rating: 4.9, 
    downloads: '5.1M',
    desc: 'E-commerce platform with cart, wishlist, product reviews, and secure payment gateway.',
    features: ['Shopping Cart', 'Wishlist', 'Product Reviews', 'Secure Payments'],
    status: 'Best Seller'
  },
  { 
    id: 4, 
    name: 'Netflix Clone', 
    category: 'Entertainment', 
    rating: 4.5, 
    downloads: '3.2M',
    desc: 'Streaming platform with subscriptions, personalized recommendations, and offline viewing.',
    features: ['Subscriptions', 'Recommendations', 'Offline Viewing', 'Multiple Profiles'],
    status: 'Popular'
  },
  { 
    id: 5, 
    name: 'WhatsApp Clone', 
    category: 'Communication', 
    rating: 4.8, 
    downloads: '4.5M',
    desc: 'Real-time messaging app with voice/video calls, group chats, and end-to-end encryption.',
    features: ['Voice Calls', 'Video Calls', 'Group Chats', 'End-to-End Encryption'],
    status: 'Trending'
  },
  { 
    id: 6, 
    name: 'Swiggy Clone', 
    category: 'Food', 
    rating: 4.6, 
    downloads: '2.1M',
    desc: 'On-demand food delivery with live tracking, restaurant management, and easy checkout.',
    features: ['Live Tracking', 'Restaurant Management', 'Easy Checkout', 'Order History'],
    status: 'Popular'
  },
  { 
    id: 7, 
    name: 'Spotify Clone', 
    category: 'Music', 
    rating: 4.7, 
    downloads: '3.8M',
    desc: 'Music streaming app with playlists, offline mode, social sharing, and personalized recommendations.',
    features: ['Playlists', 'Offline Mode', 'Social Sharing', 'Personalized'],
    status: 'Trending'
  },
  { 
    id: 8, 
    name: 'Instagram Clone', 
    category: 'Social Media', 
    rating: 4.9, 
    downloads: '6.2M',
    desc: 'Social media app with reels, stories, live streaming, and direct messaging features.',
    features: ['Reels', 'Stories', 'Live Streaming', 'Direct Messaging'],
    status: 'Best Seller'
  },
  { 
    id: 9, 
    name: 'Twitter Clone', 
    category: 'Social Media', 
    rating: 4.4, 
    downloads: '2.7M',
    desc: 'Micro-blogging platform with tweets, retweets, trending topics, and real-time updates.',
    features: ['Tweets', 'Retweets', 'Trending Topics', 'Real-time Updates'],
    status: 'Popular'
  },
];

const categories = ['All', 'Transport', 'Food', 'Shopping', 'Entertainment', 'Communication', 'Music', 'Social Media'];
const sortOptions = ['Popular', 'Rating', 'Downloads', 'Newest'];

export default function AppsPage() {
  const pathname = usePathname();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Navbar Links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Apps', href: '/apps' },
    { name: 'Requests', href: '/request' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // Filter and Sort Apps
  const filteredApps = allApps
    .filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           app.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'Rating') return b.rating - a.rating;
      if (sortBy === 'Downloads') return parseInt(b.downloads.replace(/[^0-9]/g, '')) - parseInt(a.downloads.replace(/[^0-9]/g, ''));
      if (sortBy === 'Newest') return b.id - a.id;
      return 0;
    });

  const handleDownload = (appName: string) => {
    toast.success(`${appName} download started! 📥`, {
      description: 'Your download will begin shortly.',
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-12 relative">
      
      {/* Background Fade Effect */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===== Header ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  All <span className="gradient-text">Apps</span>
                </h1>
                <p className="text-gray-400 text-sm mt-1">{filteredApps.length} apps available</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              className="border-[#2D2D2D] text-gray-400 hover:text-white hover:bg-white/5"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? (
                <LayoutList className="h-4 w-4 mr-2" />
              ) : (
                <Grid3x3 className="h-4 w-4 mr-2" />
              )}
              {viewMode === 'grid' ? 'List' : 'Grid'}
            </Button>
          </div>
        </div>

        {/* ===== Search & Filters ===== */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-full border-[#2D2D2D] bg-[#1A1A1A] text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="border-[#2D2D2D] text-gray-400 hover:text-white hover:bg-white/5"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-12 px-4 rounded-full border-[#2D2D2D] bg-[#1A1A1A] text-white text-sm focus:border-purple-500/50 focus:ring-purple-500/20 outline-none"
            >
              {sortOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ===== Category Filters ===== */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-[#1A1A1A] border border-[#2D2D2D]">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full text-sm ${
                    selectedCategory === category 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600' 
                      : 'border-[#2D2D2D] text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ===== Apps Grid/List ===== */}
        {filteredApps.length === 0 ? (
          <div className="text-center py-20">
            <Search className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white">No apps found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={`
            grid gap-6
            ${viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
            }
          `}>
            {filteredApps.map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Card className={`
                  glass-card card-hover border-[#1A1A1A] hover:border-purple-500/30 transition-all duration-300
                  ${viewMode === 'list' ? 'flex flex-col md:flex-row md:items-center gap-4' : ''}
                `}>
                  <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-blue-500/20 flex-shrink-0">
                          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{app.name[0]}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{app.name}</h3>
                          <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-gray-300 border-0 text-xs">
                            {app.category}
                          </Badge>
                          {app.status && (
                            <Badge className={`
                              ml-2 border-0 text-xs
                              ${app.status === 'Best Seller' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400' : ''}
                              ${app.status === 'Trending' ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-400' : ''}
                              ${app.status === 'Popular' ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400' : ''}
                            `}>
                              {app.status === 'Best Seller' && '⭐ '}
                              {app.status === 'Trending' && '🔥 '}
                              {app.status === 'Popular' && '📈 '}
                              {app.status}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-2 py-1 rounded">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm text-white">{app.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{app.desc}</p>
                    
                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {app.features.slice(0, 3).map((feature, idx) => (
                        <Badge key={idx} className="bg-[#1A1A1A] text-gray-400 border-0 text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {app.features.length > 3 && (
                        <Badge className="bg-[#1A1A1A] text-gray-400 border-0 text-xs">
                          +{app.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-[#1A1A1A]">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {app.downloads}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {app.downloads}
                        </span>
                      </div>
                      <Button 
                        onClick={() => handleDownload(app.name)}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white h-9 px-4 rounded-full text-sm shadow-lg shadow-blue-500/20 hover:shadow-purple-500/40 transition-all duration-300"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* ===== Stats Bar ===== */}
        <div className="mt-12 p-6 rounded-xl bg-[#1A1A1A] border border-[#2D2D2D]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{allApps.length}</p>
              <p className="text-sm text-gray-400">Total Apps</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{categories.length - 1}</p>
              <p className="text-sm text-gray-400">Categories</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">4.7★</p>
              <p className="text-sm text-gray-400">Average Rating</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">32M+</p>
              <p className="text-sm text-gray-400">Total Downloads</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
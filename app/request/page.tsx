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
  Users, 
  ArrowLeft, 
  User, 
  Calendar, 
  ThumbsUp,
  Search,
  Filter,
  Plus,
  X,
  Sparkles,
  Clock,
  TrendingUp,
  Menu
} from 'lucide-react';

// Sample Requests Data
const initialRequests = [
  {
    id: 1,
    userName: 'Rahul Sharma',
    appName: 'Instagram Clone',
    description: 'Full-featured social media app with reels, stories, live streaming, and direct messaging. Should have dark mode and push notifications.',
    createdAt: '2026-07-15',
    votes: 234,
    status: 'Trending'
  },
  {
    id: 2,
    userName: 'Priya Patel',
    appName: 'Uber Eats Clone',
    description: 'Food delivery platform with real-time tracking, restaurant management, multiple payment options, and customer reviews.',
    createdAt: '2026-07-14',
    votes: 189,
    status: 'In Progress'
  },
  {
    id: 3,
    userName: 'Amit Kumar',
    appName: 'Spotify Clone',
    description: 'Music streaming app with playlists, offline mode, social sharing, personalized recommendations, and lyrics display.',
    createdAt: '2026-07-13',
    votes: 156,
    status: 'Popular'
  },
  {
    id: 4,
    userName: 'Sneha Reddy',
    appName: 'Twitter Clone',
    description: 'Micro-blogging platform with tweets, retweets, trending topics, real-time updates, and media sharing capabilities.',
    createdAt: '2026-07-12',
    votes: 98,
    status: 'Pending'
  },
  {
    id: 5,
    userName: 'Vikram Singh',
    appName: 'Netflix Clone',
    description: 'Streaming platform with subscriptions, personalized recommendations, offline viewing, multiple profiles, and 4K support.',
    createdAt: '2026-07-11',
    votes: 76,
    status: 'Pending'
  },
];

const statusColors = {
  'Trending': 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-400',
  'In Progress': 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400',
  'Popular': 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400',
  'Pending': 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-400',
};

export default function RequestsPage() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [requests, setRequests] = useState(initialRequests);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    userName: '',
    appName: '',
    description: '',
  });

  // Navbar Links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Apps', href: '/apps' },
    { name: 'Requests', href: '/request' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // Filter Requests
  const filteredRequests = requests.filter(req =>
    req.appName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Vote
  const handleVote = (id: number) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id
          ? { ...req, votes: req.votes + 1 }
          : req
      )
    );
    toast.success('Vote added! 🙌', {
      description: 'Request count increased by 1.',
      duration: 2000,
    });
  };

  // Handle New Request Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequest.userName || !newRequest.appName || !newRequest.description) {
      toast.error('Please fill all fields', {
        description: 'All fields are required.',
        duration: 3000,
      });
      return;
    }

    const newReq = {
      id: requests.length + 1,
      ...newRequest,
      createdAt: new Date().toISOString().split('T')[0],
      votes: 0,
      status: 'Pending',
    };

    setRequests([newReq, ...requests]);
    setNewRequest({ userName: '', appName: '', description: '' });
    setShowForm(false);
    toast.success('Request submitted! 🎉', {
      description: 'Your request has been added successfully.',
      duration: 3000,
    });
  };

  // Get Status Badge
  const getStatusBadge = (status: string) => {
    const color = statusColors[status as keyof typeof statusColors] || statusColors.Pending;
    return (
      <Badge className={`${color} border-0 text-xs`}>
        {status === 'Trending' && '🔥 '}
        {status === 'In Progress' && '⚡ '}
        {status === 'Popular' && '⭐ '}
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-12 relative overflow-x-hidden">
      
      {/* Background Fade Effect */}
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
                  App <span className="gradient-text">Requests</span>
                </h1>
                <p className="text-gray-400 text-sm mt-1">{filteredRequests.length} requests</p>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full px-6 shadow-lg shadow-blue-500/20 hover:shadow-purple-500/40 transition-all duration-300 w-full sm:w-auto"
          >
            {showForm ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </>
            )}
          </Button>
        </div>

        {/* ===== New Request Form ===== */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="glass-card rounded-xl p-4 sm:p-6 border border-[#1A1A1A]">
              <h3 className="text-xl font-semibold text-white mb-4">Submit a Request</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                  <Input
                    placeholder="Enter your name"
                    value={newRequest.userName}
                    onChange={(e) => setNewRequest({...newRequest, userName: e.target.value})}
                    className="border-[#2D2D2D] bg-[#1A1A1A] text-white focus:border-purple-500/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">App Name</label>
                  <Input
                    placeholder="What app do you want?"
                    value={newRequest.appName}
                    onChange={(e) => setNewRequest({...newRequest, appName: e.target.value})}
                    className="border-[#2D2D2D] bg-[#1A1A1A] text-white focus:border-purple-500/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <Textarea
                    placeholder="Describe the app features you need..."
                    value={newRequest.description}
                    onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
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

        {/* ===== Search Bar ===== */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-full border-[#2D2D2D] bg-[#1A1A1A] text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-[#1A1A1A] text-gray-400 border-0 px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              {filteredRequests.length} Requests
            </Badge>
          </div>
        </div>

        {/* ===== Requests Grid ===== */}
        {filteredRequests.length === 0 ? (
          <div className="text-center py-20">
            <Search className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white">No requests found</h3>
            <p className="text-gray-400">Try adjusting your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((req, i) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Card className="glass-card card-hover border-[#1A1A1A] hover:border-purple-500/30 transition-all duration-300">
                  <CardContent className="p-4 sm:p-6">
                    {/* User Info */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/20">
                          <User className="h-4 w-4 sm:h-5 sm:w-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-sm sm:text-base">{req.userName}</h3>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(req.status)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-2 py-1 rounded">
                        <ThumbsUp className="h-3 w-3 text-blue-400" />
                        <span className="text-sm text-white font-semibold">{req.votes}</span>
                      </div>
                    </div>

                    {/* App Name */}
                    <h4 className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                      {req.appName}
                    </h4>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {req.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#1A1A1A]">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {req.createdAt}
                        </span>
                      </div>
                      <Button
                        onClick={() => handleVote(req.id)}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white h-9 px-4 rounded-full text-sm shadow-lg shadow-blue-500/20 hover:shadow-purple-500/40 transition-all duration-300"
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Vote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* ===== Stats Bar ===== */}
        <div className="mt-12 p-4 sm:p-6 rounded-xl bg-[#1A1A1A] border border-[#2D2D2D]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{requests.length}</p>
              <p className="text-sm text-gray-400">Total Requests</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {requests.reduce((acc, req) => acc + req.votes, 0)}
              </p>
              <p className="text-sm text-gray-400">Total Votes</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {requests.filter(r => r.status === 'Trending' || r.status === 'In Progress').length}
              </p>
              <p className="text-sm text-gray-400">Active Requests</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {requests.filter(r => r.status === 'Pending').length}
              </p>
              <p className="text-sm text-gray-400">Pending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
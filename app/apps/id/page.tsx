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
import { usePathname, useParams } from 'next/navigation';
import { 
  Star, 
  Download, 
  Users, 
  Shield,
  ArrowLeft,
  ThumbsUp,
  User,
  Calendar,
  CheckCircle,
  Sparkles,
  Zap,
  Clock,
  Share2
} from 'lucide-react';

// All Apps Data (same as apps page)
const allApps = [
  { 
    id: 1, 
    name: 'Uber Clone', 
    category: 'Transport', 
    rating: 4.8, 
    downloads: '2.3M',
    desc: 'Complete ride-hailing platform with real-time tracking, GPS navigation, and seamless payment integration.',
    features: ['Real-time Tracking', 'GPS Navigation', 'Payment Gateway', 'Ride History'],
    status: 'Popular',
    price: '₹299',
    longDesc: 'Uber Clone is a complete ride-hailing solution that connects riders with drivers in real-time. It includes GPS tracking, fare estimation, multiple payment options, ride history, and driver management. Perfect for starting your own transportation business.',
    reviews: [
      { id: 1, user: 'Rahul Sharma', rating: 5, text: 'Amazing app! The real-time tracking works perfectly. Highly recommend!', date: '2026-07-15', helpful: 12 },
      { id: 2, user: 'Priya Patel', rating: 4, text: 'Great app, easy to use. Would love to see more payment options.', date: '2026-07-14', helpful: 8 },
      { id: 3, user: 'Amit Kumar', rating: 5, text: 'Best Uber clone I have seen. Very professional and smooth.', date: '2026-07-13', helpful: 15 },
    ]
  },
  { 
    id: 2, 
    name: 'Zomato Clone', 
    category: 'Food', 
    rating: 4.7, 
    downloads: '1.8M',
    desc: 'Food delivery app with restaurant discovery, online ordering, and live order tracking.',
    features: ['Restaurant Discovery', 'Online Ordering', 'Live Tracking', 'Reviews'],
    status: 'Trending',
    price: '₹349',
    longDesc: 'Zomato Clone is a complete food delivery platform that allows users to discover restaurants, order food online, track deliveries in real-time, and leave reviews. Includes restaurant management and analytics dashboard.',
    reviews: [
      { id: 1, user: 'Sneha Reddy', rating: 5, text: 'Love the restaurant discovery feature! Very user-friendly.', date: '2026-07-15', helpful: 10 },
      { id: 2, user: 'Vikram Singh', rating: 4, text: 'Good app, tracking is accurate. Could improve the UI.', date: '2026-07-14', helpful: 5 },
    ]
  },
  { 
    id: 3, 
    name: 'Amazon Clone', 
    category: 'Shopping', 
    rating: 4.9, 
    downloads: '5.1M',
    desc: 'E-commerce platform with cart, wishlist, product reviews, and secure payment gateway.',
    features: ['Shopping Cart', 'Wishlist', 'Product Reviews', 'Secure Payments'],
    status: 'Best Seller',
    price: '₹399',
    longDesc: 'Amazon Clone is a full-featured e-commerce platform that allows you to sell products online. Includes shopping cart, wishlist, product reviews, seller dashboard, and integrated payment gateway.',
    reviews: [
      { id: 1, user: 'Neha Gupta', rating: 5, text: 'Perfect for starting an online store. Very comprehensive.', date: '2026-07-15', helpful: 20 },
      { id: 2, user: 'Rajesh Kumar', rating: 5, text: 'Excellent platform with all the features I needed.', date: '2026-07-14', helpful: 18 },
    ]
  },
  { 
    id: 4, 
    name: 'Netflix Clone', 
    category: 'Entertainment', 
    rating: 4.5, 
    downloads: '3.2M',
    desc: 'Streaming platform with subscriptions, personalized recommendations, and offline viewing.',
    features: ['Subscriptions', 'Recommendations', 'Offline Viewing', 'Multiple Profiles'],
    status: 'Popular',
    price: '₹279',
    longDesc: 'Netflix Clone is a streaming platform that lets you offer movies and TV shows to subscribers. Includes personalized recommendations, multiple user profiles, offline viewing, and admin dashboard.',
    reviews: [
      { id: 1, user: 'Deepak Singh', rating: 4, text: 'Good streaming app. Recommendations are accurate.', date: '2026-07-15', helpful: 7 },
    ]
  },
  { 
    id: 5, 
    name: 'WhatsApp Clone', 
    category: 'Communication', 
    rating: 4.8, 
    downloads: '4.5M',
    desc: 'Real-time messaging app with voice/video calls, group chats, and end-to-end encryption.',
    features: ['Voice Calls', 'Video Calls', 'Group Chats', 'End-to-End Encryption'],
    status: 'Trending',
    price: '₹259',
    longDesc: 'WhatsApp Clone is a real-time messaging solution with voice and video calls, group chats, media sharing, and end-to-end encryption. Perfect for building your own messaging app.',
    reviews: [
      { id: 1, user: 'Ananya Sharma', rating: 5, text: 'Great messaging app! Calls are crystal clear.', date: '2026-07-15', helpful: 14 },
      { id: 2, user: 'Rohit Verma', rating: 4, text: 'Good app, encryption is a plus. Needs more stickers.', date: '2026-07-14', helpful: 6 },
    ]
  },
  { 
    id: 6, 
    name: 'Swiggy Clone', 
    category: 'Food', 
    rating: 4.6, 
    downloads: '2.1M',
    desc: 'On-demand food delivery with live tracking, restaurant management, and easy checkout.',
    features: ['Live Tracking', 'Restaurant Management', 'Easy Checkout', 'Order History'],
    status: 'Popular',
    price: '₹329',
    longDesc: 'Swiggy Clone is an on-demand food delivery platform with live order tracking, restaurant management, multiple payment options, and order history. Great for starting a food delivery business.',
    reviews: [
      { id: 1, user: 'Kavita Reddy', rating: 4, text: 'Great delivery tracking. Very user-friendly.', date: '2026-07-15', helpful: 9 },
    ]
  },
  { 
    id: 7, 
    name: 'Spotify Clone', 
    category: 'Music', 
    rating: 4.7, 
    downloads: '3.8M',
    desc: 'Music streaming app with playlists, offline mode, social sharing, and personalized recommendations.',
    features: ['Playlists', 'Offline Mode', 'Social Sharing', 'Personalized'],
    status: 'Trending',
    price: '₹299',
    longDesc: 'Spotify Clone is a music streaming platform that allows users to create playlists, download songs for offline listening, share music with friends, and get personalized recommendations.',
    reviews: [
      { id: 1, user: 'Arjun Nair', rating: 5, text: 'Perfect music app. Playlists are amazing!', date: '2026-07-15', helpful: 16 },
      { id: 2, user: 'Maya Krishnan', rating: 4, text: 'Great offline mode. Would love more playlists.', date: '2026-07-14', helpful: 8 },
    ]
  },
  { 
    id: 8, 
    name: 'Instagram Clone', 
    category: 'Social Media', 
    rating: 4.9, 
    downloads: '6.2M',
    desc: 'Social media app with reels, stories, live streaming, and direct messaging features.',
    features: ['Reels', 'Stories', 'Live Streaming', 'Direct Messaging'],
    status: 'Best Seller',
    price: '₹399',
    longDesc: 'Instagram Clone is a complete social media platform with reels, stories, live streaming, direct messaging, and post sharing. Perfect for building a social media community.',
    reviews: [
      { id: 1, user: 'Sara Khan', rating: 5, text: 'Amazing social media app! Reels are so engaging.', date: '2026-07-15', helpful: 25 },
      { id: 2, user: 'Karan Malhotra', rating: 5, text: 'Great platform for building a community. Love it!', date: '2026-07-14', helpful: 19 },
    ]
  },
  { 
    id: 9, 
    name: 'Twitter Clone', 
    category: 'Social Media', 
    rating: 4.4, 
    downloads: '2.7M',
    desc: 'Micro-blogging platform with tweets, retweets, trending topics, and real-time updates.',
    features: ['Tweets', 'Retweets', 'Trending Topics', 'Real-time Updates'],
    status: 'Popular',
    price: '₹279',
    longDesc: 'Twitter Clone is a micro-blogging platform that allows users to post tweets, retweet content, follow trending topics, and get real-time updates. Great for news and community engagement.',
    reviews: [
      { id: 1, user: 'Vivek Shah', rating: 4, text: 'Good platform for news. Trending topics are useful.', date: '2026-07-15', helpful: 11 },
    ]
  },
];

// Helper function to render stars
const renderStars = (rating: number) => {
  return Array(5).fill(0).map((_, i) => (
    <Star 
      key={i} 
      className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
    />
  ));
};

export default function AppDetailPage() {
  const params = useParams();
  const pathname = usePathname();
  
  // Find app by id
  const app = allApps.find(a => a.id === parseInt(params.id as string));
  
  // Review state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [helpfulCounts, setHelpfulCounts] = useState<{ [key: number]: number }>(
    app?.reviews.reduce((acc, r) => ({ ...acc, [r.id]: r.helpful }), {}) || {}
  );
  const [reviews, setReviews] = useState(app?.reviews || []);
  const [isHelpfulClicked, setIsHelpfulClicked] = useState<{ [key: number]: boolean }>({});

  if (!app) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">App Not Found</h2>
          <Link href="/apps">
            <Button className="btn-primary">Back to Apps</Button>
          </Link>
        </div>
      </div>
    );
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Apps', href: '/apps' },
    { name: 'Requests', href: '/request' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating', {
        description: 'You need to rate the app before submitting.',
        duration: 3000,
      });
      return;
    }
    if (!reviewText.trim()) {
      toast.error('Please write a review', {
        description: 'Your review text cannot be empty.',
        duration: 3000,
      });
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      user: 'Current User',
      rating: rating,
      text: reviewText,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setReviewText('');
    setShowReviewForm(false);
    
    toast.success('Review submitted! 🎉', {
      description: 'Thank you for your feedback.',
      duration: 3000,
    });
  };

  const handleHelpful = (reviewId: number) => {
    if (isHelpfulClicked[reviewId]) {
      toast.info('You already found this helpful', {
        description: 'You can only click once.',
        duration: 2000,
      });
      return;
    }
    
    setHelpfulCounts(prev => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1
    }));
    setIsHelpfulClicked(prev => ({
      ...prev,
      [reviewId]: true
    }));
    
    toast.success('Thanks for the feedback!', {
      description: 'You found this review helpful.',
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-12 relative">
      
      {/* Background Fade */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* ===== NAVBAR ===== */}
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

      <div className="max-w-6xl mx-auto px-4">
        
        {/* ===== BACK BUTTON ===== */}
        <div className="mb-6">
          <Link href="/apps">
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Apps
            </Button>
          </Link>
        </div>

        {/* ===== APP DETAIL CARD ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass-card card-hover border-[#1A1A1A] hover:border-purple-500/30 transition-all duration-300">
            <CardContent className="p-6 md:p-8">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-blue-500/20 flex-shrink-0">
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{app.name[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">{app.name}</h1>
                    <Badge className={`${
                      app.status === 'Best Seller' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400' :
                      app.status === 'Trending' ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-400' :
                      'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400'
                    } border-0 text-xs px-3 py-1`}>
                      {app.status === 'Best Seller' && '⭐ '}
                      {app.status === 'Trending' && '🔥 '}
                      {app.status === 'Popular' && '📈 '}
                      {app.status}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{app.category}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      {renderStars(app.rating)}
                      <span className="text-white font-semibold ml-1">{app.rating}</span>
                    </div>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-400 flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {app.downloads} downloads
                    </span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-400 flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {app.reviews.length} reviews
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-blue-400">{app.price}</span>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white h-10 px-6 rounded-full text-sm shadow-lg shadow-blue-500/20 hover:shadow-purple-500/40 transition-all duration-300">
                    <Download className="h-4 w-4 mr-2" />
                    Download Now
                  </Button>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">About This App</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{app.longDesc}</p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                <div className="flex flex-wrap gap-2">
                  {app.features.map((feature, idx) => (
                    <Badge key={idx} className="bg-[#1A1A1A] text-gray-300 border-0 text-sm px-4 py-1.5">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#1A1A1A]">
                <Button variant="outline" className="border-[#2D2D2D] text-gray-400 hover:text-white hover:bg-white/5 text-sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ===== SUBMIT REVIEW BUTTON ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8"
        >
          <Button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-500/20 hover:shadow-purple-500/40 transition-all duration-300"
          >
            <Star className="h-5 w-5 mr-2" />
            {showReviewForm ? 'Close Review Form' : 'Submit Review'}
          </Button>
        </motion.div>

        {/* ===== REVIEW FORM ===== */}
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 overflow-hidden"
          >
            <div className="glass-card rounded-xl p-6 border border-[#1A1A1A] max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-4">Write a Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star 
                          className={`h-8 w-8 ${
                            star <= (hoverRating || rating) 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-600'
                          }`} 
                        />
                      </button>
                    ))}
                    <span className="text-gray-400 text-sm ml-2 self-center">
                      {rating > 0 ? `${rating} / 5` : 'Select rating'}
                    </span>
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Review</label>
                  <Textarea
                    placeholder="Write your review here..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={4}
                    className="border-[#2D2D2D] bg-[#1A1A1A] text-white focus:border-purple-500/50 resize-none"
                    required
                  />
                </div>

                {/* Submit / Cancel */}
                <div className="flex gap-3">
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-5 text-base rounded-full shadow-lg shadow-blue-500/20 hover:shadow-purple-500/40 transition-all duration-300 flex-1"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Submit Review
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowReviewForm(false);
                      setRating(0);
                      setReviewText('');
                    }}
                    className="border-[#2D2D2D] text-gray-400 hover:text-white hover:bg-white/5 px-6 py-5 text-base rounded-full"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* ===== USER REVIEWS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            User Reviews <span className="text-gray-400 text-sm font-normal">({reviews.length} reviews)</span>
          </h2>

          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="glass-card border-[#1A1A1A] hover:border-purple-500/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/20">
                        <User className="h-5 w-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{review.user}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{review.text}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleHelpful(review.id)}
                    className={`text-sm hover:bg-white/5 ${isHelpfulClicked[review.id] ? 'text-green-400' : 'text-gray-500 hover:text-white'}`}
                  >
                    <ThumbsUp className={`h-4 w-4 mr-1 ${isHelpfulClicked[review.id] ? 'fill-green-400' : ''}`} />
                    Found this helpful ({helpfulCounts[review.id] || 0})
                  </Button>
                </CardContent>
              </Card>
            ))}

            {reviews.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <p>No reviews yet. Be the first to review this app!</p>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
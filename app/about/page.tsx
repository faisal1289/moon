'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
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
  Sparkles
} from 'lucide-react';

export default function AboutPage() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Apps', href: '/apps' },
    { name: 'Requests', href: '/request' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-12 relative">
      
      {/* Background Fade */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
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
            Making Premium Apps
            <br />
            <span className="gradient-text">Accessible to Everyone</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We believe that high-quality apps should be affordable. We help businesses, 
            creators, and individuals launch their dream apps without the heavy price tag.
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
              To democratize app development — making premium apps accessible to 
              businesses, creators, and individuals at prices that make sense.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-[#1A1A1A] text-center card-hover">
            <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Our Promise</h3>
            <p className="text-gray-400 text-sm">
              Transparent pricing, no hidden fees, bank-level security, and 
              continuous improvement based on user feedback.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-[#1A1A1A] text-center card-hover">
            <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Our Community</h3>
            <p className="text-gray-400 text-sm">
              Over 500+ businesses trust us. We actively listen to our community 
              and build features they actually need.
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
            Everything you need to launch your app without the million-dollar budget.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Code className="h-6 w-6 text-blue-400" />,
                title: 'Ready-to-Deploy Apps',
                desc: 'Choose from 50+ premium app clones — Uber, Zomato, Netflix, and more. All feature-rich, secure, and ready to launch.'
              },
              {
                icon: <Sparkles className="h-6 w-6 text-purple-400" />,
                title: 'Custom App Development',
                desc: 'Have a unique idea? We build custom apps from scratch. No matter the complexity, we bring your vision to life.'
              },
              {
                icon: <TrendingUp className="h-6 w-6 text-green-400" />,
                title: 'Build Your Own App Business',
                desc: 'Launch your own app platform and earn passive income. We help you create apps that generate revenue for you.'
              },
              {
                icon: <Award className="h-6 w-6 text-yellow-400" />,
                title: 'Enterprise-Grade Security',
                desc: 'Your data and users\' data stay protected with bank-level security. We follow the best practices in the industry.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                className="glass-card rounded-xl p-6 border border-[#1A1A1A] card-hover flex gap-4"
              >
                <div className="flex-shrink-0 mt-1">{item.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
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
            From idea to launch — we make app development simple and affordable.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Choose or Request',
                desc: 'Browse our 50+ ready apps or submit a custom request for a new app.'
              },
              {
                step: '02',
                title: 'We Build It',
                desc: 'Our team builds your app with premium features, modern design, and top-notch security.'
              },
              {
                step: '03',
                title: 'Launch & Earn',
                desc: 'Take your app live, start earning revenue. We provide full support.'
              },
              {
                step: '04',
                title: 'Grow & Scale',
                desc: 'Update, scale, and improve your app based on user feedback and needs.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                className="glass-card rounded-xl p-6 border border-[#1A1A1A] text-center card-hover"
              >
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3">
                  {item.step}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
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
              Because we believe everyone deserves a premium app without breaking the bank.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {[
                {
                  icon: <CheckCircle className="h-5 w-5 text-green-400" />,
                  text: '50+ premium apps ready to deploy'
                },
                {
                  icon: <CheckCircle className="h-5 w-5 text-green-400" />,
                  text: 'Custom development at 90% less cost than traditional agencies'
                },
                {
                  icon: <CheckCircle className="h-5 w-5 text-green-400" />,
                  text: 'No hidden fees — what you see is what you pay'
                },
                {
                  icon: <CheckCircle className="h-5 w-5 text-green-400" />,
                  text: 'Bank-level security for your data and users'
                },
                {
                  icon: <CheckCircle className="h-5 w-5 text-green-400" />,
                  text: 'Community-driven — we build what you want'
                },
                {
                  icon: <CheckCircle className="h-5 w-5 text-green-400" />,
                  text: 'Launch your own app business and earn passive income'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-3 glass-card rounded-xl p-4 border border-[#1A1A1A]"
                >
                  {item.icon}
                  <span className="text-gray-300 text-sm">{item.text}</span>
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
            { number: '50+', label: 'Apps Ready' },
            { number: '500+', label: 'Businesses Trust Us' },
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
            Ready to Launch Your App?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8 relative z-10">
            Join 500+ businesses already using our platform. Get started today and 
            build your dream app at an affordable price.
          </p>
          <Link href="/apps" className="relative z-10">
            <Button className="btn-primary px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-500/30 hover:shadow-purple-500/50 transition-all duration-300">
              Explore Our Apps
            </Button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
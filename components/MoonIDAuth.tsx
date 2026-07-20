'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { User, LogOut, Moon, Mail, QrCode } from 'lucide-react';
import { toast } from 'sonner';
import QRCode from 'qrcode';

interface UserProfile {
  moonID: string;
  name: string;
  email: string;
  did: string;
  publicKey: string;
}

export function MoonIDAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrCode, setQrCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState<'login' | 'signup'>('login');

  // ✅ MoonID App ID - Developer ki website ka
  const APP_ID = 'com.your.website';  // 🔥 YAHAN APNI WEBSITE KA APP ID DAALO
  const REDIRECT_URI = typeof window !== 'undefined' 
    ? window.location.origin + '/auth/callback' 
    : '';

  // ✅ Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('moonid_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('moonid_user');
      }
    }
  }, []);

  // ✅ Generate QR Code for MoonID
  const generateQRCode = async (actionType: 'login' | 'signup') => {
    setAction(actionType);
    setIsLoading(true);
    setShowQR(true);

    try {
      const state = Math.random().toString(36).substring(7);
      
      // Store state for verification
      localStorage.setItem('moonid_state', state);
      localStorage.setItem('moonid_action', actionType);
      
      // Generate deep link
      const deepLink = `moonid://auth?app_id=${APP_ID}&action=${actionType}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${state}`;
      
      // Generate QR Code
      const qr = await QRCode.toDataURL(deepLink, {
        width: 250,
        margin: 2,
        color: {
          dark: '#6A5ACD',
          light: '#FFFFFF'
        }
      });
      
      setQrCode(qr);
      
      // ✅ Start polling for authentication status
      startPolling(state);
      
    } catch (error) {
      console.error('QR Generation failed:', error);
      toast.error('Failed to generate QR code');
      setShowQR(false);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Poll for authentication status
  const startPolling = (state: string) => {
    let attempts = 0;
    const maxAttempts = 60; // 30 seconds (2 seconds * 60)
    
    const interval = setInterval(() => {
      attempts++;
      
      const savedUser = localStorage.getItem('moonid_user');
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setShowQR(false);
          setQrCode('');
          toast.success(`Welcome ${userData.name}! 🎉`);
          clearInterval(interval);
          return;
        } catch (e) {}
      }
      
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        setShowQR(false);
        setQrCode('');
        toast.error('Authentication timed out. Please try again.');
      }
    }, 2000);
    
    // @ts-ignore - Store interval for cleanup
    window._moonidPolling = interval;
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('moonid_user');
    localStorage.removeItem('moonid_state');
    localStorage.removeItem('moonid_action');
    setUser(null);
    toast.success('Logged out successfully!');
    setIsOpen(false);
  };

  // ✅ Cancel QR
  const handleCancelQR = () => {
    // @ts-ignore
    if (window._moonidPolling) {
      // @ts-ignore
      clearInterval(window._moonidPolling);
    }
    setShowQR(false);
    setQrCode('');
    toast.info('Authentication cancelled');
  };

  // ✅ Get user initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // ✅ If user is logged in - Show Profile
  if (user) {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Avatar className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500">
            <AvatarFallback className="text-white text-xs">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <span className="text-white text-sm hidden sm:inline-block">
            {user.name.split(' ')[0]}
          </span>
        </button>

        {/* Profile Sheet - Right Side Panel */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="right" className="bg-[#0D0D1A] border-l border-[#1A1A1A] text-white w-[320px] sm:w-[400px]">
            <SheetHeader className="border-b border-[#1A1A1A] pb-4">
              <SheetTitle className="text-white text-xl flex items-center gap-2">
                <Moon className="h-5 w-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" />
                Profile
              </SheetTitle>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {/* User Avatar */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                  {getInitials(user.name)}
                </div>
                <h3 className="text-lg font-semibold mt-3">{user.name}</h3>
                <p className="text-sm text-gray-400">{user.moonID}</p>
              </div>

              {/* User Details */}
              <div className="space-y-3 bg-[#1A1A1A] rounded-xl p-4 border border-[#2D2D2D]">
                <div className="flex items-center gap-3 text-sm">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">{user.name}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Moon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300 text-xs break-all">{user.moonID}</span>
                </div>
              </div>

              {/* Logout Button */}
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  // ✅ User not logged in - Show Login/Signup buttons
  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => generateQRCode('login')}
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full px-4 lg:px-6 text-sm shadow-lg shadow-blue-500/20 hover:shadow-purple-500/40 transition-all duration-300"
        >
          {isLoading ? 'Loading...' : 'Login with MoonID'}
        </Button>
        <Button
          onClick={() => generateQRCode('signup')}
          disabled={isLoading}
          variant="outline"
          className="border-[#2D2D2D] text-gray-300 hover:text-white hover:border-purple-500/30 rounded-full px-4 lg:px-6 text-sm"
        >
          Signup
        </Button>
      </div>

      {/* QR Code Dialog */}
      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="bg-[#0D0D1A] border border-[#1A1A1A] text-white max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <QrCode className="h-5 w-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" />
              Scan with MoonID App
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {action === 'login' ? 'Login to your account' : 'Create new account'} with MoonID
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center py-4">
            {qrCode ? (
              <div className="bg-white p-4 rounded-xl">
                <img src={qrCode} alt="MoonID QR Code" className="w-48 h-48" />
              </div>
            ) : (
              <div className="w-48 h-48 bg-[#1A1A1A] rounded-xl flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            <div className="mt-4 text-center space-y-2">
              <p className="text-sm text-gray-300">
                1. Open <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">MoonID</span> app
              </p>
              <p className="text-sm text-gray-300">
                2. Tap <span className="text-white font-medium">Scan QR</span> button
              </p>
              <p className="text-sm text-gray-300">
                3. Scan this QR code
              </p>
              <p className="text-sm text-gray-300">
                4. Approve {action}
              </p>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              QR code expires in 30 seconds
            </p>
          </div>

          <Button
            onClick={handleCancelQR}
            variant="outline"
            className="border-[#2D2D2D] text-gray-400 hover:text-white hover:bg-white/5 rounded-full"
          >
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
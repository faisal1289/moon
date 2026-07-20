'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Moon } from 'lucide-react';

// ✅ Auth Callback Content - Suspense ke andar
function AuthCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const moonID = searchParams.get('moon_id');
    const credential = searchParams.get('credential');
    const state = searchParams.get('state');
    const name = searchParams.get('name');

    // ✅ Verify state
    const savedState = localStorage.getItem('moonid_state');
    if (state && savedState && state !== savedState) {
      setStatus('error');
      toast.error('Invalid state');
      setTimeout(() => router.push('/'), 2000);
      return;
    }

    if (moonID && credential) {
      try {
        const credentialData = JSON.parse(decodeURIComponent(credential));
        
        // ✅ Email = MoonID (jaise app mein tha)
        const userData = {
          moonID: moonID,
          name: name || credentialData.name || 'MoonID User',
          email: moonID,  // ✅ FIX: MoonID hi email hai! "@moonid.user" nahi!
          did: credentialData.did || '',
          publicKey: credentialData.publicKey || '',
        };
        
        localStorage.setItem('moonid_user', JSON.stringify(userData));
        localStorage.removeItem('moonid_state');
        localStorage.removeItem('moonid_action');
        
        setStatus('success');
        toast.success(`Welcome ${userData.name}! 🎉`);
        setTimeout(() => router.push('/'), 1500);
      } catch (e) {
        setStatus('error');
        toast.error('Invalid credential');
        setTimeout(() => router.push('/'), 2000);
      }
    } else {
      setStatus('error');
      toast.error('No data received');
      setTimeout(() => router.push('/'), 2000);
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
            <Moon className="h-8 w-8 text-white" />
          </div>
        </div>
        {status === 'loading' && (
          <>
            <h2 className="text-xl font-semibold">Authenticating...</h2>
            <div className="mt-4 flex justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </>
        )}
        {status === 'success' && (
          <h2 className="text-xl font-semibold text-green-400">✅ Login Successful!</h2>
        )}
        {status === 'error' && (
          <h2 className="text-xl font-semibold text-red-400">❌ Login Failed</h2>
        )}
      </div>
    </div>
  );
}

// ✅ Main Component with Suspense Boundary
export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Moon className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-xl font-semibold">Loading...</h2>
          <div className="mt-4 flex justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
// 📁 frontend/app/api/app-config/route.ts
import { NextResponse } from 'next/server';

// ✅ YAHAN WORKER URL DAALO
const WORKER_URL = 'https://moonid-auth-worker.moonid-auth.workers.dev';

export async function GET() {
  try {
    const response = await fetch(`${WORKER_URL}/api/app-config`);
    const data = await response.json();
    
    return NextResponse.json({
      appId: data.appId || 'com.your.website',
      appName: data.appName || 'My Website',
      redirectUri: data.redirectUri || 'https://your-website.com/auth/callback'
    });
    
  } catch (error) {
    console.error('Error fetching app config:', error);
    
    // Fallback
    return NextResponse.json({
      appId: 'com.your.website',
      appName: 'My Website',
      redirectUri: 'https://your-website.com/auth/callback'
    });
  }
}
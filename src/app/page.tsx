'use client';
import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import LandingPage from '@/components/LandingPage';

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [showLanding, setShowLanding] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => { setLoaded(true); setShowLanding(true); }} />
      {showLanding && <LandingPage />}
    </>
  );
}

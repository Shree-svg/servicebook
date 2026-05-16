import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/axiosConfig';

const TrackService = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBooking = async () => {
    try {
      const res = await api.get(`/api/bookings/${id}`);
      setBooking(res.data);
    } catch (err) {
      console.error('Error fetching booking:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
    const interval = setInterval(fetchBooking, 10000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <div className="bg-background text-on-surface h-screen flex items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">refresh</span>
      </div>
    );
  }

  const getStatusStep = (status) => {
    switch(status) {
      case 'confirmed': return 1;
      case 'in-progress': return 2;
      case 'completed': return 3;
      default: return 1;
    }
  };

  const currentStep = getStatusStep(booking?.status);
  return (
    <div className="bg-background text-on-surface h-screen overflow-hidden flex flex-col antialiased selection:bg-primary/30 selection:text-primary-fixed">
      {/* TopAppBar */}
      <header className="bg-surface dark:bg-background text-primary dark:text-primary-fixed-dim font-headline-sm fixed top-0 w-full z-50 bg-surface-container-low dark:bg-inverse-surface shadow-sm flex items-center justify-between px-4 md:px-8 h-16 border-b border-outline-variant/30">
        <div className="flex items-center gap-4">
          {/* Leading Avatar (Simulated back action with avatar) */}
          <Link to="/bookings">
            <img 
              alt="User Profile Avatar" 
              className="h-8 w-8 rounded-full border border-outline-variant object-cover hover:bg-surface-variant/50 transition-colors active:scale-95 duration-200 cursor-pointer" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEEbGV-WkUhRK5H5D_Lu35Jd00B72XCrLyxfKsjA_a6fPfIwrjFIPipqYt3u9br5Yrg1y76qbEESHX8xN5_peC9V4gdK38nQBpmvpb86-kDRTYK8rwHAkr08f0nsGNkS0Vxr8HxJvv2tnizQjJbfo0Orl8IZIoTG4NCU3JMsj-KUP0esFQBDipcjfBbFs0mHDys2v0m_XUG6JbXET_6y3X6tL32cFQR4-BrmB4gvYl6icarLlKnrSl1sSthSFYuYVq0uIVYkgSLQ" 
            />
          </Link>
          {/* Headline */}
          <h1 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim font-bold tracking-tight">ServiceBook</h1>
        </div>
        {/* Trailing Icon */}
        <button className="text-on-surface-variant hover:bg-surface-variant/50 transition-colors active:scale-95 duration-200 p-2 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined">search</span>
        </button>
      </header>

      {/* Main Content Area: Map and Floating UI */}
      <main className="flex-grow relative w-full mt-16 overflow-hidden">
        {/* Map Background (Full Screen Context) */}
        <div className="absolute inset-0 z-0 bg-surface-container-lowest">
          {/* Simulated Map Image with Obsidian Overlay */}
          <div 
            className="w-full h-full bg-cover bg-center opacity-40 mix-blend-luminosity grayscale" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBU60tcRMgl3xpoMb9ciHF3G-vQFL4khp9wLeAcjJfws4Y7fDsPgdsdtVkr-y7mWJ7wiz2o4GPlYHFvUAccBvKsF8B14A2kNauxRFuAABb3ojDM9Cu5zjZQbvqUT5tX7PrZcwzExU4pLgQZ1UWcLJHg2ykFJJ1iR5IZ_Oho4B3ejLcI0MJI0vIK7p5bXAGWn6HUDk-3YaMQg9EVa49hpQwadOCaSaBJPqBigmvP62L1MsnYCYoEuyClCN4wnJoXfgDhRw-mmUqxvg')" }}
          ></div>
          {/* Map Vignette/Gradient for better contrast with floating UI */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/90 z-10"></div>
          
          {/* Simulated Route Path Overlay (CSS representation) */}
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <svg className="opacity-80 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 400">
              <path 
                className="animate-pulse" 
                d="M 100 300 Q 200 250 250 150 T 350 50" 
                fill="none" 
                stroke="#a78bfa" 
                strokeDasharray="8,8" 
                strokeWidth="4"
              ></path>
              {/* Provider Marker */}
              <circle cx="100" cy="300" fill="#a78bfa" r="8"></circle>
              <circle className="opacity-50" cx="100" cy="300" fill="none" r="16" stroke="#a78bfa" strokeWidth="2"></circle>
              {/* Destination Marker */}
              <circle cx="350" cy="50" fill="#fafafa" r="6"></circle>
            </svg>
          </div>
        </div>

        {/* Floating Provider Info Card (Bento-style anchored to bottom) */}
        <div className="absolute bottom-0 left-0 w-full p-4 pb-8 z-30 flex justify-center pointer-events-none">
          {/* Card Container */}
          <div className="bg-surface-container border border-outline-variant rounded-xl w-full max-w-md p-6 flex flex-col gap-6 pointer-events-auto backdrop-blur-md bg-opacity-95 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            {/* Status & ETA Header */}
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <span className="font-label text-xs uppercase tracking-wider text-on-surface-variant font-semibold">Status</span>
                <h2 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight capitalize">{booking?.status?.replace('-', ' ')}</h2>
              </div>
              <div className="bg-primary/10 border border-primary/30 text-primary px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-[0_0_10px_rgba(167,139,250,0.1)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {booking?.status === 'in-progress' ? 'Service Started' : 'On the Way'}
              </div>
            </div>

            {/* Progress Stepper */}
            <div className="relative w-full py-2">
              {/* Connecting Track */}
              <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-outline-variant -translate-y-1/2 z-0 rounded-full"></div>
              {/* Active Track Fill */}
              <div 
                className="absolute top-1/2 left-4 h-[2px] bg-primary -translate-y-1/2 z-0 rounded-full transition-all duration-1000"
                style={{ width: currentStep === 1 ? '10%' : currentStep === 2 ? '50%' : '100%' }}
              ></div>
              <div className="flex justify-between relative z-10">
                {/* Step 1: Provider Assigned (Completed) */}
                <div className="flex flex-col items-center gap-2 bg-surface-container px-2">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-on-primary ${currentStep >= 1 ? 'bg-primary' : 'bg-outline-variant'}`}>
                    <span className="material-symbols-outlined text-[14px] font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                  <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider">Confirmed</span>
                </div>
                {/* Step 2: En Route (Active) */}
                <div className="flex flex-col items-center gap-2 bg-surface-container px-2">
                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${currentStep >= 2 ? 'border-primary shadow-[0_0_8px_rgba(167,139,250,0.4)]' : 'border-outline-variant'}`}>
                    {currentStep === 2 && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                    {currentStep > 2 && <span className="material-symbols-outlined text-[14px] font-bold text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>}
                  </div>
                  <span className={`font-label text-[10px] uppercase tracking-wider ${currentStep === 2 ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>In Progress</span>
                </div>
                {/* Step 3: Arrived (Pending) */}
                <div className="flex flex-col items-center gap-2 bg-surface-container px-2">
                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${currentStep >= 3 ? 'border-primary shadow-[0_0_8px_rgba(167,139,250,0.4)]' : 'border-outline-variant'}`}>
                    {currentStep === 3 && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                  </div>
                  <span className={`font-label text-[10px] uppercase tracking-wider ${currentStep === 3 ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>Completed</span>
                </div>
              </div>
            </div>

            <hr className="border-t border-outline-variant w-full" />

            {/* Provider Profile & Quick Actions */}
            <div className="flex flex-col gap-5">
              {/* Profile Info */}
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full border border-outline-variant p-0.5 bg-surface-container-lowest flex items-center justify-center overflow-hidden">
                  {booking?.provider?.avatar ? (
                    <img alt={booking.provider.name} className="w-full h-full object-cover" src={booking.provider.avatar} />
                  ) : (
                    <span className="material-symbols-outlined text-outline text-3xl">person</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline text-lg font-bold text-on-surface tracking-tight">{booking?.provider?.name || 'Assigning Pro...'}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="material-symbols-outlined text-tertiary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="font-body text-sm font-semibold text-on-surface">{booking?.provider?.rating || '4.8'}</span>
                    <span className="text-outline-variant text-xs mx-1">•</span>
                    <span className="font-label text-xs text-on-surface-variant">Verified Pro</span>
                  </div>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex gap-3 w-full">
                <button className="flex items-center justify-center p-3 px-4 rounded-full border border-outline-variant text-on-surface bg-transparent hover:bg-surface-variant transition-colors flex-1 shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">call</span>
                </button>
                <button className="flex items-center justify-center gap-2 p-3 rounded-full bg-primary text-on-primary font-bold hover:bg-primary/90 transition-colors flex-[3] shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrackService;

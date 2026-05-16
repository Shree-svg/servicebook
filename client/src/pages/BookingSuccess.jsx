import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookingSuccess = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-4 antialiased selection:bg-primary/30 selection:text-primary-fixed">
      <main className="w-full max-w-md flex flex-col items-center text-center space-y-8 animate-fade-in">
        {/* Success Icon */}
        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-tertiary/10 border border-tertiary/20">
          <span className="material-symbols-outlined text-tertiary" style={{ fontSize: '48px', fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
        </div>

        {/* Headline & Subtext */}
        <div className="space-y-3">
          <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface">
            Booking Confirmed!
          </h1>
          <p className="font-body text-base text-on-surface-variant max-w-[320px] mx-auto leading-relaxed">
            Your professional is scheduled and will arrive at the requested time.
          </p>
        </div>

        {/* Summary Card */}
        <div className="w-full bg-surface-container border border-outline-variant rounded-lg p-6 flex flex-col text-left space-y-5 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-surface-variant bg-cover bg-center border border-outline-variant" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD0W1TnSWoSnCIc49WXbQR05g9X5h3VY7lucC71lbOU_tuELDEGnKkMTCFtBNElVuhGA2XsrOp2fEg61D8quAIlAPw5IbCANBF3iGrGweYDuKajnPOkrB6ihQttPD_24JbulYDrIIPFQzxd0cGhRcS6vjqT3xwtJZI39AWcB2LifyqYNog-Bpmsedzn9D0Z94R0AHGwuqOWYjioAQOhJR0f9KXnVX3kxKSSXTdi7c4KOnd6BKZeHlwHQ8tXklDdTj8kCCx99Xoirw')" }}>
              </div>
              <div>
                <p className="font-label text-xs text-on-surface-variant uppercase tracking-wider">Professional</p>
                <p className="font-body text-sm font-medium text-on-surface">Alex Johnson</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-tertiary">
              <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-label text-sm font-medium">4.9</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="font-body text-sm text-on-surface-variant">Service</p>
            <p className="font-body text-sm font-medium text-on-surface text-right">Premium Home Cleaning</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-body text-sm text-on-surface-variant">Date</p>
            <p className="font-body text-sm font-medium text-on-surface text-right">October 24, 2024</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-body text-sm text-on-surface-variant">Time</p>
            <p className="font-body text-sm font-medium text-on-surface text-right">09:00 AM - 12:00 PM</p>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
            <p className="font-body text-sm text-on-surface-variant">Order ID</p>
            <p className="font-body text-sm font-mono text-on-surface text-right">#SB-8492-X</p>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col space-y-3 pt-2">
          <button className="w-full bg-primary text-on-primary py-3.5 rounded-full font-label text-sm font-semibold hover:bg-primary-fixed-dim active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background">
            Track Service
          </button>
          <button onClick={handleGoHome} className="w-full bg-transparent border border-outline-variant text-on-surface py-3.5 rounded-full font-label text-sm font-semibold hover:bg-surface-variant/50 hover:border-outline active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background">
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
};

export default BookingSuccess;

import React from 'react';

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-surface pt-m3-4xl pb-m3-2xl px-m3-md">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-display-sm font-display-sm text-on-surface mb-m3-xl text-center">Help Center</h1>
        
        <div className="relative mb-m3-2xl">
          <span className="material-symbols-outlined absolute left-m3-md top-1/2 -translate-y-1/2 text-outline">search</span>
          <input 
            type="text" 
            placeholder="Search for help..." 
            className="w-full pl-m3-3xl pr-m3-md py-m3-lg bg-surface-container-high rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none text-body-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-m3-lg mb-m3-2xl">
          <div className="bg-surface-container-low p-m3-xl rounded-3xl hover:bg-surface-container-high transition-all cursor-pointer group">
            <span className="material-symbols-outlined text-primary text-headline-sm mb-m3-sm group-hover:scale-110 transition-transform">event_available</span>
            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-m3-xs">Booking Issues</h3>
            <p className="text-body-md text-on-surface-variant">Learn how to schedule, reschedule, or cancel your service bookings.</p>
          </div>
          <div className="bg-surface-container-low p-m3-xl rounded-3xl hover:bg-surface-container-high transition-all cursor-pointer group">
            <span className="material-symbols-outlined text-primary text-headline-sm mb-m3-sm group-hover:scale-110 transition-transform">payments</span>
            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-m3-xs">Payments & Refunds</h3>
            <p className="text-body-md text-on-surface-variant">Information about billing, payment methods, and our refund policy.</p>
          </div>
          <div className="bg-surface-container-low p-m3-xl rounded-3xl hover:bg-surface-container-high transition-all cursor-pointer group">
            <span className="material-symbols-outlined text-primary text-headline-sm mb-m3-sm group-hover:scale-110 transition-transform">account_circle</span>
            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-m3-xs">Account Settings</h3>
            <p className="text-body-md text-on-surface-variant">Manage your profile, security settings, and notification preferences.</p>
          </div>
          <div className="bg-surface-container-low p-m3-xl rounded-3xl hover:bg-surface-container-high transition-all cursor-pointer group">
            <span className="material-symbols-outlined text-primary text-headline-sm mb-m3-sm group-hover:scale-110 transition-transform">shield_person</span>
            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-m3-xs">Safety & Trust</h3>
            <p className="text-body-md text-on-surface-variant">Our commitment to your safety and how we verify our service providers.</p>
          </div>
        </div>

        <div className="bg-primary/5 p-m3-2xl rounded-4xl text-center border border-primary/10">
          <h3 className="text-headline-sm font-headline-sm text-on-surface mb-m3-sm">Still need help?</h3>
          <p className="text-body-md text-on-surface-variant mb-m3-xl">Our support team is available 24/7 to assist you with any questions.</p>
          <button className="px-m3-2xl py-m3-md bg-primary text-on-primary rounded-full font-label-lg hover:shadow-lg transition-all active:scale-95">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;

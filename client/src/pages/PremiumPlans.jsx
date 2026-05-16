import React from 'react';

const PremiumPlans = () => {
  return (
    <div className="min-h-screen bg-surface pt-m3-4xl pb-m3-2xl px-m3-md">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-display-md font-display-md text-on-surface mb-m3-md">Premium Plans</h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-m3-2xl">
          Choose the plan that fits your needs. Get exclusive benefits and priority service.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-m3-xl">
          {/* Basic Plan */}
          <div className="bg-surface-container-low p-m3-xl rounded-3xl border border-outline-variant/30 flex flex-col">
            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-m3-sm">Basic</h3>
            <div className="flex items-baseline gap-1 mb-m3-md">
              <span className="text-display-sm font-display-sm">$0</span>
              <span className="text-label-lg text-on-surface-variant">/month</span>
            </div>
            <ul className="text-body-md text-on-surface-variant text-left space-y-3 mb-m3-2xl flex-grow">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                Standard Booking
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                Email Support
              </li>
            </ul>
            <button className="w-full py-m3-md bg-surface-container-high text-primary rounded-full font-label-lg hover:bg-surface-container-highest transition-all">Current Plan</button>
          </div>

          {/* Premium Plan */}
          <div className="bg-surface-container-lowest p-m3-xl rounded-3xl border-2 border-primary shadow-xl flex flex-col relative scale-105 z-10">
            <div className="absolute top-0 right-m3-xl -translate-y-1/2 bg-primary text-on-primary px-m3-md py-1 rounded-full text-label-md font-semibold">Popular</div>
            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-m3-sm">Premium</h3>
            <div className="flex items-baseline gap-1 mb-m3-md">
              <span className="text-display-sm font-display-sm">$19</span>
              <span className="text-label-lg text-on-surface-variant">/month</span>
            </div>
            <ul className="text-body-md text-on-surface-variant text-left space-y-3 mb-m3-2xl flex-grow">
              <li className="flex items-center gap-2 font-medium text-on-surface">
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                Priority Booking
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                10% Discount on Services
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                24/7 Premium Support
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                Exclusive Member Offers
              </li>
            </ul>
            <button className="w-full py-m3-md bg-primary text-on-primary rounded-full font-label-lg hover:bg-primary/90 transition-all shadow-md">Upgrade Now</button>
          </div>

          {/* Business Plan */}
          <div className="bg-surface-container-low p-m3-xl rounded-3xl border border-outline-variant/30 flex flex-col">
            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-m3-sm">Business</h3>
            <div className="flex items-baseline gap-1 mb-m3-md">
              <span className="text-display-sm font-display-sm">$49</span>
              <span className="text-label-lg text-on-surface-variant">/month</span>
            </div>
            <ul className="text-body-md text-on-surface-variant text-left space-y-3 mb-m3-2xl flex-grow">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                Unlimited Bookings
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                Dedicated Account Manager
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                Custom Invoicing
              </li>
            </ul>
            <button className="w-full py-m3-md bg-surface-container-high text-primary rounded-full font-label-lg hover:bg-surface-container-highest transition-all">Contact Sales</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlans;

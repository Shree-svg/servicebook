import React from 'react';
import { useNavigate } from 'react-router-dom';

const Step4Summary = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate('/book/success');
  };

  const goBack = () => {
    navigate('/book/step3');
  };

  return (
    <div className="bg-background text-on-surface font-body min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      {/* Transactional Flow Header */}
      <header className="flex items-center px-4 md:px-8 h-16 border-b border-outline-variant bg-surface sticky top-0 z-40">
        <button onClick={goBack} className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1 -ml-1">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="ml-4 font-headline text-lg font-bold tracking-tight">Booking Summary</h1>
      </header>

      <main className="p-4 md:p-8 max-w-3xl mx-auto pb-40">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-end text-sm mb-3">
            <span className="text-secondary font-medium">Step 4 of 4</span>
            <span className="text-primary font-semibold tracking-wide uppercase text-[10px]">Ready to Confirm</span>
          </div>
          <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden border border-outline-variant">
            <div className="h-full bg-primary w-full rounded-full"></div>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Service Card (Full Width) */}
          <div className="col-span-1 md:col-span-2 bg-surface-container border border-outline-variant rounded-xl p-5 md:p-6 flex flex-col sm:flex-row items-start gap-5 hover:bg-surface-container-highest transition-colors">
            <div className="w-full sm:w-28 h-28 rounded-lg bg-surface-container-lowest border border-outline-variant flex-shrink-0 overflow-hidden relative">
              <img alt="Premium Home Cleaning" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDehC0D7xM6r2tCSiRcD8QCKFPBDl7oKBSLlcFMT4MDgA7SrOnl7NHajyPnMoQtk0w8EW2mDh3aBCDq2i3sQX83AvyjHobuNMwZefF6cdQeTz9vqN1at4UP_QzsqbBTn5R4FZZjKOJV-MsUC_KIHVLTQRAkIPj6sQxVnKPFwA0T-bw-NRJhXeEigZduX3ZSA8dVvV3fNMlnSr5nRbcopNFnzI4jRMNLzFy98S6V_-1lJ2qmW4d9b7ah1cRVSnzCKQBoQmi-mrBoJw"/>
            </div>
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start mb-2">
                <h2 className="font-headline text-xl md:text-2xl font-bold tracking-tight text-on-surface">Premium Home Cleaning</h2>
              </div>
              <p className="text-secondary text-sm mb-4 leading-relaxed">Deep clean covering up to 4 bedrooms, 3 bathrooms, and primary living areas. Includes premium organic cleaning supplies.</p>
              <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant px-3 py-1.5 rounded-md inline-flex">
                <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-tertiary text-xs font-semibold uppercase tracking-wider">Top Tier Provider</span>
              </div>
            </div>
          </div>

          {/* Schedule Card */}
          <div className="bg-surface-container border border-outline-variant rounded-xl p-5 md:p-6 hover:bg-surface-container-highest transition-colors flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-surface-container-lowest border border-outline-variant flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined">calendar_today</span>
              </div>
              <h3 className="font-headline font-semibold text-lg text-on-surface">Schedule</h3>
            </div>
            <div className="space-y-2 mt-auto">
              <p className="text-on-surface font-semibold text-lg">Thu, Oct 26, 2024</p>
              <p className="text-secondary font-medium">09:00 AM - 01:00 PM</p>
              <p className="text-secondary text-sm mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">schedule</span> 4 hours estimated
              </p>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-surface-container border border-outline-variant rounded-xl p-5 md:p-6 hover:bg-surface-container-highest transition-colors flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-surface-container-lowest border border-outline-variant flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <h3 className="font-headline font-semibold text-lg text-on-surface">Location</h3>
            </div>
            <div className="space-y-1 mb-5">
              <p className="text-on-surface font-semibold text-base">123 Horizon Lane, Apt 4B</p>
              <p className="text-secondary">Metropolis, NY 10001</p>
            </div>
            {/* Abstract Map Placeholder */}
            <div className="w-full h-24 rounded-lg bg-surface-container-lowest border border-outline-variant overflow-hidden relative mt-auto">
              <div className="absolute inset-0 bg-surface-variant/20 flex flex-col items-center justify-center cursor-pointer hover:bg-surface-variant/40 transition-colors">
                <span className="material-symbols-outlined text-outline mb-1">map</span>
                <span className="text-xs text-outline font-medium">View Map</span>
              </div>
            </div>
          </div>

          {/* Payment Summary (Full Width) */}
          <div className="col-span-1 md:col-span-2 bg-surface-container border border-outline-variant rounded-xl p-5 md:p-6 mt-2">
            <h3 className="font-headline font-semibold text-lg text-on-surface mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">receipt_long</span> Payment Details
            </h3>
            <div className="space-y-4 text-sm font-medium">
              <div className="flex justify-between text-secondary">
                <span>Base Service (4 hrs)</span>
                <span className="text-on-surface">$200.00</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Premium Supplies Fee</span>
                <span className="text-on-surface">$25.00</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Taxes & Fees</span>
                <span className="text-on-surface">$18.50</span>
              </div>
              <div className="h-px w-full bg-outline-variant my-4"></div>
              <div className="flex justify-between items-end">
                <span className="font-headline font-bold text-lg text-on-surface">Total</span>
                <span className="font-headline font-bold text-3xl tracking-tight text-primary">$243.50</span>
              </div>
            </div>

            {/* Payment Method Selected */}
            <div className="mt-6 p-4 bg-surface-container-lowest border border-outline-variant rounded-lg flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-surface border border-outline-variant flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-[20px]">credit_card</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-on-surface">Visa ending in 4242</p>
                  <p className="text-xs text-secondary mt-0.5">Expires 12/25</p>
                </div>
              </div>
              <span className="text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Change</span>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-surface/95 backdrop-blur-md border-t border-outline-variant p-4 md:p-6 z-50">
        <div className="max-w-3xl mx-auto w-full flex flex-col-reverse sm:flex-row gap-4 items-center justify-between">
          <p className="text-xs text-secondary text-center sm:text-left max-w-xs">
            By confirming, you agree to ServiceBook's <a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Cancellation Policy</a>.
          </p>
          <button onClick={handleConfirm} className="w-full sm:w-auto bg-primary text-on-primary-fixed font-bold py-3.5 px-10 rounded-lg hover:bg-primary-fixed-dim transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface active:scale-[0.98] shadow-[0_0_15px_rgba(167,139,250,0.2)] flex items-center justify-center gap-2">
            Confirm Booking <span className="material-symbols-outlined text-[20px]">check_circle</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4Summary;

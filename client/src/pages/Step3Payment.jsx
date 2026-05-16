import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Step3Payment = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('card');

  const handleNext = () => {
    navigate('/book/step4');
  };

  const goBack = () => {
    navigate('/book/step2');
  };

  return (
    <div className="bg-background text-on-surface font-body antialiased min-h-screen flex flex-col selection:bg-primary/30 selection:text-primary-fixed">
      {/* TopAppBar */}
      <header className="bg-surface fixed top-0 w-full z-50 shadow-sm border-b border-outline-variant/50 flex items-center justify-between px-4 md:px-8 h-16">
        <div className="flex items-center gap-4">
          <button onClick={goBack} aria-label="Go back" className="p-2 -ml-2 rounded-full hover:bg-surface-variant/50 transition-colors active:scale-95 duration-200 text-on-surface-variant">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant bg-surface-container-high">
            <img alt="User Profile Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7tYD0huDHUQaLTB64EOIvoEySKZzRjm7wFue48WSIzNhZROUp9l255X261bq53p1s7w9URXX9gPqDebPZUoC2hXlATPvZYo2Ec3UF2CKzhytSRxzDfW8j5Y71JxgiryH36uFRO3P2h34YVyBXmBBE87GMjhw4wMetjUXM6oK-BJGwagMukfw4RYMQX2nIzgyrFibM5MCWBpXEZfENYmK44z2xgJ5bKdHzP7TtaDSNQj-hxThPM-grTJXqcDvVHBYwa9y8w35toA"/>
          </div>
          <span className="font-headline text-xl text-primary font-bold tracking-tight">ServiceBook</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-24 pb-12 px-4 md:px-8 max-w-6xl mx-auto w-full">
        {/* Progress Indicator */}
        <div className="mb-10 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-primary">Step 3 of 4: Payment Method</span>
            <span className="text-xs text-on-surface-variant font-mono">75% Complete</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-primary w-3/4 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Payment Selection */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-headline font-bold tracking-tight text-on-surface mb-2">Select Payment Method</h1>
              <p className="text-on-surface-variant text-sm">All transactions are secure and encrypted.</p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Option 1: Credit/Debit Card */}
              <div className={`rounded-xl overflow-hidden transition-all duration-200 border ${selectedPayment === 'card' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background border-primary bg-surface/60 backdrop-blur-md' : 'border-outline-variant bg-surface/60 backdrop-blur-md hover:bg-surface-container cursor-pointer'}`} onClick={() => setSelectedPayment('card')}>
                <div className={`p-5 flex items-center justify-between ${selectedPayment === 'card' ? 'bg-primary/5' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'card' ? 'border-primary' : 'border-outline-variant'}`}>
                      {selectedPayment === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                    </div>
                    <span className={`material-symbols-outlined ${selectedPayment === 'card' ? 'text-primary' : 'text-on-surface-variant'}`}>credit_card</span>
                    <span className="font-medium text-on-surface">Credit or Debit Card</span>
                  </div>
                </div>

                {selectedPayment === 'card' && (
                  <div className="p-5 border-t border-outline-variant bg-surface-container-lowest/50">
                    <form className="grid grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-on-surface-variant mb-1.5">Card Number</label>
                        <div className="relative">
                          <input className="w-full bg-surface-container border border-outline-variant rounded-lg py-2.5 pl-10 pr-4 text-on-surface font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="0000 0000 0000 0000" type="text" defaultValue="4111 1111 1111 1111" />
                          <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-lg">credit_card</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-on-surface-variant mb-1.5">Expiry Date</label>
                        <input className="w-full bg-surface-container border border-outline-variant rounded-lg py-2.5 px-4 text-on-surface font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="MM/YY" type="text" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-on-surface-variant mb-1.5">CVC</label>
                        <div className="relative">
                          <input className="w-full bg-surface-container border border-outline-variant rounded-lg py-2.5 pr-10 pl-4 text-on-surface font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="123" type="password" />
                          <span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant text-lg cursor-help">info</span>
                        </div>
                      </div>
                      <div className="col-span-2 mt-2">
                        <label className="block text-xs font-medium text-on-surface-variant mb-1.5">Name on Card</label>
                        <input className="w-full bg-surface-container border border-outline-variant rounded-lg py-2.5 px-4 text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors uppercase" placeholder="ALEX JOHNSON" type="text" />
                      </div>
                      <div className="col-span-2 flex items-center gap-2 mt-2">
                        <input className="rounded border-outline-variant bg-surface-container text-primary focus:ring-primary focus:ring-offset-background h-4 w-4" id="save-card" type="checkbox" />
                        <label className="text-xs text-on-surface-variant cursor-pointer" htmlFor="save-card">Save this card for future bookings</label>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Option 2: UPI */}
              <div className={`rounded-xl p-5 flex items-center justify-between cursor-pointer transition-colors group border ${selectedPayment === 'upi' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background border-primary bg-surface/60 backdrop-blur-md bg-primary/5' : 'border-outline-variant bg-surface/60 backdrop-blur-md hover:bg-surface-container'}`} onClick={() => setSelectedPayment('upi')}>
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'upi' ? 'border-primary' : 'border-outline-variant group-hover:border-on-surface-variant'}`}>
                    {selectedPayment === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                  </div>
                  <span className={`material-symbols-outlined transition-colors ${selectedPayment === 'upi' ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'}`}>qr_code_scanner</span>
                  <span className={`font-medium transition-colors ${selectedPayment === 'upi' ? 'text-on-surface' : 'text-on-surface-variant group-hover:text-on-surface'}`}>UPI / QR Code</span>
                </div>
                <span className="text-xs font-mono text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">Fast</span>
              </div>

              {/* Option 3: Digital Wallet */}
              <div className={`rounded-xl p-5 flex items-center justify-between cursor-pointer transition-colors group border ${selectedPayment === 'wallet' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background border-primary bg-surface/60 backdrop-blur-md bg-primary/5' : 'border-outline-variant bg-surface/60 backdrop-blur-md hover:bg-surface-container'}`} onClick={() => setSelectedPayment('wallet')}>
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'wallet' ? 'border-primary' : 'border-outline-variant group-hover:border-on-surface-variant'}`}>
                    {selectedPayment === 'wallet' && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                  </div>
                  <span className={`material-symbols-outlined transition-colors ${selectedPayment === 'wallet' ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'}`}>account_balance_wallet</span>
                  <span className={`font-medium transition-colors ${selectedPayment === 'wallet' ? 'text-on-surface' : 'text-on-surface-variant group-hover:text-on-surface'}`}>Digital Wallet</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Booking Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-surface/60 backdrop-blur-md border border-outline-variant rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-headline font-semibold text-on-surface mb-6 border-b border-outline-variant pb-4">Booking Summary</h2>
              
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-surface-container-highest border border-outline-variant flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">cleaning_services</span>
                </div>
                <div>
                  <h3 className="font-medium text-on-surface text-sm">Deep House Cleaning</h3>
                  <p className="text-xs text-on-surface-variant mt-1">Tomorrow, 10:00 AM • 3 Hours</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Service Subtotal</span>
                  <span className="text-on-surface font-mono">$120.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Taxes & Fees (10%)</span>
                  <span className="text-on-surface font-mono">$12.00</span>
                </div>
              </div>

              <div className="border-t border-outline-variant my-5"></div>

              <div className="flex justify-between items-end mb-8">
                <span className="font-medium text-on-surface">Total</span>
                <span className="text-2xl font-bold text-primary font-mono tracking-tight">$132.00</span>
              </div>

              <button onClick={handleNext} className="w-full bg-primary text-on-primary py-3.5 px-4 rounded-lg font-bold text-sm hover:bg-primary-fixed transition-colors active:scale-[0.98] flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(167,139,250,0.15)]">
                <span className="material-symbols-outlined text-sm">lock</span>
                Pay $132.00
              </button>
              
              <p className="text-center text-xs text-on-surface-variant mt-4 flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">verified_user</span>
                Payments are secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Step3Payment;

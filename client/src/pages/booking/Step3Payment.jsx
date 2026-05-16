import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/axiosConfig';

export default function Step3Payment() {
  const navigate = useNavigate();
  // Draft data is managed via sessionStorage for persistence across steps

  const [service, setService] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  const [draft, setDraft] = useState({});

  useEffect(() => {
    const savedDraft = JSON.parse(sessionStorage.getItem('bookingDraft') || '{}');
    setDraft(savedDraft);
    if (savedDraft.serviceId) {
      api.get(`/api/services/${savedDraft.serviceId}`)
        .then(res => setService(res.data))
        .catch(err => console.error('Error fetching service:', err));
    }
  }, []);

  const handleNext = () => {
    setLoading(true);
    const updatedDraft = { ...draft, paymentMethod: selectedMethod };
    sessionStorage.setItem('bookingDraft', JSON.stringify(updatedDraft));
    setTimeout(() => {
      navigate('/booking/step4');
    }, 1000);
  };

  const subtotal = service?.price || 120;
  const taxes = subtotal * 0.1;
  const total = subtotal + taxes;

  return (
    <div className="bg-transparent text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary/30 selection:text-primary-fixed">
      {/* TopAppBar */}
      <header className="bg-surface/80 backdrop-blur-xl fixed top-0 w-full z-50 shadow-sm flex items-center justify-between px-4 md:px-8 h-16 w-full border-b border-outline-variant/30">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-surface-bright transition-colors active:scale-95 duration-200 text-muted">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="font-headline-md text-xl text-gradient font-bold tracking-tight">ServiceBook</span>
        </div>
        <button className="p-2 rounded-full hover:bg-surface-bright transition-colors active:scale-95 duration-200 text-muted">
          <span className="material-symbols-outlined">search</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-24 pb-12 px-4 md:px-8 max-w-6xl mx-auto w-full">
        {/* Progress Indicator */}
        <div className="mb-10 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Step 3 of 4: Payment Method</span>
            <span className="text-xs text-muted font-mono font-bold">75% Complete</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-highest/50 rounded-full overflow-hidden backdrop-blur-sm">
            <div className="h-full gradient-primary w-3/4 rounded-full shadow-[0_0_10px_rgba(192,132,252,0.4)]"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Payment Selection */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-headline font-bold tracking-tight text-gradient mb-2 pb-1">Select Payment Method</h1>
              <p className="text-muted text-sm font-medium">All transactions are secure and encrypted.</p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Option 1: Credit/Debit Card */}
              <div className={`rounded-xl overflow-hidden transition-all duration-300 shadow-xl ${
                selectedMethod === 'card' 
                  ? 'ring-2 ring-primary bg-primary/10 border-primary/30 gradient-glow' 
                  : 'gradient-card backdrop-blur-xl border border-outline-variant/30 hover:border-primary/50'
              }`}>
                <div 
                  className="p-5 flex items-center justify-between cursor-pointer"
                  onClick={() => setSelectedMethod('card')}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedMethod === 'card' ? 'border-primary bg-primary/20' : 'border-outline-variant/50'
                    }`}>
                      {selectedMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(192,132,252,0.8)]"></div>}
                    </div>
                    <span className={`material-symbols-outlined transition-all ${selectedMethod === 'card' ? 'text-primary scale-110' : 'text-muted'}`}>credit_card</span>
                    <span className={`font-bold transition-colors ${selectedMethod === 'card' ? 'text-on-surface' : 'text-muted group-hover:text-on-surface'}`}>Credit or Debit Card</span>
                  </div>
                  <div className="flex gap-2 opacity-60">
                    <span className="material-symbols-outlined text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                  </div>
                </div>

                {selectedMethod === 'card' && (
                  <div className="p-5 border-t border-outline-variant/20 bg-surface/30 backdrop-blur-md">
                    <form className="grid grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                      <div className="col-span-2">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider mb-2 block">Card Number</label>
                        <div className="relative group/input">
                          <input className="w-full bg-surface/50 border border-outline-variant/30 rounded-xl py-3.5 pl-12 pr-4 text-on-surface font-mono text-sm placeholder:text-muted focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all shadow-lg" placeholder="0000 0000 0000 0000" type="text" defaultValue="4111 1111 1111 1111"/>
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-muted text-lg group-focus-within/input:text-primary transition-colors">credit_card</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-muted uppercase tracking-wider mb-2 block">Expiry Date</label>
                        <input className="w-full bg-surface/50 border border-outline-variant/30 rounded-xl py-3.5 px-4 text-on-surface font-mono text-sm placeholder:text-muted focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all shadow-lg" placeholder="MM/YY" type="text"/>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-muted uppercase tracking-wider mb-2 block">CVC</label>
                        <div className="relative group/input">
                          <input className="w-full bg-surface/50 border border-outline-variant/30 rounded-xl py-3.5 pr-12 pl-4 text-on-surface font-mono text-sm placeholder:text-muted focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all shadow-lg" placeholder="123" type="password"/>
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-muted text-lg cursor-help group-focus-within/input:text-primary transition-colors" title="3 digits on back of card">info</span>
                        </div>
                      </div>
                      <div className="col-span-2 mt-2">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider mb-2 block">Name on Card</label>
                        <input className="w-full bg-surface/50 border border-outline-variant/30 rounded-xl py-3.5 px-4 text-on-surface text-sm placeholder:text-muted focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all shadow-lg uppercase font-bold tracking-wider" placeholder="ALEX JOHNSON" type="text"/>
                      </div>
                      <div className="col-span-2 flex items-center gap-3 mt-4">
                        <input className="rounded border-outline-variant/50 bg-surface/50 text-primary focus:ring-primary h-4 w-4 cursor-pointer" id="save-card" type="checkbox"/>
                        <label className="text-xs text-muted font-bold cursor-pointer uppercase tracking-wider" htmlFor="save-card">Save this card for future bookings</label>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Option 2: UPI */}
              <div 
                className={`rounded-xl p-5 flex items-center justify-between cursor-pointer border transition-all duration-300 group shadow-lg ${
                  selectedMethod === 'upi' 
                    ? 'ring-2 ring-primary bg-primary/10 border-primary/30 gradient-glow' 
                    : 'gradient-card backdrop-blur-xl border border-outline-variant/30 hover:border-primary/50'
                }`}
                onClick={() => setSelectedMethod('upi')}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedMethod === 'upi' ? 'border-primary bg-primary/20' : 'border-outline-variant/50'
                  }`}>
                    {selectedMethod === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(192,132,252,0.8)]"></div>}
                  </div>
                  <span className={`material-symbols-outlined transition-all ${selectedMethod === 'upi' ? 'text-primary scale-110' : 'text-muted group-hover:text-primary'}`}>qr_code_scanner</span>
                  <span className={`font-bold transition-colors ${selectedMethod === 'upi' ? 'text-on-surface' : 'text-muted group-hover:text-on-surface'}`}>UPI / QR Code</span>
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest text-tertiary transition-opacity ${selectedMethod === 'upi' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>Fast</span>
              </div>

              {/* Option 3: Digital Wallet */}
              <div 
                className={`rounded-xl p-5 flex items-center justify-between cursor-pointer border transition-all duration-300 group shadow-lg ${
                  selectedMethod === 'wallet' 
                    ? 'ring-2 ring-primary bg-primary/10 border-primary/30 gradient-glow' 
                    : 'gradient-card backdrop-blur-xl border border-outline-variant/30 hover:border-primary/50'
                }`}
                onClick={() => setSelectedMethod('wallet')}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedMethod === 'wallet' ? 'border-primary bg-primary/20' : 'border-outline-variant/50'
                  }`}>
                    {selectedMethod === 'wallet' && <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(192,132,252,0.8)]"></div>}
                  </div>
                  <span className={`material-symbols-outlined transition-all ${selectedMethod === 'wallet' ? 'text-primary scale-110' : 'text-muted group-hover:text-primary'}`}>account_balance_wallet</span>
                  <span className={`font-bold transition-colors ${selectedMethod === 'wallet' ? 'text-on-surface' : 'text-muted group-hover:text-on-surface'}`}>Digital Wallet</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="gradient-card backdrop-blur-xl border border-outline-variant/30 rounded-2xl p-6 sticky top-24 shadow-2xl">
              <h2 className="text-lg font-headline font-bold text-gradient mb-6 border-b border-outline-variant/20 pb-4">Booking Summary</h2>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl gradient-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{service?.icon || 'cleaning_services'}</span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-sm uppercase tracking-wider">{service?.title || 'Deep House Cleaning'}</h3>
                  <p className="text-xs text-muted mt-1.5 font-medium">Tomorrow, 10:00 AM • 3 Hours</p>
                </div>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted font-medium">Service Subtotal</span>
                  <span className="text-on-surface font-mono font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted font-medium">Taxes & Fees (10%)</span>
                  <span className="text-on-surface font-mono font-bold">${taxes.toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t border-outline-variant/20 my-6"></div>
              <div className="flex justify-between items-end mb-8">
                <span className="font-bold text-on-surface uppercase tracking-widest text-xs">Total Amount</span>
                <span className="text-3xl font-bold text-gradient font-mono tracking-tighter shadow-primary/20">${total.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleNext}
                disabled={loading}
                className="w-full gradient-primary text-on-primary py-4 px-6 rounded-full font-bold text-sm hover:opacity-90 transition-all active:scale-[0.98] flex justify-center items-center gap-3 shadow-xl gradient-glow disabled:opacity-50"
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin">refresh</span>
                ) : (
                  <span className="material-symbols-outlined text-lg">lock</span>
                )}
                {loading ? 'Processing...' : `Confirm & Pay $${total.toFixed(2)}`}
              </button>
              <p className="text-center text-[10px] text-muted mt-6 flex items-center justify-center gap-2 uppercase font-bold tracking-widest">
                <span className="material-symbols-outlined text-[14px] text-success">verified_user</span>
                Secure 256-bit SSL Encryption
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

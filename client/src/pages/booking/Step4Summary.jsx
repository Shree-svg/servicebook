import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/axiosConfig';

export default function Step4Summary() {
  const navigate = useNavigate();
  // Final summary and confirmation step

  const [draft, setDraft] = useState({});
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedDraft = JSON.parse(sessionStorage.getItem('bookingDraft') || '{}');
    setDraft(savedDraft);
    if (savedDraft.serviceId) {
      api.get(`/api/services/${savedDraft.serviceId}`)
        .then(res => setService(res.data))
        .catch(err => console.error('Error fetching service:', err));
    }
  }, []);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const payload = {
        serviceId: draft.serviceId,
        date: draft.selectedDate,
        slot: draft.selectedSlot,
        address: draft.addressData,
        paymentMethod: draft.paymentMethod,
        totalAmount: total
      };
      
      const res = await api.post('/api/bookings', payload);
      sessionStorage.removeItem('bookingDraft');
      navigate('/booking/success', { state: { booking: res.data } });
    } catch (err) {
      console.error('Booking failed:', err);
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const slotLabels = {
    morning: '08:00 AM - 12:00 PM',
    afternoon: '12:00 PM - 04:00 PM',
    evening: '04:00 PM - 08:00 PM'
  };

  const subtotal = service?.price || 0;
  const suppliesFee = 25;
  const taxes = (subtotal + suppliesFee) * 0.0825;
  const total = subtotal + suppliesFee + taxes;

  return (
    <div className="bg-transparent text-on-surface font-body min-h-screen selection:bg-primary/30 selection:text-primary-fixed antialiased">
      {/* Transactional Flow Header */}
      <header className="flex items-center px-4 md:px-8 h-16 border-b border-outline-variant/30 bg-surface/80 backdrop-blur-xl sticky top-0 z-40">
        <button onClick={() => navigate(-1)} className="text-muted hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full p-2 -ml-2">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="ml-4 font-headline text-xl font-bold tracking-tight text-gradient">Booking Summary</h1>
      </header>

      <main className="p-4 md:p-8 max-w-3xl mx-auto pb-40">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-end mb-3">
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Step 4 of 4</span>
            <span className="text-xs text-muted font-bold tracking-widest uppercase">Ready to Confirm</span>
          </div>
          <div className="h-1.5 bg-surface-container-high/50 rounded-full overflow-hidden backdrop-blur-sm">
            <div className="h-full gradient-primary w-full rounded-full shadow-[0_0_10px_rgba(192,132,252,0.4)]"></div>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Service Card */}
          <div className="col-span-1 md:col-span-2 gradient-card border border-outline-variant/30 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-8 hover:border-primary/30 transition-all shadow-2xl group">
            <div className="w-full sm:w-32 h-32 rounded-2xl gradient-primary/10 border border-primary/20 flex-shrink-0 overflow-hidden relative shadow-inner">
              <img 
                alt={service?.title || 'Premium Home Cleaning'} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                src={service?.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuDehC0D7xM6r2tCSiRcD8QCKFPBDl7oKBSLlcFMT4MDgA7SrOnl7NHajyPnMoQtk0w8EW2mDh3aBCDq2i3sQX83AvyjHobuNMwZefF6cdQeTz9vqN1at4UP_QzsqbBTn5R4FZZjKOJV-MsUC_KIHVLTQRAkIPj6sQxVnKPFwA0T-bw-NRJhXeEigZduX3ZSA8dVvV3fNMlnSr5nRbcopNFnzI4jRMNLzFy98S6V_-1lJ2qmW4d9b7ah1cRVSnzCKQBoQmi-mrBoJw"}
              />
            </div>
            <div className="flex-1 w-full text-center sm:text-left">
              <div className="flex justify-center sm:justify-between items-start mb-3">
                <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-gradient">{service?.title || 'Premium Home Cleaning'}</h2>
              </div>
              <p className="text-muted text-sm mb-6 leading-relaxed font-medium">{service?.description || 'Deep clean covering primary living areas. Includes premium organic cleaning supplies.'}</p>
              <div className="flex items-center gap-2 bg-tertiary/10 border border-tertiary/20 px-4 py-2 rounded-full inline-flex shadow-glow-sm">
                <span className="material-symbols-outlined text-tertiary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-tertiary text-[10px] font-bold uppercase tracking-widest">Top Tier Service</span>
              </div>
            </div>
          </div>

          {/* Schedule Card */}
          <div className="gradient-card border border-outline-variant/30 rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all flex flex-col shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-lg">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
              </div>
              <h3 className="font-headline font-bold text-xl text-on-surface tracking-tight">Schedule</h3>
            </div>
            <div className="space-y-3 mt-auto">
              <p className="text-on-surface font-bold text-xl tracking-tight">{draft.selectedDate ? new Date(draft.selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) : 'Date not selected'}</p>
              <p className="text-primary font-bold uppercase tracking-widest text-xs">{slotLabels[draft.selectedSlot] || 'Time slot not selected'}</p>
              <div className="flex items-center gap-2 mt-4 text-muted font-bold uppercase tracking-widest text-[10px]">
                <span className="material-symbols-outlined text-sm text-tertiary">schedule</span> 
                4 hours estimated
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="gradient-card border border-outline-variant/30 rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all flex flex-col shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-lg">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              </div>
              <h3 className="font-headline font-bold text-xl text-on-surface tracking-tight">Location</h3>
            </div>
            <div className="space-y-2 mb-6">
              <p className="text-on-surface font-bold text-lg tracking-tight leading-tight">{draft.addressData?.street || 'No address provided'}</p>
              <p className="text-muted text-xs font-bold uppercase tracking-wider">{draft.addressData?.houseNo ? `House No: ${draft.addressData.houseNo}` : ''} {draft.addressData?.landmark ? `• Near ${draft.addressData.landmark}` : ''}</p>
            </div>
            <div className="w-full h-28 rounded-xl gradient-primary/5 border border-outline-variant/20 overflow-hidden relative mt-auto group/map cursor-pointer shadow-inner">
              <div className="absolute inset-0 bg-surface/40 flex flex-col items-center justify-center transition-all group-hover/map:bg-surface/20">
                <span className="material-symbols-outlined text-primary mb-2 text-3xl transition-transform group-hover/map:scale-110">map</span>
                <span className="text-[10px] text-muted font-bold uppercase tracking-widest group-hover/map:text-primary transition-colors">Confirm on Map</span>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="col-span-1 md:col-span-2 gradient-card border border-outline-variant/30 rounded-2xl p-6 md:p-8 mt-4 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 gradient-primary opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <h3 className="font-headline font-bold text-xl text-on-surface mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-lg">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
              </div>
              Payment Details
            </h3>
            <div className="space-y-5 text-sm font-bold tracking-tight">
              <div className="flex justify-between text-muted uppercase tracking-widest text-[11px]">
                <span>Base Service (4 hrs)</span>
                <span className="text-on-surface font-mono font-bold text-base">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted uppercase tracking-widest text-[11px]">
                <span>Premium Supplies Fee</span>
                <span className="text-on-surface font-mono font-bold text-base">${suppliesFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted uppercase tracking-widest text-[11px]">
                <span>Taxes & Fees</span>
                <span className="text-on-surface font-mono font-bold text-base">${taxes.toFixed(2)}</span>
              </div>
              <div className="h-px w-full bg-outline-variant/20 my-6"></div>
              <div className="flex justify-between items-end">
                <span className="font-bold text-muted uppercase tracking-[0.2em] text-[10px]">Total Amount to Pay</span>
                <span className="font-headline font-bold text-4xl tracking-tighter text-gradient font-mono">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-10 p-5 bg-surface/50 border border-outline-variant/20 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-all shadow-inner backdrop-blur-sm" onClick={() => navigate(-1)}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary/10 border border-primary/20 flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{draft.paymentMethod === 'card' ? 'credit_card' : draft.paymentMethod === 'upi' ? 'qr_code_scanner' : 'account_balance_wallet'}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface uppercase tracking-widest">{draft.paymentMethod === 'card' ? 'Credit/Debit Card' : draft.paymentMethod === 'upi' ? 'UPI / QR Code' : 'Digital Wallet'}</p>
                  <p className="text-[10px] text-success font-bold mt-1 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">shield_check</span>
                    Secure Payment Enabled
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest group-hover:gap-3 transition-all">
                Change <span className="material-symbols-outlined text-sm">chevron_right</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-surface/80 backdrop-blur-xl border-t border-outline-variant/20 p-6 md:p-8 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.4)]">
        <div className="max-w-3xl mx-auto w-full flex flex-col sm:flex-row gap-6 items-center justify-between">
          <p className="text-[10px] text-muted text-center sm:text-left max-w-xs font-bold uppercase tracking-[0.15em] leading-relaxed">
            By confirming, you agree to ServiceBook's <a className="text-primary hover:text-tertiary transition-colors" href="#">Terms</a> & <a className="text-primary hover:text-tertiary transition-colors" href="#">Privacy Policy</a>.
          </p>
          <button 
            onClick={handleConfirm}
            disabled={loading}
            className="w-full sm:w-auto gradient-primary text-on-primary font-bold py-5 px-12 rounded-full hover:opacity-90 transition-all active:scale-[0.98] shadow-2xl gradient-glow flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin">refresh</span>
            ) : (
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            )}
            {loading ? 'Processing...' : 'Confirm & Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
}

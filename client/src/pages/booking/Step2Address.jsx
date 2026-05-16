import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/axiosConfig';

export default function Step2Address() {
  const navigate = useNavigate();
  // Draft data is managed via sessionStorage for persistence across steps

  const [addressData, setAddressData] = useState({
    street: '',
    houseNo: '',
    landmark: '',
    instructions: ''
  });

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedSavedId, setSelectedSavedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAddresses = async () => {
      try {
        const res = await api.get('/api/auth/me');
        if (res.data.addresses) {
          setSavedAddresses(res.data.addresses.map((addr, idx) => ({
            id: idx + 1,
            type: addr.type || 'Home',
            address: `${addr.street}\n${addr.city || ''}`,
            raw: addr,
            icon: addr.type === 'Work' ? 'work' : 'home'
          })));
        }
      } catch (err) {
        console.error('Error fetching addresses:', err);
      } finally {
        setLoading(false);
      }
    };

    const draft = JSON.parse(sessionStorage.getItem('bookingDraft') || '{}');
    if (draft.addressData) {
      setAddressData(draft.addressData);
    }
    
    fetchUserAddresses();
  }, []);

  const handleNext = () => {
    const draft = JSON.parse(sessionStorage.getItem('bookingDraft') || '{}');
    draft.addressData = addressData;
    sessionStorage.setItem('bookingDraft', JSON.stringify(draft));
    navigate('/booking/step3');
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-on-surface font-body antialiased selection:bg-primary/30 selection:text-primary-fixed">
      {/* Transactional Header */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-outline-variant/30 bg-surface/80 backdrop-blur-xl sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="text-muted hover:text-primary transition-colors flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-bright focus:outline-none focus:ring-2 focus:ring-primary">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="text-center flex flex-col items-center">
          <h1 className="font-headline font-bold text-lg text-gradient tracking-tight">Service Address</h1>
          <div className="flex items-center gap-1 mt-0.5">
            <div className="w-2 h-1 rounded-full bg-outline-variant/50"></div>
            <div className="w-4 h-1 rounded-full gradient-primary shadow-[0_0_8px_rgba(192,132,252,0.4)]"></div>
            <div className="w-2 h-1 rounded-full bg-outline-variant/50"></div>
            <div className="w-2 h-1 rounded-full bg-outline-variant/50"></div>
          </div>
          <p className="text-[10px] text-primary uppercase tracking-widest font-bold mt-1">Step 2 of 4</p>
        </div>
        <div className="w-10"></div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col p-4 gap-8 max-w-2xl mx-auto w-full">
        {/* Map Visual Confirmation */}
        <section className="flex flex-col gap-3">
          <div className="flex justify-between items-end px-1">
            <h2 className="font-headline font-bold text-on-surface tracking-tight text-gradient">Confirm Location</h2>
            <button className="text-xs text-primary flex items-center gap-1 hover:text-primary transition-opacity font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">my_location</span>
              Current
            </button>
          </div>
          <div className="relative w-full h-48 rounded-xl overflow-hidden border border-outline-variant/30 bg-surface/50 shadow-xl group">
            <img 
              alt="Map view" 
              className="w-full h-full object-cover grayscale invert contrast-125 brightness-50 sepia-[0.2] hue-rotate-[220deg] saturate-[3] opacity-60 transition-all duration-700 group-hover:opacity-80 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLU6SVl6scSGuId_wGjpsCFrT3iFWWA1hBKVSpPD8Ezal5bIBFc2qbwuGT5EGWADufVvxWwxyqPSDHuHT5u6H9aS4j_DFt2j2ul2lmodUPZRbfHwgZWBorjhYNEbuEmh8zrYkQ8uIHRv3FCfCRuhzqhlDvFe7-YgzdGyyuNn5sr3L8lEBkaNB0wVkIIbiJRJerYy1uaFfAqBUTLlpDdKLxbcABnJtUKV5rRybV79RfFnb9_cs2cOF-hzz8TldPxPkp1vGsIZG_kg"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative">
                <span className="material-symbols-outlined text-primary text-4xl drop-shadow-[0_0_15px_rgba(192,132,252,0.8)]" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-primary/40 blur-[4px] rounded-[100%] animate-pulse"></div>
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3 bg-surface/90 backdrop-blur-md border border-outline-variant/30 rounded-lg py-2 px-3 flex items-center gap-3 shadow-2xl">
              <div className="w-10 h-10 rounded-lg gradient-primary/10 flex items-center justify-center border border-primary/20 flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>pin_drop</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-on-surface truncate">Selected Area</p>
                <p className="text-xs text-muted truncate">{addressData.street || "Loading position..."}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Saved Addresses */}
        <section className="flex flex-col gap-3">
          <h2 className="font-headline font-bold text-on-surface px-1 tracking-tight">Saved Addresses</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar px-1">
            {savedAddresses.map(addr => (
              <div 
                key={addr.id}
                onClick={() => setSelectedSavedId(addr.id)}
                className={`min-w-[240px] snap-start border-2 rounded-xl p-4 cursor-pointer relative transition-all active:scale-[0.98] shadow-lg ${
                  selectedSavedId === addr.id 
                    ? 'border-primary bg-primary/10 gradient-glow' 
                    : 'border-outline-variant/30 bg-surface/50 backdrop-blur-sm hover:border-primary/50'
                }`}
              >
                {selectedSavedId === addr.id && (
                  <div className="absolute top-4 right-4 text-primary">
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg border transition-all ${
                    selectedSavedId === addr.id ? 'gradient-primary text-on-primary border-primary/20' : 'bg-surface-bright text-muted border-outline-variant/30'
                  }`}>
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>{addr.icon}</span>
                  </div>
                  <span className={`font-bold text-sm transition-colors ${selectedSavedId === addr.id ? 'text-primary' : 'text-on-surface'}`}>{addr.type}</span>
                </div>
                <p className="text-xs text-muted leading-relaxed whitespace-pre-line font-medium">{addr.address}</p>
              </div>
            ))}
          </div>
        </section>

        {/* New Address Inputs */}
        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-3 px-1">
            <div className="h-px bg-outline-variant/20 flex-1"></div>
            <span className="text-[10px] text-muted uppercase tracking-widest font-bold">Or enter specific details</span>
            <div className="h-px bg-outline-variant/20 flex-1"></div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 group">
              <label className="text-xs font-bold text-muted uppercase tracking-wider group-focus-within:text-primary transition-colors">Street Address or Area</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-muted text-lg group-focus-within:text-primary transition-colors">search</span>
                <input 
                  className="w-full bg-surface/50 backdrop-blur-sm border border-outline-variant/30 rounded-xl py-4 pl-12 pr-4 text-sm text-on-surface placeholder:text-muted focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all shadow-lg" 
                  type="text" 
                  placeholder="Start typing your address..."
                  value={addressData.street}
                  onChange={(e) => setAddressData({...addressData, street: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 group">
                <label className="text-xs font-bold text-muted uppercase tracking-wider group-focus-within:text-primary transition-colors">House / Flat / Block No. <span className="text-error">*</span></label>
                <input 
                  className="w-full bg-surface/50 backdrop-blur-sm border border-outline-variant/30 rounded-xl py-4 px-4 text-sm text-on-surface placeholder:text-muted focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all shadow-lg" 
                  placeholder="e.g. 4B" 
                  type="text"
                  value={addressData.houseNo}
                  onChange={(e) => setAddressData({...addressData, houseNo: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2 group">
                <label className="text-xs font-bold text-muted uppercase tracking-wider group-focus-within:text-primary transition-colors">Landmark (Optional)</label>
                <input 
                  className="w-full bg-surface/50 backdrop-blur-sm border border-outline-variant/30 rounded-xl py-4 px-4 text-sm text-on-surface placeholder:text-muted focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all shadow-lg" 
                  placeholder="e.g. Near Central Park" 
                  type="text"
                  value={addressData.landmark}
                  onChange={(e) => setAddressData({...addressData, landmark: e.target.value})}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 group">
              <label className="text-xs font-bold text-muted uppercase tracking-wider group-focus-within:text-primary transition-colors">Entry Instructions (Optional)</label>
              <textarea 
                className="w-full bg-surface/50 backdrop-blur-sm border border-outline-variant/30 rounded-xl py-4 px-4 text-sm text-on-surface placeholder:text-muted focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all shadow-lg resize-none" 
                placeholder="Gate code, specific directions, etc." 
                rows="2"
                value={addressData.instructions}
                onChange={(e) => setAddressData({...addressData, instructions: e.target.value})}
              ></textarea>
            </div>
          </div>
        </section>
      </main>

      {/* Fixed Bottom Action Area */}
      <div className="p-4 border-t border-outline-variant/30 bg-surface-container/90 backdrop-blur-xl sticky bottom-0 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="max-w-2xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="text-xs text-muted uppercase tracking-wider font-bold">Next step</p>
            <p className="text-sm font-bold text-on-surface">Payment Method</p>
          </div>
          <button 
            onClick={handleNext}
            className="w-full sm:w-auto flex-1 sm:flex-none gradient-primary text-on-primary font-bold py-3.5 px-10 rounded-full flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg gradient-glow"
          >
            <span>Continue</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}

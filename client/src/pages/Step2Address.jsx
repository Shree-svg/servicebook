import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Step2Address = () => {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState('home');

  const handleNext = () => {
    navigate('/book/step3');
  };

  const goBack = () => {
    navigate('/book/step1');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface font-body selection:bg-primary selection:text-on-primary">
      {/* Transactional Header */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface sticky top-0 z-50">
        <button onClick={goBack} className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="text-center flex flex-col items-center">
          <h1 className="font-headline font-bold text-lg text-on-surface tracking-tight">Service Address</h1>
          <div className="flex items-center gap-1 mt-0.5">
            <div className="w-2 h-1 rounded-full bg-outline-variant"></div>
            <div className="w-4 h-1 rounded-full bg-primary"></div>
            <div className="w-2 h-1 rounded-full bg-outline-variant"></div>
            <div className="w-2 h-1 rounded-full bg-outline-variant"></div>
          </div>
          <p className="text-[10px] text-secondary-fixed mt-1 uppercase tracking-widest font-semibold">Step 2 of 4</p>
        </div>
        <div className="w-10"></div> {/* Spacer for perfect centering */}
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col p-4 gap-8 max-w-2xl mx-auto w-full">
        {/* Map Visual Confirmation Snippet */}
        <section className="flex flex-col gap-3">
          <div className="flex justify-between items-end px-1">
            <h2 className="font-headline font-semibold text-on-surface tracking-tight">Confirm Location</h2>
            <button className="text-xs text-primary flex items-center gap-1 hover:text-primary-fixed transition-colors font-medium">
              <span className="material-symbols-outlined text-[16px]">my_location</span>
              Current
            </button>
          </div>
          <div className="relative w-full h-48 rounded-lg overflow-hidden border border-outline-variant bg-surface-container shadow-sm group">
            {/* Fallback styled image for map */}
            <img 
              alt="Map view" 
              className="w-full h-full object-cover grayscale invert contrast-125 brightness-75 sepia-[.2] hue-rotate-[220deg] saturate-[3] opacity-80 transition-opacity group-hover:opacity-100" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLU6SVl6scSGuId_wGjpsCFrT3iFWWA1hBKVSpPD8Ezal5bIBFc2qbwuGT5EGWADufVvxWwxyqPSDHuHT5u6H9aS4j_DFt2j2ul2lmodUPZRbfHwgZWBorjhYNEbuEmh8zrYkQ8uIHRv3FCfCRuhzqhlDvFe7-YgzdGyyuNn5sr3L8lEBkaNB0wVkIIbiJRJerYy1uaFfAqBUTLlpDdKLxbcABnJtUKV5rRybV79RfFnb9_cs2cOF-hzz8TldPxPkp1vGsIZG_kg"
            />
            {/* Central Pin Marker */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative">
                <span className="material-symbols-outlined text-primary text-4xl drop-shadow-[0_0_12px_rgba(167,139,250,0.6)]" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/50 blur-[2px] rounded-full"></div>
              </div>
            </div>
            {/* Floating address summary on map */}
            <div className="absolute bottom-3 left-3 right-3 bg-surface/90 backdrop-blur-md border border-outline-variant rounded py-2 px-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center border border-outline-variant flex-shrink-0">
                <span className="material-symbols-outlined text-secondary-fixed text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>pin_drop</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-on-surface truncate">Selected Area</p>
                <p className="text-xs text-secondary-fixed truncate">Sector 4, Neo-City, District 9</p>
              </div>
            </div>
          </div>
        </section>

        {/* Saved Addresses */}
        <section className="flex flex-col gap-3">
          <h2 className="font-headline font-semibold text-on-surface px-1 tracking-tight">Saved Addresses</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x px-1" style={{ scrollbarWidth: 'none' }}>
            
            {/* Card 1: Selected */}
            <div 
              onClick={() => setSelectedAddress('home')} 
              className={`min-w-[220px] snap-start rounded-lg p-4 cursor-pointer relative transition-transform active:scale-[0.98] ${selectedAddress === 'home' ? 'border-2 border-primary bg-surface-container-high shadow-[0_0_15px_rgba(167,139,250,0.1)]' : 'border border-outline-variant bg-surface-container hover:bg-surface-container-highest'}`}
            >
              {selectedAddress === 'home' && (
                <div className="absolute top-3 right-3 text-primary">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
              )}
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded ${selectedAddress === 'home' ? 'bg-primary/10 text-primary' : 'bg-surface-container-highest text-secondary-fixed border border-outline-variant'}`}>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                </div>
                <span className="font-semibold text-sm text-on-surface">Home</span>
              </div>
              <p className="text-xs text-secondary-fixed leading-relaxed">123 Obsidian Tower, Apt 4B<br/>Neo-City, 10001</p>
            </div>

            {/* Card 2: Unselected */}
            <div 
              onClick={() => setSelectedAddress('studio')} 
              className={`min-w-[220px] snap-start rounded-lg p-4 cursor-pointer active:scale-[0.98] transition-colors ${selectedAddress === 'studio' ? 'border-2 border-primary bg-surface-container-high shadow-[0_0_15px_rgba(167,139,250,0.1)]' : 'border border-outline-variant bg-surface-container hover:bg-surface-container-highest'}`}
            >
              {selectedAddress === 'studio' && (
                <div className="absolute top-3 right-3 text-primary">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
              )}
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded ${selectedAddress === 'studio' ? 'bg-primary/10 text-primary' : 'bg-surface-container-highest text-secondary-fixed border border-outline-variant'}`}>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
                </div>
                <span className="font-semibold text-sm text-on-surface">Studio</span>
              </div>
              <p className="text-xs text-secondary-fixed leading-relaxed">Floor 42, Zenith Building<br/>Tech Park, 10005</p>
            </div>
          </div>
        </section>

        {/* New Address Inputs */}
        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-3 px-1">
            <div className="h-px bg-outline-variant flex-1"></div>
            <span className="text-[10px] text-secondary-fixed uppercase tracking-widest font-semibold">Or enter specific details</span>
            <div className="h-px bg-outline-variant flex-1"></div>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5 group">
              <label className="text-xs font-medium text-secondary-fixed group-focus-within:text-primary transition-colors">Street Address or Area</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary-fixed text-sm group-focus-within:text-primary transition-colors">search</span>
                <input className="w-full bg-surface-container border border-outline-variant rounded-md py-3 pl-10 pr-3 text-sm text-on-surface placeholder:text-secondary-fixed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-shadow" type="text" defaultValue="Sector 4, Neo-City, District 9"/>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 group">
                <label className="text-xs font-medium text-secondary-fixed group-focus-within:text-primary transition-colors">House / Flat / Block No. <span className="text-error">*</span></label>
                <input className="w-full bg-surface-container border border-outline-variant rounded-md py-3 px-3 text-sm text-on-surface placeholder:text-secondary-fixed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-shadow" placeholder="e.g. 4B" type="text"/>
              </div>
              <div className="flex flex-col gap-1.5 group">
                <label className="text-xs font-medium text-secondary-fixed group-focus-within:text-primary transition-colors">Landmark (Optional)</label>
                <input className="w-full bg-surface-container border border-outline-variant rounded-md py-3 px-3 text-sm text-on-surface placeholder:text-secondary-fixed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-shadow" placeholder="e.g. Near Central Park" type="text"/>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 group">
              <label className="text-xs font-medium text-secondary-fixed group-focus-within:text-primary transition-colors">Entry Instructions (Optional)</label>
              <textarea className="w-full bg-surface-container border border-outline-variant rounded-md py-3 px-3 text-sm text-on-surface placeholder:text-secondary-fixed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-shadow resize-none" placeholder="Gate code, specific directions, etc." rows="2"></textarea>
            </div>
          </div>
        </section>
      </main>

      {/* Fixed Bottom Action Area */}
      <div className="p-4 border-t border-outline-variant bg-surface sticky bottom-0 z-50">
        <div className="max-w-2xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="text-xs text-secondary-fixed">Next step</p>
            <p className="text-sm font-medium text-on-surface">Service Details</p>
          </div>
          <button onClick={handleNext} className="w-full sm:w-auto flex-1 sm:flex-none bg-primary hover:bg-primary-fixed-dim text-on-primary font-bold py-3.5 px-8 rounded-md flex items-center justify-center gap-2 transition-colors active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface">
            <span>Continue</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2Address;

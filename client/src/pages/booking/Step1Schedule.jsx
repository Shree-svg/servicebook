import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/axiosConfig';

export default function Step1Schedule() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceId = queryParams.get('serviceId');

  const [service, setService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]); // Default to tomorrow
  const [selectedSlot, setSelectedSlot] = useState('morning');
  const [currentMonth, setCurrentMonth] = useState('October 2024');

  useEffect(() => {
    if (serviceId) {
      api.get(`/api/services/${serviceId}`)
        .then(res => setService(res.data))
        .catch(err => console.error('Error fetching service:', err));
    }
  }, [serviceId]);

  const handleNext = () => {
    const draft = {
      serviceId,
      service,
      selectedDate,
      selectedSlot,
      createdAt: new Date().toISOString()
    };
    sessionStorage.setItem('bookingDraft', JSON.stringify(draft));
    navigate('/booking/step2');
  };

  const slots = [
    { id: 'morning', label: 'Morning', time: '8:00 AM - 12:00 PM', icon: 'wb_sunny' },
    { id: 'afternoon', label: 'Afternoon', time: '12:00 PM - 4:00 PM', icon: 'partly_cloudy_day' },
    { id: 'evening', label: 'Evening', time: '4:00 PM - 8:00 PM', icon: 'dark_mode' }
  ];

  return (
    <div className="bg-transparent text-on-surface font-body antialiased min-h-screen flex flex-col selection:bg-primary/30 selection:text-primary-fixed">
      {/* Transactional Header */}
      <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 h-16 flex items-center px-4 md:px-8 w-full justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-bright transition-colors group">
            <span className="material-symbols-outlined text-muted group-hover:text-on-surface transition-colors" style={{ fontVariationSettings: "'wght' 300" }}>close</span>
          </button>
          <div>
            <h1 className="font-headline font-bold text-base tracking-tight text-gradient">Schedule Service</h1>
            <p className="font-label text-xs text-muted">Step 1 of 4</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="w-8 h-1 gradient-primary rounded-full shadow-[0_0_10px_rgba(192,132,252,0.4)]"></div>
          <div className="w-8 h-1 bg-surface-container-highest/50 rounded-full"></div>
          <div className="w-8 h-1 bg-surface-container-highest/50 rounded-full"></div>
          <div className="w-8 h-1 bg-surface-container-highest/50 rounded-full"></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-8 flex flex-col gap-8 pb-32">
        <section className="flex flex-col gap-2">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter text-gradient pb-1">When do you need us?</h2>
          <p className="text-muted text-sm md:text-base max-w-md">Select your preferred date and arrival window for the {service?.title || 'Deep Cleaning'} service.</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Calendar Card */}
          <div className="md:col-span-7 gradient-card backdrop-blur-md border border-outline-variant/30 rounded-xl p-5 md:p-6 flex flex-col gap-6 shadow-xl">
            <div className="flex justify-between items-center">
              <h3 className="font-headline font-bold text-lg text-on-surface">{currentMonth}</h3>
              <div className="flex gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-md border border-outline-variant hover:bg-surface-variant transition-colors text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md border border-outline-variant hover:bg-surface-variant transition-colors text-on-surface">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <span key={day} className="text-xs font-medium text-on-surface-variant">{day}</span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-sm">
              <div></div><div></div>
              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                const isPast = day < new Date().getDate();
                const isSelected = selectedDate === day;
                
                if (isPast) {
                  return <button key={day} className="h-10 w-full flex items-center justify-center rounded-full text-muted opacity-30 cursor-not-allowed">{day}</button>;
                }
                
                return (
                  <button 
                    key={day} 
                    onClick={() => {
                      const d = new Date();
                      d.setDate(day);
                      setSelectedDate(d.toISOString().split('T')[0]);
                    }}
                    className={`h-10 w-full flex items-center justify-center rounded-full transition-all relative ${
                      selectedDate === new Date(new Date().setDate(day)).toISOString().split('T')[0] ? 'gradient-primary text-on-primary font-bold shadow-[0_0_15px_rgba(192,132,252,0.4)]' : 'hover:bg-surface-bright text-on-surface'
                    }`}
                  >
                    {day}
                    {isSelected && <span className="absolute -bottom-1 w-1 h-1 bg-on-primary rounded-full"></span>}
                    {day === 12 && !isSelected && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-tertiary rounded-full shadow-[0_0_5px_rgba(103,232,249,0.5)]"></span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots & Context */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="gradient-card backdrop-blur-md border border-outline-variant/30 rounded-xl p-4 flex items-center gap-4 shadow-lg">
              <div className="w-12 h-12 rounded-lg gradient-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'wght' 300" }}>{service?.icon || 'cleaning_services'}</span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-sm text-on-surface">{service?.title || 'Deep Cleaning'}</h4>
                <p className="text-xs text-muted mt-0.5">Est. duration: 4.5 hours</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-headline font-bold text-lg text-on-surface mb-1">Arrival Window</h3>
              {slots.map(slot => (
                <label 
                  key={slot.id} 
                  className={`relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer group shadow-sm ${
                    selectedSlot === slot.id ? 'border-primary bg-primary/10 gradient-glow' : 'border-outline-variant/30 bg-surface/50 backdrop-blur-sm hover:border-primary/50'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="timeslot" 
                    className="sr-only" 
                    checked={selectedSlot === slot.id}
                    onChange={() => setSelectedSlot(slot.id)}
                  />
                  <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedSlot === slot.id ? 'border-primary bg-primary/20' : 'border-outline-variant/50 group-hover:border-primary/50'
                  }`}>
                    {selectedSlot === slot.id && <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(192,132,252,0.8)]"></div>}
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className={`font-bold text-sm transition-colors ${selectedSlot === slot.id ? 'text-primary' : 'text-on-surface group-hover:text-primary'}`}>{slot.label}</span>
                    <span className="text-xs text-muted mt-1">{slot.time}</span>
                  </div>
                  <span className={`material-symbols-outlined transition-all ${selectedSlot === slot.id ? 'text-primary scale-110' : 'text-muted group-hover:text-primary'}`} style={{ fontVariationSettings: "'wght' 300" }}>{slot.icon}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 w-full bg-surface-container/90 backdrop-blur-xl border-t border-outline-variant/30 z-40 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="max-w-3xl mx-auto p-4 md:px-8 flex items-center justify-between gap-4">
          <div className="hidden md:flex flex-col">
            <span className="text-xs text-muted uppercase tracking-wider font-bold">Selected Schedule</span>
            <span className="font-bold text-on-surface text-sm">{selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date'} • {slots.find(s => s.id === selectedSlot)?.label}</span>
          </div>
          <button 
            onClick={handleNext}
            className="w-full md:w-auto gradient-primary text-on-primary px-8 py-3.5 rounded-full font-bold tracking-wide hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 ml-auto shadow-lg gradient-glow"
          >
            Next Step
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'wght' 600" }}>arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}

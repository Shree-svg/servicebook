import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Step1Schedule = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(10);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('morning');

  const handleNext = () => {
    navigate('/book/step2');
  };

  return (
    <div className="bg-background text-on-surface font-body antialiased min-h-screen flex flex-col selection:bg-primary selection:text-on-primary-fixed">
      {/* Transactional Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-outline-variant h-16 flex items-center px-4 md:px-8 w-full justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant transition-colors group">
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-surface transition-colors" style={{ fontVariationSettings: "'wght' 300" }}>close</span>
          </Link>
          <div>
            <h1 className="font-headline font-semibold text-base tracking-tight text-on-surface">Schedule Service</h1>
            <p className="font-label text-xs text-on-surface-variant">Step 1 of 4</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="w-8 h-1 bg-primary rounded-full"></div>
          <div className="w-8 h-1 bg-surface-container-highest rounded-full"></div>
          <div className="w-8 h-1 bg-surface-container-highest rounded-full"></div>
          <div className="w-8 h-1 bg-surface-container-highest rounded-full"></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-8 flex flex-col gap-8 pb-32">
        {/* Header Section */}
        <section className="flex flex-col gap-2">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter text-on-surface">When do you need us?</h2>
          <p className="text-on-surface-variant text-sm md:text-base max-w-md">Select your preferred date and arrival window for the service.</p>
        </section>

        {/* Bento Grid Layout for Selection */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Calendar Card (Spans 7 cols on desktop) */}
          <div className="md:col-span-7 bg-surface-container border border-outline-variant rounded-xl p-5 md:p-6 flex flex-col gap-6">
            {/* Calendar Header */}
            <div className="flex justify-between items-center">
              <h3 className="font-headline font-semibold text-lg text-on-surface">October 2024</h3>
              <div className="flex gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-md border border-outline-variant hover:bg-surface-variant transition-colors text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md border border-outline-variant hover:bg-surface-variant transition-colors text-on-surface">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <span key={day} className="text-xs font-medium text-on-surface-variant">{day}</span>
              ))}
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-sm">
              {/* Empty slots for alignment */}
              <div></div><div></div>

              {/* Past Dates */}
              {[1, 2, 3, 4, 5].map(date => (
                <button key={`past-${date}`} className="h-10 w-full flex items-center justify-center rounded-full text-on-surface-variant opacity-30 cursor-not-allowed">{date}</button>
              ))}

              {/* Available Dates */}
              {Array.from({ length: 26 }, (_, i) => i + 6).map(date => (
                <button
                  key={`available-${date}`}
                  onClick={() => setSelectedDate(date)}
                  className={`h-10 w-full flex items-center justify-center rounded-full transition-colors relative ${selectedDate === date ? 'bg-primary text-on-primary-fixed font-bold shadow-[0_0_12px_rgba(167,139,250,0.3)]' : 'hover:bg-surface-variant text-on-surface'}`}
                >
                  {date}
                  {selectedDate === date && (
                    <span className="absolute -bottom-1 w-1 h-1 bg-on-primary-fixed rounded-full"></span>
                  )}
                  {date === 12 && selectedDate !== 12 && (
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-tertiary rounded-full"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots & Context (Spans 5 cols on desktop) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Context Card */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'wght' 300" }}>cleaning_services</span>
              </div>
              <div>
                <h4 className="font-headline font-semibold text-sm text-on-surface">Deep Cleaning</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">Est. duration: 4.5 hours</p>
              </div>
            </div>

            {/* Time Slots Container */}
            <div className="flex flex-col gap-3">
              <h3 className="font-headline font-semibold text-lg text-on-surface mb-1">Arrival Window</h3>

              {/* Time Slots */}
              {[
                { id: 'morning', label: 'Morning', time: '8:00 AM - 12:00 PM', icon: 'wb_sunny' },
                { id: 'afternoon', label: 'Afternoon', time: '12:00 PM - 4:00 PM', icon: 'partly_cloudy_day' },
                { id: 'evening', label: 'Evening', time: '4:00 PM - 8:00 PM', icon: 'dark_mode' },
              ].map(slot => (
                <label key={slot.id} onClick={() => setSelectedTimeSlot(slot.id)} className={`relative flex items-start gap-4 p-4 rounded-xl border ${selectedTimeSlot === slot.id ? 'border-primary bg-primary/5' : 'border-outline-variant bg-surface-container hover:bg-surface-variant'} cursor-pointer group transition-colors`}>
                  <input type="radio" name="timeslot" className="sr-only" checked={selectedTimeSlot === slot.id} readOnly />
                  <div className={`mt-0.5 w-5 h-5 rounded-full border-2 ${selectedTimeSlot === slot.id ? 'border-primary' : 'border-outline-variant group-hover:border-primary/50'} flex items-center justify-center transition-colors`}>
                    {selectedTimeSlot === slot.id && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className={`font-medium text-sm transition-colors ${selectedTimeSlot === slot.id ? 'text-on-surface' : 'text-on-surface group-hover:text-primary'}`}>{slot.label}</span>
                    <span className="text-xs text-on-surface-variant mt-1">{slot.time}</span>
                  </div>
                  <span className={`material-symbols-outlined transition-colors ${selectedTimeSlot === slot.id ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`} style={{ fontVariationSettings: "'wght' 300" }}>{slot.icon}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 w-full bg-surface-container-low border-t border-outline-variant z-40 pb-safe">
        <div className="max-w-3xl mx-auto p-4 md:px-8 flex items-center justify-between gap-4">
          <div className="hidden md:flex flex-col">
            <span className="text-xs text-on-surface-variant">Selected</span>
            <span className="font-medium text-on-surface text-sm">Oct {selectedDate} • {selectedTimeSlot.charAt(0).toUpperCase() + selectedTimeSlot.slice(1)}</span>
          </div>
          <button onClick={handleNext} className="w-full md:w-auto bg-primary text-on-primary-fixed px-8 py-3.5 rounded-lg font-semibold tracking-wide hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 ml-auto">
            Next Step
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'wght' 600" }}>arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1Schedule;

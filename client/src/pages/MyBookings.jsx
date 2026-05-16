import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingBookings = [
    {
      id: 1,
      service: 'Premium Home Cleaning',
      provider: 'Maria Jenkins',
      providerImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      date: 'Oct 24, 2024',
      time: '10:00 AM',
      price: '$85.00',
      status: 'Tomorrow',
      img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      service: 'Faucet Repair',
      provider: 'Robert Taylor',
      providerImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      date: 'Oct 28, 2024',
      time: '02:30 PM',
      price: '$120.00',
      status: 'In 5 days',
      img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const pastBookings = [
    {
      id: 3,
      service: 'Garden Maintenance',
      date: 'Oct 02, 2024',
      price: '$65.00',
      status: 'Completed'
    },
    {
      id: 4,
      service: 'End of Lease Clean',
      date: 'Sep 15, 2024',
      price: '$210.00',
      status: 'Completed'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface font-body pb-24 md:pb-12">
      <header className="fixed top-0 w-full z-50 bg-surface-container-low/70 backdrop-blur-xl border-b border-outline-variant/30 h-16 flex items-center px-margin-mobile md:px-margin-desktop justify-between">
        <div className="flex items-center gap-m3-md">
          <Link to="/dashboard">
            <span className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-colors">arrow_back</span>
          </Link>
          <h1 className="font-headline text-headline-md text-primary font-bold">My Bookings</h1>
        </div>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
          <img alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC10AJng9b4y4M0aHxu1odcmuZB3AbB-h4K5kePCeTgvI6MuDt51y2iC0yTn_5CvyFZlxM-BdsfDW_WI3TRMSHC4aN4kbhxQql9ejcPTzBaCVsJDUdYMdYMgKp4PEvfHwtBjsgZbORj_k72akDpHFQPFjSR2uJp4plV5A1u2d10E122suhwHXHU4wMvq9-ABNjKFtyPUisKsL-643Y46-HSONx1QIcAGAxtm_-N9vQIqpnZv7rAowTV9xOhJH5cdvega4mEe3wdqA" />
        </div>
      </header>

      <main className="pt-24 px-margin-mobile md:px-margin-desktop max-w-2xl mx-auto">
        {/* Tabs */}
        <div className="flex p-1 bg-surface-container-low rounded-xl mb-m3-lg border border-outline-variant/20">
          <button 
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-2 rounded-lg font-label text-label-md transition-all ${activeTab === 'upcoming' ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-2 rounded-lg font-label text-label-md transition-all ${activeTab === 'past' ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Past
          </button>
        </div>

        {/* List Content */}
        <div className="space-y-m3-lg">
          {activeTab === 'upcoming' ? (
            upcomingBookings.map(booking => (
              <div key={booking.id} className="bg-surface-container-lowest/60 backdrop-blur-md border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm hover:border-primary/50 transition-all group">
                <div className="relative h-32 w-full overflow-hidden">
                  <img src={booking.img} alt={booking.service} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-m3-md left-m3-md">
                    <h3 className="font-headline text-headline-sm text-on-surface">{booking.service}</h3>
                    <p className="text-primary font-bold">{booking.price}</p>
                  </div>
                  <div className="absolute top-m3-md right-m3-md bg-primary/20 backdrop-blur-md border border-primary/30 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {booking.status}
                  </div>
                </div>
                <div className="p-m3-lg">
                  <div className="flex items-center justify-between mb-m3-lg">
                    <div className="flex items-center gap-m3-md">
                      <div className="w-10 h-10 rounded-full border border-primary/20 p-0.5">
                        <img src={booking.providerImg} alt={booking.provider} className="w-full h-full rounded-full object-cover" />
                      </div>
                      <div>
                        <p className="font-label text-label-md text-on-surface">{booking.provider}</p>
                        <p className="text-on-surface-variant text-xs">{booking.date} • {booking.time}</p>
                      </div>
                    </div>
                    <Link to="/track" className="bg-primary/10 text-primary p-2 rounded-full hover:bg-primary hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined">near_me</span>
                    </Link>
                  </div>
                  <div className="flex gap-m3-md">
                    <button className="flex-1 py-3 bg-surface-variant/50 hover:bg-surface-variant text-on-surface rounded-xl font-label text-label-md transition-colors border border-outline-variant/20">Reschedule</button>
                    <button className="px-m3-lg py-3 border border-error/30 text-error hover:bg-error/10 rounded-xl font-label text-label-md transition-colors">Cancel</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-m3-md">
              {pastBookings.map(booking => (
                <div key={booking.id} className="bg-surface-container-lowest/40 border border-outline-variant/20 p-m3-lg rounded-2xl flex items-center justify-between hover:bg-surface-container-low/40 transition-colors">
                  <div className="flex items-center gap-m3-lg">
                    <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                    <div>
                      <h4 className="font-headline text-on-surface">{booking.service}</h4>
                      <p className="text-on-surface-variant text-sm">{booking.date} • {booking.price}</p>
                    </div>
                  </div>
                  <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">receipt_long</span>
                  </button>
                </div>
              ))}
              <div className="pt-m3-lg text-center">
                <p className="text-on-surface-variant font-body text-sm mb-m3-lg">Looking for older bookings?</p>
                <button className="px-m3-xl py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-primary font-label text-label-md hover:bg-primary hover:text-on-primary transition-all">Download Booking History</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyBookings;

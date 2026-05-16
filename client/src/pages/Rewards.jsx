import React from 'react';
import { Link } from 'react-router-dom';

const Rewards = () => {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col pb-24 md:pb-0 antialiased selection:bg-primary/30 selection:text-primary-fixed">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface-container-low/70 backdrop-blur-xl border-b border-outline-variant/30 h-16 flex items-center px-margin-mobile md:px-margin-desktop justify-between shadow-sm">
        <div className="flex items-center gap-m3-md">
          <Link to="/dashboard" className="mr-m3-md md:hidden">
            <span className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-colors">arrow_back</span>
          </Link>
          <Link to="/" className="font-headline-md text-headline-md text-primary font-bold tracking-tight">ServiceBook</Link>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link className="font-body text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-variant/50 px-3 py-2 rounded-md" to="/">Home</Link>
          <Link className="font-body text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-variant/50 px-3 py-2 rounded-md" to="/bookings">Bookings</Link>
          <Link className="font-body text-primary font-bold active:scale-95 duration-200 bg-primary/10 px-3 py-2 rounded-md" to="/rewards">Rewards</Link>
          <Link className="font-body text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-variant/50 px-3 py-2 rounded-md" to="/profile">Profile</Link>
        </nav>
        <button className="text-primary hover:bg-surface-variant/50 transition-colors p-2 rounded-full active:scale-95 duration-200">
          <span className="material-symbols-outlined">search</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 pt-24 md:pt-28 flex flex-col gap-8">
        {/* Header Section */}
        <section className="flex flex-col gap-2 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-on-surface">Your Rewards</h1>
          <p className="text-secondary font-body">Earn points, unlock tiers, and claim exclusive perks.</p>
        </section>

        {/* Balance Card - Glassmorphism Bento */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up delay-75">
          {/* Points Display */}
          <div className="bg-surface-container-low/60 backdrop-blur-xl rounded-2xl p-8 flex flex-col justify-between md:col-span-2 relative overflow-hidden group border border-outline-variant/30 shadow-lg">
            {/* Decorative gradient blob */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>
            
            <div className="z-10 flex flex-col gap-1">
              <span className="text-on-surface-variant font-label uppercase tracking-widest text-xs font-semibold">Current Balance</span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-7xl font-display font-bold text-on-surface tracking-tighter">1,240</span>
                <span className="text-primary font-body font-medium">Points</span>
              </div>
            </div>

            <div className="z-10 mt-12 flex flex-col gap-3">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-on-surface font-semibold flex items-center gap-1">
                    Gold Tier <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </span>
                  <span className="text-xs text-on-surface-variant">260 points away from Platinum</span>
                </div>
                <span className="text-xs font-medium text-secondary">1500</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(167,139,250,0.4)]" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>

          {/* Quick Action / Status */}
          <div className="bg-surface-container-low/60 backdrop-blur-xl rounded-2xl p-6 flex flex-col gap-4 justify-center items-center text-center border border-outline-variant/30 shadow-lg">
            <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center border border-outline-variant mb-2">
              <span className="material-symbols-outlined text-3xl text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
            </div>
            <h3 className="text-lg font-headline font-semibold text-on-surface">Platinum Perks Await</h3>
            <p className="text-sm text-secondary font-body">Reach the next tier for double points on every booking and waived service fees.</p>
            <button className="mt-2 w-full px-4 py-2 bg-transparent border border-outline text-on-surface rounded-lg hover:bg-surface-variant transition-colors text-sm font-medium">View Tier Benefits</button>
          </div>
        </section>

        {/* Rewards Gallery */}
        <section className="flex flex-col gap-6 mt-4 animate-slide-up delay-150">
          <div className="flex justify-between items-end">
            <h2 className="text-xl font-headline font-semibold tracking-tight text-on-surface">Rewards Gallery</h2>
            <Link className="text-sm text-primary hover:underline font-medium" to="#">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Perk 1 */}
            <div className="bg-surface-container rounded-xl border border-outline-variant/50 p-5 flex flex-col gap-4 hover:border-primary/50 transition-colors group cursor-pointer shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center border border-outline-variant">
                <span className="material-symbols-outlined text-primary">cleaning_services</span>
              </div>
              <div className="flex flex-col flex-grow">
                <h4 className="font-headline font-semibold text-on-surface mb-1">15% Off Next Cleaning</h4>
                <p className="text-sm text-secondary line-clamp-2">Apply this discount to any standard home cleaning service.</p>
              </div>
              <div className="flex justify-between items-center mt-2 pt-4 border-t border-outline-variant/30">
                <span className="text-primary font-bold text-sm">500 pts</span>
                <button className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors font-medium">Redeem</button>
              </div>
            </div>

            {/* Perk 2 */}
            <div className="bg-surface-container rounded-xl border border-outline-variant/50 p-5 flex flex-col gap-4 hover:border-primary/50 transition-colors group cursor-pointer shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center border border-outline-variant">
                <span className="material-symbols-outlined text-tertiary">bolt</span>
              </div>
              <div className="flex flex-col flex-grow">
                <h4 className="font-headline font-semibold text-on-surface mb-1">Free Priority Scheduling</h4>
                <p className="text-sm text-secondary line-clamp-2">Skip the queue. Get guaranteed booking within 24 hours.</p>
              </div>
              <div className="flex justify-between items-center mt-2 pt-4 border-t border-outline-variant/30">
                <span className="text-primary font-bold text-sm">800 pts</span>
                <button className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors font-medium">Redeem</button>
              </div>
            </div>

            {/* Perk 3 */}
            <div className="bg-surface-container rounded-xl border border-outline-variant/50 p-5 flex flex-col gap-4 hover:border-primary/50 transition-colors group cursor-pointer shadow-sm sm:hidden md:flex">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center border border-outline-variant">
                <span className="material-symbols-outlined text-primary">redeem</span>
              </div>
              <div className="flex flex-col flex-grow">
                <h4 className="font-headline font-semibold text-on-surface mb-1">$50 Service Credit</h4>
                <p className="text-sm text-secondary line-clamp-2">Direct credit applied to your wallet for any future service.</p>
              </div>
              <div className="flex justify-between items-center mt-2 pt-4 border-t border-outline-variant/30">
                <span className="text-primary font-bold text-sm">1,200 pts</span>
                <button className="text-xs bg-primary text-on-primary px-3 py-1.5 rounded-lg hover:bg-primary-fixed-dim transition-colors font-medium shadow-md shadow-primary/20">Redeem</button>
              </div>
            </div>
          </div>
        </section>

        {/* Refer & Earn */}
        <section className="mt-4 mb-12 animate-slide-up delay-200">
          <div className="bg-surface-container-low/60 backdrop-blur-xl rounded-2xl flex flex-col md:flex-row items-center border border-outline-variant/30 overflow-hidden shadow-lg">
            <div className="p-8 md:w-2/3 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 bg-surface-container-low w-max px-3 py-1 rounded-full border border-outline-variant text-[10px] font-bold uppercase tracking-widest text-secondary">
                <span className="material-symbols-outlined text-sm">group_add</span> Referrals
              </div>
              <h2 className="text-2xl font-headline font-bold text-on-surface tracking-tight">Refer & Earn 500 Points</h2>
              <p className="text-secondary font-body max-w-md">Invite friends to ServiceBook. When they book their first service, you both get a massive points boost.</p>
              <div className="flex gap-2 mt-2 w-full max-w-sm">
                <div className="bg-surface-container-highest border border-outline-variant rounded-lg px-3 py-3 flex-grow flex items-center justify-between font-mono text-sm text-on-surface">
                  <span>SBOOK-ALEX99</span>
                  <span className="material-symbols-outlined text-base hover:text-primary cursor-pointer transition-colors">content_copy</span>
                </div>
                <button className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold hover:bg-primary-fixed-dim transition-all active:scale-95 shadow-md shadow-primary/20 whitespace-nowrap">Share Link</button>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3 h-full min-h-[240px] bg-surface-container-highest/30 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-tertiary/5 flex items-center justify-center p-6">
                <div className="grid grid-cols-2 gap-4 opacity-50">
                  <div className="w-16 h-16 rounded-xl bg-surface border border-outline-variant flex items-center justify-center shadow-sm"><span className="material-symbols-outlined text-secondary">person</span></div>
                  <div className="w-16 h-16 rounded-xl bg-surface border border-outline-variant flex items-center justify-center translate-y-4 shadow-sm"><span className="material-symbols-outlined text-primary">arrow_forward</span></div>
                  <div className="w-16 h-16 rounded-xl bg-surface border border-outline-variant flex items-center justify-center -translate-y-4 shadow-sm"><span className="material-symbols-outlined text-tertiary">star</span></div>
                  <div className="w-16 h-16 rounded-xl bg-surface border border-outline-variant flex items-center justify-center shadow-sm"><span className="material-symbols-outlined text-secondary">person_add</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 w-full z-50 rounded-t-2xl bg-surface-container-low/80 backdrop-blur-xl border-t border-outline-variant/30 shadow-lg md:hidden">
        <div className="flex justify-around items-center h-20 w-full px-4 pb-safe">
          <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-90 duration-200 p-2 rounded-lg" to="/">
            <span className="material-symbols-outlined">home</span>
            <span className="font-label text-[10px] mt-1 font-bold uppercase tracking-wider">Home</span>
          </Link>
          <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-90 duration-200 p-2 rounded-lg" to="/bookings">
            <span className="material-symbols-outlined">event_note</span>
            <span className="font-label text-[10px] mt-1 font-bold uppercase tracking-wider">Bookings</span>
          </Link>
          <Link className="flex flex-col items-center justify-center bg-primary/10 text-primary rounded-2xl px-4 py-2 hover:bg-primary/20 transition-colors active:scale-90 duration-200" to="/rewards">
            <span className="material-symbols-outlined font-black" style={{ fontVariationSettings: "'FILL' 1" }}>redeem</span>
            <span className="font-label text-[10px] mt-1 font-bold uppercase tracking-wider">Rewards</span>
          </Link>
          <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-90 duration-200 p-2 rounded-lg" to="/profile">
            <span className="material-symbols-outlined">person</span>
            <span className="font-label text-[10px] mt-1 font-bold uppercase tracking-wider">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Rewards;

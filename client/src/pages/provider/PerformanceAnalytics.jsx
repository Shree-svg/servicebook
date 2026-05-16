import React from 'react';
import { Link } from 'react-router-dom';

const PerformanceAnalytics = () => {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col md:flex-row font-body">
      {/* NavigationDrawer (Web) */}
      <nav className="hidden md:flex flex-col h-screen w-80 rounded-r-xl border-r border-outline-variant shadow-xl bg-surface-container-low p-4 gap-2 sticky top-0 shrink-0 z-40">
        <div className="flex items-center gap-3 mb-6 px-2">
          <img 
            alt="User avatar" 
            className="w-12 h-12 rounded-full object-cover border border-outline-variant" 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
          />
          <div>
            <h2 className="text-lg font-bold text-on-surface">Alex Dev</h2>
            <p className="text-sm text-on-surface-variant">Premium Member</p>
            <span className="text-xs text-tertiary flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>Active
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <Link to="/provider/dashboard" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest rounded-lg transition-all duration-200">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>
          <Link to="/provider/jobs" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest rounded-lg transition-all duration-200">
            <span className="material-symbols-outlined">event_available</span>
            Bookings
          </Link>
          <Link to="/provider/performance" className="flex items-center gap-3 px-3 py-2 bg-primary-container text-on-primary-container font-medium rounded-lg hover:bg-surface-container-highest transition-all duration-200">
            <span className="material-symbols-outlined">analytics</span>
            Performance
          </Link>
          <Link to="/provider/wallet" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest rounded-lg transition-all duration-200">
            <span className="material-symbols-outlined">account_balance_wallet</span>
            Wallet
          </Link>
        </div>
        <div className="mt-auto flex flex-col gap-1 pt-4 border-t border-outline-variant">
          <Link to="/provider/settings" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest rounded-lg transition-all duration-200">
            <span className="material-symbols-outlined">settings</span>
            Settings
          </Link>
          <Link to="/" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest rounded-lg transition-all duration-200">
            <span className="material-symbols-outlined">logout</span>
            Logout
          </Link>
        </div>
      </nav>

      {/* TopAppBar (Mobile) */}
      <header className="md:hidden fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-surface border-b border-outline-variant">
        <button className="p-2 -ml-2 text-primary active:scale-95 duration-100 hover:bg-surface-container-high transition-colors rounded-full">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h1 className="font-headline tracking-tight text-on-surface text-xl font-black text-primary">ServiceBook</h1>
        <img 
          alt="User profile avatar" 
          className="w-8 h-8 rounded-full border border-outline-variant object-cover" 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
        />
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-8 pb-24">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface mb-2">Performance Insights</h1>
          <p className="text-on-surface-variant text-sm md:text-base">Comprehensive analytics and metrics for your service business.</p>
        </div>

        {/* Metrics Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-surface-container rounded-xl border border-outline-variant p-6 relative overflow-hidden group hover:border-primary transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <h3 className="text-sm font-medium text-on-surface-variant mb-1">Average Rating</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-on-surface tracking-tight">4.9</span>
              <span className="text-on-surface-variant text-sm">/ 5</span>
            </div>
            <div className="mt-4 flex items-center text-sm text-tertiary gap-1">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              <span>+0.2 this month</span>
            </div>
          </div>

          <div className="bg-surface-container rounded-xl border border-outline-variant p-6 relative overflow-hidden group hover:border-primary transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <h3 className="text-sm font-medium text-on-surface-variant mb-1">Completion Rate</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-on-surface tracking-tight">98%</span>
            </div>
            <div className="mt-4 flex items-center text-sm text-tertiary gap-1">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              <span>Consistently high</span>
            </div>
          </div>

          <div className="bg-surface-container rounded-xl border border-outline-variant p-6 relative overflow-hidden group hover:border-primary transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
            </div>
            <h3 className="text-sm font-medium text-on-surface-variant mb-1">Total Jobs</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-on-surface tracking-tight">142</span>
            </div>
            <div className="mt-4 flex items-center text-sm text-on-surface-variant gap-1">
              <span>Lifetime total</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface-container rounded-xl border border-outline-variant p-6 h-80 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-on-surface">Earnings Growth</h3>
              <span className="text-xs text-on-surface-variant">Last 6 Months</span>
            </div>
            <div className="flex-1 flex items-end gap-2 px-2">
              {[40, 65, 30, 85, 55, 90].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/20 rounded-t-md relative group hover:bg-primary/40 transition-all cursor-pointer" style={{ height: `${h}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container-highest border border-outline-variant px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                    ${h * 10}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-2 text-[10px] text-on-surface-variant">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            </div>
          </div>
          <div className="bg-surface-container rounded-xl border border-outline-variant p-6 h-80 flex flex-col">
             <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-on-surface">Customer Feedback</h3>
              <span className="text-xs text-tertiary">96% Positive</span>
            </div>
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              {[
                { name: "Sarah M.", comment: "Excellent work on the deep clean!", rating: 5 },
                { name: "John D.", comment: "Very professional and punctual.", rating: 5 },
                { name: "Emma W.", comment: "Great attention to detail.", rating: 4 }
              ].map((f, i) => (
                <div key={i} className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/30">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold text-on-surface">{f.name}</span>
                    <div className="flex text-primary">
                      {Array(f.rating).fill(0).map((_, j) => <span key={j} className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                    </div>
                  </div>
                  <p className="text-xs text-on-surface-variant italic">"{f.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* BottomNavBar (Mobile) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center px-2 py-3 bg-surface-container border-t border-outline-variant">
        <Link to="/provider/dashboard" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-[24px]">dashboard</span>
          <span className="text-xs mt-1">Dashboard</span>
        </Link>
        <Link to="/provider/jobs" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-[24px]">receipt_long</span>
          <span className="text-xs mt-1">Queue</span>
        </Link>
        <Link to="/provider/performance" className="flex flex-col items-center justify-center text-primary active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
          <span className="text-xs mt-1 font-medium">Performance</span>
        </Link>
        <Link to="/provider/wallet" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
          <span className="text-xs mt-1">Wallet</span>
        </Link>
      </nav>
    </div>
  );
};

export default PerformanceAnalytics;

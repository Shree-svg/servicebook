import React from 'react';
import { Link } from 'react-router-dom';

const ProviderDashboard = () => {
  return (
    <div className="bg-background text-on-surface antialiased min-h-screen flex flex-col pt-16 pb-24 md:pb-0 md:pl-72 font-body">
      {/* TopAppBar */}
      <header className="bg-surface fixed top-0 w-full z-50 flex items-center justify-between px-4 md:px-8 h-16 md:hidden border-b border-outline-variant">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant">
            <img alt="User Profile Avatar" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
          </div>
          <h1 className="text-xl text-primary font-bold tracking-tight">ServiceBook</h1>
        </div>
      </header>

      {/* SideNav (Desktop) */}
      <nav className="hidden md:flex flex-col py-6 bg-surface-container-lowest border-r border-outline-variant shadow-md fixed h-full w-72 top-0 left-0 z-40">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant">
              <img alt="Provider Profile Image" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
            </div>
            <div>
              <h2 className="text-primary font-bold tracking-tight">Alex Johnson</h2>
              <p className="text-sm text-tertiary">Verified Provider</p>
              <p className="text-xs text-on-surface-variant">Rating: 4.9/5</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 px-2">
          <Link to="/provider/dashboard" className="flex items-center gap-3 py-3 px-4 bg-primary-container text-on-primary-container rounded-lg font-semibold shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined">dashboard</span> Dashboard
          </Link>
          <Link to="/provider/jobs" className="flex items-center gap-3 py-3 px-4 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-lg">
            <span className="material-symbols-outlined">construction</span> My Services
          </Link>
          <Link to="/provider/performance" className="flex items-center gap-3 py-3 px-4 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-lg">
            <span className="material-symbols-outlined">analytics</span> Performance
          </Link>
          <Link to="/provider/wallet" className="flex items-center gap-3 py-3 px-4 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-lg">
            <span className="material-symbols-outlined">account_balance_wallet</span> Wallet
          </Link>
          <div className="mt-auto pt-4 border-t border-outline-variant">
            <Link to="/provider/settings" className="flex items-center gap-3 py-3 px-4 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-lg">
              <span className="material-symbols-outlined">settings</span> Settings
            </Link>
            <Link to="/" className="flex items-center gap-3 py-3 px-4 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-lg">
              <span className="material-symbols-outlined">logout</span> Logout
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Provider Dashboard</h1>
          <p className="text-on-surface-variant">Welcome back, Alex. Here's your business at a glance.</p>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Earnings Summary */}
          <div className="col-span-1 lg:col-span-2 bg-surface-container border border-outline-variant rounded-xl p-6 flex flex-col justify-between hover:border-primary transition-colors cursor-pointer group">
            <div>
              <h3 className="text-sm font-medium text-on-surface-variant uppercase tracking-wider mb-1">Today's Earnings</h3>
              <p className="text-4xl font-bold text-on-surface tracking-tighter">$320.00</p>
            </div>
            <div className="flex items-center gap-2 text-tertiary text-sm mt-4">
              <span className="material-symbols-outlined text-[18px]">trending_up</span>
              <span>+15% from yesterday</span>
            </div>
          </div>

          {/* Jobs Summary */}
          <div className="col-span-1 bg-surface-container border border-outline-variant rounded-xl p-6 flex flex-col justify-between hover:border-primary transition-colors cursor-pointer group">
            <div>
              <h3 className="text-sm font-medium text-on-surface-variant uppercase tracking-wider mb-1">Active Job</h3>
              <p className="text-xl font-bold text-on-surface">Deep Cleaning</p>
            </div>
            <Link to="/provider/jobs" className="text-primary text-sm font-bold flex items-center gap-1 mt-4">
              Track Progress <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </Link>
          </div>

          {/* Performance Summary */}
          <div className="col-span-1 bg-surface-container border border-outline-variant rounded-xl p-6 flex flex-col justify-between hover:border-primary transition-colors cursor-pointer group">
            <div>
              <h3 className="text-sm font-medium text-on-surface-variant uppercase tracking-wider mb-1">Rating</h3>
              <div className="flex items-center gap-1">
                <p className="text-4xl font-bold text-on-surface">4.9</p>
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>
            <div className="text-on-surface-variant text-sm mt-4">
              From 142 reviews
            </div>
          </div>

          {/* Next Booking Card */}
          <div className="col-span-1 lg:col-span-2 bg-surface-container border border-outline-variant rounded-xl p-6 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-8xl text-primary">calendar_today</span>
            </div>
            <h3 className="text-lg font-bold mb-4">Next Booking</h3>
            <div className="flex items-center gap-4">
              <div className="bg-surface-container-high p-3 rounded-lg border border-outline-variant">
                <span className="text-primary font-bold block text-center">14</span>
                <span className="text-[10px] text-on-surface-variant uppercase">May</span>
              </div>
              <div>
                <p className="font-bold text-on-surface">Standard Clean • David Chen</p>
                <p className="text-sm text-on-surface-variant">Starts in 2 hours (14:00)</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-span-1 lg:col-span-2 grid grid-cols-2 gap-4">
            <Link to="/provider/wallet" className="bg-surface-container border border-outline-variant rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-primary text-3xl">account_balance_wallet</span>
              <span className="text-sm font-bold">Withdraw</span>
            </Link>
            <Link to="/provider/settings" className="bg-surface-container border border-outline-variant rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-primary text-3xl">settings</span>
              <span className="text-sm font-bold">Settings</span>
            </Link>
          </div>
        </div>
      </main>

      {/* BottomNavBar (Mobile) */}
      <nav className="md:hidden bg-surface fixed bottom-0 w-full z-50 rounded-t-xl border-t border-outline-variant shadow-lg flex justify-around items-center h-20 px-4 pb-safe">
        <Link to="/provider/dashboard" className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-2xl px-4 py-1 w-16 h-14">
          <span className="material-symbols-outlined text-2xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-xs font-bold">Home</span>
        </Link>
        <Link to="/provider/jobs" className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-primary/5 w-16 h-14 rounded-lg">
          <span className="material-symbols-outlined text-2xl mb-1">construction</span>
          <span className="text-xs">Services</span>
        </Link>
        <Link to="/provider/wallet" className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-primary/5 w-16 h-14 rounded-lg">
          <span className="material-symbols-outlined text-2xl mb-1">account_balance_wallet</span>
          <span className="text-xs">Wallet</span>
        </Link>
        <Link to="/provider/settings" className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-primary/5 w-16 h-14 rounded-lg">
          <span className="material-symbols-outlined text-2xl mb-1">person</span>
          <span className="text-xs">Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default ProviderDashboard;

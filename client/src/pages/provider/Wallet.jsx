import React from 'react';
import { Link } from 'react-router-dom';

const Wallet = () => {
  return (
    <div className="bg-background text-on-surface font-body antialiased min-h-screen selection:bg-primary/30 selection:text-primary-fixed">
      {/* TopAppBar */}
      <header className="fixed w-full top-0 z-50 bg-background border-b border-outline-variant flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:bg-surface-container transition-colors p-2 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <span className="text-xl font-bold tracking-tighter text-on-surface">ServiceBook</span>
        </div>
        <div className="h-8 w-8 rounded-full bg-surface-container-highest border border-outline-variant overflow-hidden flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer active:opacity-80">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-24 px-4 md:px-8 max-w-6xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-end justify-between py-2">
          <h1 className="text-2xl font-bold tracking-tight text-on-surface">Wallet</h1>
          <span className="text-sm text-on-surface-variant">Last updated: Just now</span>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Balance Card */}
          <div className="col-span-1 md:col-span-2 bg-surface-container/80 backdrop-blur-sm border border-outline-variant rounded-xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[160px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <h2 className="text-on-surface-variant text-sm uppercase tracking-widest font-medium mb-1">Total Balance</h2>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl md:text-6xl font-bold text-on-surface tracking-tighter">$4,850.00</span>
            </div>
            <div className="flex items-center gap-1 mt-3 text-tertiary bg-tertiary/10 border border-tertiary/20 w-fit px-2 py-1 rounded-md text-xs font-medium">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>+12.5% vs last week</span>
            </div>
          </div>

          {/* Available Payout Card */}
          <div className="col-span-1 bg-surface-container border border-outline-variant rounded-xl p-6 flex flex-col justify-between min-h-[160px]">
            <div>
              <h2 className="text-on-surface-variant text-sm uppercase tracking-widest font-medium mb-1">Available for Payout</h2>
              <span className="text-3xl font-bold text-primary tracking-tight">$1,240.50</span>
            </div>
            <button className="w-full mt-4 bg-primary text-on-primary font-bold py-2.5 px-4 rounded-lg hover:bg-primary-container transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">account_balance</span>
              Withdraw Funds
            </button>
          </div>

          {/* Chart Section */}
          <div className="col-span-1 md:col-span-3 bg-surface-container/60 backdrop-blur-sm border border-outline-variant rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h3 className="text-lg font-semibold text-on-surface">Earnings Overview</h3>
              <div className="flex bg-surface-container-lowest rounded-lg p-1 border border-outline-variant w-fit">
                <button className="bg-surface border border-outline-variant text-on-surface rounded-md px-4 py-1.5 text-sm font-medium shadow-sm transition-colors">Weekly</button>
                <button className="text-on-surface-variant hover:text-on-surface px-4 py-1.5 text-sm font-medium transition-colors">Monthly</button>
                <button className="text-on-surface-variant hover:text-on-surface px-4 py-1.5 text-sm font-medium transition-colors">Yearly</button>
              </div>
            </div>
            {/* Abstract Bar Chart */}
            <div className="h-48 flex items-end justify-between gap-2 md:gap-4 px-2">
              {[40, 65, 30, 90, 50, 75, 45].map((h, i) => (
                <div key={i} className="w-full h-full flex flex-col justify-end group">
                  <div className={`w-full bg-surface-container-high rounded-t-md relative h-[${h}%] transition-all duration-300 group-hover:bg-outline-variant border-t border-transparent group-hover:border-primary/50`}>
                    <div className={`absolute bottom-0 w-full rounded-t-md h-full ${h === 90 ? 'bg-primary/40' : 'bg-primary/20'}`}></div>
                    {h === 90 && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface-container-lowest border border-outline-variant px-2 py-1 rounded text-xs text-on-surface font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        $420.00
                      </div>
                    )}
                  </div>
                  <span className={`text-center text-xs mt-3 ${h === 90 ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="col-span-1 md:col-span-3 bg-surface-container/60 backdrop-blur-sm border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container/40">
              <h3 className="text-lg font-semibold text-on-surface">Recent Transactions</h3>
              <button className="text-sm font-medium text-primary hover:text-primary-fixed transition-colors">View All</button>
            </div>
            <div className="divide-y divide-outline-variant/50">
              {[
                { type: 'cleaning_services', title: 'Deep Cleaning', time: 'Today, 2:30 PM', amount: '+$150.00', pos: true },
                { type: 'plumbing', title: 'Plumbing Repair', time: 'Yesterday, 10:15 AM', amount: '+$280.00', pos: true },
                { type: 'account_balance', title: 'Bank Payout', time: 'Oct 24, 2023', amount: '-$500.00', pos: false },
                { type: 'handyman', title: 'Furniture Assembly', time: 'Oct 22, 2023', amount: '+$85.50', pos: true }
              ].map((t, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-surface-container-high transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface-container-lowest border border-outline-variant flex items-center justify-center text-on-surface-variant group-hover:text-tertiary group-hover:border-tertiary/30 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">{t.type}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-on-surface">{t.title}</h4>
                      <span className="text-xs text-on-surface-variant">{t.time}</span>
                    </div>
                  </div>
                  <span className={`text-base font-bold ${t.pos ? 'text-tertiary' : 'text-on-surface'}`}>{t.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 pb-safe bg-surface-container border-t border-outline-variant z-50 md:hidden">
        <Link to="/provider/dashboard" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-95 transition-transform gap-1 w-16">
          <span className="material-symbols-outlined text-2xl">dashboard</span>
          <span className="text-xs">Dashboard</span>
        </Link>
        <button className="flex flex-col items-center justify-center text-primary font-bold active:scale-95 transition-transform gap-1 w-16 relative">
          <span className="absolute -top-3 w-8 h-1 bg-primary rounded-b-full"></span>
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
          <span className="text-xs">Wallet</span>
        </button>
        <Link to="/provider/jobs" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-95 transition-transform gap-1 w-16">
          <span className="material-symbols-outlined text-2xl">verified_user</span>
          <span className="text-xs">Queue</span>
        </Link>
        <Link to="/provider/settings" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-95 transition-transform gap-1 w-16">
          <span className="material-symbols-outlined text-2xl">person</span>
          <span className="text-xs">Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default Wallet;

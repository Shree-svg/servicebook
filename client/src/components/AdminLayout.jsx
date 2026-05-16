import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', path: '/admin' },
    { label: 'Verification', icon: 'verified_user', path: '/admin/verification' },
    { label: 'Disputes', icon: 'gavel', path: '/admin/disputes' },
    { label: 'Services', icon: 'inventory_2', path: '/admin/services', disabled: true },
    { label: 'Analytics', icon: 'analytics', path: '/admin/analytics', disabled: true },
    { label: 'Settings', icon: 'settings', path: '/admin/settings', disabled: true },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-background text-on-background flex h-screen overflow-hidden antialiased font-body">
      {/* NavigationDrawer (Desktop) */}
      <aside className="hidden md:flex h-full w-72 border-r border-outline-variant bg-surface-container flex-col p-4 z-[60] transition-all duration-200">
        <div className="flex items-center space-x-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-lg">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
          </div>
          <div>
            <h2 className="font-headline font-black text-primary text-base tracking-tight leading-none">Admin Panel</h2>
            <p className="font-body text-[10px] text-on-surface-variant mt-1">servicebook.admin@domain.com</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.disabled ? '#' : item.path}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-body transition-all ${
                item.disabled 
                  ? 'opacity-40 cursor-not-allowed' 
                  : isActive(item.path)
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
              }`}
            >
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: isActive(item.path) ? "'FILL' 1" : "'FILL' 0" }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {item.disabled && <span className="material-symbols-outlined text-xs ml-auto">lock</span>}
            </Link>
          ))}
        </nav>
        <div className="pt-4 border-t border-outline-variant mt-auto">
          <button className="flex items-center space-x-3 px-3 py-2.5 w-full rounded-lg text-sm font-body text-error hover:bg-error/10 transition-colors">
            <span className="material-symbols-outlined text-lg">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* TopAppBar */}
        <header className="bg-surface border-b border-outline-variant flex items-center justify-between px-6 h-16 w-full z-50">
          <div className="flex items-center space-x-4">
            <button className="md:hidden text-primary hover:bg-surface-container-high transition-colors p-2 rounded-full active:scale-95 transition-transform">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="font-headline text-2xl font-bold tracking-tight text-primary">ServiceBook</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-xs font-bold text-on-surface">Admin User</span>
              <span className="text-[10px] text-tertiary">System Online</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface font-medium text-sm border border-outline-variant hover:bg-surface-container-high transition-colors cursor-pointer active:scale-95 transition-transform">
              AU
            </div>
          </div>
        </header>

        {/* Main Scrollable Area */}
        <main className="flex-1 overflow-y-auto pb-24 md:pb-12">
          <Outlet />
        </main>
      </div>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-4 bg-surface border-t border-outline-variant pb-safe">
        {navItems.slice(0, 3).map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center transition-all ${
              isActive(item.path) ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-2xl mb-1" style={{ fontVariationSettings: isActive(item.path) ? "'FILL' 1" : "'FILL' 0" }}>
              {item.icon}
            </span>
            <span className="font-label text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
          </Link>
        ))}
        <button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-on-surface">
          <span className="material-symbols-outlined text-2xl mb-1">settings</span>
          <span className="font-label text-[10px] font-medium uppercase tracking-wider">Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default AdminLayout;

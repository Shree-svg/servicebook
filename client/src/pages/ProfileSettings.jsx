import React from 'react';
import { Link } from 'react-router-dom';

const ProfileSettings = () => {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body pb-24 md:pb-12">
      <header className="fixed top-0 w-full z-50 bg-surface-container-low/70 backdrop-blur-xl border-b border-outline-variant/30 h-16 flex items-center px-margin-mobile md:px-margin-desktop">
        <Link to="/dashboard" className="mr-m3-md">
          <span className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-colors">arrow_back</span>
        </Link>
        <h1 className="font-headline text-headline-md text-primary font-bold">Profile Settings</h1>
      </header>

      <main className="pt-24 px-margin-mobile md:px-margin-desktop max-w-2xl mx-auto">
        {/* Profile Picture Header */}
        <div className="flex flex-col items-center mb-m3-xl">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/50 p-1 bg-surface-container shadow-xl">
              <img 
                alt="User Profile" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC10AJng9b4y4M0aHxu1odcmuZB3AbB-h4K5kePCeTgvI6MuDt51y2iC0yTn_5CvyFZlxM-BdsfDW_WI3TRMSHC4aN4kbhxQql9ejcPTzBaCVsJDUdYMdYMgKp4PEvfHwtBjsgZbORj_k72akDpHFQPFjSR2uJp4plV5A1u2d10E122suhwHXHU4wMvq9-ABNjKFtyPUisKsL-643Y46-HSONx1QIcAGAxtm_-N9vQIqpnZv7rAowTV9xOhJH5cdvega4mEe3wdqA" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-primary text-on-primary p-2 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-sm">edit</span>
            </button>
          </div>
          <h2 className="mt-m3-md font-headline text-headline-sm text-on-surface">Alex Thompson</h2>
          <p className="text-on-surface-variant text-sm font-label uppercase tracking-widest mt-1">Platinum Member</p>
        </div>

        {/* Form Sections */}
        <div className="space-y-m3-xl">
          {/* Account Information */}
          <section className="bg-surface-container-lowest/40 backdrop-blur-md border border-outline-variant/30 rounded-2xl p-m3-lg space-y-m3-lg shadow-sm">
            <h3 className="font-headline text-on-surface border-b border-outline-variant/20 pb-m3-md">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-m3-lg">
              <div className="space-y-m3-sm">
                <label className="block font-label text-label-sm text-on-surface-variant uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Alex Thompson"
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-m3-md py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                />
              </div>
              <div className="space-y-m3-sm">
                <label className="block font-label text-label-sm text-on-surface-variant uppercase tracking-wider">Phone Number</label>
                <input 
                  type="tel" 
                  defaultValue="+1 (555) 000-1234"
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-m3-md py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                />
              </div>
              <div className="md:col-span-2 space-y-m3-sm">
                <label className="block font-label text-label-sm text-on-surface-variant uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="alex.t@example.com"
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-m3-md py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none opacity-80 cursor-not-allowed"
                  disabled
                />
              </div>
            </div>
          </section>

          {/* Saved Addresses */}
          <section className="bg-surface-container-lowest/40 backdrop-blur-md border border-outline-variant/30 rounded-2xl p-m3-lg space-y-m3-lg shadow-sm">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-m3-md">
              <h3 className="font-headline text-on-surface">Saved Addresses</h3>
              <button className="text-primary font-label text-label-sm flex items-center gap-m3-xs hover:underline">
                <span className="material-symbols-outlined text-sm">add</span> Add New
              </button>
            </div>
            <div className="space-y-m3-md">
              <div className="flex items-center justify-between p-m3-md bg-surface-container-low/50 rounded-xl border border-outline-variant/20 group">
                <div className="flex items-center gap-m3-md">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">home</span>
                  </div>
                  <div>
                    <p className="font-label text-on-surface">Home</p>
                    <p className="text-on-surface-variant text-xs">123 Sunset Blvd, Suite 400, Seattle, WA</p>
                  </div>
                </div>
                <button className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="bg-surface-container-lowest/40 backdrop-blur-md border border-outline-variant/30 rounded-2xl p-m3-lg space-y-m3-lg shadow-sm">
            <h3 className="font-headline text-on-surface border-b border-outline-variant/20 pb-m3-md">Preferences</h3>
            <div className="space-y-m3-md">
              <div className="flex items-center justify-between py-1">
                <div>
                  <p className="font-label text-on-surface">Email Notifications</p>
                  <p className="text-on-surface-variant text-xs">Receive updates about your bookings</p>
                </div>
                <div className="relative inline-block w-12 h-6 bg-primary rounded-full">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-on-primary rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between py-1 border-t border-outline-variant/10 pt-m3-md">
                <div>
                  <p className="font-label text-on-surface">Two-Factor Authentication</p>
                  <p className="text-on-surface-variant text-xs">Enhance your account security</p>
                </div>
                <div className="relative inline-block w-12 h-6 bg-surface-variant rounded-full">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-on-surface-variant rounded-full"></div>
                </div>
              </div>
            </div>
          </section>

          <div className="pt-m3-lg flex gap-m3-md">
            <button className="flex-1 py-4 bg-primary text-on-primary rounded-full font-headline font-bold hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all">Save Changes</button>
            <button className="px-m3-xl py-4 border border-outline text-on-surface-variant rounded-full font-label text-label-md hover:bg-surface-variant/20 transition-all">Discard</button>
          </div>

          <div className="pt-m3-xl text-center">
            <button className="text-error font-label text-label-sm hover:underline">Sign out of all devices</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettings;

import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Revenue', value: '$124,592', change: '+12.5%', icon: 'payments', color: 'text-primary' },
    { label: 'Active Disputes', value: '24', change: '-2', icon: 'gavel', color: 'text-error' },
    { label: 'Pending Verifications', value: '12', change: '+5', icon: 'verified_user', color: 'text-tertiary' },
    { label: 'Total Jobs', value: '1,842', change: '+8%', icon: 'home_repair_service', color: 'text-primary' },
  ];

  const recentActivity = [
    { type: 'user', msg: 'New Provider "Elite Pipes Co." registered', time: '10 mins ago', icon: 'person_add' },
    { type: 'dispute', msg: 'Dispute #DSP-8924A opened by Sarah Jenkins', time: '1 hour ago', icon: 'report' },
    { type: 'payout', msg: '$1,200 payout processed for "ProClean LLC"', time: '2 hours ago', icon: 'account_balance' },
    { type: 'system', msg: 'Weekly backup completed successfully', time: '5 hours ago', icon: 'settings_backup_restore' },
    { type: 'admin', msg: 'Admin "Alice" approved 3 service categories', time: 'Yesterday', icon: 'admin_panel_settings' },
  ];

  return (
    <div className="p-6 md:p-8 lg:px-12 xl:px-24 space-y-8">
      {/* Background Animation (Subtle) */}
      <div className="fixed inset-0 z-[-1] opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-tertiary/10 blur-[100px] rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Page Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-headline text-headline-lg text-on-surface font-bold tracking-tight">System Health</h2>
          <p className="font-body text-body-md text-on-surface-variant">Real-time marketplace monitoring and operations.</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 bg-surface-container-high border border-outline-variant text-on-surface px-4 py-2 rounded-full text-xs font-bold hover:bg-surface-variant transition-all shadow-sm">
              <span className="material-symbols-outlined text-sm">download</span>
              Export Report
           </button>
           <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-full text-xs font-bold hover:bg-primary-fixed-dim transition-all shadow-sm">
              <span className="material-symbols-outlined text-sm">settings</span>
              Global Config
           </button>
        </div>
      </section>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-m3-lg">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest/60 backdrop-blur-md border border-outline-variant/30 rounded-2xl p-m3-lg flex flex-col justify-between shadow-sm hover:border-primary/50 transition-colors group">
            <div className="flex justify-between items-start">
              <div className={`w-12 h-12 rounded-xl bg-surface-container-high/50 flex items-center justify-center ${stat.color} border border-outline-variant/50 group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
              <div className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase ${stat.change.startsWith('+') ? 'bg-tertiary-container/20 text-tertiary-fixed-dim' : 'bg-error-container/20 text-error'}`}>
                {stat.change}
              </div>
            </div>
            <div className="mt-6">
              <p className="font-label text-label-sm text-on-surface-variant uppercase tracking-widest">{stat.label}</p>
              <h3 className="font-display text-headline-lg text-on-surface font-bold mt-1 tracking-tighter">{stat.value}</h3>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-m3-xl">
        {/* Operations Center */}
        <section className="lg:col-span-1 flex flex-col gap-m3-lg">
          <div className="flex justify-between items-center">
            <h3 className="font-headline text-headline-sm text-on-surface font-bold">Operational Links</h3>
          </div>
          <div className="grid grid-cols-1 gap-m3-md">
            <Link to="/admin/verification" className="bg-surface-container-lowest/60 backdrop-blur-md border border-outline-variant/30 rounded-2xl p-m3-lg flex items-center justify-between hover:bg-surface-container/60 transition-all group">
              <div className="flex items-center gap-m3-md">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all shadow-inner">
                  <span className="material-symbols-outlined text-3xl">how_to_reg</span>
                </div>
                <div>
                  <h4 className="font-headline text-headline-sm text-on-surface leading-tight">Vetting Queue</h4>
                  <p className="font-body text-body-sm text-on-surface-variant">12 pending reviews</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors" style={{ fontVariationSettings: "'wght' 300" }}>arrow_forward_ios</span>
            </Link>

            <Link to="/admin/disputes" className="bg-surface-container-lowest/60 backdrop-blur-md border border-outline-variant/30 rounded-2xl p-m3-lg flex items-center justify-between hover:bg-surface-container/60 transition-all group">
              <div className="flex items-center gap-m3-md">
                <div className="w-14 h-14 rounded-xl bg-error/10 flex items-center justify-center text-error group-hover:bg-error group-hover:text-on-error transition-all shadow-inner">
                  <span className="material-symbols-outlined text-3xl">gavel</span>
                </div>
                <div>
                  <h4 className="font-headline text-headline-sm text-on-surface leading-tight">Dispute Center</h4>
                  <p className="font-body text-body-sm text-on-surface-variant">4 active cases</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-error transition-colors" style={{ fontVariationSettings: "'wght' 300" }}>arrow_forward_ios</span>
            </Link>

            <div className="bg-surface-container-lowest/40 border border-outline-variant/20 rounded-2xl p-m3-lg flex items-center justify-between opacity-60 grayscale cursor-not-allowed">
              <div className="flex items-center gap-m3-md">
                <div className="w-14 h-14 rounded-xl bg-secondary-container/20 flex items-center justify-center text-on-surface-variant shadow-inner">
                  <span className="material-symbols-outlined text-3xl">payments</span>
                </div>
                <div>
                  <h4 className="font-headline text-headline-sm text-on-surface leading-tight">Payout Ledger</h4>
                  <p className="font-body text-body-sm text-on-surface-variant">Monthly reports locked</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant" style={{ fontVariationSettings: "'wght' 300" }}>lock</span>
            </div>
          </div>
        </section>

        {/* System Activity Logs */}
        <section className="lg:col-span-2 bg-surface-container-lowest/60 backdrop-blur-md border border-outline-variant/30 rounded-3xl overflow-hidden shadow-sm flex flex-col">
          <div className="px-6 py-5 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-high/20">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <h3 className="font-headline text-headline-sm text-on-surface font-bold">Real-time Activity</h3>
            </div>
            <button className="text-primary font-label text-label-md hover:underline transition-all">Download Logs</button>
          </div>
          <div className="divide-y divide-outline-variant/20 flex-grow">
            {recentActivity.map((log, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-surface-container/40 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high/50 flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">{log.icon}</span>
                  </div>
                  <div>
                     <p className="font-body text-body-md text-on-surface leading-tight group-hover:translate-x-1 transition-transform">{log.msg}</p>
                     <p className="font-label text-label-sm text-on-surface-variant mt-1">Status: Processed</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-label text-label-sm text-on-surface-variant">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-outline-variant/30 bg-surface-container-high/10">
            <button className="w-full py-2 bg-surface-container-high hover:bg-surface-variant text-on-surface font-label text-label-md rounded-xl transition-all">View All Activity</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;

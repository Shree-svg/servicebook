import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig';
import toast from 'react-hot-toast';

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchJobs();
    api.get('/api/auth/me')
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get('/api/bookings/provider');
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/api/bookings/${id}/status`, { status });
      toast.success(`Job marked as ${status}`);
      fetchJobs();
    } catch (err) {
      console.error('Error updating status:', err);
      toast.error('Failed to update status');
    }
  };

  const activeJob = jobs.find(j => j.status === 'in-progress');
  const upcomingJobs = jobs.filter(j => j.status === 'confirmed');

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>;
  }

  return (
    <div className="bg-background text-on-surface antialiased min-h-screen flex flex-col pt-16 pb-24 md:pb-0 md:pl-72 font-body">
      {/* TopAppBar */}
      <header className="bg-surface fixed top-0 w-full z-50 flex items-center justify-between px-4 md:px-8 h-16 md:hidden border-b border-outline-variant">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant">
            <img alt="User Profile Avatar" className="w-full h-full object-cover" src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} />
          </div>
          <h1 className="text-xl text-primary font-bold tracking-tight">ServiceBook</h1>
        </div>
      </header>

      {/* SideNav (Desktop) */}
      <nav className="hidden md:flex flex-col py-6 bg-surface-container-lowest border-r border-outline-variant shadow-md fixed h-full w-72 top-0 left-0 z-40">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant">
              <img alt="Provider Profile Image" className="w-full h-full object-cover" src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} />
            </div>
            <div>
              <h2 className="text-primary font-bold tracking-tight">{user?.name || 'Loading...'}</h2>
              <p className="text-sm text-tertiary">Verified Provider</p>
              <p className="text-xs text-on-surface-variant">Rating: {user?.rating || '5.0'}/5</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 px-2">
          <Link to="/provider/dashboard" className="flex items-center gap-3 py-3 px-4 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-lg">
            <span className="material-symbols-outlined">dashboard</span> Dashboard
          </Link>
          <Link to="/provider/jobs" className="flex items-center gap-3 py-3 px-4 bg-primary-container text-on-primary-container rounded-lg font-semibold shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined">construction</span> My Services
          </Link>
          <Link to="/provider/wallet" className="flex items-center gap-3 py-3 px-4 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-lg">
            <span className="material-symbols-outlined">account_balance_wallet</span> Wallet
          </Link>
          <div className="mt-auto pt-4 border-t border-outline-variant">
            <Link to="/logout" className="flex items-center gap-3 py-3 px-4 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-lg">
              <span className="material-symbols-outlined">logout</span> Logout
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-display font-bold tracking-tight">Job Management</h1>
          <p className="text-on-surface-variant">Track your current task and upcoming schedule.</p>
        </header>

        {/* Active Job Bento Container */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {activeJob ? (
            <div className="lg:col-span-2 bg-surface-container border border-outline-variant rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
              <div className="flex justify-between items-start z-10 relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-tertiary"></span>
                  </span>
                  <span className="text-sm uppercase tracking-wider text-tertiary font-bold">In Progress</span>
                </div>
              </div>
              <div className="z-10 relative mt-8">
                <h2 className="text-4xl font-display font-bold tracking-tight mb-2">{activeJob.service?.title}</h2>
                <div className="flex flex-wrap items-center gap-2 text-on-surface-variant mb-6">
                  <span className="material-symbols-outlined text-sm">person</span>
                  <span className="text-lg text-on-surface">{activeJob.customer?.name}</span>
                  <span className="mx-2 text-outline-variant">|</span>
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  <span>{activeJob.address?.street}, {activeJob.address?.city}</span>
                </div>
              </div>
              <div className="flex gap-4 z-10 relative mt-auto pt-6 border-t border-outline-variant/50">
                <button 
                  onClick={() => updateStatus(activeJob._id, 'completed')}
                  className="bg-primary text-on-primary hover:bg-primary/90 font-bold py-3 px-6 rounded-lg transition-colors flex-1 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">check_circle</span>
                  Mark as Complete
                </button>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-2 bg-surface-container border border-outline-variant rounded-xl p-6 flex items-center justify-center text-center">
              <div>
                <span className="material-symbols-outlined text-6xl text-outline mb-4">work_outline</span>
                <p className="text-on-surface-variant font-bold text-xl">No active job</p>
                <p className="text-on-surface-variant">Start an upcoming job to see it here.</p>
              </div>
            </div>
          )}

          {/* Checklist Bento */}
          <div className="bg-surface-container border border-outline-variant rounded-xl p-6 flex flex-col gap-6">
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">list_alt</span> Details
              </h3>
              <div className="text-on-surface-variant text-sm space-y-2">
                <p><strong>Scheduled:</strong> {activeJob ? `${activeJob.date} at ${activeJob.slot}` : 'N/A'}</p>
                <p><strong>Customer Contact:</strong> {activeJob?.customer?.phone || 'N/A'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Jobs List */}
        <section className="mt-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold tracking-tight">Upcoming Jobs</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingJobs.map(job => (
              <div key={job._id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:bg-surface-container transition-colors group relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-lg">{job.service?.title}</h4>
                  <span className="text-on-surface-variant text-sm font-mono bg-surface px-2 py-1 rounded border border-outline-variant">{job.slot}</span>
                </div>
                <div className="flex flex-col gap-2 text-sm text-on-surface-variant mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">person</span>
                    <span>{job.customer?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">location_on</span>
                    <span className="truncate">{job.address?.street}</span>
                  </div>
                </div>
                <button 
                  onClick={() => updateStatus(job._id, 'in-progress')}
                  className="w-full py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors"
                >
                  Start Job
                </button>
              </div>
            ))}
            {upcomingJobs.length === 0 && (
              <div className="col-span-full py-12 text-center border-2 border-dashed border-outline-variant rounded-xl">
                <p className="text-on-surface-variant">No upcoming jobs found.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* BottomNavBar (Mobile) */}
      <nav className="md:hidden bg-surface fixed bottom-0 w-full z-50 rounded-t-xl border-t border-outline-variant shadow-lg flex justify-around items-center h-20 px-4 pb-safe">
        <Link to="/provider/dashboard" className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-primary/5 w-16 h-14 rounded-lg">
          <span className="material-symbols-outlined text-2xl mb-1">home</span>
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/provider/jobs" className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-2xl px-4 py-1 w-16 h-14">
          <span className="material-symbols-outlined text-2xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>construction</span>
          <span className="text-xs font-bold">Services</span>
        </Link>
        <Link to="/provider/wallet" className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-primary/5 w-16 h-14 rounded-lg">
          <span className="material-symbols-outlined text-2xl mb-1">account_balance_wallet</span>
          <span className="text-xs">Wallet</span>
        </Link>
      </nav>
    </div>
  );
};

export default JobManagement;

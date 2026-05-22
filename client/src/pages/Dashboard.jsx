import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';
import AnimatedBackground from '../components/AnimatedBackground';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await api.get('/api/bookings/mybookings');
        setBookings(res.data || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        toast.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  const upcomingBookings = bookings.filter(b => 
    ['pending', 'confirmed', 'in-progress'].includes(b.status)
  ).slice(0, 3);

  const bookingHistory = bookings.filter(b => 
    ['completed', 'cancelled'].includes(b.status)
  ).slice(0, 5);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning-container text-on-warning-container';
      case 'confirmed': return 'bg-success-container text-on-success-container';
      case 'in-progress': return 'bg-primary-container text-on-primary-container';
      case 'completed': return 'bg-surface-variant text-on-surface-variant';
      case 'cancelled': return 'bg-error-container text-on-error-container';
      default: return 'bg-surface-variant text-on-surface-variant';
    }
  };

  return (
    <div className="bg-transparent text-on-surface min-h-screen pb-24 md:pb-0 transition-colors duration-300 antialiased selection:bg-primary/30 selection:text-primary-fixed">
        <AnimatedBackground />
      {/* Background Glows */}
      <div className="fixed inset-0 z-[-1] opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] gradient-primary blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface-container-low/70 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16">
        <div className="flex items-center gap-m3-md">
          <Link to="/" className="font-headline text-headline-md text-gradient font-bold">ServiceBook</Link>
        </div>
        <div className="flex items-center gap-m3-lg">
          <nav className="hidden md:flex items-center gap-m3-lg">
            <Link to="/" className="text-on-surface-variant hover:text-on-surface transition-colors px-2 py-1 rounded font-label text-label-md">Home</Link>
            <Link to="/dashboard" className="text-primary font-bold font-label text-label-md">Dashboard</Link>
            <Link to="/rewards" className="text-on-surface-variant hover:text-on-surface transition-colors px-2 py-1 rounded font-label text-label-md">Rewards</Link>
            <Link to="/help" className="text-on-surface-variant hover:text-on-surface transition-colors px-2 py-1 rounded font-label text-label-md">Help</Link>
          </nav>
          <div className="flex items-center gap-m3-sm">
            <button onClick={handleLogout} className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-error transition-colors">logout</button>
            <Link to="/profile" className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant cursor-pointer">
              <img 
                alt="User Profile Avatar" 
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=6750A4&color=fff`} 
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto relative z-10">
        {/* Profile Overview Bento Grid Section */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-m3-lg mb-m3-xl">
          {/* Loyalty Profile Card */}
          <div className="md:col-span-2 gradient-card backdrop-blur-md border border-outline-variant/30 rounded-xl p-m3-lg flex flex-col justify-between shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-headline text-headline-sm text-gradient mb-m3-xs font-bold text-2xl">Welcome back, {user?.name?.split(' ')[0] || 'User'}</h2>
                <p className="font-body text-body-md text-muted">Your household is running smoothly.</p>
              </div>
              <div className="gradient-primary/20 text-primary px-m3-md py-m3-sm rounded-full flex items-center gap-m3-sm border border-primary/20">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>redeem</span>
                <span className="font-label text-label-md font-bold">{user?.points || 0} Points</span>
              </div>
            </div>
            <div className="mt-m3-lg">
              <div className="flex justify-between mb-m3-sm">
                <span className="font-label text-label-sm text-muted uppercase tracking-wider">Level Progress</span>
                <span className="font-label text-label-sm text-primary">60%</span>
              </div>
              <div className="w-full bg-surface-container-high/50 h-2 rounded-full overflow-hidden backdrop-blur-sm">
                <div className="gradient-primary h-full w-[60%] rounded-full shadow-[0_0_15px_rgba(192,132,252,0.4)]"></div>
              </div>
            </div>
          </div>

          {/* Active Ticket Mini Card */}
          <div className="md:col-span-1 gradient-card backdrop-blur-md border border-outline-variant/30 rounded-xl p-m3-lg shadow-lg">
            <div className="flex items-center gap-m3-sm text-secondary mb-m3-md">
              <span className="material-symbols-outlined">support_agent</span>
              <h3 className="font-label text-label-md">Support</h3>
            </div>
            <p className="font-headline text-headline-sm text-on-surface mb-m3-xs">Help Center</p>
            <div className="inline-block px-m3-sm py-m3-xs gradient-primary/10 text-primary rounded border border-primary/20 font-label text-label-sm backdrop-blur-sm">
              Available 24/7
            </div>
            <Link to="/help" className="font-body text-body-sm text-primary mt-m3-md block hover:underline">Get assistance</Link>
          </div>

          {/* Quick Action Card */}
          <div className="md:col-span-1 gradient-primary backdrop-blur-md text-on-primary rounded-xl p-m3-lg shadow-xl flex flex-col justify-center items-center text-center gradient-glow">
            <span className="material-symbols-outlined text-4xl mb-m3-sm" style={{ fontVariationSettings: "'wght' 200" }}>add_circle</span>
            <h3 className="font-headline text-headline-sm mb-m3-sm font-bold">Need a hand?</h3>
            <Link to="/" className="bg-on-primary text-primary px-m3-lg py-m3-sm rounded-full font-label text-label-md hover:bg-on-primary/90 active:scale-95 transition-all shadow-lg">Book Now</Link>
          </div>
        </section>

        {/* Upcoming Bookings Section */}
        <section className="mb-m3-xl">
          <div className="flex justify-between items-center mb-m3-lg">
            <h2 className="font-headline text-headline-md text-on-surface">Upcoming Bookings</h2>
            <Link to="/bookings" className="text-primary font-label text-label-md flex items-center gap-m3-xs hover:underline">
              View All <span className="material-symbols-outlined text-sm">chevron_right</span>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-m3-lg">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-surface-container-lowest/20 rounded-xl h-64 animate-pulse border border-outline-variant/20"></div>
              ))}
            </div>
          ) : upcomingBookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-m3-lg">
              {upcomingBookings.map(booking => (
                <div key={booking._id} className="glass-panel backdrop-blur-md border border-outline-variant/30 rounded-xl overflow-hidden shadow-lg flex flex-col hover:border-primary/50 transition-all group duration-300 anim-fade-up">
                  <div className="h-40 w-full bg-surface-container-high relative overflow-hidden">
                    <img 
                      alt={booking.service?.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      src={booking.service?.image || "https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=800"} 
                    />
                    <div className={`absolute top-m3-sm right-m3-sm backdrop-blur-md font-label text-label-md px-m3-sm py-m3-xs rounded border border-white/10 shadow-lg capitalize ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </div>
                  </div>
                  <div className="p-m3-md flex-grow">
                    <div className="flex justify-between items-start mb-m3-sm">
                      <h3 className="font-headline text-headline-sm text-on-surface line-clamp-1">{booking.service?.title}</h3>
                      <span className="text-primary font-bold">${booking.totalPrice}</span>
                    </div>
                    <div className="flex items-center gap-m3-sm text-on-surface-variant font-body text-body-sm mb-m3-md">
                      <span className="material-symbols-outlined text-base">calendar_today</span>
                      {new Date(booking.date).toLocaleDateString()} at {booking.slot === 'morning' ? '8:00 AM' : booking.slot === 'afternoon' ? '12:00 PM' : '4:00 PM'}
                    </div>
                    <div className="flex items-center gap-m3-md p-m3-sm bg-surface-container-low/50 backdrop-blur-sm rounded-lg border border-outline-variant/10">
                      <div className="w-10 h-10 rounded-full border border-primary/30 p-0.5 overflow-hidden">
                        <img 
                          alt="Provider" 
                          className="rounded-full h-full w-full object-cover" 
                          src={booking.provider?.avatar || `https://ui-avatars.com/api/?name=${booking.provider?.name || 'P'}&background=6750A4&color=fff`} 
                        />
                      </div>
                      <div>
                        <p className="font-label text-label-md text-on-surface">{booking.provider?.name || 'Assigning...'}</p>
                        <div className="flex items-center gap-m3-xs">
                          <span className="material-symbols-outlined text-primary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          <span className="text-xs text-on-surface-variant">{booking.provider?.rating || '4.5'} • Pro</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-m3-md border-t border-outline-variant/20 flex gap-m3-sm">
                    <Link to={`/track/${booking._id}`} className="flex-1 gradient-primary text-on-primary py-m3-sm rounded-full font-label text-label-md hover:opacity-90 active:scale-95 transition-all text-center shadow-lg">Track</Link>
                    <button onClick={() => toast.error('Rescheduling coming soon')} className="px-m3-md py-m3-sm border border-outline-variant text-muted rounded-full font-label text-label-md hover:bg-surface-variant/20">Reschedule</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-surface-container-lowest/40 border border-dashed border-outline-variant rounded-2xl py-m3-2xl flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-4xl text-outline mb-m3-md">event_busy</span>
              <h3 className="font-headline text-headline-sm text-on-surface">No upcoming bookings</h3>
              <p className="font-body text-body-md text-on-surface-variant mb-m3-lg">Book your first service and let us handle the rest.</p>
              <Link to="/" className="text-primary font-bold hover:underline">Explore Services</Link>
            </div>
          )}
        </section>

        {/* Two Column Layout: Recommended & History */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-m3-xl mb-m3-xl">
          {/* Recommended for You */}
          <div className="lg:col-span-2">
            <h2 className="font-headline text-headline-md text-on-surface mb-m3-lg">Quick Picks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-m3-lg">
              <div onClick={() => navigate('/')} className="gradient-card backdrop-blur-md border border-outline-variant/30 rounded-xl p-m3-lg flex items-center gap-m3-md hover:border-primary/50 transition-all cursor-pointer group shadow-lg">
                <div className="w-16 h-16 rounded-lg gradient-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:gradient-primary group-hover:text-on-primary transition-all duration-300">
                  <span className="material-symbols-outlined text-3xl">pest_control</span>
                </div>
                <div>
                  <h4 className="font-headline text-headline-sm text-on-surface mb-m3-xs group-hover:text-primary transition-colors">Pest Control</h4>
                  <p className="font-body text-body-sm text-muted">Preventive maintenance</p>
                </div>
              </div>
              <div onClick={() => navigate('/')} className="gradient-card backdrop-blur-md border border-outline-variant/30 rounded-xl p-m3-lg flex items-center gap-m3-md hover:border-primary/50 transition-all cursor-pointer group shadow-lg">
                <div className="w-16 h-16 rounded-lg gradient-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:gradient-primary group-hover:text-on-primary transition-all duration-300">
                  <span className="material-symbols-outlined text-3xl">hvac</span>
                </div>
                <div>
                  <h4 className="font-headline text-headline-sm text-on-surface mb-m3-xs group-hover:text-primary transition-colors">AC Service</h4>
                  <p className="font-body text-body-sm text-muted">Deep cleaning & filter check</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking History */}
          <div className="lg:col-span-1">
            <h2 className="font-headline text-headline-md text-on-surface mb-m3-lg">Recent History</h2>
            <div className="space-y-m3-md">
              {bookingHistory.length > 0 ? (
                bookingHistory.map(booking => (
                  <div key={booking._id} className="bg-surface-container-lowest/60 backdrop-blur-md p-m3-md rounded-xl shadow-sm border border-outline-variant/30 flex items-center justify-between hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-m3-md">
                      <div className="w-10 h-10 rounded-full bg-surface-container-high/50 flex items-center justify-center text-primary backdrop-blur-sm">
                        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {booking.status === 'completed' ? 'check_circle' : 'cancel'}
                        </span>
                      </div>
                      <div>
                        <p className="font-label text-label-md text-on-surface line-clamp-1">{booking.service?.title}</p>
                        <p className="font-label text-label-sm text-on-surface-variant">{new Date(booking.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {booking.status === 'completed' && (
                      <Link to={`/rate/${booking._id}`} className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">star_rate</Link>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-body-sm text-on-surface-variant italic">No past bookings yet.</p>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low/70 backdrop-blur-lg border-t border-outline-variant/30 mt-m3-xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop py-m3-xl max-w-max-width mx-auto text-center md:text-left">
          <div className="mb-m3-md md:mb-0">
            <p className="font-headline text-primary font-bold">ServiceBook</p>
            <p className="font-body text-body-sm text-on-surface-variant mt-m3-sm">© 2024 ServiceBook. Premium quality guaranteed.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-m3-lg">
            <Link className="font-body text-body-sm text-on-surface-variant hover:text-primary transition-colors" to="/help">Support</Link>
            <Link className="font-body text-body-sm text-on-surface-variant hover:text-primary transition-colors" to="/plans">Plans</Link>
            <a className="font-body text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy</a>
          </div>
        </div>
      </footer>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl border-t border-outline-variant/30 bg-surface-container-lowest/70 backdrop-blur-xl shadow-2xl flex justify-around items-center h-20 px-4 pb-safe">
        <Link to="/" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-90">
          <span className="material-symbols-outlined">home</span>
          <span className="font-label text-label-sm">Home</span>
        </Link>
        <Link to="/dashboard" className="flex flex-col items-center justify-center text-primary bg-primary/10 rounded-2xl px-4 py-1">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
          <span className="font-label text-label-sm">Dash</span>
        </Link>
        <Link to="/bookings" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-90">
          <span className="material-symbols-outlined">event_note</span>
          <span className="font-label text-label-sm">Bookings</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-90">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label text-label-sm">Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default Dashboard;


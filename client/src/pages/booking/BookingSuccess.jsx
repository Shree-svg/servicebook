import { Link, useLocation } from 'react-router-dom';

export default function BookingSuccess() {
  const location = useLocation();
  const booking = location.state?.booking;

  return (
    <div className="bg-transparent text-on-background min-h-screen flex items-center justify-center p-4 antialiased selection:bg-primary/30 selection:text-primary-fixed">
      <main className="w-full max-w-md flex flex-col items-center text-center space-y-8 animate-fade-in">
        {/* Success Icon */}
        <div className="flex items-center justify-center w-32 h-32 rounded-full gradient-primary/10 border border-primary/20 shadow-glow relative">
          <div className="absolute inset-0 gradient-primary opacity-20 blur-2xl rounded-full"></div>
          <span className="material-symbols-outlined text-gradient relative z-10" style={{ fontSize: '64px', fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
        </div>

        {/* Headline & Subtext */}
        <div className="space-y-4">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-gradient">
            Booking Confirmed!
          </h1>
          <p className="font-body text-base text-muted max-w-[320px] mx-auto leading-relaxed font-medium">
            Your professional is scheduled and will arrive at the requested time.
          </p>
        </div>

        {/* Summary Card */}
        <div className="w-full gradient-card border border-outline-variant/30 rounded-2xl p-8 flex flex-col text-left space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-5 rounded-full blur-3xl"></div>
          <div className="flex items-center justify-between pb-6 border-b border-outline-variant/20">
            <div className="flex items-center space-x-4">
              <div 
                className="w-12 h-12 rounded-full gradient-primary/10 border border-primary/20 flex items-center justify-center shadow-lg" 
              >
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              </div>
              <div>
                <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Professional</p>
                <p className="font-bold text-base text-on-surface tracking-tight">{booking?.provider?.name || 'Assigned Soon'}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-muted uppercase tracking-widest">Service</p>
              <p className="font-bold text-sm text-on-surface text-right">{booking?.service?.title || 'Service'}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-muted uppercase tracking-widest">Date</p>
              <p className="font-bold text-sm text-on-surface text-right">{booking?.date ? new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'TBD'}</p>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-outline-variant/20">
              <p className="text-xs font-bold text-muted uppercase tracking-widest">Order ID</p>
              <p className="font-mono font-bold text-xs text-primary text-right bg-primary/10 px-2 py-1 rounded">#{booking?._id?.slice(-8).toUpperCase() || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col space-y-4 pt-4">
          <Link 
            to={booking?._id ? `/track/${booking._id}` : '/dashboard'} 
            className="w-full gradient-primary text-on-primary py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:opacity-90 active:scale-[0.98] transition-all flex justify-center items-center shadow-xl gradient-glow"
          >
            Track Service
          </Link>
          <Link 
            to="/" 
            className="w-full bg-transparent border border-outline-variant/30 text-on-surface py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-surface-bright active:scale-[0.98] transition-all flex justify-center items-center backdrop-blur-sm"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}

import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const getServiceImage = (service) => {
  if (service.image && !service.image.includes('example.com')) return service.image;
  if (service.images && service.images.length > 0 && !service.images[0].includes('example.com')) return service.images[0];
  
  // High quality Unsplash Fallbacks based on title
  const title = service.title.toLowerCase();
  if (title.includes('deep')) {
    return 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80';
  }
  if (title.includes('standard') || title.includes('cleaning')) {
    return 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80';
  }
  if (title.includes('leak') || title.includes('pipe') || title.includes('plumbing')) {
    return 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80';
  }
  if (title.includes('drain') || title.includes('unclog')) {
    return 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80';
  }
  if (title.includes('electrical') || title.includes('panel') || title.includes('electrician')) {
    return 'https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=800&q=80';
  }
  return 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=800';
};

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const activeCategory = searchParams.get('category');

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams();
      if (searchQuery) query.append('search', searchQuery);
      if (activeCategory) query.append('category', activeCategory);
      query.append('limit', '6');

      const res = await api.get(`/api/services?${query.toString()}`);
      setServices(res.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load services. Please try again.');
      toast.error('Error fetching services');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, activeCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/api/categories');
        setCategories(res.data || []);
      } catch (err) {
        console.error('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(prev => {
      if (searchQuery) prev.set('search', searchQuery);
      else prev.delete('search');
      return prev;
    });
  };

  const handleCategoryClick = (categoryId) => {
    setSearchParams(prev => {
      if (prev.get('category') === categoryId) {
        prev.delete('category');
      } else {
        prev.set('category', categoryId);
      }
      return prev;
    });
  };

  return (
    <div className="bg-background text-on-background min-h-screen glass-panel anim-fade-up">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface-container-low/80 backdrop-blur-lg border-b border-outline-variant/20 shadow-sm flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 w-full">
        <div className="flex items-center gap-m3-md">
          <Link to="/" className="font-headline-md text-headline-md text-gradient font-bold tracking-tight">ServiceBook</Link>
        </div>
        <div className="hidden md:flex items-center gap-m3-xl">
          <nav className="flex gap-m3-lg">
            <Link className="font-label-md text-label-md text-primary font-bold" to="/">Home</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant/50 transition-colors rounded-lg px-2 py-1">Dashboard</Link>
                <Link to="/bookings" className="font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant/50 transition-colors rounded-lg px-2 py-1">Bookings</Link>
                <Link to="/profile" className="font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant/50 transition-colors rounded-lg px-2 py-1">Profile</Link>
                <button onClick={handleLogout} className="font-label-md text-label-md text-error/80 hover:bg-error/10 transition-colors rounded-lg px-2 py-1">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant/50 transition-colors rounded-lg px-2 py-1">Login</Link>
                <Link to="/register" className="font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant/50 transition-colors rounded-lg px-2 py-1">Signup</Link>
              </>
            )}
          </nav>
        </div>
        <div className="md:hidden flex items-center">
          {user ? (
            <Link to="/profile" className="w-8 h-8 rounded-full bg-primary-fixed-dim flex items-center justify-center overflow-hidden border-2 border-primary/20">
              <img alt="User Profile Avatar" className="w-full h-full object-cover" src={`https://ui-avatars.com/api/?name=${user.name}&background=6750A4&color=fff`}/>
            </Link>
          ) : (
            <Link to="/login" className="text-primary font-bold">Login</Link>
          )}
        </div>
      </header>

      <main className="pt-16 pb-24 md:pb-0">
        {/* Hero & Search Section */}
        <section className="relative py-m3-2xl px-margin-mobile md:px-margin-desktop overflow-hidden min-h-[500px] flex items-center">
          <div className="absolute inset-0 gradient-glow opacity-20 pointer-events-none"></div>
          <div className="max-w-max-width mx-auto grid grid-cols-1 md:grid-cols-2 gap-m3-xl items-center relative z-10 w-full">
            <div className="z-10 animate-slide-up">
              <div className="bg-surface/40 backdrop-blur-2xl p-m3-xl rounded-3xl border border-outline-variant/30 shadow-2xl">
                <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-gradient mb-m3-md drop-shadow-sm leading-tight">Professional services, delivered at your doorstep.</h1>
                <p className="font-body-lg text-body-lg text-muted mb-m3-xl max-w-lg">Find trusted professionals for home cleaning, repairs, and wellness. Reliable, verified, and exceptionally organized.</p>
                <form onSubmit={handleSearch} className="relative max-w-xl group">
                  <div className="absolute inset-y-0 left-0 pl-m3-md flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-muted">search</span>
                  </div>
                  <input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-m3-xl pr-m3-md py-4 bg-surface-container/50 backdrop-blur-md border border-outline-variant/30 shadow-inner rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-body-md text-body-md text-on-surface outline-none" 
                    placeholder="Search for 'Cleaning', 'Electrician'..." 
                    type="text"
                  />
                  <button type="submit" className="absolute right-2 top-2 bottom-2 px-m3-xl gradient-primary shadow-lg text-on-primary rounded-full font-label-md text-label-md active:scale-95 transition-all hover:opacity-90">Search</button>
                </form>
              </div>
            </div>
            <div className="hidden md:block relative h-[400px] animate-slide-up delay-100">
              <div className="absolute inset-0 gradient-primary opacity-20 rounded-3xl transform rotate-3 scale-105 blur-2xl"></div>
              <img alt="Hero Image" className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl border border-outline-variant/30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU4aTR95GlDbDxXeQyA5d2jlx-wh0DGqrJAWjk2toAVx64HaX1RcaFLAoKOPOYf5nPD534V62cl6dHEC4UuTJCsP71YPaYrcxA-rbItkfeZDgJGDHKYLZsjDCLAXGjzGCc97QjafVsF1P2UuydmZZnVMWTPuorRPMWNPvu1Sbcg3i6fiu_hkq2dUJP318rB8YOP88VAvJ0aJ8qBBjKkZMhCETYB3qqiUwunbG2ylOffIuj02v5H29GNiq8JpCbPbo76ar1ZZbzxg"/>
            </div>
          </div>
        </section>

        {/* Category Pills */}
        <section className="py-m3-lg px-margin-mobile md:px-margin-desktop bg-surface/50 backdrop-blur-md sticky top-16 z-40 border-b border-outline-variant/10 overflow-x-auto">
          <div className="max-w-max-width mx-auto flex gap-m3-md no-scrollbar">
            <button 
              onClick={() => setSearchParams(prev => { prev.delete('category'); return prev; })}
              className={`px-m3-xl py-m3-sm rounded-full font-label-md transition-all whitespace-nowrap ${!activeCategory ? 'gradient-primary text-on-primary shadow-lg' : 'bg-surface-variant/20 text-muted hover:bg-surface-variant/40'}`}
            >
              All Services
            </button>
            {categories.map(cat => (
              <button 
                key={cat._id}
                onClick={() => handleCategoryClick(cat._id)}
                className={`px-m3-xl py-m3-sm rounded-full font-label-md transition-all whitespace-nowrap flex items-center gap-2 ${activeCategory === cat._id ? 'gradient-primary text-on-primary shadow-lg' : 'bg-surface-variant/20 text-muted hover:bg-surface-variant/40'}`}
              >
                <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-m3-2xl px-margin-mobile md:px-margin-desktop bg-surface/50">
          <div className="max-w-max-width mx-auto">
            <div className="flex justify-between items-end mb-m3-xl animate-slide-up">
              <div>
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight">
                  {activeCategory ? categories.find(c => c._id === activeCategory)?.name : 'Trending Services'}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Trusted professionals ready to help</p>
              </div>
              {error && (
                <button onClick={fetchServices} className="text-primary font-label-md flex items-center gap-1 hover:underline">
                  <span className="material-symbols-outlined text-sm">refresh</span> Retry
                </button>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-m3-xl">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md border border-outline-variant/20 animate-pulse">
                    <div className="h-56 bg-surface-variant/10"></div>
                    <div className="p-m3-lg space-y-4">
                      <div className="h-6 bg-surface-variant/10 rounded w-3/4"></div>
                      <div className="h-4 bg-surface-variant/10 rounded w-1/2"></div>
                      <div className="h-12 bg-surface-variant/10 rounded-full w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-m3-xl">
                {services.map((service, index) => (
                  <div key={service._id} className={`gradient-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 border border-outline-variant/30 group animate-slide-up delay-${(index % 3) * 100}`}>
                    <div className="h-56 overflow-hidden relative">
                      <img alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={getServiceImage(service)}/>
                      <div className="absolute top-m3-md right-m3-md bg-surface/60 backdrop-blur-md px-m3-sm py-m3-xs rounded-lg flex items-center gap-m3-xs border border-white/10 shadow-sm">
                        <span className="material-symbols-outlined text-secondary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                        <span className="font-label-sm text-label-sm text-on-surface font-bold">{service.rating || '4.8'}</span>
                      </div>
                    </div>
                    <div className="p-m3-lg">
                      <div className="flex justify-between items-start mb-m3-sm">
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold line-clamp-1 group-hover:text-primary transition-colors">{service.title}</h3>
                        <span className="font-headline-sm text-headline-sm text-secondary font-bold">${service.price}</span>
                      </div>
                      <p className="text-body-sm text-muted line-clamp-2 mb-m3-lg">{service.description}</p>
                      <div className="flex items-center gap-m3-sm mb-m3-lg">
                        <span className="bg-primary/10 text-primary px-m3-sm py-m3-xs rounded-md font-label-sm text-label-sm font-semibold">Verified</span>
                        <span className="text-muted font-label-sm text-label-sm">• {service.bookingsCount || '500+'} bookings</span>
                      </div>
                      <Link to={`/booking/step1?serviceId=${service._id}`} className="block w-full text-center py-m3-md gradient-primary text-on-primary rounded-full font-label-md text-label-md active:scale-95 transition-all shadow-lg hover:opacity-90">Book Now</Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-m3-4xl bg-surface-container-lowest rounded-3xl border border-outline-variant/10">
                <span className="material-symbols-outlined text-outline text-display-lg mb-m3-md">search_off</span>
                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-m3-xs">No services found</h3>
                <p className="text-body-md text-on-surface-variant mb-m3-xl">Try adjusting your search or filters to find what you're looking for.</p>
                <button onClick={() => { setSearchQuery(''); setSearchParams({}); }} className="px-m3-xl py-m3-md bg-primary text-on-primary rounded-full font-label-md">Clear all filters</button>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose ServiceBook */}
        <section className="py-m3-2xl px-margin-mobile md:px-margin-desktop bg-surface-container-high rounded-t-[3rem] mt-m3-xl shadow-inner border-t border-outline-variant/10">
          <div className="max-w-max-width mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-m3-2xl animate-slide-up">
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-m3-md tracking-tight">Why Choose ServiceBook</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">We bridge the gap between your needs and professional reliability with a focus on trust and efficiency.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-m3-xl">
              <div className="bg-surface-container-lowest p-m3-2xl rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20 flex flex-col items-center text-center animate-slide-up delay-100">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-m3-xl transform rotate-3 hover:rotate-0 transition-transform">
                  <span className="material-symbols-outlined text-4xl">verified_user</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface mb-m3-md font-bold">Verified Professionals</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">Every provider undergoes a rigorous background check and skill assessment.</p>
              </div>
              <div className="bg-surface-container-lowest p-m3-2xl rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20 flex flex-col items-center text-center animate-slide-up delay-200">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-m3-xl transform -rotate-3 hover:rotate-0 transition-transform">
                  <span className="material-symbols-outlined text-4xl">payments</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface mb-m3-md font-bold">Transparent Pricing</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">No hidden fees. You see the final price before you book.</p>
              </div>
              <div className="bg-surface-container-lowest p-m3-2xl rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20 flex flex-col items-center text-center animate-slide-up delay-300">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-m3-xl transform rotate-3 hover:rotate-0 transition-transform">
                  <span className="material-symbols-outlined text-4xl">support_agent</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface mb-m3-md font-bold">24/7 Priority Support</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">Our support team is always available to ensure your experience is flawless.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container/50 w-full pt-12 pb-24 md:pb-12 border-t border-outline-variant/10">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop py-m3-xl max-w-max-width mx-auto">
          <div className="mb-m3-lg md:mb-0 text-center md:text-left">
            <span className="font-headline-sm text-gradient font-bold tracking-tight text-2xl">ServiceBook</span>
            <p className="font-body-sm text-body-sm text-muted mt-m3-sm">© 2024 ServiceBook. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-m3-lg">
            <Link className="font-body-sm text-body-sm text-muted hover:text-primary transition-colors" to="/plans">Premium Plans</Link>
            <Link className="font-body-sm text-body-sm text-muted hover:text-primary transition-colors" to="/help">Help Center</Link>
            <a className="font-body-sm text-body-sm text-muted hover:text-primary transition-colors" href="#">Terms</a>
            <a className="font-body-sm text-body-sm text-muted hover:text-primary transition-colors" href="#">Privacy</a>
          </div>
        </div>
      </footer>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-2xl border-t border-white/10 bg-surface/90 backdrop-blur-xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)] flex justify-around items-center h-20 w-full px-4 pb-safe">
        <Link to="/" className={`flex flex-col items-center justify-center rounded-xl px-5 py-2 active:scale-95 transition-all cursor-pointer ${!activeCategory ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-sm text-label-sm mt-1">Home</span>
        </Link>
        <Link to="/dashboard" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 cursor-pointer">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-sm text-label-sm mt-1">Dashboard</span>
        </Link>
        <Link to="/bookings" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 cursor-pointer">
          <span className="material-symbols-outlined">event_note</span>
          <span className="font-label-sm text-label-sm mt-1">Bookings</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 cursor-pointer">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-sm text-label-sm mt-1">Profile</span>
        </Link>
      </nav>
    </div>
  );
}

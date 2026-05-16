import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import toast from 'react-hot-toast';

const ProviderVerification = () => {
  const [pendingProviders, setPendingProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const res = await api.get('/api/admin/pending-providers');
      setPendingProviders(res.data);
    } catch (err) {
      console.error('Error fetching providers:', err);
      toast.error('Failed to load pending providers');
    } finally {
      setLoading(false);
    }
  };

  const verifyProvider = async (id) => {
    try {
      await api.post(`/api/admin/verify-provider/${id}`, { status: 'verified' });
      toast.success('Provider verified successfully');
      fetchProviders();
    } catch (err) {
      console.error('Error verifying provider:', err);
      toast.error('Failed to verify provider');
    }
  };

  if (loading) {
    return <div className="p-12 text-center">Loading verification queue...</div>;
  }

  return (
    <div className="p-6 md:p-8 lg:px-12 xl:px-24 space-y-8">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-display font-semibold tracking-tight text-on-surface">Verification Queue</h2>
          <p className="text-on-surface-variant mt-1 text-sm">
            <span className="text-tertiary font-medium">{pendingProviders.length} Pending</span> applications require admin review.
          </p>
        </div>
      </div>

      {/* Queue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pendingProviders.map((provider) => (
          <div key={provider._id} className="bg-surface-container border border-outline-variant rounded-lg p-5 flex flex-col gap-4 relative overflow-hidden group hover:bg-surface-container-high transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 group-hover:bg-primary/50 transition-colors"></div>
            
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                {provider.avatar ? (
                  <img alt="Provider" className="w-12 h-12 rounded-full border border-outline-variant object-cover" src={provider.avatar} />
                ) : (
                <div className="w-12 h-12 rounded-full bg-surface-container-lowest border border-outline-variant flex items-center justify-center text-on-surface-variant shadow-inner">
                    <span className="material-symbols-outlined text-2xl">person</span>
                  </div>
                )}
                <div className="flex flex-col justify-center">
                  <h3 className="text-base font-semibold text-on-surface leading-none">{provider.name}</h3>
                  <p className="text-[11px] text-on-surface-variant mt-1.5 font-medium uppercase tracking-wider">{provider.category || 'Service Provider'}</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold border uppercase tracking-widest bg-primary/10 text-primary border-primary/20">
                PENDING
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
              <div className="flex flex-col gap-1">
                <span className="text-on-surface-variant text-[10px] uppercase tracking-widest font-bold">Email</span>
                <span className="text-on-surface text-xs font-semibold truncate">{provider.email}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-on-surface-variant text-[10px] uppercase tracking-widest font-bold">Documents</span>
                <span className="text-xs font-semibold flex items-center gap-1.5 text-tertiary">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span> 
                  Submitted
                </span>
              </div>
            </div>

            <div className="flex gap-2 mt-auto pt-2">
              <button className="flex-1 py-2.5 rounded-full border border-outline-variant text-on-surface text-[11px] font-bold hover:bg-surface-variant transition-colors active:scale-[0.98]">
                View Details
              </button>
              <button 
                onClick={() => verifyProvider(provider._id)}
                className="bg-tertiary/10 hover:bg-tertiary/20 text-tertiary border border-tertiary/20 px-4 py-2.5 rounded-full transition-all flex items-center justify-center group-hover:scale-105 active:scale-95"
                title="Quick Approve"
              >
                <span className="material-symbols-outlined text-xl">thumb_up</span>
              </button>
            </div>
          </div>
        ))}
        {pendingProviders.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-outline-variant rounded-xl">
            <p className="text-on-surface-variant">No pending providers at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderVerification;

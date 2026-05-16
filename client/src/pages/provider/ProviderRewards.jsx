import React from 'react';

const ProviderRewards = () => {
  return (
    <div className="min-h-screen bg-surface pt-m3-4xl pb-m3-2xl px-m3-md">
      <div className="max-w-5xl mx-auto">
        <div className="bg-primary text-on-primary p-m3-2xl rounded-4xl mb-m3-2xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-m3-xl">
          <div>
            <h1 className="text-display-sm font-display-sm mb-m3-xs">Partner Rewards</h1>
            <p className="text-body-lg text-on-primary/80">Your dedication pays off. Unlock exclusive perks as you grow.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-m3-xl rounded-3xl text-center border border-white/20">
            <div className="text-label-lg font-label-lg text-on-primary/70 uppercase tracking-wider mb-1">Available Points</div>
            <div className="text-display-md font-display-md leading-none">12,450</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-m3-lg mb-m3-3xl">
          <div className="bg-surface-container-low p-m3-xl rounded-3xl border border-outline-variant/30 text-center">
            <span className="material-symbols-outlined text-primary text-headline-sm mb-m3-sm">local_shipping</span>
            <h3 className="text-title-lg font-title-lg text-on-surface mb-m3-xs">Fuel Discounts</h3>
            <p className="text-body-md text-on-surface-variant mb-m3-md">Get 5% off fuel at partner stations across the city.</p>
            <div className="text-label-lg font-bold text-primary">2,000 Points</div>
          </div>
          <div className="bg-surface-container-low p-m3-xl rounded-3xl border border-outline-variant/30 text-center">
            <span className="material-symbols-outlined text-primary text-headline-sm mb-m3-sm">handyman</span>
            <h3 className="text-title-lg font-title-lg text-on-surface mb-m3-xs">Tool Insurance</h3>
            <p className="text-body-md text-on-surface-variant mb-m3-md">Subsidized insurance for your essential work tools.</p>
            <div className="text-label-lg font-bold text-primary">5,000 Points</div>
          </div>
          <div className="bg-surface-container-low p-m3-xl rounded-3xl border border-outline-variant/30 text-center">
            <span className="material-symbols-outlined text-primary text-headline-sm mb-m3-sm">workspace_premium</span>
            <h3 className="text-title-lg font-title-lg text-on-surface mb-m3-xs">Top Partner Badge</h3>
            <p className="text-body-md text-on-surface-variant mb-m3-md">Increased visibility in search results for 30 days.</p>
            <div className="text-label-lg font-bold text-primary">8,000 Points</div>
          </div>
        </div>

        <h2 className="text-headline-sm font-headline-sm text-on-surface mb-m3-xl">Upcoming Milestones</h2>
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4xl p-m3-2xl shadow-sm">
          <div className="flex justify-between items-center mb-m3-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">military_tech</span>
              </div>
              <div>
                <h4 className="text-title-md font-title-md text-on-surface">Silver Partner Status</h4>
                <p className="text-body-sm text-on-surface-variant">Reach 15,000 points to unlock lower service fees</p>
              </div>
            </div>
            <div className="text-label-lg font-bold text-on-surface">83%</div>
          </div>
          <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
            <div className="w-[83%] h-full bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderRewards;

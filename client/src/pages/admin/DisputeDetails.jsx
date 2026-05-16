import React from 'react';
import { useParams, Link } from 'react-router-dom';

const DisputeDetails = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col min-h-full">
      {/* Detail Header */}
      <div className="px-6 md:px-margin-desktop py-6 border-b border-outline-variant bg-surface-container-low/50">
        <div className="flex items-center gap-4 mb-4">
           <Link to="/admin/disputes" className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
           </Link>
           <h2 className="text-2xl font-headline font-bold text-on-surface">Case Details: {id || 'DSP-8924A'}</h2>
           <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ml-auto">
             High Priority
           </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <div className="bg-surface-container border border-outline-variant rounded-xl p-4">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Service Type</p>
              <p className="text-on-surface font-medium">Deep Home Cleaning</p>
           </div>
           <div className="bg-surface-container border border-outline-variant rounded-xl p-4">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Total Value</p>
              <p className="text-on-surface font-medium">$240.00</p>
           </div>
           <div className="bg-surface-container border border-outline-variant rounded-xl p-4">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Customer</p>
              <p className="text-on-surface font-medium">Sarah Jenkins</p>
           </div>
           <div className="bg-surface-container border border-outline-variant rounded-xl p-4">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Provider</p>
              <p className="text-on-surface font-medium">ProClean Services LLC</p>
           </div>
        </div>
      </div>

      <div className="flex-grow p-6 md:p-8 lg:px-12 xl:px-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Evidence & Media */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-high/20">
              <h3 className="font-bold text-on-surface">Case Evidence</h3>
              <span className="text-xs text-on-surface-variant">4 Photos Uploaded</span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-surface-container-high rounded-xl border border-outline-variant overflow-hidden group cursor-pointer">
                    <img alt={`Evidence ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" src={`https://picsum.photos/seed/dispute${i}/400/400`} />
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-error/5 border border-error/10 rounded-xl">
                 <h4 className="text-error text-sm font-bold flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-sm">report_problem</span>
                    Customer Complaint
                 </h4>
                 <p className="text-sm text-on-surface leading-relaxed">
                   "The provider arrived 2 hours late and skipped the entire kitchen area despite it being listed in the premium package. I requested a rework but was told they had another appointment. Evidence photos show the dusty surfaces left behind."
                 </p>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden">
             <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-high/20">
                <h3 className="font-bold text-on-surface">Communication Log</h3>
             </div>
             <div className="p-6 space-y-4">
                {[
                  { sender: 'System', msg: 'Job marked as complete', time: 'Oct 24, 12:00', type: 'system' },
                  { sender: 'Customer', msg: 'The kitchen wasn\'t cleaned at all. Can you come back?', time: 'Oct 24, 12:15', type: 'customer' },
                  { sender: 'Provider', msg: 'I cleaned everything as per the checklist. I have another job now.', time: 'Oct 24, 12:30', type: 'provider' },
                  { sender: 'Customer', msg: 'This is unacceptable. I am opening a dispute.', time: 'Oct 24, 12:45', type: 'customer' },
                ].map((log, i) => (
                  <div key={i} className={`flex flex-col ${log.type === 'customer' ? 'items-start' : log.type === 'provider' ? 'items-end' : 'items-center'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      log.type === 'customer' ? 'bg-surface-container-high text-on-surface rounded-tl-none' : 
                      log.type === 'provider' ? 'bg-primary text-on-primary rounded-tr-none' : 
                      'bg-surface-variant/20 text-on-surface-variant italic border border-outline-variant/30 px-6'
                    }`}>
                      {log.msg}
                    </div>
                    <span className="text-[10px] text-on-surface-variant mt-1 px-1">{log.sender} • {log.time}</span>
                  </div>
                ))}
             </div>
          </section>
        </div>

        {/* Right Column: Adjudication Control */}
        <div className="lg:col-span-1 space-y-8">
           <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 sticky top-24 shadow-xl">
              <h3 className="font-bold text-on-surface mb-6 flex items-center gap-2">
                 <span className="material-symbols-outlined text-primary">gavel</span>
                 Adjudication Console
              </h3>
              
              <div className="space-y-6">
                 <div>
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3 block">Resolution Action</label>
                    <div className="grid grid-cols-1 gap-2">
                       <button className="w-full text-left p-3 rounded-xl border border-outline-variant bg-surface-container hover:border-primary transition-all flex items-center justify-between group">
                          <div>
                             <p className="text-sm font-bold text-on-surface">Full Refund</p>
                             <p className="text-[10px] text-on-surface-variant">Refund $240.00 to Customer</p>
                          </div>
                          <div className="w-4 h-4 rounded-full border border-outline-variant group-hover:border-primary"></div>
                       </button>
                       <button className="w-full text-left p-3 rounded-xl border border-primary bg-primary/5 flex items-center justify-between">
                          <div>
                             <p className="text-sm font-bold text-on-surface">Partial Refund (50%)</p>
                             <p className="text-[10px] text-on-surface-variant">Refund $120.00 to Customer</p>
                          </div>
                          <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                             <div className="w-1.5 h-1.5 rounded-full bg-on-primary"></div>
                          </div>
                       </button>
                       <button className="w-full text-left p-3 rounded-xl border border-outline-variant bg-surface-container hover:border-error transition-all flex items-center justify-between group">
                          <div>
                             <p className="text-sm font-bold text-on-surface">Reject Dispute</p>
                             <p className="text-[10px] text-on-surface-variant">Release full payment to Provider</p>
                          </div>
                          <div className="w-4 h-4 rounded-full border border-outline-variant group-hover:border-error"></div>
                       </button>
                    </div>
                 </div>

                 <div>
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3 block">Internal Adjudication Note</label>
                    <textarea 
                      className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none h-32"
                      placeholder="Explain the rationale for this decision..."
                    ></textarea>
                 </div>

                 <button className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all">
                    Finalize Decision
                 </button>
                 <p className="text-[10px] text-on-surface-variant text-center px-4">
                    By finalizing, you trigger immediate financial settlement and notify both parties. This action is recorded in the audit trail.
                 </p>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default DisputeDetails;

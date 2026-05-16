import React from 'react';
import { Link } from 'react-router-dom';

const DisputeQueue = () => {
  const disputes = [
    { id: 'DSP-8924A', date: 'Oct 24, 14:30', service: 'Deep Cleaning', orderId: 'ORD-99120-X', customer: 'Sarah Jenkins', provider: 'ProClean Services LLC', status: 'New', statusColor: 'bg-primary-container text-on-primary-container border-primary/20', dotColor: 'bg-primary', action: 'Review' },
    { id: 'DSP-8810B', date: 'Oct 23, 09:15', service: 'Plumbing Repair', orderId: 'ORD-77412-P', customer: 'Marcus Thorne', provider: 'Elite Pipes Co.', status: 'Under Review', statusColor: 'bg-surface-variant text-on-surface border-outline-variant', icon: 'pending', action: 'Continue' },
    { id: 'DSP-8705C', date: 'Oct 20, 16:45', service: 'Exterior Painting', orderId: 'ORD-55290-E', customer: 'Elena Rostova', provider: 'ColorTech Painters', status: 'Resolution Pending', statusColor: 'bg-tertiary-container/30 text-tertiary border-tertiary/30', icon: 'gavel', action: 'Finalize' },
    { id: 'DSP-8699D', date: 'Oct 19, 11:20', service: 'Landscaping Install', orderId: 'ORD-33104-L', customer: 'David Chen', provider: 'GreenThumb Pros', status: 'Under Review', statusColor: 'bg-surface-variant text-on-surface border-outline-variant', icon: 'pending', action: 'Continue' },
  ];

  return (
    <div className="p-6 md:p-8 lg:px-12 xl:px-24 space-y-8">
      {/* Page Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-headline font-bold tracking-tight text-on-background mb-1">Dispute Resolution Queue</h2>
          <p className="text-sm font-body text-on-surface-variant max-w-2xl">Manage and adjudicate active service conflicts. Prioritize high-value or long-standing disputes to maintain platform trust.</p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input 
              className="w-full bg-surface-container text-sm text-on-background border border-outline-variant rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow placeholder:text-on-secondary-container" 
              placeholder="Search Order ID or Name..." 
              type="text"
            />
          </div>
          <button className="flex items-center justify-center h-9 w-9 rounded-lg border border-outline-variant bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-sm">filter_list</span>
          </button>
        </div>
      </div>

      {/* High-Density Data List */}
      <div className="bg-surface-container border border-outline-variant rounded-xl overflow-hidden flex flex-col shadow-sm">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-outline-variant bg-surface-container-low text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
          <div className="col-span-2">Dispute ID</div>
          <div className="col-span-3">Service Details</div>
          <div className="col-span-3">Parties Involved</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        {/* List Items */}
        <div className="flex flex-col divide-y divide-outline-variant">
          {disputes.map((dispute) => (
            <div key={dispute.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 md:px-6 py-4 hover:bg-surface-container-high transition-colors group">
              <div className="col-span-1 md:col-span-2 flex flex-col justify-center gap-1">
                <span className="text-sm font-mono text-on-background font-bold tracking-tight">{dispute.id}</span>
                <span className="text-[11px] text-on-surface-variant font-medium">{dispute.date}</span>
              </div>
              <div className="col-span-1 md:col-span-3 flex flex-col justify-center gap-1">
                <span className="text-sm font-body text-on-background font-semibold">{dispute.service}</span>
                <span className="text-[11px] text-on-surface-variant font-mono">{dispute.orderId}</span>
              </div>
              <div className="col-span-1 md:col-span-3 flex flex-col justify-center gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-on-surface-variant">person</span>
                  <span className="text-sm text-on-background font-medium">{dispute.customer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-on-surface-variant">badge</span>
                  <span className="text-xs text-on-surface-variant font-medium">{dispute.provider}</span>
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 flex items-center">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wider ${dispute.statusColor}`}>
                  {dispute.dotColor && <span className={`w-1.5 h-1.5 rounded-full ${dispute.dotColor} mr-2`}></span>}
                  {dispute.icon && <span className="material-symbols-outlined text-sm mr-1.5" style={{ fontVariationSettings: "'FILL' 1" }}>{dispute.icon}</span>}
                  {dispute.status}
                </span>
              </div>
              <div className="col-span-1 md:col-span-2 flex items-center justify-start md:justify-end">
                <Link 
                  to={`/admin/disputes/${dispute.id}`} 
                  className={`text-sm font-bold transition-all flex items-center gap-1 group/link hover:translate-x-1 ${
                    dispute.status === 'Resolution Pending' ? 'text-tertiary hover:text-tertiary-fixed' : dispute.status === 'New' ? 'text-primary hover:text-primary-fixed-dim' : 'text-on-surface hover:text-primary'
                  }`}
                >
                  {dispute.action} <span className="material-symbols-outlined text-base">chevron_right</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Footer */}
        <div className="border-t border-outline-variant px-6 py-4 flex items-center justify-between bg-surface-container-low">
          <span className="text-xs text-on-surface-variant">Showing 1 to 4 of 24 active disputes</span>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 text-xs font-medium border border-outline-variant rounded bg-surface-container text-on-surface-variant opacity-50 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1.5 text-xs font-medium border border-outline-variant rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeQueue;

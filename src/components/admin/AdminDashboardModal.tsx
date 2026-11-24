import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useBooking } from '../../contexts/BookingContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { 
  X, 
  ShieldCheck, 
  Calendar, 
  DollarSign, 
  Users, 
  Ban, 
  Check, 
  Filter, 
  Lock, 
  Plus 
} from 'lucide-react';
import { format } from 'date-fns';

export const AdminDashboardModal: React.FC = () => {
  const { isAdminDashboardOpen, setIsAdminDashboardOpen } = useAuth();
  const { bookings } = useBooking();
  const { addNotification } = useNotifications();

  const [statusFilter, setStatusFilter] = useState<'all' | 'deposit_paid' | 'fully_paid'>('all');
  const [blockedDates, setBlockedDates] = useState<string[]>([
    '2026-12-25', // Christmas
    '2027-01-01', // New Year
  ]);
  const [newBlockDate, setNewBlockDate] = useState('');

  if (!isAdminDashboardOpen) return null;

  // Revenue analytics
  const totalBookingsCount = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalCollected = bookings.reduce((sum, b) => {
    return sum + (b.paymentStatus === 'fully_paid' ? b.totalAmount : b.depositAmount);
  }, 0);
  const totalOutstanding = bookings.reduce((sum, b) => sum + b.balanceDue, 0);

  const filteredBookings = statusFilter === 'all'
    ? bookings
    : bookings.filter((b) => b.paymentStatus === statusFilter);

  const handleBlockDate = () => {
    if (newBlockDate && !blockedDates.includes(newBlockDate)) {
      setBlockedDates([...blockedDates, newBlockDate]);
      addNotification(
        'Calendar Slot Blocked',
        `Date ${newBlockDate} was blocked by admin from public booking.`,
        'system'
      );
      setNewBlockDate('');
    }
  };

  const handleUnblockDate = (date: string) => {
    setBlockedDates(blockedDates.filter((d) => d !== date));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="glass-panel w-full max-w-5xl rounded-3xl border border-white/20 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-brand-crimson/20 border border-brand-crimson/40 flex items-center justify-center text-brand-crimson font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-display">iDez Studio Admin Console</h2>
              <p className="text-xs text-slate-400">
                Manage bookings, monitor 70% deposits, and block calendar availability
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminDashboardOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="glass-card p-4 rounded-xl border border-white/10 space-y-1">
              <span className="text-[11px] text-slate-400 block font-medium">Total Bookings</span>
              <div className="text-2xl font-extrabold text-white">{totalBookingsCount}</div>
            </div>

            <div className="glass-card p-4 rounded-xl border border-white/10 space-y-1">
              <span className="text-[11px] text-slate-400 block font-medium">Total Agreed Value</span>
              <div className="text-xl font-extrabold text-brand-gold">₦{totalRevenue.toLocaleString()}</div>
            </div>

            <div className="glass-card p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-1">
              <span className="text-[11px] text-emerald-300 block font-medium">Deposits Collected</span>
              <div className="text-xl font-extrabold text-emerald-400">₦{totalCollected.toLocaleString()}</div>
            </div>

            <div className="glass-card p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-1">
              <span className="text-[11px] text-amber-300 block font-medium">Pending Balance (30%)</span>
              <div className="text-xl font-extrabold text-amber-300">₦{totalOutstanding.toLocaleString()}</div>
            </div>

          </div>

          {/* Calendar Slot Blocker Panel */}
          <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Ban className="w-4 h-4 text-rose-400" />
              Calendar Slot Blocker (Holidays & Closed Studio Dates)
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="date"
                value={newBlockDate}
                onChange={(e) => setNewBlockDate(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-brand-card border border-white/10 text-white text-xs focus:outline-none focus:border-brand-crimson"
              />
              <button
                type="button"
                onClick={handleBlockDate}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Block This Date
              </button>
            </div>

            {/* Blocked dates tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {blockedDates.map((date) => (
                <span
                  key={date}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300"
                >
                  <Lock className="w-3 h-3 text-rose-400" />
                  <span>{date} (Unavailable)</span>
                  <button
                    onClick={() => handleUnblockDate(date)}
                    className="text-slate-400 hover:text-white ml-1 font-bold"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Bookings Table with Filter */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                All Client Reservations
              </h3>
              
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-400">Filter:</span>
                {(['all', 'deposit_paid', 'fully_paid'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setStatusFilter(f)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      statusFilter === f
                        ? 'bg-brand-crimson text-white'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {f === 'all' ? 'All' : f === 'deposit_paid' ? '70% Deposit' : '100% Cleared'}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="glass-card rounded-2xl border border-white/10 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 border-b border-white/10 text-slate-300 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Code</th>
                    <th className="p-3.5">Client & Contact</th>
                    <th className="p-3.5">Package</th>
                    <th className="p-3.5">Date & Slot</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Balance Due</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-3.5 font-mono font-bold text-brand-gold">{b.bookingCode}</td>
                      <td className="p-3.5">
                        <strong className="text-white block">{b.clientName}</strong>
                        <span className="text-[11px] text-slate-400 block">{b.clientPhone}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="text-slate-200 block font-medium">{b.serviceTitle}</span>
                        <span className="text-[10px] text-slate-400">{b.creativeDirection}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="text-white font-medium block">{b.eventDate}</span>
                        <span className="text-[10px] text-slate-400 block">{b.eventSlot}</span>
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          b.paymentStatus === 'fully_paid'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : 'bg-amber-500/15 text-amber-300'
                        }`}>
                          {b.paymentStatus === 'fully_paid' ? '100% Paid' : '70% Deposit'}
                        </span>
                      </td>
                      <td className="p-3.5 text-right font-bold text-white">
                        {b.balanceDue > 0 ? (
                          <span className="text-amber-400">₦{b.balanceDue.toLocaleString()}</span>
                        ) : (
                          <span className="text-emerald-400">₦0</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-slate-400">iDez Dance & Entertainment Admin Management</span>
          <button
            onClick={() => setIsAdminDashboardOpen(false)}
            className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};

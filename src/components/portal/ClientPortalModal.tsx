import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useBooking } from '../../contexts/BookingContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { 
  X, 
  Calendar, 
  DollarSign, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  Bell, 
  Search, 
  ShieldAlert,
  Loader2 
} from 'lucide-react';

export const ClientPortalModal: React.FC = () => {
  const { isPortalOpen, setIsPortalOpen, currentUser } = useAuth();
  const { bookings, markBalancePaid } = useBooking();
  const { addNotification } = useNotifications();
  const [searchCode, setSearchCode] = useState('');
  const [payingCode, setPayingCode] = useState<string | null>(null);

  if (!isPortalOpen) return null;

  // Filter bookings: either matching current user's email, or searched by code
  const userBookings = bookings.filter((b) => {
    if (searchCode.trim()) {
      return b.bookingCode.toLowerCase().includes(searchCode.trim().toLowerCase());
    }
    return true; // show existing bookings in demo
  });

  const handlePayRemainingBalance = async (bookingCode: string, amount: number) => {
    setPayingCode(bookingCode);
    try {
      // Simulate Paystack transaction for remaining 30% balance
      await new Promise((res) => setTimeout(res, 1200));

      markBalancePaid(bookingCode);
      addNotification(
        'Balance Cleared (100% Paid)',
        `Your remaining balance of ₦${amount.toLocaleString()} for booking ${bookingCode} has been cleared. Full invoice generated.`,
        'payment'
      );
    } catch (e) {
      console.error(e);
    } finally {
      setPayingCode(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="glass-panel w-full max-w-4xl rounded-3xl border border-white/20 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold font-bold">
              {currentUser?.name ? currentUser.name.charAt(0) : 'C'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-display">Client Portal & Bookings</h2>
              <p className="text-xs text-slate-400">
                Logged in as <strong>{currentUser?.email || 'Guest Client'}</strong> &bull; Manage dates and balances
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPortalOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Tracking Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by Booking Tracking Code (e.g. IDEZ-2026-9042)..."
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-card border border-white/10 text-white text-xs focus:outline-none focus:border-brand-crimson"
            />
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Your Reservations ({userBookings.length})
              </h3>
              <span className="text-[11px] text-slate-400">Dates are locked once 70% deposit is paid.</span>
            </div>

            {userBookings.length === 0 ? (
              <div className="text-center py-12 glass-card rounded-2xl border border-white/5 p-6 text-slate-400 text-xs">
                No bookings found matching your search.
              </div>
            ) : (
              userBookings.map((b) => (
                <div
                  key={b.id}
                  className="glass-card rounded-2xl p-5 border border-white/10 space-y-4 shadow-lg hover:border-white/20 transition-all"
                >
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                    <div>
                      <span className="text-xs font-mono font-bold text-brand-gold">{b.bookingCode}</span>
                      <h4 className="text-base font-bold text-white font-display mt-0.5">{b.serviceTitle}</h4>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold self-start sm:self-center ${
                      b.paymentStatus === 'fully_paid'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    }`}>
                      {b.paymentStatus === 'fully_paid' ? '100% Cleared' : '70% Deposit Paid'}
                    </span>
                  </div>

                  {/* Booking details grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 text-[11px] block">Event Date:</span>
                      <strong className="text-white block mt-0.5">{b.eventDate}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">Time Slot:</span>
                      <strong className="text-white block mt-0.5 truncate">{b.eventSlot}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">Location:</span>
                      <span className="text-white block mt-0.5">{b.eventLocation}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">Total Package:</span>
                      <strong className="text-white block mt-0.5">₦{b.totalAmount.toLocaleString()}</strong>
                    </div>
                  </div>

                  {/* Balance Payment Notice / Pay Button */}
                  {b.balanceDue > 0 ? (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-amber-300 block">
                          Outstanding Balance Due: ₦{b.balanceDue.toLocaleString()}
                        </span>
                        <span className="text-slate-400 text-[11px] block">
                          Per iDez terms, remaining 30% must be cleared before the event date.
                        </span>
                      </div>
                      <button
                        onClick={() => handlePayRemainingBalance(b.bookingCode, b.balanceDue)}
                        disabled={payingCode === b.bookingCode}
                        className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0"
                      >
                        {payingCode === b.bookingCode ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Pay ₦{b.balanceDue.toLocaleString()} via Paystack</span>
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>This booking is fully paid. Zero outstanding balance. Rehearsal notifications active.</span>
                    </div>
                  )}

                </div>
              ))
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-slate-400">Questions? WhatsApp: +234 803 000 0000</span>
          <button
            onClick={() => setIsPortalOpen(false)}
            className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
};

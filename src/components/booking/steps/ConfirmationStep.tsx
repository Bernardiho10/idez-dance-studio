import React from 'react';
import { useBooking } from '../../../contexts/BookingContext';
import { useAuth } from '../../../contexts/AuthContext';
import { CheckCircle2, Calendar, MapPin, Download, Printer, User, ArrowRight } from 'lucide-react';

export const ConfirmationStep: React.FC = () => {
  const { activeBooking, closeWizard, resetBooking } = useBooking();
  const { setIsPortalOpen } = useAuth();

  if (!activeBooking) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-sm text-slate-400">No active booking found.</p>
        <button
          onClick={closeWizard}
          className="px-6 py-2.5 rounded-xl bg-brand-crimson text-white text-xs font-semibold"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleOpenClientPortal = () => {
    closeWizard();
    setIsPortalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Success Banner */}
      <div className="text-center space-y-3 py-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-white font-display">
          Your Date is Firmly Locked!
        </h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Your payment was processed successfully. A confirmation email and in-app notification have been issued.
        </p>
      </div>

      {/* Booking Voucher Card */}
      <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-4 shadow-xl">
        
        {/* Voucher Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold text-brand-crimson tracking-wider">
              Booking Tracking Reference
            </span>
            <div className="text-xl font-mono font-extrabold text-white">
              {activeBooking.bookingCode}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              activeBooking.paymentStatus === 'fully_paid'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {activeBooking.paymentStatus === 'fully_paid' ? '100% Fully Cleared' : '70% Deposit Confirmed'}
            </span>
          </div>
        </div>

        {/* Voucher Grid Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Experience / Package:</span>
            <strong className="text-white text-sm block mt-0.5">{activeBooking.serviceTitle}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Reserved Date & Slot:</span>
            <div className="flex items-center gap-1.5 mt-0.5 text-white font-semibold">
              <Calendar className="w-3.5 h-3.5 text-brand-crimson" />
              <span>{activeBooking.eventDate} ({activeBooking.eventSlot})</span>
            </div>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Event Location:</span>
            <div className="flex items-center gap-1.5 mt-0.5 text-white">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              <span>{activeBooking.eventLocation}</span>
            </div>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Client Name:</span>
            <span className="text-white font-semibold mt-0.5 block">{activeBooking.clientName}</span>
          </div>
        </div>

        {/* Financial Summary inside voucher */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-300">
            <span>Total Agreed Value:</span>
            <span className="font-semibold text-white">₦{activeBooking.totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Amount Paid Today:</span>
            <span className="font-semibold text-emerald-400">
              ₦{(activeBooking.paymentStatus === 'fully_paid' ? activeBooking.totalAmount : activeBooking.depositAmount).toLocaleString()}
            </span>
          </div>
          {activeBooking.balanceDue > 0 && (
            <div className="flex justify-between text-amber-300 pt-1 border-t border-white/5">
              <span>Remaining Balance Due Before Event:</span>
              <span className="font-bold">₦{activeBooking.balanceDue.toLocaleString()}</span>
            </div>
          )}
        </div>

      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2"
        >
          <Printer className="w-4 h-4" /> Print / Save Voucher
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleOpenClientPortal}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2"
          >
            <User className="w-4 h-4 text-brand-gold" /> View in Client Portal
          </button>

          <button
            onClick={() => {
              resetBooking();
              closeWizard();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-crimson hover:bg-rose-600 text-white text-xs font-bold"
          >
            Done
          </button>
        </div>
      </div>

    </div>
  );
};

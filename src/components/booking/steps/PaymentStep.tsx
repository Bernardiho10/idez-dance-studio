import React, { useState } from 'react';
import { useBooking } from '../../../contexts/BookingContext';
import { useNotifications } from '../../../contexts/NotificationContext';
import { PaymentChoice } from '../../../types';
import { 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft,
  Loader2 
} from 'lucide-react';

export const PaymentStep: React.FC = () => {
  const { formData, updateFormData, pricing, createBooking, nextStep, prevStep } = useBooking();
  const { addNotification } = useNotifications();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaystackModal, setShowPaystackModal] = useState(false);

  const handleSelectPaymentChoice = (choice: PaymentChoice) => {
    updateFormData({ paymentChoice: choice });
  };

  const handleInitiatePaystack = () => {
    setShowPaystackModal(true);
  };

  const handleConfirmPaystackPayment = async () => {
    setIsProcessing(true);
    setShowPaystackModal(false);

    try {
      // Simulate network request to Paystack & Go backend
      await new Promise((res) => setTimeout(res, 1200));

      const booking = await createBooking();

      // Trigger In-App Notification
      addNotification(
        formData.paymentChoice === 'full_100'
          ? 'Booking Confirmed (100% Paid)'
          : 'Booking Confirmed (70% Deposit Paid)',
        `Your reservation ${booking.bookingCode} for "${booking.serviceTitle}" on ${booking.eventDate} is locked. Receipt dispatched.`,
        'booking',
        booking.id
      );

      nextStep();
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div>
        <h3 className="text-lg font-bold text-white font-display">
          Step 5: Payment & Date Lock (Paystack)
        </h3>
        <p className="text-xs text-slate-300 mt-1">
          Lock down your date securely. Per official iDez T&C, dates are guaranteed once a 70% deposit or full payment is verified.
        </p>
      </div>

      {/* Payment Option Toggle Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Option 1: 70% Deposit (Official T&C) */}
        <div
          onClick={() => handleSelectPaymentChoice('deposit_70')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
            formData.paymentChoice === 'deposit_70'
              ? 'bg-brand-crimson/15 border-brand-crimson shadow-xl shadow-brand-crimson/10 relative overflow-hidden'
              : 'bg-white/5 border-white/10 hover:border-white/20'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-brand-crimson text-white text-[10px] font-bold uppercase tracking-wider">
                Official iDez Term
              </span>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                formData.paymentChoice === 'deposit_70' ? 'bg-brand-crimson border-brand-crimson text-white' : 'border-white/20'
              }`}>
                {formData.paymentChoice === 'deposit_70' && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>
            </div>

            <h4 className="text-base font-bold text-white">Pay 70% Non-Refundable Deposit</h4>
            <div className="text-2xl font-extrabold text-white">
              ₦{pricing.depositAmount.toLocaleString()}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Locks your date securely today. The remaining 30% balance (<strong>₦{pricing.balanceDue.toLocaleString()}</strong>) is payable before your event date.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400">
            Total event value: ₦{pricing.totalAmount.toLocaleString()}
          </div>
        </div>

        {/* Option 2: 100% Full Payment */}
        <div
          onClick={() => handleSelectPaymentChoice('full_100')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
            formData.paymentChoice === 'full_100'
              ? 'bg-brand-crimson/15 border-brand-crimson shadow-xl shadow-brand-crimson/10 relative overflow-hidden'
              : 'bg-white/5 border-white/10 hover:border-white/20'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-white/10 text-slate-300 text-[10px] font-bold uppercase tracking-wider">
                One-Time Settle
              </span>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                formData.paymentChoice === 'full_100' ? 'bg-brand-crimson border-brand-crimson text-white' : 'border-white/20'
              }`}>
                {formData.paymentChoice === 'full_100' && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>
            </div>

            <h4 className="text-base font-bold text-white">Pay 100% In Full</h4>
            <div className="text-2xl font-extrabold text-white">
              ₦{pricing.totalAmount.toLocaleString()}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Clear everything upfront. No future balance reminders or checkout hassle before the event.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-emerald-400 font-medium">
            Balance after payment: ₦0 (Fully Cleared)
          </div>
        </div>

      </div>

      {/* Itemized Live Bill Summary */}
      <div className="p-5 rounded-2xl bg-brand-card border border-white/10 space-y-3">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-white/10">
          Booking Cost Summary
        </h4>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-slate-300">
            <span>Package Rate:</span>
            <span className="text-white font-medium">₦{pricing.basePrice.toLocaleString()}</span>
          </div>

          {pricing.creativeDirectionPrice > 0 && (
            <div className="flex justify-between text-slate-300">
              <span>Creative Direction:</span>
              <span className="text-white font-medium">+₦{pricing.creativeDirectionPrice.toLocaleString()}</span>
            </div>
          )}

          {pricing.rushFeeAmount > 0 && (
            <div className="flex justify-between text-rose-400 font-medium">
              <span>Rush Delivery Fee (within 7 days):</span>
              <span>+₦{pricing.rushFeeAmount.toLocaleString()}</span>
            </div>
          )}

          <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white">
            <span>Total Package Value:</span>
            <span className="text-brand-gold">₦{pricing.totalAmount.toLocaleString()}</span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between text-xs mt-2">
            <span className="font-semibold text-white">
              Due Today ({formData.paymentChoice === 'deposit_70' ? '70% Deposit' : '100% Full Payment'}):
            </span>
            <span className="text-base font-extrabold text-emerald-400">
              ₦{pricing.amountToPayNow.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Paystack Security Notice */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Secured by <strong>Paystack</strong> (Supports Debit Cards, Bank Transfer, Apple Pay & USSD)</span>
        </div>
        <span className="hidden sm:inline font-mono text-[11px] text-slate-400">Currency: NGN (₦)</span>
      </div>

      {/* Nav Controls */}
      <div className="pt-4 flex items-center justify-between border-t border-white/10">
        <button
          onClick={prevStep}
          disabled={isProcessing}
          className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Contact
        </button>

        <button
          onClick={handleInitiatePaystack}
          disabled={isProcessing}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-crimson to-rose-600 hover:from-rose-600 hover:to-brand-crimson text-white font-bold text-xs shadow-xl shadow-brand-crimson/30 transition-all flex items-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying with Paystack...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4" />
              <span>Pay ₦{pricing.amountToPayNow.toLocaleString()} via Paystack</span>
            </>
          )}
        </button>
      </div>

      {/* Simulated Paystack Checkout Modal */}
      {showPaystackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0b1329] text-white w-full max-w-md rounded-2xl p-6 border border-slate-700 shadow-2xl space-y-5">
            
            {/* Paystack Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#0ba4db] flex items-center justify-center font-bold text-xs text-white">
                  P
                </div>
                <span className="font-bold text-sm tracking-tight">paystack</span>
              </div>
              <span className="text-[11px] text-slate-400">Secured Checkout</span>
            </div>

            {/* Amount details */}
            <div className="text-center py-2 space-y-1">
              <span className="text-xs text-slate-400">Pay iDez Entertainment</span>
              <div className="text-3xl font-extrabold text-white">
                ₦{pricing.amountToPayNow.toLocaleString()}
              </div>
              <span className="text-xs text-[#0ba4db] font-medium block">
                {formData.email}
              </span>
            </div>

            {/* Test Payment Channel selection */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span>Card ending in <strong>4081</strong></span>
                <span className="text-emerald-400 font-semibold">Test Success Card</span>
              </div>
              <p className="text-[11px] text-slate-400 text-center">
                This will simulate a real-time Paystack webhook verification callback.
              </p>
            </div>

            {/* Pay Button */}
            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setShowPaystackModal(false)}
                className="flex-1 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPaystackPayment}
                className="flex-1 py-3 rounded-lg bg-[#0ba4db] hover:bg-[#0993c5] text-xs font-bold text-white shadow-lg"
              >
                Simulate Success
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

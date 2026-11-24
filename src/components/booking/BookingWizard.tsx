import React from 'react';
import { useBooking } from '../../contexts/BookingContext';
import { SelectPackageStep } from './steps/SelectPackageStep';
import { SelectDateTimeStep } from './steps/SelectDateTimeStep';
import { CustomizationStep } from './steps/CustomizationStep';
import { ClientDetailsStep } from './steps/ClientDetailsStep';
import { PaymentStep } from './steps/PaymentStep';
import { ConfirmationStep } from './steps/ConfirmationStep';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BookingWizard: React.FC = () => {
  const { step, setStep, isWizardOpen, closeWizard } = useBooking();

  if (!isWizardOpen) return null;

  const STEPS_NAV = [
    { number: 1, label: 'Package' },
    { number: 2, label: 'Date & Slot' },
    { number: 3, label: 'Customization' },
    { number: 4, label: 'Contact' },
    { number: 5, label: 'Payment (70%)' },
    { number: 6, label: 'Confirmation' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bento-card w-full max-w-4xl border border-white/20 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden bg-zinc-950/95"
      >
        
        {/* Wizard Header & Progress Bar */}
        <div className="px-6 py-5 bg-zinc-900/40 border-b border-white/10 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-brand-crimson/20 border border-brand-crimson/40 flex items-center justify-center text-brand-crimson font-luxury font-bold text-xs">
                iD
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-brand-gold uppercase tracking-widest block">
                  OFFICIAL 2026/27 BOOKING SYSTEM
                </span>
                <h2 className="text-xl font-bold text-white font-luxury">
                  Reserve Your iDez Experience
                </h2>
              </div>
            </div>

            <button
              onClick={closeWizard}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step Indicator Pills (Kibo UI style) */}
          <div className="mt-5 hidden sm:grid grid-cols-6 gap-2 font-mono">
            {STEPS_NAV.map((s) => {
              const isDone = s.number < step;
              const isCurrent = s.number === step;

              return (
                <button
                  key={s.number}
                  disabled={s.number > step}
                  onClick={() => setStep(s.number)}
                  className={`text-left p-2 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-brand-crimson/20 border-brand-crimson text-white shadow-md'
                      : isDone
                      ? 'bg-white/[0.03] border-white/10 text-emerald-400 cursor-pointer'
                      : 'bg-transparent border-transparent text-zinc-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold ${
                      isDone ? 'bg-emerald-400 text-black' : isCurrent ? 'bg-brand-crimson text-white' : 'bg-white/10 text-zinc-400'
                    }`}>
                      {isDone ? <Check className="w-2.5 h-2.5" /> : s.number}
                    </span>
                    <span className="text-[11px] font-medium truncate">{s.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile Step indicator */}
          <div className="mt-3 sm:hidden flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Step {step} of 6: <strong className="text-white">{STEPS_NAV[step - 1].label}</strong></span>
            <div className="flex gap-1">
              {STEPS_NAV.map((s) => (
                <div
                  key={s.number}
                  className={`h-1.5 w-6 rounded-full ${
                    s.number <= step ? 'bg-brand-crimson' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Wizard Step Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {step === 1 && <SelectPackageStep />}
          {step === 2 && <SelectDateTimeStep />}
          {step === 3 && <CustomizationStep />}
          {step === 4 && <ClientDetailsStep />}
          {step === 5 && <PaymentStep />}
          {step === 6 && <ConfirmationStep />}
        </div>

      </motion.div>
    </div>
  );
};

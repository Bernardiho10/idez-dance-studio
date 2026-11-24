import React from 'react';
import { X, ShieldAlert, CheckCircle2, MapPin, Clock, DollarSign, Sparkles } from 'lucide-react';
import { TERMS_AND_CONDITIONS } from '../../data/rateCards';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-2xl rounded-2xl border border-white/15 overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-brand-crimson/20 border border-brand-crimson/40 flex items-center justify-center text-brand-crimson">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">Official Booking Terms & Conditions</h3>
              <p className="text-xs text-slate-400">Directly from iDez Entertainment Rate Cards</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          
          {/* Rule 1: 70% Non-refundable Deposit */}
          <div className="flex items-start space-x-3.5 bg-brand-crimson/10 border border-brand-crimson/30 p-4 rounded-xl">
            <DollarSign className="w-5 h-5 text-brand-crimson shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white">70% Non-Refundable Deposit Required</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                To guarantee and lock in your performance date or rehearsal slots, a non-refundable deposit of <strong>70%</strong> is required upfront. The remaining <strong>30% balance</strong> must be cleared before the event date.
              </p>
            </div>
          </div>

          {/* Rule 2: Outside Abuja Travel Charges */}
          <div className="flex items-start space-x-3.5 bg-white/5 border border-white/10 p-4 rounded-xl">
            <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white">Travel Costs for Events Outside Abuja</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                iDez Entertainment is proud to perform across Nigeria and internationally. However, for any engagements outside the Abuja Federal Capital Territory (FCT), transportation, secure accommodation, and per diem logistics charges are billed separately.
              </p>
            </div>
          </div>

          {/* Rule 3: Rush Delivery Fee */}
          <div className="flex items-start space-x-3.5 bg-white/5 border border-white/10 p-4 rounded-xl">
            <Clock className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white">Short-Notice Projects (Within 7 Days)</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Projects requiring delivery within 7 days attract a <strong>20% to 50% rush fee</strong> to compensate for accelerated rehearsal choreography, music production, and costume turnaround.
              </p>
            </div>
          </div>

          {/* Rule 4: Custom Costumes & Props */}
          <div className="flex items-start space-x-3.5 bg-white/5 border border-white/10 p-4 rounded-xl">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white">Costumes, Wardrobe & Specialty Props</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Standard performances utilize items from existing collection. Any bespoke costumes created specifically for your brand or wedding palette, specialty props (such as oversized masquerades, stilt gear, or specialized lighting) are quoted separately based on design requirements.
              </p>
            </div>
          </div>

          {/* Rule 5: Creative Direction Note */}
          <div className="flex items-start space-x-3.5 bg-white/5 border border-white/10 p-4 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white">Performance Fee + Creative Direction</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                The final fee for custom group dance performances is a combination of the dancer performer fee and the creative direction tier (Lite ₦350k or Full ₦500k).
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-slate-400">Clear terms. Honest partnerships.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-brand-crimson hover:bg-rose-600 text-white font-medium text-xs transition-colors"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};

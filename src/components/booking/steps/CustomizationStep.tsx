import React from 'react';
import { useBooking } from '../../../contexts/BookingContext';
import { CREATIVE_DIRECTION_OPTIONS } from '../../../data/rateCards';
import { MapPin, Sparkles, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export const CustomizationStep: React.FC = () => {
  const { formData, updateFormData, nextStep, prevStep } = useBooking();

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div>
        <h3 className="text-lg font-bold text-white font-display">
          Step 3: Customization & Event Logistics
        </h3>
        <p className="text-xs text-slate-300 mt-1">
          Specify your creative direction, location, and any unique themes or choreography requests.
        </p>
      </div>

      {/* 1. Creative Direction Tier */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
          Creative Direction (Group / Performance Choreography)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CREATIVE_DIRECTION_OPTIONS.map((cd) => {
            const isSelected = formData.creativeDirection === cd.id;

            return (
              <div
                key={cd.id}
                onClick={() => updateFormData({ creativeDirection: cd.id })}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-brand-crimson/15 border-brand-crimson shadow-md text-white'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{cd.title}</span>
                    <span className="text-xs font-extrabold text-brand-gold">{cd.priceFormatted}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2">{cd.description}</p>
                </div>
                
                <div className="mt-3 pt-2 border-t border-white/5 space-y-1">
                  {cd.deliverables.slice(0, 2).map((d, i) => (
                    <span key={i} className="block text-[10px] text-slate-400">&bull; {d}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Location inside or outside Abuja */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
          Event Destination City
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => updateFormData({ eventLocation: 'abuja', eventCity: 'Abuja' })}
            className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
              formData.eventLocation === 'abuja'
                ? 'bg-white/10 border-white text-white'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
          >
            <MapPin className="w-5 h-5 text-brand-crimson shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-sm text-white block">Within Abuja (FCT)</span>
              <span className="text-xs text-slate-400">Standard base rate applies. No separate inter-state logistics.</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => updateFormData({ eventLocation: 'outside_abuja' })}
            className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
              formData.eventLocation === 'outside_abuja'
                ? 'bg-brand-crimson/20 border-brand-crimson text-white'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
          >
            <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-sm text-white block">Outside Abuja (Nationwide)</span>
              <span className="text-xs text-slate-400">Travel, hotel & logistics are quoted separately per official T&C.</span>
            </div>
          </button>
        </div>

        {formData.eventLocation === 'outside_abuja' && (
          <div className="mt-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-2">
            <label className="block text-xs font-bold text-amber-300">
              Which city will the event take place in?
            </label>
            <input
              type="text"
              placeholder="e.g. Lagos, Port Harcourt, Kano, Enugu, etc."
              value={formData.eventCity || ''}
              onChange={(e) => updateFormData({ eventCity: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-amber-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
            />
            <p className="text-[11px] text-amber-200">
              Our studio manager will coordinate troupe flights/road transport and hotel arrangements with you.
            </p>
          </div>
        )}
      </div>

      {/* 3. Special notes & music preferences */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
          Special Choreography Notes, Song Choices, or Event Theme
        </label>
        <textarea
          rows={3}
          placeholder="e.g. Wedding colors are emerald and gold. Couple wants to transition from Ed Sheeran into Burna Boy. Groom needs extra help with footwork."
          value={formData.notes}
          onChange={(e) => updateFormData({ notes: e.target.value })}
          className="w-full p-3.5 rounded-xl bg-brand-card border border-white/10 text-white text-xs focus:outline-none focus:border-brand-crimson"
        />
      </div>

      {/* Navigation */}
      <div className="pt-4 flex items-center justify-between border-t border-white/10">
        <button
          onClick={prevStep}
          className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Date
        </button>

        <button
          onClick={nextStep}
          className="px-8 py-3 rounded-xl bg-brand-crimson hover:bg-rose-600 text-white font-bold text-xs shadow-lg shadow-brand-crimson/25 transition-all flex items-center gap-2"
        >
          <span>Continue to Client Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

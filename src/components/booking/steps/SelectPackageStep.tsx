import React from 'react';
import { useBooking } from '../../../contexts/BookingContext';
import { ALL_SERVICES } from '../../../data/rateCards';
import { ServiceCategory } from '../../../types';
import { Check, ArrowRight } from 'lucide-react';

export const SelectPackageStep: React.FC = () => {
  const { formData, updateFormData, nextStep } = useBooking();

  const categories: { id: ServiceCategory; label: string; desc: string }[] = [
    { id: 'wedding', label: 'Wedding Dance', desc: 'Entrances, Couple Dance, Bridal Train' },
    { id: 'corporate', label: 'Corporate Events', desc: 'Galas, Brand Shows, Team Building' },
    { id: 'training', label: 'Dance Training', desc: 'Private 1-on-1, Multi-Session, Group' },
    { id: 'performers', label: 'Performers & Troupes', desc: 'Solo, Duo, 3-5 Dancers, Troupe 6+' },
  ];

  const currentServices = ALL_SERVICES.filter((s) => s.category === formData.selectedCategory);

  const handleSelectService = (id: string) => {
    updateFormData({ selectedServiceId: id });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Category selector */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
          Step 1: Choose Experience Category
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                const first = ALL_SERVICES.find((s) => s.category === c.id);
                updateFormData({
                  selectedCategory: c.id,
                  selectedServiceId: first?.id || null,
                });
              }}
              className={`p-3 rounded-xl text-left border transition-all ${
                formData.selectedCategory === c.id
                  ? 'bg-brand-crimson/20 border-brand-crimson text-white shadow-md'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="block text-xs font-bold text-white">{c.label}</span>
              <span className="block text-[10px] text-slate-400 mt-0.5 truncate">{c.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Services list under selected category */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
          Select Your Specific Package (Official Rates)
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentServices.map((s) => {
            const isSelected = formData.selectedServiceId === s.id;

            return (
              <div
                key={s.id}
                onClick={() => handleSelectService(s.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-brand-crimson/15 border-brand-crimson shadow-xl shadow-brand-crimson/10'
                    : 'bg-brand-card/80 border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-base font-bold text-white font-display">{s.title}</h4>
                    <span className="text-sm font-extrabold text-brand-gold shrink-0">
                      {s.priceFormatted}
                    </span>
                  </div>
                  
                  {s.subtitle && (
                    <p className="text-xs text-rose-300 font-medium mt-0.5">{s.subtitle}</p>
                  )}

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {s.description}
                  </p>

                  {s.includes && (
                    <div className="mt-3 space-y-1">
                      {s.includes.slice(0, 3).map((inc, i) => (
                        <div key={i} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    70% deposit locks date: <strong>₦{Math.round(s.startingPrice * 0.7).toLocaleString()}</strong>
                  </span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                    isSelected ? 'bg-brand-crimson border-brand-crimson text-white' : 'border-white/20'
                  }`}>
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Continue button */}
      <div className="pt-4 flex justify-end">
        <button
          onClick={nextStep}
          disabled={!formData.selectedServiceId}
          className="px-8 py-3.5 rounded-xl bg-brand-crimson hover:bg-rose-600 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-brand-crimson/25 transition-all flex items-center gap-2"
        >
          <span>Continue to Date & Slot</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

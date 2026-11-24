import React, { useState } from 'react';
import { useBooking } from '../../contexts/BookingContext';
import { 
  ALL_SERVICES, 
  CREATIVE_DIRECTION_OPTIONS, 
  TERMS_AND_CONDITIONS 
} from '../../data/rateCards';
import { 
  Calculator, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  AlertCircle, 
  ArrowRight,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

export const RateCardsSection: React.FC = () => {
  const { openWizardWithService } = useBooking();
  
  // Interactive Calculator State
  const [calcServiceId, setCalcServiceId] = useState<string>('wed-signature-package');
  const [calcCd, setCalcCd] = useState<'none' | 'lite' | 'full'>('lite');
  const [calcLocation, setCalcLocation] = useState<'abuja' | 'outside'>('abuja');
  const [calcRush, setCalcRush] = useState<boolean>(false);
  const [calcPaymentChoice, setCalcPaymentChoice] = useState<'deposit_70' | 'full_100'>('deposit_70');

  const selectedService = ALL_SERVICES.find((s) => s.id === calcServiceId) || ALL_SERVICES[0];
  const cdOption = CREATIVE_DIRECTION_OPTIONS.find((c) => c.id === calcCd) || CREATIVE_DIRECTION_OPTIONS[0];

  const basePrice = selectedService.startingPrice;
  const cdPrice = cdOption.price;
  const subtotal = basePrice + cdPrice;
  const rushFee = calcRush ? Math.round(subtotal * 0.25) : 0; // 25% within 7 days
  const total = subtotal + rushFee;
  const deposit70 = Math.round(total * 0.7);
  const balance30 = total - deposit70;
  const payNow = calcPaymentChoice === 'deposit_70' ? deposit70 : total;

  return (
    <section id="rates" className="py-24 lg:py-32 bg-[#050508] relative border-t border-white/[0.08]">
      
      {/* Background Gold Ambient */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-amber-500/[0.06] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono tracking-wider text-zinc-300">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span className="uppercase font-semibold">Transparent Cost Calculator</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-luxury tracking-tight">
            Cost & 70% Deposit Calculator
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            No guessing, no surprises. Pick your package, test add-ons, and see your exact starting fee along with the 70% deposit required to lock your date on our calendar.
          </p>
        </div>

        {/* Masterpiece Calculator Box */}
        <div className="glass-luxury-card rounded-3xl border border-white/15 overflow-hidden shadow-2xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Controls (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-7 bg-white/[0.01]">
              
              {/* 1. Select Service Package */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest mb-2.5">
                  1. Select Experience Package
                </label>
                <div className="relative">
                  <select
                    value={calcServiceId}
                    onChange={(e) => setCalcServiceId(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-brand-card/90 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-crimson font-medium"
                  >
                    <optgroup label="Wedding Dance Services">
                      {ALL_SERVICES.filter(s => s.category === 'wedding').map(s => (
                        <option key={s.id} value={s.id}>{s.title} ({s.priceFormatted})</option>
                      ))}
                    </optgroup>
                    <optgroup label="Corporate Event Experiences">
                      {ALL_SERVICES.filter(s => s.category === 'corporate').map(s => (
                        <option key={s.id} value={s.id}>{s.title} ({s.priceFormatted})</option>
                      ))}
                    </optgroup>
                    <optgroup label="Dance Training & Lessons">
                      {ALL_SERVICES.filter(s => s.category === 'training').map(s => (
                        <option key={s.id} value={s.id}>{s.title} ({s.priceFormatted})</option>
                      ))}
                    </optgroup>
                    <optgroup label="Performers & Troupes">
                      {ALL_SERVICES.filter(s => s.category === 'performers').map(s => (
                        <option key={s.id} value={s.id}>{s.title} ({s.priceFormatted})</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
                <p className="text-xs text-slate-400 mt-2 italic">{selectedService.description}</p>
              </div>

              {/* 2. Creative Direction */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest mb-2.5">
                  2. Creative Direction Tier
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {CREATIVE_DIRECTION_OPTIONS.map((cd) => (
                    <button
                      key={cd.id}
                      type="button"
                      onClick={() => setCalcCd(cd.id)}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        calcCd === cd.id
                          ? 'bg-brand-crimson/20 border-brand-crimson text-white shadow-lg shadow-brand-crimson/15'
                          : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <span className="block text-xs font-bold text-white truncate">{cd.title.replace('Creative Direction ', '')}</span>
                      <span className="block text-xs text-brand-gold font-mono font-semibold mt-1">{cd.priceFormatted}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Event Location */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest mb-2.5">
                  3. Event Destination
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCalcLocation('abuja')}
                    className={`p-3.5 rounded-2xl flex items-center justify-center gap-2 border text-xs font-bold transition-all ${
                      calcLocation === 'abuja'
                        ? 'bg-white/10 border-white text-white'
                        : 'bg-white/[0.03] border-white/10 text-slate-400'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-brand-crimson" />
                    Within Abuja (FCT)
                  </button>

                  <button
                    type="button"
                    onClick={() => setCalcLocation('outside')}
                    className={`p-3.5 rounded-2xl flex items-center justify-center gap-2 border text-xs font-bold transition-all ${
                      calcLocation === 'outside'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                        : 'bg-white/[0.03] border-white/10 text-slate-400'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    Outside Abuja (Travels)
                  </button>
                </div>

                {calcLocation === 'outside' && (
                  <div className="p-3.5 mt-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                    <span>Per official iDez T&C: Transportation, hotel & logistics are quoted separately based on your destination city.</span>
                  </div>
                )}
              </div>

              {/* 4. Rush Date Check */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div>
                  <span className="text-xs font-bold text-white block">Event within the next 7 days?</span>
                  <span className="text-[11px] text-slate-400 block">Attracts standard 25% rush delivery surcharge</span>
                </div>
                <input
                  type="checkbox"
                  checked={calcRush}
                  onChange={(e) => setCalcRush(e.target.checked)}
                  className="w-5 h-5 accent-brand-crimson rounded cursor-pointer"
                />
              </div>

            </div>

            {/* Right Summary Card (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-10 bg-brand-card/90 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10">
              
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-white font-luxury pb-3 border-b border-white/10 flex items-center justify-between">
                  <span>Price Breakdown</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">NGN (₦)</span>
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Base Package:</span>
                    <span className="font-mono font-semibold text-white">₦{basePrice.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Creative Direction ({cdOption.title}):</span>
                    <span className="font-mono font-semibold text-white">₦{cdPrice.toLocaleString()}</span>
                  </div>

                  {calcRush && (
                    <div className="flex justify-between text-rose-400 font-semibold">
                      <span>Rush Fee (25% within 7 days):</span>
                      <span className="font-mono">+₦{rushFee.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                    <span>Total Service Value:</span>
                    <span className="font-mono text-brand-gold text-base">₦{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* 70% Deposit vs 100% Toggle */}
                <div className="pt-4 border-t border-white/10 space-y-2.5">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-widest block">
                    Choose Payment Option
                  </label>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCalcPaymentChoice('deposit_70')}
                      className={`p-3 rounded-xl text-left text-xs border transition-all ${
                        calcPaymentChoice === 'deposit_70'
                          ? 'bg-brand-crimson text-white font-bold border-brand-crimson shadow-md'
                          : 'bg-white/[0.04] text-slate-400 border-white/10'
                      }`}
                    >
                      <span className="block text-[9px] uppercase tracking-wider text-rose-200">Official Term</span>
                      <span>70% Deposit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCalcPaymentChoice('full_100')}
                      className={`p-3 rounded-xl text-left text-xs border transition-all ${
                        calcPaymentChoice === 'full_100'
                          ? 'bg-brand-crimson text-white font-bold border-brand-crimson shadow-md'
                          : 'bg-white/[0.04] text-slate-400 border-white/10'
                      }`}
                    >
                      <span className="block text-[9px] uppercase tracking-wider text-rose-200">One-Time</span>
                      <span>100% Full Pay</span>
                    </button>
                  </div>
                </div>

                {/* Amount Due Box */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-white font-semibold">
                    <span>Amount Due Today:</span>
                    <span className="text-xl font-extrabold text-emerald-400 font-mono">
                      ₦{payNow.toLocaleString()}
                    </span>
                  </div>

                  {calcPaymentChoice === 'deposit_70' && (
                    <div className="flex justify-between text-slate-400 text-[11px] pt-1 border-t border-white/5">
                      <span>Balance (Payable before event):</span>
                      <span className="text-slate-200 font-mono font-medium">₦{balance30.toLocaleString()}</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-6">
                <button
                  onClick={() => openWizardWithService(calcServiceId, selectedService.category)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-crimson via-rose-600 to-amber-500 hover:from-rose-600 hover:to-brand-crimson text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-brand-crimson/30 transition-all flex items-center justify-center gap-2 group animate-shimmer"
                >
                  <span>Select & Choose Calendar Date</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[10px] text-slate-400 text-center mt-2">
                  Guarantees your slot with zero double-booking.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

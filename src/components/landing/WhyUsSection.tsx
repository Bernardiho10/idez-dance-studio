import React from 'react';
import { useBooking } from '../../contexts/BookingContext';
import { CheckCircle2, Shield, HeartHandshake, MapPin, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const { openWizardWithService } = useBooking();

  return (
    <section className="py-24 lg:py-32 bg-[#030305] relative border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 shadow-lg">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-emerald-400">
              OUR STRAIGHTFORWARD COMMITMENT
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-luxury tracking-tight">
            Why Abuja Chooses iDez
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base">
            No long talk. We treat your event with the respect and professionalism it deserves. Here is our straightforward promise to you.
          </p>
        </div>

        {/* 4 Bento Commitment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bento-card p-6 sm:p-8 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-brand-crimson/15 border border-brand-crimson/30 flex items-center justify-center text-brand-crimson">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-luxury">Strict 70% Date Lock</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Once your 70% deposit is paid, that date is locked on our calendar. We do not double-book or cancel on our clients. Your peace of mind is guaranteed.
            </p>
          </div>

          <div className="bento-card p-6 sm:p-8 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-luxury">Clear, Honest Rates</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              The prices you see on our rate cards are the actual rates. If your event is outside Abuja or within 7 days, we state the exact surcharge clearly upfront.
            </p>
          </div>

          <div className="bento-card p-6 sm:p-8 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-luxury">Zero Dance Skills Needed</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Never danced a step in your life? Do not worry. We have trained hundreds of couples and busy executives to look effortless, stylish, and confident on stage.
            </p>
          </div>

          <div className="bento-card p-6 sm:p-8 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-luxury">Nationwide Delivery</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Based in Abuja, but we frequently perform in Lagos, Port Harcourt, Kano, and across borders. Just tell us the city, and we coordinate all troupe logistics.
            </p>
          </div>

        </div>

        {/* Big CTA Banner (Kibo UI style) */}
        <div className="mt-16 bento-card p-8 sm:p-12 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
              RESERVE AHEAD OF TIME
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-luxury">
              Ready to Lock Your Wedding or Corporate Date?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              Peak wedding and December corporate dates fill up months in advance. Check available slots and lock your date now.
            </p>
          </div>

          <button
            onClick={() => openWizardWithService()}
            className="btn-shimmer px-8 py-4 rounded-full bg-gradient-to-r from-brand-crimson via-rose-600 to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-brand-crimson/40 shrink-0 flex items-center gap-2"
          >
            <span>Open Booking Calendar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

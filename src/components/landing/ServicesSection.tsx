import React, { useState } from 'react';
import { useBooking } from '../../contexts/BookingContext';
import { 
  CORPORATE_SERVICES, 
  WEDDING_SERVICES, 
  PERFORMERS_SERVICES, 
  DANCE_TRAINING_SERVICES,
  CREATIVE_DIRECTION_OPTIONS
} from '../../data/rateCards';
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  Star, 
  Users, 
  Award, 
  Heart,
  Crown,
  Zap,
  Music,
  Compass
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { openWizardWithService } = useBooking();
  const [selectedPerformerTier, setSelectedPerformerTier] = useState<string>('perf-group');
  const [selectedTrainingTier, setSelectedTrainingTier] = useState<string>('train-package-8');

  const currentPerformer = PERFORMERS_SERVICES.find(p => p.id === selectedPerformerTier) || PERFORMERS_SERVICES[3];
  const currentTraining = DANCE_TRAINING_SERVICES.find(t => t.id === selectedTrainingTier) || DANCE_TRAINING_SERVICES[2];

  return (
    <section id="services" className="py-24 lg:py-32 bg-[#030305] relative border-t border-white/[0.08]">
      
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-brand-crimson/[0.06] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-amber-500/[0.05] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono tracking-wider text-zinc-300">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span className="uppercase font-semibold">Official Rate Structure</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-luxury tracking-tight">
            Curated Dance & Entertainment Experiences
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Every package is backed by senior choreographers, costume collections, and stage directors. No guessing. Here is the exact rate structure directly from our official documents.
          </p>
        </div>

        {/* 🌟 KIBO / COSS BENTO GRID ARCHITECTURE 🌟 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Bento Item 1: The Signature Wedding Package (Hero 8 cols) */}
          <div className="lg:col-span-8 bento-card p-6 sm:p-10 flex flex-col justify-between relative group">
            {/* Subtle background image gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-950/90 to-transparent z-10 pointer-events-none" />
            <img 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
              alt="Signature Wedding"
              className="absolute right-0 top-0 w-3/5 h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            />

            <div className="relative z-20 space-y-5 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-brand-crimson/20 border border-brand-crimson/40 text-rose-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                  ALL-INCLUSIVE WEDDING SIGNATURE
                </span>
                <span className="text-zinc-500 font-mono text-xs">/</span>
                <span className="text-amber-400 text-xs font-mono font-semibold">Most Booked for 2026/27</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-luxury">
                  Signature Wedding Dance Experience Package
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                  The complete royal wedding package. Grand couple entrance flanked by costume dancers, tailored first dance choreography, bridal train squad entry, and live event-day coordination.
                </p>
              </div>

              {/* Package inclusions checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  "Couples' Grand Entrance & Royal Dance",
                  "Bespoke Dance Performance by iDez Troupe",
                  "Bridal Train Entrance Choreography",
                  "Event-Day Coordination & Supervision"
                ].map((inc, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-zinc-200">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{inc}</span>
                  </div>
                ))}
              </div>

              {/* Price & Deposit Notice */}
              <div className="pt-4 flex flex-wrap items-baseline gap-4">
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase block">Starting Rate</span>
                  <div className="text-3xl font-extrabold text-brand-gold font-mono">₦1,500,000</div>
                </div>
                <div className="text-xs text-zinc-400 pl-4 border-l border-white/10">
                  <span className="block text-zinc-300 font-semibold">70% Deposit to Lock: <strong>₦1,050,000</strong></span>
                  <span className="block text-[11px] text-zinc-500">Remaining 30% payable before event date</span>
                </div>
              </div>
            </div>

            <div className="relative z-20 pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs text-zinc-400">Available in Abuja and nationwide.</span>
              <button
                onClick={() => openWizardWithService('wed-signature-package', 'wedding')}
                className="btn-shimmer px-6 py-3 rounded-full bg-gradient-to-r from-brand-crimson to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-crimson/30 flex items-center gap-2"
              >
                <span>Select Package</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bento Item 2: Corporate Brand & Galas (4 cols) */}
          <div className="lg:col-span-4 bento-card p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">CORPORATE EXPERIENCES</span>
                <h3 className="text-xl font-bold text-white font-luxury mt-1">
                  Brand & Gala Productions
                </h3>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                  High-profile opening acts and bespoke brand storytelling for corporate conferences, awards, and end-of-year galas.
                </p>
              </div>

              <div className="space-y-2 pt-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                  <span className="text-zinc-200">Corporate Performance</span>
                  <span className="font-mono font-bold text-white">From ₦1.5M</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                  <span className="text-zinc-200">Brand-Themed Production</span>
                  <span className="font-mono font-bold text-brand-gold">From ₦2.5M</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                  <span className="text-zinc-200">Team-Building Workshop</span>
                  <span className="font-mono font-bold text-white">From ₦500k</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08]">
              <button
                onClick={() => openWizardWithService('corp-perf-exp', 'corporate')}
                className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-brand-crimson text-white text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>Book Corporate Show</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bento Item 3: Interactive Performers Sizer (4 cols) */}
          <div className="lg:col-span-4 bento-card p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-brand-crimson/10 border border-brand-crimson/30 flex items-center justify-center text-brand-crimson">
                <Users className="w-5 h-5" />
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">PERFORMERS & TROUPES</span>
                <h3 className="text-xl font-bold text-white font-luxury mt-1">
                  Dancers & Specialty Acts
                </h3>
                <p className="text-xs text-zinc-300 mt-2">
                  Select your troupe size. From single spotlight dancers to full-scale 6+ masquerade and stilt troupes.
                </p>
              </div>

              {/* Interactive Troupe Sizer */}
              <div className="space-y-1.5 pt-1">
                {PERFORMERS_SERVICES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPerformerTier(p.id)}
                    className={`w-full p-2.5 rounded-xl text-left border text-xs transition-all flex items-center justify-between ${
                      selectedPerformerTier === p.id
                        ? 'bg-brand-crimson/20 border-brand-crimson text-white font-semibold'
                        : 'bg-white/[0.02] border-white/[0.05] text-zinc-300 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <span>{p.title}</span>
                    <span className="font-mono text-brand-gold font-bold">{p.priceFormatted}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08]">
              <button
                onClick={() => openWizardWithService(currentPerformer.id, 'performers')}
                className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-brand-crimson text-white text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>Book {currentPerformer.title.split(' ')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bento Item 4: Private Dance Training Studio (4 cols) */}
          <div className="lg:col-span-4 bento-card p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Music className="w-5 h-5" />
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">STUDIO COACHING</span>
                <h3 className="text-xl font-bold text-white font-luxury mt-1">
                  Private & Group Lessons
                </h3>
                <p className="text-xs text-zinc-300 mt-2">
                  One-on-one personal coaching or full packages in our Abuja studio for wedding couples and private clients.
                </p>
              </div>

              {/* Training package selector */}
              <div className="space-y-1.5 pt-1">
                {DANCE_TRAINING_SERVICES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTrainingTier(t.id)}
                    className={`w-full p-2.5 rounded-xl text-left border text-xs transition-all flex items-center justify-between ${
                      selectedTrainingTier === t.id
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-white font-semibold'
                        : 'bg-white/[0.02] border-white/[0.05] text-zinc-300 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <span>{t.title}</span>
                    <span className="font-mono text-emerald-300 font-bold">{t.priceFormatted}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08]">
              <button
                onClick={() => openWizardWithService(currentTraining.id, 'training')}
                className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-emerald-600 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>Book Studio Slot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bento Item 5: Creative Direction Engine (4 cols) */}
          <div className="lg:col-span-4 bento-card p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Compass className="w-5 h-5" />
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">BESPOKE DIRECTION</span>
                <h3 className="text-xl font-bold text-white font-luxury mt-1">
                  Creative Direction Tiers
                </h3>
                <p className="text-xs text-zinc-300 mt-2">
                  Final fee on custom performances is a combination of performer fee and creative direction tier.
                </p>
              </div>

              <div className="space-y-2 pt-1 text-xs">
                {CREATIVE_DIRECTION_OPTIONS.filter(cd => cd.id !== 'none').map(cd => (
                  <div key={cd.id} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>{cd.title}</span>
                      <span className="font-mono text-brand-gold">{cd.priceFormatted}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">{cd.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08]">
              <button
                onClick={() => openWizardWithService('wed-signature-package', 'wedding')}
                className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-brand-crimson text-white text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>Explore in Wizard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

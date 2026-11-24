import React from 'react';
import { useBooking } from '../../contexts/BookingContext';
import { 
  Calendar, 
  Play, 
  ShieldCheck, 
  ChevronRight, 
  Star, 
  MapPin,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onWatchReelClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onWatchReelClick }) => {
  const { openWizardWithService } = useBooking();

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-[#030305]">
      
      {/* Subtle Background Radial Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-brand-crimson/15 via-transparent to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Clean, Understated Eyebrow Badge (No pinging dots) */}
        <div className="flex justify-center lg:justify-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/[0.08] text-[11px] font-mono tracking-wider text-zinc-300">
            <span className="text-amber-400 font-semibold uppercase">iDez Entertainment</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400">Abuja &bull; Official Rates & Calendar</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mt-6">
          
          {/* Left Hero Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Grand Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[58px] font-extrabold text-white tracking-tight leading-[1.08] font-luxury">
              Where Nigerian Royalty Meets{' '}
              <span className="crimson-text-gradient block sm:inline">
                Unforgettable Stage Spectacle.
              </span>
            </h1>

            {/* Clear, Honest Subtitle */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              We do not just bring dancers. We choreograph grand wedding entrances, produce show-stopping corporate brand spectacles, and teach couples to shine effortlessly. Strict <strong>70% deposit</strong> locks your date with zero double-booking.
            </p>

            {/* Clean Trust Highlights (No flashing dots) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs text-zinc-300 pt-1">
              <div className="flex items-center gap-1.5 bg-zinc-900/60 px-3 py-1.5 rounded-full border border-white/[0.06]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Strict 70% Date Lock</span>
              </div>
              <div className="flex items-center gap-1.5 bg-zinc-900/60 px-3 py-1.5 rounded-full border border-white/[0.06]">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Zero Double-Booking</span>
              </div>
              <div className="flex items-center gap-1.5 bg-zinc-900/60 px-3 py-1.5 rounded-full border border-white/[0.06]">
                <MapPin className="w-3.5 h-3.5 text-brand-crimson" />
                <span>Abuja &bull; Nationwide Tour</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={() => openWizardWithService()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-brand-crimson hover:bg-rose-600 text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-brand-crimson/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Your Date Ahead</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onWatchReelClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-medium text-xs tracking-wide border border-white/[0.08] hover:border-white/20 transition-all flex items-center justify-center gap-2.5"
              >
                <Play className="w-3.5 h-3.5 fill-current text-brand-crimson" />
                <span>Watch Video Showcase</span>
              </button>
            </div>

            {/* Rate Card Quick Peek */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/[0.06] max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">Wedding Packages</span>
                <span className="text-sm font-bold text-white font-mono">From ₦300,000</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">Corporate Galas</span>
                <span className="text-sm font-bold text-amber-400 font-mono">From ₦1.5M</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">Private Coaching</span>
                <span className="text-sm font-bold text-white font-mono">₦50,000 / hr</span>
              </div>
            </div>

          </div>

          {/* Right Hero Video Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl">
              
              {/* Media Container */}
              <div className="relative aspect-[4/5] bg-black overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
                  alt="iDez Entertainment Royal Entrance Performance"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

                {/* Top Clean Badge (No pinging dots) */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white text-[10px] font-mono font-medium tracking-wider">
                    WEDDING RECEPTION ENTRANCE
                  </div>

                  <div className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-zinc-300 font-mono">
                    4K REEL
                  </div>
                </div>

                {/* Center Play Trigger */}
                <button
                  onClick={onWatchReelClick}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-brand-crimson/90 hover:bg-brand-crimson text-white flex items-center justify-center shadow-xl shadow-brand-crimson/50 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  title="Play highlight video"
                >
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </button>

                {/* Bottom Card Copy */}
                <div className="absolute bottom-5 left-5 right-5 space-y-1">
                  <h3 className="text-lg font-bold text-white font-luxury leading-tight">
                    The Grand Abuja Ballroom Experience
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-2">
                    Flanked by royal costume dancers, bespoke entrance choreography, and audience hype.
                  </p>
                </div>

              </div>

              {/* Bottom Card Action Bar */}
              <div className="p-4 bg-zinc-950 border-t border-white/[0.08] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-zinc-500 block font-mono uppercase font-bold">Package Starting Rate</span>
                  <strong className="text-base font-bold text-amber-400 font-mono">₦1,500,000</strong>
                </div>

                <button
                  onClick={() => openWizardWithService('wed-signature-package', 'wedding')}
                  className="px-4 py-2 rounded-full bg-white/[0.06] hover:bg-brand-crimson text-white text-xs font-semibold transition-all flex items-center gap-1.5"
                >
                  <span>Book This Style</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

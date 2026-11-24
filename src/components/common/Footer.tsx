import React from 'react';
import { Phone, Mail, MapPin, Instagram, Youtube, Heart, ShieldCheck } from 'lucide-react';
import { TERMS_AND_CONDITIONS } from '../../data/rateCards';

interface FooterProps {
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerms }) => {
  return (
    <footer className="bg-brand-darker border-t border-white/10 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-brand-crimson flex items-center justify-center font-bold text-white">
                <span>iDez</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                iDez <span className="text-brand-crimson font-light">Entertainment</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Luxury dance and entertainment company in Abuja, Nigeria. Creating unforgettable visual spectacles through movement, costume, culture, creativity, and audience engagement.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-slate-400">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:text-brand-crimson hover:bg-white/10 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:text-brand-crimson hover:bg-white/10 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Rate Card Pillars */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Our Experiences</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">Corporate Performance (From ₦1.5M)</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Brand-Themed Production (From ₦2.5M)</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Signature Wedding Package (From ₦1.5M)</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Couple's First Dance (From ₦300k)</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Troupe & Carnival Performers (From ₦1M)</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Private Dance Coaching (From ₦50k/hr)</a></li>
            </ul>
          </div>

          {/* Official Terms Summary */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-brand-gold">
              <ShieldCheck className="w-4 h-4" />
              <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Official Terms</h4>
            </div>
            <div className="space-y-2 text-xs text-slate-400 bg-white/5 p-3 rounded-lg border border-white/5">
              <p><strong className="text-slate-200">Deposit:</strong> 70% non-refundable deposit locks the date.</p>
              <p><strong className="text-slate-200">Balance:</strong> Payable before event day.</p>
              <p><strong className="text-slate-200">Outside Abuja:</strong> Travel & accommodation billed separately.</p>
              <p><strong className="text-slate-200">Within 7 Days:</strong> 20%–50% rush delivery fee applies.</p>
              <button 
                onClick={onOpenTerms}
                className="text-brand-crimson hover:underline font-medium block pt-1"
              >
                Read full terms & conditions &rarr;
              </button>
            </div>
          </div>

          {/* Contact in Abuja */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Studio & Bookings</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-crimson shrink-0 mt-0.5" />
                <span>Abuja, Federal Capital Territory, Nigeria</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-crimson shrink-0" />
                <span>+234 (0) 803 000 0000 / Book Online</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-crimson shrink-0" />
                <span>bookings@idez-entertainment.com</span>
              </li>
            </ul>
            <div className="pt-2">
              <span className="inline-block px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
                Calendar Slots Open for 2026/2027
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>&copy; {new Date().getFullYear()} iDez Entertainment. All rights reserved. Strictly adhering to official rate cards.</p>
          <div className="flex items-center space-x-4">
            <button onClick={onOpenTerms} className="hover:text-white transition-colors">Terms & Policy</button>
            <span>&bull;</span>
            <span className="flex items-center gap-1 text-slate-400">
              Made with <Heart className="w-3.5 h-3.5 text-brand-crimson fill-brand-crimson inline" /> in Abuja
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

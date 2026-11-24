import React from 'react';
import { Sparkles, ShieldCheck, Star } from 'lucide-react';

export const MarqueeBanner: React.FC = () => {
  const items = [
    { text: "SIGNATURE WEDDING DANCE PACKAGE (₦1,500,000)", highlight: true },
    { text: "STRICT 70% DEPOSIT DATE LOCK GUARANTEE", highlight: false },
    { text: "CORPORATE PERFORMANCE EXPERIENCE (FROM ₦1,500,000)", highlight: true },
    { text: "COUPLE'S FIRST DANCE CHOREOGRAPHY (₦300,000)", highlight: false },
    { text: "BRAND-THEMED BESPOKE PRODUCTIONS (FROM ₦2,500,000)", highlight: true },
    { text: "ABUJA BASE & NATIONWIDE TOUR LOGISTICS", highlight: false },
    { text: "PRIVATE 1-ON-1 COACHING (FROM ₦50,000/HR)", highlight: true },
    { text: "CREATIVE DIRECTION LITE (₦350K) & FULL (₦500K)", highlight: false },
    { text: "CARNIVAL MASQUERADES & TROUPE 6+ (FROM ₦1,000,000)", highlight: true },
  ];

  return (
    <div className="relative w-full overflow-hidden py-3 bg-zinc-950/80 border-y border-white/[0.08] backdrop-blur-md">
      {/* Subtle fade edges */}
      <div className="pointer-events-none absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#030305] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#030305] to-transparent z-10" />

      <div className="flex w-max animate-marquee space-x-8 select-none">
        {/* Double array for seamless loop */}
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center space-x-3 text-xs tracking-widest font-mono uppercase whitespace-nowrap">
            <span className="text-brand-crimson">✦</span>
            <span className={item.highlight ? "font-bold text-white tracking-wider" : "text-zinc-400 font-medium"}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

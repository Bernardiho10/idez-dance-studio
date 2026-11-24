import React, { useState } from 'react';
import { VIDEO_SHOWCASE_ITEMS } from '../../data/rateCards';
import { VideoShowcaseItem, ServiceCategory } from '../../types';
import { useBooking } from '../../contexts/BookingContext';
import { 
  Play, 
  X, 
  Calendar, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Film, 
  Volume2, 
  Share2, 
  ArrowRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const VideoShowcase: React.FC = () => {
  const { openWizardWithService } = useBooking();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<VideoShowcaseItem | null>(null);

  const filteredVideos = selectedCategory === 'all'
    ? VIDEO_SHOWCASE_ITEMS
    : VIDEO_SHOWCASE_ITEMS.filter((v) => v.category === selectedCategory);

  return (
    <section id="videos" className="py-24 lg:py-32 bg-[#08080d] relative border-t border-white/[0.08] overflow-hidden">
      
      {/* Decorative Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-crimson/[0.08] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono tracking-wider text-zinc-300">
            <Film className="w-3.5 h-3.5 text-brand-crimson" />
            <span className="uppercase font-semibold">Performance Footage</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-luxury tracking-tight">
            Cinematic Performance Reels
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Pictures capture moments, but dance is life in motion. Watch real footage from ballroom receptions, brand activations, and private training sessions in Abuja. When you find the vibe you love, click &ldquo;Book This Style&rdquo; to lock down your date.
          </p>
        </div>

        {/* Category Filter Capsule */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-10">
          {[
            { id: 'all', label: 'All Performances' },
            { id: 'wedding', label: 'Wedding Entrances & First Dance' },
            { id: 'corporate', label: 'Corporate Galas & Brands' },
            { id: 'performers', label: 'Carnival & Stilt Walkers' },
            { id: 'training', label: 'Studio Rehearsals' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-brand-crimson to-rose-600 text-white shadow-lg shadow-brand-crimson/30 scale-105 border border-white/20'
                  : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white border border-white/[0.06]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Video Reel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {filteredVideos.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="glass-luxury-card rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between group shadow-xl hover:border-brand-crimson/50"
            >
              {/* Media Container */}
              <div 
                className="relative aspect-video overflow-hidden bg-black cursor-pointer"
                onClick={() => setActiveVideo(item)}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90"
                />
                
                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-80 transition-opacity" />

                {/* Duration Tag */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-white text-[10px] font-mono font-bold flex items-center gap-1 border border-white/10">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{item.duration}</span>
                </div>

                {/* 4K Resolution Badge */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-brand-crimson/90 text-white text-[9px] font-extrabold uppercase tracking-wider">
                  4K Footage
                </div>

                {/* Center Glowing Play Icon */}
                <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-brand-crimson/90 group-hover:bg-brand-crimson text-white flex items-center justify-center shadow-xl shadow-brand-crimson/50 group-hover:scale-110 transition-all">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              </div>

              {/* Video Info Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold text-brand-gold uppercase tracking-widest block">
                    {item.category.toUpperCase()} SHOWCASE
                  </span>
                  
                  <h3 className="text-lg font-bold text-white font-luxury group-hover:text-rose-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="pt-3 border-t border-white/[0.06] space-y-1.5">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="text-[11px] text-slate-400 flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveVideo(item)}
                    className="flex-1 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-white border border-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Watch Reel
                  </button>

                  <button
                    onClick={() => openWizardWithService(undefined, item.category === 'all' ? 'wedding' : item.category as ServiceCategory)}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-brand-crimson to-rose-600 hover:from-rose-600 hover:to-brand-crimson text-xs font-bold text-white shadow-md shadow-brand-crimson/25 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" /> Book This
                  </button>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Full Cinema Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-fadeIn">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-4xl glass-luxury-card rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col"
            >
              
              {/* Modal Top Bar */}
              <div className="px-6 py-4 bg-white/[0.04] border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-luxury">{activeVideo.title}</h3>
                  <span className="text-[11px] font-semibold text-brand-gold uppercase tracking-wider">
                    iDez Entertainment Official Footage &bull; Abuja
                  </span>
                </div>
                
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Theater Video Player Box */}
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Modal Bottom Bar */}
              <div className="p-6 bg-brand-card/90 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                <div className="text-xs text-slate-300 max-w-md">
                  <p><strong>Highlights:</strong> {activeVideo.highlights.join(' • ')}</p>
                  <p className="text-slate-400 mt-1">Want to recreate this exact spectacle for your event?</p>
                </div>

                <button
                  onClick={() => {
                    const cat = activeVideo.category === 'all' ? 'wedding' : activeVideo.category as ServiceCategory;
                    setActiveVideo(null);
                    openWizardWithService(undefined, cat);
                  }}
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-brand-crimson to-rose-600 hover:from-rose-600 hover:to-brand-crimson text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-crimson/40 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Lock In This Experience
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

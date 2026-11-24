import React, { useState } from 'react';
import { PHOTO_GALLERY_ITEMS } from '../../data/rateCards';
import { PhotoGalleryItem, ServiceCategory } from '../../types';
import { useBooking } from '../../contexts/BookingContext';
import { Sparkles, Maximize2, X, Calendar, Camera, MapPin, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PhotoGallery: React.FC = () => {
  const { openWizardWithService } = useBooking();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<PhotoGalleryItem | null>(null);

  const filteredPhotos = selectedCategory === 'all'
    ? PHOTO_GALLERY_ITEMS
    : PHOTO_GALLERY_ITEMS.filter((p) => p.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-[#050508] relative border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono tracking-wider text-zinc-300">
              <Camera className="w-3.5 h-3.5 text-brand-crimson" />
              <span className="uppercase font-semibold">Photo Archive</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-luxury tracking-tight">
              Capturing Every Electric Second
            </h2>

            <p className="text-zinc-300 text-sm max-w-xl">
              From colorful carnival dancers to royal wedding ballrooms and corporate stages in Abuja. High-resolution imagery of what you can expect on your big day.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'wedding', label: 'Weddings' },
              { id: 'corporate', label: 'Corporate' },
              { id: 'performers', label: 'Performers & Cultural' },
              { id: 'training', label: 'Studio' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedCategory(f.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  selectedCategory === f.id
                    ? 'bg-gradient-to-r from-brand-crimson to-rose-600 text-white shadow-lg shadow-brand-crimson/25 scale-105'
                    : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((item) => (
            <motion.div
              layout
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="bento-card relative aspect-[4/3] cursor-pointer group shadow-xl"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
              />
              
              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* View Trigger Chip */}
              <div className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 shadow-lg">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Location Tag */}
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-zinc-300 border border-white/10 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-brand-crimson" />
                <span>Abuja Stage</span>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-5 left-5 right-5 space-y-1.5">
                <span className="text-[9px] uppercase font-mono font-bold text-amber-400 tracking-widest block">
                  {item.category}
                </span>

                <h4 className="text-base font-bold text-white font-luxury leading-tight group-hover:text-rose-200 transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs text-zinc-300 line-clamp-1">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gallery Footer Note */}
        <div className="mt-10 p-5 rounded-2xl bg-zinc-950/60 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Regularly updated with new live performance footage from Abuja, Lagos, and beyond.</span>
          </div>

          <button 
            onClick={() => openWizardWithService()}
            className="text-brand-crimson hover:underline font-bold font-mono uppercase tracking-wider flex items-center gap-1"
          >
            <span>Lock down your event date</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-fadeIn">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full glass-luxury-card rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/70 text-white hover:bg-black transition-colors border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative aspect-[16/10] bg-black">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 bg-zinc-950/95 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-brand-gold tracking-widest">
                    {activePhoto.category} SHOWCASE
                  </span>
                  <h3 className="text-lg font-bold text-white font-luxury">{activePhoto.title}</h3>
                  <p className="text-xs text-zinc-300 mt-1">{activePhoto.caption}</p>
                </div>

                <button
                  onClick={() => {
                    const cat = activePhoto.category;
                    setActivePhoto(null);
                    openWizardWithService(undefined, cat);
                  }}
                  className="btn-shimmer px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-crimson to-rose-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-crimson/30 flex items-center gap-2 shrink-0"
                >
                  <Calendar className="w-3.5 h-3.5" /> Book This Style
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

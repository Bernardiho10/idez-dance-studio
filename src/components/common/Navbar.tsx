import React, { useState, useEffect } from 'react';
import { useBooking } from '../../contexts/BookingContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Bell, 
  Calendar, 
  User, 
  Shield, 
  Menu, 
  X, 
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenTerms: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerms }) => {
  const { openWizardWithService } = useBooking();
  const { unreadCount, setIsDrawerOpen } = useNotifications();
  const { role, setIsPortalOpen, setIsAdminDashboardOpen, loginAsAdmin } = useAuth();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'What We Offer', href: '#services' },
    { name: 'Videos', href: '#videos' },
    { name: 'Photo Gallery', href: '#gallery' },
    { name: 'Rate Cards', href: '#rates' },
  ];

  return (
    <header className="sticky top-3 z-50 w-full px-4 sm:px-8 transition-all duration-300">
      <div className={`max-w-6xl mx-auto rounded-full px-5 sm:px-7 py-3 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#09090d]/90 backdrop-blur-xl border border-white/[0.12] shadow-2xl shadow-black/80' 
          : 'bg-[#0c0c12]/75 backdrop-blur-lg border border-white/[0.08]'
      }`}>
        <div className="flex items-center justify-between">
          
          {/* Clean, Refined Brand Logo */}
          <a href="#" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded-full bg-brand-crimson flex items-center justify-center font-bold text-white shadow-md shadow-brand-crimson/25 group-hover:scale-105 transition-transform">
              <span className="font-luxury text-xs tracking-tight">iD</span>
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-luxury text-base font-bold text-white tracking-wide">
                iDez
              </span>
              <span className="text-xs font-light text-zinc-400 tracking-wider">
                Entertainment
              </span>
            </div>
          </a>

          {/* Clean, Quiet Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-zinc-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}

            <button
              onClick={onOpenTerms}
              className="text-zinc-400 hover:text-amber-300 transition-colors"
            >
              Deposit & T&C
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-3">
            
            {/* In-App Notifications Bell */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 bg-brand-crimson text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Client Portal Button */}
            <button
              onClick={() => setIsPortalOpen(true)}
              className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all"
            >
              <User className="w-3.5 h-3.5 text-zinc-400" />
              <span>My Bookings</span>
            </button>

            {/* Admin Console Switcher */}
            <button
              onClick={() => {
                if (role !== 'admin') loginAsAdmin();
                setIsAdminDashboardOpen(true);
              }}
              className="hidden lg:flex p-1.5 rounded-full text-zinc-500 hover:text-zinc-300 transition-colors"
              title="Studio Staff Admin"
            >
              <Shield className="w-3.5 h-3.5" />
            </button>

            {/* Stylish, Clean Book Online Button */}
            <button
              onClick={() => openWizardWithService()}
              className="px-5 py-2 rounded-full bg-brand-crimson hover:bg-rose-600 text-white text-xs font-semibold tracking-wide shadow-md shadow-brand-crimson/25 hover:shadow-brand-crimson/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Online</span>
            </button>

            {/* Mobile menu trigger */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden mt-2 max-w-6xl mx-auto rounded-2xl bg-[#0c0c12]/95 backdrop-blur-xl border border-white/10 p-5 space-y-4 shadow-2xl"
          >
            <div className="space-y-1 pb-3 border-b border-white/[0.08]">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 text-sm text-zinc-200 hover:text-white"
                >
                  <span>{item.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                </a>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerms();
                }}
                className="block w-full text-left py-2 text-xs text-amber-300 font-medium"
              >
                Official Deposit & T&C Policy &rarr;
              </button>
            </div>

            <div className="pt-1 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsPortalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-center text-xs font-semibold text-zinc-200"
              >
                My Bookings & Receipts
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWizardWithService();
                }}
                className="w-full py-3 rounded-xl bg-brand-crimson text-center text-xs font-semibold text-white shadow-lg shadow-brand-crimson/30"
              >
                Book a Date Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

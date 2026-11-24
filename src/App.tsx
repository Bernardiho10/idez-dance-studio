import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { Navbar } from './components/common/Navbar';
import { MarqueeBanner } from './components/common/MarqueeBanner';
import { Footer } from './components/common/Footer';
import { TermsModal } from './components/common/TermsModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { HeroSection } from './components/landing/HeroSection';
import { VideoShowcase } from './components/landing/VideoShowcase';
import { PhotoGallery } from './components/landing/PhotoGallery';
import { ServicesSection } from './components/landing/ServicesSection';
import { RateCardsSection } from './components/landing/RateCardsSection';
import { WhyUsSection } from './components/landing/WhyUsSection';
import { BookingWizard } from './components/booking/BookingWizard';
import { ClientPortalModal } from './components/portal/ClientPortalModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';

export const AppContent: React.FC = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const scrollToVideos = () => {
    const el = document.getElementById('videos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030305] text-slate-100 flex flex-col font-sans selection:bg-brand-crimson selection:text-white">
      {/* Top Navigation */}
      <Navbar onOpenTerms={() => setIsTermsOpen(true)} />

      {/* Main Page Content */}
      <main className="flex-1">
        <HeroSection onWatchReelClick={scrollToVideos} />
        <MarqueeBanner />
        <VideoShowcase />
        <PhotoGallery />
        <ServicesSection />
        <RateCardsSection />
        <WhyUsSection />
      </main>

      {/* Footer */}
      <Footer onOpenTerms={() => setIsTermsOpen(true)} />

      {/* Floating Modals & Drawers */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <NotificationDrawer />
      <BookingWizard />
      <ClientPortalModal />
      <AdminDashboardModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BookingProvider>
          <AppContent />
        </BookingProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;

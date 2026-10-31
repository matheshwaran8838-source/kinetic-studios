import React, { useState, useEffect } from 'react';
import { WebsiteProvider, useWebsite } from './context/WebsiteContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CustomCursor } from './components/public/CustomCursor';
import { LoadingScreen } from './components/public/LoadingScreen';
import { Navbar } from './components/public/Navbar';
import { HeroSection } from './components/public/HeroSection';
import { StatsCounter } from './components/public/StatsCounter';
import { ServicesSection } from './components/public/ServicesSection';
import { PortfolioSection } from './components/public/PortfolioSection';
import { InteractiveEstimateCalculator } from './components/public/InteractiveEstimateCalculator';
import { AboutSection } from './components/public/AboutSection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';

// Admin Components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout, AdminTab } from './components/admin/AdminLayout';
import { AdminOverview } from './components/admin/AdminOverview';
import { WebsiteManagement } from './components/admin/WebsiteManagement';
import { ServicesManagement } from './components/admin/ServicesManagement';
import { PortfolioManagement } from './components/admin/PortfolioManagement';
import { InquiriesManagement } from './components/admin/InquiriesManagement';
import { AnalyticsView } from './components/admin/AnalyticsView';
import { AnimationSettingsView } from './components/admin/AnimationSettingsView';
import { AdminSettingsView } from './components/admin/AdminSettingsView';

const KineticMainApp: React.FC = () => {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { settings } = useWebsite();

  const [isAdminView, setIsAdminView] = useState(false);
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Check URL hash for direct navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.startsWith('#admin')) {
        setIsAdminView(true);
        if (hash === '#admin-services') setAdminTab('services');
        else if (hash === '#admin-portfolio') setAdminTab('portfolio');
        else if (hash === '#admin-inquiries') setAdminTab('inquiries');
        else if (hash === '#admin-website') setAdminTab('website');
        else if (hash === '#admin-analytics') setAdminTab('analytics');
        else if (hash === '#admin-animations') setAdminTab('animations');
        else if (hash === '#admin-settings') setAdminTab('admin-settings');
      } else {
        setIsAdminView(false);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenAdmin = () => {
    window.location.hash = '#admin';
    setIsAdminView(true);
  };

  const handleReturnToSite = () => {
    window.location.hash = '';
    setIsAdminView(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#8B5CF6] selection:text-white">
      {/* Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Cinematic Intro Loading Screen (Only on initial public site visit) */}
      {!loadingComplete && !isAdminView && (
        <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      )}

      {/* VIEW SWITCHER: ADMIN PANEL vs PUBLIC WEBSITE */}
      {isAdminView ? (
        // Admin Flow
        isAuthLoading ? (
          <div className="min-h-screen bg-[#080808] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#8B5CF6] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !isAuthenticated ? (
          <AdminLogin onBackToSite={handleReturnToSite} />
        ) : (
          <AdminLayout
            currentTab={adminTab}
            onTabChange={tab => {
              setAdminTab(tab);
              window.location.hash = `#admin-${tab}`;
            }}
            onViewPublicSite={handleReturnToSite}
          >
            {adminTab === 'dashboard' && <AdminOverview onNavigateTab={tab => setAdminTab(tab)} />}
            {adminTab === 'website' && <WebsiteManagement />}
            {adminTab === 'services' && <ServicesManagement />}
            {adminTab === 'portfolio' && <PortfolioManagement />}
            {adminTab === 'inquiries' && <InquiriesManagement />}
            {adminTab === 'analytics' && <AnalyticsView />}
            {adminTab === 'animations' && <AnimationSettingsView />}
            {adminTab === 'admin-settings' && <AdminSettingsView />}
          </AdminLayout>
        )
      ) : (
        // World-Class Public Creative Agency Website
        <div className="relative overflow-x-hidden">
          {/* Subtle noise grain texture overlay */}
          <div className="fixed inset-0 noise-bg pointer-events-none z-30 opacity-40" />

          {/* Navigation Bar */}
          <Navbar onOpenAdmin={handleOpenAdmin} />

          {/* Main Sections */}
          <main>
            <HeroSection />
            <StatsCounter />
            <ServicesSection />
            <PortfolioSection />
            <InteractiveEstimateCalculator />
            <AboutSection />
            <TestimonialsSection />
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer onOpenAdmin={handleOpenAdmin} />
        </div>
      )}
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <WebsiteProvider>
        <KineticMainApp />
      </WebsiteProvider>
    </AuthProvider>
  );
}

export default App;

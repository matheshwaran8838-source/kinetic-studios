import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { WebsiteSettings, ServiceItem, PortfolioProject, ContactInquiry } from '../types/database';
import {
  getWebsiteSettings,
  getServices,
  getPortfolioProjects,
  getInquiries,
  getAnalyticsStats,
  incrementVisitorCount,
  recordAnalyticsEvent
} from '../lib/database-service';
import { INITIAL_SETTINGS } from '../lib/seed-data';

interface WebsiteContextType {
  settings: WebsiteSettings;
  services: ServiceItem[];
  projects: PortfolioProject[];
  inquiries: ContactInquiry[];
  stats: any;
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export const WebsiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<WebsiteSettings>(INITIAL_SETTINGS);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [stats, setStats] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  const loadAll = useCallback(async () => {
    try {
      const [fetchedSettings, fetchedServices, fetchedProjects, fetchedInquiries, fetchedStats] =
        await Promise.all([
          getWebsiteSettings(),
          getServices(),
          getPortfolioProjects(),
          getInquiries(),
          getAnalyticsStats(),
        ]);

      setSettings(fetchedSettings);
      setServices(fetchedServices);
      setProjects(fetchedProjects);
      setInquiries(fetchedInquiries);
      setStats(fetchedStats);

      // Apply dynamic colors to document
      if (fetchedSettings.bg_color) {
        document.documentElement.style.setProperty('--bg-color', fetchedSettings.bg_color);
      }
      if (fetchedSettings.accent_color) {
        document.documentElement.style.setProperty('--accent-color', fetchedSettings.accent_color);
      }
      if (fetchedSettings.animation_speed) {
        document.documentElement.style.setProperty('--animation-speed-mult', String(fetchedSettings.animation_speed));
      }
      if (fetchedSettings.seo_title) {
        document.title = fetchedSettings.seo_title;
      }
    } catch (e) {
      console.error('Error fetching website data:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
    incrementVisitorCount();
    recordAnalyticsEvent({
      event_type: 'page_view',
      path: window.location.pathname || '/',
      referrer: document.referrer || 'direct',
    });

    const handleUpdate = () => {
      loadAll();
    };

    window.addEventListener('kinetic_database_update', handleUpdate);
    return () => {
      window.removeEventListener('kinetic_database_update', handleUpdate);
    };
  }, [loadAll]);

  return (
    <WebsiteContext.Provider
      value={{
        settings,
        services,
        projects,
        inquiries,
        stats,
        isLoading,
        refreshData: loadAll,
      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
};

export const useWebsite = () => {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error('useWebsite must be used within a WebsiteProvider');
  }
  return context;
};

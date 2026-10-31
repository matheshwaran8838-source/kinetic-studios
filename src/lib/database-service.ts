import {
  WebsiteSettings,
  ServiceItem,
  PortfolioProject,
  ContactInquiry,
  AnalyticsEvent,
  AdminProfile
} from '../types/database';
import {
  INITIAL_SETTINGS,
  INITIAL_SERVICES,
  INITIAL_PROJECTS,
  INITIAL_INQUIRIES,
  INITIAL_ADMIN_PROFILES
} from './seed-data';
import { getSupabaseClient } from './supabase';

const STORAGE_KEYS = {
  SETTINGS: 'kinetic_db_settings',
  SERVICES: 'kinetic_db_services',
  PROJECTS: 'kinetic_db_projects',
  INQUIRIES: 'kinetic_db_inquiries',
  ANALYTICS: 'kinetic_db_analytics',
  ADMINS: 'kinetic_db_admins',
  VISITOR_COUNT: 'kinetic_db_visitor_count',
};

// Dispatch custom event to let components re-render immediately across the app
export const notifyDatabaseUpdate = (table: string) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('kinetic_database_update', { detail: { table } }));
  }
};

// --- INITIALIZATION ---
export const initializeLocalStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(INITIAL_SERVICES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ADMINS)) {
    localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(INITIAL_ADMIN_PROFILES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.VISITOR_COUNT)) {
    localStorage.setItem(STORAGE_KEYS.VISITOR_COUNT, '18492');
  }
};

// --- WEBSITE SETTINGS ---
export const getWebsiteSettings = async (): Promise<WebsiteSettings> => {
  initializeLocalStorage();
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('*')
        .limit(1)
        .single();

      if (!error && data) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data));
        return data as WebsiteSettings;
      }
    } catch (e) {
      console.warn('Supabase fetch failed, falling back to local store', e);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  return stored ? JSON.parse(stored) : INITIAL_SETTINGS;
};

export const updateWebsiteSettings = async (settings: Partial<WebsiteSettings>): Promise<WebsiteSettings> => {
  const current = await getWebsiteSettings();
  const updated: WebsiteSettings = {
    ...current,
    ...settings,
    updated_at: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase
        .from('website_settings')
        .upsert(updated, { onConflict: 'id' });
    } catch (e) {
      console.warn('Supabase upsert error:', e);
    }
  }

  // Update dynamic CSS variables if colors changed
  if (updated.bg_color) {
    document.documentElement.style.setProperty('--bg-color', updated.bg_color);
  }
  if (updated.accent_color) {
    document.documentElement.style.setProperty('--accent-color', updated.accent_color);
  }
  if (updated.animation_speed) {
    document.documentElement.style.setProperty('--animation-speed-mult', String(updated.animation_speed));
  }

  notifyDatabaseUpdate('settings');
  return updated;
};

// --- SERVICES ---
export const getServices = async (): Promise<ServiceItem[]> => {
  initializeLocalStorage();
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true });

      if (!error && data && data.length > 0) {
        localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(data));
        return data as ServiceItem[];
      }
    } catch (e) {
      console.warn('Supabase services fetch error:', e);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEYS.SERVICES);
  return stored ? JSON.parse(stored) : INITIAL_SERVICES;
};

export const saveService = async (service: Partial<ServiceItem> & { title: string }): Promise<ServiceItem> => {
  const services = await getServices();
  let updatedList: ServiceItem[] = [];
  let savedItem: ServiceItem;

  if (service.id) {
    // update
    updatedList = services.map(s => {
      if (s.id === service.id) {
        savedItem = { ...s, ...service } as ServiceItem;
        return savedItem;
      }
      return s;
    });
  } else {
    // create
    savedItem = {
      id: `srv-${Date.now()}`,
      slug: service.slug || service.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      title: service.title,
      short_description: service.short_description || '',
      full_description: service.full_description || '',
      icon_name: service.icon_name || 'Globe',
      image_url: service.image_url || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      starting_price: service.starting_price || '$3,000',
      features: service.features || ['Custom Creative Direction', 'Lighthouse 95+ Performance'],
      is_active: service.is_active ?? true,
      order_index: service.order_index ?? (services.length + 1),
      created_at: new Date().toISOString(),
    };
    updatedList = [savedItem, ...services];
  }

  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updatedList));

  const supabase = getSupabaseClient();
  if (supabase && savedItem!) {
    try {
      await supabase.from('services').upsert(savedItem, { onConflict: 'id' });
    } catch (e) {
      console.warn('Supabase service save error:', e);
    }
  }

  notifyDatabaseUpdate('services');
  return savedItem!;
};

export const deleteService = async (id: string): Promise<boolean> => {
  const services = await getServices();
  const filtered = services.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(filtered));

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from('services').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase service delete error:', e);
    }
  }

  notifyDatabaseUpdate('services');
  return true;
};

// --- PORTFOLIO PROJECTS ---
export const getPortfolioProjects = async (): Promise<PortfolioProject[]> => {
  initializeLocalStorage();
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (!error && data && data.length > 0) {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(data));
        return data as PortfolioProject[];
      }
    } catch (e) {
      console.warn('Supabase projects fetch error:', e);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  return stored ? JSON.parse(stored) : INITIAL_PROJECTS;
};

export const savePortfolioProject = async (project: Partial<PortfolioProject> & { title: string }): Promise<PortfolioProject> => {
  const projects = await getPortfolioProjects();
  let updatedList: PortfolioProject[] = [];
  let savedItem: PortfolioProject;

  if (project.id) {
    updatedList = projects.map(p => {
      if (p.id === project.id) {
        savedItem = { ...p, ...project } as PortfolioProject;
        return savedItem;
      }
      return p;
    });
  } else {
    savedItem = {
      id: `proj-${Date.now()}`,
      title: project.title,
      client_name: project.client_name || 'Innovate Studio',
      category: project.category || 'Web Application',
      description: project.description || '',
      image_url: project.image_url || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      project_url: project.project_url || '#',
      tags: project.tags || ['React', 'Next.js', 'Tailwind'],
      is_featured: project.is_featured ?? false,
      status: project.status || 'completed',
      metrics: project.metrics || 'Awwwards Honoree',
      order_index: project.order_index ?? (projects.length + 1),
      created_at: new Date().toISOString(),
    };
    updatedList = [savedItem, ...projects];
  }

  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updatedList));

  const supabase = getSupabaseClient();
  if (supabase && savedItem!) {
    try {
      await supabase.from('portfolio_projects').upsert(savedItem, { onConflict: 'id' });
    } catch (e) {
      console.warn('Supabase project save error:', e);
    }
  }

  notifyDatabaseUpdate('portfolio');
  return savedItem!;
};

export const deletePortfolioProject = async (id: string): Promise<boolean> => {
  const projects = await getPortfolioProjects();
  const filtered = projects.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(filtered));

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from('portfolio_projects').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase project delete error:', e);
    }
  }

  notifyDatabaseUpdate('portfolio');
  return true;
};

// --- CONTACT INQUIRIES ---
export const getInquiries = async (): Promise<ContactInquiry[]> => {
  initializeLocalStorage();
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(data));
        return data as ContactInquiry[];
      }
    } catch (e) {
      console.warn('Supabase inquiries fetch error:', e);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
  return stored ? JSON.parse(stored) : INITIAL_INQUIRIES;
};

export const submitInquiry = async (inquiryData: Omit<ContactInquiry, 'id' | 'created_at' | 'status'>): Promise<ContactInquiry> => {
  const newInquiry: ContactInquiry = {
    ...inquiryData,
    id: `inq-${Date.now()}`,
    status: 'pending',
    created_at: new Date().toISOString(),
  };

  const inquiries = await getInquiries();
  const updatedList = [newInquiry, ...inquiries];
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updatedList));

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from('contact_inquiries').insert([newInquiry]);
    } catch (e) {
      console.warn('Supabase submit inquiry error:', e);
    }
  }

  // Also log inquiry analytics event
  recordAnalyticsEvent({
    event_type: 'inquiry_submit',
    path: '/contact',
    referrer: document.referrer || 'direct',
  });

  notifyDatabaseUpdate('inquiries');
  return newInquiry;
};

export const updateInquiryStatus = async (id: string, status: ContactInquiry['status'], notes?: string): Promise<boolean> => {
  const inquiries = await getInquiries();
  const updatedList = inquiries.map(item => {
    if (item.id === id) {
      return {
        ...item,
        status,
        ...(notes !== undefined ? { notes } : {}),
      };
    }
    return item;
  });

  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updatedList));

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const updatePayload: any = { status };
      if (notes !== undefined) updatePayload.notes = notes;
      await supabase.from('contact_inquiries').update(updatePayload).eq('id', id);
    } catch (e) {
      console.warn('Supabase update inquiry status error:', e);
    }
  }

  notifyDatabaseUpdate('inquiries');
  return true;
};

export const deleteInquiry = async (id: string): Promise<boolean> => {
  const inquiries = await getInquiries();
  const filtered = inquiries.filter(i => i.id !== id);
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(filtered));

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from('contact_inquiries').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase inquiry delete error:', e);
    }
  }

  notifyDatabaseUpdate('inquiries');
  return true;
};

// --- ANALYTICS ---
export const getAnalyticsStats = async () => {
  initializeLocalStorage();
  const inquiries = await getInquiries();
  const projects = await getPortfolioProjects();
  const services = await getServices();

  const storedCount = localStorage.getItem(STORAGE_KEYS.VISITOR_COUNT);
  const totalVisitors = storedCount ? parseInt(storedCount, 10) : 18492;

  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter(i => i.status === 'pending').length;
  const contactedInquiries = inquiries.filter(i => i.status === 'contacted').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const activeProjects = projects.filter(p => p.status === 'in_progress').length;
  const totalPortfolioProjects = projects.length;

  return {
    totalVisitors,
    totalInquiries,
    newInquiries,
    contactedInquiries,
    activeProjects,
    completedProjects,
    totalPortfolioProjects,
    totalServices: services.length,
    conversionRate: ((totalInquiries / (totalVisitors || 1)) * 100).toFixed(2),
  };
};

export const incrementVisitorCount = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.VISITOR_COUNT);
  const count = stored ? parseInt(stored, 10) + 1 : 18493;
  localStorage.setItem(STORAGE_KEYS.VISITOR_COUNT, String(count));
  return count;
};

export const recordAnalyticsEvent = async (event: Omit<AnalyticsEvent, 'id' | 'created_at'>) => {
  const item: AnalyticsEvent = {
    ...event,
    id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    created_at: new Date().toISOString(),
  };

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from('analytics_events').insert([item]);
    } catch (e) {
      // silent catch for analytics
    }
  }
};

// --- ADMIN PROFILES & AUTH ---
export const getAdminProfiles = async (): Promise<AdminProfile[]> => {
  initializeLocalStorage();
  const stored = localStorage.getItem(STORAGE_KEYS.ADMINS);
  return stored ? JSON.parse(stored) : INITIAL_ADMIN_PROFILES;
};

export const updateAdminProfile = async (profile: AdminProfile): Promise<AdminProfile> => {
  const admins = await getAdminProfiles();
  const updated = admins.map(a => a.id === profile.id ? profile : a);
  localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(updated));
  notifyDatabaseUpdate('admins');
  return profile;
};

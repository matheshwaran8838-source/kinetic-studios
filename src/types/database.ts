export type AdminRole = 'super_admin' | 'admin' | 'editor';

export interface AdminProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  role: AdminRole;
  created_at: string;
  last_sign_in?: string;
}

export interface WebsiteSettings {
  id: string;
  company_name: string;
  logo_url: string;
  hero_badge: string;
  hero_heading: string;
  hero_description: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  bg_color: string;
  accent_color: string;
  contact_email: string;
  phone_number: string;
  whatsapp_number: string;
  address: string;
  social_twitter: string;
  social_linkedin: string;
  social_github: string;
  social_instagram: string;
  social_dribbble: string;
  footer_content: string;
  seo_title: string;
  seo_description: string;
  animations_enabled: boolean;
  animation_speed: number;
  loading_screen_enabled: boolean;
  cursor_effects_enabled: boolean;
  updated_at: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  icon_name: string;
  image_url: string;
  starting_price: string;
  features: string[];
  is_active: boolean;
  order_index: number;
  created_at: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  client_name: string;
  category: string;
  description: string;
  image_url: string;
  project_url: string;
  tags: string[];
  is_featured: boolean;
  status: 'completed' | 'in_progress' | 'archived';
  metrics: string;
  order_index: number;
  created_at: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service_interested: string;
  budget_range: string;
  message: string;
  status: 'pending' | 'contacted' | 'completed' | 'spam';
  ip_address?: string;
  created_at: string;
  notes?: string;
}

export interface AnalyticsEvent {
  id: string;
  event_type: 'page_view' | 'button_click' | 'inquiry_submit' | 'service_view' | 'portfolio_view';
  path: string;
  referrer: string;
  user_agent?: string;
  created_at: string;
}

-- ==============================================================================
-- KINETIC STUDIOS — SUPABASE PRODUCTION DATABASE SCHEMA & SECURITY POLICIES
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE admin_role_enum AS ENUM ('super_admin', 'admin', 'editor');
CREATE TYPE inquiry_status_enum AS ENUM ('pending', 'contacted', 'completed', 'spam');
CREATE TYPE project_status_enum AS ENUM ('completed', 'in_progress', 'archived');

-- 3. ADMIN PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    role admin_role_enum DEFAULT 'admin' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    last_sign_in TIMESTAMPTZ
);

-- 4. WEBSITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.website_settings (
    id TEXT PRIMARY KEY DEFAULT 'kinetic-settings-default',
    company_name TEXT DEFAULT 'KINETIC STUDIOS' NOT NULL,
    logo_url TEXT DEFAULT '',
    hero_badge TEXT DEFAULT 'AWWWARDS NOMINEE 2026 • DIGITAL AGENCY OF THE YEAR',
    hero_heading TEXT DEFAULT 'WE CRAFT DIGITAL EXPERIENCES THAT MOVE THE WORLD' NOT NULL,
    hero_description TEXT DEFAULT 'An elite digital agency engineering high-conversion, animation-rich web experiences, cutting-edge creative code, and immersive design systems for forward-thinking brands.' NOT NULL,
    hero_cta_primary TEXT DEFAULT 'Start a Project',
    hero_cta_secondary TEXT DEFAULT 'Explore Our Work',
    bg_color TEXT DEFAULT '#080808' NOT NULL,
    accent_color TEXT DEFAULT '#8B5CF6' NOT NULL,
    contact_email TEXT DEFAULT 'hello@kineticstudios.agency' NOT NULL,
    phone_number TEXT DEFAULT '+1 (555) 234-8900',
    whatsapp_number TEXT DEFAULT '+15552348900',
    address TEXT DEFAULT '450 Kinetic Tower, Innovation Blvd, San Francisco, CA 94107',
    social_twitter TEXT DEFAULT 'https://twitter.com/kineticstudios',
    social_linkedin TEXT DEFAULT 'https://linkedin.com/company/kineticstudios',
    social_github TEXT DEFAULT 'https://github.com/kineticstudios',
    social_instagram TEXT DEFAULT 'https://instagram.com/kineticstudios',
    social_dribbble TEXT DEFAULT 'https://dribbble.com/kineticstudios',
    footer_content TEXT DEFAULT 'Kinetic Studios is an independent digital design and creative engineering studio.',
    seo_title TEXT DEFAULT 'KINETIC STUDIOS — Elite Digital Agency & Web Experiences',
    seo_description TEXT DEFAULT 'Award-winning digital agency specializing in bespoke website design, WebGL animations, and high-conversion web development.',
    animations_enabled BOOLEAN DEFAULT TRUE NOT NULL,
    animation_speed NUMERIC DEFAULT 1.0 NOT NULL,
    loading_screen_enabled BOOLEAN DEFAULT TRUE NOT NULL,
    cursor_effects_enabled BOOLEAN DEFAULT TRUE NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    icon_name TEXT DEFAULT 'Globe' NOT NULL,
    image_url TEXT,
    starting_price TEXT,
    features JSONB DEFAULT '[]'::jsonb NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    order_index INT DEFAULT 1 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. PORTFOLIO PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    client_name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    project_url TEXT DEFAULT '#',
    tags JSONB DEFAULT '[]'::jsonb NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE NOT NULL,
    status project_status_enum DEFAULT 'completed' NOT NULL,
    metrics TEXT,
    order_index INT DEFAULT 1 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. CONTACT INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service_interested TEXT,
    budget_range TEXT,
    message TEXT NOT NULL,
    status inquiry_status_enum DEFAULT 'pending' NOT NULL,
    ip_address TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 8. ANALYTICS EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id TEXT PRIMARY KEY,
    event_type TEXT NOT NULL,
    path TEXT NOT NULL,
    referrer TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Website Settings: Public can read, authenticated admins can write
CREATE POLICY "Public read access for website_settings"
    ON public.website_settings FOR SELECT
    USING (true);

CREATE POLICY "Admin write access for website_settings"
    ON public.website_settings FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Services: Public can read active services, admins full access
CREATE POLICY "Public read active services"
    ON public.services FOR SELECT
    USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Admin full manage services"
    ON public.services FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Portfolio: Public can read projects, admins full access
CREATE POLICY "Public read portfolio projects"
    ON public.portfolio_projects FOR SELECT
    USING (true);

CREATE POLICY "Admin full manage portfolio"
    ON public.portfolio_projects FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Contact Inquiries: Anyone can insert, only authenticated admins can select/update/delete
CREATE POLICY "Public can submit inquiries"
    ON public.contact_inquiries FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admin read and manage inquiries"
    ON public.contact_inquiries FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Analytics: Anyone can insert events, only admins can view
CREATE POLICY "Public can record analytics"
    ON public.analytics_events FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admin can view analytics"
    ON public.analytics_events FOR SELECT
    TO authenticated
    USING (true);

-- Admin Profiles: Authenticated users can view profiles
CREATE POLICY "Admins can view admin profiles"
    ON public.admin_profiles FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admins can update own profile"
    ON public.admin_profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================
INSERT INTO public.website_settings (id, company_name, hero_heading, hero_description, bg_color, accent_color, contact_email)
VALUES (
    'kinetic-settings-default',
    'KINETIC STUDIOS',
    'WE CRAFT DIGITAL EXPERIENCES THAT MOVE THE WORLD',
    'An elite digital agency engineering high-conversion, animation-rich web experiences, cutting-edge creative code, and immersive design systems.',
    '#080808',
    '#8B5CF6',
    'hello@kineticstudios.agency'
) ON CONFLICT (id) DO NOTHING;

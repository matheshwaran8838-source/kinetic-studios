# KINETIC STUDIOS — Creative Digital Agency Website & Admin Suite

A world-class, Awwwards-inspired digital agency website engineered for high conversion and immersive brand authority, coupled with a complete, secure, real-time Admin Management Dashboard connected to **Supabase**.

---

## ⚡ Key Highlights

### 1. Public Agency Flagship Experience
- **Aesthetic Direction**: Deep black (`#080808`), electric purple (`#8B5CF6`), ultra-clean typography (`Syne`, `Space Grotesk`, `JetBrains Mono`), glassmorphism, and noise texture overlays.
- **Cinematic Intro Loader**: Kinetic typography counter transitioning seamlessly into the hero canvas (can be enabled/disabled from Admin).
- **Custom Magnetic Cursor**: Electric purple follower ring with physics-based trail and magnetic target expansion (can be toggled in Admin).
- **Dynamic Hero Section**: Interactive floating telemetry cards, customizable typography, and animated marquee ticker showcasing industry brands.
- **Dynamic Services Showcase**: Loaded from database; includes starting prices, detailed deliverables modal, and direct "Book Service" proposal integration.
- **Interactive Portfolio & Case Studies**: Categorized filtering (All, SaaS / Web3, Interactive 3D, E-Commerce, etc.), featured highlights, and case study modal with live external site links.
- **Instant Project Budget Estimator**: Interactive calculator that calculates investment ranges based on architecture, motion level, timeline, and integrations, and auto-populates the inquiry brief.
- **Inquiry & Proposal Engine**: Integrated contact form submitting directly to the `contact_inquiries` database with form validation and celebratory confetti feedback.
- **Brand Manifesto & Process**: 4-stage agency roadmap (`01 Deep Discovery`, `02 Haute Couture Design`, `03 Creative Engineering`, `04 Conversion Calibration`).
- **Client Endorsements**: Social proof reviews with founder avatars, verified ratings, and ROI achievements.

---

### 2. Complete, Real-Time Admin Dashboard
- **Admin Authentication**:
  - Secure login with email and password.
  - One-click **Auto-Fill Demo Credentials** (`admin@kineticstudios.com` / `admin123456`).
  - Forgot password recovery modal with Supabase Auth dispatch.
  - Protected route guard with automatic session persistence.
- **Real-Time Telemetry Dashboard**:
  - Total Website Visitors
  - Total Project Inquiries
  - Pending / New Inquiries requiring response
  - Active Projects & Completed Flagships
  - Interactive 7-day SVG visitor & inbound momentum spline chart
  - Recent Inquiries quick management table
- **Website & Brand Management**:
  - Edit Company Name, custom Logo URL.
  - Edit Hero Badges, Headings, Descriptions, and CTA button text.
  - Background color picker (`#080808`) and Accent color picker (`#8B5CF6`) with real-time CSS variable synchronization.
  - Contact information (Email, Phone, WhatsApp, Headquarters address).
  - Social media links (Twitter / X, LinkedIn, GitHub, Instagram, Dribbble).
  - SEO browser title, meta description, and footer copyright text.
- **Services Management**:
  - Create, edit, and delete services.
  - Icon selector (`Globe`, `Sparkles`, `Code2`, `ShoppingBag`, `Palette`, `TrendingUp`).
  - Custom starting price tags, short descriptions, and full case study details.
  - Dynamic deliverables bullet editor (add/remove bullet points).
  - Active / Draft status toggle.
- **Portfolio Management**:
  - Add, edit, and delete case studies.
  - High-res image URL / upload previews.
  - Client name, categories, project descriptions, and external live URLs.
  - One-click Star button to mark as **Featured Highlight**.
  - Project status management (`completed`, `in_progress`, `archived`).
- **Customer Inquiries Management**:
  - Real-time list of all contact form submissions.
  - Filter tabs: `All`, `Pending`, `Contacted`, `Completed`, `Spam`.
  - Search bar by client name, email, company, and requested service.
  - Detail modal: Client phone, budget range, full project requirements brief, timestamp, and internal admin notes.
  - Direct 1-click **Reply via Email** (`mailto:`) and **WhatsApp Chat** buttons.
  - Spam deletion and status updates.
- **Analytics & Telemetry**:
  - Gross impressions counter.
  - Conversion rate calculation (% visitors to submitted inquiries).
  - Traffic acquisition channel distribution (Awwwards, Direct, Search, Social, GitHub).
  - Device distribution (Desktop, Mobile, Tablet).
  - End-to-end client conversion funnel stages.
- **Animation & Motion Settings**:
  - Master toggle for animations.
  - Animation velocity multiplier (`0.5x Cinematic`, `1.0x Normal`, `1.5x Kinetic`, `2.0x Hyper`).
  - Cinematic loading screen toggle.
  - Custom magnetic cursor toggle.
- **Admin Settings & Database Engine**:
  - Update administrator credentials and change password.
  - Team permissions management (Super Admin, Admin, Editor).
  - Active browser sessions monitor.
  - **Supabase Connection Manager**: Enter Supabase URL and Anon Key directly from the UI, test live connection with 1-click, and copy production SQL migration scripts.

---

## 🗄️ Database & Supabase Integration

The project includes `supabase-schema.sql` at the root directory, defining:
1. `admin_profiles` (Super Admin, Admin, Editor RBAC)
2. `website_settings` (Dynamic global content, theme colors, motion settings)
3. `services` (Offerings, icons, pricing, deliverable lists)
4. `portfolio_projects` (Case studies, images, categories, metrics)
5. `contact_inquiries` (Lead captures, budget, statuses, admin notes)
6. `analytics_events` (Telemetry logs)

### Row Level Security (RLS)
- Public visitors can submit contact inquiries and read published content.
- Only authenticated administrators can modify settings, services, portfolio, and view client inquiries.
- Service-role secret keys are never exposed in frontend code.

---

## 🚀 Quick Start Guide

### 1. Run Development Server
```bash
npm run dev
```

### 2. Access Admin Panel
- Click the **"Admin Portal"** button in the public navigation bar or footer, or navigate directly to `http://localhost:5173/#admin`.
- Default administrator credentials:
  - **Email**: `admin@kineticstudios.com`
  - **Password**: `admin123456`
  *(Or click the "Auto-Fill Demo Credentials" button on the login screen for instant access!)*

### 3. Connect Your Supabase Project (Optional)
1. Go to your Supabase Project Dashboard and open the **SQL Editor**.
2. Run the provided [`supabase-schema.sql`](supabase-schema.sql) file.
3. In the Admin Dashboard, go to **Admin Settings > Supabase Database & Storage Engine**, paste your **Project URL** and **Anon Key**, and click **"Test Connection"**.
4. The application seamlessly bridges Supabase with real-time reactive fallbacks.

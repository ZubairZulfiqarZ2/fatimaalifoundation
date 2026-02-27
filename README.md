# Fatima Ali Health Foundation — Website

> **Empowering Young Lives, Transforming Communities**

A production-ready, responsive, accessible, bilingual (English / Urdu) NGO website built with React + Vite.

---

## Table of Contents

1. [Sitemap](#1-sitemap)
2. [Module Catalog](#2-module-catalog)
3. [Module Build Guides](#3-module-build-guides)
4. [Design Tokens](#4-design-tokens)
5. [Donation Flow](#5-donation-flow)
6. [CMS Content Models](#6-cms-content-models)
7. [CI/CD Pipeline](#7-cicd-pipeline)
8. [Launch Checklist](#8-launch-checklist)
9. [Accessibility & SEO Checklist](#9-accessibility--seo-checklist)
10. [Feature Roadmap](#10-feature-roadmap)
11. [Getting Started](#11-getting-started)
12. [Top 10 MVP Developer Tasks](#12-top-10-mvp-developer-tasks)

---

## 1. Sitemap

```
Home (/)
├── About (/about)
│   ├── Our Vision
│   ├── Our Mission
│   ├── Team Members
│   └── Testimonials
├── Projects (/projects)
│   ├── Orphanages (/projects/orphanages)
│   ├── Flood Relief (/projects/flood-relief)
│   ├── Food Distribution (/projects/food-distribution)
│   ├── R.O. Water Filtration Plant (/projects/water-filtration)
│   ├── Marriage Support (/projects/marriage-support)
│   ├── Sehri & Iftar (/projects/sehri-iftar)
│   ├── Blood Donation Camp (/projects/blood-donation)
│   └── Masjid Construction (/projects/masjid-construction)
├── Events (/events)
│   ├── Upcoming Events
│   └── Past Events
├── Donate (/donate)
│   ├── One-Time Donation
│   ├── Recurring (Monthly)
│   └── Project-Specific Donation
├── Contact (/contact)
├── Blog & News (/blog)
│   └── Blog Post (/blog/:slug)
└── Legal
    ├── Privacy Policy (/legal/privacy)
    ├── Terms of Use (/legal/terms)
    └── Financial Reports (/legal/reports)

Global Elements:
  ├── Skip to Content Link
  ├── Header (logo, nav, language toggle EN/UR, Donate CTA)
  ├── Mobile Hamburger Menu
  ├── Breadcrumbs (secondary pages)
  ├── Footer (quick links, bank details, newsletter, social)
  └── 404 Page
```

---

## 2. Module Catalog

| # | Module | File(s) | Description |
|---|--------|---------|-------------|
| 1 | **Skip Link** | `components/SkipLink/` | Accessible "Skip to content" link |
| 2 | **Global Header** | `components/Header/` | Fixed nav, language toggle, Donate CTA, mobile menu |
| 3 | **Hero Section** | `components/Hero/` | Full-screen hero with parallax, CTA, social icons |
| 4 | **Project Card Grid** | `components/ProjectCard/` | Responsive card grid with progress bars, filters |
| 5 | **Project Detail Page** | `pages/Projects/ProjectDetailPage` | Hero image, description, gallery, progress sidebar |
| 6 | **Events List** | `pages/Events/` | Upcoming/past event tabs with cards |
| 7 | **Donate Widget** | `components/DonateWidget/` | Multi-step donation flow (amounts, payment, summary) |
| 8 | **Contact Form** | `components/ContactForm/` | Validated form with AJAX submission stub |
| 9 | **Testimonials Carousel** | `components/Testimonials/` | Rotating quotes, pause/play, dots nav |
| 10 | **Impact Stats** | `components/ImpactStats/` | Animated counters (volunteers, wells, etc.) |
| 11 | **Footer** | `components/Footer/` | Multi-column footer, newsletter, social, bank details |
| 12 | **Breadcrumbs** | `components/Breadcrumbs/` | Schema.org BreadcrumbList structured data |
| 13 | **Blog/News** | `pages/Blog/` | Post list + detail with tags |
| 14 | **Legal Pages** | `pages/Legal/` | Privacy, Terms, Financial Reports |
| 15 | **Language System** | `context/LanguageContext` | EN/UR toggle, RTL support, i18n JSON |

---

## 3. Module Build Guides

### 3.1 Global Header

**A. Purpose & UX Goal:** Persistent navigation providing quick access to all site sections, a prominent Donate CTA, and bilingual language toggle.

**B. Wireframe:**
```
┌──────────────────────────────────────────────────────┐
│ 🌙 FAHF  │  Home  About  Projects  Events  Blog  Contact  │  🌐UR  │ [Donate] │ ☰ │
└──────────────────────────────────────────────────────┘
```

**C. Markup:** Semantic `<header>` with `role="banner"`, `<nav>` with `aria-label="Main navigation"`, `<ul role="menubar">` for links.

**D. Styles:** Fixed position, transparent → solid white on scroll. Glass effect via `backdrop-filter`. BEM class naming (`.header__nav-link`, `.header__logo`). Mobile: off-canvas sidebar at 1024px breakpoint.

**E. Interactions:** Scroll listener toggles `.header--scrolled` class. Mobile menu toggles body overflow. `aria-expanded` on hamburger button.

**F. Accessibility:** All nav links keyboard-focusable (natural tab order). Language button has `aria-label`. Mobile menu has `aria-controls`. Focus trapped in mobile menu when open.

**G. Performance:** Header is part of initial render, no lazy-loading needed. CSS transitions use `transform` for GPU acceleration.

**H. Testing:** Unit test: renders nav links. A11y: verify focus trap in mobile menu. Cross-browser: check fixed positioning on iOS Safari.

---

### 3.2 Hero Section

**A. Purpose:** Create an emotional first impression and prompt donation/action.

**B. Wireframe:**
```
┌─────────────────────────────────────────┐
│        [Background Image/Gradient]       │
│                                          │
│     Empowering Young Lives              │
│     Subtitle text about the foundation  │
│                                          │
│     [Donate Now]    [Our Projects]      │
│                                          │
│                              [FB][IG][X] │
└─────────────────────────────────────────┘
```

**C. Markup:** `<section id="hero" aria-label="Main hero section">` with `role="img"` on background div, semantic `<h1>`, `<p>`, `<nav aria-label="Social media links">`.

**D. Styles:** `min-height: 90vh`, CSS gradient background (replace with image via `background-image`). Dark overlay for contrast. Content centered with `max-width: 700px`. Responsive `clamp()` for title size. Social icons as circular buttons with focus rings.

**E. Interactions:** IntersectionObserver fades in content. Parallax scroll on background (limited to 15% offset). `prefers-reduced-motion`: all animations disabled, content static.

**F. Accessibility:** `<h1>` is first heading on page. Background has `role="img"` with `aria-label`. Social links have `aria-label`. All pass 4.5:1 contrast on overlay. Focus-visible outlines on all buttons.

**G. Performance:** Hero image: `loading="eager"`, WebP/AVIF format, `<picture>` with srcset. Target ≤150KB. `will-change: transform` for parallax only. Preload critical fonts.

**H. Testing:** axe-core audit. Contrast check. Keyboard: tab to hero CTAs from skip link. Responsive: test 320px–1440px. Lighthouse LCP <2.5s.

**I. Analytics:** Track `click_donate` from hero CTA. Track scroll depth when hero exits viewport.

---

### 3.3 Project Card Grid

**A. Purpose:** Showcase all projects in a filterable, scannable grid with impact stats and progress indicators.

**B. Wireframe:**
```
[All] [Education] [Relief] [Health] [Welfare]

┌──────────┐  ┌──────────┐  ┌──────────┐
│  [Image] │  │  [Image] │  │  [Image] │
│  Badge   │  │  Badge   │  │  Badge   │
│  Title   │  │  Title   │  │  Title   │
│  Summary │  │  Summary │  │  Summary │
│  ▓▓▓▓░░  │  │  ▓▓▓░░░  │  │  ▓▓▓▓▓░  │
│  $32K/$50K│  │  $18K/$25K│  │  $78K/$100K│
│ [Learn →]│  │ [Learn →]│  │ [Learn →]│
└──────────┘  └──────────┘  └──────────┘
```

**C. Markup:** `<article>` per card. `<img loading="lazy">`. Progress bar with `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.

**D. Styles:** CSS Grid `repeat(auto-fill, minmax(280px, 1fr))`. Card hover: `translateY(-4px)` + shadow. Image zoom on hover. BEM naming: `.project-card__progress-fill`.

**E. Interactions:** Category filter buttons use `role="tablist"` / `role="tab"`. "Load More" button for pagination. Scroll-triggered fade-in via IntersectionObserver.

**F. Accessibility:** Filter buttons use `aria-selected`. Progress bar has screen reader labels. Images have descriptive `alt` text. All cards keyboard-navigable.

---

### 3.4 Donate Widget

**A. Purpose:** Streamlined, multi-step donation flow that supports preset/custom amounts, one-time/monthly, and multiple payment methods.

**B. Flow:**
```
Step 1: Select Amount → Frequency → Payment Method → Personal Info → [Confirm]
Step 2: Review Summary → [Back] [Confirm Donation]
Step 3: Processing (spinner) → Success/Error
```

**C. Markup:** `<form noValidate>` with fieldsets, legends, labeled inputs. Preset amount buttons, toggle for frequency, radio-style payment method selection.

**D. Styles:** Max-width 600px centered card. Amount grid `repeat(3, 1fr)`. Active states with brand-primary. Bank info panel with left border accent.

**E. Interactions:** State machine: step 1→2→3→4. Simulated payment delay (2s). 90% success rate for demo. Reset on completion. `disabled` submit if required fields empty.

**F. Accessibility:** All form inputs have `<label>`. Error messages linked via `aria-describedby`. Loading state uses `role="status"`. Success/error uses `role="alert"`.

**G. Security Notes:** Never store raw card data — use tokenization (Stripe Elements). HTTPS required. CSP headers. PCI-DSS compliance for production.

---

### 3.5 Contact Form

**A. Purpose:** Allow visitors to reach out with questions, partnership proposals, or support needs.

**C. Markup:** Name, email, subject, message fields with labels. `noValidate` for custom validation. `aria-invalid` and `aria-describedby` for errors.

**E. Interactions:** Client-side validation on submit. Simulated AJAX call. Success/error alerts with `role="alert"`. Fields clear on success.

**F. Accessibility:** All inputs labeled. Error messages immediately visible. Form can be submitted via keyboard (Enter).

---

### 3.6 Testimonials Carousel

**A. Purpose:** Build trust through authentic supporter stories.

**C. Markup:** `role="region"` with `aria-roledescription="carousel"`, `aria-live="polite"`. `<blockquote>` for quotes.

**E. Interactions:** Auto-rotate every 5s. Pause/play button. Dot navigation + prev/next buttons. `aria-current` on active dot.

**F. Accessibility:** Screen reader announces current testimonial on change. Pause control available. All buttons 44px minimum.

---

### 3.7 Impact Stats

**A. Purpose:** Visually communicate the scale of the foundation's work with animated counters.

**E. Interactions:** Animated counter from 0 to target value over 2s when section enters viewport. `prefers-reduced-motion`: shows static final values immediately.

**F. Accessibility:** Numbers displayed as text (screen reader accessible). Icons are decorative (`aria-hidden`).

---

### 3.8 Footer

**A. Purpose:** Provide quick navigation, contact details, bank information for donations, and newsletter signup.

**C. Markup:** `<footer role="contentinfo">`. Multiple `<nav>` sections with `aria-label`. Newsletter form with labeled input.

**D. Styles:** Dark background (neutral-900). 4-column grid → 2-column → 1-column responsive. Social links as circular buttons.

---

## 4. Design Tokens

Design tokens are defined in two formats:

### CSS Variables (`src/styles/tokens.css`)
```css
:root {
  --color-brand-primary: #2196F3;
  --color-brand-secondary: #4CAF50;
  --color-neutral-900: #212121;
  --color-white: #FFFFFF;
  --font-size-h1: 2.5rem;
  --space-md: 1rem;
  --radius-md: 8px;
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
}
```

### JSON Format (`src/data/designTokens.json`)
Full token set including colors, typography scale, spacing, radii, shadows, transitions, and breakpoints. See file for complete schema.

### Typography Scale
| Token | Size | Use |
|-------|------|-----|
| H1 | 2.5rem (40px) | Page titles, hero |
| H2 | 2rem (32px) | Section headings |
| H3 | 1.75rem (28px) | Sub-sections |
| H4 | 1.5rem (24px) | Card titles |
| Body Large | 1.125rem (18px) | Hero subtitle, lead text |
| Body | 1rem (16px) | Default body text |
| Small | 0.875rem (14px) | Meta, captions |
| XS | 0.75rem (12px) | Tags, badges |

### Spacing Scale
`4px → 8px → 12px → 16px → 24px → 32px → 48px → 64px → 96px`

---

## 5. Donation Flow

### Frontend Widget Steps

1. **Select Amount**: Preset buttons ($10, $25, $50, $100, $250, $500) or custom input
2. **Choose Frequency**: One-Time / Monthly toggle
3. **Payment Method**: Credit Card | PayPal | Bank Transfer
4. **Bank Transfer**: Shows static details (Bank Name, IBAN, instructions)
5. **Project Selection**: Optional dropdown to allocate to specific project
6. **Personal Info**: Name, Email, Reference Code
7. **Review Summary**: All selections displayed, Back/Confirm buttons
8. **Processing**: Animated spinner, simulated 2s delay
9. **Result**: Success (thank you + receipt preview) or Error (retry prompt)

### Payment Integration Patterns (Placeholders)

**Stripe Elements:**
```jsx
// In production, wrap card input in Stripe Elements provider
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const handlePayment = async () => {
  const { token } = await stripe.createToken(elements.getElement(CardElement));
  // Send token.id to backend: POST /api/donate { token: token.id, amount }
};
```

**PayPal:**
```jsx
// PayPal Buttons from @paypal/react-paypal-js
<PayPalButtons
  createOrder={(data, actions) => actions.order.create({ purchase_units: [{ amount: { value: '50.00' } }] })}
  onApprove={(data, actions) => actions.order.capture().then(details => showSuccess(details))}
/>
```

**Bank Transfer:**
Static copy with bank details displayed. User emails proof of transfer with reference code.

### Thank You Email Template
```json
{
  "to": "{{donor_email}}",
  "subject": "Thank You for Your Donation — Fatima Ali Health Foundation",
  "body": "Dear {{donor_name}},\n\nThank you for your generous donation of ${{amount}}. Your support helps us continue our mission.\n\nDonation Reference: {{reference}}\nProject: {{project_name}}\n\nWith gratitude,\nFatima Ali Health Foundation"
}
```

---

## 6. CMS Content Models

### Recommended CMS: Strapi, Contentful, Netlify CMS, or WordPress

### Project Model
```json
{
  "title": "Orphanage Support - Lahore",
  "slug": "orphanage-support-lahore",
  "summary": "Care and education for orphaned children aged 3-18.",
  "content": "<p>Fatima Ali Health Foundation supports orphaned children...</p>",
  "category": "education",
  "target_amount": 50000,
  "current_amount": 32000,
  "volunteers": 50,
  "location": "Lahore, Pakistan",
  "images": ["orphan1.jpg", "orphan2.jpg"],
  "impact_stat": "120+ children supported",
  "related_projects": ["food-distribution", "water-filtration"]
}
```

### Event Model
```json
{
  "title": "Ramadan Food Drive 2026",
  "slug": "ramadan-food-drive-2026",
  "date": "2026-03-15",
  "time": "10:00 AM - 6:00 PM",
  "location": "FAHF Community Center, Lahore",
  "description": "Annual Ramadan food drive...",
  "image": "event-ramadan.jpg",
  "rsvp_link": "/contact",
  "is_past": false
}
```

### Testimonial Model
```json
{
  "quote": "The foundation gave my children a second chance...",
  "author_name": "Amna Bibi",
  "author_role": "Beneficiary",
  "author_image": "testimonial-1.jpg"
}
```

### Team Member Model
```json
{
  "name": "Fatima Ali",
  "role": "Founder & Chairperson",
  "bio": "Founded the foundation in 2018...",
  "image": "team-fatima.jpg"
}
```

### Blog Post Model
```json
{
  "title": "Ramadan 2025: A Month of Giving",
  "slug": "ramadan-recap-2025",
  "date": "2025-04-15",
  "author": "Fatima Ali",
  "excerpt": "This Ramadan, we distributed...",
  "content": "<p>Ramadan 2025 was our most impactful...</p>",
  "image": "blog-ramadan.jpg",
  "tags": ["ramadan", "food", "relief"]
}
```

---

## 7. CI/CD Pipeline

See `.github/workflows/ci.yml` for the full configuration.

### Pipeline Steps

```
1. Trigger: Push to main/develop, PR to main
2. Install: npm ci
3. Lint: ESLint + Stylelint + Prettier
4. Test: Jest/Vitest unit tests, axe-core accessibility
5. Build: vite build (production)
6. Accessibility Audit: Lighthouse CI / axe-core
7. Deploy: Netlify / Vercel / AWS S3 + CloudFront
```

### Deployment Options

| Platform | Command | Notes |
|----------|---------|-------|
| **Netlify** | `npx netlify-cli deploy --prod --dir=dist` | Set `NETLIFY_AUTH_TOKEN` secret |
| **Vercel** | `npx vercel --prod` | Automatic on push |
| **AWS S3** | `aws s3 sync dist/ s3://bucket --delete` | Add CloudFront invalidation |

### Environment Variables
```
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_GA_MEASUREMENT_ID=G-XXXXXXXX
VITE_API_URL=https://api.fahfoundation.org
```

---

## 8. Launch Checklist

- [ ] **Performance**: LCP < 2.5s, Total JS < 150KB, Lighthouse > 90
- [ ] **Images**: All images in WebP/AVIF, srcset for responsive sizes
- [ ] **SEO**: Unique `<title>` and `<meta description>` on every page
- [ ] **SEO**: Structured data (JSON-LD) for Organization, Events, BreadcrumbList
- [ ] **SEO**: sitemap.xml and robots.txt configured
- [ ] **SEO**: Open Graph and Twitter Card meta tags on all pages
- [ ] **Accessibility**: WCAG 2.1 AA compliance verified with axe-core
- [ ] **Accessibility**: Keyboard navigation works for all interactive elements
- [ ] **Accessibility**: Color contrast ≥ 4.5:1 for all text
- [ ] **Security**: HTTPS enabled with valid SSL certificate
- [ ] **Security**: CSP, X-Frame-Options, X-Content-Type-Options headers set
- [ ] **Security**: No API keys or secrets in client-side code
- [ ] **Analytics**: GA4 or Plausible configured with key events
- [ ] **Error Logging**: Sentry or similar error tracking configured
- [ ] **Caching**: Static assets served via CDN with fingerprinted filenames
- [ ] **Legal**: Privacy Policy and Terms of Use published
- [ ] **Legal**: Cookie consent banner (if using cookies)
- [ ] **Testing**: Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] **Testing**: Mobile testing (iOS Safari, Android Chrome)
- [ ] **Content**: All placeholder text replaced with real content
- [ ] **Content**: All placeholder images replaced with real photos

---

## 9. Accessibility & SEO Checklist

### WCAG 2.1 AA Compliance

| Check | Status |
|-------|--------|
| Text contrast ≥ 4.5:1 (normal), ≥ 3:1 (large) | ✅ Implemented |
| All images have `alt` text or `role="img" + aria-label` | ✅ Implemented |
| Form inputs have associated `<label>` elements | ✅ Implemented |
| Focus styles visible on all interactive elements | ✅ Implemented |
| Heading hierarchy (H1 → H2 → H3) properly nested | ✅ Implemented |
| ARIA attributes used correctly | ✅ Implemented |
| Skip to content link available | ✅ Implemented |
| Touch targets ≥ 44px (Apple HIG) | ✅ Implemented |
| `prefers-reduced-motion` respected | ✅ Implemented |
| Language attribute set on `<html>` | ✅ Implemented |
| RTL support for Urdu content | ✅ Implemented |

### Nielsen's 10 Usability Heuristics

| Heuristic | Implementation |
|-----------|---------------|
| **Visibility of Status** | Loading spinners, progress bars, form success/error alerts |
| **Match Real World** | Clear, jargon-free language; familiar donation patterns |
| **User Control & Freedom** | Back/Cancel in donation flow; breadcrumbs on all pages |
| **Consistency & Standards** | Uniform button styles, nav patterns, card layouts |
| **Error Prevention** | Form validation before submit; confirmation before donation |
| **Recognition over Recall** | Icons with text labels; breadcrumbs; clear nav structure |
| **Flexibility & Efficiency** | Skip link; preset donation amounts; quick donate CTA |
| **Aesthetic & Minimalist** | Clean whitespace; focused content; no clutter |
| **Help Recognize Errors** | Inline error messages with field highlighting |
| **Help & Documentation** | Footer links to privacy/contacts; clear form labels |

### SEO

- Semantic HTML (`<article>`, `<header>`, `<main>`, `<nav>`, `<footer>`)
- JSON-LD structured data (Organization, BreadcrumbList)
- Unique `<title>` and `<meta description>` per page (via react-helmet-async)
- Open Graph (`og:title`, `og:description`, `og:image`) on all pages
- Twitter Card meta tags
- Sitemap XML (generate with vite-plugin-sitemap or manually)
- robots.txt configured

---

## 10. Feature Roadmap

### MVP (Current)
- [x] Home page with hero, featured projects, impact stats, testimonials
- [x] About page (vision, mission, team)
- [x] Projects list with category filters + detail pages
- [x] Events page (upcoming/past)
- [x] Donation widget (simulated payment flow)
- [x] Contact page with validated form
- [x] Blog/news listing + detail
- [x] Legal pages (privacy, terms, reports)
- [x] Bilingual support (EN/UR) with RTL
- [x] Responsive design (mobile-first)
- [x] Accessibility (WCAG 2.1 AA)

### v1.0 Enhancements
- [ ] Real payment integration (Stripe + PayPal)
- [ ] CMS integration (Strapi or Contentful)
- [ ] Server-side rendering (Next.js migration)
- [ ] Image optimization pipeline (sharp + srcset generation)
- [ ] Newsletter integration (Mailchimp/SendGrid)
- [ ] Contact form backend (API endpoint + email notification)
- [ ] Google Analytics 4 integration
- [ ] Cookie consent banner
- [ ] sitemap.xml generation
- [ ] Lighthouse CI in pipeline

### v2.0 Features
- [ ] Donor portal (login, donation history, receipts)
- [ ] Volunteer registration & management
- [ ] Event RSVP with calendar integration
- [ ] Real-time donation progress (WebSocket)
- [ ] Multi-currency support
- [ ] Admin dashboard for content management
- [ ] PWA (offline support, push notifications)
- [ ] Blog search and tag filtering
- [ ] Social media feed integration
- [ ] Annual report interactive viewer

---

## 11. Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
git clone https://github.com/your-org/fatima-foundation.git
cd fatima-foundation
npm install
```

### Development
```bash
npm run dev     # Start dev server at http://localhost:3000
```

### Production Build
```bash
npm run build   # Output to dist/
npm run preview # Preview production build locally
```

### Project Structure
```
src/
├── assets/images/          # Static images
├── components/             # Reusable UI components
│   ├── Header/             # Global nav + language toggle
│   ├── Hero/               # Hero section with parallax
│   ├── Footer/             # Multi-column footer
│   ├── ProjectCard/        # Project card for grid
│   ├── DonateWidget/       # Multi-step donation flow
│   ├── ContactForm/        # Validated contact form
│   ├── Testimonials/       # Carousel component
│   ├── ImpactStats/        # Animated counter section
│   ├── Breadcrumbs/        # Breadcrumb navigation
│   └── SkipLink/           # Accessibility skip link
├── context/
│   └── LanguageContext.jsx  # i18n provider (EN/UR)
├── data/                    # Static data (projects, events, etc.)
├── hooks/                   # Custom React hooks
├── i18n/                    # Translation JSON files
│   ├── en.json
│   └── ur.json
├── pages/                   # Page-level components
│   ├── Home/
│   ├── About/
│   ├── Projects/
│   ├── Events/
│   ├── Donate/
│   ├── Contact/
│   ├── Blog/
│   └── Legal/
├── styles/
│   ├── tokens.css           # Design tokens (CSS variables)
│   └── global.css           # Global styles + utilities
├── App.jsx                  # Root component + routing
└── main.jsx                 # Entry point
```

### Adding Real Images
Replace placeholder image paths in `src/data/projects.js`, `events.js`, etc. with actual images placed in `public/images/`.

---

## 12. Top 10 MVP Developer Tasks

1. **Replace placeholder images** with real foundation photos (WebP, optimized)
2. **Configure real payment** integration with Stripe Elements and/or PayPal SDK
3. **Set up headless CMS** (Strapi/Contentful) and connect data models
4. **Build contact form backend** (API endpoint + email notification via SendGrid)
5. **Add Google Analytics 4** with custom events (donate_click, form_submit, page_view)
6. **Generate sitemap.xml** and configure robots.txt for production domain
7. **Set up error logging** with Sentry for production monitoring
8. **Configure security headers** (CSP, HSTS, X-Frame-Options) in hosting platform
9. **Add newsletter integration** (Mailchimp/SendGrid) for footer signup
10. **Cross-browser & device testing** on iOS Safari, Android Chrome, and desktop browsers

---

## Analytics Events Reference

| Event Name | Trigger | Properties |
|------------|---------|------------|
| `page_view` | Every page navigation | `page_path`, `page_title` |
| `donate_click` | Donate CTA clicked | `location` (hero, nav, project) |
| `donation_completed` | Successful donation | `amount`, `currency`, `project`, `frequency` |
| `donation_failed` | Payment error | `error_type`, `amount` |
| `form_submit` | Contact form submitted | `form_name` |
| `newsletter_subscribe` | Newsletter signup | — |
| `project_view` | Project detail page loaded | `project_slug` |
| `event_rsvp` | Event RSVP clicked | `event_slug` |
| `language_switch` | Language toggled | `from_lang`, `to_lang` |
| `scroll_depth` | User scrolls to 25/50/75/100% | `percentage` |

---

*Built with React + Vite. Designed following Apple HIG principles and Nielsen's usability heuristics. Inspired by Save the Children, MSF, and Planned Parenthood design standards.*

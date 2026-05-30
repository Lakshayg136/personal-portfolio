# Product Requirements Document
## Lakshay Gupta — Personal Portfolio Website

**Version:** 1.0  
**Author:** PRD generated from Resume + Reference Site (pulkit-aggarwal.vercel.app)  
**Stack:** React.js + Tailwind CSS + Framer Motion | Deploy: Vercel  
**Target URL:** `lakshayg.vercel.app` (or custom domain)

---

## 1. Project Overview

### 1.1 Purpose
A high-performance, single-page portfolio website for **Lakshay Gupta**, B.Tech CSE student at Chandigarh University. The site serves as a personal brand hub combining resume, project showcase, and contact gateway — targeted at recruiters, collaborators, and hackathon communities.

### 1.2 Reference Inspiration
The design aesthetic and structure draws from `pulkit-aggarwal.vercel.app`:
- Dark-themed, minimal, developer-focused aesthetic
- Smooth scroll-based single-page layout (no route changes)
- Sticky navbar with section-based active highlighting
- Animated hero with typing effect
- Card-based project & experience sections
- Skill grid with icon badges
- Footer with social links

### 1.3 Design Philosophy
- **Theme:** Dark mode first (deep black/charcoal base, electric accent)
- **Tone:** Refined minimal-tech — elegant without being cold
- **Accent Color:** Electric violet-blue (`#6C63FF` primary, `#00D4FF` secondary highlight)
- **Typography:** `Syne` (headings — bold geometric) + `DM Sans` (body — clean readable)
- **Motion:** Smooth entrance animations on scroll (Framer Motion), typing hero, hover micro-interactions
- **Feel:** Premium, fast, memorable — the kind of portfolio that makes recruiters save the link

---

## 2. Information Architecture

### 2.1 Single-Page Sections (in order)

| # | Section ID | Nav Label | Priority |
|---|-----------|-----------|----------|
| 1 | `#home` | Home | Critical |
| 2 | `#about` | About | High |
| 3 | `#skills` | Skills | High |
| 4 | `#experience` | Experience | High |
| 5 | `#projects` | Projects | Critical |
| 6 | `#research` | Research | Medium |
| 7 | `#education` | Education | Medium |
| 8 | `#achievements` | Achievements | Medium |
| 9 | `#contact` | Contact | High |

### 2.2 Navigation Structure
- Fixed top navbar (glass-morphism background on scroll)
- Logo: `<LG />` monogram (top-left, links to `#home`)
- Nav links: horizontal on desktop, hamburger drawer on mobile
- Active section highlighting via Intersection Observer
- CTA Button: "Resume" → opens PDF in new tab

---

## 3. Section-by-Section Specifications

---

### 3.1 HERO SECTION (`#home`)

**Layout:** Full-viewport height, centered vertically and horizontally (flex/grid)

**Content:**
```
[Small badge] 👋 Welcome to my portfolio

[H1 — Large display font]
Hi, I'm Lakshay Gupta

[H2 — Typing animation cycles through:]
→ "Full-Stack Developer"
→ "UI/UX Enthusiast"
→ "Problem Solver"
→ "Open Source Contributor"

[Subtext paragraph — one line]
B.Tech CSE @ Chandigarh University | Building user-focused digital solutions

[CTA Buttons — horizontal row]
[ View My Work ↓ ]    [ Download Resume ]

[Social Links Row — icon buttons]
GitHub | LinkedIn | Email
```

**Visual Details:**
- Background: dark (#0A0A0F) with animated gradient mesh or subtle grid pattern (CSS)
- Floating blurred orbs (violet + cyan) behind hero text
- Cursor blink on typing animation
- Staggered entrance animation: badge → name → subtitle → paragraph → buttons (150ms delay each)
- Scroll-down indicator (bouncing arrow) at bottom of viewport

**Animations:**
- `fadeInUp` with stagger on all text elements
- Typewriter loop on subtitle using `react-type-animation` or custom hook
- Orb blobs: slow CSS keyframe float animation

---

### 3.2 ABOUT SECTION (`#about`)

**Layout:** Two-column (60/40 split) on desktop, stacked on mobile

**Left Column — Text:**
```
[Section Label] — About Me —

[H2] Passionate Developer & Designer

[Body text — 3-4 sentences from resume summary]
I'm a B.Tech Computer Science student with hands-on experience in 
frontend development, UI/UX design, and full-stack web applications. 
I'm passionate about building user-focused digital solutions and 
continuously learning emerging technologies.

Currently interning at Maruti Suzuki India Limited, where I'm 
digitizing operational workflows and supporting data-driven 
decision-making.

[Stats Row — 3 cards]
  [ 2+       ] [ 3+      ] [ 5+           ]
  [ Projects ] [ Certs   ] [ Technologies ]
```

**Right Column — Visual:**
- Stylized code block or terminal window showing a short code snippet about Lakshay (mock JSON bio object)
- OR: Abstract geometric avatar illustration in brand colors
- Subtle border glow animation on hover

**Animation:**
- Slide-in from left (text) and right (visual) on scroll

---

### 3.3 SKILLS SECTION (`#skills`)

**Layout:** Category-based grid

**Content Structure:**

```
[Section Header] Technical Skills

[Category: Languages]
Python  |  C++  |  Java  |  JavaScript

[Category: Frontend]
HTML5  |  CSS3  |  Tailwind CSS  |  Responsive Design  |  React.js

[Category: Backend]
Node.js  |  Express.js  |  Flask  |  REST APIs  |  JWT Auth  |  API Integration

[Category: Database]
MongoDB  |  DBMS (concepts)

[Category: Tools & Platforms]
Git  |  GitHub  |  Figma  |  OpenCV  |  Vercel  |  Canva  |  Arduino  |  LaTeX  |  Cloudinary

[Category: Core CS]
Data Structures & Algorithms  |  OOP  |  Operating Systems
```

**Visual Design:**
- Each skill displayed as a pill/badge with a dev icon (use `react-icons` / `devicons`)
- Category label above each group (muted text, uppercase tracking)
- Hover: badge lifts with a glow effect in accent color
- Icons: colored brand icons where available (JavaScript = yellow, Python = blue/yellow, etc.)

**Animation:**
- Staggered fade-in of each badge row as section enters viewport

---

### 3.4 EXPERIENCE SECTION (`#experience`)

**Layout:** Vertical timeline (center line, alternating cards on desktop; left-aligned on mobile)

**Experience Cards:**

**Card 1:**
```
[Company Logo Placeholder] Maruti Suzuki India Limited
Role: Technical Intern (Digital Operations)
Duration: May 2026 – Present
Location: India
[Tag] Current

• Converting manual operational data into structured digital formats,
  improving audit report retrieval and supporting data-driven 
  decision-making across departments.
• Collaborating with stakeholders to digitize audit workflows, reducing 
  manual effort and establishing consistent data capture standards.
```

**Card 2:**
```
[Company Logo Placeholder] LOOPINTechies Services Pvt. Ltd.
Role: Software Graphic Design Intern
Duration: Dec 2025 – Jan 2026
Location: Remote

• Designed wireframes and UI/UX prototypes for client-facing web 
  applications, improving the design-to-development handoff.
• Collaborated with development teams to translate design specifications 
  into production-ready interfaces.
```

**Visual Design:**
- Timeline spine: vertical gradient line (violet → cyan)
- Each card: dark card with subtle border, company name bold, role in accent color
- "Current" badge: pulsing green dot + "Present" label
- Duration pill (muted background)

**Animation:**
- Cards animate in from alternating sides on scroll

---

### 3.5 PROJECTS SECTION (`#projects`)

**Layout:** 3-column grid (desktop), 2-column (tablet), 1-column (mobile)  
**Each card:** equal height flex card with hover lift effect

---

**Project Card 1: CU Market**
```
[Top] Stack badges: MongoDB • Express • React • Node.js • JWT • Cloudinary
[Title] CU Market
[Subtitle] Campus Marketplace Platform
[Description]
A full-stack campus marketplace with real-time buyer-seller chat, 
JWT authentication, Cloudinary image uploads, and secure product 
listing flows.

[Links]  🔗 Live Demo   📂 GitHub
```

---

**Project Card 2: Maitri**
```
[Top] Stack badges: React • Node.js • MongoDB • OTP Auth
[Title] Maitri
[Subtitle] Women's Health Companion App
[Description]
A privacy-focused MERN stack platform with cycle tracking, symptom 
logging, AI-powered insights, OTP authentication, and community 
features ensuring data confidentiality.

[Links]  🔗 Live Demo   📂 GitHub
```

---

**Project Card 3: LinkedIn Clone**
```
[Top] Stack badges: HTML5 • CSS3 • JavaScript
[Title] LinkedIn Clone
[Subtitle] Professional Networking UI
[Description]
A responsive professional networking interface featuring user profiles, 
activity feeds, and networking components — built entirely with vanilla 
HTML5, CSS3, and JavaScript.

[Links]   📂 GitHub
```

---

**Card Visual Design:**
- Dark card (`#111118`) with `1px` border (`rgba(255,255,255,0.08)`)
- Hover: border glows in accent color, card lifts (`translateY(-6px)`) with shadow
- Stack tags: tiny colorful pills at the top
- Live/GitHub links: icon buttons at bottom of card (always visible, no hover-only)
- Gradient accent line at top of each card (left-border or top-border)

**Animation:**
- Cards stagger fade-in upward as section enters viewport

---

### 3.6 RESEARCH SECTION (`#research`)

**Layout:** Single wide card or banner-style

**Content:**
```
[Icon] 📄 Research Publication

[Title]
Sustainable and Explainable Machine Learning:
Empirical Trade-off Analysis Between Accuracy,
Energy Efficiency, and Interpretability

[Status Badge] Under Review for Conference

[Tags]  Green AI   |   Explainable AI (XAI)   |   Multi-objective Optimization

[Description]
This research investigates the empirical trade-offs between model 
accuracy, energy efficiency, and interpretability in machine learning 
systems — contributing to the growing field of responsible and 
sustainable AI.
```

**Visual:** Wide card with a subtle academic/paper aesthetic — light gradient background, serif-adjacent heading for the paper title, status badge in amber/yellow

---

### 3.7 EDUCATION SECTION (`#education`)

**Layout:** Vertical timeline (same style as Experience)

**Entries:**

```
[1] B.E. in Computer Science
    Chandigarh University, Mohali, India
    July 2024 – Present
    [Tag: Current]

[2] Intermediate – Class XII
    Lzebra Public School, Kota, India
    May 2023 – May 2024

[3] Matriculation – Class X
    Delhi Public School, Maruti Kunj, New Delhi, India
    May 2021 – May 2022
```

---

### 3.8 ACHIEVEMENTS & LEADERSHIP SECTION (`#achievements`)

**Layout:** Two sub-sections side by side

**Left: Leadership**
```
• Joint Secretary & Head Designer — C Square Club, Chandigarh University
  Coordinating university-level technical events, visual identity, 
  branding strategy, and social media management.

• Campus Ambassador
  Techfest IIT Bombay | GirlScript Summer of Code | 
  Rendezvous IIT Delhi 2025
```

**Right: Competitions & Certifications**
```
Competitions:
• Finalist — Project Expo 2025, Chandigarh University
• Hackathon Participant — Techathon (Internal SIH), 
  Google Gen AI Hackathon, AI for Bharat by AWS

Certifications (scrollable list):
• Introduction to AI — Intel & Chandigarh University
• Python Data Analytics — Meta (Coursera)
• Using Databases with Python — University of Michigan (Coursera)
• Operating Systems and You — Google (Coursera)
• Java Programming for Beginners — IBM (Coursera)
• Development Methodologies Overview — LearnQuest (Coursera)
• Microsoft Power BI — Microsoft
• AcceleratorX Global Program — Launched Global
```

**Visual:** Certification badges can be styled as small cards with provider logo placeholder + course name + issuer tag.

---

### 3.9 CONTACT SECTION (`#contact`)

**Layout:** Two-column (contact info left, form right) on desktop, stacked on mobile

**Left — Contact Info:**
```
[H2] Let's Connect

[Body]
Whether you're looking for a developer, have a project idea, or just 
want to say hi — my inbox is always open.

📧  lakshayg136@gmail.com
📱  +91 8373968303
📍  Gurugram / Chandigarh, India

[Social Icons]
GitHub  |  LinkedIn  |  Email
```

**Right — Contact Form:**
```
[Form fields]
Name:     [__________________________]
Email:    [__________________________]
Subject:  [__________________________]
Message:  [__________________________]
          [                          ]

          [   Send Message →   ]
```

**Form Behavior:**
- Field focus: accent border glow animation
- Submit: use `EmailJS` (free, no backend needed) or `Formspree` for actual email delivery
- Success state: animated checkmark + "Message sent!" toast
- Validation: required fields, email format check

**Visual:**
- Section background slightly lighter than rest (`#0F0F16`)
- Form inputs: dark fill, subtle border, glowing focus ring

---

## 4. Global Components

### 4.1 Navbar

```
[LG]   Home  About  Skills  Experience  Projects  Research  Education  Achievements  Contact    [ Resume ↗ ]
```

- **Position:** Fixed top, `z-50`
- **Default state:** Transparent background
- **Scrolled state:** Glass-morphism (`backdrop-blur`, semi-transparent dark bg, subtle bottom border)
- **Active link:** Accent color underline + text color
- **Mobile:** Hamburger icon → full-screen slide-down drawer with same nav links
- **Resume button:** Outlined accent button, opens `resume.pdf` in new tab

### 4.2 Footer

```
Designed & Built by Lakshay Gupta
[GitHub]  [LinkedIn]  [Email]
© 2025 Lakshay Gupta. All rights reserved.
```

- Minimal, centered, dark background
- Subtle top border in accent gradient

### 4.3 Section Headers (Reusable Component)

```
[Small muted label — e.g. "02 / Skills"]
[H2 — Large, Syne font]  Section Title
[Accent underline decoration — 60px wide]
```

### 4.4 Scroll Progress Indicator
- Thin accent-colored progress bar at very top of page (fixed, `z-100`)
- Fills as user scrolls down

### 4.5 Back-to-Top Button
- Fixed bottom-right, appears after scrolling 500px
- Smooth scroll to top on click

---

## 5. Technical Specifications

### 5.1 Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | React 18 (Vite) | Fast dev server, optimized build |
| Styling | Tailwind CSS v3 | Utility-first, consistent spacing |
| Animations | Framer Motion | Production-grade motion |
| Typing Effect | `react-type-animation` | Simple, reliable |
| Icons | `react-icons` + Devicons CDN | Wide icon coverage |
| Contact Form | EmailJS | Zero-backend email delivery |
| Fonts | Google Fonts: Syne + DM Sans | Distinctive + readable |
| Deployment | Vercel | Free, CI/CD from GitHub |

### 5.2 File Structure

```
portfolio/
├── public/
│   ├── resume.pdf          ← Lakshay's actual resume
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Research.jsx
│   │   ├── Education.jsx
│   │   ├── Achievements.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── SectionHeader.jsx
│   │   └── ScrollProgress.jsx
│   ├── data/
│   │   └── portfolioData.js  ← All content in one file (easy to update)
│   ├── hooks/
│   │   └── useScrollSpy.js   ← Active nav section tracking
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css            ← Tailwind directives + CSS variables
├── tailwind.config.js
├── vite.config.js
└── package.json
```

### 5.3 Performance Requirements

- **Lighthouse Score Target:** 90+ (Performance, Accessibility, SEO)
- **First Contentful Paint:** < 1.5s
- **Images:** WebP format, lazy loading (`loading="lazy"`)
- **Fonts:** `display=swap` to avoid FOIT
- **CSS:** PurgeCSS via Tailwind to strip unused classes
- **Bundle:** Code-split with React.lazy if needed

### 5.4 SEO & Meta Tags

```html
<title>Lakshay Gupta | Full-Stack Developer & Designer</title>
<meta name="description" content="Portfolio of Lakshay Gupta — B.Tech CSE student, Full-Stack Developer, UI/UX Designer, and Open Source contributor from Chandigarh University." />
<meta property="og:title" content="Lakshay Gupta | Developer Portfolio" />
<meta property="og:description" content="Full-Stack Developer • UI/UX Designer • Problem Solver" />
<meta property="og:type" content="website" />
<meta name="author" content="Lakshay Gupta" />
```

---

## 6. Design System

### 6.1 Color Palette

```css
:root {
  /* Backgrounds */
  --bg-primary:     #0A0A0F;   /* Main dark background */
  --bg-secondary:   #0F0F16;   /* Section alternates */
  --bg-card:        #111118;   /* Card backgrounds */
  --bg-card-hover:  #16161F;   /* Card hover state */

  /* Text */
  --text-primary:   #F0F0F5;   /* Main text */
  --text-secondary: #9999AA;   /* Muted / body text */
  --text-muted:     #555566;   /* Timestamps, labels */

  /* Accent */
  --accent-primary: #6C63FF;   /* Electric violet — primary CTA */
  --accent-secondary: #00D4FF; /* Cyan — secondary highlight */
  --accent-gradient: linear-gradient(135deg, #6C63FF, #00D4FF);

  /* Status */
  --status-green:   #00C47A;   /* "Current" / success */
  --status-amber:   #F59E0B;   /* "Under Review" */

  /* Borders */
  --border-subtle:  rgba(255, 255, 255, 0.06);
  --border-hover:   rgba(108, 99, 255, 0.5);
}
```

### 6.2 Typography Scale

```css
/* Font Families */
--font-display: 'Syne', sans-serif;       /* Headings, name, section titles */
--font-body:    'DM Sans', sans-serif;    /* Body text, descriptions */
--font-mono:    'JetBrains Mono', monospace; /* Code snippets, badges */

/* Scale */
--text-xs:   0.75rem;    /* 12px — labels, tags */
--text-sm:   0.875rem;   /* 14px — secondary text */
--text-base: 1rem;       /* 16px — body */
--text-lg:   1.125rem;   /* 18px — lead text */
--text-xl:   1.25rem;    /* 20px — card titles */
--text-2xl:  1.5rem;     /* 24px */
--text-3xl:  1.875rem;   /* 30px — section headings */
--text-5xl:  3rem;       /* 48px — hero name */
--text-7xl:  4.5rem;     /* 72px — hero name (desktop) */
```

### 6.3 Spacing & Layout

- **Max container width:** 1200px, centered with horizontal padding
- **Section vertical padding:** `py-24` (96px top and bottom)
- **Card padding:** `p-6` (24px)
- **Card border-radius:** `rounded-xl` (12px)
- **Grid gaps:** `gap-6` (24px)

### 6.4 Motion Tokens

```js
// Framer Motion variants (reusable)
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const cardHover = {
  rest: { y: 0, borderColor: 'var(--border-subtle)' },
  hover: { y: -6, borderColor: 'var(--border-hover)', 
           boxShadow: '0 20px 40px rgba(108,99,255,0.15)' }
};
```

---

## 7. Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|---------------|
| Mobile | < 640px | Single column, hamburger nav, smaller fonts |
| Tablet | 640–1024px | 2-column grids, condensed nav |
| Desktop | > 1024px | Full layout as designed |
| Large | > 1280px | Max-width container caps layout |

---

## 8. Content Data File

All content lives in `src/data/portfolioData.js` for easy future updates:

```js
// src/data/portfolioData.js

export const personalInfo = {
  name: "Lakshay Gupta",
  title: ["Full-Stack Developer", "UI/UX Enthusiast", "Problem Solver", "Open Source Contributor"],
  summary: "B.Tech Computer Science student with hands-on experience in frontend development, UI/UX design, and web application projects. Passionate about building user-focused digital solutions.",
  email: "lakshayg136@gmail.com",
  phone: "+91 8373968303",
  location: "Chandigarh / Gurugram, India",
  github: "https://github.com/[your-github]",
  linkedin: "https://linkedin.com/in/[your-linkedin]",
  resumeUrl: "/resume.pdf"
};

export const skills = { /* ...as above... */ };
export const experience = [ /* ...as above... */ ];
export const projects = [ /* ...as above... */ ];
export const education = [ /* ...as above... */ ];
export const achievements = { /* ...as above... */ };
export const certifications = [ /* ...as above... */ ];
```

---

## 9. Build & Deployment Checklist

### Setup
- [ ] `npm create vite@latest portfolio -- --template react`
- [ ] Install: `tailwindcss`, `framer-motion`, `react-icons`, `react-type-animation`, `@emailjs/browser`
- [ ] Configure Tailwind with custom CSS variables + font imports
- [ ] Set up Google Fonts (`Syne`, `DM Sans`, `JetBrains Mono`) in `index.html`

### Development
- [ ] Implement all 9 section components
- [ ] Wire up `useScrollSpy` hook for active nav state
- [ ] Add all Framer Motion animations with `useInView`
- [ ] Integrate EmailJS with form (create free account at emailjs.com)
- [ ] Add resume PDF to `/public/resume.pdf`
- [ ] Test all external links (GitHub, LinkedIn, live project URLs)
- [ ] Replace placeholder GitHub/LinkedIn URLs with real ones
- [ ] Add real project `Live Demo` links from resume

### Pre-Launch
- [ ] Add `<title>` and all meta tags in `index.html`
- [ ] Run Lighthouse audit, fix issues until 90+
- [ ] Test on Chrome, Firefox, Safari mobile
- [ ] Verify contact form sends email correctly
- [ ] Confirm all project links are live and working

### Deployment
- [ ] Push to GitHub repository (`portfolio`)
- [ ] Connect repo to Vercel (vercel.com → New Project → Import from GitHub)
- [ ] Set custom domain if available
- [ ] Enable Vercel Analytics (free)

---

## 10. Customization Notes for Developer

1. **Profile Photo:** If you want a photo, add it to `/public/photo.jpg` and display in the About section with a rounded frame + subtle glow border. Keep it optional.

2. **Project Links:** Replace the placeholder `Live: Link` and `GitHub: Link` references in the resume with your actual URLs in `portfolioData.js`.

3. **GitHub Username:** Update the GitHub link so it points to your actual profile. This allows you to optionally pull your GitHub stats via the GitHub API (commit count, repos, etc.).

4. **EmailJS Setup:**
   - Sign up at `emailjs.com`
   - Create a service (Gmail), a template, and get your `serviceId`, `templateId`, `publicKey`
   - Add these as Vite environment variables (`VITE_EMAILJS_*`) — never hardcode

5. **Color Customization:** All colors are CSS variables in `index.css`. Change `--accent-primary` to any color to retheme the entire site instantly.

6. **Adding Future Projects:** Add a new object to the `projects` array in `portfolioData.js` — the grid reflows automatically.

---

*PRD Version 1.0 — Ready for implementation*

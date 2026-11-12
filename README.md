# KAVNDev — Personal Portfolio Website

Personal portfolio website of Kian Andrei V. Naig, a Junior .NET Developer with hands-on experience in C#, .NET, SQL Server, and JavaScript.

**Live site:** https://kavndev.github.io/
**Mirror:** https://kavndev.vercel.app/

---

## WARNING — READ BEFORE DOING ANYTHING

This is a personal portfolio repository. It contains my personal identity, branding, profile images, and design work.

DO NOT clone, fork, copy, or reproduce any part of this repository without my explicit permission.

DO NOT use my name, logo, profile photos, personal details, or any content from this site as your own.

DO NOT deploy a copy of this site and present it as your own work.

If you want to use this repository as a reference, as a template base, or for any other purpose, you are required to contact me first and wait for my approval before proceeding.

Contact me at:
- GitHub: https://github.com/KAVNDev
- LinkedIn: https://www.linkedin.com/in/kian-andrei-v-naig-338174373/

Failure to comply may constitute plagiarism, identity misrepresentation, or intellectual property infringement.

---

## Tech Stack

### Frontend
- HTML5 — semantic markup, structured data, inline SVG sprite
- CSS3 — custom properties, Grid, Flexbox, fluid typography with clamp(), BEM naming convention
- Vanilla JavaScript — all interactions and logic, no framework

### Fonts
- Inter (400, 500, 600) — self-hosted woff2, latin subset
- Playfair Display (600, 700, 800) — self-hosted woff2, latin subset

### Libraries
- Lenis.js — smooth scrolling, self-hosted

### Services
- StaticForms — contact form submission handling
- GitHub Pages — primary deployment
- Vercel — mirror deployment

### SEO and Meta
- JSON-LD Person schema
- Open Graph tags
- Twitter Card tags
- Canonical URL
- XML Sitemap
- robots.txt

### Security
- Content-Security-Policy meta header (no unsafe-inline scripts)
- Honeypot spam protection on contact form
- Email obfuscation via runtime JavaScript
- rel="noopener noreferrer" on all external links

---

## Features

- Fully responsive from 320px phones to 2560px+ ultrawide monitors
- Accessible: skip-link, aria attributes, focus trap on modals, keyboard navigation, reduced-motion support
- Inline SVG icon sprite with zero CDN requests
- Self-hosted fonts with no Google Fonts dependency
- Lazy-loaded profile image with blur-up effect
- Typewriter effect with static screen reader fallback
- Particle animation with visibility-aware pause and restart
- Flip card portfolio with keyboard and touch support
- Service modals with focus trap and inert background
- Scroll progress indicator
- Dynamic time-based greeting
- Skeleton loading screen
- Back-to-top button
- LocalStorage-based form cooldown

---

## Project Structure

```
/
├── css/
│   └── styles.css              # All styles, mobile-first, BEM
├── fonts/
│   ├── inter-400.woff2
│   ├── inter-500.woff2
│   ├── inter-600.woff2
│   ├── playfair-600.woff2
│   ├── playfair-700.woff2
│   └── playfair-800.woff2
├── img/
│   ├── ProfileP.png            # Profile photo
│   ├── logo.png                # Personal logo
│   ├── bg.jpg                  # Background image
│   ├── favicon.svg             # SVG favicon
│   ├── favicon-32.png          # 32x32 PNG favicon
│   └── apple-touch-icon.png    # 180x180 iOS icon
├── js/
│   ├── main.js                 # All interactions
│   └── vendor/
│       └── lenis.min.js        # Self-hosted smooth scroll
├── index.html                  # Main page
├── 404.html                    # Custom error page
├── robots.txt                  # Search engine directives
└── sitemap.xml                 # Sitemap for indexing
```

---

## Running Locally

If you have received explicit permission to run this locally:

1. Clone the repository
2. Open index.html in a modern browser
3. No build step or dependencies required

---

## License

Copyright 2026 Kian Andrei V. Naig. All rights reserved.

This repository and all its contents — including but not limited to source code, design, images, branding, and written content — are the intellectual property of Kian Andrei V. Naig. No part of this project may be reproduced, distributed, or used in any form without prior written permission from the owner.

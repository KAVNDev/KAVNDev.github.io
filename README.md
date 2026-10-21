# Kian Andrei V. Naig — Portfolio Website

A personal portfolio website for Kian Andrei V. Naig, a Junior .NET Developer with hands-on experience in C#, .NET, SQL Server, and JavaScript.

**Live site:** https://kavndev.github.io/

---

## Tech Stack

- **HTML5** — Semantic markup, inline SVG icons, JSON-LD structured data
- **CSS3** — Custom properties, Grid, Flexbox, fluid typography with `clamp()`
- **Vanilla JavaScript** — All interactions, no framework
- **Lenis.js** — Smooth scrolling (self-hosted)

## Features

- Fully responsive: 320 px phones → 2560 px+ ultrawide monitors
- Inline SVG icon sprite — zero CDN requests for icons
- Accessible: skip-link, `aria-*` attributes, focus trap on modals, reduced-motion support
- Secure: tight Content-Security-Policy, `rel="noopener noreferrer"`, honeypot form field
- SEO: JSON-LD Person schema, Open Graph, Twitter Card, canonical URL, sitemap
- Performance: LCP image preloaded, non-blocking font loading, self-hosted background
- Dark minimal aesthetic with glass-morphism cards

## Project Structure

```
/
├── css/
│   └── styles.css          # All styles — mobile-first, BEM naming
├── js/
│   ├── main.js             # All interactions
│   └── vendor/
│       └── lenis.min.js    # Self-hosted smooth scroll library
├── img/
│   ├── ProfileP.png        # Profile photo (LCP image)
│   ├── bg.jpg              # Background image (self-hosted)
│   ├── favicon.svg         # SVG favicon
│   ├── favicon-32.png      # 32×32 PNG favicon
│   ├── apple-touch-icon.png # 180×180 iOS home screen icon
│   └── bg-pattern.svg      # Decorative background pattern
├── index.html              # Main page
├── 404.html                # Custom error page
├── robots.txt              # Search engine directives
└── sitemap.xml             # Single-URL sitemap for indexing
```

## Running Locally

1. Clone this repository
2. Open `index.html` in a modern browser — no build step required

## Deployment

Deployed via GitHub Pages from the `main` branch.

> **Note:** If you fork this repo, update the absolute URLs in `index.html` (`og:image`, `og:url`, `canonical`, JSON-LD) and `robots.txt` / `sitemap.xml` to match your own GitHub Pages domain.

## License

© 2026 KAVNDev. All rights reserved.

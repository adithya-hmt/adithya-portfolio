# Adithya S — Personal Portfolio

A lightweight, multi-page personal portfolio for **Adithya S**, prepared for `adhithya.com`.

## Current implementation

- React and Vite
- Responsive custom CSS design system
- Client-side routes for Home, About, Projects, Research, Writing, Now, Contact, and project case studies
- System-aware dark and light modes
- Accessible navigation, focus states, reduced-motion support, and semantic page structure
- Dynamic page titles, descriptions, canonical URLs, Open Graph metadata, JSON-LD, sitemap, and robots policy
- Vercel SPA routing and security headers
- Contact form with validation, a honeypot, timing protection, and a transparent `mailto:` workflow

The project deliberately keeps the existing React/Vite stack rather than adding a heavier migration. It has no analytics, database, secret keys, remote fonts, stock images, or unnecessary runtime dependencies.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Content that still needs owner input

Search for these labels in `src/main.jsx`:

- `LinkedIn · add URL`
- `Medium · add URL`
- `GitHub / demo link pending`
- `GitHub link pending`
- `Live demo pending`

Replace them only with verified public URLs.

## Domain

The application is prepared for `https://adhithya.com`, but this branch does not change domain or DNS settings. Review the Vercel preview before merging and connecting the custom domain.

# Adithya S Portfolio Design

## Goal

Build a polished, responsive one-page portfolio for Adithya S, closely matching the supplied reference: editorial white layout, cobalt blue accents, compact navigation, illustrated hero, project cards, skill chips, and a quiet footer.

## Content

- Identity: Adithya S, CSE student, builder, founder.
- Focus: useful digital products, civic technology, workflow automation, and thoughtful execution.
- Projects: Cerelytic, Grama Arivu, PennPathai, and enterprise workflow systems.
- Skills: Next.js, React, Firebase/Supabase, AI, UI/UX, product building, digital governance.

## Architecture

- Vite + React single-page app.
- Componentized sections: Header, Hero, Projects, About, Skills, Contact/Footer.
- Static data arrays drive projects and skills for easy editing.
- No backend required; CTAs use anchors, email, and external links.

## Interaction and responsive behavior

- Header anchors scroll to sections; mobile menu opens and closes with a button.
- Theme toggle switches between light and dark themes.
- Project filter buttons narrow cards by category.
- Project cards support a details dialog for the selected project.
- Mobile layout stacks the hero and cards, preserves comfortable tap targets, and prevents horizontal overflow.

## Visual system

- Font: Inter from Google Fonts with system fallback.
- Color: ink navy, cobalt blue, pale blue surfaces, subtle borders, and soft shadows.
- Use the generated portrait asset for the hero visual.
- Use a small icon library for interface icons; do not draw icons with CSS.

## Verification

- Build with Vite.
- Run the dev server and verify the rendered page in a browser at desktop and mobile widths.
- Check navigation, theme toggle, project filtering, project detail dialog, mobile menu, and console errors.

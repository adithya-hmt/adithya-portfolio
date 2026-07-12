# Adithya Portfolio

A full responsive portfolio for Adithya S — CSE student, builder, and founder.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Add the Supabase URL and publishable key to `.env.local` to enable the contact form. The frontend only uses the publishable key; no Supabase secret key belongs in this project.

## Build

```bash
npm run build
```

## Backend

The contact form writes to `public.portfolio_messages` in Supabase. The schema and RLS policy are stored in `supabase/migrations/`.

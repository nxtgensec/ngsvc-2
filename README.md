# NXTGENSEC VibeCoding Hackathon Platform

Official platform for NXTGENSEC monthly VibeCoding Hackathon editions.

## Overview

This project powers:

- Public hackathon landing page (March 2026 edition)
- Team-based registration flow (max 2 members per team)
- Registered team listing
- Admin dashboard with edit/delete/export capabilities
- Daily unique visitor tracking backed by Supabase

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Supabase (Postgres, RLS, Edge Functions)
- Vercel (frontend deployment)

## Project Structure

- `src/` - Frontend application
- `supabase/migrations/` - Database migrations
- `supabase/functions/` - Edge Functions
- `public/` - Static assets and branding files

## Local Development

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment

Create `.env` with:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3) Run dev server

```bash
npm run dev
```

Default URL: `http://localhost:8080`

## Supabase Setup

### 1) Apply migrations

Run all SQL files in `supabase/migrations/` against your Supabase project.

### 2) Deploy edge functions

Deploy required functions from `supabase/functions/`, including:

- `submit-team-registration`
- `admin-registrations`
- `list-team-names`
- `track-visitor`
- `get-visitor-stats`

### 3) Configure function secrets

Set required secrets in Supabase (Project Settings -> Edge Functions -> Secrets), including:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `VISITOR_HASH_SALT`
- `VISITOR_BASE_COUNT` (set to `147` to continue existing count baseline)

## Deployment (Production)

Recommended release flow:

1. Develop and verify locally.
2. Push code to GitHub (`main`).
3. Deploy frontend through Vercel.
4. Ensure Supabase migrations/functions are deployed to production.
5. Verify registration, admin actions, and visitor counter in production.

## Security Notes

- Registration and admin operations are handled via Supabase Edge Functions.
- RLS and grants are managed through migrations.
- Sensitive credentials are kept in Supabase/Vercel secrets, not in client code.

## Branding

All Lovable references have been removed from app metadata/build config and replaced with NXTGENSEC branding assets.

## Contact

- Website: [nxtgensec.org](https://www.nxtgensec.org)
- Hackathon Email: [vibecoding@nxtgensec.org](mailto:vibecoding@nxtgensec.org)

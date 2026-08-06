# M.I.R. — My Industrial Realtors

Industrial, commercial and hotel property listings for Malaysia.
Next.js 14 (App Router) · TypeScript · Tailwind · trilingual (EN / BM / 中文).

Production domain: **https://myindustrialrealtors.com**

## Running locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

## Environment

Every variable lives in `.env.example`. Two are mandatory in production:

| Variable | Notes |
| --- | --- |
| `ADMIN_PASSWORD` | Guards `/admin`. Long and unique — never reuse a value that has appeared in this repo. |
| `SESSION_SECRET` | Signs the admin cookie. **Must be ≥ 32 random characters** or the app throws on start. Generate with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`. |

`SMTP_*` are optional: leave blank and the nightly leads CSV is still written to
disk, just not emailed.

## Deploying

```bash
npm ci
npm run build
npm start        # serves on $PORT (default 3000)
```

### Hosting requirements

This app keeps state **on the server's filesystem**:

- `data/*.json` — the listing/category store (`lib/db.ts`)
- `uploads/` — listing photos and brochures, served via `/api/uploads/[name]`

It therefore needs a host with a **persistent writable disk** — a VPS, a
container with a mounted volume, Render/Railway with a disk, etc.

> **It will not work correctly on Vercel or any read-only serverless platform.**
> Admin edits and uploads would be lost on every redeploy. Moving to serverless
> means swapping `lib/db.ts` for a real database and `uploads/` for blob storage.

### What is and isn't in git

Tracked, so a fresh deploy comes up populated:
`data/listings.json`, `data/categories.json`, `data/subcategories.json`,
`data/filterFields.json`, and the whole `uploads/` directory.

Never tracked (contains enquirer names, phones, emails):
`data/leads.json`, `data/contacts.json`, `data/inquiries.json`, `data/leads-csv/`.
`lib/db.ts` recreates them empty on first boot.

Because seed content is tracked but also written at runtime, `git pull` on a live
server can conflict with admin edits. Back up `data/` and `uploads/` from the
server before deploying, and treat the server copy as the source of truth.

## Admin

`/admin` — password login, 8-hour signed httpOnly cookie session.
Login is rate-limited to 8 attempts per IP per 15 minutes, and the panel is
`noindex, nofollow` at the header level.

## Structure

```
app/            routes (pages + /api handlers) · robots.ts · sitemap.ts
components/     UI; Nav, Footer, HomeHero, Chatbot, SegmentListings…
lib/            site.ts (brand/contact), db.ts, i18n.ts, auth.ts, mailer.ts
data/           JSON collection store
uploads/        listing media served by /api/uploads
```

### Branding

All brand and contact strings come from **`lib/site.ts`** — change them once
there. UI copy is keyed by its English string in `lib/i18n.ts`; if you edit an
English string you must update the matching key in both the `BM` and `ZH` maps,
or that string silently falls back to English.

# TaxPlus Consulting

Company profile website for TaxPlus Consulting, a licensed tax consultancy in Bandung. It is a full-stack
[Next.js](https://nextjs.org) App Router application: the public site and its API live in one project, as described
in the [CMS handoff](docs/company-cms-chat-summary.md).

The design follows the approved prototype (`taxplus-website-prototipe.html`) and the IT brief
(`Brief_Website_TaxPlus_untuk_Tim_IT.pdf`): its CSS is the theme in `src/app/site.css`. All content (articles,
services, FAQ, team, reviews, Instagram posts, forms, jobs, contact details, ...) is managed in the built-in CMS at
`/admin` and stored in Postgres; see [CMS](#cms).

## Stack

- Next.js 16 (App Router, Cache Components) with TypeScript
- Tailwind CSS v4 (theme + utilities, no Preflight) alongside the design stylesheet in `src/app/site.css`
- Zod for server-side input validation
- Neon Postgres (via the Vercel Marketplace) with Drizzle ORM and `node-postgres`
- [Bun](https://bun.sh) as the package manager

## Getting started

```bash
bun install
vercel link            # once, to connect this folder to the Vercel project
vercel env pull .env.local
bun run db:migrate
bun run cms:seed        # first time only: fills the CMS with the launch content
ADMIN_PASSWORD='…' bun run admin:create you@example.com "Your Name"
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script          | Description                      |
| --------------- | -------------------------------- |
| `bun dev`       | Start the development server     |
| `bun run build` | Create a production build        |
| `bun start`     | Serve the production build       |
| `bun run lint`  | Run ESLint                       |
| `bun run db:generate` | Generate a migration from `src/lib/db/schema.ts` |
| `bun run db:migrate`  | Apply pending migrations (uses `DATABASE_URL_UNPOOLED`) |
| `bun run db:studio`   | Browse the database with Drizzle Studio |
| `bun run cms:seed`    | Fill empty CMS collections/settings from `scripts/seed-data` (`--force` replaces) |
| `bun run admin:create <email> [name]` | Create a super admin, or reset a password (`ADMIN_PASSWORD` env) |

## Environment variables

| Variable               | Default                 | Description                                                                           |
| ---------------------- | ----------------------- | ------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Public base URL for canonical URLs, Open Graph and the sitemap                        |
| `SITE_INDEXABLE`       | `false`                 | `true` allows search engines; otherwise robots.txt disallows all and pages are noindex |
| `DATABASE_URL`         | —                       | Neon pooled connection string, used by the app                                         |
| `DATABASE_URL_UNPOOLED`| —                       | Neon direct connection string, used by migrations                                     |
| `SHOW_STAGING_NOTES`   | `false`                 | `true` shows the design's editorial notes and placeholder blocks ("[Nama]", photos)   |
| `BLOB_READ_WRITE_TOKEN`| —                       | Vercel Blob store `taxplus-cms` for CMS uploads (set by the Blob integration)          |
| `RESEND_API_KEY`       | —                       | Resend key for emails (set by the Resend integration); without it emails are skipped   |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | —             | GA4 web stream ID (`G-…`); tracking is off when empty                                  |
| `GA4_PROPERTY_ID`      | —                       | Numeric GA4 property ID for the admin dashboard                                        |
| `GA4_CREDENTIALS`      | —                       | Service account JSON key (raw or base64) with Viewer access on the property            |
| `EMAIL_FROM`           | `TaxPlus Consulting <noreply@taxplus-consulting.co.id>` | Sender address; its domain must be verified in Resend |

## Routes

| Path                 | Page                                                                 |
| -------------------- | -------------------------------------------------------------------- |
| `/`                  | Homepage (13 sections) with the consultation form                    |
| `/layanan`           | Services hub                                                         |
| `/layanan/[slug]`    | `tax-compliance`, `tax-accounting`, `tax-management`, `tax-audit`, `tax-litigation` |
| `/tentang-kami`      | Profile, credentials, team, company legality (`#legalitas`)          |
| `/artikel`           | Article list with category filter                                    |
| `/artikel/[slug]`    | Article detail (18 articles)                                         |
| `/karier`            | Careers                                                              |
| `/kontak`            | Contact cards, consultation form, map                                |
| `/kebijakan-privasi` | Privacy policy (draft, pending review)                               |
| `/faq`               | Tax FAQ migrated from the old site                                   |
| `/formulir-pajak`    | Tax form downloads                                                   |
| `/admin`             | CMS (login required, not indexed)                                    |

Assets still awaited from Pak Kalam (brief, "Aset yang ditunggu"): set `heroVideo` in `src/app/(site)/page.tsx`
for the hero video, and add client logos in the CMS (Konten → Logo klien). The IKPI and
Asosiasi Advokat Indonesia (AAI) logos in `public/images/members/` come from public sources (ikpi.or.id, seeklogo.com); swap
them for official high-resolution files when available. Article Open Graph images are WebP exports
of the SVG covers in `public/images/articles/`.

## API

| Method | Path                     | Description                                                         |
| ------ | ------------------------ | ------------------------------------------------------------------- |
| `GET`  | `/api/services`          | Service summaries                                                   |
| `GET`  | `/api/services/[slug]`   | Full service content                                                |
| `GET`  | `/api/articles`          | Article summaries                                                   |
| `GET`  | `/api/articles/[slug]`   | Full article, including `bodyHtml`                                  |
| `POST` | `/api/consultations`     | Validate a consultation request and return a WhatsApp hand-off link |

`POST /api/consultations` accepts `{ name, company?, email?, whatsapp, topic, message? }` (`topic` is a service slug
or `umum`; pre-select it with `/kontak?topik=<slug>`), stores it in the `consultation_requests` table
and responds with `201 { data: { id, saved: true, whatsappUrl } }`. If the database is unavailable it still returns the
WhatsApp hand-off as `200 { data: { saved: false, whatsappUrl } }`. Invalid input returns `422 { fieldErrors }`, a
malformed body `400`.

## CMS

The admin lives at `/admin` (email + password, sessions in the `admin_sessions` table; `src/proxy.ts` only does an
optimistic redirect, every page and Server Action re-checks the session and the role).

- **Roles** (`src/modules/admin/roles.ts`): *Super admin* (everything, incl. users), *Admin* (content, settings,
  consultations, deleting User accounts) and *User* (add and edit content; no delete, settings, consultations or users).
- **Users** are invited from Pengguna (name, email, phone, role): they get an activation link valid for 8 hours and
  set their own password. `bun run admin:create` only bootstraps a super admin.

- **Collections and settings** are declared in `src/modules/cms/collections.ts`. Each one is a list of field
  definitions (`src/modules/cms/fields.ts`) that generates the admin form, the Zod validation and the data type the
  site reads. Adding a field there is enough to make it editable.
- **Storage:** one row per item in `cms_entries` (`data` is JSON), one row per settings group in `cms_settings`.
  Rich text is sanitized on save (`src/modules/cms/sanitize.ts`). Uploads go to Vercel Blob; photos are resized to
  2000 px and converted to WebP in the browser first.
- **Reading:** pages call the getters in `src/modules/content/data.ts`, built on `"use cache"` + `cacheTag`
  (`src/modules/cms/read.ts`). Saving in the admin calls `updateTag`, so the change is live without a redeploy
  while pages stay prerendered.
- `scripts/seed-data/` holds the approved launch content that `bun run cms:seed` loads into an empty database.

## Analytics

- **Tracking:** GA4 loads on the public site (not the admin) when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set, with two
  events: `whatsapp_click` (any wa.me link) and `generate_lead` (consultation form sent).
- **Dashboard:** `/admin/analytics` (Admin and Super admin) reads the Google Analytics Data API with a service account
  (`GA4_PROPERTY_ID`, `GA4_CREDENTIALS`; the account needs Viewer on the property): live users, KPIs against the
  previous period, daily users, top pages, channels, sources, cities, devices and the two events. Reports are cached
  for a few minutes.

## Email

Sent through Resend (`src/lib/email`), after the response so forms stay fast:

- **New consultation** → the office email in CMS settings (Umum & kontak), reply-to the visitor.
- **Confirmation** → the visitor, when they left an email (at most 3 per address per day).
- **Invitation** → the invited user, with an activation link valid for 8 hours.
- **Password reset** → the admin's own email, from "Lupa kata sandi?" on the login page; the link is valid for
  1 hour and works once.

## Database

Schema lives in `src/lib/db/schema.ts`; migrations are generated into `drizzle/` and committed. To change the schema,
edit the schema file, run `bun run db:generate`, review the SQL, then `bun run db:migrate`. Apply migrations before
deploying code that depends on them.

## Deployment

The app deploys to [Vercel](https://vercel.com) (project `tax-plus-consulting`), connected to this repository:
every push to `main` deploys to production, and every other branch or pull request gets a preview deployment.

- `vercel.json` pins the Next.js preset and runs functions in `sin1` (Singapore), next to the Neon database in
  `ap-southeast-1`.
- The Neon integration sets `DATABASE_URL`, `DATABASE_URL_UNPOOLED` and related variables for every environment.
- Set `NEXT_PUBLIC_SITE_URL` to the production domain, and `SITE_INDEXABLE=true` only at launch.
- Run `bun run db:migrate` before pushing code that needs a new migration.

## Project structure

```text
src/
├── app/
│   ├── (site)/            # Public pages sharing the nav + footer layout
│   ├── admin/             # CMS: login, dashboard, collections, settings, users
│   ├── api/               # Route handlers
│   ├── site.css           # Theme ported from the approved prototype
│   ├── robots.ts, sitemap.ts, not-found.tsx
├── components/
│   ├── admin/             # CMS form inputs, rich text editor, uploads
│   ├── layout/            # Site shell: header, gate panels, footer, floating WhatsApp
│   ├── sections/          # Page sections shared across pages
│   ├── articles/, consultation/, faq/
│   └── ui/                # Icons, staging-only helpers
├── lib/db/                # Drizzle client, schema and helpers
├── modules/
│   ├── admin/             # Auth: passwords, sessions, user actions, admin nav
│   ├── cms/               # Field engine, collections, cached reads, Server Actions
│   ├── content/           # Content getters for pages (data.ts), routes, link helpers
│   └── consultations/     # Consultation validation, persistence and hand-off
└── proxy.ts               # Redirects /admin to the login page without a session cookie
scripts/                   # create-admin, seed-cms and the launch content (seed-data/)
```

## Next steps

Consultation requests get an inbox in the admin next. Later: roles (editor vs. admin), revisions, and scheduled
publishing for articles.

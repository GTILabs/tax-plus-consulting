# TaxPlus Consulting

Company profile website for TaxPlus Consulting, a licensed tax consultancy in Bandung. It is a full-stack
[Next.js](https://nextjs.org) App Router application: the public site and its API live in one project, as described
in the [CMS handoff](docs/company-cms-chat-summary.md).

The design follows the approved prototype (`taxplus-website-prototipe.html`) and the IT brief
(`Brief_Website_TaxPlus_untuk_Tim_IT.pdf`): its CSS is the theme in `src/app/site.css`, its copy lives in
`src/modules/content`. The "Termasuk & tidak termasuk" and per-service process copy still come from the staging
design in [`docs/design/TaxPlus-Web.html`](docs/design/TaxPlus-Web.html) until Pak Kalam confirms them.

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

## Environment variables

| Variable               | Default                 | Description                                                                           |
| ---------------------- | ----------------------- | ------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Public base URL for canonical URLs, Open Graph and the sitemap                        |
| `SITE_INDEXABLE`       | `false`                 | `true` allows search engines; otherwise robots.txt disallows all and pages are noindex |
| `DATABASE_URL`         | —                       | Neon pooled connection string, used by the app                                         |
| `DATABASE_URL_UNPOOLED`| —                       | Neon direct connection string, used by migrations                                     |
| `SHOW_STAGING_NOTES`   | `false`                 | `true` shows the design's editorial notes and placeholder blocks ("[Nama]", photos)   |

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

Assets still awaited from Pak Kalam (brief, "Aset yang ditunggu"): set `heroVideo` in `src/app/(site)/page.tsx`
for the hero video, client logos in `clientLogos` (`src/modules/content/company.ts`) and staff photos. The IKPI and
Ikatan Advokat Indonesia logos in `public/images/members/` come from public sources (ikpi.or.id, seeklogo.com); swap
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

`POST /api/consultations` accepts `{ name, company?, email?, whatsapp, topic, message? }` (`topic` is a slug from
`src/modules/consultations/topics.ts`; pre-select it with `/kontak?topik=<slug>`), stores it in the `consultation_requests` table
and responds with `201 { data: { id, saved: true, whatsappUrl } }`. If the database is unavailable it still returns the
WhatsApp hand-off as `200 { data: { saved: false, whatsappUrl } }`. Invalid input returns `422 { fieldErrors }`, a
malformed body `400`.

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
│   ├── api/               # Route handlers
│   ├── site.css           # Theme ported from the approved prototype
│   ├── robots.ts, sitemap.ts, not-found.tsx
├── components/
│   ├── layout/            # Header, gate panels, footer, floating WhatsApp
│   ├── sections/          # Page sections shared across pages
│   ├── articles/, consultation/, faq/
│   └── ui/                # Icons, staging-only helpers
├── lib/db/                # Drizzle client, schema and helpers
└── modules/
    ├── content/           # Typed site, navigation, services and article content
    └── consultations/     # Consultation validation, persistence and hand-off
```

## Next steps

Content lives in typed modules under `src/modules/content`, shaped so it can seed the CMS planned in the handoff
document. The CMS is single-site. Next slices: Auth.js with roles, an admin dashboard (starting with consultation
requests), then articles and pages in the database, media storage and revisions.

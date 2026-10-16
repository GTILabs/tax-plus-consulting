# TaxPlus Consulting

Company profile website for TaxPlus Consulting, a licensed tax consultancy in Bandung. It is a full-stack
[Next.js](https://nextjs.org) App Router application: the public site and its API live in one project, as described
in the [CMS handoff](docs/company-cms-chat-summary.md).

The pages are converted from the single-file staging design in
[`docs/design/TaxPlus-Web.html`](docs/design/TaxPlus-Web.html).

## Stack

- Next.js 16 (App Router, Cache Components) with TypeScript
- Tailwind CSS v4 (theme + utilities, no Preflight) alongside the design stylesheet in `src/app/site.css`
- Zod for server-side input validation
- [Bun](https://bun.sh) as the package manager

## Getting started

```bash
bun install
cp .env.example .env.local
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script          | Description                      |
| --------------- | -------------------------------- |
| `bun dev`       | Start the development server     |
| `bun run build` | Create a production build        |
| `bun start`     | Serve the production build       |
| `bun run lint`  | Run ESLint                       |

## Environment variables

| Variable               | Default                 | Description                                                                           |
| ---------------------- | ----------------------- | ------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Public base URL for canonical URLs, Open Graph and the sitemap                        |
| `SITE_INDEXABLE`       | `false`                 | `true` allows search engines; otherwise robots.txt disallows all and pages are noindex |
| `SHOW_STAGING_NOTES`   | `false`                 | `true` shows the design's editorial notes and placeholder blocks ("[Nama]", photos)   |

## Routes

| Path               | Page                                                     |
| ------------------ | -------------------------------------------------------- |
| `/`                | Homepage with consultation form                          |
| `/tentang-kami`    | About, licenses and company legality (`#legalitas`)      |
| `/layanan`         | Services hub                                             |
| `/layanan/[slug]`  | `tax-compliance`, `tax-accounting`, `tax-management`, `tax-audit`, `tax-litigation` |
| `/spesialisasi`    | Industry specialization                                  |
| `/artikel`         | Article index                                            |
| `/artikel/[slug]`  | Article detail                                           |
| `/karier`          | Careers                                                  |

## API

| Method | Path                     | Description                                                         |
| ------ | ------------------------ | ------------------------------------------------------------------- |
| `GET`  | `/api/services`          | Service summaries                                                   |
| `GET`  | `/api/services/[slug]`   | Full service content                                                |
| `GET`  | `/api/articles`          | Article summaries                                                   |
| `GET`  | `/api/articles/[slug]`   | Full article, including `bodyHtml`                                  |
| `POST` | `/api/consultations`     | Validate a consultation request and return a WhatsApp hand-off link |

`POST /api/consultations` accepts `{ name, whatsapp, sector, message }` and responds with `200 { data: { whatsappUrl } }`,
`422 { fieldErrors }` or `400` for a malformed body. Requests are not stored yet.

## Project structure

```text
src/
├── app/
│   ├── (site)/            # Public pages sharing the nav + footer layout
│   ├── api/               # Route handlers
│   ├── site.css           # Design stylesheet ported from the staging HTML
│   ├── robots.ts, sitemap.ts, not-found.tsx
├── components/
│   ├── layout/            # Nav, breadcrumb, footer
│   ├── sections/, home/   # Page sections and the consultation form
│   └── ui/                # Icons, accordion, staging-only helpers
└── modules/
    ├── content/           # Typed site, navigation, services and article content
    └── consultations/     # Consultation schema and hand-off logic
```

## Next steps

Content lives in typed modules under `src/modules/content`, shaped so it can seed the CMS planned in the handoff
document (PostgreSQL + Drizzle, Auth.js, admin dashboard, media storage). Before that work starts, decide whether the
CMS is single-site or multi-tenant.

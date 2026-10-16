# Company Profile & Article CMS — Chat Summary and Technical Handoff

> **Purpose:** Capture the requirements and architecture discussed in the chat so the project can be continued with an AI coding assistant or development team.

## 1. Project Overview

Build a custom CMS primarily for:
- Company profile pages
- Articles / blog posts
- Reusable page sections
- Media management
- SEO controls
- Editorial workflow and publishing

The CMS should provide structured building blocks rather than a completely free-form visual page builder. Developers define supported section types and their fields; editors compose pages from those sections.

## 2. Preferred Architecture

The user asked whether both backend and frontend could use Next.js and be deployed on Vercel. **Yes: use a Next.js full-stack application** as the initial architecture, unless future requirements justify splitting services.

### Recommended stack

| Layer | Recommendation |
|---|---|
| Application | Next.js App Router |
| Language | TypeScript |
| UI | React, Tailwind CSS, shadcn/ui |
| Rich-text editor | Tiptap |
| Database | Managed PostgreSQL |
| ORM / migrations | Drizzle ORM |
| Hosting | Vercel |
| Media storage | Amazon S3 or Cloudflare R2 |
| Authentication | Auth.js or another established authentication solution |
| Validation | Zod |
| Testing | Vitest plus Playwright |
| Monitoring | Vercel logs plus an error-monitoring service |

These are recommendations, not hard requirements. Neon is one possible managed PostgreSQL provider.

## 3. Application Shape

Use one repository and a modular monolith to start.

```text
company-cms/
├── app/
│   ├── (public)/              # Public company website and article pages
│   ├── admin/                 # CMS dashboard
│   └── api/                   # Route handlers, if needed
├── components/
│   ├── sections/              # Renderers for approved page-section types
│   ├── editor/
│   └── ui/
├── modules/
│   ├── content/
│   ├── publishing/
│   ├── media/
│   ├── identity/
│   ├── seo/
│   └── settings/
├── lib/
│   ├── auth/
│   ├── db/
│   ├── storage/
│   └── validation/
├── drizzle/
├── tests/
└── package.json
```

Organize by business module and keep database access and authorization on the server. Avoid splitting into microservices before there is a concrete need.

## 4. Functional Requirements

### 4.1 Public website
- Homepage / company profile
- About, vision and mission, services, contact, and other configurable pages
- Article listing, categories, tags, and article detail pages
- Responsive layouts
- SEO-friendly URLs and metadata
- Sitemap, robots rules, canonical URLs, and social sharing metadata

### 4.2 Page builder using predefined sections
Developers define supported section types, for example:
- Hero / banner
- Rich-text content
- Image with text
- Feature or service cards
- Statistics
- Testimonials
- Call to action
- FAQ
- Contact information

Each section has a schema and a renderer. Editors can add, remove, reorder, and configure approved sections. Do not allow arbitrary executable code or unvalidated HTML as section content.

### 4.3 Articles and content editing
- Rich-text editor
- Title, slug, excerpt, body, cover image
- Categories and tags
- Draft, review, scheduled, published, and archived states as appropriate
- Author and publication timestamps
- Preview before publishing
- Slug uniqueness
- Revision history / restore capability

### 4.4 Media library
- Upload and manage images and documents
- Store files in S3-compatible object storage, not on ephemeral application disk
- Keep metadata in PostgreSQL
- Validate file size, extension, MIME type, and permissions
- Use signed uploads or signed URLs where appropriate
- Support alt text and descriptive filenames for accessibility and SEO

### 4.5 SEO
- Per-page and per-article title and description
- Canonical URL
- Open Graph / social metadata
- Slug management and redirect handling when published URLs change
- Sitemap generation
- Robots configuration
- Structured data where relevant

### 4.6 Administration and workflow
- Admin dashboard
- Roles such as Administrator, Editor, Author, and Publisher
- Permissions enforced on the server
- Publishing approval workflow if needed
- Audit trail for important actions
- Revision history
- Site-wide settings such as logo, contact details, and social links

## 5. Suggested Data Model

Use PostgreSQL. The exact schema should be refined during implementation.

### Core tables

- `users`: identity, display name, email, status
- `roles`: role definitions
- `user_roles`: user-to-role assignments
- `pages`: title, slug, status, SEO fields, publication fields
- `page_revisions`: versioned page content and author metadata
- `articles`: title, slug, excerpt, content, status, author, cover media, SEO fields, publication fields
- `article_revisions`: versioned article content
- `categories`: category name and slug
- `tags`: tag name and slug
- `article_categories`: article/category relation
- `article_tags`: article/tag relation
- `media_assets`: storage key, URL or delivery path, MIME type, size, dimensions, alt text, uploader
- `site_settings`: key/value or typed site configuration
- `audit_logs`: actor, action, target type/id, timestamp, and relevant metadata
- `redirects`: old path, new path, status code

### Page section representation

A page can store an ordered array of validated section objects in JSONB, or use normalized `page_sections` rows if querying and versioning individual sections becomes important.

Example conceptual payload:

```json
{
  "type": "hero",
  "version": 1,
  "data": {
    "heading": "Welcome to Our Company",
    "description": "What we do and why it matters",
    "imageId": "media-id",
    "ctaLabel": "Contact us",
    "ctaHref": "/contact"
  }
}
```

Validate section payloads against server-side schemas. Include a section schema version to support future changes.

## 6. API / Server Operations

With Next.js, use Server Components for server-rendered reads where suitable, Server Actions for form mutations, and Route Handlers for explicit HTTP APIs or integrations.

Example operations:
- `GET /api/articles`
- `GET /api/articles/[slug]`
- `POST /api/media/upload-url`
- `POST /api/articles`
- `PATCH /api/articles/[id]`
- `POST /api/articles/[id]/publish`
- `POST /api/pages`
- `PATCH /api/pages/[id]`
- `POST /api/pages/[id]/publish`

These endpoints are illustrative. Not every operation needs a public REST endpoint if the app is internal and uses Server Actions.

## 7. Security Requirements

- Treat every Server Action and Route Handler as an externally reachable entry point.
- Authenticate and authorize on the server for every protected operation.
- Do not rely on hiding buttons or admin routes in the frontend.
- Validate all input on the server.
- Use parameterized database access through the ORM.
- Protect sessions and cookies using secure framework-supported settings.
- Rate-limit sensitive actions such as login and upload URL creation.
- Restrict upload size and allowed content types; never trust the filename or browser-provided MIME type alone.
- Prevent stored XSS by sanitizing or safely rendering rich-text content.
- Keep secrets in environment variables; never expose server secrets through `NEXT_PUBLIC_*`.
- Use least-privilege database and object-storage credentials.
- Record audit events for sensitive actions.
- Configure backups and test restore procedures.

## 8. Vercel and Runtime Considerations

Vercel is a suitable deployment target for a standard CMS with typical CRUD operations, server rendering, and content publishing.

Plan for these constraints:
- Function execution duration and resource limits vary by runtime and plan.
- Avoid long-running jobs inside ordinary request handlers.
- Use a managed queue or background-job service if future tasks require reliable, lengthy processing.
- Use a separate service for workloads that need persistent processes or WebSockets.
- Use object storage for uploaded media rather than relying on local filesystem persistence.
- Configure database connection pooling appropriately for serverless deployments.
- If scheduled publishing is required, use a scheduler/cron mechanism and verify the limits and reliability requirements for the selected plan.

## 9. Rendering and Publishing Approach

- Public pages should be fast and SEO-friendly.
- Use server rendering and caching/revalidation where appropriate.
- Invalidate or revalidate the relevant page and article paths after publishing.
- Keep preview access protected and ensure unpublished content cannot leak through public queries or caches.
- Use explicit publication timestamps and a clear timezone policy for scheduled content.
- Ensure drafts and scheduled items are excluded from public listing queries.

## 10. Development Roadmap

### Phase 1 — Foundation
1. Create the Next.js TypeScript application.
2. Configure linting, formatting, environment variables, and tests.
3. Set up PostgreSQL and Drizzle migrations.
4. Implement authentication and server-side authorization.
5. Create the admin shell and role model.

### Phase 2 — Content
1. Implement article CRUD and slug validation.
2. Add rich-text editing and safe rendering.
3. Implement page CRUD and predefined section schemas.
4. Build section renderers for the public site.
5. Add draft/publish flow and preview.

### Phase 3 — Media and SEO
1. Integrate S3-compatible storage.
2. Build the media library and upload validation.
3. Add page/article SEO fields.
4. Generate sitemap and robots rules.
5. Add canonical URLs, social metadata, and redirects.

### Phase 4 — Reliability and launch
1. Add revisions and audit logs.
2. Add tests for permissions and publishing.
3. Add monitoring, backups, and restore verification.
4. Configure production environment and deployment.
5. Run accessibility, performance, security, and SEO checks.

## 11. Important Open Decision: Single Website or Multi-Tenant CMS?

A key question remains unresolved:

**Will this CMS manage only one company website, or will it serve multiple companies/sites from the same platform?**

If multi-tenant, design tenant isolation, domain mapping, tenant-aware authorization, and database constraints from the start. Do not assume a single-site schema can be safely converted later without changes.

## 12. Implementation Guidance for an AI Coding Assistant

Work incrementally rather than generating the entire application in one pass.

1. Confirm whether the CMS is single-site or multi-tenant.
2. Propose the schema and explain the key trade-offs before implementing it.
3. Create the project structure, database connection, migrations, and environment example.
4. Implement authentication and authorization before protected CRUD operations.
5. Add tests for role enforcement and access to drafts.
6. Build one vertical slice at a time: article CRUD, page sections, media, publishing, SEO.
7. Keep code typed, modular, documented, and deployable.
8. Do not hardcode credentials, bypass authorization for convenience, or claim tests pass without running them.

## 13. Reference Documentation

- Next.js Data Security: https://nextjs.org/docs/15/app/guides/data-security
- Next.js Authentication: https://nextjs.org/docs/app/guides/authentication
- Next.js Mutating Data: https://nextjs.org/docs/app/getting-started/mutating-data
- Next.js Backend for Frontend: https://nextjs.org/docs/app/guides/backend-for-frontend
- Vercel Functions limitations: https://vercel.com/docs/functions/limitations
- Vercel Function configuration: https://vercel.com/docs/functions/configuring-functions
- Vercel Cron usage and pricing: https://vercel.com/docs/cron-jobs/usage-and-pricing

---

**Status:** This document summarizes the CMS requirements and the recommended Next.js + Vercel direction discussed in chat. The single-site versus multi-tenant decision still needs confirmation.

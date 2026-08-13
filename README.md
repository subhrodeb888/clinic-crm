# Clinic Dashboard (Clinic CRM)

A full-stack internal clinic operations dashboard for **receptionists, doctors, and
admins**. It covers the day-to-day workflow of a small clinic: dashboards,
appointment scheduling, a live queue board, patient records with a full timeline,
doctor consultations, billing/invoices, reports, reminders, and role-based settings.

Beyond the operational UI, it includes a **Retrieval-Augmented Generation (RAG)**
feature: staff can upload a patient's medical documents (PDFs), which are chunked,
embedded, and stored in a vector database, then ask grounded questions about that
patient's records in a chat interface with inline source citations.

> **Note:** this project began as a frontend-only, mock-data prototype and has
> evolved into a full-stack application (PostgreSQL, authentication, object
> storage, and AI). Legacy mock data still lives in [`mock/`](./mock) for
> reference, but the active UI reads from the database through the service and
> repository layers.

---

## Features

- **Dashboard** — KPIs, appointment trends, revenue, patient growth, operational
  overview, recent activity, and quick actions.
- **Appointments** — table + calendar views, filters, create/edit, status updates,
  and queue-status transitions (30-minute slots).
- **Queue board** — kanban-style columns: *Waiting → Checked In → In Consultation
  → Completed*.
- **Patients** — searchable table with status badges, and a rich profile page
  (summary cards, sticky action bar, tabs) covering overview, appointments,
  billing, documents, prescriptions, and notes, plus a dated activity timeline.
- **Doctors** — a doctor dashboard plus a consultation workspace (patient context,
  clinical form, diagnosis, prescription builder).
- **Billing** — KPI strip, invoice table, invoice details drawer, and invoice
  creation with reconciling line items.
- **Reports** — KPI strip plus analytics charts (revenue, doctor performance,
  no-show rate, patient growth, appointments).
- **Reminders** — KPI strip, reminder table with status/type badges, detail drawer.
- **Settings** — clinic info, profile, password, notification preferences, and a
  staff table with role badges and permission indicators.
- **AI document chat (RAG)** — upload patient PDFs and ask grounded questions with
  inline `[N]` citations back to the source document and chunk.
- **Role-based access** — `admin`, `doctor`, and `receptionist` roles with a
  permission map (see [Authentication & Roles](#authentication--roles)).

---

## Tech Stack

| Layer            | Technology                                                                        |
| ---------------- | --------------------------------------------------------------------------------- |
| Framework        | Next.js 16 (App Router), React 19, TypeScript 5                                    |
| Styling          | Tailwind CSS v4, custom tokens in [`styles/theme.css`](./styles/theme.css)         |
| Database         | PostgreSQL via Neon + Drizzle ORM                                                  |
| Vector search    | `pgvector` extension with an HNSW cosine index                                    |
| Auth             | Auth.js v5 (Google OAuth, JWT sessions, Next.js 16 proxy)                          |
| Forms/Validation | React Hook Form + Zod                                                              |
| Data tables      | TanStack Table                                                                     |
| Charts           | Recharts                                                                           |
| Calendar         | React Big Calendar                                                                 |
| State            | Zustand                                                                            |
| AI               | OpenAI (`gpt-4o-mini` answers, `text-embedding-3-small` embeddings)                |
| Object storage   | Cloudflare R2 via AWS SDK v3                                                       |
| PDF parsing      | `pdf-parse`                                                                        |
| Seed data        | `tsx` + a deterministic synthetic-data generator                                   |

---

## Architecture

The codebase follows a strict layering so business rules stay server-side and
testable:

```
action (server action) → service (business logic) → repository (SQL via Drizzle) → db/schema
```

- **`actions/`** — server actions; the HTTP boundary. Validation (Zod) and
  authorization are applied here.
- **`services/`** — business logic with constructor-injected dependencies for
  testability (e.g., `chat.service.ts` injects search/prompt-builder/ai).
- **`repositories/`** — all SQL/Drizzle queries; the single source of DB access.
- **`db/schema/`** — Drizzle table definitions; **`drizzle/`** holds the generated
  SQL migrations.
- **`validations/`** — Zod schemas used at the action boundary.
- **`components/ui`** — reusable primitives (Button, Card, Badge, Drawer, Modal,
  Input, Select, Textarea, FormField, SearchInput, EmptyState, etc.).
- **`components/layout`** — dashboard shell, sidebars, top navbar;
  **`components/tables`** — a shared TanStack `DataTable`.
- **`features/*`** — feature-scoped modules (components, utils, schemas) per page.
- **`lib/`** — navigation, utils, auth (roles/permissions/guards), storage (R2),
  API auth.
- **`openai/`** — the server-only OpenAI client.

## Project Structure

```
clinic-dashboard/
├── actions/            # Server Actions (auth-guarded mutation/query entry points)
├── app/                # Next.js App Router pages + API routes
│   ├── api/            #   Route handlers (/api/auth, /api/ai/*)
│   ├── dashboard/      #   ...feature pages
│   ├── appointments/   #
│   ├── patients/       #
│   ├── doctors/        #
│   ├── billing/        #
│   ├── reports/        #
│   ├── reminders/      #
│   ├── queues/         #
│   ├── settings/       #
│   ├── login/          #
│   └── layout.tsx      #
├── components/         # Reusable UI (ui, layout, tables, dashboard)
├── constants/          # Shared constants (e.g. appointment TIME_SLOTS)
├── db/                 # Drizzle schema, relations, DB client, seed script
├── drizzle/            # Generated SQL migrations
├── features/           # Feature-scoped modules (components, utils, schemas)
├── lib/                # auth roles/permissions/guards, storage (R2), utils, navigation
├── mock/               # Legacy mock data (reference only)
├── openai/             # OpenAI client (server-only)
├── repositories/       # Data-access layer (Drizzle queries)
├── services/           # Business logic (service layer with constructor injection)
├── store/              # Zustand stores (e.g. sidebar)
├── styles/             # Global/theme CSS
├── types/              # Domain TypeScript types
└── validations/        # Zod schemas
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- A Neon PostgreSQL database with the `pgvector` extension enabled
- Google OAuth client credentials (for sign-in)
- (For AI features) an OpenAI API key
- (For document upload) a Cloudflare R2 bucket + API token

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example and fill it in:

```bash
cp .env.example .env.local
```

The dev server runs on **port 3001**, so set `AUTH_URL` accordingly. See the
[Environment Variables](#environment-variables) section for the full list.

### 3. Set up the database

```bash
npm run db:migrate   # apply the SQL migrations in ./drizzle
npm run db:seed      # seed a realistic, deterministic synthetic clinic dataset
```

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001). `/` redirects to
`/dashboard`. Sign in with your Google account — your email must already exist in
the `users` table (the seed provisions synthetic staff emails, so edit a seeded
email in `db/seed.ts` or the `users` table to match yours before signing in).

> **Port:** the dev server is configured to run on **3001** (see
> `package.json`), not Next.js's default 3000.

---

## Scripts

| Script                | Description                                            |
| --------------------- | ------------------------------------------------------ |
| `npm run dev`         | Start the dev server on port 3001                      |
| `npm run build`       | Create a production build                              |
| `npm run start`       | Start the production server                            |
| `npm run lint`        | Run ESLint                                             |
| `npm run db:generate` | Generate a Drizzle migration from `db/schema`          |
| `npm run db:migrate`  | Apply pending migrations to the database               |
| `npm run db:push`     | Push schema changes directly (dev)                     |
| `npm run db:studio`   | Open Drizzle Studio (DB explorer)                      |
| `npm run db:seed`     | Seed the database with deterministic synthetic data    |
| `npm run practice`    | Run the practice/search test script                    |

## Environment Variables

See [`.env.example`](./.env.example) for a template.

| Variable               | Required | Description                                                                                          |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`         | Yes      | Neon PostgreSQL connection string. Needs the `pgvector` extension for document embeddings.            |
| `AUTH_SECRET`          | Yes      | Auth.js secret. Generate with `npx auth secret`.                                                     |
| `AUTH_GOOGLE_ID`       | Yes      | Google OAuth client ID.                                                                               |
| `AUTH_GOOGLE_SECRET`   | Yes      | Google OAuth client secret.                                                                          |
| `AUTH_URL`             | Yes      | App base URL — `http://localhost:3001` in development.                                               |
| `OPENAI_API_KEY`       | AI       | Used for embeddings (`text-embedding-3-small`) and answers (`gpt-4o-mini`).                          |
| `R2_ACCOUNT_ID`        | Docs     | Cloudflare R2 account ID.                                                                            |
| `R2_ACCESS_KEY_ID`     | Docs     | Cloudflare R2 access key.                                                                            |
| `R2_SECRET_ACCESS_KEY` | Docs     | Cloudflare R2 secret key.                                                                            |
| `R2_BUCKET_NAME`       | Docs     | Cloudflare R2 bucket for document storage.                                                           |
| `CRM_API_KEY`          | AI API   | Bearer token for the `/api/ai/*` endpoints (alternative to a session for the AI booking agent).      |
| `CRM_BASE_URL`         | AI API   | Base URL used by the AI booking agent.                                                              |

---

## Authentication & Roles

- **Auth.js v5** with a **Google** provider and a **JWT** session strategy
  (stateless and Edge-compatible for the proxy).
- The `users` table is the **source of truth** for staff identity and role. On
  sign-in, the JWT callback resolves the provisioned user and attaches `id` and
  `role` to the session.
- **Route protection** is handled by the Next.js 16 proxy ([`proxy.ts`](./proxy.ts)).
  All page routes require an authenticated, provisioned user except `/login`;
  `/api/*` route handlers enforce their own auth and return `401` JSON (and
  `/api/auth/*` stays reachable for Auth.js).
- **Roles and permissions** are defined in [`lib/auth`](./lib/auth)
  ([`roles.ts`](./lib/auth/roles.ts), [`permissions.ts`](./lib/auth/permissions.ts),
  [`guards.ts`](./lib/auth/guards.ts)):

  | Role           | Permissions                                                                 |
  | -------------- | --------------------------------------------------------------------------- |
  | `admin`        | All (`"*"`)                                                                  |
  | `doctor`       | `patients.read`, `appointments.read`, `consultations.manage`, `ai.generate`  |
  | `receptionist` | `patients.manage`, `appointments.manage`, `billing.manage`, `reminders.manage` |

  A `resource.manage` permission implies `resource.read` for that resource (see
  `can()` in [`permissions.ts`](./lib/auth/permissions.ts)).
- **Patient-document authorization** is scoped per patient by
  [`document-authorization.service.ts`](./services/document-authorization.service.ts):
  admins and receptionists can access all patients, while doctors are limited to
  their assigned patients.
- **Enforcement:** protected server actions call `requireAuth()`,
  `requirePermission()`, or `requireRole()` (from [`guards.ts`](./lib/auth/guards.ts))
  before touching data — the permission map is the source of truth, and UI gating
  is only a convenience. The `/api/ai/*` endpoints authenticate via a browser
  session or a shared `CRM_API_KEY` compared with a constant-time check
  ([`lib/api-auth.ts`](./lib/api-auth.ts)).

## AI / RAG Document Chat

A grounded Q&A feature over patient documents:

1. **Upload** — a PDF is validated (PDF only, ≤ 20 MB), uploaded to Cloudflare R2,
   and its metadata saved to the `documents` table.
2. **Process** — the file is downloaded back, text is extracted with `pdf-parse`,
   cleaned, and chunked (800 chars with 200 overlap).
3. **Embed** — each chunk is embedded with OpenAI `text-embedding-3-small` (1536
   dimensions) and stored in the `document_chunks` table with a pgvector HNSW
   cosine index.
4. **Ask** — a question is embedded, then a similarity search retrieves the most
   relevant chunks, **isolated to the patient** and only from `READY` documents.
5. **Answer** — retrieved chunks plus a strict system prompt (use only the
   context, support every statement with `[N]` citations, never invent data)
   generate a `gpt-4o-mini` answer.
6. **Persist** — the user question and assistant answer (with its citation map)
   are stored in a per-patient chat session.

The pipeline is split into focused services (`pdf`, `text-cleaner`, `chunking`,
`embedding`, `search`, `prompt-builder`, `ai`, `chat`, `document`,
`document-processing`, `storage`, `document-authorization`) so each stage can be
tested and swapped independently.

### AI API endpoints

The `/api/ai/*` routes serve the external booking agent and are protected by a
browser session **or** an `Authorization: Bearer <CRM_API_KEY>` header.

| Method | Endpoint                          | Description                                         |
| ------ | --------------------------------- | --------------------------------------------------- |
| POST   | `/api/ai/patients`                | Create a patient                                    |
| GET    | `/api/ai/patients/search?query=`  | Search patients by query                            |
| GET    | `/api/ai/doctors`                 | List doctors (optionally by specialization)         |
| GET    | `/api/ai/doctors/:id/slots?date=` | Return a doctor's available slots for a date        |
| GET    | `/api/ai/appointments`            | List appointments (optionally by `patientId`)       |
| POST   | `/api/ai/appointments`            | Create an appointment                               |
| PATCH  | `/api/ai/appointments/:id`        | Update an appointment                               |

---

## Database Schema

Defined with Drizzle ORM in [`db/schema`](./db/schema) (20 tables):

- **Auth:** `users`, `accounts`, `sessions`, `verification_tokens`
- **Clinical:** `doctors`, `patients`, `appointments`, `consultations`,
  `prescriptions`, `prescription_items`
- **Billing:** `invoices`, `invoice_items`
- **Operations:** `reminders`, `notifications`, `activity_logs`, `ai_usage_logs`
- **Documents & AI:** `documents`, `document_chunks` (pgvector), `chat_sessions`,
  `chat_messages`

Migrations are versioned in [`drizzle/`](./drizzle), including the `pgvector`
extension setup and the HNSW embedding index.

### Seeding

`npm run db:seed` runs a **deterministic** generator (seeded PRNG) that first
clears all tables, then inserts a coherent synthetic dataset:

- 7 users (1 admin, 2 receptionists, 4 doctors), 4 doctors, 40 patients
- 74 appointments (today's queue states, upcoming, completed, cancelled/no-show)
- 43 consultations, 43 prescriptions (123 items)
- 43 invoices with 139 reconciling line items (patient balances synced)
- 31 reminders, 30 notifications, 255 activity logs, 40 AI-usage logs
- 10 documents / 50 chunks (real embeddings when `OPENAI_API_KEY` is set) plus 2
  chat sessions / 4 messages for the RAG demo

---

## Design System

A quiet, operational admin-dashboard language: white cards, gray borders, blue
(`#2563eb`) primary actions, status colors, compact typography, and responsive
grids. Shared primitives live in [`components/ui`](./components/ui). The full
system is documented in [`design-system.md`](./design-system.md).

---

## License

Private — no license specified.
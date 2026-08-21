# AirWirk

**Everything work. One flow.**

People, work, growth and organization — connected in one intelligent workspace.

This repository is the AirWirk V0 demonstration: a public landing page, a guest demo, an interactive home, and AirWirk To Do. It is not a complete HRIS.

## Product idea

AirWirk is designed as an operating system for work. Complexity stays underneath. The surface is simple, calm, and personal.

The core experience is **NOW → NEXT → FLOW**.

## Stack

- Next.js 15
- TypeScript
- Tailwind CSS 4
- pnpm

## Development

### Prerequisites

- Node.js 22+
- pnpm 10+

### Setup

```bash
pnpm install
```

### Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server on port 3000 |
| `pnpm build` | Create a production build |
| `pnpm start` | Run the production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript type checking |

Open [http://localhost:3000](http://localhost:3000) for the public landing page. Guest exploration lives at `/demo`. Home lives at `/home`. AirWirk To Do lives at `/todo` and stores tasks in the browser. `/workspace` redirects to `/home`. `/notes` and `/you` are reserved and not built yet.

Ask AirWirk uses local mock responses from demo data. There is no AI API, database, or authentication in V0.

## Public routes

| Route | Role |
| --- | --- |
| `/` | Public landing / product showcase |
| `/home` | User home (existing workspace experience) |
| `/demo` | Guest exploration (same experience, no org account) |
| `/todo` | AirWirk To Do |
| `/notes` | Reserved — not built |
| `/you` | Reserved — not built |
| `/workspace` | Redirects to `/home` |

## Vercel deployment

This is a standard Next.js App Router app. Vercel should detect Next.js automatically.

| Setting | Value |
| --- | --- |
| Framework | Next.js |
| Node.js | 22.x |
| Package manager | pnpm (`packageManager` in `package.json`) |
| Install command | `pnpm install` |
| Build command | `pnpm build` |
| Output directory | Leave default (do not set `out`) |
| Environment variables | None required |

Routes included in the production build: `/`, `/demo`, `/home`, `/todo`, and the nested home/demo pages. `/todo` is a static App Router page (`src/app/todo/page.tsx`). Task data stays in the browser (`localStorage`); no backend is required.

Do not enable static HTML export (`output: "export"`). The App Router build already prerenders these routes.

# AirWirk

**Everything work. One flow.**

People, work, growth and organization — connected in one intelligent workspace.

This repository is the AirWirk V0 demonstration: a public landing page and an interactive workspace. It is not a complete HRIS.

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

Open [http://localhost:3000](http://localhost:3000) for the landing page. The workspace lives at `/workspace`. AirWirk To Do lives at `/todo` and stores tasks in the browser.

Ask AirWirk uses local mock responses from demo data. There is no AI API, database, or authentication in V0.

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

Routes included in the production build: `/`, `/todo`, `/workspace`, and the nested workspace pages. `/todo` is a static App Router page (`src/app/todo/page.tsx`). Task data stays in the browser (`localStorage`); no backend is required.

Do not enable static HTML export (`output: "export"`). The App Router build already prerenders these routes.

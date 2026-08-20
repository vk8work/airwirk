"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { useWorkspace } from "@/components/workspace/WorkspaceProvider";
import { demoUser } from "@/data/demo";
import { isNavActive, workspaceNav } from "@/lib/nav";

export function WorkspaceShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { openAsk } = useWorkspace();

  return (
    <div className="atmosphere min-h-screen">
      <a
        href="#workspace-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-[#06241e]"
      >
        Skip to workspace
      </a>

      <div className="mx-auto flex min-h-screen max-w-[1400px]">
        <aside className="sticky top-0 hidden h-screen w-[220px] shrink-0 flex-col border-r border-[var(--line)] px-4 py-5 md:flex">
          <Link href="/" className="px-2">
            <Logo />
          </Link>
          <p className="mt-8 px-2 text-[11px] uppercase tracking-[0.2em] text-muted">
            Workspace
          </p>
          <nav className="mt-3 flex flex-1 flex-col gap-1" aria-label="Primary">
            {workspaceNav.map((item) => {
              const active = isNavActive(item.id, pathname);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`rounded-xl px-3 py-2.5 text-sm transition ${
                    active
                      ? "bg-white/10 text-ink"
                      : "text-ink-soft hover:bg-white/5 hover:text-ink"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => openAsk()}
            className="mb-2 rounded-xl border border-[var(--line)] px-3 py-2.5 text-left text-sm text-ink-soft hover:text-ink"
          >
            Ask AirWirk
            <span className="mt-1 block font-mono text-[10px] text-muted">
              ⌘K
            </span>
          </button>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col pb-20 md:pb-0">
          <header className="glass sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-[var(--line)] px-4 py-3 sm:px-8">
            <div className="md:hidden">
              <Link href="/workspace">
                <Logo />
              </Link>
            </div>
            <div className="hidden min-w-0 md:block">
              <p className="truncate text-sm text-ink-soft">
                {demoUser.fullName} · {demoUser.role} · {demoUser.team}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="hidden rounded-full px-3 py-2 text-sm text-ink-soft hover:text-ink sm:inline"
              >
                Back to AirWirk
              </Link>
              <button
                type="button"
                onClick={() => openAsk()}
                className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-[#06241e]"
              >
                Ask AirWirk
              </button>
            </div>
          </header>

          <main id="workspace-main" className="flex-1 px-4 py-8 sm:px-8">
            {children}
          </main>
        </div>
      </div>

      <nav
        className="glass fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] md:hidden"
        aria-label="Primary mobile"
      >
        <ul className="grid grid-cols-5">
          {workspaceNav.map((item) => {
            const active = isNavActive(item.id, pathname);
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`flex w-full flex-col items-center py-3 text-[11px] ${
                    active ? "text-accent" : "text-muted"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

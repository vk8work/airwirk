"use client";

import Link from "next/link";
import { useWorkspace } from "@/components/workspace/WorkspaceProvider";
import type { RelatedLink } from "@/lib/types";

export function BackLink({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  const { to } = useWorkspace();
  return (
    <Link
      href={to(href)}
      className="text-sm text-ink-soft transition hover:text-ink"
    >
      ← {children}
    </Link>
  );
}

export function RelatedLinks({ links }: { links: RelatedLink[] }) {
  const { to } = useWorkspace();
  if (links.length === 0) return null;
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {links.map((link) => (
        <li key={link.href + link.label}>
          <Link
            href={to(link.href)}
            className="inline-flex rounded-full border border-[var(--line)] px-3 py-1.5 text-xs text-ink-soft transition hover:border-[var(--line-strong)] hover:text-ink"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

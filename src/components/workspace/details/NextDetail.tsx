"use client";

import { BackLink, RelatedLinks } from "@/components/ui/RelatedLinks";
import { useWorkspace } from "@/components/workspace/WorkspaceProvider";
import type { UpcomingItem } from "@/lib/types";

export function NextDetail({ item }: { item: UpcomingItem }) {
  const { openAsk } = useWorkspace();

  return (
    <div className="rise mx-auto max-w-3xl">
      <BackLink href="/workspace">Home</BackLink>
      <p className="mt-6 font-mono text-xs tracking-[0.22em] text-accent">NEXT</p>
      <h1 className="display mt-3 text-4xl font-semibold">{item.title}</h1>
      <p className="mt-3 text-sm text-muted">
        {item.when} · {item.meta}
      </p>
      <p className="mt-6 text-base leading-relaxed text-ink-soft">
        {item.context}
      </p>
      <button
        type="button"
        onClick={() => openAsk("What should I prepare for next?")}
        className="mt-6 text-sm text-accent hover:underline"
      >
        Ask AirWirk what to prepare
      </button>
      <h2 className="mt-10 font-mono text-xs tracking-[0.22em] text-muted">
        Connected
      </h2>
      <RelatedLinks links={item.related} />
    </div>
  );
}

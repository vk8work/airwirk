"use client";

import { BackLink, RelatedLinks } from "@/components/ui/RelatedLinks";
import { useWorkspace } from "@/components/workspace/WorkspaceProvider";
import type { Insight } from "@/lib/types";

export function InsightDetail({ insight }: { insight: Insight }) {
  const { openAsk } = useWorkspace();

  return (
    <div className="rise mx-auto max-w-3xl">
      <BackLink href="/workspace/insights">Insights</BackLink>
      <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-muted">
        {insight.dimensions.join(" · ")}
      </p>
      <h1 className="display mt-3 text-4xl font-semibold">{insight.title}</h1>
      <p className="mt-6 text-base leading-relaxed text-ink-soft">
        {insight.body}
      </p>
      <button
        type="button"
        onClick={() => openAsk("What should I prepare for next?")}
        className="mt-6 text-sm text-accent hover:underline"
      >
        Ask AirWirk about this connection
      </button>
      <h2 className="mt-10 font-mono text-xs tracking-[0.22em] text-muted">
        Open the related pieces
      </h2>
      <RelatedLinks links={insight.related} />
    </div>
  );
}

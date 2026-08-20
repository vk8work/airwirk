"use client";

import { BackLink, RelatedLinks } from "@/components/ui/RelatedLinks";
import { Surface } from "@/components/ui/Surface";
import { useWorkspace } from "@/components/workspace/WorkspaceProvider";
import type { AttentionItem } from "@/lib/types";

const kindLabel: Record<AttentionItem["kind"], string> = {
  decision: "Decision",
  task: "Work",
  people: "People",
  growth: "Growth",
};

export function NowDetail({ item }: { item: AttentionItem }) {
  const { openAsk, isNowHandled, toggleNowHandled } = useWorkspace();
  const handled = isNowHandled(item.id);

  return (
    <div className="rise mx-auto max-w-3xl">
      <BackLink href="/workspace">Home</BackLink>
      <p className="mt-6 font-mono text-xs tracking-[0.22em] text-accent">NOW</p>
      <h1 className="display mt-3 text-4xl font-semibold">{item.title}</h1>
      <p className="mt-3 text-sm text-muted">
        {kindLabel[item.kind]} · {item.due}
      </p>
      <p className="mt-6 text-base leading-relaxed text-ink-soft">
        {item.context}
      </p>
      {handled ? (
        <Surface className="mt-6 p-5">
          <p className="text-sm text-ink">Handled for today.</p>
          <p className="mt-2 text-sm text-ink-soft">
            It will leave NOW on Home until you restore it.
          </p>
        </Surface>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => toggleNowHandled(item.id)}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-[#06241e]"
        >
          {handled ? "Restore to NOW" : item.completeLabel}
        </button>
        <button
          type="button"
          onClick={() => openAsk(item.askPrompt)}
          className="rounded-full border border-[var(--line-strong)] px-5 py-2.5 text-sm text-ink-soft hover:text-ink"
        >
          Ask AirWirk
        </button>
      </div>
      <h2 className="mt-10 font-mono text-xs tracking-[0.22em] text-muted">
        Connected
      </h2>
      <RelatedLinks links={item.related} />
    </div>
  );
}

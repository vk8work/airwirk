"use client";

import {
  attentionNow,
  flowMetrics,
  upcomingNext,
} from "@/data/demo";
import type { AttentionItem, WorkspaceView } from "@/lib/types";
import { Surface } from "@/components/ui/Surface";

type HomeViewProps = {
  greeting: string;
  onOpenAsk: (prompt?: string) => void;
  onNavigate: (view: WorkspaceView) => void;
};

const kindLabel: Record<AttentionItem["kind"], string> = {
  decision: "Decision",
  task: "Work",
  people: "People",
  growth: "Growth",
};

export function HomeView({ greeting, onOpenAsk, onNavigate }: HomeViewProps) {
  return (
    <div className="rise mx-auto max-w-5xl">
      <p className="text-xs uppercase tracking-[0.24em] text-accent">Home</p>
      <h1 className="display mt-3 text-4xl font-semibold sm:text-5xl">
        {greeting}
      </h1>
      <p className="mt-3 max-w-xl text-lg text-ink-soft">
        Here’s your flow today.
      </p>
      <button
        type="button"
        onClick={() => onOpenAsk("What should I focus on today?")}
        className="mt-6 text-sm text-accent hover:underline"
      >
        Ask AirWirk what to focus on
      </button>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <section aria-labelledby="now-heading">
          <h2 id="now-heading" className="font-mono text-xs tracking-[0.22em] text-accent">
            NOW
          </h2>
          <ul className="mt-4 space-y-3">
            {attentionNow.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => item.href && onNavigate(item.href)}
                  className="w-full text-left"
                >
                  <Surface className="p-5 transition hover:bg-[var(--surface-strong)]">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                      {kindLabel[item.kind]} · {item.due}
                    </p>
                    <p className="mt-2 text-base font-medium">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {item.context}
                    </p>
                  </Surface>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-10">
          <section aria-labelledby="next-heading">
            <h2 id="next-heading" className="font-mono text-xs tracking-[0.22em] text-accent">
              NEXT
            </h2>
            <ol className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {upcomingNext.map((item) => (
                <li key={item.id} className="py-3">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-1 text-xs text-muted">
                    {item.when} · {item.meta}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="flow-heading">
            <h2 id="flow-heading" className="font-mono text-xs tracking-[0.22em] text-accent">
              FLOW
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {flowMetrics.map((metric) => (
                <li key={metric.id}>
                  <Surface className="p-4">
                    <p className="text-xs text-muted">{metric.label}</p>
                    <p className="display mt-2 text-3xl font-semibold">
                      {metric.value}
                      <span className="text-base text-muted">%</span>
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                      {metric.caption}
                    </p>
                  </Surface>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

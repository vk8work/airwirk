"use client";

import Link from "next/link";
import { Surface } from "@/components/ui/Surface";
import { useWorkspace } from "@/components/workspace/WorkspaceProvider";
import { insights } from "@/data/demo";

export function InsightsView() {
  const { openAsk } = useWorkspace();

  return (
    <div className="rise mx-auto max-w-5xl">
      <p className="text-xs uppercase tracking-[0.24em] text-accent">Insights</p>
      <h1 className="display mt-3 text-4xl font-semibold">
        How the pieces connect.
      </h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Organization shows up as work. Growth shows up in rooms. People are the
        constraint and the momentum.
      </p>
      <button
        type="button"
        onClick={() => openAsk("What should I prepare for next?")}
        className="mt-6 text-sm text-accent hover:underline"
      >
        Ask AirWirk what to prepare next
      </button>

      <ul className="mt-10 space-y-4">
        {insights.map((insight) => (
          <li key={insight.id}>
            <Link href={`/workspace/insights/${insight.id}`} className="block">
              <Surface className="p-5 transition hover:bg-[var(--surface-strong)] sm:p-6">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                  {insight.dimensions.join(" · ")}
                </p>
                <h2 className="mt-3 text-xl font-medium">{insight.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {insight.body}
                </p>
              </Surface>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

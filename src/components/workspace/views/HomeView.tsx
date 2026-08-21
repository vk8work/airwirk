"use client";

import Link from "next/link";
import { Surface } from "@/components/ui/Surface";
import { useWorkspace } from "@/components/workspace/WorkspaceProvider";
import { attentionNow, flowMetrics, upcomingNext } from "@/data/demo";
import type { AttentionItem } from "@/lib/types";

const kindLabel: Record<AttentionItem["kind"], string> = {
  decision: "Decision",
  task: "Work",
  people: "People",
  growth: "Growth",
};

function greetingForNow() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning.";
  if (hour < 18) return "Good afternoon.";
  return "Good evening.";
}

export function HomeView() {
  const { openAsk, isNowHandled, to } = useWorkspace();
  const greeting = greetingForNow();
  const openNow = attentionNow.filter((item) => !isNowHandled(item.id));
  const handledNow = attentionNow.filter((item) => isNowHandled(item.id));

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
        onClick={() => openAsk("What should I focus on today?")}
        className="mt-6 text-sm text-accent hover:underline"
      >
        Ask AirWirk what to focus on
      </button>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <section aria-labelledby="now-heading">
          <h2
            id="now-heading"
            className="font-mono text-xs tracking-[0.22em] text-accent"
          >
            NOW
          </h2>
          {openNow.length === 0 ? (
            <Surface className="mt-4 p-5">
              <p className="text-sm text-ink">NOW is clear.</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Nothing needs attention in this moment. NEXT is still on the
                calendar — prepare, don’t invent more work.
              </p>
            </Surface>
          ) : (
            <ul className="mt-4 space-y-3">
              {openNow.map((item) => (
                <li key={item.id}>
                  <Link href={to(item.href)} className="block">
                    <Surface className="p-5 transition hover:bg-[var(--surface-strong)]">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                        {kindLabel[item.kind]} · {item.due}
                      </p>
                      <p className="mt-2 text-base font-medium">{item.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {item.context}
                      </p>
                    </Surface>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {handledNow.length > 0 ? (
            <p className="mt-4 text-xs text-muted">
              Handled today: {handledNow.map((item) => item.title).join(" · ")}
            </p>
          ) : null}
        </section>

        <div className="space-y-10">
          <section aria-labelledby="next-heading">
            <h2
              id="next-heading"
              className="font-mono text-xs tracking-[0.22em] text-accent"
            >
              NEXT
            </h2>
            <ol className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {upcomingNext.map((item) => (
                <li key={item.id}>
                  <Link
                    href={to(item.href)}
                    className="block py-3 transition hover:text-accent"
                  >
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="mt-1 text-xs text-muted">
                      {item.when} · {item.meta}
                    </p>
                  </Link>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="flow-heading">
            <h2
              id="flow-heading"
              className="font-mono text-xs tracking-[0.22em] text-accent"
            >
              FLOW
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {flowMetrics.map((metric) => (
                <li key={metric.id}>
                  <Link href={to(metric.href)} className="block h-full">
                    <Surface className="h-full p-4 transition hover:bg-[var(--surface-strong)]">
                      <p className="text-xs text-muted">{metric.label}</p>
                      <p className="display mt-2 text-3xl font-semibold">
                        {metric.value}
                        <span className="text-base text-muted">%</span>
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                        {metric.caption}
                      </p>
                    </Surface>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

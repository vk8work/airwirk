"use client";

import Link from "next/link";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Surface } from "@/components/ui/Surface";
import { useWorkspace } from "@/components/workspace/WorkspaceProvider";
import { goalById, goals, learning } from "@/data/demo";

export function GrowthView() {
  const { isLearningDone, toggleLearningDone, to } = useWorkspace();

  return (
    <div className="rise mx-auto max-w-5xl">
      <p className="text-xs uppercase tracking-[0.24em] text-accent">Growth</p>
      <h1 className="display mt-3 text-4xl font-semibold">
        How you are growing.
      </h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Goals and learning attached to rooms already on the calendar — not a
        catalog of courses.
      </p>

      <section className="mt-10 space-y-4" aria-label="Goals">
        {goals.map((goal) => (
          <Link
            key={goal.id}
            href={to(`/workspace/growth/${goal.id}`)}
            className="block"
          >
            <Surface className="p-5 transition hover:bg-[var(--surface-strong)] sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-medium">{goal.title}</h2>
                <p className="text-xs text-muted">{goal.horizon}</p>
              </div>
              <div className="mt-4">
                <ProgressBar value={goal.progress} label={`${goal.title} progress`} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {goal.signal}
              </p>
            </Surface>
          </Link>
        ))}
      </section>

      <section className="mt-12" aria-labelledby="learning-heading">
        <h2
          id="learning-heading"
          className="font-mono text-xs tracking-[0.22em] text-muted"
        >
          Learning
        </h2>
        <ul className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {learning.map((item) => {
            const done = isLearningDone(item.id);
            const goal = goalById(item.relatedGoalId);
            return (
              <li
                key={item.id}
                className="grid gap-3 py-4 sm:grid-cols-[6rem_1fr_auto] sm:items-center"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-accent">
                  {done ? "Done" : item.kind}
                </p>
                <div>
                  <Link
                    href={to(`/workspace/growth/${item.relatedGoalId}`)}
                    className={`text-sm font-medium hover:text-accent ${
                      done ? "text-muted line-through" : ""
                    }`}
                  >
                    {item.title}
                  </Link>
                  <p className="mt-1 text-xs text-muted">
                    Supports {goal?.title} · {item.when}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleLearningDone(item.id)}
                  className="justify-self-start rounded-full border border-[var(--line)] px-3 py-1.5 text-xs text-ink-soft hover:text-ink sm:justify-self-end"
                >
                  {done ? "Restore" : "Mark done"}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { BackLink } from "@/components/ui/RelatedLinks";
import { Surface } from "@/components/ui/Surface";
import { useWorkspace } from "@/components/workspace/WorkspaceProvider";
import { learningByGoal, personById, projectById } from "@/data/demo";
import type { Goal } from "@/lib/types";

export function GoalDetail({ goal }: { goal: Goal }) {
  const { openAsk, isLearningDone, toggleLearningDone, to } = useWorkspace();
  const relatedProjects = goal.projectIds
    .map((id) => projectById(id))
    .filter((project) => project != null);
  const relatedPeople = goal.peopleIds
    .map((id) => personById(id))
    .filter((person) => person != null);
  const items = learningByGoal(goal.id);

  return (
    <div className="rise mx-auto max-w-3xl">
      <BackLink href="/workspace/growth">Growth</BackLink>
      <p className="mt-6 text-xs uppercase tracking-[0.24em] text-accent">
        {goal.horizon}
      </p>
      <h1 className="display mt-3 text-4xl font-semibold">{goal.title}</h1>
      <div className="mt-5">
        <ProgressBar value={goal.progress} label={`${goal.title} progress`} />
      </div>
      <p className="mt-6 text-base leading-relaxed text-ink-soft">{goal.detail}</p>
      <p className="mt-3 text-sm text-ink">{goal.signal}</p>
      <button
        type="button"
        onClick={() => openAsk("What should I prepare for next?")}
        className="mt-5 text-sm text-accent hover:underline"
      >
        Ask AirWirk what to prepare next
      </button>

      <section className="mt-10 grid gap-3 sm:grid-cols-2">
        {relatedProjects.map((project) => (
          <Link key={project.id} href={to(`/workspace/work/${project.id}`)}>
            <Surface className="h-full p-5 transition hover:bg-[var(--surface-strong)]">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">
                Work
              </p>
              <p className="mt-2 font-medium">{project.name}</p>
            </Surface>
          </Link>
        ))}
        {relatedPeople.map((person) => (
          <Link key={person.id} href={to(`/workspace/people/${person.id}`)}>
            <Surface className="h-full p-5 transition hover:bg-[var(--surface-strong)]">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">
                People
              </p>
              <p className="mt-2 font-medium">{person.name}</p>
              <p className="mt-1 text-sm text-ink-soft">{person.status}</p>
            </Surface>
          </Link>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs tracking-[0.22em] text-muted">
          Learning on this goal
        </h2>
        {items.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No learning items attached.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {items.map((item) => {
              const done = isLearningDone(item.id);
              return (
                <li key={item.id}>
                  <Surface className="p-5">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                      {item.kind} · {item.when}
                    </p>
                    <p className={`mt-2 font-medium ${done ? "text-muted line-through" : ""}`}>
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm text-ink-soft">{item.summary}</p>
                    <button
                      type="button"
                      onClick={() => toggleLearningDone(item.id)}
                      className="mt-4 rounded-full border border-[var(--line)] px-3 py-1.5 text-xs text-ink-soft hover:text-ink"
                    >
                      {done ? "Restore" : "Mark done"}
                    </button>
                  </Surface>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

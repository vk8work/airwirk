"use client";

import Link from "next/link";
import { BackLink } from "@/components/ui/RelatedLinks";
import { Surface } from "@/components/ui/Surface";
import { useWorkspace } from "@/components/workspace/WorkspaceProvider";
import { activityByPerson, goalById, projectById } from "@/data/demo";
import type { Person } from "@/lib/types";

export function PersonDetail({ person }: { person: Person }) {
  const { openAsk, to } = useWorkspace();
  const relatedProjects = person.projectIds
    .map((id) => projectById(id))
    .filter((project) => project != null);
  const relatedGoals = person.relatedGoalIds
    .map((id) => goalById(id))
    .filter((goal) => goal != null);
  const recent = activityByPerson(person.id);

  return (
    <div className="rise mx-auto max-w-3xl">
      <BackLink href="/workspace/people">People</BackLink>
      <div className="mt-6 flex items-center gap-4">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--line)] text-sm text-accent"
          aria-hidden="true"
        >
          {person.initials}
        </span>
        <div>
          <h1 className="display text-4xl font-semibold">{person.name}</h1>
          <p className="mt-1 text-sm text-muted">{person.role}</p>
        </div>
      </div>
      <p className="mt-6 text-base">{person.status}</p>
      <p className="mt-3 text-base leading-relaxed text-ink-soft">
        {person.focus}
      </p>
      <button
        type="button"
        onClick={() => openAsk(`Who needs my attention?`)}
        className="mt-5 text-sm text-accent hover:underline"
      >
        Ask AirWirk who needs attention
      </button>

      <section className="mt-10 grid gap-3 sm:grid-cols-2">
        {relatedProjects.map((project) => (
          <Link key={project.id} href={to(`/workspace/work/${project.id}`)}>
            <Surface className="h-full p-5 transition hover:bg-[var(--surface-strong)]">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">
                Work
              </p>
              <p className="mt-2 font-medium">{project.name}</p>
              <p className="mt-2 text-sm text-ink-soft">{project.summary}</p>
            </Surface>
          </Link>
        ))}
        {relatedGoals.map((goal) => (
          <Link key={goal.id} href={to(`/workspace/growth/${goal.id}`)}>
            <Surface className="h-full p-5 transition hover:bg-[var(--surface-strong)]">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">
                Growth
              </p>
              <p className="mt-2 font-medium">{goal.title}</p>
              <p className="mt-2 text-sm text-ink-soft">{goal.signal}</p>
            </Surface>
          </Link>
        ))}
      </section>

      {recent.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-mono text-xs tracking-[0.22em] text-muted">
            Recent activity
          </h2>
          <ul className="mt-3 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {recent.map((item) => (
              <li key={item.id} className="py-3 text-sm text-ink-soft">
                {item.action}
                <span className="mt-1 block text-xs text-muted">{item.time}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

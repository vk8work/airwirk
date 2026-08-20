"use client";

import Link from "next/link";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { BackLink, RelatedLinks } from "@/components/ui/RelatedLinks";
import { Surface } from "@/components/ui/Surface";
import { TaskList } from "@/components/workspace/TaskList";
import { useWorkspace } from "@/components/workspace/WorkspaceProvider";
import {
  goalById,
  personById,
  tasksByProject,
} from "@/data/demo";
import type { Project } from "@/lib/types";

const statusColor: Record<Project["status"], string> = {
  "On track": "text-accent",
  "At risk": "text-[var(--warn)]",
  Steady: "text-ink-soft",
};

export function ProjectDetail({ project }: { project: Project }) {
  const { openAsk, taskStatus } = useWorkspace();
  const projectTasks = tasksByProject(project.id);
  const people = project.peopleIds
    .map((id) => personById(id))
    .filter((person) => person != null);
  const relatedGoals = project.relatedGoalIds
    .map((id) => goalById(id))
    .filter((goal) => goal != null);

  return (
    <div className="rise mx-auto max-w-3xl">
      <BackLink href="/workspace/work">Work</BackLink>
      <p className="mt-6 text-xs uppercase tracking-[0.24em] text-accent">
        Project
      </p>
      <h1 className="display mt-3 text-4xl font-semibold">{project.name}</h1>
      <p className={`mt-3 text-sm ${statusColor[project.status]}`}>
        {project.status} · {project.progress}% · Next {project.nextMilestone}
      </p>
      <div className="mt-5">
        <ProgressBar
          value={project.progress}
          label={`${project.name} progress`}
        />
      </div>
      <p className="mt-6 text-base leading-relaxed text-ink-soft">
        {project.detail}
      </p>
      <button
        type="button"
        onClick={() => openAsk(`How is ${project.name} progressing?`)}
        className="mt-5 text-sm text-accent hover:underline"
      >
        Ask AirWirk about {project.name}
      </button>

      <section className="mt-10">
        <h2 className="font-mono text-xs tracking-[0.22em] text-muted">
          People in this work
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {people.map((person) => (
            <li key={person.id}>
              <Link
                href={`/workspace/people/${person.id}`}
                className="inline-flex rounded-full border border-[var(--line)] px-3 py-1.5 text-xs text-ink-soft hover:text-ink"
              >
                {person.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {relatedGoals.length > 0 ? (
        <section className="mt-8">
          <h2 className="font-mono text-xs tracking-[0.22em] text-muted">
            Connected growth
          </h2>
          <RelatedLinks
            links={relatedGoals.map((goal) => ({
              label: goal.title,
              href: `/workspace/growth/${goal.id}`,
            }))}
          />
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="font-mono text-xs tracking-[0.22em] text-muted">Tasks</h2>
        <TaskList tasks={projectTasks.filter((task) => taskStatus(task) !== "Done")} />
        {projectTasks.some((task) => taskStatus(task) === "Done") ? (
          <div className="mt-6">
            <h3 className="text-xs uppercase tracking-[0.16em] text-muted">
              Done
            </h3>
            <TaskList
              tasks={projectTasks.filter((task) => taskStatus(task) === "Done")}
            />
          </div>
        ) : null}
      </section>

      <Surface className="mt-10 p-5">
        <p className="text-sm text-muted">Owner</p>
        <p className="mt-1 text-sm">{project.owner}</p>
      </Surface>
    </div>
  );
}

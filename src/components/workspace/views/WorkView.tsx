"use client";

import Link from "next/link";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Surface } from "@/components/ui/Surface";
import { TaskList } from "@/components/workspace/TaskList";
import { projectById, projects, tasks } from "@/data/demo";
import { useWorkspace } from "@/components/workspace/WorkspaceProvider";

const statusColor: Record<(typeof projects)[number]["status"], string> = {
  "On track": "text-accent",
  "At risk": "text-[var(--warn)]",
  Steady: "text-ink-soft",
};

export function WorkView() {
  const { taskStatus, to } = useWorkspace();
  const openTasks = tasks.filter((task) => taskStatus(task) !== "Done");
  const doneTasks = tasks.filter((task) => taskStatus(task) === "Done");

  return (
    <div className="rise mx-auto max-w-5xl">
      <p className="text-xs uppercase tracking-[0.24em] text-accent">Work</p>
      <h1 className="display mt-3 text-4xl font-semibold">What is in motion.</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Projects and tasks as one sequence — not a board of isolated tickets.
      </p>

      <section className="mt-10 space-y-4" aria-label="Projects">
        {projects.map((project) => (
          <Link key={project.id} href={to(`/workspace/work/${project.id}`)} className="block">
            <Surface className="p-5 transition hover:bg-[var(--surface-strong)] sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="display text-2xl font-semibold">{project.name}</h2>
                <p className={`text-sm ${statusColor[project.status]}`}>
                  {project.status} · {project.progress}%
                </p>
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
                {project.summary}
              </p>
              <div className="mt-5">
                <ProgressBar
                  value={project.progress}
                  label={`${project.name} progress`}
                />
              </div>
              <p className="mt-3 text-xs text-muted">
                Owner {project.owner} · Next {project.nextMilestone}
              </p>
            </Surface>
          </Link>
        ))}
      </section>

      <section className="mt-12" aria-label="Tasks">
        <h2 className="font-mono text-xs tracking-[0.22em] text-muted">Tasks</h2>
        <TaskList
          tasks={openTasks}
          projectName={(id) => projectById(id)?.name}
        />
        {doneTasks.length > 0 ? (
          <div className="mt-8">
            <h3 className="text-xs uppercase tracking-[0.16em] text-muted">
              Done
            </h3>
            <TaskList
              tasks={doneTasks}
              projectName={(id) => projectById(id)?.name}
            />
          </div>
        ) : null}
      </section>
    </div>
  );
}

import { projects, projectById, tasks } from "@/data/demo";
import { Surface } from "@/components/ui/Surface";

const statusColor: Record<(typeof projects)[number]["status"], string> = {
  "On track": "text-accent",
  "At risk": "text-[var(--warn)]",
  Steady: "text-ink-soft",
};

export function WorkView() {
  return (
    <div className="rise mx-auto max-w-5xl">
      <p className="text-xs uppercase tracking-[0.24em] text-accent">Work</p>
      <h1 className="display mt-3 text-4xl font-semibold">What is in motion.</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Projects and tasks as one sequence — not a board of isolated tickets.
      </p>

      <section className="mt-10 space-y-4" aria-label="Projects">
        {projects.map((project) => (
          <Surface key={project.id} className="p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="display text-2xl font-semibold">{project.name}</h2>
              <p className={`text-sm ${statusColor[project.status]}`}>
                {project.status} · {project.progress}%
              </p>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
              {project.summary}
            </p>
            <div
              className="mt-5 h-1 overflow-hidden rounded-full bg-white/[0.08]"
              role="progressbar"
              aria-valuenow={project.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${project.name} progress`}
            >
              <div
                className="h-full bg-accent"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-muted">
              Owner {project.owner} · Next {project.nextMilestone}
            </p>
          </Surface>
        ))}
      </section>

      <section className="mt-12" aria-label="Tasks">
        <h2 className="font-mono text-xs tracking-[0.22em] text-muted">Tasks</h2>
        <ul className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {tasks.map((task) => (
            <li key={task.id} className="grid gap-1 py-4 sm:grid-cols-[6rem_1fr_auto]">
              <p className="text-xs uppercase tracking-[0.14em] text-accent">
                {task.status}
              </p>
              <div>
                <p className="text-sm font-medium">{task.title}</p>
                <p className="mt-1 text-xs text-muted">
                  {projectById(task.projectId)?.name} · {task.owner}
                </p>
              </div>
              <p className="text-xs text-muted sm:text-right">{task.due}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useWorkspace } from "@/components/workspace/WorkspaceProvider";
import type { Task } from "@/lib/types";

type TaskListProps = {
  tasks: Task[];
  projectName?: (projectId: string) => string | undefined;
  emptyLabel?: string;
};

export function TaskList({ tasks, projectName, emptyLabel }: TaskListProps) {
  const { taskStatus, toggleTaskDone } = useWorkspace();

  if (tasks.length === 0) {
    return emptyLabel ? (
      <p className="mt-4 text-sm text-muted">{emptyLabel}</p>
    ) : null;
  }

  return (
    <ul className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
      {tasks.map((task) => {
        const status = taskStatus(task);
        return (
          <li
            key={task.id}
            className="grid gap-3 py-4 sm:grid-cols-[6rem_1fr_auto] sm:items-center"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-accent">
              {status}
            </p>
            <div>
              <Link
                href={`/workspace/work/${task.projectId}`}
                className={`text-sm font-medium hover:text-accent ${
                  status === "Done" ? "text-muted line-through" : ""
                }`}
              >
                {task.title}
              </Link>
              <p className="mt-1 text-xs text-muted">
                {projectName?.(task.projectId) ?? "Project"} · {task.owner} ·{" "}
                {task.due}
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggleTaskDone(task.id)}
              className="justify-self-start rounded-full border border-[var(--line)] px-3 py-1.5 text-xs text-ink-soft hover:text-ink sm:justify-self-end"
            >
              {status === "Done" ? "Restore" : "Mark done"}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

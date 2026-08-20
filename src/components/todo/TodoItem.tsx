"use client";

import { useEffect, useRef, useState } from "react";
import { formatDayLabel, isOverdue, type TodoTask } from "@/lib/todo";

type TodoItemProps = {
  task: TodoTask;
  expanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  onToggle: () => void;
  onUpdate: (patch: Partial<Pick<TodoTask, "title" | "notes" | "dueDate">>) => void;
  onDelete: () => void;
};

export function TodoItem({
  task,
  expanded,
  onExpand,
  onCollapse,
  onToggle,
  onUpdate,
  onDelete,
}: TodoItemProps) {
  const [title, setTitle] = useState(task.title);
  const [notes, setNotes] = useState(task.notes);
  const [dueDate, setDueDate] = useState(task.dueDate ?? "");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(task.title);
    setNotes(task.notes);
    setDueDate(task.dueDate ?? "");
  }, [task.id, task.title, task.notes, task.dueDate]);

  useEffect(() => {
    if (expanded) titleRef.current?.focus();
  }, [expanded]);

  function commit() {
    onUpdate({
      title,
      notes,
      dueDate: dueDate || null,
    });
  }

  const overdue = !task.completed && isOverdue(task.dueDate);

  return (
    <li className="border-b border-[var(--line)]">
      <div className="flex items-start gap-3 py-3">
        <button
          type="button"
          role="checkbox"
          aria-checked={task.completed}
          aria-label={task.completed ? "Mark as not done" : "Mark as done"}
          onClick={onToggle}
          className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition ${
            task.completed
              ? "border-accent bg-accent text-[#06241e]"
              : "border-[var(--line-strong)] hover:border-accent"
          }`}
        >
          {task.completed ? (
            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true">
              <path
                d="M2.5 6.2 4.8 8.5 9.5 3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </button>

        {expanded ? (
          <div className="min-w-0 flex-1">
            <input
              ref={titleRef}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onBlur={commit}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  commit();
                  onCollapse();
                }
                if (event.key === "Escape") {
                  setTitle(task.title);
                  setNotes(task.notes);
                  setDueDate(task.dueDate ?? "");
                  onCollapse();
                }
              }}
              className="w-full bg-transparent text-[15px] text-ink outline-none"
              aria-label="Task title"
            />
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              onBlur={commit}
              placeholder="Notes"
              rows={2}
              className="mt-2 w-full resize-none bg-transparent text-sm text-ink-soft outline-none placeholder:text-muted"
            />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-muted">
                When
                <input
                  type="date"
                  value={dueDate}
                  onChange={(event) => {
                    setDueDate(event.target.value);
                    onUpdate({ dueDate: event.target.value || null });
                  }}
                  className="rounded-full border border-[var(--line)] bg-transparent px-2 py-1 text-xs text-ink-soft"
                />
              </label>
              {dueDate ? (
                <button
                  type="button"
                  onClick={() => {
                    setDueDate("");
                    onUpdate({ dueDate: null });
                  }}
                  className="text-xs text-muted hover:text-ink"
                >
                  Move to Inbox
                </button>
              ) : null}
              <button
                type="button"
                onClick={onDelete}
                className="ml-auto text-xs text-[var(--danger)] hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={onExpand}
            className="min-w-0 flex-1 text-left"
          >
            <p
              className={`text-[15px] leading-snug ${
                task.completed ? "text-muted line-through" : "text-ink"
              }`}
            >
              {task.title}
            </p>
            {task.notes ? (
              <p className="mt-1 truncate text-sm text-muted">{task.notes}</p>
            ) : null}
            {task.dueDate ? (
              <p className={`mt-1 text-xs ${overdue ? "text-[var(--warn)]" : "text-muted"}`}>
                {overdue ? "Overdue · " : ""}
                {formatDayLabel(task.dueDate)}
              </p>
            ) : null}
          </button>
        )}
      </div>
    </li>
  );
}

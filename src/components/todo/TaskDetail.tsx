"use client";

import { useEffect, useState } from "react";
import { localDateISO, type TodoTask } from "@/lib/todo";
import { TaskCheckbox } from "@/components/todo/TaskCheckbox";

function SubtaskRow({
  title,
  completed,
  onToggle,
  onCommit,
  onDelete,
}: {
  title: string;
  completed: boolean;
  onToggle: () => void;
  onCommit: (title: string) => void;
  onDelete: () => void;
}) {
  const [value, setValue] = useState(title);

  useEffect(() => {
    setValue(title);
  }, [title]);

  return (
    <li className="group/sub flex items-center gap-2 rounded-xl px-1 py-1">
      <TaskCheckbox
        size="sm"
        checked={completed}
        label={completed ? "Uncomplete subtask" : "Complete subtask"}
        onToggle={onToggle}
      />
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onBlur={() => onCommit(value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            onCommit(value);
            event.currentTarget.blur();
          }
        }}
        className={`min-w-0 flex-1 bg-transparent text-sm outline-none ${
          completed ? "text-[var(--todo-muted)] line-through" : "text-[var(--todo-text)]"
        }`}
        aria-label="Subtask title"
      />
      <button
        type="button"
        onClick={onDelete}
        className="rounded-full px-2 text-xs text-[var(--todo-faint)] opacity-0 transition group-hover/sub:opacity-100 hover:text-[#c2410c]"
      >
        Remove
      </button>
    </li>
  );
}

type TaskDetailProps = {
  task: TodoTask;
  onClose: () => void;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: (patch: Partial<Pick<TodoTask, "title" | "notes" | "dueDate">>) => void;
  onAddSubtask: (title: string) => void;
  onToggleSubtask: (id: string) => void;
  onUpdateSubtask: (id: string, title: string) => void;
  onDeleteSubtask: (id: string) => void;
};

export function TaskDetail({
  task,
  onClose,
  onToggle,
  onDelete,
  onUpdate,
  onAddSubtask,
  onToggleSubtask,
  onUpdateSubtask,
  onDeleteSubtask,
}: TaskDetailProps) {
  const [title, setTitle] = useState(task.title);
  const [notes, setNotes] = useState(task.notes);
  const [subDraft, setSubDraft] = useState("");

  useEffect(() => {
    setTitle(task.title);
    setNotes(task.notes);
  }, [task.id, task.title, task.notes]);

  function commitTitle() {
    onUpdate({ title });
  }

  function commitNotes() {
    onUpdate({ notes });
  }

  function submitSubtask() {
    onAddSubtask(subDraft);
    setSubDraft("");
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--todo-muted)]">
          Task
        </p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full px-3 py-1 text-sm text-[var(--todo-muted)] transition hover:bg-[var(--todo-soft)] hover:text-[var(--todo-text)]"
        >
          Close
        </button>
      </div>

      <div className="mt-5 flex items-start gap-3">
        <div className="pt-1.5">
          <TaskCheckbox
            checked={task.completed}
            label={task.completed ? "Mark as not done" : "Mark as done"}
            onToggle={onToggle}
          />
        </div>
        <textarea
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onBlur={commitTitle}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              commitTitle();
              event.currentTarget.blur();
            }
            if (event.key === "Escape") onClose();
          }}
          rows={2}
          aria-label="Task title"
          className="min-h-[3.2rem] w-full resize-none bg-transparent text-[1.65rem] font-semibold leading-tight tracking-[-0.03em] text-[var(--todo-text)] outline-none"
        />
      </div>

      <label className="mt-6 block text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--todo-muted)]">
        When
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onUpdate({ dueDate: null })}
            className={`rounded-full px-3 py-1.5 text-xs transition ${
              !task.dueDate
                ? "bg-[var(--todo-purple-soft)] text-[var(--todo-purple)]"
                : "bg-[var(--todo-soft)] text-[var(--todo-muted)] hover:text-[var(--todo-text)]"
            }`}
          >
            Inbox
          </button>
          <button
            type="button"
            onClick={() => onUpdate({ dueDate: localDateISO() })}
            className={`rounded-full px-3 py-1.5 text-xs transition ${
              task.dueDate === localDateISO()
                ? "bg-[var(--todo-purple-soft)] text-[var(--todo-purple)]"
                : "bg-[var(--todo-soft)] text-[var(--todo-muted)] hover:text-[var(--todo-text)]"
            }`}
          >
            Today
          </button>
          <input
            type="date"
            value={task.dueDate ?? ""}
            onChange={(event) => onUpdate({ dueDate: event.target.value || null })}
            aria-label="Choose a date"
            className="rounded-full border border-[var(--todo-border)] bg-white px-3 py-1.5 text-xs text-[var(--todo-text)] outline-none"
          />
        </div>
      </label>

      <label className="mt-8 block min-h-0 flex-1">
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--todo-muted)]">
          Notes
        </span>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          onBlur={commitNotes}
          placeholder="Thoughts, links, context — whatever this task needs."
          className="mt-2 h-[min(28vh,14rem)] w-full resize-none rounded-2xl bg-[var(--todo-soft)] px-4 py-3 text-[15px] leading-relaxed text-[var(--todo-text)] outline-none placeholder:text-[var(--todo-faint)]"
        />
      </label>

      <section className="mt-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--todo-muted)]">
          Checklist
        </p>
        <ul className="mt-3 space-y-1">
          {task.subtasks.map((item) => (
            <SubtaskRow
              key={item.id}
              title={item.title}
              completed={item.completed}
              onToggle={() => onToggleSubtask(item.id)}
              onCommit={(title) => onUpdateSubtask(item.id, title)}
              onDelete={() => onDeleteSubtask(item.id)}
            />
          ))}
        </ul>
        <form
          className="mt-2"
          onSubmit={(event) => {
            event.preventDefault();
            submitSubtask();
          }}
        >
          <input
            value={subDraft}
            onChange={(event) => setSubDraft(event.target.value)}
            placeholder="Add a checklist item"
            className="w-full rounded-xl bg-transparent px-1 py-2 text-sm text-[var(--todo-text)] outline-none placeholder:text-[var(--todo-faint)]"
          />
        </form>
      </section>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--todo-border)] pt-5">
        <button
          type="button"
          onClick={onToggle}
          className="rounded-full bg-[var(--todo-purple)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--todo-purple-hover)]"
        >
          {task.completed ? "Mark incomplete" : "Mark complete"}
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="text-sm text-[var(--todo-muted)] transition hover:text-[#c2410c]"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

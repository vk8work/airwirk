"use client";

import { formatDayLabel, isOverdue, subtaskProgress, type TodoTask } from "@/lib/todo";
import { TaskCheckbox } from "@/components/todo/TaskCheckbox";

type TodoItemProps = {
  task: TodoTask;
  selected: boolean;
  onSelect: () => void;
  onToggle: () => void;
};

export function TodoItem({ task, selected, onSelect, onToggle }: TodoItemProps) {
  const overdue = !task.completed && isOverdue(task.dueDate);
  const progress = subtaskProgress(task);
  const notePreview = task.notes.trim().split("\n").find((line) => line.trim());

  return (
    <li className="todo-row">
      <div
        className={`group flex items-start gap-3 rounded-2xl px-3 py-3 transition ${
          selected ? "bg-[var(--todo-purple-soft)]" : "hover:bg-[var(--todo-soft)]"
        }`}
      >
        <div className="pt-0.5">
          <TaskCheckbox
            checked={task.completed}
            label={task.completed ? "Mark as not done" : "Mark as done"}
            onToggle={onToggle}
          />
        </div>
        <button type="button" onClick={onSelect} className="min-w-0 flex-1 text-left">
          <p
            className={`text-[15px] leading-snug tracking-[-0.01em] ${
              task.completed ? "text-[var(--todo-muted)] line-through" : "text-[var(--todo-text)]"
            }`}
          >
            {task.title}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[var(--todo-muted)]">
            {task.dueDate ? (
              <span className={overdue ? "text-[#c2410c]" : ""}>
                {overdue ? "Overdue · " : ""}
                {formatDayLabel(task.dueDate)}
              </span>
            ) : null}
            {progress ? (
              <span>
                {progress.done}/{progress.total}
              </span>
            ) : null}
            {notePreview ? <span className="max-w-[14rem] truncate">{notePreview}</span> : null}
          </div>
        </button>
      </div>
    </li>
  );
}

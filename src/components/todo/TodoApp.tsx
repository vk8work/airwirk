"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { TaskDetail } from "@/components/todo/TaskDetail";
import { TodoItem } from "@/components/todo/TodoItem";
import { useTodos } from "@/components/todo/useTodos";
import {
  countTodos,
  filterTodos,
  formatDayLabel,
  todoLists,
  type TodoListId,
} from "@/lib/todo";

const copy: Record<TodoListId, { title: string; hint: string; empty: string }> = {
  inbox: {
    title: "Inbox",
    hint: "Capture anything. Schedule it when it deserves a day.",
    empty: "Inbox is clear.",
  },
  today: {
    title: "Today",
    hint: "What belongs to this day — including anything overdue.",
    empty: "Nothing for today. Enjoy the quiet.",
  },
  upcoming: {
    title: "Upcoming",
    hint: "Dated work, waiting for its morning.",
    empty: "Nothing upcoming.",
  },
  completed: {
    title: "Completed",
    hint: "Done stays here until you delete it.",
    empty: "Nothing completed yet.",
  },
};

const listIcons: Record<TodoListId, string> = {
  inbox: "M6 8h20M6 16h14M6 24h10",
  today: "M8 7h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zm0 6h16M12 4v6M20 4v6",
  upcoming: "M16 8v8l5 3M16 28a12 12 0 1 0 0-24 12 12 0 0 0 0 24z",
  completed: "M7 16.5 13 22.5 25 9.5",
};

export function TodoApp() {
  const todos = useTodos();
  const {
    ready,
    tasks,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    addSubtask,
    toggleSubtask,
    updateSubtask,
    deleteSubtask,
  } = todos;
  const [list, setList] = useState<TodoListId>("today");
  const [draft, setDraft] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const composerRef = useRef<HTMLInputElement>(null);

  const visible = useMemo(() => filterTodos(tasks, list), [tasks, list]);
  const selected = tasks.find((task) => task.id === selectedId) ?? null;

  useEffect(() => {
    if (selectedId && !tasks.some((task) => task.id === selectedId)) {
      setSelectedId(null);
    }
  }, [tasks, selectedId]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "n") {
        event.preventDefault();
        composerRef.current?.focus();
      }
      if (event.key === "Escape") setSelectedId(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function submitDraft() {
    const id = addTask({ title: draft, list: list === "completed" ? "inbox" : list });
    setDraft("");
    if (id) composerRef.current?.focus();
  }

  function changeList(next: TodoListId) {
    setList(next);
    setSelectedId(null);
  }

  const groupedUpcoming =
    list === "upcoming"
      ? visible.reduce<Record<string, typeof visible>>((groups, task) => {
          const key = task.dueDate ?? "none";
          groups[key] = groups[key] ? [...groups[key], task] : [task];
          return groups;
        }, {})
      : null;

  const nav = (
    <nav className="flex flex-col gap-1" aria-label="Lists">
      {todoLists.map((item) => {
        const active = list === item.id;
        const count = countTodos(tasks, item.id);
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => changeList(item.id)}
            className={`flex items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm transition ${
              active
                ? "bg-[var(--todo-purple-soft)] text-[var(--todo-purple)]"
                : "text-[var(--todo-muted)] hover:bg-[var(--todo-soft)] hover:text-[var(--todo-text)]"
            }`}
            aria-current={active ? "page" : undefined}
          >
            <span className="flex items-center gap-2.5">
              <svg viewBox="0 0 32 32" className="h-4 w-4" aria-hidden="true" fill="none">
                <path
                  d={listIcons[item.id]}
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {item.label}
            </span>
            <span className={`font-mono text-[11px] ${active ? "text-[var(--todo-purple)]" : "text-[var(--todo-faint)]"}`}>
              {count}
            </span>
          </button>
        );
      })}
    </nav>
  );

  const listBody = !ready ? (
    <p className="mt-10 text-sm text-[var(--todo-muted)]">Loading…</p>
  ) : visible.length === 0 ? (
    <p className="mt-10 text-sm text-[var(--todo-muted)]">{copy[list].empty}</p>
  ) : groupedUpcoming ? (
    <div className="mt-4">
      {Object.entries(groupedUpcoming).map(([iso, group]) => (
        <section key={iso} className="mt-7 first:mt-4">
          <h2 className="px-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--todo-muted)]">
            {formatDayLabel(iso)}
          </h2>
          <ul className="mt-1">
            {group.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                selected={selectedId === task.id}
                onSelect={() => setSelectedId(task.id)}
                onToggle={() => toggleTask(task.id)}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  ) : (
    <ul className="mt-4">
      {visible.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          selected={selectedId === task.id}
          onSelect={() => setSelectedId(task.id)}
          onToggle={() => toggleTask(task.id)}
        />
      ))}
    </ul>
  );

  const detail = selected ? (
    <TaskDetail
      task={selected}
      onClose={() => setSelectedId(null)}
      onToggle={() => toggleTask(selected.id)}
      onDelete={() => {
        deleteTask(selected.id);
        setSelectedId(null);
      }}
      onUpdate={(patch) => updateTask(selected.id, patch)}
      onAddSubtask={(title) => addSubtask(selected.id, title)}
      onToggleSubtask={(id) => toggleSubtask(selected.id, id)}
      onUpdateSubtask={(id, title) => updateSubtask(selected.id, id, title)}
      onDeleteSubtask={(id) => deleteSubtask(selected.id, id)}
    />
  ) : (
    <div className="flex h-full flex-col justify-center px-2">
      <p className="text-sm text-[var(--todo-muted)]">Open a task to add notes and a checklist.</p>
    </div>
  );

  return (
    <div className="todo-app">
      <a
        href="#todo-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--todo-purple)] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to tasks
      </a>

      <div className="mx-auto flex min-h-svh max-w-[1180px]">
        <aside className="hidden w-[15.5rem] shrink-0 flex-col px-4 py-6 lg:flex">
          <Link href="/" className="px-2">
            <Logo />
          </Link>
          <p className="mt-10 px-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--todo-faint)]">
            To Do
          </p>
          <div className="mt-3">{nav}</div>
          <Link
            href="/home"
            className="mt-auto px-3 pb-2 text-xs text-[var(--todo-muted)] transition hover:text-[var(--todo-text)]"
          >
            Workspace
          </Link>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col pb-[4.75rem] lg:pb-0">
          <header className="sticky top-0 z-20 flex items-center justify-between bg-[color-mix(in_srgb,var(--todo-canvas)_88%,transparent)] px-5 py-4 backdrop-blur-md lg:px-8">
            <div className="lg:hidden">
              <Logo />
            </div>
            <p className="hidden text-sm text-[var(--todo-muted)] lg:block">AirWirk To Do</p>
            <Link
              href="/"
              className="text-sm text-[var(--todo-muted)] transition hover:text-[var(--todo-text)]"
            >
              AirWirk
            </Link>
          </header>

          <div className="flex min-h-0 flex-1">
            <main id="todo-main" className="mx-auto w-full max-w-xl flex-1 px-5 pb-8 pt-4 lg:px-8">
              <h1 className="display text-[2.35rem] font-semibold tracking-[-0.04em] text-[var(--todo-text)]">
                {copy[list].title}
              </h1>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--todo-muted)]">
                {copy[list].hint}
              </p>

              {list !== "completed" ? (
                <form
                  className="mt-8 flex items-center gap-3 rounded-2xl border border-[var(--todo-border)] bg-white px-4 py-3 shadow-[0_10px_30px_rgb(29_29_31/0.04)]"
                  onSubmit={(event) => {
                    event.preventDefault();
                    submitDraft();
                  }}
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full border-[1.5px] border-[var(--todo-purple)]" aria-hidden="true" />
                  <label className="sr-only" htmlFor="new-todo">
                    New task
                  </label>
                  <input
                    id="new-todo"
                    ref={composerRef}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="Add a task"
                    className="w-full bg-transparent text-[15px] text-[var(--todo-text)] outline-none placeholder:text-[var(--todo-faint)]"
                  />
                  <span className="hidden font-mono text-[10px] text-[var(--todo-faint)] sm:inline">⌘N</span>
                </form>
              ) : null}

              {listBody}
            </main>

            <aside className="todo-panel my-4 mr-6 hidden w-[22.5rem] shrink-0 rounded-[var(--todo-radius)] border border-[var(--todo-border)] bg-white p-6 shadow-[var(--todo-shadow)] xl:block">
              {detail}
            </aside>
          </div>
        </div>
      </div>

      {selected ? (
        <div className="fixed inset-0 z-40 xl:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-[rgb(29_29_31/0.28)]"
            aria-label="Close task"
            onClick={() => setSelectedId(null)}
          />
          <div className="todo-sheet absolute inset-x-0 bottom-0 top-10 overflow-auto rounded-t-[1.5rem] bg-white px-5 py-5 shadow-[var(--todo-shadow)] sm:inset-y-6 sm:left-auto sm:right-6 sm:w-[26rem] sm:rounded-[var(--todo-radius)]">
            {detail}
          </div>
        </div>
      ) : null}

      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--todo-border)] bg-white/90 backdrop-blur-md lg:hidden"
        aria-label="Lists"
      >
        <ul className="grid grid-cols-4">
          {todoLists.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => changeList(item.id)}
                className={`flex w-full flex-col items-center gap-1 py-3 text-[11px] ${
                  list === item.id ? "text-[var(--todo-purple)]" : "text-[var(--todo-muted)]"
                }`}
              >
                <svg viewBox="0 0 32 32" className="h-4 w-4" aria-hidden="true" fill="none">
                  <path
                    d={listIcons[item.id]}
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

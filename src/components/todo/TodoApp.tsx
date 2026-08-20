"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
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
    hint: "Unscheduled. Capture first. Date later.",
    empty: "Inbox is clear.",
  },
  today: {
    title: "Today",
    hint: "What belongs to this day — including anything overdue.",
    empty: "Nothing for today.",
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

export function TodoApp() {
  const { ready, tasks, addTask, updateTask, toggleTask, deleteTask } = useTodos();
  const [list, setList] = useState<TodoListId>("today");
  const [draft, setDraft] = useState("");
  const [composing, setComposing] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const visible = useMemo(() => filterTodos(tasks, list), [tasks, list]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "n") {
        event.preventDefault();
        if (list !== "completed") setComposing(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [list]);

  function submitDraft() {
    addTask({ title: draft, list: list === "completed" ? "inbox" : list });
    setDraft("");
    setComposing(false);
  }

  const groupedUpcoming =
    list === "upcoming"
      ? visible.reduce<Record<string, typeof visible>>((groups, task) => {
          const key = task.dueDate ?? "none";
          groups[key] = groups[key] ? [...groups[key], task] : [task];
          return groups;
        }, {})
      : null;

  return (
    <div className="atmosphere min-h-screen">
      <a
        href="#todo-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-[#06241e]"
      >
        Skip to tasks
      </a>
      <div className="mx-auto flex min-h-screen max-w-5xl">
        <aside className="hidden w-56 shrink-0 flex-col border-r border-[var(--line)] px-4 py-5 sm:flex">
          <Link href="/" className="px-2">
            <Logo />
          </Link>
          <p className="mt-8 px-2 text-[11px] uppercase tracking-[0.2em] text-muted">
            To Do
          </p>
          <nav className="mt-3 flex flex-col gap-1" aria-label="Lists">
            {todoLists.map((item) => {
              const active = list === item.id;
              const count = countTodos(tasks, item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setList(item.id);
                    setExpandedId(null);
                    setComposing(false);
                  }}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    active
                      ? "bg-white/10 text-ink"
                      : "text-ink-soft hover:bg-white/5 hover:text-ink"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-[11px] text-muted">{count}</span>
                </button>
              );
            })}
          </nav>
          <Link
            href="/workspace"
            className="mt-auto px-3 pb-2 text-xs text-muted hover:text-ink"
          >
            Workspace
          </Link>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col pb-20 sm:pb-0">
          <header className="glass sticky top-0 z-20 flex items-center justify-between border-b border-[var(--line)] px-5 py-3 sm:px-8">
            <div className="sm:hidden">
              <Logo />
            </div>
            <p className="hidden text-sm text-ink-soft sm:block">AirWirk To Do</p>
            <Link href="/" className="text-sm text-ink-soft hover:text-ink">
              AirWirk
            </Link>
          </header>

          <main id="todo-main" className="rise mx-auto w-full max-w-xl flex-1 px-5 py-10 sm:px-8">
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent">
              {copy[list].title.toUpperCase()}
            </p>
            <h1 className="display mt-3 text-4xl font-semibold">{copy[list].title}</h1>
            <p className="mt-3 text-sm text-ink-soft">{copy[list].hint}</p>

            {list !== "completed" ? (
              composing ? (
                <form
                  className="mt-8 border-b border-[var(--line)] pb-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    submitDraft();
                  }}
                >
                  <label className="sr-only" htmlFor="new-todo">
                    New to do
                  </label>
                  <input
                    id="new-todo"
                    autoFocus
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        setDraft("");
                        setComposing(false);
                      }
                    }}
                    placeholder="New to do"
                    className="w-full bg-transparent text-[15px] outline-none placeholder:text-muted"
                  />
                  <div className="mt-3 flex gap-3">
                    <button
                      type="submit"
                      className="rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-[#06241e]"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDraft("");
                        setComposing(false);
                      }}
                      className="text-xs text-muted hover:text-ink"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setComposing(true)}
                  className="mt-8 text-sm text-accent hover:underline"
                >
                  New to do
                  <span className="ml-2 font-mono text-[10px] text-muted">⌘N</span>
                </button>
              )
            ) : null}

            {!ready ? (
              <p className="mt-10 text-sm text-muted">Loading…</p>
            ) : visible.length === 0 && !composing ? (
              <p className="mt-10 text-sm text-muted">{copy[list].empty}</p>
            ) : groupedUpcoming ? (
              <div className="mt-6">
                {Object.entries(groupedUpcoming).map(([iso, group]) => (
                  <section key={iso} className="mt-8 first:mt-6">
                    <h2 className="text-xs uppercase tracking-[0.16em] text-muted">
                      {formatDayLabel(iso)}
                    </h2>
                    <ul>
                      {group.map((task) => (
                        <TodoItem
                          key={task.id}
                          task={task}
                          expanded={expandedId === task.id}
                          onExpand={() => setExpandedId(task.id)}
                          onCollapse={() => setExpandedId(null)}
                          onToggle={() => toggleTask(task.id)}
                          onUpdate={(patch) => updateTask(task.id, patch)}
                          onDelete={() => deleteTask(task.id)}
                        />
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            ) : (
              <ul className="mt-6">
                {visible.map((task) => (
                  <TodoItem
                    key={task.id}
                    task={task}
                    expanded={expandedId === task.id}
                    onExpand={() => setExpandedId(task.id)}
                    onCollapse={() => setExpandedId(null)}
                    onToggle={() => toggleTask(task.id)}
                    onUpdate={(patch) => updateTask(task.id, patch)}
                    onDelete={() => deleteTask(task.id)}
                  />
                ))}
              </ul>
            )}
          </main>
        </div>
      </div>

      <nav
        className="glass fixed inset-x-0 bottom-0 z-30 border-t border-[var(--line)] sm:hidden"
        aria-label="Lists"
      >
        <ul className="grid grid-cols-4">
          {todoLists.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  setList(item.id);
                  setExpandedId(null);
                }}
                className={`flex w-full flex-col items-center py-3 text-[11px] ${
                  list === item.id ? "text-accent" : "text-muted"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

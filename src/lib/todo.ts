export type TodoListId = "inbox" | "today" | "upcoming" | "completed";

export type TodoTask = {
  id: string;
  title: string;
  notes: string;
  dueDate: string | null;
  completed: boolean;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export const TODO_STORAGE_KEY = "airwirk-todo-v1";

export const todoLists: { id: TodoListId; label: string }[] = [
  { id: "inbox", label: "Inbox" },
  { id: "today", label: "Today" },
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
];

export function localDateISO(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDaysISO(iso: string, days: number) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return localDateISO(date);
}

export function formatDayLabel(iso: string, today = localDateISO()) {
  if (iso === today) return "Today";
  if (iso === addDaysISO(today, 1)) return "Tomorrow";
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

export function isOverdue(iso: string | null, today = localDateISO()) {
  return Boolean(iso && iso < today);
}

export function filterTodos(tasks: TodoTask[], list: TodoListId, today = localDateISO()) {
  const open = tasks.filter((task) => !task.completed);
  if (list === "inbox") {
    return open.filter((task) => !task.dueDate);
  }
  if (list === "today") {
    return open.filter((task) => task.dueDate && task.dueDate <= today);
  }
  if (list === "upcoming") {
    return open
      .filter((task) => task.dueDate && task.dueDate > today)
      .sort((a, b) => (a.dueDate ?? "").localeCompare(b.dueDate ?? ""));
  }
  return tasks
    .filter((task) => task.completed)
    .sort((a, b) => (b.completedAt ?? "").localeCompare(a.completedAt ?? ""));
}

export function countTodos(tasks: TodoTask[], list: TodoListId, today = localDateISO()) {
  return filterTodos(tasks, list, today).length;
}

export function createTodoId() {
  return `todo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function defaultDueForList(list: TodoListId, today = localDateISO()) {
  if (list === "today") return today;
  if (list === "upcoming") return addDaysISO(today, 1);
  return null;
}

export function seedTodos(now = new Date()): TodoTask[] {
  const today = localDateISO(now);
  const stamp = now.toISOString();
  return [
    {
      id: "seed-1",
      title: "Capture what is still on your mind",
      notes: "Inbox is for unscheduled things. Give them a day when they earn one.",
      dueDate: null,
      completed: false,
      completedAt: null,
      createdAt: stamp,
      updatedAt: stamp,
    },
    {
      id: "seed-2",
      title: "Write the one note that unblocks today",
      notes: "Keep it short. Two sentences is enough.",
      dueDate: today,
      completed: false,
      completedAt: null,
      createdAt: stamp,
      updatedAt: stamp,
    },
    {
      id: "seed-3",
      title: "Look at tomorrow before the day arrives",
      notes: "",
      dueDate: addDaysISO(today, 1),
      completed: false,
      completedAt: null,
      createdAt: stamp,
      updatedAt: stamp,
    },
  ];
}

export function parseStoredTodos(raw: string | null): TodoTask[] | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    return parsed.filter((item): item is TodoTask => {
      return (
        typeof item === "object" &&
        item !== null &&
        typeof (item as TodoTask).id === "string" &&
        typeof (item as TodoTask).title === "string"
      );
    });
  } catch {
    return null;
  }
}

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  TODO_STORAGE_KEY,
  createTodoId,
  defaultDueForList,
  parseStoredTodos,
  seedTodos,
  type TodoListId,
  type TodoTask,
} from "@/lib/todo";

export function useTodos() {
  const [tasks, setTasks] = useState<TodoTask[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = parseStoredTodos(window.localStorage.getItem(TODO_STORAGE_KEY));
    setTasks(stored ?? seedTodos());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(tasks));
  }, [ready, tasks]);

  const addTask = useCallback((input: { title: string; notes?: string; list: TodoListId }) => {
    const title = input.title.trim();
    if (!title) return;
    const now = new Date().toISOString();
    const task: TodoTask = {
      id: createTodoId(),
      title,
      notes: input.notes?.trim() ?? "",
      dueDate: defaultDueForList(input.list),
      completed: false,
      completedAt: null,
      createdAt: now,
      updatedAt: now,
    };
    setTasks((current) => [task, ...current]);
  }, []);

  const updateTask = useCallback((id: string, patch: Partial<Pick<TodoTask, "title" | "notes" | "dueDate">>) => {
    const now = new Date().toISOString();
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== id) return task;
        const title = patch.title !== undefined ? patch.title.trim() : task.title;
        return {
          ...task,
          ...patch,
          title: title || task.title,
          notes: patch.notes !== undefined ? patch.notes : task.notes,
          updatedAt: now,
        };
      }),
    );
  }, []);

  const toggleTask = useCallback((id: string) => {
    const now = new Date().toISOString();
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== id) return task;
        const completed = !task.completed;
        return {
          ...task,
          completed,
          completedAt: completed ? now : null,
          updatedAt: now,
        };
      }),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  }, []);

  return useMemo(
    () => ({ ready, tasks, addTask, updateTask, toggleTask, deleteTask }),
    [ready, tasks, addTask, updateTask, toggleTask, deleteTask],
  );
}

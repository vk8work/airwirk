"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  TODO_STORAGE_KEY,
  createTodoId,
  defaultDueForList,
  parseStoredTodos,
  seedTodos,
  type TodoListId,
  type TodoSubtask,
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

  const addTask = useCallback((input: { title: string; list: TodoListId }) => {
    const title = input.title.trim();
    if (!title) return null;
    const now = new Date().toISOString();
    const task: TodoTask = {
      id: createTodoId(),
      title,
      notes: "",
      dueDate: defaultDueForList(input.list),
      completed: false,
      completedAt: null,
      createdAt: now,
      updatedAt: now,
      subtasks: [],
    };
    setTasks((current) => [task, ...current]);
    return task.id;
  }, []);

  const updateTask = useCallback(
    (id: string, patch: Partial<Pick<TodoTask, "title" | "notes" | "dueDate">>) => {
      const now = new Date().toISOString();
      setTasks((current) =>
        current.map((task) => {
          if (task.id !== id) return task;
          const nextTitle = patch.title !== undefined ? patch.title.trim() : task.title;
          return {
            ...task,
            ...patch,
            title: nextTitle || task.title,
            notes: patch.notes !== undefined ? patch.notes : task.notes,
            updatedAt: now,
          };
        }),
      );
    },
    [],
  );

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

  const addSubtask = useCallback((taskId: string, title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const now = new Date().toISOString();
    const subtask: TodoSubtask = {
      id: createTodoId("sub"),
      title: trimmed,
      completed: false,
    };
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? { ...task, subtasks: [...task.subtasks, subtask], updatedAt: now }
          : task,
      ),
    );
  }, []);

  const toggleSubtask = useCallback((taskId: string, subtaskId: string) => {
    const now = new Date().toISOString();
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? {
              ...task,
              updatedAt: now,
              subtasks: task.subtasks.map((item) =>
                item.id === subtaskId ? { ...item, completed: !item.completed } : item,
              ),
            }
          : task,
      ),
    );
  }, []);

  const updateSubtask = useCallback((taskId: string, subtaskId: string, title: string) => {
    const now = new Date().toISOString();
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? {
              ...task,
              updatedAt: now,
              subtasks: task.subtasks.map((item) =>
                item.id === subtaskId
                  ? { ...item, title: title.trim() || item.title }
                  : item,
              ),
            }
          : task,
      ),
    );
  }, []);

  const deleteSubtask = useCallback((taskId: string, subtaskId: string) => {
    const now = new Date().toISOString();
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? {
              ...task,
              updatedAt: now,
              subtasks: task.subtasks.filter((item) => item.id !== subtaskId),
            }
          : task,
      ),
    );
  }, []);

  return useMemo(
    () => ({
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
    }),
    [
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
    ],
  );
}

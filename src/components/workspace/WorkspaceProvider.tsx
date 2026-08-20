"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AskAirWirk } from "@/components/workspace/AskAirWirk";
import type { Task, WorkspaceMemory } from "@/lib/types";

const STORAGE_KEY = "airwirk-workspace-memory-v1";

const emptyMemory: WorkspaceMemory = {
  handledNowIds: [],
  doneTaskIds: [],
  doneLearningIds: [],
};

type WorkspaceContextValue = {
  memory: WorkspaceMemory;
  openAsk: (prompt?: string) => void;
  isNowHandled: (id: string) => boolean;
  toggleNowHandled: (id: string) => void;
  isTaskDone: (id: string) => boolean;
  toggleTaskDone: (id: string) => void;
  isLearningDone: (id: string) => boolean;
  toggleLearningDone: (id: string) => void;
  taskStatus: (task: Task) => Task["status"];
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [askOpen, setAskOpen] = useState(false);
  const [askSeed, setAskSeed] = useState<string | undefined>();
  const [memory, setMemory] = useState<WorkspaceMemory>(emptyMemory);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<WorkspaceMemory>;
        setMemory({
          handledNowIds: parsed.handledNowIds ?? [],
          doneTaskIds: parsed.doneTaskIds ?? [],
          doneLearningIds: parsed.doneLearningIds ?? [],
        });
      }
    } catch {
      setMemory(emptyMemory);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
  }, [hydrated, memory]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setAskOpen(true);
      }
      if (event.key === "Escape") {
        setAskOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openAsk = useCallback((prompt?: string) => {
    setAskSeed(prompt);
    setAskOpen(true);
  }, []);

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      memory,
      openAsk,
      isNowHandled: (id) => memory.handledNowIds.includes(id),
      toggleNowHandled: (id) => {
        setMemory((current) => ({
          ...current,
          handledNowIds: current.handledNowIds.includes(id)
            ? current.handledNowIds.filter((item) => item !== id)
            : [...current.handledNowIds, id],
        }));
      },
      isTaskDone: (id) => memory.doneTaskIds.includes(id),
      toggleTaskDone: (id) => {
        setMemory((current) => ({
          ...current,
          doneTaskIds: current.doneTaskIds.includes(id)
            ? current.doneTaskIds.filter((item) => item !== id)
            : [...current.doneTaskIds, id],
        }));
      },
      isLearningDone: (id) => memory.doneLearningIds.includes(id),
      toggleLearningDone: (id) => {
        setMemory((current) => ({
          ...current,
          doneLearningIds: current.doneLearningIds.includes(id)
            ? current.doneLearningIds.filter((item) => item !== id)
            : [...current.doneLearningIds, id],
        }));
      },
      taskStatus: (task) =>
        memory.doneTaskIds.includes(task.id) ? "Done" : task.status,
    }),
    [memory, openAsk],
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
      <AskAirWirk
        open={askOpen}
        seed={askSeed}
        onClose={() => {
          setAskOpen(false);
          setAskSeed(undefined);
        }}
      />
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within WorkspaceProvider");
  }
  return context;
}

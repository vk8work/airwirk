"use client";

import type { ReactNode } from "react";
import { WorkspaceProvider } from "@/components/workspace/WorkspaceProvider";
import { WorkspaceShell } from "@/components/workspace/WorkspaceShell";
import type { ExperienceBase } from "@/lib/experience";

export function ExperienceLayout({
  basePath,
  children,
}: {
  basePath: ExperienceBase;
  children: ReactNode;
}) {
  return (
    <WorkspaceProvider basePath={basePath}>
      <WorkspaceShell>{children}</WorkspaceShell>
    </WorkspaceProvider>
  );
}

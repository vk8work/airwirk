import type { Metadata } from "next";
import type { ReactNode } from "react";
import { WorkspaceProvider } from "@/components/workspace/WorkspaceProvider";
import { WorkspaceShell } from "@/components/workspace/WorkspaceShell";

export const metadata: Metadata = {
  title: "Workspace — AirWirk",
  description:
    "Maya Reyes’s AirWirk workspace: NOW, NEXT, FLOW, and Ask AirWirk.",
};

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <WorkspaceProvider>
      <WorkspaceShell>{children}</WorkspaceShell>
    </WorkspaceProvider>
  );
}

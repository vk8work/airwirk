import type { WorkspaceView } from "@/lib/types";

export const workspaceNav: { id: WorkspaceView; label: string; href: string }[] =
  [
    { id: "home", label: "Home", href: "/workspace" },
    { id: "work", label: "Work", href: "/workspace/work" },
    { id: "people", label: "People", href: "/workspace/people" },
    { id: "growth", label: "Growth", href: "/workspace/growth" },
    { id: "insights", label: "Insights", href: "/workspace/insights" },
  ];

export function isNavActive(id: WorkspaceView, pathname: string) {
  if (id === "home") {
    return (
      pathname === "/workspace" ||
      pathname.startsWith("/workspace/now") ||
      pathname.startsWith("/workspace/next")
    );
  }
  return (
    pathname === `/workspace/${id}` ||
    pathname.startsWith(`/workspace/${id}/`)
  );
}

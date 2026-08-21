import type { ExperienceBase } from "@/lib/experience";
import type { WorkspaceView } from "@/lib/types";

export function workspaceNav(base: ExperienceBase): {
  id: WorkspaceView;
  label: string;
  href: string;
}[] {
  return [
    { id: "home", label: "Home", href: base },
    { id: "work", label: "Work", href: `${base}/work` },
    { id: "people", label: "People", href: `${base}/people` },
    { id: "growth", label: "Growth", href: `${base}/growth` },
    { id: "insights", label: "Insights", href: `${base}/insights` },
  ];
}

export function isNavActive(id: WorkspaceView, pathname: string, base: ExperienceBase) {
  if (id === "home") {
    return (
      pathname === base ||
      pathname.startsWith(`${base}/now`) ||
      pathname.startsWith(`${base}/next`)
    );
  }
  return pathname === `${base}/${id}` || pathname.startsWith(`${base}/${id}/`);
}

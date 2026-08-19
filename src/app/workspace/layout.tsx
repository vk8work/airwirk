import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workspace — AirWirk",
  description:
    "Maya Reyes’s AirWirk workspace: NOW, NEXT, FLOW, and Ask AirWirk.",
};

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

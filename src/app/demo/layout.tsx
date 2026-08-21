import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ExperienceLayout } from "@/components/workspace/ExperienceLayout";

export const metadata: Metadata = {
  title: "Demo — AirWirk",
  description:
    "Explore AirWirk as a guest: NOW, NEXT, FLOW, and Ask AirWirk. No organization account required.",
};

export default function DemoLayout({ children }: { children: ReactNode }) {
  return <ExperienceLayout basePath="/demo">{children}</ExperienceLayout>;
}

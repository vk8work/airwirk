import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ExperienceLayout } from "@/components/workspace/ExperienceLayout";

export const metadata: Metadata = {
  title: "Home — AirWirk",
  description:
    "Your AirWirk home: NOW, NEXT, FLOW, and Ask AirWirk.",
};

export default function HomeLayout({ children }: { children: ReactNode }) {
  return <ExperienceLayout basePath="/home">{children}</ExperienceLayout>;
}

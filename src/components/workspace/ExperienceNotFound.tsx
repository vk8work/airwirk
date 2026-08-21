"use client";

import Link from "next/link";
import { useWorkspace } from "@/components/workspace/WorkspaceProvider";

export default function ExperienceNotFound() {
  const { to } = useWorkspace();
  return (
    <div className="rise mx-auto max-w-xl">
      <p className="text-xs uppercase tracking-[0.24em] text-accent">Missing</p>
      <h1 className="display mt-3 text-4xl font-semibold">
        This part of the flow isn’t here.
      </h1>
      <p className="mt-4 text-ink-soft">
        The demo only contains the sample workspace. Return home and continue
        from NOW, NEXT, or FLOW.
      </p>
      <Link
        href={to("/home")}
        className="mt-8 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-[#06241e]"
      >
        Back to Home
      </Link>
    </div>
  );
}

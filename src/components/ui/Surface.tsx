import type { HTMLAttributes, ReactNode } from "react";

type SurfaceProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: "div" | "section" | "article" | "li";
};

export function Surface({
  children,
  className = "",
  as: Tag = "div",
  ...props
}: SurfaceProps) {
  return (
    <Tag
      className={`hairline rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

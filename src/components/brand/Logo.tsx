import type { SVGProps } from "react";

type LogoProps = SVGProps<SVGSVGElement> & {
  compact?: boolean;
};

export function Mark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M6 22c4.5-8 8.5-12 14-14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M8 24c5-6.5 10-9.5 16-10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M10 26c5.5-4.5 11-6 16-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

export function Logo({ compact = false, className, ...props }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 text-ink ${className ?? ""}`}>
      <Mark className="h-7 w-7 text-accent" {...props} />
      {compact ? (
        <span className="sr-only">AirWirk</span>
      ) : (
        <span className="display text-lg font-semibold tracking-tight">AirWirk</span>
      )}
    </span>
  );
}

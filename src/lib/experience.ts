export const experienceBases = ["/home", "/demo"] as const;
export type ExperienceBase = (typeof experienceBases)[number];

/** Reserved public products — do not occupy these prefixes under /home or /demo. */
export const reservedPublicRoutes = ["/notes", "/you"] as const;

export function experiencePath(base: ExperienceBase, href: string) {
  const stripped = href.replace(/^\/(workspace|home|demo)(?=\/|$)/, "");
  if (!stripped || stripped === "/") return base;
  return `${base}${stripped.startsWith("/") ? stripped : `/${stripped}`}`;
}

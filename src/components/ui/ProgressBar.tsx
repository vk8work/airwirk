export function ProgressBar({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div
      className="h-1 overflow-hidden rounded-full bg-white/[0.08]"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className="h-full bg-accent" style={{ width: `${value}%` }} />
    </div>
  );
}

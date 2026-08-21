type TaskCheckboxProps = {
  checked: boolean;
  label: string;
  onToggle: () => void;
  size?: "sm" | "md";
};

export function TaskCheckbox({ checked, label, onToggle, size = "md" }: TaskCheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      data-done={checked ? "true" : "false"}
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
      className={`todo-check ${size === "sm" ? "!h-4 !w-4" : ""}`}
    >
      <svg viewBox="0 0 12 12" className={size === "sm" ? "h-2 w-2" : "h-2.5 w-2.5"} aria-hidden="true">
        <path
          d="M2.4 6.2 4.8 8.6 9.6 3.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

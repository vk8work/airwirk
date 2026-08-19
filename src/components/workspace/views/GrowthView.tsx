import { goalById, goals, learning } from "@/data/demo";
import { Surface } from "@/components/ui/Surface";

export function GrowthView() {
  return (
    <div className="rise mx-auto max-w-5xl">
      <p className="text-xs uppercase tracking-[0.24em] text-accent">Growth</p>
      <h1 className="display mt-3 text-4xl font-semibold">
        How you are growing.
      </h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Goals and learning attached to rooms already on the calendar — not a
        catalog of courses.
      </p>

      <section className="mt-10 space-y-4" aria-label="Goals">
        {goals.map((goal) => (
          <Surface key={goal.id} className="p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-medium">{goal.title}</h2>
              <p className="text-xs text-muted">{goal.horizon}</p>
            </div>
            <div
              className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.08]"
              role="progressbar"
              aria-valuenow={goal.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${goal.title} progress`}
            >
              <div
                className="h-full bg-accent"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {goal.signal}
            </p>
          </Surface>
        ))}
      </section>

      <section className="mt-12" aria-labelledby="learning-heading">
        <h2 id="learning-heading" className="font-mono text-xs tracking-[0.22em] text-muted">
          Learning
        </h2>
        <ul className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {learning.map((item) => (
            <li key={item.id} className="grid gap-1 py-4 sm:grid-cols-[6rem_1fr_auto]">
              <p className="text-xs uppercase tracking-[0.14em] text-accent">
                {item.kind}
              </p>
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 text-xs text-muted">
                  Supports {goalById(item.relatedGoalId)?.title}
                </p>
              </div>
              <p className="text-xs text-muted sm:text-right">{item.when}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

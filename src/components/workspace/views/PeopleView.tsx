import { activity, people, personById } from "@/data/demo";
import { Surface } from "@/components/ui/Surface";

export function PeopleView() {
  return (
    <div className="rise mx-auto max-w-5xl">
      <p className="text-xs uppercase tracking-[0.24em] text-accent">People</p>
      <h1 className="display mt-3 text-4xl font-semibold">Who is in your flow.</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Not a directory. The few people whose work, growth, or waiting is
        connected to yours this week.
      </p>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
        {people.map((person) => (
          <li key={person.id}>
            <Surface className="h-full p-5">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-xs text-accent"
                  aria-hidden="true"
                >
                  {person.initials}
                </span>
                <div>
                  <p className="font-medium">{person.name}</p>
                  <p className="text-xs text-muted">{person.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm">{person.status}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {person.note}
              </p>
            </Surface>
          </li>
        ))}
      </ul>

      <section className="mt-12" aria-labelledby="activity-heading">
        <h2 id="activity-heading" className="font-mono text-xs tracking-[0.22em] text-muted">
          Team activity
        </h2>
        <ol className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {activity.map((item) => {
            const person = personById(item.personId);
            return (
              <li key={item.id} className="py-3">
                <p className="text-sm">
                  <span className="text-ink">{person?.name}</span>{" "}
                  <span className="text-ink-soft">{item.action}</span>
                </p>
                <p className="mt-1 text-xs text-muted">{item.time}</p>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}

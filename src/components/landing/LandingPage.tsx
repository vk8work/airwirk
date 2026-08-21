import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Surface } from "@/components/ui/Surface";

const dimensions = [
  {
    name: "People",
    line: "Who needs you, and how the team is actually doing.",
  },
  {
    name: "Work",
    line: "What is moving, what is stuck, and what you own.",
  },
  {
    name: "Growth",
    line: "How you are developing — attached to the work, not beside it.",
  },
  {
    name: "Organization",
    line: "The structure and decisions that make the rest possible.",
  },
];

const flow = [
  {
    kicker: "NOW",
    title: "What needs attention.",
    body: "A short, honest list. Decisions, people, and work that will stall if you wait.",
  },
  {
    kicker: "NEXT",
    title: "What is coming.",
    body: "Milestones, rooms, and commitments — so you can prepare instead of react.",
  },
  {
    kicker: "FLOW",
    title: "How it is progressing.",
    body: "Work, goals, growth, and team signal in one picture. Not a dashboard of widgets.",
  },
];

export function LandingPage() {
  return (
    <div className="atmosphere min-h-screen">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-[#06241e]"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-[var(--line)]">
        <div className="glass mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <Link href="/" aria-label="AirWirk home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
            <a href="#philosophy" className="hover:text-ink">
              Philosophy
            </a>
            <a href="#flow" className="hover:text-ink">
              Flow
            </a>
            <a href="#intelligence" className="hover:text-ink">
              Intelligence
            </a>
            <Link href="/todo" className="hover:text-ink">
              To Do
            </Link>
          </nav>
          <Button href="/demo">Enter workspace</Button>
        </div>
      </header>

      <main id="content">
        <section className="mx-auto max-w-6xl px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent">
            AirWirk
          </p>
          <h1 className="display mt-5 max-w-4xl text-5xl font-semibold leading-[1.05] sm:text-7xl">
            Everything work.
            <br />
            One flow.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            People, work, growth and organization — connected in one intelligent
            workspace.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/demo">Open the AirWirk workspace</Button>
            <Button href="#philosophy" variant="ghost">
              See the philosophy
            </Button>
          </div>
        </section>

        <section
          id="philosophy"
          className="mx-auto max-w-6xl px-5 pb-24 sm:px-8"
        >
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted">
                The problem
              </p>
              <h2 className="display mt-3 text-3xl font-semibold sm:text-4xl">
                Work did not fragment. The software did.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft">
                Goals live in one tool. Tasks in another. Learning in a third.
                People experience in a fourth. The employee is left to assemble
                a coherent day from pieces that were never designed to speak.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
                AirWirk is built the other way: complexity underneath,
                simplicity on top. An operating system for work — not a hallway
                of HR modules.
              </p>
            </div>
            <Surface className="p-6 sm:p-8">
              <p className="text-sm text-muted">What the person should feel</p>
              <ul className="mt-5 space-y-3 text-ink">
                {[
                  "What matters now",
                  "What comes next",
                  "How their work is progressing",
                  "How they are growing",
                  "What needs their attention",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-px w-6 bg-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Surface>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">
            Four dimensions. One system.
          </p>
          <h2 className="display mt-3 max-w-2xl text-3xl font-semibold sm:text-4xl">
            People · Work · Growth · Organization
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">
            Not a feature grid. Connected parts of the same day.
          </p>
          <ol className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {dimensions.map((dimension, index) => (
              <li
                key={dimension.name}
                className="grid gap-3 py-6 sm:grid-cols-[7rem_10rem_1fr] sm:items-baseline"
              >
                <span className="font-mono text-xs text-muted">
                  0{index + 1}
                </span>
                <span className="display text-xl font-semibold">
                  {dimension.name}
                </span>
                <span className="text-ink-soft">{dimension.line}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="flow" className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">
            The core experience
          </p>
          <h2 className="display mt-3 text-3xl font-semibold sm:text-4xl">
            NOW → NEXT → FLOW
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {flow.map((item) => (
              <Surface key={item.kicker} className="p-6 sm:p-7">
                <p className="font-mono text-xs tracking-[0.2em] text-accent">
                  {item.kicker}
                </p>
                <h3 className="mt-4 text-lg font-medium">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </Surface>
            ))}
          </div>
        </section>

        <section
          id="intelligence"
          className="mx-auto max-w-6xl px-5 pb-24 sm:px-8"
        >
          <Surface className="grid gap-8 p-6 sm:p-10 lg:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted">
                Intelligence
              </p>
              <h2 className="display mt-3 text-3xl font-semibold">
                Ask AirWirk.
              </h2>
              <p className="mt-4 max-w-md text-ink-soft">
                Not a chatbot bolted onto a directory. A way to ask across
                people, work, growth, and organization — and get an answer that
                already knows your day.
              </p>
              <div className="mt-8">
                <Button href="/demo">Try it in the workspace</Button>
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-5">
              <p className="text-sm text-muted">You</p>
              <p className="mt-1 text-ink">What should I focus on today?</p>
              <p className="mt-5 text-sm text-muted">AirWirk</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                Freeze Northstar scope before 3:00. Then unblock Jordan’s review
                loop. If you have ten minutes, send Priya the growth check-in —
                it protects both her mentoring goal and the team pulse.
              </p>
            </div>
          </Surface>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-28 sm:px-8">
          <div className="text-center">
            <h2 className="display text-3xl font-semibold sm:text-5xl">
              Enter a workspace that already knows the shape of the day.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-ink-soft">
              A simulated AirWirk environment for Maya Reyes, Product Lead.
              Realistic work. No accounts. No noise.
            </p>
            <div className="mt-8">
              <Button href="/demo">Enter workspace</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Logo />
          <p>
            V0 · A demonstration of the AirWirk workplace.{" "}
            <Link href="/todo" className="text-ink-soft hover:text-ink">
              To Do
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

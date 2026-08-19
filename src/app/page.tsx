"use client";

import { useState } from "react";

const pillars = [
  {
    title: "People",
    description: "Connect teams, skills, and goals in one shared view.",
  },
  {
    title: "Work",
    description: "Plan, prioritize, and deliver work with clarity.",
  },
  {
    title: "Growth",
    description: "Track progress, feedback, and development over time.",
  },
  {
    title: "Organization",
    description: "Align structure, culture, and outcomes across the company.",
  },
];

export default function Home() {
  const [activePillar, setActivePillar] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  function handleStart() {
    const pillar = pillars[activePillar];
    setMessage(`Welcome to airwirk — your ${pillar.title.toLowerCase()} workspace is ready.`);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-16">
        <header className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            airwirk
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            The unified intelligent workplace platform
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            People, work, growth, and organization in one flow.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          {pillars.map((pillar, index) => {
            const selected = index === activePillar;
            return (
              <button
                key={pillar.title}
                type="button"
                onClick={() => setActivePillar(index)}
                className={`rounded-2xl border p-6 text-left transition ${
                  selected
                    ? "border-blue-500 bg-white shadow-md"
                    : "border-slate-200 bg-white/70 hover:border-slate-300"
                }`}
              >
                <h2 className="text-xl font-semibold text-slate-900">{pillar.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{pillar.description}</p>
              </button>
            );
          })}
        </section>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleStart}
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Start workspace
          </button>
          <p className="text-sm text-slate-500">
            Selected focus: <span className="font-medium text-slate-800">{pillars[activePillar].title}</span>
          </p>
        </div>

        {message ? (
          <div
            role="status"
            className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 text-blue-900"
          >
            {message}
          </div>
        ) : null}
      </div>
    </main>
  );
}

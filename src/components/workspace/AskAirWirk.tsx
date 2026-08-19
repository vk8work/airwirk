"use client";

import { useEffect, useId, useRef, useState } from "react";
import { answerAskAirWirk, suggestedPrompts } from "@/data/intelligence";
import type { ChatMessage } from "@/lib/types";

type AskAirWirkProps = {
  open: boolean;
  seed?: string;
  onClose: () => void;
};

export function AskAirWirk({ open, seed, onClose }: AskAirWirkProps) {
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const sentSeedRef = useRef<string | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "airwirk",
      content:
        "Ask across your day. I will answer from Maya’s live workspace — work, people, growth, and what is next.",
    },
  ]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (open) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) {
      sentSeedRef.current = null;
      return;
    }
    if (seed && sentSeedRef.current !== seed) {
      sentSeedRef.current = seed;
      void send(seed);
    }
    // Intentionally run on open/seed only; send reads latest pending via closure.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, seed]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
    };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setPending(true);

    await new Promise((resolve) => window.setTimeout(resolve, 420));
    const reply: ChatMessage = {
      id: `a-${Date.now()}`,
      role: "airwirk",
      content: answerAskAirWirk(trimmed),
    };
    setMessages((current) => [...current, reply]);
    setPending(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close Ask AirWirk"
        className="absolute inset-0 bg-black/55"
        onClick={onClose}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[88vh] w-full max-w-xl flex-col rounded-t-3xl border border-[var(--line)] bg-[var(--bg-elevated)] sm:rounded-3xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-[var(--line)] px-5 py-4">
          <div>
            <h2 id={titleId} className="display text-xl font-semibold">
              Ask AirWirk
            </h2>
            <p className="mt-1 text-sm text-muted">
              Connected answers from the demo workspace.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-3 py-1.5 text-sm text-ink-soft hover:text-ink"
          >
            Close
          </button>
        </header>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4">
          {messages.map((message) => (
            <article key={message.id}>
              <p className="text-xs uppercase tracking-[0.16em] text-muted">
                {message.role === "user" ? "You" : "AirWirk"}
              </p>
              <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">
                {message.content}
              </p>
            </article>
          ))}
          {pending ? (
            <p className="text-sm text-muted" role="status">
              Connecting the day…
            </p>
          ) : null}
        </div>

        <div className="border-t border-[var(--line)] px-5 py-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => void send(prompt)}
                className="rounded-full border border-[var(--line)] px-3 py-1.5 text-xs text-ink-soft hover:text-ink"
              >
                {prompt}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              void send(input);
            }}
          >
            <label className="sr-only" htmlFor="ask-input">
              Ask AirWirk
            </label>
            <input
              id="ask-input"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about today, Northstar, people, growth…"
              className="h-11 flex-1 rounded-full border border-[var(--line-strong)] bg-transparent px-4 text-sm text-ink placeholder:text-muted"
            />
            <button
              type="submit"
              disabled={pending}
              className="rounded-full bg-accent px-4 text-sm font-medium text-[#06241e] disabled:opacity-50"
            >
              Ask
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

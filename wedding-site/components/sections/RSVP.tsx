"use client";

import { useState, type FormEvent } from "react";
import { RevealLine } from "@/components/ui/RevealLine";

type FormState = {
  name: string;
  guests: string;
  attending: "yes" | "no" | "";
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = { name: "", guests: "1", attending: "", message: "" };

export function RSVP() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(state: FormState): Errors {
    const next: Errors = {};
    if (!state.name.trim()) next.name = "Please tell us your name.";
    if (!state.attending) next.attending = "Let us know if you can make it.";
    const guestNum = Number(state.guests);
    if (!Number.isInteger(guestNum) || guestNum < 1 || guestNum > 10) {
      next.guests = "Enter a number between 1 and 10.";
    }
    return next;
  }

  function handleSubmit(e: FormEvent, attending: "yes" | "no") {
    e.preventDefault();
    const state = { ...form, attending };
    const next = validate(state);
    setErrors(next);
    setForm(state);
    if (Object.keys(next).length === 0) {
      // Backend-integration-ready: replace with your RSVP API / form endpoint.
      // fetch("/api/rsvp", { method: "POST", body: JSON.stringify(state) })
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <section className="relative bg-ink px-6 py-28 text-center md:py-36">
        <RevealLine as="h2" className="story-line text-3xl text-goldBright md:text-4xl">
          Thank you, {form.name.split(" ")[0]}.
        </RevealLine>
        <RevealLine delay={0.15} className="mt-3 font-body text-sm text-mist md:text-base">
          {form.attending === "yes"
            ? "We can't wait to celebrate with you."
            : "You'll be with us in spirit — thank you for letting us know."}
        </RevealLine>
      </section>
    );
  }

  return (
    <section className="relative bg-ink px-6 py-24 md:py-32">
      <div className="mx-auto max-w-lg">
        <RevealLine as="h2" className="story-line text-center text-3xl text-jasmine md:text-4xl">
          RSVP
        </RevealLine>
        <RevealLine delay={0.1} className="mt-3 text-center font-body text-sm text-mist md:text-base">
          We would love to celebrate this special day with you.
        </RevealLine>

        <form className="mt-10 space-y-5" noValidate>
          <div>
            <label htmlFor="name" className="mb-1.5 block font-body text-xs uppercase tracking-wide2 text-gold">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-sm border border-gold/25 bg-transparent px-4 py-2.5 font-body text-jasmine outline-none transition-colors focus:border-gold"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 font-body text-xs text-ember">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="guests" className="mb-1.5 block font-body text-xs uppercase tracking-wide2 text-gold">
              Number of guests
            </label>
            <input
              id="guests"
              type="number"
              min={1}
              max={10}
              value={form.guests}
              onChange={(e) => setForm((f) => ({ ...f, guests: e.target.value }))}
              className="w-full rounded-sm border border-gold/25 bg-transparent px-4 py-2.5 font-body text-jasmine outline-none transition-colors focus:border-gold"
              aria-invalid={!!errors.guests}
              aria-describedby={errors.guests ? "guests-error" : undefined}
            />
            {errors.guests && (
              <p id="guests-error" className="mt-1 font-body text-xs text-ember">
                {errors.guests}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block font-body text-xs uppercase tracking-wide2 text-gold">
              Message (optional)
            </label>
            <textarea
              id="message"
              rows={3}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full resize-none rounded-sm border border-gold/25 bg-transparent px-4 py-2.5 font-body text-jasmine outline-none transition-colors focus:border-gold"
            />
          </div>

          {errors.attending && <p className="font-body text-xs text-ember">{errors.attending}</p>}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="submit"
              onClick={(e) => handleSubmit(e, "yes")}
              className="flex-1 rounded-full bg-gold px-5 py-3 font-body text-sm font-medium text-ink transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-jasmine"
            >
              I&rsquo;ll Be There ❤️
            </button>
            <button
              type="submit"
              onClick={(e) => handleSubmit(e, "no")}
              className="flex-1 rounded-full border border-gold/30 px-5 py-3 font-body text-sm text-mist transition-colors hover:border-gold/60 hover:text-jasmine focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            >
              Sorry, I Can&rsquo;t Make It
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

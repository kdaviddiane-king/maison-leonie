"use client";

import { useState } from "react";

const fieldClass =
  "w-full border-b border-line bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-ink";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  // Pas encore de back-end : le formulaire affiche simplement une confirmation.
  // On pourra le brancher sur Formspree, Resend ou une route API plus tard.
  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-sm border border-line bg-cream p-8">
        <p className="font-display text-2xl">Message envoyé.</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Merci pour votre message. Nous vous répondons généralement sous 24 h
          ouvrées.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-[11px] uppercase tracking-[0.18em] text-muted underline underline-offset-4 transition-colors hover:text-ink"
        >
          Écrire un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.16em] text-muted">
            Nom
          </span>
          <input
            type="text"
            name="nom"
            required
            placeholder="Votre nom"
            className={fieldClass}
          />
        </label>

        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.16em] text-muted">
            E-mail
          </span>
          <input
            type="email"
            name="email"
            required
            placeholder="vous@exemple.fr"
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block">
        <span className="text-[10px] uppercase tracking-[0.16em] text-muted">
          Sujet
        </span>
        <select name="sujet" className={fieldClass} defaultValue="Une pièce">
          <option>Une pièce</option>
          <option>Une commande</option>
          <option>Un retour</option>
          <option>Autre</option>
        </select>
      </label>

      <label className="block">
        <span className="text-[10px] uppercase tracking-[0.16em] text-muted">
          Message
        </span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Dites-nous tout…"
          className={`${fieldClass} resize-none`}
        />
      </label>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[11px] uppercase tracking-[0.18em] text-cream transition-colors duration-300 hover:bg-accent"
      >
        Envoyer le message
      </button>
    </form>
  );
}

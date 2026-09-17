"use client";

import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";
import { RevealLine } from "@/components/ui/RevealLine";
import { wedding } from "@/data/wedding";

function buildMessage() {
  return `You are invited to celebrate the wedding of ${wedding.groom.name} & ${wedding.bride.name} ❤️\n\nTheir story continues here:\n${wedding.siteUrl}`;
}

export function ShareInvitation() {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const text = buildMessage();
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Our Wedding Invitation", text, url: wedding.siteUrl });
        return;
      } catch {
        /* user cancelled — fall through to WhatsApp */
      }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(buildMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section className="relative bg-ink px-6 py-24 text-center md:py-32">
      <RevealLine as="h2" className="story-line text-2xl text-jasmine md:text-3xl">
        Share Our Story
      </RevealLine>
      <RevealLine delay={0.1} className="mx-auto mt-3 max-w-sm font-body text-sm text-mist">
        Know someone who'd love to be part of this day? Send them the invitation.
      </RevealLine>

      <RevealLine delay={0.2} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-body text-sm font-medium text-ink transition-transform hover:scale-[1.02]"
        >
          <Share2 className="h-4 w-4" /> Share invitation
        </button>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-6 py-3 font-body text-sm text-mist transition-colors hover:border-gold/60 hover:text-jasmine"
        >
          {copied ? <Check className="h-4 w-4 text-gold" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy link"}
        </button>
      </RevealLine>
    </section>
  );
}

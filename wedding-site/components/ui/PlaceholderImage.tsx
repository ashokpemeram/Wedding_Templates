"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Renders a real photo when it exists, and otherwise falls back to an
 * elegant placeholder panel that clearly marks itself for replacement —
 * so the site never shows a broken image while real photos are pending.
 */
export function PlaceholderImage({
  src,
  alt,
  label,
  className,
  sizes = "100vw",
  fill = true,
  priority = false,
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  sizes?: string;
  fill?: boolean;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 border border-gold/20 bg-gradient-to-br from-maroon/40 to-ink text-mist",
          className
        )}
      >
        <ImageIcon className="h-6 w-6 opacity-50" strokeWidth={1.2} />
        <span className="font-body text-xs tracking-wide text-mist/80">
          {label ?? "Replace with photo"}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}

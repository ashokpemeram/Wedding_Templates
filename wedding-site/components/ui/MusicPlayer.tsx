"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, Pause, Volume2, VolumeX } from "lucide-react";
import { wedding } from "@/data/wedding";

/**
 * Floating, unobtrusive music control. Never autoplays — audio only
 * starts after the visitor explicitly taps play, per browser policy
 * and the brief's requirement to avoid autoplaying music.
 */
export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const audio = new Audio(wedding.music.src);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {
        /* file not present yet — placeholder audio, fail silently */
      });
      setPlaying(true);
    }
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !muted;
    setMuted(!muted);
  }

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <AnimatePresence>
        {expanded && playing && (
          <motion.button
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            onClick={toggleMute}
            aria-label={muted ? "Unmute music" : "Mute music"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-ink/80 text-gold backdrop-blur-md"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </motion.button>
        )}
      </AnimatePresence>
      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : `Play "${wedding.music.title}"`}
        aria-pressed={playing}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-ink/80 text-gold shadow-[0_0_18px_rgba(201,162,75,0.25)] backdrop-blur-md transition-colors hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
      >
        {playing ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Music2 className={`h-4 w-4 ${!playing ? "animate-flicker" : ""}`} />
        )}
      </button>
    </div>
  );
}

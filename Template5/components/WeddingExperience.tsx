"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import { CalendarPlus, ChevronDown, Heart, MapPin, Music2, Navigation, Pause, Play, Send, VolumeX, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { WeddingData } from "@/data/wedding";

const CinematicCanvas = dynamic(() => import("./3d/CinematicCanvas").then((module) => module.CinematicCanvas), {
  ssr: false,
  loading: () => <div className="canvas-loading" aria-hidden="true" />
});

type Chapter = {
  number: string;
  label: string;
  eyebrow: string;
  title: string;
  copy: string;
  tone?: "dark" | "warm" | "ivory";
  key: string;
};

function prettyDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${date}T12:00:00`));
}

function calendarUrl(data: WeddingData) {
  const [clock, meridiem] = data.wedding.time.split(" ");
  const [rawHour, minutes] = clock.split(":").map(Number);
  const hour = (rawHour % 12) + (meridiem?.toLowerCase() === "pm" ? 12 : 0);
  const startsAt = new Date(`${data.wedding.date}T${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`);
  const endsAt = new Date(startsAt.getTime() + 4 * 60 * 60 * 1000);
  const dateStamp = (value: Date) => `${value.getFullYear()}${String(value.getMonth() + 1).padStart(2, "0")}${String(value.getDate()).padStart(2, "0")}T${String(value.getHours()).padStart(2, "0")}${String(value.getMinutes()).padStart(2, "0")}00`;
  const start = dateStamp(startsAt);
  const end = dateStamp(endsAt);
  const details = encodeURIComponent(`The wedding of ${data.bride.name} & ${data.groom.name}`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`${data.bride.name} & ${data.groom.name} — Wedding`)}&dates=${start}/${end}&details=${details}&location=${encodeURIComponent(data.wedding.address)}`;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useSmoothScroll(setProgress: (progress: number) => void) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.075, smoothWheel: true, wheelMultiplier: 0.8, touchMultiplier: 1.3 });
    let animationFrame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };
    animationFrame = requestAnimationFrame(raf);
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => setProgress(self.progress)
    });
    return () => {
      cancelAnimationFrame(animationFrame);
      trigger.kill();
      lenis.destroy();
    };
  }, [setProgress]);
}

function MusicControl({ data }: { data: WeddingData }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState<"idle" | "playing" | "unavailable">("idle");
  const toggle = async () => {
    if (!data.music.enabled || !audio.current) return;
    try {
      if (status === "playing") {
        audio.current.pause();
        setStatus("idle");
      } else {
        await audio.current.play();
        setStatus("playing");
      }
    } catch {
      setStatus("unavailable");
    }
  };
  return <>
    <audio ref={audio} src={data.music.src} loop preload="none" onError={() => setStatus("unavailable")} />
    <button className="sound-button" onClick={toggle} aria-label={status === "playing" ? "Pause background music" : "Play background music"} title={status === "unavailable" ? "Add music/wedding.mp3 to enable sound" : undefined}>
      {status === "playing" ? <Pause size={14} fill="currentColor" /> : status === "unavailable" ? <VolumeX size={15} /> : <Music2 size={15} />}
      <span>{status === "playing" ? "Pause" : status === "unavailable" ? "Sound off" : "Sound"}</span>
    </button>
  </>;
}

function ChapterPanel({ chapter, active, onActive, children }: { chapter: Chapter; active: boolean; onActive: () => void; children?: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.42) onActive();
    }, { threshold: [0.42, 0.6] });
    observer.observe(element);
    return () => observer.disconnect();
  }, [onActive]);
  return <section ref={ref} id={chapter.key} className={`story-section tone-${chapter.tone ?? "dark"}`} aria-labelledby={`${chapter.key}-title`}>
    <motion.div className="chapter-copy" initial={{ opacity: 0, y: 26 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0.15, y: 26 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}>
      <p className="eyebrow">{chapter.eyebrow}</p>
      <h2 id={`${chapter.key}-title`}>{chapter.title}</h2>
      <p className="chapter-description">{chapter.copy}</p>
      {children}
    </motion.div>
  </section>;
}

function Countdown({ date }: { date: string }) {
  const getRemaining = useCallback(() => {
    const difference = new Date(`${date}T00:00:00`).getTime() - Date.now();
    const total = Math.max(0, difference);
    return {
      days: Math.floor(total / 86_400_000),
      hours: Math.floor(total / 3_600_000) % 24,
      minutes: Math.floor(total / 60_000) % 60,
      seconds: Math.floor(total / 1_000) % 60
    };
  }, [date]);
  const [time, setTime] = useState(getRemaining);
  useEffect(() => {
    const timer = window.setInterval(() => setTime(getRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, [getRemaining]);
  return <div className="countdown" aria-label="Countdown to the wedding">
    {Object.entries(time).map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}
  </div>;
}

function MemoryUniverse({ gallery, bride, groom }: { gallery: readonly string[]; bride: string; groom: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  return <>
    <div className="memory-orbit" aria-label="Memory gallery">
      {gallery.map((image, index) => <button className={`memory-card memory-${index + 1}`} key={image} onClick={() => setSelected(index)} aria-label={`Open memory ${index + 1}`}>
        <span className="memory-photo"><span>{index === 0 ? "The beginning" : index === 1 ? "A thousand laughs" : index === 2 ? "Our favourite place" : "Always us"}</span></span>
        <small>{bride} + {groom}</small>
      </button>)}
    </div>
    <AnimatePresence>
      {selected !== null && <motion.div className="memory-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Memory preview" onClick={() => setSelected(null)}>
        <motion.div className="lightbox-card" initial={{ scale: 0.9, y: 22 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 22 }} onClick={(event) => event.stopPropagation()}>
          <button onClick={() => setSelected(null)} className="close-button" aria-label="Close memory"><X size={18} /></button>
          <div className={`lightbox-art art-${selected + 1}`} />
          <p>{["The beginning", "A thousand laughs", "Our favourite place", "Always us"][selected]}</p>
          <span>Replace this art with {gallery[selected]} whenever your photographs are ready.</span>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </>;
}

function Rsvp({ names, deadline }: { names: string; deadline: string }) {
  const [reply, setReply] = useState<string | null>(null);
  return <section id="rsvp" className="rsvp-section">
    <div className="rsvp-ornament" aria-hidden="true">✦</div>
    <p className="eyebrow">RSVP</p>
    <h2>Come celebrate<br /><i>our forever.</i></h2>
    <p>We would love to celebrate this beautiful beginning with you.</p>
    <div className="rsvp-actions">
      <button onClick={() => setReply("We cannot wait to celebrate with you.")}><Heart size={16} fill="currentColor" /> Accept with love</button>
      <button onClick={() => setReply("Your wishes mean the world to us.")}><Send size={16} /> Send wishes</button>
      <button onClick={() => setReply("We will miss you, and are sending love your way.")}>Can’t make it</button>
    </div>
    <AnimatePresence>{reply && <motion.p className="reply-message" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>{reply}</motion.p>}</AnimatePresence>
    <p className="rsvp-note">Please reply by {prettyDate(deadline)} · {names}</p>
  </section>;
}

export function WeddingExperience({ data }: { data: WeddingData }) {
  const reduceMotion = useReducedMotion() ?? false;
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const setSmoothProgress = useCallback((value: number) => setProgress(value), []);
  useSmoothScroll(setSmoothProgress);
  const chapters = useMemo<Chapter[]>(() => [
    { number: "00", label: "Prologue", eyebrow: "Once upon a time", title: "Sometimes, two people meet…", copy: "Two small lights found each other in the vastness of an ordinary day. And nothing was ordinary again.", key: "opening" },
    { number: "01", label: "Two worlds", eyebrow: "Chapter one", title: "Two lives. Two journeys.", copy: "Her world, full of warmth. His, full of wonder. Two separate paths, quietly travelling towards the same moment.", key: "worlds" },
    { number: "02", label: "The encounter", eyebrow: "Chapter two", title: "Life introduced us.", copy: data.story.firstMeeting, key: "encounter" },
    { number: "03", label: "Between hello & forever", eyebrow: "Chapter three", title: "One conversation became many.", copy: "Many moments became memories. And memories became something much more beautiful.", key: "between" },
    { number: "04", label: "Falling in love", eyebrow: "Chapter four", title: "We became us.", copy: "Somewhere along the way, being two people no longer made sense. Love had made a home between us.", key: "love" },
    { number: "05", label: "The hard chapters", eyebrow: "Chapter five", title: "Love isn’t always a straight road.", copy: data.story.challenges, tone: "dark", key: "challenges" },
    { number: "06", label: "The choice", eyebrow: "Chapter six", title: "We chose each other.", copy: "When it mattered, we chose the same direction. Again, and then again.", key: "choice" },
    { number: "07", label: "Growing together", eyebrow: "Chapter seven", title: "We grew roots.", copy: "Trust. Respect. Friendship. Understanding. Family. Dreams. Support. Love.", key: "growing" },
    { number: "08", label: "The question", eyebrow: "Chapter eight", title: "Will you walk with me…", copy: "…for the rest of our lives?", key: "proposal" },
    { number: "09", label: "Two families", eyebrow: "Chapter nine", title: "One beautiful beginning.", copy: `${data.families.bride} and ${data.families.groom} — two traditions woven into one celebration.`, key: "families" },
    { number: "10", label: "The journey", eyebrow: "Chapter ten", title: "The road leads home.", copy: "First meeting. Love. Challenges. Together. Proposal. Families. A promise in bloom.", key: "journey" },
    { number: "11", label: "The mandapam", eyebrow: "Chapter eleven", title: "Where our vows take flight.", copy: "Beneath marigolds, jasmine and a canopy of warm light — surrounded by everyone we love.", key: "mandapam" },
    { number: "12", label: "Our memories", eyebrow: "Chapter twelve", title: "Moments, held forever.", copy: "A small universe of the days that led us here. Tap a memory to linger a little longer.", key: "memories" },
    { number: "13", label: "The big day", eyebrow: "Chapter thirteen", title: "The stars are counting too.", copy: "Until the celebration begins.", key: "countdown" },
    { number: "14", label: "Where forever begins", eyebrow: "Chapter fourteen", title: "Meet us at the aisle.", copy: "A place made beautiful by the people inside it — and by the promise we make there.", key: "venue" },
    { number: "15", label: "Our next chapter", eyebrow: "Epilogue", title: "Ours has a forever.", copy: "Every love story has a beginning. This is ours.", key: "final" }
  ], [data]);
  const activeChapter = chapters[activeIndex] ?? chapters[0];
  const names = `${data.bride.name} & ${data.groom.name}`;
  return <main className="experience-shell">
    <div className="cinema" aria-hidden="true"><CinematicCanvas progress={progress} reducedMotion={reduceMotion} /></div>
    <div className="grain" aria-hidden="true" />
    <aside className="floating-ui" aria-label="Invitation controls">
      <div className="chapter-marker"><span>{activeChapter.number} / 15</span><em>{activeChapter.label}</em></div>
      <MusicControl data={data} />
    </aside>
    <div className="progress-rail" aria-hidden="true"><i style={{ transform: `scaleY(${Math.max(0.015, progress)})` }} /></div>
    <div className="story-content">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <p className="eyebrow">A love story in fifteen chapters</p>
        <h1 id="hero-title"><span>{data.bride.name}</span><b>&</b><span>{data.groom.name}</span></h1>
        <p className="hero-line">A story written by fate, completed by love.</p>
        <button className="scroll-cue" onClick={() => scrollTo("opening")} aria-label="Begin our story"><span>Begin the story</span><ChevronDown size={16} /></button>
      </section>
      {chapters.map((chapter, index) => <ChapterPanel chapter={chapter} active={activeIndex === index} onActive={() => setActiveIndex(index)} key={chapter.key}>
        {chapter.key === "proposal" && <p className="yes">YES.</p>}
        {chapter.key === "memories" && <MemoryUniverse gallery={data.gallery} bride={data.bride.name} groom={data.groom.name} />}
        {chapter.key === "countdown" && <Countdown date={data.wedding.date} />}
        {chapter.key === "venue" && <div className="venue-details"><span>{data.wedding.venue}</span><span>{prettyDate(data.wedding.date)} · {data.wedding.time}</span><span>{data.wedding.city}</span><div><a href={`https://maps.google.com/?q=${encodeURIComponent(data.wedding.address)}`} target="_blank" rel="noreferrer"><Navigation size={14} /> Get directions</a><a href={calendarUrl(data)} target="_blank" rel="noreferrer"><CalendarPlus size={14} /> Add to calendar</a><a href={`https://maps.google.com/?q=${encodeURIComponent(data.wedding.address)}`} target="_blank" rel="noreferrer"><MapPin size={14} /> View venue</a></div></div>}
        {chapter.key === "final" && <div className="final-names"><span>{names}</span><small>{prettyDate(data.wedding.date)}</small></div>}
      </ChapterPanel>)}
      <Rsvp names={names} deadline={data.rsvp.deadline} />
      <footer><MapPin size={14} /> {data.wedding.venue}, {data.wedding.city}<span>Made with love for {names}</span></footer>
    </div>
  </main>;
}

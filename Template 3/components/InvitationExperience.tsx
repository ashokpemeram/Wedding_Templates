"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarPlus, ChevronDown, ChevronUp, MapPin, Music2, Pause, Send, Sparkles, Volume2, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { wedding } from "@/data/wedding";

const CinematicWorld = dynamic(() => import("./CinematicWorld"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

function useCinematicScroll(reducedMotion: boolean) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (reducedMotion) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, lerp: 0.08 });
    let frame = 0;
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setProgress(self.progress),
    });
    return () => { cancelAnimationFrame(frame); trigger.kill(); lenis.destroy(); };
  }, [reducedMotion]);
  return progress;
}

function Countdown() {
  const getRemaining = () => Math.max(0, new Date(wedding.weddingDate).getTime() - Date.now());
  const [remaining, setRemaining] = useState(getRemaining);
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const time = useMemo(() => {
    const seconds = Math.floor(remaining / 1000);
    return [
      [Math.floor(seconds / 86400), "days"],
      [Math.floor((seconds % 86400) / 3600), "hours"],
      [Math.floor((seconds % 3600) / 60), "minutes"],
      [seconds % 60, "seconds"],
    ];
  }, [remaining]);
  return <div className="countdown-grid">{time.map(([number, label]) => <div key={String(label)}><strong>{String(number).padStart(2, "0")}</strong><span>{label}</span></div>)}</div>;
}

function MusicControl() {
  const [playing, setPlaying] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const toggle = () => {
    const next = !playing;
    setPlaying(next);
    if (next && typeof window !== "undefined") {
      audioContext.current ??= new AudioContext();
      const oscillator = audioContext.current.createOscillator();
      const gain = audioContext.current.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(523.25, audioContext.current.currentTime);
      gain.gain.setValueAtTime(0.0001, audioContext.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.025, audioContext.current.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.current.currentTime + 1.1);
      oscillator.connect(gain).connect(audioContext.current.destination);
      oscillator.start(); oscillator.stop(audioContext.current.currentTime + 1.15);
    }
  };
  return <button className="music-control" onClick={toggle} aria-label={playing ? "Pause wedding soundscape" : "Play wedding soundscape"}>{playing ? <Pause size={15} fill="currentColor" /> : <Music2 size={15} />}<span>{playing ? "Soundscape on" : "Soundscape"}</span><i className={playing ? "is-playing" : ""} /></button>;
}

function SectionMark({ number, label }: { number: string; label: string }) {
  return <div className="section-mark"><span>{number}</span><i /><em>{label}</em></div>;
}

function CalendarButton() {
  const addCalendar = () => {
    const start = "20270117T010000Z";
    const end = "20270117T110000Z";
    const file = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${start}\nDTEND:${end}\nSUMMARY:${wedding.couple.groom} & ${wedding.couple.bride}'s Wedding\nLOCATION:${wedding.venue.name}, ${wedding.venue.address}\nEND:VEVENT\nEND:VCALENDAR`;
    const url = URL.createObjectURL(new Blob([file], { type: "text/calendar" }));
    const link = document.createElement("a"); link.href = url; link.download = "anaya-arjun-wedding.ics"; link.click(); URL.revokeObjectURL(url);
  };
  return <button className="button button-ghost" onClick={addCalendar}><CalendarPlus size={16} /> Add to calendar</button>;
}

function RSVP() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  return <section className="rsvp-section" id="rsvp">
    <div className="rsvp-intro"><SectionMark number="15" label="the invitation" /><p className="eyebrow">Your presence would mean the world</p><h2>We would love<br />to see you.</h2><p>Come celebrate the joining of our families and the first page of a beautiful life together.</p></div>
    <motion.form className="rsvp-form" onSubmit={submit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <label>Your name<input name="name" placeholder="Enter your name" required /></label>
      <div className="form-pair"><label>Guests<select name="guests" defaultValue="2"><option>1</option><option>2</option><option>3</option><option>4+</option></select></label><label>Attendance<select name="attendance" defaultValue="joyfully"><option value="joyfully">Joyfully attending</option><option value="regretfully">Regretfully declining</option></select></label></div>
      <label>A note for the couple<textarea name="message" placeholder="Leave a wish for Anaya & Arjun" rows={3} /></label>
      <button className="button button-solid" type="submit"><Send size={15} /> I&apos;ll be there</button>
      <AnimatePresence>{sent && <motion.p className="form-success" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>Thank you. Your response has been received.</motion.p>}</AnimatePresence>
    </motion.form>
  </section>;
}

export default function InvitationExperience() {
  const reducedMotion = useReducedMotion() ?? false;
  const progress = useCinematicScroll(reducedMotion);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const scrollTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" }); };
  return <main>
    <CinematicWorld progress={progress} reducedMotion={reducedMotion} />
    <div className="cinematic-wash" />
    <header className="site-header">
      <button className="monogram" onClick={() => scrollTo("beginning")} aria-label="Back to the beginning">A<span>·</span>A</button>
      <p className="header-note">A family invitation</p>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>{menuOpen ? <X size={17} /> : <Sparkles size={16} />}<span>{menuOpen ? "Close" : "Explore"}</span></button>
    </header>
    <AnimatePresence>{menuOpen && <motion.nav className="story-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}><button onClick={() => scrollTo("beginning")}>The beginning</button><button onClick={() => scrollTo("celebration")}>Celebrations</button><button onClick={() => scrollTo("venue")}>Venue</button><button onClick={() => scrollTo("rsvp")}>RSVP</button></motion.nav>}</AnimatePresence>
    <div className="progress-rail" aria-hidden="true"><span style={{ transform: `scaleY(${Math.max(0.04, progress)})` }} /></div>
    <MusicControl />

    <section className="hero" id="beginning">
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.35 }}>
        <p className="eyebrow">With blessings from our families</p>
        <h1>ANAYA <i>&</i> ARJUN</h1>
        <p className="hero-date">17 · 01 · 27 <span /> Bengaluru</p>
      </motion.div>
      <div className="scroll-invite"><span>Scroll to enter the story</span><ChevronDown size={16} /></div>
    </section>

    <section className="prologue-section"><p>"Some journeys begin with a meeting.<br />Some begin with a blessing."</p></section>

    <div className="story-flow">
      {wedding.story.map((item, index) => <section className={`story-section section-${index + 1}`} key={item.eyebrow}>
        <SectionMark number={`0${index + 1}`} label={item.beat} />
        <motion.div className="story-copy" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.45, once: true }} transition={{ duration: 0.8 }}>
          <p className="eyebrow">{item.eyebrow}</p><h2>{item.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h2><p>{item.body}</p>
        </motion.div>
      </section>)}
    </div>

    <section className="wedding-reveal" id="celebration"><div className="reveal-inner"><SectionMark number="09" label="the mandapam" /><p className="eyebrow">The wedding</p><h2>ANAYA <i>&</i> ARJUN</h2><p className="reveal-date">Sunday, 17 January 2027 · 6:30 AM</p><div className="ornament">✦</div><p className="reveal-address">The Leela Palace, Bengaluru</p></div></section>

    <section className="events-section"><SectionMark number="10" label="celebrations" /><div className="section-heading"><p className="eyebrow">Save these moments</p><h2>Four beautiful<br />occasions.</h2></div><div className="event-list">{wedding.events.map((event, index) => <motion.article className={`event-card ${event.tone}`} key={event.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }}><span>0{index + 1}</span><h3>{event.name}</h3><p>{event.date}</p><strong>{event.time}</strong></motion.article>)}</div></section>

    <section className="countdown-section"><div className="mandala-frame"><div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="countdown-content"><p className="eyebrow">Until the celebration</p><Countdown /><p className="countdown-note">The first chapter of forever is almost here.</p></div></div></section>

    <section className="memory-section"><SectionMark number="12" label="the keepsakes" /><div className="section-heading"><p className="eyebrow">A few pages before forever</p><h2>Our story,<br />kept close.</h2></div><div className="memory-album">{wedding.memories.map((memory, index) => <button className={`memory-card memory-${index + 1}`} onClick={() => setLightbox(index)} key={memory.title}><span className="memory-stamp">{memory.date}</span><div className="memory-flower">{index === 1 ? "✺" : "✦"}</div><div><h3>{memory.title}</h3><p>{memory.caption}</p></div></button>)}</div></section>
    <AnimatePresence>{lightbox !== null && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)}><button aria-label="Close memory" onClick={() => setLightbox(null)}><X /></button><article onClick={(event) => event.stopPropagation()}><span>{wedding.memories[lightbox].date}</span><div className="lightbox-symbol">✦</div><h2>{wedding.memories[lightbox].title}</h2><p>{wedding.memories[lightbox].caption}</p></article></motion.div>}</AnimatePresence>

    <section className="venue-section" id="venue"><div className="venue-map"><div className="map-lines" /><div className="venue-pin"><MapPin fill="currentColor" size={28} /></div></div><div className="venue-copy"><SectionMark number="13" label="your arrival" /><p className="eyebrow">The venue</p><h2>{wedding.venue.name}</h2><p>{wedding.venue.address}</p><div className="venue-actions"><a className="button button-solid" href={wedding.venue.directions} target="_blank" rel="noreferrer"><MapPin size={16} /> Get directions</a><CalendarButton /></div></div></section>
    <RSVP />
    <footer><div className="footer-mandala">✦</div><p>Two lives. Two families. One beautiful beginning.</p><h2>Forever starts here.</h2><span>ANAYA & ARJUN</span></footer>
    <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })} aria-label="Back to top"><ChevronUp size={18} /></button>
  </main>;
}

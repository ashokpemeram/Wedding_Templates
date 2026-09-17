"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarPlus, ChevronDown, MapPin, Menu, Navigation as NavigationIcon, Share2, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { wedding } from "@/data/wedding";
import { Countdown } from "./countdown";
import { MusicControl } from "./music-control";
import { RSVP } from "./rsvp";

const CinematicScene = dynamic(() => import("./cinematic-scenes").then((mod) => mod.CinematicScene), {
  ssr: false,
  loading: () => <div className="scene scene-loading" aria-hidden="true" />
});

gsap.registerPlugin(ScrollTrigger);
const weddingEvent = wedding.events.find((event) => event.name === "Wedding") ?? wedding.events[0];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.22 }} transition={{ duration: reduced ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Chapter({ eyebrow, title, children, className = "", id }: { eyebrow: string; title?: React.ReactNode; children: React.ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`chapter ${className}`}><div className="chapter-inner"><Reveal><p className="eyebrow">{eyebrow}</p>{title && <h2>{title}</h2>}</Reveal>{children}</div></section>;
}

function Intro({ onComplete }: { onComplete: () => void }) {
  useEffect(() => { const timer = window.setTimeout(onComplete, 3900); return () => window.clearTimeout(timer); }, [onComplete]);
  return <motion.div className="intro" exit={{ opacity: 0, transition: { duration: 0.8 } }}><button onClick={onComplete} className="skip">Skip intro</button><div className="intro-orbit"><i /><i /></div><motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7}} className="intro-copy"><p>Every love story has a beginning.</p><span>Sometimes...</span><strong>Two people simply find their way to each other.</strong></motion.div></motion.div>;
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const links = [["story", "Their story"], ["journey", "Journey"], ["wedding", "Wedding"], ["rsvp", "RSVP"]] as const;
  return <header className="site-nav"><a href="#story" className="monogram" aria-label="Back to the beginning">A <span>✦</span> A</a><button className="menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Open navigation">{open ? <X /> : <Menu />}</button><nav className={open ? "nav-open" : ""}>{links.map(([href,label])=><a key={href} href={`#${href}`} onClick={()=>setOpen(false)}>{label}</a>)}</nav></header>;
}

function PhotoPlaceholder({ label, source, active = false }: { label: string; source?: string; active?: boolean }) {
  return <div className={`photo-placeholder ${active ? "active" : ""}`}><span>Photo placeholder</span><strong>{label}</strong><small>{source ?? "Replace in data/wedding.ts"}</small></div>;
}

function MessageStory() {
  const messages = ["Hi 👋", "Hey!", "How are you?", "Better, now that you texted."];
  return <div className="message-story">{messages.map((message, index)=><motion.p key={message} initial={{opacity:0,x:index % 2 ? 18 : -18}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:index*.16,duration:.55}} className={index % 2 ? "received" : "sent"}>{message}</motion.p>)}</div>;
}

function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const images = wedding.gallery;
  const previous = () => setSelected((selected) => selected === null ? null : (selected + images.length - 1) % images.length);
  const next = () => setSelected((selected) => selected === null ? null : (selected + 1) % images.length);
  return <><div className="gallery-grid">{images.map((image,index)=><button key={image.image} onClick={()=>setSelected(index)} className="gallery-item" aria-label={`Open ${image.label}`}><PhotoPlaceholder label={image.label} source={image.image} /><span>{String(index+1).padStart(2,"0")}</span></button>)}</div><AnimatePresence>{selected !== null && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Memory viewer" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><button onClick={()=>setSelected(null)} aria-label="Close photo"><X /></button><button onClick={previous} className="lightbox-prev" aria-label="Previous photo">←</button><PhotoPlaceholder label={images[selected].label} source={images[selected].image} active /><button onClick={next} className="lightbox-next" aria-label="Next photo">→</button><p>{selected+1} / {images.length}</p></motion.div>}</AnimatePresence></>;
}

export function StoryExperience() {
  const [intro, setIntro] = useState(true);
  const [journeyIndex, setJourneyIndex] = useState(0);
  const reduced = useReducedMotion();
  const calendar = useMemo(() => {
    const ics = (date: string) => date.replace(/[-:]/g, "").replace(/\+.*/, "");
    const content = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${ics(wedding.weddingDate)}\nDTEND:${ics(wedding.weddingEnd)}\nSUMMARY:${wedding.groom.name} & ${wedding.bride.name} Wedding\nLOCATION:${weddingEvent.venue}\nDESCRIPTION:Celebrate with us!\nEND:VEVENT\nEND:VCALENDAR`;
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(content)}`;
  }, []);
  const share = async () => {
    const text = `You are invited to celebrate the wedding of ${wedding.groom.name} & ${wedding.bride.name} ❤️\n\nTheir story continues here:`;
    if (navigator.share) { try { await navigator.share({ title: `${wedding.groom.name} & ${wedding.bride.name}`, text, url: window.location.href }); } catch { /* Sharing was dismissed; no action needed. */ } }
    else { window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${window.location.href}`)}`, "_blank", "noopener,noreferrer"); }
  };
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true }); let frame = 0;
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    const context = gsap.context(() => {
      gsap.to(".scroll-progress", { scaleX: 1, ease: "none", scrollTrigger: { trigger: "#story", start: "top top", end: "bottom bottom", scrub: 0.25 } });
      gsap.utils.toArray<HTMLElement>(".parallax-quote").forEach((element) => gsap.to(element, { yPercent: -12, ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 0.5 } }));
    });
    return () => { cancelAnimationFrame(frame); lenis.destroy(); context.revert(); };
  }, [reduced]);
  return <main><AnimatePresence>{intro && <Intro onComplete={()=>setIntro(false)} />}</AnimatePresence><div className="scroll-progress" /><Navigation /><MusicControl />
    <div id="story">
      <section className="hero"><CinematicScene kind="paths" label="Two separate golden paths moving through a night sky" /><div className="hero-copy"><p className="eyebrow">A story of finding home</p><h1><span>{wedding.groom.name}</span><em>&amp;</em><span>{wedding.bride.name}</span></h1><p className="hero-subtitle">Two separate worlds. One extraordinary way forward.</p><a href="#meeting" className="scroll-cue">Discover their story <ChevronDown size={16} /></a></div><span className="hero-year">EST. 2020</span></section>

      <Chapter id="worlds" eyebrow="Chapter I — Before us" title={<>Two lives, <i>beautifully in motion.</i></>} className="dark-chapter paths-chapter"><div className="split-story"><div><p>There were classrooms and family dinners. Ambitions, detours, and futures quietly taking shape.</p><p>They had no idea their separate paths were already learning the same direction.</p></div><ul className="milestones"><li>Arjun — childhood · school · college · dreams · career</li><li>Ananya — childhood · school · college · dreams · career</li></ul></div></Chapter>

      <Chapter id="meeting" eyebrow="Chapter II — The intersection" title={<>And then, <i>they met.</i></>} className="meeting-chapter"><div className="scene-wrap"><CinematicScene kind="meeting" label="Two golden paths meet in a warm glow" /></div><Reveal className="meeting-detail"><p className="big-date">{wedding.story.firstMeeting.date}</p><p className="location"><MapPin size={15} /> {wedding.story.firstMeeting.location}</p><p>{wedding.story.firstMeeting.description}</p></Reveal><PhotoPlaceholder label="Their first photograph" source={wedding.story.firstMeeting.image} /></Chapter>

      <Chapter eyebrow="Chapter III — One small hello" title={<>It started with <i>a hello.</i></>} className="hello-chapter"><div className="hello-layout"><MessageStory /><Reveal className="prose"><p>{wedding.story.friendship}</p><p>One conversation became many. Many conversations became memories. Memories became something neither of them expected.</p></Reveal></div></Chapter>

      <Chapter eyebrow="Chapter IV — Becoming" title={<>Friendship found a way <i>to bloom.</i></>} className="tree-chapter"><CinematicScene kind="tree" label="A golden tree steadily growing into bloom" /><div className="memory-list">{wedding.memories.map((memory,index)=><Reveal key={memory} className="memory"><span>{String(index+1).padStart(2,"0")}</span>{memory}</Reveal>)}</div></Chapter>

      <Chapter eyebrow="Chapter V — The weather changed" title={<>But every real love story <i>has its storms.</i></>} className="storm-chapter"><CinematicScene kind="storm" label="Gentle rain in a dark cinematic sky" /><div className="challenge-list">{wedding.story.struggles.map((struggle,index)=><Reveal key={struggle}><span>0{index+1}</span>{struggle}</Reveal>)}</div><p className="storm-note">Not a tragedy. Just the part where love learns how to hold on.</p></Chapter>

      <Chapter eyebrow="Chapter VI — The choice" title={<>Through every storm, <i>they still chose each other.</i></>} className="choice-chapter"><CinematicScene kind="choice" label="Two warm lights finding one another" /><div className="choice-copy parallax-quote"><p>Again.</p><p>And again.</p><p>And again.</p><strong>Together.</strong></div></Chapter>

      <Chapter id="journey" eyebrow="Chapter VII — Miles made meaningful" title={<>Their journey, <i>mapped in memory.</i></>} className="journey-chapter"><div className="journey-layout"><CinematicScene kind="journey" label="A softly rotating golden globe with journey markers" /><div className="journey-tabs">{wedding.journey.map((place,index)=><button className={journeyIndex === index ? "selected" : ""} onClick={()=>setJourneyIndex(index)} key={place.location}><span>{String(index+1).padStart(2,"0")}</span><b>{place.location}</b><small>{place.date}</small></button>)}</div></div><Reveal className="journey-memory"><PhotoPlaceholder label={wedding.journey[journeyIndex].location} source={wedding.journey[journeyIndex].image} /><div><p className="eyebrow">{wedding.journey[journeyIndex].date}</p><h3>{wedding.journey[journeyIndex].location}</h3><p>{wedding.journey[journeyIndex].description}</p></div></Reveal></Chapter>

      <Chapter eyebrow="Chapter VIII — The little universe" title={<>Every photograph holds <i>a whole world.</i></>} className="gallery-chapter"><CinematicScene kind="memories" label="Floating memory frames in a dark gallery" /><Gallery /></Chapter>

      <Chapter eyebrow="Chapter IX — The question" title={<>After everything, there was only <i>one question left.</i></>} className="proposal-chapter"><CinematicScene kind="ring" label="A slowly turning golden ring" /><Reveal className="proposal-copy"><p className="proposal-question">Will you walk with me forever?</p><p>{wedding.story.proposal.date} · {wedding.story.proposal.location}</p><p>{wedding.story.proposal.description}</p><small>{wedding.story.proposal.image}</small></Reveal></Chapter>

      <Chapter eyebrow="Chapter X — One future" title={<>Two hearts. Two families. <i>One future.</i></>} className="families-chapter"><CinematicScene kind="mandapam" label="A glowing South Indian mandapam inspired structure" /><p>What began as two paths has become a gathering of every hand that guided, encouraged, and loved them here.</p></Chapter>

      <section id="wedding" className="wedding-reveal"><div className="floral-border top" /><Reveal><p className="eyebrow">With the blessings of our families</p><p className="wedding-kicker">The wedding</p><h2>{wedding.groom.fullName} <em>&amp;</em> {wedding.bride.fullName}</h2><p className="wedding-date">{weddingEvent.date} · {weddingEvent.time}</p></Reveal><div className="floral-border bottom" /></section>

      <Chapter eyebrow="Celebrations" title={<>Come be part <i>of our beginning.</i></>} className="events-chapter"><div className="events">{wedding.events.map((event,index)=><Reveal className="event" key={event.name}><span>{String(index+1).padStart(2,"0")}</span><div><h3>{event.name}</h3><p>{event.date} · {event.time}</p><p>{event.venue}</p><small>{event.description}</small></div></Reveal>)}</div></Chapter>

      <section className="countdown-section"><CinematicScene kind="ring" label="Golden ring surrounding the wedding countdown" /><Reveal><p className="eyebrow">Until we say I do</p><Countdown target={wedding.weddingDate} /></Reveal></section>

      <Chapter eyebrow="Chapter XI — Where forever begins" title={<>The <i>venue.</i></>} className="venue-chapter"><div className="venue-map"><span>✦</span><div className="map-lines" /></div><Reveal className="venue-copy"><h3>{wedding.venue.name}</h3><p>{wedding.venue.address}</p><div className="action-row"><a className="outline-button" href={wedding.venue.mapsUrl} target="_blank" rel="noreferrer"><NavigationIcon size={15} /> Get directions</a><a className="outline-button" download="arjun-ananya-wedding.ics" href={calendar}><CalendarPlus size={15} /> Add to calendar</a></div></Reveal></Chapter>

      <Chapter id="rsvp" eyebrow="With love" title={<>Will you be part <i>of our day?</i></>} className="rsvp-chapter"><p className="rsvp-lede">We would love to celebrate this special day with you.</p><RSVP /></Chapter>

      <section className="share-section"><Sparkles size={18} /><p>Our next chapter is better with you in it.</p><button onClick={share} className="gold-button"><Share2 size={16} /> Share our story</button></section>

      <section className="finale"><CinematicScene kind="forever" label="Two paths now joined as one glowing path" /><Reveal className="finale-copy"><p>Two strangers.</p><p>One beautiful journey.</p><p>One forever.</p><h2>{wedding.groom.name} <em>♥</em> {wedding.bride.name}</h2><strong>Our forever starts here.</strong></Reveal></section>
    </div>
  </main>;
}

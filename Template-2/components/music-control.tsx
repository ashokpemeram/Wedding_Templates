"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function MusicControl() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const context = useRef<AudioContext | null>(null);
  const gain = useRef<GainNode | null>(null);
  const oscillator = useRef<OscillatorNode | null>(null);
  const start = () => {
    if (!context.current) {
      const audio = new AudioContext(); const volume = audio.createGain(); const tone = audio.createOscillator();
      tone.type = "sine"; tone.frequency.value = 196; volume.gain.value = muted ? 0 : 0.025; tone.connect(volume).connect(audio.destination); tone.start();
      context.current = audio; gain.current = volume; oscillator.current = tone;
    }
    context.current.resume(); setPlaying(true);
  };
  const toggle = () => { if (playing && context.current) { context.current.suspend(); setPlaying(false); } else start(); };
  useEffect(() => () => { oscillator.current?.stop(); context.current?.close(); }, []);
  useEffect(() => { if (gain.current) gain.current.gain.value = muted ? 0 : 0.025; }, [muted]);
  return <div className="music-control"><button onClick={toggle} aria-label={playing ? "Pause ambient music" : "Play ambient music"}>{playing ? <Pause size={16} /> : <Play size={16} />}<span>{playing ? "Pause" : "Sound"}</span></button><button onClick={()=>setMuted(!muted)} aria-label={muted ? "Unmute ambient music" : "Mute ambient music"}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button></div>;
}

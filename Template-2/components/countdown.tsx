"use client";

import { useEffect, useState } from "react";

function getTime(target: string) {
  const difference = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
}

export function Countdown({ target }: { target: string }) {
  const [time, setTime] = useState(() => getTime(target));
  useEffect(() => { const interval = window.setInterval(() => setTime(getTime(target)), 1000); return () => window.clearInterval(interval); }, [target]);
  return <div className="countdown" aria-label="Time until the wedding">{Object.entries(time).map(([unit, value]) => <div key={unit}><strong>{String(value).padStart(2, "0")}</strong><span>{unit}</span></div>)}</div>;
}

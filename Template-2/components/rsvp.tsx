"use client";

import { FormEvent, useState } from "react";
import { Heart } from "lucide-react";

type FormState = { name: string; guests: string; attendance: string; message: string };
const initial: FormState = { name: "", guests: "", attendance: "", message: "" };

export function RSVP() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.guests || !form.attendance) { setStatus("Please add your name, guest count and attendance."); return; }
    // Ready for a POST request: send `form` to your RSVP endpoint here.
    setStatus("Thank you — your RSVP has been received.");
    setForm(initial);
  };
  return <form className="rsvp-form" onSubmit={submit} noValidate>
    <label>Your name<input required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Your name" /></label>
    <label>Number of guests<select required value={form.guests} onChange={(e)=>setForm({...form,guests:e.target.value})}><option value="">Choose one</option><option value="1">1 guest</option><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option></select></label>
    <fieldset><legend>Will you join us?</legend><div className="attendance"><label><input type="radio" name="attendance" value="yes" checked={form.attendance === "yes"} onChange={(e)=>setForm({...form,attendance:e.target.value})} /> I&apos;ll be there <Heart size={14} fill="currentColor" /></label><label><input type="radio" name="attendance" value="no" checked={form.attendance === "no"} onChange={(e)=>setForm({...form,attendance:e.target.value})} /> Sorry, I can&apos;t make it</label></div></fieldset>
    <label>A note for us <textarea value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} placeholder="Leave a little love..." rows={3} /></label>
    <button className="gold-button" type="submit">Send RSVP</button>
    <p className="form-status" aria-live="polite">{status}</p>
  </form>;
}

export const wedding = {
  couple: { groom: "Arjun", bride: "Anaya", groomFamily: "The Reddys", brideFamily: "The Iyers" },
  weddingDate: "2027-01-17T06:30:00+05:30",
  weddingDisplayDate: "Sunday, 17 January 2027",
  venue: {
    name: "The Leela Palace",
    address: "23, Airport Road, Kodihalli, Bengaluru, Karnataka 560008",
    directions: "https://maps.google.com/?q=The+Leela+Palace+Bengaluru",
  },
  moments: [
    { label: "First meeting", date: "14 May 2025", place: "Bengaluru" },
    { label: "Engagement", date: "21 September 2026", place: "The Iyer Residence" },
  ],
  events: [
    { name: "Haldi", date: "Friday, 15 January", time: "10:30 AM", tone: "sun" },
    { name: "Mehendi", date: "Friday, 15 January", time: "6:30 PM", tone: "leaf" },
    { name: "Wedding", date: "Sunday, 17 January", time: "6:30 AM", tone: "wine" },
    { name: "Reception", date: "Sunday, 17 January", time: "7:00 PM", tone: "night" },
  ],
  story: [
    { eyebrow: "01 / a blessing", title: "Every journey\nbegins somewhere.", body: "Some begin with a meeting. Some begin with a blessing.", beat: "The diya" },
    { eyebrow: "02 / two families", title: "Two lives.\nOne beautiful beginning.", body: "The Reddys and the Iyers brought their worlds together with grace.", beat: "The mandala" },
    { eyebrow: "03 / the paths", title: "Two paths,\nheld by destiny.", body: "Childhood, dreams, family, and work—each path made its way forward.", beat: "Two lives" },
    { eyebrow: "04 / the meeting", title: "And then,\nthey met.", body: "A first conversation in Bengaluru became the start of something considered and true.", beat: "14 May 2025 · Bengaluru" },
    { eyebrow: "05 / understanding", title: "Love does not always\nbegin with butterflies.", body: "Sometimes, it begins with understanding: values shared, dreams listened to, trust gently made.", beat: "A familiar warmth" },
    { eyebrow: "06 / the decision", title: "Two people.\nOne decision.", body: "With both families beside them, Anaya and Arjun chose a future together.", beat: "YES" },
    { eyebrow: "07 / the promise", title: "Two families.\nOne celebration.", body: "A promise was made in the embrace of everyone who has shaped their story.", beat: "21 September 2026" },
    { eyebrow: "08 / the future", title: "The story has\nonly just begun.", body: "Ahead lie a home, adventures, memories, and the unhurried joy of forever.", beat: "The journey ahead" },
  ],
  memories: [
    { date: "14.05.25", title: "The beginning", caption: "A meeting made memorable by two welcoming families." },
    { date: "21.06.25", title: "Familiar voices", caption: "Conversations that made room for trust." },
    { date: "21.09.26", title: "The promise", caption: "A joyful yes, surrounded by those we love." },
  ],
} as const;

export type WeddingEvent = {
  title: string;
  date: string;
  time: string;
  venue: string;
};

export const weddingData = {
  bride: {
    name: "Ananya",
    nickname: "Anu",
    family: "Daughter of Mr. & Mrs. Sharma"
  },
  groom: {
    name: "Arjun",
    nickname: "Arjun",
    family: "Son of Mr. & Mrs. Mehta"
  },
  wedding: {
    date: "2026-12-20",
    time: "10:30 AM",
    venue: "The Leela Palace",
    address: "Chowmahalla Road, Hyderabad, Telangana 500002",
    city: "Hyderabad"
  },
  story: {
    firstMeeting: "A rainy afternoon, one shared table, and a conversation neither wanted to end.",
    relationship: "From easy laughter to the quiet certainty of belonging.",
    challenges: "We learned that every distance can become a bridge when two hearts keep walking.",
    proposal: "Under a sky full of stars, a question became our favourite yes."
  },
  events: [
    {
      title: "Mehendi & Sangeet",
      date: "2026-12-19",
      time: "7:00 PM",
      venue: "The Leela Palace, Hyderabad"
    },
    {
      title: "Wedding Ceremony",
      date: "2026-12-20",
      time: "10:30 AM",
      venue: "The Leela Palace, Hyderabad"
    }
  ] satisfies WeddingEvent[],
  gallery: [
    "/images/memories/memory-01.jpg",
    "/images/memories/memory-02.jpg",
    "/images/memories/memory-03.jpg",
    "/images/memories/memory-04.jpg"
  ],
  families: {
    bride: "The Sharma Family",
    groom: "The Mehta Family"
  },
  music: {
    enabled: true,
    src: "/music/wedding.mp3"
  },
  rsvp: {
    deadline: "2026-11-20"
  }
} as const;

export type WeddingData = typeof weddingData;

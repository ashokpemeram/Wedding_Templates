// ─────────────────────────────────────────────────────────────────────────
// data/wedding.ts
//
// This is the single source of truth for the entire site. Replace every
// placeholder value below with the couple's real details and images.
// Every section on the site reads from this file — you should not need to
// touch component code to update the story, events, or venue.
//
// Images: drop real files into /public/images and update the paths below.
// Until then, the site renders elegant placeholder panels so nothing breaks.
// ─────────────────────────────────────────────────────────────────────────

export type JourneyStop = {
  location: string;
  date: string;
  image: string;
  description: string;
  lat: number;
  lng: number;
};

export type GalleryPhoto = {
  src: string;
  caption: string;
};

export const wedding = {
  groom: {
    name: "Arjun",
    fullName: "Arjun Varma",
    milestones: ["Childhood in Vizag", "St. Xavier's School", "Engineering, Hyderabad", "Chasing a career in design", "Learning to stand on his own"],
  },

  bride: {
    name: "Meera",
    fullName: "Meera Rao",
    milestones: ["Childhood in Chennai", "Sacred Heart School", "Architecture, Bangalore", "Building a name for herself", "Learning to trust again"],
  },

  story: {
    firstMeeting: {
      date: "14 February 2019",
      location: "A friend's terrace, Hyderabad",
      description:
        "Neither of them had planned to stay long. A mutual friend's rooftop birthday, a string of fairy lights, and a conversation about nothing in particular that neither of them wanted to end.",
      image: "/images/first-meeting.jpg",
    },

    friendship: {
      description:
        "It didn't feel like the beginning of anything. Just two people who kept finding reasons to talk — about work, about films neither of them had actually watched, about nothing worth remembering except that they remembered all of it.",
    },

    relationship: {
      description:
        "Somewhere between the hundredth phone call and the first time silence between them felt comfortable instead of awkward, friendship became something neither of them had a name for yet.",
    },

    struggles: [
      "Two cities, and a phone screen that never quite closed the distance.",
      "Families who needed time to understand what they already knew.",
      "Careers that asked for everything, at the exact moment they needed each other most.",
      "Doubts — quiet, private ones — about whether love this ordinary could last.",
    ],

    proposal: {
      date: "2 October 2023",
      location: "Araku Valley, at sunrise",
      description:
        "No grand plan. Just a question, asked quietly, after four years of choosing each other in smaller ways — and an answer that had been certain for a long time before it was ever spoken.",
      image: "/images/proposal.jpg",
    },
  },

  journey: [
    {
      location: "Hyderabad",
      date: "Feb 2019",
      image: "/images/journey-hyderabad.jpg",
      description: "Where it began — a rooftop, and a conversation that ran past midnight.",
      lat: 17.385,
      lng: 78.4867,
    },
    {
      location: "Goa",
      date: "Nov 2020",
      image: "/images/journey-goa.jpg",
      description: "Their first trip together. Bad weather, worse maps, and no regrets.",
      lat: 15.2993,
      lng: 74.124,
    },
    {
      location: "Munnar",
      date: "May 2021",
      image: "/images/journey-munnar.jpg",
      description: "Tea gardens and the first quiet mention of 'someday'.",
      lat: 10.0889,
      lng: 77.0595,
    },
    {
      location: "Chennai",
      date: "Jan 2022",
      image: "/images/journey-chennai.jpg",
      description: "Meeting the family — nervous hands and second helpings.",
      lat: 13.0827,
      lng: 80.2707,
    },
    {
      location: "Araku Valley",
      date: "Oct 2023",
      image: "/images/journey-araku.jpg",
      description: "Where the question was finally asked, at sunrise.",
      lat: 18.3273,
      lng: 82.8747,
    },
  ] as JourneyStop[],

  gallery: [
    { src: "/images/memory-01.jpg", caption: "The rooftop, 2019" },
    { src: "/images/memory-02.jpg", caption: "First trip to Goa" },
    { src: "/images/memory-03.jpg", caption: "Rain in Munnar" },
    { src: "/images/memory-04.jpg", caption: "Sunday mornings" },
    { src: "/images/memory-05.jpg", caption: "Meeting the family" },
    { src: "/images/memory-06.jpg", caption: "Araku sunrise" },
    { src: "/images/memory-07.jpg", caption: "The proposal" },
    { src: "/images/memory-08.jpg", caption: "Engagement day" },
  ] as GalleryPhoto[],

  events: [
    {
      name: "Haldi",
      date: "12 December 2026",
      time: "9:00 AM",
      venue: "Rao Residence, Chennai",
      description: "A morning of turmeric, laughter, and family teasing the couple mercilessly.",
    },
    {
      name: "Mehendi",
      date: "13 December 2026",
      time: "4:00 PM",
      venue: "Rao Residence, Chennai",
      description: "Henna, music, and the last quiet evening before the wedding.",
    },
    {
      name: "Wedding",
      date: "14 December 2026",
      time: "7:30 AM Muhurtham",
      venue: "Sri Kanchi Kamakshi Mandapam, Chennai",
      description: "Sacred vows exchanged in the traditional South Indian rite, as the sun rises.",
    },
    {
      name: "Reception",
      date: "14 December 2026",
      time: "7:00 PM",
      venue: "The Leela Palace, Chennai",
      description: "An evening to celebrate — for everyone who couldn't make the morning ceremony.",
    },
  ],

  venue: {
    name: "Sri Kanchi Kamakshi Mandapam",
    address: "142 Radhakrishnan Salai, Mylapore, Chennai, Tamil Nadu 600004",
    mapsUrl: "https://maps.google.com/?q=Sri+Kanchi+Kamakshi+Mandapam+Chennai",
  },

  weddingDateISO: "2026-12-14T07:30:00+05:30",

  siteUrl: "https://arjunandmeera.wedding",

  music: {
    src: "/audio/theme.mp3",
    title: "Their Song",
  },
} as const;

export type Wedding = typeof wedding;

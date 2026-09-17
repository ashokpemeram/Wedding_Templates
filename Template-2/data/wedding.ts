export const wedding = {
  groom: { name: "Arjun", fullName: "Arjun Reddy" },
  bride: { name: "Ananya", fullName: "Ananya Iyer" },
  weddingDate: "2027-02-14T07:42:00+05:30",
  weddingEnd: "2027-02-14T10:00:00+05:30",
  story: {
    firstMeeting: {
      date: "12 August 2020",
      location: "Bengaluru, Karnataka",
      description: "A chance conversation over coffee that neither of them wanted to end.",
      image: "/replace-with-first-meeting-photo.jpg"
    },
    friendship: "It started with a hello, then became the kind of friendship that made ordinary days feel like home.",
    relationship: "Somewhere between late-night calls, long walks, and shared dreams, friendship quietly became love.",
    struggles: ["Miles between two cities", "The courage to be understood", "Career crossroads", "Learning patience, choosing grace"],
    proposal: {
      date: "18 November 2026",
      location: "Pondicherry",
      description: "At sunrise by the sea, with the future in their hands and their favourite people waiting nearby.",
      image: "/replace-with-proposal-photo.jpg"
    }
  },
  memories: ["First Call", "First Date", "First Trip", "First Photograph", 'First "I Love You"', "First Anniversary"],
  journey: [
    { location: "Bengaluru", date: "August 2020", image: "/replace-with-bengaluru-photo.jpg", description: "Where one hello changed the rhythm of everything." },
    { location: "Coorg", date: "December 2021", image: "/replace-with-coorg-photo.jpg", description: "Misty roads, warm coffee, and their first trip together." },
    { location: "Pondicherry", date: "November 2026", image: "/replace-with-proposal-photo.jpg", description: "A sunrise, one question, and a forever yes." }
  ],
  gallery: [
    { label: "The first, unplanned photograph", image: "/replace-with-memory-01.jpg" },
    { label: "The road to Coorg", image: "/replace-with-memory-02.jpg" },
    { label: "A little ordinary magic", image: "/replace-with-memory-03.jpg" },
    { label: "The day we said forever", image: "/replace-with-memory-04.jpg" }
  ],
  events: [
    { name: "Haldi", date: "12 February 2027", time: "10:30 AM", venue: "Lakshmi Gardens", description: "A morning of turmeric, laughter and sunshine." },
    { name: "Mehendi", date: "13 February 2027", time: "5:30 PM", venue: "Lakshmi Gardens", description: "Henna, music and stories under the stars." },
    { name: "Wedding", date: "14 February 2027", time: "7:42 AM", venue: "Sri Venkateswara Kalyana Mandapam", description: "As the first light arrives, so does our forever." },
    { name: "Reception", date: "14 February 2027", time: "7:00 PM", venue: "The Leela Palace", description: "An evening to dine, dance and celebrate together." }
  ],
  venue: {
    name: "Sri Venkateswara Kalyana Mandapam",
    address: "#18 Temple Road, Malleswaram, Bengaluru, Karnataka 560003",
    mapsUrl: "https://maps.google.com/?q=Malleswaram+Bengaluru"
  }
} as const;

// Replace the names, dates, event details, venue and /replace-with-*.jpg paths above.

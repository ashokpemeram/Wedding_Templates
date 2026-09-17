// ============================================================
// WEDDING CONFIGURATION — Edit all wedding details here.
// All UI components read from this file.
// ============================================================

export const wedding = {
  // ── Couple ──────────────────────────────────────────────
  groom: {
    name: 'Arjun Kumar',
    shortName: 'Arjun',
    parents: 'Son of Shri. Ramesh Kumar & Smt. Kavitha Kumar',
    family: [
      'Shri. Ramesh Kumar (Father)',
      'Smt. Kavitha Kumar (Mother)',
      'Karthik Kumar (Brother)',
      'Divya Kumar (Sister)',
    ],
  },

  bride: {
    name: 'Priya Sharma',
    shortName: 'Priya',
    parents: 'Daughter of Shri. Suresh Sharma & Smt. Meena Sharma',
    family: [
      'Shri. Suresh Sharma (Father)',
      'Smt. Meena Sharma (Mother)',
      'Ravi Sharma (Brother)',
      'Ananya Sharma (Sister)',
    ],
  },

  // ── Wedding Date ─────────────────────────────────────────
  // ISO 8601 format — change this to update the countdown
  weddingDate: '2026-10-25T09:00:00',
  weddingDateDisplay: '25 • October • 2026',
  weddingDay: 'Sunday',

  // ── Website ──────────────────────────────────────────────
  websiteUrl: 'https://arjun-weds-priya.com',

  // ── Events ───────────────────────────────────────────────
  events: [
    {
      id: 'haldi',
      name: 'Haldi',
      teluguName: 'పసుపు కుంకుమ',
      icon: '🌼',
      date: 'October 23, 2026',
      time: '10:00 AM – 1:00 PM',
      venue: 'Sharma Residence',
      address: '42, Jubilee Hills, Hyderabad – 500033',
      description:
        'A joyful turmeric ceremony filled with laughter, blessings, and golden hues, marking the beginning of our celebrations.',
      color: 'from-yellow-900/20 to-amber-900/10',
    },
    {
      id: 'mehendi',
      name: 'Mehendi',
      teluguName: 'మెహందీ',
      icon: '🌿',
      date: 'October 23, 2026',
      time: '4:00 PM – 9:00 PM',
      venue: 'Sharma Residence',
      address: '42, Jubilee Hills, Hyderabad – 500033',
      description:
        'An intimate evening of intricate henna artistry, music, and traditional songs celebrating the bride.',
      color: 'from-green-900/20 to-emerald-900/10',
    },
    {
      id: 'wedding',
      name: 'Wedding Ceremony',
      teluguName: 'వివాహం',
      icon: '🪔',
      date: 'October 25, 2026',
      time: '9:00 AM – 1:00 PM',
      venue: 'Sri Lakshmi Kalyana Mantapam',
      address: 'Road No. 12, Banjara Hills, Hyderabad – 500034',
      description:
        'The sacred union of two souls under the divine witness of Agni, family, and the blessings of our ancestors.',
      color: 'from-maroon/20 to-red-900/10',
    },
    {
      id: 'reception',
      name: 'Reception',
      teluguName: 'రిసెప్షన్',
      icon: '✨',
      date: 'October 25, 2026',
      time: '7:00 PM – 11:00 PM',
      venue: 'The Grand Kakatiya Hotel',
      address: 'Begumpet, Hyderabad – 500016',
      description:
        'An elegant evening of celebration, joy, and togetherness as we welcome our family and friends to bless the newlyweds.',
      color: 'from-purple-900/20 to-indigo-900/10',
    },
  ],

  // ── Venue (Main Wedding Venue) ────────────────────────────
  venue: {
    name: 'Sri Lakshmi Kalyana Mantapam',
    address: 'Road No. 12, Banjara Hills',
    city: 'Hyderabad, Telangana – 500034',
    mapsUrl:
      'https://maps.google.com/?q=Banjara+Hills+Hyderabad+Telangana',
    mapsEmbedUrl:
      'https://maps.google.com/maps?q=Banjara+Hills+Hyderabad&output=embed',
  },

  // ── Our Story Timeline ────────────────────────────────────
  story: [
    {
      step: '01',
      title: 'The Beginning',
      subtitle: 'January 2022',
      description:
        'Two paths crossed at a mutual friend\'s gathering in Chennai. A fleeting glance, a warm smile — neither of us knew that this moment would change everything.',
      image: null, // Replace with '/images/story-1.jpg'
    },
    {
      step: '02',
      title: 'The First Conversation',
      subtitle: 'March 2022',
      description:
        'One conversation became two, then three. Hours felt like minutes. We discovered we shared the same love for filter coffee, old Tamil songs, and long evening walks.',
      image: null, // Replace with '/images/story-2.jpg'
    },
    {
      step: '03',
      title: 'Growing Together',
      subtitle: 'December 2022',
      description:
        'Through festivals, family dinners, late-night calls, and Sunday morning silences, we grew — not just as a couple, but as each other\'s home.',
      image: null, // Replace with '/images/story-3.jpg'
    },
    {
      step: '04',
      title: 'The Promise',
      subtitle: 'February 2026',
      description:
        'Under a sky full of stars, with the scent of jasmine in the air, Arjun asked the question that Priya had already answered in her heart a thousand times.',
      image: null, // Replace with '/images/story-4.jpg'
    },
    {
      step: '05',
      title: 'Forever Begins',
      subtitle: 'October 25, 2026',
      description:
        'And now, we stand at the most beautiful threshold — ready to begin forever, together, with the love of our families surrounding us.',
      image: null, // Replace with '/images/story-5.jpg'
    },
  ],

  // ── Gallery ───────────────────────────────────────────────
  // span: 'tall' | 'wide' | 'normal' — controls masonry layout
  gallery: [
    { id: 1, src: null, alt: 'Couple portrait', span: 'tall' },
    { id: 2, src: null, alt: 'Engagement ceremony', span: 'normal' },
    { id: 3, src: null, alt: 'Candid moment', span: 'normal' },
    { id: 4, src: null, alt: 'Pre-wedding shoot', span: 'wide' },
    { id: 5, src: null, alt: 'Priya in silk saree', span: 'normal' },
    { id: 6, src: null, alt: 'Arjun with family', span: 'tall' },
    { id: 7, src: null, alt: 'Couple at temple', span: 'normal' },
    { id: 8, src: null, alt: 'Romantic evening', span: 'wide' },
  ],

  // ── Music ─────────────────────────────────────────────────
  // Drop your .mp3 file at public/music/wedding-bg.mp3
  music: {
    src: '/music/wedding-bg.mp3',
    title: 'Nadaswaram',
    enabled: true,
  },
} as const

export type WeddingConfig = typeof wedding

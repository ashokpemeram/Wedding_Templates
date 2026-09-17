# Until Forever — Cinematic Wedding Invitation

An interactive, scroll-driven love story that gradually transforms into a
South Indian wedding invitation. Built with Next.js (App Router), TypeScript,
Tailwind CSS, Framer Motion, GSAP + ScrollTrigger, Lenis, React Three Fiber,
and Three.js/Drei.

## 1. Install & run

This project's dependencies could not be installed in the sandbox that
generated it (no network access), so nothing has been built or type-checked
yet. On your own machine, with internet access:

```bash
npm install
npm run dev
```

Then open http://localhost:3000. For production:

```bash
npm run build
npm run start
```

Node 18.18+ (or Node 20+) is recommended.

## 2. Make it your own — edit one file

Almost everything on the site — names, story copy, struggles, journey
stops, event details, venue, wedding date, and the share/RSVP copy — is
driven entirely by:

```
data/wedding.ts
```

Update that file and the whole site updates with it. You shouldn't need to
touch component code for a standard content update.

## 3. Replace the placeholder media

Two folders are pre-created and currently empty:

- `public/images/` — every path referenced in `data/wedding.ts`
  (`firstMeeting.image`, `journey[].image`, `gallery[].src`, etc.) should
  point to a real file here. Until you add real photos, each spot renders
  an elegant placeholder panel labelled with what belongs there — nothing
  breaks, it just tells you what to shoot/upload.
- `public/audio/theme.mp3` — background music for the floating music
  control (bottom-right). It never autoplays; if the file is missing the
  button will simply do nothing when pressed. Drop in a licensed track.

Recommended image sizes: story/journey photos ~1600×1200 (4:3), gallery
photos ~1200×1500 (portrait). Export as WebP where possible — Next.js
`<Image>` will still serve AVIF/WebP automatically from JPEG/PNG sources.

## 4. Structure

```
app/                     Next.js App Router entry (layout, globals, page)
data/wedding.ts           <- single source of truth for all content
lib/                      Lenis provider, scroll-progress hook, small utils
components/three/          React Three Fiber scenes (lazy-loaded, client-only)
components/sections/       One component per numbered section of the story
components/ui/             Shared chrome: music player, progress rail, etc.
```

Every 3D scene is dynamically imported with `ssr: false` and only mounts
once its section scrolls into view, so the heavy Three.js/Drei bundle
never blocks first paint.

## 5. Performance & accessibility notes already built in

- `useIsMobile` reduces particle counts, disables antialiasing, and caps
  device-pixel-ratio on phones/tablets.
- The 3D floating "Memory Universe" gallery automatically swaps for a
  lightweight 2D swipe gallery on mobile.
- `prefers-reduced-motion` is respected globally: Lenis smooth-scroll is
  skipped, CSS animations are neutralized, and the main rotating 3D scenes
  stop animating continuously.
- RSVP form is validated client-side and left "backend-integration-ready"
  — see the comment in `components/sections/RSVP.tsx` for where to wire a
  real endpoint.
- Share uses the native Web Share API where supported, falling back to a
  WhatsApp deep link.

## 6. What to check before launch

- [ ] Swap every placeholder image/photo path in `data/wedding.ts`
- [ ] Add real background music to `public/audio/theme.mp3`
- [ ] Set the real `weddingDateISO`, `venue`, and `events`
- [ ] Wire the RSVP form to a real backend/email/Sheet
- [ ] Update `siteUrl` in `data/wedding.ts` once deployed (used for sharing)
- [ ] Run `npm run build` and fix any type errors introduced by your edits
- [ ] Test on a mid-range Android phone for scroll performance

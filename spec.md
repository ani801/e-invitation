# Product Specification: Digital Wedding E-Invitation Website

## 1. Project Overview

A single-page, static wedding e-invitation built with vanilla HTML5, CSS3 and JavaScript (ES6+). It is hosted as a static site so the couple can share one link and guests see all wedding details in their browser. No backend, database, build step or package manager.

Design source: Claude Design project "E-invitation Wedding Card UI" (`Wedding Invitation.dc.html`). The design's slide deck was translated into a normal scrolling page.

---

## 2. Technical Stack & Structure

- **Core:** HTML5, CSS3, Vanilla JavaScript (no frameworks).
- **External (CDN only):** Google Fonts - Great Vibes (script headings) and Cormorant Garamond (body/serif).
- **File hierarchy (single root folder):**
  ```text
  ├── index.html        # All sections and markup
  ├── style.css         # Theme variables, layouts, animations, responsive rules
  ├── script.js         # CONFIG block, countdown, music toggle, family toggle, reveal-on-scroll
  └── assets/
      ├── images/       # family-groom, family-bride, gallery-1..6 (.jpg)
      └── audio/        # background.mp3
  ```

---

## 3. Design Tokens

| Token | Value |
|---|---|
| Background | `#f7ece4` |
| Text | `#5c3a1e` |
| Accent (gold/brown) | `#9c6b34` |
| Accent deep (rose) | `#c8386f` |
| Script font | Great Vibes |
| Serif font | Cormorant Garamond (400-700) |

Alternate sections get a subtle tint. Colours live as CSS variables in `style.css`.

---

## 4. Global Elements

- **Music toggle:** fixed top-right pill button. Plays/pauses a looping `assets/audio/background.mp3`. No autoplay; music starts only after the guest taps. Button turns rose while playing.
- **Scroll-down cue:** every slide except the last shows a small pill at the bottom centre containing two cascading down arrows (no text) that bob gently. Tapping it smooth-scrolls to the next slide. It is added by `initScrollCues()` in `script.js`, and the animation stops for guests who prefer reduced motion.
- **Reveal-on-scroll:** elements with `.wi-fade` fade up once when they enter the viewport (IntersectionObserver).

---

## 4a. Sections (in order)

1. **Cover** - "Save the Date", "Soumya & Reicha", "are getting married", invitation line, date and city, animated scroll cue.
2. **Countdown** - "Counting down to forever"; live Days / Hours / Minutes / Seconds boxes (floating animation), caption with ceremony date/time. Stops at zero.
3. **Families** - "Groom's Side" / "Bride's Side" toggle buttons; each panel shows a family photo, name, parents line and a short note.
4. **Functions & Timing** - rows for Haldi and the combined Wedding Ceremony & Reception, each with venue and date/time.
5. **Venue** - venue name, address, "Get Directions" button (opens the Google Maps link in `CONFIG.mapsUrl`), embedded live Google Map of the venue (coordinates set in the `<iframe>` in `index.html`).
6. **Gallery** - grid of 6 photos (3 columns desktop, 2 on smaller screens).
7. **Thank You** - "With love, Soumya & Reicha" and closing line.

---

## 5. Functional Behaviour

- **Countdown:** computed from `CONFIG.weddingDateISO`, refreshed every second.
- **Family toggle:** shows one panel at a time (Groom's side by default).
- **Image fallback:** if a photo file is missing, its frame shows a placeholder box with the expected filename instead of a broken image.
- **Links:** Get Directions href is set from `CONFIG` at load.
- **Music:** user-initiated only; failures to play are ignored silently.

---

## 6. Customisation Points

- **`script.js` -> `CONFIG`:** `weddingDateISO`, `mapsUrl`. If the venue changes, also update the `q=lat,lng` in the venue map `<iframe>` in `index.html`.
- **`index.html`:** names, bios, parents' names, family notes, venue name/address, event list and times, thank-you line. Placeholder text is marked with HTML comments.
- **`assets/`:** drop in the photos and music using the filenames listed in section 2.
- **`style.css`:** change theme colours in `:root`.
- The countdown caption and cover date text in `index.html` are plain text; update them together with `CONFIG.weddingDateISO`.

---

## 7. Responsiveness

- Desktop: full-height sections, two-column Venue layout.
- At 900px and below: the Venue columns stack, timeline rows become single-column, gallery becomes 2 columns.
- At 520px and below: smaller family toggle buttons.

---

## 8. Hosting & Sharing

- Deploy the folder to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages) and share the URL.
- Test locally by opening `index.html`, or run `python -m http.server 8642` in the folder and visit `http://localhost:8642`.

---

## 9. Out of Scope

- Backend, database, guest list management, RSVP collection.
- Envelope-open intro animation (present in the design's script but not used by any slide).
- Multi-language support and admin editing UI.

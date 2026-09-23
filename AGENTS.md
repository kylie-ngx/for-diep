# Project

This is a small personal farewell website for a friend named Điệp, who is moving to Japan for work.

## Tech

- Static HTML, CSS, and vanilla JavaScript only.
- No React.
- No Vite.
- No Next.js.
- No npm dependencies.
- No build step.
- Keep `index.html`, `style.css`, and `script.js` clean and separated.
- Avoid inline CSS and inline JavaScript.

## Design Direction

- Clean, minimal, contemporary Japanese visual direction.
- The recipient is male, so avoid an overly cute, romantic, or pink-heavy aesthetic.
- Background should be warm cream/off-white.
- Primary text should be dark charcoal.
- Use a restrained Japanese red accent.
- Sakura pink may only be used subtly for falling petals.
- Use Montserrat throughout.
- Include a subtle Mount Fuji silhouette in the background.
- Do not use anime imagery.
- Do not use excessive Japanese icons or decorative clichés.
- Remove all old birthday photos and birthday assets.

## UX

- Mobile-first.
- Must work well around 375px to 430px viewport widths.
- No horizontal scrolling.
- Large enough touch targets.
- Animations should be subtle.
- Respect `prefers-reduced-motion`.

## Flow

1. Intro screen:
   "A special message for Điệp"
   and an "Unfold" button.
2. After clicking Unfold, show five compact letter cards from:
   - Ly
   - Linh Anh
   - Thuỳ Trang
   - Trà My
   - Công
3. Clicking a card opens the letter content.
4. No ending screen.

## Letter Content

- Messages will be plain text.
- All letter content should live in one easy-to-edit data structure in `script.js`.
- Preserve line breaks in messages.
- Use placeholder text until the real messages are provided.

## Visual Quality

- Keep visual hierarchy simple.
- Cards should look like refined stationery, not large cartoon envelopes.
- Avoid oversized shadows, excessive gradients, huge rounded corners, or pill-heavy UI.

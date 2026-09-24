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

- A contemporary Japanese farewell stationery experience: warm, calm, crafted, and refined.
- The recipient is male, so avoid an overly cute, romantic, or pink-heavy aesthetic.
- Background should be warm cream/off-white.
- Primary text should be dark charcoal.
- Use a restrained Japanese red accent.
- Sakura pink may only be used subtly for falling petals.
- Use Montserrat throughout.
- Use a low, wide, layered inline SVG Mount Fuji with explicitly defined muted stone-gray, haze, shadow, and cream snow fills. No black silhouette.
- Use clearly visible but restrained CSS sakura petals behind the interface, with bounded DOM size and a reduced-motion fallback.
- Allow very subtle CSS paper-toned atmospheric variation, without obvious gradients or texture images.
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
2. After clicking Unfold, show the heading "Gửi bạn Điệp..." and exactly six envelope cards in this order:
   - Công
   - Trà My
   - Thuỳ Trang
   - Linh Anh
   - Kiều
   - Ly
3. Clicking or tapping an envelope briefly opens its flap, then reveals a paper-letter dialog. Reduced motion opens it immediately.
4. No ending screen.

## Letter Content

- Messages will be plain text.
- All letter content should live in one easy-to-edit data structure in `script.js`.
- Preserve line breaks in messages.
- Protect all six existing messages exactly, including grammar, slang, punctuation, apostrophes, diacritics, English, Japanese, emojis, and paragraph breaks. Never normalize or rewrite them.
- Render personal messages with `textContent`, never `innerHTML`.

## Visual Quality

- Keep visual hierarchy simple.
- The six cards should resemble real physical envelopes, constructed with CSS geometry, folds, paper layers, and borders.
- Keep envelopes clean, refined, contemporary, and Japanese-inspired. They must not be cartoonish, childish, kawaii, or overly decorative.
- Use a compact single-column envelope layout at 375-430px and a balanced two-column, three-row layout on tablet/desktop. Ly remains last.
- Envelope hover lifts 3-5px and gently opens the flap; tap/click opens it further for 250-400ms before revealing the dialog.
- Keep short letters naturally sized and long letters internally scrollable, with a permanently reachable close control.
- Avoid oversized shadows, excessive gradients, huge rounded corners, or pill-heavy UI.

## Accessibility And Deployment

- Use real buttons, visible focus states, and native dialog semantics.
- Support Escape, backdrop dismissal, background scroll locking/restoration, and focus restoration to the triggering envelope.
- Decorative Fuji and sakura must be `aria-hidden` and must not capture pointer events.
- Reduced motion must remove screen/flap movement, immediately open letters, and stop falling petals.
- Verify 375x667, 390x844, 430x932, 768x1024, 1024x768, and 1440x900 without horizontal overflow.
- Use relative local asset paths that work under GitHub Pages `/for-diep/`.
- Never load legacy birthday assets. Physical unused assets may remain until a separate cleanup.

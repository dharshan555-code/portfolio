/*
  DHARSHAN PRABATH — APPLE-INSPIRED PORTFOLIO SKIN
  Add this file AFTER your existing Tailwind / global stylesheet:
  import "./style.css";

  This stylesheet is intentionally presentation-only. It does not change
  portfolio copy, links, project data, or React component structure.
*/

:root {
  color-scheme: light;
  --apple-white: #ffffff;
  --apple-surface: #f5f5f7;
  --apple-space-gray: #1d1d1f;
  --apple-muted: #6e6e73;
  --apple-hairline: rgba(0, 0, 0, 0.06);
  --apple-hairline-soft: rgba(0, 0, 0, 0.04);
  --apple-ease: cubic-bezier(0.16, 1, 0.3, 1);
  --apple-radius: 26px;
  --apple-shadow-hover: 0 20px 40px rgba(0, 0, 0, 0.06);
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 108px;
  background: var(--apple-white);
}

body {
  background: var(--apple-white);
  color: var(--apple-space-gray);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

::selection {
  color: var(--apple-space-gray);
  background: rgba(29, 29, 31, 0.12);
}

*, *::before, *::after {
  scroll-margin-top: 108px;
}

a, button, input, textarea {
  -webkit-tap-highlight-color: transparent;
}

a, button, [role="button"] {
  transition:
    color 420ms var(--apple-ease),
    background-color 420ms var(--apple-ease),
    border-color 420ms var(--apple-ease),
    box-shadow 420ms var(--apple-ease),
    transform 420ms var(--apple-ease),
    opacity 420ms var(--apple-ease);
}

/* Type polish — keep the site's existing font family intact. */
h1, h2, h3 {
  color: var(--apple-space-gray);
  letter-spacing: -0.035em;
  text-wrap: balance;
}

p {
  text-wrap: pretty;
}

/* Frosted-glass navigation. The React header is fixed already. */
header.fixed {
  padding-top: 2px;
  pointer-events: none;
}

header.fixed nav,
header.fixed > div {
  pointer-events: auto;
}

header.fixed nav {
  min-height: 58px;
  background: rgba(255, 255, 255, 0.72) !important;
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid var(--apple-hairline) !important;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.035) !important;
  transition:
    background-color 420ms var(--apple-ease),
    box-shadow 420ms var(--apple-ease),
    border-color 420ms var(--apple-ease);
}

header.fixed nav a {
  text-decoration: none;
}

header.fixed nav a:not(:first-child):hover {
  color: var(--apple-space-gray);
}

header.fixed nav button {
  border: 0;
  cursor: pointer;
}

/* Hero — spacious editorial layout and portrait treatment. */
#top {
  isolation: isolate;
  min-height: min(900px, 100svh);
}

#top h1 {
  max-width: 10.5ch;
  letter-spacing: -0.055em;
  line-height: 0.96;
}

#top .profile-photo {
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 28px !important;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.075);
  will-change: transform;
  animation: portrait-arrive 900ms var(--apple-ease) 360ms both;
}

@keyframes portrait-arrive {
  from { opacity: 0; transform: translate3d(0, 24px, 0) scale(0.985); }
  to   { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}

/* Hero stagger: eyebrow → headline → description → actions → status. */
#top .max-w-4xl > p:first-child {
  animation: hero-rise 800ms var(--apple-ease) 60ms both;
}
#top .max-w-4xl > h1 {
  animation: hero-rise 800ms var(--apple-ease) 150ms both;
}
#top .max-w-4xl > p:nth-of-type(2) {
  animation: hero-rise 800ms var(--apple-ease) 240ms both;
}
#top .max-w-4xl > div:has(> a) {
  animation: hero-rise 800ms var(--apple-ease) 330ms both;
}
#top .max-w-4xl > div:last-child {
  animation: hero-rise 800ms var(--apple-ease) 420ms both;
}

@keyframes hero-rise {
  from { opacity: 0; transform: translate3d(0, 24px, 0); }
  to   { opacity: 1; transform: translate3d(0, 0, 0); }
}

/* Gentle scroll parallax on browsers that support scroll-driven timelines. */
@supports (animation-timeline: scroll()) {
  #top .profile-photo {
    animation: portrait-parallax linear both;
    animation-timeline: scroll(root);
    animation-range: 0px 650px;
  }

  @keyframes portrait-parallax {
    from { transform: translate3d(0, 0, 0); }
    to   { transform: translate3d(0, 34px, 0); }
  }
}

/* Existing IntersectionObserver Reveal wrappers keep their behavior;
   this gives their transitions the same controlled deceleration. */
.transition-all,
.duration-700 {
  transition-timing-function: var(--apple-ease) !important;
}

/* Shared bento-card surface. */
#work article,
#education .rounded-\[1\.75rem\],
main > section:nth-of-type(3) .divide-y > div > div,
#stack .grid > div > div,
#journey .border-t > div > div {
  border: 1px solid var(--apple-hairline-soft);
  border-radius: var(--apple-radius);
  background: var(--apple-surface);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.015);
  transition:
    transform 520ms var(--apple-ease),
    box-shadow 520ms var(--apple-ease),
    border-color 520ms var(--apple-ease),
    background-color 520ms var(--apple-ease);
}

#work article:hover,
#education .rounded-\[1\.75rem\]:hover,
main > section:nth-of-type(3) .divide-y > div > div:hover,
#stack .grid > div > div:hover,
#journey .border-t > div > div:hover {
  transform: translateY(-4px);
  box-shadow: var(--apple-shadow-hover);
  border-color: rgba(0, 0, 0, 0.075);
}

/* Capabilities — convert the existing four rows into a responsive bento grid. */
main > section:nth-of-type(3) .divide-y {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  border: 0;
}

main > section:nth-of-type(3) .divide-y > div > div {
  height: 100%;
  min-height: 190px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 22px;
  padding: 28px;
  border: 1px solid var(--apple-hairline-soft);
  border-radius: var(--apple-radius);
  background: var(--apple-surface);
}

main > section:nth-of-type(3) .divide-y > div > div > span {
  color: rgba(29, 29, 31, 0.38);
  font-variant-numeric: tabular-nums;
}

/* Selected work — product-showcase cards and calm image panels. */
#work {
  scroll-margin-top: 90px;
}

#work .space-y-20 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
  gap: 22px;
}

#work article {
  height: 100%;
  padding: 14px;
  overflow: hidden;
}

#work article > div:first-child {
  aspect-ratio: 16 / 10;
  border-radius: 19px;
  background: #ececef;
  overflow: hidden;
}

#work article > div:first-child h3 {
  font-size: clamp(2rem, 4vw, 3.8rem);
}

#work article > div:last-child {
  padding: 12px 8px 10px;
}

#work article a {
  border-color: rgba(0, 0, 0, 0.12);
  border-radius: 999px;
}

#work article a:hover {
  background: var(--apple-space-gray);
  color: #fff;
  transform: translateY(-2px);
}

#work article a:active,
#contact button:active,
#top a:active {
  transform: scale(0.96);
}

/* Skill toolkit — balanced two-column bento cells. */
#stack {
  background: #fff !important;
  border-color: var(--apple-hairline) !important;
}

#stack .grid {
  gap: 14px;
  overflow: visible;
  border: 0;
  background: transparent;
}

#stack .grid > div > div {
  height: 100%;
  min-height: 155px;
  border: 1px solid var(--apple-hairline-soft);
  border-radius: var(--apple-radius);
  background: var(--apple-surface);
  padding: 28px;
}

/* Journey — each milestone becomes a quiet, tactile card. */
#journey .border-t {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  border: 0;
}

#journey .border-t > div > div {
  height: 100%;
  min-height: 150px;
  padding: 26px;
  border: 1px solid var(--apple-hairline-soft);
  border-radius: var(--apple-radius);
  background: var(--apple-surface);
}

/* Education card and contact panel. */
#education {
  background: #fff !important;
  border-color: var(--apple-hairline) !important;
}

#education .rounded-\[1\.75rem\] {
  background: var(--apple-surface) !important;
  border-color: var(--apple-hairline-soft) !important;
}

#contact > div {
  border-radius: 28px;
  background: var(--apple-space-gray);
}

#contact input,
#contact textarea {
  border-color: rgba(255, 255, 255, 0.22);
  transition: border-color 420ms var(--apple-ease);
}

#contact input:focus,
#contact textarea:focus {
  border-color: rgba(255, 255, 255, 0.8);
}

#contact button,
#top a[href="#work"],
#top a[href="#contact"],
header.fixed nav > a[href="#contact"] {
  transition:
    transform 420ms var(--apple-ease),
    background-color 420ms var(--apple-ease),
    box-shadow 420ms var(--apple-ease);
}

#contact button:hover,
#top a[href="#work"]:hover,
#top a[href="#contact"]:hover,
header.fixed nav > a[href="#contact"]:hover {
  transform: scale(1.03);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
}

#contact button:active,
#top a[href="#work"]:active,
#top a[href="#contact"]:active,
header.fixed nav > a[href="#contact"]:active {
  transform: scale(0.96);
}

/* Footer remains quiet and typographically consistent. */
footer {
  border-color: var(--apple-hairline) !important;
}

footer a {
  transition:
    transform 420ms var(--apple-ease),
    color 420ms var(--apple-ease),
    background-color 420ms var(--apple-ease);
}

footer a:hover {
  transform: translateY(-2px);
}

/* Keyboard focus: visible, understated and accessible. */
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid rgba(29, 29, 31, 0.65);
  outline-offset: 4px;
}

/* Responsive refinements. */
@media (max-width: 767px) {
  html {
    scroll-padding-top: 88px;
  }

  #top {
    min-height: auto;
    padding-top: 126px;
    padding-bottom: 76px;
  }

  #top h1 {
    max-width: 12ch;
    font-size: clamp(3.1rem, 15vw, 5.4rem);
    letter-spacing: -0.06em;
  }

  #top .profile-photo {
    max-width: 310px;
    margin-inline: auto;
  }

  main > section:nth-of-type(3) .divide-y,
  #work .space-y-20,
  #journey .border-t {
    grid-template-columns: minmax(0, 1fr);
  }

  main > section:nth-of-type(3) .divide-y > div > div,
  #stack .grid > div > div,
  #journey .border-t > div > div {
    min-height: 140px;
    padding: 23px;
  }

  #work article {
    padding: 10px;
  }

  #work article > div:first-child {
    aspect-ratio: 4 / 3;
  }

  #work article > div:last-child {
    padding: 14px 8px 8px;
  }

  header.fixed nav {
    margin-top: 10px;
    min-height: 54px;
  }
}

@media (max-width: 420px) {
  #top h1 {
    font-size: clamp(2.85rem, 14vw, 4rem);
  }

  #work article > div:first-child h3 {
    font-size: 2.2rem;
  }
}

/* Honor the visitor's system-level motion accessibility preference. */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  #top .profile-photo {
    animation: none !important;
    transform: none !important;
  }
}

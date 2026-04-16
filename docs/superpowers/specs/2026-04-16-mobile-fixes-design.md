# Mobile Responsive Fixes — Design Spec

**Date:** 2026-04-16  
**Scope:** `styles.css` only — no HTML or JS changes  
**Approach:** Option A — 8 targeted fixes, desktop-first architecture preserved

## Context

The LogisAI site already has responsive breakpoints and a working mobile layout, but several CSS rules were never adapted for smaller screens. This causes excess spacing, misaligned elements, and an oversized footer logo. All 8 fixes are additive — they append rules to existing `@media` blocks or add new overrides at the end of `styles.css`.

---

## Fixes

### Fix 1 — Section padding on mobile
**Problem:** All main sections use `padding: var(--space-24) 0` (6rem) and never reduce it on mobile, making sections feel excessively spaced on small screens.  
**Change:** Add to `@media (max-width: 768px)` — reduce padding to `var(--space-16)` (4rem) for `.services`, `.methodology`, `.solutions`, `.impact`, `.stats`, `.cta-section`, `.team-section`, `.industries-section`.

### Fix 2 — Hero content gap and padding on mobile
**Problem:** `.hero-content` has `gap: var(--space-16)` (4rem) and `padding: var(--space-20) 0` (5rem) with no mobile override, pushing content off screen on small devices.  
**Change:** Add to `@media (max-width: 768px)` — reduce gap to `var(--space-8)` (2rem) and padding to `var(--space-12) 0` (3rem).

### Fix 3 — Hero trust alignment on mobile
**Problem:** `.hero-trust` uses `align-items: flex-start` while the entire hero section is centered. On mobile this creates a misaligned left-hanging element.  
**Change:** Add to `@media (max-width: 768px)` — set `align-items: center`.

### Fix 4 — Footer logo size
**Problem:** `.logo-img-footer` is set to `width: 480px`, which is oversized and disproportionate. `max-width: 100%` prevents overflow but the logo still dominates the footer on desktop and tablet.  
**Change:** Reduce base value to `width: 280px`.

### Fix 5 — Section header margin on mobile
**Problem:** `.section-header` has `margin-bottom: var(--space-16)` (4rem) with no mobile reduction, wasting vertical space on small screens.  
**Change:** Add to `@media (max-width: 768px)` — reduce to `var(--space-8)` (2rem).

### Fix 6 — Stats grid: single column on very small screens
**Problem:** `.stats-grid` drops from 4 to 2 columns at 768px, but at 480px and below two columns are too cramped.  
**Change:** Add to `@media (max-width: 480px)` — set `grid-template-columns: 1fr`.

### Fix 7 — Footer tagline max-width on mobile
**Problem:** `.footer-tagline` has `max-width: 260px` which causes awkward line breaks in the centered mobile footer column.  
**Change:** Add to `@media (max-width: 768px)` — set `max-width: 100%`.

### Fix 8 — Industry panel padding on very small screens
**Problem:** `.industry-panel-wrap` padding only reduces to `var(--space-6)` (1.5rem) at 768px. At 480px and below, horizontal padding is still too generous.  
**Change:** Add to `@media (max-width: 480px)` — set `padding: var(--space-4)` (1rem).

---

## File to modify

- `styles.css` — all changes appended to or inserted into existing `@media (max-width: 768px)` and `@media (max-width: 480px)` blocks, plus one base value change (Fix 4).

---

## Verification

1. Open `index.html` in a browser with DevTools → Toggle device emulation
2. Test at 375px (iPhone SE), 390px (iPhone 14), 430px (iPhone 14 Plus), 768px (iPad)
3. Check each section: hero spacing, section gaps, stats layout, footer logo size, industry panel padding
4. Confirm no regressions at 1280px desktop

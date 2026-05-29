# Mobile Responsive Fixes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 8 targeted CSS issues that cause poor spacing, misalignment, and oversized elements on mobile devices.

**Architecture:** All changes are additive CSS overrides inside `styles.css`. Fixes 1–3 and 5–7 add rules inside existing `@media (max-width: 768px)` and `@media (max-width: 480px)` blocks. Fix 4 changes one base value directly. Fix 8 adds a rule to the `@media (max-width: 480px)` block.

**Tech Stack:** Pure CSS, no build tools required. Open `index.html` directly in a browser with DevTools for verification.

---

## Files

- **Modify:** `styles.css`
  - Section 18 (RESPONSIVE) — `@media (max-width: 768px)` block (line ~1818)
  - Section 18 (RESPONSIVE) — `@media (max-width: 480px)` block (line ~1852)
  - `.logo-img-footer` base rule (line ~505)
  - Industries responsive block (line ~2158)

---

### Task 1: Fix 4 — Footer logo size (base value)

**Files:**
- Modify: `styles.css` — `.logo-img-footer` rule (~line 505)

- [ ] **Step 1: Find the rule**

  Open `styles.css` and locate:
  ```css
  .logo-img-footer {
    width: 480px;
    height: auto;
    max-width: 100%;
    border-radius: 0;
    display: block;
  }
  ```

- [ ] **Step 2: Change width to 280px**

  Replace `width: 480px` with `width: 280px`:
  ```css
  .logo-img-footer {
    width: 280px;
    height: auto;
    max-width: 100%;
    border-radius: 0;
    display: block;
  }
  ```

- [ ] **Step 3: Verify visually**

  Open `index.html` in browser → scroll to footer → confirm the logo is proportional and not oversized. Check at 1280px desktop and 768px tablet.

- [ ] **Step 4: Commit**

  ```bash
  git add styles.css
  git commit -m "fix: reduce footer logo width from 480px to 280px"
  ```

---

### Task 2: Fixes 1, 2, 3, 5, 7 — Mobile overrides at 768px

**Files:**
- Modify: `styles.css` — inside `@media (max-width: 768px)` block (~line 1818)

- [ ] **Step 1: Locate the existing 768px block**

  Find this block in `styles.css`:
  ```css
  @media (max-width: 768px) {
    :root { --header-h: 88px; }
    /* ... existing rules ... */
    .cursor-glow { display: none; }
  }
  ```

- [ ] **Step 2: Append the 5 new rules at the end of this block (before the closing `}`)**

  Add:
  ```css
  /* Fix 1: Reduce section padding on mobile */
  .services,
  .methodology,
  .solutions,
  .impact,
  .stats,
  .cta-section,
  .team-section,
  .industries-section {
    padding: var(--space-16) 0;
  }

  /* Fix 2: Reduce hero content gap and padding on mobile */
  .hero-content {
    gap: var(--space-8);
    padding: var(--space-12) 0;
  }

  /* Fix 3: Center hero trust element on mobile */
  .hero-trust {
    align-items: center;
  }

  /* Fix 5: Reduce section header bottom margin on mobile */
  .section-header {
    margin-bottom: var(--space-8);
  }

  /* Fix 7: Allow footer tagline to use full width on mobile */
  .footer-tagline {
    max-width: 100%;
  }
  ```

- [ ] **Step 3: Verify visually at 375px (iPhone SE)**

  Open DevTools → set width to 375px → scroll through the page:
  - Hero: content should feel compact and well-spaced, trust badges centered
  - Each section: ~64px top/bottom padding (not 96px)
  - Section titles: ~32px gap below (not 64px)
  - Footer: tagline text should wrap naturally across full column width

- [ ] **Step 4: Commit**

  ```bash
  git add styles.css
  git commit -m "fix: reduce spacing and fix hero-trust alignment on mobile (768px)"
  ```

---

### Task 3: Fixes 6 and 8 — Overrides at 480px

**Files:**
- Modify: `styles.css` — inside `@media (max-width: 480px)` block (~line 1852)

- [ ] **Step 1: Locate the existing 480px block**

  Find:
  ```css
  @media (max-width: 480px) {
    .container { padding: 0 var(--space-4); }
    .hero-actions { flex-direction: column; width: 100%; }
    .hero-actions .btn { width: 100%; justify-content: center; }
    .cta-actions { flex-direction: column; align-items: center; }
    .cta-actions .btn { width: 100%; justify-content: center; max-width: 300px; }
    .footer-bottom { flex-direction: column; text-align: center; }
  }
  ```

- [ ] **Step 2: Append 2 new rules at the end of this block (before the closing `}`)**

  Add:
  ```css
  /* Fix 6: Stats single column on very small screens */
  .stats-grid {
    grid-template-columns: 1fr;
  }

  /* Fix 8: Industry panel compact padding on very small screens */
  .industry-panel-wrap {
    padding: var(--space-4);
  }
  ```

- [ ] **Step 3: Verify visually at 375px**

  Open DevTools → set width to 375px:
  - Stats section: 4 stat cards stacked in a single column
  - Industries panel: content has tight 16px padding on all sides, nothing clipped

- [ ] **Step 4: Commit**

  ```bash
  git add styles.css
  git commit -m "fix: stats single-column and industry panel padding at 480px"
  ```

---

### Task 4: Also add 768px override to industries block

**Files:**
- Modify: `styles.css` — industries `@media (max-width: 768px)` block (~line 2158)

> Note: The industries section has its own responsive block separate from the main one. The section padding fix in Task 2 already covers `.industries-section`, but we need to verify the existing industries 768px block doesn't conflict.

- [ ] **Step 1: Locate the industries 768px block**

  Find:
  ```css
  @media (max-width: 768px) {
    .industry-panel-wrap {
      padding: var(--space-6);
    }
    .industry-panel.active {
      grid-template-columns: 1fr;
    }
    .industry-tab span {
      display: none;
    }
    .industry-tab {
      font-size: var(--text-lg);
      padding: var(--space-2) var(--space-3);
    }
  }
  ```

- [ ] **Step 2: Confirm no conflict**

  The `padding: var(--space-6)` here (1.5rem) is for 768px. Fix 8 targets 480px with `var(--space-4)` (1rem). Since 480px is more specific (lower breakpoint applied later in cascade), there is no conflict — no change needed here.

- [ ] **Step 3: Final full-page visual check**

  Open DevTools and test at these widths:
  - **375px** (iPhone SE) — all sections compact, hero centered, stats 1-col, industry panel tight
  - **390px** (iPhone 14) — same as above
  - **768px** (iPad) — sections at 4rem padding, footer tagline full width
  - **1280px** (Desktop) — footer logo 280px, no regressions

- [ ] **Step 4: Final commit**

  ```bash
  git add styles.css
  git commit -m "fix: verify no conflicts in industries responsive block"
  ```

---

## Summary of all CSS changes

| Fix | Selector | Property | Before | After | Breakpoint |
|-----|----------|----------|--------|-------|------------|
| 1 | `.services`, `.methodology`, etc. | `padding` | `6rem 0` | `4rem 0` | `max-width: 768px` |
| 2 | `.hero-content` | `gap` / `padding` | `4rem` / `5rem 0` | `2rem` / `3rem 0` | `max-width: 768px` |
| 3 | `.hero-trust` | `align-items` | `flex-start` | `center` | `max-width: 768px` |
| 4 | `.logo-img-footer` | `width` | `480px` | `280px` | base |
| 5 | `.section-header` | `margin-bottom` | `4rem` | `2rem` | `max-width: 768px` |
| 6 | `.stats-grid` | `grid-template-columns` | `repeat(2,1fr)` | `1fr` | `max-width: 480px` |
| 7 | `.footer-tagline` | `max-width` | `260px` | `100%` | `max-width: 768px` |
| 8 | `.industry-panel-wrap` | `padding` | `1.5rem` | `1rem` | `max-width: 480px` |

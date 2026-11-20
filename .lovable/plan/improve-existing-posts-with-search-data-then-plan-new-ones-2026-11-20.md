# Improve existing posts with search data, then plan new ones

## Phase 1 — Upgrade the 13 current posts
For each post:
1. Find its main search phrase and close variations (Ahrefs, Semrush backup) — monthly searches, difficulty, related phrases.
2. Check what the top Google results cover and list topics our post is missing.
3. Collect the real questions people ask and use them in the FAQ section.
4. Rewrite or extend the sections that are missing; check facts with web research.
5. Update titles and descriptions so they match real search wording (title under 60 characters, description under 160).
6. Quality check: 2,000+ words, no keyword stuffing, no repeated filler, correct internal links between posts, English only.

Output: a short report per post (target phrase, gaps fixed, word count).

## Phase 2 — Plan new topics
1. Look at which phrases competing vault and privacy apps rank for that we don't cover.
2. Filter for phrases that fit Veilo (hiding photos and videos, private vaults, phone privacy, encryption).
3. Rank by search volume, difficulty and how naturally Veilo fits.
4. Deliver a list of 10–15 proposed articles (title, target phrase, monthly searches, difficulty, category). You pick which ones to write next.

## Technical details
- Content stays in `src/content/posts.ts`; same slugs, so no broken links.
- Research uses Ahrefs (keyword overview, related terms, content topics, organic competitors) with US data unless you say otherwise.
- Writing is split across parallel writers; reading time recalculates automatically.
- Static export, RSS and sitemap update with no changes needed.

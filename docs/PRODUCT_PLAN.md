# Lokal Pikol — Product Plan

**Last Updated:** 2026-05-11
**Status:** Canonical business reference. Supersedes any conflicting plans in roadmap or todo docs.

---

## Vision

Lokal Pikol becomes the centralised pickleball search engine for **Negros Oriental** — directory + availability search + integrated booking systems — and a hyper-local pickleball-adjacent media property funded by featured listings and local ads.

The end state is not a booking platform. It is a discovery layer that sits on top of multiple booking systems, plus a free directory for everyone else. Players come to find courts; bookings happen wherever each court already takes them.

## Mode

**Community contribution** with a soft 2027 checkpoint to re-evaluate flipping to business mode.

This is not a hard deadline. The project does not have to become a real business in 2027 — it has to be honestly re-evaluated. If the scene and traction support it, raise prices and add revenue streams. If not, wind down honestly rather than letting it drain energy for years.

## Geographic Scope

**Negros Oriental only.** Not Negros Occidental, not the rest of the Visayas. No expansion until 2028 at earliest, and only after Negros Oriental is genuinely saturated.

The geographic constraint is a feature, not a limitation. It is what makes the local-media revenue model viable and what gives Lokal Pikol a defensible position against larger national platforms.

## Pricing — Scheduling Tool

- **First 3 months:** ₱150 total (onboarding intro — the ₱150 is a commitment signal, not a revenue number)
- **Month 4 onwards:** ₱450/quarter (₱150/month equivalent, quarterly billing)

Quarterly billing reduces admin burden (4 follow-ups/year per court instead of 12). Monthly billing in PH small-business context quietly burns the founder's time.

**No stated free tier.** Free months extended to courts hosting in-person visits are offered as personal kindness, never as a stated discount. Preserves the ₱150 price anchor.

## Revenue Mix

In priority order:

1. **Scheduling tool subscription** — foundation, covers hosting at ~7 paying courts
2. **Featured listings** — courts pay extra (~₱500/month) to appear top in city/search results
3. **Custom local ads** — coffee shops, events, gear; hand-curated content-style placement only, never banner ads or AdSense
4. **Tournament listings** — paid promotion when demand emerges
5. **Gear/lifestyle partnerships** — slow-built, brand-aligned, reactive only

**Skipped:**
- Booking referral fees (would require asking partners for money — bad relationship dynamic at this stage)
- Player-side premium (wrong for PH market at viable price points)
- Geographic expansion (dilutes focus)

**Rule for ads:** Any ad placement must look like content. No popups, banners, or third-party ad networks. Hand-curated, clearly labelled, must feel like it belongs.

## Customer Acquisition — Supply Side (Courts)

Total addressable market: ~130 courts today, growing 5–10/quarter. Founder knows zero court owners personally.

**Sequencing:**

1. **Warm first** — courts already on Lokal Pikol via signed-URL self-onboarding. Visit in person, pitch scheduling tool. Highest conversion rate.
2. **Marquee cold next** — pick 8–10 highest-profile courts in Dumaguete/Valencia/Bacong/Sibulan. Full visit treatment: drone footage, profile photos. These become marketing assets and reference cases.
3. **Long tail last** — ~100+ remaining courts via signed-URL email referencing the marquee listings. Visit only those who respond or are strategically important.

The cold visits are for **content and relationships**, not for onboarding. The signed-URL flow handles onboarding without requiring a visit.

## Customer Acquisition — Demand Side (Players)

Current baseline: ~50 players/day (~1,500 MAU) on a free directory with no search functionality.

**Single channel:** Facebook. Page presence + activity inside existing Negros Oriental pickleball groups.

**Cadence:** Weekly court spotlight + "what's available" post during peak season.

**Conversion mechanic:** Reply in FB groups to "where can I play tonight?" questions with direct Lokal Pikol links.

**Distribution asset:** QR stickers on visited courts' walls. "Find more courts near you." ~₱20 per sticker.

**Ad spend:** Occasional only — when a high-profile event creates a natural moment (e.g. national tournaments). Not a constant line item.

## Player Segments

| Segment | Primary product surface | Importance |
|---|---|---|
| **Newcomers** | Directory + city filter | Highest leverage — fastest-growing, weakest existing knowledge moat |
| **Tourists** | Directory + Google Maps integration | Important but seasonal |
| **Regulars** | Availability search (Phase 2) | Retention engine once search ships |

## Partnerships

Three known booking systems in the local landscape. None have public APIs. Each integration will require their dev work, so the pitch must justify the effort.

**Sequencing — sequential, not parallel:**

1. **Court Access** — first. 20+ courts in Negros Oriental (out of their 30+ total). Local neighbours. Most defensively threatened by Lokal Pikol's growth. Pricing ₱1,000/month + 5% commission per booking.
2. **Picklepiper** — second. 5 high-quality courts (rich owners, strong relationships). Prestige play, not volume. Pitch armed with Court Access integration as proof.
3. **Courthub** — third. Fill remaining gaps.

**Exchange (same for all three):**
- **What Lokal Pikol offers:** free distribution to 1,500+ MAU; first-partner co-marketing moment; outgrown-customer referrals (courts using the scheduling tool that need full booking functionality get pointed to the partner).
- **What Lokal Pikol asks:** availability data for Negros Oriental courts via any mechanism (API, CSV export, scraping with permission); bookings redirect to the partner's own system.
- **No money in either direction.**

**On "giving away customers":** referring courts that outgrow the scheduling tool is not a sacrifice. Those courts were never Lokal Pikol's natural customers — Lokal Pikol is intentionally not a full booking system. Referral aligns with brand positioning.

## Risk Posture

**Risk 1 — Data staleness across the 130 listings.** Most fields rarely change (name, address, contact info, social links). Only operating hours genuinely drift. Mitigation: lightweight annual nudge email + "report incorrect info" button for player-driven correction. Build after the visits, not before.

**Risk 2 — Partnership chicken-and-egg.** All three booking systems may say "ship something first." Mitigation: build a manual "ghost" integration (scrape or hand-compile availability for one Court Access court with the owner's permission) before pitching. Working demo > slide deck.

**Risk 3 — Solo founder burnout.** This is the highest-probability failure mode and the founder's named concern. Mitigations:
- **Weekly hour ceiling** of 8–12 hours total (dev, marketing, visits, support). Track weekly.
- **One local co-conspirator** — not a co-founder, not paid. An invested human (a pickleball-obsessed court owner, a coach, a player who also markets) who acts as a sounding board.
- **Protect the 2-month-silence property** — the core directory must continue serving 50/day without founder input. Avoid commitments that require the founder specifically every week.
- **Monthly check-in discipline** — same date each month, 3 lines: courts onboarded, paying customers, biggest blocker. Two consecutive months with the same blocker = escalate or pivot.

## Out of Scope (Explicit)

- Full booking system (player accounts, payments, automated approvals, transactional emails)
- Player-side premium subscription
- Geographic expansion outside Negros Oriental
- Coaching marketplace
- Player community features (forums, ratings, chat)
- Booking referral fees from partner systems
- Anything that requires the founder to commit recurring weekly time to a single sponsor or partner

# Scheduling Domain — Roadmap

**Last Updated:** 2026-05-06

## Business Vision

The scheduling tool is a standalone product sold to pickleball facility managers as cheap, simple scheduling software. It is not an end-to-end booking system — it is a tracking and availability-sharing tool.

**Growth plan:**
1. **Now:** Build and sell the scheduling tool. Target 15–20 facility admin clients.
2. **After ~15–20 clients:** Build the player-facing availability search on `directory.lokal-pikol.test` — players can find courts available at a specific date and time.
3. **After search is live:** Approach courts that have their own booking systems and propose tier-2 API integration — their availability feeds into the search results.

---

## Current State (as of 2026-05-06)

| Feature | Status |
|---------|--------|
| Login / auth | ✅ Done |
| Courts page (slot grid + date picker) | ✅ Done |
| Court creation (modal) | ✅ Done |
| Reserve court (slot-first modal) | ✅ Done |
| Block reservation create (multi-court/multi-day form) | ✅ Done |
| Block reservation view (grouped by court) | 🔄 In progress |
| Block reservation delete | 🔄 In progress |
| Reservations page (calendar) | ⬜ Not started |
| Availability page | ⬜ Not started |
| Facility Profile page | ⬜ Not started |
| Nav update (add Reservations, Availability) | ⬜ Not started |

---

## Build Sequence — Facility Admin Features (Phase 1)

These must all be complete before moving to the player-facing search.

### 1. Complete Block Reservations (current branch)
- View block reservations grouped by court
- Delete individual block reservations with confirmation dialog
- Backend delete route + controller

### 2. Reservations Page
- Calendar view using **react-big-calendar** (week default, day view on click)
- Court selector dropdown — URL param driven (`?court=uuid&date=YYYY-MM-DD`)
- Auto-redirect to first court when no `?court=` param
- Delete reservation with confirmation dialog
- Backend delete route + controller

### 3. Availability Page
- Date picker → computes free slots per court using `GenerateCourtSlotsWithAvailability`
- Text output: free slots grouped by court, copy to clipboard
- Image output: all slots with strikethroughs on taken slots, downloadable via `html2canvas`

### 4. Facility Profile Page
- Edit linked `Listing` record (cross-domain — calls Directory domain actions)
- Fields: name, address, operating hours, contact info, social links, photos
- Changes reflect immediately in the public directory

### 5. Authorisation Pass
- Scope all court/reservation/block reservation mutations to the authenticated admin's listing
- Fix `CheckReservationOverlap` to also check `block_reservations`
- Do this in one pass once all features are built

---

## Phase 2 — Player-Facing Availability Search

> **Trigger:** Once 15–20 facility admin clients are onboarded.

Lives on `directory.lokal-pikol.test`. Players search for courts available at a specific date and time.

**Search result:**
- Listing cards showing specific free slots matching the search window
- Button opens a detail view with the full slot grid for that date (all courts, all slots)
- CTA: contact court to book via Facebook, Instagram, or phone (manual — no in-app booking)

**Tier model:**

| Tier | Description | Appears in search |
|------|-------------|-------------------|
| **1 — Internally managed** | Uses this scheduling tool | Yes |
| **2 — API-integrated** | Own booking system with API integration | Yes |
| **3 — Directory-only** | No schedule data | No — directory browse only |

A tier flag on `Listing` (e.g. `is_scheduling_enabled`) will be needed at this point. Design TBD when starting this phase.

---

## Phase 3 — Tier-2 API Integration

> **Trigger:** After player-facing search is live and there is demand from courts with existing booking systems.

- Negotiate integration per-court with their dev team
- At search time, query their API in real time for the requested date/time window
- Fallback: exclude from results if API is down or unresponsive
- No internal scheduling tool for tier-2 courts

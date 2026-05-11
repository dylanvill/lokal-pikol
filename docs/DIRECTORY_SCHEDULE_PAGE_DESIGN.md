# Directory Schedule Page — Design Notes

**Status:** Design complete — ready to build  
**Feature:** Public availability page for scheduling-enabled listings on the directory domain  
**Session:** Grilling session 2026-05-11

---

## What It Is

A public, read-only page on `directory.lokal-pikol.test` where players can see a facility's court availability for a selected date. This is the first step toward Phase 2 (player-facing availability search) from the roadmap.

---

## All Decisions

### URL & Routing

- **Route:** `GET /schedule/{slug}` on the directory domain
- **Controller:** `ListingScheduleController` (new, in `app/Http/Directory/Controllers/`)
- Flat route — no parent listing detail page exists, so not nested
- Non-enabled listings (or unrecognised slugs) → **404**

### Slugs

- **New column:** `slug` on the `listings` table
- **Generation:** Auto-generated from `Listing.name` using `Str::slug()` at creation time
- **Collision handling:** Append `-2`, `-3`, etc. (e.g. `bacolod-pickleball-hub-2`)
- **Locked permanently:** Never updated, even if the listing name changes later. Stable URLs matter more than pretty ones.
- **Manual edits only:** Developer edits DB directly if ever needed. No UI for this.
- **Both creation paths must generate it:** `CreateListing` action and `CreateListingCommand`

### Scheduling Enabled Flag

- **New column:** `is_scheduling_enabled` boolean on `listings`, default `false`
- **Set by:** Developer manually (DB or Artisan command) — not editable by the facility admin
- **Not derived from FacilityAdmin presence** — admin could be mid-setup for days while reservations and block slots are populated; flag controls when the page goes public
- Flip to `true` only when the facility is ready to be seen publicly

### Page Layout

- **Wrapper:** `DirectoryLayout` — same header, footer, and white content area as the listing index. The page lives on the directory domain; UI is consistent.
- **`headerComponent` slot:** Listing name + date picker
- **Content area:** All courts in a grid, all slots shown read-only

### Date Picker

- **URL param driven:** `?date=YYYY-MM-DD`, Inertia visit on change
- **Default:** Today
- Consistent with the internal Courts and Availability pages
- Makes the URL shareable at a specific date (player can send "check Saturday's availability")

### Slot Display

- **Available:** Default styling — no special indicator
- **Unavailable (reserved OR blocked):** Red, labelled **"Reserved"** — no names, no distinction between reservation types
- Uses `GenerateCourtSlotsWithAvailability` (cross-domain call — see below)

### Contact Banner

Shown on the page to explain the read-only nature and direct players to book manually:

> "This schedule shows live availability for this facility. To book, contact them via:"
> - **Facebook button** — live link if listing has a Facebook social link
> - **Instagram button** — live link if listing has an Instagram social link
> - If neither available → show "Facebook" as non-clickable text (fallback)

### Listing Card Changes (directory index)

- **"View schedule" link** added to the card **body** (not footer), as a detail row with a calendar icon — positioned after the social links. Only shown when `is_scheduling_enabled = true`.
- **"Book Court" renamed to "Booking link"** in the card footer — clearer that it's an external URL, not an in-app booking flow.
- `ListingResource` needs two new fields: `scheduleUrl` (the `/schedule/{slug}` URL, `null` if not enabled) and the slug itself isn't needed — just the resolved URL.

### Cross-Domain Architecture

- **Direction:** `app/Http/Directory/Controllers/ListingScheduleController` calls `app/Source/Scheduling/Court/Actions/GenerateSlots/GenerateCourtSlotsWithAvailability`
- This is **bidirectional** — Directory HTTP → Scheduling Source (new direction; previously only Scheduling → Directory)
- Accepted as pragmatic. The action is read-only, stays in the scheduling domain (it's a scheduling business function, not a shared utility), and a comment in the controller documents the cross-domain call.

### Empty State

- Deferred — `is_scheduling_enabled` will only be flipped when the facility has courts. Not worth handling now.

---

## Build Checklist

### Backend

- [ ] Migration: add `slug` (string, unique) and `is_scheduling_enabled` (boolean, default false) to `listings`
- [ ] Update `CreateListing` action — generate slug from name on save
- [ ] Update `CreateListingCommand` — same
- [ ] `ListingScheduleController@show` — resolves listing by slug, 404 if not found or `is_scheduling_enabled = false`, calls `GenerateCourtSlotsWithAvailability` for all courts, passes date from `?date=` param (defaults to today)
- [ ] Route: `GET /schedule/{slug}` in `routes/directory.php`
- [ ] `ListingResource` — add `scheduleUrl` (resolved `/schedule/{slug}` URL if `is_scheduling_enabled`, otherwise `null`), rename `bookingUrl` key if needed

### Frontend

- [ ] `ListingScheduleController` Wayfinder action generated
- [ ] Schedule page (`resources/js/directory/pages/schedule.tsx`) — `DirectoryLayout`, listing name + date picker in `headerComponent`, court grid below, contact banner
- [ ] Read-only slot grid component — renders all courts with slots; unavailable slots show red + "Reserved" label (reuse or adapt from scheduling domain as needed)
- [ ] Contact banner component — Facebook/Instagram links from listing social links; non-clickable "Facebook" fallback
- [ ] `ListingCard` — add "View schedule" detail row (calendar icon, links to `scheduleUrl`) shown only when `scheduleUrl` is not null; rename "Book Court" → "Booking link"
- [ ] `ListingItem` TypeScript model — add `scheduleUrl: string | null`

# Directory Domain — Todo

**Last Updated:** 2026-05-11
**Build sequence:** See `DIRECTORY_DOMAIN_ROADMAP.md`

---

## ✅ Done — Public Schedule Page

- [x] Migration: `slug` (unique) and `is_scheduling_enabled` (boolean, default false) on `listings`
- [x] `CreateListing` action — auto-generates slug from name; collision suffix `-2`, `-3`
- [x] `listing:populate-empty-slugs` Artisan command — backfills slugs for existing listings
- [x] `ListingScheduleController@show` — resolves listing by slug, 404 if not enabled, anonymises slot labels to "Reserved"
- [x] Route: `GET /schedule/{slug}` in `routes/directory.php`
- [x] `ListingResource` — adds `scheduleUrl` (resolved URL if `is_scheduling_enabled`, else `null`)
- [x] Schedule page (`resources/js/directory/pages/schedule.tsx`) — facility info header, date picker, contact banner, read-only court grid, smart back navigation
- [x] `ScheduleCourtCard` — read-only slot grid with blue/red availability legend
- [x] `ScheduleContactBanner` — Facebook/Instagram links; non-clickable "Facebook" fallback
- [x] `ListingCard` — "View schedule" row (calendar icon, conditional on `scheduleUrl`); "Book Court" renamed to "Booking link"
- [x] `ListingItem.ts` — adds `scheduleUrl: string | null`

---

## 💭 Deferred — Revisit Later

- [ ] Empty state on schedule page — deferred; `is_scheduling_enabled` will only be flipped when courts exist
- [ ] `listing:populate-slugs` for `CreateListingCommand` — command already generates slugs via `CreateListing` action; existing listings covered by `listing:populate-empty-slugs`

---

## To-Do — UX Improvements (from roadmap)

- [ ] Text search by court name
- [ ] Listing count indicator ("Showing X of Y courts")
- [ ] Share button on each card (Web Share API + clipboard fallback)
- [ ] Sort by popularity (aggregate analytics click events)
- [ ] Sort by city

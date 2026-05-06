# Directory Domain — Roadmap

**Last Updated:** 2026-05-06

## UX Improvements

| # | Feature | Status |
|---|---------|--------|
| 1 | **Text search by court name** — Search for a specific court by name. Currently no way to find a known court without scrolling the full directory. | To-Do |
| 2 | **Listing count indicator** — "Showing X of Y courts" above the grid, updates as filters change. Gives context about directory size and filter narrowness. | To-Do |
| 3 | **"New" badge on recent listings** — Visual badge on cards added within the last 14 days. Rewards new registrations with visibility and gives returning visitors something to notice. | Done |
| 4 | **Share button on each card** — Web Share API with clipboard fallback. Players frequently share court info via Messenger/group chats — currently requires screenshotting. | To-Do |
| 5 | **Sort by popularity** — Use custom analytics data (total click events per listing) to rank courts by engagement. Requires aggregating analytics entries per listing. | To-Do |
| 6 | **Sort by city** — Alphabetical city-based sorting as an alternative to the city filter dropdown. | To-Do |

## Availability Search Integration (Phase 2 — Scheduling)

When the Scheduling domain reaches 15–20 facility admin clients, the directory will gain a date/time availability search. Players will be able to filter for courts available at a specific time.

- Only tier-1 (internally scheduled) and tier-2 (API-integrated) listings will appear in availability search results
- Directory-only listings remain browsable but are excluded from availability search
- Detail view: full slot grid per court + contact CTA (Facebook, Instagram, phone)

See `docs/SCHEDULING_DOMAIN_ROADMAP.md` for the full plan.

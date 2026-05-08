# Scheduling Domain — Todo

**Last Updated:** 2026-05-08  
**Build sequence:** See `SCHEDULING_DOMAIN_ROADMAP.md`

---

## ✅ Done — Block Reservations (current branch: `feature/facility-booking-management`)

- [x] Fix `BlockReservation.ts` type — updated to `slots: { id: UuidString, slots: CourtSlot[] }` to match API shape and expose the `id` needed for delete
- [x] Build out `CourtBlockReservationSection` — render day groups with slot badges and a delete button per entry (`resources/js/scheduling/components/court/CourtBlockReservationSection/index.tsx`)
- [x] Backend delete route — `DELETE /reservations/block-reservation/{blockReservation:uuid}` in `routes/scheduling.php`
- [x] Backend delete controller — new `DeleteBlockReservationController`
- [x] Confirmation dialog before delete — follow `ReserveCourtCardModal` Chakra `Dialog` pattern
- [x] Empty state per court — prompt to create when a court has no block reservations

---

## ✅ Done — Reservations Page

**Design decisions:**
- Monthly data loading — one Inertia visit per month navigation (`?court=uuid&month=YYYY-MM`)
- Both reservation types normalised into `ReservationCalendarItemApiModel` (Spatie Data)
- Regular reservations: blue events; block reservations: orange events with `(Blocked)` name prefix
- Event click opens a Chakra Dialog — detail view from already-loaded payload, no extra HTTP request
- Detail dialog: name, date/day, time range, court — delete button for regular reservations only
- Delete: dialog acts as confirmation (no nested step), page reloads same court + month after

**Backend**
- [x] `ReservationCalendarItemApiModel` — unified Spatie Data model; fields: `id`, `type`, `title`, `start`, `end`, `courtName`, `dateDisplay`, `timeDisplay`
- [x] Reservations controller — `?court=uuid&month=YYYY-MM`, loads full calendar month, auto-redirect to first court if no `?court=` param, empty state if no courts
- [x] Reservations route (`GET /reservations`)
- [x] Reservation delete route (`DELETE /reservations/{reservation:uuid}`)
- [x] Reservation delete controller — flash success message, redirect back

**Frontend**
- [x] react-big-calendar CSS import setup
- [x] `ReservationCalendarItem.ts` TypeScript model matching `ReservationCalendarItemApiModel`
- [x] Reservations page (`resources/js/scheduling/pages/reservations/index.tsx`)
  - Court dropdown (URL param driven, auto-redirect to first court on mount)
  - Week view default, day view on click
  - Blue events for regular reservations, orange for block reservations
  - Month navigation triggers Inertia visit (updates `?month=` param)
  - Empty state when listing has no courts
- [x] `ReservationEventDialog` component — detail dialog for both types; delete button only for `type === 'reservation'`
- [x] Add Reservations to sidebar nav

---

## ⬜ Availability Page

**Backend**
- [ ] Availability controller — accepts `?date=`, runs `GenerateCourtSlotsWithAvailability` for all courts

**Frontend**
- [ ] Availability page (`resources/js/scheduling/pages/availability/index.tsx`)
  - Date picker
  - Free slots grouped by court (text format)
  - Copy to clipboard button
- [ ] `AvailabilityImageTemplate` component — all slots with strikethrough on taken ones
- [ ] Install `html2canvas`
- [ ] Download image button
- [ ] Add Availability to sidebar nav

---

## ⬜ Facility Profile Page

- [ ] Profile controller — load authenticated admin's linked `Listing`
- [ ] Profile update route + request
- [ ] Profile page (`resources/js/scheduling/pages/profile/profile.tsx`) — edit listing fields
- [ ] Wire to Directory domain actions (`UpdateListing`, `UpdateListingMedia`, `UpdateSocialLink`)
- [ ] Rename "Profile" → "Facility Profile" in sidebar nav

---

## ⬜ Nav Updates

- [ ] Add Reservations nav item with icon
- [ ] Add Availability nav item with icon
- [ ] Rename Profile → Facility Profile and uncomment in sidebar

---

## 🔒 Deferred — Authorisation Pass

> Do in one pass once all features are built. Low risk now (single admin).

- [ ] `ReserveCourtRequest::authorize()` — verify court belongs to authenticated admin's listing
- [ ] `CreateBlockReservationRequest::authorize()` — verify all `courtIds` belong to authenticated admin's listing (custom validation rule)
- [ ] Audit all other routes for similar gaps

---

## 🐛 Deferred — Correctness

- [ ] `CheckReservationOverlap` — extend to also check `block_reservations` for the court on the matching `day_of_the_week` (currently only checks `reservations` table)
  - **File:** `app/Source/Scheduling/Court/Actions/ReserveCourt/Rules/CheckReservationOverlap.php`

---

## 💭 Deferred — Revisit Later

- [ ] `BlockReservation.listing_id` redundancy — review when building availability search. If neither the search nor any admin view needs the direct FK, drop it via migration and remove `Listing::blockReservations()`

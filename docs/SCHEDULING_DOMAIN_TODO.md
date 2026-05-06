# Scheduling Domain — Todo

**Last Updated:** 2026-05-06  
**Build sequence:** See `SCHEDULING_DOMAIN_ROADMAP.md`

---

## 🔄 In Progress — Block Reservations (current branch: `feature/facility-booking-management`)

- [ ] Block reservations view page — grouped by court, slots rendered as `CourtSlot` entities
- [ ] Block reservation delete route (`DELETE /reservations/block-reservation/{blockReservation:uuid}`)
- [ ] Block reservation delete controller
- [ ] Confirmation dialog before delete
- [ ] Empty state per court when no block reservations exist

---

## ⬜ Reservations Page

**Backend**
- [ ] Reservations controller — scoped to `?court=uuid`, `?date=YYYY-MM-DD`, auto-redirect to first court if no param
- [ ] Reservations route (`GET /reservations`)
- [ ] Reservation delete route (`DELETE /reservations/{reservation:uuid}`)
- [ ] Reservation delete controller

**Frontend**
- [ ] Install `react-big-calendar` + types
- [ ] Reservations page (`resources/js/scheduling/pages/reservations/index.tsx`)
  - Court dropdown (URL param driven)
  - Week view default, day view on click
  - Confirmation dialog on delete
- [ ] Add Reservations to sidebar nav

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

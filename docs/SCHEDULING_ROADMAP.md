# Scheduling Domain — Roadmap

**Context:** The scaffolding is done. The subdomain (`scheduling.lokal-pikol.test`), Inertia middleware, blade template, and TSX entry point all exist. The goal now is to build the full scheduling tool that lets facility managers log court reservations, and ultimately powers the "where can I play at this time?" search for players.

> **Note:** Code uses `scheduling` (not `schedule`) for all file/route names.

---

## Suggested Build Order

1. **Module 1** → data foundation (unblocks everything)
2. **Module 2** → auth (unblocks the dashboard)
3. **Module 3** → backend CRUD (unblocks UI)
4. **Module 4** → list + forms (first usable version)
5. **Module 7** → admin linking (so you can actually test with a real court)
6. **Module 5** → calendar (enhancement to Module 4)
7. **Module 6** → availability image (the social-sharing payoff)
8. **Module 8** → directory integration (the player-facing payoff)

---

## Module 1 — Data Foundation
*"The tables and relationships everything else depends on."*

- [ ] **1.1** Create migration: `schedule_reservations` table (`id`, `uuid`, `listing_id` FK, `name`, `date`, `start_time`, `end_time`, `timestamps`, `soft_deletes`)
- [ ] **1.2** Create migration: add `listing_id` (nullable FK → `listings`) to `users` table
- [ ] **1.3** Create `Reservation` model — `app/Source/Schedule/Models/Reservation.php` — with `HasUuid`, `SoftDeletes`, `BelongsTo Listing`
- [ ] **1.4** Add `FACILITY_MANAGER` case to `UserRoles` enum — `app/Source/Authentication/Enums/UserRoles.php`
- [ ] **1.5** Add `listing()` BelongsTo relationship to `User` model — `app/Source/Authentication/Models/User.php`
- [ ] **1.6** Add `scheduling.tsx` to the Vite input array — `vite.config.ts`
- [ ] **1.7** Run migrations and verify schema

---

## Module 2 — Facility Manager Accounts
*"Admins create accounts. Managers log in. No self-registration."*

- [ ] **2.1** Build admin UI to create a facility manager account (name, email, password, assign listing)
- [ ] **2.2** Build login page for facility managers — `resources/js/scheduling/pages/auth/login.tsx`
- [ ] **2.3** Wire up `LoginRequest` form validation — `app/Http/Scheduling/Requests/LoginRequest.php`
- [ ] **2.4** Build `LoginController` (show + store) — `app/Http/Scheduling/Controllers/Auth/LoginController.php`
- [ ] **2.5** Build `LogoutController` — `app/Http/Scheduling/Controllers/Auth/LogoutController.php`
- [ ] **2.6** Build `AuthenticateFacilityManager` middleware (checks auth + role) — `app/Http/Scheduling/Middleware/AuthenticateFacilityManager.php`
- [ ] **2.7** Add login/logout routes to `routes/scheduling.php`
- [ ] **2.8** Test: facility manager can log in and is redirected to dashboard; non-manager is denied

---

## Module 3 — Reservation Management (Core CRUD)
*"The actual job: log a court reservation in four fields."*

- [ ] **3.1** Build `CreateReservation` action + DTO — `app/Source/Schedule/Actions/CreateReservation/`
- [ ] **3.2** Build `UpdateReservation` action + DTO — `app/Source/Schedule/Actions/UpdateReservation/`
- [ ] **3.3** Build `DeleteReservation` action (soft delete) — `app/Source/Schedule/Actions/DeleteReservation/`
- [ ] **3.4** Build `ListReservations` action (filter by listing + optional date/month) — `app/Source/Schedule/Actions/ListReservations/`
- [ ] **3.5** Build `ReservationResource` (uuid as id, camelCase) — `app/Http/Scheduling/Resources/ReservationResource.php`
- [ ] **3.6** Build `CreateReservationRequest` form validation — `app/Http/Scheduling/Requests/CreateReservationRequest.php`
- [ ] **3.7** Build `UpdateReservationRequest` form validation — `app/Http/Scheduling/Requests/UpdateReservationRequest.php`
- [ ] **3.8** Build `ReservationController` (list) — `app/Http/Scheduling/Controllers/Reservations/ReservationController.php`
- [ ] **3.9** Build `CreateReservationController` (show + store) — `app/Http/Scheduling/Controllers/Reservations/CreateReservationController.php`
- [ ] **3.10** Build `UpdateReservationController` (show + update) — `app/Http/Scheduling/Controllers/Reservations/UpdateReservationController.php`
- [ ] **3.11** Build `DeleteReservationController` — `app/Http/Scheduling/Controllers/Reservations/DeleteReservationController.php`
- [ ] **3.12** Register all reservation routes (behind `AuthenticateFacilityManager`) — `routes/scheduling.php`

---

## Module 4 — Facility Manager Dashboard (UI)
*"What the manager sees after they log in."*

- [ ] **4.1** Build `ScheduleLayout` — nav shows court name + logout button — `resources/js/scheduling/layouts/ScheduleLayout.tsx`
- [ ] **4.2** Build reservation list page — `resources/js/scheduling/pages/reservations/index.tsx`
  - Shows today's and upcoming reservations for this court
  - Link to create a new reservation
- [ ] **4.3** Build create reservation form — `resources/js/scheduling/pages/reservations/create.tsx`
  - Fields: name/label, date, start time, end time
- [ ] **4.4** Build edit reservation form — `resources/js/scheduling/pages/reservations/edit.tsx`
  - Pre-fills from existing reservation
- [ ] **4.5** Build `Reservation.ts` TypeScript model — `resources/js/scheduling/models/Reservation.ts`
- [ ] **4.6** Wire delete confirmation (inline from list, no separate page)
- [ ] **4.7** Test: manager can create, edit, and delete a reservation end-to-end

---

## Module 5 — Calendar View
*"See the month at a glance, not just a list."*

- [ ] **5.1** Add calendar toggle to the reservation list page (`resources/js/scheduling/pages/reservations/index.tsx`)
  - Toggle between list view and month calendar
  - Clicking a day in the calendar shows that day's reservations
- [ ] **5.2** Test: calendar renders correctly, navigating months works, list/calendar toggle is smooth

---

## Module 6 — Availability Sharing
*"What managers share on Facebook/Messenger so players know when courts are free."*

- [ ] **6.1** Build `GetAvailableSlots` action + DTO — `app/Source/Schedule/Actions/GetAvailableSlots/`
  - Takes `listing_id` + `date`; returns free hourly slots by diffing against existing reservations
- [ ] **6.2** Build `AvailableSlotsController` — `app/Http/Scheduling/Controllers/Availability/AvailableSlotsController.php`
- [ ] **6.3** Register availability route — `routes/scheduling.php`
- [ ] **6.4** Build availability page — `resources/js/scheduling/pages/availability/index.tsx`
  - Date picker → fetch free slots for that date
- [ ] **6.5** Build `AvailabilityImageTemplate` component — `resources/js/scheduling/components/AvailabilityImageTemplate.tsx`
  - Off-screen styled div: court name, date, free slot list, Lokal Pikol branding
- [ ] **6.6** Wire up "Download Image" button — `html2canvas` → JPEG download (install `html2canvas` npm package)
- [ ] **6.7** Test: pick a date, see free slots, download a shareable image

---

## Module 7 — Admin: Listing ↔ User Linking
*"How admins set up new courts in the system."*

- [ ] **7.1** Confirm approach: `listing_id` FK on `users` (one listing per manager, simpler) vs `listing_users` pivot (multi-listing managers)
  - Default: FK on `users` — upgrade to pivot only if multi-listing becomes a real requirement
- [ ] **7.2** Build admin UI to assign/change the listing linked to a facility manager account
- [ ] **7.3** Test: admin assigns a listing, manager sees their court name in the dashboard nav

---

## Module 8 — Directory Integration (Tier 1 Courts)
*"Tier 1 courts appear in the player-facing availability search."*

- [ ] **8.1** Add `tier` field (or equivalent flag) to `listings` to mark tier 1 courts
- [ ] **8.2** Build `GetAvailableSlots` query path for the directory-facing search
- [ ] **8.3** Wire availability into the directory search results page
- [ ] **8.4** Test: searching by date/time on the directory surfaces correct tier 1 court availability

---

## Key Files Reference

| Area | Path |
|------|------|
| Existing pattern: action | `app/Source/Directory/Actions/CreateListing/` |
| Existing pattern: middleware | `app/Http/Scheduling/Middleware/SchedulingInertiaTemplateMiddleware.php` |
| Existing pattern: blade/TSX | `resources/views/scheduling.blade.php` + `resources/js/scheduling.tsx` |
| Route file | `routes/scheduling.php` |
| Bootstrap registration | `bootstrap/app.php` (already wired) |
| Vite config | `vite.config.ts` (needs `scheduling.tsx` added) |

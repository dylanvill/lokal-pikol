# Scheduling Domain — Product Context

**Last Updated:** 2026-05-12  
**Supersedes:** `SCHEDULING_CONTEXT.md` (earlier planning doc — see deviations below)

## What It Is

A lightweight internal scheduling tool for pickleball facility managers. They use it to log reservations manually, set recurring block schedules, view court availability, and generate shareable availability content for social media.

This is a **tracking tool**, not a booking platform. No player accounts, no payments, no automated workflows. Think glorified shared spreadsheet with a calendar view.

## Who Uses It

| User | How they get access |
|------|-------------------|
| **Facility manager** | Receives an email invite from the developer; follows a signed link to complete registration |
| **Admin (developer)** | Sends invites via `scheduling:send-registration-link`; can also provision accounts directly via `facility:create-admin` |

Each facility manager is linked to exactly one `Listing`. They only see and manage data for their own listing.

### Invitation Flow

The developer runs `php artisan scheduling:send-registration-link`, selects the listing interactively, enters the manager's email, and specifies the number of courts to auto-create (min 1, max 10). The command sends a markdown email containing a signed URL (`/register/{token}`). The token is a 64-char random string — the DB stores the hashed version alongside the listing ID, email, court count, a 1-day expiry, and a `used_at` timestamp.

The court count is stored in `FacilityAdminInviteMetadata` (part of the token metadata) so it travels through to registration completion.

When the manager visits the link:
- **Expired** — distinct error page; ask developer to resend.
- **Already used or invalid** — redirect to login.
- **Valid** — registration form with email pre-filled and locked; fields: first name, last name, phone number, password.

On submit, `StoreRegistrationController` wraps the following in a single `DB::transaction()`:
1. `CreateAdminForListing` runs with `skipActivation = true` (email verified by the invite, password set directly).
2. `CreateCourt` is called N times (from `court_count` in the token metadata), creating courts named "Court 1", "Court 2", … "Court N".

The token is marked used, the manager is auto-logged in, and redirected to `/courts`.

**`facility:create-admin` does not prompt for court count.** It is an edge-case command for provisioning a second admin for a listing that already has courts (e.g. staff change). Courts are not re-created.

The token infrastructure lives in `app/Source/Shared/` (`InvitationToken` model, `InvitationTokenTypeEnum`) so it can be reused across domains. The existing `ListingRegistrationToken` in the directory domain is a predecessor pattern — it will be migrated to the shared model in a separate pass.

## Subdomain

- **Production:** `scheduling.lokalpikol.com`
- **Local:** `scheduling.lokal-pikol.test`

## Core Concepts

### Listing → Courts → Reservations

A `Listing` (from the Directory domain) can have multiple `Court` entities. Each court has its own:
- Regular reservations (a specific date + time + name)
- Block reservations (recurring weekly schedules, e.g. "Every Tuesday 6–10pm")

The slot grid (hourly slots shown on the Courts page) is bounded by the listing's `opening_time` and `closing_time`. All courts at the same listing share the same operating hours.

### FacilityAdmin

A `FacilityAdmin` is a profile model linking a `User` (for authentication) to a `Listing`. It stores the manager's personal details (name, email, phone). Authentication uses the `facility` guard backed by the `users` table.

## Pages & Features

### Courts page (`/courts?date=YYYY-MM-DD`)
The primary working view. Shows all courts for the facility with an hourly slot grid for the selected date. Facility managers:
- Pick a date from the date picker
- See each court's slots — available, taken by a reservation (shows name), or blocked by a block reservation (shows block name)
- Click available slots on a court to open the reservation modal and log a name
- Add new courts via a modal
- Rename courts inline — a pencil icon trigger activates a Chakra `Editable` input; on enter/blur a 500ms-delayed `PATCH /courts/{court}` fires; success shows a toast, errors keep the invalid name in the input and show an error toast

**Slot rules:**
- Slots taken by a regular reservation are unavailable
- Slots taken by a block reservation are **hard blocked** — cannot be clicked to create a regular reservation
- Multi-slot selection is supported; slots must be contiguous

### Block Reservations page (`/reservations/block-reservation`)
Recurring weekly schedules that lock out slots across all future occurrences of that day.

- **View:** Grouped by court. Each court shows its recurring blocks beneath it.
- **Create:** Multi-court, multi-day selection form. One submission creates individual `BlockReservation` records per court × day combination.
- **Delete:** Per individual record, with a confirmation dialog.
- **Edit:** Not supported — delete and recreate.
- **Display:** Each block reservation rendered as court slots with `isAvailable: false` and the block name as label.

### Reservations page (`/reservations?court=UUID&date=YYYY-MM-DD`)
Calendar view of logged reservations for a selected court.

- **Library:** react-big-calendar
- **Default view:** Month view; week and day views also available
- **Court selector:** Dropdown — defaults to first court if no `?court=` param (auto-redirect). If the listing has no courts, renders an empty state with a link to the Courts page — no redirect. Switching courts preserves the current `?month=` param.
- **Delete:** Per reservation, with a confirmation dialog
- **Edit:** Not supported — delete and recreate via the Courts page
- **Block reservations on calendar:** Block reservations appear as orange, read-only events with a `(Blocked)` name prefix (e.g. "(Blocked) Open Play"). Not deletable from this page.
- **Regular reservations:** Blue events, name only as title.
- **Data loading:** Monthly. Backend accepts `?court=uuid&month=YYYY-MM`, queries the full calendar month, and returns all reservations + expanded block reservation instances for that month. Inertia page visit fires on month navigation; react-big-calendar handles week/day view transitions locally from the loaded dataset.
- **API model:** Both reservation types are normalised into a single `ReservationCalendarItemApiModel` (Spatie Data) before reaching the frontend — standardised shape regardless of source type.
- **Event click:** Opens a Chakra Dialog for both regular and block reservations. Data is sourced from the already-loaded monthly payload — no separate HTTP request on click. Regular reservations show name, date, time range, court. Block reservations show name, recurring day, time range, court (e.g. "Every Monday, 7PM – 10PM on Court 1"). Regular reservations have a delete button; block reservations are read-only from this page.
- **Delete flow:** The detail Dialog acts as confirmation — no second step. Delete button submits immediately with a loading state, then page reloads for the same court and month with fresh data. Success shown via `Inertia::flash()` toast — consistent with block reservation delete.

### Availability page (`/availability`)
A utility page for generating shareable availability content. Facility managers use it to replicate the local social media behaviour of posting court availability on Facebook/Messenger.

- **Input:** Date picker
- **Output (text):** Free slots grouped by court — copy to clipboard
- **Output (image):** All slots per court with strikethroughs on taken slots — downloadable via `html2canvas`
- **Computation:** Reuses `GenerateCourtSlotsWithAvailability`; text filters for `isAvailable: true`, image shows all slots
- **No social media integration** — facility manager copies/downloads and posts manually

Format example:
```
COURT 1:
4PM – 6PM
7PM – 10PM

COURT 2:
(fully booked)
```

### Facility Profile page (`/profile`)
Facility manager can view and edit their linked `Listing` record. Changes reflect immediately in the public Directory.

- Cross-domain: Scheduling HTTP layer calls Directory domain actions (`UpdateListing` etc.)
- Editable fields: name, address, operating hours, contact info, social links, photos

## Key Business Rules

| Rule | Detail |
|------|--------|
| Court names | Required, max 100 chars, unique per listing — validated at HTTP layer only (no DB unique constraint) |
| Block reservations are hard | Blocked slots cannot be overridden with regular reservations |
| Delete only | No edit for regular or block reservations — delete and recreate |
| Confirmation dialogs | Both reservation types require confirmation before deletion |
| Courts inherit listing hours | No per-court operating hours |
| Slot granularity | Hourly slots only |
| Null hours guard | Manual onboarding process ensures `opening_time`/`closing_time` are set before a `FacilityAdmin` is provisioned |

## What It Is Not

- Not a booking system — no player-facing booking flow
- No player accounts
- No payments or fees
- No reservation approval workflow
- No automated notifications
- Not a replacement for courts that have their own booking systems

## Deviations from the Original Planning Doc (`SCHEDULING_CONTEXT.md`)

| Planning doc said | Actual implementation |
|---|---|
| Domain: `App\Source\Schedule\` | `App\Source\Scheduling\Court\` + `App\Source\Scheduling\Facility\` |
| Route prefix: `schedule.` | `scheduling.` |
| Reservations belong to `Listing` directly | `Court` entity sits between `Listing` and `Reservation` |
| Add `listing_id` to `User` | Separate `FacilityAdmin` profile model |
| Simple role on `User` | Separate `facility` auth guard |
| Slot grid 00:00–24:00 | Slot grid bounded by `listing.opening_time`/`closing_time` |
| Laravel Resource classes | Spatie Laravel Data (`BlockReservationApiModel` etc.) for Scheduling domain |

## Known Deferred Issues

See `SCHEDULING_DOMAIN_TODO.md` for the full todo list including deferred items.

| Issue | Status |
|-------|--------|
| Court ownership authorisation | Deferred — scaffold in one pass after all features are built |
| `CheckReservationOverlap` doesn't check block reservations | Deferred — fix in correctness pass |
| `BlockReservation.listing_id` redundancy | Deferred — revisit when building availability search |

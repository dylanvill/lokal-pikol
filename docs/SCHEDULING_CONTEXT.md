# Schedule Domain — Context

**Created:** April 24, 2026

## Why This Exists

The Lokal Pikol directory is useful but static. The most valuable thing it can become is a court finder that answers "where can I play at this time, on this date?" — but that requires knowing each court's live availability.

Rather than rebuilding the full abandoned booking system, we're building a minimal internal scheduling tool for facility managers. They log reservations manually (name, date, start time, end time). Lokal Pikol then has enough data to power a date/time availability search for players browsing the directory.

This is intentionally scoped small — a glorified shared spreadsheet, not a booking platform.

## Domain Overview

**Source domain:** `App\Source\Schedule`  
**Subdomain:** `schedule.lokalpikol.com` (local: `schedule.lokal-pikol.test`)  
**Users:** Facility managers only — admin-created accounts, no self-registration  
**Scope:** Record-keeping only. No player accounts, no payments, no approval workflows.

## Three-Tier Court Model (Directory + Scheduling Together)

| Tier | Description | Appears in Availability Search |
|------|-------------|-------------------------------|
| **1 — Internally managed** | Facility manager has an admin-provisioned Lokal Pikol account and manually logs reservations via the Schedule tool | Yes |
| **2 — API-integrated** | Court has their own booking system; their devs expose an API that Lokal Pikol queries at search time | Yes |
| **3 — Directory-only** | Listed in the directory but no schedule data of any kind | No — browsable only |

A court is either tier 1 or tier 2, never both. If they have their own system but no API integration (or their devs decline), they remain tier 3.

## Data Model

### `schedule_reservations` table

| Column | Type | Notes |
|--------|------|-------|
| `id` | bigint | Primary key |
| `uuid` | char(36) | Public identifier |
| `listing_id` | FK → `listings.id` | The court this reservation is for |
| `name` | string | Name/label of the reservation (e.g. "Open Play", "Private Session") |
| `date` | date | The date of the reservation |
| `start_time` | time | Start of the reserved block |
| `end_time` | time | End of the reserved block |
| `timestamps` | — | `created_at`, `updated_at` |
| `softDeletes` | — | `deleted_at` |

### `users` table — added column

| Column | Type | Notes |
|--------|------|-------|
| `listing_id` | FK → `listings.id`, nullable | Null for admin users; one listing for facility managers |

Each facility manager is linked to exactly one `Listing`. The `User` model gets a `listing()` BelongsTo relationship.

## Auth & Roles

- Facility managers use the existing `web` guard (same `User` model as admin)
- `UserRoles` enum gets a new `FACILITY_MANAGER` case
- A new `AuthenticateFacilityManager` middleware checks `auth()->check()` + `role === FACILITY_MANAGER`
- No self-registration — admin creates accounts and assigns a `listing_id`

## Architecture

Follows the same hybrid DDD + layered pattern as the Directory domain.

### Source Layer (`/app/Source/Schedule/`)

```
Schedule/
├── Actions/
│   ├── CreateReservation/
│   │   ├── CreateReservation.php
│   │   └── Dtos/CreateReservationData.php      # listing_id, name, date, start_time, end_time
│   ├── UpdateReservation/
│   │   ├── UpdateReservation.php
│   │   └── Dtos/UpdateReservationData.php
│   ├── DeleteReservation/
│   │   └── DeleteReservation.php               # Soft delete
│   ├── ListReservations/
│   │   └── ListReservations.php                # Filter by listing + optional date/month
│   └── GetAvailableSlots/
│       ├── GetAvailableSlots.php               # See logic below
│       └── Dtos/GetAvailableSlotsData.php      # listing_id, date
└── Models/
    └── Reservation.php                         # HasUuid, SoftDeletes, BelongsTo Listing
```

### HTTP Layer (`/app/Http/Schedule/`)

```
Schedule/
├── Controllers/
│   ├── Auth/
│   │   ├── LoginController.php                 # show() + store()
│   │   └── LogoutController.php
│   ├── Reservations/
│   │   ├── ReservationController.php           # __invoke() — list
│   │   ├── CreateReservationController.php     # show() + store()
│   │   ├── UpdateReservationController.php     # show() + update()
│   │   └── DeleteReservationController.php     # __invoke()
│   └── Availability/
│       └── AvailableSlotsController.php        # __invoke(), ?date param
├── Middleware/
│   ├── ScheduleInertiaTemplateMiddleware.php   # Sets root view to 'schedule'
│   └── AuthenticateFacilityManager.php        # Role check, redirect to login
├── Requests/
│   ├── LoginRequest.php
│   ├── CreateReservationRequest.php
│   └── UpdateReservationRequest.php
└── Resources/
    └── ReservationResource.php                 # uuid as id, camelCase output
```

### Routes (`routes/schedule.php`)

```
GET  /login                                   schedule.login
POST /login                                   schedule.login.store
POST /logout                                  schedule.logout

[AuthenticateFacilityManager]
GET  /reservations                            schedule.reservations.index
GET  /reservations/create                     schedule.reservations.create
POST /reservations                            schedule.reservations.store
GET  /reservations/{reservation:uuid}/edit    schedule.reservations.edit
PUT  /reservations/{reservation:uuid}         schedule.reservations.update
DELETE /reservations/{reservation:uuid}       schedule.reservations.destroy
GET  /availability                            schedule.availability.index
```

### Bootstrap Registration (`bootstrap/app.php`)

```php
Route::domain("schedule.{$tld}")
    ->middleware(['web', ScheduleInertiaTemplateMiddleware::class])
    ->name('schedule.')
    ->group(base_path('routes/schedule.php'));
```

### Frontend (`/resources/js/schedule/`)

```
schedule/
├── layouts/
│   └── ScheduleLayout.tsx              # Nav: court name + logout
├── pages/
│   ├── auth/
│   │   └── login.tsx
│   ├── reservations/
│   │   ├── index.tsx                   # List view + calendar toggle
│   │   ├── create.tsx
│   │   └── edit.tsx
│   └── availability/
│       └── index.tsx                   # Date picker → free slots + download image
├── components/
│   └── AvailabilityImageTemplate.tsx   # Styled div captured by html2canvas
└── models/
    └── Reservation.ts
```

**Build entry:** `resources/js/schedule.tsx` (added to Vite input array)  
**Blade template:** `resources/views/schedule.blade.php`

## Available Slots Logic (`GetAvailableSlots` action)

1. Accept `listing_id` + `date`
2. Fetch all reservations for that listing on that date
3. Build a full hourly slot grid (e.g. 00:00–24:00)
4. Remove any slot that overlaps with an existing reservation
5. Return free slots as strings: `["07:00–08:00", "08:00–09:00", ...]`

## Availability Image Generation

Client-side only — no server-side image processing needed.

- `AvailabilityImageTemplate.tsx` is a styled off-screen `<div>`: court name, date, list of free slots, Lokal Pikol branding
- On "Download Image" click: `html2canvas` captures the div → `canvas.toDataURL('image/jpeg')` → triggers browser download
- Dependency: `html2canvas` (npm)
- Purpose: facility managers share the image on social media (Facebook, Messenger group chats, etc.)

## Files to Create

| Layer | File |
|-------|------|
| Migration | `database/migrations/xxxx_create_schedule_reservations_table.php` |
| Migration | `database/migrations/xxxx_add_listing_id_to_users_table.php` |
| Source | `app/Source/Schedule/Models/Reservation.php` |
| Source | `app/Source/Schedule/Actions/CreateReservation/CreateReservation.php` |
| Source | `app/Source/Schedule/Actions/CreateReservation/Dtos/CreateReservationData.php` |
| Source | `app/Source/Schedule/Actions/UpdateReservation/UpdateReservation.php` |
| Source | `app/Source/Schedule/Actions/UpdateReservation/Dtos/UpdateReservationData.php` |
| Source | `app/Source/Schedule/Actions/DeleteReservation/DeleteReservation.php` |
| Source | `app/Source/Schedule/Actions/ListReservations/ListReservations.php` |
| Source | `app/Source/Schedule/Actions/GetAvailableSlots/GetAvailableSlots.php` |
| Source | `app/Source/Schedule/Actions/GetAvailableSlots/Dtos/GetAvailableSlotsData.php` |
| HTTP | `app/Http/Schedule/Middleware/ScheduleInertiaTemplateMiddleware.php` |
| HTTP | `app/Http/Schedule/Middleware/AuthenticateFacilityManager.php` |
| HTTP | `app/Http/Schedule/Controllers/Auth/LoginController.php` |
| HTTP | `app/Http/Schedule/Controllers/Auth/LogoutController.php` |
| HTTP | `app/Http/Schedule/Controllers/Reservations/ReservationController.php` |
| HTTP | `app/Http/Schedule/Controllers/Reservations/CreateReservationController.php` |
| HTTP | `app/Http/Schedule/Controllers/Reservations/UpdateReservationController.php` |
| HTTP | `app/Http/Schedule/Controllers/Reservations/DeleteReservationController.php` |
| HTTP | `app/Http/Schedule/Controllers/Availability/AvailableSlotsController.php` |
| HTTP | `app/Http/Schedule/Requests/LoginRequest.php` |
| HTTP | `app/Http/Schedule/Requests/CreateReservationRequest.php` |
| HTTP | `app/Http/Schedule/Requests/UpdateReservationRequest.php` |
| HTTP | `app/Http/Schedule/Resources/ReservationResource.php` |
| Routing | `routes/schedule.php` |
| Frontend | `resources/views/schedule.blade.php` |
| Frontend | `resources/js/schedule.tsx` |
| Frontend | `resources/js/schedule/layouts/ScheduleLayout.tsx` |
| Frontend | `resources/js/schedule/pages/auth/login.tsx` |
| Frontend | `resources/js/schedule/pages/reservations/index.tsx` |
| Frontend | `resources/js/schedule/pages/reservations/create.tsx` |
| Frontend | `resources/js/schedule/pages/reservations/edit.tsx` |
| Frontend | `resources/js/schedule/pages/availability/index.tsx` |
| Frontend | `resources/js/schedule/components/AvailabilityImageTemplate.tsx` |
| Frontend | `resources/js/schedule/models/Reservation.ts` |

## Files to Modify (existing)

| File | Change |
|------|--------|
| `bootstrap/app.php` | Add schedule subdomain route group |
| `vite.config.ts` | Add `schedule.tsx` to input array |
| `app/Source/Authentication/Enums/UserRoles.php` | Add `FACILITY_MANAGER` case |
| `app/Source/Authentication/Models/User.php` | Add `listing()` BelongsTo, remove dead `isFacility()`/`isCustomer()` methods |
| `database/seeders/DatabaseSeeder.php` | Remove dead booking imports |

## Patterns to Follow

All patterns are inherited from the active Directory domain:

- `HasUuid` trait → `app/Source/Shared/Models/HasUuid.php`
- Action + readonly DTO pattern → see `CreateListing` + `CreateListingData`
- Inertia middleware → see `DirectoryInertiaTemplateMiddleware`
- Resource transformer → see `ListingResource`
- Blade + TSX entry point → see `directory.blade.php` + `directory.tsx`
- Route grouping → see `routes/directory.php` + its registration in `bootstrap/app.php`

## What This Is Not

- Not a full booking system
- No player-facing booking flow
- No payments or fees
- No reservation approval workflow
- No customer accounts
- Not a replacement for courts with their own booking systems (those use tier 2 API integration instead)

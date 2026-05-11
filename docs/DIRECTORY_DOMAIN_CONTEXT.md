# Directory Domain — Product Context

**Last Updated:** 2026-05-06

## What It Is

A free, public pickleball court directory for Negros Oriental (Philippines). Players browse to find courts near them. No accounts, no booking, no payments — pure discovery.

## Who Uses It

| User | How they interact |
|------|------------------|
| **Players** | Browse and filter courts publicly — no account required |
| **Court owners** | Receive a signed URL invitation to register and update their listing |
| **Admin (developer)** | Manages all listings from the backend; sends invitation tokens |

## Core Features

### Public Directory
- Searchable list of all Negros Oriental pickleball courts
- Filter by city
- Each listing shows: name, location, operating hours, court type, number of courts, contact links (Facebook, Instagram, Google Maps, phone)
- No login required to browse

### Court Listing Registration
Court owners receive a one-time email invitation with a signed URL (7-day expiry). They fill a registration form and the listing goes live immediately — no moderation.

**Onboarding flow:**
1. Admin generates a registration token and sends the invitation email
2. Court owner opens the signed URL
3. Court owner fills in listing details (name, address, operating hours, photos, social links, etc.)
4. Listing appears in the public directory instantly

### Signed URL Access
Court owners can update their listing via a secure, time-limited signed URL. No account or password required.

## Listing Fields

| Field | Notes |
|-------|-------|
| Name | Court facility name |
| City | Negros Oriental city (drives city filter) |
| Address | Physical address |
| Court type | Surface/type of court |
| Number of courts | Display field — how many courts the facility has |
| Opening time | When the facility opens |
| Closing time | When the facility closes |
| Email | Optional contact email |
| Phone | Optional contact phone |
| Google Maps URL | Links out to Google Maps |
| Booking URL | Optional external booking link (for courts with their own system) |
| Cover photo | Main listing image |
| Profile photo | Facility logo or secondary photo |
| Social links | Facebook, Instagram |

## What It Is Not

- Not a booking system — players contact courts directly via external links
- No player accounts
- No real-time availability (that's the Scheduling domain)
- No court owner login (access is via signed URLs only)
- No fees or transactions of any kind

## Relationship to the Scheduling Domain

A `Listing` in the Directory is the shared entity that connects both domains. When a listing is onboarded into the Scheduling tool, a `FacilityAdmin` account is created and linked to that listing's `id`. The scheduling tool then uses the listing's `opening_time` and `closing_time` to drive the court slot grid.

Changes made via the Facility Profile page in the Scheduling tool write back to the `Listing` record and reflect immediately in the public directory.

## Public Schedule Page

Scheduling-enabled listings have a public read-only schedule page at `GET /schedule/{slug}` on the directory domain.

**Key decisions:**

- **Slugs** are auto-generated from `Listing.name` via `Str::slug()` at creation time, with `-2`, `-3` collision suffixes. They are locked permanently — never updated if the name changes. Developer edits the DB directly if ever needed. Both `CreateListing` action and `CreateListingCommand` generate the slug.
- **`is_scheduling_enabled`** is an explicit boolean flag (default `false`), set manually by the developer. It is not derived from `FacilityAdmin` presence — the admin may need days to populate data before the page goes public.
- **Slot labels** — unavailable slots are labelled "Reserved" regardless of whether they are a regular reservation or block reservation. Actual names are never exposed publicly. This anonymisation happens in `ListingScheduleController::anonymiseSlots()`.
- **Cross-domain call** — `ListingScheduleController` (Directory HTTP) calls `GenerateCourtSlotsWithAvailability` (Scheduling Source). This is intentionally bidirectional and documented with a comment in the controller. The action is read-only and belongs in the scheduling domain.
- **`scheduleUrl`** is exposed on `ListingResource` — resolved to the full `/schedule/{slug}` URL when `is_scheduling_enabled`, otherwise `null`. The `ListingCard` shows a "View schedule" row only when this is non-null.

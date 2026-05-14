# Directory Domain — Product Context

**Last Updated:** 2026-05-14

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

## Availability Search (Planned)

The centrepiece of the product — what turns Lokal Pikol from a directory into a search engine. Lives at `/search` on the directory domain, separate from the directory browse. Search state in query params: `/search?date=YYYY-MM-DD&start=HH:00&end=HH:00`. Focused, clean, excellent.

**Page structure:**
- Header + short description
- Search inputs: date, start time, end time + submit button
- Results grouped by source (see below)

**Search trigger:** explicit submit button — all three fields must be filled before searching. Avoids half-formed queries firing against partner APIs on every keystroke.

**Time granularity:** on the hour only (6:00pm, 7:00pm etc.) — no half-hour steps. Aligns with how courts actually operate and keeps first-party slot matching unambiguous. Partner payloads use the same whole-hour values.

**Loading:** progressive via Inertia v2 deferred props — each driver is a separate deferred prop, renders as soon as its call resolves. First-party DB results appear near-instantly; partner HTTP calls may take a second or two. Skeleton placeholder per group while in-flight.

**How it works:**
- Player enters a date and time window
- Lokal Pikol queries all applicable drivers in parallel: first-party scheduling listings resolved via `GenerateCourtSlotsWithAvailability`; partner-integrated listings resolved via real-time HTTP calls to their endpoints
- Results are grouped by source — first-party group ("Courts with live schedules" or similar) + one group per partner ("Results from Court Access", etc.)
- Each group: heading + `ListingCard` grid + group-level CTA
- Only listings with an integration (first-party or partner) participate — listings with no integration are excluded entirely

Court names are included in every query payload deliberately: scopes results to courts registered in Lokal Pikol's directory, preserving the incentive for court owners to join. Partners must not return courts outside the provided list.

**Driver failure handling:** failures are per-group, not per-page. If a partner call fails or times out, that group renders a transparent error message (e.g. "Couldn't load results from Court Access — you can try browsing courts manually through their website") with a link to the partner's site. Other groups that resolved successfully still render normally. Timeout threshold: 3–5 seconds.

**Empty state (no results across all drivers):** a simple message — e.g. "No courts available for that time. Try a different date or time window." — with a soft link to the main directory ("Browse all courts →"). No CTA to external booking systems — this is a different context from a driver error; the player just got no matches, not a system failure.

Full integration spec and driver details in `PRODUCT_PLAN.md` → "Partner Integration Spec — Availability Query".

## What It Is Not

- Not a booking system — players contact courts directly via external links
- No player accounts
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

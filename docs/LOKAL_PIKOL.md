# Lokal Pikol — Master Context

**Last Updated:** 2026-05-27  
**Status:** Single source of truth. Replaces PRODUCT_PLAN.md, DIRECTORY_DOMAIN_CONTEXT.md, SCHEDULING_DOMAIN_CONTEXT.md, DIRECTORY_DOMAIN_ROADMAP.md, SCHEDULING_DOMAIN_ROADMAP.md.

---

## 1. What Is Lokal Pikol

A pickleball court directory and scheduling platform for **Negros Oriental, Philippines**.

**End state:** A discovery layer — not a booking platform. Players come to find courts; bookings happen wherever each court already takes them. The platform sits on top of existing booking systems and provides a free directory for everyone else.

**Geographic scope:** Negros Oriental only. No expansion before 2028, and only after Negros Oriental is genuinely saturated. This constraint is intentional — it is what makes the local-media revenue model viable.

**Mode:** Community contribution. Soft checkpoint in 2027 to honestly re-evaluate flipping to business mode. Not a hard deadline.

---

## 2. Domains

| Domain | Subdomain (local) | Purpose |
|--------|-------------------|---------|
| **Directory** | `directory.lokal-pikol.test` | Public court directory — browse, discover, search |
| **Scheduling** | `scheduling.lokal-pikol.test` | Internal tool for facility managers |
| **Scoresheet** | `scoresheet.lokal-pikol.test` | Public match result recorder for club sessions |
| **Admin/Auth** | `lokal-pikol.test` | Developer-only admin routes |

---

## 3. Application Architecture

### Layers

- **`app/Source/`** — Pure domain logic: actions, DTOs, models. No HTTP concerns.
- **`app/Http/`** — Inertia controllers, form requests, API models (Spatie Laravel Data for Scheduling domain).
- **`resources/js/`** — Frontend, domain-organised: `directory/`, `scheduling/`, `shared/`.

### Cross-Domain Rules

- Directory and Scheduling share the `Listing` entity as the root anchor.
- Cross-domain calls are allowed but must be read-only and documented with a comment in the calling file.
- Example: `ListingScheduleController` (Directory HTTP) calls `GenerateCourtSlotsWithAvailability` (Scheduling Source).
- Scheduling HTTP calls Directory Source actions for profile edits (e.g. `UpdateListing`).

### Auth

- Scheduling uses the `facility` guard backed by the `users` table.
- `FacilityAdmin` is a profile model linking `User` → `Listing`.
- Directory is fully public. Admin routes are gated separately.

### Frontend Conventions

- **Use `useForm` for every form-ish interaction**, including `delete` actions with no payload (pass `useForm({})`). Consistent `processing`, `onSuccess`, and `errors` handling. Never use `router.delete()` / `router.post()` directly.

---

## 4. Core Data Model

### Listing

The shared root entity linking both domains. Lives in `app/Source/Directory/Models/Listing`.

Key fields: `name`, `slug`, `city`, `address`, `opening_time`, `closing_time`, `cover_photo`, `profile_photo`, social links, contact info.

- **Slug** — auto-generated at creation via `Str::slug()`, with `-2`/`-3` collision suffixes. Permanent — never updated if name changes. Both `CreateListing` action and `CreateListingCommand` generate it.
- **`opening_time` / `closing_time`** — drives the scheduling slot grid. Must be set before provisioning a `FacilityAdmin`.

### FacilityAdmin

Profile model: `User` → `Listing`. Stores personal details (name, email, phone). Normally one per listing. `facility:create-admin` creates a second for edge cases (staff change) — does not re-create courts.

### Court, Reservation, BlockReservation

- `Court` — belongs to `Listing`. Named, unique per listing (validated at HTTP layer only — no DB unique constraint). Max 100 chars.
- `Reservation` — belongs to `Court`. Specific date + start/end time + name. One-off.
- `BlockReservation` — belongs to `Court`. Recurring weekly (e.g. every Tuesday 6–10pm). Hard-blocks slots — cannot be overridden by regular reservations.

Slot granularity: **hourly only**. Slot grid bounded by `listing.opening_time` / `listing.closing_time`. All courts at a listing share the same hours.

### ScheduleUrl

Controls whether a "View schedule" link appears on a `ListingCard`. One row per listing maximum.

```
schedule_urls
  id, uuid
  listing_id  → listings
  provider    ScheduleProviderEnum: lokal pikol | court access | playkorte
  config      JSON → cast via ScheduleProviderConfigCast to typed subclass
```

- **`LokalPikolProviderConfig`** — stores `{ listing_uuid }`. URL resolved from listing slug at runtime via `resolveUrl(Listing): string`.
- **External configs** (`CourtAccessProviderConfig`, `PlayKorteProviderConfig`) — store `{ url }`. `resolveUrl()` returns the stored URL directly.
- **`displayName`** — lives on `ScheduleProviderEnum` via `getDisplayName()`. `ScheduleProviderConfig::displayName()` is a concrete method that delegates to `$this->provider()->getDisplayName()`. Feeds `providerName` on the frontend.
- **`isExternal`** — any provider that is not `lokal pikol`. External = confirmation modal before redirect.

> **`is_scheduling_enabled` is retired.** It has been replaced by the `schedule_urls` table. Do not reference it. A `FacilityAdmin` existing does not automatically create a `schedule_urls` row — developer creates it manually via `php artisan directory:register-schedule-url`.

### search_partner_integrations

**Separate from `schedule_urls`.** Controls which listings appear in availability search results (`/search`). **Not yet built — planned for Phase 2/3.**

```
search_partner_integrations
  id, uuid
  listing_id  → listings
  driver      enum: webhook | trafft
  config      JSON (driver-specific — see Section 8)
```

**Do not confuse these two tables:**

| Table | Purpose | Status |
|-------|---------|--------|
| `schedule_urls` | "View schedule" link on listing card | ✅ Built |
| `search_partner_integrations` | Availability search results | ⬜ Planned |

---

## 5. Directory Domain

### What It Is

Public, no-auth court directory. Players browse to find courts. No booking, no payments, no player accounts.

### Features

| Feature | Status |
|---------|--------|
| Public listing directory with city filter | ✅ Shipped |
| "New" badge on listings added within 14 days | ✅ Shipped |
| Signed URL listing registration (court owners) | ✅ Shipped |
| Signed URL listing update | ✅ Shipped |
| `schedule_urls` system + "View schedule" on listing card | ✅ Shipped |
| Public schedule page (`/schedule/{slug}`) | ✅ Shipped |
| Text search by court name | ⬜ Planned |
| Listing count indicator ("Showing X of Y") | ⬜ Planned |
| Share button per card (Web Share API + clipboard fallback) | ⬜ Planned |
| Sort by popularity / city | ⬜ Planned |
| Availability search (`/search`) | ⬜ Planned — Phase 2 (trigger: 15–20 scheduling clients) |

### ListingResource — `schedule` Field

```json
// When a schedule_urls row exists:
{
  "schedule": {
    "url": "https://...",
    "isExternal": false,
    "providerName": "Lokal Pikol"
  }
}

// When no row exists:
{ "schedule": null }
```

`ListingCard` shows "View schedule on [providerName]" only when `schedule !== null`.

- `isExternal: false` → Inertia navigation (internal schedule page).
- `isExternal: true` → confirmation modal: "You are now leaving Lokal Pikol and moving to [providerName] to view its schedule." → external redirect.

TypeScript type (`ListingItem.ts`): `{ url: string; isExternal: boolean; providerName: string } | null`.

### ListingResource — `bookingPlatform` Field

`bookingPlatform: string | null` is derived server-side from `booking_url` via `BookingPlatformResolver` (`app/Http/Directory/Support/BookingPlatformResolver.php`). No stored field — resolved at serialisation time.

Known platforms:

| Domain | Display name |
|--------|-------------|
| `facebook.com` | Facebook |
| `instagram.com` | Instagram |
| `court-access.com` | Court Access |
| `picklepiper.com` | PicklePiper |
| `playkorte.com` | PlayKorte |

`ListingCard` footer shows "Book on [platform]" when `bookingPlatform` is non-null, "Book Court" otherwise. Footer only renders when `bookingUrl` exists — no "no booking link" fallback text.

### Public Schedule Page (`/schedule/{slug}`)

Read-only. Rendered by `ListingScheduleController` (Directory HTTP), which calls `GenerateCourtSlotsWithAvailability` (Scheduling Source) — cross-domain, read-only, documented with a comment.

Slot anonymisation: unavailable slots always show "Reserved" — actual reservation names are never exposed. Logic in `ListingScheduleController::anonymiseSlots()`.

Only visible when a `schedule_urls` row exists with `provider = internal`.

### Listing Registration Flow

1. Developer generates a 7-day signed URL invitation.
2. Court owner fills registration form → listing goes live immediately (no moderation).

---

## 6. Scheduling Domain

### What It Is

Lightweight internal tool for facility managers. Tracking and availability-sharing — not a booking system. No player accounts, no payments, no automated notifications, no approval workflows.

### Who Uses It

| User | Access method |
|------|---------------|
| Facility manager | Email invite → signed link → registration form |
| Developer/admin | `scheduling:send-registration-link` or `facility:create-admin` |

### Invitation Flow

1. Developer runs `php artisan scheduling:send-registration-link` → select listing → enter email → specify court count (1–10).
2. Manager receives markdown email with signed URL (1-day expiry, 64-char random token, stored as hash alongside listing ID, email, court count, expiry, `used_at`).
3. Manager visits URL:
   - **Expired** → distinct error page, ask developer to resend.
   - **Already used / invalid** → redirect to login.
   - **Valid** → registration form (email pre-filled + locked; first name, last name, phone, password).
4. On submit (`StoreRegistrationController`, single `DB::transaction()`):
   - `CreateAdminForListing` (skipActivation: email verified by invite, password set directly)
   - `CreateCourt` × N → "Court 1" … "Court N"
   - Token marked used → auto-login → redirect to `/courts`.

Token infrastructure lives in `app/Source/Shared/` (`InvitationToken`, `InvitationTokenTypeEnum`) — reusable across domains.

### Features

| Feature | Status |
|---------|--------|
| Login / auth (`facility` guard) | ✅ Shipped |
| Courts page — slot grid + date picker | ✅ Shipped |
| Court creation modal | ✅ Shipped |
| Court rename (inline Editable, 500ms-delayed PATCH) | ✅ Shipped |
| Reserve slot (slot-first modal, multi-slot contiguous) | ✅ Shipped |
| Block reservations — create (multi-court × multi-day) | ✅ Shipped |
| Block reservations — view (grouped by court) | ✅ Shipped |
| Block reservations — delete (confirmation dialog) | ✅ Shipped |
| Reservations calendar page | ✅ Shipped |
| Availability page (text + image output) | ✅ Shipped |
| Reservation notes field + recent notes chips | ✅ Shipped |
| Facility Profile page | ⬜ Not started |
| Court ownership authorisation pass | ⬜ Deferred — do in one pass after all features are built |

### Key Pages

**Courts (`/courts?date=YYYY-MM-DD`)** — primary working view. Hourly slot grid per court. Slot states: available / reserved (shows name) / blocked (shows block name, hard-blocked — not clickable). Multi-slot contiguous selection supported.

**Block Reservations (`/reservations/block-reservation`)** — recurring weekly schedules. Grouped by court. Create: one submission per court × day combination. Delete per record with confirmation. No edit — delete and recreate.

**Reservations (`/reservations?court=UUID&month=YYYY-MM`)** — react-big-calendar, month view default, week + day views available. Both types normalised to `ReservationCalendarItemApiModel` (Spatie Data). Block reservations: orange, `(Blocked)` prefix, read-only from this page. Regular: blue, deletable. Event click → Chakra Dialog (data from loaded monthly payload — no extra HTTP request). Delete is immediate from dialog — no second confirmation step. Success via `Inertia::flash()` toast.

**Availability (`/availability`)** — date picker → `GenerateCourtSlotsWithAvailability` → text output (free slots, clipboard) + image output (all slots with strikethroughs, html2canvas download). No social media integration — manager copies/downloads and posts manually.

**Facility Profile (`/profile`)** — edit linked `Listing` record. Changes reflect in public Directory immediately. Cross-domain: calls Directory Source actions.

### Business Rules

| Rule | Detail |
|------|--------|
| Court names | Required, max 100 chars, unique per listing — HTTP layer validation only, no DB unique constraint |
| Block reservations | Hard-block slots — cannot be overridden by regular reservations |
| No edit | Delete and recreate for both reservation types |
| Slot granularity | Hourly only |
| Operating hours | Per listing, shared across all courts |
| Null hours guard | `opening_time`/`closing_time` must be set before provisioning a `FacilityAdmin` |

### Deferred Issues

| Issue | Detail |
|-------|--------|
| Court ownership authorisation | Scope all court/reservation mutations to admin's listing — do in one pass once all features built |
| `CheckReservationOverlap` doesn't check `block_reservations` | Fix in correctness pass |
| `BlockReservation.listing_id` redundancy | Revisit when building availability search |
| External `ScheduleProviderConfig` classes | Implement first external provider when first partner confirms |

---

## 7. Availability Search — Planned (Phase 2)

**Trigger:** 15–20 scheduling clients onboarded.

Lives at `/search` on the Directory domain. Separate from the directory browse.

### URL & Inputs

`/search?date=YYYY-MM-DD&start=HH:00&end=HH:00`

All three fields required before search fires (explicit submit button — no per-keystroke queries). Time granularity: whole hours only.

### How It Works

1. Player submits search.
2. All applicable drivers queried **in parallel**:
   - **First-party** — DB query via `GenerateCourtSlotsWithAvailability` for listings with `schedule_urls.provider = internal`.
   - **Partner** — real-time HTTP calls to `search_partner_integrations` endpoints.
3. Results grouped by source. Each group: heading + `ListingCard` grid + group CTA.

| Source | Heading | CTA |
|--------|---------|-----|
| First-party | "Courts with live schedules" | Links to `/schedule/{slug}` |
| Partner (e.g. Court Access) | "Results from Court Access" | "Book these courts at Court Access" → partner site |

4. Loading: Inertia v2 deferred props — one deferred prop per driver. Skeleton placeholder per group while in-flight. First-party results appear near-instantly; partner HTTP calls may take a second or two.

### Participation Boundary (Hard)

Only listings with an integration (`schedule_urls` internal row or `search_partner_integrations` row) appear in search results. Directory-only listings are excluded entirely. Intentional: creates a clear incentive for courts to integrate.

### Driver Failure Handling

Per-group, not per-page. Failed group shows: "Couldn't load results from [Partner] — you can try browsing courts manually through their website" + link to partner. Other groups render normally. Timeout: 3–5 seconds.

### Empty State

"No courts available for that time. Try a different date or time window." + soft link to directory. No external booking CTA (player got no matches — different context from a driver error).

---

## 8. Partner Integration Spec — search_partner_integrations

### Drivers

| Driver | Partners | Dev work required from partner |
|--------|----------|-------------------------------|
| `webhook` | Court Access, Picklepiper | Implement one synchronous HTTP POST endpoint |
| `trafft` | Trafft | None — Lokal Pikol calls Trafft API directly using court owner's API key |

Note: "webhook" is a misnomer — Lokal Pikol is the caller, not the receiver. It's a custom HTTP integration.

### Config Shape

```json
// webhook (Court Access, Picklepiper)
{
  "endpoint_url": "https://...",
  "secret": "...",
  "court_mappings": { "SLV Pickleball Club": "SLV" }
}

// trafft
{
  "api_key": "...",
  "court_mappings": { "SLV Pickleball Club": "trafft_service_id_abc" }
}
```

`court_mappings` keys = Lokal Pikol court names; values = partner's internal name/ID. Lokal Pikol translates before sending — partners receive only names they already recognise. No mapping work required from partner devs.

### Request Payload (Lokal Pikol → partner)

```json
{
  "courts": ["SLV", "Court A"],
  "date": "YYYY-MM-DD",
  "startTime": "HH:00",
  "endTime": "HH:00"
}
```

`courts` contains partner-side names (already translated from Lokal Pikol names via `court_mappings`).

**Response:** the subset of `courts` that are available for the given window. Partner returns partner-side names; Lokal Pikol translates back to match `ListingCard` data.

### City Filtering

No city filter on search initially — search across all of Negros Oriental. If added later, handled at Lokal Pikol HTTP layer (filter which courts go in the payload). Partners don't need to understand geographic structure.

---

## 9. Schedule URL External Providers (Architecture Ready — Implementation Deferred)

When a court uses its own booking system, rather than hosting an internal `/schedule/{slug}` page, the `schedule_urls` row can point directly to the partner's platform.

The "View schedule" label on `ListingCard` becomes "View schedule at [providerName]" when `isExternal: true`.

**To add an external provider:**
1. Add a new value to `ScheduleProviderEnum` (e.g. `NEW_PARTNER = 'new partner'` — use spaces, not underscores, in the string value). Add a `getDisplayName()` case for it.
2. Create a typed config class (e.g. `NewPartnerProviderConfig extends ScheduleProviderConfig`) with `public readonly string $url`, `resolveUrl()` returning `$this->url`, and `provider()` returning the new enum case.
3. Register it in `ScheduleProviderConfigCast`.
4. The command (`directory:register-schedule-url`) will automatically prompt for a URL for any non-`LOKAL_PIKOL` provider.

**Status:** Court Access and PlayKorte implemented. Picklepiper and Courthub pending.

---

## 10. Business & Revenue

### Pricing — Scheduling Tool

- **First 3 months:** ₱150 total (commitment signal, not a revenue number)
- **Month 4+:** ₱450/quarter (₱150/month equivalent, quarterly billing)
- **No stated free tier.** Free months offered as personal kindness only — preserves the ₱150 anchor.

### Revenue Mix (priority order)

1. Scheduling tool subscriptions — ~7 paying courts covers hosting
2. Featured listings (~₱500/month — top placement in city/search results)
3. Custom local ads — coffee shops, events, gear. Content-style only, no banners, no AdSense, no third-party networks
4. Tournament listings (paid promotion when demand emerges)
5. Gear/lifestyle partnerships (slow-built, reactive)

**Explicitly skipped:** booking referral fees, player-side premium, geographic expansion.

### Partners — Booking System Sequencing

| Partner | Courts in Negros Oriental | Status |
|---------|---------------------------|--------|
| Court Access | 20+ | In conversation — 1 of 3 on board |
| Picklepiper | ~5 high-quality | Still working it out |
| Courthub | Remaining gaps | No response yet |

**Exchange (all partners):** Lokal Pikol gives free distribution (1,500+ MAU) + referral of courts that outgrow the scheduling tool. Partner gives: an endpoint (webhook) or API access (Trafft). No money in either direction.

### Customer Acquisition — Courts (Supply)

Sequencing:
1. **Warm** — courts already listed on Lokal Pikol. Visit in person, pitch scheduling tool.
2. **Marquee cold** — 8–10 highest-profile courts. Full visit: drone footage, photos. These become reference cases and marketing assets.
3. **Long tail** — ~100+ courts via signed-URL email referencing marquee listings. Visit only those who respond or are strategically important.

Cold visits = content and relationships, not onboarding. Signed-URL flow handles onboarding.

### Customer Acquisition — Players (Demand)

Single channel: Facebook. Page + activity in Negros Oriental pickleball groups.

- Weekly court spotlight + availability posts (peak season)
- Reply to "where can I play tonight?" threads with direct Lokal Pikol links
- QR stickers on visited courts (~₱20/sticker): "Find more courts near you."
- Ad spend: occasional only — high-profile events only, not a constant line item

### Player Segments

| Segment | Surface | Priority |
|---------|---------|----------|
| Newcomers | Directory + city filter | Highest — fastest-growing, weakest knowledge moat |
| Tourists | Directory + Google Maps | Important, seasonal |
| Regulars | Availability search (Phase 2) | Retention engine once search ships |

---

## 11. Scheduling Pitch

Pitches happen opportunistically (at a court, phone only). Primary: live demo on deployed demo subdomain. Fallback: image sequence saved to camera roll.

**Goal:** Not a close — a soft ask. Number exchange or Messenger contact. "Send me a message if the vision makes sense."

**Price:** Only mention if asked. "₱150 for the first three months. Less than ₱2 a day."

**Key framing:**
- "Your spreadsheet works fine" — honest framing, never soften this
- "This is not a booking system" — trust anchor, lean into it (removes displacement fear for courts using Court Access / Picklepiper / Courthub)
- Value prop: connected to the directory. Players arrive already knowing what's free — fewer "is Court 2 available?" messages

**Slide sequence (10-slide visual pitch):**

| Slide | Topic |
|-------|-------|
| 1 | Re-introduction — what Lokal Pikol is |
| 2 | Growth — 130 courts, 30–50 player visits/day |
| 3 | "View Schedule" feature — players already coming, give them something to see |
| 4–7 | Dashboard walkthrough — Profile, Courts, Block Booking, Reservations pages |
| 8 | "This is not a booking system" — ✗ no player accounts, ✗ no payments, ✗ no automations, ✗ no emails |
| 9 | "Nothing changes for players" — still contact via social/chat; you just log it here instead of a spreadsheet |
| 10 | Why not keep using Sheets/Excel? — this one is connected to the directory |
| 11–12 | Bonus: AI listing image generation |

**Resistance handling:**
- Resistance at Slide 3 (feature) → back to Slide 2, player numbers
- Resistance at Slide 8 (not a booking system) → stay, let the checklist do the work
- Resistance at Slide 10 (why not Excel) → point to the directory integration arrow

---

## 12. Risk Posture

| Risk | Mitigation |
|------|-----------|
| Data staleness (130 listings) | Annual nudge email + player "report incorrect info" button (build after visits) |
| Partnership chicken-and-egg | Build ghost integration (scrape or hand-compile one Court Access court with owner permission) before pitching |
| Solo founder burnout | 8–12 hr/week ceiling; one local co-conspirator; protect 2-month-silence property; monthly 3-line check-in |

**2-month-silence property:** core directory must serve ~50 players/day with zero founder input. Avoid any commitment that requires the founder weekly.

**Monthly check-in discipline:** same date each month — 3 lines: courts onboarded, paying customers, biggest blocker. Two consecutive months with the same blocker = escalate or pivot.

---

## 13. Scoresheet Domain

### What It Is

A lightweight, public web utility for recording pickleball match results during a weekly club session. Replaces a physical scoresheet. Players self-submit scores from their phone with no account or login required.

### Subdomain

`scoresheet.lokal-pikol.test` (local) / `scoresheet.lokalpikol.com` (production)

### Users & Access Model

| Role | Access |
|------|--------|
| Organiser | Creates session via Artisan command before the meet; shares the URL |
| Players / other organisers | Visit the session URL — fully public, flat access |

There is **no authentication, no login, and no user registration.** The session URL is the only access control. All visitors can submit scores.

### Session Lifecycle

- **`active`** — submission form is live; anyone can submit match results
- **`finished`** — submission form is hidden, replaced with "This session has ended."; scoresheet remains fully viewable as a permanent record

Status is changed via `php artisan scoresheet:end` — never auto-expires. A finished session is a safeguard against stale URLs, not a hard requirement.

### Artisan Commands

| Command | Purpose |
|---------|---------|
| `scoresheet:create` | Create a new session. Prompts for session name then a `textarea()` for player names. Accepts the raw Reclub numbered export (`1. Dylan`, `2. Doms`, …) pasted directly — strips numbers automatically. Also accepts plain comma-separated names as a fallback. Shows a confirmation list before creating. Outputs the shareable URL on success. |
| `scoresheet:end {session_code}` | Set a session's status to `finished`. |

### Roster Rules

- Roster is **locked at creation time** — no adding players after the session is created.
- "Late arrivals" means arriving late to the venue, not late registration. All players are pre-registered by the organiser before the meet starts.
- Player source is the **Participants** section of the Reclub export. On Hold, waitlisted, and organiser entries are excluded.

### Score Submission Flow (Single-Page JS Wizard)

No URL changes between steps — pure JS state machine on a single Inertia page.

1. **Select Team A** — tap 2 players from the roster
2. **Select Team B** — tap 2 players from the remaining roster
3. **Select Loser** — tap the losing team (large "Which team lost?" prompt + 2 stacked buttons showing each pair's names)
4. **Loser Score** — tappable score buttons 0–10, loser team's names shown
5. **Review** — full match summary
6. **Submit** — result saved, wizard resets

**Winner score is implicit.** The winning team is always assumed to have scored 11 (sudden-death format). The frontend derives the wire payload at submit time via `useForm.transform()` — UI state is `{ loserTeam, loserScore }`, the backend still receives `{ teamAScore, teamBScore }` unchanged.

**Back-navigation rule:** Pressing Back at step N clears step N's data, forcing a conscious re-pick on each return. No deletion in v1. The multi-step flow is the mistake-prevention mechanism.

### Score Range

- **Current:** 0–11 (sudden death format)
- **Future:** range is data-driven — extending to 15 or 21 is a config change, not a UI rewrite

### Scoresheet View

- Lists all submitted match results in reverse submission order (most recent at top)
- Format: `Team A names | Score | Team B names | Score` — mirrors a physical scoresheet
- Visible to all visitors at all times, including on finished sessions
- **No live updates** — manual refresh only

### Data Model

```
scoresheet_sessions
  id, uuid (HasUuid trait)
  session_code   string(8) — random alphanumeric, URL key (e.g. wx9k3p)
  name           string
  status         enum: active | finished
  created_at, updated_at

scoresheet_players
  id, uuid (HasUuid trait)
  session_id     → scoresheet_sessions
  name           string
  created_at

scoresheet_games
  id, uuid (HasUuid trait)
  session_id          → scoresheet_sessions
  team_a_player_1_id  → scoresheet_players
  team_a_player_2_id  → scoresheet_players
  team_a_score        integer (0–11)
  team_b_player_1_id  → scoresheet_players
  team_b_player_2_id  → scoresheet_players
  team_b_score        integer (0–11)
  created_at
```

`scoresheet_` prefix used on all tables to avoid conflict with Laravel's own `sessions` table. PHP models live in `App\Source\Scoresheet\Models\` as `Session`, `Player`, and `Game` — no prefix at the class level since the namespace already provides domain context.

### Routes

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/session/{session_code}` | Session page — scoresheet view + submission wizard (or "ended" state) |
| `POST` | `/session/{session_code}/matches` | Submit a match result |

### Out of Scope (v1)

- Match deletion
- Live/real-time scoresheet updates (polling, WebSockets)
- Player statistics, DUPR ratings, or Reclub/DUPR API integration
- Export (CSV, PDF)
- Match history across sessions
- Pairing suggestions or matchmaking
- Editing the roster after session creation

---

## 14. Out of Scope — Do Not Build

- Full booking system (player accounts, payments, automated approvals, transactional emails)
- Player-side premium subscription
- Geographic expansion outside Negros Oriental (not before 2028)
- Coaching marketplace
- Player community features (forums, ratings, chat)
- Booking referral fees from partner systems
- Anything requiring recurring weekly founder commitment to a single sponsor or partner

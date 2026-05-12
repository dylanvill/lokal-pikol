# Scheduling Domain — Todo

**Last Updated:** 2026-05-12 (facility admin invitation flow complete)  
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

## ✅ Done — Availability Page

**Design decisions:**
- Date change triggers an Inertia visit (`?date=YYYY-MM-DD`), consistent with the rest of the app
- Page layout: date picker + global colour picker + "copy all" at top; responsive `SimpleGrid` of court cards below (1/2/3 columns by breakpoint)
- All courts always shown regardless of availability (even fully booked courts stay visible)
- On-screen slot display: every slot rendered as a Chakra `Badge` (blue if available, red if taken) — shows full picture at a glance
- Image intent: admins share on Instagram and Facebook — 1:1 square is the correct format; image template still shows every slot with strikethrough on taken (not merged)
- **Strikethrough is rendered as an absolutely-positioned overlay line** (not CSS `text-decoration`) because `html2canvas` mis-renders `text-decoration: line-through` as an underline
- **Clipboard text merges contiguous available slots into ranges** — e.g. four contiguous available slots from 8am to noon paste as `08:00 AM - 12:00 PM` rather than four separate lines. Fully booked courts still print "Fully booked".
- **Per-court copy:** header is `{court name} - {date}`, then ranges
- **Copy all courts:** date appears once as a top header, then each court block is just `{court name}` + ranges (no repeated date per court)
- Copy buttons use inline state change ("Copied!" for 2s), not a toast
- Downloaded filename: `{slugified-court-name}-{YYYY-MM-DD}.png`
- Global colour picker (full palette, text colour auto-computed from luminance for contrast), saved to `localStorage` key `lokal-pikol:availability-brand-color`
- No logo on image for now (planned for future)

**Backend**
- [x] `AvailabilityCourtApiModel` — Spatie Data model; fields: `id`, `name`, `slots: CourtSlot[]`
- [x] Availability controller — accepts `?date=` (defaults to today), runs `GenerateCourtSlotsWithAvailability` for all courts, renders `availability/availability`
- [x] Availability route (`GET /availability`)

**Frontend**
- [x] Availability page (`resources/js/scheduling/pages/availability/availability.tsx`)
- [x] `AvailabilityImageTemplate` component (1080×1080)
- [x] `AvailabilityCourtCard`, `AvailabilityBrandColorPicker`, `AvailabilityCopyButton`, `AvailabilityEmptyState`
- [x] Helpers: `getContrastTextColor`, `formatAvailabilityText`, `mergeContiguousAvailableSlots`
- [x] Hooks: `useAvailabilityPage`, `useBrandColor`, `useCopyToClipboard`, `useDownloadCourtImage`
- [x] Install `html2canvas`
- [x] Add Availability to sidebar nav

---

## ✅ Done — Facility Profile Page

**Design decisions:**

### Architecture

- **Two top-level routes.** `/profile` is a read-only card view (default landing — sidebar links here). `/profile/edit` is the form page. Save on any section redirects back to `/profile/edit` with a "Changes saved" toast (not `/profile` — admin often wants to edit multiple sections in one sitting).
- **Card view (`/profile`):** Renders the same `ListingCard` component used on the public directory — the card itself is the "see what players see" confirmation. "Edit profile" button top-right links to `/profile/edit`. No "view on directory" link (the card already is the preview).
- **Edit view (`/profile/edit`):** Single page, four sections stacked vertically. Each section is its own card-like container with its own form, its own validation, and its own "Save" button. Layout style draws from `resources/js/directory/pages/register.tsx`.
- **Per-section saves.** No global form, no global "Save profile" button. Each section is an independent `useForm` submitting to its own endpoint. Each section's Save button is always visible but **disabled when the section is clean** (use `form.isDirty` from Inertia v2 useForm).
- **Per-section success toast:** "Changes saved" via the existing `Inertia::flash(SUCCESS_MESSAGE_KEY, ...)` + `toaster.create({...})` pattern. Same wording across all sections.
- **One-controller-per-action.** Matches the rest of `app/Http/Scheduling/Court/Controllers/` (`DeleteReservationController`, `CreateBlockReservationController`, etc.).

### Sections

| Section | Fields | Endpoint | Controller |
|---|---|---|---|
| **Photos** | Profile photo, cover photo | `POST /profile/photos` | `UpdateFacilityPhotosController@update` |
| **Listing details** | Name, court type, number of courts, public contact email, phone, Google Maps URL, booking URL | `PATCH /profile/details` | `UpdateFacilityDetailsController@update` |
| **Operating hours** | Opening time, closing time (hours-tightening rule applies; conflict banner renders inside this section card) | `PATCH /profile/hours` | `UpdateFacilityHoursController@update` |
| **Social links** | Facebook URL, Instagram URL (each row has Save + Remove). Other `SocialLinkEnum` platforms (DUPR, Reclub, TikTok, etc.) deferred — to add when needed. | `PATCH /profile/social-links` (upsert array) + `DELETE /profile/social-links/{platform}` | `UpdateFacilitySocialLinksController@update`, `DeleteFacilitySocialLinkController@destroy` |

### Field rules

- **Editable:** `name`, `court_type`, `number_of_courts`, `email`, `phone`, `opening_time`, `closing_time`, `google_maps_url`, `booking_url`, profile photo, cover photo, Facebook URL, Instagram URL.
- **Read-only:** `city`, `address` — facilities rarely change locations.
- **`number_of_courts`:** Free integer, no constraint. It's a directory-filter/marketing number, not bound to the actual count of `Court` records. Drift is acceptable.
- **Email:** Labelled "Public contact email" with helper text "Shown on your listing for players to reach you. This is not your login email." Same field as `register.tsx`, different label only.
- **Phone:** Stored with `+63` prefix. The `FacilityProfileEditApiModel`'s factory method strips the prefix for the input value (kept in the HTTP layer where the concern belongs — not on the Listing model); controller re-prefixes on save. If a legacy listing's phone is stored without `+63`, pass it through as-is.
- **Number of courts:** Chakra `RadioCard` component, values 1–10. Rebuild as a scheduling-specific component (do not reuse `directory/components/RegistrationForm/NumberOfCourtsSection.tsx` cross-domain).
- **Court type:** Same — rebuild as a scheduling-specific component; do not reuse `directory/components/RegistrationForm/CourtTypesSection.tsx`.
- **Photos:** Always required (consistent with create flow) — replace only, no remove action. Current photos pre-populate the upload widgets via a `currentPhotoUrl` prop on new scheduling-specific photo components.
- **Validation:** Mirrors `CreateListingRequest` rules per field, no new constraints on edit.

### Hours-tightening conflict rule (asymmetric — only tightening triggers validation)

- **Opening LATER** (e.g. 06:00 → 08:00): block save if any future regular reservation (`reservation_date >= today`) **or** any block reservation has `start_time < new_opening` for any court at this listing.
- **Closing EARLIER** (e.g. 22:00 → 20:00): block save if any future regular reservation **or** any block reservation has `end_time > new_closing` for any court at this listing.
- **Loosening** hours in either direction: no validation, save always allowed.
- **Conflict list** (court name + date for regular reservations / recurring day for block reservations + time range) flashed via `Inertia::flash('hours-conflicts', ...)` and rendered in a `DangerAlert` banner **inside the Operating Hours section card** (above the time inputs). Short inline error on the time field points to the banner.
- **Past reservations are not flagged** — they stay in the DB and on the Reservations calendar regardless of hours change.

### Cross-domain

- Scheduling HTTP layer orchestrates Directory domain **actions** (`UpdateListing`, `UpdateListingMedia`, `UpdateSocialLink`) and reuses Directory **resources** for read shapes (`ListingResource` on the card view). Direction: Scheduling → Directory (Scheduling already depends on Directory via `FacilityAdmin → Listing`).
- **Do not reuse Directory frontend components cross-domain.** Rebuild scheduling-specific sub-components (court type radio cards, number-of-courts radio cards, photo upload widgets) in `resources/js/scheduling/components/profile/`. Sharing would couple the two domains' UX evolution.

### Out of scope (intentional)

- Cancel button on the edit page.
- Dirty-state warning when navigating away.
- Frontend tests (no Jest/RTL setup in `resources/js/scheduling`).
- Backend tests deferred for now — the `NoConflictingHoursRule` is the highest-value target when we revisit.

---

**Backend**

- [x] `UpdateListing` action — `app/Source/Directory/Actions/UpdateListing/UpdateListing.php` + `Dtos/UpdateListingData.php`.
  - DTO has all editable Listing columns as **nullable**.
  - Signature: `update(Listing $listing, UpdateListingData $data): Listing`.
  - Body: `$listing->fill(array_filter($data->toArray(), fn ($v) => $v !== null))`, then save.
  - Used by both the details and hours controllers — each builds a partial DTO with only its fields non-null.
- [x] Add `delete(Listing $listing, SocialLinkEnum $social): void` method to existing `UpdateSocialLink` action (`app/Source/Directory/Actions/UpdateSocialLink/UpdateSocialLink.php`). Removes the matching `SocialLink` row. No-op if not present.
- [x] Controllers (one per action, in `app/Http/Scheduling/Profile/Controllers/`):
  - [x] `ProfileController@show` — render `profile/profile` (card view). Passes the listing payload via `Directory\Resources\ListingResource` (reused; matches the card's data shape).
  - [x] `ProfileEditController@show` — render `profile/edit` (form). Passes a `FacilityProfileEditApiModel` (new) carrying current values for all four sections.
  - [x] `UpdateFacilityPhotosController@update` — calls `UpdateListingMedia` for profile + cover (only if files present in request). Flashes "Changes saved". Redirects back to `/profile/edit`.
  - [x] `UpdateFacilityDetailsController@update` — builds partial `UpdateListingData` (non-hours fields), calls `UpdateListing`. Flash + redirect.
  - [x] `UpdateFacilityHoursController@update` — builds partial `UpdateListingData` (opening/closing only), calls `UpdateListing`. Flash + redirect.
  - [x] `UpdateFacilitySocialLinksController@update` — iterates the `socialLinks` array from the request, calls `UpdateSocialLink::update()` for each non-empty entry. Flash + redirect.
  - [x] `DeleteFacilitySocialLinkController@destroy` — calls `UpdateSocialLink::delete()` for the `{platform}` route param. Flash + redirect.
- [x] Form Requests (in `app/Http/Scheduling/Profile/Requests/`):
  - [x] `UpdateFacilityPhotosRequest` — validates `profilePhoto` and `coverPhoto` as optional uploaded image files (jpeg/png).
  - [x] `UpdateFacilityDetailsRequest` — mirrors `CreateListingRequest` rules minus `city`, `address`, `openingTime`, `closingTime`.
  - [x] `UpdateFacilityHoursRequest` — validates `openingTime` and `closingTime` as required times. Applies `NoConflictingHoursRule` to both, using the directional check (compares against current stored values to decide whether to validate).
  - [x] `UpdateFacilitySocialLinksRequest` — validates `socialLinks` as a required array. Each item: `platform` required + `Rule::enum(SocialLinkEnum::class)`; `url` nullable + valid URL.
- [x] `NoConflictingHoursRule` — `app/Http/Scheduling/Profile/Rules/NoConflictingHoursRule.php`. Constructed with the authenticated admin's listing + the field being validated (`opening` or `closing`). The "tightening vs loosening" comparison reads the **current stored** `opening_time` / `closing_time` from the listing (not any prior form value). On validation:
  - If new value loosens vs current stored value → pass.
  - If new value tightens → query the listing's courts for conflicting `Reservation` rows (`reservation_date >= today`) and `BlockReservation` rows. If any → fail with short inline message and flash the structured conflict list via `Inertia::flash('hours-conflicts', [...])`.
- [x] `FacilityProfileEditApiModel` — Spatie Data ApiModel at `app/Http/Scheduling/Profile/ApiModels/FacilityProfileEditApiModel.php`. Fields: `name`, `courtType`, `numberOfCourts`, `email`, `phone` (with `+63` stripped), `openingTime`, `closingTime`, `googleMapsUrl`, `bookingUrl`, `facebookUrl`, `instagramUrl`, `currentProfilePhotoUrl`, `currentCoverPhotoUrl`.
- [x] Routes (`routes/scheduling.php`):
  - `GET    /profile`                              → `ProfileController@show`
  - `GET    /profile/edit`                         → `ProfileEditController@show`
  - `POST   /profile/photos`                       → `UpdateFacilityPhotosController@update`
  - `PATCH  /profile/details`                      → `UpdateFacilityDetailsController@update`
  - `PATCH  /profile/hours`                        → `UpdateFacilityHoursController@update`
  - `PATCH  /profile/social-links`                 → `UpdateFacilitySocialLinksController@update`
  - `DELETE /profile/social-links/{platform}`      → `DeleteFacilitySocialLinkController@destroy`

**Frontend**

- [x] `profile/profile.tsx` — card view. Renders `directory/components/ListingCard` with the authenticated admin's listing. "Edit profile" button (top-right) uses Wayfinder `ProfileEditController.show().url`.
- [x] `profile/edit.tsx` — edit page. Renders four section components stacked. Each section owns its own `useForm` instance.
- [x] Section components (in `resources/js/scheduling/components/profile/`):
  - [x] `FacilityPhotosSection` — single combined Save button for both photos. Uses new `FacilityProfilePhotoSection` + `FacilityCoverPhotoSection` sub-components, each accepting `currentPhotoUrl` to pre-populate.
  - [x] `FacilityDetailsSection` — name, court type, number of courts, public contact email (with helper text), phone (with `+63` startElement), Google Maps URL, booking URL.
  - [x] `FacilityHoursSection` — opening time, closing time. Hours conflict banner (`DangerAlert`) rendered inside this section, reading `hours-conflicts` from Inertia flash.
  - [x] `FacilitySocialLinksSection` — two rows (Facebook, Instagram). Each row: URL input + per-row "Remove" button when a link exists. Section-wide "Save" button submits the array of current URL values.
  - [x] `FacilityCourtTypeRadioCard` — Chakra `RadioCard` covering `FacilityCourtTypeEnum` values (Covered / Outdoor / Covered and Outdoor). Rebuild for scheduling — do not reuse Directory's `CourtTypesSection`.
  - [x] `FacilityNumberOfCourtsRadioCard` — Chakra `RadioCard`, values 1–10. Rebuild for scheduling — do not reuse Directory's `NumberOfCourtsSection`.
- [x] Disabled-when-clean Save button pattern: `disabled={form.processing || !form.isDirty}` on each section.
- [x] Wayfinder typed actions imported for all seven endpoints (`@/actions/App/Http/Scheduling/Profile/Controllers/...`).
- [x] Sidebar nav — uncomment and rename "Profile" → "Facility Profile" in `resources/js/scheduling/components/navigation/Sidebar.tsx`. Use `ProfileController.show().url`.

---

## ✅ Done — Nav Updates

- [x] Add Reservations nav item with icon
- [x] Add Availability nav item with icon
- [x] Rename Profile → Facility Profile and uncomment in sidebar

---

## ✅ Done — Authorisation Pass

- [x] `ReserveCourtRequest::authorize()` — checks `$this->route('court')->listing_id === admin->listing_id`
- [x] `CreateBlockReservationRequest` — `courtIds.*` validated by new `CourtBelongsToAdminListing` rule (`app/Http/Scheduling/Court/Rules/`)
- [x] `DeleteReservationRequest` (new thin Form Request) — checks `reservation->facility_id === admin->listing_id`
- [x] `DeleteBlockReservationRequest` (new thin Form Request) — checks `blockReservation->listing_id === admin->listing_id`
- [x] Profile routes — no cross-listing risk; listing always derived from authenticated admin
- [x] `CreateCourtController` — listing always derived from authenticated admin

---

## ✅ Done — Correctness

- [x] `CheckReservationOverlap` — now checks both `reservations` (by date) and `block_reservations` (by day of the week) for the court. Regular reservations and blocked slots both produce a 403-style validation failure with distinct messages.
  - **File:** `app/Source/Scheduling/Court/Actions/ReserveCourt/Rules/CheckReservationOverlap.php`

---

## ✅ Done — Auth & Navigation Polish

- [x] **Logout** — logout button in sidebar footer; `POST /logout` → `LogoutController`; uses `useForm({})` pattern
- [x] **Login page branding** — logo, caption, and full-width submit button on the facility admin login page
- [x] **Scheduling dashboard branding** — add Lokal Pikol branding to the main dashboard/home screen
- [ ] **Change password** — scaffolding for facility admins to set their initial password after account creation (triggered after the admin account is first created for a listing)
- [ ] **Forgot password** — scaffolding for facility admins to reset their password via email

---

## ✅ Done — Facility Admin Invitation

**Design decisions:**

**Shared token infrastructure:**
- New general-purpose `InvitationToken` model in `app/Source/Shared/Models/` — supersedes the domain-specific `ListingRegistrationToken` pattern over time. Fields: `id`, `token` (hashed, unique), `type` (enum), `metadata` (JSON), `expires_at`, `used_at` (nullable).
- Single high-entropy token in URL (`/register/{token}`) — DB stores SHA-256 hash; nothing in the URL reveals a DB row or listing ID. SHA-256 used (not `Hash::make`) because lookup requires determinism.
- `InvitationTokenTypeEnum` in `app/Source/Shared/Enums/` — cases: `LISTING_REGISTRATION` (reserved for future refactor), `FACILITY_ADMIN_INVITE`.
- `FacilityAdminInviteMetadata` DTO at `app/Source/Scheduling/Facility/Dtos/` — domain-level contract used by the action that writes it and the controllers that read it.
- `ListingRegistrationToken` is **not** refactored as part of this work — directory flow stays untouched until a separate pass.

**Invite flow:**
- 1-day expiry — tighter than directory's 7 days; an admin invite grants system access, so shorter window reduces breach risk.
- Command blocks at send time if the listing already has an admin, or if the email is already registered in `users`.
- Expired token → distinct error page (ask admin to resend).
- Used or invalid token → redirect to login.
- Email pre-filled and locked in the form — sourced from token metadata, read-only input.
- Auto-login after registration via `facility` guard → redirect to `/courts`.
- `CreateAdminForListing` called with `skipActivation = true` — user sets their own password via the form; email is considered verified by the invite itself.
- Authenticated users visiting `/login` are redirected to `/courts`.

**Backend**
- [x] `InvitationTokenTypeEnum` — `app/Source/Shared/Enums/InvitationTokenTypeEnum.php`
- [x] `InvitationToken` model — `app/Source/Shared/Models/InvitationToken.php`
- [x] `FacilityAdminInviteMetadata` DTO — `app/Source/Scheduling/Facility/Dtos/FacilityAdminInviteMetadata.php`
- [x] Migration — `create_invitation_tokens_table`
- [x] `GenerateFacilityAdminInviteToken` action — `app/Source/Scheduling/Facility/Actions/GenerateFacilityAdminInviteToken/`
- [x] `SendRegistrationLinkCommand` — `scheduling:send-registration-link`; interactive listing search; blocks if listing has admin or email already registered
- [x] `FacilityAdminInviteEmail` mailable + `resources/views/mail/scheduling/facility-admin-invite-email.blade.php`
- [x] `ShowRegistrationController@show` — token validation; expired → error page; used/invalid → redirect to login
- [x] `StoreRegistrationController@store` — creates admin, marks token used, auto-logins, redirects to `/courts`
- [x] `RegisterRequest` — validates `firstName`, `lastName`, `phoneNumber`, `password`
- [x] Routes — `GET /register/{token}` + `POST /register/{token}`; `REGISTER` + `REGISTER_STORE` constants added
- [x] `LoginController@show` — redirects authenticated users to `/courts`

**Frontend**
- [x] `auth/register.tsx` — locked email, listing name in heading, registration fields, `useForm` submit
- [x] `auth/invite-expired.tsx` — expired token error page with "Back to sign in" link

---

## 💭 Deferred — Revisit Later

- [ ] `BlockReservation.listing_id` redundancy — review when building availability search. If neither the search nor any admin view needs the direct FK, drop it via migration and remove `Listing::blockReservations()`
- [ ] Refactor `ListingRegistrationToken` + `GenerateListingRegistrationToken` to use the new shared `InvitationToken` model — directory flow is working and untouched for now

# Lokal Pikol - Copilot Context

**Last Updated:** April 13, 2026

**Major Architectural Update:** The booking/reservation system has been **abandoned**. Lokal Pikol is now exclusively a pickleball court directory for the Negros region. The project originally started as a court reservation/booking system, evolved to a directory-first model with booking as an upsell, and has now fully dropped the booking feature. The booking-related code remains in the codebase as legacy but will receive no further development.

> **Evolution History:** Booking System (original) → Directory + Booking Upsell (mid-pivot) → Directory Only (current, April 2026)

## Domain Overview

**Application Name:** Lokal Pikol  
**Purpose:** A comprehensive pickleball court directory for the Negros region  
**Core Business:** Connecting pickleball players with court facilities through a free, comprehensive directory  
**Note:** The reservation/booking system has been abandoned as of April 2026. All booking-related code is legacy and will not be developed further.

### User Types & Roles

#### 1. Player (Public User)
- **Primary Actions:**
  - Browse Negros directory (no account required)
  - Discover court locations, hours, and contact information

#### 2. ~~Facility (Court Owner/Manager)~~ [LEGACY - Booking System]
- _This role was part of the abandoned booking system. No further development._
- **Historical Actions:** Court management, reservation approval, calendar management, self-booking

### Key Features (Active)
- **Negros Directory** - Free comprehensive directory listing for all pickleball courts in Negros region
- Public searchable directory with city filtering
- Signed URL access for court owner listing updates
- Token-based facility onboarding system

### Key Features (Abandoned - Legacy Code)
- ~~Reservation booking system with approval workflow~~
- ~~Block booking system for recurring court schedules~~
- ~~Calendar management for facilities~~
- ~~Email notifications for reservation lifecycle~~
- ~~Account management for booking users~~

## Technical Stack

- **Backend Framework:** Laravel
- **Frontend Framework:** InertiaJS
- **Architecture Pattern:** Full-stack monolith with SPA-like experience

## Routing Architecture

### Domain-Based Routing Structure
The application uses domain-based routing to separate the main application from the directory sub-application:

**Configuration Files:**
- **`config/app.php`**: Added `'tld' => env('APP_TLD', 'localhost')` for dynamic TLD configuration
- **`.env`**: `APP_TLD=lokal-pikol.test` (local development)

**Routing Implementation (`bootstrap/app.php`):**
```php
// Removed global web routes to prevent domain conflicts
->withRouting(
    commands: __DIR__ . '/../routes/console.php',
    health: '/up',
    then: function () {
        $tld = config('app.tld');

        // Directory subdomain routes (PRIMARY ENTRY POINT)
        Route::domain("directory.{$tld}")
            ->middleware('web')
            ->name('directory.')
            ->group(base_path('routes/directory.php'));

        // Booking subdomain routes (upsell functionality)
        Route::domain("booking.{$tld}")
            ->middleware('web')
            ->name('booking.')
            ->group(base_path('routes/booking.php'));

        // Main domain - admin/auth routes only (no public home page)
        Route::domain($tld)
            ->middleware('web')
            ->group(base_path('routes/web.php'));

        // Facility management routes (on booking subdomain)
        Route::domain("booking.{$tld}")
            ->middleware('web')
            ->prefix('facility')
            ->name('facility.')
            ->group(base_path('routes/facility.php'));
    }
)
```

**Domain Separation:**
- **Directory Subdomain** (`directory.lokal-pikol.test`): Primary and only active entry point
  - `/` → `routes/directory.php` (Directory listing)
- **Booking Subdomain** (`booking.lokal-pikol.test`): ~~ABANDONED~~ - Legacy reservation system code
  - `/facility/{slug}` → Individual facility booking pages (legacy)
  - `/facility/*` → `routes/facility.php` (Facility management interface - legacy)
- **Main Domain** (`lokal-pikol.test`): Administrative and auth routes
  - `/` → Administrative routes only

**Route File Structure:**
- `routes/directory.php`: Primary user-facing directory routes (active)
- `routes/booking.php`: ~~Booking system routes~~ (legacy - abandoned)
- `routes/facility.php`: ~~Facility management routes~~ (legacy - abandoned)
- `routes/web.php`: Administrative and auth routes

**Key Benefits:**
- **Clean Separation**: No route name conflicts between directory and booking subdomains
- **Independent Development**: Directory and booking applications can evolve independently
- **SEO & Branding**: Dedicated subdomain for directory discovery as primary entry point
- **Performance**: Domain-based routing prevents unnecessary route matching
- **Simplified User Journey**: Single entry point (directory) eliminates confusion

## Negros Directory (Sole Application)

### Overview
**Purpose:** A free comprehensive directory listing of all pickleball courts in the Negros region  
**Business Model:** Free directory providing value to the pickleball community  
**Access Control:** Backend-managed by administrators + signed URL access for court owners  
**Domain:** `directory.lokalpikol.com` - Comprehensive court directory

### Key Features
- **Public Directory:** Searchable list of courts with filtering by city
- **Signed URL Access:** Court owners receive secure links to update their listings
- **Free Listing:** No fees for directory inclusion

### Directory Court Model Fields
- **Basic Information:** Name, address, city, description
- **Media Assets:** Cover photo, profile photo
- **Operating Hours:** Opening time, closing time  
- **Contact & Links:** Google Maps URL, social media links, booking URL
- **Integration Status:** Boolean indicator for main application integration
### Management:** Backend-managed by administrators (no direct court owner interface)

### User Experience
- **Players:** Browse directory with city-based filtering (no account required)
- **Court Owners:** Receive signed URL invitations to register their court listings
- **External Links:** Listings may include external booking URLs or contact information for courts that manage their own reservations

### Technical Implementation
- **Separate Model:** `Listing` model (distinct from main `Facility` model)
- **No Reservations:** Pure directory functionality, no booking capabilities within directory
- **Backend Management:** Admin-managed court listings (no public court owner interface)
- **Single Page:** Directory list with filtering - no additional pages/workflows
- **Regional Focus:** Specifically targeting Negros region courts

### Business Strategy
- **Community Value:** Free comprehensive directory providing immediate value to the pickleball community
- **Market Penetration:** Get all Negros courts listed for definitive regional coverage
- **Competitive Advantage:** Become the definitive source for Negros court information
- **User Journey:** Directory Discovery → Contact Court Directly (via external links, social media, or Google Maps)

## Architecture & Patterns

### Hybrid Architecture Approach

**Primary Philosophy:** Combines Domain-Driven Design (DDD) for business logic with Layered Architecture for HTTP and frontend concerns

#### `/app/Source/` - Pure Business Domain Layer (DDD)
**Purpose:** Non-negotiable core business functionalities and domain models  
**Philosophy:** Single-responsibility actions that focus purely on business operations  
**Structure Pattern:**
```
Domain/
├── Actions/          # Pure business use cases and operations
├── Commands/         # Artisan commands for domain
├── Database/         # Domain-specific factories & seeders
├── Enums/           # Domain constants and value objects
├── Models/          # Domain entities
├── Mail/            # Domain-specific email templates
├── Notifications/   # Domain-specific notifications
└── ...              # Other domain concerns
```

**Core Principle:** Each action performs one business operation (e.g., "save a directory listing") without side effects or orchestration concerns.

**Active Domains:**
- **Directory:** Free court listings for Negros region (primary and sole active domain)
- **Analytics:** Custom event tracking for high-priority user interactions
- **Authentication:** User management (for admin access)
- **MediaLibrary:** Media type management

**Legacy Domains (Abandoned - Booking System):**
- ~~**Court:** Court entities, pricing, slot management, time conversions~~
- ~~**Customer:** Customer entity and creation workflows~~
- ~~**Facility:** Facility entity and location management~~
- ~~**Reservation:** Booking lifecycle, fees, status management~~

#### `/app/Http/` - Orchestration Layer (Layered Architecture)
**Purpose:** HTTP-specific orchestration and workflow management  
**Philosophy:** Controllers orchestrate business actions with additional HTTP-specific operations  
**Pattern:** Domain-organized controllers that coordinate business operations
```
Http/
├── Controllers/     # Base controllers
├── Directory/       # Directory-facing HTTP endpoints & orchestration (PRIMARY)
├── Booking/         # Booking subdomain HTTP endpoints & orchestration
├── Facility/        # Facility-facing HTTP endpoints & orchestration
├── Enums/          # HTTP-level enums (Guards, etc.)
├── Middleware/     # Request/response middleware
└── Shared/         # Cross-domain HTTP resources
```

**Core Principle:** HTTP controllers call core business actions but orchestrate additional operations like:
- Sending notifications after business operations
- Saving supplementary data across multiple domains
- Handling HTTP-specific concerns (authentication, validation, responses)
- Coordinating multiple business actions in a single request

**Example:** A "create listing" HTTP request:
1. Calls core `CreateListing` action (pure business logic)
2. Orchestrates social link updates (additional data)
3. Sends thank you email (post-operation notification)
4. Marks registration token as used (HTTP workflow state)

#### `/resources/js/` - Frontend Layer (Layered Architecture)  
**Purpose:** User interface organized by user context and domain concerns using InertiaJS  
**Main Directory:** `/resources/js/` serves as the primary frontend application directory

**Layout-Level Files:**
- `app.tsx` - Build reference for main application layout
- `directory.tsx` - Build reference for directory subdomain layout  
- `ssr.tsx` - Server-side rendering setup (currently unused)

**Auto-Generated Directories:**
- `actions/` - Auto-generated by Inertia for type-safe server actions
- `routes/` - Auto-generated by Inertia for client-side routing

**Domain Organization Pattern:**
```
js/
├── app.tsx, directory.tsx, ssr.tsx    # Layout-level build references
├── actions/, routes/                   # Auto-generated by Inertia
├── directory/                          # Directory domain (PRIMARY)
│   ├── components/                     # Domain-specific components
│   ├── helpers/                        # Domain-specific utilities
│   ├── layouts/                        # Domain-specific layouts
│   ├── models/                         # Domain-specific TypeScript models
│   └── pages/                          # Domain-specific page components
├── shared/                             # Global-level shared components & utilities
├── types/                              # Global-level TypeScript types
└── wayfinder/                          # Global navigation utilities
```

**Structure Principles:**
- **Domain Separation**: Each business domain (`directory/`, future: `booking/`, `facility/`) contains its own complete frontend structure
- **Global Scope**: `shared/` and `types/` provide cross-domain functionality
- **InertiaJS Integration**: Actions and routes auto-generated for type safety and SSR compatibility
- **Layout System**: Domain-specific layout files enable independent styling and structure per subdomain

### Hybrid Architecture in Practice

#### Example: Directory Listing Creation
**Business Layer (DDD):**
- `CreateListing` action: Performs single business operation - creates a listing record
- Input: `CreateListingData` DTO with validated business data
- Output: `Listing` model entity
- Concerns: Pure business logic, no side effects

**HTTP Layer (Layered):**
- `CreateListingController::store()` orchestrates the complete workflow:
  1. Validates HTTP request data
  2. Calls `CreateListing` action (core business operation)
  3. Handles social links via `UpdateSocialLink` actions (supplementary data)
  4. Marks registration token as used (HTTP workflow state)
  5. Sends thank you email (post-operation notification)
  6. Manages database transaction boundaries
  7. Handles HTTP responses and redirects

**Benefits of Separation:**
- **Reusability:** `CreateListing` action can be called from admin interfaces, APIs, or commands
- **Testability:** Business logic tested independently from HTTP orchestration
- **Maintainability:** HTTP concerns (emails, tokens, transactions) separate from business rules
- **Flexibility:** Different HTTP contexts can orchestrate the same business action differently

### Key Architectural Decisions

#### Hybrid Architecture Choice
- **Business Layer (DDD):** Pure domain actions focused on single business operations
- **Orchestration Layer (Layered):** HTTP controllers coordinate business operations with additional concerns
- **Separation Benefits:** Business logic remains testable and reusable while HTTP layer handles orchestration

#### Actions Pattern in Business Layer
- **Purpose:** Encapsulate single business operations as discrete, reusable units
- **Usage:** Pure business logic without side effects (e.g., `CreateListing`, `CreateReservation`)
- **Benefits:** Testable, composable, single responsibility, reusable across different HTTP contexts

#### HTTP Orchestration Pattern
- **Purpose:** Coordinate business actions with HTTP-specific operations
- **Usage:** Controllers call business actions + handle notifications, supplementary data, workflow state
- **Benefits:** Different HTTP contexts can orchestrate the same business action differently

#### DTO Pattern  
- **Implementation:** Data Transfer Objects for action inputs
- **Examples:** `CreateReservationData`, `CreateCourtData`, `CreateListingData`
- **Benefits:** Type safety, validation boundaries, clear contracts

#### Dual User Type Architecture
- **Business Layer:** Domain actions serve all user types uniformly
- **HTTP Layer:** Separate controller namespaces for `Customer/`, `Directory/`, `Facility/`
- **Frontend:** Separate page hierarchies and components
- **Auth:** Distinct authentication flows and resources

## Business Rules

> **Note:** The booking-related business rules below (Court Pricing, Court Slots, Reservations, Block Bookings, Access Control) are from the **abandoned booking system** and are preserved here for historical reference only. No further development will occur on these features.

<details>
<summary>Abandoned Booking System Business Rules (click to expand)</summary>

### Court Pricing Model
- **Time-Based Pricing:** Courts have pricing ranges based on time periods
- **Consecutive Ranges Required:** Pricing ranges MUST be consecutive without gaps
  - ✅ Valid: `07:00-11:00`, `11:00-15:00`, `15:00-22:00`
  - ❌ Invalid: `07:00-11:00`, `12:00-15:00` (missing 11:00-12:00)
- **Price Structure:** Each range has a fixed price (e.g., 100 pesos for 07:00-11:00)
- **Full Coverage:** All operating hours must be covered by pricing ranges

### Court Slot System
- **Backend Storage:** Time ranges stored as `start_time` and `end_time` 
- **Frontend Representation:** Converted to "court slots" for user interaction
- **User Selection:** Customers select court slots via checkbox interface
- **Conversion Logic:** `RangeToSlot`/`SlotsToRange` actions handle time conversions
- **Availability Logic:** Court slots marked as available/unavailable based on:
  - Existing reservations (single-date bookings)
  - **Block bookings** (recurring weekly schedules)
- **Data Flow:** Court Slots → Time Ranges → Reservation Records

#### Midnight Handling (00:00 vs 24:00)
- **Contextual Midnight:** System differentiates between midnight as start vs end
  - `00:00` = Start of day (midnight as beginning)
  - `24:00` = End of day (midnight as ending)
- **Maximum Time Range:** Valid times are 00:00 to 24:00 (no extended hours beyond)
- **Reservation Storage:**
  - Bookings ending at midnight: saved as `[start_time] - 24:00`
  - Bookings starting at midnight: saved as `00:00 - [end_time]`
- **Overnight Bookings:** Customers must book separate sessions for overnight periods
  - Example: 11PM-2AM requires two bookings: `23:00-24:00` + `00:00-02:00`
- **Slot Conversion:** `RangeToSlot` normalizes midnight slots (23:00-00:00 → 23:00-24:00)

### Reservation Workflow

- Customer browses available courts and their slot pricing
- **Slot Hold (On Hold Status):** When a customer initiates a reservation, the selected slots are placed "on hold" for 10 minutes (previously 15 minutes). During this period, these slots are blocked from being booked by other users.
- **Availability Check:** Court slots are filtered by existing reservations and block bookings. Slots with a reservation status of `on hold`, `pending`, or `confirmed` (see `ReservationStatusEnum`) are considered unavailable and cannot be booked by other users.
- Customer selects court slots (checkbox UI)
- Selected slots converted to time ranges for reservation creation
- Customer initiates booking request, which places the reservation in the `on hold` status.
- **Reservation Expiry:** If the reservation is not confirmed (e.g., payment or further action) within 10 minutes, a scheduler (e.g., Laravel task) will automatically delete the reservation as if it never existed, freeing up the slots.
- Facility must approve reservation requests (approval-based system)
- Email notifications sent during reservation lifecycle

### Block Booking System
- **Purpose:** Facilities can create recurring schedules for open plays, events, or maintenance
- **Pattern:** Weekly recurring blocks (e.g., "Every Tuesday & Thursday, 6PM-10PM")
- **Scope:** Affects court availability but are NOT traditional reservations
- **Integration:** Block bookings influence court slot availability calculations
- **Use Cases:** 
  - Regular open play sessions
  - Weekly training programs
  - Maintenance windows
  - Private facility events

### Access Control
- Account required for customers to make bookings
- Facilities have management privileges for their courts
- Self-booking allowed for facilities

</details>

## Code Conventions

### Domain Organization Standards
- **Actions:** Use descriptive verb-based naming (`CreateReservation`, `ConfirmReservation`)
- **DTOs:** Suffix with "Data" (`CreateReservationData`)  
- **Models:** Domain entities with clear relationships
- **Enums:** Domain-specific constants and value objects

### HTTP Layer Conventions
- **Controllers:** Domain-namespaced with clear responsibilities
- **Resources:** Transform domain models for API responses
- **Requests:** Validation and input handling per domain

## Architecture Analysis

### ✅ Positive Patterns Observed

1. **Clear Separation of Concerns:** Business logic (DDD) cleanly separated from orchestration concerns (Layered)
2. **Pure Business Actions:** Domain actions focus on single operations without side effects
3. **HTTP Orchestration:** Controllers coordinate business operations with additional HTTP-specific concerns
4. **DTO Pattern:** Strong input validation and type safety across layers
5. **Dual User Context:** Clean separation between customer, directory, and facility workflows
6. **Reusable Business Logic:** Core actions can be orchestrated differently across HTTP contexts
7. **Consistent Structure:** Predictable folder patterns across domains and layers

### ⚠️ Areas for Consideration

1. **Database Concerns in Business Domains:** Factories/seeders in domain modules
   - **Current:** `/app/Source/{Domain}/Database/`
   - **Consideration:** Typically kept separate, but may be intentional for domain encapsulation
   - **Trade-off:** Better domain cohesion vs. traditional Laravel structure

2. **Shared HTTP Resources:** `/app/Http/Shared/Resources/`
   - **Observation:** Indicates cross-cutting concerns
   - **Consideration:** May benefit from explicit shared domain or service layer

3. **Incomplete MediaLibrary Domain:** Only contains Enums
   - **Observation:** Minimal domain with full directory structure
   - **Consideration:** May indicate future expansion or could be merged

### 🎯 Architecture Strengths

- **Business Logic Clarity:** Actions make use cases explicit and focused
- **HTTP Orchestration Flexibility:** Different controllers can coordinate the same business operations differently
- **Testability:** Both business logic and HTTP orchestration can be tested independently
- **Scalability:** New domains and HTTP contexts can be added without affecting existing code  
- **User Context Separation:** Clear customer vs directory vs facility workflows
- **Reusability:** Business actions serve multiple HTTP contexts uniformly

## Important Decisions & Rationale

### Architecture Choices
- **Hybrid Architecture:** DDD for pure business logic + Layered for orchestration and UI
- **Laravel + InertiaJS:** Traditional backend architecture with modern SPA experience
- **Single Repository:** All domains in one codebase for simplified development and deployment
- **Sub-Application Pattern:** Directory remains separate subdomain while integrating with main booking system

### Business Model Decisions
- **Booking System Abandoned (April 2026):** The reservation/booking system was the original product vision but has been dropped entirely. No further development will occur on booking, reservation, facility management, or related features. The codebase retains the legacy code but it is not actively maintained.
- **Directory-Only Strategy:** The directory is the sole product — a free comprehensive listing of Negros pickleball courts
- **Token-based Listing Registration:** Secure, time-limited onboarding without account requirements
- **Evolution Path:** Started as a booking system → pivoted to directory-first with booking upsell → fully abandoned booking in favor of directory-only

### Technical Decisions
- **UUID Primary Keys:** All entities use UUIDs for security and distributed system compatibility
- **Actions + DTOs:** Standardized pattern for business operations with strong typing
- **Domain-based Routing:** Directory subdomain is the only active subdomain; booking subdomain code remains as legacy

## Module Deep Dives

### Authentication Module
- **Location:** `/app/Source/Authentication/`
- **Key Actions:** `CreateUser` with DTO validation
- **Models:** `User` with role-based access (`UserRoles` enum)
- **Email:** `UserVerificationMail` for account verification
- **Database:** Custom user factory and seeding

### ~~Court Module~~ [LEGACY - Abandoned]
- **Location:** `/app/Source/Court/`
- _Part of the abandoned booking system. No further development._

### ~~Customer Module~~ [LEGACY - Abandoned]
- **Location:** `/app/Source/Customer/`
- _Part of the abandoned booking system. No further development._

### ~~Facility Module~~ [LEGACY - Abandoned]
- **Location:** `/app/Source/Facility/`
- _Part of the abandoned booking system. No further development._

### ~~Reservation Module~~ [LEGACY - Abandoned]
- **Location:** `/app/Source/Reservation/`
- _Part of the abandoned booking system. No further development._

### Analytics Module — ACTIVE
- **Location:** `/app/Source/Analytics/`
- **Purpose:** Custom first-party event tracking for high-priority user interactions
- **Key Components:**
  - `AddEntry` action: Creates an analytics record from any `AnalyticsEntry` contract implementation
  - `AnalyticsEntry` contract: Interface requiring `getTrackableType()`, `getTrackableId()`, `getEvent()`, `getDomain()`, `getMetadata()`
  - `Analytics` model: Polymorphic `trackable` relation, stores `event`, `domain`, and optional `metadata` (JSON)
- **Schema:** `analytics` table — `id`, `uuid`, `nullableMorphs('trackable')`, `event` (string), `domain` (string), `metadata` (JSON nullable), timestamps
- **Directory Integration:**
  - `TrackListingAnalytics` action dispatches `ListingClicked` event with `ListingAnalyticsData` DTO
  - `ListingAnalyticsData` implements `AnalyticsEntry` — polymorphic via `Listing`, domain = `"directory"`
  - `ListingEventEnum`: `FACEBOOK_CLICKED`, `INSTAGRAM_CLICKED`, `BOOK_COURT_CLICKED`
  - Tracked via `POST /track/{listing:uuid}/{event}` endpoint on directory subdomain
- **Dual Analytics Strategy:**
  - **Google Analytics (GA4):** Installed via gtag.js (`G-JNMXKBD68M`) in Blade templates, production-only. Handles general traffic metrics, page views, sessions, demographics, and acquisition data.
  - **Custom Analytics:** Purpose-built for high-priority business events that require precise, queryable tracking tied to specific domain entities (e.g., which listing's Facebook link was clicked, how many book-court clicks per listing). GA4 handles the broad picture; custom analytics handles entity-level business intelligence.
  - **Why both:** GA4 is great for traffic analysis but makes it difficult to query specific entity-level interactions (e.g., "show me all click events for Listing X"). Custom analytics provides direct database access with polymorphic relationships to domain models, enabling business-specific reporting and potential future features like popularity sorting.

### MediaLibrary Module
- **Location:** `/app/Source/MediaLibrary/`
- **Enums:** `MediaTypeEnum` for categorizing media assets
- **Integration:** Spatie Media Library integration

### Directory Module (Negros Court Directory) — ACTIVE
- **Location:** `/app/Source/Directory/`
- **Purpose:** Free directory listing for Negros region pickleball courts
- **Key Actions:** 
  - `CreateListing`, `UpdateListing` for court listings
  - `ListListings` with city filtering
  - `GenerateListingRegistrationToken` for secure invitation system
- **Models:** `Listing` entity (separate from Facility), `ListingRegistrationToken` for secure onboarding
- **Key Features:**
  - **Backend Management:** Admin-managed court listings
  - **Media Support:** Cover photo, profile photo via Spatie Media Library
  - **Public Directory:** No authentication required for browsing
  - **City Filtering:** Filter courts by Negros cities
  - **Integration Status:** Track which courts use main reservation system
  - **Secure Onboarding:** Token-based invitation system with 7-day expiry
- **Business Model:** 
  - Free directory listings (no fees)
  - Regional market penetration strategy
  - Community value — definitive Negros pickleball court source
- **Access Patterns:**
  - **Backend Admin:** Manage court listings via admin interface
  - **Public Users:** Open browsing with city-based filtering
  - **No Reservations:** Pure directory functionality, no booking workflows
- **External Links:**
  - Listings may include external booking URLs for courts that manage their own reservations
  - Social media and Google Maps URL support
  - No internal booking integration (booking system abandoned)

#### Facility Onboarding Flow
**Strategy:** Secure, low-friction directory registration to build trust before converting to full reservation platform

**Step-by-Step Process:**
1. **Token Generation** (`GenerateListingRegistrationToken`)
   - Creates secure registration token with 7-day expiry
   - Stores hashed version in `ListingRegistrationToken` model  
   - Returns UUID, unhashed token, and expiry for signed URL generation

2. **Email Invitation** (`ListingRegistrationEmail`)
   - Sends personalized invitation with secure signed URL
   - Subject: "Negros Oriental Court Directory | Lokal Pikol"
   - Contains time-limited registration link with token parameters

3. **Secure Registration Access**
   - Court owners access form via signed URL from email
   - Protected by `signed` middleware (prevents URL tampering)
   - 7-day window to complete registration before expiry

4. **Listing Creation** (`CreateListing` action)
   - Processes form data through `CreateListingData` DTO
   - Creates `Listing` model with complete court information
   - Handles media uploads (cover photo, profile photo)
   - Maintains code standardization through action pattern

5. **Immediate Public Availability**
   - Listing appears instantly in public directory
   - No additional approval or moderation required
   - Available for players to discover and contact

**Security Features:**
- **Signed URLs:** Cryptographically signed to prevent unauthorized access
- **Token Hashing:** Secure storage using Laravel's Hash facade
- **Time-Limited Access:** 7-day expiry window for registration completion
- **UUID-based Identifiers:** Non-guessable, secure token references

**Business Benefits:**
- **Community Value:** Facilities get free exposure to the pickleball community
- **Low Friction:** Simple one-time registration process
- **Market Coverage:** Comprehensive directory drives player engagement

## Performance Considerations

*To be documented as requirements emerge*

## Critical Validation Rules

> **Note:** Court Pricing and Reservation validation rules below are from the **abandoned booking system** and preserved for historical reference only.

<details>
<summary>Abandoned Booking System Validation Rules (click to expand)</summary>

### Court Pricing Validation
- **Consecutive Range Rule:** Court pricing ranges CANNOT have gaps
  - Must validate that end_time of range N = start_time of range N+1  
  - Example validation: `07:00-11:00` + `11:00-15:00` ✓, but `07:00-11:00` + `12:00-15:00` ✗
  - **Midnight Support:** Ranges can end at `24:00` (validated as end-of-day midnight)
- **Time Format:** Consistent time format across pricing ranges
- **Price Requirements:** Each range must have a valid decimal price  
- **Coverage Validation:** All court operating hours should be covered by pricing ranges
- **Maximum Range:** Valid pricing ranges from 00:00 to 24:00 (no extended hours)

### Reservation Validation  
- **Slot Availability:** Selected court slots must be available for the reservation date. Slots are considered unavailable if there is an existing reservation with a status of `on hold`, `pending`, or `confirmed` (see `ReservationStatusEnum`).
- **Time Alignment:** Reservation times must align with existing court pricing ranges
- **No Overlaps:** Prevent double-booking of court slots
- **Future Dates:** Reservations typically only allowed for future dates

### Business Logic Constraints
- **Approval Workflow:** Reservations require facility approval before confirmation
- **Fee Calculation:** Total fees calculated based on selected court slots and pricing
- **Status Transitions:** Reservations follow defined status workflow (pending → confirmed/cancelled)

</details>

## Common Patterns & Conventions

### Action Pattern Implementation
```php
// Standard Action Structure
CreateReservation/
├── CreateReservation.php     # Main action class
└── Dtos/
    └── CreateReservationData.php  # Input DTO
```

### HTTP Resource Organization
```php
// Domain-specific HTTP structure
Directory/
├── Controllers/         # Directory browsing and listing management (PRIMARY)
└── Resources/          # Directory court display resources

Booking/
├── Controllers/        # Individual facility booking pages
├── Court/Resources/    # Booking court views
└── Reservation/Controllers/  # Reservation management

Facility/
├── Controllers/        # Facility management interfaces
└── Resources/          # Facility admin views
```

### Frontend Domain Patterns

#### JavaScript/InertiaJS Structure (`/resources/js/`)
```typescript
// Layout-level build references (per subdomain)
app.tsx              # Main application build reference
directory.tsx        # Directory subdomain build reference
ssr.tsx              # Server-side rendering (unused currently)

// Auto-generated by InertiaJS
actions/             # Type-safe server action bindings
routes/              # Client-side routing definitions

// Domain organization pattern
directory/           # Directory domain (PRIMARY ENTRY POINT)
├── components/      # Directory-specific UI components
├── helpers/         # Directory-specific utility functions
├── layouts/         # Directory-specific page layouts
├── models/          # Directory-specific TypeScript models
└── pages/           # Directory-specific page components

// Global scope (cross-domain)
shared/              # Shared components, helpers, models
├── components/      # Reusable UI components
├── helpers/         # Global utility functions
├── models/          # Global TypeScript models
└── types/           # Global type definitions

types/               # Global TypeScript type definitions
wayfinder/           # Global navigation utilities
```

#### Frontend Architecture Principles
- **Domain Encapsulation**: Each domain contains complete frontend structure (components, pages, models, helpers)
- **Layout System**: Domain-specific build references enable independent styling per subdomain
- **InertiaJS Integration**: Auto-generated actions/routes provide type-safe server communication
- **Global Shared Resources**: `shared/` and `types/` serve cross-domain functionality
- **TypeScript Models**: Domain-specific models mirror backend DTOs and entities
- **Component Hierarchy**: Domain components can use shared components, but not vice versa

### Enum Usage Patterns
- **System Configuration:** `CityEnum`, `MediaTypeEnum`, `UserRoles`
- **Legacy (Booking System):** `ReservationStatusEnum`, `ReservationFeeItemsEnum` — abandoned, no further development

### Database Integration Patterns
- **Domain Factories:** Each domain contains its own model factories
- **Domain Seeders:** Self-contained test data per domain
- **Migration Organization:** Timestamped migrations in `/database/migrations/`

## Integration Points

### Email System
- Reservation lifecycle notifications
- User account management communications

### Directory (Sole Application)
- **Only Product:** Directory is the sole application — booking system has been abandoned
- **Shared Media Library:** Directory courts use Spatie Media Library for court photos
- **Regional Strategy:** Negros directory as comprehensive market coverage

### Database Schema & Entity Relations
- **Key Tables:** facilities, courts, customers, reservations, court_pricings, reservation_fees, **block_bookings**
- **Core Entities:**
  - `Court` → `CourtPricing` (1:many) - Time-based pricing ranges
  - `Court` → `Reservation` (1:many) - Booking records  
  - `Court` → `BlockBooking` (1:many) - **Recurring availability blocks (NEW)**
  - `Reservation` → `ReservationFee` (1:many) - Fee breakdown
  - **Polymorphic:** `Reservation` → `reservable` (Customer|Facility) - Who made the reservation
  - `Facility` → `Court` (1:many) - Facility court ownership
  - `Facility` → `Reservation` (1:many) - Which facility the reservation is at
- **UUID Strategy:** All entities use UUID primary keys via `HasUuid` trait
- **Media Integration:** Spatie Media Library for court photos and reservation receipts
- **Polymorphic Reservations:** Both customers and facilities can make reservations using `HasReservations` trait
- **Time Storage:** 
  - Database: `start_time`, `end_time` fields (standard format: 00:00:00 style)
  - Frontend: Converted to court slots for user interaction
  - Constraint: Court pricing ranges must be consecutive (no time gaps)
  - **Midnight Contextual Storage:**
    - End times at midnight: stored as `24:00` during processing, `00:00` in database
    - Start times at midnight: stored as `00:00` 
    - Maximum valid range: 00:00 to 24:00 (no extended hours beyond)
    - Overnight reservations: Split into separate bookings per day
- **Block Booking Schema:**
  - `day` (tinyint) - Single day of week (0=Sunday, 1=Monday, etc.)
  - `start_time`, `end_time` - Time range for blocked slots
  - `court_id` - Associated court with cascade delete
  - **Pattern Example:** Two records: day=2 + 18:00-22:00 & day=4 + 18:00-22:00 = Every Tue/Thu 6PM-10PM

## Project Evolution & Decision History

### Phase 1: Booking System (Original Vision)
- Built as a court reservation/booking platform with approval workflows
- Features: Court pricing, slot management, reservations, block bookings, facility management
- Business model: 5-peso per hour fee on reservations

### Phase 2: Directory-First with Booking Upsell
- Pivoted to a free directory as the primary entry point
- Booking system repositioned as an upsell feature for integrated courts
- Directory served as lead generation for booking platform adoption

### Phase 3: Directory Only (Current — April 2026)
- **Booking system fully abandoned** — no further development on reservations, facility management, or related features
- Lokal Pikol is now exclusively a free pickleball court directory for the Negros region
- Legacy booking code remains in the codebase but is unmaintained
- Focus is entirely on the directory experience and court listing coverage

## Planned Features

See [`docs/FEATURES_ROADMAP.md`](./FEATURES_ROADMAP.md) for the full feature backlog and status.

## Future Considerations

*To be documented as roadmap becomes clear*

---

*This document serves as a living reference for development context. Update as architectural decisions are made and business logic is discovered.*
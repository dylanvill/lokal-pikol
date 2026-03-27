# Lokal Pikol - Copilot Context

**Last Updated:** March 27, 2026

**Major Architectural Update:** Shifted to directory-only entry model. No standalone booking home page - all user discovery flows through the comprehensive Negros directory at directory.lokalpikol.com, with "Book Court" buttons redirecting to either external booking URLs or booking.lokalpikol.com/facility/{slug} for integrated courts.

## Domain Overview

**Application Name:** Lokal Pikol  
**Purpose:** A comprehensive pickleball court directory for Negros region with optional reservation system for local communities ("lokals")  
**Core Business:** Connecting pickleball players with court facilities through the comprehensive directory as the single entry point, with booking services as an enhanced offering

### User Types & Roles

#### 1. Customer (Player/Renter)
- **Primary Actions:**
  - Browse Negros directory (no account required) - PRIMARY ENTRY POINT
  - Book court reservations (via directory links)
  - Account creation and management (when using booking system)
- **Requirements:** Must create account before booking reservations on integrated courts

#### 2. Facility (Court Owner/Manager)  
- **Primary Actions:**
  - Add and edit court information
  - Approve/manage reservation requests
  - View calendar of activities and bookings
  - Self-book courts for facility use
- **Management Role:** Controls court availability and reservation approval

### Key Features
- **Negros Directory** - Free comprehensive directory listing for all pickleball courts in Negros region (PRIMARY ENTRY POINT)
- Reservation booking system with approval workflow (upsell feature - no standalone home page)
- **Block booking system** for recurring court schedules (open plays, events)
- Calendar management for facilities
- Email notifications system
- Account management for booking users

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
- **Directory Subdomain** (`directory.lokal-pikol.test`): Primary entry point
  - `/` → `routes/directory.php` (Directory listing - MAIN USER ENTRY)
- **Booking Subdomain** (`booking.lokal-pikol.test`): Reservation system functionality
  - `/facility/{slug}` → Individual facility booking pages
  - `/facility/*` → `routes/facility.php` (Facility management interface)
- **Main Domain** (`lokal-pikol.test`): Administrative and auth routes
  - `/` → Administrative routes only (no public home page)

**Route File Structure:**
- `routes/directory.php`: Primary user-facing directory routes (main entry point)
- `routes/booking.php`: Booking system routes for individual facilities
- `routes/facility.php`: Facility management routes (prefixed)
- `routes/web.php`: Administrative and auth routes only

**Key Benefits:**
- **Clean Separation**: No route name conflicts between directory and booking subdomains
- **Independent Development**: Directory and booking applications can evolve independently
- **SEO & Branding**: Dedicated subdomain for directory discovery as primary entry point
- **Performance**: Domain-based routing prevents unnecessary route matching
- **Simplified User Journey**: Single entry point (directory) eliminates confusion

## Negros Directory (Primary Application)

### Overview
**Purpose:** A free comprehensive directory listing of all pickleball courts in the Negros region (PRIMARY APPLICATION & SOLE PUBLIC ENTRY POINT)  
**Business Model:** Primary value delivery and sole discovery method through directory, with reservation system as upsell offering  
**Access Control:** Backend-managed by administrators (no public court owner interface)  
**Domain:** `directory.lokalpikol.com` - Primary discovery platform for comprehensive court listings

### Key Features
- **Public Directory:** Searchable list of courts with filtering by city
- **Signed URL Access:** Court owners receive secure links to update their listings
- **Integration Status:** Clear indicator showing which courts use the main reservation system
- **Free Listing:** No fees for directory inclusion (unlike main app's 5-peso per hour model)
- **Lead Generation:** Designed to drive adoption of the full reservation platform

### Directory Court Model Fields
- **Basic Information:** Name, address, city, description
- **Media Assets:** Cover photo, profile photo
- **Operating Hours:** Opening time, closing time  
- **Contact & Links:** Google Maps URL, social media links, booking URL
- **Integration Status:** Boolean indicator for main application integration
### Management:** Backend-managed by administrators (no direct court owner interface)

### User Experience
- **Players:** Browse directory with city-based filtering (no account required) - SOLE ENTRY POINT
- **Booking Integration:** "Book Court" button directs to:
  - `booking.lokalpikol.com/facility/{slug}` (for integrated courts)
  - External booking URL (for non-integrated courts)
- **No Booking Home Page:** No standalone list of booking-enabled facilities - directory is the only discovery method
- **Upsell Flow:** Directory listings highlight benefits of upgrading to full reservation system

### Technical Implementation
- **Separate Model:** `Listing` model (distinct from main `Facility` model)
- **No Reservations:** Pure directory functionality, no booking capabilities within directory
- **Backend Management:** Admin-managed court listings (no public court owner interface)
- **Single Page:** Directory list with filtering - no additional pages/workflows
- **Regional Focus:** Specifically targeting Negros region courts

### Business Strategy
- **Directory-Only Entry:** Comprehensive directory as the SOLE public-facing entry point
- **Market Penetration:** Get all Negros courts listed for definitive regional coverage
- **Trust Building:** Directory provides immediate value, booking system offers enhanced services
- **Competitive Advantage:** Become the definitive source for Negros court information
- **User Journey:** Directory Discovery → Direct Booking (integrated courts) OR External Contact → Optional Booking System Integration

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
- **Authentication:** User management, verification, roles
- **Court:** Court entities, pricing, slot management, time conversions  
- **Customer:** Customer entity and creation workflows
- **Facility:** Facility entity and location management
- **MediaLibrary:** Media type management
- **Reservation:** Booking lifecycle, fees, status management
- **Directory:** Free court listings for Negros region (no reservations)

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

#### `/resources/` - Frontend Layer (Layered Architecture)  
**Purpose:** User interface organized by user context and domain concerns  
**Structure:** Domain and user-type separation
- Domain-specific pages: `customer/`, `directory/`, `facility/`
- Domain-specific components: `customer/`, `directory/`, `facility/`, `shared/`
- Domain-specific models: organized by domain and user context

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
- **Directory-Only Entry Strategy:** Free comprehensive directory as the sole public entry point
- **No Booking Home Page:** Eliminates standalone booking system discovery - all traffic flows through directory
- **Approval-based Reservations:** Ensures facility control over court usage (booking.lokalpikol.com)
- **Directory Sub-Application:** Maintains architectural separation while providing seamless booking integration
- **Token-based Listing Registration:** Secure, time-limited onboarding without account requirements
- **Flexible Booking Integration:** Courts can use Lokal Pikol booking or maintain external booking systems

### Technical Decisions
- **UUID Primary Keys:** All entities use UUIDs for security and distributed system compatibility
- **Actions + DTOs:** Standardized pattern for business operations with strong typing
- **Domain-based Routing:** Separate subdomains for directory (primary) and booking (upsell) functionality
- **Directory-Only Public Access:** No standalone booking home page - all discovery through directory
- **Polymorphic Reservations:** Both customers and facilities can make reservations

## Module Deep Dives

### Authentication Module
- **Location:** `/app/Source/Authentication/`
- **Key Actions:** `CreateUser` with DTO validation
- **Models:** `User` with role-based access (`UserRoles` enum)
- **Email:** `UserVerificationMail` for account verification
- **Database:** Custom user factory and seeding

### Court Module  
- **Location:** `/app/Source/Court/`
- **Key Actions:** 
  - `CreateCourt`, `CreateCourtPricing` for court management
  - `RangeToSlot`/`SlotsToRange` for time slot conversions
  - Block booking management (planned)
- **Models:** 
  - `Court`: Basic court entity with media support
  - `CourtPricing`: Time-based pricing ranges with consecutive validation
  - `BlockBooking`: Recurring court availability blocks (NEW)
- **DTOs:** `CourtSlot` for frontend time slot representation
- **Business Logic:** 
  - Time slot management and pricing calculations
  - Consecutive pricing range enforcement (no gaps allowed)
  - Court slot ↔ time range conversions for UI/backend translation
  - **Block booking availability**: Recurring schedule management for open plays/events
- **Pricing Constraints:**
  - All pricing ranges must be consecutive
  - Coverage required for all operating hours
  - Fixed price per time range (e.g., 100 pesos for 07:00-11:00)
- **Block Booking Constraints:**
  - Single day per record (0=Sunday, 1=Monday, etc.)
  - Time-based blocking (start_time, end_time) 
  - Multiple records needed for multi-day blocks
  - Affects court slot availability calculations

### Customer Module
- **Location:** `/app/Source/Customer/`
- **Key Actions:** `CreateCustomer` with DTO pattern
- **Models:** `Customer` entity
- **Integration:** Links to reservation and authentication systems

### Facility Module
- **Location:** `/app/Source/Facility/`
- **Models:** `Facility` entity with location management
- **Enums:** `CityEnum` for supported locations
- **Database:** Factory and seeding support

### Reservation Module (Core Business Domain)
- **Location:** `/app/Source/Reservation/`
- **Key Actions:**
  - `CreateReservation` - Booking initiation
  - `ConfirmReservation` - Approval workflow
  - `CancelReservation` - Cancellation handling  
  - `SetReservationFees` - Fee calculation
- **Models:** `Reservation`, `ReservationFee`
- **Enums:** `ReservationStatusEnum`, `ReservationFeeItemsEnum`
- **Communications:** `ReservationPendingMail`, `ReservationPendingNotification`
- **Business Logic:** Multi-step approval workflow with fee calculation

### MediaLibrary Module
- **Location:** `/app/Source/MediaLibrary/`
- **Enums:** `MediaTypeEnum` for categorizing media assets
- **Integration:** Likely Spatie Media Library integration

### Directory Module (Negros Court Directory)
- **Location:** `/app/Source/Directory/` (planned)
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
  - Lead generation for main application upselling
  - Regional market penetration strategy
- **Access Patterns:**
  - **Backend Admin:** Manage court listings via admin interface
  - **Public Users:** Open browsing with city-based filtering
  - **No Reservations:** Pure directory functionality, no booking workflows
- **Integration Points:**
  - "Book Court" button integration:
    - Routes to `booking.lokalpikol.com/facility/{slug}` (integrated courts)
    - Routes to external booking URL (non-integrated courts)
  - Listing model has optional reference to Facility for seamless booking integration
  - Social media and external booking URL support
  - Maintains separation between directory (sole entry) and booking (upsell) systems
  - **No Booking Home Page:** All booking discovery happens through directory listings

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
- **Trust Building:** Facilities see value before being asked for paid adoption
- **Low Friction:** Simple one-time registration process
- **Market Coverage:** Comprehensive directory drives player engagement
- **Conversion Funnel:** Directory → Interest → Full platform adoption

## Performance Considerations

*To be documented as requirements emerge*

## Critical Validation Rules

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
```typescript
// Component organization by user type
components/
├── directory/       # Directory-facing components (PRIMARY)
├── booking/         # Booking subdomain components
├── facility/        # Facility-facing components  
└── shared/         # Cross-domain components

// Page organization by user type  
pages/
├── directory/       # Directory user flows (PRIMARY)
├── booking/         # Booking subdomain pages
└── facility/        # Facility user flows
```

### Enum Usage Patterns
- **Status Management:** `ReservationStatusEnum` for workflow states. The enum includes:
  - `ON_HOLD`: Temporary hold (10 minutes) when a customer initiates a reservation. Blocks the slot for others. If not confirmed in time, the reservation is deleted by a cron worker or scheduler (not marked as cancelled).
  - `PENDING`: Awaiting facility approval. Blocks the slot for others.
  - `CONFIRMED`: Approved reservation. Blocks the slot for others.
  - `CANCELLED`: Explicit user or facility action to cancel a reservation. Slot becomes available. Not used for expired holds.
- **Business Values:** `ReservationFeeItemsEnum` for fee categorization  
- **System Configuration:** `CityEnum`, `MediaTypeEnum`, `UserRoles`

### Database Integration Patterns
- **Domain Factories:** Each domain contains its own model factories
- **Domain Seeders:** Self-contained test data per domain
- **Migration Organization:** Timestamped migrations in `/database/migrations/`

## Integration Points

### Email System
- Reservation lifecycle notifications
- User account management communications

### Directory Integration (Primary Application)
- **Sole Entry Point:** Directory is the only public discovery method - no booking system home page
- **Lead Generation:** Directory listings drive all interest in full reservation platform  
- **Cross-Promotion:** Integrated courts get enhanced directory listings with direct booking links
- **Upsell Messaging:** Non-integrated courts see benefits of upgrading to integrated booking
- **Shared Media Library:** Directory courts use same media management system
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

## Future Considerations

*To be documented as roadmap becomes clear*

---

*This document serves as a living reference for development context. Update as architectural decisions are made and business logic is discovered.*
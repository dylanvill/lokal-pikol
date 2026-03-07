# Lokal Pikol - Copilot Context

**Last Updated:** February 25, 2026

## Domain Overview

**Application Name:** Lokal Pikol  
**Purpose:** A pickleball court reservation system designed specifically for local communities ("lokals")  
**Core Business:** Connecting pickleball players with court facilities through a streamlined reservation platform

### User Types & Roles

#### 1. Customer (Player/Renter)
- **Primary Actions:**
  - Browse facility courts and availability
  - Book court reservations
  - Account creation and management
  - Browse Negros directory (no account required)
- **Requirements:** Must create account before booking reservations

#### 2. Facility (Court Owner/Manager)  
- **Primary Actions:**
  - Add and edit court information
  - Approve/manage reservation requests
  - View calendar of activities and bookings
  - Self-book courts for facility use
- **Management Role:** Controls court availability and reservation approval

### Key Features
- Court browsing and availability viewing
- Reservation booking system with approval workflow
- **Block booking system** for recurring court schedules (open plays, events)
- Calendar management for facilities
- Email notifications system
- Account management for both user types
- **Negros Directory Sub-Application** - Free directory listing for all pickleball courts in Negros region

## Technical Stack

- **Backend Framework:** Laravel
- **Frontend Framework:** InertiaJS
- **Architecture Pattern:** Full-stack monolith with SPA-like experience

## Negros Directory Sub-Application

### Overview
**Purpose:** A free directory listing of all pickleball courts in the Negros region  
**Business Model:** Lead generation and upselling opportunity for main reservation system  
**Access Control:** Backend-managed by administrators (no public court owner interface)  
**Domain:** `find.lokalpikol.com` - Discovery-focused branding for comprehensive court listings

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
- **Players:** Browse directory with city-based filtering (no account required)
- **Upsell Flow:** Directory listings highlight benefits of upgrading to full reservation system

### Technical Implementation
- **Separate Model:** New model for directory courts (distinct from main `Facility` model)
- **No Reservations:** Pure directory functionality, no booking capabilities within directory
- **Backend Management:** Admin-managed court listings (no public court owner interface)
- **Single Page:** Directory list with filtering - no additional pages/workflows
- **Regional Focus:** Specifically targeting Negros region courts

### Business Strategy
- **Market Penetration:** Get all Negros courts listed for comprehensive directory
- **Trust Building:** Provide value before asking for paid adoption
- **Competitive Advantage:** Become the definitive source for Negros court information
- **Conversion Funnel:** Directory → Interest → Full platform adoption

## Architecture & Patterns

### Domain-Driven Design (DDD) Approach

**Primary Philosophy:** Domain-focused organization with clear separation of concerns

#### `/app/Source/` - Core Domain Layer
**Purpose:** Contains pure business logic and domain models  
**Structure Pattern:**
```
Domain/
├── Actions/          # Business use cases and operations
├── Database/         # Domain-specific factories & seeders
├── Enums/           # Domain constants and value objects
├── Models/          # Domain entities
├── Mail/            # Domain-specific email templates
├── Notifications/   # Domain-specific notifications
└── ...              # Other domain concerns
```

**Active Domains:**
- **Authentication:** User management, verification, roles
- **Court:** Court entities, pricing, slot management, time conversions  
- **Customer:** Customer entity and creation workflows
- **Facility:** Facility entity and location management
- **MediaLibrary:** Media type management
- **Reservation:** Booking lifecycle, fees, status management
- **Directory:** Free court listings for Negros region (no reservations)

#### `/app/Http/` - HTTP Abstraction Layer
**Purpose:** HTTP-level concerns while maintaining domain separation  
**Pattern:** Domain-organized controllers and resources
```
Http/
├── Controllers/     # Base controllers
├── Customer/        # Customer-facing HTTP endpoints
├── Facility/        # Facility-facing HTTP endpoints  
├── Enums/          # HTTP-level enums (Guards, etc.)
├── Middleware/     # Request/response middleware
└── Shared/         # Cross-domain HTTP resources
```

#### `/resources/` - Frontend Layer  
**Status:** Transitioning to DDD (not fully refactored)  
**Current Structure:** Mixed traditional + domain organization
- Domain-specific pages: `customer/`, `facility/`
- Domain-specific components: `customer/`, `facility/`, `shared/`
- Domain-specific models: organized by domain context

### Key Architectural Decisions

#### Actions Pattern
- **Purpose:** Encapsulate business operations as discrete, reusable units
- **Usage:** Cross-system business logic (e.g., `CreateReservation`, `ConfirmReservation`)
- **Benefits:** Testable, composable, single responsibility

#### DTO Pattern  
- **Implementation:** Data Transfer Objects for action inputs
- **Examples:** `CreateReservationData`, `CreateCourtData`
- **Benefits:** Type safety, validation boundaries, clear contracts

#### Dual User Type Architecture
- **HTTP Layer:** Separate controller namespaces for `Customer/` and `Facility/`
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

1. **Clear Domain Boundaries:** Each domain is well-encapsulated with its own concerns
2. **Actions Pattern:** Business logic is extracted into reusable, testable units
3. **DTO Pattern:** Strong input validation and type safety
4. **Dual User Context:** Clean separation between customer and facility workflows
5. **Domain-Specific HTTP:** Controllers organized by domain and user type
6. **Consistent Structure:** Predictable folder patterns across domains

### ⚠️ Areas for Consideration

1. **Database Concerns in Domains:** Factories/seeders in domain modules
   - **Current:** `/app/Source/{Domain}/Database/`
   - **Consideration:** Typically kept separate, but may be intentional for domain encapsulation
   - **Trade-off:** Better domain cohesion vs. traditional Laravel structure

2. **Shared HTTP Resources:** `/app/Http/Shared/Resources/`
   - **Observation:** Indicates cross-cutting concerns
   - **Consideration:** May benefit from explicit shared domain or service layer

3. **Incomplete MediaLibrary Domain:** Only contains Enums
   - **Observation:** Minimal domain with full directory structure
   - **Consideration:** May indicate future expansion or could be merged

4. **Frontend DDD Migration:** In-progress refactoring
   - **Current State:** Mixed traditional + domain organization
   - **Goal:** Full domain separation (acknowledged work in progress)

### 🎯 Architecture Strengths

- **Business Logic Clarity:** Actions make use cases explicit
- **Testability:** Domain isolation enables focused testing
- **Scalability:** New domains can be added without existing code changes  
- **User Context Separation:** Clear customer vs facility workflows

## Important Decisions & Rationale

### Tech Stack Choices
- **Laravel + InertiaJS:** Provides traditional backend architecture with modern SPA experience
- **Approval-based reservations:** Ensures facility control over court usage

### Domain Organization
- **Source-based modules:** Clean separation of business domains
- **Dual user types:** Separate concerns for customer vs facility workflows

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
  - `CreateDirectoryCourt`, `UpdateDirectoryCourt` for court listings
  - `ListDirectoryCourts` with city filtering
- **Models:** `DirectoryCourt` entity (separate from Facility)
- **Key Features:**
  - **Backend Management:** Admin-managed court listings
  - **Media Support:** Cover photo, profile photo via Spatie Media Library
  - **Public Directory:** No authentication required for browsing
  - **City Filtering:** Filter courts by Negros cities
  - **Integration Status:** Track which courts use main reservation system
- **Business Model:** 
  - Free directory listings (no fees)
  - Lead generation for main application upselling
  - Regional market penetration strategy
- **Access Patterns:**
  - **Backend Admin:** Manage court listings via admin interface
  - **Public Users:** Open browsing with city-based filtering
  - **No Reservations:** Pure directory functionality, no booking workflows
- **Integration Points:**
  - Links to main application for integrated courts
  - Upsell messaging for non-integrated courts
  - Social media and external booking URL support

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
Customer/
├── Auth/Controllers/         # Customer authentication
├── Court/Resources/          # Customer court views
├── Facility/Controllers/     # Customer facility interactions  
└── Reservation/Controllers/  # Customer reservation management
```

### Frontend Domain Patterns
```typescript
// Component organization by user type
components/
├── customer/        # Customer-facing components
├── facility/        # Facility-facing components  
└── shared/         # Cross-domain components

// Page organization by user type  
pages/
├── customer/       # Customer user flows
└── facility/       # Facility user flows
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

### Directory Sub-Application Integration
- **Lead Generation:** Directory listings drive interest in full reservation platform
- **Cross-Promotion:** Integrated courts get enhanced directory listings
- **Upsell Messaging:** Non-integrated courts see benefits of upgrading
- **Shared Media Library:** Directory courts use same media management system
- **Regional Strategy:** Negros directory as market entry point

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
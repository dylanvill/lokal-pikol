# Lokal Pikol - Copilot Context

**Last Updated:** February 20, 2026

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
- **Requirements:** Must create account before booking

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
- Calendar management for facilities
- Email notifications system
- Account management for both user types

## Technical Stack

- **Backend Framework:** Laravel
- **Frontend Framework:** InertiaJS
- **Architecture Pattern:** Full-stack monolith with SPA-like experience

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

### Reservation Workflow
- Customer browses available courts
- Customer initiates booking request
- Facility must approve reservation requests (approval-based system)
- Email notifications sent during reservation lifecycle

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
- **Models:** `Court`, `CourtPricing` with complex pricing logic
- **Business Logic:** Time slot management and pricing calculations

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

## Performance Considerations

*To be documented as requirements emerge*

## Security Requirements

*To be documented as patterns are established*

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
- **Status Management:** `ReservationStatusEnum` for workflow states
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

### Database Schema
- **Key Tables:** facilities, courts, customers, reservations, court_pricings, reservation_fees
- **Media Integration:** Spatie Media Library integration evident

## Future Considerations

*To be documented as roadmap becomes clear*

---

*This document serves as a living reference for development context. Update as architectural decisions are made and business logic is discovered.*
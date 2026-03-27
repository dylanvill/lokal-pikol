# Booking System Refactor Context

**Date:** March 27, 2026
**Purpose:** Track refactoring to implement directory-only entry model with booking.lokalpikol.com subdomain

## Refactoring Overview

This refactor implements the architectural shift where:
- Directory becomes the sole public entry point
- No standalone booking home page  
- "Book Court" buttons redirect to `booking.lokalpikol.com/facility/{slug}` for integrated courts
- External booking URLs for non-integrated courts

### Clean Slate Approach
- **Source Structure**: Moved existing booking system code to `/app/Source/Backup/` directory
- **Current Active**: Only Directory and MediaLibrary domains remain in main `/app/Source/` 
- **Reference Code**: Previous booking system (Authentication, Court, Customer, Facility, Reservation) preserved in Backup for reference
- **Fresh Start**: Building new booking system architecture from scratch while maintaining proven patterns

## Refactor Analysis & Findings

### Directory HTTP Dependency Audit Results
**Status**: ✅ COMPLETED  
**Total External Dependencies**: 5 found across 4 files

#### Severity Breakdown:
- **🔴 CRITICAL (2)**: `CityEnum` dependency on Facility domain blocks Directory independence
- **🟡 MODERATE (2)**: Shared domain dependencies for resources and social links  
- **🟢 MINOR (1)**: MediaLibrary enum dependency (acceptable cross-cutting concern)
- **🧹 CLEANUP (1)**: Unused import to remove

#### Files Requiring Refactor:
- `CreateListingRequest.php` - CityEnum dependency
- `ListingRequest.php` - CityEnum dependency  
- `CreateListingController.php` - SocialLinkEnum dependency
- `ListingResource.php` - LinkResource, unused PhotoResource, MediaConversionEnum

#### Clean Files (No External Dependencies):
- `ListingLegalController.php` ✅
- `ShowCreateListingRequest.php` ✅
- `DirectoryInertiaTemplateMiddleware.php` ✅
- `ListingController.php` ✅

## Domain-Based Refactor Tasks

### Reference Material Available in Backup
**Location**: `/app/Source/Backup/`
- **Authentication Domain**: User management, OAuth, verification system
- **Court Domain**: Court entities, pricing, block bookings, availability logic  
- **Customer Domain**: Customer entity and creation workflows
- **Facility Domain**: Facility management, onboarding tokens, policies
- **Reservation Domain**: Full booking lifecycle, fees, status management, notifications
- **Shared Domain**: Common traits, contracts, rules

### Active Domains (Clean Implementation)

### Facility Domain

#### Database & Models
- [ ] Add a slug to the facility tables

#### Controllers & Routes
- [ ] TBD

#### Business Logic
- [ ] Create function to create facility out of directory listing

### Directory Domain

#### Directory HTTP Dependency Audit (COMPLETED)
**External Dependencies Found:**
- **CRITICAL**: `CityEnum` coupling to Facility domain (2 files)
- **MODERATE**: `LinkResource` coupling to Shared HTTP domain (1 file)  
- **MODERATE**: `SocialLinkEnum` coupling to Shared Source domain (1 file)
- **MINOR**: `MediaConversionEnum` coupling to MediaLibrary domain (1 file)
- **CLEANUP**: Unused `PhotoResource` import (1 file)

#### Database & Models
- [ ] TBD

#### Controllers & Routes
- [ ] Remove external domain coupling from Directory HTTP layer
- [ ] Create Directory-specific CityEnum to break Facility dependency
- [ ] Remove unused PhotoResource import from ListingResource
- [ ] Consider Directory-specific social link handling

#### Business Logic
- [ ] TBD

### Booking Domain

#### Database & Models
- [ ] TBD

#### Controllers & Routes
- [ ] TBD

#### Business Logic
- [ ] TBD

### Customer/Authentication Domain

#### Database & Models
- [ ] TBD

#### Controllers & Routes
- [ ] TBD

#### Business Logic
- [ ] TBD

### Court Domain

#### Database & Models
- [ ] TBD

#### Controllers & Routes
- [ ] TBD

#### Business Logic
- [ ] TBD

### Reservation Domain

#### Database & Models
- [ ] TBD

#### Controllers & Routes
- [ ] TBD

#### Business Logic
- [ ] TBD

## Infrastructure Changes

### Routing & Subdomains
- [ ] TBD

### Frontend Structure
- [ ] TBD

### Configuration
- [ ] TBD

## Testing Strategy
- [ ] TBD

## Deployment Considerations
- [ ] TBD

## Progress Tracking

### Completed Tasks
- None yet

### In Progress Tasks
- None yet

### Blocked Tasks
- None yet

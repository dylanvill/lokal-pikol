# Booking System Refactor Context

**Date:** March 27, 2026
**Purpose:** Track refactoring to implement directory-only entry model with booking.lokalpikol.com subdomain

## Refactoring Overview

This refactor implements the architectural shift where:
- Directory becomes the sole public entry point
- No standalone booking home page  
- "Book Court" buttons redirect to `booking.lokalpikol.com/facility/{slug}` for integrated courts
- External booking URLs for non-integrated courts

## Domain-Based Refactor Tasks

### Facility Domain

#### Database & Models
- [ ] Add a slug to the facility tables

#### Controllers & Routes
- [ ] TBD

#### Business Logic
- [ ] Create function to create facility out of directory listing

### Directory Domain

#### Database & Models
- [ ] TBD

#### Controllers & Routes
- [ ] TBD

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

# Analytics Module

A generic, domain-agnostic module for recording trackable events against any Eloquent model.

## Architecture

```
Analytics/
├── Actions/
│   └── AddEntry.php          # Persists an analytics entry
├── Contracts/
│   └── AnalyticsEntry.php    # Interface any domain DTO must implement
└── Models/
    └── Analytics.php         # Eloquent model backed by the `analytics` table
```

## Core Concepts

### `AnalyticsEntry` Contract

Any data object passed to this module must implement `App\Source\Analytics\Contracts\AnalyticsEntry`:

| Method | Return type | Purpose |
|---|---|---|
| `getTrackableType()` | `?string` | Morph class of the subject model (e.g. `"listing"`) |
| `getTrackableId()` | `?int` | Primary key of the subject model |
| `getEvent()` | `string` | Human-readable event label (e.g. `"facebook clicked"`) |
| `getDomain()` | `string` | Owning domain (e.g. `"directory"`) |
| `getMetadata()` | `?array` | Optional arbitrary payload |

### `AddEntry` Action

`App\Source\Analytics\Actions\AddEntry::add(AnalyticsEntry $entry): Analytics`

Accepts any `AnalyticsEntry` DTO and writes a row to the `analytics` table. Returns the saved `Analytics` model.

### `Analytics` Model

Polymorphic Eloquent model stored in the `analytics` table.

| Column | Type | Notes |
|---|---|---|
| `id` | int | Auto-increment PK |
| `uuid` | string | Auto-generated via `HasUuid` |
| `trackable_type` | string\|null | Morph map class |
| `trackable_id` | int\|null | FK to the tracked model |
| `event` | string | Event label |
| `domain` | string | Originating domain |
| `metadata` | array\|null | Cast to/from JSON |
| `created_at` | datetime | — |
| `updated_at` | datetime | — |

Access the subject model via the `trackable` morph relation:

```php
$analytics->trackable; // returns the related Eloquent model
```

---

## Usage Pattern

The intended integration pattern is **event + queued listener**. The domain dispatches a Laravel event carrying its DTO; a listener calls `AddEntry`. This keeps the Analytics module decoupled from domain code.

```
Domain Action
    └─ dispatches Event (carries AnalyticsEntry DTO)
            └─ queued Listener
                    └─ calls AddEntry::add()
                            └─ writes Analytics row
```

---

## Reference Implementation — Directory Domain

The Directory domain tracks listing interactions using this pattern.

### 1. DTO — `ListingAnalyticsData`

`App\Source\Directory\Actions\TrackListingAnalytics\Dtos\ListingAnalyticsData`

Implements `AnalyticsEntry` for a `Listing` model:

```php
new ListingAnalyticsData($listing, $event->value);
```

| Method | Returns |
|---|---|
| `getTrackableType()` | `$listing->getMorphClass()` |
| `getTrackableId()` | `$listing->getKey()` |
| `getEvent()` | The enum value string (e.g. `"facebook clicked"`) |
| `getDomain()` | `"directory"` |
| `getMetadata()` | `null` |

### 2. Event enum — `ListingEventEnum`

`App\Source\Directory\Enums\ListingEventEnum`

Defines the set of trackable listing interactions:

| Case | Value |
|---|---|
| `FACEBOOK_CLICKED` | `"facebook clicked"` |
| `INSTAGRAM_CLICKED` | `"instagram clicked"` |
| `BOOK_COURT_CLICKED` | `"book court clicked"` |

### 3. Domain action — `TrackListingAnalytics`

`App\Source\Directory\Actions\TrackListingAnalytics\TrackListingAnalytics`

Entry point called by controllers or other domain actions:

```php
$this->trackListingAnalytics->track($listing, ListingEventEnum::FACEBOOK_CLICKED);
```

Internally constructs the DTO and dispatches `ListingClicked`.

### 4. Event — `ListingClicked`

`App\Source\Directory\Events\ListingClicked`

Carries `ListingAnalyticsData` as its public `$data` property. Dispatched via `Dispatchable`.

### 5. Listener — `TrackListingClicked`

`App\Source\Directory\Listeners\TrackListingClicked`

Implements `ShouldQueue` (runs asynchronously). Receives the `ListingClicked` event and delegates to `AddEntry::add($event->data)`.

---

## Adding Analytics to a New Domain

1. **Create a DTO** that implements `AnalyticsEntry`. Set `getDomain()` to your domain's identifier and return `null` from `getMetadata()` unless you need extra context.
2. **Define an event enum** (optional but recommended) to enumerate valid event strings.
3. **Create a domain action** that constructs the DTO and dispatches an event.
4. **Create a queued listener** that calls `AddEntry::add()` with the DTO from the event payload.
5. **Register the event/listener pair** in your `EventServiceProvider`.
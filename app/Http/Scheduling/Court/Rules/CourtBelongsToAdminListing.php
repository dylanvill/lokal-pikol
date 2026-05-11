<?php

namespace App\Http\Scheduling\Court\Rules;

use App\Http\Shared\Enums\GuardEnum;
use App\Source\Scheduling\Court\Models\Court;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Auth;

class CourtBelongsToAdminListing implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $listingId = Auth::guard(GuardEnum::FACILITY->value)->user()->facilityAdmin->listing_id;

        $court = Court::where('uuid', $value)->first();

        if ($court === null || $court->listing_id !== $listingId) {
            $fail('The selected court does not belong to your facility.');
        }
    }
}

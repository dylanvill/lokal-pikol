<?php

namespace App\Http\Scheduling\Profile\Requests;

use App\Http\Scheduling\Profile\Rules\NoConflictingHoursRule;
use App\Http\Shared\Enums\GuardEnum;
use App\Source\Authentication\Models\User;
use App\Source\Directory\Models\Listing;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

/**
 * @property string $openingTime
 * @property string $closingTime
 */
class UpdateFacilityHoursRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $listing = $this->authenticatedListing();

        return [
            'openingTime' => [
                'required',
                'date_format:H:i',
                new NoConflictingHoursRule($listing, NoConflictingHoursRule::BOUNDARY_OPENING),
            ],
            'closingTime' => [
                'required',
                'date_format:H:i',
                'after:openingTime',
                new NoConflictingHoursRule($listing, NoConflictingHoursRule::BOUNDARY_CLOSING),
            ],
        ];
    }

    private function authenticatedListing(): Listing
    {
        /** @var User $user */
        $user = Auth::guard(GuardEnum::FACILITY->value)->user();

        return $user->facilityAdmin->listing;
    }
}

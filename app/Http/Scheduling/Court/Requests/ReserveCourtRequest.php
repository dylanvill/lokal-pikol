<?php

namespace App\Http\Scheduling\Court\Requests;

use App\Http\Shared\Enums\GuardEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

/**
 * @property string $court_id
 * @property string $reservation_name
 * @property string $date
 * @property string $start_time
 * @property string $end_time
 */
class ReserveCourtRequest extends FormRequest
{
    public function authorize(): bool
    {
        $adminListingId = Auth::guard(GuardEnum::FACILITY->value)->user()->facilityAdmin->listing_id;

        return $this->route('court')->listing_id === $adminListingId;
    }

    public function rules(): array
    {
        return [
            'courtId' => ['required', 'string', 'exists:courts,uuid'],
            'reservationName' => ['required', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
            'date' => ['required', 'date_format:Y-m-d'],
            'startTime' => ['required', 'date_format:H:i'],
            'endTime' => ['required', 'date_format:H:i', 'after:start_time'],
        ];
    }
}

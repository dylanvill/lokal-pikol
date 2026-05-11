<?php

namespace App\Http\Scheduling\Court\Requests;

use App\Http\Shared\Enums\GuardEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class DeleteReservationRequest extends FormRequest
{
    public function authorize(): bool
    {
        $adminListingId = Auth::guard(GuardEnum::FACILITY->value)->user()->facilityAdmin->listing_id;

        return $this->route('reservation')->facility_id === $adminListingId;
    }

    public function rules(): array
    {
        return [];
    }
}

<?php

namespace App\Http\Scheduling\Court\Requests;

use App\Http\Shared\Enums\GuardEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

/**
 * @property string $name
 */
class UpdateCourtRequest extends FormRequest
{
    public function authorize(): bool
    {
        $adminListingId = Auth::guard(GuardEnum::FACILITY->value)->user()->facilityAdmin->listing_id;

        return $this->route('court')->listing_id === $adminListingId;
    }

    public function rules(): array
    {
        $court = $this->route('court');

        return [
            'name' => [
                'required',
                'string',
                'max:100',
                Rule::unique('courts', 'name')
                    ->where('listing_id', $court->listing_id)
                    ->whereNull('deleted_at')
                    ->ignore($court->id),
            ],
        ];
    }
}

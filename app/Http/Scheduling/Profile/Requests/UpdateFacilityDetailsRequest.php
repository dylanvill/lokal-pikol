<?php

namespace App\Http\Scheduling\Profile\Requests;

use App\Source\Shared\Enums\FacilityCourtTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * @property string $name
 * @property string $courtType
 * @property int $numberOfCourts
 * @property string|null $email
 * @property string|null $phone
 * @property string|null $googleMapsUrl
 * @property string|null $bookingUrl
 */
class UpdateFacilityDetailsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'courtType' => ['required', 'string', Rule::enum(FacilityCourtTypeEnum::class)],
            'numberOfCourts' => ['required', 'integer', 'min:1', 'max:10'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'digits:10', 'starts_with:9'],
            'googleMapsUrl' => ['nullable', 'url', 'max:255'],
            'bookingUrl' => ['nullable', 'url', 'max:255'],
        ];
    }
}

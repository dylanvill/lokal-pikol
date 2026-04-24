<?php

namespace App\Http\Directory\Requests;

use App\Source\Shared\Enums\FacilityCourtTypeEnum;
use App\Source\Shared\Enums\CityEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * @property string|null $city
 * @property string|null $courtType
 * @property int|null $numberOfCourts
 * @property string|null $sortBy
 */
class ListingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'sortBy' => ['nullable', 'string', Rule::in(['default', 'popularity', 'newest', 'oldest'])],
            'city' => ['nullable', 'string', Rule::enum(CityEnum::class)],
            'numberOfCourts' => ['nullable', 'integer', 'min:1'],
            'courtType' => ['nullable', 'string', Rule::enum(FacilityCourtTypeEnum::class)],
        ];
    }
}

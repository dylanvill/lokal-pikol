<?php

namespace App\Http\Directory\Requests;

use App\Source\Directory\Enums\ListingCourtTypeEnum;
use App\Source\Facility\Enums\CityEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * @property string $city
 * @property string $courtType
 * @property int $numberOfCourts
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
            'city' => ['nullable', 'string', Rule::enum(CityEnum::class)],
            'numberOfCourts' => ['nullable', 'integer', 'min:1'],
            'courtType' => ['nullable', 'string', Rule::enum(ListingCourtTypeEnum::class)],
        ];
    }
}

<?php

namespace App\Http\Customer\Facility\Requests;

use App\Source\Facility\Enums\CityEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * @property string $city
 * @property string $date
 * @property string $startTime
 * @property string $endTime
 */
class FacilitiesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
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
            "city" => ['nullable', Rule::enum(CityEnum::class)],
            "date" => ['nullable', 'date_format:Y-m-d', 'after_or_equal:today'],
            "startTime" => ['nullable', 'date_format:H:i'],
            "endTime" => ['nullable', 'date_format:H:i', 'after:startTime'],
        ];
    }
}

<?php

namespace App\Http\Customer\Facility\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property string $date
 */
class FacilityRequest extends FormRequest
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
            "date" => ['nullable', 'date_format:Y-m-d', 'after_or_equal:today'],
        ];
    }
}

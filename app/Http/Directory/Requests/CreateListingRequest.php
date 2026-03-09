<?php

namespace App\Http\Directory\Requests;

use App\Source\Facility\Enums\CityEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateListingRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', Rule::enum(CityEnum::class)],
            'address' => ['required', 'string', 'max:255'],
            'googleMapsUrl' => ['nullable', 'url', 'max:255'],
            'courtTypes' => ['required', 'string', 'max:255'],
            'numberOfCourts' => ['required', 'integer', 'min:1'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'digits:10', 'starts_with:9'],
            'openingTime' => ['nullable', 'date_format:H:i'],
            'closingTime' => ['nullable', 'date_format:H:i', 'after:openingTime'],
            'facebookPageUrl' => ['nullable', 'url', 'max:255'],
            'profilePhoto' => ['required', 'image', 'mimetypes:image/jpeg,image/png'],
            'coverPhoto' => ['required', 'image', 'mimetypes:image/jpeg,image/png']
        ];
    }
}

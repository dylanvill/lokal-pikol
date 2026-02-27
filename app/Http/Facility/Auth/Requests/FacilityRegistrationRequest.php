<?php

namespace App\Http\Facility\Auth\Requests;

use App\Source\Facility\Enums\CityEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

/**
 * @property string $d Hashed payload containing uuid, plain token, and email e.g. uuid:plainToken:email
 */
class FacilityRegistrationRequest extends FormRequest
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
            'address' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', Rule::enum(CityEnum::class)],
            'googleMapsUrl' => ['nullable', 'string', 'max:255'],
            'phone' => ['required', 'string', 'digits:10', 'starts_with:9'],
            'openingTime' => ['required', 'regex:/^\d{2}:\d{2}$/'],
            'closingTime' => ['required', 'regex:/^\d{2}:\d{2}$/', 'after:openingTime'],
            'description' => ['required', 'string'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:facilities,email'],
            'password' => ['required', 'string', 'confirmed', Password::min(8)->mixedCase()->letters()->numbers()->symbols()],
            'coverPhoto' => ['required', 'image', 'max:2048'],
            'profilePhoto' => ['required', 'image', 'max:2048'],
            'onboardingId' => ['required', 'string', 'exists:onboarding_tokens,uuid'],
        ];
    }
}

<?php

namespace App\Http\Facility\Auth\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property string $id Onboarding ID
 * @property string $lpt Plain text token
 */
class OnboardingRequest extends FormRequest
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
            'id' => ['required', 'string', 'uuid'],
            'lpt' => ['required', 'string'],
        ];
    }
}

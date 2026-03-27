<?php

namespace App\Http\Facility\Auth\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property string $d Hashed payload containing uuid, plain token, and email e.g. uuid:plainToken:email
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
            'd' => ['required', 'string'],
        ];
    }
}

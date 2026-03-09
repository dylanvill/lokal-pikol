<?php

namespace App\Http\Directory\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property string $uuid 
 * @property string $token
 */
class ShowCreateListingRequest extends FormRequest
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
            'uuid' => ['required', 'uuid'],
            'token' => ['required', 'string'],
        ];
    }
}

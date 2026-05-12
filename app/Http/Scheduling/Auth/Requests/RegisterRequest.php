<?php

namespace App\Http\Scheduling\Auth\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

/**
 * @property string $firstName
 * @property string $lastName
 * @property string $phoneNumber
 * @property string $password
 */
class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::guest();
    }

    public function rules(): array
    {
        return [
            'firstName' => ['required', 'string'],
            'lastName' => ['required', 'string'],
            'phoneNumber' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8'],
        ];
    }
}

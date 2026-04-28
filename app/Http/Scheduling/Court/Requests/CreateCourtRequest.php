<?php

namespace App\Http\Scheduling\Court\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property string $name
 */
class CreateCourtRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
        ];
    }
}

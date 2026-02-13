<?php

namespace App\Http\Customer\Reservation\Requests;

use App\Http\Enums\GuardEnum;
use Illuminate\Foundation\Http\FormRequest;

class ReserveCourtRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user(GuardEnum::CUSTOMER->value) !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [];
    }
}

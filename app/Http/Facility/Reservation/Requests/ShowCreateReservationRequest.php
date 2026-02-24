<?php

namespace App\Http\Facility\Reservation\Requests;

use App\Http\Enums\GuardEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

/**
 * @property string|null $date
 * @property string|null $search
 */
class ShowCreateReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::guard(GuardEnum::FACILITY->value)->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'date' => ['nullable', 'date_format:Y-m-d', 'after_or_equal:today'],
            'search' => ['nullable', 'string', 'max:255'],
        ];
    }
}

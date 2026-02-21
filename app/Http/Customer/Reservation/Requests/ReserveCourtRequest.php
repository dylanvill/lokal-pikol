<?php

namespace App\Http\Customer\Reservation\Requests;

use App\Http\Enums\GuardEnum;
use App\Source\Reservation\Rules\NoReservationOverlap;
use App\Source\Reservation\Rules\SlotMustBeInTheFuture;
use App\Source\Shared\Rules\ConsecutiveHours;
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
        return [
            "date" => ['required', 'date'],
            "slots" => ['required', 'array', 'min:1', new ConsecutiveHours(), new NoReservationOverlap(
                court: $this->route('court'),
                date: $this->input('date')
            )],
            "slots.*" => ['required', 'string', 'regex:/^\d{2}:\d{2}-\d{2}:\d{2}$/', new SlotMustBeInTheFuture(
                date: $this->input('date')
            )],
        ];
    }
}

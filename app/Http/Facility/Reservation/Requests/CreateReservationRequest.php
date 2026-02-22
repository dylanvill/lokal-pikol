<?php

namespace App\Http\Facility\Reservation\Requests;

use App\Source\Court\Models\Court;
use App\Source\Reservation\Rules\NoReservationOverlap;
use App\Source\Reservation\Rules\SlotMustBeInTheFuture;
use App\Source\Shared\Rules\ConsecutiveHours;
use Illuminate\Foundation\Http\FormRequest;

class CreateReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'date' => ['required', 'date', 'after_or_equal:today'],
            'courtId' => ['required', 'exists:courts,uuid'],
            "slots" => ['required', 'array', 'min:1', new ConsecutiveHours(), new NoReservationOverlap(
                court: Court::find($this->input('courtId')),
                date: $this->input('date')
            )],
            "slots.*" => ['required', 'string', 'regex:/^\d{2}:\d{2}-\d{2}:\d{2}$/', new SlotMustBeInTheFuture(
                date: $this->input('date')
            )],
        ];
    }
}

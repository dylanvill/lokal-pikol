<?php

namespace App\Http\Scheduling\Court\Requests;

use App\Http\Shared\Enums\GuardEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateBlockReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check(GuardEnum::FACILITY->value);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'courtId'      => ['required', 'exists:courts,uuid'],
            'name'         => ['required', 'string'],
            'dayOfTheWeek' => ['required', 'string', 'in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday'],
            'startTime'    => ['required', 'date_format:H:i'],
            'endTime'      => ['required', 'date_format:H:i', 'after:startTime'],
        ];
    }
}

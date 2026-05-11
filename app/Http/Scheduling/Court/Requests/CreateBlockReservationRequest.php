<?php

namespace App\Http\Scheduling\Court\Requests;

use App\Http\Scheduling\Court\Rules\CourtBelongsToAdminListing;
use App\Http\Shared\Enums\GuardEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

/**
 * @property-read array<string> $courtIds
 * @property-read string $name
 * @property-read array<string> $daysOfTheWeek
 * @property-read string $startTime
 * @property-read string $endTime
 */
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
            'courtIds' => ['required', 'array'],
            'courtIds.*' => ['required', 'exists:courts,uuid', new CourtBelongsToAdminListing],
            'name' => ['required', 'string'],
            'daysOfTheWeek' => ['required', 'array'],
            'daysOfTheWeek.*' => ['required', 'string', 'in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday'],
            'startTime' => ['required', 'date_format:H:i'],
            'endTime' => ['required', 'date_format:H:i', 'after:startTime'],
        ];
    }
}

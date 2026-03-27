<?php

namespace App\Http\Facility\Court\Requests;

use App\Http\Enums\GuardEnum;
use App\Source\Court\Enums\BlockBookingDaysEnum;
use App\Source\Court\Rules\NoExistingBlockBooking;
use App\Source\Shared\Rules\ConsecutiveHours;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * @property string $date;
 */
class CreateBlockBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user(GuardEnum::FACILITY->value) !== null;
    }

    public function rules(): array
    {
        return [
            "name" => ["required", "string", "max:50"],
            "dayOfTheWeek" => ["required", Rule::enum(BlockBookingDaysEnum::class)],
            "slots" => ["required", "array", "min:1", new ConsecutiveHours(), new NoExistingBlockBooking($this->route('court'), BlockBookingDaysEnum::from($this->input('dayOfTheWeek')))],
            "slots.*" => ["required", "string"],
        ];
    }
}

<?php

namespace App\Http\Facility\Court\Requests;

use App\Http\Enums\GuardEnum;
use App\Source\Court\Enums\BlockBookingDaysEnum;
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
            "dayOfTheWeek" => ["nullable", Rule::enum(BlockBookingDaysEnum::class)],
        ];
    }
}

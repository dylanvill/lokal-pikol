<?php

namespace App\Http\Facility\Court\Requests;

use App\Http\Enums\GuardEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\UploadedFile;

/**
 * @property string $date;
 */
class CourtCalendarRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user(GuardEnum::FACILITY->value) !== null;
    }

    public function rules(): array
    {
        return [
            "date" => ["nullable", "date_format:Y-m-d"]
        ];
    }
}

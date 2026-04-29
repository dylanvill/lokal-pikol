<?php

namespace App\Http\Scheduling\Court\Requests;

use App\Http\Shared\Enums\GuardEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

/**
 * @property string $date
 */
class CourtsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check(GuardEnum::FACILITY->value);
    }

    public function rules(): array
    {
        return [
            'date' => ['nullable', 'date_format:Y-m-d'],
        ];
    }
}

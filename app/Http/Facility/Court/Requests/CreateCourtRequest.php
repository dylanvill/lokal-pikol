<?php

namespace App\Http\Facility\Court\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\Validator;

/**
 * @property string $name;
 * @property string $type;
 * @property UploadedFile[] $photos;
 * @property string[] $startTime;
 * @property string[] $endTime;
 * @property float[] $rate;
 */
class CreateCourtRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user('facility') !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ["required", "string", "max:255"],
            "type" => ["required", "string", "in:indoor,outdoor"],
            "photos" => ["required", "array"],
            "photos.*" => ["file", "image"],
            "startTime.*" => ["required", "date_format:H:i"],
            "endTime.*" => ["required", "date_format:H:i"],
            "rate.*" => ["required", "numeric", "min:1"],
        ];
    }

    public function messages()
    {
        return [
            "startTime.*.required" => "Start time is required for each time slot.",
            "startTime.*.date_format" => "Start time must be in the format HH:mm.",
            "endTime.*.required" => "End time is required for each time slot.",
            "endTime.*.date_format" => "End time must be in the format HH:mm.",
            "rate.*.required" => "Rate is required for each time slot.",
            "rate.*.numeric" => "Rate must be a number.",
            "rate.*.min" => "Rate must be at least 1.",
        ];
    }

    public function after(): array
    {

        return [
            function (Validator $validator) {}
        ];
    }
}

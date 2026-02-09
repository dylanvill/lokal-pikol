<?php

namespace App\Http\Facility\Court\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\UploadedFile;

/**
 * @property string $name;
 * @property string $type;
 * @property UploadedFile[] $photos;
 * @property string[] $slots;
 */
class CreateCourtRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
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
            "photos" => ["nullable", "array"],
            "photos.*" => ["file", "image"],
            "slots" => ["required", "array"],
            "slots.*.time" => ["required", "date_format:H:i"],
            "slots.*.rate" => ["required", "numeric", "min:1"],
        ];
    }

    public function messages()
    {
        return [
            "slots.*.rate.required" => "The rate for each selected slot is required.",
            "slots" => "At least one time slot must be selected.",
        ];
    }
}

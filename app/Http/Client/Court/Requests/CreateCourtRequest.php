<?php

namespace App\Http\Client\Court\Requests;

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
            "slots.*" => ["required", "date_format:H:i"],
        ];
    }
}

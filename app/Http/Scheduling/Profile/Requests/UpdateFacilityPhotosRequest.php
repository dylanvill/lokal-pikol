<?php

namespace App\Http\Scheduling\Profile\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property \Illuminate\Http\UploadedFile|null $profilePhoto
 * @property \Illuminate\Http\UploadedFile|null $coverPhoto
 */
class UpdateFacilityPhotosRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'profilePhoto' => ['nullable', 'image', 'mimetypes:image/jpeg,image/png'],
            'coverPhoto' => ['nullable', 'image', 'mimetypes:image/jpeg,image/png'],
        ];
    }
}

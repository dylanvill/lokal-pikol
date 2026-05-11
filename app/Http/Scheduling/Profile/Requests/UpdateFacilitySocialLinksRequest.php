<?php

namespace App\Http\Scheduling\Profile\Requests;

use App\Source\Shared\Enums\SocialLinkEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * @property array<int, array{platform: string, url: string|null}> $socialLinks
 */
class UpdateFacilitySocialLinksRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'socialLinks' => ['required', 'array'],
            'socialLinks.*.platform' => ['required', 'string', Rule::enum(SocialLinkEnum::class)],
            'socialLinks.*.url' => ['nullable', 'url', 'max:255'],
        ];
    }
}

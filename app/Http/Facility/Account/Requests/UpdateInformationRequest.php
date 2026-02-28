<?php

namespace App\Http\Facility\Account\Requests;

use App\Http\Enums\GuardEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Validator;

/**
 * @property string|null $address
 * @property string|null $phone
 * @property string|null $description
 * @property string|null $openingTime
 * @property string|null $closingTime
 * @property string|null $googleMapsUrl
 */
class UpdateInformationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::guard(GuardEnum::FACILITY->value)->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "address" => ["nullable", "string", "max:255"],
            "phone" => ["nullable", "string", "digits:10"],
            "description" => ["nullable", "string"],
            "openingTime" => ["nullable", "regex:/^\d{2}:\d{2}:\d{2}$/"],
            "closingTime" => ["nullable", "regex:/^\d{2}:\d{2}:\d{2}$/"],
            "googleMapsUrl" => ["nullable", "url"],
        ];
    }

    public function after()
    {
        return [
            function (Validator $validator) {
                if (empty($validator->validated())) {
                    $validator->errors()->add("address", "At least one field must be provided.");
                }
            }
        ];
    }
}

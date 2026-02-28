<?php

namespace App\Http\Facility\Account\Requests;

use App\Http\Enums\GuardEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Validator;

class UpdateMediaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::guard(GuardEnum::FACILITY)->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "coverPhoto" => ["nullable", "file", "mimes:jpg,jpeg,png"],
            "profilePhoto" => ["nullable", "file", "mimes:jpg,jpeg,png"],
        ];
    }

    public function after()
    {
        return [
            function (Validator $validator) {
                if (!$this->hasFile("coverPhoto") && !$this->hasFile("profilePhoto")) {
                    $validator->errors()->add("coverPhoto", "At least a cover photo or profile photo must be provided.");
                }
            }
        ];
    }
}

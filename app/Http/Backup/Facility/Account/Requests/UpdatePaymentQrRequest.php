<?php

namespace App\Http\Facility\Account\Requests;

use App\Http\Enums\GuardEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

/**
 * @property Illuminate\Http\UploadedFile|null $paymentQrCode
 */
class UpdatePaymentQrRequest extends FormRequest
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
            "paymentQrCode" => ["required", "file", "mimes:jpg,jpeg,png"],
        ];
    }
}

<?php

namespace App\Http\Facility\Account\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\GuardEnum;
use App\Http\Facility\Account\Requests\UpdatePaymentQrRequest;
use App\Source\Facility\Models\Facility;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UpdatePaymentQrController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdatePaymentQrRequest $request)
    {
        /** @var Facility $facility */
        $facility = $request->user(GuardEnum::FACILITY->value)->getProfileAttribute();

        $facility->updatePaymentQrCode($request->file("paymentQrCode"));

        return Inertia::flash("update-payment-qr-success", "Payment QR code updated successfully. Customers will now see this new QR code.")->back();
    }
}

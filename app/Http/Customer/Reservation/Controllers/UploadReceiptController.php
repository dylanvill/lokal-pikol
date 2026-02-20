<?php

namespace App\Http\Customer\Reservation\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Customer\Reservation\Requests\UploadReceiptRequest;
use App\Source\Reservation\Actions\UploadReceipt\UploadReceipt;
use App\Source\Reservation\Models\Reservation;
use App\Source\Reservation\Notifications\ReservationPendingNotification;
use Inertia\Inertia;

class UploadReceiptController extends Controller
{
    public function __invoke(Reservation $reservation, UploadReceiptRequest $request)
    {
        $uploader = new UploadReceipt($reservation);
        $uploader->upload($request->file('receipt'));

        $reservation->facility->notify(new ReservationPendingNotification($reservation));

        Inertia::flash('success', 'Receipt uploaded successfully. Your reservation is now pending for approval, you will receive an email notification once approved.');

        return redirect()->route("reservation.index");
    }
}

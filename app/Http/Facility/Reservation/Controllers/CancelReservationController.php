<?php

namespace App\Http\Facility\Reservation\Controllers;

use App\Http\Controllers\Controller;
use App\Source\Reservation\Actions\CancelReservation\CancelReservation;
use App\Source\Reservation\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CancelReservationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Reservation $reservation, Request $request, CancelReservation $cancelReservation)
    {
        $reservation = $cancelReservation->cancel($reservation);
        $reservation->load('court', 'customer');

        $date = $reservation->reservation_date->format('F j, Y');
        $startTime = date('g:i A', strtotime($reservation->start_time));
        $endTime = date('g:i A', strtotime($reservation->end_time));
        $courtName = $reservation->court->name;
        $customerName = $reservation->customer->full_name;

        $message = "Reservation for court {$courtName} by {$customerName} on {$date} from {$startTime} to {$endTime} has been cancelled.";

        return Inertia::flash('success', $message)->back();
    }
}

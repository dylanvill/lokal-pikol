<?php

namespace App\Http\Scheduling\Court\Controllers;

use App\Source\Scheduling\Court\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class DeleteReservationController
{
    const SUCCESS_MESSAGE_KEY = 'delete-reservation-success';

    public function destroy(Reservation $reservation): RedirectResponse
    {
        $message = $this->buildSuccessMessage($reservation);

        $reservation->delete();

        Inertia::flash(self::SUCCESS_MESSAGE_KEY, $message);

        return redirect()->back();
    }

    private function buildSuccessMessage(Reservation $reservation): string
    {
        $startFormatted = Carbon::createFromFormat('H:i:s', $reservation->start_time)->format('g:ia');
        $endFormatted = Carbon::createFromFormat('H:i:s', $reservation->end_time)->format('g:ia');
        $date = Carbon::parse($reservation->reservation_date)->format('l, j F Y');

        return "Reservation \"{$reservation->name}\" on {$date} at {$startFormatted}–{$endFormatted} has been deleted.";
    }
}

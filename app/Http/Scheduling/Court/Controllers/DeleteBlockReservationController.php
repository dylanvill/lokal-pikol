<?php

namespace App\Http\Scheduling\Court\Controllers;

use App\Source\Scheduling\Court\Models\BlockReservation;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class DeleteBlockReservationController
{
    const SUCCESS_MESSAGE_KEY = 'delete-block-reservation-success';

    public function destroy(BlockReservation $blockReservation): RedirectResponse
    {
        $message = $this->buildSuccessMessage($blockReservation);

        $blockReservation->delete();

        Inertia::flash(self::SUCCESS_MESSAGE_KEY, $message);

        return redirect()->back();
    }

    private function buildSuccessMessage(BlockReservation $blockReservation): string
    {
        $startFormatted = Carbon::createFromFormat('H:i:s', $blockReservation->start_time)->format('g:ia');
        $endFormatted = Carbon::createFromFormat('H:i:s', $blockReservation->end_time)->format('g:ia');
        $day = ucfirst($blockReservation->day_of_the_week);

        return "Block reservation named \"{$blockReservation->name}\" every {$day} at {$startFormatted}–{$endFormatted} has been deleted from court {$blockReservation->court->name}.";
    }
}

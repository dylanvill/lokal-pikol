<?php

namespace App\Http\Facility\Court\Controllers;

use App\Http\Shared\Contracts\Controller;
use App\Source\Court\Enums\BlockBookingDaysEnum;
use App\Source\Court\Models\BlockBooking;
use Inertia\Inertia;

class DeleteBlockBookingController extends Controller
{
    public function __invoke(BlockBooking $blockBooking)
    {
        $day = ucwords(BlockBookingDaysEnum::from($blockBooking->day)->name);
        $startTime = date("g:i A", strtotime($blockBooking->start_time));
        $endTime = date("g:i A", strtotime($blockBooking->end_time));
        $message = "Your block booking for {$blockBooking->court->name} every {$day} from {$startTime} to {$endTime} has been deleted";

        $key = $blockBooking->court->uuid;

        $blockBooking->delete();

        return Inertia::flash("deleted-{$key}", $message)->back();
    }
}

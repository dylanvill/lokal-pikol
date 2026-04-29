<?php

namespace App\Http\Scheduling\Court\Controllers;

use App\Http\Scheduling\Court\Requests\ReserveCourtRequest;
use App\Http\Scheduling\Routes;
use App\Http\Shared\Contracts\Controller;
use App\Source\Scheduling\Court\Actions\ReserveCourt\Dtos\ReserveCourtData;
use App\Source\Scheduling\Court\Actions\ReserveCourt\Exceptions\ReservationConflictException;
use App\Source\Scheduling\Court\Actions\ReserveCourt\ReserveCourt;
use App\Source\Scheduling\Court\Models\Court;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class ReserveCourtController extends Controller
{
    public function __construct(protected ReserveCourt $service) {}

    public function reserve(Court $court, ReserveCourtRequest $request): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $this->service->reserve(new ReserveCourtData(
                listing: $court->listing,
                court: $court,
                name: $request->reservationName,
                reservationDate: $request->date,
                startTime: $request->startTime,
                endTime: $request->endTime,
            ));
            DB::commit();
        } catch (ReservationConflictException $e) {
            DB::rollBack();
            return back()->withErrors(['start_time' => $e->getMessage()]);
        }

        return redirect()->route(Routes::getFullName(Routes::COURTS), [
            'date' => $request->date,
        ]);
    }
}

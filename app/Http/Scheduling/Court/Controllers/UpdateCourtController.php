<?php

namespace App\Http\Scheduling\Court\Controllers;

use App\Http\Scheduling\Court\Requests\UpdateCourtRequest;
use App\Http\Shared\Contracts\Controller;
use App\Source\Scheduling\Court\Actions\UpdateCourt\Dtos\UpdateCourtData;
use App\Source\Scheduling\Court\Actions\UpdateCourt\UpdateCourt;
use App\Source\Scheduling\Court\Models\Court;
use Illuminate\Http\RedirectResponse;

class UpdateCourtController extends Controller
{
    public function update(UpdateCourtRequest $request, Court $court, UpdateCourt $service): RedirectResponse
    {
        $service->update(new UpdateCourtData(
            court: $court,
            name: $request->validated('name'),
        ));

        return redirect()->back();
    }
}

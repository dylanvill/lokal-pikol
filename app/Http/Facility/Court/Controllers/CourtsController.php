<?php

namespace App\Http\Facility\Court\Controllers;

use App\Http\Facility\Court\Resources\CourtResource;
use App\Http\Controllers\Controller;
use App\Source\Authentication\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourtsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {

        /** @var User $facility */
        $facility = $request->user('facility');

        $courts = $facility
            ->facility
            ->courts()
            ->photos()
            ->with('courtPricings')
            ->get();

        // You can add validation, database queries, etc. here
        return Inertia::render('facility/courts/index', [
            "courts" => CourtResource::collection($courts),
        ]);
    }
}

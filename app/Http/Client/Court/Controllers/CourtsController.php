<?php

namespace App\Http\Client\Court\Controllers;

use App\Http\Client\Court\Resources\CourtResource;
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

        /** @var User $client */
        $client = $request->user('client');

        $courts = $client
            ->client
            ->courts()
            ->with("courtSlots")
            ->photos()
            ->get();

        // You can add validation, database queries, etc. here
        return Inertia::render('client/courts/index', [
            "courts" => CourtResource::collection($courts),
        ]);
    }
}

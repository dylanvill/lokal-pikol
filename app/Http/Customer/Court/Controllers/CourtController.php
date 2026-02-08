<?php

namespace App\Http\Customer\Court\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Customer\Court\Resources\CourtListResource;
use App\Source\Client\Models\Client;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use Inertia\Inertia;
use Inertia\Response;

class CourtController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(string $court): Response
    {
        $clients = Client::with(['courts', 'media'])
            ->get()
            ->map(function ($client) {
                $courts = $client->courts;
                $hasCoveredCourts = $courts->where('covered', true)->count() > 0;
                $hasOpenCourts = $courts->where('covered', false)->count() > 0;
                
                $courtTypes = [];
                if ($hasCoveredCourts) $courtTypes[] = 'covered';
                if ($hasOpenCourts) $courtTypes[] = 'open';
                
                return [
                    'uuid' => $client->uuid,
                    'name' => $client->name,
                    'court_count' => $courts->count(),
                    'court_types' => $courtTypes, // ['covered'], ['open'], or ['covered', 'open']
                    'profile_photo' => $client->getFirstMediaUrl(MediaTypeEnum::CLIENT_PROFILE_PHOTO->value),
                    'cover_photo' => $client->getFirstMediaUrl(MediaTypeEnum::CLIENT_COVER_PHOTO->value),
                ];
            });

        $resource = new CourtListResource($clients);

        // You can add validation, database queries, etc. here
        return Inertia::render('customer/court', [
            'court' => $court,
            'clients' => $clients
        ]);
    }
}

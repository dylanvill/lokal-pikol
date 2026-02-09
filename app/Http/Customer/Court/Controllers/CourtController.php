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
    public function __invoke(Client $client): Response
    {
        // You can add validation, database queries, etc. here
        return Inertia::render('customer/court', [
            'court' => $client
        ]);
    }
}

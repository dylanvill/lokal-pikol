<?php

namespace App\Http\Facility\Account\Controllers;

use App\Http\Shared\Contracts\Controller;
use App\Http\Enums\GuardEnum;
use App\Http\Facility\Account\Resources\AccountResource;
use App\Source\Facility\Models\Facility;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GetAccountController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {

        /** @var Facility $facility */
        $facility = $request->user(GuardEnum::FACILITY->value)->getProfileAttribute();

        $facility->load('media');


        return Inertia::render(
            'facility/account',
            [
                'account' => new AccountResource($facility),
            ]
        );
    }
}

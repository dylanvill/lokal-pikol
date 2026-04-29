<?php

namespace App\Http\Shared\Middleware;

use App\Http\Scheduling\Auth\Resources\FacilityAdminAuthResource;
use App\Http\Scheduling\Auth\Resources\ListingAuthResource;
use App\Http\Shared\Enums\GuardEnum;
use App\Source\Directory\Models\Listing;
use App\Source\Scheduling\Facility\Models\FacilityAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $tld = config('app.tld');
        $isScheduling = $request->getHost() === "scheduling.{$tld}";

        $shared = [...parent::share($request), 'name' => config('app.name'), 'auth' => null];

        if ($isScheduling && Auth::check(GuardEnum::FACILITY->value)) {
            $shared = [...$shared, ...$this->handleSchedulingData($request)];
        }

        return $shared;
    }

    protected function handleSchedulingData(Request $request): array
    {
        $user = $request->user(GuardEnum::FACILITY->value);
        $facilityAdmin = FacilityAdmin::where('user_id', $user->id)->first();
        $listing = Listing::where('id', $facilityAdmin->listing_id)->first();

        return [
            'facilityAdmin' => new FacilityAdminAuthResource($facilityAdmin),
            'facility' => new ListingAuthResource($listing)
        ];
    }
}

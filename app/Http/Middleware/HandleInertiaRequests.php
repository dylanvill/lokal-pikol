<?php

namespace App\Http\Middleware;

use App\Http\Customer\Auth\Resources\CustomerAuthResource;
use App\Http\Enums\GuardEnum;
use App\Http\Facility\Auth\Resources\FacilityAuthResource;
use App\Source\Customer\Models\Customer;
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
        $shared = [...parent::share($request), 'name' => config('app.name'), 'auth' => null];

        $guard = $this->identifyAuthenticatedGuard($request);

        if (empty($guard)) return $shared;

        $data = $request->user($guard->value)->getProfileAttribute();

        $key = $request->user($guard->value)->isFacility() ? 'facility' : 'customer';

        $resourceClass = match ($guard) {
            GuardEnum::CUSTOMER => CustomerAuthResource::class,
            GuardEnum::FACILITY => FacilityAuthResource::class,
        };

        $shared['auth'][$key] = new $resourceClass($data);


        return $shared;
    }

    private function identifyAuthenticatedGuard(Request $request): GuardEnum|null
    {
        $customer = Auth::guard(GuardEnum::CUSTOMER->value)->check();
        $facility = Auth::guard(GuardEnum::FACILITY->value)->check();

        if ($customer) return GuardEnum::CUSTOMER;
        if ($facility) return GuardEnum::FACILITY;

        return null;
    }
}

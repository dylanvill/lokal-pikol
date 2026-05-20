<?php

namespace App\Http\Directory\Controllers;

use App\Http\Scheduling\Court\ApiModels\AvailabilityCourtApiModel;
use App\Http\Shared\Contracts\Controller;
use App\Http\Shared\Resources\LinkResource;
use App\Source\Directory\Models\Listing;
use App\Source\Directory\Models\ScheduleUrl\Enums\ScheduleProviderEnum;
use App\Source\MediaLibrary\Enums\MediaConversionEnum;
// Cross-domain call: Directory HTTP → Scheduling Source (scheduling business logic, read-only)
use App\Source\Scheduling\Court\Actions\GenerateSlots\GenerateCourtSlotsWithAvailability;
use App\Source\Scheduling\Court\Shared\Dtos\CourtSlot;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ListingScheduleController extends Controller
{
    public function show(Request $request, GenerateCourtSlotsWithAvailability $generateSlots, Listing $listing): Response
    {
        $listing->load('scheduleUrl', 'socialLinks', 'media');

        if ($listing->scheduleUrl?->provider !== ScheduleProviderEnum::LOKAL_PIKOL) {
            throw new NotFoundHttpException;
        }

        $date = $request->input('date', now()->format('Y-m-d'));

        $courts = $listing->courts()->orderBy('created_at')->get();

        return Inertia::render('schedule', [
            'date' => $date,
            'listing' => [
                'name' => $listing->name,
                'city' => $listing->city,
                'address' => $listing->address,
                'profilePhotoUrl' => $listing->getProfilePhoto()?->getUrl(MediaConversionEnum::PROFILE_PHOTO_THUMBNAIL->value),
                'socialLinks' => LinkResource::collection($listing->socialLinks),
            ],
            'courts' => $courts->map(fn ($court) => AvailabilityCourtApiModel::fromCourtAndSlots(
                $court,
                $this->anonymiseSlots($generateSlots->generate($listing->opening_time, $listing->closing_time, $date, $court)),
            ))->all(),
        ]);
    }

    /**
     * @param  array<CourtSlot>  $slots
     * @return array<CourtSlot>
     */
    private function anonymiseSlots(array $slots): array
    {
        return array_map(fn (CourtSlot $slot) => $slot->isAvailable === false
            ? new CourtSlot(slot: $slot->slot, display: $slot->display, isAvailable: false, label: 'Reserved')
            : $slot,
            $slots
        );
    }
}

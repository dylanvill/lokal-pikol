<?php

namespace App\Http\Customer\Facility\Resources;

use App\Http\Shared\Resources\PhotoResource;
use App\Source\Court\Actions\GetCourtAvailability\GetCourtAvailability;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use App\Source\Shared\Actions\TimeToSlotConversion\Dtos\CourtSlot;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

use function Symfony\Component\Clock\now;

class FacilityListResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->uuid,
            "name" => $this->name,
            "courtType" => $this->parseCourtType(),
            "coverPhoto" => $this->parseCoverPhoto(),
            "profilePhoto" => $this->parseProfilePhoto(),
            "openingTime" => $this->opening_time,
            "closingTime" => $this->closing_time,
            "availableSlots" => $this->parseCourtSlots($request),
            "city" => $this->city,
            "address" => $this->address,
            "numberOfCourts" => $this->courts->count(),
        ];
    }

    public function parseCourtSlots(Request $request): array
    {
        $service = new GetCourtAvailability();

        $combinedSlots = [];
        $today = Carbon::now();
        $inputDate = Carbon::createFromFormat('Y-m-d', $request->input('date', Carbon::now()->format('Y-m-d')));

        foreach ($this->courts as $court) {
            $slotsArray = $service->get($court, $inputDate->format('Y-m-d'));
            $slots = collect($slotsArray)
                ->when($today->isSameDay($inputDate), function ($collection) use ($today) {
                    $currentTime = $today->format('H:i');
                    return $collection->filter(function ($slot) use ($currentTime) {
                        return $slot->startTime > $currentTime;
                    });
                })
                ->filter(fn($slot) => $slot->isAvailable)
                ->map(fn($slot) => "{$slot->startTime} - {$slot->endTime}")
                ->toArray();

            $combinedSlots = [...$combinedSlots, ...$slots];
        }

        return collect($combinedSlots)->unique()->map(function ($slot) {
            $times = explode(' - ', $slot);
            return new CourtSlot(startTime: $times[0], endTime: $times[1], isAvailable: true);
        })->toArray();
    }

    public function parseCourtType(): string
    {
        $typeDisplay = "";

        /** @var \Illuminate\Support\Collection */
        $types = $this->courts
            ->pluck('covered')
            ->unique()
            ->values();
        if ($types->contains(true) && $types->contains(false)) {
            $typeDisplay = "Covered & Outdoor";
        } elseif ($types->first() === true) {
            $typeDisplay = "Covered";
        } elseif ($types->contains(false)) {
            $typeDisplay = "Outdoor";
        }

        return $typeDisplay;
    }

    public function parseCoverPhoto(): PhotoResource|null
    {
        if (empty($this->media)) return null;

        $media = $this->media->where('collection_name', MediaTypeEnum::FACILITY_COVER_PHOTO)->first();
        return $media ? new PhotoResource($media) : null;
    }

    public function parseProfilePhoto(): PhotoResource|null
    {
        if (empty($this->media)) return null;

        $media = $this->media->where('collection_name', MediaTypeEnum::FACILITY_PROFILE_PHOTO)->first();
        return $media ? new PhotoResource($media) : null;
    }
}

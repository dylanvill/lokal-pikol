<?php
// Used to show the user a list of courts to choose from when creating a reservation. It can also show the user the available time slots for each court on the selected date.
namespace App\Http\Facility\Reservation\Resources;

use App\Http\Customer\Court\Resources\CourtSlotResource;
use App\Source\Court\Actions\CourtSlotConversion\Dtos\Range;
use App\Source\Court\Actions\CourtSlotConversion\RangeToSlot;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourtReservationListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->uuid,
            'name' => $this->name,
            'covered' => $this->covered,
            'slots' => $this->parseSlots(),
        ];
    }



    /**
     * @return Range[]
     */
    protected function getRanges(): array
    {
        return RangeToSlot::convertMany($this->courtPricings->map(function ($pricing) {
            return new Range(
                startTime: $pricing->start_time,
                endTime: $pricing->end_time,
                price: $pricing->price
            );
        })->all());
    }

    protected function getReservationRanges()
    {
        return RangeToSlot::convertMany($this->reservations->map(function ($reservations) {
            return new Range(
                startTime: $reservations->start_time,
                endTime: $reservations->end_time,
                price: null
            );
        })->all());
    }

    protected function parseSlots()
    {
        $reservations = collect($this->getReservationRanges())->map(fn($slot) => "{$slot->startTime}-{$slot->endTime}")->toArray();
        $slots = collect($this->getRanges())->map(function ($slot) use ($reservations) {
            $isAvailable = !in_array("{$slot->startTime}-{$slot->endTime}", $reservations);
            return [
                "startTime" => $slot->startTime,
                "endTime" => $slot->endTime,
                "price" => $slot->price,
                "isAvailable" => $isAvailable
            ];
        })->toArray();

        return CourtSlotResource::collection($slots);
    }
}

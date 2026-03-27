<?php
// Used to show the user a list of courts to choose from when creating a reservation. It can also show the user the available time slots for each court on the selected date.
namespace App\Http\Facility\Reservation\Resources;

use App\Http\Customer\Court\Resources\CourtSlotResource;
use App\Source\Court\Actions\GetCourtAvailability\GetCourtAvailability;
use App\Source\Shared\Actions\TimeToSlotConversion\Dtos\Range;
use App\Source\Shared\Actions\TimeToSlotConversion\RangeToSlot;
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
            'slots' => (new GetCourtAvailability())->get($this->resource, $request->input('date', now()->toDateString())),
        ];
    }
}

<?php
// Used to show the user a list of courts to choose from when creating a reservation. It can also show the user the available time slots for each court on the selected date.
namespace App\Http\Facility\Reservation\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
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
            'name' => $this->full_name,
            'email' => $this->email
        ];
    }
}

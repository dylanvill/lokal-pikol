<?php

namespace App\Source\Reservation\Actions\SetReservationFees;

use App\Source\Reservation\Models\Reservation;
use Illuminate\Support\Collection;
use App\Source\Reservation\Models\ReservationFee;

class SetReservationFees
{
    protected array $fees = [];

    public function __construct(protected Reservation $reservation) {}

    public function setFee(string $item, float $amount, ?string $description = null): self
    {
        $this->fees[] = [
            'item' => $item,
            'description' => $description,
            'amount' => $amount,
        ];

        return $this;
    }

    /**
     * @return Collection<ReservationFee>
     */
    public function save(): Collection
    {
        $reservationFees = collect();
        foreach ($this->fees as $fee) {
            $reservationFee = new ReservationFee();
            $reservationFee->reservation_id = $this->reservation->id;
            $reservationFee->item = $fee['item'];
            $reservationFee->description = $fee['description'] ?? null;
            $reservationFee->amount = $fee['amount'];
            $reservationFee->save();

            $reservationFees->push($reservationFee);
        }

        $this->fees = [];

        return $reservationFees;
    }
}

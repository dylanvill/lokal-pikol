<?php

namespace App\Source\Reservation\Actions\SetReservationFees;

use App\Source\Reservation\Enums\ReservationFeeItemsEnum;
use App\Source\Reservation\Models\Reservation;
use Illuminate\Support\Collection;
use App\Source\Reservation\Models\ReservationFee;
use App\Source\Shared\Actions\TimeToSlotConversion\Dtos\Range;
use App\Source\Shared\Actions\TimeToSlotConversion\RangeToSlot;

class SetReservationFees
{
    protected array $fees = [];

    const SERVICE_FEE_CHARGE = 5;

    /**
     * @param Reservation $reservation
     * @return Collection<ReservationFee>
     */
    public function set(Reservation $reservation): Collection
    {
        $reservationSlots = RangeToSlot::convert(new Range($reservation->start_time, $reservation->end_time));
        $pricingSlots = RangeToSlot::convertMany($reservation->court->courtPricings->map(fn($pricing) => new Range(startTime: $pricing->start_time, endTime: $pricing->end_time, price: (float) $pricing->price))->all());

        $hourlyFee = $this->computeHourlyFees($reservationSlots, $pricingSlots);
        $serviceFee = $this->computeServiceFee($reservationSlots);

        $fees = [
            [
                'reservation_id' => $reservation->id,
                'item' => ReservationFeeItemsEnum::HOURLY_RATE->value,
                'amount' => $hourlyFee,
            ],
            [
                'reservation_id' => $reservation->id,
                'item' => ReservationFeeItemsEnum::SERVICE_FEE->value,
                'amount' => $serviceFee,
            ],
        ];

        $reservationFees = collect($fees)->map(function ($feeData) {
            $reservationFee = new ReservationFee();
            $reservationFee->reservation_id = $feeData['reservation_id'];
            $reservationFee->item = $feeData['item'];
            $reservationFee->amount = $feeData['amount'];
            $reservationFee->save();
            return $reservationFee;
        });

        return $reservationFees;
    }

    protected function computeServiceFee(array $reservationSlots): float
    {
        $serviceFee = count($reservationSlots) * self::SERVICE_FEE_CHARGE;
        return $serviceFee;
    }

    protected function computeHourlyFees(array $reservationSlots, array $pricingSlots): float
    {
        $hourlyFee = collect($reservationSlots)->reduce(function ($carry, $reservationSlot) use ($pricingSlots) {
            $matchingPricingSlot = collect($pricingSlots)->first(function ($pricingSlot) use ($reservationSlot) {
                return $pricingSlot->startTime === $reservationSlot->startTime && $pricingSlot->endTime === $reservationSlot->endTime;
            });

            return $carry + $matchingPricingSlot->price;
        }, 0);

        return $hourlyFee;
    }
}

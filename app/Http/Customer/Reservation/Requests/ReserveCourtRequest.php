<?php

namespace App\Http\Customer\Reservation\Requests;

use App\Http\Enums\GuardEnum;
use App\Source\Court\Models\Court;
use App\Source\Reservation\Enums\ReservationStatusEnum;
use App\Source\Reservation\Models\Reservation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class ReserveCourtRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user(GuardEnum::CUSTOMER->value) !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "date" => ['required', 'date'],
            "slots" => ['required', 'array', 'min:1'],
            "slots.*" => ['required', 'string', 'regex:/^\d{2}:\d{2}-\d{2}:\d{2}$/'],
        ];
    }

    protected function slotsOverlapWithExistingReservations(): bool
    {
        $court = $this->route('court');
        $date = $this->input('date');
        $slots = $this->input('slots');

        if (!$court instanceof Court || empty($slots) || !$date) {
            return false;
        }

        // Parse requested slots into time ranges
        $requestedRanges = [];
        foreach ($slots as $slot) {
            if (preg_match('/^(\d{2}:\d{2})-(\d{2}:\d{2})$/', $slot, $matches)) {
                $requestedRanges[] = [
                    'start' => $matches[1] . ':00', // Convert HH:MM to HH:MM:SS
                    'end' => $matches[2] . ':00'
                ];
            }
        }

        if (empty($requestedRanges)) {
            return false;
        }

        // Get existing reservations for this court on the same date
        $existingReservations = Reservation::where('court_id', $court->id)
            ->where('reservation_date', $date)
            ->whereNot('status', ReservationStatusEnum::CANCELLED->value)
            ->get(['start_time', 'end_time']);

        // Check for overlaps
        foreach ($requestedRanges as $requestedRange) {
            foreach ($existingReservations as $existing) {
                // Two ranges overlap if: start1 < end2 AND start2 < end1
                if (
                    $requestedRange['start'] < $existing->end_time &&
                    $existing->start_time < $requestedRange['end']
                ) {
                    return true; // Overlap found
                }
            }
        }

        return false; // No overlaps
    }

    protected function slotShouldBeConsecutive(): bool
    {
        $slots = $this->input('slots');

        if (empty($slots) || count($slots) <= 1) {
            return false; // Single slot or no slots are considered consecutive
        }

        // Parse slots and sort by start time
        $parsedSlots = [];
        foreach ($slots as $slot) {
            if (preg_match('/^(\d{2}:\d{2})-(\d{2}:\d{2})$/', $slot, $matches)) {
                $parsedSlots[] = [
                    'start' => $matches[1],
                    'end' => $matches[2],
                ];
            }
        }

        // Sort by start time
        usort($parsedSlots, function ($a, $b) {
            return strcmp($a['start'], $b['start']);
        });

        // Check if consecutive - return true if NOT consecutive (validation error)
        for ($i = 0; $i < count($parsedSlots) - 1; $i++) {
            if ($parsedSlots[$i]['end'] !== $parsedSlots[$i + 1]['start']) {
                return true; // NOT consecutive, add validation error
            }
        }

        return false; // All slots are consecutive, no validation error
    }

    public function after(): array
    {
        return [
            function (Validator $validator) {
                if (!empty($this->input("slots"))) {
                    if ($this->slotShouldBeConsecutive()) {
                        $validator->errors()->add(
                            'slots',
                            'The slots selected must be consecutive hours.'
                        );
                    }

                    if ($this->slotsOverlapWithExistingReservations()) {
                        $validator->errors()->add(
                            'slots',
                            'Selected time slots are no longer available. Please choose different hours.'
                        );
                    }
                }
            }
        ];
    }
}

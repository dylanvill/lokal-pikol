<?php

namespace App\Http\Facility\Court\Requests\Traits;
use Illuminate\Validation\Validator;

trait ValidatesTime
{


    public function after(): array
    {
        return [
            function (Validator $validator) {
                if ($this->validator->errors()->isEmpty()) {
                    $timeFormatErrors = $this->validateTimeFormat();
                    foreach ($timeFormatErrors as $key => $message) {
                        $validator->errors()->add($key, $message);
                    }

                    $hourErrors = $this->validateHours();
                    foreach ($hourErrors as $key => $message) {
                        $validator->errors()->add($key, $message);
                    }

                    if (empty($timeFormatErrors) && empty($hourErrors)) {
                        $rangeErrors = $this->validateRanges();
                        foreach ($rangeErrors as $key => $message) {
                            $validator->errors()->add($key, $message);
                        }

                        $overlapErrors = $this->validateOverlaps();
                        foreach ($overlapErrors as $key => $message) {
                            $validator->errors()->add($key, $message);
                        }
                    }
                }
            }
        ];
    }

    private function getRanges(): array
    {
        $startTimes = $this->input('startTime', []);
        $endTimes = $this->input('endTime', []);

        $slots = collect($startTimes)->map(function ($startTime, $index) use ($endTimes) {
            return [
                'startTime' => $startTime,
                'endTime' => $endTimes[$index]
            ];
        })->toArray();

        return $slots;
    }

    private function validateRanges(): array
    {
        $errors = [];
        $slots = $this->getRanges();

        foreach ($slots as $index => $slot) {
            $start = strtotime($slot['startTime']);
            $end = strtotime($slot['endTime']);

            if ($start >= $end) {
                $errors["startTime.$index"] = "Start time must be before end time.";
                $errors["endTime.$index"] = "End time must be after start time.";
            }
        }

        return $errors;
    }

    private function validateOverlaps(): array
    {
        $slots = $this->getRanges();
        $errors = [];
        $overlappingSlots = []; // Track which slots have overlaps to avoid duplicate messages

        // Check each pair of slots for overlaps
        for ($i = 0; $i < count($slots); $i++) {
            for ($j = $i + 1; $j < count($slots); $j++) {
                $slot1Start = strtotime($slots[$i]['startTime']);
                $slot1End = strtotime($slots[$i]['endTime']);
                $slot2Start = strtotime($slots[$j]['startTime']);
                $slot2End = strtotime($slots[$j]['endTime']);

                // Two time slots overlap if slot1 starts before slot2 ends AND slot2 starts before slot1 ends
                // Adjacent slots (where one ends exactly when the other starts) are allowed
                if ($slot1Start < $slot2End && $slot2Start < $slot1End) {
                    // Only add error message if we haven't already flagged this slot
                    if (!isset($overlappingSlots[$i])) {
                        $overlappingSlots[$i] = [];
                    }
                    if (!isset($overlappingSlots[$j])) {
                        $overlappingSlots[$j] = [];
                    }

                    $overlappingSlots[$i][] = $j + 1; // Store 1-based slot numbers for user display
                    $overlappingSlots[$j][] = $i + 1;
                }
            }
        }

        // Generate error messages for overlapping slots
        foreach ($overlappingSlots as $slotIndex => $conflictingSlots) {
            $conflictsList = implode(', ', array_unique($conflictingSlots));
            $errors["startTime.$slotIndex"] = "Time slot " . ($slotIndex + 1) . " overlaps with slot(s): $conflictsList";
        }

        return $errors;
    }

    private function validateTimeFormat(): array
    {
        $errors = [];
        $startTimes = $this->input('startTime', []);
        $endTimes = $this->input('endTime', []);

        // Check start times - must be on the hour (xx:00)
        foreach ($startTimes as $index => $startTime) {
            if ($startTime && !preg_match('/^\d{2}:00$/', $startTime)) {
                $errors["startTime.$index"] = "Start time must be on the hour (e.g., 07:00, 08:00).";
            }
        }

        // Check end times - must be on the hour (xx:00)
        foreach ($endTimes as $index => $endTime) {
            if ($endTime && !preg_match('/^\d{2}:00$/', $endTime)) {
                $errors["endTime.$index"] = "End time must be on the hour (e.g., 07:00, 08:00).";
            }
        }

        return $errors;
    }

    private function validateHours(): array
    {
        $errors = [];
        $startTimes = $this->input('startTime', []);
        $endTimes = $this->input('endTime', []);

        // Check start times - hours must be 00-23
        foreach ($startTimes as $index => $startTime) {
            if ($startTime) {
                $hour = substr($startTime, 0, 2);
                if (!ctype_digit($hour) || (int)$hour < 0 || (int)$hour > 23) {
                    $errors["startTime.$index"] = "Start time hour must be between 12AM-11PM.";
                }
            }
        }

        // Check end times - hours must be 00-23
        foreach ($endTimes as $index => $endTime) {
            if ($endTime) {
                $hour = substr($endTime, 0, 2);
                if (!ctype_digit($hour) || (int)$hour < 0 || (int)$hour > 23) {
                    $errors["endTime.$index"] = "End time hour must be between 12AM-11PM.";
                }
            }
        }

        return $errors;
    }
}

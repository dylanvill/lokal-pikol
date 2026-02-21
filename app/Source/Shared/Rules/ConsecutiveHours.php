<?php

namespace App\Source\Shared\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ConsecutiveHours implements ValidationRule
{
    /**
     * 
     * @param array $slots
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $slots, Closure $fail): void
    {
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
                $fail('The slots must be consecutive hours.');
                return;
            }
        }
    }
}

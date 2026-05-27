<?php

namespace App\Http\Scoresheet\Rules;

use Illuminate\Contracts\Validation\ValidationRule;

class AllPlayersDistinct implements ValidationRule
{
    /** @param string[] $playerIds */
    public function __construct(private array $playerIds) {}

    public function validate(string $attribute, mixed $value, \Closure $fail): void
    {
        $ids = array_filter($this->playerIds);

        if (count($ids) !== count(array_unique($ids))) {
            $fail('All four players must be different.');
        }
    }
}

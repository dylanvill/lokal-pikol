<?php

namespace App\Source\Directory\Models\ScheduleUrl\Enums;

enum ScheduleProviderEnum: string
{
    case LOKAL_PIKOL = 'lokal pikol';
    case COURT_ACCESS = 'court access';
    case PLAYKORTE = 'playkorte';

    public function getDisplayName(): string
    {
        return match ($this) {
            self::LOKAL_PIKOL => 'Lokal Pikol',
            self::COURT_ACCESS => 'Court Access',
            self::PLAYKORTE => 'PlayKorte',
        };
    }
}

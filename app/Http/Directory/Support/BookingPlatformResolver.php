<?php

namespace App\Http\Directory\Support;

class BookingPlatformResolver
{
    /**
     * @var array<string, string>
     */
    private const PLATFORMS = [
        'facebook.com' => 'Facebook',
        'instagram.com' => 'Instagram',
        'court-access.com' => 'Court Access',
        'picklepiper.com' => 'PicklePiper',
        'playkorte.com' => 'PlayKorte',
    ];

    public static function resolve(?string $url): ?string
    {
        if (! $url) {
            return null;
        }

        $host = parse_url($url, PHP_URL_HOST);

        if (! $host) {
            return null;
        }

        $host = strtolower($host);

        foreach (self::PLATFORMS as $domain => $name) {
            if ($host === $domain || str_ends_with($host, '.'.$domain)) {
                return $name;
            }
        }

        return null;
    }
}

<?php

namespace App\Source\Directory\Actions\UpdateSocialLink;

use App\Source\Directory\Models\Listing;
use App\Source\Shared\Enums\SocialLinkEnum;
use App\Source\Shared\Models\SocialLink;

class UpdateSocialLink
{

    public function __construct(protected Listing $listing) {}

    public function update(SocialLinkEnum $social, string $value): SocialLink
    {
        $socialLink = $this->listing->socialLinks()
            ->where('platform', $social->value)
            ->first();

        if ($socialLink) {
            $socialLink->update(['url' => $value]);
        } else {
            $socialLink = $this->listing->socialLinks()->create([
                'label' => $social->value,
                'platform' => $social->value,
                'url' => $value,
            ]);
        }

        return $socialLink;
    }
}

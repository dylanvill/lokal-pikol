<?php

namespace App\Source\Client\Actions\UpdateProfileImage\Tests;

use App\Source\Client\Models\Client;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UpdateProfileImageTest extends TestCase
{
    use RefreshDatabase;

    private function getFixturePath(string $filename): string
    {
        return __DIR__ . '/../fixtures/' . $filename;
    }

    public function test_it_updates_profile_image(): void
    {
        // Arrange
        $client = Client::factory()->create();

        // Act - Add profile image
        $client->addMedia($this->getFixturePath('sample-profile-image.jpg'))
            ->toMediaCollection(MediaTypeEnum::CLIENT_PROFILE_IMAGE->value);

        // Assert
        $this->assertTrue($client->hasMedia(MediaTypeEnum::CLIENT_PROFILE_IMAGE->value));
        
        $media = $client->getFirstMedia(MediaTypeEnum::CLIENT_PROFILE_IMAGE->value);
        $this->assertNotNull($media);
        $this->assertEquals(MediaTypeEnum::CLIENT_PROFILE_IMAGE->value, $media->collection_name);
    }
}

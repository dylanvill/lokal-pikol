<?php

namespace App\Source\Client\Actions\UpdateCoverPhoto\Tests;

use App\Source\Client\Models\Client;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UpdateCoverPhotoTest extends TestCase
{
    use RefreshDatabase;

    private function getFixturePath(string $filename): string
    {
        return __DIR__ . '/../fixtures/' . $filename;
    }

    public function test_it_updates_cover_photo(): void
    {
        // Arrange
        $client = Client::factory()->create();

        // Act - Add cover photo
        $client->addMedia($this->getFixturePath('sample-cover-image.jpg'))
            ->toMediaCollection(MediaTypeEnum::CLIENT_COVER_IMAGE->value);

        // Assert
        $this->assertTrue($client->hasMedia(MediaTypeEnum::CLIENT_COVER_IMAGE->value));
        
        $media = $client->getFirstMedia(MediaTypeEnum::CLIENT_COVER_IMAGE->value);
        $this->assertNotNull($media);
        $this->assertEquals(MediaTypeEnum::CLIENT_COVER_IMAGE->value, $media->collection_name);
    }
}
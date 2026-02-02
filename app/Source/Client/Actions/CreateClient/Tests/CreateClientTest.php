<?php

namespace App\Source\Client\Actions\CreateClient\Tests;

use App\Source\Client\Actions\CreateClient\CreateClient;
use App\Source\Client\Actions\CreateClient\Dtos\CreateClientSpec;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use Illuminate\Foundation\Testing\RefreshDatabase;
use SplFileObject;
use Tests\TestCase;

class CreateClientTest extends TestCase
{
    use RefreshDatabase;

    private CreateClient $createClient;

    protected function setUp(): void
    {
        parent::setUp();
        $this->createClient = new CreateClient();
    }

    public function test_it_successfully_creates_client_in_database(): void
    {
        // Arrange
        $spec = new CreateClientSpec(
            name: 'Test Company',
            address: '123 Test Street',
            email: 'test@company.com',
            phone: '+1234567890'
        );

        // Act
        $client = $this->createClient->create($spec);
        $client->save(); // Need to save as the action only creates the model

        // Assert
        $this->assertDatabaseHas('clients', [
            'name' => 'Test Company',
            'address' => '123 Test Street', 
            'email' => 'test@company.com',
            'phone' => '+1234567890'
        ]);
    }

    public function test_it_creates_client_with_correct_values(): void
    {
        // Arrange
        $spec = new CreateClientSpec(
            name: 'Another Test Company',
            address: '456 Another Street',
            email: 'another@company.com',
            phone: null
        );

        // Act
        $client = $this->createClient->create($spec);

        // Assert
        $this->assertEquals('Another Test Company', $client->name);
        $this->assertEquals('456 Another Street', $client->address);
        $this->assertEquals('another@company.com', $client->email);
        $this->assertNull($client->phone);
        $this->assertNotNull($client->uuid); // Should have UUID from HasUuid trait
    }

    public function test_it_creates_client_with_optional_phone_null(): void
    {
        // Arrange
        $spec = new CreateClientSpec(
            name: 'No Phone Company',
            address: '789 No Phone Ave',
            email: 'nophone@company.com'
        );

        // Act
        $client = $this->createClient->create($spec);

        // Assert
        $this->assertNull($client->phone);
        $this->assertEquals('No Phone Company', $client->name);
        $this->assertEquals('789 No Phone Ave', $client->address);
        $this->assertEquals('nophone@company.com', $client->email);
    }

    public function test_it_successfully_uploads_profile_photo(): void
    {
        // Arrange
        $logoPath = __DIR__ . '/fixtures/sample-profile-image.jpg';
        
        $spec = new CreateClientSpec(
            name: 'Photo Test Company',
            address: '123 Photo Street',
            email: 'photo@company.com',
            phone: '+1234567890',
            logo: new SplFileObject($logoPath)
        );

        // Act
        $client = $this->createClient->create($spec);
        $client->save();

        // Assert - Profile photo should be automatically added by the action
        $this->assertTrue($client->hasMedia(MediaTypeEnum::CLIENT_PROFILE_IMAGE->value));
        $this->assertCount(1, $client->getMedia(MediaTypeEnum::CLIENT_PROFILE_IMAGE->value));
        
        $media = $client->getFirstMedia(MediaTypeEnum::CLIENT_PROFILE_IMAGE->value);
        $this->assertNotNull($media);
        $this->assertEquals(MediaTypeEnum::CLIENT_PROFILE_IMAGE->value, $media->collection_name);
    }
}

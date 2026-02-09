<?php

namespace App\Source\Court\Actions\CreateCourt\Tests;

use App\Source\Facility\Models\Facility;
use App\Source\Court\Actions\CreateCourt\CreateCourt;
use App\Source\Court\Actions\CreateCourt\Dtos\CreateCourtData;
use App\Source\Court\Models\Court;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreateCourtTest extends TestCase
{
    use RefreshDatabase;

    private CreateCourt $createCourt;

    protected function setUp(): void
    {
        parent::setUp();
        $this->createCourt = new CreateCourt();
    }

    public function test_it_successfully_creates_court_in_database(): void
    {
        // Arrange
        $client = Client::factory()->create();
        
        $data = new CreateCourtData(
            name: 'Test Court A',
            covered: true,
            clientId: $client->id
        );

        // Act
        $court = $this->createCourt->create($data);

        // Assert
        $this->assertDatabaseHas('courts', [
            'name' => 'Test Court A',
            'covered' => true,
            'client_id' => $client->id
        ]);

        $this->assertInstanceOf(Court::class, $court);
        $this->assertTrue($court->exists);
    }

    public function test_it_creates_court_with_correct_values(): void
    {
        // Arrange
        $client = Client::factory()->create();
        
        $data = new CreateCourtData(
            name: 'Indoor Court B',
            covered: false,
            clientId: $client->id
        );

        // Act
        $court = $this->createCourt->create($data);

        // Assert
        $this->assertEquals('Indoor Court B', $court->name);
        $this->assertFalse($court->covered);
        $this->assertEquals($client->id, $court->client_id);
        $this->assertNotNull($court->uuid); // Should have UUID from HasUuid trait
    }

    public function test_it_creates_court_with_covered_true(): void
    {
        // Arrange
        $client = Client::factory()->create();
        
        $data = new CreateCourtData(
            name: 'Covered Court',
            covered: true,
            clientId: $client->id
        );

        // Act
        $court = $this->createCourt->create($data);

        // Assert
        $this->assertTrue($court->covered);
        $this->assertEquals('Covered Court', $court->name);
        $this->assertEquals($client->id, $court->client_id);
    }

    public function test_it_establishes_client_relationship(): void
    {
        // Arrange
        $client = Client::factory()->create();
        
        $data = new CreateCourtData(
            name: 'Relationship Test Court',
            covered: false,
            clientId: $client->id
        );

        // Act
        $court = $this->createCourt->create($data);

        // Assert
        $this->assertEquals($client->id, $court->client->id);
        $this->assertEquals($client->name, $court->client->name);
    }
}
<?php

namespace App\Source\Court\Actions\CreateCourtSlot\Tests;

use App\Source\Court\Actions\CreateCourtSlot\CreateCourtSlot;
use App\Source\Court\Actions\CreateCourtSlot\Dtos\CreateCourtSlotData;
use App\Source\Court\Models\Court;
use App\Source\Court\Models\CourtSlot;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreateCourtSlotTest extends TestCase
{
    use RefreshDatabase;

    private CreateCourtSlot $createCourtSlot;

    protected function setUp(): void
    {
        parent::setUp();
        $this->createCourtSlot = new CreateCourtSlot();
    }

    public function test_it_successfully_creates_court_slot_in_database(): void
    {
        // Arrange
        $court = Court::factory()->create();
        
        $data = new CreateCourtSlotData(
            time: '09:00:00',
            courtId: $court->id
        );

        // Act
        $courtSlot = $this->createCourtSlot->create($data);

        // Assert
        $this->assertDatabaseHas('court_slots', [
            'time' => '09:00:00',
            'court_id' => $court->id
        ]);

        $this->assertInstanceOf(CourtSlot::class, $courtSlot);
        $this->assertTrue($courtSlot->exists);
    }

    public function test_it_creates_court_slot_with_correct_values(): void
    {
        // Arrange
        $court = Court::factory()->create();
        
        $data = new CreateCourtSlotData(
            time: '14:30:00',
            courtId: $court->id
        );

        // Act
        $courtSlot = $this->createCourtSlot->create($data);

        // Assert
        $this->assertEquals('14:30', $courtSlot->time->format('H:i'));
        $this->assertEquals($court->id, $courtSlot->court_id);
        $this->assertNotNull($courtSlot->uuid); // Should have UUID from HasUuid trait
    }

    public function test_it_creates_court_slot_with_different_times(): void
    {
        // Arrange
        $court = Court::factory()->create();
        
        $data = new CreateCourtSlotData(
            time: '18:45:00',
            courtId: $court->id
        );

        // Act
        $courtSlot = $this->createCourtSlot->create($data);

        // Assert
        $this->assertEquals('18:45', $courtSlot->time->format('H:i'));
        $this->assertEquals($court->id, $courtSlot->court_id);
    }

    public function test_it_establishes_court_relationship(): void
    {
        // Arrange
        $court = Court::factory()->create();
        
        $data = new CreateCourtSlotData(
            time: '12:00:00',
            courtId: $court->id
        );

        // Act
        $courtSlot = $this->createCourtSlot->create($data);

        // Assert
        $this->assertEquals($court->id, $courtSlot->court->id);
        $this->assertEquals($court->name, $courtSlot->court->name);
    }

    public function test_it_creates_multiple_slots_for_same_court(): void
    {
        // Arrange
        $court = Court::factory()->create();
        
        $morningSlot = new CreateCourtSlotData(
            time: '09:00:00',
            courtId: $court->id
        );
        
        $afternoonSlot = new CreateCourtSlotData(
            time: '15:00:00',
            courtId: $court->id
        );

        // Act
        $courtSlot1 = $this->createCourtSlot->create($morningSlot);
        $courtSlot2 = $this->createCourtSlot->create($afternoonSlot);

        // Assert
        $this->assertEquals('09:00', $courtSlot1->time->format('H:i'));
        $this->assertEquals('15:00', $courtSlot2->time->format('H:i'));
        $this->assertEquals($court->id, $courtSlot1->court_id);
        $this->assertEquals($court->id, $courtSlot2->court_id);
        $this->assertNotEquals($courtSlot1->id, $courtSlot2->id);
    }
}
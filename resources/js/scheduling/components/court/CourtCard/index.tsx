import { Badge, Button, Card, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import { useState } from 'react';
import type CourtSlot from '../../../models/CourtSlot';
import { type DateString } from '../../../types/DateTime';
import { type UuidString } from '../../../types/String';
import CheckboxSlotCard from '../../shared/CheckboxSlotCard';
import ReserveCourtCardModal from './ReserveCourtCardModal';

interface CourtCardProps {
    id: UuidString;
    name: string;
    date?: DateString;
    slots: CourtSlot[];
}

function CourtCard({ id, name, date, slots }: CourtCardProps) {
    const [selectedSlots, setSelectedSlots] = useState<CourtSlot[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    function toggleSlot(toggledSlot: CourtSlot, checked: boolean) {
        setSelectedSlots((prev) =>
            checked ? [...prev, toggledSlot] : prev.filter((s) => s.slot !== toggledSlot.slot),
        );
    }

    function handleReserveSuccess() {
        setSelectedSlots([]);
    }

    return (
        <>
            <Card.Root variant="outline" size="md">
                <Card.Body gap={3}>
                    <HStack justify="space-between" align="flex-start">
                        <Card.Title fontSize="md">{name}</Card.Title>
                        <Badge colorPalette="green" size="sm">
                            Active
                        </Badge>
                    </HStack>
                    <SimpleGrid columns={3} gap={2}>
                        {slots.map((slot) => (
                            <CheckboxSlotCard
                                key={slot.slot}
                                time={slot.display}
                                label={slot.label}
                                checked={selectedSlots.some((s) => s.slot === slot.slot)}
                                onCheckedChange={(checked) => toggleSlot(slot, checked)}
                                disabled={!slot.isAvailable}
                            />
                        ))}
                    </SimpleGrid>
                </Card.Body>

                {selectedSlots.length > 0 && (
                    <Card.Footer>
                        <HStack justifyContent="space-between" alignItems="center" width="full">
                            <Text fontSize="xs" color="gray.500">
                                {selectedSlots.length} slot{selectedSlots.length > 1 ? 's' : ''} selected
                            </Text>
                            <Button onClick={() => setModalOpen(true)}>Reserve</Button>
                        </HStack>
                    </Card.Footer>
                )}
            </Card.Root>

            <ReserveCourtCardModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                court={{ id, name, slots }}
                selectedSlots={selectedSlots}
                date={date}
                onSuccess={handleReserveSuccess}
            />
        </>
    );
}

export default CourtCard;

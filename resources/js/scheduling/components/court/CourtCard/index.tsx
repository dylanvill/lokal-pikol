import { Badge, Button, Card, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import { useState } from 'react';
import CheckboxSlotCard from '../../shared/CheckboxSlotCard';
import BookCourtCardModal from './BookCourtCardModal';

interface Slot {
    value: string;
    booked: boolean;
}

interface CourtCardProps {
    id: number;
    name: string;
    date?: Date;
    slots: Slot[];
}

function formatDate(date: Date): string {
    return date.toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function CourtCard({ id, name, date = new Date(), slots }: CourtCardProps) {
    const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    function toggleSlot(slot: string, checked: boolean) {
        setSelectedSlots((prev) => (checked ? [...prev, slot] : prev.filter((s) => s !== slot)));
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
                        <Badge colorPalette="green" size="sm">Active</Badge>
                    </HStack>
                    <SimpleGrid columns={3} gap={2}>
                        {slots.map((slot) => (
                            <CheckboxSlotCard
                                key={slot.value}
                                label={slot.value}
                                checked={selectedSlots.includes(slot.value)}
                                onCheckedChange={(checked) => toggleSlot(slot.value, checked)}
                                disabled={slot.booked}
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

            <BookCourtCardModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                courtId={id}
                courtName={name}
                selectedSlots={selectedSlots}
                date={formatDate(date)}
                onSuccess={handleReserveSuccess}
            />
        </>
    );
}

export default CourtCard;

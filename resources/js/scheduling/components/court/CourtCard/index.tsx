import { Badge, Button, Card, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import { useState } from 'react';
import CheckboxSlotCard from '../../shared/CheckboxSlotCard';
import BookCourtCardModal from './BookCourtCardModal';

function formatHour(hour: number): string {
    const period = hour < 12 ? 'AM' : 'PM';
    const displayHour = hour === 0 || hour === 12 ? 12 : hour % 12;
    return `${String(displayHour).padStart(2, '0')}:00 ${period}`;
}

const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => ({
    value: `${String(i).padStart(2, '0')}:00`,
    label: `${formatHour(i)} - ${formatHour((i + 1) % 24)}`,
}));

function formatDate(date: Date): string {
    return date.toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

interface CourtCardProps {
    id: number;
    name: string;
    date?: Date;
    bookedSlots?: string[];
}

function CourtCard({ id, name, date = new Date(), bookedSlots = [] }: CourtCardProps) {
    const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    function toggleSlot(value: string, checked: boolean) {
        setSelectedSlots((prev) => (checked ? [...prev, value] : prev.filter((s) => s !== value)));
    }

    function handleReserveSuccess() {
        setSelectedSlots([]);
    }

    const hasSlotsSelected = selectedSlots.length > 0;

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
                        {TIME_SLOTS.map((slot) => (
                            <CheckboxSlotCard
                                key={slot.value}
                                label={slot.label}
                                checked={selectedSlots.includes(slot.value)}
                                onCheckedChange={(checked) => toggleSlot(slot.value, checked)}
                                disabled={bookedSlots.includes(slot.value)}
                            />
                        ))}
                    </SimpleGrid>
                </Card.Body>

                {hasSlotsSelected && (
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

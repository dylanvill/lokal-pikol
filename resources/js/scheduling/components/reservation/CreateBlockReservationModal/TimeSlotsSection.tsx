import { Field, SimpleGrid, Text } from '@chakra-ui/react';
import type CourtSlot from '../../../models/CourtSlot';
import CheckboxSlotCard from '../../shared/CheckboxSlotCard';

interface TimeSlotsSectionProps {
    slots: CourtSlot[];
    selectedSlots: CourtSlot[];
    onToggle: (slot: CourtSlot, checked: boolean) => void;
    nonContiguous: boolean;
}

function TimeSlotsSection({ slots, selectedSlots, onToggle, nonContiguous }: TimeSlotsSectionProps) {
    return (
        <Field.Root>
            <Field.Label>Time slots</Field.Label>
            {nonContiguous && (
                <Text fontSize="xs" color="red.500" mb={1}>
                    Selected slots must be consecutive.
                </Text>
            )}
            <SimpleGrid columns={3} gap={2} mt={1}>
                {slots.map((slot) => (
                    <CheckboxSlotCard
                        key={slot.slot}
                        time={slot.display}
                        label={slot.label}
                        checked={selectedSlots.some((s) => s.slot === slot.slot)}
                        onCheckedChange={(checked) => onToggle(slot, checked)}
                        disabled={!slot.isAvailable}
                    />
                ))}
            </SimpleGrid>
        </Field.Root>
    );
}

export default TimeSlotsSection;

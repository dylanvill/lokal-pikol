import { Fieldset, SimpleGrid } from '@chakra-ui/react';
import type CourtSlot from '../../../models/CourtSlot';
import { type Slot } from '../../../models/CourtSlot';
import CheckboxSlotCard from '../../shared/CheckboxSlotCard';
import { type CreateBlockReservationFormInterface } from './types';

export interface TimeSlotsSectionProps {
    slots: CourtSlot[];
    selectedSlots: CreateBlockReservationFormInterface['slots'];
    onCheckChanged: (checked: boolean, slot: Slot) => void;
}

function TimeSlotsSection({ slots, selectedSlots, onCheckChanged }: TimeSlotsSectionProps) {
    return (
        <Fieldset.Root>
            <Fieldset.Legend>Time slots</Fieldset.Legend>
            <SimpleGrid columns={3} gap={2} mt={1}>
                {slots.map((slot) => (
                    <CheckboxSlotCard
                        key={slot.slot}
                        time={slot.display}
                        label={slot.label}
                        checked={selectedSlots.includes(slot.slot)}
                        onCheckedChange={(checked) => onCheckChanged(checked, slot.slot)}
                        disabled={!slot.isAvailable}
                    />
                ))}
            </SimpleGrid>
        </Fieldset.Root>
    );
}

export default TimeSlotsSection;

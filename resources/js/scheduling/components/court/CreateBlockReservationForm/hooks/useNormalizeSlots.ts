import { useMemo } from 'react';
import type CourtBlockReservation from '../../../../models/CourtBlockReservation';
import type CourtSlot from '../../../../models/CourtSlot';
import { type DayOfTheWeek } from '../../../../types/DateTime';
import { type UuidString } from '../../../../types/String';

export interface NormalizeSlotsProps {
    plainSlots: CourtSlot[];
    courts: CourtBlockReservation[];
    selectedDays: DayOfTheWeek[];
    selectedCourts: UuidString[];
}

const useNormalizeSlots = ({ plainSlots, courts = [], selectedDays = [], selectedCourts = [] }: NormalizeSlotsProps) => {
    const normalizedSlots = useMemo(() => {
        const filteredCourts = courts.filter((court) => selectedCourts.includes(court.id));
        const scheduleSlots = filteredCourts
            .flatMap((court) => court.blockReservations.filter((block) => selectedDays.includes(block.dayOfTheWeek)))
            .flatMap((block) => block.schedules)
            .flatMap((schedule) => schedule.slots.map((slot) => ({ ...slot, label: schedule.name })));

        return plainSlots.map((slot) => {
            const conflicts = scheduleSlots.filter((scheduleSlot) => scheduleSlot.slot === slot.slot);
            if (!conflicts) return slot;

            const label = conflicts.flatMap((scheduleSlot) => scheduleSlot.label).join(', ');
            return {
                ...slot,
                isAvailable: conflicts.length > 0 ? false : true,
                label: label,
            };
        });
    }, [selectedDays, selectedCourts, plainSlots, courts]);

    return normalizedSlots;
};

export default useNormalizeSlots;

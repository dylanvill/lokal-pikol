import type CourtSlot from '../../../../models/CourtSlot';
import { type TimeString } from '../../../../types/DateTime';

export interface TimeRange {
    startTime: TimeString;
    endTime: TimeString;
}

const sortSlots = (slots: CourtSlot[]): CourtSlot[] =>
    [...slots].sort((a, b) => a.slot.split(' - ')[0].localeCompare(b.slot.split(' - ')[0]));

// Input:  ["09:00 - 10:00", "07:00 - 08:00", "08:00 - 09:00"]
// Output: { startTime: "07:00", endTime: "10:00" }
const slotsToTimeRange = (slots: CourtSlot[]): TimeRange => {
    const sorted = sortSlots(slots);
    return {
        startTime: sorted[0].slot.split(' - ')[0],
        endTime: sorted[sorted.length - 1].slot.split(' - ')[1],
    };
};

export function areSlotsContiguous(slots: CourtSlot[]): boolean {
    const sorted = sortSlots(slots);
    for (let i = 0; i < sorted.length - 1; i++) {
        const currentEnd = sorted[i].slot.split(' - ')[1];
        const nextStart = sorted[i + 1].slot.split(' - ')[0];
        if (currentEnd !== nextStart) return false;
    }
    return true;
}

export default slotsToTimeRange;

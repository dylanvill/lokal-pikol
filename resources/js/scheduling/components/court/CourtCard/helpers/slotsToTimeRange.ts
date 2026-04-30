import { type Slot, type TimeString } from '../../../../types/Booking';

export interface TimeRange {
    startTime: TimeString;
    endTime: TimeString;
}

const sortSlots = (slots: Slot[]): Slot[] =>
    [...slots].sort((a, b) => a.split(' - ')[0].localeCompare(b.split(' - ')[0]));

// Input:  ["09:00 - 10:00", "07:00 - 08:00", "08:00 - 09:00"]
// Output: { startTime: "07:00", endTime: "10:00" }
const slotsToTimeRange = (slots: Slot[]): TimeRange => {
    const sorted = sortSlots(slots);
    return {
        startTime: sorted[0].split(' - ')[0],
        endTime: sorted[sorted.length - 1].split(' - ')[1],
    };
};

export function areSlotsContiguous(slots: Slot[]): boolean {
    const sorted = sortSlots(slots);
    for (let i = 0; i < sorted.length - 1; i++) {
        const currentEnd = sorted[i].split(' - ')[1];
        const nextStart = sorted[i + 1].split(' - ')[0];
        if (currentEnd !== nextStart) return false;
    }
    return true;
}

export default slotsToTimeRange;

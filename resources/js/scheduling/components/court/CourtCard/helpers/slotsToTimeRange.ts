import { type Slot, type TimeString } from '../../../../types/Booking';

export interface TimeRange {
    startTime: TimeString;
    endTime: TimeString;
}

// Input:  ["07:00 - 08:00", "08:00 - 09:00"]
// Output: { startTime: "07:00", endTime: "09:00" }
const slotsToTimeRange = (slots: Slot[]): TimeRange => ({
    startTime: slots[0].split(' - ')[0],
    endTime: slots[slots.length - 1].split(' - ')[1],
});

export function areSlotsContiguous(slots: Slot[]): boolean {
    for (let i = 0; i < slots.length - 1; i++) {
        const currentEnd = slots[i].split(' - ')[1];
        const nextStart = slots[i + 1].split(' - ')[0];
        if (currentEnd !== nextStart) return false;
    }
    return true;
}

export default slotsToTimeRange;

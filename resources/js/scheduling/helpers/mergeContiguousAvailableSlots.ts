import type CourtSlot from '../models/CourtSlot';
import sortSlots from './sortSlots';

function splitSlot(value: string): [string, string] {
    const [start, end] = value.split(' - ');
    return [start, end];
}

function mergeContiguousAvailableSlots(slots: CourtSlot[]): string[] {
    const available = sortSlots(slots.filter((slot) => slot.isAvailable === true));
    if (available.length === 0) return [];

    const ranges: string[] = [];
    let runStart = available[0];
    let runEnd = available[0];

    for (let i = 1; i < available.length; i++) {
        const [, currentEnd] = splitSlot(runEnd.slot);
        const [nextStart] = splitSlot(available[i].slot);

        if (currentEnd === nextStart) {
            runEnd = available[i];
        } else {
            ranges.push(formatRange(runStart, runEnd));
            runStart = available[i];
            runEnd = available[i];
        }
    }

    ranges.push(formatRange(runStart, runEnd));
    return ranges;
}

function formatRange(startSlot: CourtSlot, endSlot: CourtSlot): string {
    const [startDisplay] = splitSlot(startSlot.display);
    const [, endDisplay] = splitSlot(endSlot.display);
    return `${startDisplay} - ${endDisplay}`;
}

export default mergeContiguousAvailableSlots;

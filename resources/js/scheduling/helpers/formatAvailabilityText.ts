import type AvailabilityCourt from '../models/AvailabilityCourt';
import mergeContiguousAvailableSlots from './mergeContiguousAvailableSlots';

function formatCourtAvailabilityText(court: AvailabilityCourt, dateDisplay: string): string {
    const header = `${court.name} - ${dateDisplay}`;
    const ranges = mergeContiguousAvailableSlots(court.slots);

    if (ranges.length === 0) {
        return `${header}\nFully booked`;
    }

    return [header, ...ranges].join('\n');
}

function formatCourtBlock(court: AvailabilityCourt): string {
    const ranges = mergeContiguousAvailableSlots(court.slots);
    const lines = ranges.length === 0 ? ['Fully booked'] : ranges;
    return [court.name, ...lines].join('\n');
}

function formatAllCourtsAvailabilityText(courts: AvailabilityCourt[], dateDisplay: string): string {
    const courtBlocks = courts.map(formatCourtBlock).join('\n\n');
    return [dateDisplay, '', courtBlocks].join('\n');
}

export { formatCourtAvailabilityText, formatAllCourtsAvailabilityText };

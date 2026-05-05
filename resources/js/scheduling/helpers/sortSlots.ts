import type CourtSlot from '../models/CourtSlot';

const sortSlots = (slots: CourtSlot[]): CourtSlot[] =>
    [...slots].sort((a, b) => a.slot.split(' - ')[0].localeCompare(b.slot.split(' - ')[0]));

export default sortSlots;

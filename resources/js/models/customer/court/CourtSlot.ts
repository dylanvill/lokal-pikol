interface CourtSlot {
    id: string;
    time: string;
    rate: number;
}

export type CourtSlotState = 'available' | 'reserved' | 'selected';

export interface CourtSlotWithState extends CourtSlot {
    state: CourtSlotState;
}

export default CourtSlot;

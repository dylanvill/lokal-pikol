import { type Slot, type SlotDisplay } from '../types/Booking';

interface CourtSlot {
    slot: Slot;
    display: SlotDisplay;
    isAvailable: boolean;
}

export default CourtSlot;

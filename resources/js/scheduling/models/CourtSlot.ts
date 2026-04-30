/** A string representing a one-hour slot, e.g. 07:00 - 08:00 */
export type Slot = string;

/** A string representing a properly formatted slot e.g. 01:00 PM - 02:00 PM */
export type SlotDisplay = string;

interface CourtSlot {
    slot: Slot;
    display: SlotDisplay;
    isAvailable: boolean;
}

export default CourtSlot;

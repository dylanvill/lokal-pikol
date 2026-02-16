import type CourtSlot from '../models/shared/CourtSlot';

const getSlotPrice = (courtSlots: CourtSlot[], startTime: string) => {
    const matchingSlot = courtSlots.find((courtSlot) => courtSlot.startTime === startTime);
    return matchingSlot ? matchingSlot.price : 0;
};

export default getSlotPrice;

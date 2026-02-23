interface BlockBookingSlot {
    name: string;
    startTime: string;
    endTime: string;
    price: number | null;
    isAvailable: boolean | null;
}

interface CreateBlockBooking {
    id: string;
    name: string;
    covered: boolean;
    blockBookings: BlockBookingSlot[];
}

export default CreateBlockBooking;

import { useState } from 'react';

export default function useListingDialogs() {
    const [externalScheduleOpen, setExternalScheduleOpen] = useState(false);
    const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

    return { externalScheduleOpen, setExternalScheduleOpen, bookingDialogOpen, setBookingDialogOpen };
}

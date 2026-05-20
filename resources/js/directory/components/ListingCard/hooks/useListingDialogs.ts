import { useState } from 'react';

const SKIP_BOOKING_KEY = 'lp:skip_booking_dialog';
const SKIP_SCHEDULE_KEY = 'lp:skip_external_schedule_dialog';

export default function useListingDialogs() {
    const [externalScheduleOpen, setExternalScheduleOpen] = useState(false);
    const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
    const [skipBookingDialog, setSkipBookingDialogState] = useState(
        () => localStorage.getItem(SKIP_BOOKING_KEY) === 'true',
    );
    const [skipExternalScheduleDialog, setSkipExternalScheduleDialogState] = useState(
        () => localStorage.getItem(SKIP_SCHEDULE_KEY) === 'true',
    );

    const setSkipBookingDialog = (skip: boolean) => {
        localStorage.setItem(SKIP_BOOKING_KEY, String(skip));
        setSkipBookingDialogState(skip);
    };

    const setSkipExternalScheduleDialog = (skip: boolean) => {
        localStorage.setItem(SKIP_SCHEDULE_KEY, String(skip));
        setSkipExternalScheduleDialogState(skip);
    };

    return {
        externalScheduleOpen,
        setExternalScheduleOpen,
        bookingDialogOpen,
        setBookingDialogOpen,
        skipBookingDialog,
        setSkipBookingDialog,
        skipExternalScheduleDialog,
        setSkipExternalScheduleDialog,
    };
}

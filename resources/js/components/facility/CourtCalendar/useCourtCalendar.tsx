import { router } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { dayjsLocalizer, type View, Views } from 'react-big-calendar';
import { type CalendarEvent } from './types';

export const localizer = dayjsLocalizer(dayjs);

const useCourtCalendar = () => {
    const [currentDate, setCurrentDate] = useState(dayjs().toDate());
    const [currentView, setCurrentView] = useState<View>(Views.MONTH);

    // Handle navigation (prev/next/today)
    const handleNavigate = useCallback((date: Date) => {
        setCurrentDate(date);
    }, []);

    // Handle view changes (month/week/day/agenda)
    const handleViewChange = useCallback((view: View) => {
        setCurrentView(view);
    }, []);

    // Handle event selection
    const handleSelectEvent = useCallback((event: CalendarEvent) => {
        router.visit(`/facility/reservations/${event.id}`);
    }, []);

    // Custom event styling
    const eventStyleGetter = (event: CalendarEvent) => {
        let backgroundColor = '#3174ad';

        if (event.resource.type === 'blockbooking') {
            backgroundColor = '#4b6fad'; // blue
        } else if (event.resource.type === 'reservation' && event.resource.metadata.status === 'pending') {
            backgroundColor = '#e6982c'; // yellow
        } else if (event.resource.type === 'reservation' && event.resource.metadata.status === 'confirmed') {
            backgroundColor = '#35a133'; // green
        }

        return {
            style: {
                backgroundColor,
                borderRadius: '5px',
                opacity: 1,
                color: 'white',
                border: '0px',
                display: 'block',
            },
        };
    };

    return {
        currentDate,
        currentView,
        localizer,
        handleNavigate,
        handleViewChange,
        handleSelectEvent,
        eventStyleGetter,
    };
};

export default useCourtCalendar;

import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { dayjsLocalizer, type View, Views } from 'react-big-calendar';
import { type CalendarEvent } from './types';

export const localizer = dayjsLocalizer(dayjs);

const useCourtCalendar = () => {
    const defaultDate = useMemo(() => dayjs().toDate(), []);
    const [currentDate, setCurrentDate] = useState(new Date());
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
        console.log('Selected event:', event);
        // TODO: Implement event details modal or navigation
    }, []);

    // Handle slot selection (for creating new reservations)
    const handleSelectSlot = useCallback((slotInfo: any) => {
        console.log('Selected slot:', slotInfo);
        // TODO: Implement new reservation creation
    }, []);

    // Custom event styling
    const eventStyleGetter = (event: CalendarEvent) => {
        let backgroundColor = '#3174ad';

        if (event.resource?.status === 'confirmed') {
            backgroundColor = '#10b981'; // green
        } else if (event.resource?.status === 'pending') {
            backgroundColor = '#f59e0b'; // yellow
        } else if (event.resource?.status === 'cancelled') {
            backgroundColor = '#ef4444'; // red
        }

        return {
            style: {
                backgroundColor,
                borderRadius: '5px',
                opacity: 0.8,
                color: 'white',
                border: '0px',
                display: 'block',
            },
        };
    };

    return {
        defaultDate,
        currentDate,
        currentView,
        localizer,
        handleNavigate,
        handleViewChange,
        handleSelectEvent,
        handleSelectSlot,
        eventStyleGetter,
    };
};

export default useCourtCalendar;

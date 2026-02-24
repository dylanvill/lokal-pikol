import { Box } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type Court from '../../../models/facility/Court';
import type CourtCalendarItem from '../../../models/facility/CourtCalendarItem';
import { type CalendarEvent } from './types';
import useCourtCalendar from './useCourtCalendar';

export interface CourtCalendarPageProps extends PageProps {
    court: Court;
    items: CourtCalendarItem[];
}

function CourtCalendar() {
    const { props } = usePage<CourtCalendarPageProps>();
    const items = props.items;

    const reservations = useMemo((): CalendarEvent[] => {
        return items.map((reservation) => {
            const date = dayjs(reservation.reservationDate).format('YYYY-MM-DD');
            return {
                id: reservation.id,
                title: reservation.label,
                start: dayjs(`${date} ${reservation.startTime}`).toDate(),
                end: dayjs(`${date} ${reservation.endTime}`).toDate(),
                resource: reservation,
            };
        });
    }, [items]);

    const { currentView, currentDate, localizer, handleNavigate, handleViewChange, handleSelectEvent, eventStyleGetter } = useCourtCalendar();

    return (
        <Box bg="white" borderRadius="lg" shadow="sm" p={4} minH="75vh">
            <Calendar
                localizer={localizer}
                events={reservations}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '75vh' }}
                view={currentView}
                onView={handleViewChange}
                date={currentDate}
                onNavigate={handleNavigate}
                onSelectEvent={handleSelectEvent}
                selectable
                eventPropGetter={eventStyleGetter}
                views={[Views.MONTH, Views.WEEK, Views.DAY]}
                step={30} // 30-minute increments
                timeslots={2} // Show 30-minute slots
                defaultView={Views.MONTH}
                toolbar={true}
                popup={true}
                dayLayoutAlgorithm="no-overlap"
            />
        </Box>
    );
}

export default CourtCalendar;

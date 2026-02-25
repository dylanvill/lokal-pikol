import { Box, Card } from '@chakra-ui/react';
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
    date: string;
}

function CourtCalendar() {
    const { props } = usePage<CourtCalendarPageProps>();
    const items = props.items;

    const reservations = useMemo((): CalendarEvent[] => {
        return items.map((reservation) => {
            const date = dayjs(reservation.reservationDate).format('YYYY-MM-DD');
            const normalizedEndTime = reservation.endTime === '24:00:00' ? '23:59' : reservation.endTime;

            return {
                id: reservation.id,
                title: reservation.label,
                start: dayjs(`${date} ${reservation.startTime}`).toDate(),
                end: dayjs(`${date} ${normalizedEndTime}`).toDate(),
                resource: reservation,
            };
        });
    }, [items]);

    const { currentView, currentDate, localizer, handleNavigate, handleViewChange, handleSelectEvent, eventStyleGetter } = useCourtCalendar(
        props.court.id,
        props.date,
    );

    return (
        <Card.Root minH="75vh" width="100%">
            <Card.Body>
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
                    step={60} // 60-minute increments
                    timeslots={1} // Show 60-minute slots
                    defaultView={Views.MONTH}
                    toolbar={true}
                    popup={true}
                    dayLayoutAlgorithm="no-overlap"
                />
            </Card.Body>
        </Card.Root>
    );
}

export default CourtCalendar;

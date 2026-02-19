import { Box } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import militaryTimeToAmPmTime from '../../../helpers/militaryTimeToAmPmTime';
import type CourtCalendarModel from '../../../models/facility/CourtCalendar';
import { type CalendarEvent } from './types';
import useCourtCalendar from './useCourtCalendar';

export interface CourtCalendarPageProps extends PageProps {
    court: CourtCalendarModel;
    date: string;
}

function CourtCalendar() {
    const { props } = usePage<CourtCalendarPageProps>();

    const court = props.court;

    const reservations = useMemo((): CalendarEvent[] => {
        return court.reservations.map((reservation) => {
            const date = dayjs(reservation.reservationDate).format('YYYY-MM-DD');

            const startTimeDisplay = militaryTimeToAmPmTime(reservation.startTime);
            const endTimeDisplay = militaryTimeToAmPmTime(reservation.endTime);

            return {
                id: reservation.id,
                title: `${reservation.customerName} (${startTimeDisplay} - ${endTimeDisplay})`,
                start: dayjs(`${date} ${reservation.startTime}`).toDate(),
                end: dayjs(`${date} ${reservation.endTime}`).toDate(),
                resource: reservation,
            };
        });
    }, [court.reservations]);

    const { currentView, currentDate, localizer, handleNavigate, handleViewChange, handleSelectEvent, handleSelectSlot, eventStyleGetter } =
        useCourtCalendar();

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
                onSelectSlot={handleSelectSlot}
                selectable
                eventPropGetter={eventStyleGetter}
                views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
                step={30} // 30-minute increments
                timeslots={2} // Show 30-minute slots
                defaultView={Views.MONTH}
                toolbar={true}
                popup={true}
                dayLayoutAlgorithm="no-overlap"
                formats={{
                    timeGutterFormat: 'HH:mm',
                    eventTimeRangeFormat: ({ start, end }, culture, localizer) => dayjs(start).format('HH:mm') + ' - ' + dayjs(end).format('HH:mm'),
                }}
            />
        </Box>
    );
}

export default CourtCalendar;

import { Box, Heading } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useReservationCalendar from './useReservationCalendar';

// Sample event interface
interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    resource?: {
        courtName: string;
        customerName: string;
        status: 'confirmed' | 'pending' | 'cancelled';
    };
}

// Sample events data
const sampleEvents: CalendarEvent[] = [
    {
        id: '1',
        title: 'Court A - John Doe',
        start: new Date(2026, 1, 20, 9, 0), // February 20, 2026, 9:00 AM
        end: new Date(2026, 1, 20, 11, 0), // February 20, 2026, 11:00 AM
        resource: {
            courtName: 'Court A',
            customerName: 'John Doe',
            status: 'confirmed',
        },
    },
    {
        id: '2',
        title: 'Court B - Jane Smith',
        start: new Date(2026, 1, 21, 14, 0), // February 21, 2026, 2:00 PM
        end: new Date(2026, 1, 21, 16, 0), // February 21, 2026, 4:00 PM
        resource: {
            courtName: 'Court B',
            customerName: 'Jane Smith',
            status: 'pending',
        },
    },
    {
        id: '3',
        title: 'Court A - Mike Johnson',
        start: new Date(2026, 1, 22, 10, 0), // February 22, 2026, 10:00 AM
        end: new Date(2026, 1, 22, 12, 0), // February 22, 2026, 12:00 PM
        resource: {
            courtName: 'Court A',
            customerName: 'Mike Johnson',
            status: 'confirmed',
        },
    },
];

function ReservationCalendar() {
    const { currentView, currentDate, localizer, handleNavigate, handleViewChange, handleSelectEvent, handleSelectSlot, eventStyleGetter } =
        useReservationCalendar();

    return (
        <>
            <Heading size="lg" mb={6}>
                Reservation Calendar
            </Heading>

            <Box bg="white" borderRadius="lg" shadow="sm" p={4} minH="75vh">
                <Calendar
                    localizer={localizer}
                    events={sampleEvents}
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
                        eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
                            dayjs(start).format('HH:mm') + ' - ' + dayjs(end).format('HH:mm'),
                    }}
                />
            </Box>
        </>
    );
}

export default ReservationCalendar;

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Box, Card, NativeSelect, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar';
import type { View } from 'react-big-calendar';
import type ReservationCalendarItem from '../../models/ReservationCalendarItem';
import type { UuidString } from '../../types/String';

dayjs.extend(localizedFormat);

const localizer = dayjsLocalizer(dayjs);

type CalendarEvent = {
    title: string;
    start: Date;
    end: Date;
    resource: ReservationCalendarItem;
};

interface ReservationsCalendarProps {
    courts: Array<{ id: UuidString; name: string }>;
    selectedCourtId: UuidString | null;
    calendarItems: ReservationCalendarItem[];
    view: View;
    date: Date;
    formattedDate: string;
    onView: (view: View) => void;
    onNavigate: (date: Date) => void;
    onSelectEvent: (item: ReservationCalendarItem) => void;
    onCourtChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const eventPropGetter = (event: CalendarEvent) => ({
    style: {
        backgroundColor: event.resource.type === 'reservation' ? '#3182CE' : '#DD6B20',
        border: 'none',
        borderRadius: '4px',
    },
});

function ReservationsCalendar({
    courts,
    selectedCourtId,
    calendarItems,
    view,
    date,
    formattedDate,
    onView,
    onNavigate,
    onSelectEvent,
    onCourtChange,
}: ReservationsCalendarProps) {
    const events: CalendarEvent[] = calendarItems.map((item) => ({
        title: item.title,
        start: new Date(item.start),
        end: new Date(item.end),
        resource: item,
    }));

    return (
        <Card.Root variant="outline">
            <Card.Header>
                <Stack direction={{ base: 'column', sm: 'row' }} justify="space-between" align={{ base: 'stretch', sm: 'center' }} gap={3}>
                    <Text fontWeight="semibold">{formattedDate}</Text>
                    <NativeSelect.Root size="sm" width={{ base: 'full', sm: '200px' }}>
                        <NativeSelect.Field value={selectedCourtId ?? ''} onChange={onCourtChange}>
                            {courts.map((court) => (
                                <option key={court.id} value={court.id}>
                                    {court.name}
                                </option>
                            ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </Stack>
            </Card.Header>
            <Card.Body>
                <Box height={{ base: '60vh', md: '75vh' }} minHeight="400px">
                    <Calendar<CalendarEvent, object>
                        localizer={localizer}
                        events={events}
                        view={view}
                        date={date}
                        views={[Views.MONTH, Views.WEEK, Views.DAY]}
                        onView={onView}
                        onNavigate={onNavigate}
                        onSelectEvent={(event) => onSelectEvent(event.resource)}
                        eventPropGetter={eventPropGetter}
                        drilldownView={Views.DAY}
                    />
                </Box>
            </Card.Body>
        </Card.Root>
    );
}

export default ReservationsCalendar;

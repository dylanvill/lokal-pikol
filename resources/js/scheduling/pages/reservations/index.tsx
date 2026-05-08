import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Box, Flex, NativeSelect } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import type { View } from 'react-big-calendar';
import type { UuidString } from '../../types/String';
import ReservationEventDialog from '../../components/reservations/ReservationEventDialog';
import SchedulingLayout from '../../layouts/SchedulingLayout';
import type ReservationCalendarItem from '../../models/ReservationCalendarItem';
import type SchedulingPageProps from '../../types/SchedulingPageProps';

dayjs.extend(localizedFormat);

const localizer = dayjsLocalizer(dayjs);

interface CourtOption {
    id: UuidString;
    name: string;
}

type CalendarEvent = {
    title: string;
    start: Date;
    end: Date;
    resource: ReservationCalendarItem;
};

interface ReservationsPageProps extends SchedulingPageProps {
    courts: CourtOption[];
    selectedCourtId: UuidString;
    calendarItems: ReservationCalendarItem[];
}

function ReservationsPage({ courts, selectedCourtId, calendarItems }: ReservationsPageProps) {
    const [selectedItem, setSelectedItem] = useState<ReservationCalendarItem | null>(null);
    const [view, setView] = useState<View>(Views.WEEK);
    const [date, setDate] = useState(new Date());

    const events = useMemo<CalendarEvent[]>(
        () =>
            calendarItems.map((item) => ({
                title: item.title,
                start: new Date(item.start),
                end: new Date(item.end),
                resource: item,
            })),
        [calendarItems],
    );

    const eventPropGetter = (event: CalendarEvent) => ({
        style: {
            backgroundColor: event.resource.type === 'reservation' ? '#3182CE' : '#DD6B20',
            border: 'none',
            borderRadius: '4px',
        },
    });

    return (
        <SchedulingLayout title="Reservations">
            <Flex justify="flex-end" marginBottom={4}>
                <NativeSelect.Root size="sm" width="200px">
                    <NativeSelect.Field value={selectedCourtId} onChange={() => {}}>
                        {courts.map((court) => (
                            <option key={court.id} value={court.id}>
                                {court.name}
                            </option>
                        ))}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                </NativeSelect.Root>
            </Flex>

            <Box height="75vh">
                <Calendar<CalendarEvent, object>
                    localizer={localizer}
                    events={events}
                    view={view}
                    date={date}
                    views={[Views.WEEK, Views.DAY]}
                    onView={(newView) => setView(newView)}
                    onNavigate={(newDate) => setDate(newDate)}
                    onSelectEvent={(event) => setSelectedItem(event.resource)}
                    eventPropGetter={eventPropGetter}
                    drilldownView={Views.DAY}
                />
            </Box>

            {selectedItem !== null && (
                <ReservationEventDialog item={selectedItem} onClose={() => setSelectedItem(null)} />
            )}
        </SchedulingLayout>
    );
}

export default ReservationsPage;

import { Box, DatePicker, HStack, Portal, SimpleGrid, VStack } from '@chakra-ui/react';
import { router, usePage } from '@inertiajs/react';
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';
import { useState } from 'react';
import { LuCalendar } from 'react-icons/lu';
import AddCourtModal from '../../components/court/AddCourtModal';
import CourtCard from '../../components/court/CourtCard';
import SchedulingLayout from '../../layouts/SchedulingLayout';

interface Slot {
    value: string;
    booked: boolean;
}

interface Court {
    id: number;
    name: string;
    slots: Slot[];
}

interface PageProps {
    courts: Court[];
    [key: string]: unknown;
}

function CourtsPage() {
    const { courts } = usePage<PageProps>().props;
    const [selectedDate, setSelectedDate] = useState(() => today(getLocalTimeZone()));

    function handleDateChange(date: DateValue) {
        setSelectedDate(date);
        router.get(window.location.pathname, { date: date.toString() }, { preserveState: true });
    }

    return (
        <SchedulingLayout title="Courts">
            <VStack align="stretch" gap={6}>
                <HStack justify="space-between" align="center">
                    <Box>
                        <DatePicker.Root value={[selectedDate]} onValueChange={(e) => e.value[0] && handleDateChange(e.value[0])}>
                            <DatePicker.Control>
                                <DatePicker.Input />
                                <DatePicker.IndicatorGroup>
                                    <DatePicker.Trigger>
                                        <LuCalendar />
                                    </DatePicker.Trigger>
                                </DatePicker.IndicatorGroup>
                            </DatePicker.Control>
                            <Portal>
                                <DatePicker.Positioner>
                                    <DatePicker.Content>
                                        <DatePicker.View view="day">
                                            <DatePicker.Header />
                                            <DatePicker.DayTable />
                                        </DatePicker.View>
                                        <DatePicker.View view="month">
                                            <DatePicker.Header />
                                            <DatePicker.MonthTable />
                                        </DatePicker.View>
                                        <DatePicker.View view="year">
                                            <DatePicker.Header />
                                            <DatePicker.YearTable />
                                        </DatePicker.View>
                                    </DatePicker.Content>
                                </DatePicker.Positioner>
                            </Portal>
                        </DatePicker.Root>
                    </Box>

                    <AddCourtModal />
                </HStack>

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4} maxW={{ sm: courts.length === 1 ? '50%' : 'full' }}>
                    {courts.map((court) => (
                        <CourtCard
                            key={court.id}
                            id={court.id}
                            name={court.name}
                            slots={court.slots}
                            date={selectedDate.toDate(getLocalTimeZone())}
                        />
                    ))}
                </SimpleGrid>
            </VStack>
        </SchedulingLayout>
    );
}

export default CourtsPage;

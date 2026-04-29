import { Box, DatePicker, type DateValue, HStack, parseDate, Portal, SimpleGrid, VStack } from '@chakra-ui/react';
import { router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { LuCalendar } from 'react-icons/lu';
import { show } from '@/actions/App/Http/Scheduling/Court/Controllers/CourtsController';
import AddCourtModal from '../../components/court/AddCourtModal';
import CourtCard from '../../components/court/CourtCard';
import SchedulingLayout from '../../layouts/SchedulingLayout';
import type Court from '../../models/Court';
import { type DateString } from '../../types/DateTime';
import type SchedulingPageProps from '../../types/SchedulingPageProps';

interface CourtsPageProps extends SchedulingPageProps {
    courts: Court[];
    date: DateString;
}

function CourtsPage() {
    const { courts, date } = usePage<CourtsPageProps>().props;

    const dateString = useMemo(() => dayjs(date).format('YYYY-MM-DD'), [date]);

    function handleDateChange(date: DateValue) {
        router.get(show(), {
            date: date.toString(),
        });
    }

    return (
        <SchedulingLayout title="Courts">
            <VStack align="stretch" gap={6}>
                <HStack justify="space-between" align="center">
                    <Box>
                        <DatePicker.Root value={[parseDate(date)]} onValueChange={(e) => e.value[0] && handleDateChange(e.value[0])}>
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
                        <CourtCard key={court.id} id={court.id} name={court.name} slots={court.slots} date={dateString} />
                    ))}
                </SimpleGrid>
            </VStack>
        </SchedulingLayout>
    );
}

export default CourtsPage;

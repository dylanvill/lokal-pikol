import { Box, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { show } from '@/actions/App/Http/Scheduling/Court/Controllers/CourtsController';
import AddCourtModal from '../../components/court/AddCourtModal';
import CourtCard from '../../components/court/CourtCard';
import CourtPageDatePicker, { type ValueChangeDetails } from '../../components/court/CourtPageDatePicker';
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
    const dateDisplay = useMemo(() => dayjs(date).format('dddd, MMMM DD, YYYY'), [date]);

    function handleDateChange(details: ValueChangeDetails) {
        router.get(show(), {
            date: details.value[0].toString(),
        });
    }

    return (
        <SchedulingLayout title="Courts">
            <VStack align="stretch" gap={6}>
                <HStack justify="space-between" align="center">
                    <Box>
                        <CourtPageDatePicker date={date} dateDisplay={dateDisplay} onValueChange={handleDateChange} />
                    </Box>
                    <AddCourtModal />
                </HStack>

                <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={4}>
                    {courts.map((court) => (
                        <CourtCard key={court.id} id={court.id} name={court.name} slots={court.slots} date={dateString} />
                    ))}
                </SimpleGrid>
            </VStack>
        </SchedulingLayout>
    );
}

export default CourtsPage;

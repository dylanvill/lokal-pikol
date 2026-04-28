import { DatePicker, Portal, SimpleGrid, VStack } from '@chakra-ui/react';
import { LuCalendar } from 'react-icons/lu';
import BookingCourtCard from '../../components/booking/BookingCourtCard';
import SchedulingLayout from '../../layouts/SchedulingLayout';

interface Court {
    id: number;
    name: string;
    bookedSlots: string[];
}

const dummyCourts: Court[] = [
    { id: 1, name: 'Court 1', bookedSlots: ['09:00', '10:00', '11:00', '14:00'] },
    { id: 2, name: 'Court 2', bookedSlots: ['07:00', '08:00', '12:00', '13:00', '19:00'] },
];

function BookingsPage() {
    return (
        <SchedulingLayout title="Bookings">
            <VStack align="stretch" gap={6}>
                <DatePicker.Root maxW="xs">
                    <DatePicker.Label>Date</DatePicker.Label>
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

                <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
                    {dummyCourts.map((court) => (
                        <BookingCourtCard
                            key={court.id}
                            id={court.id}
                            name={court.name}
                            bookedSlots={court.bookedSlots}
                        />
                    ))}
                </SimpleGrid>
            </VStack>
        </SchedulingLayout>
    );
}

export default BookingsPage;

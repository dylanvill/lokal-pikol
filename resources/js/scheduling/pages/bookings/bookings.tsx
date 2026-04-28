import { Field, Input, SimpleGrid, VStack } from '@chakra-ui/react';
import { useState } from 'react';
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
    const [date, setDate] = useState('');

    return (
        <SchedulingLayout title="Bookings">
            <VStack align="stretch" gap={6}>
                <Field.Root maxW="xs">
                    <Field.Label>Date</Field.Label>
                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </Field.Root>

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

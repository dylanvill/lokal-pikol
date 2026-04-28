import { Box, Button, Card, Flex, HStack, Text, Wrap } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { LuCalendarDays } from 'react-icons/lu';
import CalendarController from '@/actions/App/Http/Scheduling/Bookings/Controllers/CalendarController';

interface TimeSlot {
    value: string;
    label: string;
}

const TIME_SLOTS: TimeSlot[] = [
    { value: '07:00', label: '7 AM' },
    { value: '08:00', label: '8 AM' },
    { value: '09:00', label: '9 AM' },
    { value: '10:00', label: '10 AM' },
    { value: '11:00', label: '11 AM' },
    { value: '12:00', label: '12 PM' },
    { value: '13:00', label: '1 PM' },
    { value: '14:00', label: '2 PM' },
    { value: '15:00', label: '3 PM' },
    { value: '16:00', label: '4 PM' },
    { value: '17:00', label: '5 PM' },
    { value: '18:00', label: '6 PM' },
    { value: '19:00', label: '7 PM' },
    { value: '20:00', label: '8 PM' },
    { value: '21:00', label: '9 PM' },
    { value: '22:00', label: '10 PM' },
    { value: '23:00', label: '11 PM' },
    { value: '00:00', label: '12 AM' },
];

interface BookingCourtCardProps {
    id: number;
    name: string;
    bookedSlots?: string[];
}

function BookingCourtCard({ name, bookedSlots = [] }: BookingCourtCardProps) {
    const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

    function toggleSlot(value: string) {
        setSelectedSlots((prev) =>
            prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value],
        );
    }

    function handleBookNow() {
        // TODO: open CreateBookingModal or post to store controller
    }

    return (
        <Card.Root variant="outline">
            <Card.Body gap={4}>
                <HStack justify="space-between" align="center">
                    <Card.Title fontSize="md">{name}</Card.Title>
                    <Button
                        asChild
                        variant="ghost"
                        size="xs"
                        color="gray.500"
                    >
                        <Link href={CalendarController.show.url()}>
                            <LuCalendarDays />
                            View full schedule
                        </Link>
                    </Button>
                </HStack>

                <Wrap gap={2}>
                    {TIME_SLOTS.map((slot) => {
                        const isBooked = bookedSlots.includes(slot.value);
                        const isSelected = selectedSlots.includes(slot.value);

                        return (
                            <Box
                                key={slot.value}
                                as="button"
                                _disabled={{ opacity: 1 }}
                                aria-disabled={isBooked}
                                onClick={() => !isBooked && toggleSlot(slot.value)}
                                px={2.5}
                                py={1}
                                borderRadius="md"
                                borderWidth="1px"
                                fontSize="xs"
                                fontWeight="medium"
                                cursor={isBooked ? 'not-allowed' : 'pointer'}
                                transition="all 0.15s"
                                bg={isBooked ? 'red.50' : isSelected ? 'blue.500' : 'white'}
                                borderColor={isBooked ? 'red.200' : isSelected ? 'blue.500' : 'gray.200'}
                                color={isBooked ? 'red.400' : isSelected ? 'white' : 'gray.700'}
                                _hover={
                                    !isBooked
                                        ? { borderColor: 'blue.400', color: isSelected ? 'white' : 'blue.600' }
                                        : undefined
                                }
                            >
                                {slot.label}
                            </Box>
                        );
                    })}
                </Wrap>
            </Card.Body>

            {selectedSlots.length > 0 && (
                <Card.Footer pt={0}>
                    <Flex w="full" justify="space-between" align="center">
                        <Text fontSize="xs" color="gray.500">
                            {selectedSlots.length} slot{selectedSlots.length > 1 ? 's' : ''} selected
                        </Text>
                        <Button colorPalette="blue" size="sm" onClick={handleBookNow}>
                            Book now
                        </Button>
                    </Flex>
                </Card.Footer>
            )}
        </Card.Root>
    );
}

export default BookingCourtCard;

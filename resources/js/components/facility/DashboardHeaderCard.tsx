import { Box, Heading, Text, Flex, Button, Badge } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { LuCalendar } from 'react-icons/lu';

interface DashboardHeaderCardProps {
    clientName: string;
    currentDate: string;
    reservationRequestsCount: number;
}

function DashboardHeaderCard({ clientName, currentDate, reservationRequestsCount }: DashboardHeaderCardProps) {
    return (
        <Box>
            <Flex justify="space-between" align="start" mb={4}>
                <Box>
                    <Heading size="lg" mb={2}>
                        Welcome back, {clientName}!
                    </Heading>
                    <Flex align="center" gap={2} color="gray.600">
                        <LuCalendar />
                        <Text>
                            {new Date(currentDate).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </Text>
                    </Flex>
                </Box>

                {/* Compact Reservation Requests */}
                <Button as={Link} variant="outline" colorScheme="orange" size="sm" position="relative">
                    Reservations
                    {reservationRequestsCount > 0 && (
                        <Badge
                            position="absolute"
                            top="-8px"
                            right="-8px"
                            colorScheme="orange"
                            borderRadius="full"
                            fontSize="xs"
                            minW="20px"
                            h="20px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {reservationRequestsCount}
                        </Badge>
                    )}
                </Button>
            </Flex>
        </Box>
    );
}

export default DashboardHeaderCard;

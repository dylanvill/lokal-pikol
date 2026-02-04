import { Box, Card, Badge, Flex, VStack, Text, Heading } from '@chakra-ui/react';
import { LuClock } from 'react-icons/lu';
import courtTypeIconParser from '../../helpers/courtTypeIconParser';

interface CourtSlot {
    id: number;
    time: string;
    isBooked: boolean;
}

interface DashboardCourtCardProps {
    id: number;
    name: string;
    covered: 'covered' | 'outdoor';
    slots: CourtSlot[];
}

function DashboardCourtCard({ id, name, covered, slots }: DashboardCourtCardProps) {
    const Icon = courtTypeIconParser(covered);

    return (
        <Card.Root key={id}>
            <Card.Header>
                <Flex justify="space-between" align="center">
                    <Heading size="sm">{name}</Heading>
                    <Badge colorScheme={covered ? 'blue' : 'green'} variant="subtle">
                        <Icon />
                        {covered ? 'Indoor' : 'Outdoor'}
                    </Badge>
                </Flex>
            </Card.Header>
            <Card.Body>
                <VStack align="stretch" gap={3}>
                    <Flex align="center" gap={2} color="gray.600">
                        <LuClock size={16} />
                        <Text fontSize="sm" fontWeight="medium">
                            Today's Availability
                        </Text>
                    </Flex>
                    <Box>
                        <Flex wrap="wrap" gap={2}>
                            {slots.map((slot) => (
                                <Badge
                                    key={slot.id}
                                    colorScheme={slot.isBooked ? 'orange' : 'gray'}
                                    variant={slot.isBooked ? 'solid' : 'outline'}
                                    fontSize="xs"
                                    px={2}
                                    py={1}
                                >
                                    Time
                                </Badge>
                            ))}
                        </Flex>
                    </Box>
                    {/* <HStack justify="space-between" fontSize="xs" color="gray.500">
                        <Text>Available: {court.slots.filter((s) => !s.isBooked).length}</Text>
                        <Text>Booked: {court.slots.filter((s) => s.isBooked).length}</Text>
                    </HStack> */}
                </VStack>
            </Card.Body>
        </Card.Root>
    );
}

export default DashboardCourtCard;

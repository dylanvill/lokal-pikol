import { Badge, Card, HStack, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { LuCircle } from 'react-icons/lu';
import { LuCircleCheck, LuCircleX } from 'react-icons/lu';

import type AvailabilityCourt from '../../../scheduling/models/AvailabilityCourt';
interface ScheduleCourtCardProps {
    court: AvailabilityCourt;
}

function ScheduleCourtCard({ court }: ScheduleCourtCardProps) {
    return (
        <Card.Root variant="outline">
            <Card.Header>
                <Heading>{court.name}</Heading>
                <HStack gap={3} marginTop={1}>
                    <HStack gap={1}>
                        <LuCircle size={10} color="var(--chakra-colors-blue-500)" fill="var(--chakra-colors-blue-500)" />
                        <Text fontSize="xs" color="gray.500">Available</Text>
                    </HStack>
                    <HStack gap={1}>
                        <LuCircle size={10} color="var(--chakra-colors-red-500)" fill="var(--chakra-colors-red-500)" />
                        <Text fontSize="xs" color="gray.500">Reserved</Text>
                    </HStack>
                </HStack>
            </Card.Header>
            <Card.Body>
                <SimpleGrid columns={2} gap={2}>
                    {court.slots.map((slot) => (
                        <Badge
                            key={slot.slot}
                            colorPalette={slot.isAvailable ? 'blue' : 'red'}
                            size="lg"
                            variant="surface"
                        >
                            {slot.isAvailable ? <LuCircleCheck /> : <LuCircleX />} {slot.display}
                        </Badge>
                    ))}
                </SimpleGrid>
            </Card.Body>
        </Card.Root>
    );
}

export default ScheduleCourtCard;

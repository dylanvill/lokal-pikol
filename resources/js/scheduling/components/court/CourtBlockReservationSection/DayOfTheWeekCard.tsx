import { Badge, Box, Button, Card, Text, VStack } from '@chakra-ui/react';
import { LuTrash } from 'react-icons/lu';
import type BlockReservation from '../../../models/BlockReservation';

interface DayOfTheWeekCardProps {
    dayOfTheWeek: BlockReservation['dayOfTheWeek'];
    schedules: BlockReservation['schedules'];
}

function DayOfTheWeekCard({ dayOfTheWeek, schedules }: DayOfTheWeekCardProps) {
    const hasSchedules = schedules && schedules.length > 0;

    return (
        <Card.Root variant="outline" size="sm">
            <Card.Header pb={2}>
                <Card.Title fontWeight="bold" fontSize="sm" textTransform="uppercase">
                    {dayOfTheWeek}
                </Card.Title>
            </Card.Header>
            <Card.Body pt={0}>
                {hasSchedules ? (
                    <VStack gap={6} justifyContent="flex-start" alignItems="flex-start">
                        {schedules.map((schedule) => (
                            <Box>
                                <Text fontSize="sm" marginBottom={2}>
                                    {schedule.name}
                                </Text>
                                <VStack key={schedule.id} gap={2} justifyContent="flex-start" alignItems="flex-start">
                                    {schedule.slots.map((slot) => (
                                        <Badge key={slot.slot} variant="outline" textAlign="center" colorPalette="blue" size="lg">
                                            {slot.display}
                                        </Badge>
                                    ))}
                                    <Button size="xs" colorPalette="red">
                                        <LuTrash /> Delete Schedule
                                    </Button>
                                </VStack>
                            </Box>
                        ))}
                    </VStack>
                ) : (
                    <Text fontSize="sm">You don't have any block reservation schedules for this day on this court.</Text>
                )}
            </Card.Body>
        </Card.Root>
    );
}

export default DayOfTheWeekCard;

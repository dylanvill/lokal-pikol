import { Badge, Box, Button, Dialog, HStack, Portal, Text, VStack } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { LuCalendar, LuClock, LuMapPin } from 'react-icons/lu';
import type ReservationCalendarItem from '../../models/ReservationCalendarItem';

interface ReservationEventDialogProps {
    item: ReservationCalendarItem;
    onClose: () => void;
}

function ReservationEventDialog({ item, onClose }: ReservationEventDialogProps) {
    const { delete: destroyReservation, processing } = useForm({});

    const handleDelete = () => {
        // TODO: wire up delete URL during data integration
        destroyReservation('#', {
            onSuccess: () => onClose(),
        });
    };

    const isBlockReservation = item.type === 'block_reservation';

    return (
        <Dialog.Root open onOpenChange={(e) => !processing && !e.open && onClose()}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>
                                <HStack gap={2}>
                                    {item.name}
                                    {isBlockReservation && (
                                        <Badge colorPalette="orange" size="sm">
                                            Blocked
                                        </Badge>
                                    )}
                                </HStack>
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <VStack align="start" gap={3}>
                                <HStack gap={2} color="gray.600">
                                    <Box fontSize="sm">
                                        <LuCalendar />
                                    </Box>
                                    <Text fontSize="sm">{item.formattedDate}</Text>
                                </HStack>
                                <HStack gap={2} color="gray.600">
                                    <Box fontSize="sm">
                                        <LuClock />
                                    </Box>
                                    <Text fontSize="sm">{item.formattedTimeRange}</Text>
                                </HStack>
                                <HStack gap={2} color="gray.600">
                                    <Box fontSize="sm">
                                        <LuMapPin />
                                    </Box>
                                    <Text fontSize="sm">{item.courtName}</Text>
                                </HStack>
                            </VStack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline" disabled={processing} onClick={onClose}>
                                    Close
                                </Button>
                            </Dialog.ActionTrigger>
                            {!isBlockReservation && (
                                <Button colorPalette="red" loading={processing} onClick={handleDelete}>
                                    Delete reservation
                                </Button>
                            )}
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

export default ReservationEventDialog;

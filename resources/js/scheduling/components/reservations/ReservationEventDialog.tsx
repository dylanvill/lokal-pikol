import { Box, Button, Dialog, HStack, Portal, Text, VStack } from '@chakra-ui/react';
import { LuCalendar, LuClock, LuMapPin } from 'react-icons/lu';
import { destroy } from '@/actions/App/Http/Scheduling/Court/Controllers/DeleteReservationController';
import type ReservationCalendarItem from '../../models/ReservationCalendarItem';
import useDeleteReservation from './useDeleteReservation';

interface ReservationEventDialogProps {
    item: ReservationCalendarItem;
    onClose: () => void;
}

interface DetailRowProps {
    icon: React.ReactNode;
    text: string;
}

function DetailRow({ icon, text }: DetailRowProps) {
    return (
        <HStack gap={2} color="gray.600">
            <Box fontSize="sm">{icon}</Box>
            <Text fontSize="sm">{text}</Text>
        </HStack>
    );
}

function ReservationEventDialog({ item, onClose }: ReservationEventDialogProps) {
    const { handleDelete, processing } = useDeleteReservation(onClose);

    const isBlockReservation = item.type === 'block_reservation';

    const onDelete = () => {
        handleDelete(destroy(item.id).url);
    };

    return (
        <Dialog.Root open onOpenChange={(e) => !processing && !e.open && onClose()}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{item.title}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <VStack align="start" gap={3}>
                                <DetailRow icon={<LuCalendar />} text={item.dateDisplay} />
                                <DetailRow icon={<LuClock />} text={item.timeDisplay} />
                                <DetailRow icon={<LuMapPin />} text={item.courtName} />
                            </VStack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline" disabled={processing} onClick={onClose}>
                                    Close
                                </Button>
                            </Dialog.ActionTrigger>
                            {!isBlockReservation && (
                                <Button colorPalette="red" loading={processing} onClick={onDelete}>
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

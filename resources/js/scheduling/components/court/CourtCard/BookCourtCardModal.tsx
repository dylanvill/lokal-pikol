import { Badge, Button, Dialog, Field, Input, Portal, Stack, Text, Wrap } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import slotsToTimeRange, { areSlotsContiguous } from './helpers/slotsToTimeRange';

interface BookCourtCardModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    courtId: number;
    courtName: string;
    selectedSlots: string[];
    date: string;
    onSuccess: () => void;
}

function BookCourtCardModal({ open, onOpenChange, courtId, courtName, selectedSlots, date, onSuccess }: BookCourtCardModalProps) {
    const { startTime, endTime } = selectedSlots.length > 0
        ? slotsToTimeRange(selectedSlots)
        : { startTime: '', endTime: '' };

    const { data, setData, post, processing, errors, reset } = useForm({
        court_id: courtId,
        reservation_name: '',
        date,
        start_time: startTime,
        end_time: endTime,
    });

    function handleSubmit() {
        if (!areSlotsContiguous(selectedSlots)) return;

        post('/bookings', {
            onSuccess: () => {
                reset();
                onSuccess();
                onOpenChange(false);
            },
        });
    }

    function handleOpenChange(open: boolean) {
        if (!open) reset();
        onOpenChange(open);
    }

    const nonContiguous = selectedSlots.length > 1 && !areSlotsContiguous(selectedSlots);

    return (
        <Dialog.Root open={open} onOpenChange={(e) => handleOpenChange(e.open)}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Stack gap={0.5}>
                                <Dialog.Title>{courtName}</Dialog.Title>
                                <Text fontSize="sm" color="gray.500" fontWeight="normal">{date}</Text>
                            </Stack>
                        </Dialog.Header>

                        <Dialog.Body>
                            <Stack gap={4}>
                                <Stack gap={2}>
                                    <Text fontSize="sm" fontWeight="medium">Selected slots</Text>
                                    <Wrap gap={2}>
                                        {selectedSlots.map((slot) => (
                                            <Badge key={slot} variant="outline" colorPalette="blue" size="sm">
                                                {slot}
                                            </Badge>
                                        ))}
                                    </Wrap>
                                    {nonContiguous && (
                                        <Text fontSize="xs" color="red.500">
                                            Selected slots must be consecutive.
                                        </Text>
                                    )}
                                </Stack>

                                <Field.Root invalid={!!errors.reservation_name}>
                                    <Field.Label>Reservation name</Field.Label>
                                    <Input
                                        placeholder="e.g. John Smith"
                                        value={data.reservation_name}
                                        onChange={(e) => setData('reservation_name', e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                    />
                                    {errors.reservation_name && (
                                        <Field.ErrorText>{errors.reservation_name}</Field.ErrorText>
                                    )}
                                </Field.Root>
                            </Stack>
                        </Dialog.Body>

                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button
                                colorPalette="blue"
                                disabled={!data.reservation_name.trim() || processing || nonContiguous}
                                loading={processing}
                                onClick={handleSubmit}
                            >
                                Confirm reservation
                            </Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger />
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

export default BookCourtCardModal;

import { Badge, Button, Dialog, Field, Input, Portal, Stack, Text, Wrap } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { reserve } from '@/actions/App/Http/Scheduling/Court/Controllers/ReserveCourtController';
import type Court from '../../../models/Court';
import type CourtSlot from '../../../models/CourtSlot';
import { type DateString } from '../../../types/DateTime';
import slotsToTimeRange, { areSlotsContiguous } from './helpers/slotsToTimeRange';

interface ReserveCourtCardModalProps {
    court: Omit<Court, 'createdAt'>;
    selectedSlots: CourtSlot[];
    date?: DateString;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

function ReserveCourtCardModal({ open, onOpenChange, court, selectedSlots, date, onSuccess }: ReserveCourtCardModalProps) {
    const slotValues = selectedSlots.map((s) => s.slot);
    const { startTime, endTime } = slotValues.length > 0 ? slotsToTimeRange(slotValues) : { startTime: '', endTime: '' };

    const { data, setData, post, processing, errors, reset, transform } = useForm({
        courtId: court.id,
        reservationName: '',
        date,
        startTime: startTime,
        endTime: endTime,
    });

    function handleSubmit() {
        if (!areSlotsContiguous(slotValues)) return;

        transform((data) => ({
            ...data,
            startTime: startTime,
            endTime: endTime,
        }));

        post(reserve(court.id).url, {
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

    const nonContiguous = slotValues.length > 1 && !areSlotsContiguous(slotValues);

    return (
        <Dialog.Root open={open} onOpenChange={(e) => handleOpenChange(e.open)}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Stack gap={0.5}>
                                <Dialog.Title>{court.name}</Dialog.Title>
                                <Text fontSize="sm" color="gray.500" fontWeight="normal">
                                    {date}
                                </Text>
                            </Stack>
                        </Dialog.Header>

                        <Dialog.Body>
                            <Stack gap={4}>
                                <Stack gap={2}>
                                    <Text fontSize="sm" fontWeight="medium">
                                        Selected slots
                                    </Text>
                                    <Wrap gap={2}>
                                        {selectedSlots.map((slot) => (
                                            <Badge key={slot.slot} variant="outline" colorPalette="blue" size="sm">
                                                {slot.display}
                                            </Badge>
                                        ))}
                                    </Wrap>
                                    {nonContiguous && (
                                        <Text fontSize="xs" color="red.500">
                                            Selected slots must be consecutive.
                                        </Text>
                                    )}
                                </Stack>

                                <Field.Root invalid={!!errors.reservationName}>
                                    <Field.Label>Reservation name</Field.Label>
                                    <Input
                                        placeholder="e.g. John Smith"
                                        value={data.reservationName}
                                        onChange={(e) => setData('reservationName', e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                    />
                                    {errors.reservationName && <Field.ErrorText>{errors.reservationName}</Field.ErrorText>}
                                </Field.Root>
                            </Stack>
                        </Dialog.Body>

                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button
                                colorPalette="blue"
                                disabled={!data.reservationName.trim() || processing || nonContiguous}
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

export default ReserveCourtCardModal;

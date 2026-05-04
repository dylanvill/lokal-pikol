import { Button, Dialog, Field, Input, NativeSelect, Portal, RadioCard, SimpleGrid, Stack, Text, Wrap } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import CreateBlockReservationController from '@/actions/App/Http/Scheduling/Reservation/Controllers/CreateBlockReservationController';
import { toaster } from '../../../shared/components/ui/toaster';
import type Court from '../../models/Court';
import type CourtSlot from '../../models/CourtSlot';
import slotsToTimeRange, { areSlotsContiguous } from '../court/CourtCard/helpers/slotsToTimeRange';
import CheckboxSlotCard from '../shared/CheckboxSlotCard';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface CreateBlockReservationModalProps {
    courts: Court[];
}

function CreateBlockReservationModal({ courts }: CreateBlockReservationModalProps) {
    const [open, setOpen] = useState(false);
    const [selectedSlots, setSelectedSlots] = useState<CourtSlot[]>([]);

    const { data, setData, post, processing, errors, reset, transform } = useForm({
        courtId: courts[0]?.id ?? '',
        name: '',
        dayOfTheWeek: '',
        startTime: '',
        endTime: '',
    });

    const slots = courts.find((c) => c.id === data.courtId)?.slots ?? [];
    const nonContiguous = selectedSlots.length > 1 && !areSlotsContiguous(selectedSlots);

    function toggleSlot(slot: CourtSlot, checked: boolean) {
        setSelectedSlots((prev) => (checked ? [...prev, slot] : prev.filter((s) => s.slot !== slot.slot)));
    }

    function handleDayChange(day: string) {
        setData('dayOfTheWeek', day);
        setSelectedSlots([]);
    }

    function handleSubmit() {
        if (!data.dayOfTheWeek || selectedSlots.length === 0 || nonContiguous) return;

        const { startTime, endTime } = slotsToTimeRange(selectedSlots);

        transform((formData) => ({ ...formData, startTime, endTime }));

        post(CreateBlockReservationController.store.url(), {
            onSuccess: () => {
                toaster.create({
                    title: `Block reservation "${data.name}" saved for every ${data.dayOfTheWeek}.`,
                    type: 'success',
                    duration: 4000,
                });
                reset();
                setSelectedSlots([]);
                setOpen(false);
            },
        });
    }

    function handleOpenChange(isOpen: boolean) {
        if (!isOpen) {
            reset();
            setSelectedSlots([]);
        }
        setOpen(isOpen);
    }

    return (
        <Dialog.Root open={open} onOpenChange={(e) => handleOpenChange(e.open)}>
            <Dialog.Trigger asChild>
                <Button colorPalette="blue" size="sm">
                    <LuPlus />
                    Add block reservation
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content maxW="2xl">
                        <Dialog.Header>
                            <Dialog.Title>Add block reservation</Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body>
                            <Stack gap={6}>
                                <RadioCard.Root
                                    value={data.dayOfTheWeek}
                                    onValueChange={(e) => e.value && handleDayChange(e.value)}
                                    colorPalette="blue"
                                    size="sm"
                                >
                                    <Field.Root>
                                        <Field.Label>Day of the week</Field.Label>
                                        <Wrap gap={2} mt={1}>
                                            {DAYS.map((day) => (
                                                <RadioCard.Item key={day} value={day}>
                                                    <RadioCard.ItemHiddenInput />
                                                    <RadioCard.ItemControl>
                                                        <RadioCard.ItemText>{day}</RadioCard.ItemText>
                                                        <RadioCard.ItemIndicator />
                                                    </RadioCard.ItemControl>
                                                </RadioCard.Item>
                                            ))}
                                        </Wrap>
                                    </Field.Root>
                                </RadioCard.Root>

                                {data.dayOfTheWeek && (
                                    <>
                                        {courts.length > 1 && (
                                            <Field.Root>
                                                <Field.Label>Court</Field.Label>
                                                <NativeSelect.Root>
                                                    <NativeSelect.Field
                                                        value={data.courtId}
                                                        onChange={(e) => setData('courtId', e.target.value)}
                                                    >
                                                        {courts.map((court) => (
                                                            <option key={court.id} value={court.id}>
                                                                {court.name}
                                                            </option>
                                                        ))}
                                                    </NativeSelect.Field>
                                                    <NativeSelect.Indicator />
                                                </NativeSelect.Root>
                                            </Field.Root>
                                        )}

                                        <Field.Root invalid={!!errors.name}>
                                            <Field.Label>Name</Field.Label>
                                            <Input
                                                placeholder="e.g. Training session, League match"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                            />
                                            {errors.name && <Field.ErrorText>{errors.name}</Field.ErrorText>}
                                        </Field.Root>

                                        <Field.Root>
                                            <Field.Label>Time slots</Field.Label>
                                            {nonContiguous && (
                                                <Text fontSize="xs" color="red.500" mb={1}>
                                                    Selected slots must be consecutive.
                                                </Text>
                                            )}
                                            <SimpleGrid columns={3} gap={2} mt={1}>
                                                {slots.map((slot) => (
                                                    <CheckboxSlotCard
                                                        key={slot.slot}
                                                        time={slot.display}
                                                        label={slot.label}
                                                        checked={selectedSlots.some((s) => s.slot === slot.slot)}
                                                        onCheckedChange={(checked) => toggleSlot(slot, checked)}
                                                        disabled={!slot.isAvailable}
                                                    />
                                                ))}
                                            </SimpleGrid>
                                        </Field.Root>
                                    </>
                                )}
                            </Stack>
                        </Dialog.Body>

                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button
                                colorPalette="blue"
                                disabled={
                                    !data.dayOfTheWeek ||
                                    !data.name.trim() ||
                                    selectedSlots.length === 0 ||
                                    nonContiguous ||
                                    processing
                                }
                                loading={processing}
                                onClick={handleSubmit}
                            >
                                Save
                            </Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger />
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

export default CreateBlockReservationModal;

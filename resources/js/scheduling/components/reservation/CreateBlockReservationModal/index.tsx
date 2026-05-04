import { Button, Dialog, Field, Input, Portal, Stack } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import CreateBlockReservationController from '@/actions/App/Http/Scheduling/Reservation/Controllers/CreateBlockReservationController';
import { toaster } from '../../../../shared/components/ui/toaster';
import type Court from '../../../models/Court';
import type CourtSlot from '../../../models/CourtSlot';
import slotsToTimeRange, { areSlotsContiguous } from '../../court/CourtCard/helpers/slotsToTimeRange';
import CourtSection from './CourtSection';
import DayOfTheWeekSection from './DayOfTheWeekSection';
import TimeSlotsSection from './TimeSlotsSection';

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
                                <DayOfTheWeekSection
                                    value={data.dayOfTheWeek}
                                    onChange={handleDayChange}
                                />

                                {data.dayOfTheWeek && (
                                    <>
                                        {courts.length > 1 && (
                                            <CourtSection
                                                courts={courts}
                                                value={data.courtId}
                                                onChange={(courtId) => setData('courtId', courtId)}
                                            />
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

                                        <TimeSlotsSection
                                            slots={slots}
                                            selectedSlots={selectedSlots}
                                            onToggle={toggleSlot}
                                            nonContiguous={nonContiguous}
                                        />
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

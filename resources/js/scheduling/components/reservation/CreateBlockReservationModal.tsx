import { Button, Dialog, Field, Input, Portal, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { store } from '@/actions/App/Http/Scheduling/Reservation/Controllers/CreateBlockReservationController';
import { toaster } from '../../../shared/components/ui/toaster';
import militaryTimeToAmPmTime from '../../../shared/helpers/militaryTimeToAmPmTime';
import type BlockReservation from '../../models/BlockReservation';
import type Court from '../../models/Court';
import type CourtSlot from '../../models/CourtSlot';
import { type UuidString } from '../../types/String';
import slotsToTimeRange, { areSlotsContiguous } from '../court/CourtCard/helpers/slotsToTimeRange';
import CheckboxSlotCard from '../shared/CheckboxSlotCard';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface CreateBlockReservationModalProps {
    courts: Court[];
    slots: CourtSlot[];
    blockReservations: BlockReservation[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function CreateBlockReservationModal({ courts, slots, blockReservations, open, onOpenChange }: CreateBlockReservationModalProps) {
    const [selectedCourt, setSelectedCourt] = useState<UuidString | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedSlots, setSelectedSlots] = useState<CourtSlot[]>([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        courtId: '',
        name: '',
        dayOfTheWeek: '',
        startTime: '',
        endTime: '',
    });

    useEffect(() => {
        setSelectedSlots([]);
    }, [selectedCourt, selectedDay]);

    const blockedSlots = useMemo(() => {
        if (!selectedCourt || !selectedDay) return new Set<string>();

        const blocked = new Set<string>();
        blockReservations
            .filter((br) => br.courtId === selectedCourt && br.dayOfTheWeek === selectedDay)
            .forEach((br) => br.blockedSlots.forEach((slot) => blocked.add(slot.slot)));

        return blocked;
    }, [selectedCourt, selectedDay, blockReservations]);

    function handleCourtToggle(courtId: UuidString) {
        const next = selectedCourt === courtId ? null : courtId;
        setSelectedCourt(next);
        setData('courtId', next ?? '');
    }

    function handleDayToggle(day: string) {
        const next = selectedDay === day ? null : day;
        setSelectedDay(next);
        setData('dayOfTheWeek', next ?? '');
    }

    function handleSlotToggle(slot: CourtSlot, checked: boolean) {
        setSelectedSlots((prev) => (checked ? [...prev, slot] : prev.filter((s) => s.slot !== slot.slot)));
    }

    function handleSubmit() {
        if (selectedSlots.length === 0 || !areSlotsContiguous(selectedSlots)) return;

        const { startTime, endTime } = slotsToTimeRange(selectedSlots);

        post(store().url, {
            onSuccess: () => {
                const start = militaryTimeToAmPmTime(startTime);
                const end = militaryTimeToAmPmTime(endTime);
                toaster.create({
                    title: `Block reservation "${data.name}" created for ${selectedDay} ${start} – ${end}.`,
                    type: 'success',
                    duration: 5000,
                });
                handleClose(false);
            },
        });
    }

    function handleClose(nextOpen: boolean) {
        if (!nextOpen) {
            reset();
            setSelectedCourt(null);
            setSelectedDay(null);
            setSelectedSlots([]);
        }
        onOpenChange(nextOpen);
    }

    const nonContiguous = selectedSlots.length > 1 && !areSlotsContiguous(selectedSlots);
    const canSubmit = data.courtId && data.dayOfTheWeek && data.name.trim() && selectedSlots.length > 0 && !nonContiguous;

    return (
        <Dialog.Root open={open} onOpenChange={(e) => handleClose(e.open)}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content maxW="xl">
                        <Dialog.Header>
                            <Dialog.Title>Add block reservation</Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body>
                            <Stack gap={5}>
                                <Stack gap={2}>
                                    <Text fontSize="sm" fontWeight="medium">
                                        Court
                                    </Text>
                                    <SimpleGrid columns={3} gap={2}>
                                        {courts.map((court) => (
                                            <CheckboxSlotCard
                                                key={court.id}
                                                label={court.name}
                                                checked={selectedCourt === court.id}
                                                onCheckedChange={() => handleCourtToggle(court.id)}
                                            />
                                        ))}
                                    </SimpleGrid>
                                </Stack>

                                <Stack gap={2}>
                                    <Text fontSize="sm" fontWeight="medium">
                                        Day
                                    </Text>
                                    <SimpleGrid columns={4} gap={2}>
                                        {DAYS_OF_WEEK.map((day) => (
                                            <CheckboxSlotCard
                                                key={day}
                                                label={day.slice(0, 3)}
                                                checked={selectedDay === day}
                                                onCheckedChange={() => handleDayToggle(day)}
                                            />
                                        ))}
                                    </SimpleGrid>
                                </Stack>

                                {selectedCourt && selectedDay && (
                                    <Stack gap={2}>
                                        <Text fontSize="sm" fontWeight="medium">
                                            Time slots
                                        </Text>
                                        <SimpleGrid columns={3} gap={2}>
                                            {slots.map((slot) => {
                                                const isBlocked = blockedSlots.has(slot.slot);
                                                return (
                                                    <CheckboxSlotCard
                                                        key={slot.slot}
                                                        label={slot.display}
                                                        checked={selectedSlots.some((s) => s.slot === slot.slot) || isBlocked}
                                                        onCheckedChange={(checked) => !isBlocked && handleSlotToggle(slot, checked)}
                                                        disabled={isBlocked}
                                                    />
                                                );
                                            })}
                                        </SimpleGrid>
                                        {nonContiguous && (
                                            <Text fontSize="xs" color="red.500">
                                                Selected slots must be consecutive.
                                            </Text>
                                        )}
                                    </Stack>
                                )}

                                <Field.Root invalid={!!errors.name}>
                                    <Field.Label fontSize="sm" fontWeight="medium">
                                        Name
                                    </Field.Label>
                                    <Input
                                        placeholder="e.g. Staff training"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                    />
                                    {errors.name && <Field.ErrorText>{errors.name}</Field.ErrorText>}
                                </Field.Root>
                            </Stack>
                        </Dialog.Body>

                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button colorPalette="blue" disabled={!canSubmit || processing} loading={processing} onClick={handleSubmit}>
                                Add block reservation
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

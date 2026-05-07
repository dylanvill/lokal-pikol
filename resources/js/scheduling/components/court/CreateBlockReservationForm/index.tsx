import { Box, Button, Card, Field, Input, Stack } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { useEffect, useState, type FormEvent } from 'react';
import { store } from '@/actions/App/Http/Scheduling/Court/Controllers/CreateBlockReservationController';
import courtSlotsToRange from '../../../helpers/courtSlotToRange';
import type CourtBlockReservation from '../../../models/CourtBlockReservation';
import type CourtSlot from '../../../models/CourtSlot';
import { type UuidString } from '../../../types/String';
import CourtsSection from './CourtsSection';
import DaysOfTheWeekSection from './DaysOfTheWeekSection';
import TimeSlotsSection from './TimeSlotsSection';
import { type CreateBlockReservationFormInterface, type DayOfTheWeek } from './types';

export interface CreateBlockReservationFormProps {
    courts: CourtBlockReservation[];
    slots: CourtSlot[];
}

function CreateBlockReservationForm({ courts, slots }: CreateBlockReservationFormProps) {
    const { data, setData, post, transform } = useForm<CreateBlockReservationFormInterface>({
        name: '',
        courts: [],
        days: [],
        slots: [],
    });
    const slotsDisabled = data.courts.length === 0 || data.days.length === 0;

    const [normalizedSlots, setNormalizedSlots] = useState<CourtSlot[]>(slots);

    useEffect(() => {
        if (slotsDisabled) return;

        const selectedCourts = courts.filter((court) => data.courts.includes(court.id));
        const scheduleSlots = selectedCourts
            .flatMap((court) => court.blockReservations.filter((block) => data.days.includes(block.dayOfTheWeek)))
            .flatMap((block) => block.schedules)
            .flatMap((schedule) => schedule.slots.map((slot) => ({ ...slot, label: schedule.name })));

        setNormalizedSlots((prev) =>
            prev.map((slot) => {
                const conflicts = scheduleSlots.filter((scheduleSlot) => scheduleSlot.slot === slot.slot);
                if (!conflicts) return slot;

                const label = conflicts.flatMap((scheduleSlot) => scheduleSlot.label).join(', ');
                return {
                    ...slot,
                    isAvailable: conflicts.length > 0 ? false : true,
                    label: label,
                };
            }),
        );

        return () => {
            setNormalizedSlots(slots);
        };
    }, [data.courts, data.days, slotsDisabled, slots, courts]);

    const formattedCourts = courts.map((court) => ({ id: court.id, name: court.name }));

    const handleCourtCheckChanged = (checked: boolean, id: UuidString) => {
        setData('courts', checked ? [...data.courts, id] : data.courts.filter((courtId) => courtId !== id));
    };

    const handleDayCheckChanged = (checked: boolean, day: DayOfTheWeek) => {
        setData('days', checked ? [...data.days, day] : data.days.filter((d) => d !== day));
    };

    const handleSlotCheckChanged = (checked: boolean, slot: string) => {
        setData('slots', checked ? [...data.slots, slot] : data.slots.filter((s) => s !== slot));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        transform((data) => {
            const courtSlots = data.slots.map(
                (slot): CourtSlot => ({
                    slot: slot,
                    display: slot,
                    label: null,
                    isAvailable: false,
                }),
            );
            const range = courtSlotsToRange(courtSlots);

            return {
                courtIds: data.courts,
                name: data.name,
                daysOfTheWeek: data.days,
                startTime: range.startTime,
                endTime: range.endTime,
            };
        });

        post(store().url);
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="false">
            <Card.Root variant="outline">
                <Card.Header>
                    <Card.Title>Create a new block reservation</Card.Title>
                </Card.Header>

                <Card.Body>
                    <Stack gap={6}>
                        <Field.Root>
                            <Field.Label>Name</Field.Label>
                            <Input
                                placeholder="Open Play, Club Reservation, DUPR Night, etc."
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                        </Field.Root>

                        <CourtsSection courtSelection={formattedCourts} selectedCourts={data.courts} onCheckChanged={handleCourtCheckChanged} />
                        <DaysOfTheWeekSection selectedDays={data.days} onCheckChanged={handleDayCheckChanged} />
                        <Box pointerEvents={slotsDisabled ? 'none' : 'initial'} opacity={slotsDisabled ? 0.25 : 1}>
                            <TimeSlotsSection slots={normalizedSlots} selectedSlots={data.slots} onCheckChanged={handleSlotCheckChanged} />
                        </Box>
                    </Stack>
                </Card.Body>

                <Card.Footer>
                    <Button colorPalette="blue" type="submit">
                        Save block reservation
                    </Button>
                </Card.Footer>
            </Card.Root>
        </form>
    );
}

export default CreateBlockReservationForm;

import { useForm } from '@inertiajs/react';
import { type FormEvent } from 'react';
import { store } from '@/actions/App/Http/Scheduling/Court/Controllers/CreateBlockReservationController';
import courtSlotsToRange from '../../../../helpers/courtSlotToRange';
import type CourtSlot from '../../../../models/CourtSlot';
import { type DayOfTheWeek } from '../../../../types/DateTime';
import { type UuidString } from '../../../../types/String';
import { type CreateBlockReservationFormInterface } from '../types';

const useBlockReservationForm = () => {
    const { data, setData, post, transform, reset } = useForm<CreateBlockReservationFormInterface>({
        name: '',
        courts: [],
        days: [],
        slots: [],
    });

    const handleNameChanged = (value: string) => {
        setData('name', value);
    };

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

        post(store().url, {
            onSuccess: () => reset(),
        });
    };

    return {
        name: data.name,
        selectedCourts: data.courts,
        selectedDays: data.days,
        selectedSlots: data.slots,
        handleNameChanged,
        handleCourtCheckChanged,
        handleDayCheckChanged,
        handleSlotCheckChanged,
        handleSubmit,
    };
};

export default useBlockReservationForm;

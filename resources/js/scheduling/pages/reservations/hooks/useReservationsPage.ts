import { router } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Views } from 'react-big-calendar';
import type { View } from 'react-big-calendar';
import ReservationsController from '@/actions/App/Http/Scheduling/Court/Controllers/ReservationsController';
import type ReservationCalendarItem from '../../../models/ReservationCalendarItem';
import type { UuidString } from '../../../types/String';

function useReservationsPage(selectedCourtId: UuidString | null, selectedMonth: string) {
    const [selectedItem, setSelectedItem] = useState<ReservationCalendarItem | null>(null);
    const [view, setView] = useState<View>(() => (window.innerWidth < 768 ? Views.DAY : Views.MONTH));
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const currentMonth = dayjs().format('YYYY-MM');
        setDate(
            selectedMonth === currentMonth
                ? new Date()
                : dayjs(selectedMonth + '-01').toDate(),
        );
    }, [selectedMonth]);

    const formattedDate =
        view === Views.DAY
            ? dayjs(date).format('dddd, D MMMM YYYY')
            : dayjs(date).format('MMMM YYYY');

    const handleCourtChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.get(ReservationsController.show.url(), { court: e.target.value, month: selectedMonth });
    };

    const handleNavigate = (newDate: Date) => {
        setDate(newDate);
        const newMonth = dayjs(newDate).format('YYYY-MM');
        if (newMonth !== selectedMonth) {
            router.get(ReservationsController.show.url(), { court: selectedCourtId, month: newMonth });
        }
    };

    return {
        selectedItem,
        setSelectedItem,
        view,
        setView,
        date,
        formattedDate,
        handleCourtChange,
        handleNavigate,
    };
}

export default useReservationsPage;

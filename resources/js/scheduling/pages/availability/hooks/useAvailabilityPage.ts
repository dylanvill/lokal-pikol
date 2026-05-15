import { router } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { type DateValue } from '@chakra-ui/react';
import AvailabilityController from '@/actions/App/Http/Scheduling/Court/Controllers/AvailabilityController';
import { type DateString } from '../../../types/DateTime';

function useAvailabilityPage(date: DateString) {
    const dateDisplay = useMemo(() => dayjs(date).format('dddd, MMMM D, YYYY'), [date]);

    const handleDateChange = (value: DateValue) => {
        router.get(AvailabilityController.show.url(), { date: value.toString() });
    };

    return { dateDisplay, handleDateChange };
}

export default useAvailabilityPage;

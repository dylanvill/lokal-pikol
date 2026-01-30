import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import z from 'zod';

export const searchSchema = z.object({
    city: z.string().min(1, 'City is required'),
    date: z.string().min(1, 'Date is required'),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
});

export type SearchFormData = z.infer<typeof searchSchema>;

// Helper functions to get default values
const getTodayString = () => {
    return dayjs().format('YYYY-MM-DD');
};

const getNextHourString = () => {
    return dayjs().add(1, 'hour').startOf('hour').format('HH:mm');
};

const getHourAfterNextString = () => {
    return dayjs().add(2, 'hour').startOf('hour').format('HH:mm');
};

const useSearchBarForm = () => {
    const form = useForm<SearchFormData>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            city: '1', // Dumaguete
            date: getTodayString(),
            startTime: getNextHourString(),
            endTime: getHourAfterNextString(),
        },
    });

    return { ...form };
};

export default useSearchBarForm;

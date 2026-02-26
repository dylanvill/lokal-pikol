import { Alert, Box, Heading } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { LuClock4 } from 'react-icons/lu';

interface ReservationNoticeProps {
    createdAt: string;
    onTimerExpired: () => void;
}

function ReservationNotice({ createdAt, onTimerExpired }: ReservationNoticeProps) {
    const created = dayjs(createdAt);
    const remainingTime = created.add(10, 'minute');

    const [timeLeft, setTimeLeft] = useState<number>(() => {
        const now = dayjs();
        const diff = remainingTime.diff(now);
        return diff > 0 ? diff : 0;
    });

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimerExpired();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                const newTime = prev - 1000;
                return newTime > 0 ? newTime : 0;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onTimerExpired]);

    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    const timerDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return (
        <Alert.Root status="warning" borderRadius="md">
            <Alert.Content>
                <Alert.Title>Time Slot Reserved until {remainingTime.format('HH:mm A')}</Alert.Title>
                <Alert.Description>
                    Your selected time slots are reserved for 10:00 minutes. Please complete your payment before the timer expires.
                    <br />
                    <Heading display="inline-flex" alignItems="center" marginTop={4}>
                        <Box marginRight={1}>
                            <LuClock4 />
                        </Box>
                        {timerDisplay}
                    </Heading>
                </Alert.Description>
            </Alert.Content>
        </Alert.Root>
    );
}

export default ReservationNotice;

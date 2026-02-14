import { Alert } from '@chakra-ui/react';
import React from 'react';

function ReservationNotice() {
    return (
        <Alert.Root status="warning" borderRadius="md">
            <Alert.Indicator />
            <Alert.Content>
                <Alert.Title>Time Slot Reserved</Alert.Title>
                <Alert.Description>
                    Your selected time slots are reserved for 15:00 minutes. Please complete your booking before the timer expires.
                </Alert.Description>
            </Alert.Content>
        </Alert.Root>
    );
}

export default ReservationNotice;

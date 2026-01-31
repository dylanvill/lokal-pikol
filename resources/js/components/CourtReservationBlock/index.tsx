import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import CourtSlot from './CourtSlot';
import type { CourtSlotState } from './CourtSlot/types';

const dummyData: { id: number; state: CourtSlotState; label: string }[] = [
    { id: 1, state: 'reserved', label: '07:00 AM' },
    { id: 2, state: 'available', label: '08:00 AM' },
    { id: 3, state: 'available', label: '09:00 AM' },
    { id: 4, state: 'available', label: '10:00 AM' },
    { id: 5, state: 'reserved', label: '11:00 AM' },
    { id: 6, state: 'reserved', label: '12:00 PM' },
    { id: 7, state: 'available', label: '01:00 PM' },
    { id: 8, state: 'available', label: '02:00 PM' },
    { id: 9, state: 'selected', label: '03:00 PM' },
    { id: 10, state: 'available', label: '04:00 PM' },
    { id: 11, state: 'available', label: '05:00 PM' },
    { id: 12, state: 'available', label: '06:00 PM' },
    { id: 13, state: 'reserved', label: '07:00 PM' },
    { id: 14, state: 'reserved', label: '08:00 PM' },
    { id: 15, state: 'reserved', label: '09:00 PM' },
    { id: 16, state: 'available', label: '10:00 PM' },
    { id: 17, state: 'available', label: '11:00 PM' },
];

function CourtReservationBlock() {
    return (
        <div>
            <VStack alignItems="flex-start">
                <Text>Court 1</Text>
                <HStack gap={2} flexWrap="wrap">
                    {dummyData.map((slot) => (
                        <CourtSlot 
                            key={slot.id}
                            id={slot.id} 
                            state={slot.state} 
                            label={slot.label} 
                            onClick={(id, state) => console.log('Clicked slot', id, state)} 
                        />
                    ))}
                </HStack>
            </VStack>
        </div>
    );
}

export default CourtReservationBlock;

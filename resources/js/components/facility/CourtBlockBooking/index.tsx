import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import BlockBookingCard from './BlockBookingCard';

function CourtBlockBooking() {
    return (
        <Box>
            <Heading>{/** Court name */}</Heading>
            {[null, null, null].map((_, index) => (
                <BlockBookingCard />
            ))}
        </Box>
    );
}

export default CourtBlockBooking;

import { Box, Heading } from '@chakra-ui/react';
import type BlockedReservation from '../../../models/BlockedReservation';
import { type UuidString } from '../../../types/String';

export interface CourtBlockReservationSectionProps {
    id: UuidString;
    name: string;
    blockedReservations: BlockedReservation[];
}

function CourtBlockReservationSection({ id, name, blockedReservations }: CourtBlockReservationSectionProps) {
    return (
        <Box key={id}>
            <Heading>{name}</Heading>
        </Box>
    );
}

export default CourtBlockReservationSection;
